function S(B) {
  return typeof B === "object" ? (B.type === "text" ? P(B.value) : !1) : P(B);
}
var P = function (B) {
    return B.replace(g, "") === "";
  },
  g = /[ \t\n\f\r]/g;
var R = function (B) {
    const D = [];
    let C = -1;
    while (++C < B.length) D[C] = w(B[C]);
    return m(q);
    function q(...j) {
      let z = -1;
      while (++z < D.length) if (D[z].apply(this, j)) return !0;
      return !1;
    }
  },
  O = function (B) {
    const D = B;
    return m(C);
    function C(q) {
      const j = q;
      let z;
      for (z in B) if (j[z] !== D[z]) return !1;
      return !0;
    }
  },
  y = function (B) {
    return m(D);
    function D(C) {
      return C && C.type === B;
    }
  },
  m = function (B) {
    return D;
    function D(C, q, j) {
      return Boolean(
        h(C) &&
          B.call(this, C, typeof q === "number" ? q : void 0, j || void 0),
      );
    }
  },
  k = function () {
    return !0;
  },
  h = function (B) {
    return B !== null && typeof B === "object" && "type" in B;
  };
var w = function (B) {
  if (B === null || B === void 0) return k;
  if (typeof B === "function") return m(B);
  if (typeof B === "object") return Array.isArray(B) ? R(B) : O(B);
  if (typeof B === "string") return y(B);
  throw new Error("Expected function, string, or object as test");
};
function b(B) {
  return "\x1B[33m" + B + "\x1B[39m";
}
function X(B, D, C, q) {
  let j;
  if (typeof D === "function" && typeof C !== "function") (q = C), (C = D);
  else j = D;
  const z = w(j),
    Q = q ? -1 : 1;
  _(B, void 0, [])();
  function _(G, $, H) {
    const M = G && typeof G === "object" ? G : {};
    if (typeof M.type === "string") {
      const J =
        typeof M.tagName === "string"
          ? M.tagName
          : typeof M.name === "string"
            ? M.name
            : void 0;
      Object.defineProperty(V, "name", {
        value: "node (" + b(G.type + (J ? "<" + J + ">" : "")) + ")",
      });
    }
    return V;
    function V() {
      let J = A,
        W,
        N,
        f;
      if (!D || z(G, $, H[H.length - 1] || void 0)) {
        if (((J = x(C(G, H))), J[0] === Z)) return J;
      }
      if ("children" in G && G.children) {
        const Y = G;
        if (Y.children && J[0] !== U) {
          (N = (q ? Y.children.length : -1) + Q), (f = H.concat(Y));
          while (N > -1 && N < Y.children.length) {
            const I = Y.children[N];
            if (((W = _(I, N, f)()), W[0] === Z)) return W;
            N = typeof W[1] === "number" ? W[1] : N + Q;
          }
        }
      }
      return J;
    }
  }
}
var x = function (B) {
    if (Array.isArray(B)) return B;
    if (typeof B === "number") return [E, B];
    return B === null || B === void 0 ? A : [B];
  },
  A = [],
  E = !0,
  Z = !1,
  U = "skip";
function T(B, D, C, q) {
  let j, z, Q;
  if (typeof D === "function" && typeof C !== "function")
    (z = void 0), (Q = D), (j = C);
  else (z = D), (Q = C), (j = q);
  X(B, z, _, j);
  function _(G, $) {
    const H = $[$.length - 1],
      M = H ? H.children.indexOf(G) : void 0;
    return Q(G, M, H);
  }
}
var F = function (B, D) {
    let C = p,
      q = -1;
    while (++q < B.children.length) {
      const j = B.children[q];
      if (j.type === "text" && S(j.value));
      else if (j.type === "image" || j.type === "imageReference") C = K;
      else if (!D && (j.type === "link" || j.type === "linkReference")) {
        const z = F(j, !0);
        if (z === L) return L;
        if (z === K) C = K;
      } else return L;
    }
    return C;
  },
  p = 1,
  K = 2,
  L = 3;
function u() {
  return (B) => {
    T(B, "paragraph", (D, C, q) => {
      if (q && typeof C === "number" && F(D, !1) === K)
        return q.children.splice(C, 1, ...D.children), [U, C];
    });
  };
}
export { u as default };
