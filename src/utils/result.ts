/**
 * Result indicates the status of an operation
 * that can fail with a value of type `Failure`
 * or succeed with a value of type `Success`.
 * @abstract
 */
abstract class Result<ErrorT, SuccessT> {
  abstract map<S>(f: (_: SuccessT) => S): Result<ErrorT, S>;

  abstract fold<T>(cases: {
    onSuccess: (_: SuccessT) => T;
    onError: (_: ErrorT) => T;
  }): T;

  abstract fallback(other: Result<ErrorT, SuccessT>): Result<ErrorT, SuccessT>;

  abstract then<S2>(f: (_: SuccessT) => Result<ErrorT, S2>): Result<ErrorT, S2>;
}

export type ResultType<F, S> = Result<F, S>;

export class Err<T> extends Result<T, never> {
  constructor(public readonly reason: T) {
    super();
  }

  then<S2>(_: (_: never) => Result<T, S2>): Err<T> {
    return this;
  }

  fallback<F = T, S = never>(other: Result<F, S>): Result<F, S> {
    return other;
  }

  fold<V>(cases: { onSuccess: (_: never) => V; onError: (_: T) => V }): V {
    return cases.onError(this.reason);
  }

  map<S>(f: (_: never) => S): Result<T, S> {
    return this;
  }
}

export class Ok<T> extends Result<never, T> {
  constructor(public readonly value: T) {
    super();
  }

  then<E, S2>(f: (_: T) => Result<E, S2>): Result<E, S2> {
    return f(this.value);
  }

  fallback(_other: Result<never, T>): Result<never, T> {
    return this;
  }

  fold<V>(cases: { onSuccess: (_: T) => V; onError: (_: never) => V }): V {
    return cases.onSuccess(this.value);
  }

  map<S>(f: (_: T) => S): Result<never, S> {
    // eslint-disable-next-line
    return tryCatch(f)(this.value);
  }
}

type Func = (...args: any[]) => any;

export function tryCatch<ErrorType, F extends Func>(
  f: F,
): (..._: Parameters<F>) => ResultType<ErrorType, ReturnType<F>> {
  return (...vs) => {
    try {
      const result = f(...vs);
      return new Ok(result);
    } catch (error) {
      return new Err(error);
    }
  };
}

export function fail<E, S>(e: E): ResultType<E, S> {
  return new Err(e);
}

export function ok<E, S>(v: S): ResultType<E, S> {
  return new Ok(v);
}

export function isError<E, V>(r: ResultType<E, V>): r is Err<E> {
  return r instanceof Err;
}

export function isOk<Err, V>(r: ResultType<Err, V>): r is Ok<V> {
  return r instanceof Ok;
}

//** Eg Implementation */

// import {tryCatch} from './result'

// function parseInt(v: string, radix = 10): number {
//   const n = Number.parseInt(v, radix)
//   if (Number.isNaN(n)) {
//     throw new Error('NaN')
//   }
//   return n
// }

// const parseIntFromOctal = tryCatch((n) => parseInt(n, 8))
// const parseIntFromDecimal = tryCatch(parseInt)
// const parseIntFromHex = tryCatch((n) => parseInt(n, 16))

// const input = 'afe10b'

// parseIntFromOctal(input)
//   .fallback(parseIntFromDecimal(input))
//   .fallback(parseIntFromHex(input))
//   .map((v) => (v > 3 ? 3 : v + 1))
//   .fold({
//     onSuccess: (v) => console.log(v),
//     onError: (error) => {
//       throw error
//     },
//   })
