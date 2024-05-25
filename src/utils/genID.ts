//^ Code from Oslo

import { base32 } from './base32.mjs'

export function byteToBinary(byte: number) {
  return byte.toString(2).padStart(8, '0')
}
export function bytesToBinary(bytes: Uint8Array) {
  return [...bytes].map((val) => byteToBinary(val)).join('')
}
export function binaryToInteger(bits: string) {
  return Number.parseInt(bits, 2)
}
export function bytesToInteger(bytes: Uint8Array) {
  return Number.parseInt(bytesToBinary(bytes), 2)
}

export function random() {
  const buffer = new ArrayBuffer(8)
  const bytes = crypto.getRandomValues(new Uint8Array(buffer))
  // sets the exponent value (11 bits) to 01111111111 (1023)
  // since the bias is 1023 (2 * (11 - 1) - 1), 1023 - 1023 = 0
  // 2^0 * (1 + [52 bit number between 0-1]) = number between 1-2
  bytes[0] = 63
  bytes[1] = bytes[1] | 240
  return new DataView(buffer).getFloat64(0) - 1
}
export function generateRandomInteger(max: number) {
  if (max < 0 || !Number.isInteger(max)) {
    throw new Error(
      "Argument 'max' must be an integer greater than or equal to 0"
    )
  }
  const bitLength = (max - 1).toString(2).length
  const shift = bitLength % 8
  const bytes = new Uint8Array(Math.ceil(bitLength / 8))
  crypto.getRandomValues(bytes)
  // This zeroes bits that can be ignored to increase the chance `result` < `max`.
  // For example, if `max` can be represented with 10 bits, the leading 6 bits of the random 16 bits (2 bytes) can be ignored.
  if (shift !== 0) {
    bytes[0] &= (1 << shift) - 1
  }
  let result = bytesToInteger(bytes)
  while (result >= max) {
    crypto.getRandomValues(bytes)
    if (shift !== 0) {
      bytes[0] &= (1 << shift) - 1
    }
    result = bytesToInteger(bytes)
  }
  return result
}

export function alphabet(...patterns: string[]) {
  const patternSet = new Set(patterns)
  let result = ''
  for (const pattern of patternSet) {
    if (pattern === 'ʃ-Ψ') {
      result +=
        'ʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯͰͱͲͳͶͷͻͼͽͿΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨ'
    } else if (pattern === 'ࠀ-ࡀ') {
      result += 'ࠀࠁࠂࠃࠄࠅࠆࠇࠈࠉࠊࠋࠌࠍࠎࠏࠐࠑࠒࠓࠔࠕࡀ'
    } else if (pattern === 'ؠ-ى') {
      result += 'ؠءابةتثجحخدذرزسشصضطظعغػؼؽؾؿفقكلمنهوىي'
    } else {
      result += pattern
    }
  }
  return result
}

export function generateRandomString(length: number, alphabet: string | any[]) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += alphabet[generateRandomInteger(alphabet.length)]
  }
  return result
}

export function tinyID(length: number) {
  return generateRandomString(length, alphabet('ʃ-Ψ', 'ࠀ-ࡀ', 'ؠ-ى'))
}
export function fuckyouID(size: number) {
  const buffer = crypto.getRandomValues(new Uint8Array(size))
  return base32
    .encode(buffer, {
      includePadding: false,
    })
    .toLowerCase()
}
