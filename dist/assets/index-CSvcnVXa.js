(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) d(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === "childList")
        for (const l of s.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && d(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function d(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = n(i);
    fetch(i.href, s);
  }
})();
const ol = !1,
  rl = (e, t) => e === t,
  ll = Symbol("solid-track"),
  Gt = { equals: rl };
let wo = Io;
const Ue = 1,
  Xt = 2,
  $o = { owned: null, cleanups: null, context: null, owner: null };
var ye = null;
let ln = null,
  il = null,
  Te = null,
  Ne = null,
  Re = null,
  nn = 0;
function Je(e, t) {
  const n = Te,
    d = ye,
    i = e.length === 0,
    s = t === void 0 ? d : t,
    l = i
      ? $o
      : {
          owned: null,
          cleanups: null,
          context: s ? s.context : null,
          owner: s,
        },
    o = i ? e : () => e(() => qe(() => Nt(l)));
  (ye = l), (Te = null);
  try {
    return ut(o, !0);
  } finally {
    (Te = n), (ye = d);
  }
}
function P(e, t) {
  t = t ? Object.assign({}, Gt, t) : Gt;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    d = (i) => (typeof i == "function" && (i = i(n.value)), Co(n, i));
  return [To.bind(n), d];
}
function Z(e, t, n) {
  const d = Bn(e, t, !1, Ue);
  Pt(d);
}
function $e(e, t, n) {
  wo = ml;
  const d = Bn(e, t, !1, Ue);
  (!n || !n.render) && (d.user = !0), Re ? Re.push(d) : Pt(d);
}
function ce(e, t, n) {
  n = n ? Object.assign({}, Gt, n) : Gt;
  const d = Bn(e, t, !0, 0);
  return (
    (d.observers = null),
    (d.observerSlots = null),
    (d.comparator = n.equals || void 0),
    Pt(d),
    To.bind(d)
  );
}
function qe(e) {
  if (Te === null) return e();
  const t = Te;
  Te = null;
  try {
    return e();
  } finally {
    Te = t;
  }
}
function Oe(e) {
  $e(() => qe(e));
}
function Ae(e) {
  return (
    ye === null ||
      (ye.cleanups === null ? (ye.cleanups = [e]) : ye.cleanups.push(e)),
    e
  );
}
function al() {
  return ye;
}
function sl(e, t) {
  const n = ye,
    d = Te;
  (ye = e), (Te = null);
  try {
    return ut(t, !0);
  } catch (i) {
    Rn(i);
  } finally {
    (ye = n), (Te = d);
  }
}
function dl(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: fl(n), defaultValue: e };
}
function cl(e) {
  let t;
  return ye && ye.context && (t = ye.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function _o(e) {
  const t = ce(e),
    n = ce(() => xn(t()));
  return (
    (n.toArray = () => {
      const d = n();
      return Array.isArray(d) ? d : d != null ? [d] : [];
    }),
    n
  );
}
function To() {
  if (this.sources && this.state)
    if (this.state === Ue) Pt(this);
    else {
      const e = Ne;
      (Ne = null), ut(() => Jt(this), !1), (Ne = e);
    }
  if (Te) {
    const e = this.observers ? this.observers.length : 0;
    Te.sources
      ? (Te.sources.push(this), Te.sourceSlots.push(e))
      : ((Te.sources = [this]), (Te.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(Te),
          this.observerSlots.push(Te.sources.length - 1))
        : ((this.observers = [Te]),
          (this.observerSlots = [Te.sources.length - 1]));
  }
  return this.value;
}
function Co(e, t, n) {
  let d = e.value;
  return (
    (!e.comparator || !e.comparator(d, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        ut(() => {
          for (let i = 0; i < e.observers.length; i += 1) {
            const s = e.observers[i],
              l = ln && ln.running;
            l && ln.disposed.has(s),
              (l ? !s.tState : !s.state) &&
                (s.pure ? Ne.push(s) : Re.push(s), s.observers && So(s)),
              l || (s.state = Ue);
          }
          if (Ne.length > 1e6) throw ((Ne = []), new Error());
        }, !1)),
    t
  );
}
function Pt(e) {
  if (!e.fn) return;
  Nt(e);
  const t = nn;
  ul(e, e.value, t);
}
function ul(e, t, n) {
  let d;
  const i = ye,
    s = Te;
  Te = ye = e;
  try {
    d = e.fn(t);
  } catch (l) {
    return (
      e.pure &&
        ((e.state = Ue), e.owned && e.owned.forEach(Nt), (e.owned = null)),
      (e.updatedAt = n + 1),
      Rn(l)
    );
  } finally {
    (Te = s), (ye = i);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? Co(e, d) : (e.value = d),
    (e.updatedAt = n));
}
function Bn(e, t, n, d = Ue, i) {
  const s = {
    fn: e,
    state: d,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: ye,
    context: ye ? ye.context : null,
    pure: n,
  };
  return (
    ye === null ||
      (ye !== $o && (ye.owned ? ye.owned.push(s) : (ye.owned = [s]))),
    s
  );
}
function Yt(e) {
  if (e.state === 0) return;
  if (e.state === Xt) return Jt(e);
  if (e.suspense && qe(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < nn); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === Ue)) Pt(e);
    else if (e.state === Xt) {
      const d = Ne;
      (Ne = null), ut(() => Jt(e, t[0]), !1), (Ne = d);
    }
}
function ut(e, t) {
  if (Ne) return e();
  let n = !1;
  t || (Ne = []), Re ? (n = !0) : (Re = []), nn++;
  try {
    const d = e();
    return pl(n), d;
  } catch (d) {
    n || (Re = null), (Ne = null), Rn(d);
  }
}
function pl(e) {
  if ((Ne && (Io(Ne), (Ne = null)), e)) return;
  const t = Re;
  (Re = null), t.length && ut(() => wo(t), !1);
}
function Io(e) {
  for (let t = 0; t < e.length; t++) Yt(e[t]);
}
function ml(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const d = e[t];
    d.user ? (e[n++] = d) : Yt(d);
  }
  for (t = 0; t < n; t++) Yt(e[t]);
}
function Jt(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const d = e.sources[n];
    if (d.sources) {
      const i = d.state;
      i === Ue
        ? d !== t && (!d.updatedAt || d.updatedAt < nn) && Yt(d)
        : i === Xt && Jt(d, t);
    }
  }
}
function So(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = Xt), n.pure ? Ne.push(n) : Re.push(n), n.observers && So(n));
  }
}
function Nt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        d = e.sourceSlots.pop(),
        i = n.observers;
      if (i && i.length) {
        const s = i.pop(),
          l = n.observerSlots.pop();
        d < i.length &&
          ((s.sourceSlots[l] = d), (i[d] = s), (n.observerSlots[d] = l));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Nt(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Nt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function hl(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function Rn(e, t = ye) {
  throw hl(e);
}
function xn(e) {
  if (typeof e == "function" && !e.length) return xn(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const d = xn(e[n]);
      Array.isArray(d) ? t.push.apply(t, d) : t.push(d);
    }
    return t;
  }
  return e;
}
function fl(e, t) {
  return function (d) {
    let i;
    return (
      Z(
        () =>
          (i = qe(
            () => (
              (ye.context = { ...ye.context, [e]: d.value }),
              _o(() => d.children)
            )
          )),
        void 0
      ),
      i
    );
  };
}
const gl = Symbol("fallback");
function jn(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function vl(e, t, n = {}) {
  let d = [],
    i = [],
    s = [],
    l = 0,
    o = t.length > 1 ? [] : null;
  return (
    Ae(() => jn(s)),
    () => {
      let c = e() || [],
        u = c.length,
        p,
        m;
      return (
        c[ll],
        qe(() => {
          let T, N, x, A, y, S, w, g, b;
          if (u === 0)
            l !== 0 &&
              (jn(s), (s = []), (d = []), (i = []), (l = 0), o && (o = [])),
              n.fallback &&
                ((d = [gl]),
                (i[0] = Je((C) => ((s[0] = C), n.fallback()))),
                (l = 1));
          else if (l === 0) {
            for (i = new Array(u), m = 0; m < u; m++)
              (d[m] = c[m]), (i[m] = Je(h));
            l = u;
          } else {
            for (
              x = new Array(u),
                A = new Array(u),
                o && (y = new Array(u)),
                S = 0,
                w = Math.min(l, u);
              S < w && d[S] === c[S];
              S++
            );
            for (
              w = l - 1, g = u - 1;
              w >= S && g >= S && d[w] === c[g];
              w--, g--
            )
              (x[g] = i[w]), (A[g] = s[w]), o && (y[g] = o[w]);
            for (T = new Map(), N = new Array(g + 1), m = g; m >= S; m--)
              (b = c[m]),
                (p = T.get(b)),
                (N[m] = p === void 0 ? -1 : p),
                T.set(b, m);
            for (p = S; p <= w; p++)
              (b = d[p]),
                (m = T.get(b)),
                m !== void 0 && m !== -1
                  ? ((x[m] = i[p]),
                    (A[m] = s[p]),
                    o && (y[m] = o[p]),
                    (m = N[m]),
                    T.set(b, m))
                  : s[p]();
            for (m = S; m < u; m++)
              m in x
                ? ((i[m] = x[m]), (s[m] = A[m]), o && ((o[m] = y[m]), o[m](m)))
                : (i[m] = Je(h));
            (i = i.slice(0, (l = u))), (d = c.slice(0));
          }
          return i;
        })
      );
      function h(T) {
        if (((s[m] = T), o)) {
          const [N, x] = P(m);
          return (o[m] = x), t(c[m], N);
        }
        return t(c[m]);
      }
    }
  );
}
function a(e, t) {
  return qe(() => e(t || {}));
}
const bl = (e) => `Stale read from <${e}>.`;
function pe(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return ce(vl(() => e.each, e.children, t || void 0));
}
function se(e) {
  const t = e.keyed,
    n = ce(() => e.when, void 0, void 0),
    d = t ? n : ce(n, void 0, { equals: (i, s) => !i == !s });
  return ce(
    () => {
      const i = d();
      if (i) {
        const s = e.children;
        return typeof s == "function" && s.length > 0
          ? qe(() =>
              s(
                t
                  ? i
                  : () => {
                      if (!qe(d)) throw bl("Show");
                      return n();
                    }
              )
            )
          : s;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function xl(e, t, n) {
  let d = n.length,
    i = t.length,
    s = d,
    l = 0,
    o = 0,
    c = t[i - 1].nextSibling,
    u = null;
  for (; l < i || o < s; ) {
    if (t[l] === n[o]) {
      l++, o++;
      continue;
    }
    for (; t[i - 1] === n[s - 1]; ) i--, s--;
    if (i === l) {
      const p = s < d ? (o ? n[o - 1].nextSibling : n[s - o]) : c;
      for (; o < s; ) e.insertBefore(n[o++], p);
    } else if (s === o)
      for (; l < i; ) (!u || !u.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === n[s - 1] && n[o] === t[i - 1]) {
      const p = t[--i].nextSibling;
      e.insertBefore(n[o++], t[l++].nextSibling),
        e.insertBefore(n[--s], p),
        (t[i] = n[s]);
    } else {
      if (!u) {
        u = new Map();
        let m = o;
        for (; m < s; ) u.set(n[m], m++);
      }
      const p = u.get(t[l]);
      if (p != null)
        if (o < p && p < s) {
          let m = l,
            h = 1,
            T;
          for (
            ;
            ++m < i && m < s && !((T = u.get(t[m])) == null || T !== p + h);

          )
            h++;
          if (h > p - o) {
            const N = t[l];
            for (; o < p; ) e.insertBefore(n[o++], N);
          } else e.replaceChild(n[o++], t[l++]);
        } else l++;
      else t[l++].remove();
    }
  }
}
const zn = "_$DX_DELEGATE";
function yl(e, t, n, d = {}) {
  let i;
  return (
    Je((s) => {
      (i = s),
        t === document ? e() : r(t, e(), t.firstChild ? null : void 0, n);
    }, d.owner),
    () => {
      i(), (t.textContent = "");
    }
  );
}
function D(e, t, n, d) {
  let i;
  const s = () => {
      const o = document.createElement("template");
      return (o.innerHTML = e), o.content.firstChild;
    },
    l = () => (i || (i = s())).cloneNode(!0);
  return (l.cloneNode = l), l;
}
function be(e, t = window.document) {
  const n = t[zn] || (t[zn] = new Set());
  for (let d = 0, i = e.length; d < i; d++) {
    const s = e[d];
    n.has(s) || (n.add(s), t.addEventListener(s, wl));
  }
}
function ue(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function z(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Le(e, t, n, d) {
  Array.isArray(n)
    ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
    : (e[`$$${t}`] = n);
}
function Me(e, t, n = {}) {
  const d = Object.keys(t || {}),
    i = Object.keys(n);
  let s, l;
  for (s = 0, l = i.length; s < l; s++) {
    const o = i[s];
    !o || o === "undefined" || t[o] || (Wn(e, o, !1), delete n[o]);
  }
  for (s = 0, l = d.length; s < l; s++) {
    const o = d[s],
      c = !!t[o];
    !o || o === "undefined" || n[o] === c || !c || (Wn(e, o, !0), (n[o] = c));
  }
  return n;
}
function we(e, t, n) {
  return qe(() => e(t, n));
}
function r(e, t, n, d) {
  if ((n !== void 0 && !d && (d = []), typeof t != "function"))
    return Zt(e, t, d, n);
  Z((i) => Zt(e, t(), i, n), d);
}
function Wn(e, t, n) {
  const d = t.trim().split(/\s+/);
  for (let i = 0, s = d.length; i < s; i++) e.classList.toggle(d[i], n);
}
function wl(e) {
  let t = e.target;
  const n = `$$${e.type}`,
    d = e.target,
    i = e.currentTarget,
    s = (c) =>
      Object.defineProperty(e, "target", { configurable: !0, value: c }),
    l = () => {
      const c = t[n];
      if (c && !t.disabled) {
        const u = t[`${n}Data`];
        if ((u !== void 0 ? c.call(t, u, e) : c.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(e.target) &&
          s(t.host),
        !0
      );
    },
    o = () => {
      for (; l() && (t = t._$host || t.parentNode || t.host); );
    };
  if (
    (Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get() {
        return t || document;
      },
    }),
    e.composedPath)
  ) {
    const c = e.composedPath();
    s(c[0]);
    for (let u = 0; u < c.length - 2 && ((t = c[u]), !!l()); u++) {
      if (t._$host) {
        (t = t._$host), o();
        break;
      }
      if (t.parentNode === i) break;
    }
  } else o();
  s(d);
}
function Zt(e, t, n, d, i) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const s = typeof t,
    l = d !== void 0;
  if (
    ((e = (l && n[0] && n[0].parentNode) || e),
    s === "string" || s === "number")
  ) {
    if (s === "number" && ((t = t.toString()), t === n)) return n;
    if (l) {
      let o = n[0];
      o && o.nodeType === 3
        ? o.data !== t && (o.data = t)
        : (o = document.createTextNode(t)),
        (n = nt(e, n, d, o));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || s === "boolean") n = nt(e, n, d);
  else {
    if (s === "function")
      return (
        Z(() => {
          let o = t();
          for (; typeof o == "function"; ) o = o();
          n = Zt(e, o, n, d);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const o = [],
        c = n && Array.isArray(n);
      if (yn(o, t, n, i)) return Z(() => (n = Zt(e, o, n, d, !0))), () => n;
      if (o.length === 0) {
        if (((n = nt(e, n, d)), l)) return n;
      } else
        c
          ? n.length === 0
            ? Kn(e, o, d)
            : xl(e, n, o)
          : (n && nt(e), Kn(e, o));
      n = o;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (l) return (n = nt(e, n, d, t));
        nt(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function yn(e, t, n, d) {
  let i = !1;
  for (let s = 0, l = t.length; s < l; s++) {
    let o = t[s],
      c = n && n[e.length],
      u;
    if (!(o == null || o === !0 || o === !1))
      if ((u = typeof o) == "object" && o.nodeType) e.push(o);
      else if (Array.isArray(o)) i = yn(e, o, c) || i;
      else if (u === "function")
        if (d) {
          for (; typeof o == "function"; ) o = o();
          i =
            yn(e, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || i;
        } else e.push(o), (i = !0);
      else {
        const p = String(o);
        c && c.nodeType === 3 && c.data === p
          ? e.push(c)
          : e.push(document.createTextNode(p));
      }
  }
  return i;
}
function Kn(e, t, n = null) {
  for (let d = 0, i = t.length; d < i; d++) e.insertBefore(t[d], n);
}
function nt(e, t, n, d) {
  if (n === void 0) return (e.textContent = "");
  const i = d || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const o = t[l];
      if (i !== o) {
        const c = o.parentNode === e;
        !s && !l
          ? c
            ? e.replaceChild(i, o)
            : e.insertBefore(i, n)
          : c && o.remove();
      } else s = !0;
    }
  } else e.insertBefore(i, n);
  return [i];
}
const $l = "http://www.w3.org/2000/svg";
function _l(e, t = !1) {
  return t ? document.createElementNS($l, e) : document.createElement(e);
}
function Tl(e) {
  const { useShadow: t } = e,
    n = document.createTextNode(""),
    d = () => e.mount || document.body,
    i = al();
  let s;
  return (
    $e(
      () => {
        s || (s = sl(i, () => ce(() => e.children)));
        const l = d();
        if (l instanceof HTMLHeadElement) {
          const [o, c] = P(!1),
            u = () => c(!0);
          Je((p) => r(l, () => (o() ? p() : s()), null)), Ae(u);
        } else {
          const o = _l(e.isSVG ? "g" : "div", e.isSVG),
            c = t && o.attachShadow ? o.attachShadow({ mode: "open" }) : o;
          Object.defineProperty(o, "_$host", {
            get() {
              return n.parentNode;
            },
            configurable: !0,
          }),
            r(c, s),
            l.appendChild(o),
            e.ref && e.ref(o),
            Ae(() => l.removeChild(o));
        }
      },
      void 0,
      { render: !0 }
    ),
    n
  );
}
const Cl = "_draggable_q87cm_71",
  Il = "_dragging_q87cm_79",
  Sl = "_selection_q87cm_87",
  El = "_testWorkFlow_q87cm_245",
  Ol = "_loader_q87cm_273",
  Dl = "_testButton_q87cm_315",
  kl = "_zoomControl_q87cm_337",
  Nl = "_zoomFit_q87cm_355",
  Al = "_zoomIn_q87cm_409",
  Pl = "_zoomOut_q87cm_461",
  Vl = "_zoomReset_q87cm_513",
  Ml = "_zoomResetHide_q87cm_565",
  ke = {
    "dot-flow__pane": "_dot-flow__pane_q87cm_63",
    draggable: Cl,
    dragging: Il,
    selection: Sl,
    "dot-flow__viewport": "_dot-flow__viewport_q87cm_97",
    "dot-flow__background": "_dot-flow__background_q87cm_127",
    testWorkFlow: El,
    loader: Ol,
    testButton: Dl,
    zoomControl: kl,
    zoomFit: Nl,
    zoomIn: Al,
    zoomOut: Pl,
    zoomReset: Vl,
    zoomResetHide: Ml,
  },
  [Eo, Oo] = P(!1),
  [Do, ko] = P(!1),
  [No, Ao] = P(!1),
  [Po, Vo] = P(1),
  [Mo, Lo] = P([]),
  [Fo, Bo] = P(null),
  [Ro, qo] = P([]),
  [Ho, jo] = P(0);
let [zo, Wo] = P(!1),
  Ko;
const [Uo, Go] = P({ x: 0, y: 0 }),
  [Xo, Yo] = P({ x: 0, y: 0 }),
  [Jo, Zo] = P([]),
  [Qo, er] = P({ x: 0, y: 0 }),
  [tr, nr] = P(null),
  [or, rr] = P(null),
  [lr, ir] = P(null),
  [ar, sr] = P(!1),
  [dr, cr] = P({ x: 0, y: 0 }),
  [ur, pr] = P(!1),
  [mr, hr] = P(!1),
  [fr, gr] = P(!1),
  [vr, br] = P(!1),
  [xr, yr] = P(""),
  [wr, $r] = P(null),
  [_r, Tr] = P({ name: "", id: "", title: "" }),
  [Cr, Ir] = P({ name: "", id: "", title: "" }),
  [Sr, Er] = P([]),
  [Or, Dr] = P(null),
  [kr, Nr] = P({}),
  Ar = dl({
    scale: Po,
    setScale: Vo,
    draggable: Eo,
    setDraggable: Oo,
    isCtrlPressed: Do,
    setIsCtrlPressed: ko,
    isSpacePressed: No,
    setIsSpacePressed: Ao,
    edges: Mo,
    setEdges: Lo,
    newEdge: Fo,
    setNewEdge: Bo,
    busyIndex: Ro,
    setBusyIndex: qo,
    edgeLength: Ho,
    setEdgeLength: jo,
    isOpen: zo,
    setIsOpen: Wo,
    inputRef: Ko,
    edgeEnd: Uo,
    setEdgeEnd: Go,
    transform: Xo,
    setTransform: Yo,
    nodes: Jo,
    setNodes: Zo,
    preTransform: Qo,
    setPreTransform: er,
    selectedNode: tr,
    setSelectedNode: nr,
    pendingOutput: or,
    setPendingOutput: rr,
    lastClickPosition: lr,
    setLastClickPosition: ir,
    isShowModal: ar,
    setIsShowModal: sr,
    positionButton: dr,
    setPositionButton: cr,
    isOpening: ur,
    setIsOpening: pr,
    isModalOpen: mr,
    setIsModalOpen: hr,
    typeOfVertex: xr,
    setTypeOfVertex: yr,
    currentFormConfig: _r,
    setCurrentFormConfig: Tr,
    previousFormConfig: Cr,
    setPreviousFormConfig: Ir,
    isModalOpen2: fr,
    setIsModalOpen2: gr,
    isModalOpen3: vr,
    setIsModalOpen3: br,
    credentialOptions: Sr,
    setCredentialOptions: Er,
    selectedCredential: Or,
    setSelectedCredential: Dr,
    formData: kr,
    setFormData: Nr,
    settingConfig: wr,
    setSettingConfig: $r,
  }),
  fe = () => {
    const e = cl(Ar);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var Ll = D(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const Fl = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: n,
    setIsCtrlPressed: d,
    setIsSpacePressed: i,
    isCtrlPressed: s,
    isSpacePressed: l,
    scale: o,
    setScale: c,
    nodes: u,
    setTransform: p,
    setPreTransform: m,
    transform: h,
  } = fe();
  Oe(() => {
    const A = document.getElementById("pane"),
      y = (w) => {
        w.ctrlKey || (n(!1), d(!1)),
          (w.code === "Space" || w.key === " ") &&
            !(w.target instanceof HTMLInputElement) &&
            (w.preventDefault(), i(!1), n(!1));
      },
      S = (w) => {
        w.ctrlKey && (n(!0), d(!0)),
          (w.code === "Space" || w.key === " ") &&
            !(w.target instanceof HTMLInputElement) &&
            (w.preventDefault(), i(!0), n(!0));
      };
    if (A) {
      const w = (g) => {
        g.preventDefault(),
          s() || l()
            ? (console.log("good"),
              x(g, () => o() + g.deltaY * -1e-4, "cursor"))
            : g.shiftKey
            ? p((b) => ({ x: b.x - g.deltaY * 0.5, y: b.y }))
            : p((b) => ({ x: b.x, y: b.y - g.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", y),
        document.addEventListener("keydown", S),
        A.addEventListener("wheel", w, { passive: !1 }),
        Ae(() => {
          document.removeEventListener("keydown", S),
            document.removeEventListener("keyup", y),
            A.removeEventListener("wheel", w);
        });
    }
  });
  function T(A) {
    if (A.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const y = Math.min(...A.map((b) => b.currPosition.get().x)),
      S = Math.min(...A.map((b) => b.currPosition.get().y)),
      w = Math.max(
        ...A.map((b) => {
          const C = document.getElementById(b.id);
          return C
            ? b.currPosition.get().x + C.clientWidth
            : b.currPosition.get().x;
        })
      ),
      g = Math.max(
        ...A.map((b) => {
          const C = document.getElementById(b.id);
          return C
            ? b.currPosition.get().y + C.clientHeight
            : b.currPosition.get().y;
        })
      );
    return { minX: y, minY: S, width: w - y, height: g - S };
  }
  function N() {
    const A = document.getElementById("pane");
    if (!A) return;
    const y = T(u());
    if (!y) return;
    const S = 80,
      w = A.getBoundingClientRect(),
      g = w.width - S * 2,
      b = w.height - S * 2,
      C = g / y.width,
      R = b / y.height,
      v = Math.min(C, R, 1),
      f = y.minX + y.width / 2,
      k = y.minY + y.height / 2,
      $ = w.width / 2 - f * v,
      E = w.height / 2 - k * v;
    c(v), p({ x: $, y: E }), m({ x: $, y: E });
  }
  const x = (A, y, S = "cursor") => {
    const w = document.getElementById("pane");
    if (!w) return;
    A.preventDefault();
    const g = w.getBoundingClientRect(),
      b = S === "cursor" ? A.clientX - g.left : g.width / 2,
      C = S === "cursor" ? A.clientY - g.top : g.height / 2,
      R = o(),
      v = Math.min(Math.max(e, y()), t),
      f = (b - h().x) / R,
      k = (C - h().y) / R,
      $ = b - f * v,
      E = C - k * v;
    c(v), p({ x: $, y: E }), m({ x: $, y: E });
  };
  return (() => {
    var A = Ll(),
      y = A.firstChild,
      S = y.nextSibling,
      w = S.nextSibling,
      g = w.nextSibling;
    return (
      (y.$$click = () => N()),
      (S.$$click = (b) => x(b, () => o() + 0.01, "center")),
      (w.$$click = (b) => x(b, () => Math.max(0, o() - 0.01), "center")),
      (g.$$click = (b) =>
        x(b, () => (c(1), p({ x: 0, y: 0 }), m({ x: 0, y: 0 }), 1), "center")),
      Z(
        (b) => {
          var C = ke.zoomControl,
            R = ke.zoomFit,
            v = ke.zoomIn,
            f = ke.zoomOut,
            k = o() > 1 || o() < 1 ? ke.zoomReset : ke.zoomResetHide;
          return (
            C !== b.e && z(A, (b.e = C)),
            R !== b.t && z(y, (b.t = R)),
            v !== b.a && z(S, (b.a = v)),
            f !== b.o && z(w, (b.o = f)),
            k !== b.i && z(g, (b.i = k)),
            b
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      A
    );
  })();
};
be(["click"]);
const Bl = "_sidebarMain_dxkxu_1",
  Rl = "_addNode_dxkxu_11",
  ql = "_sidebarContent_dxkxu_71",
  Hl = "_nodeList_dxkxu_99",
  jl = "_sidebarContentShow_dxkxu_113",
  zl = "_sidebarContentHide_dxkxu_123",
  Wl = "_sidebarTitle_dxkxu_135",
  Kl = "_searchContainer_dxkxu_153",
  Ul = "_inputFieldContainer_dxkxu_161",
  Gl = "_inputField_dxkxu_161",
  Xl = "_searchIcon_dxkxu_211",
  Yl = "_firstWrapper_dxkxu_229",
  Jl = "_restNodeWrapper_dxkxu_251",
  Zl = "_node_dxkxu_99",
  Ql = "_nodeIcon_dxkxu_299",
  ei = "_title_dxkxu_311",
  ti = "_description_dxkxu_325",
  De = {
    sidebarMain: Bl,
    addNode: Rl,
    sidebarContent: ql,
    nodeList: Hl,
    sidebarContentShow: jl,
    sidebarContentHide: zl,
    sidebarTitle: Wl,
    searchContainer: Kl,
    inputFieldContainer: Ul,
    inputField: Gl,
    searchIcon: Xl,
    firstWrapper: Yl,
    restNodeWrapper: Jl,
    node: Zl,
    nodeIcon: Ql,
    title: ei,
    description: ti,
  };
var ni = D(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  oi = D("<div><div><div></div><div><div></div><div>");
const ri = (e) => {
  const { isOpen: t, setIsOpen: n } = fe();
  let d;
  const i = (l) => {
    const o = document.getElementById("sidebar-main"),
      c = document.querySelectorAll('[id^="output-"]');
    let u = !1;
    c.forEach((p) => {
      p.contains(l.target) && (u = !0);
    }),
      o && !o.contains(l.target) && !u && n(!1);
  };
  Oe(() => {
    document.addEventListener("click", i);
  });
  const s = (l, o) => {
    l.stopPropagation(), e.onClickAdd(o);
  };
  return (() => {
    var l = ni(),
      o = l.firstChild,
      c = o.nextSibling,
      u = c.firstChild,
      p = u.nextSibling,
      m = p.firstChild,
      h = m.firstChild,
      T = h.nextSibling,
      N = p.nextSibling;
    return (
      (o.$$click = (x) => {
        x.stopPropagation(), n(!0), d && d.focus();
      }),
      we((x) => (d = x), T),
      r(
        N,
        a(pe, {
          get each() {
            return e.nodeMark;
          },
          children: (x, A) =>
            (() => {
              var y = oi(),
                S = y.firstChild,
                w = S.firstChild,
                g = w.nextSibling,
                b = g.firstChild,
                C = b.nextSibling;
              return (
                (y.$$click = (R) => {
                  R.stopPropagation(), s(R, x.name);
                }),
                r(w, a(x.icon, {})),
                r(b, () => x.title),
                r(C, () => x.description),
                Z(
                  (R) => {
                    var v = A() == 0 ? De.firstWrapper : De.restNodeWrapper,
                      f = De.node,
                      k = De.nodeIcon,
                      $ = De.title,
                      E = De.description;
                    return (
                      v !== R.e && z(y, (R.e = v)),
                      f !== R.t && z(S, (R.t = f)),
                      k !== R.a && z(w, (R.a = k)),
                      $ !== R.o && z(b, (R.o = $)),
                      E !== R.i && z(C, (R.i = E)),
                      R
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
                ),
                y
              );
            })(),
        })
      ),
      Z(
        (x) => {
          var A = De.sidebarMain,
            y = De.addNode,
            S = {
              [De.sidebarContent]: !0,
              [De.sidebarContentShow]: t(),
              [De.sidebarContentHide]: !t(),
            },
            w = De.sidebarTitle,
            g = De.searchContainer,
            b = De.inputFieldContainer,
            C = De.searchIcon,
            R = De.inputField,
            v = De.nodeList;
          return (
            A !== x.e && z(l, (x.e = A)),
            y !== x.t && z(o, (x.t = y)),
            (x.a = Me(c, S, x.a)),
            w !== x.o && z(u, (x.o = w)),
            g !== x.i && z(p, (x.i = g)),
            b !== x.n && z(m, (x.n = b)),
            C !== x.s && z(h, (x.s = C)),
            R !== x.h && z(T, (x.h = R)),
            v !== x.r && z(N, (x.r = v)),
            x
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      l
    );
  })();
};
be(["click"]);
const li = "_node_xsk2j_1",
  ii = "_nodeSelected_xsk2j_35",
  ai = "_inputsWrapper_xsk2j_69",
  si = "_input_xsk2j_69",
  di = "_inputsUPWrapper_xsk2j_113",
  ci = "_inputUp_xsk2j_143",
  ui = "_outputsDownWrapper_xsk2j_169",
  pi = "_outputDown_xsk2j_195",
  mi = "_outputDownVertex_xsk2j_207",
  hi = "_downOutputLine_xsk2j_225",
  fi = "_downPlusLine_xsk2j_241",
  gi = "_outputsWrapper_xsk2j_275",
  vi = "_output_xsk2j_169",
  bi = "_outputCircle_xsk2j_325",
  xi = "_outputLine_xsk2j_351",
  yi = "_plusLine_xsk2j_367",
  wi = "_vertexNum_xsk2j_387",
  $i = "_plusLineHidden_xsk2j_453",
  _i = "_outputPlus_xsk2j_463",
  Ti = "_functionWrapper_xsk2j_555",
  xe = {
    node: li,
    nodeSelected: ii,
    inputsWrapper: ai,
    input: si,
    inputsUPWrapper: di,
    inputUp: ci,
    outputsDownWrapper: ui,
    outputDown: pi,
    outputDownVertex: mi,
    downOutputLine: hi,
    downPlusLine: fi,
    outputsWrapper: gi,
    output: vi,
    outputCircle: bi,
    outputLine: xi,
    plusLine: yi,
    vertexNum: wi,
    plusLineHidden: $i,
    outputPlus: _i,
    function: "_function_xsk2j_521",
    functionWrapper: Ti,
  };
var Ci = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const wn = (e) => Ci();
var He = D("<div>"),
  Un = D("<div><div>"),
  Gn = D("<div><div></div><div><div></div><div id=plus>");
const Ii = (e) => {
  const { newEdge: t, edgeLength: n, setIsOpen: d, setPendingOutput: i } = fe();
  function s(c, u) {
    const { left: p, right: m, top: h, bottom: T } = c.getBoundingClientRect(),
      N = p + Math.abs(p - m) / 2,
      x = h + Math.abs(h - T) / 2;
    e.onMouseEnterInput(N, x, e.id, u);
  }
  function l(c) {
    e.onMouseLeaveInput(e.id, c);
  }
  function o(c, u, p, m, h) {
    u.stopPropagation();
    const { left: T, right: N, top: x, bottom: A } = c.getBoundingClientRect(),
      y = T + Math.abs(T - N) / 2,
      S = x + Math.abs(x - A) / 2;
    e.onMouseDownOutput(y, S, e.id, p, m, h);
  }
  return (() => {
    var c = He();
    return (
      r(
        c,
        (() => {
          var u = ce(() => !!e.isInputVertex);
          return () =>
            u()
              ? (() => {
                  var p = He();
                  return (
                    r(
                      p,
                      a(pe, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (m, h) => {
                          let T = null;
                          return (() => {
                            var N = Un(),
                              x = N.firstChild;
                            N.addEventListener("mouseleave", () => l(h())),
                              N.addEventListener("mouseenter", () => s(T, h())),
                              ue(N, "id", `input-${m}`);
                            var A = T;
                            return (
                              typeof A == "function" ? we(A, x) : (T = x),
                              ue(x, "id", m),
                              Z(() => z(x, xe.input)),
                              N
                            );
                          })();
                        },
                      })
                    ),
                    Z(() => z(p, xe.inputsWrapper)),
                    p
                  );
                })()
              : He();
        })(),
        null
      ),
      r(
        c,
        (() => {
          var u = ce(() => !!e.isOutputVertex);
          return () =>
            u() &&
            (() => {
              var p = He();
              return (
                r(
                  p,
                  a(pe, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (m, h) => {
                      let T = null;
                      return (() => {
                        var N = Gn(),
                          x = N.firstChild,
                          A = x.nextSibling,
                          y = A.firstChild,
                          S = y.nextSibling;
                        (N.$$mousedown = (g) => o(T, g, h(), m, "solid")),
                          (N.$$click = (g) => {
                            g.stopPropagation(),
                              d(!0),
                              i({ nodeId: e.id, outputVertexIndex: h() });
                          }),
                          ue(N, "id", `output-${m}`);
                        var w = T;
                        return (
                          typeof w == "function" ? we(w, x) : (T = x),
                          ue(x, "id", m),
                          r(
                            A,
                            (() => {
                              var g = ce(() => e.numberOutputs > 1);
                              return () =>
                                g() &&
                                (() => {
                                  var b = He();
                                  return (
                                    r(b, h), Z(() => z(b, xe.vertexNum)), b
                                  );
                                })();
                            })(),
                            y
                          ),
                          r(S, a(wn, {})),
                          Z(
                            (g) => {
                              var b = xe.output,
                                C = xe.outputCircle,
                                R = {
                                  [xe.plusLine]: !0,
                                  [xe.plusLineHidden]:
                                    (t()?.outputVertexId == m && n() > 10) ||
                                    e.busyIndex.get().includes(m),
                                },
                                v = xe.outputLine,
                                f = xe.outputPlus;
                              return (
                                b !== g.e && z(N, (g.e = b)),
                                C !== g.t && z(x, (g.t = C)),
                                (g.a = Me(A, R, g.a)),
                                v !== g.o && z(y, (g.o = v)),
                                f !== g.i && z(S, (g.i = f)),
                                g
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                            }
                          ),
                          N
                        );
                      })();
                    },
                  })
                ),
                Z(() => z(p, xe.outputsWrapper)),
                p
              );
            })();
        })(),
        null
      ),
      r(
        c,
        (() => {
          var u = ce(() => !!e.isDownVertex);
          return () =>
            u() &&
            (() => {
              var p = He();
              return (
                r(
                  p,
                  a(pe, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (m, h) => {
                      let T = null;
                      return (() => {
                        var N = Gn(),
                          x = N.firstChild,
                          A = x.nextSibling,
                          y = A.firstChild,
                          S = y.nextSibling;
                        (N.$$mousedown = (g) => o(T, g, h(), m, "dash")),
                          (N.$$click = (g) => {
                            g.stopPropagation(),
                              d(!0),
                              i({ nodeId: e.id, outputVertexIndex: h() });
                          }),
                          ue(N, "id", `output-${m}`);
                        var w = T;
                        return (
                          typeof w == "function" ? we(w, x) : (T = x),
                          ue(x, "id", m),
                          r(S, a(wn, {})),
                          Z(
                            (g) => {
                              var b = xe.outputDown,
                                C = xe.outputDownVertex,
                                R = { [xe.downPlusLine]: !0 },
                                v = xe.downOutputLine,
                                f = xe.outputPlus;
                              return (
                                b !== g.e && z(N, (g.e = b)),
                                C !== g.t && z(x, (g.t = C)),
                                (g.a = Me(A, R, g.a)),
                                v !== g.o && z(y, (g.o = v)),
                                f !== g.i && z(S, (g.i = f)),
                                g
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                            }
                          ),
                          N
                        );
                      })();
                    },
                  })
                ),
                Z(() => z(p, `${xe.outputsDownWrapper} `)),
                p
              );
            })();
        })(),
        null
      ),
      r(
        c,
        (() => {
          var u = ce(() => !!e.isUpVertex);
          return () =>
            u()
              ? (() => {
                  var p = He();
                  return (
                    r(
                      p,
                      a(pe, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (m, h) => {
                          let T = null;
                          return (() => {
                            var N = Un(),
                              x = N.firstChild;
                            N.addEventListener("mouseleave", () => l(h())),
                              N.addEventListener("mouseenter", () => s(T, h())),
                              ue(N, "id", `input-${m}`);
                            var A = T;
                            return (
                              typeof A == "function" ? we(A, x) : (T = x),
                              ue(x, "id", m),
                              Z(() => z(x, xe.inputUp)),
                              N
                            );
                          })();
                        },
                      })
                    ),
                    Z(() => z(p, xe.inputsUPWrapper)),
                    p
                  );
                })()
              : He();
        })(),
        null
      ),
      c
    );
  })();
};
be(["click", "mousedown"]);
var Si = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const Ei = (e) => Si();
var Oi = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const Di = (e) => Oi();
var ki = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const Ni = (e) => ki();
var Ai = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const Pi = (e) => Ai(),
  Vi = {
    chat: { parameters: [], settings: [] },
    filter: { parameters: [], settings: [] },
    "pg-vector": { parameters: [], settings: [] },
    "ollama-chat": { parameters: [], settings: [] },
    "gmail-trigger": { parameters: [], settings: [] },
    "create-draft": { parameters: [], settings: [] },
    embedding: { parameters: [], settings: [] },
    edit: {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Always output data",
          tooltipText:
            "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
        },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
    switch: {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
    "ai-agent": {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Always output data",
          tooltipText:
            "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
        },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
    "vector-store": { parameters: [], settings: [] },
    "send-email": {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Always output data",
          tooltipText:
            "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
        },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
  };
var Mi = D(
    "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
  ),
  Xn = D("<div>"),
  Li = D("<div><div></div><div><div></div><div id=plus>");
const Fi = (e) => {
  const {
    setIsModalOpen: t,
    setCurrentFormConfig: n,
    setSettingConfig: d,
    currentFormConfig: i,
    setIsOpen: s,
    setPendingOutput: l,
    newEdge: o,
    edgeLength: c,
  } = fe();
  function u(p, m, h, T, N) {
    m.stopPropagation();
    const { left: x, right: A, top: y, bottom: S } = p.getBoundingClientRect(),
      w = x + Math.abs(x - A) / 2,
      g = y + Math.abs(y - S) / 2;
    e.onMouseDownOutput(w, g, e.id, h, T, N);
  }
  return (() => {
    var p = Mi(),
      m = p.firstChild,
      h = m.firstChild,
      T = h.firstChild,
      N = T.nextSibling,
      x = N.nextSibling,
      A = x.nextSibling,
      y = m.nextSibling;
    return (
      we((S) => S, p),
      (p.$$pointerdown = (S) => {
        S.stopPropagation(), e.onMouseDownNode(S, e.id);
      }),
      (p.$$dblclick = () => {
        t(!0),
          console.log(e.name),
          n({ name: e.name, id: e.id, title: e.title }),
          console.log(i()),
          d(Vi[e.name]);
      }),
      (T.$$click = (S) => S.stopPropagation()),
      r(T, a(Ei, {})),
      (N.$$click = (S) => S.stopPropagation()),
      r(N, a(Di, {})),
      (x.$$pointerdown = (S) => {
        S.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      r(x, a(Ni, {})),
      (A.$$click = (S) => S.stopPropagation()),
      r(A, a(Pi, {})),
      r(
        y,
        a(e.content, {
          get selected() {
            return e.selected;
          },
          get title() {
            return e.title;
          },
        })
      ),
      r(
        p,
        a(Ii, {
          get id() {
            return e.id;
          },
          get name() {
            return e.name;
          },
          get numberInputs() {
            return e.numberInputs;
          },
          numberOutputs: 0,
          get isInputVertex() {
            return e.isInputVertex;
          },
          isOutputVertex: !1,
          get inputVertexIds() {
            return e.inputVertexIds;
          },
          get outputVertexIds() {
            return e.outputVertexIds;
          },
          get isDownVertex() {
            return e.isDownVertex;
          },
          get isUpVertex() {
            return e.isUpVertex;
          },
          get downVertexNumber() {
            return e.downVertexNumber;
          },
          get upVertexNumber() {
            return e.upVertexNumber;
          },
          get downVertexIds() {
            return e.downVertexIds;
          },
          get upVertexIds() {
            return e.upVertexIds;
          },
          get downVertexOrientation() {
            return e.downVertexOrientation;
          },
          get busyIndex() {
            return e.busyIndex;
          },
          get onMouseDownOutput() {
            return e.onMouseDownOutput;
          },
          get onMouseEnterInput() {
            return e.onMouseEnterInput;
          },
          get onMouseLeaveInput() {
            return e.onMouseLeaveInput;
          },
        }),
        null
      ),
      r(
        p,
        (() => {
          var S = ce(() => !!e.isOutputVertex);
          return () =>
            S() &&
            (() => {
              var w = Xn();
              return (
                r(
                  w,
                  a(pe, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (g, b) => {
                      let C = null;
                      return (() => {
                        var R = Li(),
                          v = R.firstChild,
                          f = v.nextSibling,
                          k = f.firstChild,
                          $ = k.nextSibling;
                        (R.$$mousedown = (_) => u(C, _, b(), g, "solid")),
                          (R.$$click = (_) => {
                            _.stopPropagation(),
                              s(!0),
                              l({ nodeId: e.id, outputVertexIndex: b() });
                          }),
                          ue(R, "id", `output-${g}`);
                        var E = C;
                        return (
                          typeof E == "function" ? we(E, v) : (C = v),
                          ue(v, "id", g),
                          r(
                            f,
                            (() => {
                              var _ = ce(() => e.numberOutputs > 1);
                              return () =>
                                _() &&
                                (() => {
                                  var L = Xn();
                                  return (
                                    r(L, b), Z(() => z(L, xe.vertexNum)), L
                                  );
                                })();
                            })(),
                            k
                          ),
                          r($, a(wn, {})),
                          Z(
                            (_) => {
                              var L = xe.output,
                                j = xe.outputCircle,
                                H = {
                                  [xe.plusLine]: !0,
                                  [xe.plusLineHidden]:
                                    (o()?.outputVertexId == g && c() > 10) ||
                                    e.busyIndex.get().includes(g),
                                },
                                J = xe.outputLine,
                                te = xe.outputPlus;
                              return (
                                L !== _.e && z(R, (_.e = L)),
                                j !== _.t && z(v, (_.t = j)),
                                (_.a = Me(f, H, _.a)),
                                J !== _.o && z(k, (_.o = J)),
                                te !== _.i && z($, (_.i = te)),
                                _
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                            }
                          ),
                          R
                        );
                      })();
                    },
                  })
                ),
                Z(() => z(w, xe.outputsWrapper)),
                w
              );
            })();
        })(),
        null
      ),
      Z(
        (S) => {
          var w = e.id,
            g = e.selected ? xe.nodeSelected : xe.node,
            b = `translate(${e.x}px, ${e.y}px)`,
            C = xe.functionWrapper,
            R = xe.function;
          return (
            w !== S.e && ue(p, "id", (S.e = w)),
            g !== S.t && z(p, (S.t = g)),
            b !== S.a &&
              ((S.a = b) != null
                ? p.style.setProperty("transform", b)
                : p.style.removeProperty("transform")),
            C !== S.o && z(m, (S.o = C)),
            R !== S.i && z(h, (S.i = R)),
            S
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      p
    );
  })();
};
be(["dblclick", "pointerdown", "click", "mousedown"]);
const Bi = "_wrapper_gp6p5_1",
  Ri = "_edge_gp6p5_29",
  qi = "_hitArea_gp6p5_61",
  Hi = "_edgeDash_gp6p5_91",
  ji = "_deleteHidden_gp6p5_111",
  zi = "_icon_gp6p5_125",
  Wi = "_circle_gp6p5_139",
  Ki = "_edgeSelected_gp6p5_177",
  Ui = "_edgeNew_gp6p5_81",
  Ve = {
    wrapper: Bi,
    edge: Ri,
    delete: "_delete_gp6p5_43",
    hitArea: qi,
    edgeDash: Hi,
    deleteHidden: ji,
    icon: zi,
    circle: Wi,
    edgeSelected: Ki,
    edgeNew: Ui,
  };
var Gi = D(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path fill=none stroke=transparent stroke-width=40 style=pointer-events:stroke;></path><path fill=none marker-end=url(#arrowhead) style=pointer-events:none;></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const Yn = (e) => {
  const [t, n] = P({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    [d, i] = P(0);
  $e(() => {
    const u = e.position.x0,
      p = e.position.y0,
      m = e.position.x1,
      h = e.position.y1,
      T = m - u,
      N =
        e.typeOfEdge !== "dash" &&
        ((e.isNew && e.edgeLength() > 40 && T < 40) || (!e.isNew && T < 40));
    let x, A;
    if (N) {
      const y = u + 40,
        S = m - 40,
        w = 120;
      (x = (y + S) / 2), (A = p + w);
    } else (x = u + (m - u) / 2), (A = p + (h - p) / 2);
    n({ x, y: A });
  });
  const s = (u) => {
      u.stopPropagation(), e.onMouseDownEdge();
    },
    l = (u) => {
      u.stopPropagation(), e.onClickDeleteEdge();
    },
    o = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    c = (u, p, m, h) => {
      const N = u + 40,
        x = m - 40,
        A = m - u;
      i(A);
      const y = h - p,
        S = 120,
        w = 105,
        g = o();
      function b() {
        return y > 105 && y < 135 ? 0 : 10;
      }
      function C() {
        return `
      M ${u} ${p}
      L ${N - 10} ${p}
      Q ${N} ${p} ${N} ${p + 10}
  
      L ${N} ${p + S - 10}
      Q ${N} ${p + S} ${N - 10} ${p + S}
  
      L ${x + 10} ${p + S}
      Q ${x} ${p + S} ${x} ${y > w ? p + S + b() : p + S - b()}
  
      L ${x} ${y > w ? h - b() : h + b()}
      Q ${x} ${h} ${x + 10} ${h}
  
      L ${m} ${h}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${u} ${p} C ${u} ${p + g}, ${m} ${h - g}, ${m} ${h}`
        : (e.isNew && e.edgeLength() > 40 && A < 40) || (!e.isNew && A < 40)
        ? C()
        : `M ${u} ${p} C ${u + g} ${p}, ${m - g} ${h}, ${m} ${h}`;
    };
  return (() => {
    var u = Gi(),
      p = u.firstChild,
      m = p.nextSibling,
      h = m.nextSibling,
      T = h.nextSibling,
      N = T.firstChild,
      x = N.nextSibling;
    return (
      (h.$$mousedown = s),
      (T.$$mousedown = l),
      Z(
        (A) => {
          var y = Ve.wrapper,
            S = Ve.hitArea,
            w = c(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            g = `${e.isNew ? Ve.edgeNew : Ve.edge} ${
              e.typeOfEdge == "dash" ? Ve.edgeDash : ""
            } ${e.selected ? Ve.edgeSelected : ""}`,
            b = c(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            C = e.isNew ? Ve.deleteHidden : Ve.delete,
            R = `translate(${t().x}, ${t().y})`,
            v = Ve.circle,
            f = Ve.icon;
          return (
            y !== A.e && ue(u, "class", (A.e = y)),
            S !== A.t && ue(m, "class", (A.t = S)),
            w !== A.a && ue(m, "d", (A.a = w)),
            g !== A.o && ue(h, "class", (A.o = g)),
            b !== A.i && ue(h, "d", (A.i = b)),
            C !== A.n && ue(T, "class", (A.n = C)),
            R !== A.s && ue(T, "transform", (A.s = R)),
            v !== A.h && ue(N, "class", (A.h = v)),
            f !== A.r && ue(x, "class", (A.r = f)),
            A
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      u
    );
  })();
};
be(["mousedown"]);
var Xi = D(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0">'
  ),
  Jn = D("<div>");
const Yi = () => {
  const [e, t] = P({ x: -1, y: -1 }),
    [n, d] = P(!1),
    {
      draggable: i,
      isCtrlPressed: s,
      isSpacePressed: l,
      scale: o,
      edges: c,
      newEdge: u,
      setEdges: p,
      setNewEdge: m,
      transform: h,
      setTransform: T,
      preTransform: N,
      setPreTransform: x,
      selectedNode: A,
      setSelectedNode: y,
      setLastClickPosition: S,
      setEdgeLength: w,
      nodes: g,
      setNodes: b,
    } = fe();
  $e(() => {});
  const [C, R] = P(null),
    [v, f] = P(null),
    [k, $] = P(null),
    [E, _] = P([]),
    [L, j] = P(null),
    [H, J] = P(null);
  Oe(() => {
    const F = (O) => {
        if (O.code === "Delete") {
          if (E() && A() === null)
            E().forEach((W) => {
              const V = g().find((Q) => Q.id === W);
              V && de(V.id);
            }),
              j(null);
          else if (A() !== null) {
            const W = g().find((V) => V.id === A());
            W && de(W.id);
          }
        }
      },
      M = (O) => {
        O.preventDefault();
      },
      B = document.getElementById("pane");
    B && B.addEventListener("wheel", M, { passive: !1 }),
      document.addEventListener("keydown", F),
      Ae(() => {
        document.removeEventListener("keydown", F),
          B && B.removeEventListener("wheel", M);
      });
  });
  function te(F) {
    const M = window.innerWidth,
      B = window.innerHeight;
    let O = 0,
      W = 0;
    const V = 60,
      Q = 10;
    if (
      (F.clientX < V ? (O = Q) : F.clientX > M - V && (O = -10),
      F.clientY < V ? (W = Q) : F.clientY > B - V && (W = -10),
      O !== 0 || W !== 0)
    ) {
      if (
        (T((U) => ({ x: U.x + O, y: U.y + W })),
        x((U) => ({ x: U.x + O, y: U.y + W })),
        L()
          ? t((U) => ({ x: U.x - O, y: U.y - W }))
          : t((U) => ({ x: U.x + O, y: U.y + W })),
        L())
      )
        j((U) => ({
          x: U.x - O / o(),
          y: U.y - W / o(),
          width: U.width,
          height: U.height,
        })),
          E().forEach((U) => {
            const X = g().find((oe) => oe.id === U);
            if (X) {
              const oe = X.currPosition.get();
              X.currPosition.set({ x: oe.x - O / o(), y: oe.y - W / o() }),
                X.inputEdgeIds.get().forEach((me) => {
                  const re = c().find((ge) => ge.id === me);
                  if (re) {
                    const ge = re.currEndPosition.get();
                    re.currEndPosition.set({
                      x: ge.x - O / o(),
                      y: ge.y - W / o(),
                    });
                  }
                }),
                X.outputEdgeIds.get().forEach((me) => {
                  const re = c().find((ge) => ge.id === me);
                  if (re) {
                    const ge = re.currStartPosition.get();
                    re.currStartPosition.set({
                      x: ge.x - O / o(),
                      y: ge.y - W / o(),
                    });
                  }
                });
            }
          });
      else if (A() !== null) {
        const U = g().find((X) => X.id === A());
        if (U) {
          const X = U.currPosition.get();
          U.currPosition.set({ x: X.x - O / o(), y: X.y - W / o() }),
            U.inputEdgeIds.get().forEach((oe) => {
              const me = c().find((re) => re.id === oe);
              if (me) {
                const re = me.currEndPosition.get();
                me.currEndPosition.set({
                  x: re.x - O / o(),
                  y: re.y - W / o(),
                });
              }
            }),
            U.outputEdgeIds.get().forEach((oe) => {
              const me = c().find((re) => re.id === oe);
              if (me) {
                const re = me.currStartPosition.get();
                me.currStartPosition.set({
                  x: re.x - O / o(),
                  y: re.y - W / o(),
                });
              }
            });
        }
      }
    }
  }
  const Y = (F) => {
      const M = s() || l(),
        B = F.x - e().x,
        O = F.y - e().y;
      if (k()) {
        const W = e(),
          V = F.clientX - W.x,
          Q = F.clientY - W.y;
        $({ x: W.x, y: W.y, width: V, height: Q });
        const U = {
            x: Math.min(W.x, F.clientX),
            y: Math.min(W.y, F.clientY),
            width: Math.abs(V),
            height: Math.abs(Q),
          },
          X = g().filter((oe) => {
            const me = document.getElementById(oe.id);
            if (!me) return !1;
            const re = oe.currPosition.get().x * o() + h().x,
              ge = oe.currPosition.get().y * o() + h().y,
              _e = me.offsetWidth,
              Ie = me.offsetHeight;
            return (
              re + _e > U.x &&
              re < U.x + U.width &&
              ge + Ie > U.y &&
              ge < U.y + U.height
            );
          });
        _(X.map((oe) => oe.id));
      }
      if (L() && H()) {
        const W = F.clientX - H().x,
          V = F.clientY - H().y,
          Q = L();
        j({
          x: Q.x + W / o(),
          y: Q.y + V / o(),
          width: Q.width,
          height: Q.height,
        }),
          E().forEach((U) => {
            const X = g().find((oe) => oe.id === U);
            if (X) {
              const oe = X.currPosition.get(),
                me = oe.x + W / o(),
                re = oe.y + V / o();
              X.currPosition.set({ x: me, y: re }),
                X.inputEdgeIds.get().forEach((ge) => {
                  const _e = c().find((Ie) => Ie.id === ge);
                  if (_e) {
                    const Ie = _e.currEndPosition.get();
                    _e.currEndPosition.set(() => ({
                      x: Ie.x + W / o(),
                      y: Ie.y + V / o(),
                    }));
                  }
                }),
                X.outputEdgeIds.get().forEach((ge) => {
                  const _e = c().find((Ie) => Ie.id === ge);
                  if (_e) {
                    const Ie = _e.currStartPosition.get();
                    _e.currStartPosition.set(() => ({
                      x: Ie.x + W / o(),
                      y: Ie.y + V / o(),
                    }));
                  }
                });
            }
          }),
          J({ x: F.clientX, y: F.clientY }),
          te(F);
      } else if (e().x >= 0 && A() !== null) {
        const W = g().find((V) => V.id === A());
        if (W) {
          W.currPosition.set((V) => ({
            x: (W.prevPosition.get().x + B) / o(),
            y: (W.prevPosition.get().y + O) / o(),
          }));
          for (let V = 0; V < W.inputEdgeIds.get().length; V++) {
            const Q = W.inputEdgeIds.get()[V],
              U = c().find((X) => X.id === Q);
            U &&
              U.currEndPosition.set(() => ({
                x: (U.prevEndPosition.get().x + B) / o(),
                y: (U.prevEndPosition.get().y + O) / o(),
              }));
          }
          for (let V = 0; V < W.outputEdgeIds.get().length; V++) {
            const Q = W.outputEdgeIds.get()[V],
              U = c().find((X) => X.id === Q);
            U &&
              U.currStartPosition.set(() => ({
                x: (U.prevStartPosition.get().x + B) / o(),
                y: (U.prevStartPosition.get().y + O) / o(),
              }));
          }
          te(F);
        }
      } else if (M && n() && A() === null) {
        F.preventDefault();
        const W = F.x - e().x,
          V = F.y - e().y;
        T({ x: W + N().x, y: V + N().y });
      }
      if (u() !== null) {
        w(ee());
        const W = document.getElementById("boardWrapper"),
          V = 50;
        if (W) {
          const [Q, U] = P(null),
            X = u()?.typeOfEdge;
          for (const oe of g()) {
            console.log(u()?.typeOfEdge);
            const me = X === "dash" ? oe.isUpVertex : oe.isInputVertex;
            if (oe.id !== u().nodeStartId && me) {
              const re =
                  X === "dash" ? oe.upVertexIds[0] : oe.inputVertexIds[0],
                ge = document.getElementById(re),
                {
                  left: _e,
                  right: Ie,
                  top: Be,
                  bottom: rn,
                } = ge.getBoundingClientRect(),
                tt = _e + Math.abs(_e - Ie) / 2,
                pt = Be + Math.abs(Be - rn) / 2,
                mt = F.clientX - tt,
                ht = F.clientY - pt;
              if (Math.sqrt(mt * mt + ht * ht) < V) {
                U({ positionX: tt, positionY: pt, id: oe.id });
                break;
              }
            }
          }
          Q() !== null
            ? (u()?.currEndPosition.set({
                x: (Q().positionX - h().x) / o(),
                y: (Q().positionY - h().y) / o(),
              }),
              f({
                nodeId: Q().id,
                inputIndex: 0,
                positionX: Q().positionX,
                positionY: Q().positionY,
              }))
            : (f(null),
              u()?.currEndPosition.set({
                x: (F.x - h().x) / o(),
                y: (F.y - h().y) / o(),
              }));
        }
      }
    },
    ie = () => {
      if ((t({ x: -1, y: -1 }), d(!1), x(h()), k())) {
        const F = k();
        let M = {
          x: Math.min(F.x, F.x + F.width),
          y: Math.min(F.y, F.y + F.height),
          width: Math.abs(F.width),
          height: Math.abs(F.height),
        };
        const B = g().filter((O) => {
          const W = document.getElementById(O.id);
          if (!W) return !1;
          const V = O.currPosition.get().x * o() + h().x,
            Q = O.currPosition.get().y * o() + h().y,
            U = W.offsetWidth,
            X = W.offsetHeight;
          return (
            V + U > M.x &&
            V < M.x + M.width &&
            Q + X > M.y &&
            Q < M.y + M.height
          );
        });
        if ((_(B.map((O) => O.id)), $(null), B.length > 0)) {
          const O = B.map((X) => {
              const me = document.getElementById(X.id)?.getBoundingClientRect();
              if (!me) return { x: 0, y: 0, width: 0, height: 0 };
              const re = (me.left - h().x) / o(),
                ge = (me.top - h().y) / o(),
                _e = me.width / o(),
                Ie = me.height / o();
              return { x: re, y: ge, width: _e, height: Ie };
            }),
            W = Math.min(...O.map((X) => X.x)),
            V = Math.min(...O.map((X) => X.y)),
            Q = Math.max(...O.map((X) => X.x + X.width)),
            U = Math.max(...O.map((X) => X.y + X.height));
          j({ x: W, y: V, width: Q - W, height: U - V }),
            B.forEach((X) => {
              X.prevPosition.set({
                x: X.currPosition.get().x * o(),
                y: X.currPosition.get().y * o(),
              });
            });
        }
      }
      if (
        (u() !== null && v() === null && m(null), u() !== null && v() !== null)
      ) {
        const F = u().nodeStartId,
          M = v().nodeId,
          B = g().find((V) => V.id === F),
          O = g().find((V) => V.id === M),
          W = document.getElementById("boardWrapper");
        if (B && O && W) {
          const V = `edge_${Math.random().toString(36).substring(2, 8)}_${
            B.id
          }_${u()?.outputIndex}_${O.id}_${v()?.inputIndex}`;
          if (
            B.outputEdgeIds.get().includes(V) &&
            O.inputEdgeIds.get().includes(V)
          ) {
            m(null);
            return;
          }
          B.outputEdgeIds.set([...B.outputEdgeIds.get(), V]),
            O.inputEdgeIds.set([...O.inputEdgeIds.get(), V]),
            u().prevStartPosition.set(() => ({
              x: (u().currStartPosition.get().x - h().x) / o(),
              y: (u().currStartPosition.get().y - h().y) / o(),
            })),
            u().prevEndPosition.set(() => ({
              x: (v().positionX - h().x) / o(),
              y: (v().positionY - h().y) / o(),
            })),
            u().currEndPosition.set(() => ({
              x: (v().positionX - h().x) / o(),
              y: (v().positionY - h().y) / o(),
            })),
            p([
              ...c(),
              {
                ...u(),
                id: V,
                nodeEndId: O.id,
                inputVertexId: O.inputVertexIds[0],
                nodeEndInputIndex: v().inputIndex,
              },
            ]);
          const Q = g().find((U) => U.id == u()?.nodeStartId);
          Q.busyIndex.set([...Q.busyIndex.get(), u().outputVertexId]), m(null);
        }
      }
      J(null);
    },
    q = (F) => {
      S({ x: F.clientX, y: F.clientY }),
        y(null),
        R(null),
        s() || l()
          ? (d(!0), t({ x: F.x, y: F.y }))
          : (t({ x: F.clientX, y: F.clientY }),
            $({ x: F.clientX, y: F.clientY, width: 0, height: 0 }),
            j(null),
            _([]));
    };
  function G(F, M) {
    y(M), t({ x: F.x, y: F.y });
    const B = g().find((O) => O.id == A());
    if (B) {
      B.prevPosition.set((O) => ({
        x: B.currPosition.get().x * o(),
        y: B.currPosition.get().y * o(),
      }));
      for (let O = 0; O < B.inputEdgeIds.get().length; O++) {
        const W = B.inputEdgeIds.get()[O],
          V = c().find((Q) => Q.id === W);
        V &&
          V.prevEndPosition.set(() => ({
            x: V.currEndPosition.get().x * o(),
            y: V.currEndPosition.get().y * o(),
          }));
      }
      for (let O = 0; O < B.outputEdgeIds.get().length; O++) {
        const W = B.outputEdgeIds.get()[O],
          V = c().find((Q) => Q.id === W);
        V &&
          V.prevStartPosition.set(() => ({
            x: V.currStartPosition.get().x * o(),
            y: V.currStartPosition.get().y * o(),
          }));
      }
    }
  }
  function K(F, M, B, O, W, V) {
    if ((y(null), document.getElementById("pane"))) {
      const [U, X] = P({ x: (F - h().x) / o(), y: (M - h().y) / o() }),
        [oe, me] = P({ x: (F - h().x) / o(), y: (M - h().y) / o() }),
        [re, ge] = P({ x: (F - h().x) / o(), y: (M - h().y) / o() }),
        [_e, Ie] = P({ x: (F - h().x) / o(), y: (M - h().y) / o() });
      m({
        id: "",
        nodeStartId: B,
        outputIndex: O,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: W,
        inputVertexId: "",
        typeOfEdge: V,
        prevStartPosition: { get: U, set: X },
        prevEndPosition: { get: oe, set: me },
        currStartPosition: { get: re, set: ge },
        currEndPosition: { get: _e, set: Ie },
      });
    }
  }
  function I(F, M, B, O) {
    f({ nodeId: B, inputIndex: O, positionX: F, positionY: M });
  }
  function ae(F, M) {
    v()?.nodeId == F && v()?.inputIndex == M && f(null);
  }
  function ne(F) {
    y(null), R(F);
    const M = c().find((B) => B.id === F);
    M && console.log(M.currStartPosition.get().x, M.currStartPosition.get().y);
  }
  function le(F) {
    const M = c().find((B) => B.id === F);
    if (M) {
      const B = g().find((V) => V.id == M.nodeStartId);
      B &&
        B.outputEdgeIds.set([...B.outputEdgeIds.get().filter((V) => V !== F)]);
      const O = g().find((V) => V.id === M.nodeEndId);
      O && O.inputEdgeIds.set([...O.inputEdgeIds.get().filter((V) => V !== F)]),
        c().filter((V) => V.outputVertexId === M.outputVertexId).length <= 1 &&
          B &&
          B.busyIndex.set([
            ...B.busyIndex.get().filter((V) => V !== M.outputVertexId),
          ]),
        p([...c().filter((V) => V.id !== F)]);
    }
  }
  function de(F) {
    const M = g().find((Q) => Q.id == F);
    if (!M) {
      y(null);
      return;
    }
    const B = M.inputEdgeIds.get(),
      O = M.outputEdgeIds.get(),
      V = [...B, ...O].filter((Q, U, X) => X.indexOf(Q) === U);
    for (let Q = 0; Q < V.length; Q++) {
      const U = c().find((X) => X.id === V[Q]);
      if (U) {
        const X = g().find((re) => re.id === U.nodeStartId),
          oe = g().find((re) => re.id === U.nodeEndId);
        X?.outputEdgeIds.set([
          ...X.outputEdgeIds.get().filter((re) => re !== V[Q]),
        ]),
          oe?.inputEdgeIds.set([
            ...oe.inputEdgeIds.get().filter((re) => re !== V[Q]),
          ]),
          c().filter((re) => re.outputVertexId === U.outputVertexId).length <=
            1 &&
            X &&
            X.busyIndex.set([
              ...X.busyIndex.get().filter((re) => re !== U.outputVertexId),
            ]),
          p([...c().filter((re) => U.id !== re.id)]);
      }
    }
    b([...g().filter((Q) => Q.id !== F)]), y(null);
  }
  function ee() {
    const F = u().currEndPosition.get().x - u().currStartPosition.get().x,
      M = u().currEndPosition.get().y - u().currStartPosition.get().y;
    return Math.sqrt(F * F + M * M);
  }
  return (() => {
    var F = Xi(),
      M = F.firstChild,
      B = M.nextSibling;
    return (
      (F.$$mousemove = Y),
      (F.$$mouseup = ie),
      (F.$$pointerdown = q),
      M.style.setProperty("transform-origin", "top left"),
      r(
        F,
        (() => {
          var O = ce(() => !!k());
          return () =>
            O() &&
            (() => {
              var W = Jn();
              return (
                W.style.setProperty("position", "absolute"),
                W.style.setProperty("border", "1px dashed #00aaff"),
                W.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                W.style.setProperty("z-index", "999"),
                W.style.setProperty("pointer-events", "none"),
                Z(
                  (V) => {
                    var Q = `${Math.min(k().x, k().x + k().width)}px`,
                      U = `${Math.min(k().y, k().y + k().height)}px`,
                      X = `${Math.abs(k().width)}px`,
                      oe = `${Math.abs(k().height)}px`;
                    return (
                      Q !== V.e &&
                        ((V.e = Q) != null
                          ? W.style.setProperty("left", Q)
                          : W.style.removeProperty("left")),
                      U !== V.t &&
                        ((V.t = U) != null
                          ? W.style.setProperty("top", U)
                          : W.style.removeProperty("top")),
                      X !== V.a &&
                        ((V.a = X) != null
                          ? W.style.setProperty("width", X)
                          : W.style.removeProperty("width")),
                      oe !== V.o &&
                        ((V.o = oe) != null
                          ? W.style.setProperty("height", oe)
                          : W.style.removeProperty("height")),
                      V
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                W
              );
            })();
        })(),
        B
      ),
      r(
        F,
        (() => {
          var O = ce(() => !!L());
          return () =>
            O() &&
            (() => {
              var W = Jn();
              return (
                (W.$$pointerdown = (V) => {
                  V.stopPropagation(),
                    t({ x: V.clientX, y: V.clientY }),
                    J({ x: V.clientX, y: V.clientY });
                }),
                W.style.setProperty("position", "absolute"),
                W.style.setProperty("border", "1px solid #00aaff"),
                W.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                W.style.setProperty("z-index", "998"),
                W.style.setProperty("cursor", "move"),
                W.style.setProperty("transform-origin", "top left"),
                Z(
                  (V) => {
                    var Q = `${L().x * o() + h().x}px`,
                      U = `${L().y * o() + h().y}px`,
                      X = `${L().width * o()}px`,
                      oe = `${L().height * o()}px`;
                    return (
                      Q !== V.e &&
                        ((V.e = Q) != null
                          ? W.style.setProperty("left", Q)
                          : W.style.removeProperty("left")),
                      U !== V.t &&
                        ((V.t = U) != null
                          ? W.style.setProperty("top", U)
                          : W.style.removeProperty("top")),
                      X !== V.a &&
                        ((V.a = X) != null
                          ? W.style.setProperty("width", X)
                          : W.style.removeProperty("width")),
                      oe !== V.o &&
                        ((V.o = oe) != null
                          ? W.style.setProperty("height", oe)
                          : W.style.removeProperty("height")),
                      V
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                W
              );
            })();
        })(),
        B
      ),
      B.style.setProperty("transform-origin", "top left"),
      r(
        B,
        a(pe, {
          get each() {
            return g();
          },
          children: (O) =>
            a(Fi, {
              get id() {
                return O.id;
              },
              get name() {
                return O.name;
              },
              get title() {
                return O.title;
              },
              get x() {
                return O.currPosition.get().x;
              },
              get y() {
                return O.currPosition.get().y;
              },
              get numberInputs() {
                return O.numberInputs;
              },
              get numberOutputs() {
                return O.numberOutputs;
              },
              get downVertexNumber() {
                return O.downVertexNumber || 0;
              },
              get upVertexNumber() {
                return O.upVertexNumber || 0;
              },
              get isInputVertex() {
                return O.isInputVertex;
              },
              get isOutputVertex() {
                return O.isOutputVertex;
              },
              get isDownVertex() {
                return O.isDownVertex || !1;
              },
              get isUpVertex() {
                return O.isUpVertex || !1;
              },
              get inputVertexIds() {
                return O.inputVertexIds;
              },
              get outputVertexIds() {
                return O.outputVertexIds;
              },
              get downVertexIds() {
                return O.downVertexIds || [];
              },
              get upVertexIds() {
                return O.upVertexIds || [];
              },
              get downVertexOrientation() {
                return O.downVertexOrientation || "";
              },
              get busyIndex() {
                return O.busyIndex;
              },
              get content() {
                return O.content;
              },
              get selected() {
                return A() == O.id || E().includes(O.id);
              },
              onMouseDownNode: G,
              onMouseDownOutput: K,
              onMouseEnterInput: I,
              onMouseLeaveInput: ae,
              onClickDeleteNode: de,
            }),
        }),
        null
      ),
      r(
        B,
        (() => {
          var O = ce(() => u() !== null);
          return () =>
            O() &&
            a(Yn, {
              selected: !1,
              isNew: !0,
              edgeLength: () => ee(),
              get typeOfEdge() {
                return u().typeOfEdge;
              },
              get position() {
                return {
                  x0: u().currStartPosition.get().x,
                  y0: u().currStartPosition.get().y,
                  x1: u().currEndPosition.get().x,
                  y1: u().currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => {},
              onClickDeleteEdge: () => {},
            });
        })(),
        null
      ),
      r(
        B,
        a(pe, {
          get each() {
            return c();
          },
          children: (O) =>
            a(Yn, {
              get selected() {
                return C() === O.id;
              },
              isNew: !1,
              edgeLength: () => ee(),
              get typeOfEdge() {
                return O.typeOfEdge;
              },
              get position() {
                return {
                  x0: O.currStartPosition.get().x,
                  y0: O.currStartPosition.get().y,
                  x1: O.currEndPosition.get().x,
                  y1: O.currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => ne(O.id),
              onClickDeleteEdge: () => le(O.id),
            }),
        }),
        null
      ),
      Z(
        (O) => {
          var W = {
              [ke["dot-flow__pane"]]: !0,
              [ke.draggable]: i(),
              [ke.dragging]: n(),
              [ke.selection]: !1,
            },
            V = ke["dot-flow__background"],
            Q = `scale(${o()})`,
            U = `calc(100vw / ${o()})`,
            X = `calc(100vh / ${o()})`,
            oe = `${h().x / o()}px ${h().y / o()}px`,
            me = {
              [ke["dot-flow__viewport"]]: !0,
              [ke["dot-flow__viewport"]]: !0,
            },
            re = `translate(${h().x}px, ${h().y}px) scale(${o()})`;
          return (
            (O.e = Me(F, W, O.e)),
            V !== O.t && z(M, (O.t = V)),
            Q !== O.a &&
              ((O.a = Q) != null
                ? M.style.setProperty("transform", Q)
                : M.style.removeProperty("transform")),
            U !== O.o &&
              ((O.o = U) != null
                ? M.style.setProperty("width", U)
                : M.style.removeProperty("width")),
            X !== O.i &&
              ((O.i = X) != null
                ? M.style.setProperty("height", X)
                : M.style.removeProperty("height")),
            oe !== O.n &&
              ((O.n = oe) != null
                ? M.style.setProperty("background-position", oe)
                : M.style.removeProperty("background-position")),
            (O.s = Me(B, me, O.s)),
            re !== O.h &&
              ((O.h = re) != null
                ? B.style.setProperty("transform", re)
                : B.style.removeProperty("transform")),
            O
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
        }
      ),
      F
    );
  })();
};
be(["pointerdown", "mouseup", "mousemove"]);
const ft = (e) =>
  a(Ar.Provider, {
    value: {
      scale: Po,
      setScale: Vo,
      draggable: Eo,
      setDraggable: Oo,
      isCtrlPressed: Do,
      isSpacePressed: No,
      setIsCtrlPressed: ko,
      setIsSpacePressed: Ao,
      edges: Mo,
      setEdges: Lo,
      newEdge: Fo,
      setNewEdge: Bo,
      busyIndex: Ro,
      setBusyIndex: qo,
      edgeLength: Ho,
      setEdgeLength: jo,
      isOpen: zo,
      setIsOpen: Wo,
      inputRef: Ko,
      edgeEnd: Uo,
      setEdgeEnd: Go,
      transform: Xo,
      setTransform: Yo,
      nodes: Jo,
      setNodes: Zo,
      preTransform: Qo,
      setPreTransform: er,
      selectedNode: tr,
      setSelectedNode: nr,
      pendingOutput: or,
      setPendingOutput: rr,
      lastClickPosition: lr,
      setLastClickPosition: ir,
      isShowModal: ar,
      setIsShowModal: sr,
      setPositionButton: cr,
      positionButton: dr,
      isModalOpen: mr,
      setIsModalOpen: hr,
      isOpening: ur,
      setIsOpening: pr,
      typeOfVertex: xr,
      setTypeOfVertex: yr,
      currentFormConfig: _r,
      setCurrentFormConfig: Tr,
      previousFormConfig: Cr,
      setPreviousFormConfig: Ir,
      isModalOpen2: fr,
      setIsModalOpen2: gr,
      credentialOptions: Sr,
      setCredentialOptions: Er,
      selectedCredential: Or,
      setSelectedCredential: Dr,
      formData: kr,
      setFormData: Nr,
      settingConfig: wr,
      setSettingConfig: $r,
      isModalOpen3: vr,
      setIsModalOpen3: br,
    },
    get children() {
      return e.children;
    },
  });
var Ji = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const Zi = (e) => Ji();
var Qi = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const ea = (e) => Qi();
var ta = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const na = ({ height: e = 2, width: t = 2 }) => ta();
var oa = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const ra = (e) => oa();
var la = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const $n = (e) => la();
var ia = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const Pr = (e) => ia();
var aa = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Vr = (e) => aa();
var sa = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const Mr = (e) => sa();
var da = D(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Lr = (e) => da();
var ca = D(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const Fr = (e) => ca();
var ua = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const Br = (e) => ua();
var pa = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const Rr = (e) => pa(),
  ma = [
    {
      name: "chat",
      title: "On Chat Message",
      description:
        " Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: ea,
    },
    {
      name: "switch",
      title: "Switch",
      description: "Routes items depending on defined expression or rules",
      icon: Zi,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: na,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: ra,
    },
    {
      name: "ai-agent",
      title: "AI Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: $n,
    },
    {
      name: "customer-support-agent",
      title: "Customer Support Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: $n,
    },
    {
      name: "send-email",
      title: "Send Email",
      description: "Send email to a user.",
      icon: Pr,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Vr,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: Mr,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Lr,
    },
    {
      name: "gmail-trigger",
      title: "Gmail Trigger",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Fr,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: Br,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: Rr,
    },
  ];
var ha = D(
  "<div><div><span></span>Data processing...</div><button id=allSubmit>Test WorkFlow"
);
const fa = (e) => {
  const { formData: t, nodes: n, edges: d } = fe();
  P("");
  const [i, s] = P(!1);
  function l() {
    const o = d().map((m) => ({
        id: m.id,
        sourceNodeId: m.nodeStartId,
        sourcePortId: m.outputVertexId,
        targetNodeId: m.nodeEndId,
        targetPortId: m.inputVertexId,
      })),
      c = {
        name: "Email Analyzer",
        description:
          "A workflow demonstrating multiple inputs and outputs per node",
        nodes: Object.values(t()),
        connections: o,
      };
    console.log(JSON.stringify(c));
    const u = new CustomEvent("sendAllData", {
        detail: JSON.stringify(c, null, 2),
        bubbles: !0,
      }),
      p = document.getElementById("allSubmit");
    p && p.dispatchEvent(u);
  }
  return (() => {
    var o = ha(),
      c = o.firstChild,
      u = c.firstChild,
      p = c.nextSibling;
    return (
      (p.$$click = l),
      Z(
        (m) => {
          var h = ke.testWorkFlow,
            T = `fixed ${
              i() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            N = ke.loader,
            x = ke.testButton;
          return (
            h !== m.e && z(o, (m.e = h)),
            T !== m.t && z(c, (m.t = T)),
            N !== m.a && z(u, (m.a = N)),
            x !== m.o && z(p, (m.o = x)),
            m
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      o
    );
  })();
};
be(["click"]);
var ga = D('<div><div class="border border-white/20 rounded-[9px] flex"><div>');
const an = (e) => {
  let t;
  const n = e.zIndex ?? 9999,
    d = e.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";
  return (
    Oe(() => {
      const i = (s) => {
        s.target === t && e.onClose();
      };
      return (
        window.addEventListener("click", i),
        () => window.removeEventListener("click", i)
      );
    }),
    (() => {
      var i = ga(),
        s = i.firstChild,
        l = s.firstChild,
        o = t;
      return (
        typeof o == "function" ? we(o, i) : (t = i),
        n != null
          ? i.style.setProperty("z-index", n)
          : i.style.removeProperty("z-index"),
        z(l, `${d} border border-purple-500/20 rounded-[9px] flex flex-col`),
        r(l, () => e.children),
        Z(() =>
          z(
            i,
            `fixed inset-0 bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
              e.isOpen() ? "block" : "hidden"
            }`
          )
        ),
        i
      );
    })()
  );
};
var va = D('<span class=text-yellow-300>"<!>"'),
  ba = D("<span class=text-cyan-300>"),
  xa = D("<span class=text-pink-300>"),
  ya = D("<span class=text-gray-400>null"),
  wa = D('<div class="text-purple-400 cursor-pointer select-none">'),
  $a = D("<div class=text-purple-400>}"),
  _a = D(
    '<div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">'
  ),
  Ta = D("<span>[<!>]"),
  Ca = D("<span>["),
  Ia = D("<div>]"),
  Sa = D("<div>"),
  Ea = D(
    '<div><span class=text-green-400>"<!>"</span><span class=text-white>: '
  );
const Qt = ({ data: e, indent: t = 0 }) => {
  const [n, d] = P(!1),
    i = `${t * 5}px`,
    s = () => d(!n()),
    l = (u) => typeof u == "object" && u !== null && !Array.isArray(u),
    o = Array.isArray,
    c = (u) =>
      typeof u == "string"
        ? (() => {
            var p = va(),
              m = p.firstChild,
              h = m.nextSibling;
            return h.nextSibling, r(p, u, h), p;
          })()
        : typeof u == "number"
        ? (() => {
            var p = ba();
            return r(p, u), p;
          })()
        : typeof u == "boolean"
        ? (() => {
            var p = xa();
            return r(p, () => u.toString()), p;
          })()
        : u === null
        ? ya()
        : a(Qt, { data: u, indent: t + 1 });
  return (() => {
    var u = _a();
    return (
      r(
        u,
        a(se, {
          get when() {
            return l(e);
          },
          get fallback() {
            return a(se, {
              get when() {
                return o(e);
              },
              get fallback() {
                return c(e);
              },
              get children() {
                return ce(() => !!e.every((p) => typeof p != "object"))()
                  ? (() => {
                      var p = Ta(),
                        m = p.firstChild,
                        h = m.nextSibling;
                      return (
                        h.nextSibling,
                        r(
                          p,
                          a(pe, {
                            each: e,
                            children: (T, N) => [
                              ce(() => c(T)),
                              ce(() => (N() < e.length - 1 ? ", " : "")),
                            ],
                          }),
                          h
                        ),
                        p
                      );
                    })()
                  : [
                      (() => {
                        var p = Ca();
                        return (
                          i != null
                            ? p.style.setProperty("padding-left", i)
                            : p.style.removeProperty("padding-left"),
                          p
                        );
                      })(),
                      a(pe, {
                        each: e,
                        children: (p, m) =>
                          (() => {
                            var h = Sa();
                            return (
                              `${(t + 1) * 4}px` != null
                                ? h.style.setProperty(
                                    "padding-left",
                                    `${(t + 1) * 4}px`
                                  )
                                : h.style.removeProperty("padding-left"),
                              r(h, a(Qt, { data: p, indent: t + 1 }), null),
                              r(h, () => (m() < e.length - 1 ? "," : ""), null),
                              h
                            );
                          })(),
                      }),
                      (() => {
                        var p = Ia();
                        return (
                          i != null
                            ? p.style.setProperty("padding-left", i)
                            : p.style.removeProperty("padding-left"),
                          p
                        );
                      })(),
                    ];
              },
            });
          },
          get children() {
            return [
              (() => {
                var p = wa();
                return (
                  (p.$$click = s),
                  i != null
                    ? p.style.setProperty("padding-left", i)
                    : p.style.removeProperty("padding-left"),
                  r(p, () => (n() ? "{...}" : "{")),
                  p
                );
              })(),
              a(se, {
                get when() {
                  return !n();
                },
                get children() {
                  return [
                    a(pe, {
                      get each() {
                        return Object.entries(e);
                      },
                      children: ([p, m], h) =>
                        (() => {
                          var T = Ea(),
                            N = T.firstChild,
                            x = N.firstChild,
                            A = x.nextSibling;
                          return (
                            A.nextSibling,
                            N.nextSibling,
                            `${(t + 1) * 4}px` != null
                              ? T.style.setProperty(
                                  "padding-left",
                                  `${(t + 1) * 4}px`
                                )
                              : T.style.removeProperty("padding-left"),
                            r(N, p, A),
                            r(T, () => c(m), null),
                            r(
                              T,
                              () =>
                                h() < Object.entries(e).length - 1 ? "," : "",
                              null
                            ),
                            T
                          );
                        })(),
                    }),
                    (() => {
                      var p = $a();
                      return (
                        i != null
                          ? p.style.setProperty("padding-left", i)
                          : p.style.removeProperty("padding-left"),
                        p
                      );
                    })(),
                  ];
                },
              }),
            ];
          },
        })
      ),
      u
    );
  })();
};
be(["click"]);
const Oa = "_leftPanel_kuca9_1",
  Da = { leftPanel: Oa };
var ka = D(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full "><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input'
);
const Na = (e) =>
    (() => {
      var t = ka(),
        n = t.firstChild;
      return (
        n.firstChild,
        r(
          n,
          a(Qt, {
            data: [
              {
                threadid: "19535ae314ffe32b",
                sender: "bill.rassel@gmail.com",
                body: `Hey,

I regret to inform you that I need to cancel my order. Could you please
provide the necessary steps to complete this process?

Thank you for your assistance.

Best regards,
Bill Rassel
`,
              },
            ],
          }),
          null
        ),
        Z((d) => Me(t, { [Da.leftPanel]: !0 }, d)),
        t
      );
    })(),
  Aa = "_midPanel_u0ucm_1",
  qr = { midPanel: Aa };
var Pa = D("<div class>"),
  Va = D(
    '<div class="w-3 h-3 rounded-full bg-[#dbdbdd] text-xs text-black flex items-center justify-center font-semibold select-none">?'
  ),
  Zn = D("<div>");
const Fe = (e) => {
  const [t, n] = P(!1),
    d = () => (e.visible !== void 0 ? e.visible : t()),
    [i, s] = P({ x: 0, y: 0 }),
    [l, o] = P(e.placement || "top");
  let c, u, p, m;
  const h = (f) => {
      const k = f.length;
      return k <= 50
        ? "max-w-xs"
        : k <= 120
        ? "max-w-sm"
        : k <= 200
        ? "max-w-md"
        : "max-w-lg";
    },
    T = () => {
      if (!c || !u) return;
      const f = c.getBoundingClientRect(),
        k = u.getBoundingClientRect(),
        $ = {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        },
        E = 8;
      let _ = e.placement || "top";
      const L = {
        top: {
          x: f.left + f.width / 2 - k.width / 2 + $.scrollX,
          y: f.top - k.height - E + $.scrollY,
        },
        bottom: {
          x: f.left + f.width / 2 - k.width / 2 + $.scrollX,
          y: f.bottom + E + $.scrollY,
        },
        left: {
          x: f.left - k.width - E + $.scrollX,
          y: f.top + f.height / 2 - k.height / 2 + $.scrollY,
        },
        right: {
          x: f.right + E + $.scrollX,
          y: f.top + f.height / 2 - k.height / 2 + $.scrollY,
        },
      };
      let j = L[_];
      _ === "top" && j.y < $.scrollY
        ? ((_ = "bottom"), (j = L.bottom))
        : _ === "bottom" && j.y + k.height > $.height + $.scrollY
        ? ((_ = "top"), (j = L.top))
        : _ === "left" && j.x < $.scrollX
        ? ((_ = "right"), (j = L.right))
        : _ === "right" &&
          j.x + k.width > $.width + $.scrollX &&
          ((_ = "left"), (j = L.left)),
        j.x < $.scrollX
          ? (j.x = $.scrollX + E)
          : j.x + k.width > $.width + $.scrollX &&
            (j.x = $.width + $.scrollX - k.width - E),
        j.y < $.scrollY
          ? (j.y = $.scrollY + E)
          : j.y + k.height > $.height + $.scrollY &&
            (j.y = $.height + $.scrollY - k.height - E),
        s({ x: j.x, y: j.y }),
        o(_);
    },
    N = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!0);
        return;
      }
      m && clearTimeout(m),
        (p = setTimeout(() => {
          n(!0), setTimeout(T, 0);
        }, e.delay || 200));
    },
    x = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!1);
        return;
      }
      p && clearTimeout(p),
        (m = setTimeout(() => {
          n(!1);
        }, e.hideDelay || 100));
    },
    A = () => {
      e.disableHover || N();
    },
    y = () => {
      e.disableHover || x();
    },
    S = () => {
      e.disableHover || N();
    },
    w = () => {
      e.disableHover || x();
    },
    g = () => {
      d() && setTimeout(T, 0);
    };
  let b = d();
  const C = () => {
      const f = d();
      f !== b && f && g(), (b = f);
    },
    R = () => {
      d() && T();
    };
  Oe(() => {
    window.addEventListener("scroll", R, { passive: !0 }),
      window.addEventListener("resize", R, { passive: !0 });
    const f = setInterval(C, 16);
    Ae(() => {
      clearInterval(f);
    });
  }),
    Ae(() => {
      p && clearTimeout(p),
        m && clearTimeout(m),
        window.removeEventListener("scroll", R),
        window.removeEventListener("resize", R);
    });
  const v = () => {
    const f = "absolute w-2 h-2 bg-[#464668] transform rotate-45";
    switch (l()) {
      case "top":
        return `${f} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${f} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${f} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${f} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return f;
    }
  };
  return [
    (() => {
      var f = Pa();
      f.addEventListener("blur", w),
        f.addEventListener("focus", S),
        f.addEventListener("mouseleave", y),
        f.addEventListener("mouseenter", A);
      var k = c;
      return (
        typeof k == "function" ? we(k, f) : (c = f),
        r(
          f,
          (() => {
            var $ = ce(() => !!e.children);
            return () => ($() ? e.children : Va());
          })()
        ),
        Z(() => ue(f, "tabindex", e.focusable ? 0 : void 0)),
        f
      );
    })(),
    ce(
      () =>
        ce(() => !!d())() &&
        a(Tl, {
          get children() {
            var f = Zn(),
              k = u;
            return (
              typeof k == "function" ? we(k, f) : (u = f),
              r(f, () => e.content, null),
              r(
                f,
                (() => {
                  var $ = ce(() => e.showArrow !== !1);
                  return () =>
                    $() &&
                    (() => {
                      var E = Zn();
                      return Z(() => z(E, v())), E;
                    })();
                })(),
                null
              ),
              Z(
                ($) => {
                  var E = `
              fixed z-50 px-3 py-2 text-sm text-[#c9c9db] bg-[#464668] rounded-lg shadow-lg
              pointer-events-none select-none whitespace-pre-wrap break-words
              ${h(e.content || "")}
              transition-opacity duration-200
            `,
                    _ = `${i().x}px`,
                    L = `${i().y}px`,
                    j = d() ? 1 : 0;
                  return (
                    E !== $.e && z(f, ($.e = E)),
                    _ !== $.t &&
                      (($.t = _) != null
                        ? f.style.setProperty("left", _)
                        : f.style.removeProperty("left")),
                    L !== $.a &&
                      (($.a = L) != null
                        ? f.style.setProperty("top", L)
                        : f.style.removeProperty("top")),
                    j !== $.o &&
                      (($.o = j) != null
                        ? f.style.setProperty("opacity", j)
                        : f.style.removeProperty("opacity")),
                    $
                  );
                },
                { e: void 0, t: void 0, a: void 0, o: void 0 }
              ),
              f
            );
          },
        })
    ),
  ];
};
var Ma = D(
    '<div class="text-white bg-[#1e1e2f] p-2 rounded w-full"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><div class="text-sm flex items-center gap-1 group"></div><div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">Reset value</div></div><label class="relative inline-block w-12 h-6"><input title=switch type=checkbox class="sr-only peer"><div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6">'
  ),
  La = D("<label class=label>"),
  Fa = D("<div class=toolTipBtn>");
const Se = (e) => {
  const t = (i) => {
      e.onChange?.(i.target.checked);
    },
    [n, d] = P("");
  return (
    $e(() => {
      const i = `${e.uniqueKey}-${e.name}`;
      i !== n() && (d(i), e.onChange?.(e.checked ?? !1));
    }),
    Oe(() => {}),
    (() => {
      var i = Ma(),
        s = i.firstChild,
        l = s.firstChild,
        o = l.firstChild,
        c = l.nextSibling,
        u = c.firstChild;
      return (
        r(
          o,
          (() => {
            var p = ce(() => !!e.title);
            return () =>
              p() &&
              (() => {
                var m = La();
                return (
                  r(m, () => e.title, null),
                  r(
                    m,
                    (() => {
                      var h = ce(() => !!e.toolTipText);
                      return () =>
                        h() &&
                        (() => {
                          var T = Fa();
                          return (
                            r(
                              T,
                              a(Fe, {
                                get content() {
                                  return e.toolTipText;
                                },
                              })
                            ),
                            T
                          );
                        })();
                    })(),
                    null
                  ),
                  m
                );
              })();
          })()
        ),
        u.addEventListener("change", t),
        Z(() => ue(u, "name", e.name)),
        Z(() => (u.checked = e.checked)),
        i
      );
    })()
  );
};
var Ba = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const ve = (e) => Ba();
var Ra = D(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  qa = D("<label class=label>"),
  Ha = D("<div class=toolTipBtn>"),
  ja = D("<option>"),
  za = D("<div role=option><p>"),
  Wa = D('<p class="text-xs font-light text-[#b9b5b5]">'),
  Ka = D("<p class=foot-note>");
const Ce = (e) => {
  const [t, n] = P(!1),
    [d, i] = P({ value: "", label: "", description: "" }),
    [s, l] = P("down");
  let o, c;
  const [u, p] = P(""),
    m = (y) => {
      o && !o.contains(y.target) && n(!1);
    };
  e.defaultValue;
  const h = () => {
    console.log("hey, i am in setDefault value.");
    const y = e.options.find((S) => S.value === e.defaultValue);
    i(y || e.options[0]), e.onChange?.(y || e.options[0]);
  };
  $e(() => {
    const y = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", y), y !== u() && (p(y), h());
  });
  const T = () => n(!1);
  Oe(() => {
    document.addEventListener("mousedown", m),
      document.addEventListener("touchstart", m, { passive: !0 }),
      window.addEventListener("resize", T),
      window.addEventListener("blur", T);
  }),
    Ae(() => {
      document.removeEventListener("mousedown", m),
        document.removeEventListener("touchstart", m),
        window.removeEventListener("resize", T),
        window.removeEventListener("blur", T);
    });
  const N = (y) => {
      y.stopPropagation(), t() || A(), n(!t());
    },
    x = (y) => {
      i(y), n(!1), d() && e.onChange && e.onChange(d()), o && o.focus();
    },
    A = () => {
      if (!o) return;
      const y = o.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - y.bottom < 200
        ? l("up")
        : l("down");
    };
  return (() => {
    var y = Ra(),
      S = y.firstChild,
      w = S.firstChild,
      g = w.nextSibling,
      b = g.nextSibling;
    r(
      y,
      (() => {
        var v = ce(() => !!e.title);
        return () =>
          v() &&
          (() => {
            var f = qa();
            return (
              r(f, () => e.title, null),
              r(
                f,
                (() => {
                  var k = ce(() => !!e.toolTipText);
                  return () =>
                    k() &&
                    (() => {
                      var $ = Ha();
                      return (
                        r(
                          $,
                          a(Fe, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        $
                      );
                    })();
                })(),
                null
              ),
              Z(() => ue(f, "for", e.name)),
              f
            );
          })();
      })(),
      S
    );
    var C = o;
    typeof C == "function" ? we(C, S) : (o = S),
      r(
        w,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (v) =>
            (() => {
              var f = ja();
              return (
                r(f, () => v.label),
                Z(() => (f.selected = v.value === d().value)),
                Z(() => (f.value = v.value)),
                f
              );
            })(),
        })
      ),
      Le(g, "click", e.disabled ? void 0 : N),
      r(g, () => d().label || e.placeholder);
    var R = c;
    return (
      typeof R == "function" ? we(R, b) : (c = b),
      r(
        b,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (v, f) =>
            (() => {
              var k = za(),
                $ = k.firstChild;
              return (
                (k.$$click = x),
                (k.$$clickData = v),
                r($, () => v.label),
                r(
                  k,
                  (() => {
                    var E = ce(() => !!v.description);
                    return () =>
                      E() &&
                      (() => {
                        var _ = Wa();
                        return r(_, () => v.description), _;
                      })();
                  })(),
                  null
                ),
                Z(
                  (E) => {
                    var _ = v.value === d().value ? "selected" : "",
                      L = t() ? 0 : -1,
                      j = v.value === d().value;
                    return (
                      _ !== E.e && z(k, (E.e = _)),
                      L !== E.t && ue(k, "tabindex", (E.t = L)),
                      j !== E.a && ue(k, "aria-selected", (E.a = j)),
                      E
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                k
              );
            })(),
        })
      ),
      r(
        S,
        (() => {
          var v = ce(() => !!e.footNote);
          return () =>
            v() &&
            (() => {
              var f = Ka();
              return r(f, () => e.footNote), f;
            })();
        })(),
        null
      ),
      Z(
        (v) => {
          var f = e.name,
            k = e.required,
            $ = e.disabled,
            E = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            _ = e.disabled ? -1 : 0,
            L = t(),
            j = `select-items ${t() ? "select-show" : "select-hide"}
        ${s() === "up" ? "select-direction-up" : ""}`;
          return (
            f !== v.e && ue(w, "name", (v.e = f)),
            k !== v.t && (w.required = v.t = k),
            $ !== v.a && (w.disabled = v.a = $),
            E !== v.o && z(g, (v.o = E)),
            _ !== v.i && ue(g, "tabindex", (v.i = _)),
            L !== v.n && ue(g, "aria-expanded", (v.n = L)),
            j !== v.s && z(b, (v.s = j)),
            v
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
        }
      ),
      y
    );
  })();
};
be(["click"]);
var Ua = D(
    '<div class="flex gap-1 rounded-md bg-[#323236] px-1 py-1 items-center">+ '
  ),
  Ga = D(
    '<div class=w-full><div class=custom-select><div aria-haspopup=listbox role=combobox><div class="flex gap-1.5"></div></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  Xa = D("<label class=label>"),
  Ya = D("<div class=toolTipBtn>"),
  Ja = D("<input type=hidden>"),
  Za = D(
    '<div class="flex relative gap-1 rounded-md bg-[#323236] px-2 py-1 items-center group duration-200"><div class="text-xs font-medium"></div><div class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-75 group-hover:max-w-[20px] group-hover:opacity-100 "><div class="text-[#c45454] font-bold cursor-pointer">×'
  ),
  Qa = D("<div role=option>");
const Hr = (e) => {
  const [t, n] = P(!1),
    [d, i] = P([]),
    [s, l] = P([]),
    [o, c] = P("down");
  let u, p;
  const m = (y) => {
      u && !u.contains(y.target) && n(!1);
    },
    h = () => n(!1);
  Oe(() => {
    if (e.defaultSelectedOptions) {
      const y = e.options.filter((S) =>
        e.defaultSelectedOptions.includes(S.value)
      );
      if (y) {
        i(y);
        const S = y.map((w) => w.label);
        l(S), e.onChange?.(y);
      }
    }
    document.addEventListener("mousedown", m),
      document.addEventListener("touchstart", m, { passive: !0 }),
      window.addEventListener("resize", h),
      window.addEventListener("blur", h);
  }),
    Ae(() => {
      document.removeEventListener("mousedown", m),
        document.removeEventListener("touchstart", m),
        window.removeEventListener("resize", h),
        window.removeEventListener("blur", h);
    });
  const T = (y) => {
      y.stopPropagation(), t() || A(), n(!t());
    },
    N = (y) => {
      const S = d();
      if (S.some((C) => C.value === y.value)) return;
      const g = [...S, y];
      i(g);
      const b = g.map((C) => C.label);
      l(b), n(!1), e.onChange && e.onChange(g), u && u.focus();
    };
  function x(y, S) {
    y.stopPropagation();
    const w = d().filter((g) => g.label !== S);
    i(w), l(s().filter((g) => g !== S)), e.onChange && e.onChange(w);
  }
  const A = () => {
    if (!u) return;
    const y = u.getBoundingClientRect();
    document.getElementById("mid-panel")?.clientHeight - y.bottom < 200
      ? c("up")
      : c("down");
  };
  return (() => {
    var y = Ga(),
      S = y.firstChild,
      w = S.firstChild,
      g = w.firstChild,
      b = w.nextSibling,
      C = b.nextSibling;
    r(
      y,
      (() => {
        var f = ce(() => !!e.title);
        return () =>
          f() &&
          (() => {
            var k = Xa();
            return (
              r(k, () => e.title, null),
              r(
                k,
                (() => {
                  var $ = ce(() => !!e.toolTipText);
                  return () =>
                    $() &&
                    (() => {
                      var E = Ya();
                      return (
                        r(
                          E,
                          a(Fe, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        E
                      );
                    })();
                })(),
                null
              ),
              Z(() => ue(k, "for", e.name)),
              k
            );
          })();
      })(),
      S
    );
    var R = u;
    typeof R == "function" ? we(R, S) : (u = S),
      r(
        S,
        a(pe, {
          get each() {
            return d();
          },
          children: (f, k) =>
            (() => {
              var $ = Ja();
              return (
                Z(() => ue($, "name", `${e.name}`)),
                Z(() => ($.value = f.value)),
                $
              );
            })(),
        }),
        w
      ),
      Le(w, "click", e.disabled ? void 0 : T),
      r(
        w,
        () => (s().length <= 0 ? e.placeholder || "Select an option" : ""),
        g
      ),
      r(
        g,
        a(pe, {
          get each() {
            return s();
          },
          children: (f, k) => {
            if (k() < 3)
              return (() => {
                var $ = Za(),
                  E = $.firstChild,
                  _ = E.nextSibling,
                  L = _.firstChild;
                return r(E, f), (L.$$click = (j) => x(j, f)), $;
              })();
          },
        }),
        null
      ),
      r(
        g,
        a(se, {
          get when() {
            return s().length > 3;
          },
          get children() {
            var f = Ua();
            return f.firstChild, r(f, () => s().length - 3, null), f;
          },
        }),
        null
      );
    var v = p;
    return (
      typeof v == "function" ? we(v, b) : (p = b),
      r(
        b,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (f, k) =>
            (() => {
              var $ = Qa();
              return (
                ($.$$click = N),
                ($.$$clickData = f),
                r($, () => f.label),
                Z(
                  (E) => {
                    var _ = d().some((H) => H.value === f.value)
                        ? "selected"
                        : "",
                      L = t() ? 0 : -1,
                      j = d().some((H) => H.value === f.value);
                    return (
                      _ !== E.e && z($, (E.e = _)),
                      L !== E.t && ue($, "tabindex", (E.t = L)),
                      j !== E.a && ue($, "aria-selected", (E.a = j)),
                      E
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                $
              );
            })(),
        })
      ),
      r(C, () => e.footNote),
      Z(
        (f) => {
          var k = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            $ = e.disabled ? -1 : 0,
            E = t(),
            _ = `select-items ${t() ? "select-show" : "select-hide"} ${
              o() === "up" ? "select-direction-up" : ""
            }`;
          return (
            k !== f.e && z(w, (f.e = k)),
            $ !== f.t && ue(w, "tabindex", (f.t = $)),
            E !== f.a && ue(w, "aria-expanded", (f.a = E)),
            _ !== f.o && z(b, (f.o = _)),
            f
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      y
    );
  })();
};
be(["click"]);
var es = D(
    '<div class=custom-select><div aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  ts = D("<div role=option>");
const Pe = (e) => {
  const [t, n] = P(!1),
    [d, i] = P("down");
  let s, l;
  const o = (h) => {
    s && !s.contains(h.target) && c();
  };
  Oe(() => {
    document.addEventListener("mousedown", o),
      document.addEventListener("touchstart", o, { passive: !0 }),
      window.addEventListener("resize", c),
      window.addEventListener("blur", c);
  }),
    Ae(() => {
      document.removeEventListener("mousedown", o),
        document.removeEventListener("touchstart", o),
        window.removeEventListener("resize", c),
        window.removeEventListener("blur", c);
    }),
    $e(() => {
      e.selectedOptions().length >= 1 &&
        e.onChange &&
        e.onChange(e.selectedOptions());
    });
  const c = () => {
      t() &&
        (n(!1),
        setTimeout(() => {
          const h = l;
          h && h.classList.add("select-hide-complete");
        }, 200));
    },
    u = (h) => {
      h.stopPropagation(), t() || m(), n(!t());
    },
    p = (h) => {
      const T = e.selectedOptions();
      T.some((x) => x.value === h.value) ||
        (e.setSelectedOptions([...T, h]),
        e.setDropdownOptions(
          e.dropdownOptions().filter((x) => x.value !== h.value)
        ),
        c(),
        s && s.focus());
    },
    m = () => {
      if (!s) return;
      const h = s.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - h.bottom < 200
        ? i("up")
        : i("down");
    };
  return a(se, {
    get when() {
      return e.dropdownOptions().length >= 1;
    },
    get children() {
      var h = es(),
        T = h.firstChild,
        N = T.nextSibling,
        x = s;
      typeof x == "function" ? we(x, h) : (s = h),
        Le(T, "click", e.disabled ? void 0 : u),
        r(T, () => e.placeholder);
      var A = l;
      return (
        typeof A == "function" ? we(A, N) : (l = N),
        r(
          N,
          a(pe, {
            get each() {
              return e.dropdownOptions();
            },
            children: (y, S) =>
              (() => {
                var w = ts();
                return (
                  (w.$$click = p),
                  (w.$$clickData = y),
                  r(w, () => y.label),
                  Z(() => ue(w, "tabindex", t() ? 0 : -1)),
                  w
                );
              })(),
          })
        ),
        Z(
          (y) => {
            var S = `select-selected ${t() ? "active" : ""} ${
                e.disabled ? "disabled" : ""
              }`,
              w = e.disabled ? -1 : 0,
              g = t(),
              b = `select-items ${t() ? "select-show" : "select-hide"} ${
                d() === "up" ? "select-direction-up" : ""
              }`;
            return (
              S !== y.e && z(T, (y.e = S)),
              w !== y.t && ue(T, "tabindex", (y.t = w)),
              g !== y.a && ue(T, "aria-expanded", (y.a = g)),
              b !== y.o && z(N, (y.o = b)),
              y
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        h
      );
    },
  });
};
be(["click"]);
var ns = D(
    '<div class=custom-select><label class=label></label><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox><div role=option aria-selected=true>+ Create new credentials</div></div><p class=foot-note>'
  ),
  os = D("<div class=toolTipBtn>"),
  rs = D("<option>"),
  ls = D("<div role=option aria-selected=true>");
const et = (e) => {
  const [t, n] = P(!1),
    { setIsModalOpen2: d } = fe(),
    [i, s] = P({ value: "", label: "", description: "" }),
    [l, o] = P("down");
  let c, u;
  const p = (x) => {
      c && !c.contains(x.target) && n(!1);
    },
    m = () => n(!1);
  Oe(() => {
    if (e.defaultValue) {
      const x = e.options && e.options.find((A) => A.value === e.defaultValue);
      x && s(x);
    }
    document.addEventListener("mousedown", p),
      document.addEventListener("touchstart", p, { passive: !0 }),
      window.addEventListener("resize", m),
      window.addEventListener("blur", m);
  }),
    Ae(() => {
      document.removeEventListener("mousedown", p),
        document.removeEventListener("touchstart", p),
        window.removeEventListener("resize", m),
        window.removeEventListener("blur", m);
    }),
    $e(() => {
      i() && e.onChange && e.onChange(i());
    });
  const h = (x) => {
      x.stopPropagation(), t() || N(), n(!t());
    },
    T = (x) => {
      s(x), n(!1), c && c.focus();
    },
    N = () => {
      if (!c) return;
      const x = c.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - x.bottom < 200
        ? o("up")
        : o("down");
    };
  return (() => {
    var x = ns(),
      A = x.firstChild,
      y = A.nextSibling,
      S = y.nextSibling,
      w = S.nextSibling,
      g = w.firstChild,
      b = w.nextSibling,
      C = c;
    typeof C == "function" ? we(C, x) : (c = x),
      r(A, () => e.title, null),
      r(
        A,
        (() => {
          var v = ce(() => !!e.toolTipText);
          return () =>
            v() &&
            (() => {
              var f = os();
              return (
                r(
                  f,
                  a(Fe, {
                    get content() {
                      return e.toolTipText;
                    },
                  })
                ),
                f
              );
            })();
        })(),
        null
      ),
      r(
        y,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (v) =>
            (() => {
              var f = rs();
              return (
                r(f, () => v.label),
                Z(() => (f.selected = v.value === i().value)),
                Z(() => (f.value = v.value)),
                f
              );
            })(),
        })
      ),
      Le(S, "click", e.disabled ? void 0 : h),
      r(S, () => i().label || e.placeholder);
    var R = u;
    return (
      typeof R == "function" ? we(R, w) : (u = w),
      r(
        w,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (v, f) =>
            (() => {
              var k = ls();
              return (
                (k.$$click = T),
                (k.$$clickData = v),
                r(k, () => v.label),
                Z(
                  ($) => {
                    var E = `child-option ${
                        (v.value === i().value ? "selected" : "") || ""
                      }`,
                      _ = v.value === i().value,
                      L = v.value === i().value,
                      j = t() ? 0 : -1;
                    return (
                      E !== $.e && z(k, ($.e = E)),
                      _ !== $.t && k.classList.toggle("selected", ($.t = _)),
                      L !== $.a &&
                        k.classList.toggle("aria-selected-true", ($.a = L)),
                      j !== $.o && ue(k, "tabindex", ($.o = j)),
                      $
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                k
              );
            })(),
        }),
        g
      ),
      (g.$$click = (v) => {
        h(v), d(!0);
      }),
      r(b, () => e.footNote),
      Z(
        (v) => {
          var f = e.name,
            k = e.name,
            $ = e.required,
            E = e.disabled,
            _ = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            L = e.disabled ? -1 : 0,
            j = t(),
            H = `select-items ${t() ? "select-show" : "select-hide"}
        ${l() === "up" ? "select-direction-up" : ""}`,
            J = t() ? 0 : -1;
          return (
            f !== v.e && ue(A, "for", (v.e = f)),
            k !== v.t && ue(y, "name", (v.t = k)),
            $ !== v.a && (y.required = v.a = $),
            E !== v.o && (y.disabled = v.o = E),
            _ !== v.i && z(S, (v.i = _)),
            L !== v.n && ue(S, "tabindex", (v.n = L)),
            j !== v.s && ue(S, "aria-expanded", (v.s = j)),
            H !== v.h && z(w, (v.h = H)),
            J !== v.r && ue(g, "tabindex", (v.r = J)),
            v
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      x
    );
  })();
};
be(["click"]);
var is = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor; data--h-bstatus=0OBSERVED><path fill-rule=evenodd d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"></path><path fill-rule=evenodd d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z">'
);
const jr = (e) => is();
var as = D("<div><div class=relative><input>"),
  ss = D("<label class=label>"),
  ds = D("<div class=toolTipBtn>"),
  cs = D('<button type=button aria-label="Toggle expanded view">'),
  us = D(
    '<div><div class><div class=mb-3><div class="flex justify-between items-center mb-2"><span class="text-white text-sm font-medium">Result</span><div class="flex items-center gap-2"><span class="text-gray-400 text-xs">Item</span><span class="bg-gray-600 text-white text-xs px-2 py-1 rounded">0</span><div class="flex gap-1"><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Previous item">‹</button><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Next item">›</button></div></div></div><div class="text-white text-sm"></div></div><div><div class="text-yellow-400 text-xs font-medium mb-1">Tip:</div><div class="text-gray-300 text-xs">Anything inside <span class=text-blue-400>{}</span> is JavaScript.<button type=button class="text-blue-400 hover:underline ml-1 cursor-pointer">Learn more</button></div></div><div class="mt-3 pt-3 border-t border-gray-600"><div class="text-gray-400 text-xs">Press <kbd class="bg-gray-600 px-1 rounded text-white">Escape</kbd> to close'
  ),
  ps = D("<p class=foot-note>");
const he = (e) => {
  const { setIsModalOpen3: t } = fe(),
    [n, d] = P(!1),
    [i, s] = P(e.value || "");
  let l, o;
  const [c, u] = P("");
  $e(() => {
    const x = `${e.uniqueKey}-${e.name}`;
    x !== c() && (u(x), s(e.value || ""), e.onInput?.(e.value || ""));
  });
  const p = (x) => {
      o && !o.contains(x.target) && d(!1);
    },
    m = () => d(!1);
  Oe(() => {
    document.addEventListener("mousedown", p),
      document.addEventListener("touchstart", p, { passive: !0 }),
      window.addEventListener("resize", m),
      window.addEventListener("blur", m);
  }),
    Ae(() => {
      document.removeEventListener("click", p);
    });
  const h = () => {
      e.disabled || d(!0);
    },
    T = (x) => {
      const y = x.target.value;
      s(y), e.onInput?.(y, x);
    },
    N = (x) => {
      x.preventDefault(), x.stopPropagation();
    };
  return (() => {
    var x = as(),
      A = x.firstChild,
      y = A.firstChild,
      S = o;
    typeof S == "function" ? we(S, x) : (o = x),
      r(
        x,
        (() => {
          var g = ce(() => !!e.title);
          return () =>
            g() &&
            (() => {
              var b = ss();
              return (
                r(b, () => e.title, null),
                r(
                  b,
                  (() => {
                    var C = ce(() => !!e.toolTipText);
                    return () =>
                      C() &&
                      (() => {
                        var R = ds();
                        return (
                          r(
                            R,
                            a(Fe, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          R
                        );
                      })();
                  })(),
                  null
                ),
                Z(() => ue(b, "for", e.name)),
                b
              );
            })();
        })(),
        A
      ),
      y.addEventListener("focus", h),
      (y.$$input = T);
    var w = l;
    return (
      typeof w == "function" ? we(w, y) : (l = y),
      r(
        A,
        (() => {
          var g = ce(() => !!e.isArrow);
          return () =>
            g() &&
            (() => {
              var b = cs();
              return (
                (b.$$click = () => t(!0)),
                r(b, a(jr, {})),
                Z(
                  (C) => {
                    var R = e.disabled,
                      v = `absolute right-0 bottom-0 text-gray-400 text-[10px] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                        e.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`;
                    return (
                      R !== C.e && (b.disabled = C.e = R),
                      v !== C.t && z(b, (C.t = v)),
                      C
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                b
              );
            })();
        })(),
        null
      ),
      r(
        x,
        (() => {
          var g = ce(() => !!e.isExpand);
          return () =>
            g() &&
            (() => {
              var b = us(),
                C = b.firstChild,
                R = C.firstChild,
                v = R.firstChild,
                f = v.nextSibling,
                k = R.nextSibling,
                $ = k.firstChild,
                E = $.nextSibling,
                _ = E.firstChild,
                L = _.nextSibling,
                j = L.nextSibling,
                H = j.nextSibling;
              return (
                r(f, () => i() || "threadid"),
                (H.$$click = N),
                Z(() =>
                  z(
                    b,
                    `absolute top-[105%] rounded-sm  left-0 right-0 p-4 bg-[#1f1f2b] border border-gray-600 border-t-0 rounded-b transition-all duration-200 z-10 ${
                      n() ? "opacity-100 visible" : "opacity-0 invisible"
                    }`
                  )
                ),
                b
              );
            })();
        })(),
        null
      ),
      r(
        x,
        (() => {
          var g = ce(() => !!e.footNote);
          return () =>
            g() &&
            (() => {
              var b = ps();
              return r(b, () => e.footNote), b;
            })();
        })(),
        null
      ),
      Z(
        (g) => {
          var b = `relative w-full group ${e.class || ""}`,
            C = e.autocomplete ? "on" : "off",
            R = e.type || "text",
            v = e.name,
            f = e.disabled,
            k = e.placeholder || "",
            $ = e.pattern,
            E = `w-full px-3 py-2.5 pr-8 border font-normal rounded-sm border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors ${
              e.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`;
          return (
            b !== g.e && z(x, (g.e = b)),
            C !== g.t && ue(y, "autocomplete", (g.t = C)),
            R !== g.a && ue(y, "type", (g.a = R)),
            v !== g.o && ue(y, "name", (g.o = v)),
            f !== g.i && (y.disabled = g.i = f),
            k !== g.n && ue(y, "placeholder", (g.n = k)),
            $ !== g.s && ue(y, "pattern", (g.s = $)),
            E !== g.h && z(y, (g.h = E)),
            g
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
        }
      ),
      Z(() => (y.value = e.value || "")),
      x
    );
  })();
};
be(["input", "click"]);
var ms = D(
  '<div class="text-[#dfe0e3] mt-5 select-none bg-[#383649] text-[15px] font-light text-center py-1.5 rounded-md cursor-pointer hover:bg-[#3d3b4e]">'
);
const Ze = (e) =>
  (() => {
    var t = ms();
    return Le(t, "click", e.onClick), r(t, () => e.label), t;
  })();
be(["click"]);
var hs = D(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  fs = D("<label class=label>"),
  gs = D("<div class=toolTipBtn>"),
  vs = D("<option>"),
  bs = D("<div role=option><p>"),
  xs = D('<p class="text-xs font-light text-[#b9b5b5]">');
const Ee = (e) => {
  const [t, n] = P(!1),
    [d, i] = P({ value: "", label: "", children: [] }),
    [s, l] = P("down");
  let o, c;
  const [u, p] = P(""),
    m = () => {
      console.log("hey, i am in setDefault value.");
      const y = e.options.find((S) => S.value === e.defaultValue);
      i(y || e.options[0]), e.onChange?.(y || e.options[0]);
    };
  $e(() => {
    const y = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", y), y !== u() && (p(y), m());
  });
  const h = (y) => {
      o && !o.contains(y.target) && n(!1);
    },
    T = () => n(!1);
  Oe(() => {
    document.addEventListener("mousedown", h),
      document.addEventListener("touchstart", h, { passive: !0 }),
      window.addEventListener("resize", T),
      window.addEventListener("blur", T);
  }),
    Ae(() => {
      document.removeEventListener("mousedown", h),
        document.removeEventListener("touchstart", h),
        window.removeEventListener("resize", T),
        window.removeEventListener("blur", T);
    });
  const N = (y) => {
      y.stopPropagation(), t() || A(), n(!t());
    },
    x = (y) => {
      i(y), n(!1), d() && e.onChange && e.onChange(d()), o && o.focus();
    },
    A = () => {
      if (!o) return;
      const y = o.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - y.bottom < 200
        ? l("up")
        : l("down");
    };
  return (() => {
    var y = hs(),
      S = y.firstChild,
      w = S.firstChild,
      g = w.nextSibling,
      b = g.nextSibling,
      C = b.nextSibling;
    r(
      y,
      (() => {
        var f = ce(() => !!e.title);
        return () =>
          f() &&
          (() => {
            var k = fs();
            return (
              r(k, () => e.title, null),
              r(
                k,
                (() => {
                  var $ = ce(() => !!e.toolTipText);
                  return () =>
                    $() &&
                    (() => {
                      var E = gs();
                      return (
                        r(
                          E,
                          a(Fe, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        E
                      );
                    })();
                })(),
                null
              ),
              Z(() => ue(k, "for", e.name)),
              k
            );
          })();
      })(),
      S
    );
    var R = o;
    typeof R == "function" ? we(R, S) : (o = S),
      r(
        w,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (f) =>
            (() => {
              var k = vs();
              return (
                r(k, () => f.label),
                Z(() => (k.selected = f.value === d().value)),
                Z(() => (k.value = f.value)),
                k
              );
            })(),
        })
      ),
      Le(g, "click", e.disabled ? void 0 : N),
      r(g, () => d().label || e.placeholder);
    var v = c;
    return (
      typeof v == "function" ? we(v, b) : (c = b),
      r(
        b,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (f, k) =>
            (() => {
              var $ = bs(),
                E = $.firstChild;
              return (
                ($.$$click = x),
                ($.$$clickData = f),
                r(E, () => f.label),
                r(
                  $,
                  (() => {
                    var _ = ce(() => !!f.description);
                    return () =>
                      _() &&
                      (() => {
                        var L = xs();
                        return r(L, () => f.description), L;
                      })();
                  })(),
                  null
                ),
                Z(
                  (_) => {
                    var L = f.value === d().value ? "selected" : "",
                      j = t() ? 0 : -1,
                      H = f.value === d().value;
                    return (
                      L !== _.e && z($, (_.e = L)),
                      j !== _.t && ue($, "tabindex", (_.t = j)),
                      H !== _.a && ue($, "aria-selected", (_.a = H)),
                      _
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                $
              );
            })(),
        })
      ),
      r(C, () => e.footNote),
      Z(
        (f) => {
          var k = e.name,
            $ = e.required,
            E = e.disabled,
            _ = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            L = e.disabled ? -1 : 0,
            j = t(),
            H = `select-items ${t() ? "select-show" : "select-hide"}
        ${s() === "up" ? "select-direction-up" : ""}`;
          return (
            k !== f.e && ue(w, "name", (f.e = k)),
            $ !== f.t && (w.required = f.t = $),
            E !== f.a && (w.disabled = f.a = E),
            _ !== f.o && z(g, (f.o = _)),
            L !== f.i && ue(g, "tabindex", (f.i = L)),
            j !== f.n && ue(g, "aria-expanded", (f.n = j)),
            H !== f.s && z(b, (f.s = H)),
            f
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
        }
      ),
      y
    );
  })();
};
be(["click"]);
const Mt = [
    {
      label: "Include Spam and Trash",
      value: "includeSpamTrash",
      content: {
        type: "switch",
        name: "includeSpamTrash",
        title: "Include Spam and Trash",
        toolTipText:
          "Whether to include messages from SPAM and TRASH in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Include Drafts",
      value: "includeDrafts",
      content: {
        type: "switch",
        name: "includeDrafts",
        title: "Include Drafts",
        toolTipText: "Whether to include email drafts in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Label Names or IDs",
      value: "labelIds",
      content: {
        type: "dropdownMultiple",
        name: "labelIds",
        title: "Label Names or IDs",
        toolTipText:
          "Only return messages with labels that match all of the specified label IDs. Choose from the list, or specify IDs using an expression.",
        footNote: "",
        options: [
          { label: "INBOX", value: "INBOX" },
          { label: "UNREAD", value: "UNREAD" },
          { label: "STARRED", value: "STARRED" },
          { label: "IMPORTANT", value: "IMPORTANT" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Search",
      value: "q",
      content: {
        type: "dynamicInput",
        name: "q",
        title: "Search",
        toolTipText: "Only return messages matching the specified query",
        footNote: "Use the same format as in the Gmail search box. More info.",
        options: [],
        placeholder: "has:attachment",
      },
    },
    {
      label: "Read Status",
      value: "readStatus",
      content: {
        type: "dropdownN",
        name: "readStatus",
        title: "Read Status",
        toolTipText: "",
        footNote: "Filter emails by whether they have been read or not.",
        options: [
          { label: "unread and read email", value: "unread and read email" },
          { label: "read email only", value: "read email only" },
          { label: "read emails only", value: "read emails only" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Sender",
      value: "sender",
      content: {
        type: "dynamicInput",
        name: "sender",
        title: "Sender",
        toolTipText: "Sender name or email to filter by.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
  ],
  Lt = [
    {
      label: "Attachment Prefix",
      value: "attachmentPrefix",
      content: {
        type: "dynamicInput",
        name: "attachmentPrefix",
        title: "Attachment Prefix",
        toolTipText:
          "Prefix for name of the binary property to which to write the attachment. An index starting with 0 will be added. So if name is 'attachment_' the first attachment is saved to 'attachment_0'.",
        footNote: "",
        options: [],
        placeholder: "attachment_",
        value: "attachment_",
      },
    },
    {
      label: "Download Attachments",
      value: "downloadAttachments",
      content: {
        type: "switch",
        name: "downloadAttachments",
        title: "Download Attachments",
        toolTipText: "Whether the email's attachments will be downloaded",
        footNote: "",
        options: [],
        placeholder: "",
        value: "",
      },
    },
  ],
  Qn = [
    { value: "Every Minute", label: "Every Minute", children: [] },
    {
      value: "Every Hour",
      label: "Every Hour",
      children: [
        {
          type: "input",
          title: "Minute",
          value: 10,
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Day",
      label: "Every Day",
      children: [
        {
          type: "input",
          value: 14,
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          value: 10,
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Week",
      label: "Every Week",
      children: [
        {
          type: "dropdownN",
          title: "Weekday",
          options: [
            { label: "Sunday", value: "Sunday" },
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
          ],
          toolTipText: "The weekday to trigger.",
        },
        {
          type: "input",
          value: 10,
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          value: 0,
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Month",
      label: "Every Month",
      children: [
        {
          type: "input",
          title: "Day of Month",
          value: 1,
          toolTipText: "The day of the month to trigger.",
        },
        {
          type: "input",
          title: "Hour",
          value: 14,
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          title: "Minute",
          value: 0,
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every X",
      label: "Every X",
      children: [
        {
          type: "input",
          title: "Value",
          value: 2,
          toolTipText: "All how many X minutes/hours it should trigger",
        },
        {
          type: "dropdownN",
          title: "Unit",
          toolTipText: "If it should trigger all X minutes or hours",
          options: [
            { label: "Minutes", value: "minutes" },
            { label: "Hours", value: "hours" },
          ],
        },
      ],
    },
    {
      value: "Custom",
      label: "Custom",
      children: [
        {
          type: "input",
          title: "Cron Expression",
          value: "0 0 14 * *",
          toolTipText:
            "Use custom cron expression. Values and ranges as follows:Seconds: 0-59Minutes: 0 - 59Hours: 0 - 23Day of Month: 1 - 31Months: 0 - 11 (Jan - Dec)Day of Week: 0 - 6 (Sun - Sat)",
        },
      ],
    },
  ],
  ys = (e) =>
    Object.values(
      Object.entries(e)
        .filter(([t, n]) => t.startsWith("pollTime_"))
        .reduce((t, n) => {
          const [d, i] = n,
            s = d.split("_"),
            l = `${s[0]}_${s[1]}`,
            o = s[2];
          return (
            (t[l] ??= {}),
            o
              ? o === "Hour"
                ? (t[l].hour = i)
                : o === "Minute"
                ? (t[l].minute = i)
                : o === "Day of Month"
                ? (t[l].dayOfMonth = i)
                : o === "Weekday"
                ? (t[l].weekday = i)
                : o === "Value"
                ? (t[l].value = i)
                : o === "Unit"
                ? (t[l].unit = i)
                : o === "Cron Expression" && (t[l].cronExpression = i)
              : (t[l].mode = i),
            t
          );
        }, {})
    ),
  qt = (e, t) => {
    const { nodes: n } = fe();
    console.log("from encoder top", e);
    const d = (o, c) =>
        o.reduce(
          (u, p) => (
            p in e && (c.includes(p) ? (u[p] = !!e[p]) : (u[p] = e[p])), u
          ),
          {}
        ),
      i = () =>
        d(
          [
            "includeSpamTrash",
            "includeDrafts",
            "labelIds",
            "q",
            "readStatus",
            "sender",
          ],
          ["includeSpamTrash", "includeDrafts"]
        );
    console.log("transformed filter", i());
    const s = () =>
      d(["downloadAttachments", "attachmentPrefix"], ["downloadAttachments"]);
    console.log("transformed option", s());
    const l = () => {
      const o = n().find((c) => c.id === t);
      if (o) return o.currPosition.get();
    };
    return {
      id: t,
      name: "Gmail Trigger",
      description: "Gmail reader",
      type: "GmailReader",
      parameters: {
        credentials: {
          id: "d0esgqltcbthv6156tjg",
          name: "Gmail Account",
          provider: "gmail",
          ctype: "oauth2",
        },
        pollTimes: ys(e),
        simple: !!e?.simplify,
        filters: i(),
        options: s(),
      },
      position: l(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "Last Email",
          description: "Read last email from your gmail inbox",
          type: "object",
        },
      ],
    };
  },
  ws = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = t.pollTimes,
        d = [],
        i = {},
        s = {};
      return (
        n &&
          n.forEach((l) => {
            const o = `pollTime_${Math.random().toString(36).substring(2, 8)}`;
            d.push(o),
              (i[o] = l.mode),
              (s[o] = l.mode),
              "hour" in l && (s[`${o}_Hour`] = l.hour),
              "minute" in l && (s[`${o}_Minute`] = l.minute),
              "dayOfMonth" in l && (s[`${o}_Day of Month`] = l.dayOfMonth),
              "weekday" in l && (s[`${o}_Weekday`] = l.weekday),
              "value" in l && (s[`${o}_Value`] = l.value),
              "unit" in l && (s[`${o}_Unit`] = l.unit),
              "cronExpression" in l &&
                (s[`${o}_Cron Expression`] = l.cronExpression);
          }),
        {
          simplify: t?.simple,
          pollTimes: { parsedPollTimes: d, parseModesData: s, parsedModes: i },
          filters: t?.filters,
          options: t?.options,
        }
      );
    }
  };
function $s() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P([]),
    [s, l] = P([]),
    [o, c] = P([]),
    [u, p] = P({}),
    [m, h] = P({});
  P({});
  const [T, N] = P([]),
    [x, A] = P([]),
    [y, S] = P({}),
    [w, g] = P({}),
    [b, C] = P(""),
    R = new Set();
  Oe(() => {
    i(Mt), l(Lt);
  });
  const v = () => {
      S({}), c([]), p({}), h({}), A([]), N([]), g({}), i(Mt), l(Lt);
    },
    f = (E, _) => {
      if (
        (console.log("from data handler raw >>>> ", E, " >>>>> ", _),
        console.log("before check from data handler", w()),
        E in w())
      ) {
        if (w()[E] === _) {
          console.log(
            "from data handler:::: >> submitted Data,>>> data unchanged, key unchanged",
            y()
          ),
            S((L) => ({ ...L, [E]: _ })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              y()
            ),
            console.log(
              "from data handler:::: >> form data >>> data unchanged, key unchanged",
              e()
            );
          return;
        } else if (w()[E] !== _) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            w()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              y()
            ),
            S((j) => ({ ...j, [E]: _ })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              y()
            );
          const L = qt(y(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            L
          ),
            t({ ...e(), [n().id]: L }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", w()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            y()
          ),
          S((j) => ({ ...j, [E]: _ })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            y()
          );
        const L = qt(y(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          L
        ),
          t({ ...e(), [n().id]: L }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    k = (E) => {
      console.log("from data remover raw >>>> ", E, " >>>>>> "),
        console.log(" from data remover submitted>>>> pre data", y()),
        S((L) =>
          Object.entries(L).reduce(
            (j, [H, J]) => (H.includes(E) || (j[H] = J), j),
            {}
          )
        ),
        console.log(" from data remover submitted>>>> post data", y());
      const _ = qt(y(), n().id);
      console.log("from data remover >>>>> formattedPrev", _),
        t({ ...e(), [n().id]: _ }),
        console.log("from data remover >>> form data", e());
    },
    $ = (E, _, L) => {
      console.log(E, "not ok");
      const j = E.flatMap((H) => _.filter((J) => J.value === H));
      console.log(j, "ok"), L((H) => [...H, ...j]);
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          T(),
          `
`,
          x()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(w(), "from outside"),
        !R.has(n().id))
      ) {
        R.clear(), R.add(n().id), C(n().id);
        const E = e()[n().id];
        if ((console.log("data1", E), !E)) {
          v();
          return;
        }
        v(), console.log("data2", E);
        const _ = ws(E);
        _ &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            _?.filters,
            _.options
          ),
          g((L) => ({
            ...L,
            simplify: _.simplify,
            ..._.pollTimes.parseModesData,
            ..._.filters,
            ..._.options,
          })),
          console.log(w(), "from inside"),
          console.log(_.pollTimes.parseModesData, "from inside parseModesData"),
          c(_.pollTimes.parsedPollTimes ?? []),
          p(_.pollTimes.parsedModes ?? {}),
          $(Object.keys(_.filters), Mt, A),
          i(() => Mt.filter((L) => x().every((j) => j.value !== L.value))),
          $(Object.keys(_.options), Lt, N),
          l(() => Lt.filter((L) => T().every((j) => j.value !== L.value))));
      }
    }),
    {
      pollTimes: o,
      setPollTimes: c,
      mode: u,
      setMode: p,
      selectedOptions: T,
      setSelectedOptions: N,
      selectedFilter: x,
      setSelectedFilter: A,
      submittedData: y,
      dataHandler: f,
      modeChild: m,
      setModeChild: h,
      filters: d,
      setFilters: i,
      options: s,
      setOptions: l,
      previousData: w,
      setPreviousData: g,
      setSubmittedData: S,
      dataRemoveHandler: k,
      uniqueKey: b,
    }
  );
}
var _s = D(
    '<div><form class=form id=gmail-triggerForm><div class=space-y-5><div><div class="label hr-solid-line">Pool Times</div><div class=mt-5></div></div><div></div><div></div><div><div class="label hr-solid-line">Filters</div><div class="space-y-6 mt-5"></div><div class=mt-6></div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div><div class=mt-6>'
  ),
  Ts = D(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Cs = D('<div class="space-y-4 mt-5">'),
  Is = D(
    '<div><div class=pt-9><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div></div><div class=w-full>'
  ),
  ot = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const Ss = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
    {
      pollTimes: i,
      setPollTimes: s,
      mode: l,
      setMode: o,
      selectedOptions: c,
      setSelectedOptions: u,
      selectedFilter: p,
      setSelectedFilter: m,
      previousData: h,
      dataHandler: T,
      modeChild: N,
      setModeChild: x,
      setFilters: A,
      filters: y,
      options: S,
      setOptions: w,
      dataRemoveHandler: g,
      uniqueKey: b,
    } = $s(),
    C = (v, f) =>
      Object.entries(v).reduce(
        (k, [$, E]) => ($.startsWith(f) || (k[$] = E), k),
        {}
      ),
    R = (v) => {
      v.preventDefault();
      const f = new FormData(v.target);
      let k = {
        ...Object.fromEntries(f.entries()),
        labelIds: f.getAll("labelIds"),
      };
      console.log("unformatted data", k);
      const $ = qt(k, t().id);
      d({ ...n(), [t().id]: $ }), console.log("formattedData", $);
      const E = new CustomEvent("RIN", { detail: k, bubbles: !0 }),
        _ = document.getElementById("submitBtn");
      _ && _.dispatchEvent(E);
    };
  return (() => {
    var v = _s(),
      f = v.firstChild,
      k = f.firstChild,
      $ = k.firstChild,
      E = $.firstChild,
      _ = E.nextSibling,
      L = $.nextSibling,
      j = L.nextSibling,
      H = j.nextSibling,
      J = H.firstChild,
      te = J.nextSibling,
      Y = te.nextSibling,
      ie = H.nextSibling,
      q = ie.firstChild,
      G = q.nextSibling,
      K = G.nextSibling;
    return (
      f.addEventListener("submit", R),
      r(
        k,
        a(et, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        $
      ),
      r(
        _,
        (() => {
          var I = ce(() => i().length <= 0);
          return () => I() && Ts();
        })(),
        null
      ),
      r(
        _,
        a(pe, {
          get each() {
            return i();
          },
          children: (I, ae) =>
            (() => {
              var ne = Is(),
                le = ne.firstChild,
                de = le.firstChild,
                ee = le.nextSibling;
              return (
                (de.$$click = () => {
                  s(i().filter((F, M) => F !== I)),
                    console.log("pre-previous", h()),
                    console.log("from delete handler: previous", l(), N()),
                    o((F) => C(F, I)),
                    x((F) => C(F, I)),
                    console.log("from delete handler:after", l(), N()),
                    g(I),
                    console.log("post-previous", h());
                }),
                r(de, a(ve, {})),
                r(
                  ee,
                  a(Ee, {
                    name: I,
                    get uniqueKey() {
                      return b();
                    },
                    get defaultValue() {
                      return l()[I] || Qn[1].value;
                    },
                    options: Qn,
                    title: "Mode",
                    toolTipText: "How often to trigger.",
                    onChange: (F) => {
                      T(I, F.value),
                        o((M) => {
                          const B = { ...M };
                          return (B[I] = `${F.value}`), B;
                        }),
                        x((M) => {
                          const B = { ...M };
                          return (B[I] = F.children ?? []), B;
                        });
                    },
                  }),
                  null
                ),
                r(
                  ee,
                  a(se, {
                    get when() {
                      return N()[I];
                    },
                    get children() {
                      var F = Cs();
                      return (
                        r(
                          F,
                          a(pe, {
                            get each() {
                              return N()[I];
                            },
                            children: (M, B) => {
                              if (M.type === "input")
                                return a(he, {
                                  get name() {
                                    return `${I}_${M.title}`;
                                  },
                                  get title() {
                                    return M.title;
                                  },
                                  get toolTipText() {
                                    return M.toolTipText;
                                  },
                                  isArrow: !0,
                                  get value() {
                                    return (
                                      h()[`${I}_${M.title}`] || M.value || ""
                                    );
                                  },
                                  onInput: (O, W) => {
                                    T(`${I}_${M.title}`, O);
                                  },
                                });
                              if (M.type === "dropdownN")
                                return a(Ce, {
                                  get name() {
                                    return `${I}_${M.title}`;
                                  },
                                  get uniqueKey() {
                                    return b();
                                  },
                                  get title() {
                                    return M.title;
                                  },
                                  get options() {
                                    return M.options ?? [];
                                  },
                                  get defaultValue() {
                                    return (
                                      h()[`${I}_${M.title}`] ||
                                      M.options?.[0]?.value
                                    );
                                  },
                                  get toolTipText() {
                                    return M.toolTipText;
                                  },
                                  onChange: (O) => {
                                    T(`${I}_${M.title}`, O.value);
                                  },
                                });
                            },
                          })
                        ),
                        F
                      );
                    },
                  }),
                  null
                ),
                Z(() =>
                  z(
                    ne,
                    `mb-10 flex flex-row gap-1.5 items-top group ${
                      ae() !== 0
                        ? "border-t border-dashed border-[#727171] pt-3"
                        : ""
                    }`
                  )
                ),
                ne
              );
            })(),
        }),
        null
      ),
      r(
        $,
        a(Ze, {
          onClick: () => {
            s([
              ...i(),
              `pollTime_${Math.random().toString(36).substring(2, 8)}`,
            ]);
          },
          label: "Add Poll Time",
        }),
        null
      ),
      r(
        L,
        a(Ce, {
          name: "event",
          title: "Event",
          get uniqueKey() {
            return b();
          },
          get defaultValue() {
            return h().event;
          },
          options: [{ label: "Message received", value: "Message received" }],
          onChange: (I) => {},
        })
      ),
      r(
        j,
        a(Se, {
          title: "Simplify",
          name: "simplify",
          get uniqueKey() {
            return b();
          },
          get checked() {
            return h().simplify;
          },
          toolTipText:
            "Whether to return a simplified version of the response instead of the raw data.",
          onChange: (I) => {
            T("simplify", I);
          },
        })
      ),
      r(
        te,
        a(pe, {
          get each() {
            return p();
          },
          children: (I, ae) => {
            if (I.content.type === "switch")
              return (() => {
                var ne = ot(),
                  le = ne.firstChild;
                return (
                  (le.$$click = () => {
                    const de = p().filter((ee) => ee.value !== I.value);
                    m(de), A([...y(), I]), g(I.value);
                  }),
                  r(le, a(ve, {})),
                  r(
                    ne,
                    a(Se, {
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get uniqueKey() {
                        return b();
                      },
                      get checked() {
                        return h()[I.content.name];
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      onChange: (de) => {
                        T(I.content.name, de);
                      },
                    }),
                    null
                  ),
                  ne
                );
              })();
            if (I.content.type === "dynamicInput")
              return (() => {
                var ne = ot(),
                  le = ne.firstChild;
                return (
                  (le.$$click = () => {
                    const de = p().filter((ee) => ee.value !== I.value);
                    m(de), A([...y(), I]), g(I.value);
                  }),
                  r(le, a(ve, {})),
                  r(
                    ne,
                    a(he, {
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return I.content.footNote;
                      },
                      get placeholder() {
                        return I.content.placeholder ?? "";
                      },
                      get value() {
                        return h()[I.content.name];
                      },
                      onInput: (de) => {
                        T(I.content.name, de);
                      },
                    }),
                    null
                  ),
                  ne
                );
              })();
            if (I.content.type === "dropdownMultiple")
              return (() => {
                var ne = ot(),
                  le = ne.firstChild;
                return (
                  (le.$$click = () => {
                    const de = p().filter((ee) => ee.value !== I.value);
                    m(de), A([...y(), I]), g(I.value);
                  }),
                  r(le, a(ve, {})),
                  r(
                    ne,
                    a(Hr, {
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get options() {
                        return I.content.options;
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      get defaultSelectedOptions() {
                        return h()[I.content.name] || [];
                      },
                      get footNote() {
                        return I.content.footNote;
                      },
                      onChange: (de) => {
                        T(
                          I.content.name,
                          de.map((ee) => ee.value)
                        );
                      },
                    }),
                    null
                  ),
                  ne
                );
              })();
            if (I.content.type === "dropdownN")
              return (() => {
                var ne = ot(),
                  le = ne.firstChild;
                return (
                  (le.$$click = () => {
                    const de = p().filter((ee) => ee.value !== I.value);
                    m(de), A([...y(), I]), g(I.value);
                  }),
                  r(le, a(ve, {})),
                  r(
                    ne,
                    a(Ce, {
                      get uniqueKey() {
                        return b();
                      },
                      get defaultValue() {
                        return (
                          h()[I.content.name] ?? I.content.options[0].value
                        );
                      },
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get options() {
                        return I.content.options;
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      get footNote() {
                        return I.content.footNote;
                      },
                      onChange: (de) => {
                        T(I.content.name, de.value);
                      },
                    }),
                    null
                  ),
                  ne
                );
              })();
          },
        })
      ),
      r(
        Y,
        a(Pe, {
          name: "filter",
          dropdownOptions: y,
          setDropdownOptions: A,
          selectedOptions: p,
          setSelectedOptions: m,
          placeholder: "Add filter",
          onChange: (I) => {},
        })
      ),
      r(
        G,
        a(pe, {
          get each() {
            return c();
          },
          children: (I, ae) => {
            if (I.content.type === "switch")
              return (() => {
                var ne = ot(),
                  le = ne.firstChild;
                return (
                  (le.$$click = () => {
                    const de = c().filter((ee) => ee.value !== I.value);
                    u(de), w([...S(), I]), g(I.value);
                  }),
                  r(le, a(ve, {})),
                  r(
                    ne,
                    a(Se, {
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get uniqueKey() {
                        return b();
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      get checked() {
                        return h()[I.content.name] ?? !1;
                      },
                      onChange: (de) => {
                        T(I.content.name, de);
                      },
                    }),
                    null
                  ),
                  ne
                );
              })();
            if (I.content.type === "dynamicInput")
              return (() => {
                var ne = ot(),
                  le = ne.firstChild;
                return (
                  (le.$$click = () => {
                    const de = c().filter((ee) => ee.value !== I.value);
                    u(de), w([...S(), I]), g(I.value);
                  }),
                  r(le, a(ve, {})),
                  r(
                    ne,
                    a(he, {
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return I.content.footNote;
                      },
                      get value() {
                        return h()[I.content.name] || I.content.value || "";
                      },
                      onInput: (de) => {
                        T(I.content.name, de);
                      },
                    }),
                    null
                  ),
                  ne
                );
              })();
          },
        })
      ),
      r(
        K,
        a(Pe, {
          name: "options_gmail_node",
          dropdownOptions: S,
          setDropdownOptions: w,
          selectedOptions: c,
          setSelectedOptions: u,
          placeholder: "Add Options",
          onChange: (I) => {},
        })
      ),
      Z(() => ue(v, "id", t().id)),
      v
    );
  })();
};
be(["click"]);
const _n = [
    {
      value: "Tools Agent",
      label: "Tools Agent",
      description: `
        Utilizes structured tool schemas for precise and reliable tool selection and execution. Recommended for complex tasks requiring accurate and consistent tool usage, but only usable with models that support tool calling.`,
    },
    {
      value: "Conversational Agent",
      label: "Conversational Agent",
      description: `
        Describes tools in the system prompt and parses JSON responses for tool calls. More flexible but potentially less reliable than the Tools Agent. Suitable for simpler interactions or with models not supporting structured schemas.`,
    },
    {
      value: "OpenAI Functions Agent",
      label: "OpenAI Functions Agent",
      description: `
        Leverages OpenAI's function calling capabilities to precisely select and execute tools. Excellent for tasks requiring structured outputs when working with OpenAI models.`,
    },
    {
      value: "Plan and Execute Agent",
      label: "Plan and Execute Agent",
      description:
        "Creates a high-level plan for complex tasks and then executes each step. Suitable for multi-stage problems or when a strategic approach is needed.",
    },
    {
      value: "ReAct Agent",
      label: "ReAct Agent",
      description:
        "Combines reasoning and action in an iterative process. Effective for tasks that require careful analysis and step-by-step problem-solving.",
    },
    {
      value: "SQL Agent",
      label: "SQL Agent",
      description:
        "Specializes in interacting with SQL databases. Ideal for data analysis tasks, generating queries, or extracting insights from structured data.",
    },
  ],
  Tn = [
    {
      value: "ConnectedChatTriggerNode",
      label: "Connected Chat Trigger Node",
      description:
        "Looks for an input field called 'chatInput' that is coming from a directly connected Chat Trigger.",
      children: [],
    },
    {
      value: "Define below",
      label: "DefineBelow",
      description:
        "Use an expression to reference data in previous nodes or enter static text.",
      children: [],
    },
  ],
  sn = [
    {
      label: "System Message",
      value: "systemMessage",
      content: {
        type: "textArea",
        title: "System Message",
        value: "You are a helpful assistant.",
        name: "systemMessage",
        toolTipText:
          "The message that will be sent to the agent before the conversation starts.",
      },
    },
    {
      label: "Max Iterations",
      value: "maxIterations",
      content: {
        type: "input",
        title: "Max Iterations",
        value: "10",
        name: "maxIterations",
        toolTipText:
          "The maximum number of iterations the agent will run before stopping.",
      },
    },
    {
      label: "Return Intermediate Steps",
      value: "returnIntermediateSteps",
      content: {
        type: "switch",
        title: "Return Intermediate Steps",
        name: "returnIntermediateSteps",
        toolTipText:
          "Whether or not the output should include intermediate steps the agent took",
      },
    },
    {
      label: "Automatically Passthrough Binary Images",
      value: "passthroughBinaryImages",
      content: {
        type: "switch",
        title: "Automatically Passthrough Binary Images",
        name: "passthroughBinaryImages",
        toolTipText:
          "Whether or not binary images should be automatically passed through to the agent as image type messages.",
      },
    },
  ],
  Cn = [
    {
      label: "MySQL",
      value: "mysql",
      description: "Connected to a MySQL Database",
    },
    {
      label: "Postgres",
      value: "postgres",
      description: "Connected to a Postgres Database",
    },
    {
      label: "SQLite",
      value: "sqlite",
      description: "Use SQLite by connecting a database file as binary input.",
    },
  ];
var Es = D("<div class=relative><textarea autocomplete=off rows=3>"),
  Os = D("<label class=label>"),
  Ds = D("<div class=toolTipBtn>"),
  ks = D(
    '<div class="absolute right-3 top-1/2 transform -translate-y-1/2"><svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class=text-red-500><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17 .01 0">'
  );
const Qe = (e) => {
  const [t, n] = P(""),
    [d, i] = P(!0),
    [s, l] = P("");
  $e(() => {
    const c = `${e.uniqueKey}-${e.name}`;
    c !== s() &&
      (console.log("unique key from inside", e.uniqueKey),
      i(e.value?.trim() === "" || !1),
      l(c),
      e.onInput?.(e.value || ""));
  });
  const o = (c) => {
    const p = c.target.value;
    n(p), i(p.trim() === ""), e.onInput?.(p || "");
  };
  return (() => {
    var c = Es(),
      u = c.firstChild;
    return (
      r(
        c,
        (() => {
          var p = ce(() => !!e.title);
          return () =>
            p() &&
            (() => {
              var m = Os();
              return (
                r(m, () => e.title, null),
                r(
                  m,
                  (() => {
                    var h = ce(() => !!e.toolTipText);
                    return () =>
                      h() &&
                      (() => {
                        var T = Ds();
                        return (
                          r(
                            T,
                            a(Fe, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          T
                        );
                      })();
                  })(),
                  null
                ),
                Z(() => ue(m, "for", e.name)),
                m
              );
            })();
        })(),
        u
      ),
      (u.$$input = o),
      r(
        c,
        (() => {
          var p = ce(() => !!d());
          return () => p() && ks();
        })(),
        null
      ),
      Z(
        (p) => {
          var m = e.name,
            h = e.placeholder || "Type here...",
            T = `
              w-full px-4 py-3 pr-12 
              bg-[#252434] text-white 
              rounded-lg resize-none 
              placeholder-gray-400
              focus:outline-none
              transition-all duration-200
              ${
                d()
                  ? "border-1 border-[#b46262] focus:border-[#888484]"
                  : "border-1 border-[#dad7d742] focus:border-[#888484]"
              }
            `;
          return (
            m !== p.e && ue(u, "name", (p.e = m)),
            h !== p.t && ue(u, "placeholder", (p.t = h)),
            T !== p.a && z(u, (p.a = T)),
            p
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      Z(() => (u.value = e.value || "")),
      c
    );
  })();
};
be(["input"]);
var Ns = D(
  '<div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-light text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">'
);
const on = (e) => {
    const t = _o(() => e.children);
    return (() => {
      var n = Ns();
      return r(n, t), n;
    })();
  },
  Ht = (e, t) => {
    const { nodes: n } = fe(),
      d = (l, o) =>
        l.reduce(
          (c, u) => (
            u in e && (o.includes(u) ? (c[u] = !!e[u]) : (c[u] = e[u])), c
          ),
          {}
        ),
      i = () =>
        d(
          [
            "systemMessage",
            "maxIterations",
            "returnIntermediateSteps",
            "passthroughBinaryImages",
          ],
          ["returnIntermediateSteps", "passthroughBinaryImages"]
        ),
      s = () => {
        const l = n().find((o) => o.id === t);
        if (l)
          return {
            x: Math.trunc(l.currPosition.get().x),
            y: Math.trunc(l.currPosition.get().y),
          };
      };
    return {
      id: t,
      name: "AI Agent",
      description: "AI Agent",
      type: "LangChainAgent",
      parameters: {
        agent: e?.agent,
        promptType: e?.sourceForPrompt,
        text: e?.promptDefineBelow || e?.promptConnectedChatTriggerNode || "",
        options: i(),
      },
      position: s(),
      inputs: [
        {
          id: "input",
          name: "fromEdit",
          description: "data coming from previous node",
          type: "object",
        },
        {
          id: "chatModel",
          name: "from ollamaChatModel1",
          description: "data coming from ollama node",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "agent output",
          description: "reAct agent",
          type: "object",
        },
      ],
    };
  },
  As = (e) => {
    if (e) {
      const { parameters: t } = e;
      return {
        agent: t?.agent,
        sourceForPrompt: t?.promptType,
        promptDefineBelow: t?.text,
        promptConnectedChatTriggerNode: t?.text,
        options: t?.options,
      };
    }
  };
function Ps() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P(_n[0].value),
    [s, l] = P(Tn[0].value),
    [o, c] = P(Cn[0].value),
    [u, p] = P([]),
    [m, h] = P([]),
    [T, N] = P({}),
    [x, A] = P({}),
    [y, S] = P(""),
    w = new Set(),
    g = () => {
      h(sn), p([]), N({}), A({});
    },
    b = (v, f) => {
      if (
        (console.log("from data handler raw >>>> ", v, " >>>>> ", f),
        console.log("before check: previous data from dataHandler", x()),
        v in x())
      ) {
        if (x()[v] === f) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            T()
          ),
            N((k) => ({ ...k, [v]: f })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              T()
            );
          return;
        } else if (x()[v] !== f) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            x()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              T()
            ),
            N(($) => ({ ...$, [v]: f })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              T()
            );
          const k = Ht(T(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            k
          ),
            t({ ...e(), [n().id]: k }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", x()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            T()
          ),
          N(($) => ({ ...$, [v]: f })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            T()
          );
        const k = Ht(T(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          k
        ),
          t({ ...e(), [n().id]: k }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    C = (v) => {
      console.log("from data remover raw >>>> ", v, " >>>>>> "),
        N((k) =>
          Object.entries(k).reduce(
            ($, [E, _]) => (E.includes(v) || ($[E] = _), $),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", T());
      const f = Ht(T(), n().id);
      console.log("from data remover >>>>> formattedPrev", f),
        t({ ...e(), [n().id]: f }),
        console.log("from data remover >>> form data", e());
    },
    R = (v, f, k) => {
      console.log(v, "not ok");
      const $ = v.flatMap((E) => f.filter((_) => _.value === E));
      console.log($, "ok"), k((E) => [...E, ...$]);
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          u()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(x(), "from outside"),
        !w.has(n().id))
      ) {
        w.clear(), w.add(n().id), S(n().id);
        const v = e()[n().id];
        if ((console.log("data1", v), g(), !v)) return;
        console.log("data2", v);
        const f = As(v);
        f &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            f.agent,
            f.sourceForPrompt
          ),
          A((k) => ({
            ...k,
            agent: f.agent,
            sourceForPrompt: f.sourceForPrompt,
            promptDefineBelow: f.promptDefineBelow,
            promptConnectedChatTriggerNode: f.promptConnectedChatTriggerNode,
            ...f.options,
          })),
          console.log(x(), "from inside"),
          console.log(f.sourceForPrompt, "from inside createEffect"),
          i(f.agent),
          l(f.sourceForPrompt),
          R(Object.keys(f.options), sn, p),
          h(() => sn.filter((k) => u().every(($) => $.value !== k.value))));
      }
    }),
    {
      selectedOptions: u,
      setSelectedOptions: p,
      submittedData: T,
      dataInsertHandler: b,
      options: m,
      setOptions: h,
      previousData: x,
      setPreviousData: A,
      setSubmittedData: N,
      dataRemoveHandler: C,
      reset: g,
      uniqueKey: y,
      currentAgent: d,
      setCurrentAgent: i,
      currentSourceForPrompt: s,
      setCurrentSourceForPrompt: l,
      dataSource: o,
      setDataSource: c,
    }
  );
}
var Vs = D('<a href=# class="font-semibold text-[#fe705a]">tutorial'),
  Ms = D('<a href=# class="font-semibold text-[#fe705a]">example'),
  Ls = D(
    `<div class="mt-5 space-y-5"><div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-extralight text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">Pass the SQLite database into this node as binary data, e.g. by inserting a 'Read/Write Files from Disk' node beforehand</div><div>`
  ),
  Fs = D('<div class="mt-5 space-y-5"><div></div><div>'),
  Bs = D("<div class=mt-5>"),
  Rs = D(
    '<form class=form id=ai-agentForm><div><div></div><div class=mt-5><div class=mt-4></div></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  eo = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  qs = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1></div>;'
  );
const Hs = (e) => {
  const { currentFormConfig: t } = fe(),
    { formData: n, setFormData: d } = fe(),
    {
      selectedOptions: i,
      setSelectedOptions: s,
      dataInsertHandler: l,
      options: o,
      setOptions: c,
      previousData: u,
      dataRemoveHandler: p,
      uniqueKey: m,
      currentAgent: h,
      setCurrentAgent: T,
      currentSourceForPrompt: N,
      setCurrentSourceForPrompt: x,
      dataSource: A,
      setDataSource: y,
    } = Ps(),
    S = () => h() === "Tools Agent" || h() === "Conversational Agent",
    w = (g) => {
      g.preventDefault();
      const b = new FormData(g.target);
      let C = Object.fromEntries(b.entries());
      const R = Ht(C, t().id);
      d({ ...n(), [t().id]: R }), console.log(R);
      const v = new CustomEvent("formSubmitEvent", { detail: C, bubbles: !0 }),
        f = document.getElementById("submitBtn");
      f && f.dispatchEvent(v);
    };
  return (() => {
    var g = Rs(),
      b = g.firstChild,
      C = b.firstChild,
      R = C.nextSibling,
      v = R.firstChild,
      f = R.nextSibling,
      k = f.firstChild,
      $ = k.nextSibling,
      E = $.nextSibling;
    return (
      g.addEventListener("submit", w),
      r(
        b,
        a(se, {
          get when() {
            return S();
          },
          get children() {
            return a(on, {
              get children() {
                return [
                  "Tip: Get a feel for agents with our quick",
                  " ",
                  Vs(),
                  " ",
                  "or see an",
                  " ",
                  Ms(),
                  " ",
                  "of how this node works",
                ];
              },
            });
          },
        }),
        C
      ),
      r(
        C,
        a(Ee, {
          name: "agent",
          title: "Agent",
          get uniqueKey() {
            return m();
          },
          get defaultValue() {
            return _n[0].value;
          },
          options: _n,
          onChange: (_) => {
            T(_.value), l("agent", _.value);
          },
        })
      ),
      r(
        b,
        a(se, {
          get when() {
            return h() === "SQL Agent";
          },
          get children() {
            var _ = Fs(),
              L = _.firstChild,
              j = L.nextSibling;
            return (
              r(
                L,
                a(Ce, {
                  name: "dataSource",
                  options: Cn,
                  title: "Data Source",
                  get uniqueKey() {
                    return m();
                  },
                  get defaultValue() {
                    return Cn[0].value;
                  },
                  onChange: (H) => {
                    y(H.value), l("dataSource", H);
                  },
                })
              ),
              r(
                _,
                a(se, {
                  get when() {
                    return A() === "sqlite";
                  },
                  get children() {
                    var H = Ls(),
                      J = H.firstChild,
                      te = J.nextSibling;
                    return (
                      r(
                        te,
                        a(he, {
                          name: "inputBinaryField",
                          title: "Input Binary Field",
                          get uniqueKey() {
                            return m();
                          },
                          placeholder: "e.g. Data",
                          value: "",
                          footNote:
                            "The name of the input binary field containing the file to be extracted",
                          isArrow: !0,
                          onInput: (Y) => {
                            l("inputBinaryField", Y);
                          },
                        })
                      ),
                      H
                    );
                  },
                }),
                j
              ),
              r(
                j,
                a(se, {
                  get when() {
                    return A() !== "sqlite";
                  },
                  get children() {
                    return a(et, {
                      get name() {
                        return `credential_for_${A()}`;
                      },
                      get title() {
                        return `Credential for ${A()}`;
                      },
                      placeholder: "Select Credential",
                    });
                  },
                })
              ),
              _
            );
          },
        }),
        R
      ),
      r(
        R,
        a(Ee, {
          name: "sourceForPrompt",
          title: "Source for Prompt (User message)",
          get uniqueKey() {
            return m();
          },
          options: Tn,
          get defaultValue() {
            return Tn[0].value;
          },
          onChange: (_) => {
            x(_.value), l("sourceForPrompt", _.value);
          },
        }),
        v
      ),
      r(
        v,
        a(se, {
          get when() {
            return N() === "DefineBelow";
          },
          get children() {
            return a(Qe, {
              name: "promptDefineBelow",
              title: "Prompt (User message)",
              get value() {
                return u().promptDefineBelow;
              },
              get uniqueKey() {
                return m();
              },
              placeholder: "e.g. Hello, how can you help me?",
              onInput: (_) => {
                l(`prompt${N()}`, _);
              },
            });
          },
        }),
        null
      ),
      r(
        v,
        a(se, {
          get when() {
            return N() === "ConnectedChatTriggerNode";
          },
          get children() {
            return a(he, {
              name: "promptConnectedChatTriggerNode",
              title: "Prompt (User message)",
              placeholder: "{{ $json.chatInput }}",
              get uniqueKey() {
                return m();
              },
              isArrow: !0,
              isExpand: !0,
              get value() {
                return u().promptConnectedChatTriggerNode;
              },
              onInput: (_) => {
                l(`prompt${N()}`, _);
              },
            });
          },
        }),
        null
      ),
      r(
        b,
        a(se, {
          get when() {
            return h() !== "SQL Agent";
          },
          get children() {
            var _ = Bs();
            return (
              r(
                _,
                a(Se, {
                  checked: !0,
                  get uniqueKey() {
                    return m();
                  },
                  title: "Require Specific Output Format",
                  name: "requireSpecificOutputFormat",
                })
              ),
              _
            );
          },
        }),
        f
      ),
      r(
        $,
        a(pe, {
          get each() {
            return i();
          },
          children: (_) => {
            if (_.content.type === "textArea")
              return (() => {
                var L = eo(),
                  j = L.firstChild,
                  H = j.nextSibling;
                return (
                  (j.$$click = () => {
                    const J = i().filter((te) => te.value !== _.value);
                    s(J), c([...o(), _]), p(_.value);
                  }),
                  r(j, a(ve, {})),
                  r(
                    H,
                    a(Qe, {
                      get name() {
                        return _.content.name;
                      },
                      get value() {
                        return _.content.value;
                      },
                      get title() {
                        return _.content.title ?? "";
                      },
                      get toolTipText() {
                        return _.content.toolTipText;
                      },
                      onInput: (J) => {
                        l(_.content.name, J);
                      },
                    })
                  ),
                  L
                );
              })();
            if (_.content.type === "input")
              return (() => {
                var L = qs(),
                  j = L.firstChild,
                  H = j.nextSibling;
                return (
                  (j.$$click = () => {
                    const J = i().filter((te) => te.value !== _.value);
                    s(J), c([...o(), _]), p(_.value);
                  }),
                  r(j, a(ve, {})),
                  r(
                    H,
                    a(he, {
                      get name() {
                        return _.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get value() {
                        return _.content.value;
                      },
                      get title() {
                        return _.content.title ?? "";
                      },
                      get toolTipText() {
                        return _.content.toolTipText;
                      },
                      onInput: (J) => {
                        l(_.content.name, J);
                      },
                    })
                  ),
                  L
                );
              })();
            if (_.content.type === "switch")
              return (() => {
                var L = eo(),
                  j = L.firstChild,
                  H = j.nextSibling;
                return (
                  (j.$$click = () => {
                    const J = i().filter((te) => te.value !== _.value);
                    s(J), c([...o(), _]), p(_.value);
                  }),
                  r(j, a(ve, {})),
                  r(
                    H,
                    a(Se, {
                      get uniqueKey() {
                        return m();
                      },
                      get checked() {
                        return u()[_.content.name];
                      },
                      get name() {
                        return _.content.name;
                      },
                      get title() {
                        return _.content.title ?? "";
                      },
                      get toolTipText() {
                        return _.content.toolTipText;
                      },
                      onChange: (J) => {
                        l(_.content.name, J);
                      },
                    })
                  ),
                  L
                );
              })();
          },
        })
      ),
      r(
        E,
        a(Pe, {
          name: "Ai Agent Options",
          placeholder: "Add Option",
          dropdownOptions: o,
          selectedOptions: i,
          setSelectedOptions: s,
          setDropdownOptions: c,
          onChange: (_) => {
            s(_);
          },
        })
      ),
      Z(() => z(C, `${S() ? "mt-5" : "mt-1"}`)),
      g
    );
  })();
};
be(["click"]);
const js = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  dn = [
    {
      label: "Sampling Temperature",
      value: "temperature",
      content: {
        type: "dynamicInput",
        title: "Sampling Temperature",
        name: "temperature",
        value: ".7",
        toolTipText:
          "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
      },
    },
    {
      label: "Top K",
      value: "topK",
      content: {
        type: "dynamicInput",
        title: "Top K",
        name: "topK",
        value: "-1.0",
        toolTipText:
          "Limits the number of highest probability vocabulary tokens to consider at each step. A higher value increases diversity but may reduce coherence. Set to -1 to disable.",
      },
    },
    {
      label: "Top P",
      value: "topP",
      content: {
        type: "dynamicInput",
        title: "Top P",
        name: "topP",
        value: "1.0",
        toolTipText:
          "Chooses from the smallest possible set of tokens whose cumulative probability exceeds the probability top_p. Helps generate more human-like text by reducing repetitions.",
      },
    },
    {
      label: "Frequency Penalty",
      value: "frequencyPenalty",
      content: {
        type: "dynamicInput",
        title: "Frequency Penalty",
        name: "frequencyPenalty",
        value: "0",
        toolTipText:
          "Adjusts the penalty for tokens that have already appeared in the generated text. Higher values discourage repetition.",
      },
    },
    {
      label: "Keep Alive",
      value: "keepAlive",
      content: {
        type: "dynamicInput",
        title: "Keep Alive",
        name: "keepAlive",
        value: "5m",
        toolTipText:
          "Specifies the duration to keep the loaded model in memory after use. Useful for frequently used models. Format: 1h30m (1 hour 30 minutes).",
      },
    },
    {
      label: "Low VRAM Mode",
      value: "lowVram",
      content: {
        type: "switch",
        title: "Low VRAM Mode",
        name: "lowVram",
        toolTipText:
          "Whether to Activate low VRAM mode, which reduces memory usage at the cost of slower generation speed. Useful for GPUs with limited memory.",
      },
    },
    {
      label: "Main GPU ID",
      value: "mainGpu",
      content: {
        type: "dynamicInput",
        title: "Main GPU ID",
        name: "mainGpu",
        value: "1",
        toolTipText:
          "Specifies the ID of the GPU to use for the main computation. Only change this if you have multiple GPUs.",
      },
    },
    {
      label: "Context Batch Size",
      value: "numBatch",
      content: {
        type: "dynamicInput",
        title: "Context Batch Size",
        name: "numBatch",
        value: "512",
        toolTipText:
          "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
      },
    },
    {
      label: "Context Length",
      value: "numCtx",
      content: {
        type: "dynamicInput",
        title: "Context Length",
        name: "numCtx",
        value: "2048",
        toolTipText:
          "The maximum number of tokens to use as context for generating the next token. Smaller values reduce memory usage, while larger values provide more context to the model.",
      },
    },
    {
      label: "Number of GPUs",
      value: "numGpus",
      content: {
        type: "dynamicInput",
        title: "Number of GPUs",
        name: "numGpus",
        value: "-1",
        toolTipText:
          "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
      },
    },
    {
      label: "Max Tokens to Generate",
      value: "maxTokensToGenerate",
      content: {
        type: "dynamicInput",
        title: "Max Tokens to Generate",
        name: "maxTokensToGenerate",
        value: "-1",
        toolTipText:
          "The maximum number of tokens to generate. Set to -1 for no limit. Be cautious when setting this to a large value, as it can lead to very long outputs.",
      },
    },
    {
      label: "Number of CPU Threads",
      value: "numThread",
      content: {
        type: "dynamicInput",
        title: "Number of CPU Threads",
        name: "numThread",
        value: "0",
        toolTipText:
          "Specifies the number of CPU threads to use for processing. Set to 0 for auto-detection.",
      },
    },
    {
      label: "Penalize Newlines",
      value: "penalizeNewline",
      content: {
        type: "switch",
        title: "Penalize Newlines",
        name: "penalizeNewline",
        toolTipText:
          "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
      },
    },
    {
      label: "Presence Penalty",
      value: "presencePenalty",
      content: {
        type: "dynamicInput",
        title: "Presence Penalty",
        name: "presencePenalty",
        value: "0",
        toolTipText:
          "Adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.",
      },
    },
    {
      label: "Repetition Penalty",
      value: "repeatPenalty",
      content: {
        type: "dynamicInput",
        title: "Repetition Penalty",
        name: "repeatPenalty",
        value: "1",
        toolTipText:
          "Adjusts the penalty factor for repeated tokens. Higher values more strongly discourage repetition. Set to 1.0 to disable repetition penalty.",
      },
    },
    {
      label: "Use Memory Locking",
      value: "useMLock",
      content: {
        type: "switch",
        title: "Use Memory Locking",
        name: "useMLock",
        toolTipText:
          "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
      },
    },
    {
      label: "Use Memory Mapping",
      value: "useMMap",
      content: {
        type: "switch",
        title: "Use Memory Mapping",
        name: "useMMap",
        toolTipText:
          "Whether to use memory mapping for loading the model. This can reduce memory usage but may impact performance. Recommended to keep enabled.",
      },
    },
    {
      label: "Load Vocabulary Only",
      value: "vocabOnly",
      content: {
        type: "switch",
        title: "Load Vocabulary Only",
        name: "vocabOnly",
        toolTipText:
          "Whether to only load the model vocabulary without the weights. Useful for quickly testing tokenization.",
      },
    },
    {
      label: "Output Format",
      value: "format",
      content: {
        type: "dropdownN",
        title: "Output Format",
        name: "format",
        options: [
          { label: "JSON", value: "JSON" },
          { label: "Default", value: "Default" },
        ],
        toolTipText:
          "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
      },
    },
  ],
  jt = (e, t) => {
    const { nodes: n } = fe(),
      d = (l, o) =>
        l.reduce(
          (c, u) => (
            u in e && (o.includes(u) ? (c[u] = !!e[u]) : (c[u] = e[u])), c
          ),
          {}
        ),
      i = () =>
        d(
          [
            "temperature",
            "topK",
            "topP",
            "frequencyPenalty",
            "keepAlive",
            "lowVram",
            "mainGpu",
            "numBatch",
            "numCtx",
            "numGpu",
            "numThread",
            "penalizeNewline",
            "presencePenalty",
            "repeatPenalty",
            "useMLock",
            "useMMap",
            "vocabOnly",
            "format",
          ],
          ["penalizeNewline", "vocabOnly", "useMMap", "useMLock", "lowVram"]
        ),
      s = () => {
        const l = n().find((o) => o.id === t);
        if (l)
          return {
            x: Math.trunc(l.currPosition.get().x),
            y: Math.trunc(l.currPosition.get().y),
          };
      };
    return {
      id: t,
      name: "Ollama Chat Model",
      description: "Ollama Chat Model",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: e?.model || "",
        options: i(),
      },
      position: s(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "ollma_output",
          description: "ollama output port",
          type: "object",
        },
      ],
    };
  },
  zs = (e) => {
    if (e) {
      const { parameters: t } = e;
      return { model: t?.model, options: t?.options };
    }
  };
function Ws() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P([]),
    [s, l] = P([]),
    [o, c] = P({}),
    [u, p] = P({}),
    [m, h] = P(""),
    T = new Set(),
    N = () => {
      l(dn), i([]), c({}), p({});
    },
    x = (S, w) => {
      if (
        (console.log("from data handler raw >>>> ", S, " >>>>> ", w),
        console.log("before check: previous data from dataHandler", u()),
        S in u())
      ) {
        if (u()[S] === w) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            o()
          ),
            c((g) => ({ ...g, [S]: w })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              o()
            );
          return;
        } else if (u()[S] !== w) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            u()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              o()
            ),
            c((b) => ({ ...b, [S]: w })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              o()
            );
          const g = jt(o(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            g
          ),
            t({ ...e(), [n().id]: g }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", u()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            o()
          ),
          c((b) => ({ ...b, [S]: w })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            o()
          );
        const g = jt(o(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          g
        ),
          t({ ...e(), [n().id]: g }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    A = (S) => {
      console.log("from data remover raw >>>> ", S, " >>>>>> "),
        c((g) =>
          Object.entries(g).reduce(
            (b, [C, R]) => (C.includes(S) || (b[C] = R), b),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", o());
      const w = jt(o(), n().id);
      console.log("from data remover >>>>> formattedPrev", w),
        t({ ...e(), [n().id]: w }),
        console.log("from data remover >>> form data", e());
    },
    y = (S, w, g) => {
      console.log(S, "not ok");
      const b = S.flatMap((C) => w.filter((R) => R.value === C));
      console.log(b, "ok"), g((C) => [...C, ...b]);
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          d()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(u(), "from outside"),
        !T.has(n().id))
      ) {
        T.clear(), T.add(n().id), h(n().id);
        const S = e()[n().id];
        if ((console.log("data1", S), N(), !S)) return;
        console.log("data2", S);
        const w = zs(S);
        w &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            w.model,
            w.options
          ),
          p((g) => ({ ...g, model: w.model, ...w.options })),
          console.log(u(), "from inside"),
          console.log(w.options, "from inside createEffect"),
          y(Object.keys(w.options), dn, i),
          l(() => dn.filter((g) => d().every((b) => b.value !== g.value))));
      }
    }),
    {
      selectedOptions: d,
      setSelectedOptions: i,
      submittedData: o,
      dataInsertHandler: x,
      options: s,
      setOptions: l,
      previousData: u,
      setPreviousData: p,
      setSubmittedData: c,
      dataRemoveHandler: A,
      uniqueKey: m,
    }
  );
}
var Ks = D(
    '<form class=form id=ollama-chatForm><div><div class=space-y-5><div></div><div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div></div><div class=mt-5>'
  ),
  cn = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const Us = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
    {
      selectedOptions: i,
      setSelectedOptions: s,
      dataInsertHandler: l,
      options: o,
      setOptions: c,
      previousData: u,
      dataRemoveHandler: p,
      uniqueKey: m,
    } = Ws(),
    h = (T) => {
      T.preventDefault();
      const N = new FormData(T.target);
      let x = Object.fromEntries(N.entries());
      const A = jt(x, t().id);
      d({ ...n(), [t().id]: A });
      const y = new CustomEvent("formSubmitEvent", { detail: x, bubbles: !0 }),
        S = document.getElementById("submitBtn");
      S && S.dispatchEvent(y);
    };
  return (() => {
    var T = Ks(),
      N = T.firstChild,
      x = N.firstChild,
      A = x.firstChild,
      y = A.nextSibling,
      S = y.nextSibling,
      w = S.firstChild,
      g = w.nextSibling,
      b = S.nextSibling;
    return (
      T.addEventListener("submit", h),
      r(
        A,
        a(et, { name: "credential_ollama", placeholder: "Select a Credential" })
      ),
      r(
        y,
        a(Ce, {
          name: "model",
          title: "Model",
          get uniqueKey() {
            return m();
          },
          get defaultValue() {
            return u().model;
          },
          options: js,
          onChange: (C) => {
            l("model", C.value);
          },
        })
      ),
      r(
        g,
        a(pe, {
          get each() {
            return i();
          },
          children: (C, R) => {
            if (C.content.type === "switch")
              return (() => {
                var v = cn(),
                  f = v.firstChild;
                return (
                  (f.$$click = () => {
                    const k = i().filter(($) => $.value !== C.value);
                    s(k), c([...o(), C]), p(C.value);
                  }),
                  r(f, a(ve, {})),
                  r(
                    v,
                    a(Se, {
                      get uniqueKey() {
                        return m();
                      },
                      get checked() {
                        return u()[C.content.name];
                      },
                      get name() {
                        return C.content.name;
                      },
                      get title() {
                        return C.content.title ?? "";
                      },
                      get toolTipText() {
                        return C.content.toolTipText;
                      },
                      onChange: (k) => {
                        l(C.content.name, k);
                      },
                    }),
                    null
                  ),
                  v
                );
              })();
            if (C.content.type === "dynamicInput")
              return (() => {
                var v = cn(),
                  f = v.firstChild;
                return (
                  (f.$$click = () => {
                    const k = i().filter(($) => $.value !== C.value);
                    s(k), c([...o(), C]), p(C.value);
                  }),
                  r(f, a(ve, {})),
                  r(
                    v,
                    a(he, {
                      get name() {
                        return C.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get value() {
                        return u()[C.content.name] || C.content.value;
                      },
                      get title() {
                        return C.content.title;
                      },
                      get toolTipText() {
                        return C.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return C.content.footNote;
                      },
                      get placeholder() {
                        return C.content.placeholder ?? "";
                      },
                      onInput: (k) => {
                        l(C.content.name, k);
                      },
                    }),
                    null
                  ),
                  v
                );
              })();
            if (C.content.type === "dropdownN")
              return (() => {
                var v = cn(),
                  f = v.firstChild;
                return (
                  (f.$$click = () => {
                    const k = i().filter(($) => $.value !== C.value);
                    s(k), c([...o(), C]), p(C.value);
                  }),
                  r(f, a(ve, {})),
                  r(
                    v,
                    a(Ce, {
                      get name() {
                        return C.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get title() {
                        return C.content.title;
                      },
                      get defaultValue() {
                        return (
                          (u()[C.content.name] ||
                            C.content.options?.[0]?.value) ??
                          ""
                        );
                      },
                      get options() {
                        return C.content.options ?? [];
                      },
                      get toolTipText() {
                        return C.content.toolTipText;
                      },
                      get footNote() {
                        return C.content.footNote;
                      },
                      onChange: (k) => {
                        l(C.content.name, k.value);
                      },
                    }),
                    null
                  ),
                  v
                );
              })();
          },
        })
      ),
      r(
        b,
        a(Pe, {
          name: "Add Option",
          placeholder: "Add Option",
          selectedOptions: i,
          setSelectedOptions: s,
          dropdownOptions: o,
          setDropdownOptions: c,
          onChange: (C) => {
            s(C);
          },
        })
      ),
      T
    );
  })();
};
be(["click"]);
const Gs = [
    {
      label: "Message Button Label",
      value: "messageButtonLabel",
      content: {
        type: "dynamicInput",
        name: "messageButtonLabel",
        title: "Message Button Label",
        value: "Respond",
      },
    },
    {
      label: "Response From Title",
      value: "responseFromTitle",
      content: {
        type: "dynamicInput",
        name: "responseFromTitle",
        title: "Response From Title",
        toolTipText:
          "Title of the form that the user can access to provide their response.",
      },
    },
    {
      label: "Response From Description",
      value: "responseFromDescription",
      content: {
        type: "dynamicInput",
        name: "responseFromDescription",
        title: "Response From Description",
        toolTipText:
          "Description of the form that the user can access to provide their response",
      },
    },
    {
      label: "Response Form Button Label",
      value: "responseFormButtonLabel",
      content: {
        type: "dynamicInput",
        name: "responseFormButtonLabel",
        title: "Response Form Button Label",
        value: "Submit",
      },
    },
    {
      label: "Limit Wait Time",
      value: "limitWaitTime",
      content: {
        type: "reproductiveDropDown",
        name: "limitWaitTime",
        title: "Limit Wait Time",
        options: [
          {
            label: "After Time Interval",
            value: "afterTimeInterval",
            description: "Waits for a certain amount of time.",
          },
          {
            label: "At Specified Time",
            value: "atSpecifiedTime",
            description: "Waits until the set date and time to continue",
          },
        ],
        toolTipText:
          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
      },
    },
  ],
  un = [
    {
      value: "Text",
      label: "Text",
      description: "Send Email as Plain Text",
      children: [
        {
          type: "textArea",
          title: "Text",
          toolTipText: "Plain text message of email",
        },
      ],
    },
    {
      value: "HTML",
      label: "HTML",
      description: "Send Email as HTML",
      children: [
        {
          type: "textArea",
          title: "HTML",
          toolTipText: "HTML text message of email",
        },
      ],
    },
    {
      value: "Both",
      label: "Both",
      description:
        "Send both formats, recipient's client select version to display",
      children: [
        {
          type: "textArea",
          title: "Text",
          toolTipText: "Plain text message of email",
        },
        {
          type: "textArea",
          title: "HTML",
          toolTipText: "HTML text message of email",
        },
      ],
    },
  ],
  to = [
    {
      label: "Append n8n Attribution",
      value: "appendAttribution",
      content: {
        type: "switch",
        name: "appendAttribution",
        title: "Append n8n Attribution",
        toolTipText:
          "Whether to include the phrase “This email was sent automatically with n8n” to the end of the email",
      },
    },
    {
      label: "Attachments",
      value: "attachments",
      content: {
        type: "dynamicInput",
        name: "attachments",
        title: "Attachments",
        toolTipText:
          'Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated. Reference embedded images or other content within the body of an email message, e.g. <img src="cid:image_1">',
      },
    },
    {
      label: "CC Email",
      value: "ccEmail",
      content: {
        type: "dynamicInput",
        name: "ccEmail",
        title: "CC Email",
        value: "cc@example.com",
        toolTipText: "Email address of CC recipient",
      },
    },
    {
      label: "BCC Email",
      value: "bccEmail",
      content: {
        type: "dynamicInput",
        name: "bccEmail",
        title: "BCC Email",
        value: "cc@example.com",
        toolTipText: "Email address of BCC recipient",
      },
    },
    {
      label: "Ignore SSL Issues (Insecure)",
      value: "ignoreSSL",
      content: {
        type: "switch",
        name: "ignoreSSL",
        title: "Ignore SSL Issues (Insecure)",
        toolTipText:
          "Whether to connect even if SSL certificate validation is not possible",
      },
    },
    {
      label: "Reply To",
      value: "replyTo",
      content: {
        type: "dynamicInput",
        name: "replyTo",
        title: "Reply To",
        toolTipText: "The email address to send the reply to",
      },
    },
  ],
  gt = [
    { value: "approvedOnly", label: "Approved Only" },
    { value: "approvedAndDisapproved", label: "Approved and Disapproved" },
  ],
  vt = [
    {
      label: "After Time Interval",
      value: "afterTimeInterval",
      description: "Waits for a certain amount of time.",
    },
    {
      label: "At Specified Time",
      value: "atSpecifiedTime",
      description: "Waits until the set date and time to continue",
    },
  ],
  pn = [
    {
      value: "Approval",
      label: "Approval",
      description: "User can approve/disapprove from within the message",
    },
    {
      value: "freeText",
      label: "Free Text",
      description: "User can submit a response via a form.",
    },
    {
      label: "Custom Form",
      value: "customForm",
      description: "User can submit a response via a form.",
    },
  ],
  mn = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  hn = [
    { value: "Send", label: "Send" },
    { value: "sendAndWaitForResponse", label: "Send and Wait for Response" },
  ],
  je = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  ze = {
    type: "switch",
    title: "Required Field",
    toolTipText:
      "Whether to require the user to enter a value for this field before submitting the form",
  },
  bt = {
    type: "dynamicInput",
    title: "Placeholder",
    toolTipText: "Sample text to display inside the field.",
  },
  no = [
    { value: "text", label: "Text", children: [je, ze, bt] },
    {
      value: "customHTML",
      label: "Custom HTML",
      children: [
        {
          type: "dynamicInput",
          title: "Element Name",
          toolTipText:
            "Optional field. It can be used to include the html in the output.",
          placeholder: "e.g. content section",
        },
        {
          type: "jsonEditor",
          title: "HTML",
          toolTipText: "HTML elements to display on the form page",
          footNote: "Does not accept <script>, <style> or <input> tags",
        },
      ],
    },
    {
      value: "date",
      label: "Date",
      children: [
        je,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        ze,
      ],
    },
    {
      value: "dropDownList",
      label: "DropDown List",
      children: [
        {
          type: "inputBlock",
          title: "Field Options",
          name: "fieldOption",
          placeholder: "Add Field Option",
        },
        {
          type: "switch",
          title: "Multiple Choice",
          toolTipText:
            "Whether to allow the user to select multiple options from the dropdown list.",
        },
        ze,
        je,
      ],
    },
    { value: "email", label: "Email", children: [je, ze, bt] },
    {
      value: "file",
      label: "File",
      children: [
        je,
        ze,
        {
          type: "switch",
          title: "Multiple Files",
          toolTipText:
            "Whether to allow the user to select multiple files from the file input or just one",
        },
        {
          type: "dynamicInput",
          title: "Accepted File Types",
          toolTipText: "Comma-separated list of allowed file extensions",
          footNote: "Leave empty to allow all file types",
        },
      ],
    },
    {
      value: "hiddenField",
      label: "Hidden Field",
      children: [
        {
          type: "dynamicInput",
          title: "Field Name",
          toolTipText:
            "The name of the field, used in input attributes and referenced by the workflow",
        },
        {
          type: "dynamicInput",
          title: "Field Value",
          toolTipText:
            "Input value can be set here or will be passed as a query parameter via Field Name if no value is set",
        },
      ],
    },
    { value: "number", label: "Number", children: [je, ze, bt] },
    { value: "password", label: "Password", children: [je, ze, bt] },
    { value: "textArea", label: "Textarea", children: [je, ze, bt] },
  ];
var Xs = D("<button type=button>");
const en = ({ title: e, width: t = "w-auto", onClick: n }) =>
  (() => {
    var d = Xs();
    return (
      Le(d, "click", n),
      z(
        d,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      r(d, e),
      d
    );
  })();
be(["click"]);
var In = ((e) => (
    (e.Text = "text"),
    (e.Number = "number"),
    (e.Password = "password"),
    (e.Email = "email"),
    (e.Url = "url"),
    e
  ))(In || {}),
  Ys = D(
    '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg baseProfile=tiny version=1.2 viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M17.707 8.293a.999.999 0 1 0-1.414 1.414L17.586 11H13V6.414l1.293 1.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L12 2.586 8.293 6.293a.999.999 0 1 0 1.414 1.414L11 6.414V11H6.414l1.293-1.293a.999.999 0 1 0-1.414-1.414L2.586 12l3.707 3.707a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L6.414 13H11v4.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414L12 21.414l3.707-3.707a.999.999 0 1 0-1.414-1.414L13 17.586V13h4.586l-1.293 1.293a.999.999 0 1 0 1.414 1.414L21.414 12l-3.707-3.707z">'
  );
const ct = (e) => Ys();
var Js = D(
    '<div><div class="flex font-mono rounded bg-[#252631] min-h-[200px] max-h-[220px] "><div class="w-12 bg-[#1a1b26] border-r border-neutral-600 text-gray-400 text-sm leading-6 px-2 py-4 text-right select-none overflow-hidden">1</div><div class="flex-1 relative"><textarea autocomplete=off>'
  ),
  Zs = D("<label class=label>"),
  Qs = D("<div class=toolTipBtn>"),
  ed = D(
    '<div class="mb-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm"><span class=font-semibold>Line <!>:</span> '
  ),
  td = D('<button type=button aria-label="Toggle expanded view">'),
  nd = D("<p class=foot-note>");
const At = (e) => {
  const { setIsModalOpen3: t } = fe();
  let n, d, i;
  const [s, l] = P(null),
    o = (x) => {
      if (!x.trim()) return l(null), null;
      try {
        return JSON.parse(x), l(null), null;
      } catch (A) {
        const y = A instanceof Error ? A.message : "Invalid JSON",
          S = y.match(/line (\d+)/i) || y.match(/position (\d+)/i);
        let w = 1;
        if (S) {
          const b = parseInt(S[1]);
          w = (x.substring(0, b).match(/\n/g) || []).length + 1;
        }
        const g = { line: w, message: y };
        return l(g), g;
      }
    },
    c = (x) => {
      try {
        const A = JSON.parse(x);
        return JSON.stringify(A, null, 2);
      } catch {
        return x;
      }
    },
    u = (x) => {
      const A = x.split(`
`);
      if (i) {
        const y = A.map((S, w) => `${w + 1}`).join(`
`);
        i.textContent = y;
      }
    },
    p = (x) => {
      const y = x.target.value;
      u(y), o(y), e.onInput?.(y);
    },
    m = (x) => {
      x.preventDefault();
      const A = x.clipboardData?.getData("text") || "";
      if (A.trim())
        try {
          const y = c(A);
          n && ((n.value = y), u(y), o(y), e.onInput?.(y));
        } catch {
          n && ((n.value = A), u(A), o(A), e.onInput?.(A));
        }
    },
    h = () => {
      n && i && (i.scrollTop = n.scrollTop);
    },
    T = () => {
      e.disabled;
    },
    N = (x) => {
      setTimeout(() => h(), 0);
    };
  return (
    $e(() => {
      e.value && (u(e.value), o(e.value));
    }),
    (() => {
      var x = Js(),
        A = x.firstChild,
        y = A.firstChild,
        S = y.nextSibling,
        w = S.firstChild,
        g = d;
      typeof g == "function" ? we(g, x) : (d = x),
        r(
          x,
          (() => {
            var R = ce(() => !!e.title);
            return () =>
              R() &&
              (() => {
                var v = Zs();
                return (
                  r(v, () => e.title, null),
                  r(
                    v,
                    (() => {
                      var f = ce(() => !!e.toolTipText);
                      return () =>
                        f() &&
                        (() => {
                          var k = Qs();
                          return (
                            r(
                              k,
                              a(Fe, {
                                get content() {
                                  return e.toolTipText;
                                },
                              })
                            ),
                            k
                          );
                        })();
                    })(),
                    null
                  ),
                  Z(() => ue(v, "for", e.name)),
                  v
                );
              })();
          })(),
          A
        ),
        r(
          x,
          (() => {
            var R = ce(() => !!s());
            return () =>
              R() &&
              (() => {
                var v = ed(),
                  f = v.firstChild,
                  k = f.firstChild,
                  $ = k.nextSibling;
                return (
                  $.nextSibling,
                  f.nextSibling,
                  r(f, () => s()?.line, $),
                  r(v, () => s()?.message, null),
                  v
                );
              })();
          })(),
          A
        );
      var b = i;
      typeof b == "function" ? we(b, y) : (i = y),
        y.style.setProperty(
          "font-family",
          "Monaco, Menlo, 'Ubuntu Mono', monospace"
        ),
        y.style.setProperty("white-space", "pre-line"),
        y.style.setProperty("pointer-events", "none"),
        (w.$$keydown = N),
        w.addEventListener("focus", T),
        w.addEventListener("scroll", h),
        w.addEventListener("paste", m),
        (w.$$input = p);
      var C = n;
      return (
        typeof C == "function" ? we(C, w) : (n = w),
        r(
          S,
          (() => {
            var R = ce(() => !!e.isArrow);
            return () =>
              R() &&
              (() => {
                var v = td();
                return (
                  (v.$$click = () => t(!0)),
                  r(v, a(jr, {})),
                  Z(
                    (f) => {
                      var k = e.disabled,
                        $ = `absolute right-0 bottom-0 text-gray-400 text-[10px] bg-[#2c2e2f] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                          e.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`;
                      return (
                        k !== f.e && (v.disabled = f.e = k),
                        $ !== f.t && z(v, (f.t = $)),
                        f
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  v
                );
              })();
          })(),
          null
        ),
        r(
          x,
          (() => {
            var R = ce(() => !!e.footNote);
            return () =>
              R() &&
              (() => {
                var v = nd();
                return r(v, () => e.footNote), v;
              })();
          })(),
          null
        ),
        Z(
          (R) => {
            var v = `relative h-full w-full group ${e.class || ""}`,
              f = e.name,
              k = e.disabled,
              $ = e.placeholder || "",
              E = `${
                e.disabled ? "opacity-50 cursor-not-allowed" : ""
              } w-full h-full min-h-[200px] max-h-[220px] bg-transparent jsonMain text-white placeholder-gray-500 outline-none transition-colors resize-none px-4 py-4 leading-6`;
            return (
              v !== R.e && z(x, (R.e = v)),
              f !== R.t && ue(w, "name", (R.t = f)),
              k !== R.a && (w.disabled = R.a = k),
              $ !== R.o && ue(w, "placeholder", (R.o = $)),
              E !== R.i && z(w, (R.i = E)),
              R
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        Z(() => (w.value = e.value || "")),
        x
      );
    })()
  );
};
be(["input", "keydown", "click"]);
const od = (e, t) => ({
  id: "sendEmail1",
  name: "Send Email",
  description: "Send an SMTP protocol email",
  type: "SendEmail",
  disabled: !0,
  parameters: {
    credentials: {
      id: "d0esgqltcbthv6156tjg",
      name: "SMTP account",
      provider: "email",
      ctype: "smtp",
    },
    fromEmail: e?.fromEmail,
    toEmail: e?.toEmail,
    subject: e?.subject,
    emailFormat: e?.emailFormat,
    text: e?.emailFormat,
    options: {
      appendAttribution: e?.appendAttribution,
      attachments: e?.attachments,
      ccEmail: e?.ccEmail,
      bccEmail: e?.bccEmail,
      allowUnauthorizedCerts: !0,
      replyTo: e?.replyTo,
    },
  },
  position: { x: -14960, y: -240 },
  inputs: [
    {
      id: "input",
      name: "Input",
      description: "SendEmail input port",
      type: "object",
    },
  ],
  outputs: [],
});
var oo = D('<div class="mt-5 space-y-5">'),
  rd = D(
    '<div><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  ro = D(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  ld = D(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  lo = D(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  id = D(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  fn = D('<div class="space-y-5 mt-5">'),
  ad = D('<div class="label hr-solid-line">Form Elements'),
  sd = D("<div class=space-y-5>"),
  dd = D('<div><div class="label hr-solid-line">Options'),
  cd = D("<form id=send-emailForm><div class=space-y-5><div class=space-y-5>"),
  xt = D(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  io = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  ud = D('<div class="space-y-4 mt-5">'),
  pd = D(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  md = D(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  hd = D(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const fd = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
    [i, s] = P(hn[0]),
    [l, o] = P(un[0]),
    [c, u] = P(pn[0]),
    [p, m] = P(!1),
    [h, T] = P(gt[0]),
    [N, x] = P(!1),
    [A, y] = P(vt[0]),
    [S, w] = P([]),
    [g, b] = P([]),
    [C, R] = P(mn[0]),
    [v, f] = P([]),
    [k, $] = P({}),
    [E, _] = P({});
  Oe(() => {
    w(to);
  }),
    $e(() => {
      i().value === "Send"
        ? (w(to), b([]))
        : i().value === "sendAndWaitForResponse" &&
          (c().value === "Approval"
            ? (w([
                {
                  value: "limitWaitTime",
                  label: "Limit Wait Time",
                  content: {
                    type: "reproductiveDropDown",
                    name: "limitWaitTime",
                    title: "Limit Wait Time",
                    toolTipText: "Time at which polling should occur",
                  },
                },
              ]),
              b([]))
            : (c().value === "freeText" || c().value === "customForm") &&
              (w(Gs), b([])));
    });
  const L = (j) => {
    j.preventDefault();
    const H = new FormData(j.target);
    let J = Object.fromEntries(H.entries());
    const te = od(J, t().id);
    d({ ...n(), sendEmail: te });
  };
  return (() => {
    var j = cd(),
      H = j.firstChild,
      J = H.firstChild;
    return (
      j.addEventListener("submit", L),
      r(
        H,
        a(et, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        J
      ),
      r(
        H,
        a(Ee, {
          name: "Operation",
          title: "Operation",
          options: hn,
          get defaultValue() {
            return hn[0].value;
          },
          onChange: (te) => {
            s(te);
          },
        }),
        J
      ),
      r(
        H,
        a(he, {
          name: "fromEmail",
          title: "From Email",
          placeholder: "admin@example.com",
          toolTipText:
            "Email address of the sender. You can also specify a name: Nathan Doe <nate@n8n.io>.",
          get type() {
            return In.Email;
          },
          isArrow: !0,
        }),
        J
      ),
      r(
        H,
        a(he, {
          name: "toEmail",
          title: "To Email",
          placeholder: "info@example.com",
          toolTipText:
            "Email address of the recipient. You can also specify a name: Nathan Doe <nate@n8n.io>.",
          get type() {
            return In.Email;
          },
          isArrow: !0,
        }),
        J
      ),
      r(
        H,
        a(he, {
          name: "subject",
          title: "Subject",
          placeholder: "e.g. Approval required",
          isArrow: !0,
        }),
        J
      ),
      r(
        J,
        a(se, {
          get when() {
            return i().value === "Send";
          },
          get children() {
            return [
              a(Ee, {
                name: "emailFormat",
                title: "Email Format",
                options: un,
                get defaultValue() {
                  return un[0].value;
                },
                toolTipText: "Select the format for the email",
                onChange: (te) => {
                  o(te);
                },
              }),
              (() => {
                var te = oo();
                return (
                  r(
                    te,
                    a(pe, {
                      get each() {
                        return l()?.children;
                      },
                      children: (Y) =>
                        a(Qe, {
                          get name() {
                            return `emailFormat${Y.title}`;
                          },
                          get title() {
                            return Y.title ?? "";
                          },
                          get toolTipText() {
                            return Y.toolTipText;
                          },
                        }),
                    })
                  ),
                  te
                );
              })(),
              (() => {
                var te = rd(),
                  Y = te.firstChild,
                  ie = Y.nextSibling,
                  q = ie.nextSibling;
                return (
                  r(
                    te,
                    (() => {
                      var G = ce(() => g().length <= 0);
                      return () => G() && xt();
                    })(),
                    ie
                  ),
                  r(
                    ie,
                    a(pe, {
                      get each() {
                        return g();
                      },
                      children: (G) => {
                        if (G.content.type === "dynamicInput")
                          return (() => {
                            var K = io(),
                              I = K.firstChild,
                              ae = I.nextSibling;
                            return (
                              (I.$$click = () => {
                                const ne = g().filter(
                                  (le) => le.value !== G.value
                                );
                                b(ne), w([...S(), G]);
                              }),
                              r(I, a(ve, {})),
                              r(
                                ae,
                                a(he, {
                                  get name() {
                                    return G.content.name;
                                  },
                                  get title() {
                                    return G.content.title;
                                  },
                                  get placeholder() {
                                    return G.content.placeholder;
                                  },
                                  get toolTipText() {
                                    return G.content.toolTipText;
                                  },
                                  isArrow: !0,
                                })
                              ),
                              K
                            );
                          })();
                        if (G.content.type === "switch")
                          return (() => {
                            var K = io(),
                              I = K.firstChild,
                              ae = I.nextSibling;
                            return (
                              (I.$$click = () => {
                                const ne = g().filter(
                                  (le) => le.value !== G.value
                                );
                                b(ne), w([...S(), G]);
                              }),
                              r(I, a(ve, {})),
                              r(
                                ae,
                                a(Se, {
                                  get title() {
                                    return G.content.title ?? "";
                                  },
                                  get toolTipText() {
                                    return G.content.toolTipText;
                                  },
                                  get name() {
                                    return G.content.name;
                                  },
                                })
                              ),
                              K
                            );
                          })();
                      },
                    })
                  ),
                  r(
                    q,
                    a(Pe, {
                      name: "optionsForSendOperation",
                      placeholder: "Add option",
                      dropdownOptions: S,
                      setDropdownOptions: w,
                      selectedOptions: g,
                      setSelectedOptions: b,
                      onChange: (G) => {
                        b(G);
                      },
                    })
                  ),
                  te
                );
              })(),
            ];
          },
        }),
        null
      ),
      r(
        J,
        a(se, {
          get when() {
            return i().value === "sendAndWaitForResponse";
          },
          get children() {
            return [
              a(Qe, { name: "message", title: "Message" }),
              a(Ee, {
                name: "responseType",
                title: "Response Type",
                options: pn,
                get defaultValue() {
                  return pn[0].value;
                },
                onChange: (te) => {
                  u(te);
                },
              }),
              (() => {
                var te = fn();
                return (
                  r(
                    te,
                    a(se, {
                      get when() {
                        return c().value === "Approval";
                      },
                      get children() {
                        return [
                          (() => {
                            var Y = ld(),
                              ie = Y.firstChild,
                              q = ie.nextSibling,
                              G = q.nextSibling;
                            return (
                              r(
                                Y,
                                (() => {
                                  var K = ce(() => !p());
                                  return () => K() && xt();
                                })(),
                                q
                              ),
                              r(
                                q,
                                a(en, {
                                  onClick: () => m(!0),
                                  title: "Add Option",
                                  width: "w-full",
                                })
                              ),
                              r(
                                G,
                                a(se, {
                                  get when() {
                                    return p();
                                  },
                                  get children() {
                                    var K = ro(),
                                      I = K.firstChild,
                                      ae = I.nextSibling;
                                    return (
                                      (I.$$click = () => {
                                        m(!1), T(gt[0]);
                                      }),
                                      r(I, a(ve, {})),
                                      r(
                                        ae,
                                        a(Ee, {
                                          name: "typeOfApproval",
                                          title: "Type of Approval",
                                          options: gt,
                                          get defaultValue() {
                                            return gt[0].value;
                                          },
                                          onChange: (ne) => {
                                            T(ne);
                                          },
                                        }),
                                        null
                                      ),
                                      r(
                                        ae,
                                        a(he, {
                                          name: "approveButtonLabel",
                                          title: "Approve Button Label",
                                          value: "Approve",
                                        }),
                                        null
                                      ),
                                      r(
                                        ae,
                                        a(Ce, {
                                          name: "approveButtonStyle",
                                          title: "Approve Button Style",
                                          options: [
                                            {
                                              value: "primary",
                                              label: "Primary",
                                            },
                                            {
                                              value: "secondary",
                                              label: "Secondary",
                                            },
                                          ],
                                          defaultValue: "primary",
                                        }),
                                        null
                                      ),
                                      r(
                                        ae,
                                        a(se, {
                                          get when() {
                                            return (
                                              h().value ===
                                              "approvedAndDisapproved"
                                            );
                                          },
                                          get children() {
                                            return [
                                              a(he, {
                                                name: "disapproveButtonLabel",
                                                title:
                                                  "Disapprove Button Label",
                                                value: "Disapprove",
                                              }),
                                              a(Ce, {
                                                name: "disapproveButtonStyle",
                                                title:
                                                  "Disapprove Button Style",
                                                options: [
                                                  {
                                                    value: "primary",
                                                    label: "Primary",
                                                  },
                                                  {
                                                    value: "secondary",
                                                    label: "Secondary",
                                                  },
                                                ],
                                                defaultValue: "primary",
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      K
                                    );
                                  },
                                })
                              ),
                              Z(() => z(q, `${p() ? "hidden" : "mt-5"}`)),
                              Y
                            );
                          })(),
                          (() => {
                            var Y = id(),
                              ie = Y.firstChild,
                              q = ie.nextSibling,
                              G = q.nextSibling;
                            return (
                              r(
                                Y,
                                (() => {
                                  var K = ce(() => !N());
                                  return () => K() && xt();
                                })(),
                                q
                              ),
                              r(
                                q,
                                a(en, {
                                  onClick: () => x(!0),
                                  title: "Add Option",
                                  width: "w-full",
                                })
                              ),
                              r(
                                G,
                                a(se, {
                                  get when() {
                                    return N();
                                  },
                                  get children() {
                                    var K = lo(),
                                      I = K.firstChild,
                                      ae = I.nextSibling,
                                      ne = ae.firstChild;
                                    return (
                                      (I.$$click = () => {
                                        x(!1), y(gt[0]);
                                      }),
                                      r(I, a(ve, {})),
                                      r(
                                        ae,
                                        a(Ee, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: vt,
                                          get defaultValue() {
                                            return vt[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (le) => {
                                            y(le);
                                          },
                                        }),
                                        ne
                                      ),
                                      r(
                                        ne,
                                        a(se, {
                                          get when() {
                                            return (
                                              A().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              a(he, {
                                                name: "amount",
                                                title: "Amount",
                                                value: 45,
                                                toolTipText:
                                                  "The time to wait.",
                                              }),
                                              a(Ce, {
                                                name: "unit",
                                                title: "Unit",
                                                toolTipText:
                                                  "Unit of the interval value",
                                                options: [
                                                  {
                                                    value: "minutes",
                                                    label: "Minutes",
                                                  },
                                                  {
                                                    value: "hours",
                                                    label: "Hours",
                                                  },
                                                  {
                                                    value: "days",
                                                    label: "Days",
                                                  },
                                                ],
                                                defaultValue: "minutes",
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      r(
                                        ne,
                                        a(se, {
                                          get when() {
                                            return (
                                              A().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return a(he, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      K
                                    );
                                  },
                                })
                              ),
                              Z(() => z(q, `${N() ? "hidden" : "mt-5"}`)),
                              Y
                            );
                          })(),
                        ];
                      },
                    })
                  ),
                  te
                );
              })(),
              (() => {
                var te = fn();
                return (
                  r(
                    te,
                    a(se, {
                      get when() {
                        return c().value === "customForm";
                      },
                      get children() {
                        return [
                          a(Ee, {
                            name: "defineForm",
                            title: "Define Form",
                            options: mn,
                            get defaultValue() {
                              return mn[0].value;
                            },
                            onChange: (Y) => {
                              R(Y);
                            },
                          }),
                          a(se, {
                            get when() {
                              return C().value === "usingJSON";
                            },
                            get children() {
                              return a(At, {
                                name: "formFieldsJson",
                                title: "Form Fields",
                                footNote: "See docs for file syntax.",
                                get value() {
                                  return JSON.stringify(
                                    [
                                      {
                                        fieldLabel: "Name",
                                        placeholder: "enter you name",
                                        requiredField: !0,
                                      },
                                    ],
                                    null,
                                    2
                                  );
                                },
                              });
                            },
                          }),
                          (() => {
                            var Y = sd();
                            return (
                              r(
                                Y,
                                a(se, {
                                  get when() {
                                    return C().value === "usingFieldBelow";
                                  },
                                  get children() {
                                    return [
                                      ad(),
                                      ce(
                                        () =>
                                          ce(() => v().length <= 0)() && xt()
                                      ),
                                      (() => {
                                        var ie = oo();
                                        return (
                                          r(
                                            ie,
                                            a(pe, {
                                              get each() {
                                                return v();
                                              },
                                              children: (q, G) =>
                                                (() => {
                                                  var K = pd(),
                                                    I = K.firstChild,
                                                    ae = I.firstChild,
                                                    ne = ae.nextSibling,
                                                    le = I.nextSibling;
                                                  return (
                                                    r(ae, a(ct, {})),
                                                    (ne.$$click = () => {
                                                      f(
                                                        v().filter(
                                                          (de, ee) => de !== q
                                                        )
                                                      );
                                                    }),
                                                    r(ne, a(ve, {})),
                                                    r(
                                                      le,
                                                      a(Ee, {
                                                        name: "elementType",
                                                        title: "Element Type",
                                                        toolTipText:
                                                          "The type of field to add to the form",
                                                        options: no,
                                                        get defaultValue() {
                                                          return no[0].value;
                                                        },
                                                        onChange: (de) => {
                                                          $((ee) => ({
                                                            ...ee,
                                                            [q]:
                                                              de.children || [],
                                                          }));
                                                        },
                                                      }),
                                                      null
                                                    ),
                                                    r(
                                                      le,
                                                      a(se, {
                                                        get when() {
                                                          return k()[q];
                                                        },
                                                        get children() {
                                                          var de = ud();
                                                          return (
                                                            r(
                                                              de,
                                                              a(pe, {
                                                                get each() {
                                                                  return k()[q];
                                                                },
                                                                children: (
                                                                  ee
                                                                ) => {
                                                                  if (
                                                                    ee.type ===
                                                                    "dynamicInput"
                                                                  )
                                                                    return a(
                                                                      he,
                                                                      {
                                                                        get name() {
                                                                          return `${q}_${ee.title}`;
                                                                        },
                                                                        get title() {
                                                                          return ee.title;
                                                                        },
                                                                        get toolTipText() {
                                                                          return ee.toolTipText;
                                                                        },
                                                                        get value() {
                                                                          return ee.value;
                                                                        },
                                                                        get placeholder() {
                                                                          return ee.placeholder;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    ee.type ===
                                                                    "switch"
                                                                  )
                                                                    return a(
                                                                      Se,
                                                                      {
                                                                        get name() {
                                                                          return `${q}_${ee.title}`;
                                                                        },
                                                                        get title() {
                                                                          return (
                                                                            ee.title ??
                                                                            ""
                                                                          );
                                                                        },
                                                                        get toolTipText() {
                                                                          return ee.toolTipText;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    ee.type ===
                                                                    "textBlock"
                                                                  )
                                                                    return a(
                                                                      on,
                                                                      {
                                                                        get children() {
                                                                          return ee.placeholder;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    ee.type ===
                                                                    "jsonEditor"
                                                                  )
                                                                    return a(
                                                                      At,
                                                                      {
                                                                        get name() {
                                                                          return `${q}_${ee.title}`;
                                                                        },
                                                                        get title() {
                                                                          return ee.title;
                                                                        },
                                                                        get footNote() {
                                                                          return ee.footNote;
                                                                        },
                                                                        get value() {
                                                                          return JSON.stringify(
                                                                            {
                                                                              street:
                                                                                "1234 Elm Street",
                                                                              city: "Springfield",
                                                                            },
                                                                            null,
                                                                            2
                                                                          );
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    ee.type ===
                                                                    "inputBlock"
                                                                  )
                                                                    return (() => {
                                                                      var F =
                                                                          md(),
                                                                        M =
                                                                          F.firstChild,
                                                                        B =
                                                                          M.nextSibling;
                                                                      return (
                                                                        r(
                                                                          B,
                                                                          a(
                                                                            pe,
                                                                            {
                                                                              get each() {
                                                                                return E()[
                                                                                  q
                                                                                ];
                                                                              },
                                                                              children:
                                                                                (
                                                                                  O,
                                                                                  W
                                                                                ) =>
                                                                                  (() => {
                                                                                    var V =
                                                                                        hd(),
                                                                                      Q =
                                                                                        V.firstChild,
                                                                                      U =
                                                                                        Q.firstChild,
                                                                                      X =
                                                                                        U.nextSibling,
                                                                                      oe =
                                                                                        Q.nextSibling;
                                                                                    return (
                                                                                      r(
                                                                                        U,
                                                                                        a(
                                                                                          ct,
                                                                                          {}
                                                                                        )
                                                                                      ),
                                                                                      (X.$$click =
                                                                                        () => {
                                                                                          _(
                                                                                            (
                                                                                              me
                                                                                            ) => ({
                                                                                              ...me,
                                                                                              [q]: me[
                                                                                                q
                                                                                              ].filter(
                                                                                                (
                                                                                                  re
                                                                                                ) =>
                                                                                                  re !==
                                                                                                  O
                                                                                              ),
                                                                                            })
                                                                                          );
                                                                                        }),
                                                                                      r(
                                                                                        X,
                                                                                        a(
                                                                                          ve,
                                                                                          {}
                                                                                        )
                                                                                      ),
                                                                                      r(
                                                                                        oe,
                                                                                        a(
                                                                                          he,
                                                                                          {
                                                                                            get name() {
                                                                                              return `${q}_${ee.name}_${O}`;
                                                                                            },
                                                                                            title:
                                                                                              "Option",
                                                                                          }
                                                                                        )
                                                                                      ),
                                                                                      Z(
                                                                                        () =>
                                                                                          z(
                                                                                            V,
                                                                                            `flex gap-1.5 ${
                                                                                              W() !==
                                                                                              0
                                                                                                ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                : ""
                                                                                            }`
                                                                                          )
                                                                                      ),
                                                                                      V
                                                                                    );
                                                                                  })(),
                                                                            }
                                                                          )
                                                                        ),
                                                                        r(
                                                                          F,
                                                                          a(
                                                                            Ze,
                                                                            {
                                                                              label:
                                                                                "Add Field Option",
                                                                              onClick:
                                                                                () => {
                                                                                  _(
                                                                                    (
                                                                                      O
                                                                                    ) => ({
                                                                                      ...O,
                                                                                      [q]: [
                                                                                        ...(O[
                                                                                          q
                                                                                        ] ||
                                                                                          []),
                                                                                        `${Math.random()
                                                                                          .toString(
                                                                                            36
                                                                                          )
                                                                                          .substring(
                                                                                            2,
                                                                                            8
                                                                                          )}`,
                                                                                      ],
                                                                                    })
                                                                                  );
                                                                                },
                                                                            }
                                                                          ),
                                                                          null
                                                                        ),
                                                                        F
                                                                      );
                                                                    })();
                                                                },
                                                              })
                                                            ),
                                                            de
                                                          );
                                                        },
                                                      }),
                                                      null
                                                    ),
                                                    Z(() =>
                                                      z(
                                                        K,
                                                        `flex gap-1.5 ${
                                                          G() !== 0
                                                            ? "border-t pt-6 border-dashed border-[#575555]"
                                                            : ""
                                                        }`
                                                      )
                                                    ),
                                                    K
                                                  );
                                                })(),
                                            })
                                          ),
                                          ie
                                        );
                                      })(),
                                      a(Ze, {
                                        label: "Add Form Element",
                                        onClick: () => {
                                          f([
                                            ...v(),
                                            `form_elements_${Math.random()
                                              .toString(36)
                                              .substring(2, 8)}`,
                                          ]);
                                        },
                                      }),
                                    ];
                                  },
                                })
                              ),
                              Y
                            );
                          })(),
                        ];
                      },
                    })
                  ),
                  te
                );
              })(),
              (() => {
                var te = fn();
                return (
                  r(
                    te,
                    a(se, {
                      get when() {
                        return (
                          c().value === "freeText" || c().value === "customForm"
                        );
                      },
                      get children() {
                        return [
                          (() => {
                            var Y = dd();
                            return (
                              Y.firstChild,
                              r(
                                Y,
                                (() => {
                                  var ie = ce(() => g().length <= 0);
                                  return () => ie() && xt();
                                })(),
                                null
                              ),
                              Y
                            );
                          })(),
                          a(pe, {
                            get each() {
                              return g();
                            },
                            children: (Y) => {
                              if (Y.content.type === "dynamicInput")
                                return (() => {
                                  var ie = ro(),
                                    q = ie.firstChild,
                                    G = q.nextSibling;
                                  return (
                                    (q.$$click = () => {
                                      const K = g().filter(
                                        (I) => I.value !== Y.value
                                      );
                                      b(K), w([...S(), Y]);
                                    }),
                                    r(q, a(ve, {})),
                                    r(
                                      G,
                                      a(he, {
                                        get name() {
                                          return Y.content.name;
                                        },
                                        get title() {
                                          return Y.content.title;
                                        },
                                        get toolTipText() {
                                          return Y.content.toolTipText;
                                        },
                                      })
                                    ),
                                    ie
                                  );
                                })();
                              if (Y.content.type === "reproductiveDropDown")
                                return (() => {
                                  var ie = lo(),
                                    q = ie.firstChild,
                                    G = q.nextSibling,
                                    K = G.firstChild;
                                  return (
                                    (q.$$click = () => {
                                      const I = g().filter(
                                        (ae) => ae.value !== Y.value
                                      );
                                      b(I), w([...S(), Y]);
                                    }),
                                    r(q, a(ve, {})),
                                    r(
                                      G,
                                      a(Ee, {
                                        name: "limitType",
                                        title: "Limit Type",
                                        options: vt,
                                        get defaultValue() {
                                          return vt[0].value;
                                        },
                                        toolTipText:
                                          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                        onChange: (I) => {
                                          y(I);
                                        },
                                      }),
                                      K
                                    ),
                                    r(
                                      K,
                                      a(se, {
                                        get when() {
                                          return (
                                            A().value === "afterTimeInterval"
                                          );
                                        },
                                        get children() {
                                          return [
                                            a(he, {
                                              name: "amount",
                                              title: "Amount",
                                              value: 45,
                                              toolTipText: "The time to wait.",
                                            }),
                                            a(Ce, {
                                              name: "unit",
                                              title: "Unit",
                                              toolTipText:
                                                "Unit of the interval value",
                                              options: [
                                                {
                                                  value: "minutes",
                                                  label: "Minutes",
                                                },
                                                {
                                                  value: "hours",
                                                  label: "Hours",
                                                },
                                                {
                                                  value: "days",
                                                  label: "Days",
                                                },
                                              ],
                                              defaultValue: "minutes",
                                            }),
                                          ];
                                        },
                                      }),
                                      null
                                    ),
                                    r(
                                      K,
                                      a(se, {
                                        get when() {
                                          return (
                                            A().value === "atSpecifiedTime"
                                          );
                                        },
                                        get children() {
                                          return a(he, {
                                            title: "Max Date and Time",
                                            name: "maxDateAndTime",
                                            toolTipText:
                                              "Continue execution after the specified date and time",
                                          });
                                        },
                                      }),
                                      null
                                    ),
                                    ie
                                  );
                                })();
                            },
                          }),
                          a(Pe, {
                            name: "Option",
                            dropdownOptions: S,
                            setDropdownOptions: w,
                            selectedOptions: g,
                            setSelectedOptions: b,
                            placeholder: "Add Options",
                            onChange: (Y) => {
                              b(Y);
                            },
                          }),
                        ];
                      },
                    })
                  ),
                  te
                );
              })(),
            ];
          },
        }),
        null
      ),
      j
    );
  })();
};
be(["click"]);
const zr = [
    {
      label: "Support Dot Notation",
      value: "supportDotNotation",
      content: {
        type: "switch",
        name: "supportDotNotation",
        title: "Support Dot Notation",
        toolTipText:
          'By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }. If that is not intended this can be deactivated, it will then set { "a.b": value } instead.',
      },
    },
  ],
  Sn = [
    {
      label: "Ignore Type Conversion Errors",
      value: "ignoreTypeConversionErrors",
      content: {
        type: "switch",
        name: "ignoreTypeConversionErrors",
        title: "Ignore Type Conversion Errors",
        toolTipText:
          "Whether to ignore field type errors and apply a less strict type conversion",
      },
    },
    ...zr,
  ],
  tn = [
    {
      label: "Manual Mapping",
      value: "Manual Mapping",
      description: "Edit itemFields one by one.",
    },
    {
      label: "JSON",
      value: "JSON",
      description: "Customize item output with JSON.",
    },
  ],
  ao = [
    { label: "𝔸  String", value: "String" },
    { label: "#  Number", value: "Number" },
    { label: "🗹  Boolean", value: "Boolean" },
    { label: "⊞  Array", value: "Array" },
    { label: "{.}  Object", value: "Object" },
  ],
  zt = (e, t) => {
    const { nodes: n } = fe(),
      d = (s) => {
        const [l, o] = P(1);
        return Object.values(
          Object.entries(s)
            .filter(([c, u]) => c.startsWith("field_"))
            .reduce((c, u) => {
              const [p, m] = u,
                h = p.split("_"),
                T = `${h[0]}_${h[1]}`,
                N = h[2];
              return (
                (c[T] ??= {}),
                c[T].id || ((c[T].id = l()), o((x) => x + 1)),
                N === "name"
                  ? (c[T].name = m)
                  : N === "value"
                  ? (c[T].value = m)
                  : N === "type" && (c[T].type = m),
                c
              );
            }, {})
        );
      },
      i = () => {
        const s = n().find((l) => l.id === t);
        if (s) return s.currPosition.get();
      };
    return {
      id: t,
      name: "Edit Fields",
      description: "Modify,add,or remove item fields.",
      type: "EditNode",
      parameters: {
        mode: e?.mode,
        assignment: d(e),
        inputs: [
          {
            id: "input",
            name: "Input",
            description: "Data to filter",
            type: "object",
          },
        ],
        outputs: [
          {
            id: "output",
            name: "Output",
            description: "Outcode of the node after process",
            type: "object",
          },
        ],
      },
      position: i(),
    };
  },
  gd = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = t?.assignment,
        d = [],
        i = {};
      return (
        n &&
          n.forEach((s) => {
            const l = `field_${Math.random().toString(36).substring(2, 8)}`;
            d.push(l),
              console.log(s),
              "name" in s && (i[`${l}_name`] = s.name),
              "value" in s && (i[`${l}_value`] = s.value),
              "type" in s && (i[`${l}_type`] = s.type);
          }),
        { mode: e?.parameters?.mode, field: d, fieldData: i }
      );
    }
  };
function vd() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P(tn[0].value),
    [s, l] = P([]),
    [o, c] = P([]),
    [u, p] = P([]),
    [m, h] = P({}),
    [T, N] = P({}),
    [x, A] = P(""),
    y = new Set(),
    S = () => {
      p(Sn), c([]), l([]), i(tn[0].value), h({}), N({});
    },
    w = (b, C) => {
      if (
        (console.log("from data handler raw >>>> ", b, " >>>>> ", C),
        console.log("before check: previous data from dataHandler", T()),
        b in T())
      ) {
        if (T()[b] === C) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            m()
          ),
            h((R) => ({ ...R, [b]: C })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              m()
            );
          return;
        } else if (T()[b] !== C) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            T()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              m()
            ),
            h((v) => ({ ...v, [b]: C })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              m()
            );
          const R = zt(m(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            R
          ),
            t({ ...e(), [n().id]: R }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", T()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            m()
          ),
          h((v) => ({ ...v, [b]: C })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            m()
          );
        const R = zt(m(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          R
        ),
          t({ ...e(), [n().id]: R }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    g = (b) => {
      console.log("from data remover raw >>>> ", b, " >>>>>> "),
        h((R) =>
          Object.entries(R).reduce(
            (v, [f, k]) => (f.includes(b) || (v[f] = k), v),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", m());
      const C = zt(m(), n().id);
      console.log("from data remover >>>>> formattedPrev", C),
        t({ ...e(), [n().id]: C }),
        console.log("from data remover >>> form data", e());
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          o()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(T(), "from outside"),
        !y.has(n().id))
      ) {
        y.clear(), y.add(n().id), A(n().id);
        const b = e()[n().id];
        if ((console.log("data1", b), S(), !b)) return;
        console.log("data2", b);
        const C = gd(b);
        C &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            C.field,
            C.fieldData
          ),
          N((R) => ({ ...R, mode: C.mode, ...C.fieldData })),
          console.log(T(), "from inside"),
          console.log(C.fieldData, "from inside createEffect"),
          l(C.field ?? []),
          i(C.mode ?? ""));
      }
    }),
    {
      selectedOptions: o,
      setSelectedOptions: c,
      submittedData: m,
      dataInsertHandler: w,
      options: u,
      setOptions: p,
      previousData: T,
      setPreviousData: N,
      setSubmittedData: h,
      dataRemoveHandler: g,
      currentMode: d,
      setCurrentMode: i,
      field: s,
      setField: l,
      reset: S,
      uniqueKey: x,
    }
  );
}
var bd = D('<div class="label hr-solid-line">Fields to Set'),
  xd = D('<div class="flex flex-col gap-6 mt-5">'),
  yd = D(
    "<div><p class=text-[#ddd5d5]>Drag input fields here </p><p class=text-[#9b9494]>or</p><p class=text-[#df4c38]>Add Field"
  ),
  wd = D(
    '<form class=form id=editForm><div><div class=mt-5><div class=mt-5></div><div class=mt-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  $d = D(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[130px]></div></div><div>'
  ),
  _d = D(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const Td = (e) => {
  const {
      formData: t,
      setFormData: n,
      currentFormConfig: d,
      isModalOpen: i,
    } = fe(),
    {
      setOptions: s,
      currentMode: l,
      setSelectedOptions: o,
      setCurrentMode: c,
      field: u,
      setField: p,
      previousData: m,
      selectedOptions: h,
      options: T,
      dataInsertHandler: N,
      uniqueKey: x,
      dataRemoveHandler: A,
    } = vd();
  Oe(() => {
    s(Sn);
  }),
    $e(() => {
      l() === "Manual Mapping" ? (o([]), s(Sn)) : (o([]), s(zr));
    });
  const y = (w) => {
      w.preventDefault();
      const g = new FormData(w.target);
      let b = Object.fromEntries(g.entries());
      console.log("unformatted data", b);
      const C = zt(b, d().id);
      console.log("formatted data", C), n({ ...t(), [d().id]: b });
      const R = new CustomEvent("formSubmitEvent", { detail: b, bubbles: !0 }),
        v = document.getElementById("submitBtn");
      v && v.dispatchEvent(R);
    },
    S = (w) => m()[w];
  return (() => {
    var w = wd(),
      g = w.firstChild,
      b = g.firstChild,
      C = b.firstChild,
      R = C.nextSibling,
      v = R.nextSibling,
      f = v.firstChild,
      k = f.nextSibling,
      $ = k.nextSibling;
    return (
      w.addEventListener("submit", y),
      r(
        g,
        a(Ce, {
          name: "mode",
          title: "Mode",
          get uniqueKey() {
            return x();
          },
          options: tn,
          get defaultValue() {
            return S("mode") || tn[0].value;
          },
          onChange: (E) => {
            c(E.value), N("mode", E.value), console.log("mode setting done");
          },
        }),
        b
      ),
      r(
        b,
        a(se, {
          get when() {
            return l() === "Manual Mapping";
          },
          get children() {
            return [
              bd(),
              (() => {
                var E = xd();
                return (
                  r(
                    E,
                    a(pe, {
                      get each() {
                        return u();
                      },
                      children: (_, L) =>
                        (() => {
                          var j = $d(),
                            H = j.firstChild,
                            J = H.firstChild,
                            te = J.nextSibling,
                            Y = H.nextSibling,
                            ie = Y.firstChild,
                            q = ie.firstChild,
                            G = q.nextSibling,
                            K = ie.nextSibling;
                          return (
                            r(J, a(ct, {})),
                            (te.$$click = () => {
                              p(u().filter((I, ae) => I !== _)), A(_);
                            }),
                            r(te, a(ve, {})),
                            r(
                              q,
                              a(he, {
                                placeholder: "name",
                                name: `${_}_name`,
                                get value() {
                                  return S(`${_}_name`) || "";
                                },
                                isArrow: !0,
                                onInput: (I) => {
                                  N(`${_}_name`, I);
                                },
                              })
                            ),
                            r(
                              G,
                              a(Ce, {
                                name: `${_}_type`,
                                uniqueKey: `${_}_type`,
                                options: ao,
                                get defaultValue() {
                                  return S(`${_}_type`) || ao[0].value;
                                },
                                onChange: (I) => {
                                  N(`${_}_type`, I.value);
                                },
                              })
                            ),
                            r(
                              K,
                              a(he, {
                                placeholder: "value",
                                name: `${_}_value`,
                                get value() {
                                  return S(`${_}_value`) || "";
                                },
                                isArrow: !0,
                                onInput: (I) => {
                                  N(`${_}_value`, I);
                                },
                              })
                            ),
                            Z(() =>
                              z(
                                j,
                                `flex gap-1.5 ${
                                  L() !== 0
                                    ? "border-t pt-6 border-dashed border-[#575555]"
                                    : ""
                                }`
                              )
                            ),
                            j
                          );
                        })(),
                    })
                  ),
                  E
                );
              })(),
              (() => {
                var E = yd();
                return (
                  (E.$$click = () => {
                    p([
                      ...u(),
                      `field_${Math.random().toString(36).substring(2, 8)}`,
                    ]);
                  }),
                  Z(() =>
                    z(
                      E,
                      `${
                        u().length <= 0 ? "h-44" : "h-14 mt-5 "
                      } p-4 flex text-center border border-dashed border-[#9c9c9e] rounded-md bg-[#252434] hover:border-[#ffa89d] hover:bg-[#fc7c6b13] cursor-pointer ${
                        u().length <= 0 ? "flex-col" : "flex col"
                      } items-center justify-center gap-1`
                    )
                  ),
                  E
                );
              })(),
            ];
          },
        }),
        C
      ),
      r(
        C,
        a(se, {
          get when() {
            return l() === "JSON";
          },
          get children() {
            return a(At, {
              name: "json_editor",
              placeholder: "Enter JSON here",
              get value() {
                return JSON.stringify(
                  {
                    field_xmynu3: "value1",
                    field_4g2j3k: "value2",
                    field_123456: "value3",
                  },
                  null,
                  2
                );
              },
              isArrow: !0,
              onInput: (E) => {
                N("json_editor", E);
              },
            });
          },
        })
      ),
      r(
        R,
        a(Se, {
          get uniqueKey() {
            return x();
          },
          get checked() {
            return m().includeOtherInputFields;
          },
          name: "includeOtherInputFields",
          title: "Include Other Input Fields",
          toolTipText:
            "Whether to pass to the output all the input fields (along with the fields set in 'Fields to Set')",
          onChange: (E) => {},
        })
      ),
      r(
        k,
        a(pe, {
          get each() {
            return h();
          },
          children: (E, _) =>
            (() => {
              var L = _d(),
                j = L.firstChild,
                H = j.nextSibling;
              return (
                (j.$$click = () => {
                  o(h().filter((J) => J !== E)), s([...T(), E]);
                }),
                r(j, a(ve, {})),
                r(
                  H,
                  a(Se, {
                    get uniqueKey() {
                      return `${d().id}_${E.content.name}`;
                    },
                    get checked() {
                      return m()[E.content.name];
                    },
                    get title() {
                      return E.content.title ?? "";
                    },
                    get toolTipText() {
                      return E.content.toolTipText ?? "";
                    },
                    get name() {
                      return E.content.name;
                    },
                    onChange: (J) => {
                      N("includeOtherInputFields", J);
                    },
                  })
                ),
                L
              );
            })(),
        })
      ),
      r(
        $,
        a(Pe, {
          name: "options_edit_node",
          selectedOptions: h,
          setSelectedOptions: o,
          dropdownOptions: T,
          setDropdownOptions: s,
          placeholder: "Add options",
          onChange: (E) => {},
        })
      ),
      Z(() => z($, `${h().length <= 0 ? "" : "mt-5"}`)),
      w
    );
  })();
};
be(["click"]);
const Wr = [
    {
      label: "Fallback Output",
      value: "fallbackOutput",
      content: {
        type: "DropDownN",
        name: "fallbackOutput",
        title: "Fallback Output",
        toolTipText:
          "If no rule matches the item will be sent to this output, by default they will be ignored.",
        options: [
          {
            label: "None (Default)",
            value: "noneDefault",
            description: "Items will be ignored.",
          },
          {
            label: "Extra Output",
            value: "extraOutput",
            description: "Items will be sent to the extra, separate, output.",
          },
          {
            label: "Output 0",
            value: "output0",
            description:
              "Items will be sent to the same output as when matched rule 1.",
          },
        ],
      },
    },
    {
      label: "Ignore Case",
      value: "ignoreCase",
      content: {
        type: "switch",
        name: "ignoreCase",
        title: "Ignore Case",
        toolTipText:
          "Whether to ignore letter case when evaluating conditions.",
      },
    },
    {
      label: "Send data to all matching outputs",
      value: "sendDataToAllMatchingOutputs",
      content: {
        type: "switch",
        name: "sendDataToAllMatchingOutputs",
        title: "Send data to all matching outputs",
        toolTipText:
          "Whether to send data to all outputs meeting conditions (and not just the first one).",
      },
    },
  ],
  En = [
    {
      label: "Rules",
      value: "Rules",
      description: "Build a matching rule for each output.",
    },
    {
      label: "Expression",
      value: "Expression",
      description: "write an expression to return the output index.",
    },
  ],
  gn = [
    {
      label: "𝔸  String",
      value: "String",
      children: [
        { label: "Exists", value: "exists" },
        { label: "Does not exist", value: "doesNotExist" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
        { label: "Is equal to", value: "isEqualTo" },
        { label: "Is not equal to", value: "isNotEqualTo" },
        { label: "Contains", value: "contains" },
        { label: "Does not contain", value: "doesNotContain" },
        { label: "Starts with", value: "startsWith" },
        { label: "Does not start with", value: "doesNotStartWith" },
        { label: "Ends with", value: "endsWith" },
        { label: "Does not end with", value: "doesNotEndWith" },
        { label: "Matches regex", value: "matchesRegex" },
        { label: "Does not match regex", value: "doesNotMatchRegex" },
      ],
    },
    {
      label: "#  Number",
      value: "Number",
      children: [
        { label: "Exists", value: "exists" },
        { label: "Does not exist", value: "doesNotExist" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
        { label: "Is equal to", value: "isEqualTo" },
        { label: "Is not equal to", value: "isNotEqualTo" },
        { label: "Is greater than", value: "isGreaterThan" },
        { label: "Is less than", value: "isLessThan" },
        {
          label: "Is greater than or equal to",
          value: "isGreaterThanOrEqualTo",
        },
        { label: "Is less than or equal to", value: "isLessThanOrEqualTo" },
      ],
    },
    {
      label: "🗓  Date & Time",
      value: "dateAndTime",
      children: [
        { label: "Exists", value: "exists" },
        { label: "Does not exist", value: "doesNotExist" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
        { label: "Is equal to", value: "isEqualTo" },
        { label: "Is not equal to", value: "isNotEqualTo" },
        { label: "Is after", value: "isAfter" },
        { label: "Is before", value: "isBefore" },
        { label: "Is after or equal to", value: "isAfterOrEqualTo" },
        { label: "Is before or equal to", value: "isBeforeOrEqualTo" },
      ],
    },
    {
      label: "🗹  Boolean",
      value: "Boolean",
      children: [
        { label: "exists", value: "exists" },
        { label: "does not exist", value: "doesNotExist" },
        { label: "is empty", value: "isEmpty" },
        { label: "is not empty", value: "isNotEmpty" },
        { label: "is true", value: "isTrue" },
        { label: "is false", value: "isFalse" },
        { label: "is equal to", value: "isEqualTo" },
        { label: "is not equal to", value: "isNotEqualTo" },
      ],
    },
    {
      label: "⊞  Array",
      value: "Array",
      children: [
        { label: "exists", value: "exists" },
        { label: "does not exist", value: "doesNotExist" },
        { label: "is empty", value: "isEmpty" },
        { label: "is not empty", value: "isNotEmpty" },
        { label: "contains", value: "contains" },
        { label: "does not contain", value: "doesNotContain" },
        { label: "length equal to", value: "lengthEqualTo" },
        { label: "length not equal to", value: "lengthNotEqualTo" },
        { label: "length greater than", value: "lengthGreaterThan" },
        { label: "length less than", value: "lengthLessThan" },
        {
          label: "length greater than or equal to",
          value: "lengthGreaterThanOrEqualTo",
        },
        {
          label: "length less than or equal to",
          value: "lengthLessThanOrEqualTo",
        },
      ],
    },
    {
      label: "{.}  Object",
      value: "Object",
      children: [
        { label: "exists", value: "exists" },
        { label: "does not exist", value: "doesNotExist" },
        { label: "is empty", value: "isEmpty" },
        { label: "is not empty", value: "isNotEmpty" },
      ],
    },
  ];
var Cd = D("<div class=nested-header><span class=chevron-left>❮"),
  Id = D(
    '<div class=custom-select><select title="native select for multi-steps dropdown"class=hidden-select></select><div title="custom select button"class=select-selected aria-haspopup=listbox aria-expanded=false role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  so = D("<option>"),
  Sd = D("<div class=parent-option role=option aria-selected=false>"),
  Ed = D("<span class=chevron-right>❯"),
  Od = D("<div class=child-option role=option aria-selected=false>");
const Dd = (e) => {
  const [t, n] = P(!1),
    [d, i] = P(null),
    [s, l] = P("Select an option"),
    [o, c] = P("main"),
    [u, p] = P(null),
    [m, h] = P("");
  let T, N;
  const x = () => {
    if (e.defaultValue) {
      const C = e.options.find((v) => v.value === e.defaultValue?.parentOption);
      let R;
      C &&
        C.children &&
        (p(C),
        (R = C.children.find((v) => v.value === e.defaultValue?.childOption)),
        R
          ? (i(R),
            l(R.label),
            e.onChange?.({ parentOption: C.value, childOption: R }))
          : e.placeholder && l(e.placeholder));
    }
  };
  $e(() => {
    const C = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", e.defaultValue), C !== m() && (h(C), x());
  });
  const A = (C) => {
      T && !T.contains(C.target) && (n(!1), c("main"));
    },
    y = () => {
      n(!1), c("main");
    };
  Oe(() => {
    document.addEventListener("mousedown", A),
      document.addEventListener("touchstart", A, { passive: !0 }),
      window.addEventListener("resize", y),
      window.addEventListener("blur", y);
  }),
    Ae(() => {
      document.removeEventListener("mousedown", A),
        document.removeEventListener("touchstart", A),
        window.removeEventListener("resize", y),
        window.removeEventListener("blur", y);
    });
  const S = (C) => {
      C.stopPropagation(), n(!t()), t() || c("main");
    },
    w = (C) => {
      p(C), c(C.value);
    },
    g = (C) => {
      i(C),
        l(C.label),
        e.onChange?.({ parentOption: u().value, childOption: C }),
        n(!1),
        c("main"),
        T && T.focus();
    },
    b = () => {
      c("main");
    };
  return (() => {
    var C = Id(),
      R = C.firstChild,
      v = R.nextSibling,
      f = v.nextSibling,
      k = T;
    typeof k == "function" ? we(k, C) : (T = C),
      r(
        R,
        a(pe, {
          get each() {
            return e.options;
          },
          children: (E) => [
            (() => {
              var _ = so();
              return (
                r(_, () => E.label),
                Z(() => (_.selected = E.value === u()?.value)),
                Z(() => (_.value = E.value)),
                _
              );
            })(),
            ce(
              () =>
                ce(() => !!E.children)() &&
                a(pe, {
                  get each() {
                    return E.children;
                  },
                  children: (_) =>
                    (() => {
                      var L = so();
                      return (
                        r(L, () => _.label),
                        Z(() => (L.selected = _.value === d()?.value)),
                        Z(() => (L.value = _.value)),
                        L
                      );
                    })(),
                })
            ),
          ],
        })
      ),
      Le(v, "click", e.disabled ? void 0 : S),
      r(v, s);
    var $ = N;
    return (
      typeof $ == "function" ? we($, f) : (N = f),
      r(
        f,
        a(se, {
          get when() {
            return o() === "main";
          },
          get children() {
            return a(pe, {
              get each() {
                return e.options;
              },
              children: (E) =>
                (() => {
                  var _ = Sd();
                  return (
                    (_.$$click = () => (E.children ? w(E) : g(E))),
                    r(_, () => E.label, null),
                    r(
                      _,
                      (() => {
                        var L = ce(() => !!E.children);
                        return () => L() && Ed();
                      })(),
                      null
                    ),
                    Z(
                      (L) => {
                        var j = E.value === u()?.value,
                          H = E.value === u()?.value,
                          J = t() ? 0 : -1;
                        return (
                          j !== L.e &&
                            _.classList.toggle("selected", (L.e = j)),
                          H !== L.t &&
                            _.classList.toggle("aria-selected-true", (L.t = H)),
                          J !== L.a && ue(_, "tabindex", (L.a = J)),
                          L
                        );
                      },
                      { e: void 0, t: void 0, a: void 0 }
                    ),
                    _
                  );
                })(),
            });
          },
        }),
        null
      ),
      r(
        f,
        a(se, {
          get when() {
            return o() !== "main";
          },
          get children() {
            return [
              (() => {
                var E = Cd();
                return (
                  E.firstChild,
                  (E.$$click = b),
                  r(E, () => e.categoryLabel || "", null),
                  E
                );
              })(),
              a(pe, {
                get each() {
                  return u()?.children || [];
                },
                children: (E) =>
                  (() => {
                    var _ = Od();
                    return (
                      (_.$$click = () => g(E)),
                      r(_, () => E.label),
                      Z(
                        (L) => {
                          var j = E.value === d()?.value,
                            H = E.value === d()?.value,
                            J = t() ? 0 : -1;
                          return (
                            j !== L.e &&
                              _.classList.toggle("selected", (L.e = j)),
                            H !== L.t &&
                              _.classList.toggle(
                                "aria-selected-true",
                                (L.t = H)
                              ),
                            J !== L.a && ue(_, "tabindex", (L.a = J)),
                            L
                          );
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      _
                    );
                  })(),
              }),
            ];
          },
        }),
        null
      ),
      Z(
        (E) => {
          var _ = e.name,
            L = e.required,
            j = e.disabled,
            H = !!t(),
            J = !!e.disabled,
            te = !!t(),
            Y = e.disabled ? -1 : 0,
            ie = `select-items ${t() ? "select-show" : "select-hide"}`;
          return (
            _ !== E.e && ue(R, "name", (E.e = _)),
            L !== E.t && (R.required = E.t = L),
            j !== E.a && (R.disabled = E.a = j),
            H !== E.o && v.classList.toggle("active", (E.o = H)),
            J !== E.i && v.classList.toggle("disabled", (E.i = J)),
            te !== E.n && v.classList.toggle("aria-expanded-true", (E.n = te)),
            Y !== E.s && ue(v, "tabindex", (E.s = Y)),
            ie !== E.h && z(f, (E.h = ie)),
            E
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
        }
      ),
      C
    );
  })();
};
be(["click"]);
const Wt = (e, t) => {
    const n = (s) => {
        const [l, o] = P(1);
        return Object.values(
          Object.entries(s)
            .filter(([c, u]) => c.startsWith("rule_"))
            .reduce((c, u) => {
              const [p, m] = u,
                h = p.split("_"),
                T = `${h[0]}_${h[1]}`,
                N = h[2];
              return (
                (c[T] ??= {}),
                c[T].id || ((c[T].id = l()), o((x) => x + 1)),
                N === "name"
                  ? (c[T].leftValue = m)
                  : N === "value"
                  ? (c[T].rightValue = m)
                  : N === "operator"
                  ? (c[T].operator = {
                      type: m.type,
                      operation: m.operation,
                      singleValue: !0,
                    })
                  : N === "isRename"
                  ? (c[T].renameOutput = m)
                  : N === "renameOutput" && (c[T].outputKey = m),
                c
              );
            }, {})
        );
      },
      { nodes: d } = fe(),
      i = () => {
        const s = d().find((l) => l.id === t);
        if (s) return s.currPosition.get();
      };
    return {
      id: t,
      name: "Switch",
      description: "Route items depending on defined expression or rules.",
      type: "SwitchNode",
      parameters: { mode: e?.mode, rules: n(e) },
      position: i(),
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "Data to filter",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "0",
          name: "Output port0",
          description: "Switch output port",
          type: "object",
        },
        {
          id: "1",
          name: "Output port1",
          description: "Switch output port",
          type: "object",
        },
      ],
    };
  },
  kd = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = t?.rules,
        d = [],
        i = {},
        s = {},
        l = {};
      return (
        n &&
          n.forEach((o) => {
            const c = `rule_${Math.random().toString(36).substring(2, 8)}`;
            d.push(c),
              console.log(o),
              (s[c] = []),
              "leftValue" in o &&
                (s[c].push(o.leftValue), (i[`${c}_name`] = o.leftValue)),
              "rightValue" in o &&
                (s[c].push(o.rightValue), (i[`${c}_value`] = o.rightValue)),
              "operator" in o &&
                (i[`${c}_operator`] = {
                  type: o.operator.type,
                  operation: o.operator.operation,
                  singleValue: !0,
                }),
              "renameOutput" in o &&
                ((i[`${c}_isRename`] = o.renameOutput),
                (l[c] = o.renameOutput)),
              "outputKey" in o && (i[`${c}_renameOutput`] = o.outputKey);
          }),
        {
          mode: e?.parameters?.mode,
          rulesIds: d,
          rulesData: i,
          onlyNameAndValueForMatching: s,
          renameOutput: l,
        }
      );
    }
  };
function Nd() {
  const {
      formData: e,
      setFormData: t,
      currentFormConfig: n,
      nodes: d,
      setNodes: i,
      edges: s,
      setEdges: l,
    } = fe(),
    [o, c] = P(En[0].value),
    [u, p] = P([]),
    [m, h] = P({}),
    [T, N] = P([]),
    [x, A] = P([]),
    [y, S] = P({}),
    [w, g] = P({}),
    [b, C] = P({}),
    [R, v] = P({}),
    [f, k] = P(""),
    $ = new Set(),
    E = () => {
      A(Wr), N([]), p([]), c(En[0].value), C({}), v({}), S({}), g({}), h({});
    },
    _ = () => {
      const q = `rule_${Math.random().toString(36).substring(2, 8)}`;
      p((G) => [
        ...G,
        {
          fieldId: q,
          vertexId: d().find((K) => K.id === n().id)?.outputVertexIds[0] || "",
        },
      ]),
        S({ ...y(), [q]: !1 }),
        h({ ...m(), [q]: !0 });
    },
    L = (q, G, K) => {
      g((I) => ({ ...I, [q]: { ...I[q], [G]: K } })),
        w()[q] &&
          (w()[q].name === w()[q].value
            ? h({ ...m(), [q]: !0 })
            : h({ ...m(), [q]: !1 }));
    },
    j = (q) => {
      i(
        d().map((K) =>
          K.id === n().id
            ? {
                ...K,
                outputVertexIds: [...K.outputVertexIds, q],
                numberOutputs: u().length,
              }
            : K
        )
      );
      const G = d().find((K) => K.id === n().id);
      G &&
        G.outputVertexIds.forEach((K) => {
          const I = document.getElementById(K),
            {
              left: ae,
              right: ne,
              top: le,
              bottom: de,
            } = I.getBoundingClientRect(),
            ee = ae + Math.abs(ae - ne) / 2,
            F = le + Math.abs(le - de) / 2;
          s()
            .filter((M) => M.outputVertexId === K)
            .forEach((M) => {
              M.currStartPosition.set({ x: ee, y: F });
            }),
            l([...s()]);
        });
    },
    H = (q) => {
      i(
        d().map((G) =>
          G.id === n().id
            ? {
                ...G,
                outputVertexIds: [...G.outputVertexIds.filter((K) => K !== q)],
                numberOutputs: u().length,
              }
            : G
        )
      );
    },
    J = (q, G) => {
      if (q === G) return !0;
      if (typeof q != typeof G || q === null || G === null) return !1;
      if (
        typeof q == "object" &&
        typeof G == "object" &&
        JSON.stringify(q) === JSON.stringify(G)
      )
        return !0;
      if (Array.isArray(q) && Array.isArray(G)) {
        if (q.length !== G.length) return !1;
        for (let K = 0; K < q.length; K++) if (!J(q[K], G[K])) return !1;
        return !0;
      }
      if (Array.isArray(q) || Array.isArray(G)) return !1;
      if (typeof q == "object" && typeof G == "object") {
        const K = Object.keys(q),
          I = Object.keys(G);
        if (K.length !== I.length) return !1;
        for (let ae of K)
          if (!G.hasOwnProperty(ae) || !J(q[ae], G[ae])) return !1;
        return !0;
      }
      return !1;
    },
    te = (q) => R()[q],
    Y = (q, G) => {
      if (
        (console.log("from data handler raw >>>> ", q, " >>>>> ", G),
        console.log("before check: previous data from dataHandler", R()),
        q in R())
      ) {
        if (J(R()[q], G)) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            b()
          ),
            C((K) => ({ ...K, [q]: G })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              b()
            ),
            console.log(
              "from data handler:::: >> forms data  >>> data unchanged, key unchanged",
              e()
            );
          return;
        } else if (!J(te(q), G)) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            R()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              b()
            ),
            C((I) => ({ ...I, [q]: G })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              b()
            );
          const K = Wt(b(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            K
          ),
            t({ ...e(), [n().id]: K }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", R()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            b()
          ),
          C((I) => ({ ...I, [q]: G })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            b()
          );
        const K = Wt(b(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          K
        ),
          t({ ...e(), [n().id]: K }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    ie = (q) => {
      console.log("from data remover raw >>>> ", q, " >>>>>> "),
        C((K) =>
          Object.entries(K).reduce(
            (I, [ae, ne]) => (ae.includes(q) || (I[ae] = ne), I),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", b());
      const G = Wt(b(), n().id);
      console.log("from data remover >>>>> formattedPrev", G),
        t({ ...e(), [n().id]: G }),
        console.log("from data remover >>> form data", e());
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          T()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(R(), "from outside"),
        !$.has(n().id))
      ) {
        $.clear(), $.add(n().id), k(n().id);
        const q = e()[n().id];
        if ((console.log("data1", q), E(), !q)) {
          _();
          return;
        }
        console.log("data2", q);
        const G = kd(q);
        G &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            G.rulesIds,
            G.rulesData
          ),
          c(G.mode ?? ""),
          v((K) => ({ ...K, mode: G.mode, ...G.rulesData })),
          console.log(R(), "from inside"),
          console.log(G.rulesData, "from inside createEffect"),
          S(G.renameOutput),
          console.log("previous setField in effect"),
          p((K) => {
            const I = d().find((ae) => ae.id === n().id)?.outputVertexIds;
            return (
              console.log("from setField and into createEffect", I),
              G.rulesIds.length === I?.length
                ? G.rulesIds.map((ae, ne) => ({ fieldId: ae, vertexId: I[ne] }))
                : (I ?? []).map((ae, ne) => ({
                    fieldId: G.rulesIds[ne],
                    vertexId: ae,
                  }))
            );
          }),
          console.log("after setField in effect", u()));
      }
    }),
    {
      selectedOptions: T,
      setSelectedOptions: N,
      dataInsertHandler: Y,
      previousData: R,
      dataRemoveHandler: ie,
      currentMode: o,
      setCurrentMode: c,
      field: u,
      setField: p,
      uniqueKey: f,
      renameOutput: y,
      setRenameOutput: S,
      inputStore: w,
      setInputStore: g,
      switchOptions: x,
      setSwitchOptions: A,
      matchInput: m,
      setMatchInput: h,
      handleRoutingRulesNameValueMatch: L,
      handleIncreaseSwitchNodeVertex: j,
      handleDecreaseSwitchNodeVertex: H,
      addInitialField: _,
      getValue: te,
    }
  );
}
var Ad = D("<div class=mt-5>"),
  Pd = D('<div class="label hr-solid-line">Routing Rules'),
  Vd = D('<div class=mt-5><div class="flex flex-col gap-8">'),
  Md = D(
    '<div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  Ld = D("<div class=space-y-5><div></div><div>"),
  Fd = D("<form id=switchForm><div><div class=mt-5>"),
  Bd = D(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Rd = D(
    '<div class="text-[#7c81ca] text-xs bg-[#504f7e] p-1 w-4 h-4 font-[900] rounded-full flex items-center justify-center">'
  ),
  qd = D("<div class=mt-4>"),
  Hd = D(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5 items-start"><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[170px]></div></div><div></div></div><div class="mt-3 select-none"></div></div><div class=mt-5>'
  ),
  co = D(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const jd = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
    {
      selectedOptions: i,
      setSelectedOptions: s,
      dataInsertHandler: l,
      dataRemoveHandler: o,
      currentMode: c,
      setCurrentMode: u,
      field: p,
      setField: m,
      uniqueKey: h,
      renameOutput: T,
      setRenameOutput: N,
      switchOptions: x,
      setSwitchOptions: A,
      matchInput: y,
      setMatchInput: S,
      handleRoutingRulesNameValueMatch: w,
      handleDecreaseSwitchNodeVertex: g,
      handleIncreaseSwitchNodeVertex: b,
      getValue: C,
      previousData: R,
    } = Nd();
  Oe(() => {
    A(Wr), p().length <= 0;
  });
  const v = (f) => {
    f.preventDefault();
    const k = new FormData(f.target);
    let $ = Object.fromEntries(k.entries());
    const E = Wt($, t().id);
    d({ ...n(), switchNode: E });
    const _ = new CustomEvent("formSubmitEvent", { detail: $, bubbles: !0 }),
      L = document.getElementById("submitBtn");
    L && L.dispatchEvent(_);
  };
  return (() => {
    var f = Fd(),
      k = f.firstChild,
      $ = k.firstChild;
    return (
      f.addEventListener("submit", v),
      r(
        k,
        a(Ce, {
          get name() {
            return `${h()}_mode`;
          },
          title: "Mode",
          get uniqueKey() {
            return h();
          },
          options: En,
          get defaultValue() {
            return R().mode;
          },
          onChange: (E) => {
            u(E.value), l("mode", E.value);
          },
        }),
        $
      ),
      r(
        $,
        a(se, {
          get when() {
            return c() === "Rules";
          },
          get children() {
            return [
              Pd(),
              (() => {
                var E = Vd(),
                  _ = E.firstChild;
                return (
                  r(
                    E,
                    (() => {
                      var L = ce(() => p().length <= 0);
                      return () => L() && Bd();
                    })(),
                    _
                  ),
                  r(
                    _,
                    a(pe, {
                      get each() {
                        return p();
                      },
                      children: (L, j) =>
                        (() => {
                          var H = Hd(),
                            J = H.firstChild,
                            te = J.firstChild,
                            Y = te.nextSibling,
                            ie = J.nextSibling,
                            q = ie.firstChild,
                            G = q.firstChild,
                            K = G.firstChild,
                            I = K.firstChild,
                            ae = I.nextSibling,
                            ne = K.nextSibling,
                            le = G.nextSibling,
                            de = q.nextSibling;
                          return (
                            r(te, a(ct, {})),
                            (Y.$$click = () => {
                              m(
                                p().filter((ee, F) => ee.fieldId !== L.fieldId)
                              ),
                                g(L.vertexId),
                                o(L.fieldId);
                            }),
                            r(Y, a(ve, {})),
                            r(
                              I,
                              a(he, {
                                placeholder: "name",
                                get name() {
                                  return `${L.fieldId}_name`;
                                },
                                get value() {
                                  return C(`${L.fieldId}_name`) || "";
                                },
                                get uniqueKey() {
                                  return h();
                                },
                                isArrow: !0,
                                onInput: (ee) => {
                                  w(L.fieldId, "name", ee),
                                    l(`${L.fieldId}_name`, ee);
                                },
                              })
                            ),
                            r(
                              ae,
                              a(Dd, {
                                get name() {
                                  return `${L.fieldId}_type`;
                                },
                                options: gn,
                                get uniqueKey() {
                                  return h();
                                },
                                get defaultValue() {
                                  return ce(
                                    () => !!C(`${L.fieldId}_operator`)
                                  )()
                                    ? {
                                        parentOption: C(`${L.fieldId}_operator`)
                                          .type,
                                        childOption: C(`${L.fieldId}_operator`)
                                          .operation,
                                      }
                                    : {
                                        parentOption: gn[0].value || "",
                                        childOption:
                                          gn[0].children?.[3].value || "",
                                      };
                                },
                                categoryLabel: "Back to main",
                                onChange: (ee) => {
                                  console.log(ee),
                                    l(`${L.fieldId}_operator`, {
                                      type: ee.parentOption,
                                      operation: ee.childOption.value,
                                      singleValue: !0,
                                    });
                                },
                              })
                            ),
                            r(
                              ne,
                              a(he, {
                                placeholder: "value",
                                get name() {
                                  return `${L.fieldId}_value`;
                                },
                                get value() {
                                  return C(`${L.fieldId}_value`) || "";
                                },
                                get uniqueKey() {
                                  return h();
                                },
                                isArrow: !0,
                                onInput: (ee) => {
                                  w(L.fieldId, "value", ee),
                                    l(`${L.fieldId}_value`, ee);
                                },
                              })
                            ),
                            r(
                              le,
                              a(Fe, {
                                get content() {
                                  return `This condition is ${
                                    y()[L.fieldId]
                                  } for the first input item`;
                                },
                                get children() {
                                  var ee = Rd();
                                  return (
                                    r(
                                      ee,
                                      a(se, {
                                        get when() {
                                          return y()[L.fieldId] === !0;
                                        },
                                        children: "✔",
                                      }),
                                      null
                                    ),
                                    r(
                                      ee,
                                      a(se, {
                                        get when() {
                                          return y()[L.fieldId] === !1;
                                        },
                                        children: "✘",
                                      }),
                                      null
                                    ),
                                    ee
                                  );
                                },
                              })
                            ),
                            r(
                              de,
                              a(Se, {
                                get checked() {
                                  return C(`${L.fieldId}_isRename`);
                                },
                                get uniqueKey() {
                                  return h();
                                },
                                title: "Rename Output",
                                get name() {
                                  return `${L.fieldId}_isRename`;
                                },
                                onChange: (ee) => {
                                  N({ ...T(), [L.fieldId]: ee }),
                                    l(`${L.fieldId}_isRename`, ee);
                                },
                              })
                            ),
                            r(
                              ie,
                              a(se, {
                                get when() {
                                  return T()[L.fieldId];
                                },
                                get children() {
                                  var ee = qd();
                                  return (
                                    r(
                                      ee,
                                      a(he, {
                                        get name() {
                                          return `${L.fieldId}_renameOutput`;
                                        },
                                        get value() {
                                          return (
                                            C(`${L.fieldId}_renameOutput`) || ""
                                          );
                                        },
                                        get uniqueKey() {
                                          return h();
                                        },
                                        title: "Output Name",
                                        toolTipText:
                                          "The label of output to which to send data to if rule matches.",
                                        isArrow: !0,
                                        onInput: (F) => {
                                          l(`${L.fieldId}_renameOutput`, F);
                                        },
                                      })
                                    ),
                                    ee
                                  );
                                },
                              }),
                              null
                            ),
                            Z(() =>
                              z(
                                H,
                                `flex gap-1.5 ${
                                  j() !== 0
                                    ? "border-t pt-8 border-dashed border-[#575555]"
                                    : ""
                                }`
                              )
                            ),
                            H
                          );
                        })(),
                    })
                  ),
                  r(
                    E,
                    a(Ze, {
                      onClick: () => {
                        const L = `rule_${Math.random()
                            .toString(36)
                            .substring(2, 8)}`,
                          j = `vertex_${Math.random()
                            .toString(36)
                            .substring(2, 8)}`;
                        m((H) => [...H, { fieldId: L, vertexId: j }]),
                          N({ ...T(), [L]: !1 }),
                          S({ ...y(), [L]: !0 }),
                          b(j);
                      },
                      label: "Add Pool Time",
                    }),
                    null
                  ),
                  E
                );
              })(),
              (() => {
                var E = Ad();
                return (
                  r(
                    E,
                    a(Se, {
                      get checked() {
                        return C("convertTypeWhereRequired");
                      },
                      name: "convertTypeWhereRequired",
                      title: "Convert Type Where Required",
                      toolTipText: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`,
                      onChange: (_) => {},
                    })
                  ),
                  E
                );
              })(),
              (() => {
                var E = Md(),
                  _ = E.firstChild,
                  L = _.nextSibling,
                  j = L.nextSibling;
                return (
                  r(
                    L,
                    a(pe, {
                      get each() {
                        return i();
                      },
                      children: (H, J) => {
                        if (H.content.type === "switch")
                          return (() => {
                            var te = co(),
                              Y = te.firstChild,
                              ie = Y.nextSibling;
                            return (
                              (Y.$$click = () => {
                                s(i().filter((q) => q.value !== H.value)),
                                  A([...x(), H]),
                                  o(H.value);
                              }),
                              r(Y, a(ve, {})),
                              r(
                                ie,
                                a(Se, {
                                  get checked() {
                                    return C(H.content.name);
                                  },
                                  get uniqueKey() {
                                    return h();
                                  },
                                  get title() {
                                    return H.content.title ?? "";
                                  },
                                  get toolTipText() {
                                    return H.content.toolTipText ?? "";
                                  },
                                  get name() {
                                    return H.content.name;
                                  },
                                  onChange: (q) => {
                                    l(H.content.name, q);
                                  },
                                })
                              ),
                              te
                            );
                          })();
                        if (H.content.type === "DropDownN")
                          return (() => {
                            var te = co(),
                              Y = te.firstChild,
                              ie = Y.nextSibling;
                            return (
                              (Y.$$click = () => {
                                s(i().filter((q) => q.value !== H.value)),
                                  A([...x(), H]),
                                  o(H.value);
                              }),
                              r(Y, a(ve, {})),
                              r(
                                ie,
                                a(Ce, {
                                  get name() {
                                    return H.content.name;
                                  },
                                  get title() {
                                    return H.content.title;
                                  },
                                  get toolTipText() {
                                    return H.content.toolTipText;
                                  },
                                  get options() {
                                    return H.content.options ?? [];
                                  },
                                  get uniqueKey() {
                                    return h();
                                  },
                                  get defaultValue() {
                                    return (
                                      C(H.content.name) ||
                                      H.content.options?.[0]?.value
                                    );
                                  },
                                  onChange: (q) => {
                                    l(H.content.name, q.value);
                                  },
                                })
                              ),
                              te
                            );
                          })();
                      },
                    })
                  ),
                  r(
                    j,
                    a(Pe, {
                      name: "options_switch_node",
                      selectedOptions: i,
                      setSelectedOptions: s,
                      dropdownOptions: x,
                      setDropdownOptions: A,
                      placeholder: "Add options",
                      onChange: (H) => {},
                    })
                  ),
                  Z(() => z(j, `${i().length <= 0 ? "" : "mt-5"}`)),
                  E
                );
              })(),
            ];
          },
        }),
        null
      ),
      r(
        $,
        a(se, {
          get when() {
            return c() === "Expression";
          },
          get children() {
            var E = Ld(),
              _ = E.firstChild,
              L = _.nextSibling;
            return (
              r(
                _,
                a(he, {
                  name: "numberOfOutputs",
                  title: "Number of Outputs",
                  toolTipText: "How many outputs to create",
                  get uniqueKey() {
                    return h();
                  },
                  get value() {
                    return C("numberOfOutputs") || "";
                  },
                  onInput: (j) => {
                    l("numberOfOutputs", j);
                  },
                })
              ),
              r(
                L,
                a(he, {
                  name: "outputIndex",
                  title: "Output Index",
                  placeholder: "{{}}",
                  get value() {
                    return C("outputIndex") || "";
                  },
                  get uniqueKey() {
                    return h();
                  },
                  footNote: "[ERROR: invalid syntax]",
                  toolTipText:
                    "The output index to send the input item to. Use an expression to calculate which input item should be routed to which output. The expression must return a number.",
                  isExpand: !0,
                  isArrow: !0,
                  onInput: (j) => {
                    l("outputIndex", j);
                  },
                })
              ),
              r(
                E,
                a(Se, {
                  get checked() {
                    return C("convertTypeWhereRequired");
                  },
                  name: "convertTypeWhereRequired",
                  title: "Convert Type Where Required",
                  toolTipText: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`,
                  onChange: (j) => {
                    l("convertTypeWhereRequired", j);
                  },
                }),
                null
              ),
              E
            );
          },
        }),
        null
      ),
      f
    );
  })();
};
be(["click"]);
const On = (e, t) => {
    const { nodes: n } = fe(),
      d = () => {
        const i = n().find((s) => s.id === t);
        if (i) return i.currPosition.get();
      };
    return {
      id: t,
      name: "Vector Store Tool",
      description: "vectore store tool customerSuppertDocs",
      type: "VectoreStoreTool",
      parameters: {
        name: e?.dataName,
        description: e?.dataDescription,
        limit: e?.limit,
      },
      position: d(),
      inputs: [
        {
          id: "vectorStore",
          name: "fromPGVectoreStore",
          description: "data coming from pg vector store node",
          type: "object",
        },
        {
          id: "chatModel",
          name: "fromOllamaChatModel3",
          description: "data coming from ollama model 3",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "vector store output",
          description: "tools agent",
          type: "tool",
        },
      ],
    };
  },
  zd = (e) => {
    if (e) {
      const { parameters: t } = e;
      return {
        dataName: t?.name,
        dataDescription: t?.description,
        limit: t?.limit,
      };
    }
  };
function Wd() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P({}),
    [s, l] = P({}),
    [o, c] = P(""),
    u = new Set(),
    p = () => {
      i({}), l({});
    },
    m = (h, T) => {
      if (
        (console.log("from data handler raw >>>> ", h, " >>>>> ", T),
        console.log("before check: previous data from dataHandler", s()),
        h in s())
      ) {
        if (s()[h] === T) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            d()
          ),
            i((N) => ({ ...N, [h]: T })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              d()
            );
          return;
        } else if (s()[h] !== T) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            s()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              d()
            ),
            i((x) => ({ ...x, [h]: T })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              d()
            );
          const N = On(d(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            N
          ),
            t({ ...e(), [n().id]: N }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", s()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            d()
          ),
          i((x) => ({ ...x, [h]: T })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            d()
          );
        const N = On(d(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          N
        ),
          t({ ...e(), [n().id]: N }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(s(), "from outside"),
        !u.has(n().id))
      ) {
        u.clear(), u.add(n().id), c(n().id);
        const h = e()[n().id];
        if ((console.log("data1", h), p(), !h)) return;
        console.log("data2", h);
        const T = zd(h);
        T &&
          (console.log("decoded from observer, >>>>>> ", n().id),
          l((N) => ({ ...N, ...T })),
          console.log(s(), "from inside"));
      }
    }),
    { dataInsertHandler: m, previousData: s, uniqueKey: o }
  );
}
var Kd = D("<form id=vector-storeForm><div class=space-y-6>");
const Ud = (e) => {
    const { currentFormConfig: t, setFormData: n, formData: d } = fe(),
      { dataInsertHandler: i, previousData: s, uniqueKey: l } = Wd(),
      o = (c) => {
        c.preventDefault();
        const u = new FormData(c.target);
        let p = Object.fromEntries(u.entries());
        const m = On(p, t().id);
        n({ ...d(), [t().id]: m });
      };
    return (() => {
      var c = Kd(),
        u = c.firstChild;
      return (
        c.addEventListener("submit", o),
        r(
          u,
          a(he, {
            name: "dataName",
            title: "Data Name",
            placeholder: "e.g. user_info",
            get value() {
              return s().dataName;
            },
            get uniqueKey() {
              return l();
            },
            toolTipText:
              "Name of the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            isArrow: !0,
            onInput: (p) => {
              i("dataName", p);
            },
          }),
          null
        ),
        r(
          u,
          a(Qe, {
            name: "dataDescription",
            title: "Description of Data",
            get uniqueKey() {
              return l();
            },
            get value() {
              return s().dataDescription;
            },
            placeholder:
              "[describe your data here, e.g. a user's name, email e.t.c]",
            toolTipText:
              "Describe the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            onInput: (p) => {
              i("dataDescription", p);
            },
          }),
          null
        ),
        r(
          u,
          a(he, {
            name: "limit",
            title: "Limit",
            toolTipText: "The maximum number of results to return",
            get uniqueKey() {
              return l();
            },
            get value() {
              return s().limit;
            },
            isArrow: !0,
            isExpand: !0,
            onInput: (p) => {
              i("limit", p);
            },
          }),
          null
        ),
        c
      );
    })();
  },
  Dn = [
    {
      label: "Get Many",
      value: "getMany",
      description: "Get many ranked documents from vector store for query.",
      children: [
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
        {
          type: "dynamicInput",
          title: "Prompt",
          toolTipText:
            "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
        },
        {
          type: "dynamicInput",
          title: "Limit",
          value: "10",
          toolTipText: "Number of top results to fetch from vector store.",
        },
        {
          type: "switch",
          title: "Include Metadata",
          toolTipText: "Whether or not to include document metadata.",
        },
      ],
    },
    {
      label: "Insert Documents",
      value: "insertDocuments",
      description: "Insert documents into vector store.",
      children: [
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
      ],
    },
    {
      label: "Retrieve Documents (As Vector Store for Chain/Tool)",
      value: "retrieveDocumentsAsVectorStore",
      description:
        "Retrieve documents from vector store to be used as vector store with AI nodes.",
      children: [
        {
          type: "textBlock",
          placeholder:
            "This node must be connected to a vector store retriever. Insert one",
        },
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
      ],
    },
    {
      label: "Retrieve Documents (As Tool for AI Agent)",
      value: "retrieveDocumentsAsTool",
      description:
        "Retrieve documents from vector store to be used as tool with AI nodes.",
      children: [
        {
          type: "dynamicInput",
          title: "Name",
          toolTipText: "name of the vector store.",
          placeholder: "e.g. company_knowledge_base",
        },
        {
          type: "textArea",
          title: "Description",
          toolTipText:
            "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
          placeholder:
            "e.g. work with your data in postgresql with the PgVector extension.",
        },
        {
          type: "dynamicInput",
          title: "Limit",
          value: "10",
          toolTipText: "Number of top results to fetch from vector store.",
        },
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
      ],
    },
  ],
  Gd = [
    { title: "ID Column name", value: "idColumnName", name: "idColumnName" },
    {
      title: "Vector Column Name",
      value: "embedding",
      name: "vectorColumnName",
    },
    { title: "Content Column name", value: "text", name: "contentColumnName" },
    {
      title: "Metadata Column name",
      value: "metadata",
      name: "metadataColumnName",
    },
  ],
  Xd = [
    {
      title: "Collection Name",
      value: "collectionName",
      name: "collectionName",
    },
    {
      title: "Collection Table Name",
      value: "collectionTableName",
      name: "collectionTableName",
    },
  ],
  Ot = [
    {
      label: "Distance Strategy",
      value: "distanceStrategy",
      content: {
        type: "DropDown",
        name: "distanceStrategy",
        title: "Distance Strategy",
        toolTipText: "The method to calculate the distance between two vectors",
        options: [
          { label: "Cosine", value: "cosine" },
          { label: "Euclidean", value: "euclidean" },
          { label: "Inner Product", value: "innerProduct" },
        ],
      },
    },
    {
      label: "Collection",
      value: "collection",
      content: {
        type: "switch",
        name: "useCollection",
        title: "Use Collection",
        toolTipText: "Collection of vector",
      },
    },
    {
      label: "Column Names",
      value: "columnNames",
      content: {
        type: "plainBlock",
        name: "columnNames",
        toolTipText: "The names of the columns in the PGVector table.",
        title: "Column Names",
      },
    },
    {
      label: "Metadata Filter",
      value: "metadataFilter",
      content: {
        type: "incrementBlock",
        name: "metadataFilter",
        title: "Metadata Filter",
        toolTipText: "Metadata to filter the document by.",
      },
    },
  ],
  Kt = (e, t) => {
    console.log("from encoder", e), P([]);
    const d = ((o) => {
        const [c, u] = P(1);
        return Object.values(
          Object.entries(o)
            .filter(([p, m]) => p.startsWith("metadata_"))
            .reduce((p, m) => {
              const [h, T] = m,
                N = h.split("_"),
                x = `${N[0]}_${N[1]}`,
                A = N[2];
              return (
                (p[x] ??= {}),
                p[x].id || ((p[x].id = c()), u((y) => y + 1)),
                A === "name"
                  ? (p[x].name = T)
                  : A === "value" && (p[x].value = T),
                p
              );
            }, {})
        );
      })(e),
      i = {
        ...(d?.length > 0 && { metadataFilter: d }),
        ...(e?.useCollection && {
          collection: {
            values: {
              useCollection: e?.useCollection,
              collectionName: e?.collectionName,
              collectionTableName: e?.collectionTableName,
            },
          },
        }),
        ...(e?.idColumnName && {
          columnNames: {
            values: {
              idColumnName: e?.idColumnName,
              vectorColumnName: e?.vectorColumnName,
              contentColumnName: e?.contentColumnName,
              metadataColumnName: e?.metadataColumnName,
            },
          },
        }),
        ...(e?.distanceStrategy && { distanceStrategy: e?.distanceStrategy }),
      },
      { nodes: s } = fe(),
      l = () => {
        const o = s().find((c) => c.id === t);
        if (o) return o.currPosition.get();
      };
    return {
      id: t,
      name: "PGVector Store",
      description: "pgvectore store",
      type: "PGVectorStore",
      parameters: {
        credentials: {
          id: "a",
          name: "Postgres account",
          provider: "postgres",
          ctype: "db",
        },
        operationMode: e?.operationMode,
        tableName: e?.tableName,
        limit: e?.limit,
        prompt: e?.prompt,
        includeMetadata: e?.includeMetadata,
        options: i,
      },
      position: l(),
      inputs: [
        {
          id: "input",
          name: "fromEmbeddings",
          description: "data coming from embeddings node",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "pgvectore store output",
          description: "pgvectore output goes into vectore store tool",
          type: "object",
        },
      ],
    };
  },
  Yd = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = [],
        d = {};
      if (t) {
        const i = t?.options?.metadataFilter;
        i &&
          i.forEach((s) => {
            console.log("inside metadata Item loop", s);
            const l = `metadata_${Math.random().toString(36).substring(2, 8)}`;
            n.push(l),
              "name" in s && (d[`${l}_name`] = s.name),
              "value" in s && (d[`${l}_value`] = s.value);
          });
      }
      return (
        console.log(
          "from decoder",
          d,
          `
 metadata ids`,
          n
        ),
        {
          operationMode: t.operationMode,
          tableName: t.tableName,
          limit: t.limit,
          prompt: t.prompt,
          includeMetadata: t.includeMetadata,
          metadataIds: n,
          metadataFilter: d || {},
          options: t.options,
        }
      );
    }
  };
function Jd() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P(Dn[0].value),
    [s, l] = P([]),
    [o, c] = P([]),
    [u, p] = P([]),
    [m, h] = P(!1),
    [T, N] = P({}),
    [x, A] = P({}),
    [y, S] = P(""),
    w = new Set(),
    g = () => {
      p(Ot), c([]), N({}), A({}), l([]), i(""), h(!1);
    },
    b = (v, f) => {
      if (
        (console.log("from data handler raw >>>> ", v, " >>>>> ", f),
        console.log("before check: previous data from dataHandler", x()),
        v in x())
      ) {
        if (x()[v] === f) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            T()
          ),
            N((k) => ({ ...k, [v]: f })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              T()
            );
          return;
        } else if (x()[v] !== f) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            x()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              T()
            ),
            N(($) => ({ ...$, [v]: f })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              T()
            );
          const k = Kt(T(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            k
          ),
            t({ ...e(), [n().id]: k }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", x()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            T()
          ),
          N(($) => ({ ...$, [v]: f })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            T()
          );
        const k = Kt(T(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          k
        ),
          t({ ...e(), [n().id]: k }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    C = (v) => {
      console.log("from data remover raw >>>> ", v, " >>>>>> "),
        N((k) =>
          Object.entries(k).reduce(
            ($, [E, _]) => (
              E.toLowerCase().includes(v.toLowerCase()) || ($[E] = _), $
            ),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", T());
      const f = Kt(T(), n().id);
      console.log("from data remover >>>>> formattedPrev", f),
        t({ ...e(), [n().id]: f }),
        console.log("from data remover >>> form data", e());
    },
    R = (v, f, k) => {
      console.log(v, "not ok");
      const $ = v.flatMap((E) => f.filter((_) => _.value === E));
      console.log($, "ok"), k((E) => [...E, ...$]);
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          o()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(x(), "from outside"),
        !w.has(n().id))
      ) {
        w.clear(), w.add(n().id), S(n().id);
        const v = e()[n().id];
        if ((console.log("data1", v), g(), !v)) return;
        console.log("data2", v);
        const f = Yd(v);
        f &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            f.options,
            f.metadataFilter
          ),
          console.log("from effect test ", {
            ...(f.options.useCollection && {
              ...f.options.useCollection.values,
            }),
          }),
          A((k) => ({
            operationMode: f.operationMode,
            tableName: f.tableName,
            limit: f.limit,
            prompt: f.prompt,
            includeMetadata: f.includeMetadata,
            ...(f.options.distanceStrategy && {
              distanceStrategy: f.options.distanceStrategy,
            }),
            ...(f.options.collection && { ...f.options.collection.values }),
            ...(f.options.columnNames && { ...f.options.columnNames.values }),
            ...f.metadataFilter,
          })),
          console.log(x(), "from inside"),
          console.log(f.metadataFilter, "from inside createEffect"),
          i(f.operationMode),
          l(f.metadataIds),
          R(Object.keys(f.options), Ot, c),
          p(() => Ot.filter((k) => o().every(($) => $.value !== k.value))));
      }
    }),
    {
      selectedOptions: o,
      setSelectedOptions: c,
      dataInsertHandler: b,
      options: u,
      setOptions: p,
      previousData: x,
      dataRemoveHandler: C,
      uniqueKey: y,
      currentOperation: d,
      setCurrentOperation: i,
      metadataFilter: s,
      setMetadataFilter: l,
      isCollection: m,
      setIsCollection: h,
    }
  );
}
var Zd = D(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  Qd = D('<a href=# class="font-semibold text-[#fe705a]">Insert one'),
  ec = D(
    '<form id=pg-vectorForm><div class=space-y-5><div class=space-y-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class=mt-5><div class=space-y-10></div><div class=mt-5>'
  ),
  tc = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class=flex-1>'
  ),
  nc = D(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Collection</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-5">'
  ),
  oc = D(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Column Names</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-5">'
  ),
  rc = D(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Metadata Filter</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-10"><div class></div><div class>'
  ),
  lc = D(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  ic = D('<div><div class="flex flex-col gap-5 w-full">');
const Ge = ({ onClick: e }) =>
    (() => {
      var t = Zd();
      return Le(t, "click", e), r(t, a(ve, {})), t;
    })(),
  ac = (e) => {
    const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
      {
        selectedOptions: i,
        setSelectedOptions: s,
        dataInsertHandler: l,
        options: o,
        setOptions: c,
        previousData: u,
        dataRemoveHandler: p,
        uniqueKey: m,
        currentOperation: h,
        setCurrentOperation: T,
        metadataFilter: N,
        setMetadataFilter: x,
        isCollection: A,
        setIsCollection: y,
      } = Jd();
    $e(() => {
      h() === "insertDocuments" ? c(Ot.slice(1, 3)) : c(Ot);
    });
    const S = (w) => {
      w.preventDefault();
      const g = new FormData(w.target);
      let b = Object.fromEntries(g.entries());
      const C = Kt(b, t().id);
      d({ ...n(), [t().id]: C });
    };
    return (() => {
      var w = ec(),
        g = w.firstChild,
        b = g.firstChild,
        C = b.nextSibling,
        R = C.firstChild,
        v = R.nextSibling,
        f = v.firstChild,
        k = f.nextSibling;
      return (
        w.addEventListener("submit", S),
        r(
          g,
          a(et, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          b
        ),
        r(
          b,
          a(Ee, {
            name: "operationMode",
            title: "Operation Mode",
            get uniqueKey() {
              return m();
            },
            options: Dn,
            get defaultValue() {
              return u().operationMode || Dn[0].value;
            },
            onChange: ($) => {
              T($.value), l("operationMode", $.value);
            },
          }),
          null
        ),
        r(
          b,
          a(se, {
            get when() {
              return h() === "retrieveDocumentsAsVectorStore";
            },
            get children() {
              return a(on, {
                get children() {
                  return [
                    "This node must be connected to a vector store retriever.",
                    " ",
                    Qd(),
                  ];
                },
              });
            },
          }),
          null
        ),
        r(
          b,
          a(se, {
            get when() {
              return h() === "retrieveDocumentsAsTool";
            },
            get children() {
              return [
                a(he, {
                  name: "name",
                  title: "Name",
                  get uniqueKey() {
                    return m();
                  },
                  get value() {
                    return u().name;
                  },
                  toolTipText: "Name of the vector store.",
                  placeholder: "e.g. company_knowledge_base",
                  isArrow: !0,
                  onInput: ($) => {
                    l("name", $);
                  },
                }),
                a(Qe, {
                  name: "description",
                  title: "Description",
                  get uniqueKey() {
                    return m();
                  },
                  get value() {
                    return u().name;
                  },
                  toolTipText:
                    "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                  placeholder:
                    "e.g. work with your data in postgresql with the PgVector extension.",
                  onInput: ($) => {
                    l("description", $);
                  },
                }),
              ];
            },
          }),
          null
        ),
        r(
          b,
          a(he, {
            name: "tableName",
            title: "Table Name",
            get uniqueKey() {
              return m();
            },
            toolTipText:
              "The table name to store the vectors in. If table does not exist, it will be created.",
            get value() {
              return u().tableName || "repoRunner_vectors";
            },
            isArrow: !0,
            onInput: ($) => {
              l("tableName", $);
            },
          }),
          null
        ),
        r(
          b,
          a(se, {
            get when() {
              return h() === "getMany";
            },
            get children() {
              return a(he, {
                name: "limit",
                title: "Limit",
                get uniqueKey() {
                  return m();
                },
                toolTipText:
                  "Number of top results to fetch from vector store.",
                get value() {
                  return u().limit || "4";
                },
                onInput: ($) => {
                  l("limit", $);
                },
              });
            },
          }),
          null
        ),
        r(
          b,
          a(se, {
            get when() {
              return h() === "getMany";
            },
            get children() {
              return a(he, {
                name: "prompt",
                title: "Prompt",
                get uniqueKey() {
                  return m();
                },
                get value() {
                  return u().prompt || "How Are you?";
                },
                toolTipText:
                  "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
                onInput: ($) => {
                  l("prompt", $);
                },
              });
            },
          }),
          null
        ),
        r(
          b,
          a(se, {
            get when() {
              return h() === "getMany" || h() === "retrieveDocumentsAsTool";
            },
            get children() {
              return a(Se, {
                name: "includeMetadata",
                title: "Include Metadata",
                get uniqueKey() {
                  return m();
                },
                get checked() {
                  return u().includeMetadata;
                },
                toolTipText: "Whether or not to include document metadata.",
                onChange: ($) => {
                  l("includeMetadata", $);
                },
              });
            },
          }),
          null
        ),
        r(
          f,
          a(pe, {
            get each() {
              return i();
            },
            children: ($, E) => {
              if ($.value === "distanceStrategy")
                return (() => {
                  var _ = tc(),
                    L = _.firstChild;
                  return (
                    r(
                      _,
                      a(Ge, {
                        onClick: () => {
                          const j = i().filter((H) => H.value !== $.value);
                          s(j), c([...o(), $]), p($.value);
                        },
                      }),
                      L
                    ),
                    r(
                      L,
                      a(Ce, {
                        get name() {
                          return $.content.name;
                        },
                        get options() {
                          return $.content.options ?? [];
                        },
                        get defaultValue() {
                          return (
                            u()[$.content.name] || $.content.options?.[0]?.value
                          );
                        },
                        get uniqueKey() {
                          return m();
                        },
                        get toolTipText() {
                          return $.content.toolTipText;
                        },
                        get title() {
                          return $.content.title;
                        },
                        onChange: (j) => {
                          l($.content.name, j.value);
                        },
                      })
                    ),
                    _
                  );
                })();
              if ($.value === "collection")
                return (() => {
                  var _ = nc(),
                    L = _.firstChild,
                    j = L.firstChild,
                    H = j.firstChild,
                    J = H.nextSibling,
                    te = J.firstChild;
                  return (
                    r(
                      L,
                      a(Ge, {
                        onClick: () => {
                          const Y = i().filter((ie) => ie.value !== $.value);
                          s(Y), c([...o(), $]), p($.value);
                        },
                      }),
                      j
                    ),
                    r(
                      J,
                      a(Ge, {
                        onClick: () => {
                          const Y = i().filter((ie) => ie.value !== $.value);
                          s(Y), c([...o(), $]), p($.value);
                        },
                      }),
                      te
                    ),
                    r(
                      te,
                      a(Se, {
                        get uniqueKey() {
                          return m();
                        },
                        get checked() {
                          return u()[$.content.name];
                        },
                        get name() {
                          return $.content.name;
                        },
                        get title() {
                          return $.content.title ?? "";
                        },
                        onChange: (Y) => {
                          y(Y), l($.content.name, Y);
                        },
                      }),
                      null
                    ),
                    r(
                      te,
                      a(se, {
                        get when() {
                          return A();
                        },
                        get children() {
                          return a(pe, {
                            each: Xd,
                            children: (Y, ie) =>
                              a(he, {
                                get name() {
                                  return Y.name;
                                },
                                get value() {
                                  return u()[Y.name] || "---";
                                },
                                get title() {
                                  return Y.title;
                                },
                                get uniqueKey() {
                                  return m();
                                },
                                isArrow: !0,
                                onInput: (q) => {
                                  l(Y.name, q);
                                },
                              }),
                          });
                        },
                      }),
                      null
                    ),
                    _
                  );
                })();
              if ($.value === "columnNames")
                return (() => {
                  var _ = oc(),
                    L = _.firstChild,
                    j = L.firstChild,
                    H = j.firstChild,
                    J = H.nextSibling,
                    te = J.firstChild;
                  return (
                    r(
                      L,
                      a(Ge, {
                        onClick: () => {
                          const Y = i().filter((ie) => ie.value !== $.value);
                          s(Y), c([...o(), $]), p($.value);
                        },
                      }),
                      j
                    ),
                    r(
                      J,
                      a(Ge, {
                        onClick: () => {
                          const Y = i().filter((ie) => ie.value !== $.value);
                          s(Y), c([...o(), $]), p($.value);
                        },
                      }),
                      te
                    ),
                    r(
                      te,
                      a(pe, {
                        each: Gd,
                        children: (Y, ie) =>
                          a(he, {
                            get name() {
                              return Y.name;
                            },
                            get value() {
                              return u()[Y.name] || "---";
                            },
                            get title() {
                              return Y.title;
                            },
                            get uniqueKey() {
                              return m();
                            },
                            isArrow: !0,
                            onInput: (q) => {
                              l(Y.name, q);
                            },
                          }),
                      })
                    ),
                    _
                  );
                })();
              if ($.value === "metadataFilter")
                return (() => {
                  var _ = rc(),
                    L = _.firstChild,
                    j = L.firstChild,
                    H = j.firstChild,
                    J = H.nextSibling,
                    te = J.firstChild,
                    Y = te.firstChild,
                    ie = Y.nextSibling;
                  return (
                    r(
                      L,
                      a(Ge, {
                        onClick: () => {
                          const q = i().filter((G) => G.value !== $.value);
                          s(q), c([...o(), $]), p("metadata");
                        },
                      }),
                      j
                    ),
                    r(
                      te,
                      (() => {
                        var q = ce(() => N().length <= 0);
                        return () => q() && lc();
                      })(),
                      Y
                    ),
                    r(
                      Y,
                      a(pe, {
                        get each() {
                          return N();
                        },
                        children: (q, G) =>
                          (() => {
                            var K = ic(),
                              I = K.firstChild;
                            return (
                              r(
                                K,
                                a(Ge, {
                                  onClick: () => {
                                    x((ae) => ae.filter((ne) => ne !== q)),
                                      p(q);
                                  },
                                }),
                                I
                              ),
                              r(
                                I,
                                a(he, {
                                  name: `${q}_name`,
                                  get value() {
                                    return u()[`${q}_name`];
                                  },
                                  title: "Name",
                                  isArrow: !0,
                                  onInput: (ae) => {
                                    l(`${q}_name`, ae);
                                  },
                                }),
                                null
                              ),
                              r(
                                I,
                                a(he, {
                                  name: `${q}value`,
                                  title: "Value",
                                  get value() {
                                    return u()[`${q}_value`];
                                  },
                                  isArrow: !0,
                                  onInput: (ae) => {
                                    l(`${q}_value`, ae);
                                  },
                                }),
                                null
                              ),
                              Z(() =>
                                z(
                                  K,
                                  `group flex items-start gap-1.5 w-full ${
                                    G() !== 0
                                      ? "border-t border-dashed border-[#727171] pt-8 mt-8"
                                      : ""
                                  }`
                                )
                              ),
                              K
                            );
                          })(),
                      })
                    ),
                    r(
                      ie,
                      a(Ze, {
                        onClick: () => {
                          x([
                            ...N(),
                            `metadata_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`,
                          ]);
                        },
                        label: "Add Filter Field",
                      })
                    ),
                    _
                  );
                })();
            },
          })
        ),
        r(
          k,
          a(Pe, {
            name: "options_edit_node",
            selectedOptions: i,
            setSelectedOptions: s,
            dropdownOptions: o,
            setDropdownOptions: c,
            placeholder: "Add options",
            onChange: ($) => {
              s($);
            },
          })
        ),
        w
      );
    })();
  };
be(["click"]);
const uo = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  kn = (e, t) => {
    const { nodes: n } = fe(),
      d = () => {
        const i = n().find((s) => s.id === t);
        if (i) return i.currPosition.get();
      };
    return {
      id: t,
      name: "Embeddings",
      description: "embeddings for PGVectore Store",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: e?.model,
      },
      position: d(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "embeddings vector as output",
          description: "turn text into vectors",
          type: "object",
        },
      ],
    };
  },
  sc = (e) => {
    if (e) {
      const { parameters: t } = e;
      return { model: t?.model };
    }
  };
function dc() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P({}),
    [s, l] = P({}),
    [o, c] = P(""),
    u = new Set(),
    p = () => {
      i({}), l({});
    },
    m = (h, T) => {
      if (
        (console.log("from data handler raw >>>> ", h, " >>>>> ", T),
        console.log("before check: previous data from dataHandler", s()),
        h in s())
      ) {
        if (s()[h] === T) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            d()
          ),
            i((N) => ({ ...N, [h]: T })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              d()
            );
          return;
        } else if (s()[h] !== T) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            s()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              d()
            ),
            i((x) => ({ ...x, [h]: T })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              d()
            );
          const N = kn(d(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            N
          ),
            t({ ...e(), [n().id]: N }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", s()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            d()
          ),
          i((x) => ({ ...x, [h]: T })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            d()
          );
        const N = kn(d(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          N
        ),
          t({ ...e(), [n().id]: N }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(s(), "from outside"),
        !u.has(n().id))
      ) {
        u.clear(), u.add(n().id), c(n().id);
        const h = e()[n().id];
        if ((console.log("data1", h), p(), !h)) return;
        console.log("data2", h);
        const T = sc(h);
        T &&
          (console.log("decoded from observer, >>>>>> ", n().id),
          l((N) => ({ ...N, model: T.model })),
          console.log(s(), "from inside"));
      }
    }),
    { dataInsertHandler: m, previousData: s, uniqueKey: o }
  );
}
var cc = D("<form id=embeddingForm><div class=space-y-5>");
const uc = (e) => {
    const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
      { dataInsertHandler: i, previousData: s, uniqueKey: l } = dc(),
      o = (c) => {
        c.preventDefault();
        const u = new FormData(c.target);
        let p = Object.fromEntries(u.entries());
        const m = kn(p, t().id);
        d({ ...n(), [t().id]: m });
      };
    return (() => {
      var c = cc(),
        u = c.firstChild;
      return (
        c.addEventListener("submit", o),
        r(
          u,
          a(et, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          null
        ),
        r(
          u,
          a(Ce, {
            name: "model",
            title: "Model",
            get uniqueKey() {
              return l();
            },
            options: uo,
            get defaultValue() {
              return s().model || uo[0].value;
            },
            onChange: (p) => {
              i("model", p.value);
            },
          }),
          null
        ),
        c
      );
    })();
  },
  Nn = [
    {
      label: "Set Automatically",
      value: "setAutomatically",
      description: "Automatically set based on resource and option.",
    },
    {
      label: "Set Manually",
      value: "setManually",
      description: "Manually set description.",
    },
  ],
  An = [
    { label: "Message", value: "message" },
    { label: "Label", value: "label" },
    { label: "Draft", value: "draft" },
    { label: "Thread", value: "thread" },
  ],
  Pn = {
    type: "switch",
    title: "Simplify",
    name: "simplify",
    toolTipText:
      "Whether to return a simplified version of the response instead of the raw data.",
  },
  Dt = {
    type: "DropDownN",
    title: "Email Type",
    name: "emailType",
    options: [
      { label: "HTML", value: "html" },
      { label: "Text", value: "text" },
    ],
  },
  po = {
    type: "dynamicInput",
    title: "To",
    name: "to",
    placeholder: "info@example.com",
    toolTipText:
      "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
  },
  Vn = {
    type: "dynamicInput",
    title: "Subject",
    name: "subject",
    placeholder: "Hello World!",
  },
  kt = { type: "dynamicInput", title: "Message", name: "message" },
  Kr = {
    type: "switch",
    name: "returnAll",
    title: "Return All",
    toolTipText: "Whether to return all results or only up to a given limit",
  },
  Ur = {
    type: "dynamicInput",
    name: "limit",
    title: "Limit",
    toolTipText: "Maximum number of results to return",
    value: 10,
  },
  Gr = {
    type: "dynamicInput",
    title: "Label Names or Ids",
    name: "labelNamesOrIds",
  },
  Xe = { type: "dynamicInput", name: "messageId", title: "Message ID" },
  pc = [
    {
      label: "Include Spam and Trash",
      value: "includeSpamTrash",
      content: {
        type: "switch",
        name: "includeSpamTrash",
        title: "Include Spam and Trash",
        toolTipText:
          "Whether to include messages from SPAM and TRASH in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Include Drafts",
      value: "includeDrafts",
      content: {
        type: "switch",
        name: "includeDrafts",
        title: "Include Drafts",
        toolTipText: "Whether to include email drafts in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Label Names or IDs",
      value: "labelNamesOrIds",
      content: {
        type: "dropdownMultiple",
        name: "labelNamesOrIds",
        title: "Label Names or IDs",
        toolTipText:
          "Only return messages with labels that match all of the specified label IDs. Choose from the list, or specify IDs using an expression.",
        footNote: "",
        options: [
          { label: "INBOX", value: "INBOX" },
          { label: "UNREAD", value: "UNREAD" },
          { label: "STARRED", value: "STARRED" },
          { label: "IMPORTANT", value: "IMPORTANT" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Search",
      value: "search",
      content: {
        type: "dynamicInput",
        name: "Search",
        title: "search",
        toolTipText: "Only return messages matching the specified query",
        footNote: "Use the same format as in the Gmail search box. More info.",
        options: [],
        placeholder: "has:attachment",
      },
    },
    {
      label: "Read Status",
      value: "readStatus",
      content: {
        type: "dropdownN",
        name: "readStatus",
        title: "Read Status",
        toolTipText: "",
        footNote: "Filter emails by whether they have been read or not.",
        options: [
          { label: "unread and read email", value: "unread and read email" },
          { label: "read email only", value: "read email only" },
          { label: "read emails only", value: "read emails only" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Sender",
      value: "sender",
      content: {
        type: "dynamicInput",
        name: "sender",
        title: "Sender",
        toolTipText: "Sender name or email to filter by.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
  ],
  Mn = [
    {
      value: "Approval",
      label: "Approval",
      description: "User can approve/disapprove from within the message",
    },
    {
      value: "freeText",
      label: "Free Text",
      description: "User can submit a response via a form.",
    },
    {
      label: "Custom Form",
      value: "customForm",
      description: "User can submit a response via a form.",
    },
  ],
  Ln = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        Xe,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
          toolTipText:
            "Choose from the list, or specify IDs using an expression.",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [Xe] },
    { label: "Get", value: "get", children: [Xe, Pn] },
    {
      label: "Get Many",
      value: "getMany",
      children: [
        Kr,
        Ur,
        Pn,
        { type: "DropDownFilter", name: "Add Filter", title: "Add Filter" },
      ],
    },
    { label: "Mark as Read", value: "markAsRead", children: [Xe] },
    { label: "Mark as Unread", value: "markAsUnread", children: [Xe] },
    { label: "Remove Label", value: "removeLabel", children: [Xe, Gr] },
    { label: "Reply", value: "reply", children: [Xe, Dt, kt] },
    { label: "Send", value: "send", children: [po, Vn, Dt, kt] },
    {
      label: "Send and Wait for Response",
      value: "sendAndWaitForResponse",
      children: [po, Vn, Dt, kt],
    },
  ],
  mo = {
    type: "dynamicInput",
    title: "Label Id",
    name: "labelId",
    toolTipText: "The ID of the label",
  },
  ho = {
    type: "dynamicInput",
    title: "Draft ID",
    name: "draftId",
    toolTipText: "The ID of the draft",
    placeholder: "r-52df502d5df55",
  },
  qn = { label: "Get Many", value: "getMany", children: [Kr, Ur] },
  mc = [
    {
      label: "Create",
      value: "create",
      children: [
        {
          type: "dynamicInput",
          title: "Name",
          name: "name",
          toolTipText: "Label Name",
          placeholder: "invoice",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [mo] },
    { label: "Get", value: "get", children: [mo] },
    qn,
  ],
  hc = [
    { label: "Create", value: "create", children: [Vn, Dt, kt] },
    { label: "Delete", value: "delete", children: [ho] },
    { label: "Get", value: "get", children: [ho] },
    qn,
  ],
  Ye = {
    type: "dynamicInput",
    name: "threadId",
    title: "Thread ID",
    placeholder: "sdf5d7521df78csd",
  },
  fc = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        Ye,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [Ye] },
    { label: "Get", value: "get", children: [Ye, Pn] },
    qn,
    { label: "Remove Label", value: "removeLabel", children: [Ye, Gr] },
    {
      label: "Reply",
      value: "reply",
      children: [
        Ye,
        Dt,
        kt,
        {
          type: "dynamicInput",
          name: "messageSnippetOrId",
          title: "Message Snippet Or ID",
          toolTipText:
            "Choose from the list, or specify an ID using an expression.",
        },
      ],
    },
    { label: "Trash", value: "trash", children: [Ye] },
    { label: "Untrash", value: "untrash", children: [Ye] },
  ],
  Xr = {
    label: "Attachments",
    value: "attachments",
    content: {
      type: "dynamicInput",
      name: "attachments",
      title: "Attachments",
      toolTipText:
        'Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated. Reference embedded images or other content within the body of an email message, e.g. <img src="cid:image_1">',
    },
  },
  Yr = {
    label: "BCC Email",
    value: "bccEmail",
    content: {
      type: "dynamicInput",
      name: "bccEmail",
      title: "BCC Email",
      value: "cc@example.com",
      toolTipText: "Email address of BCC recipient",
    },
  },
  Jr = {
    label: "CC Email",
    value: "ccEmail",
    content: {
      type: "dynamicInput",
      name: "ccEmail",
      title: "CC Email",
      value: "cc@example.com",
      toolTipText: "Email address of CC recipient",
    },
  },
  Zr = {
    label: "Send Replies To",
    value: "sendRepliesTo",
    content: {
      type: "dynamicInput",
      name: "sendRepliesTo",
      title: "Send Replies To",
      toolTipText: "The email address that the reply message is sent to.",
      value: "reply@example.com",
    },
  },
  Qr = {
    label: "Attachment Prefix",
    value: "attachmentPrefix",
    content: {
      type: "dynamicInput",
      name: "attachmentPrefix",
      title: "Attachment Prefix",
      toolTipText:
        "Prefix for name of the binary property to which to write the attachment. An index starting with 0 will be added. So if name is 'attachment_' the first attachment is saved to 'attachment_0'.",
      footNote: "",
      options: [],
      placeholder: "attachment_",
      value: "attachment_",
    },
  },
  el = {
    label: "Download Attachments",
    value: "downloadAttachments",
    content: {
      type: "switch",
      name: "downloadAttachments",
      title: "Download Attachments",
      toolTipText: "Whether the email's attachments will be downloaded",
      footNote: "",
      options: [],
      placeholder: "",
      value: "",
    },
  },
  gc = [Qr, el],
  vc = [
    Qr,
    el,
    {
      label: "Include Spam and Trash",
      value: "includeSpamTrash",
      content: {
        type: "switch",
        name: "includeSpamTrash",
        title: "Include Spam and Trash",
        toolTipText:
          "Whether to include messages from SPAM and TRASH in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
  ],
  bc = [
    Xr,
    Yr,
    Jr,
    Zr,
    {
      label: "From Alias Name or ID",
      value: "fromAliasNameOrId",
      content: {
        type: "dynamicInput",
        name: "fromAliasNameOrId",
        title: "From Alias Name or ID",
        toolTipText:
          "Select the alias to send the email from. Choose from the list, or specify an ID using an expression.",
      },
    },
    {
      label: "Thread ID",
      value: "threadId",
      content: {
        type: "dynamicInput",
        name: "threadId",
        title: "Thread ID",
        toolTipText: "The identifier of the thread to attach the draft",
      },
    },
    {
      label: "To Email",
      value: "toEmail",
      content: {
        type: "dynamicInput",
        name: "toEmail",
        title: "To Email",
        toolTipText:
          "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
        placeholder: "info@example.com",
      },
    },
  ],
  tl = [
    {
      label: "Append n8n Attribution",
      value: "appendAttribution",
      content: {
        type: "switch",
        name: "appendAttribution",
        title: "Append n8n Attribution",
        toolTipText:
          "Whether to include the phrase “This email was sent automatically with n8n” to the end of the email",
      },
    },
    Xr,
    Jr,
    Yr,
    {
      label: "Sender Name",
      value: "senderName",
      content: {
        type: "switch",
        name: "senderName",
        title: "Sender Name",
        toolTipText: "The name that will be shown in recipients' inboxes.",
      },
    },
    {
      label: "Reply To Sender Only",
      value: "replyToSenderOnly",
      content: {
        type: "dynamicInput",
        name: "replyToSenderOnly",
        title: "Reply To Sender Only",
        toolTipText:
          "Whether to reply to the sender only or to the entire list of recipients.",
      },
    },
  ],
  xc = [...tl, Zr],
  St = [
    { value: "approvedOnly", label: "Approved Only" },
    { value: "approvedAndDisapproved", label: "Approved and Disapproved" },
  ],
  Et = [
    {
      label: "After Time Interval",
      value: "afterTimeInterval",
      description: "Waits for a certain amount of time.",
    },
    {
      label: "At Specified Time",
      value: "atSpecifiedTime",
      description: "Waits until the set date and time to continue",
    },
  ],
  Fn = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  We = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  Ke = {
    type: "switch",
    title: "Required Field",
    toolTipText:
      "Whether to require the user to enter a value for this field before submitting the form",
  },
  yt = {
    type: "dynamicInput",
    title: "Placeholder",
    toolTipText: "Sample text to display inside the field.",
  },
  fo = [
    { value: "text", label: "Text", children: [We, Ke, yt] },
    {
      value: "customHTML",
      label: "Custom HTML",
      children: [
        {
          type: "dynamicInput",
          title: "Element Name",
          toolTipText:
            "Optional field. It can be used to include the html in the output.",
          placeholder: "e.g. content section",
        },
        {
          type: "jsonEditor",
          title: "HTML",
          toolTipText: "HTML elements to display on the form page",
          footNote: "Does not accept <script>, <style> or <input> tags",
        },
      ],
    },
    {
      value: "date",
      label: "Date",
      children: [
        We,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        Ke,
      ],
    },
    {
      value: "dropDownList",
      label: "DropDown List",
      children: [
        {
          type: "inputBlock",
          title: "Field Options",
          name: "fieldOption",
          placeholder: "Add Field Option",
        },
        {
          type: "switch",
          title: "Multiple Choice",
          toolTipText:
            "Whether to allow the user to select multiple options from the dropdown list.",
        },
        Ke,
        We,
      ],
    },
    { value: "email", label: "Email", children: [We, Ke, yt] },
    {
      value: "file",
      label: "File",
      children: [
        We,
        Ke,
        {
          type: "switch",
          title: "Multiple Files",
          toolTipText:
            "Whether to allow the user to select multiple files from the file input or just one",
        },
        {
          type: "dynamicInput",
          title: "Accepted File Types",
          toolTipText: "Comma-separated list of allowed file extensions",
          footNote: "Leave empty to allow all file types",
        },
      ],
    },
    {
      value: "hiddenField",
      label: "Hidden Field",
      children: [
        {
          type: "dynamicInput",
          title: "Field Name",
          toolTipText:
            "The name of the field, used in input attributes and referenced by the workflow",
        },
        {
          type: "dynamicInput",
          title: "Field Value",
          toolTipText:
            "Input value can be set here or will be passed as a query parameter via Field Name if no value is set",
        },
      ],
    },
    { value: "number", label: "Number", children: [We, Ke, yt] },
    { value: "password", label: "Password", children: [We, Ke, yt] },
    { value: "textArea", label: "Textarea", children: [We, Ke, yt] },
  ],
  yc = [
    {
      label: "Message Button Label",
      value: "messageButtonLabel",
      content: {
        type: "dynamicInput",
        name: "messageButtonLabel",
        title: "Message Button Label",
        value: "Respond",
      },
    },
    {
      label: "Response From Title",
      value: "responseFromTitle",
      content: {
        type: "dynamicInput",
        name: "responseFromTitle",
        title: "Response From Title",
        toolTipText:
          "Title of the form that the user can access to provide their response.",
      },
    },
    {
      label: "Response From Description",
      value: "responseFromDescription",
      content: {
        type: "dynamicInput",
        name: "responseFromDescription",
        title: "Response From Description",
        toolTipText:
          "Description of the form that the user can access to provide their response",
      },
    },
    {
      label: "Response Form Button Label",
      value: "responseFormButtonLabel",
      content: {
        type: "dynamicInput",
        name: "responseFormButtonLabel",
        title: "Response Form Button Label",
        value: "Submit",
      },
    },
    {
      label: "Limit Wait Time",
      value: "limitWaitTime",
      content: {
        type: "reproductiveDropDown",
        name: "limitWaitTime",
        title: "Limit Wait Time",
        options: [
          {
            label: "After Time Interval",
            value: "afterTimeInterval",
            description: "Waits for a certain amount of time.",
          },
          {
            label: "At Specified Time",
            value: "atSpecifiedTime",
            description: "Waits until the set date and time to continue",
          },
        ],
        toolTipText:
          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
      },
    },
  ],
  Ut = (e, t) => {
    const { nodes: n } = fe(),
      d = () => {
        const i = n().find((s) => s.id === t);
        if (i) return i.currPosition.get();
      };
    return {
      id: t,
      name: "createDraft",
      description: "create gmail Draft",
      type: "GmailTool",
      parameters: {
        credentials: {
          id: "d0esgqltcbthv6156tjg",
          name: "Gmail Account",
          provider: "gmail",
          ctype: "oauth2",
        },
        descriptionType: e?.toolDescription,
        toolDescription: e?.description,
        resource: e?.resource,
        operation: e?.operation,
        subject: e?.subject,
        emailType: e?.emailType,
        message: e?.message,
        options: { threadId: e?.threadId, sendTo: e?.sendRepliesTo },
      },
      position: d(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "createDraft",
          description: "gmail tool output",
          type: "tool",
        },
      ],
    };
  },
  wc = (e) => {
    if (e) {
      const { parameter: t } = e,
        n = t?.assignment,
        d = [],
        i = {};
      return (
        n &&
          n.forEach((s) => {
            const l = `field_${Math.random().toString(36).substring(2, 8)}`;
            d.push(l),
              console.log(s),
              "name" in s && (i[`${l}_name`] = s.name),
              "value" in s && (i[`${l}_value`] = s.value),
              "type" in s && (i[`${l}_type`] = s.type);
          }),
        { mode: e?.parameter?.mode, field: d, fieldData: i }
      );
    }
  };
function $c() {
  const { formData: e, setFormData: t, currentFormConfig: n } = fe(),
    [d, i] = P(Nn[0]),
    [s, l] = P(An[0].value),
    [o, c] = P([]),
    [u, p] = P(Ln[0]),
    [m, h] = P([]),
    [T, N] = P([]),
    [x, A] = P([]),
    [y, S] = P([]),
    [w, g] = P(Mn[0]),
    [b, C] = P(!1),
    [R, v] = P(St[0]),
    [f, k] = P(!1),
    [$, E] = P(Et[0]),
    [_, L] = P(Fn[0]),
    [j, H] = P([]),
    [J, te] = P({}),
    [Y, ie] = P({}),
    [q, G] = P({}),
    [K, I] = P({}),
    [ae, ne] = P(""),
    le = new Set(),
    de = () => {
      G({}), I({});
    },
    ee = (M, B) => {
      if (
        (console.log("from data handler raw >>>> ", M, " >>>>> ", B),
        console.log("before check: previous data from dataHandler", K()),
        M in K())
      ) {
        if (K()[M] === B) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            q()
          ),
            G((O) => ({ ...O, [M]: B })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              q()
            );
          return;
        } else if (K()[M] !== B) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            K()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              q()
            ),
            G((W) => ({ ...W, [M]: B })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              q()
            );
          const O = Ut(q(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            O
          ),
            t({ ...e(), [n().id]: O }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", K()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            q()
          ),
          G((W) => ({ ...W, [M]: B })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            q()
          );
        const O = Ut(q(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          O
        ),
          t({ ...e(), [n().id]: O }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    F = (M) => {
      console.log("from data remover raw >>>> ", M, " >>>>>> "),
        G((O) =>
          Object.entries(O).reduce(
            (W, [V, Q]) => (V.includes(M) || (W[V] = Q), W),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", q());
      const B = Ut(q(), n().id);
      console.log("from data remover >>>>> formattedPrev", B),
        t({ ...e(), [n().id]: B }),
        console.log("from data remover >>> form data", e());
    };
  return (
    $e(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(K(), "from outside"),
        !le.has(n().id))
      ) {
        le.clear(), le.add(n().id), ne(n().id);
        const M = e()[n().id];
        if ((console.log("data1", M), de(), !M)) return;
        console.log("data2", M);
        const B = wc(M);
        B &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            B.field,
            B.fieldData
          ),
          I((O) => ({ ...O, mode: B.mode, ...B.fieldData })),
          console.log(K(), "from inside"),
          console.log(B.fieldData, "from inside createEffect"));
      }
    }),
    {
      dataInsertHandler: ee,
      previousData: K,
      dataRemoveHandler: F,
      uniqueKey: ae,
      currentToolDescription: d,
      setCurrentToolDescription: i,
      resource: s,
      setResource: l,
      operation: o,
      setOperation: c,
      selectedOperation: u,
      setSelectedOperation: p,
      selectedFilter: m,
      setSelectedFilter: h,
      filters: T,
      setFilters: N,
      option: x,
      setOption: A,
      selectedOption: y,
      setSelectedOption: S,
      responseType: w,
      setResponseType: g,
      isAddApprovalOption: b,
      setIsAddApprovalOption: C,
      approval: R,
      setApproval: v,
      isOption: f,
      setIsOption: k,
      limitType: $,
      setLimitType: E,
      defineForm: _,
      setDefineForm: L,
      formElementId: j,
      setFormElementId: H,
      formElements: J,
      setFormElements: te,
      fieldOption: Y,
      setFieldOption: ie,
    }
  );
}
var _c = D(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  Tc = D('<div class="label hr-solid-line">Options'),
  go = D('<div class="mt-5 space-y-5">'),
  vo = D(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  Cc = D(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  bo = D(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  Ic = D(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  vn = D('<div class="space-y-5 mt-5">'),
  Sc = D('<div class="label hr-solid-line">Form Elements'),
  Ec = D("<div class=space-y-5>"),
  Oc = D('<div><div class="label hr-solid-line">Options'),
  Dc = D(
    '<form id=create-draftForm><div class=space-y-5><div class=space-y-5></div><div class="space-y-5 mt-5"></div><div class="space-y-5 mt-5">'
  ),
  bn = D("<div>"),
  kc = D(
    '<div class=space-y-5><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Filter</div><div class=space-y-5>'
  ),
  Nc = D(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Ft = D('<div class="group flex items-start gap-1.5 w-full">'),
  wt = D(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  xo = D(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  Ac = D('<div class="space-y-4 mt-5">'),
  Pc = D(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  Vc = D(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  Mc = D(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const Bt = ({ onClick: e }) =>
    (() => {
      var t = _c();
      return Le(t, "click", e), r(t, a(ve, {})), t;
    })(),
  Lc = (e) => {
    const { currentFormConfig: t, formData: n, setFormData: d } = fe(),
      {
        dataInsertHandler: i,
        previousData: s,
        currentToolDescription: l,
        setCurrentToolDescription: o,
        resource: c,
        setResource: u,
        operation: p,
        setOperation: m,
        selectedOperation: h,
        setSelectedOperation: T,
        selectedFilter: N,
        setSelectedFilter: x,
        filters: A,
        setFilters: y,
        option: S,
        setOption: w,
        selectedOption: g,
        setSelectedOption: b,
        responseType: C,
        setResponseType: R,
        isAddApprovalOption: v,
        setIsAddApprovalOption: f,
        approval: k,
        setApproval: $,
        isOption: E,
        setIsOption: _,
        limitType: L,
        setLimitType: j,
        defineForm: H,
        setDefineForm: J,
        formElementId: te,
        setFormElementId: Y,
        formElements: ie,
        setFormElements: q,
        fieldOption: G,
        setFieldOption: K,
      } = $c();
    $e(() => {
      b([]),
        c() === "message"
          ? m(Ln)
          : c() === "label"
          ? m(mc)
          : c() === "draft"
          ? m(hc)
          : c() === "thread" && m(fc);
    }),
      $e(() => {
        b([]),
          h()?.value === "reply"
            ? w(tl)
            : h()?.value === "send"
            ? w(xc)
            : h()?.value === "create"
            ? w(bc)
            : h()?.value === "get"
            ? w(gc)
            : h()?.value === "getMany"
            ? w(vc)
            : h().value === "sendAndWaitForResponse" &&
              (C().value === "Approval"
                ? (w([
                    {
                      value: "limitWaitTime",
                      label: "Limit Wait Time",
                      content: {
                        type: "reproductiveDropDown",
                        name: "limitWaitTime",
                        title: "Limit Wait Time",
                        toolTipText: "Time at which polling should occur",
                      },
                    },
                  ]),
                  b([]))
                : (C().value === "freeText" || C().value === "customForm") &&
                  (w(yc), b([])));
      }),
      Oe(() => {
        m(Ln), y(pc);
      });
    const I = (ae) => {
      ae.preventDefault();
      const ne = new FormData(ae.target);
      let le = Object.fromEntries(ne.entries());
      const de = Ut(le, t().id);
      d({ ...n(), [t().id]: de });
    };
    return (() => {
      var ae = Dc(),
        ne = ae.firstChild,
        le = ne.firstChild,
        de = le.nextSibling,
        ee = de.nextSibling;
      return (
        ae.addEventListener("submit", I),
        r(
          ne,
          a(et, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          le
        ),
        r(
          ne,
          a(Ee, {
            name: "toolDescription",
            title: "Tool Description",
            options: Nn,
            get defaultValue() {
              return s().toolDescription || Nn[0].value;
            },
            onChange: (F) => {
              o(F), i("toolDescription", F);
            },
          }),
          le
        ),
        r(
          ne,
          a(se, {
            get when() {
              return l().value === "setManually";
            },
            get children() {
              return a(Qe, {
                name: "description",
                title: "Description",
                toolTipText:
                  "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                get value() {
                  return s().description || "Consume the Gmail API";
                },
                placeholder: "e.g. Consume the Gmail API",
                onInput: (F) => {
                  i("description", F);
                },
              });
            },
          }),
          le
        ),
        r(
          ne,
          a(Ce, {
            name: "resource",
            title: "Resource",
            options: An,
            get defaultValue() {
              return s().resource || An[0].value;
            },
            onChange: (F) => {
              u(F.value), i("resource", F);
            },
          }),
          le
        ),
        r(
          ne,
          a(Ee, {
            name: "operation",
            title: "Operation",
            get options() {
              return p();
            },
            get defaultValue() {
              return s().operation || p()[0].value;
            },
            onChange: (F) => {
              T(F), i("operation", F);
            },
          }),
          le
        ),
        r(
          le,
          a(pe, {
            get each() {
              return h()?.children;
            },
            children: (F, M) => {
              if (F.type === "dynamicInput")
                return (() => {
                  var B = bn();
                  return (
                    r(
                      B,
                      a(he, {
                        get name() {
                          return F.name ?? "";
                        },
                        get title() {
                          return F.title;
                        },
                        get toolTipText() {
                          return F.toolTipText;
                        },
                        get placeholder() {
                          return F.placeholder;
                        },
                        get value() {
                          return s()[F.name] || F.value;
                        },
                        onInput: (O) => {
                          i(F.name ?? "", O);
                        },
                      })
                    ),
                    B
                  );
                })();
              if (F.type === "switch")
                return (() => {
                  var B = bn();
                  return (
                    r(
                      B,
                      a(Se, {
                        get checked() {
                          return s()[F.name];
                        },
                        get name() {
                          return F.name ?? "";
                        },
                        get title() {
                          return F.title ?? "";
                        },
                        get toolTipText() {
                          return F.toolTipText;
                        },
                        onChange: (O) => {
                          i(F.name ?? "", O);
                        },
                      })
                    ),
                    B
                  );
                })();
              if (F.type === "DropDownFilter")
                return (() => {
                  var B = kc(),
                    O = B.firstChild,
                    W = O.nextSibling;
                  return (
                    r(
                      B,
                      (() => {
                        var V = ce(() => N().length <= 0);
                        return () => V() && Nc();
                      })(),
                      W
                    ),
                    r(
                      W,
                      a(pe, {
                        get each() {
                          return N();
                        },
                        children: (V, Q) => {
                          if (V.content.type === "switch")
                            return (() => {
                              var U = Ft();
                              return (
                                r(
                                  U,
                                  a(Bt, {
                                    onClick: () => {
                                      const X = N().filter(
                                        (oe) => oe.value !== V.value
                                      );
                                      x(X), y([...A(), V]);
                                    },
                                  }),
                                  null
                                ),
                                r(
                                  U,
                                  a(Se, {
                                    get checked() {
                                      return s()[V.content.name];
                                    },
                                    get name() {
                                      return V.content.name;
                                    },
                                    get title() {
                                      return V.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return V.content.toolTipText;
                                    },
                                    onChange: (X) => {
                                      i(V.content.name, X);
                                    },
                                  }),
                                  null
                                ),
                                U
                              );
                            })();
                          if (V.content.type === "dynamicInput")
                            return (() => {
                              var U = Ft();
                              return (
                                r(
                                  U,
                                  a(Bt, {
                                    onClick: () => {
                                      const X = N().filter(
                                        (oe) => oe.value !== V.value
                                      );
                                      x(X), y([...A(), V]);
                                    },
                                  }),
                                  null
                                ),
                                r(
                                  U,
                                  a(he, {
                                    get name() {
                                      return V.content.name;
                                    },
                                    get value() {
                                      return s()[V.content.name] || "";
                                    },
                                    get title() {
                                      return V.content.title;
                                    },
                                    get toolTipText() {
                                      return V.content.toolTipText;
                                    },
                                    isArrow: !0,
                                    get footNote() {
                                      return V.content.footNote;
                                    },
                                    get placeholder() {
                                      return V.content.placeholder ?? "";
                                    },
                                    onInput: (X) => {
                                      i(V.content.name, X);
                                    },
                                  }),
                                  null
                                ),
                                U
                              );
                            })();
                          if (V.content.type === "dropdownMultiple")
                            return (() => {
                              var U = Ft();
                              return (
                                r(
                                  U,
                                  a(Bt, {
                                    onClick: () => {
                                      const X = N().filter(
                                        (oe) => oe.value !== V.value
                                      );
                                      x(X), y([...A(), V]);
                                    },
                                  }),
                                  null
                                ),
                                r(
                                  U,
                                  a(Hr, {
                                    get name() {
                                      return V.content.name;
                                    },
                                    get title() {
                                      return V.content.title;
                                    },
                                    get defaultSelectedOptions() {
                                      return s()[V.content.name] || [];
                                    },
                                    get options() {
                                      return V.content.options ?? [];
                                    },
                                    get toolTipText() {
                                      return V.content.toolTipText;
                                    },
                                    get footNote() {
                                      return V.content.footNote;
                                    },
                                    onChange: (X) => {
                                      i(V.content.name, X);
                                    },
                                  }),
                                  null
                                ),
                                U
                              );
                            })();
                          if (V.content.type === "dropdownN")
                            return (() => {
                              var U = Ft();
                              return (
                                r(
                                  U,
                                  a(Bt, {
                                    onClick: () => {
                                      const X = N().filter(
                                        (oe) => oe.value !== V.value
                                      );
                                      x(X), y([...A(), V]);
                                    },
                                  }),
                                  null
                                ),
                                r(
                                  U,
                                  a(Ce, {
                                    get placeholder() {
                                      return (
                                        V.content?.options?.[0].label ?? ""
                                      );
                                    },
                                    get name() {
                                      return V.content.name;
                                    },
                                    get title() {
                                      return V.content.title;
                                    },
                                    get defaultValue() {
                                      return s()[V.content.name];
                                    },
                                    get options() {
                                      return V.content.options ?? [];
                                    },
                                    get toolTipText() {
                                      return V.content.toolTipText;
                                    },
                                    get footNote() {
                                      return V.content.footNote;
                                    },
                                    onChange: (X) => {
                                      i(V.content.name, X);
                                    },
                                  }),
                                  null
                                ),
                                U
                              );
                            })();
                        },
                      })
                    ),
                    r(
                      B,
                      a(Pe, {
                        get name() {
                          return F.name ?? "";
                        },
                        placeholder: "Add Filter",
                        selectedOptions: N,
                        setSelectedOptions: x,
                        dropdownOptions: A,
                        setDropdownOptions: y,
                        onChange: (V) => {},
                      }),
                      null
                    ),
                    B
                  );
                })();
              if (F.type === "DropDownN")
                return (() => {
                  var B = bn();
                  return (
                    r(
                      B,
                      a(Ce, {
                        get name() {
                          return F.name ?? "";
                        },
                        get title() {
                          return F.title;
                        },
                        get options() {
                          return F.options ?? [];
                        },
                        get defaultValue() {
                          return s()[F.name] || F.options?.[0].value;
                        },
                        get toolTipText() {
                          return F.toolTipText;
                        },
                        onChange: (O) => {
                          i(F.name ?? "", O);
                        },
                      })
                    ),
                    B
                  );
                })();
            },
          })
        ),
        r(
          de,
          a(se, {
            get when() {
              return (
                h().value === "reply" ||
                h().value === "create" ||
                h().value === "get" ||
                h().value === "getMany" ||
                h().value === "send"
              );
            },
            get children() {
              return [
                Tc(),
                ce(() => ce(() => g().length <= 0)() && wt()),
                (() => {
                  var F = go();
                  return (
                    r(
                      F,
                      a(pe, {
                        get each() {
                          return g();
                        },
                        children: (M) => {
                          if (M.content.type === "dynamicInput")
                            return (() => {
                              var B = xo(),
                                O = B.firstChild,
                                W = O.nextSibling;
                              return (
                                (O.$$click = () => {
                                  const V = g().filter(
                                    (Q) => Q.value !== M.value
                                  );
                                  b(V), w([...S(), M]);
                                }),
                                r(O, a(ve, {})),
                                r(
                                  W,
                                  a(he, {
                                    get name() {
                                      return M.content.name;
                                    },
                                    get title() {
                                      return M.content.title;
                                    },
                                    get placeholder() {
                                      return M.content.placeholder;
                                    },
                                    get toolTipText() {
                                      return M.content.toolTipText;
                                    },
                                    isArrow: !0,
                                    get value() {
                                      return s()[M.content.name];
                                    },
                                    onInput: (V) => {
                                      i(M.content.name, V);
                                    },
                                  })
                                ),
                                B
                              );
                            })();
                          if (M.content.type === "switch")
                            return (() => {
                              var B = xo(),
                                O = B.firstChild,
                                W = O.nextSibling;
                              return (
                                (O.$$click = () => {
                                  const V = g().filter(
                                    (Q) => Q.value !== M.value
                                  );
                                  b(V), w([...S(), M]);
                                }),
                                r(O, a(ve, {})),
                                r(
                                  W,
                                  a(Se, {
                                    get checked() {
                                      return s()[M.content.name];
                                    },
                                    get title() {
                                      return M.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return M.content.toolTipText;
                                    },
                                    get name() {
                                      return M.content.name;
                                    },
                                    onChange: (V) => {
                                      i(M.content.name, V);
                                    },
                                  })
                                ),
                                B
                              );
                            })();
                        },
                      })
                    ),
                    F
                  );
                })(),
                a(Pe, {
                  get name() {
                    return `optionsFor${h()?.label}Operation`;
                  },
                  placeholder: "Add option",
                  dropdownOptions: S,
                  setDropdownOptions: w,
                  selectedOptions: g,
                  setSelectedOptions: b,
                  onChange: (F) => {
                    b(F);
                  },
                }),
              ];
            },
          })
        ),
        r(
          ee,
          a(se, {
            get when() {
              return h().value === "sendAndWaitForResponse";
            },
            get children() {
              return [
                a(Ee, {
                  name: "responseType",
                  title: "Response Type",
                  options: Mn,
                  get defaultValue() {
                    return s().responseType || Mn[0].value;
                  },
                  onChange: (F) => {
                    R(F), i("responseType", F);
                  },
                }),
                (() => {
                  var F = vn();
                  return (
                    r(
                      F,
                      a(se, {
                        get when() {
                          return C().value === "Approval";
                        },
                        get children() {
                          return [
                            (() => {
                              var M = Cc(),
                                B = M.firstChild,
                                O = B.nextSibling,
                                W = O.nextSibling;
                              return (
                                r(
                                  M,
                                  (() => {
                                    var V = ce(() => !v());
                                    return () => V() && wt();
                                  })(),
                                  O
                                ),
                                r(
                                  O,
                                  a(en, {
                                    onClick: () => f(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                r(
                                  W,
                                  a(se, {
                                    get when() {
                                      return v();
                                    },
                                    get children() {
                                      var V = vo(),
                                        Q = V.firstChild,
                                        U = Q.nextSibling;
                                      return (
                                        (Q.$$click = () => {
                                          f(!1), $(St[0]);
                                        }),
                                        r(Q, a(ve, {})),
                                        r(
                                          U,
                                          a(Ee, {
                                            name: "typeOfApproval",
                                            title: "Type of Approval",
                                            options: St,
                                            get defaultValue() {
                                              return St[0].value;
                                            },
                                            onChange: (X) => {
                                              $(X), i("typeOfApproval", X);
                                            },
                                          }),
                                          null
                                        ),
                                        r(
                                          U,
                                          a(he, {
                                            name: "approveButtonLabel",
                                            title: "Approve Button Label",
                                            value: "Approve",
                                          }),
                                          null
                                        ),
                                        r(
                                          U,
                                          a(Ce, {
                                            name: "approveButtonStyle",
                                            title: "Approve Button Style",
                                            options: [
                                              {
                                                value: "primary",
                                                label: "Primary",
                                              },
                                              {
                                                value: "secondary",
                                                label: "Secondary",
                                              },
                                            ],
                                            defaultValue: "primary",
                                            onChange: (X) => {
                                              i("approveButtonStyle", X);
                                            },
                                          }),
                                          null
                                        ),
                                        r(
                                          U,
                                          a(se, {
                                            get when() {
                                              return (
                                                k().value ===
                                                "approvedAndDisapproved"
                                              );
                                            },
                                            get children() {
                                              return [
                                                a(he, {
                                                  name: "disapproveButtonLabel",
                                                  title:
                                                    "Disapprove Button Label",
                                                  value: "Disapprove",
                                                  onInput: (X) => {
                                                    i(
                                                      "disapproveButtonLabel",
                                                      X
                                                    );
                                                  },
                                                }),
                                                a(Ce, {
                                                  name: "disapproveButtonStyle",
                                                  title:
                                                    "Disapprove Button Style",
                                                  options: [
                                                    {
                                                      value: "primary",
                                                      label: "Primary",
                                                    },
                                                    {
                                                      value: "secondary",
                                                      label: "Secondary",
                                                    },
                                                  ],
                                                  defaultValue: "primary",
                                                  onChange: (X) => {
                                                    i(
                                                      "disapproveButtonStyle",
                                                      X
                                                    );
                                                  },
                                                }),
                                              ];
                                            },
                                          }),
                                          null
                                        ),
                                        V
                                      );
                                    },
                                  })
                                ),
                                Z(() => z(O, `${v() ? "hidden" : "mt-5"}`)),
                                M
                              );
                            })(),
                            (() => {
                              var M = Ic(),
                                B = M.firstChild,
                                O = B.nextSibling,
                                W = O.nextSibling;
                              return (
                                r(
                                  M,
                                  (() => {
                                    var V = ce(() => !E());
                                    return () => V() && wt();
                                  })(),
                                  O
                                ),
                                r(
                                  O,
                                  a(en, {
                                    onClick: () => _(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                r(
                                  W,
                                  a(se, {
                                    get when() {
                                      return E();
                                    },
                                    get children() {
                                      var V = bo(),
                                        Q = V.firstChild,
                                        U = Q.nextSibling,
                                        X = U.firstChild;
                                      return (
                                        (Q.$$click = () => {
                                          _(!1), j(St[0]);
                                        }),
                                        r(Q, a(ve, {})),
                                        r(
                                          U,
                                          a(Ee, {
                                            name: "limitType",
                                            title: "Limit Type",
                                            options: Et,
                                            get defaultValue() {
                                              return Et[0].value;
                                            },
                                            toolTipText:
                                              "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                            onChange: (oe) => {
                                              j(oe), i("limitType", oe);
                                            },
                                          }),
                                          X
                                        ),
                                        r(
                                          X,
                                          a(se, {
                                            get when() {
                                              return (
                                                L().value ===
                                                "afterTimeInterval"
                                              );
                                            },
                                            get children() {
                                              return [
                                                a(he, {
                                                  name: "amount",
                                                  title: "Amount",
                                                  value: "45",
                                                  toolTipText:
                                                    "The time to wait.",
                                                  onInput: (oe) => {
                                                    i("amount", oe);
                                                  },
                                                }),
                                                a(Ce, {
                                                  name: "unit",
                                                  title: "Unit",
                                                  toolTipText:
                                                    "Unit of the interval value",
                                                  options: [
                                                    {
                                                      value: "minutes",
                                                      label: "Minutes",
                                                    },
                                                    {
                                                      value: "hours",
                                                      label: "Hours",
                                                    },
                                                    {
                                                      value: "days",
                                                      label: "Days",
                                                    },
                                                  ],
                                                  defaultValue: "minutes",
                                                  onChange: (oe) => {
                                                    i("unit", oe);
                                                  },
                                                }),
                                              ];
                                            },
                                          }),
                                          null
                                        ),
                                        r(
                                          X,
                                          a(se, {
                                            get when() {
                                              return (
                                                L().value === "atSpecifiedTime"
                                              );
                                            },
                                            get children() {
                                              return a(he, {
                                                title: "Max Date and Time",
                                                name: "maxDateAndTime",
                                                toolTipText:
                                                  "Continue execution after the specified date and time",
                                                onInput: (oe) => {
                                                  i("maxDateAndTime", oe);
                                                },
                                              });
                                            },
                                          }),
                                          null
                                        ),
                                        V
                                      );
                                    },
                                  })
                                ),
                                Z(() => z(O, `${E() ? "hidden" : "mt-5"}`)),
                                M
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    F
                  );
                })(),
                (() => {
                  var F = vn();
                  return (
                    r(
                      F,
                      a(se, {
                        get when() {
                          return C().value === "customForm";
                        },
                        get children() {
                          return [
                            a(Ee, {
                              name: "defineForm",
                              title: "Define Form",
                              options: Fn,
                              get defaultValue() {
                                return Fn[0].value;
                              },
                              onChange: (M) => {
                                J(M), i("defineForm", M);
                              },
                            }),
                            a(se, {
                              get when() {
                                return H().value === "usingJSON";
                              },
                              get children() {
                                return a(At, {
                                  name: "formFieldsJson",
                                  title: "Form Fields",
                                  footNote: "See docs for file syntax.",
                                  get value() {
                                    return JSON.stringify(
                                      [
                                        {
                                          fieldLabel: "Name",
                                          placeholder: "enter you name",
                                          requiredField: !0,
                                        },
                                      ],
                                      null,
                                      2
                                    );
                                  },
                                  onInput: (M) => {
                                    i("formFieldsJson", M);
                                  },
                                });
                              },
                            }),
                            (() => {
                              var M = Ec();
                              return (
                                r(
                                  M,
                                  a(se, {
                                    get when() {
                                      return H().value === "usingFieldBelow";
                                    },
                                    get children() {
                                      return [
                                        Sc(),
                                        ce(
                                          () =>
                                            ce(() => te().length <= 0)() && wt()
                                        ),
                                        (() => {
                                          var B = go();
                                          return (
                                            r(
                                              B,
                                              a(pe, {
                                                get each() {
                                                  return te();
                                                },
                                                children: (O, W) =>
                                                  (() => {
                                                    var V = Pc(),
                                                      Q = V.firstChild,
                                                      U = Q.firstChild,
                                                      X = U.nextSibling,
                                                      oe = Q.nextSibling;
                                                    return (
                                                      r(U, a(ct, {})),
                                                      (X.$$click = () => {
                                                        Y(
                                                          te().filter(
                                                            (me, re) => me !== O
                                                          )
                                                        );
                                                      }),
                                                      r(X, a(ve, {})),
                                                      r(
                                                        oe,
                                                        a(Ee, {
                                                          name: "elementType",
                                                          title: "Element Type",
                                                          toolTipText:
                                                            "The type of field to add to the form",
                                                          options: fo,
                                                          get defaultValue() {
                                                            return fo[0].value;
                                                          },
                                                          onChange: (me) => {
                                                            q((re) => ({
                                                              ...re,
                                                              [O]:
                                                                me.children ||
                                                                [],
                                                            })),
                                                              i(
                                                                "elementType",
                                                                me
                                                              );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      r(
                                                        oe,
                                                        a(se, {
                                                          get when() {
                                                            return ie()[O];
                                                          },
                                                          get children() {
                                                            var me = Ac();
                                                            return (
                                                              r(
                                                                me,
                                                                a(pe, {
                                                                  get each() {
                                                                    return ie()[
                                                                      O
                                                                    ];
                                                                  },
                                                                  children: (
                                                                    re
                                                                  ) => {
                                                                    if (
                                                                      re.type ===
                                                                      "dynamicInput"
                                                                    )
                                                                      return a(
                                                                        he,
                                                                        {
                                                                          get name() {
                                                                            return `${O}_${re.title}`;
                                                                          },
                                                                          get title() {
                                                                            return re.title;
                                                                          },
                                                                          get toolTipText() {
                                                                            return re.toolTipText;
                                                                          },
                                                                          get value() {
                                                                            return re.value;
                                                                          },
                                                                          get placeholder() {
                                                                            return re.placeholder;
                                                                          },
                                                                          onInput:
                                                                            (
                                                                              ge
                                                                            ) => {
                                                                              i(
                                                                                `${O}_${re.title}`,
                                                                                ge
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      re.type ===
                                                                      "switch"
                                                                    )
                                                                      return a(
                                                                        Se,
                                                                        {
                                                                          get name() {
                                                                            return `${O}_${re.title}`;
                                                                          },
                                                                          get title() {
                                                                            return (
                                                                              re.title ??
                                                                              ""
                                                                            );
                                                                          },
                                                                          get toolTipText() {
                                                                            return re.toolTipText;
                                                                          },
                                                                          onChange:
                                                                            (
                                                                              ge
                                                                            ) => {
                                                                              i(
                                                                                `${O}_${re.title}`,
                                                                                ge
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      re.type ===
                                                                      "textBlock"
                                                                    )
                                                                      return a(
                                                                        on,
                                                                        {
                                                                          get children() {
                                                                            return re.placeholder;
                                                                          },
                                                                        }
                                                                      );
                                                                    if (
                                                                      re.type ===
                                                                      "jsonEditor"
                                                                    )
                                                                      return a(
                                                                        At,
                                                                        {
                                                                          get name() {
                                                                            return `${O}_${re.title}`;
                                                                          },
                                                                          get title() {
                                                                            return re.title;
                                                                          },
                                                                          get footNote() {
                                                                            return re.footNote;
                                                                          },
                                                                          get value() {
                                                                            return JSON.stringify(
                                                                              {
                                                                                street:
                                                                                  "1234 Elm Street",
                                                                                city: "Springfield",
                                                                              },
                                                                              null,
                                                                              2
                                                                            );
                                                                          },
                                                                          onInput:
                                                                            (
                                                                              ge
                                                                            ) => {
                                                                              i(
                                                                                `${O}_${re.title}`,
                                                                                ge
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      re.type ===
                                                                      "inputBlock"
                                                                    )
                                                                      return (() => {
                                                                        var ge =
                                                                            Vc(),
                                                                          _e =
                                                                            ge.firstChild,
                                                                          Ie =
                                                                            _e.nextSibling;
                                                                        return (
                                                                          r(
                                                                            Ie,
                                                                            a(
                                                                              pe,
                                                                              {
                                                                                get each() {
                                                                                  return G()[
                                                                                    O
                                                                                  ];
                                                                                },
                                                                                children:
                                                                                  (
                                                                                    Be,
                                                                                    rn
                                                                                  ) =>
                                                                                    (() => {
                                                                                      var tt =
                                                                                          Mc(),
                                                                                        pt =
                                                                                          tt.firstChild,
                                                                                        mt =
                                                                                          pt.firstChild,
                                                                                        ht =
                                                                                          mt.nextSibling,
                                                                                        Hn =
                                                                                          pt.nextSibling;
                                                                                      return (
                                                                                        r(
                                                                                          mt,
                                                                                          a(
                                                                                            ct,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        (ht.$$click =
                                                                                          () => {
                                                                                            K(
                                                                                              (
                                                                                                Vt
                                                                                              ) => ({
                                                                                                ...Vt,
                                                                                                [O]: Vt[
                                                                                                  O
                                                                                                ].filter(
                                                                                                  (
                                                                                                    nl
                                                                                                  ) =>
                                                                                                    nl !==
                                                                                                    Be
                                                                                                ),
                                                                                              })
                                                                                            );
                                                                                          }),
                                                                                        r(
                                                                                          ht,
                                                                                          a(
                                                                                            ve,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        r(
                                                                                          Hn,
                                                                                          a(
                                                                                            he,
                                                                                            {
                                                                                              get name() {
                                                                                                return `${O}_${re.name}_${Be}`;
                                                                                              },
                                                                                              title:
                                                                                                "Option",
                                                                                              onInput:
                                                                                                (
                                                                                                  Vt
                                                                                                ) => {
                                                                                                  i(
                                                                                                    `${O}_${re.name}_${Be}`,
                                                                                                    Vt
                                                                                                  );
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        ),
                                                                                        Z(
                                                                                          () =>
                                                                                            z(
                                                                                              tt,
                                                                                              `flex gap-1.5 ${
                                                                                                rn() !==
                                                                                                0
                                                                                                  ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                  : ""
                                                                                              }`
                                                                                            )
                                                                                        ),
                                                                                        tt
                                                                                      );
                                                                                    })(),
                                                                              }
                                                                            )
                                                                          ),
                                                                          r(
                                                                            ge,
                                                                            a(
                                                                              Ze,
                                                                              {
                                                                                label:
                                                                                  "Add Field Option",
                                                                                onClick:
                                                                                  () => {
                                                                                    K(
                                                                                      (
                                                                                        Be
                                                                                      ) => ({
                                                                                        ...Be,
                                                                                        [O]: [
                                                                                          ...(Be[
                                                                                            O
                                                                                          ] ||
                                                                                            []),
                                                                                          `${Math.random()
                                                                                            .toString(
                                                                                              36
                                                                                            )
                                                                                            .substring(
                                                                                              2,
                                                                                              8
                                                                                            )}`,
                                                                                        ],
                                                                                      })
                                                                                    );
                                                                                  },
                                                                              }
                                                                            ),
                                                                            null
                                                                          ),
                                                                          ge
                                                                        );
                                                                      })();
                                                                  },
                                                                })
                                                              ),
                                                              me
                                                            );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      Z(() =>
                                                        z(
                                                          V,
                                                          `flex gap-1.5 ${
                                                            W() !== 0
                                                              ? "border-t pt-6 border-dashed border-[#575555]"
                                                              : ""
                                                          }`
                                                        )
                                                      ),
                                                      V
                                                    );
                                                  })(),
                                              })
                                            ),
                                            B
                                          );
                                        })(),
                                        a(Ze, {
                                          label: "Add Form Element",
                                          onClick: () => {
                                            Y([
                                              ...te(),
                                              `form_elements_${Math.random()
                                                .toString(36)
                                                .substring(2, 8)}`,
                                            ]);
                                          },
                                        }),
                                      ];
                                    },
                                  })
                                ),
                                M
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    F
                  );
                })(),
                (() => {
                  var F = vn();
                  return (
                    r(
                      F,
                      a(se, {
                        get when() {
                          return (
                            C().value === "freeText" ||
                            C().value === "customForm"
                          );
                        },
                        get children() {
                          return [
                            (() => {
                              var M = Oc();
                              return (
                                M.firstChild,
                                r(
                                  M,
                                  (() => {
                                    var B = ce(() => g().length <= 0);
                                    return () => B() && wt();
                                  })(),
                                  null
                                ),
                                M
                              );
                            })(),
                            a(pe, {
                              get each() {
                                return g();
                              },
                              children: (M) => {
                                if (M.content.type === "dynamicInput")
                                  return (() => {
                                    var B = vo(),
                                      O = B.firstChild,
                                      W = O.nextSibling;
                                    return (
                                      (O.$$click = () => {
                                        const V = g().filter(
                                          (Q) => Q.value !== M.value
                                        );
                                        b(V), w([...S(), M]);
                                      }),
                                      r(O, a(ve, {})),
                                      r(
                                        W,
                                        a(he, {
                                          get name() {
                                            return M.content.name;
                                          },
                                          get title() {
                                            return M.content.title;
                                          },
                                          get toolTipText() {
                                            return M.content.toolTipText;
                                          },
                                          onInput: (V) => {
                                            i(M.content.name, V);
                                          },
                                        })
                                      ),
                                      B
                                    );
                                  })();
                                if (M.content.type === "reproductiveDropDown")
                                  return (() => {
                                    var B = bo(),
                                      O = B.firstChild,
                                      W = O.nextSibling,
                                      V = W.firstChild;
                                    return (
                                      (O.$$click = () => {
                                        const Q = g().filter(
                                          (U) => U.value !== M.value
                                        );
                                        b(Q), w([...S(), M]);
                                      }),
                                      r(O, a(ve, {})),
                                      r(
                                        W,
                                        a(Ee, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: Et,
                                          get defaultValue() {
                                            return Et[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (Q) => {
                                            j(Q), i("limitType", Q);
                                          },
                                        }),
                                        V
                                      ),
                                      r(
                                        V,
                                        a(se, {
                                          get when() {
                                            return (
                                              L().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              a(he, {
                                                name: "amount",
                                                title: "Amount",
                                                value: "45",
                                                toolTipText:
                                                  "The time to wait.",
                                                onInput: (Q) => {
                                                  i("amount", Q);
                                                },
                                              }),
                                              a(Ce, {
                                                name: "unit",
                                                title: "Unit",
                                                toolTipText:
                                                  "Unit of the interval value",
                                                options: [
                                                  {
                                                    value: "minutes",
                                                    label: "Minutes",
                                                  },
                                                  {
                                                    value: "hours",
                                                    label: "Hours",
                                                  },
                                                  {
                                                    value: "days",
                                                    label: "Days",
                                                  },
                                                ],
                                                defaultValue: "minutes",
                                                onChange: (Q) => {
                                                  i("unit", Q);
                                                },
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      r(
                                        V,
                                        a(se, {
                                          get when() {
                                            return (
                                              L().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return a(he, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                              onInput: (Q) => {
                                                i("maxDateAndTime", Q);
                                              },
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      B
                                    );
                                  })();
                              },
                            }),
                            a(Pe, {
                              name: "Option",
                              dropdownOptions: S,
                              setDropdownOptions: w,
                              selectedOptions: g,
                              setSelectedOptions: b,
                              placeholder: "Add Options",
                              onChange: (M) => {
                                b(M);
                              },
                            }),
                          ];
                        },
                      })
                    ),
                    F
                  );
                })(),
              ];
            },
          })
        ),
        ae
      );
    })();
  };
be(["click"]);
var Fc = D('<div id=parameter class="mt-0 px-5 py-4 ">');
const Bc = () => {
  const { currentFormConfig: e } = fe();
  return (
    P(),
    (() => {
      var t = Fc();
      return (
        r(
          t,
          a(se, {
            get when() {
              return e().name === "switch";
            },
            get children() {
              return a(jd, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "edit";
            },
            get children() {
              return a(Td, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "gmail-trigger";
            },
            get children() {
              return a(Ss, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return (
                e().name === "ai-agent" || e().name === "customer-support-agent"
              );
            },
            get children() {
              return a(Hs, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "ollama-chat";
            },
            get children() {
              return a(Us, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "send-email";
            },
            get children() {
              return a(fd, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "vector-store";
            },
            get children() {
              return a(Ud, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "pg-vector";
            },
            get children() {
              return a(ac, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "embedding";
            },
            get children() {
              return a(uc, {});
            },
          }),
          null
        ),
        r(
          t,
          a(se, {
            get when() {
              return e().name === "create-draft";
            },
            get children() {
              return a(Lc, {});
            },
          }),
          null
        ),
        Z((n) => Me(t, { [qr.param]: !0 }, n)),
        t
      );
    })()
  );
};
var Rc = D(
    '<div class="relative w-full"><select multiple title=select class="w-full appearance-none bg-[#1e1f2b] text-white text-sm px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"><svg class="w-4 h-4"fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'
  ),
  qc = D("<option>");
const Hc = ({ options: e, onOption: t, name: n }) => {
  const [d, i] = P(0),
    s = (l) => {
      const o = l.target.selectedIndex;
      i(o), t?.(e[o]);
    };
  return (
    Oe(() => {
      t?.(e[0]);
    }),
    (() => {
      var l = Rc(),
        o = l.firstChild;
      return (
        o.addEventListener("change", s),
        ue(o, "name", n),
        r(o, () =>
          e.map((c) =>
            (() => {
              var u = qc();
              return r(u, () => c.label), Z(() => (u.value = c.value)), u;
            })()
          )
        ),
        l
      );
    })()
  );
};
var jc = D(
  '<div class="flex flex-col text-sm text-gray-300 font-sans"><div class="text-sm flex items-center gap-1 group mb-1"><div>Notes</div><div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?</div></div><textarea title=notes id=notes class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono">'
);
const zc = ({ toolTipContent: e }) => {
  const [t, n] = P(""),
    [d, i] = P(!1);
  return (() => {
    var s = jc(),
      l = s.firstChild,
      o = l.firstChild,
      c = o.nextSibling;
    c.firstChild;
    var u = l.nextSibling;
    return (
      c.addEventListener("mouseleave", () => i(!1)),
      c.addEventListener("mouseenter", () => i(!0)),
      r(c, a(Fe, { showTooltip: d, toolTipContent: e }), null),
      (u.$$input = (p) => n(p.target.value)),
      Z(() => (u.value = t())),
      s
    );
  })();
};
be(["input"]);
var Wc = D(
  '<div class="mt-0 px-5 py-4 overflow-visible"><div class=text-white><div class="mt-3 space-y-3"><div class=mt-6><hr class=border-[#373749]><p class="mt-1 text-[#737475] text-sm">Switch node version 2.3.2(latest)'
);
const Kc = (e) => {
  P(!1);
  const { currentFormConfig: t, settingConfig: n } = fe(),
    d = [
      {
        value: "Stop workflow",
        label: "Stop workflow",
        description: "Halt execution and fail workflow.",
      },
      {
        value: "Continue",
        label: "Continue",
        description: "Press Error message as item in regular output.",
      },
      {
        value: "Continue(using error output)",
        label: "Continue(using error output)",
        description: "Pass item to an extra `error` output.",
      },
    ];
  return (() => {
    var i = Wc(),
      s = i.firstChild,
      l = s.firstChild,
      o = l.firstChild;
    return (
      r(
        l,
        () =>
          n()?.settings.map((c, u) => {
            if (c.type === "dropdown") return a(Hc, { options: d });
            c.type;
          }),
        o
      ),
      r(
        l,
        a(zc, {
          toolTipContent: {
            label: "",
            text: "Optional note to save with the node",
          },
        }),
        o
      ),
      r(
        l,
        a(Se, { switchText: "", toolTipContent: { label: "", text: "" } }),
        o
      ),
      i
    );
  })();
};
var Uc = D(
  '<div id=mid-panel class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"><div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium"></span></div><button id=submitBtn type=submit class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="h-full flex-1 overflow-visible"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings</div></div></div><div class=overflow-visible><div></div><div>'
);
const Gc = (e) => {
  const { currentFormConfig: t } = fe(),
    [n, d] = P(0);
  return (() => {
    var i = Uc(),
      s = i.firstChild,
      l = s.firstChild,
      o = l.firstChild,
      c = o.nextSibling,
      u = l.nextSibling,
      p = s.nextSibling,
      m = p.firstChild,
      h = m.firstChild,
      T = h.firstChild,
      N = T.firstChild,
      x = N.nextSibling,
      A = h.nextSibling,
      y = A.firstChild,
      S = y.nextSibling;
    return (
      r(c, () => t().title),
      (N.$$click = () => d(0)),
      (x.$$click = () => d(1)),
      r(y, a(Bc, {})),
      r(S, a(Kc, {})),
      Z(
        (w) => {
          var g = { [qr.midPanel]: !0 },
            b = `${t().name}Form`,
            C = `rounded-none border-b-2 ${
              n() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            R = `rounded-none border-b-2 ${
              n() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            v = n() === 0 ? "" : "hidden",
            f = n() === 1 ? "" : "hidden";
          return (
            (w.e = Me(i, g, w.e)),
            b !== w.t && ue(u, "form", (w.t = b)),
            C !== w.a && z(N, (w.a = C)),
            R !== w.o && z(x, (w.o = R)),
            v !== w.i && z(y, (w.i = v)),
            f !== w.n && z(S, (w.n = f)),
            w
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 }
      ),
      i
    );
  })();
};
be(["click"]);
const Xc = "_rightPanel_1ew1b_1",
  Yc = { rightPanel: Xc };
var Jc = D(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output'
);
const Zc = (e) =>
  (() => {
    var t = Jc(),
      n = t.firstChild;
    return (
      n.firstChild,
      r(
        n,
        a(Qt, {
          data: {
            user: {
              id: 123456,
              name: "Jane Doe",
              email: "jane.doe@example.com",
              isActive: !0,
              roles: ["admin", "editor", "viewer"],
              profile: {
                age: 29,
                gender: "female",
                address: {
                  street: "1234 Elm Street",
                  city: "Springfield",
                  state: "IL",
                  postalCode: "62704",
                  country: "USA",
                },
                preferences: {
                  newsletter: !0,
                  notifications: { email: !0, sms: !1, push: !0 },
                  theme: "dark",
                },
              },
            },
            projects: [
              {
                id: "p001",
                title: "Redesign Website",
                status: "in-progress",
                tags: ["design", "frontend", "UX"],
                deadline: "2025-08-01T00:00:00Z",
              },
              {
                id: "p002",
                title: "API Migration",
                status: "completed",
                tags: ["backend", "migration", "architecture"],
                deadline: "2024-12-15T00:00:00Z",
              },
              {
                id: "p003",
                title: "Mobile App Launch",
                status: "pending",
                tags: ["mobile", "launch", "iOS", "Android"],
                deadline: null,
              },
            ],
            logs: [
              {
                timestamp: "2025-05-16T10:00:00Z",
                event: "User login",
                success: !0,
              },
              {
                timestamp: "2025-05-16T10:05:32Z",
                event: "Viewed dashboard",
                success: !0,
              },
              {
                timestamp: "2025-05-16T10:15:42Z",
                event: "Attempted API access",
                success: !1,
                error: "403 Forbidden",
              },
            ],
            metadata: {
              requestId: "abc123xyz789",
              environment: "production",
              version: "1.0.5",
              features: { betaAccess: !1, multiTenant: !0, autoSave: !0 },
            },
          },
        }),
        null
      ),
      Z((d) => Me(t, { [Yc.rightPanel]: !0 }, d)),
      t
    );
  })();
var Qc = D('<div class="flex items-start h-full w-full overflow-hidden">');
const eu = (e) =>
  (() => {
    var t = Qc();
    return (
      r(t, a(Na, {}), null), r(t, a(Gc, {}), null), r(t, a(Zc, {}), null), t
    );
  })();
var tu = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const nu = (e) => tu();
var ou = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const ru = (e) => ou();
var lu = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const iu = (e) => lu();
var au = D(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const su = (e) => au();
var du = D(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex cursor-pointer items-center font-medium text-white gap-x-2.5"><div class="text-xl text-[#a7a4a4] "></div><div class=text-base>Back to canvas</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const cu = (e) => {
  const { currentFormConfig: t, setIsModalOpen: n } = fe();
  return (() => {
    var d = du(),
      i = d.firstChild,
      s = i.firstChild,
      l = i.nextSibling,
      o = l.firstChild,
      c = o.nextSibling,
      u = c.nextSibling;
    return (
      (i.$$click = () => n(!1)),
      r(s, a(nu, {})),
      r(o, a(iu, {})),
      r(c, a(su, {})),
      r(u, a(ru, {})),
      d
    );
  })();
};
be(["click"]);
var uu = D(
    `<div class="flex h-full"><div class="flex-1 pr-4"><div class=mb-4><label class="block text-sm mb-1">Connect using <span class=text-red-500>*</span></label><div class="flex gap-2"><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input name=connectMethod type=radio value=oauth2><span class=text-sm>OAuth2 (recommended)</span></label><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod value=service><span class=text-sm>Service Account</span></label></div></div><div class=mb-4><label class="block text-sm mb-1">OAuth Redirect URL</label><input type=text name=oauthRedirectUrl class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=https://workflow.juwelt.net/rest/oauth2-credentials/callback title="OAuth Redirect URL"placeholder="OAuth Redirect URL"><p class="text-xs text-gray-400 mt-1">In Gmail, use this URL above when prompted to enter an OAuth callback or redirect URL.</p></div><div class=mb-4><input type=text name=clientId class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"title="Client ID"placeholder="Enter your Client ID"></div><div class=mb-4><input autocomplete=off type=password name=clientSecret class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value title="Client Secret"placeholder="Enter your Client Secret"></div><div class="flex items-center gap-1 text-xs text-gray-400"><span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">i</span><span>Enterprise plan users can pull in credentials from external vaults. <a href=# class=text-blue-400>More info</a></span></div></div><div id=right class="w-[300px] bg-[#252535] rounded p-4 h-full"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-medium">Setup guide</h3><a href=# class="text-xs text-blue-400 flex items-center gap-1">Docs<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1=10 y1=14 x2=21 y2=3></line></svg></a></div><div class="text-xs text-gray-300 overflow-y-auto h-full"><p class=mb-2>Configure this credential:</p><ul class="list-disc pl-5 space-y-2"><li>Log in to your <a href=# class=text-blue-400>Google Cloud console</a>.</li><li>Go to Google Cloud Console / APIs and Services / Credentials. If you don't have a project yet, you'll need to create a new one and select it.</li><li>If you haven't used OAuth in this Google Cloud project before, <a href=# class=text-blue-400>configure the consent screen</a>.</li><li>In Credentials, select + CREATE CREDENTIALS + OAuth client ID.</li><li>In the Application type dropdown, select Web application.</li><li>Under Authorized redirect URLs, select + ADD URI. Paste in the OAuth redirect URL shown on the left.</li><li>Select Create.</li><li>In Enabled APIs and services, select + ENABLE APIS AND SERVICES.</li><li>Select and enable the Gmail API.</li><li>Back to Credentials, click on the credential in OAuth 2.0 Client IDs, and copy the Client ID and Client Secret.</li></ul><p class=mt-2>Click the docs link above for more detailed instructions.`
  ),
  pu = D("<div class=text-sm>Sharing settings content goes here..."),
  mu = D("<div class=text-sm>Details content goes here..."),
  hu = D(
    '<form><div class="bg-[#2a2a3a] text-white rounded-md shadow-lg w-full h-full"><div class="p-4 flex justify-between items-center border-b border-gray-700 "><div class="flex items-center gap-2"><h2 class="text-base font-medium">Gmail account 4</h2><span class="text-xs text-gray-400">Gmail OAuth2 API</span></div><div class="flex items-center gap-2"><button type=submit form=modal2 class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Save</button><button class="text-gray-400 hover:text-white">×</button></div></div><div class="flex w-full h-full"><div class="min-w-[150px] w-[200px] max-w-[250px] bg-[#252535] p-4 flex flex-col gap-3 rounded-bl-md"><button>Connection</button><button>Sharing</button><button>Details</button></div><div class=" p-4 h-full w-full">'
  );
function fu() {
  const [e, t] = P("connection"),
    [n, d] = P("oauth2"),
    {
      setIsModalOpen2: i,
      setFormData: s,
      currentFormConfig: l,
      formData: o,
    } = fe();
  return (() => {
    var c = hu(),
      u = c.firstChild,
      p = u.firstChild,
      m = p.firstChild,
      h = m.nextSibling,
      T = h.firstChild,
      N = T.nextSibling,
      x = p.nextSibling,
      A = x.firstChild,
      y = A.firstChild,
      S = y.nextSibling,
      w = S.nextSibling,
      g = A.nextSibling;
    return (
      (N.$$click = () => i(!1)),
      (y.$$click = () => t("connection")),
      (S.$$click = () => t("sharing")),
      (w.$$click = () => t("details")),
      r(
        g,
        a(se, {
          get when() {
            return e() === "connection";
          },
          get children() {
            var b = uu(),
              C = b.firstChild,
              R = C.firstChild,
              v = R.firstChild,
              f = v.nextSibling,
              k = f.firstChild,
              $ = k.firstChild,
              E = k.nextSibling,
              _ = E.firstChild,
              L = R.nextSibling,
              j = L.firstChild,
              H = j.nextSibling,
              J = L.nextSibling,
              te = J.firstChild,
              Y = J.nextSibling,
              ie = Y.firstChild;
            return (
              H.addEventListener("change", (q) => {
                s({
                  ...o(),
                  [l().id]: {
                    ...o()[l().id],
                    "OAuth Redirect URL": q.target.value,
                  },
                });
              }),
              te.addEventListener("change", (q) => {
                s({
                  ...o(),
                  [l().id]: { ...o()[l().id], "Client ID": q.target.value },
                });
              }),
              ie.addEventListener("change", (q) => {
                s({
                  ...o(),
                  [l().id]: { ...o()[l().id], "Client Secret": q.target.value },
                });
              }),
              Z(() => ($.checked = n() === "oauth2")),
              Z(() => (_.checked = n() === "service")),
              b
            );
          },
        }),
        null
      ),
      r(
        g,
        a(se, {
          get when() {
            return e() === "sharing";
          },
          get children() {
            return pu();
          },
        }),
        null
      ),
      r(
        g,
        a(se, {
          get when() {
            return e() === "details";
          },
          get children() {
            return mu();
          },
        }),
        null
      ),
      Z(
        (b) => {
          var C = `text-left text-sm ${
              e() === "connection" ? "text-white" : "text-gray-400"
            }`,
            R = `text-left text-sm ${
              e() === "sharing" ? "text-white" : "text-gray-400"
            }`,
            v = `text-left text-sm ${
              e() === "details" ? "text-white" : "text-gray-400"
            }`;
          return (
            C !== b.e && z(y, (b.e = C)),
            R !== b.t && z(S, (b.t = R)),
            v !== b.a && z(w, (b.a = v)),
            b
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      c
    );
  })();
}
be(["click"]);
var gu = D(
  '<div class="bg-[#20202c] text-white rounded-lg w-full min-h-[400px] max-h-[800px] flex flex-col"><div class="flex items-center justify-between p-4 border-b border-[#39393b] flex-shrink-0"><h2 class="text-xl font-medium">Edit Sender</h2><div class="text-gray-400 hover:text-white text-xs cursor-pointer bg-[#151520] rounded-md w-6 h-6 flex justify-center items-center">✕</div></div><div class="p-4 flex flex-col flex-1"><label class="text-base text-gray-300 mb-2 font-semibold">Sender</label><textarea placeholder=... class="min-h-[300px] border rounded p-3 border-neutral-700 bg-[#252631] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors resize-y">'
);
const vu = () => {
  const { setIsModalOpen3: e } = fe();
  return (() => {
    var t = gu(),
      n = t.firstChild,
      d = n.firstChild,
      i = d.nextSibling;
    return (i.$$click = () => e(!1)), t;
  })();
};
be(["click"]);
var bu = D(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const xu = ({ node: e }) => {
    const [t, n] = P(),
      {
        nodes: d,
        setNodes: i,
        selectedNode: s,
        setSelectedNode: l,
        pendingOutput: o,
        lastClickPosition: c,
        setEdges: u,
        edges: p,
        transform: m,
        scale: h,
        setIsModalOpen: T,
        isModalOpen: N,
        isModalOpen2: x,
        setIsModalOpen2: A,
        isModalOpen3: y,
        setIsModalOpen3: S,
        currentFormConfig: w,
        setPreviousFormConfig: g,
        setFormData: b,
        formData: C,
      } = fe(),
      R = (H, J, te, Y, ie, q, G) => {
        let K = window.innerWidth / 2,
          I = window.innerHeight / 2;
        const ae = s(),
          ne = o(),
          le = c();
        function de(oe, me = 250, re = 0) {
          const ge = d().find((Ie) => Ie.id === oe);
          if ((n(ge), !ge)) return null;
          const _e = ge.currPosition.get();
          return { x: _e.x + me, y: _e.y + re };
        }
        if (ae) {
          let oe = de(ae);
          oe && ((K = oe.x), (I = oe.y));
        } else if (ne) {
          let oe = de(ne.nodeId);
          oe && ((K = oe.x), (I = oe.y));
        } else le && ((K = (le.x - m().x) / h()), (I = (le.y - m().y) / h()));
        const [ee, F] = P([]),
          [M, B] = P([]),
          [O, W] = P([]),
          [V, Q] = P({ x: K, y: I }),
          [U, X] = P({ x: K, y: I });
        Je(() =>
          i([
            ...d(),
            {
              id: H,
              name: J,
              title: e[J].title,
              numberInputs: e[J].numberInputs,
              numberOutputs: e[J].numberOutputs,
              isInputVertex: e[J].isInputVertex,
              isOutputVertex: e[J].isOutputVertex,
              inputVertexIds: te,
              outputVertexIds: Y,
              isDownVertex: e[J].isDownVertex || !1,
              isUpVertex: e[J].isUpVertex || !1,
              downVertexNumber: e[J].downVertexNumber || 0,
              upVertexNumber: e[J].upVertexNumber || 0,
              downVertexIds: ie,
              upVertexIds: q,
              downVertexOrientation: e[J].downVertexOrientation,
              busyIndex: { get: O, set: W },
              content: e[J].content,
              prevPosition: { get: V, set: Q },
              currPosition: { get: U, set: X },
              inputEdgeIds: { get: ee, set: F },
              outputEdgeIds: { get: M, set: B },
            },
          ])
        );
      };
    function v(H = 0) {
      console.log(t());
      const J = d()[d().length - 1];
      let te, Y, ie, q, G;
      if (t()?.isDownVertex && J.isUpVertex) {
        let B = document.getElementById(t().downVertexIds[H]);
        const {
          left: O,
          right: W,
          top: V,
          bottom: Q,
        } = B.getBoundingClientRect();
        (te = O + Math.abs(O - W) / 2), (Y = V + Math.abs(V - Q) / 2);
        const U = document.getElementById(J.upVertexIds[0]),
          {
            left: X,
            right: oe,
            top: me,
            bottom: re,
          } = U.getBoundingClientRect();
        (ie = X + Math.abs(X - oe) / 2),
          (q = me + Math.abs(me - re) / 2),
          (G = "dash");
      } else {
        let B = document.getElementById(t().outputVertexIds[H]);
        const {
          left: O,
          right: W,
          top: V,
          bottom: Q,
        } = B.getBoundingClientRect();
        (te = O + Math.abs(O - W) / 2), (Y = V + Math.abs(V - Q) / 2);
        const U = document.getElementById(J.inputVertexIds[0]),
          {
            left: X,
            right: oe,
            top: me,
            bottom: re,
          } = U.getBoundingClientRect();
        (ie = X + Math.abs(X - oe) / 2),
          (q = me + Math.abs(me - re) / 2),
          (G = "solid");
      }
      const [K, I] = P({ x: (te - m().x) / h(), y: (Y - m().y) / h() }),
        [ae, ne] = P({ x: (ie - m().x) / h(), y: (q - m().y) / h() }),
        [le, de] = P({ x: (te - m().x) / h(), y: (Y - m().y) / h() }),
        [ee, F] = P({ x: (ie - m().x) / h(), y: (q - m().y) / h() }),
        M = `edge_${t().id}_${H}_${J.id}_0`;
      t().outputEdgeIds.set([...t().outputEdgeIds.get(), M]),
        J.inputEdgeIds.set([...J.inputEdgeIds.get(), M]),
        u([
          ...p(),
          {
            id: M,
            nodeStartId: t().id,
            nodeEndId: J.id,
            inputIndex: 0,
            typeOfEdge: G,
            outputIndex: H,
            inputVertexId: J.inputVertexIds[0],
            outputVertexId: t().outputVertexIds[H],
            prevStartPosition: { get: K, set: I },
            prevEndPosition: { get: ae, set: ne },
            currStartPosition: { get: le, set: de },
            currEndPosition: { get: ee, set: F },
          },
        ]),
        t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[H]]);
    }
    function f(H, J, te) {
      const Y = [
          ...Array(Number(e[H].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        ie = [
          ...Array(Number(e[H].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        q = [
          ...Array(Number(e[H].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        G = [
          ...Array(Number(e[H].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        K = `node_${Math.random().toString(36).substring(2, 8)}_${H}`;
      R(K, H, Y, ie, q, G);
      const I = d()[d().length - 1];
      s()
        ? t()?.isOutputVertex && I.isInputVertex && v()
        : o() &&
          t()?.isOutputVertex &&
          I.isInputVertex &&
          v(o().outputVertexIndex),
        d().length <= 1 && d()[0].isOutputVertex
          ? l(d()[0].id)
          : (t()?.isOutputVertex || t()?.isDownVertex) &&
            I.isInputVertex &&
            l(I.id);
    }
    const [k, $] = P(null),
      [E, _] = P(null),
      L = (H) => {
        let J = H.currentPosition.x,
          te = H.currentPosition.y;
        const Y = [
            ...Array(Number(H.restNumberInput || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          ie = [
            ...Array(Number(H.restNumberOutput || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          q = [
            ...Array(Number(H.restDownVertexNumber || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          G = [
            ...Array(Number(H.restUpVertexNumber || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          [K, I] = P([]),
          [ae, ne] = P([]),
          [le, de] = P([]),
          [ee, F] = P({ x: J, y: te }),
          [M, B] = P({ x: J, y: te }),
          O = [...(H.inputVertexIds ?? []), ...Y],
          W = [...(H.outputVertexIds ?? []), ...ie],
          V = [...(H.downVertexIds ?? []), ...q],
          Q = [...(H.upVertexIds ?? []), ...G];
        Je(() =>
          i([
            ...d(),
            {
              id: H.nodeId,
              name: H.nodeName,
              title: e[H.nodeName].title,
              numberInputs: O.length,
              numberOutputs: W.length,
              downVertexNumber: V.length || 0,
              upVertexNumber: Q.length || 0,
              isInputVertex: e[H.nodeName].isInputVertex,
              isOutputVertex: e[H.nodeName].isOutputVertex,
              isDownVertex: e[H.nodeName].isDownVertex || !1,
              isUpVertex: e[H.nodeName].isUpVertex || !1,
              inputVertexIds: O,
              outputVertexIds: W,
              downVertexIds: V,
              upVertexIds: Q,
              downVertexOrientation: e[H.nodeName].downVertexOrientation,
              busyIndex: { get: le, set: de },
              content: e[H.nodeName].content,
              prevPosition: { get: ee, set: F },
              currPosition: { get: M, set: B },
              inputEdgeIds: { get: K, set: I },
              outputEdgeIds: { get: ae, set: ne },
            },
          ])
        );
      },
      j = (H, J, te) => {
        const Y = d()[d().length - 1],
          ie = document.getElementById(H),
          { left: q, right: G, top: K, bottom: I } = ie.getBoundingClientRect();
        let ae = q + Math.abs(q - G) / 2,
          ne = K + Math.abs(K - I) / 2;
        const le = document.getElementById(J),
          {
            left: de,
            right: ee,
            top: F,
            bottom: M,
          } = le.getBoundingClientRect();
        let B = de + Math.abs(de - ee) / 2,
          O = F + Math.abs(F - M) / 2;
        const [W, V] = P({ x: (ae - m().x) / h(), y: (ne - m().y) / h() }),
          [Q, U] = P({ x: (B - m().x) / h(), y: (O - m().y) / h() }),
          [X, oe] = P({ x: (ae - m().x) / h(), y: (ne - m().y) / h() }),
          [me, re] = P({ x: (B - m().x) / h(), y: (O - m().y) / h() }),
          ge = `edge_${k().id}_0_${Y.id}_0`;
        k().outputEdgeIds.set([...k().outputEdgeIds.get(), ge]),
          Y.inputEdgeIds.set([...Y.inputEdgeIds.get(), ge]),
          u([
            ...p(),
            {
              id: ge,
              nodeStartId: k().id,
              nodeEndId: Y.id,
              inputIndex: 0,
              typeOfEdge: te,
              outputIndex:
                k()?.outputVertexIds.findIndex((_e) => _e === H) || 0,
              inputVertexId: Y.inputVertexIds[0],
              outputVertexId: H,
              prevStartPosition: { get: W, set: V },
              prevEndPosition: { get: Q, set: U },
              currStartPosition: { get: X, set: oe },
              currEndPosition: { get: me, set: re },
            },
          ]),
          k().busyIndex.set([...k().busyIndex.get(), H]);
      };
    return (
      Oe(() => {
        const H = (J) => {
          const te = J.clipboardData?.getData("text/plain");
          if (te) {
            const Y = JSON.parse(te),
              ie = {},
              q = {
                Switch: "switch",
                "Edit Fields": "edit",
                "AI Agent": "ai-agent",
                "customer-support-agent": "customer-support-agent",
                "Vector Store Tool": "vector-store",
                "PGVector Store": "pg-vector",
                "Ollama Chat Model": "ollama-chat",
                "Gmail Trigger": "gmail-trigger",
                Embeddings: "embedding",
              };
            console.log(Y);
            const G = Y.nodes,
              K = Y.connections;
            G.forEach((I) => {
              ie[I.id] = I;
            }),
              b(ie),
              G.forEach((I, ae) => {
                if ((console.log(I.position), e[q[I.name]].isOutputVertex))
                  if ((console.log(I), ae == 0))
                    if (e[q[I.name]].isDownVertex) {
                      console.log(I.name);
                      const ne = K.filter((M) => M.sourceNodeId === I.id),
                        le = ne
                          .map((M) => {
                            const B = G.find((O) => O.id === M.targetNodeId);
                            if (!e[q[B.name]].isUpVertex) return M.sourcePortId;
                          })
                          .filter(Boolean);
                      console.log(le);
                      const de = ne
                        .map((M) => {
                          const B = G.find((O) => O.id === M.targetNodeId);
                          if (e[q[B.name]].isUpVertex) return M.sourcePortId;
                        })
                        .filter(Boolean);
                      console.log("down", de);
                      const F = K.filter((M) => M.targetNodeId === I.id).map(
                        (M) => M.targetPortId
                      );
                      console.log("hey its input vertex", F),
                        L({
                          nodeId: I.id,
                          currentPosition: I.position,
                          nodeName: q[I.name],
                          inputVertexIds: F,
                          outputVertexIds: le,
                          downVertexIds: de,
                          restDownVertexNumber: 2,
                        }),
                        console.log("from test ", d()),
                        $(d().find((M) => M.id === I.id) ?? null),
                        _(d().find((M) => M.id === I.id) ?? null);
                    } else {
                      const le = K.filter((M) => M.sourceNodeId === I.id).map(
                          (M) => M.sourcePortId
                        ),
                        ee = K.filter((M) => M.targetNodeId === I.id).map(
                          (M) => M.targetPortId
                        ),
                        F = Math.abs(e[q[I.name]].numberOutputs - le.length);
                      L({
                        nodeId: I.id,
                        currentPosition: I.position,
                        nodeName: q[I.name],
                        outputVertexIds: le,
                        inputVertexIds: ee,
                        restNumberOutput: F,
                      }),
                        $(d().find((M) => M.id === I.id) ?? null);
                    }
                  else if (e[q[I.name]].isDownVertex) {
                    console.log(I.name);
                    const ne = K.filter((B) => B.sourceNodeId === I.id),
                      le = ne
                        .map((B) => {
                          const O = G.find((W) => W.id === B.targetNodeId);
                          if (!e[q[O.name]].isUpVertex) return B.sourcePortId;
                        })
                        .filter(Boolean);
                    console.log(le);
                    const de = ne
                      .map((B) => {
                        const O = G.find((W) => W.id === B.targetNodeId);
                        if (e[q[O.name]].isUpVertex) return B.sourcePortId;
                      })
                      .filter(Boolean);
                    console.log("down", de);
                    const F = K.filter((B) => B.targetNodeId === I.id).map(
                      (B) => B.targetPortId
                    );
                    L({
                      nodeId: I.id,
                      currentPosition: I.position,
                      nodeName: q[I.name],
                      inputVertexIds: F,
                      outputVertexIds: le,
                      downVertexIds: de,
                      restDownVertexNumber: 2,
                    });
                    const M = k()
                      ?.outputVertexIds.map((B) => {
                        console.log("from text", B);
                        const O = K.find(
                          (W) => (
                            console.log("from test2", W), W.sourcePortId === B
                          )
                        );
                        return console.log("from test3", O), O;
                      })
                      .find((B) => B.targetNodeId === I.id).sourcePortId;
                    j(M, F[0], "solid"),
                      $(d().find((B) => B.id === I.id) ?? null),
                      _(d().find((B) => B.id === I.id) ?? null);
                  } else {
                    const le = K.filter((B) => B.sourceNodeId === I.id).map(
                        (B) => B.sourcePortId
                      ),
                      ee = K.filter((B) => B.targetNodeId === I.id).map(
                        (B) => B.targetPortId
                      ),
                      F = Math.abs(e[q[I.name]].numberOutputs - le.length);
                    L({
                      nodeId: I.id,
                      currentPosition: I.position,
                      nodeName: q[I.name],
                      inputVertexIds: ee,
                      outputVertexIds: le,
                      restNumberOutput: F,
                    });
                    const M = k()
                      ?.outputVertexIds.map((B) => {
                        console.log("from text", B);
                        const O = K.find(
                          (W) => (
                            console.log("from test2", W), W.sourcePortId === B
                          )
                        );
                        return console.log("from test3", O), O;
                      })
                      .find((B) => B.targetNodeId === I.id).sourcePortId;
                    j(M, ee[0], "solid"),
                      $(d().find((B) => B.id === I.id) ?? null);
                  }
                else if (e[q[I.name]].isUpVertex)
                  if ((console.log(I), e[q[I.name]].isDownVertex)) {
                    const le = K.filter((B) => B.sourceNodeId === I.id).map(
                        (B) => B.sourcePortId
                      ),
                      ee = K.filter((B) => B.targetNodeId === I.id).map(
                        (B) => B.targetPortId
                      );
                    console.log("down vertex idsssss", down);
                    const F = Math.abs(
                      e[q[I.name]].downVertexNumber - ee.length
                    );
                    L({
                      nodeId: I.id,
                      currentPosition: I.position,
                      nodeName: q[I.name],
                      upVertexIds: le,
                      downVertexIds: ee,
                      restDownVertexNumber: ee.length === F ? 0 : F,
                    }),
                      console.log("from down up", d());
                    const M = E()
                      ?.downVertexIds.map((B) => {
                        console.log("from text", B);
                        const O = K.find(
                          (W) => (
                            console.log("from test2", W), W.sourcePortId === B
                          )
                        );
                        return console.log("from test3", O), O;
                      })
                      .find((B) => B.targetNodeId === I.id).sourcePortId;
                    console.log("prev", M),
                      j(M, le[0], "dash"),
                      _(d().find((B) => B.id === I.id) ?? null);
                  } else {
                    const ne = K.filter((ee) => ee.targetNodeId === I.id),
                      le = ne.map((ee) => ee.targetPortId);
                    console.log("only up", ne),
                      L({
                        nodeId: I.id,
                        currentPosition: I.position,
                        nodeName: q[I.name],
                        upVertexIds: le,
                      }),
                      G.find((ee) => ee.id === ne[0].sourceNodeId);
                    const de = E()
                      ?.downVertexIds.map((ee) => {
                        console.log("from text", ee);
                        const F = K.find(
                          (M) => (
                            console.log("from test2", M), M.sourcePortId === ee
                          )
                        );
                        return console.log("from test3", F), F;
                      })
                      .find((ee) => ee.targetNodeId === I.id).sourcePortId;
                    console.log("prev", de), j(de, le[0], "dash");
                  }
              });
          }
        };
        document.addEventListener("paste", H),
          Ae(() => {
            document.removeEventListener("paste", H);
          });
      }),
      (() => {
        var H = bu();
        return (
          r(
            H,
            a(ft, {
              get children() {
                return a(fa, {});
              },
            }),
            null
          ),
          r(
            H,
            a(ft, {
              get children() {
                return [
                  a(an, {
                    isOpen: () => N(),
                    onClose: () => T(!1),
                    zIndex: 9999,
                    get children() {
                      return [a(cu, {}), a(eu, {})];
                    },
                  }),
                  a(an, {
                    isOpen: () => x(),
                    onClose: () => A(!1),
                    zIndex: 1e5,
                    widthClass:
                      "w-[1100px] min-w-[750px] max-w-[1200px] h-fit max-h-[90vh]",
                    get children() {
                      return a(fu, {});
                    },
                  }),
                  a(an, {
                    isOpen: () => y(),
                    onClose: () => S(!1),
                    zIndex: 1e5,
                    widthClass: "w-[80vw] max-w-[85vw] h-fit max-h-[90vh]",
                    get children() {
                      return a(vu, {});
                    },
                  }),
                ];
              },
            }),
            null
          ),
          r(
            H,
            a(ft, {
              get children() {
                return a(ri, { onClickAdd: f, nodeMark: ma });
              },
            }),
            null
          ),
          r(
            H,
            a(ft, {
              get children() {
                return a(Fl, {});
              },
            }),
            null
          ),
          r(
            H,
            a(ft, {
              get children() {
                return a(Yi, {});
              },
            }),
            null
          ),
          H
        );
      })()
    );
  },
  yu = "_node_1q1l5_1",
  wu = "_selectedNode_1q1l5_3",
  $u = "_switchIcon_1q1l5_51",
  _u = "_switchNodeText_1q1l5_59",
  Tu = "_switchTitle_1q1l5_75",
  Cu = "_switchDescription_1q1l5_85",
  rt = {
    node: yu,
    selectedNode: wu,
    switchIcon: $u,
    switchNodeText: _u,
    switchTitle: Tu,
    switchDescription: Cu,
  };
var Iu = D(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const Su = (e) =>
    (() => {
      var t = Iu(),
        n = t.firstChild,
        d = n.nextSibling,
        i = d.firstChild,
        s = i.nextSibling;
      return (
        Z(
          (l) => {
            var o = e.selected ? rt.selectedNode : rt.node,
              c = rt.switchIcon,
              u = rt.switchNodeText,
              p = rt.switchTitle,
              m = rt.switchDescription;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(n, (l.t = c)),
              u !== l.a && z(d, (l.a = u)),
              p !== l.o && z(i, (l.o = p)),
              m !== l.i && z(s, (l.i = m)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Eu = "_testNode_3c9qb_1",
  Ou = "_selectedNode_3c9qb_25",
  Du = "_testNodeIcon_3c9qb_55",
  ku = "_testNodeTitle_3c9qb_63",
  Rt = { testNode: Eu, selectedNode: Ou, testNodeIcon: Du, testNodeTitle: ku };
var Nu = D(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const Au = (e) =>
    (() => {
      var t = Nu(),
        n = t.firstChild,
        d = n.nextSibling;
      return (
        Z(
          (i) => {
            var s = e.selected ? Rt.selectedNode : Rt.testNode,
              l = Rt.testNodeIcon,
              o = Rt.testNodeTitle;
            return (
              s !== i.e && z(t, (i.e = s)),
              l !== i.t && z(n, (i.t = l)),
              o !== i.a && z(d, (i.a = o)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  Pu = "_node_160z5_1",
  Vu = "_selectedNode_160z5_23",
  Mu = "_switchIcon_160z5_59",
  Lu = "_switchNodeText_160z5_67",
  Fu = "_switchTitle_160z5_83",
  Bu = "_switchDescription_160z5_93",
  lt = {
    node: Pu,
    selectedNode: Vu,
    switchIcon: Mu,
    switchNodeText: Lu,
    switchTitle: Fu,
    switchDescription: Bu,
  };
var Ru = D(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const qu = (e) =>
    (() => {
      var t = Ru(),
        n = t.firstChild,
        d = n.nextSibling,
        i = d.firstChild,
        s = i.nextSibling;
      return (
        Z(
          (l) => {
            var o = e.selected ? lt.selectedNode : lt.node,
              c = lt.switchIcon,
              u = lt.switchNodeText,
              p = lt.switchTitle,
              m = lt.switchDescription;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(n, (l.t = c)),
              u !== l.a && z(d, (l.a = u)),
              p !== l.o && z(i, (l.o = p)),
              m !== l.i && z(s, (l.i = m)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Hu = "_node_13uy5_1",
  ju = "_selectedNode_13uy5_25",
  zu = "_switchIcon_13uy5_59",
  Wu = "_switchNodeText_13uy5_67",
  Ku = "_switchTitle_13uy5_83",
  $t = {
    node: Hu,
    selectedNode: ju,
    switchIcon: zu,
    switchNodeText: Wu,
    switchTitle: Ku,
  };
var Uu = D(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const Gu = (e) =>
    (() => {
      var t = Uu(),
        n = t.firstChild,
        d = n.nextSibling,
        i = d.firstChild;
      return (
        Z(
          (s) => {
            var l = e.selected ? $t.selectedNode : $t.node,
              o = $t.switchIcon,
              c = $t.switchNodeText,
              u = $t.switchTitle;
            return (
              l !== s.e && z(t, (s.e = l)),
              o !== s.t && z(n, (s.t = o)),
              c !== s.a && z(d, (s.a = c)),
              u !== s.o && z(i, (s.o = u)),
              s
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Xu = "_AiAgentNode_4heyh_1",
  Yu = "_selectedNode_4heyh_33",
  Ju = "_AiAgentNodeIcon_4heyh_71",
  Zu = "_AiAgentNodeTitle_4heyh_81",
  Qu = "_AiAgentNodeDescription_4heyh_97",
  it = {
    AiAgentNode: Xu,
    selectedNode: Yu,
    AiAgentNodeIcon: Ju,
    AiAgentNodeTitle: Zu,
    AiAgentNodeDescription: Qu,
  };
var ep = D("<div><div></div><div><div></div><div>Tools Agent");
const yo = (e) =>
    (() => {
      var t = ep(),
        n = t.firstChild,
        d = n.nextSibling,
        i = d.firstChild,
        s = i.nextSibling;
      return (
        r(n, a($n, {})),
        r(i, () => e.title),
        Z(
          (l) => {
            var o = e.selected ? it.selectedNode : it.AiAgentNode,
              c = it.AiAgentNodeIcon,
              u = it.AiAgentNodeText,
              p = it.AiAgentNodeTitle,
              m = it.AiAgentNodeDescription;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(n, (l.t = c)),
              u !== l.a && z(d, (l.a = u)),
              p !== l.o && z(i, (l.o = p)),
              m !== l.i && z(s, (l.i = m)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  tp = "_EmailNode_imw2c_1",
  np = "_selectedNode_imw2c_23",
  op = "_mailIcon_imw2c_49",
  rp = "_mailNodeText_imw2c_61",
  lp = "_mailTitle_imw2c_77",
  ip = "_mailDescription_imw2c_87",
  at = {
    EmailNode: tp,
    selectedNode: np,
    mailIcon: op,
    mailNodeText: rp,
    mailTitle: lp,
    mailDescription: ip,
  };
var ap = D("<div><div></div><div><div>Send Email</div><div>send");
const sp = (e) =>
    (() => {
      var t = ap(),
        n = t.firstChild,
        d = n.nextSibling,
        i = d.firstChild,
        s = i.nextSibling;
      return (
        r(n, a(Pr, {})),
        Z(
          (l) => {
            var o = e.selected ? at.selectedNode : at.EmailNode,
              c = at.mailIcon,
              u = at.mailNodeText,
              p = at.mailTitle,
              m = at.mailDescription;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(n, (l.t = c)),
              u !== l.a && z(d, (l.a = u)),
              p !== l.o && z(i, (l.o = p)),
              m !== l.i && z(s, (l.i = m)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  dp = "_VectorStoreNode_omif4_1",
  cp = "_selectedNode_omif4_31",
  up = "_VectorStoreNodeIcon_omif4_67",
  pp = "_VectorStoreNodeTitle_omif4_77",
  mp = "_VectorStoreNodeText_omif4_97",
  _t = {
    VectorStoreNode: dp,
    selectedNode: cp,
    VectorStoreNodeIcon: up,
    VectorStoreNodeTitle: pp,
    VectorStoreNodeText: mp,
  };
var hp = D(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const fp = (e) =>
    (() => {
      var t = hp(),
        n = t.firstChild,
        d = n.firstChild,
        i = d.nextSibling,
        s = i.firstChild;
      return (
        r(d, a(Vr, {})),
        Z(
          (l) => {
            var o = e.selected ? _t.selectedNode : _t.VectorStoreNode,
              c = _t.VectorStoreNodeIcon,
              u = _t.VectorStoreNodeText,
              p = _t.VectorStoreNodeTitle;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(d, (l.t = c)),
              u !== l.a && z(i, (l.a = u)),
              p !== l.o && z(s, (l.o = p)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  gp = "_pgVectorNode_4ee5v_1",
  vp = "_selectedNode_4ee5v_31",
  bp = "_pgVectorNodeIcon_4ee5v_67",
  xp = "_pgVectorNodeTitle_4ee5v_77",
  yp = "_pgVectorNodeText_4ee5v_95",
  Tt = {
    pgVectorNode: gp,
    selectedNode: vp,
    pgVectorNodeIcon: bp,
    pgVectorNodeTitle: xp,
    pgVectorNodeText: yp,
  };
var wp = D(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const $p = (e) =>
    (() => {
      var t = wp(),
        n = t.firstChild,
        d = n.firstChild,
        i = d.nextSibling,
        s = i.firstChild;
      return (
        r(d, a(Mr, {})),
        Z(
          (l) => {
            var o = e.selected ? Tt.selectedNode : Tt.pgVectorNode,
              c = Tt.pgVectorNodeIcon,
              u = Tt.pgVectorNodeText,
              p = Tt.pgVectorNodeTitle;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(d, (l.t = c)),
              u !== l.a && z(i, (l.a = u)),
              p !== l.o && z(s, (l.o = p)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  _p = "_ollamaChatNode_24diw_1",
  Tp = "_selectedNode_24diw_31",
  Cp = "_ollamaChatNodeIcon_24diw_67",
  Ip = "_ollamaChatNodeTitle_24diw_77",
  Sp = "_ollamaChatNodeText_24diw_95",
  Ct = {
    ollamaChatNode: _p,
    selectedNode: Tp,
    ollamaChatNodeIcon: Cp,
    ollamaChatNodeTitle: Ip,
    ollamaChatNodeText: Sp,
  };
var Ep = D(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const Op = (e) =>
    (() => {
      var t = Ep(),
        n = t.firstChild,
        d = n.firstChild,
        i = d.nextSibling,
        s = i.firstChild;
      return (
        r(d, a(Lr, {})),
        Z(
          (l) => {
            var o = e.selected ? Ct.selectedNode : Ct.ollamaChatNode,
              c = Ct.ollamaChatNodeIcon,
              u = Ct.ollamaChatNodeText,
              p = `${Ct.ollamaChatNodeTitle} text-nowrap`;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(d, (l.t = c)),
              u !== l.a && z(i, (l.a = u)),
              p !== l.o && z(s, (l.o = p)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Dp = "_gmailTriggerNode_1hu5j_1",
  kp = "_selectedNode_1hu5j_25",
  Np = "_gmailTriggerNodeIcon_1hu5j_55",
  Ap = "_gmailTriggerNodeText_1hu5j_65",
  Pp = "_gmailTriggerNodeTitle_1hu5j_83",
  Vp = "_gmailTriggerNodeDescription_1hu5j_93",
  st = {
    gmailTriggerNode: Dp,
    selectedNode: kp,
    gmailTriggerNodeIcon: Np,
    gmailTriggerNodeText: Ap,
    gmailTriggerNodeTitle: Pp,
    gmailTriggerNodeDescription: Vp,
  };
var Mp = D("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const Lp = (e) =>
    (() => {
      var t = Mp(),
        n = t.firstChild,
        d = n.nextSibling,
        i = d.firstChild,
        s = i.nextSibling;
      return (
        r(n, a(Fr, {})),
        Z(
          (l) => {
            var o = e.selected ? st.selectedNode : st.gmailTriggerNode,
              c = st.gmailTriggerNodeIcon,
              u = st.gmailTriggerNodeText,
              p = st.gmailTriggerNodeTitle,
              m = st.gmailTriggerNodeDescription;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(n, (l.t = c)),
              u !== l.a && z(d, (l.a = u)),
              p !== l.o && z(i, (l.o = p)),
              m !== l.i && z(s, (l.i = m)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Fp = "_createDraftNode_gxi0p_1",
  Bp = "_selectedNode_gxi0p_31",
  Rp = "_createDraftNodeIcon_gxi0p_67",
  qp = "_createDraftNodeTitle_gxi0p_77",
  Hp = "_createDraftNodeText_gxi0p_95",
  jp = "_createDraftNodeDescription_gxi0p_115",
  dt = {
    createDraftNode: Fp,
    selectedNode: Bp,
    createDraftNodeIcon: Rp,
    createDraftNodeTitle: qp,
    createDraftNodeText: Hp,
    createDraftNodeDescription: jp,
  };
var zp = D(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const Wp = (e) =>
    (() => {
      var t = zp(),
        n = t.firstChild,
        d = n.firstChild,
        i = d.nextSibling,
        s = i.firstChild,
        l = s.nextSibling;
      return (
        r(d, a(Br, {})),
        Z(
          (o) => {
            var c = e.selected ? dt.selectedNode : dt.createDraftNode,
              u = dt.createDraftNodeIcon,
              p = dt.createDraftNodeText,
              m = `${dt.createDraftNodeTitle} text-nowrap`,
              h = dt.createDraftNodeDescription;
            return (
              c !== o.e && z(t, (o.e = c)),
              u !== o.t && z(d, (o.t = u)),
              p !== o.a && z(i, (o.a = p)),
              m !== o.o && z(s, (o.o = m)),
              h !== o.i && z(l, (o.i = h)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Kp = "_embeddingNode_19nxp_1",
  Up = "_selectedNode_19nxp_31",
  Gp = "_embeddingNodeIcon_19nxp_67",
  Xp = "_embeddingNodeTitle_19nxp_77",
  Yp = "_embeddingNodeText_19nxp_95",
  It = {
    embeddingNode: Kp,
    selectedNode: Up,
    embeddingNodeIcon: Gp,
    embeddingNodeTitle: Xp,
    embeddingNodeText: Yp,
  };
var Jp = D(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const Zp = (e) =>
    (() => {
      var t = Jp(),
        n = t.firstChild,
        d = n.firstChild,
        i = d.nextSibling,
        s = i.firstChild;
      return (
        r(d, a(Rr, {})),
        Z(
          (l) => {
            var o = e.selected ? It.selectedNode : It.embeddingNode,
              c = It.embeddingNodeIcon,
              u = It.embeddingNodeText,
              p = `${It.embeddingNodeTitle} text-nowrap`;
            return (
              o !== l.e && z(t, (l.e = o)),
              c !== l.t && z(d, (l.t = c)),
              u !== l.a && z(i, (l.a = u)),
              p !== l.o && z(s, (l.o = p)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Qp = {
    chat: {
      name: "chat",
      title: "Chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Au,
    },
    switch: {
      name: "switch",
      title: "Switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Su,
    },
    edit: {
      name: "edit",
      title: "EditNode",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: qu,
    },
    filter: {
      name: "filter",
      title: "Filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Gu,
    },
    "ai-agent": {
      name: "ai-agent",
      title: "AI Agent",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      isDownVertex: !0,
      downVertexNumber: 3,
      downVertexOrientation: "1 1 2",
      content: yo,
    },
    "customer-support-agent": {
      name: "customer-support-agent",
      title: "Customer Support Agent",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      isDownVertex: !0,
      downVertexNumber: 3,
      downVertexOrientation: "1 1 2",
      content: yo,
    },
    "send-email": {
      name: "send-email",
      title: "Send Email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: sp,
    },
    "vector-store": {
      name: "vector-store",
      title: "Vector Store",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isDownVertex: !0,
      isUpVertex: !0,
      upVertexNumber: 1,
      downVertexNumber: 2,
      downVertexOrientation: "1 1",
      content: fp,
    },
    "pg-vector": {
      name: "pg-vector",
      title: "PgVector Store",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isDownVertex: !0,
      isUpVertex: !0,
      upVertexNumber: 1,
      downVertexNumber: 1,
      downVertexOrientation: "1",
      content: $p,
    },
    "ollama-chat": {
      name: "ollama-chat",
      title: "Ollama Chat",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: Op,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      title: "GmailReader",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Lp,
    },
    "create-draft": {
      name: "create-draft",
      title: "Create Draft",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: Wp,
    },
    embedding: {
      name: "embeddings",
      title: "Embeddings",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: Zp,
    },
  },
  em = (e) => a(xu, { node: Qp }),
  tm = document.getElementById("root");
yl(() => a(em, {}), tm);
