(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) s(a);
  new MutationObserver((a) => {
    for (const d of a)
      if (d.type === "childList")
        for (const i of d.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(a) {
    const d = {};
    return (
      a.integrity && (d.integrity = a.integrity),
      a.referrerPolicy && (d.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : a.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function s(a) {
    if (a.ep) return;
    a.ep = !0;
    const d = r(a);
    fetch(a.href, d);
  }
})();
const ur = !1,
  pr = (e, t) => e === t,
  mr = Symbol("solid-track"),
  Gt = { equals: pr };
let _o = Eo;
const Ke = 1,
  Xt = 2,
  To = { owned: null, cleanups: null, context: null, owner: null };
var xe = null;
let rn = null,
  vr = null,
  Ce = null,
  ke = null,
  He = null,
  tn = 0;
function gt(e, t) {
  const r = Ce,
    s = xe,
    a = e.length === 0,
    d = t === void 0 ? s : t,
    i = a
      ? To
      : {
          owned: null,
          cleanups: null,
          context: d ? d.context : null,
          owner: d,
        },
    l = a ? e : () => e(() => We(() => Lt(i)));
  (xe = i), (Ce = null);
  try {
    return xt(l, !0);
  } finally {
    (Ce = r), (xe = s);
  }
}
function D(e, t) {
  t = t ? Object.assign({}, Gt, t) : Gt;
  const r = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    s = (a) => (typeof a == "function" && (a = a(r.value)), Io(r, a));
  return [So.bind(r), s];
}
function q(e, t, r) {
  const s = Mn(e, t, !1, Ke);
  Ft(s);
}
function De(e, t, r) {
  _o = wr;
  const s = Mn(e, t, !1, Ke);
  (!r || !r.render) && (s.user = !0), He ? He.push(s) : Ft(s);
}
function Q(e, t, r) {
  r = r ? Object.assign({}, Gt, r) : Gt;
  const s = Mn(e, t, !0, 0);
  return (
    (s.observers = null),
    (s.observerSlots = null),
    (s.comparator = r.equals || void 0),
    Ft(s),
    So.bind(s)
  );
}
function We(e) {
  if (Ce === null) return e();
  const t = Ce;
  Ce = null;
  try {
    return e();
  } finally {
    Ce = t;
  }
}
function Oe(e) {
  De(() => We(e));
}
function Me(e) {
  return (
    xe === null ||
      (xe.cleanups === null ? (xe.cleanups = [e]) : xe.cleanups.push(e)),
    e
  );
}
function hr() {
  return xe;
}
function fr(e, t) {
  const r = xe,
    s = Ce;
  (xe = e), (Ce = null);
  try {
    return xt(t, !0);
  } catch (a) {
    Pn(a);
  } finally {
    (xe = r), (Ce = s);
  }
}
function gr(e, t) {
  const r = Symbol("context");
  return { id: r, Provider: _r(r), defaultValue: e };
}
function br(e) {
  let t;
  return xe && xe.context && (t = xe.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function Co(e) {
  const t = Q(e),
    r = Q(() => In(t()));
  return (
    (r.toArray = () => {
      const s = r();
      return Array.isArray(s) ? s : s != null ? [s] : [];
    }),
    r
  );
}
function So() {
  if (this.sources && this.state)
    if (this.state === Ke) Ft(this);
    else {
      const e = ke;
      (ke = null), xt(() => Kt(this), !1), (ke = e);
    }
  if (Ce) {
    const e = this.observers ? this.observers.length : 0;
    Ce.sources
      ? (Ce.sources.push(this), Ce.sourceSlots.push(e))
      : ((Ce.sources = [this]), (Ce.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(Ce),
          this.observerSlots.push(Ce.sources.length - 1))
        : ((this.observers = [Ce]),
          (this.observerSlots = [Ce.sources.length - 1]));
  }
  return this.value;
}
function Io(e, t, r) {
  let s = e.value;
  return (
    (!e.comparator || !e.comparator(s, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        xt(() => {
          for (let a = 0; a < e.observers.length; a += 1) {
            const d = e.observers[a],
              i = rn && rn.running;
            i && rn.disposed.has(d),
              (i ? !d.tState : !d.state) &&
                (d.pure ? ke.push(d) : He.push(d), d.observers && Oo(d)),
              i || (d.state = Ke);
          }
          if (ke.length > 1e6) throw ((ke = []), new Error());
        }, !1)),
    t
  );
}
function Ft(e) {
  if (!e.fn) return;
  Lt(e);
  const t = tn;
  xr(e, e.value, t);
}
function xr(e, t, r) {
  let s;
  const a = xe,
    d = Ce;
  Ce = xe = e;
  try {
    s = e.fn(t);
  } catch (i) {
    return (
      e.pure &&
        ((e.state = Ke), e.owned && e.owned.forEach(Lt), (e.owned = null)),
      (e.updatedAt = r + 1),
      Pn(i)
    );
  } finally {
    (Ce = d), (xe = a);
  }
  (!e.updatedAt || e.updatedAt <= r) &&
    (e.updatedAt != null && "observers" in e ? Io(e, s) : (e.value = s),
    (e.updatedAt = r));
}
function Mn(e, t, r, s = Ke, a) {
  const d = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: xe,
    context: xe ? xe.context : null,
    pure: r,
  };
  return (
    xe === null ||
      (xe !== To && (xe.owned ? xe.owned.push(d) : (xe.owned = [d]))),
    d
  );
}
function Yt(e) {
  if (e.state === 0) return;
  if (e.state === Xt) return Kt(e);
  if (e.suspense && We(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < tn); )
    e.state && t.push(e);
  for (let r = t.length - 1; r >= 0; r--)
    if (((e = t[r]), e.state === Ke)) Ft(e);
    else if (e.state === Xt) {
      const s = ke;
      (ke = null), xt(() => Kt(e, t[0]), !1), (ke = s);
    }
}
function xt(e, t) {
  if (ke) return e();
  let r = !1;
  t || (ke = []), He ? (r = !0) : (He = []), tn++;
  try {
    const s = e();
    return yr(r), s;
  } catch (s) {
    r || (He = null), (ke = null), Pn(s);
  }
}
function yr(e) {
  if ((ke && (Eo(ke), (ke = null)), e)) return;
  const t = He;
  (He = null), t.length && xt(() => _o(t), !1);
}
function Eo(e) {
  for (let t = 0; t < e.length; t++) Yt(e[t]);
}
function wr(e) {
  let t,
    r = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? (e[r++] = s) : Yt(s);
  }
  for (t = 0; t < r; t++) Yt(e[t]);
}
function Kt(e, t) {
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const s = e.sources[r];
    if (s.sources) {
      const a = s.state;
      a === Ke
        ? s !== t && (!s.updatedAt || s.updatedAt < tn) && Yt(s)
        : a === Xt && Kt(s, t);
    }
  }
}
function Oo(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const r = e.observers[t];
    r.state ||
      ((r.state = Xt), r.pure ? ke.push(r) : He.push(r), r.observers && Oo(r));
  }
}
function Lt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const r = e.sources.pop(),
        s = e.sourceSlots.pop(),
        a = r.observers;
      if (a && a.length) {
        const d = a.pop(),
          i = r.observerSlots.pop();
        s < a.length &&
          ((d.sourceSlots[i] = s), (a[s] = d), (r.observerSlots[s] = i));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Lt(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Lt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function $r(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function Pn(e, t = xe) {
  throw $r(e);
}
function In(e) {
  if (typeof e == "function" && !e.length) return In(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let r = 0; r < e.length; r++) {
      const s = In(e[r]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function _r(e, t) {
  return function (s) {
    let a;
    return (
      q(
        () =>
          (a = We(
            () => (
              (xe.context = { ...xe.context, [e]: s.value }),
              Co(() => s.children)
            )
          )),
        void 0
      ),
      a
    );
  };
}
const Tr = Symbol("fallback");
function Vn(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Cr(e, t, r = {}) {
  let s = [],
    a = [],
    d = [],
    i = 0,
    l = t.length > 1 ? [] : null;
  return (
    Me(() => Vn(d)),
    () => {
      let p = e() || [],
        u = p.length,
        m,
        g;
      return (
        p[mr],
        We(() => {
          let O, k, y, E, v, x, b, f, h;
          if (u === 0)
            i !== 0 &&
              (Vn(d), (d = []), (s = []), (a = []), (i = 0), l && (l = [])),
              r.fallback &&
                ((s = [Tr]),
                (a[0] = gt((F) => ((d[0] = F), r.fallback()))),
                (i = 1));
          else if (i === 0) {
            for (a = new Array(u), g = 0; g < u; g++)
              (s[g] = p[g]), (a[g] = gt(w));
            i = u;
          } else {
            for (
              y = new Array(u),
                E = new Array(u),
                l && (v = new Array(u)),
                x = 0,
                b = Math.min(i, u);
              x < b && s[x] === p[x];
              x++
            );
            for (
              b = i - 1, f = u - 1;
              b >= x && f >= x && s[b] === p[f];
              b--, f--
            )
              (y[f] = a[b]), (E[f] = d[b]), l && (v[f] = l[b]);
            for (O = new Map(), k = new Array(f + 1), g = f; g >= x; g--)
              (h = p[g]),
                (m = O.get(h)),
                (k[g] = m === void 0 ? -1 : m),
                O.set(h, g);
            for (m = x; m <= b; m++)
              (h = s[m]),
                (g = O.get(h)),
                g !== void 0 && g !== -1
                  ? ((y[g] = a[m]),
                    (E[g] = d[m]),
                    l && (v[g] = l[m]),
                    (g = k[g]),
                    O.set(h, g))
                  : d[m]();
            for (g = x; g < u; g++)
              g in y
                ? ((a[g] = y[g]), (d[g] = E[g]), l && ((l[g] = v[g]), l[g](g)))
                : (a[g] = gt(w));
            (a = a.slice(0, (i = u))), (s = p.slice(0));
          }
          return a;
        })
      );
      function w(O) {
        if (((d[g] = O), l)) {
          const [k, y] = D(g);
          return (l[g] = y), t(p[g], k);
        }
        return t(p[g]);
      }
    }
  );
}
function o(e, t) {
  return We(() => e(t || {}));
}
const Sr = (e) => `Stale read from <${e}>.`;
function ie(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return Q(Cr(() => e.each, e.children, t || void 0));
}
function J(e) {
  const t = e.keyed,
    r = Q(() => e.when, void 0, void 0),
    s = t ? r : Q(r, void 0, { equals: (a, d) => !a == !d });
  return Q(
    () => {
      const a = s();
      if (a) {
        const d = e.children;
        return typeof d == "function" && d.length > 0
          ? We(() =>
              d(
                t
                  ? a
                  : () => {
                      if (!We(s)) throw Sr("Show");
                      return r();
                    }
              )
            )
          : d;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function Ir(e, t, r) {
  let s = r.length,
    a = t.length,
    d = s,
    i = 0,
    l = 0,
    p = t[a - 1].nextSibling,
    u = null;
  for (; i < a || l < d; ) {
    if (t[i] === r[l]) {
      i++, l++;
      continue;
    }
    for (; t[a - 1] === r[d - 1]; ) a--, d--;
    if (a === i) {
      const m = d < s ? (l ? r[l - 1].nextSibling : r[d - l]) : p;
      for (; l < d; ) e.insertBefore(r[l++], m);
    } else if (d === l)
      for (; i < a; ) (!u || !u.has(t[i])) && t[i].remove(), i++;
    else if (t[i] === r[d - 1] && r[l] === t[a - 1]) {
      const m = t[--a].nextSibling;
      e.insertBefore(r[l++], t[i++].nextSibling),
        e.insertBefore(r[--d], m),
        (t[a] = r[d]);
    } else {
      if (!u) {
        u = new Map();
        let g = l;
        for (; g < d; ) u.set(r[g], g++);
      }
      const m = u.get(t[i]);
      if (m != null)
        if (l < m && m < d) {
          let g = i,
            w = 1,
            O;
          for (
            ;
            ++g < a && g < d && !((O = u.get(t[g])) == null || O !== m + w);

          )
            w++;
          if (w > m - l) {
            const k = t[i];
            for (; l < m; ) e.insertBefore(r[l++], k);
          } else e.replaceChild(r[l++], t[i++]);
        } else i++;
      else t[i++].remove();
    }
  }
}
const Fn = "_$DX_DELEGATE";
function Er(e, t, r, s = {}) {
  let a;
  return (
    gt((d) => {
      (a = d),
        t === document ? e() : n(t, e(), t.firstChild ? null : void 0, r);
    }, s.owner),
    () => {
      a(), (t.textContent = "");
    }
  );
}
function _(e, t, r, s) {
  let a;
  const d = () => {
      const l = document.createElement("template");
      return (l.innerHTML = e), l.content.firstChild;
    },
    i = () => (a || (a = d())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function be(e, t = window.document) {
  const r = t[Fn] || (t[Fn] = new Set());
  for (let s = 0, a = e.length; s < a; s++) {
    const d = e[s];
    r.has(d) || (r.add(d), t.addEventListener(d, Or));
  }
}
function ee(e, t, r) {
  r == null ? e.removeAttribute(t) : e.setAttribute(t, r);
}
function V(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Be(e, t, r, s) {
  Array.isArray(r)
    ? ((e[`$$${t}`] = r[0]), (e[`$$${t}Data`] = r[1]))
    : (e[`$$${t}`] = r);
}
function qe(e, t, r = {}) {
  const s = Object.keys(t || {}),
    a = Object.keys(r);
  let d, i;
  for (d = 0, i = a.length; d < i; d++) {
    const l = a[d];
    !l || l === "undefined" || t[l] || (Bn(e, l, !1), delete r[l]);
  }
  for (d = 0, i = s.length; d < i; d++) {
    const l = s[d],
      p = !!t[l];
    !l || l === "undefined" || r[l] === p || !p || (Bn(e, l, !0), (r[l] = p));
  }
  return r;
}
function we(e, t, r) {
  return We(() => e(t, r));
}
function n(e, t, r, s) {
  if ((r !== void 0 && !s && (s = []), typeof t != "function"))
    return Jt(e, t, s, r);
  q((a) => Jt(e, t(), a, r), s);
}
function Bn(e, t, r) {
  const s = t.trim().split(/\s+/);
  for (let a = 0, d = s.length; a < d; a++) e.classList.toggle(s[a], r);
}
function Or(e) {
  let t = e.target;
  const r = `$$${e.type}`,
    s = e.target,
    a = e.currentTarget,
    d = (p) =>
      Object.defineProperty(e, "target", { configurable: !0, value: p }),
    i = () => {
      const p = t[r];
      if (p && !t.disabled) {
        const u = t[`${r}Data`];
        if ((u !== void 0 ? p.call(t, u, e) : p.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(e.target) &&
          d(t.host),
        !0
      );
    },
    l = () => {
      for (; i() && (t = t._$host || t.parentNode || t.host); );
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
    const p = e.composedPath();
    d(p[0]);
    for (let u = 0; u < p.length - 2 && ((t = p[u]), !!i()); u++) {
      if (t._$host) {
        (t = t._$host), l();
        break;
      }
      if (t.parentNode === a) break;
    }
  } else l();
  d(s);
}
function Jt(e, t, r, s, a) {
  for (; typeof r == "function"; ) r = r();
  if (t === r) return r;
  const d = typeof t,
    i = s !== void 0;
  if (
    ((e = (i && r[0] && r[0].parentNode) || e),
    d === "string" || d === "number")
  ) {
    if (d === "number" && ((t = t.toString()), t === r)) return r;
    if (i) {
      let l = r[0];
      l && l.nodeType === 3
        ? l.data !== t && (l.data = t)
        : (l = document.createTextNode(t)),
        (r = dt(e, r, s, l));
    } else
      r !== "" && typeof r == "string"
        ? (r = e.firstChild.data = t)
        : (r = e.textContent = t);
  } else if (t == null || d === "boolean") r = dt(e, r, s);
  else {
    if (d === "function")
      return (
        q(() => {
          let l = t();
          for (; typeof l == "function"; ) l = l();
          r = Jt(e, l, r, s);
        }),
        () => r
      );
    if (Array.isArray(t)) {
      const l = [],
        p = r && Array.isArray(r);
      if (En(l, t, r, a)) return q(() => (r = Jt(e, l, r, s, !0))), () => r;
      if (l.length === 0) {
        if (((r = dt(e, r, s)), i)) return r;
      } else
        p
          ? r.length === 0
            ? Rn(e, l, s)
            : Ir(e, r, l)
          : (r && dt(e), Rn(e, l));
      r = l;
    } else if (t.nodeType) {
      if (Array.isArray(r)) {
        if (i) return (r = dt(e, r, s, t));
        dt(e, r, null, t);
      } else
        r == null || r === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      r = t;
    }
  }
  return r;
}
function En(e, t, r, s) {
  let a = !1;
  for (let d = 0, i = t.length; d < i; d++) {
    let l = t[d],
      p = r && r[e.length],
      u;
    if (!(l == null || l === !0 || l === !1))
      if ((u = typeof l) == "object" && l.nodeType) e.push(l);
      else if (Array.isArray(l)) a = En(e, l, p) || a;
      else if (u === "function")
        if (s) {
          for (; typeof l == "function"; ) l = l();
          a =
            En(e, Array.isArray(l) ? l : [l], Array.isArray(p) ? p : [p]) || a;
        } else e.push(l), (a = !0);
      else {
        const m = String(l);
        p && p.nodeType === 3 && p.data === m
          ? e.push(p)
          : e.push(document.createTextNode(m));
      }
  }
  return a;
}
function Rn(e, t, r = null) {
  for (let s = 0, a = t.length; s < a; s++) e.insertBefore(t[s], r);
}
function dt(e, t, r, s) {
  if (r === void 0) return (e.textContent = "");
  const a = s || document.createTextNode("");
  if (t.length) {
    let d = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const l = t[i];
      if (a !== l) {
        const p = l.parentNode === e;
        !d && !i
          ? p
            ? e.replaceChild(a, l)
            : e.insertBefore(a, r)
          : p && l.remove();
      } else d = !0;
    }
  } else e.insertBefore(a, r);
  return [a];
}
const Dr = "http://www.w3.org/2000/svg";
function Nr(e, t = !1) {
  return t ? document.createElementNS(Dr, e) : document.createElement(e);
}
function Ar(e) {
  const { useShadow: t } = e,
    r = document.createTextNode(""),
    s = () => e.mount || document.body,
    a = hr();
  let d;
  return (
    De(
      () => {
        d || (d = fr(a, () => Q(() => e.children)));
        const i = s();
        if (i instanceof HTMLHeadElement) {
          const [l, p] = D(!1),
            u = () => p(!0);
          gt((m) => n(i, () => (l() ? m() : d()), null)), Me(u);
        } else {
          const l = Nr(e.isSVG ? "g" : "div", e.isSVG),
            p = t && l.attachShadow ? l.attachShadow({ mode: "open" }) : l;
          Object.defineProperty(l, "_$host", {
            get() {
              return r.parentNode;
            },
            configurable: !0,
          }),
            n(p, d),
            i.appendChild(l),
            e.ref && e.ref(l),
            Me(() => i.removeChild(l));
        }
      },
      void 0,
      { render: !0 }
    ),
    r
  );
}
const kr = "_draggable_q87cm_71",
  Mr = "_dragging_q87cm_79",
  Pr = "_selection_q87cm_87",
  Lr = "_testWorkFlow_q87cm_245",
  Vr = "_loader_q87cm_273",
  Fr = "_testButton_q87cm_315",
  Br = "_zoomControl_q87cm_337",
  Rr = "_zoomFit_q87cm_355",
  zr = "_zoomIn_q87cm_409",
  Hr = "_zoomOut_q87cm_461",
  Wr = "_zoomReset_q87cm_513",
  qr = "_zoomResetHide_q87cm_565",
  Ae = {
    "dot-flow__pane": "_dot-flow__pane_q87cm_63",
    draggable: kr,
    dragging: Mr,
    selection: Pr,
    "dot-flow__viewport": "_dot-flow__viewport_q87cm_97",
    "dot-flow__background": "_dot-flow__background_q87cm_127",
    testWorkFlow: Lr,
    loader: Vr,
    testButton: Fr,
    zoomControl: Br,
    zoomFit: Rr,
    zoomIn: zr,
    zoomOut: Hr,
    zoomReset: Wr,
    zoomResetHide: qr,
  },
  [Do, No] = D(!1),
  [Ao, ko] = D(!1),
  [Mo, Po] = D(!1),
  [Lo, Vo] = D(1),
  [Fo, Bo] = D([]),
  [Ro, zo] = D(null),
  [Ho, Wo] = D([]),
  [qo, jo] = D(0);
let [Uo, Go] = D(!1),
  Xo;
const [Yo, Ko] = D({ x: 0, y: 0 }),
  [Jo, Zo] = D({ x: 0, y: 0 }),
  [Qo, el] = D([]),
  [tl, nl] = D({ x: 0, y: 0 }),
  [ol, ll] = D(null),
  [rl, il] = D(null),
  [al, sl] = D(null),
  [dl, cl] = D(!1),
  [ul, pl] = D({ x: 0, y: 0 }),
  [ml, vl] = D(!1),
  [hl, fl] = D(!1),
  [gl, bl] = D(!1),
  [xl, yl] = D(!1),
  [wl, $l] = D(""),
  [_l, Tl] = D(null),
  [Cl, Sl] = D({ name: "", id: "", title: "" }),
  [Il, El] = D({ name: "", id: "", title: "" }),
  [Ol, Dl] = D([]),
  [Nl, Al] = D(null),
  [kl, Ml] = D({}),
  Pl = gr({
    scale: Lo,
    setScale: Vo,
    draggable: Do,
    setDraggable: No,
    isCtrlPressed: Ao,
    setIsCtrlPressed: ko,
    isSpacePressed: Mo,
    setIsSpacePressed: Po,
    edges: Fo,
    setEdges: Bo,
    newEdge: Ro,
    setNewEdge: zo,
    busyIndex: Ho,
    setBusyIndex: Wo,
    edgeLength: qo,
    setEdgeLength: jo,
    isOpen: Uo,
    setIsOpen: Go,
    inputRef: Xo,
    edgeEnd: Yo,
    setEdgeEnd: Ko,
    transform: Jo,
    setTransform: Zo,
    nodes: Qo,
    setNodes: el,
    preTransform: tl,
    setPreTransform: nl,
    selectedNode: ol,
    setSelectedNode: ll,
    pendingOutput: rl,
    setPendingOutput: il,
    lastClickPosition: al,
    setLastClickPosition: sl,
    isShowModal: dl,
    setIsShowModal: cl,
    positionButton: ul,
    setPositionButton: pl,
    isOpening: ml,
    setIsOpening: vl,
    isModalOpen: hl,
    setIsModalOpen: fl,
    typeOfVertex: wl,
    setTypeOfVertex: $l,
    currentFormConfig: Cl,
    setCurrentFormConfig: Sl,
    previousFormConfig: Il,
    setPreviousFormConfig: El,
    isModalOpen2: gl,
    setIsModalOpen2: bl,
    isModalOpen3: xl,
    setIsModalOpen3: yl,
    credentialOptions: Ol,
    setCredentialOptions: Dl,
    selectedCredential: Nl,
    setSelectedCredential: Al,
    formData: kl,
    setFormData: Ml,
    settingConfig: _l,
    setSettingConfig: Tl,
  }),
  me = () => {
    const e = br(Pl);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var jr = _(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const Ur = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: r,
    setIsCtrlPressed: s,
    setIsSpacePressed: a,
    isCtrlPressed: d,
    isSpacePressed: i,
    scale: l,
    setScale: p,
    nodes: u,
    setTransform: m,
    setPreTransform: g,
    transform: w,
  } = me();
  Oe(() => {
    const E = document.getElementById("pane"),
      v = (b) => {
        b.ctrlKey || (r(!1), s(!1)),
          (b.code === "Space" || b.key === " ") &&
            !(b.target instanceof HTMLInputElement) &&
            (b.preventDefault(), a(!1), r(!1));
      },
      x = (b) => {
        b.ctrlKey && (r(!0), s(!0)),
          (b.code === "Space" || b.key === " ") &&
            !(b.target instanceof HTMLInputElement) &&
            (b.preventDefault(), a(!0), r(!0));
      };
    if (E) {
      const b = (f) => {
        f.preventDefault(),
          d() || i()
            ? (console.log("good"),
              y(f, () => l() + f.deltaY * -1e-4, "cursor"))
            : f.shiftKey
            ? m((h) => ({ x: h.x - f.deltaY * 0.5, y: h.y }))
            : m((h) => ({ x: h.x, y: h.y - f.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", v),
        document.addEventListener("keydown", x),
        E.addEventListener("wheel", b, { passive: !1 }),
        Me(() => {
          document.removeEventListener("keydown", x),
            document.removeEventListener("keyup", v),
            E.removeEventListener("wheel", b);
        });
    }
  });
  function O(E) {
    if (E.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const v = Math.min(...E.map((h) => h.currPosition.get().x)),
      x = Math.min(...E.map((h) => h.currPosition.get().y)),
      b = Math.max(
        ...E.map((h) => {
          const F = document.getElementById(h.id);
          return F
            ? h.currPosition.get().x + F.clientWidth
            : h.currPosition.get().x;
        })
      ),
      f = Math.max(
        ...E.map((h) => {
          const F = document.getElementById(h.id);
          return F
            ? h.currPosition.get().y + F.clientHeight
            : h.currPosition.get().y;
        })
      );
    return { minX: v, minY: x, width: b - v, height: f - x };
  }
  function k() {
    const E = document.getElementById("pane");
    if (!E) return;
    const v = O(u());
    if (!v) return;
    const x = 80,
      b = E.getBoundingClientRect(),
      f = b.width - x * 2,
      h = b.height - x * 2,
      F = f / v.width,
      N = h / v.height,
      I = Math.min(F, N, 1),
      c = v.minX + v.width / 2,
      $ = v.minY + v.height / 2,
      T = b.width / 2 - c * I,
      C = b.height / 2 - $ * I;
    p(I), m({ x: T, y: C }), g({ x: T, y: C });
  }
  const y = (E, v, x = "cursor") => {
    const b = document.getElementById("pane");
    if (!b) return;
    E.preventDefault();
    const f = b.getBoundingClientRect(),
      h = x === "cursor" ? E.clientX - f.left : f.width / 2,
      F = x === "cursor" ? E.clientY - f.top : f.height / 2,
      N = l(),
      I = Math.min(Math.max(e, v()), t),
      c = (h - w().x) / N,
      $ = (F - w().y) / N,
      T = h - c * I,
      C = F - $ * I;
    p(I), m({ x: T, y: C }), g({ x: T, y: C });
  };
  return (() => {
    var E = jr(),
      v = E.firstChild,
      x = v.nextSibling,
      b = x.nextSibling,
      f = b.nextSibling;
    return (
      (v.$$click = () => k()),
      (x.$$click = (h) => y(h, () => l() + 0.01, "center")),
      (b.$$click = (h) => y(h, () => Math.max(0, l() - 0.01), "center")),
      (f.$$click = (h) =>
        y(h, () => (p(1), m({ x: 0, y: 0 }), g({ x: 0, y: 0 }), 1), "center")),
      q(
        (h) => {
          var F = Ae.zoomControl,
            N = Ae.zoomFit,
            I = Ae.zoomIn,
            c = Ae.zoomOut,
            $ = l() > 1 || l() < 1 ? Ae.zoomReset : Ae.zoomResetHide;
          return (
            F !== h.e && V(E, (h.e = F)),
            N !== h.t && V(v, (h.t = N)),
            I !== h.a && V(x, (h.a = I)),
            c !== h.o && V(b, (h.o = c)),
            $ !== h.i && V(f, (h.i = $)),
            h
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      E
    );
  })();
};
be(["click"]);
const Gr = "_sidebarMain_dxkxu_1",
  Xr = "_addNode_dxkxu_11",
  Yr = "_sidebarContent_dxkxu_71",
  Kr = "_nodeList_dxkxu_99",
  Jr = "_sidebarContentShow_dxkxu_113",
  Zr = "_sidebarContentHide_dxkxu_123",
  Qr = "_sidebarTitle_dxkxu_135",
  ei = "_searchContainer_dxkxu_153",
  ti = "_inputFieldContainer_dxkxu_161",
  ni = "_inputField_dxkxu_161",
  oi = "_searchIcon_dxkxu_211",
  li = "_firstWrapper_dxkxu_229",
  ri = "_restNodeWrapper_dxkxu_251",
  ii = "_node_dxkxu_99",
  ai = "_nodeIcon_dxkxu_299",
  si = "_title_dxkxu_311",
  di = "_description_dxkxu_325",
  Ne = {
    sidebarMain: Gr,
    addNode: Xr,
    sidebarContent: Yr,
    nodeList: Kr,
    sidebarContentShow: Jr,
    sidebarContentHide: Zr,
    sidebarTitle: Qr,
    searchContainer: ei,
    inputFieldContainer: ti,
    inputField: ni,
    searchIcon: oi,
    firstWrapper: li,
    restNodeWrapper: ri,
    node: ii,
    nodeIcon: ai,
    title: si,
    description: di,
  };
var ci = _(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  ui = _("<div><div><div></div><div><div></div><div>");
const pi = (e) => {
  const { isOpen: t, setIsOpen: r } = me();
  let s;
  const a = (i) => {
    const l = document.getElementById("sidebar-main"),
      p = document.querySelectorAll('[id^="output-"]');
    let u = !1;
    p.forEach((m) => {
      m.contains(i.target) && (u = !0);
    }),
      l && !l.contains(i.target) && !u && r(!1);
  };
  Oe(() => {
    document.addEventListener("click", a);
  });
  const d = (i, l) => {
    i.stopPropagation(), e.onClickAdd(l);
  };
  return (() => {
    var i = ci(),
      l = i.firstChild,
      p = l.nextSibling,
      u = p.firstChild,
      m = u.nextSibling,
      g = m.firstChild,
      w = g.firstChild,
      O = w.nextSibling,
      k = m.nextSibling;
    return (
      (l.$$click = (y) => {
        y.stopPropagation(), r(!0), s && s.focus();
      }),
      we((y) => (s = y), O),
      n(
        k,
        o(ie, {
          get each() {
            return e.nodeMark;
          },
          children: (y, E) =>
            (() => {
              var v = ui(),
                x = v.firstChild,
                b = x.firstChild,
                f = b.nextSibling,
                h = f.firstChild,
                F = h.nextSibling;
              return (
                (v.$$click = (N) => {
                  N.stopPropagation(), d(N, y.name);
                }),
                n(b, o(y.icon, {})),
                n(h, () => y.title),
                n(F, () => y.description),
                q(
                  (N) => {
                    var I = E() == 0 ? Ne.firstWrapper : Ne.restNodeWrapper,
                      c = Ne.node,
                      $ = Ne.nodeIcon,
                      T = Ne.title,
                      C = Ne.description;
                    return (
                      I !== N.e && V(v, (N.e = I)),
                      c !== N.t && V(x, (N.t = c)),
                      $ !== N.a && V(b, (N.a = $)),
                      T !== N.o && V(h, (N.o = T)),
                      C !== N.i && V(F, (N.i = C)),
                      N
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
                ),
                v
              );
            })(),
        })
      ),
      q(
        (y) => {
          var E = Ne.sidebarMain,
            v = Ne.addNode,
            x = {
              [Ne.sidebarContent]: !0,
              [Ne.sidebarContentShow]: t(),
              [Ne.sidebarContentHide]: !t(),
            },
            b = Ne.sidebarTitle,
            f = Ne.searchContainer,
            h = Ne.inputFieldContainer,
            F = Ne.searchIcon,
            N = Ne.inputField,
            I = Ne.nodeList;
          return (
            E !== y.e && V(i, (y.e = E)),
            v !== y.t && V(l, (y.t = v)),
            (y.a = qe(p, x, y.a)),
            b !== y.o && V(u, (y.o = b)),
            f !== y.i && V(m, (y.i = f)),
            h !== y.n && V(g, (y.n = h)),
            F !== y.s && V(w, (y.s = F)),
            N !== y.h && V(O, (y.h = N)),
            I !== y.r && V(k, (y.r = I)),
            y
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
      i
    );
  })();
};
be(["click"]);
const mi = "_node_1l710_1",
  vi = "_nodeSelected_1l710_33",
  hi = "_inputsWrapper_1l710_65",
  fi = "_input_1l710_65",
  gi = "_inputsUPWrapper_1l710_111",
  bi = "_inputUp_1l710_141",
  xi = "_outputsDownWrapper_1l710_167",
  yi = "_outputDown_1l710_193",
  wi = "_outputDownVertex_1l710_207",
  $i = "_downOutputLine_1l710_225",
  _i = "_downPlusLine_1l710_241",
  Ti = "_outputsWrapper_1l710_275",
  Ci = "_output_1l710_167",
  Si = "_outputCircle_1l710_321",
  Ii = "_outputLine_1l710_347",
  Ei = "_plusLine_1l710_363",
  Oi = "_vertexNum_1l710_383",
  Di = "_plusLineHidden_1l710_449",
  Ni = "_outputPlus_1l710_459",
  Ai = "_functionWrapper_1l710_551",
  Te = {
    node: mi,
    nodeSelected: vi,
    inputsWrapper: hi,
    input: fi,
    inputsUPWrapper: gi,
    inputUp: bi,
    outputsDownWrapper: xi,
    outputDown: yi,
    outputDownVertex: wi,
    downOutputLine: $i,
    downPlusLine: _i,
    outputsWrapper: Ti,
    output: Ci,
    outputCircle: Si,
    outputLine: Ii,
    plusLine: Ei,
    vertexNum: Oi,
    plusLineHidden: Di,
    outputPlus: Ni,
    function: "_function_1l710_517",
    functionWrapper: Ai,
  };
var ki = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const zn = (e) => ki();
var je = _("<div>"),
  Hn = _("<div><div>"),
  Wn = _("<div><div></div><div><div></div><div id=plus>");
const Mi = (e) => {
  const { newEdge: t, edgeLength: r, setIsOpen: s, setPendingOutput: a } = me();
  function d(p, u) {
    const { left: m, right: g, top: w, bottom: O } = p.getBoundingClientRect(),
      k = m + Math.abs(m - g) / 2,
      y = w + Math.abs(w - O) / 2;
    e.onMouseEnterInput(k, y, e.id, u);
  }
  function i(p) {
    e.onMouseLeaveInput(e.id, p);
  }
  function l(p, u, m, g, w) {
    u.stopPropagation();
    const { left: O, right: k, top: y, bottom: E } = p.getBoundingClientRect(),
      v = O + Math.abs(O - k) / 2,
      x = y + Math.abs(y - E) / 2;
    e.onMouseDownOutput(v, x, e.id, m, g, w);
  }
  return (() => {
    var p = je();
    return (
      n(
        p,
        (() => {
          var u = Q(() => !!e.isInputVertex);
          return () =>
            u()
              ? (() => {
                  var m = je();
                  return (
                    n(
                      m,
                      o(ie, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (g, w) => {
                          let O = null;
                          return (() => {
                            var k = Hn(),
                              y = k.firstChild;
                            k.addEventListener("mouseleave", () => i(w())),
                              k.addEventListener("mouseenter", () => d(O, w())),
                              ee(k, "id", `input-${g}`);
                            var E = O;
                            return (
                              typeof E == "function" ? we(E, y) : (O = y),
                              ee(y, "id", g),
                              q(() => V(y, Te.input)),
                              k
                            );
                          })();
                        },
                      })
                    ),
                    q(() => V(m, Te.inputsWrapper)),
                    m
                  );
                })()
              : je();
        })(),
        null
      ),
      n(
        p,
        (() => {
          var u = Q(() => !!e.isOutputVertex);
          return () =>
            u() &&
            (() => {
              var m = je();
              return (
                n(
                  m,
                  o(ie, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (g, w) => {
                      let O = null;
                      return (() => {
                        var k = Wn(),
                          y = k.firstChild,
                          E = y.nextSibling,
                          v = E.firstChild,
                          x = v.nextSibling;
                        (k.$$mousedown = (f) => l(O, f, w(), g, "solid")),
                          (k.$$click = (f) => {
                            f.stopPropagation(),
                              s(!0),
                              a({ nodeId: e.id, outputVertexIndex: w() });
                          }),
                          ee(k, "id", `output-${g}`);
                        var b = O;
                        return (
                          typeof b == "function" ? we(b, y) : (O = y),
                          ee(y, "id", g),
                          n(
                            E,
                            (() => {
                              var f = Q(() => e.numberOutputs > 1);
                              return () =>
                                f() &&
                                (() => {
                                  var h = je();
                                  return (
                                    n(h, w), q(() => V(h, Te.vertexNum)), h
                                  );
                                })();
                            })(),
                            v
                          ),
                          n(x, o(zn, {})),
                          q(
                            (f) => {
                              var h = Te.output,
                                F = Te.outputCircle,
                                N = {
                                  [Te.plusLine]: !0,
                                  [Te.plusLineHidden]:
                                    (t()?.outputVertexId == g && r() > 10) ||
                                    e.busyIndex.get().includes(g),
                                },
                                I = Te.outputLine,
                                c = Te.outputPlus;
                              return (
                                h !== f.e && V(k, (f.e = h)),
                                F !== f.t && V(y, (f.t = F)),
                                (f.a = qe(E, N, f.a)),
                                I !== f.o && V(v, (f.o = I)),
                                c !== f.i && V(x, (f.i = c)),
                                f
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
                          k
                        );
                      })();
                    },
                  })
                ),
                q(() => V(m, Te.outputsWrapper)),
                m
              );
            })();
        })(),
        null
      ),
      n(
        p,
        (() => {
          var u = Q(() => !!e.isDownVertex);
          return () =>
            u() &&
            (() => {
              var m = je();
              return (
                n(
                  m,
                  o(ie, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (g, w) => {
                      let O = null;
                      return (() => {
                        var k = Wn(),
                          y = k.firstChild,
                          E = y.nextSibling,
                          v = E.firstChild,
                          x = v.nextSibling;
                        (k.$$mousedown = (f) => l(O, f, w(), g, "dash")),
                          (k.$$click = (f) => {
                            f.stopPropagation(),
                              s(!0),
                              a({ nodeId: e.id, outputVertexIndex: w() });
                          }),
                          ee(k, "id", `output-${g}`);
                        var b = O;
                        return (
                          typeof b == "function" ? we(b, y) : (O = y),
                          ee(y, "id", g),
                          n(x, o(zn, {})),
                          q(
                            (f) => {
                              var h = Te.outputDown,
                                F = Te.outputDownVertex,
                                N = {
                                  [Te.downPlusLine]: !0,
                                  [Te.plusLineHidden]:
                                    (t()?.outputVertexId == g && r() > 10) ||
                                    e.busyIndex.get().includes(g),
                                },
                                I = Te.downOutputLine,
                                c = Te.outputPlus;
                              return (
                                h !== f.e && V(k, (f.e = h)),
                                F !== f.t && V(y, (f.t = F)),
                                (f.a = qe(E, N, f.a)),
                                I !== f.o && V(v, (f.o = I)),
                                c !== f.i && V(x, (f.i = c)),
                                f
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
                          k
                        );
                      })();
                    },
                  })
                ),
                q(() => V(m, `${Te.outputsDownWrapper} `)),
                m
              );
            })();
        })(),
        null
      ),
      n(
        p,
        (() => {
          var u = Q(() => !!e.isUpVertex);
          return () =>
            u()
              ? (() => {
                  var m = je();
                  return (
                    n(
                      m,
                      o(ie, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (g, w) => {
                          let O = null;
                          return (() => {
                            var k = Hn(),
                              y = k.firstChild;
                            k.addEventListener("mouseleave", () => i(w())),
                              k.addEventListener("mouseenter", () => d(O, w())),
                              ee(k, "id", `input-${g}`);
                            var E = O;
                            return (
                              typeof E == "function" ? we(E, y) : (O = y),
                              ee(y, "id", g),
                              q(() => V(y, Te.inputUp)),
                              k
                            );
                          })();
                        },
                      })
                    ),
                    q(() => V(m, Te.inputsUPWrapper)),
                    m
                  );
                })()
              : je();
        })(),
        null
      ),
      p
    );
  })();
};
be(["click", "mousedown"]);
var Pi = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const Li = (e) => Pi();
var Vi = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const Fi = (e) => Vi();
var Bi = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const Ri = (e) => Bi();
var zi = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const Hi = (e) => zi(),
  Wi = {
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
var qi = _(
  "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
);
const ji = (e) => {
  const {
    setIsShowModal: t,
    isShowModal: r,
    setPositionButton: s,
    setIsOpening: a,
    setIsModalOpen: d,
    setCurrentFormConfig: i,
    setSettingConfig: l,
    currentFormConfig: p,
  } = me();
  return (() => {
    var u = qi(),
      m = u.firstChild,
      g = m.firstChild,
      w = g.firstChild,
      O = w.nextSibling,
      k = O.nextSibling,
      y = k.nextSibling,
      E = m.nextSibling;
    return (
      we((v) => v, u),
      (u.$$pointerdown = (v) => {
        v.stopPropagation(), e.onMouseDownNode(v, e.id);
      }),
      (u.$$dblclick = () => {
        d(!0),
          console.log(e.name),
          i({ name: e.name, id: e.id, title: e.title }),
          console.log(p()),
          l(Wi[e.name]);
      }),
      (w.$$click = (v) => v.stopPropagation()),
      n(w, o(Li, {})),
      (O.$$click = (v) => v.stopPropagation()),
      n(O, o(Fi, {})),
      (k.$$pointerdown = (v) => {
        v.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      n(k, o(Ri, {})),
      (y.$$click = (v) => v.stopPropagation()),
      n(y, o(Hi, {})),
      n(
        E,
        o(e.content, {
          get selected() {
            return e.selected;
          },
          get title() {
            return e.title;
          },
        })
      ),
      n(
        u,
        o(Mi, {
          get id() {
            return e.id;
          },
          get name() {
            return e.name;
          },
          get numberInputs() {
            return e.numberInputs;
          },
          get numberOutputs() {
            return e.numberOutputs;
          },
          get isInputVertex() {
            return e.isInputVertex;
          },
          get isOutputVertex() {
            return e.isOutputVertex;
          },
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
      q(
        (v) => {
          var x = e.id,
            b = e.selected ? Te.nodeSelected : Te.node,
            f = `translate(${e.x}px, ${e.y}px)`,
            h = Te.functionWrapper,
            F = Te.function;
          return (
            x !== v.e && ee(u, "id", (v.e = x)),
            b !== v.t && V(u, (v.t = b)),
            f !== v.a &&
              ((v.a = f) != null
                ? u.style.setProperty("transform", f)
                : u.style.removeProperty("transform")),
            h !== v.o && V(m, (v.o = h)),
            F !== v.i && V(g, (v.i = F)),
            v
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      u
    );
  })();
};
be(["dblclick", "pointerdown", "click"]);
const Ui = "_wrapper_gp6p5_1",
  Gi = "_edge_gp6p5_29",
  Xi = "_hitArea_gp6p5_61",
  Yi = "_edgeDash_gp6p5_91",
  Ki = "_deleteHidden_gp6p5_111",
  Ji = "_icon_gp6p5_125",
  Zi = "_circle_gp6p5_139",
  Qi = "_edgeSelected_gp6p5_177",
  ea = "_edgeNew_gp6p5_81",
  Fe = {
    wrapper: Ui,
    edge: Gi,
    delete: "_delete_gp6p5_43",
    hitArea: Xi,
    edgeDash: Yi,
    deleteHidden: Ki,
    icon: Ji,
    circle: Zi,
    edgeSelected: Qi,
    edgeNew: ea,
  };
var ta = _(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path fill=none stroke=transparent stroke-width=40 style=pointer-events:stroke;></path><path fill=none marker-end=url(#arrowhead) style=pointer-events:none;></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const qn = (e) => {
  const [t, r] = D({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    [s, a] = D(0);
  De(() => {
    const u = e.position.x0,
      m = e.position.y0,
      g = e.position.x1,
      w = e.position.y1,
      O = g - u,
      k =
        e.typeOfEdge !== "dash" &&
        ((e.isNew && e.edgeLength() > 40 && O < 40) || (!e.isNew && O < 40));
    let y, E;
    if (k) {
      const v = u + 40,
        x = g - 40,
        b = 120;
      (y = (v + x) / 2), (E = m + b);
    } else (y = u + (g - u) / 2), (E = m + (w - m) / 2);
    r({ x: y, y: E });
  });
  const d = (u) => {
      u.stopPropagation(), e.onMouseDownEdge();
    },
    i = (u) => {
      u.stopPropagation(), e.onClickDeleteEdge();
    },
    l = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    p = (u, m, g, w) => {
      const k = u + 40,
        y = g - 40,
        E = g - u;
      a(E);
      const v = w - m,
        x = 120,
        b = 105,
        f = l();
      function h() {
        return v > 105 && v < 135 ? 0 : 10;
      }
      function F() {
        return `
      M ${u} ${m}
      L ${k - 10} ${m}
      Q ${k} ${m} ${k} ${m + 10}
  
      L ${k} ${m + x - 10}
      Q ${k} ${m + x} ${k - 10} ${m + x}
  
      L ${y + 10} ${m + x}
      Q ${y} ${m + x} ${y} ${v > b ? m + x + h() : m + x - h()}
  
      L ${y} ${v > b ? w - h() : w + h()}
      Q ${y} ${w} ${y + 10} ${w}
  
      L ${g} ${w}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${u} ${m} C ${u} ${m + f}, ${g} ${w - f}, ${g} ${w}`
        : (e.isNew && e.edgeLength() > 40 && E < 40) || (!e.isNew && E < 40)
        ? F()
        : `M ${u} ${m} C ${u + f} ${m}, ${g - f} ${w}, ${g} ${w}`;
    };
  return (() => {
    var u = ta(),
      m = u.firstChild,
      g = m.nextSibling,
      w = g.nextSibling,
      O = w.nextSibling,
      k = O.firstChild,
      y = k.nextSibling;
    return (
      (w.$$mousedown = d),
      (O.$$mousedown = i),
      q(
        (E) => {
          var v = Fe.wrapper,
            x = Fe.hitArea,
            b = p(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            f = `${e.isNew ? Fe.edgeNew : Fe.edge} ${
              e.typeOfEdge == "dash" ? Fe.edgeDash : ""
            } ${e.selected ? Fe.edgeSelected : ""}`,
            h = p(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            F = e.isNew ? Fe.deleteHidden : Fe.delete,
            N = `translate(${t().x}, ${t().y})`,
            I = Fe.circle,
            c = Fe.icon;
          return (
            v !== E.e && ee(u, "class", (E.e = v)),
            x !== E.t && ee(g, "class", (E.t = x)),
            b !== E.a && ee(g, "d", (E.a = b)),
            f !== E.o && ee(w, "class", (E.o = f)),
            h !== E.i && ee(w, "d", (E.i = h)),
            F !== E.n && ee(O, "class", (E.n = F)),
            N !== E.s && ee(O, "transform", (E.s = N)),
            I !== E.h && ee(k, "class", (E.h = I)),
            c !== E.r && ee(y, "class", (E.r = c)),
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
          r: void 0,
        }
      ),
      u
    );
  })();
};
be(["mousedown"]);
var na = _(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0">'
  ),
  jn = _("<div>");
const oa = () => {
  const [e, t] = D({ x: -1, y: -1 }),
    [r, s] = D(!1),
    {
      draggable: a,
      isCtrlPressed: d,
      isSpacePressed: i,
      scale: l,
      edges: p,
      newEdge: u,
      setEdges: m,
      setNewEdge: g,
      transform: w,
      setTransform: O,
      preTransform: k,
      setPreTransform: y,
      selectedNode: E,
      setSelectedNode: v,
      setLastClickPosition: x,
      setEdgeLength: b,
      nodes: f,
      setNodes: h,
    } = me();
  De(() => {});
  const [F, N] = D(null),
    [I, c] = D(null),
    [$, T] = D(null),
    [C, A] = D([]),
    [P, H] = D(null),
    [K, ae] = D(null);
  Oe(() => {
    const M = (S) => {
        if (S.code === "Delete") {
          if (C() && E() === null)
            C().forEach((z) => {
              const L = f().find((G) => G.id === z);
              L && j(L.id);
            }),
              H(null);
          else if (E() !== null) {
            const z = f().find((L) => L.id === E());
            z && j(z.id);
          }
        }
      },
      R = (S) => {
        S.preventDefault();
      },
      X = document.getElementById("pane");
    X && X.addEventListener("wheel", R, { passive: !1 }),
      document.addEventListener("keydown", M),
      Me(() => {
        document.removeEventListener("keydown", M),
          X && X.removeEventListener("wheel", R);
      });
  });
  function oe(M) {
    const R = window.innerWidth,
      X = window.innerHeight;
    let S = 0,
      z = 0;
    const L = 60,
      G = 10;
    if (
      (M.clientX < L ? (S = G) : M.clientX > R - L && (S = -10),
      M.clientY < L ? (z = G) : M.clientY > X - L && (z = -10),
      S !== 0 || z !== 0)
    ) {
      if (
        (O((U) => ({ x: U.x + S, y: U.y + z })),
        y((U) => ({ x: U.x + S, y: U.y + z })),
        P()
          ? t((U) => ({ x: U.x - S, y: U.y - z }))
          : t((U) => ({ x: U.x + S, y: U.y + z })),
        P())
      )
        H((U) => ({
          x: U.x - S / l(),
          y: U.y - z / l(),
          width: U.width,
          height: U.height,
        })),
          C().forEach((U) => {
            const Y = f().find((Z) => Z.id === U);
            if (Y) {
              const Z = Y.currPosition.get();
              Y.currPosition.set({ x: Z.x - S / l(), y: Z.y - z / l() }),
                Y.inputEdgeIds.get().forEach((de) => {
                  const le = p().find((ye) => ye.id === de);
                  if (le) {
                    const ye = le.currEndPosition.get();
                    le.currEndPosition.set({
                      x: ye.x - S / l(),
                      y: ye.y - z / l(),
                    });
                  }
                }),
                Y.outputEdgeIds.get().forEach((de) => {
                  const le = p().find((ye) => ye.id === de);
                  if (le) {
                    const ye = le.currStartPosition.get();
                    le.currStartPosition.set({
                      x: ye.x - S / l(),
                      y: ye.y - z / l(),
                    });
                  }
                });
            }
          });
      else if (E() !== null) {
        const U = f().find((Y) => Y.id === E());
        if (U) {
          const Y = U.currPosition.get();
          U.currPosition.set({ x: Y.x - S / l(), y: Y.y - z / l() }),
            U.inputEdgeIds.get().forEach((Z) => {
              const de = p().find((le) => le.id === Z);
              if (de) {
                const le = de.currEndPosition.get();
                de.currEndPosition.set({
                  x: le.x - S / l(),
                  y: le.y - z / l(),
                });
              }
            }),
            U.outputEdgeIds.get().forEach((Z) => {
              const de = p().find((le) => le.id === Z);
              if (de) {
                const le = de.currStartPosition.get();
                de.currStartPosition.set({
                  x: le.x - S / l(),
                  y: le.y - z / l(),
                });
              }
            });
        }
      }
    }
  }
  const te = (M) => {
      const R = d() || i(),
        X = M.x - e().x,
        S = M.y - e().y;
      if ($()) {
        const z = e(),
          L = M.clientX - z.x,
          G = M.clientY - z.y;
        T({ x: z.x, y: z.y, width: L, height: G });
        const U = {
            x: Math.min(z.x, M.clientX),
            y: Math.min(z.y, M.clientY),
            width: Math.abs(L),
            height: Math.abs(G),
          },
          Y = f().filter((Z) => {
            const de = document.getElementById(Z.id);
            if (!de) return !1;
            const le = Z.currPosition.get().x * l() + w().x,
              ye = Z.currPosition.get().y * l() + w().y,
              $e = de.offsetWidth,
              _e = de.offsetHeight;
            return (
              le + $e > U.x &&
              le < U.x + U.width &&
              ye + _e > U.y &&
              ye < U.y + U.height
            );
          });
        A(Y.map((Z) => Z.id));
      }
      if (P() && K()) {
        const z = M.clientX - K().x,
          L = M.clientY - K().y,
          G = P();
        H({
          x: G.x + z / l(),
          y: G.y + L / l(),
          width: G.width,
          height: G.height,
        }),
          C().forEach((U) => {
            const Y = f().find((Z) => Z.id === U);
            if (Y) {
              const Z = Y.currPosition.get(),
                de = Z.x + z / l(),
                le = Z.y + L / l();
              Y.currPosition.set({ x: de, y: le }),
                Y.inputEdgeIds.get().forEach((ye) => {
                  const $e = p().find((_e) => _e.id === ye);
                  if ($e) {
                    const _e = $e.currEndPosition.get();
                    $e.currEndPosition.set(() => ({
                      x: _e.x + z / l(),
                      y: _e.y + L / l(),
                    }));
                  }
                }),
                Y.outputEdgeIds.get().forEach((ye) => {
                  const $e = p().find((_e) => _e.id === ye);
                  if ($e) {
                    const _e = $e.currStartPosition.get();
                    $e.currStartPosition.set(() => ({
                      x: _e.x + z / l(),
                      y: _e.y + L / l(),
                    }));
                  }
                });
            }
          }),
          ae({ x: M.clientX, y: M.clientY }),
          oe(M);
      } else if (e().x >= 0 && E() !== null) {
        const z = f().find((L) => L.id === E());
        if (z) {
          z.currPosition.set((L) => ({
            x: (z.prevPosition.get().x + X) / l(),
            y: (z.prevPosition.get().y + S) / l(),
          }));
          for (let L = 0; L < z.inputEdgeIds.get().length; L++) {
            const G = z.inputEdgeIds.get()[L],
              U = p().find((Y) => Y.id === G);
            U &&
              U.currEndPosition.set(() => ({
                x: (U.prevEndPosition.get().x + X) / l(),
                y: (U.prevEndPosition.get().y + S) / l(),
              }));
          }
          for (let L = 0; L < z.outputEdgeIds.get().length; L++) {
            const G = z.outputEdgeIds.get()[L],
              U = p().find((Y) => Y.id === G);
            U &&
              U.currStartPosition.set(() => ({
                x: (U.prevStartPosition.get().x + X) / l(),
                y: (U.prevStartPosition.get().y + S) / l(),
              }));
          }
          oe(M);
        }
      } else if (R && r() && E() === null) {
        M.preventDefault();
        const z = M.x - e().x,
          L = M.y - e().y;
        O({ x: z + k().x, y: L + k().y });
      }
      if (u() !== null) {
        b(W());
        const z = document.getElementById("boardWrapper"),
          L = 50;
        if (z) {
          const [G, U] = D(null);
          for (const Y of f()) {
            const Z = Y.isInputVertex || Y.isUpVertex;
            if (Y.id !== u().nodeStartId && Z) {
              const de = Y.isInputVertex
                  ? Y.inputVertexIds[0]
                  : Y.upVertexIds[0],
                le = document.getElementById(de),
                {
                  left: ye,
                  right: $e,
                  top: _e,
                  bottom: Je,
                } = le.getBoundingClientRect(),
                Ze = ye + Math.abs(ye - $e) / 2,
                Qe = _e + Math.abs(_e - Je) / 2,
                et = M.clientX - Ze,
                st = M.clientY - Qe;
              if (Math.sqrt(et * et + st * st) < L) {
                U({ positionX: Ze, positionY: Qe, id: Y.id });
                break;
              }
            }
          }
          G() !== null
            ? (u()?.currEndPosition.set({
                x: (G().positionX - w().x) / l(),
                y: (G().positionY - w().y) / l(),
              }),
              c({
                nodeId: G().id,
                inputIndex: 0,
                positionX: G().positionX,
                positionY: G().positionY,
              }))
            : (c(null),
              u()?.currEndPosition.set({
                x: (M.x - w().x) / l(),
                y: (M.y - w().y) / l(),
              }));
        }
      }
    },
    pe = () => {
      if ((t({ x: -1, y: -1 }), s(!1), y(w()), $())) {
        const M = $();
        let R = {
          x: Math.min(M.x, M.x + M.width),
          y: Math.min(M.y, M.y + M.height),
          width: Math.abs(M.width),
          height: Math.abs(M.height),
        };
        const X = f().filter((S) => {
          const z = document.getElementById(S.id);
          if (!z) return !1;
          const L = S.currPosition.get().x * l() + w().x,
            G = S.currPosition.get().y * l() + w().y,
            U = z.offsetWidth,
            Y = z.offsetHeight;
          return (
            L + U > R.x &&
            L < R.x + R.width &&
            G + Y > R.y &&
            G < R.y + R.height
          );
        });
        if ((A(X.map((S) => S.id)), T(null), X.length > 0)) {
          const S = X.map((Y) => {
              const de = document.getElementById(Y.id)?.getBoundingClientRect();
              if (!de) return { x: 0, y: 0, width: 0, height: 0 };
              const le = (de.left - w().x) / l(),
                ye = (de.top - w().y) / l(),
                $e = de.width / l(),
                _e = de.height / l();
              return { x: le, y: ye, width: $e, height: _e };
            }),
            z = Math.min(...S.map((Y) => Y.x)),
            L = Math.min(...S.map((Y) => Y.y)),
            G = Math.max(...S.map((Y) => Y.x + Y.width)),
            U = Math.max(...S.map((Y) => Y.y + Y.height));
          H({ x: z, y: L, width: G - z, height: U - L }),
            X.forEach((Y) => {
              Y.prevPosition.set({
                x: Y.currPosition.get().x * l(),
                y: Y.currPosition.get().y * l(),
              });
            });
        }
      }
      if (
        (u() !== null && I() === null && g(null), u() !== null && I() !== null)
      ) {
        const M = u().nodeStartId,
          R = I().nodeId,
          X = f().find((L) => L.id === M),
          S = f().find((L) => L.id === R),
          z = document.getElementById("boardWrapper");
        if (X && S && z) {
          const L = `edge_${Math.random().toString(36).substring(2, 8)}_${
            X.id
          }_${u()?.outputIndex}_${S.id}_${I()?.inputIndex}`;
          if (
            X.outputEdgeIds.get().includes(L) &&
            S.inputEdgeIds.get().includes(L)
          ) {
            g(null);
            return;
          }
          X.outputEdgeIds.set([...X.outputEdgeIds.get(), L]),
            S.inputEdgeIds.set([...S.inputEdgeIds.get(), L]),
            u().prevStartPosition.set(() => ({
              x: (u().currStartPosition.get().x - w().x) / l(),
              y: (u().currStartPosition.get().y - w().y) / l(),
            })),
            u().prevEndPosition.set(() => ({
              x: (I().positionX - w().x) / l(),
              y: (I().positionY - w().y) / l(),
            })),
            u().currEndPosition.set(() => ({
              x: (I().positionX - w().x) / l(),
              y: (I().positionY - w().y) / l(),
            })),
            m([
              ...p(),
              {
                ...u(),
                id: L,
                nodeEndId: S.id,
                inputVertexId: S.inputVertexIds[0],
                nodeEndInputIndex: I().inputIndex,
              },
            ]);
          const G = f().find((U) => U.id == u()?.nodeStartId);
          G.busyIndex.set([...G.busyIndex.get(), u().outputVertexId]), g(null);
        }
      }
      ae(null);
    },
    ne = (M) => {
      x({ x: M.clientX, y: M.clientY }),
        v(null),
        N(null),
        d() || i()
          ? (s(!0), t({ x: M.x, y: M.y }))
          : (t({ x: M.clientX, y: M.clientY }),
            T({ x: M.clientX, y: M.clientY, width: 0, height: 0 }),
            H(null),
            A([]));
    };
  function ue(M, R) {
    v(R), t({ x: M.x, y: M.y });
    const X = f().find((S) => S.id == E());
    if (X) {
      X.prevPosition.set((S) => ({
        x: X.currPosition.get().x * l(),
        y: X.currPosition.get().y * l(),
      }));
      for (let S = 0; S < X.inputEdgeIds.get().length; S++) {
        const z = X.inputEdgeIds.get()[S],
          L = p().find((G) => G.id === z);
        L &&
          L.prevEndPosition.set(() => ({
            x: L.currEndPosition.get().x * l(),
            y: L.currEndPosition.get().y * l(),
          }));
      }
      for (let S = 0; S < X.outputEdgeIds.get().length; S++) {
        const z = X.outputEdgeIds.get()[S],
          L = p().find((G) => G.id === z);
        L &&
          L.prevStartPosition.set(() => ({
            x: L.currStartPosition.get().x * l(),
            y: L.currStartPosition.get().y * l(),
          }));
      }
    }
  }
  function ce(M, R, X, S, z, L) {
    if ((v(null), document.getElementById("pane"))) {
      const [U, Y] = D({ x: (M - w().x) / l(), y: (R - w().y) / l() }),
        [Z, de] = D({ x: (M - w().x) / l(), y: (R - w().y) / l() }),
        [le, ye] = D({ x: (M - w().x) / l(), y: (R - w().y) / l() }),
        [$e, _e] = D({ x: (M - w().x) / l(), y: (R - w().y) / l() });
      g({
        id: "",
        nodeStartId: X,
        outputIndex: S,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: z,
        inputVertexId: "",
        typeOfEdge: L,
        prevStartPosition: { get: U, set: Y },
        prevEndPosition: { get: Z, set: de },
        currStartPosition: { get: le, set: ye },
        currEndPosition: { get: $e, set: _e },
      });
    }
  }
  function B(M, R, X, S) {
    c({ nodeId: X, inputIndex: S, positionX: M, positionY: R });
  }
  function ve(M, R) {
    I()?.nodeId == M && I()?.inputIndex == R && c(null);
  }
  function re(M) {
    v(null), N(M);
    const R = p().find((X) => X.id === M);
    R && console.log(R.currStartPosition.get().x, R.currStartPosition.get().y);
  }
  function he(M) {
    const R = p().find((X) => X.id === M);
    if (R) {
      const X = f().find((L) => L.id == R.nodeStartId);
      X &&
        X.outputEdgeIds.set([...X.outputEdgeIds.get().filter((L) => L !== M)]);
      const S = f().find((L) => L.id === R.nodeEndId);
      S && S.inputEdgeIds.set([...S.inputEdgeIds.get().filter((L) => L !== M)]),
        p().filter((L) => L.outputVertexId === R.outputVertexId).length <= 1 &&
          X &&
          X.busyIndex.set([
            ...X.busyIndex.get().filter((L) => L !== R.outputVertexId),
          ]),
        m([...p().filter((L) => L.id !== M)]);
    }
  }
  function j(M) {
    const R = f().find((G) => G.id == M);
    if (!R) {
      v(null);
      return;
    }
    const X = R.inputEdgeIds.get(),
      S = R.outputEdgeIds.get(),
      L = [...X, ...S].filter((G, U, Y) => Y.indexOf(G) === U);
    for (let G = 0; G < L.length; G++) {
      const U = p().find((Y) => Y.id === L[G]);
      if (U) {
        const Y = f().find((le) => le.id === U.nodeStartId),
          Z = f().find((le) => le.id === U.nodeEndId);
        Y?.outputEdgeIds.set([
          ...Y.outputEdgeIds.get().filter((le) => le !== L[G]),
        ]),
          Z?.inputEdgeIds.set([
            ...Z.inputEdgeIds.get().filter((le) => le !== L[G]),
          ]),
          p().filter((le) => le.outputVertexId === U.outputVertexId).length <=
            1 &&
            Y &&
            Y.busyIndex.set([
              ...Y.busyIndex.get().filter((le) => le !== U.outputVertexId),
            ]),
          m([...p().filter((le) => U.id !== le.id)]);
      }
    }
    h([...f().filter((G) => G.id !== M)]), v(null);
  }
  function W() {
    const M = u().currEndPosition.get().x - u().currStartPosition.get().x,
      R = u().currEndPosition.get().y - u().currStartPosition.get().y;
    return Math.sqrt(M * M + R * R);
  }
  return (() => {
    var M = na(),
      R = M.firstChild,
      X = R.nextSibling;
    return (
      (M.$$mousemove = te),
      (M.$$mouseup = pe),
      (M.$$pointerdown = ne),
      R.style.setProperty("transform-origin", "top left"),
      n(
        M,
        (() => {
          var S = Q(() => !!$());
          return () =>
            S() &&
            (() => {
              var z = jn();
              return (
                z.style.setProperty("position", "absolute"),
                z.style.setProperty("border", "1px dashed #00aaff"),
                z.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                z.style.setProperty("z-index", "999"),
                z.style.setProperty("pointer-events", "none"),
                q(
                  (L) => {
                    var G = `${Math.min($().x, $().x + $().width)}px`,
                      U = `${Math.min($().y, $().y + $().height)}px`,
                      Y = `${Math.abs($().width)}px`,
                      Z = `${Math.abs($().height)}px`;
                    return (
                      G !== L.e &&
                        ((L.e = G) != null
                          ? z.style.setProperty("left", G)
                          : z.style.removeProperty("left")),
                      U !== L.t &&
                        ((L.t = U) != null
                          ? z.style.setProperty("top", U)
                          : z.style.removeProperty("top")),
                      Y !== L.a &&
                        ((L.a = Y) != null
                          ? z.style.setProperty("width", Y)
                          : z.style.removeProperty("width")),
                      Z !== L.o &&
                        ((L.o = Z) != null
                          ? z.style.setProperty("height", Z)
                          : z.style.removeProperty("height")),
                      L
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                z
              );
            })();
        })(),
        X
      ),
      n(
        M,
        (() => {
          var S = Q(() => !!P());
          return () =>
            S() &&
            (() => {
              var z = jn();
              return (
                (z.$$pointerdown = (L) => {
                  L.stopPropagation(),
                    t({ x: L.clientX, y: L.clientY }),
                    ae({ x: L.clientX, y: L.clientY });
                }),
                z.style.setProperty("position", "absolute"),
                z.style.setProperty("border", "1px solid #00aaff"),
                z.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                z.style.setProperty("z-index", "998"),
                z.style.setProperty("cursor", "move"),
                z.style.setProperty("transform-origin", "top left"),
                q(
                  (L) => {
                    var G = `${P().x * l() + w().x}px`,
                      U = `${P().y * l() + w().y}px`,
                      Y = `${P().width * l()}px`,
                      Z = `${P().height * l()}px`;
                    return (
                      G !== L.e &&
                        ((L.e = G) != null
                          ? z.style.setProperty("left", G)
                          : z.style.removeProperty("left")),
                      U !== L.t &&
                        ((L.t = U) != null
                          ? z.style.setProperty("top", U)
                          : z.style.removeProperty("top")),
                      Y !== L.a &&
                        ((L.a = Y) != null
                          ? z.style.setProperty("width", Y)
                          : z.style.removeProperty("width")),
                      Z !== L.o &&
                        ((L.o = Z) != null
                          ? z.style.setProperty("height", Z)
                          : z.style.removeProperty("height")),
                      L
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                z
              );
            })();
        })(),
        X
      ),
      X.style.setProperty("transform-origin", "top left"),
      n(
        X,
        o(ie, {
          get each() {
            return f();
          },
          children: (S) =>
            o(ji, {
              get id() {
                return S.id;
              },
              get name() {
                return S.name;
              },
              get title() {
                return S.title;
              },
              get x() {
                return S.currPosition.get().x;
              },
              get y() {
                return S.currPosition.get().y;
              },
              get numberInputs() {
                return S.numberInputs;
              },
              get numberOutputs() {
                return S.numberOutputs;
              },
              get downVertexNumber() {
                return S.downVertexNumber || 0;
              },
              get upVertexNumber() {
                return S.upVertexNumber || 0;
              },
              get isInputVertex() {
                return S.isInputVertex;
              },
              get isOutputVertex() {
                return S.isOutputVertex;
              },
              get isDownVertex() {
                return S.isDownVertex || !1;
              },
              get isUpVertex() {
                return S.isUpVertex || !1;
              },
              get inputVertexIds() {
                return S.inputVertexIds;
              },
              get outputVertexIds() {
                return S.outputVertexIds;
              },
              get downVertexIds() {
                return S.downVertexIds || [];
              },
              get upVertexIds() {
                return S.upVertexIds || [];
              },
              get downVertexOrientation() {
                return S.downVertexOrientation || "";
              },
              get busyIndex() {
                return S.busyIndex;
              },
              get content() {
                return S.content;
              },
              get selected() {
                return E() == S.id || C().includes(S.id);
              },
              onMouseDownNode: ue,
              onMouseDownOutput: ce,
              onMouseEnterInput: B,
              onMouseLeaveInput: ve,
              onClickDeleteNode: j,
            }),
        }),
        null
      ),
      n(
        X,
        (() => {
          var S = Q(() => u() !== null);
          return () =>
            S() &&
            o(qn, {
              selected: !1,
              isNew: !0,
              edgeLength: () => W(),
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
      n(
        X,
        o(ie, {
          get each() {
            return p();
          },
          children: (S) =>
            o(qn, {
              get selected() {
                return F() === S.id;
              },
              isNew: !1,
              edgeLength: () => W(),
              get typeOfEdge() {
                return S.typeOfEdge;
              },
              get position() {
                return {
                  x0: S.currStartPosition.get().x,
                  y0: S.currStartPosition.get().y,
                  x1: S.currEndPosition.get().x,
                  y1: S.currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => re(S.id),
              onClickDeleteEdge: () => he(S.id),
            }),
        }),
        null
      ),
      q(
        (S) => {
          var z = {
              [Ae["dot-flow__pane"]]: !0,
              [Ae.draggable]: a(),
              [Ae.dragging]: r(),
              [Ae.selection]: !1,
            },
            L = Ae["dot-flow__background"],
            G = `scale(${l()})`,
            U = `calc(100vw / ${l()})`,
            Y = `calc(100vh / ${l()})`,
            Z = `${w().x / l()}px ${w().y / l()}px`,
            de = {
              [Ae["dot-flow__viewport"]]: !0,
              [Ae["dot-flow__viewport"]]: !0,
            },
            le = `translate(${w().x}px, ${w().y}px) scale(${l()})`;
          return (
            (S.e = qe(M, z, S.e)),
            L !== S.t && V(R, (S.t = L)),
            G !== S.a &&
              ((S.a = G) != null
                ? R.style.setProperty("transform", G)
                : R.style.removeProperty("transform")),
            U !== S.o &&
              ((S.o = U) != null
                ? R.style.setProperty("width", U)
                : R.style.removeProperty("width")),
            Y !== S.i &&
              ((S.i = Y) != null
                ? R.style.setProperty("height", Y)
                : R.style.removeProperty("height")),
            Z !== S.n &&
              ((S.n = Z) != null
                ? R.style.setProperty("background-position", Z)
                : R.style.removeProperty("background-position")),
            (S.s = qe(X, de, S.s)),
            le !== S.h &&
              ((S.h = le) != null
                ? X.style.setProperty("transform", le)
                : X.style.removeProperty("transform")),
            S
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
      M
    );
  })();
};
be(["pointerdown", "mouseup", "mousemove"]);
const yt = (e) =>
  o(Pl.Provider, {
    value: {
      scale: Lo,
      setScale: Vo,
      draggable: Do,
      setDraggable: No,
      isCtrlPressed: Ao,
      isSpacePressed: Mo,
      setIsCtrlPressed: ko,
      setIsSpacePressed: Po,
      edges: Fo,
      setEdges: Bo,
      newEdge: Ro,
      setNewEdge: zo,
      busyIndex: Ho,
      setBusyIndex: Wo,
      edgeLength: qo,
      setEdgeLength: jo,
      isOpen: Uo,
      setIsOpen: Go,
      inputRef: Xo,
      edgeEnd: Yo,
      setEdgeEnd: Ko,
      transform: Jo,
      setTransform: Zo,
      nodes: Qo,
      setNodes: el,
      preTransform: tl,
      setPreTransform: nl,
      selectedNode: ol,
      setSelectedNode: ll,
      pendingOutput: rl,
      setPendingOutput: il,
      lastClickPosition: al,
      setLastClickPosition: sl,
      isShowModal: dl,
      setIsShowModal: cl,
      setPositionButton: pl,
      positionButton: ul,
      isModalOpen: hl,
      setIsModalOpen: fl,
      isOpening: ml,
      setIsOpening: vl,
      typeOfVertex: wl,
      setTypeOfVertex: $l,
      currentFormConfig: Cl,
      setCurrentFormConfig: Sl,
      previousFormConfig: Il,
      setPreviousFormConfig: El,
      isModalOpen2: gl,
      setIsModalOpen2: bl,
      credentialOptions: Ol,
      setCredentialOptions: Dl,
      selectedCredential: Nl,
      setSelectedCredential: Al,
      formData: kl,
      setFormData: Ml,
      settingConfig: _l,
      setSettingConfig: Tl,
      isModalOpen3: xl,
      setIsModalOpen3: yl,
    },
    get children() {
      return e.children;
    },
  });
var la = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const ra = (e) => la();
var ia = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const aa = (e) => ia();
var sa = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const da = ({ height: e = 2, width: t = 2 }) => sa();
var ca = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const ua = (e) => ca();
var pa = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const On = (e) => pa();
var ma = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const Ll = (e) => ma();
var va = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Vl = (e) => va();
var ha = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const Fl = (e) => ha();
var fa = _(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Bl = (e) => fa();
var ga = _(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const Rl = (e) => ga();
var ba = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const zl = (e) => ba();
var xa = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const Hl = (e) => xa(),
  ya = [
    {
      name: "chat",
      title: "On Chat Message",
      description:
        " Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: aa,
    },
    {
      name: "switch",
      title: "Switch",
      description: "Routes items depending on defined expression or rules",
      icon: ra,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: da,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: ua,
    },
    {
      name: "ai-agent",
      title: "AI Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: On,
    },
    {
      name: "customer-support-agent",
      title: "Customer Support Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: On,
    },
    {
      name: "send-email",
      title: "Send Email",
      description: "Send email to a user.",
      icon: Ll,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Vl,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: Fl,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Bl,
    },
    {
      name: "gmail-trigger",
      title: "Gmail Trigger",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Rl,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: zl,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: Hl,
    },
  ];
var wa = _(
  '<div><div><span></span>Data processing...</div><div><input class="border rounded-md px-4 py-2 outline-none border-white"title=backendUrl name=url type=text></div><button id=allSubmit>Test WorkFlow'
);
const $a = (e) => {
  const { formData: t, nodes: r, edges: s } = me(),
    [a, d] = D(""),
    [i, l] = D(!1);
  function p() {
    console.log(Object.values(t()));
    const u = new CustomEvent("RAN", {
        detail: Object.values(t()),
        bubbles: !0,
      }),
      m = document.getElementById("allSubmit");
    m && m.dispatchEvent(u);
  }
  return (() => {
    var u = wa(),
      m = u.firstChild,
      g = m.firstChild,
      w = m.nextSibling,
      O = w.firstChild,
      k = w.nextSibling;
    return (
      O.addEventListener("change", (y) => d(y.target.value)),
      (k.$$click = p),
      q(
        (y) => {
          var E = Ae.testWorkFlow,
            v = `fixed ${
              i() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            x = Ae.loader,
            b = Ae.testButton;
          return (
            E !== y.e && V(u, (y.e = E)),
            v !== y.t && V(m, (y.t = v)),
            x !== y.a && V(g, (y.a = x)),
            b !== y.o && V(k, (y.o = b)),
            y
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      u
    );
  })();
};
be(["click"]);
var _a = _('<div><div class="border border-white/20 rounded-[9px] flex"><div>');
const an = (e) => {
  let t;
  const r = e.zIndex ?? 9999,
    s = e.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";
  return (
    Oe(() => {
      const a = (d) => {
        d.target === t && e.onClose();
      };
      return (
        window.addEventListener("click", a),
        () => window.removeEventListener("click", a)
      );
    }),
    (() => {
      var a = _a(),
        d = a.firstChild,
        i = d.firstChild,
        l = t;
      return (
        typeof l == "function" ? we(l, a) : (t = a),
        r != null
          ? a.style.setProperty("z-index", r)
          : a.style.removeProperty("z-index"),
        V(i, `${s} border border-purple-500/20 rounded-[9px] flex flex-col`),
        n(i, () => e.children),
        q(() =>
          V(
            a,
            `fixed inset-0 bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
              e.isOpen() ? "block" : "hidden"
            }`
          )
        ),
        a
      );
    })()
  );
};
var Ta = _('<span class=text-yellow-300>"<!>"'),
  Ca = _("<span class=text-cyan-300>"),
  Sa = _("<span class=text-pink-300>"),
  Ia = _("<span class=text-gray-400>null"),
  Ea = _('<div class="text-purple-400 cursor-pointer select-none">'),
  Oa = _("<div class=text-purple-400>}"),
  Da = _(
    '<div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">'
  ),
  Na = _("<span>[<!>]"),
  Aa = _("<span>["),
  ka = _("<div>]"),
  Ma = _("<div>"),
  Pa = _(
    '<div><span class=text-green-400>"<!>"</span><span class=text-white>: '
  );
const Zt = ({ data: e, indent: t = 0 }) => {
  const [r, s] = D(!1),
    a = `${t * 5}px`,
    d = () => s(!r()),
    i = (u) => typeof u == "object" && u !== null && !Array.isArray(u),
    l = Array.isArray,
    p = (u) =>
      typeof u == "string"
        ? (() => {
            var m = Ta(),
              g = m.firstChild,
              w = g.nextSibling;
            return w.nextSibling, n(m, u, w), m;
          })()
        : typeof u == "number"
        ? (() => {
            var m = Ca();
            return n(m, u), m;
          })()
        : typeof u == "boolean"
        ? (() => {
            var m = Sa();
            return n(m, () => u.toString()), m;
          })()
        : u === null
        ? Ia()
        : o(Zt, { data: u, indent: t + 1 });
  return (() => {
    var u = Da();
    return (
      n(
        u,
        o(J, {
          get when() {
            return i(e);
          },
          get fallback() {
            return o(J, {
              get when() {
                return l(e);
              },
              get fallback() {
                return p(e);
              },
              get children() {
                return Q(() => !!e.every((m) => typeof m != "object"))()
                  ? (() => {
                      var m = Na(),
                        g = m.firstChild,
                        w = g.nextSibling;
                      return (
                        w.nextSibling,
                        n(
                          m,
                          o(ie, {
                            each: e,
                            children: (O, k) => [
                              Q(() => p(O)),
                              Q(() => (k() < e.length - 1 ? ", " : "")),
                            ],
                          }),
                          w
                        ),
                        m
                      );
                    })()
                  : [
                      (() => {
                        var m = Aa();
                        return (
                          a != null
                            ? m.style.setProperty("padding-left", a)
                            : m.style.removeProperty("padding-left"),
                          m
                        );
                      })(),
                      o(ie, {
                        each: e,
                        children: (m, g) =>
                          (() => {
                            var w = Ma();
                            return (
                              `${(t + 1) * 4}px` != null
                                ? w.style.setProperty(
                                    "padding-left",
                                    `${(t + 1) * 4}px`
                                  )
                                : w.style.removeProperty("padding-left"),
                              n(w, o(Zt, { data: m, indent: t + 1 }), null),
                              n(w, () => (g() < e.length - 1 ? "," : ""), null),
                              w
                            );
                          })(),
                      }),
                      (() => {
                        var m = ka();
                        return (
                          a != null
                            ? m.style.setProperty("padding-left", a)
                            : m.style.removeProperty("padding-left"),
                          m
                        );
                      })(),
                    ];
              },
            });
          },
          get children() {
            return [
              (() => {
                var m = Ea();
                return (
                  (m.$$click = d),
                  a != null
                    ? m.style.setProperty("padding-left", a)
                    : m.style.removeProperty("padding-left"),
                  n(m, () => (r() ? "{...}" : "{")),
                  m
                );
              })(),
              o(J, {
                get when() {
                  return !r();
                },
                get children() {
                  return [
                    o(ie, {
                      get each() {
                        return Object.entries(e);
                      },
                      children: ([m, g], w) =>
                        (() => {
                          var O = Pa(),
                            k = O.firstChild,
                            y = k.firstChild,
                            E = y.nextSibling;
                          return (
                            E.nextSibling,
                            k.nextSibling,
                            `${(t + 1) * 4}px` != null
                              ? O.style.setProperty(
                                  "padding-left",
                                  `${(t + 1) * 4}px`
                                )
                              : O.style.removeProperty("padding-left"),
                            n(k, m, E),
                            n(O, () => p(g), null),
                            n(
                              O,
                              () =>
                                w() < Object.entries(e).length - 1 ? "," : "",
                              null
                            ),
                            O
                          );
                        })(),
                    }),
                    (() => {
                      var m = Oa();
                      return (
                        a != null
                          ? m.style.setProperty("padding-left", a)
                          : m.style.removeProperty("padding-left"),
                        m
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
const La = "_leftPanel_kuca9_1",
  Va = { leftPanel: La };
var Fa = _(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full "><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input'
);
const Ba = (e) =>
    (() => {
      var t = Fa(),
        r = t.firstChild;
      return (
        r.firstChild,
        n(
          r,
          o(Zt, {
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
        q((s) => qe(t, { [Va.leftPanel]: !0 }, s)),
        t
      );
    })(),
  Ra = "_midPanel_u0ucm_1",
  Wl = { midPanel: Ra };
var za = _("<div class>"),
  Ha = _(
    '<div class="w-3 h-3 rounded-full bg-[#dbdbdd] text-xs text-black flex items-center justify-center font-semibold select-none">?'
  ),
  Un = _("<div>");
const Re = (e) => {
  const [t, r] = D(!1),
    s = () => (e.visible !== void 0 ? e.visible : t()),
    [a, d] = D({ x: 0, y: 0 }),
    [i, l] = D(e.placement || "top");
  let p, u, m, g;
  const w = (c) => {
      const $ = c.length;
      return $ <= 50
        ? "max-w-xs"
        : $ <= 120
        ? "max-w-sm"
        : $ <= 200
        ? "max-w-md"
        : "max-w-lg";
    },
    O = () => {
      if (!p || !u) return;
      const c = p.getBoundingClientRect(),
        $ = u.getBoundingClientRect(),
        T = {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        },
        C = 8;
      let A = e.placement || "top";
      const P = {
        top: {
          x: c.left + c.width / 2 - $.width / 2 + T.scrollX,
          y: c.top - $.height - C + T.scrollY,
        },
        bottom: {
          x: c.left + c.width / 2 - $.width / 2 + T.scrollX,
          y: c.bottom + C + T.scrollY,
        },
        left: {
          x: c.left - $.width - C + T.scrollX,
          y: c.top + c.height / 2 - $.height / 2 + T.scrollY,
        },
        right: {
          x: c.right + C + T.scrollX,
          y: c.top + c.height / 2 - $.height / 2 + T.scrollY,
        },
      };
      let H = P[A];
      A === "top" && H.y < T.scrollY
        ? ((A = "bottom"), (H = P.bottom))
        : A === "bottom" && H.y + $.height > T.height + T.scrollY
        ? ((A = "top"), (H = P.top))
        : A === "left" && H.x < T.scrollX
        ? ((A = "right"), (H = P.right))
        : A === "right" &&
          H.x + $.width > T.width + T.scrollX &&
          ((A = "left"), (H = P.left)),
        H.x < T.scrollX
          ? (H.x = T.scrollX + C)
          : H.x + $.width > T.width + T.scrollX &&
            (H.x = T.width + T.scrollX - $.width - C),
        H.y < T.scrollY
          ? (H.y = T.scrollY + C)
          : H.y + $.height > T.height + T.scrollY &&
            (H.y = T.height + T.scrollY - $.height - C),
        d({ x: H.x, y: H.y }),
        l(A);
    },
    k = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!0);
        return;
      }
      g && clearTimeout(g),
        (m = setTimeout(() => {
          r(!0), setTimeout(O, 0);
        }, e.delay || 200));
    },
    y = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!1);
        return;
      }
      m && clearTimeout(m),
        (g = setTimeout(() => {
          r(!1);
        }, e.hideDelay || 100));
    },
    E = () => {
      e.disableHover || k();
    },
    v = () => {
      e.disableHover || y();
    },
    x = () => {
      e.disableHover || k();
    },
    b = () => {
      e.disableHover || y();
    },
    f = () => {
      s() && setTimeout(O, 0);
    };
  let h = s();
  const F = () => {
      const c = s();
      c !== h && c && f(), (h = c);
    },
    N = () => {
      s() && O();
    };
  Oe(() => {
    window.addEventListener("scroll", N, { passive: !0 }),
      window.addEventListener("resize", N, { passive: !0 });
    const c = setInterval(F, 16);
    Me(() => {
      clearInterval(c);
    });
  }),
    Me(() => {
      m && clearTimeout(m),
        g && clearTimeout(g),
        window.removeEventListener("scroll", N),
        window.removeEventListener("resize", N);
    });
  const I = () => {
    const c = "absolute w-2 h-2 bg-[#464668] transform rotate-45";
    switch (i()) {
      case "top":
        return `${c} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${c} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${c} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${c} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return c;
    }
  };
  return [
    (() => {
      var c = za();
      c.addEventListener("blur", b),
        c.addEventListener("focus", x),
        c.addEventListener("mouseleave", v),
        c.addEventListener("mouseenter", E);
      var $ = p;
      return (
        typeof $ == "function" ? we($, c) : (p = c),
        n(
          c,
          (() => {
            var T = Q(() => !!e.children);
            return () => (T() ? e.children : Ha());
          })()
        ),
        q(() => ee(c, "tabindex", e.focusable ? 0 : void 0)),
        c
      );
    })(),
    Q(
      () =>
        Q(() => !!s())() &&
        o(Ar, {
          get children() {
            var c = Un(),
              $ = u;
            return (
              typeof $ == "function" ? we($, c) : (u = c),
              n(c, () => e.content, null),
              n(
                c,
                (() => {
                  var T = Q(() => e.showArrow !== !1);
                  return () =>
                    T() &&
                    (() => {
                      var C = Un();
                      return q(() => V(C, I())), C;
                    })();
                })(),
                null
              ),
              q(
                (T) => {
                  var C = `
              fixed z-50 px-3 py-2 text-sm text-[#c9c9db] bg-[#464668] rounded-lg shadow-lg
              pointer-events-none select-none whitespace-pre-wrap break-words
              ${w(e.content || "")}
              transition-opacity duration-200
            `,
                    A = `${a().x}px`,
                    P = `${a().y}px`,
                    H = s() ? 1 : 0;
                  return (
                    C !== T.e && V(c, (T.e = C)),
                    A !== T.t &&
                      ((T.t = A) != null
                        ? c.style.setProperty("left", A)
                        : c.style.removeProperty("left")),
                    P !== T.a &&
                      ((T.a = P) != null
                        ? c.style.setProperty("top", P)
                        : c.style.removeProperty("top")),
                    H !== T.o &&
                      ((T.o = H) != null
                        ? c.style.setProperty("opacity", H)
                        : c.style.removeProperty("opacity")),
                    T
                  );
                },
                { e: void 0, t: void 0, a: void 0, o: void 0 }
              ),
              c
            );
          },
        })
    ),
  ];
};
var Wa = _(
    '<div class="text-white bg-[#1e1e2f] p-2 rounded w-full"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><div class="text-sm flex items-center gap-1 group"></div><div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">Reset value</div></div><label class="relative inline-block w-12 h-6"><input title=switch type=checkbox class="sr-only peer"><div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6">'
  ),
  qa = _("<label class=label>"),
  ja = _("<div class=toolTipBtn>");
const Ee = (e) => {
  const t = (a) => {
      e.onChange?.(a.target.checked);
    },
    [r, s] = D("");
  return (
    De(() => {
      const a = `${e.uniqueKey}-${e.name}`;
      a !== r() && (s(a), e.onChange?.(e.checked ?? !1));
    }),
    Oe(() => {}),
    (() => {
      var a = Wa(),
        d = a.firstChild,
        i = d.firstChild,
        l = i.firstChild,
        p = i.nextSibling,
        u = p.firstChild;
      return (
        n(
          l,
          (() => {
            var m = Q(() => !!e.title);
            return () =>
              m() &&
              (() => {
                var g = qa();
                return (
                  n(g, () => e.title, null),
                  n(
                    g,
                    (() => {
                      var w = Q(() => !!e.toolTipText);
                      return () =>
                        w() &&
                        (() => {
                          var O = ja();
                          return (
                            n(
                              O,
                              o(Re, {
                                get content() {
                                  return e.toolTipText;
                                },
                              })
                            ),
                            O
                          );
                        })();
                    })(),
                    null
                  ),
                  g
                );
              })();
          })()
        ),
        u.addEventListener("change", t),
        q(() => ee(u, "name", e.name)),
        q(() => (u.checked = e.checked)),
        a
      );
    })()
  );
};
var Ua = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const fe = (e) => Ua();
var Ga = _(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  Xa = _("<label class=label>"),
  Ya = _("<div class=toolTipBtn>"),
  Ka = _("<option>"),
  Ja = _("<div role=option><p>"),
  Za = _('<p class="text-xs font-light text-[#b9b5b5]">'),
  Qa = _("<p class=foot-note>");
const Se = (e) => {
  const [t, r] = D(!1),
    [s, a] = D({ value: "", label: "", description: "" }),
    [d, i] = D("down");
  let l, p;
  const [u, m] = D(""),
    g = (v) => {
      l && !l.contains(v.target) && r(!1);
    };
  e.defaultValue;
  const w = () => {
    console.log("hey, i am in setDefault value.");
    const v = e.options.find((x) => x.value === e.defaultValue);
    a(v || e.options[0]), e.onChange?.(v || e.options[0]);
  };
  De(() => {
    const v = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", v), v !== u() && (m(v), w());
  });
  const O = () => r(!1);
  Oe(() => {
    document.addEventListener("mousedown", g),
      document.addEventListener("touchstart", g, { passive: !0 }),
      window.addEventListener("resize", O),
      window.addEventListener("blur", O);
  }),
    Me(() => {
      document.removeEventListener("mousedown", g),
        document.removeEventListener("touchstart", g),
        window.removeEventListener("resize", O),
        window.removeEventListener("blur", O);
    });
  const k = (v) => {
      v.stopPropagation(), t() || E(), r(!t());
    },
    y = (v) => {
      a(v), r(!1), s() && e.onChange && e.onChange(s()), l && l.focus();
    },
    E = () => {
      if (!l) return;
      const v = l.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - v.bottom < 200
        ? i("up")
        : i("down");
    };
  return (() => {
    var v = Ga(),
      x = v.firstChild,
      b = x.firstChild,
      f = b.nextSibling,
      h = f.nextSibling;
    n(
      v,
      (() => {
        var I = Q(() => !!e.title);
        return () =>
          I() &&
          (() => {
            var c = Xa();
            return (
              n(c, () => e.title, null),
              n(
                c,
                (() => {
                  var $ = Q(() => !!e.toolTipText);
                  return () =>
                    $() &&
                    (() => {
                      var T = Ya();
                      return (
                        n(
                          T,
                          o(Re, {
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
              q(() => ee(c, "for", e.name)),
              c
            );
          })();
      })(),
      x
    );
    var F = l;
    typeof F == "function" ? we(F, x) : (l = x),
      n(
        b,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (I) =>
            (() => {
              var c = Ka();
              return (
                n(c, () => I.label),
                q(() => (c.selected = I.value === s().value)),
                q(() => (c.value = I.value)),
                c
              );
            })(),
        })
      ),
      Be(f, "click", e.disabled ? void 0 : k),
      n(f, () => s().label || e.placeholder);
    var N = p;
    return (
      typeof N == "function" ? we(N, h) : (p = h),
      n(
        h,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (I, c) =>
            (() => {
              var $ = Ja(),
                T = $.firstChild;
              return (
                ($.$$click = y),
                ($.$$clickData = I),
                n(T, () => I.label),
                n(
                  $,
                  (() => {
                    var C = Q(() => !!I.description);
                    return () =>
                      C() &&
                      (() => {
                        var A = Za();
                        return n(A, () => I.description), A;
                      })();
                  })(),
                  null
                ),
                q(
                  (C) => {
                    var A = I.value === s().value ? "selected" : "",
                      P = t() ? 0 : -1,
                      H = I.value === s().value;
                    return (
                      A !== C.e && V($, (C.e = A)),
                      P !== C.t && ee($, "tabindex", (C.t = P)),
                      H !== C.a && ee($, "aria-selected", (C.a = H)),
                      C
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                $
              );
            })(),
        })
      ),
      n(
        x,
        (() => {
          var I = Q(() => !!e.footNote);
          return () =>
            I() &&
            (() => {
              var c = Qa();
              return n(c, () => e.footNote), c;
            })();
        })(),
        null
      ),
      q(
        (I) => {
          var c = e.name,
            $ = e.required,
            T = e.disabled,
            C = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            A = e.disabled ? -1 : 0,
            P = t(),
            H = `select-items ${t() ? "select-show" : "select-hide"}
        ${d() === "up" ? "select-direction-up" : ""}`;
          return (
            c !== I.e && ee(b, "name", (I.e = c)),
            $ !== I.t && (b.required = I.t = $),
            T !== I.a && (b.disabled = I.a = T),
            C !== I.o && V(f, (I.o = C)),
            A !== I.i && ee(f, "tabindex", (I.i = A)),
            P !== I.n && ee(f, "aria-expanded", (I.n = P)),
            H !== I.s && V(h, (I.s = H)),
            I
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
      v
    );
  })();
};
be(["click"]);
var es = _(
    '<div class="flex gap-1 rounded-md bg-[#323236] px-1 py-1 items-center">+ '
  ),
  ts = _(
    '<div class=w-full><div class=custom-select><div aria-haspopup=listbox role=combobox><div class="flex gap-1.5"></div></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  ns = _("<label class=label>"),
  os = _("<div class=toolTipBtn>"),
  ls = _("<input type=hidden>"),
  rs = _(
    '<div class="flex relative gap-1 rounded-md bg-[#323236] px-2 py-1 items-center group duration-200"><div class="text-xs font-medium"></div><div class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-75 group-hover:max-w-[20px] group-hover:opacity-100 "><div class="text-[#c45454] font-bold cursor-pointer">×'
  ),
  is = _("<div role=option>");
const ql = (e) => {
  const [t, r] = D(!1),
    [s, a] = D([]),
    [d, i] = D([]),
    [l, p] = D("down");
  let u, m;
  const g = (v) => {
      u && !u.contains(v.target) && r(!1);
    },
    w = () => r(!1);
  Oe(() => {
    if (e.defaultSelectedOptions) {
      const v = e.options.filter((x) =>
        e.defaultSelectedOptions.includes(x.value)
      );
      if (v) {
        a(v);
        const x = v.map((b) => b.label);
        i(x), e.onChange?.(v);
      }
    }
    document.addEventListener("mousedown", g),
      document.addEventListener("touchstart", g, { passive: !0 }),
      window.addEventListener("resize", w),
      window.addEventListener("blur", w);
  }),
    Me(() => {
      document.removeEventListener("mousedown", g),
        document.removeEventListener("touchstart", g),
        window.removeEventListener("resize", w),
        window.removeEventListener("blur", w);
    });
  const O = (v) => {
      v.stopPropagation(), t() || E(), r(!t());
    },
    k = (v) => {
      const x = s();
      if (x.some((F) => F.value === v.value)) return;
      const f = [...x, v];
      a(f);
      const h = f.map((F) => F.label);
      i(h), r(!1), e.onChange && e.onChange(f), u && u.focus();
    };
  function y(v, x) {
    v.stopPropagation();
    const b = s().filter((f) => f.label !== x);
    a(b), i(d().filter((f) => f !== x)), e.onChange && e.onChange(b);
  }
  const E = () => {
    if (!u) return;
    const v = u.getBoundingClientRect();
    document.getElementById("mid-panel")?.clientHeight - v.bottom < 200
      ? p("up")
      : p("down");
  };
  return (() => {
    var v = ts(),
      x = v.firstChild,
      b = x.firstChild,
      f = b.firstChild,
      h = b.nextSibling,
      F = h.nextSibling;
    n(
      v,
      (() => {
        var c = Q(() => !!e.title);
        return () =>
          c() &&
          (() => {
            var $ = ns();
            return (
              n($, () => e.title, null),
              n(
                $,
                (() => {
                  var T = Q(() => !!e.toolTipText);
                  return () =>
                    T() &&
                    (() => {
                      var C = os();
                      return (
                        n(
                          C,
                          o(Re, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        C
                      );
                    })();
                })(),
                null
              ),
              q(() => ee($, "for", e.name)),
              $
            );
          })();
      })(),
      x
    );
    var N = u;
    typeof N == "function" ? we(N, x) : (u = x),
      n(
        x,
        o(ie, {
          get each() {
            return s();
          },
          children: (c, $) =>
            (() => {
              var T = ls();
              return (
                q(() => ee(T, "name", `${e.name}`)),
                q(() => (T.value = c.value)),
                T
              );
            })(),
        }),
        b
      ),
      Be(b, "click", e.disabled ? void 0 : O),
      n(
        b,
        () => (d().length <= 0 ? e.placeholder || "Select an option" : ""),
        f
      ),
      n(
        f,
        o(ie, {
          get each() {
            return d();
          },
          children: (c, $) => {
            if ($() < 3)
              return (() => {
                var T = rs(),
                  C = T.firstChild,
                  A = C.nextSibling,
                  P = A.firstChild;
                return n(C, c), (P.$$click = (H) => y(H, c)), T;
              })();
          },
        }),
        null
      ),
      n(
        f,
        o(J, {
          get when() {
            return d().length > 3;
          },
          get children() {
            var c = es();
            return c.firstChild, n(c, () => d().length - 3, null), c;
          },
        }),
        null
      );
    var I = m;
    return (
      typeof I == "function" ? we(I, h) : (m = h),
      n(
        h,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (c, $) =>
            (() => {
              var T = is();
              return (
                (T.$$click = k),
                (T.$$clickData = c),
                n(T, () => c.label),
                q(
                  (C) => {
                    var A = s().some((K) => K.value === c.value)
                        ? "selected"
                        : "",
                      P = t() ? 0 : -1,
                      H = s().some((K) => K.value === c.value);
                    return (
                      A !== C.e && V(T, (C.e = A)),
                      P !== C.t && ee(T, "tabindex", (C.t = P)),
                      H !== C.a && ee(T, "aria-selected", (C.a = H)),
                      C
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                T
              );
            })(),
        })
      ),
      n(F, () => e.footNote),
      q(
        (c) => {
          var $ = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            T = e.disabled ? -1 : 0,
            C = t(),
            A = `select-items ${t() ? "select-show" : "select-hide"} ${
              l() === "up" ? "select-direction-up" : ""
            }`;
          return (
            $ !== c.e && V(b, (c.e = $)),
            T !== c.t && ee(b, "tabindex", (c.t = T)),
            C !== c.a && ee(b, "aria-expanded", (c.a = C)),
            A !== c.o && V(h, (c.o = A)),
            c
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      v
    );
  })();
};
be(["click"]);
var as = _(
    '<div class=custom-select><div aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  ss = _("<div role=option>");
const Le = (e) => {
  const [t, r] = D(!1),
    [s, a] = D("down");
  let d, i;
  const l = (w) => {
    d && !d.contains(w.target) && p();
  };
  Oe(() => {
    document.addEventListener("mousedown", l),
      document.addEventListener("touchstart", l, { passive: !0 }),
      window.addEventListener("resize", p),
      window.addEventListener("blur", p);
  }),
    Me(() => {
      document.removeEventListener("mousedown", l),
        document.removeEventListener("touchstart", l),
        window.removeEventListener("resize", p),
        window.removeEventListener("blur", p);
    }),
    De(() => {
      e.selectedOptions().length >= 1 &&
        e.onChange &&
        e.onChange(e.selectedOptions());
    });
  const p = () => {
      t() &&
        (r(!1),
        setTimeout(() => {
          const w = i;
          w && w.classList.add("select-hide-complete");
        }, 200));
    },
    u = (w) => {
      w.stopPropagation(), t() || g(), r(!t());
    },
    m = (w) => {
      const O = e.selectedOptions();
      O.some((y) => y.value === w.value) ||
        (e.setSelectedOptions([...O, w]),
        e.setDropdownOptions(
          e.dropdownOptions().filter((y) => y.value !== w.value)
        ),
        p(),
        d && d.focus());
    },
    g = () => {
      if (!d) return;
      const w = d.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - w.bottom < 200
        ? a("up")
        : a("down");
    };
  return o(J, {
    get when() {
      return e.dropdownOptions().length >= 1;
    },
    get children() {
      var w = as(),
        O = w.firstChild,
        k = O.nextSibling,
        y = d;
      typeof y == "function" ? we(y, w) : (d = w),
        Be(O, "click", e.disabled ? void 0 : u),
        n(O, () => e.placeholder);
      var E = i;
      return (
        typeof E == "function" ? we(E, k) : (i = k),
        n(
          k,
          o(ie, {
            get each() {
              return e.dropdownOptions();
            },
            children: (v, x) =>
              (() => {
                var b = ss();
                return (
                  (b.$$click = m),
                  (b.$$clickData = v),
                  n(b, () => v.label),
                  q(() => ee(b, "tabindex", t() ? 0 : -1)),
                  b
                );
              })(),
          })
        ),
        q(
          (v) => {
            var x = `select-selected ${t() ? "active" : ""} ${
                e.disabled ? "disabled" : ""
              }`,
              b = e.disabled ? -1 : 0,
              f = t(),
              h = `select-items ${t() ? "select-show" : "select-hide"} ${
                s() === "up" ? "select-direction-up" : ""
              }`;
            return (
              x !== v.e && V(O, (v.e = x)),
              b !== v.t && ee(O, "tabindex", (v.t = b)),
              f !== v.a && ee(O, "aria-expanded", (v.a = f)),
              h !== v.o && V(k, (v.o = h)),
              v
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        w
      );
    },
  });
};
be(["click"]);
var ds = _(
    '<div class=custom-select><label class=label></label><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox><div role=option aria-selected=true>+ Create new credentials</div></div><p class=foot-note>'
  ),
  cs = _("<div class=toolTipBtn>"),
  us = _("<option>"),
  ps = _("<div role=option aria-selected=true>");
const at = (e) => {
  const [t, r] = D(!1),
    { setIsModalOpen2: s } = me(),
    [a, d] = D({ value: "", label: "", description: "" }),
    [i, l] = D("down");
  let p, u;
  const m = (y) => {
      p && !p.contains(y.target) && r(!1);
    },
    g = () => r(!1);
  Oe(() => {
    if (e.defaultValue) {
      const y = e.options && e.options.find((E) => E.value === e.defaultValue);
      y && d(y);
    }
    document.addEventListener("mousedown", m),
      document.addEventListener("touchstart", m, { passive: !0 }),
      window.addEventListener("resize", g),
      window.addEventListener("blur", g);
  }),
    Me(() => {
      document.removeEventListener("mousedown", m),
        document.removeEventListener("touchstart", m),
        window.removeEventListener("resize", g),
        window.removeEventListener("blur", g);
    }),
    De(() => {
      a() && e.onChange && e.onChange(a());
    });
  const w = (y) => {
      y.stopPropagation(), t() || k(), r(!t());
    },
    O = (y) => {
      d(y), r(!1), p && p.focus();
    },
    k = () => {
      if (!p) return;
      const y = p.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - y.bottom < 200
        ? l("up")
        : l("down");
    };
  return (() => {
    var y = ds(),
      E = y.firstChild,
      v = E.nextSibling,
      x = v.nextSibling,
      b = x.nextSibling,
      f = b.firstChild,
      h = b.nextSibling,
      F = p;
    typeof F == "function" ? we(F, y) : (p = y),
      n(E, () => e.title, null),
      n(
        E,
        (() => {
          var I = Q(() => !!e.toolTipText);
          return () =>
            I() &&
            (() => {
              var c = cs();
              return (
                n(
                  c,
                  o(Re, {
                    get content() {
                      return e.toolTipText;
                    },
                  })
                ),
                c
              );
            })();
        })(),
        null
      ),
      n(
        v,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (I) =>
            (() => {
              var c = us();
              return (
                n(c, () => I.label),
                q(() => (c.selected = I.value === a().value)),
                q(() => (c.value = I.value)),
                c
              );
            })(),
        })
      ),
      Be(x, "click", e.disabled ? void 0 : w),
      n(x, () => a().label || e.placeholder);
    var N = u;
    return (
      typeof N == "function" ? we(N, b) : (u = b),
      n(
        b,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (I, c) =>
            (() => {
              var $ = ps();
              return (
                ($.$$click = O),
                ($.$$clickData = I),
                n($, () => I.label),
                q(
                  (T) => {
                    var C = `child-option ${
                        (I.value === a().value ? "selected" : "") || ""
                      }`,
                      A = I.value === a().value,
                      P = I.value === a().value,
                      H = t() ? 0 : -1;
                    return (
                      C !== T.e && V($, (T.e = C)),
                      A !== T.t && $.classList.toggle("selected", (T.t = A)),
                      P !== T.a &&
                        $.classList.toggle("aria-selected-true", (T.a = P)),
                      H !== T.o && ee($, "tabindex", (T.o = H)),
                      T
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                $
              );
            })(),
        }),
        f
      ),
      (f.$$click = (I) => {
        w(I), s(!0);
      }),
      n(h, () => e.footNote),
      q(
        (I) => {
          var c = e.name,
            $ = e.name,
            T = e.required,
            C = e.disabled,
            A = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            P = e.disabled ? -1 : 0,
            H = t(),
            K = `select-items ${t() ? "select-show" : "select-hide"}
        ${i() === "up" ? "select-direction-up" : ""}`,
            ae = t() ? 0 : -1;
          return (
            c !== I.e && ee(E, "for", (I.e = c)),
            $ !== I.t && ee(v, "name", (I.t = $)),
            T !== I.a && (v.required = I.a = T),
            C !== I.o && (v.disabled = I.o = C),
            A !== I.i && V(x, (I.i = A)),
            P !== I.n && ee(x, "tabindex", (I.n = P)),
            H !== I.s && ee(x, "aria-expanded", (I.s = H)),
            K !== I.h && V(b, (I.h = K)),
            ae !== I.r && ee(f, "tabindex", (I.r = ae)),
            I
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
      y
    );
  })();
};
be(["click"]);
var ms = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor; data--h-bstatus=0OBSERVED><path fill-rule=evenodd d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"></path><path fill-rule=evenodd d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z">'
);
const jl = (e) => ms();
var vs = _("<div><div class=relative><input>"),
  hs = _("<label class=label>"),
  fs = _("<div class=toolTipBtn>"),
  gs = _('<button type=button aria-label="Toggle expanded view">'),
  bs = _(
    '<div><div class><div class=mb-3><div class="flex justify-between items-center mb-2"><span class="text-white text-sm font-medium">Result</span><div class="flex items-center gap-2"><span class="text-gray-400 text-xs">Item</span><span class="bg-gray-600 text-white text-xs px-2 py-1 rounded">0</span><div class="flex gap-1"><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Previous item">‹</button><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Next item">›</button></div></div></div><div class="text-white text-sm"></div></div><div><div class="text-yellow-400 text-xs font-medium mb-1">Tip:</div><div class="text-gray-300 text-xs">Anything inside <span class=text-blue-400>{}</span> is JavaScript.<button type=button class="text-blue-400 hover:underline ml-1 cursor-pointer">Learn more</button></div></div><div class="mt-3 pt-3 border-t border-gray-600"><div class="text-gray-400 text-xs">Press <kbd class="bg-gray-600 px-1 rounded text-white">Escape</kbd> to close'
  ),
  xs = _("<p class=foot-note>");
const se = (e) => {
  const { setIsModalOpen3: t } = me(),
    [r, s] = D(!1),
    [a, d] = D(e.value || "");
  let i, l;
  const p = (O) => {
      l && !l.contains(O.target) && s(!1);
    },
    u = () => s(!1);
  Oe(() => {
    e.onInput?.(e.value || ""),
      document.addEventListener("mousedown", p),
      document.addEventListener("touchstart", p, { passive: !0 }),
      window.addEventListener("resize", u),
      window.addEventListener("blur", u);
  }),
    Me(() => {
      document.removeEventListener("click", p);
    });
  const m = () => {
      e.disabled || s(!0);
    },
    g = (O) => {
      const y = O.target.value;
      d(y), e.onInput?.(y, O);
    },
    w = (O) => {
      O.preventDefault(), O.stopPropagation();
    };
  return (() => {
    var O = vs(),
      k = O.firstChild,
      y = k.firstChild,
      E = l;
    typeof E == "function" ? we(E, O) : (l = O),
      n(
        O,
        (() => {
          var x = Q(() => !!e.title);
          return () =>
            x() &&
            (() => {
              var b = hs();
              return (
                n(b, () => e.title, null),
                n(
                  b,
                  (() => {
                    var f = Q(() => !!e.toolTipText);
                    return () =>
                      f() &&
                      (() => {
                        var h = fs();
                        return (
                          n(
                            h,
                            o(Re, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          h
                        );
                      })();
                  })(),
                  null
                ),
                q(() => ee(b, "for", e.name)),
                b
              );
            })();
        })(),
        k
      ),
      y.addEventListener("focus", m),
      (y.$$input = g);
    var v = i;
    return (
      typeof v == "function" ? we(v, y) : (i = y),
      n(
        k,
        (() => {
          var x = Q(() => !!e.isArrow);
          return () =>
            x() &&
            (() => {
              var b = gs();
              return (
                (b.$$click = () => t(!0)),
                n(b, o(jl, {})),
                q(
                  (f) => {
                    var h = e.disabled,
                      F = `absolute right-0 bottom-0 text-gray-400 text-[10px] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                        e.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`;
                    return (
                      h !== f.e && (b.disabled = f.e = h),
                      F !== f.t && V(b, (f.t = F)),
                      f
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
      n(
        O,
        (() => {
          var x = Q(() => !!e.isExpand);
          return () =>
            x() &&
            (() => {
              var b = bs(),
                f = b.firstChild,
                h = f.firstChild,
                F = h.firstChild,
                N = F.nextSibling,
                I = h.nextSibling,
                c = I.firstChild,
                $ = c.nextSibling,
                T = $.firstChild,
                C = T.nextSibling,
                A = C.nextSibling,
                P = A.nextSibling;
              return (
                n(N, () => a() || "threadid"),
                (P.$$click = w),
                q(() =>
                  V(
                    b,
                    `absolute top-full rounded-sm left-0 right-0 p-4 bg-[#1f1f2b] border border-gray-600 border-t-0 rounded-b transition-all duration-200 z-10 ${
                      r() ? "opacity-100 visible" : "opacity-0 invisible"
                    }`
                  )
                ),
                b
              );
            })();
        })(),
        null
      ),
      n(
        O,
        (() => {
          var x = Q(() => !!e.footNote);
          return () =>
            x() &&
            (() => {
              var b = xs();
              return n(b, () => e.footNote), b;
            })();
        })(),
        null
      ),
      q(
        (x) => {
          var b = `relative w-full group ${e.class || ""}`,
            f = e.autocomplete ? "on" : "off",
            h = e.type || "text",
            F = e.name,
            N = e.disabled,
            I = e.placeholder || "",
            c = `w-full px-3 py-2.5 pr-8 border font-normal rounded-sm border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors ${
              e.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`;
          return (
            b !== x.e && V(O, (x.e = b)),
            f !== x.t && ee(y, "autocomplete", (x.t = f)),
            h !== x.a && ee(y, "type", (x.a = h)),
            F !== x.o && ee(y, "name", (x.o = F)),
            N !== x.i && (y.disabled = x.i = N),
            I !== x.n && ee(y, "placeholder", (x.n = I)),
            c !== x.s && V(y, (x.s = c)),
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
        }
      ),
      q(() => (y.value = e.value || "")),
      O
    );
  })();
};
be(["input", "click"]);
var ys = _(
  '<div class="text-[#dfe0e3] mt-5 select-none bg-[#383649] text-[15px] font-light text-center py-1.5 rounded-md cursor-pointer hover:bg-[#3d3b4e]">'
);
const rt = (e) =>
  (() => {
    var t = ys();
    return Be(t, "click", e.onClick), n(t, () => e.label), t;
  })();
be(["click"]);
var ws = _(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  $s = _("<label class=label>"),
  _s = _("<div class=toolTipBtn>"),
  Ts = _("<option>"),
  Cs = _("<div role=option><p>"),
  Ss = _('<p class="text-xs font-light text-[#b9b5b5]">');
const Ie = (e) => {
  const [t, r] = D(!1),
    [s, a] = D({ value: "", label: "", children: [] }),
    [d, i] = D("down");
  e.defaultValue;
  let l, p;
  const [u, m] = D(""),
    g = () => {
      console.log("hey, i am in setDefault value.");
      const v = e.options.find((x) => x.value === e.defaultValue);
      a(v || e.options[0]), e.onChange?.(v || e.options[0]);
    };
  De(() => {
    const v = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", v), v !== u() && (m(v), g());
  });
  const w = (v) => {
      l && !l.contains(v.target) && r(!1);
    },
    O = () => r(!1);
  Oe(() => {
    g(),
      document.addEventListener("mousedown", w),
      document.addEventListener("touchstart", w, { passive: !0 }),
      window.addEventListener("resize", O),
      window.addEventListener("blur", O);
  }),
    Me(() => {
      document.removeEventListener("mousedown", w),
        document.removeEventListener("touchstart", w),
        window.removeEventListener("resize", O),
        window.removeEventListener("blur", O);
    });
  const k = (v) => {
      v.stopPropagation(), t() || E(), r(!t());
    },
    y = (v) => {
      a(v), r(!1), s() && e.onChange && e.onChange(s()), l && l.focus();
    },
    E = () => {
      if (!l) return;
      const v = l.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - v.bottom < 200
        ? i("up")
        : i("down");
    };
  return (() => {
    var v = ws(),
      x = v.firstChild,
      b = x.firstChild,
      f = b.nextSibling,
      h = f.nextSibling,
      F = h.nextSibling;
    n(
      v,
      (() => {
        var c = Q(() => !!e.title);
        return () =>
          c() &&
          (() => {
            var $ = $s();
            return (
              n($, () => e.title, null),
              n(
                $,
                (() => {
                  var T = Q(() => !!e.toolTipText);
                  return () =>
                    T() &&
                    (() => {
                      var C = _s();
                      return (
                        n(
                          C,
                          o(Re, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        C
                      );
                    })();
                })(),
                null
              ),
              q(() => ee($, "for", e.name)),
              $
            );
          })();
      })(),
      x
    );
    var N = l;
    typeof N == "function" ? we(N, x) : (l = x),
      n(
        b,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (c) =>
            (() => {
              var $ = Ts();
              return (
                n($, () => c.label),
                q(() => ($.selected = c.value === s().value)),
                q(() => ($.value = c.value)),
                $
              );
            })(),
        })
      ),
      Be(f, "click", e.disabled ? void 0 : k),
      n(f, () => s().label || e.placeholder);
    var I = p;
    return (
      typeof I == "function" ? we(I, h) : (p = h),
      n(
        h,
        o(ie, {
          get each() {
            return e.options;
          },
          children: (c, $) =>
            (() => {
              var T = Cs(),
                C = T.firstChild;
              return (
                (T.$$click = y),
                (T.$$clickData = c),
                n(C, () => c.label),
                n(
                  T,
                  (() => {
                    var A = Q(() => !!c.description);
                    return () =>
                      A() &&
                      (() => {
                        var P = Ss();
                        return n(P, () => c.description), P;
                      })();
                  })(),
                  null
                ),
                q(
                  (A) => {
                    var P = c.value === s().value ? "selected" : "",
                      H = t() ? 0 : -1,
                      K = c.value === s().value;
                    return (
                      P !== A.e && V(T, (A.e = P)),
                      H !== A.t && ee(T, "tabindex", (A.t = H)),
                      K !== A.a && ee(T, "aria-selected", (A.a = K)),
                      A
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                T
              );
            })(),
        })
      ),
      n(F, () => e.footNote),
      q(
        (c) => {
          var $ = e.name,
            T = e.required,
            C = e.disabled,
            A = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            P = e.disabled ? -1 : 0,
            H = t(),
            K = `select-items ${t() ? "select-show" : "select-hide"}
        ${d() === "up" ? "select-direction-up" : ""}`;
          return (
            $ !== c.e && ee(b, "name", (c.e = $)),
            T !== c.t && (b.required = c.t = T),
            C !== c.a && (b.disabled = c.a = C),
            A !== c.o && V(f, (c.o = A)),
            P !== c.i && ee(f, "tabindex", (c.i = P)),
            H !== c.n && ee(f, "aria-expanded", (c.n = H)),
            K !== c.s && V(h, (c.s = K)),
            c
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
      v
    );
  })();
};
be(["click"]);
const Wt = [
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
  qt = [
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
  Gn = [
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
  Is = (e) =>
    Object.values(
      Object.entries(e)
        .filter(([t, r]) => t.startsWith("pollTime_"))
        .reduce((t, r) => {
          const [s, a] = r,
            d = s.split("_"),
            i = `${d[0]}_${d[1]}`,
            l = d[2];
          return (
            (t[i] ??= {}),
            l
              ? l === "Hour"
                ? (t[i].hour = a)
                : l === "Minute"
                ? (t[i].minute = a)
                : l === "Day of Month"
                ? (t[i].dayOfMonth = a)
                : l === "Weekday"
                ? (t[i].weekday = a)
                : l === "Value"
                ? (t[i].value = a)
                : l === "Unit"
                ? (t[i].unit = a)
                : l === "Cron Expression" && (t[i].cronExpression = a)
              : (t[i].mode = a),
            t
          );
        }, {})
    ),
  jt = (e, t) => {
    const { nodes: r } = me();
    console.log("from encoder top", e);
    const s = (l, p) =>
        l.reduce(
          (u, m) => (
            m in e && (p.includes(m) ? (u[m] = !!e[m]) : (u[m] = e[m])), u
          ),
          {}
        ),
      a = () =>
        s(
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
    console.log("transformed filter", a());
    const d = () =>
      s(["downloadAttachments", "attachmentPrefix"], ["downloadAttachments"]);
    console.log("transformed option", d());
    const i = () => {
      const l = r().find((p) => p.id === t);
      if (l) return l.currPosition.get();
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
        pollTimes: Is(e),
        simple: !!e?.simplify,
        filters: a(),
        options: d(),
      },
      position: i(),
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
  Es = (e) => {
    if (e) {
      const { parameters: t } = e,
        r = t.pollTimes,
        s = [],
        a = {},
        d = {};
      return (
        r &&
          r.forEach((i) => {
            const l = `pollTime_${Math.random().toString(36).substring(2, 8)}`;
            s.push(l),
              (a[l] = i.mode),
              (d[l] = i.mode),
              "hour" in i && (d[`${l}_Hour`] = i.hour),
              "minute" in i && (d[`${l}_Minute`] = i.minute),
              "dayOfMonth" in i && (d[`${l}_Day of Month`] = i.dayOfMonth),
              "weekday" in i && (d[`${l}_Weekday`] = i.weekday),
              "value" in i && (d[`${l}_Value`] = i.value),
              "unit" in i && (d[`${l}_Unit`] = i.unit),
              "cronExpression" in i &&
                (d[`${l}_Cron Expression`] = i.cronExpression);
          }),
        {
          simplify: t?.simple,
          pollTimes: { parsedPollTimes: s, parseModesData: d, parsedModes: a },
          filters: t?.filters,
          options: t?.options,
        }
      );
    }
  };
function Os() {
  const { formData: e, setFormData: t, currentFormConfig: r } = me(),
    [s, a] = D([]),
    [d, i] = D([]),
    [l, p] = D([]),
    [u, m] = D({}),
    [g, w] = D({});
  D({});
  const [O, k] = D([]),
    [y, E] = D([]),
    [v, x] = D({}),
    [b, f] = D({}),
    [h, F] = D(""),
    N = new Set(),
    I = () => {
      x({}), p([]), m({}), w({}), E([]), k([]), f({}), a(Wt), i(qt);
    },
    c = (C, A) => {
      if (
        (console.log("from data handler raw >>>> ", C, " >>>>> ", A),
        console.log("before check from data handler", b()),
        C in b())
      ) {
        if (b()[C] === A) {
          console.log(
            "from data handler:::: >> submitted Data,>>> data unchanged, key unchanged",
            v()
          ),
            x((P) => ({ ...P, [C]: A })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              v()
            ),
            console.log(
              "from data handler:::: >> form data >>> data unchanged, key unchanged",
              e()
            );
          return;
        } else if (b()[C] !== A) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            b()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              v()
            ),
            x((H) => ({ ...H, [C]: A })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              v()
            );
          const P = jt(v(), r().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            P
          ),
            t({ ...e(), [r().id]: P }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", b()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            v()
          ),
          x((H) => ({ ...H, [C]: A })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            v()
          );
        const P = jt(v(), r().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          P
        ),
          t({ ...e(), [r().id]: P }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    $ = (C) => {
      console.log("from data remover raw >>>> ", C, " >>>>>> "),
        console.log(" from data remover submitted>>>> pre data", v()),
        x((P) =>
          Object.entries(P).reduce(
            (H, [K, ae]) => (K.includes(C) || (H[K] = ae), H),
            {}
          )
        ),
        console.log(" from data remover submitted>>>> post data", v());
      const A = jt(v(), r().id);
      console.log("from data remover >>>>> formattedPrev", A),
        t({ ...e(), [r().id]: A }),
        console.log("from data remover >>> form data", e());
    },
    T = (C, A, P) => {
      console.log(C, "not ok");
      const H = C.flatMap((K) => A.filter((ae) => ae.value === K));
      console.log(H, "ok"), P((K) => [...K, ...H]);
    };
  return (
    De(() => {
      if (
        (console.log(
          r().id,
          "  >  node data  >  ",
          `
`,
          O(),
          `
`,
          y()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(b(), "from outside"),
        !N.has(r().id))
      ) {
        N.clear(), N.add(r().id), F(r().id);
        const C = e()[r().id];
        if ((console.log("data1", C), !C)) {
          I();
          return;
        }
        I(), console.log("data2", C);
        const A = Es(C);
        A &&
          (console.log(
            "decoded from observer, >>>>>> ",
            r().id,
            A?.filters,
            A.options
          ),
          f((P) => ({
            ...P,
            simplify: A.simplify,
            ...A.pollTimes.parseModesData,
            ...A.filters,
            ...A.options,
          })),
          console.log(b(), "from inside"),
          console.log(A.pollTimes.parseModesData, "from inside parseModesData"),
          p(A.pollTimes.parsedPollTimes ?? []),
          m(A.pollTimes.parsedModes ?? {}),
          T(Object.keys(A.filters), Wt, E),
          a(() => Wt.filter((P) => y().every((H) => H.value !== P.value))),
          T(Object.keys(A.options), qt, k),
          i(() => qt.filter((P) => O().every((H) => H.value !== P.value))));
      }
    }),
    {
      pollTimes: l,
      setPollTimes: p,
      mode: u,
      setMode: m,
      selectedOptions: O,
      setSelectedOptions: k,
      selectedFilter: y,
      setSelectedFilter: E,
      submittedData: v,
      dataHandler: c,
      modeChild: g,
      setModeChild: w,
      filters: s,
      setFilters: a,
      options: d,
      setOptions: i,
      previousData: b,
      setPreviousData: f,
      setSubmittedData: x,
      dataRemoveHandler: $,
      uniqueKey: h,
    }
  );
}
var Ds = _(
    '<div><form class=form id=gmail-triggerForm><div class=space-y-5><div><div class="label hr-solid-line">Pool Times</div><div class=mt-5></div></div><div></div><div></div><div><div class="label hr-solid-line">Filters</div><div class="space-y-6 mt-5"></div><div class=mt-6></div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div><div class=mt-6>'
  ),
  Ns = _(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  As = _('<div class="space-y-4 mt-5">'),
  ks = _(
    '<div><div class=pt-9><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div></div><div class=w-full>'
  ),
  ct = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const Ms = (e) => {
  const { currentFormConfig: t, formData: r, setFormData: s } = me(),
    {
      pollTimes: a,
      setPollTimes: d,
      mode: i,
      setMode: l,
      selectedOptions: p,
      setSelectedOptions: u,
      selectedFilter: m,
      setSelectedFilter: g,
      previousData: w,
      dataHandler: O,
      modeChild: k,
      setModeChild: y,
      setFilters: E,
      filters: v,
      options: x,
      setOptions: b,
      dataRemoveHandler: f,
      uniqueKey: h,
    } = Os();
  Oe(() => {
    E(Wt), b(qt);
  });
  const F = (I, c) =>
      Object.entries(I).reduce(
        ($, [T, C]) => (T.startsWith(c) || ($[T] = C), $),
        {}
      ),
    N = (I) => {
      I.preventDefault();
      const c = new FormData(I.target);
      let $ = {
        ...Object.fromEntries(c.entries()),
        labelIds: c.getAll("labelIds"),
      };
      console.log("unformatted data", $);
      const T = jt($, t().id);
      s({ ...r(), [t().id]: T }), console.log("formattedData", T);
      const C = new CustomEvent("RIN", { detail: $, bubbles: !0 }),
        A = document.getElementById("submitBtn");
      A && A.dispatchEvent(C);
    };
  return (() => {
    var I = Ds(),
      c = I.firstChild,
      $ = c.firstChild,
      T = $.firstChild,
      C = T.firstChild,
      A = C.nextSibling,
      P = T.nextSibling,
      H = P.nextSibling,
      K = H.nextSibling,
      ae = K.firstChild,
      oe = ae.nextSibling,
      te = oe.nextSibling,
      pe = K.nextSibling,
      ne = pe.firstChild,
      ue = ne.nextSibling,
      ce = ue.nextSibling;
    return (
      c.addEventListener("submit", N),
      n(
        $,
        o(at, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        T
      ),
      n(
        A,
        (() => {
          var B = Q(() => a().length <= 0);
          return () => B() && Ns();
        })(),
        null
      ),
      n(
        A,
        o(ie, {
          get each() {
            return a();
          },
          children: (B, ve) =>
            (() => {
              var re = ks(),
                he = re.firstChild,
                j = he.firstChild,
                W = he.nextSibling;
              return (
                (j.$$click = () => {
                  d(a().filter((M, R) => M !== B)),
                    console.log("pre-previous", w()),
                    console.log("from delete handler: previous", i(), k()),
                    l((M) => F(M, B)),
                    y((M) => F(M, B)),
                    console.log("from delete handler:after", i(), k()),
                    f(B),
                    console.log("post-previous", w());
                }),
                n(j, o(fe, {})),
                n(
                  W,
                  o(Ie, {
                    name: B,
                    get uniqueKey() {
                      return h();
                    },
                    get defaultValue() {
                      return i()[B] || Gn[1].value;
                    },
                    options: Gn,
                    title: "Mode",
                    toolTipText: "How often to trigger.",
                    onChange: (M) => {
                      O(B, M.value),
                        l((R) => {
                          const X = { ...R };
                          return (X[B] = `${M.value}`), X;
                        }),
                        y((R) => {
                          const X = { ...R };
                          return (X[B] = M.children ?? []), X;
                        });
                    },
                  }),
                  null
                ),
                n(
                  W,
                  o(J, {
                    get when() {
                      return k()[B];
                    },
                    get children() {
                      var M = As();
                      return (
                        n(
                          M,
                          o(ie, {
                            get each() {
                              return k()[B];
                            },
                            children: (R, X) => {
                              if (R.type === "input")
                                return o(se, {
                                  get name() {
                                    return `${B}_${R.title}`;
                                  },
                                  get title() {
                                    return R.title;
                                  },
                                  get toolTipText() {
                                    return R.toolTipText;
                                  },
                                  isArrow: !0,
                                  get value() {
                                    return (
                                      w()[`${B}_${R.title}`] || R.value || ""
                                    );
                                  },
                                  onInput: (S, z) => {
                                    O(`${B}_${R.title}`, S);
                                  },
                                });
                              if (R.type === "dropdownN")
                                return o(Se, {
                                  get name() {
                                    return `${B}_${R.title}`;
                                  },
                                  get uniqueKey() {
                                    return h();
                                  },
                                  get title() {
                                    return R.title;
                                  },
                                  get options() {
                                    return R.options ?? [];
                                  },
                                  get defaultValue() {
                                    return (
                                      w()[`${B}_${R.title}`] ||
                                      R.options?.[0]?.value
                                    );
                                  },
                                  get toolTipText() {
                                    return R.toolTipText;
                                  },
                                  onChange: (S) => {
                                    O(`${B}_${R.title}`, S.value);
                                  },
                                });
                            },
                          })
                        ),
                        M
                      );
                    },
                  }),
                  null
                ),
                q(() =>
                  V(
                    re,
                    `mb-10 flex flex-row gap-1.5 items-top group ${
                      ve() !== 0
                        ? "border-t border-dashed border-[#727171] pt-3"
                        : ""
                    }`
                  )
                ),
                re
              );
            })(),
        }),
        null
      ),
      n(
        T,
        o(rt, {
          onClick: () => {
            d([
              ...a(),
              `pollTime_${Math.random().toString(36).substring(2, 8)}`,
            ]);
          },
          label: "Add Poll Time",
        }),
        null
      ),
      n(
        P,
        o(Se, {
          name: "event",
          title: "Event",
          get uniqueKey() {
            return h();
          },
          get defaultValue() {
            return w().event;
          },
          options: [{ label: "Message received", value: "Message received" }],
          onChange: (B) => {},
        })
      ),
      n(
        H,
        o(Ee, {
          title: "Simplify",
          name: "simplify",
          get uniqueKey() {
            return h();
          },
          get checked() {
            return w().simplify;
          },
          toolTipText:
            "Whether to return a simplified version of the response instead of the raw data.",
          onChange: (B) => {
            O("simplify", B);
          },
        })
      ),
      n(
        oe,
        o(ie, {
          get each() {
            return m();
          },
          children: (B, ve) => {
            if (B.content.type === "switch")
              return (() => {
                var re = ct(),
                  he = re.firstChild;
                return (
                  (he.$$click = () => {
                    const j = m().filter((W) => W.value !== B.value);
                    g(j), E([...v(), B]), f(B.value);
                  }),
                  n(he, o(fe, {})),
                  n(
                    re,
                    o(Ee, {
                      get name() {
                        return B.content.name;
                      },
                      get title() {
                        return B.content.title;
                      },
                      get uniqueKey() {
                        return h();
                      },
                      get checked() {
                        return w()[B.content.name];
                      },
                      get toolTipText() {
                        return B.content.toolTipText;
                      },
                      onChange: (j) => {
                        O(B.content.name, j);
                      },
                    }),
                    null
                  ),
                  re
                );
              })();
            if (B.content.type === "dynamicInput")
              return (() => {
                var re = ct(),
                  he = re.firstChild;
                return (
                  (he.$$click = () => {
                    const j = m().filter((W) => W.value !== B.value);
                    g(j), E([...v(), B]), f(B.value);
                  }),
                  n(he, o(fe, {})),
                  n(
                    re,
                    o(se, {
                      get name() {
                        return B.content.name;
                      },
                      get title() {
                        return B.content.title;
                      },
                      get toolTipText() {
                        return B.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return B.content.footNote;
                      },
                      get placeholder() {
                        return B.content.placeholder ?? "";
                      },
                      get value() {
                        return w()[B.content.name];
                      },
                      onInput: (j) => {
                        O(B.content.name, j);
                      },
                    }),
                    null
                  ),
                  re
                );
              })();
            if (B.content.type === "dropdownMultiple")
              return (() => {
                var re = ct(),
                  he = re.firstChild;
                return (
                  (he.$$click = () => {
                    const j = m().filter((W) => W.value !== B.value);
                    g(j), E([...v(), B]), f(B.value);
                  }),
                  n(he, o(fe, {})),
                  n(
                    re,
                    o(ql, {
                      get name() {
                        return B.content.name;
                      },
                      get title() {
                        return B.content.title;
                      },
                      get options() {
                        return B.content.options;
                      },
                      get toolTipText() {
                        return B.content.toolTipText;
                      },
                      get defaultSelectedOptions() {
                        return w()[B.content.name] || [];
                      },
                      get footNote() {
                        return B.content.footNote;
                      },
                      onChange: (j) => {
                        O(
                          B.content.name,
                          j.map((W) => W.value)
                        );
                      },
                    }),
                    null
                  ),
                  re
                );
              })();
            if (B.content.type === "dropdownN")
              return (() => {
                var re = ct(),
                  he = re.firstChild;
                return (
                  (he.$$click = () => {
                    const j = m().filter((W) => W.value !== B.value);
                    g(j), E([...v(), B]), f(B.value);
                  }),
                  n(he, o(fe, {})),
                  n(
                    re,
                    o(Se, {
                      get uniqueKey() {
                        return h();
                      },
                      get defaultValue() {
                        return (
                          w()[B.content.name] ?? B.content.options[0].value
                        );
                      },
                      get name() {
                        return B.content.name;
                      },
                      get title() {
                        return B.content.title;
                      },
                      get options() {
                        return B.content.options;
                      },
                      get toolTipText() {
                        return B.content.toolTipText;
                      },
                      get footNote() {
                        return B.content.footNote;
                      },
                      onChange: (j) => {
                        O(B.content.name, j.value);
                      },
                    }),
                    null
                  ),
                  re
                );
              })();
          },
        })
      ),
      n(
        te,
        o(Le, {
          name: "filter",
          dropdownOptions: v,
          setDropdownOptions: E,
          selectedOptions: m,
          setSelectedOptions: g,
          placeholder: "Add filter",
          onChange: (B) => {},
        })
      ),
      n(
        ue,
        o(ie, {
          get each() {
            return p();
          },
          children: (B, ve) => {
            if (B.content.type === "switch")
              return (() => {
                var re = ct(),
                  he = re.firstChild;
                return (
                  (he.$$click = () => {
                    const j = p().filter((W) => W.value !== B.value);
                    u(j), b([...x(), B]), f(B.value);
                  }),
                  n(he, o(fe, {})),
                  n(
                    re,
                    o(Ee, {
                      get name() {
                        return B.content.name;
                      },
                      get title() {
                        return B.content.title;
                      },
                      get uniqueKey() {
                        return h();
                      },
                      get toolTipText() {
                        return B.content.toolTipText;
                      },
                      get checked() {
                        return w()[B.content.name] ?? !1;
                      },
                      onChange: (j) => {
                        O(B.content.name, j);
                      },
                    }),
                    null
                  ),
                  re
                );
              })();
            if (B.content.type === "dynamicInput")
              return (() => {
                var re = ct(),
                  he = re.firstChild;
                return (
                  (he.$$click = () => {
                    const j = p().filter((W) => W.value !== B.value);
                    u(j), b([...x(), B]), f(B.value);
                  }),
                  n(he, o(fe, {})),
                  n(
                    re,
                    o(se, {
                      get name() {
                        return B.content.name;
                      },
                      get title() {
                        return B.content.title;
                      },
                      get toolTipText() {
                        return B.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return B.content.footNote;
                      },
                      get value() {
                        return w()[B.content.name] || B.content.value || "";
                      },
                      onInput: (j) => {
                        O(B.content.name, j);
                      },
                    }),
                    null
                  ),
                  re
                );
              })();
          },
        })
      ),
      n(
        ce,
        o(Le, {
          name: "options_gmail_node",
          dropdownOptions: x,
          setDropdownOptions: b,
          selectedOptions: p,
          setSelectedOptions: u,
          placeholder: "Add Options",
          onChange: (B) => {},
        })
      ),
      q(() => ee(I, "id", t().id)),
      I
    );
  })();
};
be(["click"]);
const sn = [
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
  dn = [
    {
      value: "Connected Chat Trigger Node",
      label: "Connected Chat Trigger Node",
      description:
        "Looks for an input field called 'chatInput' that is coming from a directly connected Chat Trigger.",
      children: [],
    },
    {
      value: "Define below",
      label: "Define below",
      description:
        "Use an expression to reference data in previous nodes or enter static text.",
      children: [],
    },
  ],
  Ps = [
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
      value: "automaticallyPassthroughBinaryImages",
      content: {
        type: "switch",
        title: "Automatically Passthrough Binary Images",
        name: "automaticallyPassthroughBinaryImages",
        toolTipText:
          "Whether or not binary images should be automatically passed through to the agent as image type messages.",
      },
    },
  ],
  cn = [
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
var Ls = _("<div class=relative><textarea autocomplete=off rows=3>"),
  Vs = _("<label class=label>"),
  Fs = _("<div class=toolTipBtn>"),
  Bs = _(
    '<div class="absolute right-3 top-1/2 transform -translate-y-1/2"><svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class=text-red-500><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17 .01 0">'
  );
const it = (e) => {
  const [t, r] = D(""),
    [s, a] = D(!0),
    d = (i) => {
      const p = i.target.value;
      r(p), a(p.trim() === "");
    };
  return (() => {
    var i = Ls(),
      l = i.firstChild;
    return (
      n(
        i,
        (() => {
          var p = Q(() => !!e.title);
          return () =>
            p() &&
            (() => {
              var u = Vs();
              return (
                n(u, () => e.title, null),
                n(
                  u,
                  (() => {
                    var m = Q(() => !!e.toolTipText);
                    return () =>
                      m() &&
                      (() => {
                        var g = Fs();
                        return (
                          n(
                            g,
                            o(Re, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          g
                        );
                      })();
                  })(),
                  null
                ),
                q(() => ee(u, "for", e.name)),
                u
              );
            })();
        })(),
        l
      ),
      (l.$$input = d),
      n(
        i,
        (() => {
          var p = Q(() => !!s());
          return () => p() && Bs();
        })(),
        null
      ),
      q(
        (p) => {
          var u = e.name,
            m = e.placeholder || "Type here...",
            g = `
              w-full px-4 py-3 pr-12 
              bg-[#252434] text-white 
              rounded-lg resize-none 
              placeholder-gray-400
              focus:outline-none
              transition-all duration-200
              ${
                s()
                  ? "border-1 border-[#b46262] focus:border-[#888484]"
                  : "border-1 border-[#dad7d742] focus:border-[#888484]"
              }
            `;
          return (
            u !== p.e && ee(l, "name", (p.e = u)),
            m !== p.t && ee(l, "placeholder", (p.t = m)),
            g !== p.a && V(l, (p.a = g)),
            p
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      q(() => (l.value = e.value || "")),
      i
    );
  })();
};
be(["input"]);
var Rs = _(
  '<div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-light text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">'
);
const nn = (e) => {
    const t = Co(() => e.children);
    return (() => {
      var r = Rs();
      return n(r, t), r;
    })();
  },
  Ul = (e, t) => ({
    id: t,
    name: "AI Agent",
    description: "AI Agent",
    type: "LangChainAgent",
    parameters: {
      agent: e?.agent,
      promptType: e?.sourceForPrompt,
      text: e?.promptDefineBelow || e?.promptConnectedChatTriggerNode || "",
      options: {
        systemMessage: e?.systemMessage || "",
        maxIterations: e?.maxIterations || 0,
        returnIntermediateSteps: !!e?.returnIntermediateSteps,
        passthroughBinaryImages: !!e?.automaticallyPassthroughBinaryImages,
      },
    },
    position: { x: -16060, y: -440 },
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
  }),
  [zs, Hs] = D({}),
  { currentFormConfig: Ws, formData: qs, setFormData: js } = me(),
  ze = (e, t, r) => {
    Hs((a) => ({ ...a, [e]: t }));
    const s = Ul(zs(), Ws().id);
    js({ ...qs(), AiAgent: s });
  };
var Us = _('<a href=# class="font-semibold text-[#fe705a]">tutorial'),
  Gs = _('<a href=# class="font-semibold text-[#fe705a]">example'),
  Xs = _(
    `<div class="mt-5 space-y-5"><div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-extralight text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">Pass the SQLite database into this node as binary data, e.g. by inserting a 'Read/Write Files from Disk' node beforehand</div><div>`
  ),
  Ys = _('<div class="mt-5 space-y-5"><div></div><div>'),
  Ks = _("<div class=mt-5>"),
  Js = _(
    '<form class=form id=ai-agentForm><div><div></div><div class=mt-5><div class=mt-4></div></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  Xn = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  Zs = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1></div>;'
  );
const Qs = (e) => {
  const { currentFormConfig: t } = me(),
    [r, s] = D(sn[0]),
    [a, d] = D(dn[0]),
    [i, l] = D(Ps),
    [p, u] = D([]),
    [m, g] = D(cn[0]),
    { formData: w, setFormData: O } = me(),
    k = () =>
      r().value === "Tools Agent" || r().value === "Conversational Agent",
    y = (E) => {
      E.preventDefault();
      const v = new FormData(E.target);
      let x = Object.fromEntries(v.entries());
      const b = Ul(x, t().id);
      O({ ...w(), AiAgent: b }), console.log(b);
      const f = new CustomEvent("formSubmitEvent", { detail: x, bubbles: !0 }),
        h = document.getElementById("submitBtn");
      h && h.dispatchEvent(f);
    };
  return (() => {
    var E = Js(),
      v = E.firstChild,
      x = v.firstChild,
      b = x.nextSibling,
      f = b.firstChild,
      h = b.nextSibling,
      F = h.firstChild,
      N = F.nextSibling,
      I = N.nextSibling;
    return (
      E.addEventListener("submit", y),
      n(
        v,
        o(J, {
          get when() {
            return k();
          },
          get children() {
            return o(nn, {
              get children() {
                return [
                  "Tip: Get a feel for agents with our quick",
                  " ",
                  Us(),
                  " ",
                  "or see an",
                  " ",
                  Gs(),
                  " ",
                  "of how this node works",
                ];
              },
            });
          },
        }),
        x
      ),
      n(
        x,
        o(Ie, {
          name: "agent",
          title: "Agent",
          get defaultValue() {
            return sn[0].value;
          },
          options: sn,
          onChange: (c) => {
            s(c), ze("agent", c);
          },
        })
      ),
      n(
        v,
        o(J, {
          get when() {
            return r().value === "SQL Agent";
          },
          get children() {
            var c = Ys(),
              $ = c.firstChild,
              T = $.nextSibling;
            return (
              n(
                $,
                o(Se, {
                  name: "dataSource",
                  options: cn,
                  title: "Data Source",
                  get defaultValue() {
                    return cn[0].value;
                  },
                  onChange: (C) => {
                    g(C), ze("dataSource", C);
                  },
                })
              ),
              n(
                c,
                o(J, {
                  get when() {
                    return m().value === "sqlite";
                  },
                  get children() {
                    var C = Xs(),
                      A = C.firstChild,
                      P = A.nextSibling;
                    return (
                      n(
                        P,
                        o(se, {
                          name: "inputBinaryField",
                          title: "Input Binary Field",
                          placeholder: "e.g. Data",
                          value: "",
                          footNote:
                            "The name of the input binary field containing the file to be extracted",
                          isArrow: !0,
                          onInput: (H) => {
                            ze("inputBinaryField", H);
                          },
                        })
                      ),
                      C
                    );
                  },
                }),
                T
              ),
              n(
                T,
                o(J, {
                  get when() {
                    return m().value !== "sqlite";
                  },
                  get children() {
                    return o(at, {
                      get name() {
                        return `credential_for_${m().value}`;
                      },
                      get title() {
                        return `Credential for ${m().value}`;
                      },
                      placeholder: "Select Credential",
                    });
                  },
                })
              ),
              c
            );
          },
        }),
        b
      ),
      n(
        b,
        o(Ie, {
          name: "sourceForPrompt",
          title: "Source for Prompt (User message)",
          options: dn,
          get defaultValue() {
            return dn[0].value;
          },
          onChange: (c) => {
            d(c), ze("sourceForPrompt", c);
          },
        }),
        f
      ),
      n(
        f,
        o(J, {
          get when() {
            return a().value === "Define below";
          },
          get children() {
            return o(it, {
              name: "promptDefineBelow",
              title: "Prompt (User message)",
              placeholder: "e.g. Hello, how can you help me?",
              onInput: (c) => {
                ze(`prompt_${a().value}`, c);
              },
            });
          },
        }),
        null
      ),
      n(
        f,
        o(J, {
          get when() {
            return a().value === "Connected Chat Trigger Node";
          },
          get children() {
            return o(se, {
              name: "promptConnectedChatTriggerNode",
              title: "Prompt (User message)",
              placeholder: "{{ $json.chatInput }}",
              isArrow: !0,
              isExpand: !0,
              value: "",
              onInput: (c) => {
                ze(`prompt_${a().value}`, c);
              },
            });
          },
        }),
        null
      ),
      n(
        v,
        o(J, {
          get when() {
            return r().value !== "SQL Agent";
          },
          get children() {
            var c = Ks();
            return (
              n(
                c,
                o(Ee, {
                  title: "Require Specific Output Format",
                  name: "requireSpecificOutputFormat",
                })
              ),
              c
            );
          },
        }),
        h
      ),
      n(
        N,
        o(ie, {
          get each() {
            return p();
          },
          children: (c) => {
            if (c.content.type === "textArea")
              return (() => {
                var $ = Xn(),
                  T = $.firstChild,
                  C = T.nextSibling;
                return (
                  (T.$$click = () => {
                    const A = p().filter((P) => P.value !== c.value);
                    u(A), l([...i(), c]);
                  }),
                  n(T, o(fe, {})),
                  n(
                    C,
                    o(it, {
                      get name() {
                        return c.content.name;
                      },
                      get value() {
                        return c.content.value;
                      },
                      get title() {
                        return c.content.title ?? "";
                      },
                      get toolTipText() {
                        return c.content.toolTipText;
                      },
                      onInput: (A) => {
                        ze(c.content.name, A);
                      },
                    })
                  ),
                  $
                );
              })();
            if (c.content.type === "input")
              return (() => {
                var $ = Zs(),
                  T = $.firstChild,
                  C = T.nextSibling;
                return (
                  (T.$$click = () => {
                    const A = p().filter((P) => P.value !== c.value);
                    u(A), l([...i(), c]);
                  }),
                  n(T, o(fe, {})),
                  n(
                    C,
                    o(se, {
                      get name() {
                        return c.content.name;
                      },
                      get value() {
                        return c.content.value;
                      },
                      get title() {
                        return c.content.title ?? "";
                      },
                      get toolTipText() {
                        return c.content.toolTipText;
                      },
                      onInput: (A) => {
                        ze(c.content.name, A);
                      },
                    })
                  ),
                  $
                );
              })();
            if (c.content.type === "switch")
              return (() => {
                var $ = Xn(),
                  T = $.firstChild,
                  C = T.nextSibling;
                return (
                  (T.$$click = () => {
                    const A = p().filter((P) => P.value !== c.value);
                    u(A), l([...i(), c]);
                  }),
                  n(T, o(fe, {})),
                  n(
                    C,
                    o(Ee, {
                      get name() {
                        return c.content.name;
                      },
                      get title() {
                        return c.content.title ?? "";
                      },
                      get toolTipText() {
                        return c.content.toolTipText;
                      },
                      onChange: (A) => {
                        ze(c.content.name, A);
                      },
                    })
                  ),
                  $
                );
              })();
          },
        })
      ),
      n(
        I,
        o(Le, {
          name: "Ai Agent Options",
          placeholder: "Add Option",
          dropdownOptions: i,
          selectedOptions: p,
          setSelectedOptions: u,
          setDropdownOptions: l,
          onChange: (c) => {
            u(c);
          },
        })
      ),
      q(() => V(x, `${k() ? "mt-5" : "mt-1"}`)),
      E
    );
  })();
};
be(["click"]);
const Yn = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  ed = [
    {
      label: "Sampling Temperature",
      value: "samplingTemperature",
      content: {
        type: "dynamicInput",
        title: "Sampling Temperature",
        name: "samplingTemperature",
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
      value: "lowVramMode",
      content: {
        type: "switch",
        title: "Low VRAM Mode",
        name: "lowVramMode",
        toolTipText:
          "Whether to Activate low VRAM mode, which reduces memory usage at the cost of slower generation speed. Useful for GPUs with limited memory.",
      },
    },
    {
      label: "Main GPU ID",
      value: "mainGpuId",
      content: {
        type: "dynamicInput",
        title: "Main GPU ID",
        name: "mainGpuId",
        value: "1",
        toolTipText:
          "Specifies the ID of the GPU to use for the main computation. Only change this if you have multiple GPUs.",
      },
    },
    {
      label: "Context Batch Size",
      value: "contextBatchSize",
      content: {
        type: "dynamicInput",
        title: "Context Batch Size",
        name: "contextBatchSize",
        value: "512",
        toolTipText:
          "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
      },
    },
    {
      label: "Context Length",
      value: "contextLength",
      content: {
        type: "dynamicInput",
        title: "Context Length",
        name: "contextLength",
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
      value: "numCpuThreads",
      content: {
        type: "dynamicInput",
        title: "Number of CPU Threads",
        name: "numCpuThreads",
        value: "0",
        toolTipText:
          "Specifies the number of CPU threads to use for processing. Set to 0 for auto-detection.",
      },
    },
    {
      label: "Penalize Newlines",
      value: "penalizeNewlines",
      content: {
        type: "switch",
        title: "Penalize Newlines",
        name: "penalizeNewlines",
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
      value: "repetitionPenalty",
      content: {
        type: "dynamicInput",
        title: "Repetition Penalty",
        name: "repetitionPenalty",
        value: "1",
        toolTipText:
          "Adjusts the penalty factor for repeated tokens. Higher values more strongly discourage repetition. Set to 1.0 to disable repetition penalty.",
      },
    },
    {
      label: "Use Memory Locking",
      value: "UseMemoryLocking",
      content: {
        type: "switch",
        title: "Use Memory Locking",
        name: "UseMemoryLocking",
        toolTipText:
          "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
      },
    },
    {
      label: "Use Memory Mapping",
      value: "useMemoryMapping",
      content: {
        type: "switch",
        title: "Use Memory Mapping",
        name: "useMemoryMapping",
        toolTipText:
          "Whether to use memory mapping for loading the model. This can reduce memory usage but may impact performance. Recommended to keep enabled.",
      },
    },
    {
      label: "Load Vocabulary Only",
      value: "loadVocabularyOnly",
      content: {
        type: "switch",
        title: "Load Vocabulary Only",
        name: "loadVocabularyOnly",
        toolTipText:
          "Whether to only load the model vocabulary without the weights. Useful for quickly testing tokenization.",
      },
    },
    {
      label: "Output Format",
      value: "outputFormat",
      content: {
        type: "dropdownN",
        title: "Output Format",
        name: "outputFormat",
        options: [
          { label: "JSON", value: "JSON" },
          { label: "Default", value: "Default" },
        ],
        toolTipText:
          "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
      },
    },
  ],
  Gl = (e, t) => ({
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
      modal: e?.model || "",
      options: {
        temperature: e?.samplingTemperature,
        topK: e?.topK,
        topP: e?.topP,
        frequencyPenalty: e?.frequencyPenalty,
        keepAlive: e?.keepAlive,
        lowVram: e?.lowVramMode,
        mainGpu: e?.mainGpuId,
        numBatch: e?.contextBatchSize,
        numCtx: e?.contextLength,
        numGpu: e?.numGpus,
        numThread: e?.numCpuThreads,
        penalizeNewline: e?.penalizeNewlines,
        presencePenalty: e?.presencePenalty,
        repeatPenalty: e?.repetitionPenalty,
        useMLock: e?.UseMemoryLocking,
        useMMap: e?.useMemoryMapping,
        vocabOnly: e?.loadVocabularyOnly,
        format: e?.outputFormat,
      },
    },
    position: { x: -16060, y: -440 },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "ollma_output",
        description: "ollama output port",
        type: "object",
      },
    ],
  }),
  [td, nd] = D({}),
  { currentFormConfig: od, setFormData: ld, formData: rd } = me(),
  Bt = (e, t, r) => {
    nd((a) => ({ ...a, [e]: t }));
    const s = Gl(td(), od().id);
    ld({ ...rd(), ollamaChat: s });
  };
var id = _(
    '<form class=form id=ollama-chatForm><div><div class=space-y-5><div></div><div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div></div><div class=mt-5>'
  ),
  un = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const ad = (e) => {
  const { currentFormConfig: t } = me(),
    [r, s] = D(ed),
    [a, d] = D([]),
    { formData: i, setFormData: l } = me(),
    p = (u) => {
      u.preventDefault();
      const m = new FormData(u.target);
      let g = Object.fromEntries(m.entries());
      const w = Gl(g, t().id);
      l({ ...i(), ollamaChat: w });
      const O = new CustomEvent("formSubmitEvent", { detail: g, bubbles: !0 }),
        k = document.getElementById("submitBtn");
      k && k.dispatchEvent(O);
    };
  return (() => {
    var u = id(),
      m = u.firstChild,
      g = m.firstChild,
      w = g.firstChild,
      O = w.nextSibling,
      k = O.nextSibling,
      y = k.firstChild,
      E = y.nextSibling,
      v = k.nextSibling;
    return (
      u.addEventListener("submit", p),
      n(
        w,
        o(at, { name: "credential_ollama", placeholder: "Select a Credential" })
      ),
      n(
        O,
        o(Se, {
          name: "model",
          title: "Model",
          get defaultValue() {
            return Yn[0].value;
          },
          options: Yn,
          onChange: (x) => {
            Bt("modal", x);
          },
        })
      ),
      n(
        E,
        o(ie, {
          get each() {
            return a();
          },
          children: (x, b) => {
            if (x.content.type === "switch")
              return (() => {
                var f = un(),
                  h = f.firstChild;
                return (
                  (h.$$click = () => {
                    const F = a().filter((N) => N.value !== x.value);
                    d(F), s([...r(), x]);
                  }),
                  n(h, o(fe, {})),
                  n(
                    f,
                    o(Ee, {
                      get name() {
                        return x.content.name;
                      },
                      get title() {
                        return x.content.title ?? "";
                      },
                      get toolTipText() {
                        return x.content.toolTipText;
                      },
                      onChange: (F) => {
                        Bt(x.content.name, F);
                      },
                    }),
                    null
                  ),
                  f
                );
              })();
            if (x.content.type === "dynamicInput")
              return (() => {
                var f = un(),
                  h = f.firstChild;
                return (
                  (h.$$click = () => {
                    const F = a().filter((N) => N.value !== x.value);
                    d(F), s([...r(), x]);
                  }),
                  n(h, o(fe, {})),
                  n(
                    f,
                    o(se, {
                      get name() {
                        return x.content.name;
                      },
                      get value() {
                        return x.content.value;
                      },
                      get title() {
                        return x.content.title;
                      },
                      get toolTipText() {
                        return x.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return x.content.footNote;
                      },
                      get placeholder() {
                        return x.content.placeholder ?? "";
                      },
                      onInput: (F) => {
                        Bt(x.content.name, F);
                      },
                    }),
                    null
                  ),
                  f
                );
              })();
            if (x.content.type === "dropdownN")
              return (() => {
                var f = un(),
                  h = f.firstChild;
                return (
                  (h.$$click = () => {
                    const F = a().filter((N) => N.value !== x.value);
                    d(F), s([...r(), x]);
                  }),
                  n(h, o(fe, {})),
                  n(
                    f,
                    o(Se, {
                      get name() {
                        return x.content.name;
                      },
                      get title() {
                        return x.content.title;
                      },
                      get defaultValue() {
                        return x.content.options?.[0]?.value ?? "";
                      },
                      get options() {
                        return x.content.options ?? [];
                      },
                      get toolTipText() {
                        return x.content.toolTipText;
                      },
                      get footNote() {
                        return x.content.footNote;
                      },
                      onChange: (F) => {
                        Bt(x.content.name, F);
                      },
                    }),
                    null
                  ),
                  f
                );
              })();
          },
        })
      ),
      n(
        v,
        o(Le, {
          name: "Add Option",
          placeholder: "Add Option",
          selectedOptions: a,
          setSelectedOptions: d,
          dropdownOptions: r,
          setDropdownOptions: s,
          onChange: (x) => {
            d(x);
          },
        })
      ),
      u
    );
  })();
};
be(["click"]);
const sd = [
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
  pn = [
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
  Kn = [
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
  wt = [
    { value: "approvedOnly", label: "Approved Only" },
    { value: "approvedAndDisapproved", label: "Approved and Disapproved" },
  ],
  $t = [
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
  mn = [
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
  vn = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  hn = [
    { value: "Send", label: "Send" },
    { value: "sendAndWaitForResponse", label: "Send and Wait for Response" },
  ],
  Ue = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  Ge = {
    type: "switch",
    title: "Required Field",
    toolTipText:
      "Whether to require the user to enter a value for this field before submitting the form",
  },
  _t = {
    type: "dynamicInput",
    title: "Placeholder",
    toolTipText: "Sample text to display inside the field.",
  },
  Jn = [
    { value: "text", label: "Text", children: [Ue, Ge, _t] },
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
        Ue,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        Ge,
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
        Ge,
        Ue,
      ],
    },
    { value: "email", label: "Email", children: [Ue, Ge, _t] },
    {
      value: "file",
      label: "File",
      children: [
        Ue,
        Ge,
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
    { value: "number", label: "Number", children: [Ue, Ge, _t] },
    { value: "password", label: "Password", children: [Ue, Ge, _t] },
    { value: "textArea", label: "Textarea", children: [Ue, Ge, _t] },
  ];
var dd = _("<button type=button>");
const Qt = ({ title: e, width: t = "w-auto", onClick: r }) =>
  (() => {
    var s = dd();
    return (
      Be(s, "click", r),
      V(
        s,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      n(s, e),
      s
    );
  })();
be(["click"]);
var Dn = ((e) => (
    (e.Text = "text"),
    (e.Number = "number"),
    (e.Password = "password"),
    (e.Email = "email"),
    (e.Url = "url"),
    e
  ))(Dn || {}),
  cd = _(
    '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg baseProfile=tiny version=1.2 viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M17.707 8.293a.999.999 0 1 0-1.414 1.414L17.586 11H13V6.414l1.293 1.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L12 2.586 8.293 6.293a.999.999 0 1 0 1.414 1.414L11 6.414V11H6.414l1.293-1.293a.999.999 0 1 0-1.414-1.414L2.586 12l3.707 3.707a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L6.414 13H11v4.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414L12 21.414l3.707-3.707a.999.999 0 1 0-1.414-1.414L13 17.586V13h4.586l-1.293 1.293a.999.999 0 1 0 1.414 1.414L21.414 12l-3.707-3.707z">'
  );
const bt = (e) => cd();
var ud = _(
    '<div><div class="flex font-mono rounded bg-[#252631] min-h-[200px] max-h-[220px] "><div class="w-12 bg-[#1a1b26] border-r border-neutral-600 text-gray-400 text-sm leading-6 px-2 py-4 text-right select-none overflow-hidden">1</div><div class="flex-1 relative"><textarea autocomplete=off>'
  ),
  pd = _("<label class=label>"),
  md = _("<div class=toolTipBtn>"),
  vd = _(
    '<div class="mb-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm"><span class=font-semibold>Line <!>:</span> '
  ),
  hd = _('<button type=button aria-label="Toggle expanded view">'),
  fd = _("<p class=foot-note>");
const Vt = (e) => {
  const { setIsModalOpen3: t } = me();
  let r, s, a;
  const [d, i] = D(null),
    l = (y) => {
      if (!y.trim()) return i(null), null;
      try {
        return JSON.parse(y), i(null), null;
      } catch (E) {
        const v = E instanceof Error ? E.message : "Invalid JSON",
          x = v.match(/line (\d+)/i) || v.match(/position (\d+)/i);
        let b = 1;
        if (x) {
          const h = parseInt(x[1]);
          b = (y.substring(0, h).match(/\n/g) || []).length + 1;
        }
        const f = { line: b, message: v };
        return i(f), f;
      }
    },
    p = (y) => {
      try {
        const E = JSON.parse(y);
        return JSON.stringify(E, null, 2);
      } catch {
        return y;
      }
    },
    u = (y) => {
      const E = y.split(`
`);
      if (a) {
        const v = E.map((x, b) => `${b + 1}`).join(`
`);
        a.textContent = v;
      }
    },
    m = (y) => {
      const v = y.target.value;
      u(v), l(v), e.onInput?.(v);
    },
    g = (y) => {
      y.preventDefault();
      const E = y.clipboardData?.getData("text") || "";
      if (E.trim())
        try {
          const v = p(E);
          r && ((r.value = v), u(v), l(v), e.onInput?.(v));
        } catch {
          r && ((r.value = E), u(E), l(E), e.onInput?.(E));
        }
    },
    w = () => {
      r && a && (a.scrollTop = r.scrollTop);
    },
    O = () => {
      e.disabled;
    },
    k = (y) => {
      setTimeout(() => w(), 0);
    };
  return (
    De(() => {
      e.value && (u(e.value), l(e.value));
    }),
    (() => {
      var y = ud(),
        E = y.firstChild,
        v = E.firstChild,
        x = v.nextSibling,
        b = x.firstChild,
        f = s;
      typeof f == "function" ? we(f, y) : (s = y),
        n(
          y,
          (() => {
            var N = Q(() => !!e.title);
            return () =>
              N() &&
              (() => {
                var I = pd();
                return (
                  n(I, () => e.title, null),
                  n(
                    I,
                    (() => {
                      var c = Q(() => !!e.toolTipText);
                      return () =>
                        c() &&
                        (() => {
                          var $ = md();
                          return (
                            n(
                              $,
                              o(Re, {
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
                  q(() => ee(I, "for", e.name)),
                  I
                );
              })();
          })(),
          E
        ),
        n(
          y,
          (() => {
            var N = Q(() => !!d());
            return () =>
              N() &&
              (() => {
                var I = vd(),
                  c = I.firstChild,
                  $ = c.firstChild,
                  T = $.nextSibling;
                return (
                  T.nextSibling,
                  c.nextSibling,
                  n(c, () => d()?.line, T),
                  n(I, () => d()?.message, null),
                  I
                );
              })();
          })(),
          E
        );
      var h = a;
      typeof h == "function" ? we(h, v) : (a = v),
        v.style.setProperty(
          "font-family",
          "Monaco, Menlo, 'Ubuntu Mono', monospace"
        ),
        v.style.setProperty("white-space", "pre-line"),
        v.style.setProperty("pointer-events", "none"),
        (b.$$keydown = k),
        b.addEventListener("focus", O),
        b.addEventListener("scroll", w),
        b.addEventListener("paste", g),
        (b.$$input = m);
      var F = r;
      return (
        typeof F == "function" ? we(F, b) : (r = b),
        n(
          x,
          (() => {
            var N = Q(() => !!e.isArrow);
            return () =>
              N() &&
              (() => {
                var I = hd();
                return (
                  (I.$$click = () => t(!0)),
                  n(I, o(jl, {})),
                  q(
                    (c) => {
                      var $ = e.disabled,
                        T = `absolute right-0 bottom-0 text-gray-400 text-[10px] bg-[#2c2e2f] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                          e.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`;
                      return (
                        $ !== c.e && (I.disabled = c.e = $),
                        T !== c.t && V(I, (c.t = T)),
                        c
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  I
                );
              })();
          })(),
          null
        ),
        n(
          y,
          (() => {
            var N = Q(() => !!e.footNote);
            return () =>
              N() &&
              (() => {
                var I = fd();
                return n(I, () => e.footNote), I;
              })();
          })(),
          null
        ),
        q(
          (N) => {
            var I = `relative h-full w-full group ${e.class || ""}`,
              c = e.name,
              $ = e.disabled,
              T = e.placeholder || "",
              C = `${
                e.disabled ? "opacity-50 cursor-not-allowed" : ""
              } w-full h-full min-h-[200px] max-h-[220px] bg-transparent jsonMain text-white placeholder-gray-500 outline-none transition-colors resize-none px-4 py-4 leading-6`;
            return (
              I !== N.e && V(y, (N.e = I)),
              c !== N.t && ee(b, "name", (N.t = c)),
              $ !== N.a && (b.disabled = N.a = $),
              T !== N.o && ee(b, "placeholder", (N.o = T)),
              C !== N.i && V(b, (N.i = C)),
              N
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        q(() => (b.value = e.value || "")),
        y
      );
    })()
  );
};
be(["input", "keydown", "click"]);
const gd = (e, t) => ({
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
var Zn = _('<div class="mt-5 space-y-5">'),
  bd = _(
    '<div><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  Qn = _(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  xd = _(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  eo = _(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  yd = _(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  fn = _('<div class="space-y-5 mt-5">'),
  wd = _('<div class="label hr-solid-line">Form Elements'),
  $d = _("<div class=space-y-5>"),
  _d = _('<div><div class="label hr-solid-line">Options'),
  Td = _("<form id=send-emailForm><div class=space-y-5><div class=space-y-5>"),
  Tt = _(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  to = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  Cd = _('<div class="space-y-4 mt-5">'),
  Sd = _(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  Id = _(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  Ed = _(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const Od = (e) => {
  const { currentFormConfig: t, formData: r, setFormData: s } = me(),
    [a, d] = D(hn[0]),
    [i, l] = D(pn[0]),
    [p, u] = D(mn[0]),
    [m, g] = D(!1),
    [w, O] = D(wt[0]),
    [k, y] = D(!1),
    [E, v] = D($t[0]),
    [x, b] = D([]),
    [f, h] = D([]),
    [F, N] = D(vn[0]),
    [I, c] = D([]),
    [$, T] = D({}),
    [C, A] = D({});
  Oe(() => {
    b(Kn);
  }),
    De(() => {
      a().value === "Send"
        ? (b(Kn), h([]))
        : a().value === "sendAndWaitForResponse" &&
          (p().value === "Approval"
            ? (b([
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
              h([]))
            : (p().value === "freeText" || p().value === "customForm") &&
              (b(sd), h([])));
    });
  const P = (H) => {
    H.preventDefault();
    const K = new FormData(H.target);
    let ae = Object.fromEntries(K.entries());
    const oe = gd(ae, t().id);
    s({ ...r(), sendEmail: oe });
  };
  return (() => {
    var H = Td(),
      K = H.firstChild,
      ae = K.firstChild;
    return (
      H.addEventListener("submit", P),
      n(
        K,
        o(at, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        ae
      ),
      n(
        K,
        o(Ie, {
          name: "Operation",
          title: "Operation",
          options: hn,
          get defaultValue() {
            return hn[0].value;
          },
          onChange: (oe) => {
            d(oe);
          },
        }),
        ae
      ),
      n(
        K,
        o(se, {
          name: "fromEmail",
          title: "From Email",
          placeholder: "admin@example.com",
          toolTipText:
            "Email address of the sender. You can also specify a name: Nathan Doe <nate@n8n.io>.",
          get type() {
            return Dn.Email;
          },
          isArrow: !0,
        }),
        ae
      ),
      n(
        K,
        o(se, {
          name: "toEmail",
          title: "To Email",
          placeholder: "info@example.com",
          toolTipText:
            "Email address of the recipient. You can also specify a name: Nathan Doe <nate@n8n.io>.",
          get type() {
            return Dn.Email;
          },
          isArrow: !0,
        }),
        ae
      ),
      n(
        K,
        o(se, {
          name: "subject",
          title: "Subject",
          placeholder: "e.g. Approval required",
          isArrow: !0,
        }),
        ae
      ),
      n(
        ae,
        o(J, {
          get when() {
            return a().value === "Send";
          },
          get children() {
            return [
              o(Ie, {
                name: "emailFormat",
                title: "Email Format",
                options: pn,
                get defaultValue() {
                  return pn[0].value;
                },
                toolTipText: "Select the format for the email",
                onChange: (oe) => {
                  l(oe);
                },
              }),
              (() => {
                var oe = Zn();
                return (
                  n(
                    oe,
                    o(ie, {
                      get each() {
                        return i()?.children;
                      },
                      children: (te) =>
                        o(it, {
                          get name() {
                            return `emailFormat${te.title}`;
                          },
                          get title() {
                            return te.title ?? "";
                          },
                          get toolTipText() {
                            return te.toolTipText;
                          },
                        }),
                    })
                  ),
                  oe
                );
              })(),
              (() => {
                var oe = bd(),
                  te = oe.firstChild,
                  pe = te.nextSibling,
                  ne = pe.nextSibling;
                return (
                  n(
                    oe,
                    (() => {
                      var ue = Q(() => f().length <= 0);
                      return () => ue() && Tt();
                    })(),
                    pe
                  ),
                  n(
                    pe,
                    o(ie, {
                      get each() {
                        return f();
                      },
                      children: (ue) => {
                        if (ue.content.type === "dynamicInput")
                          return (() => {
                            var ce = to(),
                              B = ce.firstChild,
                              ve = B.nextSibling;
                            return (
                              (B.$$click = () => {
                                const re = f().filter(
                                  (he) => he.value !== ue.value
                                );
                                h(re), b([...x(), ue]);
                              }),
                              n(B, o(fe, {})),
                              n(
                                ve,
                                o(se, {
                                  get name() {
                                    return ue.content.name;
                                  },
                                  get title() {
                                    return ue.content.title;
                                  },
                                  get placeholder() {
                                    return ue.content.placeholder;
                                  },
                                  get toolTipText() {
                                    return ue.content.toolTipText;
                                  },
                                  isArrow: !0,
                                })
                              ),
                              ce
                            );
                          })();
                        if (ue.content.type === "switch")
                          return (() => {
                            var ce = to(),
                              B = ce.firstChild,
                              ve = B.nextSibling;
                            return (
                              (B.$$click = () => {
                                const re = f().filter(
                                  (he) => he.value !== ue.value
                                );
                                h(re), b([...x(), ue]);
                              }),
                              n(B, o(fe, {})),
                              n(
                                ve,
                                o(Ee, {
                                  get title() {
                                    return ue.content.title ?? "";
                                  },
                                  get toolTipText() {
                                    return ue.content.toolTipText;
                                  },
                                  get name() {
                                    return ue.content.name;
                                  },
                                })
                              ),
                              ce
                            );
                          })();
                      },
                    })
                  ),
                  n(
                    ne,
                    o(Le, {
                      name: "optionsForSendOperation",
                      placeholder: "Add option",
                      dropdownOptions: x,
                      setDropdownOptions: b,
                      selectedOptions: f,
                      setSelectedOptions: h,
                      onChange: (ue) => {
                        h(ue);
                      },
                    })
                  ),
                  oe
                );
              })(),
            ];
          },
        }),
        null
      ),
      n(
        ae,
        o(J, {
          get when() {
            return a().value === "sendAndWaitForResponse";
          },
          get children() {
            return [
              o(it, { name: "message", title: "Message" }),
              o(Ie, {
                name: "responseType",
                title: "Response Type",
                options: mn,
                get defaultValue() {
                  return mn[0].value;
                },
                onChange: (oe) => {
                  u(oe);
                },
              }),
              (() => {
                var oe = fn();
                return (
                  n(
                    oe,
                    o(J, {
                      get when() {
                        return p().value === "Approval";
                      },
                      get children() {
                        return [
                          (() => {
                            var te = xd(),
                              pe = te.firstChild,
                              ne = pe.nextSibling,
                              ue = ne.nextSibling;
                            return (
                              n(
                                te,
                                (() => {
                                  var ce = Q(() => !m());
                                  return () => ce() && Tt();
                                })(),
                                ne
                              ),
                              n(
                                ne,
                                o(Qt, {
                                  onClick: () => g(!0),
                                  title: "Add Option",
                                  width: "w-full",
                                })
                              ),
                              n(
                                ue,
                                o(J, {
                                  get when() {
                                    return m();
                                  },
                                  get children() {
                                    var ce = Qn(),
                                      B = ce.firstChild,
                                      ve = B.nextSibling;
                                    return (
                                      (B.$$click = () => {
                                        g(!1), O(wt[0]);
                                      }),
                                      n(B, o(fe, {})),
                                      n(
                                        ve,
                                        o(Ie, {
                                          name: "typeOfApproval",
                                          title: "Type of Approval",
                                          options: wt,
                                          get defaultValue() {
                                            return wt[0].value;
                                          },
                                          onChange: (re) => {
                                            O(re);
                                          },
                                        }),
                                        null
                                      ),
                                      n(
                                        ve,
                                        o(se, {
                                          name: "approveButtonLabel",
                                          title: "Approve Button Label",
                                          value: "Approve",
                                        }),
                                        null
                                      ),
                                      n(
                                        ve,
                                        o(Se, {
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
                                      n(
                                        ve,
                                        o(J, {
                                          get when() {
                                            return (
                                              w().value ===
                                              "approvedAndDisapproved"
                                            );
                                          },
                                          get children() {
                                            return [
                                              o(se, {
                                                name: "disapproveButtonLabel",
                                                title:
                                                  "Disapprove Button Label",
                                                value: "Disapprove",
                                              }),
                                              o(Se, {
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
                                      ce
                                    );
                                  },
                                })
                              ),
                              q(() => V(ne, `${m() ? "hidden" : "mt-5"}`)),
                              te
                            );
                          })(),
                          (() => {
                            var te = yd(),
                              pe = te.firstChild,
                              ne = pe.nextSibling,
                              ue = ne.nextSibling;
                            return (
                              n(
                                te,
                                (() => {
                                  var ce = Q(() => !k());
                                  return () => ce() && Tt();
                                })(),
                                ne
                              ),
                              n(
                                ne,
                                o(Qt, {
                                  onClick: () => y(!0),
                                  title: "Add Option",
                                  width: "w-full",
                                })
                              ),
                              n(
                                ue,
                                o(J, {
                                  get when() {
                                    return k();
                                  },
                                  get children() {
                                    var ce = eo(),
                                      B = ce.firstChild,
                                      ve = B.nextSibling,
                                      re = ve.firstChild;
                                    return (
                                      (B.$$click = () => {
                                        y(!1), v(wt[0]);
                                      }),
                                      n(B, o(fe, {})),
                                      n(
                                        ve,
                                        o(Ie, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: $t,
                                          get defaultValue() {
                                            return $t[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (he) => {
                                            v(he);
                                          },
                                        }),
                                        re
                                      ),
                                      n(
                                        re,
                                        o(J, {
                                          get when() {
                                            return (
                                              E().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              o(se, {
                                                name: "amount",
                                                title: "Amount",
                                                value: 45,
                                                toolTipText:
                                                  "The time to wait.",
                                              }),
                                              o(Se, {
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
                                      n(
                                        re,
                                        o(J, {
                                          get when() {
                                            return (
                                              E().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return o(se, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      ce
                                    );
                                  },
                                })
                              ),
                              q(() => V(ne, `${k() ? "hidden" : "mt-5"}`)),
                              te
                            );
                          })(),
                        ];
                      },
                    })
                  ),
                  oe
                );
              })(),
              (() => {
                var oe = fn();
                return (
                  n(
                    oe,
                    o(J, {
                      get when() {
                        return p().value === "customForm";
                      },
                      get children() {
                        return [
                          o(Ie, {
                            name: "defineForm",
                            title: "Define Form",
                            options: vn,
                            get defaultValue() {
                              return vn[0].value;
                            },
                            onChange: (te) => {
                              N(te);
                            },
                          }),
                          o(J, {
                            get when() {
                              return F().value === "usingJSON";
                            },
                            get children() {
                              return o(Vt, {
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
                            var te = $d();
                            return (
                              n(
                                te,
                                o(J, {
                                  get when() {
                                    return F().value === "usingFieldBelow";
                                  },
                                  get children() {
                                    return [
                                      wd(),
                                      Q(
                                        () => Q(() => I().length <= 0)() && Tt()
                                      ),
                                      (() => {
                                        var pe = Zn();
                                        return (
                                          n(
                                            pe,
                                            o(ie, {
                                              get each() {
                                                return I();
                                              },
                                              children: (ne, ue) =>
                                                (() => {
                                                  var ce = Sd(),
                                                    B = ce.firstChild,
                                                    ve = B.firstChild,
                                                    re = ve.nextSibling,
                                                    he = B.nextSibling;
                                                  return (
                                                    n(ve, o(bt, {})),
                                                    (re.$$click = () => {
                                                      c(
                                                        I().filter(
                                                          (j, W) => j !== ne
                                                        )
                                                      );
                                                    }),
                                                    n(re, o(fe, {})),
                                                    n(
                                                      he,
                                                      o(Ie, {
                                                        name: "elementType",
                                                        title: "Element Type",
                                                        toolTipText:
                                                          "The type of field to add to the form",
                                                        options: Jn,
                                                        get defaultValue() {
                                                          return Jn[0].value;
                                                        },
                                                        onChange: (j) => {
                                                          T((W) => ({
                                                            ...W,
                                                            [ne]:
                                                              j.children || [],
                                                          }));
                                                        },
                                                      }),
                                                      null
                                                    ),
                                                    n(
                                                      he,
                                                      o(J, {
                                                        get when() {
                                                          return $()[ne];
                                                        },
                                                        get children() {
                                                          var j = Cd();
                                                          return (
                                                            n(
                                                              j,
                                                              o(ie, {
                                                                get each() {
                                                                  return $()[
                                                                    ne
                                                                  ];
                                                                },
                                                                children: (
                                                                  W
                                                                ) => {
                                                                  if (
                                                                    W.type ===
                                                                    "dynamicInput"
                                                                  )
                                                                    return o(
                                                                      se,
                                                                      {
                                                                        get name() {
                                                                          return `${ne}_${W.title}`;
                                                                        },
                                                                        get title() {
                                                                          return W.title;
                                                                        },
                                                                        get toolTipText() {
                                                                          return W.toolTipText;
                                                                        },
                                                                        get value() {
                                                                          return W.value;
                                                                        },
                                                                        get placeholder() {
                                                                          return W.placeholder;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    W.type ===
                                                                    "switch"
                                                                  )
                                                                    return o(
                                                                      Ee,
                                                                      {
                                                                        get name() {
                                                                          return `${ne}_${W.title}`;
                                                                        },
                                                                        get title() {
                                                                          return (
                                                                            W.title ??
                                                                            ""
                                                                          );
                                                                        },
                                                                        get toolTipText() {
                                                                          return W.toolTipText;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    W.type ===
                                                                    "textBlock"
                                                                  )
                                                                    return o(
                                                                      nn,
                                                                      {
                                                                        get children() {
                                                                          return W.placeholder;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    W.type ===
                                                                    "jsonEditor"
                                                                  )
                                                                    return o(
                                                                      Vt,
                                                                      {
                                                                        get name() {
                                                                          return `${ne}_${W.title}`;
                                                                        },
                                                                        get title() {
                                                                          return W.title;
                                                                        },
                                                                        get footNote() {
                                                                          return W.footNote;
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
                                                                    W.type ===
                                                                    "inputBlock"
                                                                  )
                                                                    return (() => {
                                                                      var M =
                                                                          Id(),
                                                                        R =
                                                                          M.firstChild,
                                                                        X =
                                                                          R.nextSibling;
                                                                      return (
                                                                        n(
                                                                          X,
                                                                          o(
                                                                            ie,
                                                                            {
                                                                              get each() {
                                                                                return C()[
                                                                                  ne
                                                                                ];
                                                                              },
                                                                              children:
                                                                                (
                                                                                  S,
                                                                                  z
                                                                                ) =>
                                                                                  (() => {
                                                                                    var L =
                                                                                        Ed(),
                                                                                      G =
                                                                                        L.firstChild,
                                                                                      U =
                                                                                        G.firstChild,
                                                                                      Y =
                                                                                        U.nextSibling,
                                                                                      Z =
                                                                                        G.nextSibling;
                                                                                    return (
                                                                                      n(
                                                                                        U,
                                                                                        o(
                                                                                          bt,
                                                                                          {}
                                                                                        )
                                                                                      ),
                                                                                      (Y.$$click =
                                                                                        () => {
                                                                                          A(
                                                                                            (
                                                                                              de
                                                                                            ) => ({
                                                                                              ...de,
                                                                                              [ne]: de[
                                                                                                ne
                                                                                              ].filter(
                                                                                                (
                                                                                                  le
                                                                                                ) =>
                                                                                                  le !==
                                                                                                  S
                                                                                              ),
                                                                                            })
                                                                                          );
                                                                                        }),
                                                                                      n(
                                                                                        Y,
                                                                                        o(
                                                                                          fe,
                                                                                          {}
                                                                                        )
                                                                                      ),
                                                                                      n(
                                                                                        Z,
                                                                                        o(
                                                                                          se,
                                                                                          {
                                                                                            get name() {
                                                                                              return `${ne}_${W.name}_${S}`;
                                                                                            },
                                                                                            title:
                                                                                              "Option",
                                                                                          }
                                                                                        )
                                                                                      ),
                                                                                      q(
                                                                                        () =>
                                                                                          V(
                                                                                            L,
                                                                                            `flex gap-1.5 ${
                                                                                              z() !==
                                                                                              0
                                                                                                ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                : ""
                                                                                            }`
                                                                                          )
                                                                                      ),
                                                                                      L
                                                                                    );
                                                                                  })(),
                                                                            }
                                                                          )
                                                                        ),
                                                                        n(
                                                                          M,
                                                                          o(
                                                                            rt,
                                                                            {
                                                                              label:
                                                                                "Add Field Option",
                                                                              onClick:
                                                                                () => {
                                                                                  A(
                                                                                    (
                                                                                      S
                                                                                    ) => ({
                                                                                      ...S,
                                                                                      [ne]: [
                                                                                        ...(S[
                                                                                          ne
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
                                                                        M
                                                                      );
                                                                    })();
                                                                },
                                                              })
                                                            ),
                                                            j
                                                          );
                                                        },
                                                      }),
                                                      null
                                                    ),
                                                    q(() =>
                                                      V(
                                                        ce,
                                                        `flex gap-1.5 ${
                                                          ue() !== 0
                                                            ? "border-t pt-6 border-dashed border-[#575555]"
                                                            : ""
                                                        }`
                                                      )
                                                    ),
                                                    ce
                                                  );
                                                })(),
                                            })
                                          ),
                                          pe
                                        );
                                      })(),
                                      o(rt, {
                                        label: "Add Form Element",
                                        onClick: () => {
                                          c([
                                            ...I(),
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
                              te
                            );
                          })(),
                        ];
                      },
                    })
                  ),
                  oe
                );
              })(),
              (() => {
                var oe = fn();
                return (
                  n(
                    oe,
                    o(J, {
                      get when() {
                        return (
                          p().value === "freeText" || p().value === "customForm"
                        );
                      },
                      get children() {
                        return [
                          (() => {
                            var te = _d();
                            return (
                              te.firstChild,
                              n(
                                te,
                                (() => {
                                  var pe = Q(() => f().length <= 0);
                                  return () => pe() && Tt();
                                })(),
                                null
                              ),
                              te
                            );
                          })(),
                          o(ie, {
                            get each() {
                              return f();
                            },
                            children: (te) => {
                              if (te.content.type === "dynamicInput")
                                return (() => {
                                  var pe = Qn(),
                                    ne = pe.firstChild,
                                    ue = ne.nextSibling;
                                  return (
                                    (ne.$$click = () => {
                                      const ce = f().filter(
                                        (B) => B.value !== te.value
                                      );
                                      h(ce), b([...x(), te]);
                                    }),
                                    n(ne, o(fe, {})),
                                    n(
                                      ue,
                                      o(se, {
                                        get name() {
                                          return te.content.name;
                                        },
                                        get title() {
                                          return te.content.title;
                                        },
                                        get toolTipText() {
                                          return te.content.toolTipText;
                                        },
                                      })
                                    ),
                                    pe
                                  );
                                })();
                              if (te.content.type === "reproductiveDropDown")
                                return (() => {
                                  var pe = eo(),
                                    ne = pe.firstChild,
                                    ue = ne.nextSibling,
                                    ce = ue.firstChild;
                                  return (
                                    (ne.$$click = () => {
                                      const B = f().filter(
                                        (ve) => ve.value !== te.value
                                      );
                                      h(B), b([...x(), te]);
                                    }),
                                    n(ne, o(fe, {})),
                                    n(
                                      ue,
                                      o(Ie, {
                                        name: "limitType",
                                        title: "Limit Type",
                                        options: $t,
                                        get defaultValue() {
                                          return $t[0].value;
                                        },
                                        toolTipText:
                                          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                        onChange: (B) => {
                                          v(B);
                                        },
                                      }),
                                      ce
                                    ),
                                    n(
                                      ce,
                                      o(J, {
                                        get when() {
                                          return (
                                            E().value === "afterTimeInterval"
                                          );
                                        },
                                        get children() {
                                          return [
                                            o(se, {
                                              name: "amount",
                                              title: "Amount",
                                              value: 45,
                                              toolTipText: "The time to wait.",
                                            }),
                                            o(Se, {
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
                                    n(
                                      ce,
                                      o(J, {
                                        get when() {
                                          return (
                                            E().value === "atSpecifiedTime"
                                          );
                                        },
                                        get children() {
                                          return o(se, {
                                            title: "Max Date and Time",
                                            name: "maxDateAndTime",
                                            toolTipText:
                                              "Continue execution after the specified date and time",
                                          });
                                        },
                                      }),
                                      null
                                    ),
                                    pe
                                  );
                                })();
                            },
                          }),
                          o(Le, {
                            name: "Option",
                            dropdownOptions: x,
                            setDropdownOptions: b,
                            selectedOptions: f,
                            setSelectedOptions: h,
                            placeholder: "Add Options",
                            onChange: (te) => {
                              h(te);
                            },
                          }),
                        ];
                      },
                    })
                  ),
                  oe
                );
              })(),
            ];
          },
        }),
        null
      ),
      H
    );
  })();
};
be(["click"]);
const Xl = [
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
  Nn = [
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
    ...Xl,
  ],
  en = [
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
  no = [
    { label: "𝔸  String", value: "String" },
    { label: "#  Number", value: "Number" },
    { label: "🗹  Boolean", value: "Boolean" },
    { label: "⊞  Array", value: "Array" },
    { label: "{.}  Object", value: "Object" },
  ],
  Ut = (e, t) => {
    const { nodes: r } = me(),
      s = (d) => {
        const [i, l] = D(1);
        return Object.values(
          Object.entries(d)
            .filter(([p, u]) => p.startsWith("field_"))
            .reduce((p, u) => {
              const [m, g] = u,
                w = m.split("_"),
                O = `${w[0]}_${w[1]}`,
                k = w[2];
              return (
                (p[O] ??= {}),
                p[O].id || ((p[O].id = i()), l((y) => y + 1)),
                k === "name"
                  ? (p[O].name = g)
                  : k === "value"
                  ? (p[O].value = g)
                  : k === "type" && (p[O].type = g),
                p
              );
            }, {})
        );
      },
      a = () => {
        const d = r().find((i) => i.id === t);
        if (d) return d.currPosition.get();
      };
    return {
      id: t,
      name: "Edit Fields",
      description: "Modify,add,or remove item fields.",
      type: "EditNode",
      parameter: {
        mode: e?.mode,
        assignment: s(e),
        position: a(),
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
    };
  },
  Dd = (e) => {
    if (e) {
      const { parameter: t } = e,
        r = t?.assignment,
        s = [],
        a = {};
      return (
        r &&
          r.forEach((d) => {
            const i = `field_${Math.random().toString(36).substring(2, 8)}`;
            s.push(i),
              console.log(d),
              "name" in d && (a[`${i}_name`] = d.name),
              "value" in d && (a[`${i}_value`] = d.value),
              "type" in d && (a[`${i}_type`] = d.type);
          }),
        { mode: e?.parameter?.mode, field: s, fieldData: a }
      );
    }
  };
function Nd() {
  const { formData: e, setFormData: t, currentFormConfig: r } = me(),
    [s, a] = D(en[0].value),
    [d, i] = D([]),
    [l, p] = D([]),
    [u, m] = D([]),
    [g, w] = D({}),
    [O, k] = D({}),
    [y, E] = D(""),
    v = new Set(),
    x = () => {
      m(Nn), p([]), i([]), a(en[0].value), w({}), k({});
    },
    b = (h, F) => {
      if (
        (console.log("from data handler raw >>>> ", h, " >>>>> ", F),
        console.log("before check: previous data from dataHandler", O()),
        h in O())
      ) {
        if (O()[h] === F) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            g()
          ),
            w((N) => ({ ...N, [h]: F })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              g()
            );
          return;
        } else if (O()[h] !== F) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            O()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              g()
            ),
            w((I) => ({ ...I, [h]: F })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              g()
            );
          const N = Ut(g(), r().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            N
          ),
            t({ ...e(), [r().id]: N }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", O()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            g()
          ),
          w((I) => ({ ...I, [h]: F })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            g()
          );
        const N = Ut(g(), r().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          N
        ),
          t({ ...e(), [r().id]: N }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    f = (h) => {
      console.log("from data remover raw >>>> ", h, " >>>>>> "),
        w((N) =>
          Object.entries(N).reduce(
            (I, [c, $]) => (c.includes(h) || (I[c] = $), I),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", g());
      const F = Ut(g(), r().id);
      console.log("from data remover >>>>> formattedPrev", F),
        t({ ...e(), [r().id]: F }),
        console.log("from data remover >>> form data", e());
    };
  return (
    De(() => {
      if (
        (console.log(
          r().id,
          "  >  node data  >  ",
          `
`,
          l()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(O(), "from outside"),
        !v.has(r().id))
      ) {
        v.clear(), v.add(r().id), E(r().id);
        const h = e()[r().id];
        if ((console.log("data1", h), x(), !h)) return;
        console.log("data2", h);
        const F = Dd(h);
        F &&
          (console.log(
            "decoded from observer, >>>>>> ",
            r().id,
            F.field,
            F.fieldData
          ),
          k((N) => ({ ...N, mode: F.mode, ...F.fieldData })),
          console.log(O(), "from inside"),
          console.log(F.fieldData, "from inside createEffect"),
          i(F.field ?? []),
          a(F.mode ?? ""));
      }
    }),
    {
      selectedOptions: l,
      setSelectedOptions: p,
      submittedData: g,
      dataInsertHandler: b,
      options: u,
      setOptions: m,
      previousData: O,
      setPreviousData: k,
      setSubmittedData: w,
      dataRemoveHandler: f,
      currentMode: s,
      setCurrentMode: a,
      field: d,
      setField: i,
      reset: x,
      uniqueKey: y,
    }
  );
}
var Ad = _('<div class="label hr-solid-line">Fields to Set'),
  kd = _('<div class="flex flex-col gap-6 mt-5">'),
  Md = _(
    "<div><p class=text-[#ddd5d5]>Drag input fields here </p><p class=text-[#9b9494]>or</p><p class=text-[#df4c38]>Add Field"
  ),
  Pd = _(
    '<form class=form id=editForm><div><div class=mt-5><div class=mt-5></div><div class=mt-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  Ld = _(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[130px]></div></div><div>'
  ),
  Vd = _(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const Fd = (e) => {
  const {
      formData: t,
      setFormData: r,
      currentFormConfig: s,
      isModalOpen: a,
    } = me(),
    {
      setOptions: d,
      currentMode: i,
      setSelectedOptions: l,
      setCurrentMode: p,
      field: u,
      setField: m,
      previousData: g,
      selectedOptions: w,
      options: O,
      dataInsertHandler: k,
      uniqueKey: y,
      dataRemoveHandler: E,
    } = Nd();
  Oe(() => {
    d(Nn);
  }),
    De(() => {
      i() === "Manual Mapping" ? (l([]), d(Nn)) : (l([]), d(Xl));
    });
  const v = (b) => {
      b.preventDefault();
      const f = new FormData(b.target);
      let h = Object.fromEntries(f.entries());
      console.log("unformatted data", h);
      const F = Ut(h, s().id);
      console.log("formatted data", F), r({ ...t(), EditNodeData: h });
      const N = new CustomEvent("formSubmitEvent", { detail: h, bubbles: !0 }),
        I = document.getElementById("submitBtn");
      I && I.dispatchEvent(N);
    },
    x = (b) => g()[b];
  return (() => {
    var b = Pd(),
      f = b.firstChild,
      h = f.firstChild,
      F = h.firstChild,
      N = F.nextSibling,
      I = N.nextSibling,
      c = I.firstChild,
      $ = c.nextSibling,
      T = $.nextSibling;
    return (
      b.addEventListener("submit", v),
      n(
        f,
        o(Se, {
          name: "mode",
          title: "Mode",
          get uniqueKey() {
            return y();
          },
          options: en,
          get defaultValue() {
            return x("mode") || en[0].value;
          },
          onChange: (C) => {
            p(C.value), k("mode", C.value), console.log("mode setting done");
          },
        }),
        h
      ),
      n(
        h,
        o(J, {
          get when() {
            return i() === "Manual Mapping";
          },
          get children() {
            return [
              Ad(),
              (() => {
                var C = kd();
                return (
                  n(
                    C,
                    o(ie, {
                      get each() {
                        return u();
                      },
                      children: (A, P) =>
                        (() => {
                          var H = Ld(),
                            K = H.firstChild,
                            ae = K.firstChild,
                            oe = ae.nextSibling,
                            te = K.nextSibling,
                            pe = te.firstChild,
                            ne = pe.firstChild,
                            ue = ne.nextSibling,
                            ce = pe.nextSibling;
                          return (
                            n(ae, o(bt, {})),
                            (oe.$$click = () => {
                              m(u().filter((B, ve) => B !== A)), E(A);
                            }),
                            n(oe, o(fe, {})),
                            n(
                              ne,
                              o(se, {
                                placeholder: "name",
                                name: `${A}_name`,
                                get value() {
                                  return x(`${A}_name`) || "";
                                },
                                isArrow: !0,
                                onInput: (B) => {
                                  k(`${A}_name`, B);
                                },
                              })
                            ),
                            n(
                              ue,
                              o(Se, {
                                name: `${A}_type`,
                                uniqueKey: `${A}_type`,
                                options: no,
                                get defaultValue() {
                                  return x(`${A}_type`) || no[0].value;
                                },
                                onChange: (B) => {
                                  k(`${A}_type`, B.value);
                                },
                              })
                            ),
                            n(
                              ce,
                              o(se, {
                                placeholder: "value",
                                name: `${A}_value`,
                                get value() {
                                  return x(`${A}_value`) || "";
                                },
                                isArrow: !0,
                                onInput: (B) => {
                                  k(`${A}_value`, B);
                                },
                              })
                            ),
                            q(() =>
                              V(
                                H,
                                `flex gap-1.5 ${
                                  P() !== 0
                                    ? "border-t pt-6 border-dashed border-[#575555]"
                                    : ""
                                }`
                              )
                            ),
                            H
                          );
                        })(),
                    })
                  ),
                  C
                );
              })(),
              (() => {
                var C = Md();
                return (
                  (C.$$click = () => {
                    m([
                      ...u(),
                      `field_${Math.random().toString(36).substring(2, 8)}`,
                    ]);
                  }),
                  q(() =>
                    V(
                      C,
                      `${
                        u().length <= 0 ? "h-44" : "h-14 mt-5 "
                      } p-4 flex text-center border border-dashed border-[#9c9c9e] rounded-md bg-[#252434] hover:border-[#ffa89d] hover:bg-[#fc7c6b13] cursor-pointer ${
                        u().length <= 0 ? "flex-col" : "flex col"
                      } items-center justify-center gap-1`
                    )
                  ),
                  C
                );
              })(),
            ];
          },
        }),
        F
      ),
      n(
        F,
        o(J, {
          get when() {
            return i() === "JSON";
          },
          get children() {
            return o(Vt, {
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
              onInput: (C) => {
                k("json_editor", C);
              },
            });
          },
        })
      ),
      n(
        N,
        o(Ee, {
          get uniqueKey() {
            return y();
          },
          get checked() {
            return g().includeOtherInputFields;
          },
          name: "includeOtherInputFields",
          title: "Include Other Input Fields",
          toolTipText:
            "Whether to pass to the output all the input fields (along with the fields set in 'Fields to Set')",
          onChange: (C) => {},
        })
      ),
      n(
        $,
        o(ie, {
          get each() {
            return w();
          },
          children: (C, A) =>
            (() => {
              var P = Vd(),
                H = P.firstChild,
                K = H.nextSibling;
              return (
                (H.$$click = () => {
                  l(w().filter((ae) => ae !== C)), d([...O(), C]);
                }),
                n(H, o(fe, {})),
                n(
                  K,
                  o(Ee, {
                    get uniqueKey() {
                      return `${s().id}_${C.content.name}`;
                    },
                    get checked() {
                      return g()[C.content.name];
                    },
                    get title() {
                      return C.content.title ?? "";
                    },
                    get toolTipText() {
                      return C.content.toolTipText ?? "";
                    },
                    get name() {
                      return C.content.name;
                    },
                    onChange: (ae) => {
                      k("includeOtherInputFields", ae);
                    },
                  })
                ),
                P
              );
            })(),
        })
      ),
      n(
        T,
        o(Le, {
          name: "options_edit_node",
          selectedOptions: w,
          setSelectedOptions: l,
          dropdownOptions: O,
          setDropdownOptions: d,
          placeholder: "Add options",
          onChange: (C) => {},
        })
      ),
      q(() => V(T, `${w().length <= 0 ? "" : "mt-5"}`)),
      b
    );
  })();
};
be(["click"]);
const Bd = [
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
  gn = [
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
  oo = [
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
var Rd = _("<div class=nested-header><span class=chevron-left>❮"),
  zd = _(
    '<div class=custom-select><select title="native select for multi-steps dropdown"class=hidden-select></select><div title="custom select button"class=select-selected aria-haspopup=listbox aria-expanded=false role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  lo = _("<option>"),
  Hd = _("<div class=parent-option role=option aria-selected=false>"),
  Wd = _("<span class=chevron-right>❯"),
  qd = _("<div class=child-option role=option aria-selected=false>");
const jd = (e) => {
  const [t, r] = D(!1),
    [s, a] = D(e.options[0]),
    [d, i] = D("Select an option"),
    [l, p] = D("main"),
    [u, m] = D(null);
  let g, w;
  const O = () => {
      if (e.defaultValue) {
        const f = e.options.find((h) => h.value === e.defaultValue);
        f && (a(f), i(f.label), e.onChange?.(f)),
          e.placeholder && i(e.placeholder);
      }
    },
    k = (f) => {
      g && !g.contains(f.target) && (r(!1), p("main"));
    },
    y = () => {
      r(!1), p("main");
    };
  Oe(() => {
    O(),
      document.addEventListener("mousedown", k),
      document.addEventListener("touchstart", k, { passive: !0 }),
      window.addEventListener("resize", y),
      window.addEventListener("blur", y);
  }),
    Me(() => {
      document.removeEventListener("mousedown", k),
        document.removeEventListener("touchstart", k),
        window.removeEventListener("resize", y),
        window.removeEventListener("blur", y);
    });
  const E = (f) => {
      f.stopPropagation(), r(!t()), t() || p("main");
    },
    v = (f) => {
      m(f), p(f.value);
    },
    x = (f) => {
      a(f), i(f.label), r(!1), p("main"), g && g.focus();
    },
    b = () => {
      p("main");
    };
  return (() => {
    var f = zd(),
      h = f.firstChild,
      F = h.nextSibling,
      N = F.nextSibling,
      I = g;
    typeof I == "function" ? we(I, f) : (g = f),
      n(
        h,
        o(ie, {
          get each() {
            return e.options;
          },
          children: ($) => [
            (() => {
              var T = lo();
              return (
                n(T, () => $.label),
                q(() => (T.selected = $.value === s().value)),
                q(() => (T.value = $.value)),
                T
              );
            })(),
            Q(
              () =>
                Q(() => !!$.children)() &&
                o(ie, {
                  get each() {
                    return $.children;
                  },
                  children: (T) =>
                    (() => {
                      var C = lo();
                      return (
                        n(C, () => T.label),
                        q(() => (C.selected = T.value === s().value)),
                        q(() => (C.value = T.value)),
                        C
                      );
                    })(),
                })
            ),
          ],
        })
      ),
      Be(F, "click", e.disabled ? void 0 : E),
      n(F, d);
    var c = w;
    return (
      typeof c == "function" ? we(c, N) : (w = N),
      n(
        N,
        o(J, {
          get when() {
            return l() === "main";
          },
          get children() {
            return o(ie, {
              get each() {
                return e.options;
              },
              children: ($) =>
                (() => {
                  var T = Hd();
                  return (
                    (T.$$click = () => ($.children ? v($) : x($))),
                    n(T, () => $.label, null),
                    n(
                      T,
                      (() => {
                        var C = Q(() => !!$.children);
                        return () => C() && Wd();
                      })(),
                      null
                    ),
                    q(
                      (C) => {
                        var A = $.value === s().value,
                          P = $.value === s().value,
                          H = t() ? 0 : -1;
                        return (
                          A !== C.e &&
                            T.classList.toggle("selected", (C.e = A)),
                          P !== C.t &&
                            T.classList.toggle("aria-selected-true", (C.t = P)),
                          H !== C.a && ee(T, "tabindex", (C.a = H)),
                          C
                        );
                      },
                      { e: void 0, t: void 0, a: void 0 }
                    ),
                    T
                  );
                })(),
            });
          },
        }),
        null
      ),
      n(
        N,
        o(J, {
          get when() {
            return l() !== "main";
          },
          get children() {
            return [
              (() => {
                var $ = Rd();
                return (
                  $.firstChild,
                  ($.$$click = b),
                  n($, () => e.categoryLabel || "", null),
                  $
                );
              })(),
              o(ie, {
                get each() {
                  return u()?.children || [];
                },
                children: ($) =>
                  (() => {
                    var T = qd();
                    return (
                      (T.$$click = () => x($)),
                      n(T, () => $.label),
                      q(
                        (C) => {
                          var A = $.value === s().value,
                            P = $.value === s().value,
                            H = t() ? 0 : -1;
                          return (
                            A !== C.e &&
                              T.classList.toggle("selected", (C.e = A)),
                            P !== C.t &&
                              T.classList.toggle(
                                "aria-selected-true",
                                (C.t = P)
                              ),
                            H !== C.a && ee(T, "tabindex", (C.a = H)),
                            C
                          );
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      T
                    );
                  })(),
              }),
            ];
          },
        }),
        null
      ),
      q(
        ($) => {
          var T = e.name,
            C = e.required,
            A = e.disabled,
            P = !!t(),
            H = !!e.disabled,
            K = !!t(),
            ae = e.disabled ? -1 : 0,
            oe = `select-items ${t() ? "select-show" : "select-hide"}`;
          return (
            T !== $.e && ee(h, "name", ($.e = T)),
            C !== $.t && (h.required = $.t = C),
            A !== $.a && (h.disabled = $.a = A),
            P !== $.o && F.classList.toggle("active", ($.o = P)),
            H !== $.i && F.classList.toggle("disabled", ($.i = H)),
            K !== $.n && F.classList.toggle("aria-expanded-true", ($.n = K)),
            ae !== $.s && ee(F, "tabindex", ($.s = ae)),
            oe !== $.h && V(N, ($.h = oe)),
            $
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
      f
    );
  })();
};
be(["click"]);
const Yl = (e, t) => ({
    id: "switchNode1",
    name: "Switch",
    description: "Route items depending on defined expression or rules.",
    type: "SwitchNode",
    parameters: {
      rules: ((s) => {
        const [a, d] = D(1);
        return Object.values(
          Object.entries(s)
            .filter(([i, l]) => i.startsWith("rule_"))
            .reduce((i, [l, p]) => {
              const u = l.split("_"),
                m = `${u[0]}_${u[1]}`,
                g = u[2];
              return (
                (i[m] ??= {}),
                i[m].id || ((i[m].id = a()), d((w) => w + 1)),
                g === "name"
                  ? (i[m].leftValue = p)
                  : g === "value"
                  ? (i[m].rightValue = p)
                  : g === "type"
                  ? (i[m].type = p)
                  : g === "isRename"
                  ? (i[m].renameOutput = p)
                  : g === "renameOutput" && (i[m].outputKey = p),
                i
              );
            }, {})
        );
      })(e),
    },
    position: { x: -340, y: -1040 },
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
  }),
  [Ud, Gd] = D({}),
  { currentFormConfig: Xd, setFormData: Yd, formData: ro } = me(),
  Ve = (e, t, r) => {
    Gd((a) => ({ ...a, [e]: t }));
    const s = Yl(Ud(), Xd().id);
    Yd({ ...ro(), switchNode: s }), console.log(ro());
  };
var Kd = _("<div class=mt-5>"),
  Jd = _('<div class="label hr-solid-line">Routing Rules'),
  Zd = _('<div class=mt-5><div class="flex flex-col gap-8">'),
  Qd = _(
    '<div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  ec = _("<div class=space-y-5><div></div><div>"),
  tc = _("<form id=switchForm><div><div class=mt-5>"),
  nc = _(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  oc = _(
    '<div class="text-[#7c81ca] text-xs bg-[#504f7e] p-1 w-4 h-4 font-[900] rounded-full flex items-center justify-center">'
  ),
  lc = _("<div class=mt-4>"),
  rc = _(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5 items-start"><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[170px]></div></div><div></div></div><div class="mt-3 select-none"></div></div><div class=mt-5>'
  ),
  io = _(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const ao = () =>
    (() => {
      var e = Kd();
      return (
        n(
          e,
          o(Ee, {
            name: "convertTypeWhereRequired",
            title: "Convert Type Where Required",
            toolTipText: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`,
            onChange: (t) => {
              Ve("convertTypeWhereRequired", t);
            },
          })
        ),
        e
      );
    })(),
  ic = (e) => {
    const {
        nodes: t,
        setNodes: r,
        currentFormConfig: s,
        formData: a,
        setFormData: d,
      } = me(),
      [i, l] = D(gn[0]),
      [p, u] = D([]),
      [m, g] = D([]),
      [w, O] = D([]),
      [k, y] = D({}),
      [E, v] = D({}),
      x = (c) => {
        r(
          t().map(($) =>
            $.id === s().id
              ? {
                  ...$,
                  outputVertexIds: [...$.outputVertexIds, c],
                  numberOutputs: p().length,
                }
              : $
          )
        );
      },
      b = (c) => {
        r(
          t().map(($) =>
            $.id === s().id
              ? {
                  ...$,
                  outputVertexIds: [
                    ...$.outputVertexIds.filter((T) => T !== c),
                  ],
                  numberOutputs: p().length,
                }
              : $
          )
        );
      },
      [f, h] = D({}),
      F = (c, $, T) => {
        v((C) => ({ ...C, [c]: { ...C[c], [$]: T } })),
          E()[c] &&
            (E()[c].name === E()[c].value
              ? h({ ...f(), [c]: !0 })
              : h({ ...f(), [c]: !1 }));
      },
      N = () => {
        const c = `rule_${Math.random().toString(36).substring(2, 8)}`;
        u(($) => [
          ...$,
          {
            fieldId: c,
            vertexId:
              t().find((T) => T.id === s().id)?.outputVertexIds[0] || "",
          },
        ]),
          y({ ...k(), [c]: !1 }),
          h({ ...f(), [c]: !0 });
      };
    Oe(() => {
      O(Bd), N();
    });
    const I = (c) => {
      c.preventDefault();
      const $ = new FormData(c.target);
      let T = Object.fromEntries($.entries());
      const C = Yl(T, s().id);
      d({ ...a(), switchNode: C });
      const A = new CustomEvent("formSubmitEvent", { detail: T, bubbles: !0 }),
        P = document.getElementById("submitBtn");
      P && P.dispatchEvent(A);
    };
    return (() => {
      var c = tc(),
        $ = c.firstChild,
        T = $.firstChild;
      return (
        c.addEventListener("submit", I),
        n(
          $,
          o(Se, {
            name: "mode",
            title: "Mode",
            options: gn,
            get defaultValue() {
              return gn[0].value;
            },
            onChange: (C) => {
              l(C), Ve("mode", C);
            },
          }),
          T
        ),
        n(
          T,
          o(J, {
            get when() {
              return i().value === "Rules";
            },
            get children() {
              return [
                Jd(),
                (() => {
                  var C = Zd(),
                    A = C.firstChild;
                  return (
                    n(
                      C,
                      (() => {
                        var P = Q(() => p().length <= 0);
                        return () => P() && nc();
                      })(),
                      A
                    ),
                    n(
                      A,
                      o(ie, {
                        get each() {
                          return p();
                        },
                        children: (P, H) =>
                          (() => {
                            var K = rc(),
                              ae = K.firstChild,
                              oe = ae.firstChild,
                              te = oe.nextSibling,
                              pe = ae.nextSibling,
                              ne = pe.firstChild,
                              ue = ne.firstChild,
                              ce = ue.firstChild,
                              B = ce.firstChild,
                              ve = B.nextSibling,
                              re = ce.nextSibling,
                              he = ue.nextSibling,
                              j = ne.nextSibling;
                            return (
                              n(oe, o(bt, {})),
                              (te.$$click = () => {
                                u(
                                  p().filter((W, M) => W.fieldId !== P.fieldId)
                                ),
                                  b(P.vertexId);
                              }),
                              n(te, o(fe, {})),
                              n(
                                B,
                                o(se, {
                                  placeholder: "name",
                                  get name() {
                                    return `${P.fieldId}_name`;
                                  },
                                  value: "",
                                  isArrow: !0,
                                  onInput: (W) => {
                                    F(P.fieldId, "name", W),
                                      Ve(`${P.fieldId}_name`, W);
                                  },
                                })
                              ),
                              n(
                                ve,
                                o(jd, {
                                  get name() {
                                    return `${P.fieldId}_type`;
                                  },
                                  options: oo,
                                  get defaultValue() {
                                    return oo[0].value;
                                  },
                                  categoryLabel: "Back to main",
                                  onChange: (W) => {
                                    console.log(W),
                                      Ve(`${P.fieldId}_type`, W.value);
                                  },
                                })
                              ),
                              n(
                                re,
                                o(se, {
                                  placeholder: "value",
                                  get name() {
                                    return `${P.fieldId}_value`;
                                  },
                                  value: "",
                                  isArrow: !0,
                                  onInput: (W) => {
                                    F(P.fieldId, "value", W),
                                      Ve(`${P.fieldId}_value`, W);
                                  },
                                })
                              ),
                              n(
                                he,
                                o(Re, {
                                  get content() {
                                    return `This condition is ${
                                      f()[P.fieldId]
                                    } for the first input item`;
                                  },
                                  get children() {
                                    var W = oc();
                                    return (
                                      n(
                                        W,
                                        o(J, {
                                          get when() {
                                            return f()[P.fieldId] === !0;
                                          },
                                          children: "✔",
                                        }),
                                        null
                                      ),
                                      n(
                                        W,
                                        o(J, {
                                          get when() {
                                            return f()[P.fieldId] === !1;
                                          },
                                          children: "✘",
                                        }),
                                        null
                                      ),
                                      W
                                    );
                                  },
                                })
                              ),
                              n(
                                j,
                                o(Ee, {
                                  title: "Rename Output",
                                  get name() {
                                    return `${P.fieldId}_isRename`;
                                  },
                                  onChange: (W) => {
                                    y({ ...k(), [P.fieldId]: W }),
                                      Ve(`${P.fieldId}_isRename`, W);
                                  },
                                })
                              ),
                              n(
                                pe,
                                o(J, {
                                  get when() {
                                    return k()[P.fieldId];
                                  },
                                  get children() {
                                    var W = lc();
                                    return (
                                      n(
                                        W,
                                        o(se, {
                                          get name() {
                                            return `${P.fieldId}_renameOutput`;
                                          },
                                          value: "",
                                          title: "Output Name",
                                          toolTipText:
                                            "The label of output to which to send data to if rule matches.",
                                          isArrow: !0,
                                          onInput: (M) => {
                                            Ve(`${P.fieldId}_renameOutput`, M);
                                          },
                                        })
                                      ),
                                      W
                                    );
                                  },
                                }),
                                null
                              ),
                              q(() =>
                                V(
                                  K,
                                  `flex gap-1.5 ${
                                    H() !== 0
                                      ? "border-t pt-8 border-dashed border-[#575555]"
                                      : ""
                                  }`
                                )
                              ),
                              K
                            );
                          })(),
                      })
                    ),
                    n(
                      C,
                      o(rt, {
                        onClick: () => {
                          const P = `rule_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`,
                            H = `vertex_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`;
                          u((K) => [...K, { fieldId: P, vertexId: H }]),
                            y({ ...k(), [P]: !1 }),
                            h({ ...f(), [P]: !0 }),
                            x(H);
                        },
                        label: "Add Pool Time",
                      }),
                      null
                    ),
                    C
                  );
                })(),
                o(ao, {}),
                (() => {
                  var C = Qd(),
                    A = C.firstChild,
                    P = A.nextSibling,
                    H = P.nextSibling;
                  return (
                    n(
                      P,
                      o(ie, {
                        get each() {
                          return m();
                        },
                        children: (K, ae) => {
                          if (K.content.type === "switch")
                            return (() => {
                              var oe = io(),
                                te = oe.firstChild,
                                pe = te.nextSibling;
                              return (
                                (te.$$click = () => {
                                  g(m().filter((ne) => ne !== K)),
                                    O([...w(), K]);
                                }),
                                n(te, o(fe, {})),
                                n(
                                  pe,
                                  o(Ee, {
                                    get title() {
                                      return K.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return K.content.toolTipText ?? "";
                                    },
                                    get name() {
                                      return K.content.name;
                                    },
                                    onChange: (ne) => {
                                      Ve(K.content.name, ne);
                                    },
                                  })
                                ),
                                oe
                              );
                            })();
                          if (K.content.type === "DropDownN")
                            return (() => {
                              var oe = io(),
                                te = oe.firstChild,
                                pe = te.nextSibling;
                              return (
                                (te.$$click = () => {
                                  g(m().filter((ne) => ne !== K)),
                                    O([...w(), K]);
                                }),
                                n(te, o(fe, {})),
                                n(
                                  pe,
                                  o(Se, {
                                    get name() {
                                      return K.content.name;
                                    },
                                    get title() {
                                      return K.content.title;
                                    },
                                    get toolTipText() {
                                      return K.content.toolTipText;
                                    },
                                    get options() {
                                      return K.content.options ?? [];
                                    },
                                    get defaultValue() {
                                      return K.content.options?.[0]?.value;
                                    },
                                    onChange: (ne) => {
                                      Ve(K.content.name, ne.value);
                                    },
                                  })
                                ),
                                oe
                              );
                            })();
                        },
                      })
                    ),
                    n(
                      H,
                      o(Le, {
                        name: "options_switch_node",
                        selectedOptions: m,
                        setSelectedOptions: g,
                        dropdownOptions: w,
                        setDropdownOptions: O,
                        placeholder: "Add options",
                        onChange: (K) => {},
                      })
                    ),
                    q(() => V(H, `${m().length <= 0 ? "" : "mt-5"}`)),
                    C
                  );
                })(),
              ];
            },
          }),
          null
        ),
        n(
          T,
          o(J, {
            get when() {
              return i().value === "Expression";
            },
            get children() {
              var C = ec(),
                A = C.firstChild,
                P = A.nextSibling;
              return (
                n(
                  A,
                  o(se, {
                    name: "numberOfOutputs",
                    title: "Number of Outputs",
                    toolTipText: "How many outputs to create",
                    value: 4,
                    onInput: (H) => {
                      Ve("numberOfOutputs", H);
                    },
                  })
                ),
                n(
                  P,
                  o(se, {
                    name: "outputIndex",
                    title: "Output Index",
                    placeholder: "{{}}",
                    footNote: "[ERROR: invalid syntax]",
                    toolTipText:
                      "The output index to send the input item to. Use an expression to calculate which input item should be routed to which output. The expression must return a number.",
                    isExpand: !0,
                    isArrow: !0,
                    onInput: (H) => {
                      Ve("outputIndex", H);
                    },
                  })
                ),
                n(C, o(ao, {}), null),
                C
              );
            },
          }),
          null
        ),
        c
      );
    })();
  };
be(["click"]);
const Kl = (e, t) => ({
    id: t,
    name: "Vector Store Tool",
    description: "vectore store tool customerSuppertDocs",
    type: "VectoreStoreTool",
    parameters: {
      name: e?.dataName,
      description: e?.dataDescription,
      limit: e?.limit,
    },
    position: { x: -14460, y: -360 },
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
  }),
  [ac, sc] = D({}),
  { currentFormConfig: so, formData: dc, setFormData: cc } = me(),
  bn = (e, t, r) => {
    sc((a) => ({ ...a, [e]: t }));
    const s = Kl(ac(), so().id);
    console.log(s), cc({ ...dc(), [so().id]: s });
  };
var uc = _("<form id=vector-storeForm><div class=space-y-6>");
const pc = (e) => {
    const { currentFormConfig: t, setFormData: r, formData: s } = me(),
      a = (d) => {
        d.preventDefault();
        const i = new FormData(d.target);
        let l = Object.fromEntries(i.entries());
        const p = Kl(l, t().id);
        r({ ...s(), [t().id]: p });
      };
    return (() => {
      var d = uc(),
        i = d.firstChild;
      return (
        d.addEventListener("submit", a),
        n(
          i,
          o(se, {
            name: "dataName",
            title: "Data Name",
            placeholder: "e.g. user_info",
            toolTipText:
              "Name of the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            isArrow: !0,
            onInput: (l) => {
              bn("dataName", l);
            },
          }),
          null
        ),
        n(
          i,
          o(it, {
            name: "dataDescription",
            title: "Description of Data",
            placeholder:
              "[describe your data here, e.g. a user's name, email e.t.c]",
            toolTipText:
              "Describe the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            onInput: (l) => {
              bn("dataDescription", l);
            },
          }),
          null
        ),
        n(
          i,
          o(se, {
            name: "limit",
            title: "Limit",
            toolTipText: "The maximum number of results to return",
            isArrow: !0,
            isExpand: !0,
            onInput: (l) => {
              bn("limit", l);
            },
          }),
          null
        ),
        d
      );
    })();
  },
  xn = [
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
          value: 10,
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
          value: 10,
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
  mc = [
    { title: "ID Column name", value: "id", name: "idColumnName" },
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
  co = [
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
        name: "collection",
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
  Jl = (e, t) => ({
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
      options: {
        distanceStrategy: e?.distanceStrategy,
        collection: {
          values: {
            useCollection: e?.collection,
            collectionName: "n8ns",
            collectionTableName: "n8n_vector_collectionss",
          },
        },
        columnNames: {
          values: {
            idColumnName: e?.idColumnName,
            vectorColumnName: e?.vectorColumnName,
            contentColumnName: e?.contentColumnName,
            metadataColumnName: e?.metadataColumnName,
          },
        },
      },
    },
    position: { x: -14560, y: -140 },
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
  }),
  [vc, hc] = D({}),
  { currentFormConfig: uo, formData: fc, setFormData: gc } = me(),
  Pe = (e, t, r) => {
    hc((a) => ({ ...a, [e]: t }));
    const s = Jl(vc(), uo().id);
    console.log(s), gc({ ...fc(), [uo().id]: s });
  };
var bc = _(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  xc = _('<a href=# class="font-semibold text-[#fe705a]">Insert one'),
  yc = _(
    '<form id=pg-vectorForm><div class=space-y-5><div class=space-y-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class=mt-5><div class=space-y-10></div><div class=mt-5>'
  ),
  wc = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class=flex-1>'
  ),
  $c = _(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Collection</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class=flex-1>'
  ),
  _c = _(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Column Names</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-5">'
  ),
  Tc = _(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Metadata Filter</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-10"><div class></div><div class>'
  ),
  Cc = _(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Sc = _('<div><div class="flex flex-col gap-5 w-full">');
const nt = ({ onClick: e }) =>
    (() => {
      var t = bc();
      return Be(t, "click", e), n(t, o(fe, {})), t;
    })(),
  Ic = (e) => {
    const { currentFormConfig: t, formData: r, setFormData: s } = me(),
      [a, d] = D(xn[0]),
      [i, l] = D([]),
      [p, u] = D([]),
      [m, g] = D([]);
    De(() => {
      a().value === "insertDocuments" ? l(co.slice(1, 3)) : l(co);
    });
    const w = (O) => {
      O.preventDefault();
      const k = new FormData(O.target);
      let y = Object.fromEntries(k.entries());
      const E = Jl(y, t().id);
      s({ ...r(), [t().id]: E });
    };
    return (() => {
      var O = yc(),
        k = O.firstChild,
        y = k.firstChild,
        E = y.nextSibling,
        v = E.firstChild,
        x = v.nextSibling,
        b = x.firstChild,
        f = b.nextSibling;
      return (
        O.addEventListener("submit", w),
        n(
          k,
          o(at, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          y
        ),
        n(
          y,
          o(Ie, {
            name: "operationMode",
            title: "Operation Mode",
            options: xn,
            get defaultValue() {
              return xn[0].value;
            },
            onChange: (h) => {
              d(h), Pe("operationMode", h);
            },
          }),
          null
        ),
        n(
          y,
          o(J, {
            get when() {
              return a().value === "retrieveDocumentsAsVectorStore";
            },
            get children() {
              return o(nn, {
                get children() {
                  return [
                    "This node must be connected to a vector store retriever.",
                    " ",
                    xc(),
                  ];
                },
              });
            },
          }),
          null
        ),
        n(
          y,
          o(J, {
            get when() {
              return a().value === "retrieveDocumentsAsTool";
            },
            get children() {
              return [
                o(se, {
                  name: "name",
                  title: "Name",
                  toolTipText: "Name of the vector store.",
                  placeholder: "e.g. company_knowledge_base",
                  isArrow: !0,
                  onInput: (h) => {
                    Pe("name", h);
                  },
                }),
                o(it, {
                  name: "description",
                  title: "Description",
                  toolTipText:
                    "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                  placeholder:
                    "e.g. work with your data in postgresql with the PgVector extension.",
                  onInput: (h) => {
                    Pe("description", h);
                  },
                }),
              ];
            },
          }),
          null
        ),
        n(
          y,
          o(se, {
            name: "tableName",
            title: "Table Name",
            toolTipText:
              "The table name to store the vectors in. If table does not exist, it will be created.",
            value: "repoRunner_vectors",
            isArrow: !0,
            onInput: (h) => {
              Pe("tableName", h);
            },
          }),
          null
        ),
        n(
          y,
          o(J, {
            get when() {
              return a().value === "getMany";
            },
            get children() {
              return o(se, {
                name: "limit",
                title: "Limit",
                toolTipText:
                  "Number of top results to fetch from vector store.",
                value: 4,
                onInput: (h) => {
                  Pe("limit", h);
                },
              });
            },
          }),
          null
        ),
        n(
          y,
          o(J, {
            get when() {
              return a().value === "getMany";
            },
            get children() {
              return o(se, {
                name: "prompt",
                title: "Prompt",
                toolTipText:
                  "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
                onInput: (h) => {
                  Pe("prompt", h);
                },
              });
            },
          }),
          null
        ),
        n(
          y,
          o(J, {
            get when() {
              return (
                a().value === "getMany" ||
                a().value === "retrieveDocumentsAsTool"
              );
            },
            get children() {
              return o(Ee, {
                name: "includeMetadata",
                title: "Include Metadata",
                toolTipText: "Whether or not to include document metadata.",
                onChange: (h) => {
                  Pe("includeMetadata", h);
                },
              });
            },
          }),
          null
        ),
        n(
          b,
          o(ie, {
            get each() {
              return p();
            },
            children: (h, F) => {
              if (h.value === "distanceStrategy")
                return (() => {
                  var N = wc(),
                    I = N.firstChild;
                  return (
                    n(
                      N,
                      o(nt, {
                        onClick: () => {
                          const c = p().filter(($) => $.value !== h.value);
                          u(c), l([...i(), h]);
                        },
                      }),
                      I
                    ),
                    n(
                      I,
                      o(Se, {
                        get name() {
                          return h.content.name;
                        },
                        get options() {
                          return h.content.options ?? [];
                        },
                        get defaultValue() {
                          return h.content.options?.[0]?.value;
                        },
                        get toolTipText() {
                          return h.content.toolTipText;
                        },
                        get title() {
                          return h.content.title;
                        },
                        onChange: (c) => {
                          Pe(h.content.name, c);
                        },
                      })
                    ),
                    N
                  );
                })();
              if (h.value === "collection")
                return (() => {
                  var N = $c(),
                    I = N.firstChild,
                    c = I.firstChild,
                    $ = c.firstChild,
                    T = $.nextSibling,
                    C = T.firstChild;
                  return (
                    n(
                      I,
                      o(nt, {
                        onClick: () => {
                          const A = p().filter((P) => P.value !== h.value);
                          u(A), l([...i(), h]);
                        },
                      }),
                      c
                    ),
                    n(
                      T,
                      o(nt, {
                        onClick: () => {
                          const A = p().filter((P) => P.value !== h.value);
                          u(A), l([...i(), h]);
                        },
                      }),
                      C
                    ),
                    n(
                      C,
                      o(Ee, {
                        get name() {
                          return h.content.name;
                        },
                        get title() {
                          return h.content.title ?? "";
                        },
                        onChange: (A) => {
                          Pe(h.content.name, A);
                        },
                      })
                    ),
                    N
                  );
                })();
              if (h.value === "columnNames")
                return (() => {
                  var N = _c(),
                    I = N.firstChild,
                    c = I.firstChild,
                    $ = c.firstChild,
                    T = $.nextSibling,
                    C = T.firstChild;
                  return (
                    n(
                      I,
                      o(nt, {
                        onClick: () => {
                          const A = p().filter((P) => P.value !== h.value);
                          u(A), l([...i(), h]);
                        },
                      }),
                      c
                    ),
                    n(
                      T,
                      o(nt, {
                        onClick: () => {
                          const A = p().filter((P) => P.value !== h.value);
                          u(A), l([...i(), h]);
                        },
                      }),
                      C
                    ),
                    n(
                      C,
                      o(ie, {
                        each: mc,
                        children: (A, P) =>
                          o(se, {
                            get name() {
                              return A.name;
                            },
                            get value() {
                              return A.value;
                            },
                            get title() {
                              return A.title;
                            },
                            isArrow: !0,
                            onInput: (H) => {
                              Pe(A.name, H);
                            },
                          }),
                      })
                    ),
                    N
                  );
                })();
              if (h.value === "metadataFilter")
                return (() => {
                  var N = Tc(),
                    I = N.firstChild,
                    c = I.firstChild,
                    $ = c.firstChild,
                    T = $.nextSibling,
                    C = T.firstChild,
                    A = C.firstChild,
                    P = A.nextSibling;
                  return (
                    n(
                      I,
                      o(nt, {
                        onClick: () => {
                          const H = p().filter((K) => K.value !== h.value);
                          u(H), l([...i(), h]);
                        },
                      }),
                      c
                    ),
                    n(
                      C,
                      (() => {
                        var H = Q(() => m().length <= 0);
                        return () => H() && Cc();
                      })(),
                      A
                    ),
                    n(
                      A,
                      o(ie, {
                        get each() {
                          return m();
                        },
                        children: (H, K) =>
                          (() => {
                            var ae = Sc(),
                              oe = ae.firstChild;
                            return (
                              n(
                                ae,
                                o(nt, {
                                  onClick: () => {
                                    g((te) => te.filter((pe) => pe !== H));
                                  },
                                }),
                                oe
                              ),
                              n(
                                oe,
                                o(se, {
                                  name: `${H}_name`,
                                  title: "Name",
                                  isArrow: !0,
                                  onInput: (te) => {
                                    Pe(`${H}_name`, te);
                                  },
                                }),
                                null
                              ),
                              n(
                                oe,
                                o(se, {
                                  name: `${H}value`,
                                  title: "Value",
                                  isArrow: !0,
                                  onInput: (te) => {
                                    Pe(`${H}value`, te);
                                  },
                                }),
                                null
                              ),
                              q(() =>
                                V(
                                  ae,
                                  `group flex items-start gap-1.5 w-full ${
                                    K() !== 0
                                      ? "border-t border-dashed border-[#727171] pt-8 mt-8"
                                      : ""
                                  }`
                                )
                              ),
                              ae
                            );
                          })(),
                      })
                    ),
                    n(
                      P,
                      o(rt, {
                        onClick: () => {
                          g([
                            ...m(),
                            `metadata_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`,
                          ]);
                        },
                        label: "Add Filter Field",
                      })
                    ),
                    N
                  );
                })();
            },
          })
        ),
        n(
          f,
          o(Le, {
            name: "options_edit_node",
            selectedOptions: p,
            setSelectedOptions: u,
            dropdownOptions: i,
            setDropdownOptions: l,
            placeholder: "Add options",
            onChange: (h) => {
              u(h);
            },
          })
        ),
        O
      );
    })();
  };
be(["click"]);
const po = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  Zl = (e, t) => ({
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
      model: "nomic-embed-text:latest",
    },
    position: { x: -14600, y: -100 },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "embeddings vector as output",
        description: "turn text into vectors",
        type: "object",
      },
    ],
  }),
  [Ec, Oc] = D({}),
  { currentFormConfig: mo, formData: Dc, setFormData: Nc } = me(),
  Ac = (e, t, r) => {
    Oc((a) => ({ ...a, [e]: t }));
    const s = Zl(Ec(), mo().id);
    console.log(s), Nc({ ...Dc(), [mo().id]: s });
  };
var kc = _("<form id=embeddingForm><div class=space-y-5>");
const Mc = (e) => {
    const { currentFormConfig: t, formData: r, setFormData: s } = me(),
      a = (d) => {
        d.preventDefault();
        const i = new FormData(d.target);
        let l = Object.fromEntries(i.entries());
        const p = Zl(l, t().id);
        s({ ...r(), [t().id]: p });
      };
    return (() => {
      var d = kc(),
        i = d.firstChild;
      return (
        d.addEventListener("submit", a),
        n(
          i,
          o(at, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          null
        ),
        n(
          i,
          o(Se, {
            name: "model",
            title: "Model",
            options: po,
            get defaultValue() {
              return po[0].value;
            },
            onChange: (l) => {
              Ac("model", l);
            },
          }),
          null
        ),
        d
      );
    })();
  },
  yn = [
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
  wn = [
    { label: "Message", value: "message" },
    { label: "Label", value: "label" },
    { label: "Draft", value: "draft" },
    { label: "Thread", value: "thread" },
  ],
  An = {
    type: "switch",
    title: "Simplify",
    name: "simplify",
    toolTipText:
      "Whether to return a simplified version of the response instead of the raw data.",
  },
  Mt = {
    type: "DropDownN",
    title: "Email Type",
    name: "emailType",
    options: [
      { label: "HTML", value: "html" },
      { label: "Text", value: "text" },
    ],
  },
  vo = {
    type: "dynamicInput",
    title: "To",
    name: "to",
    placeholder: "info@example.com",
    toolTipText:
      "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
  },
  kn = {
    type: "dynamicInput",
    title: "Subject",
    name: "subject",
    placeholder: "Hello World!",
  },
  Pt = { type: "dynamicInput", title: "Message", name: "message" },
  Ql = {
    type: "switch",
    name: "returnAll",
    title: "Return All",
    toolTipText: "Whether to return all results or only up to a given limit",
  },
  er = {
    type: "dynamicInput",
    name: "limit",
    title: "Limit",
    toolTipText: "Maximum number of results to return",
    value: 10,
  },
  tr = {
    type: "dynamicInput",
    title: "Label Names or Ids",
    name: "labelNamesOrIds",
  },
  ot = { type: "dynamicInput", name: "messageId", title: "Message ID" },
  Pc = [
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
  $n = [
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
  _n = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        ot,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
          toolTipText:
            "Choose from the list, or specify IDs using an expression.",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [ot] },
    { label: "Get", value: "get", children: [ot, An] },
    {
      label: "Get Many",
      value: "getMany",
      children: [
        Ql,
        er,
        An,
        { type: "DropDownFilter", name: "Add Filter", title: "Add Filter" },
      ],
    },
    { label: "Mark as Read", value: "markAsRead", children: [ot] },
    { label: "Mark as Unread", value: "markAsUnread", children: [ot] },
    { label: "Remove Label", value: "removeLabel", children: [ot, tr] },
    { label: "Reply", value: "reply", children: [ot, Mt, Pt] },
    { label: "Send", value: "send", children: [vo, kn, Mt, Pt] },
    {
      label: "Send and Wait for Response",
      value: "sendAndWaitForResponse",
      children: [vo, kn, Mt, Pt],
    },
  ],
  ho = {
    type: "dynamicInput",
    title: "Label Id",
    name: "labelId",
    toolTipText: "The ID of the label",
  },
  fo = {
    type: "dynamicInput",
    title: "Draft ID",
    name: "draftId",
    toolTipText: "The ID of the draft",
    placeholder: "r-52df502d5df55",
  },
  Ln = { label: "Get Many", value: "getMany", children: [Ql, er] },
  Lc = [
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
    { label: "Delete", value: "delete", children: [ho] },
    { label: "Get", value: "get", children: [ho] },
    Ln,
  ],
  Vc = [
    { label: "Create", value: "create", children: [kn, Mt, Pt] },
    { label: "Delete", value: "delete", children: [fo] },
    { label: "Get", value: "get", children: [fo] },
    Ln,
  ],
  lt = {
    type: "dynamicInput",
    name: "threadId",
    title: "Thread ID",
    placeholder: "sdf5d7521df78csd",
  },
  Fc = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        lt,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [lt] },
    { label: "Get", value: "get", children: [lt, An] },
    Ln,
    { label: "Remove Label", value: "removeLabel", children: [lt, tr] },
    {
      label: "Reply",
      value: "reply",
      children: [
        lt,
        Mt,
        Pt,
        {
          type: "dynamicInput",
          name: "messageSnippetOrId",
          title: "Message Snippet Or ID",
          toolTipText:
            "Choose from the list, or specify an ID using an expression.",
        },
      ],
    },
    { label: "Trash", value: "trash", children: [lt] },
    { label: "Untrash", value: "untrash", children: [lt] },
  ],
  nr = {
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
  or = {
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
  lr = {
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
  rr = {
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
  ir = {
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
  ar = {
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
  Bc = [ir, ar],
  Rc = [
    ir,
    ar,
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
  zc = [
    nr,
    or,
    lr,
    rr,
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
  sr = [
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
    nr,
    lr,
    or,
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
  Hc = [...sr, rr],
  Ct = [
    { value: "approvedOnly", label: "Approved Only" },
    { value: "approvedAndDisapproved", label: "Approved and Disapproved" },
  ],
  St = [
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
  Tn = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  Xe = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  Ye = {
    type: "switch",
    title: "Required Field",
    toolTipText:
      "Whether to require the user to enter a value for this field before submitting the form",
  },
  It = {
    type: "dynamicInput",
    title: "Placeholder",
    toolTipText: "Sample text to display inside the field.",
  },
  go = [
    { value: "text", label: "Text", children: [Xe, Ye, It] },
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
        Xe,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        Ye,
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
        Ye,
        Xe,
      ],
    },
    { value: "email", label: "Email", children: [Xe, Ye, It] },
    {
      value: "file",
      label: "File",
      children: [
        Xe,
        Ye,
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
    { value: "number", label: "Number", children: [Xe, Ye, It] },
    { value: "password", label: "Password", children: [Xe, Ye, It] },
    { value: "textArea", label: "Textarea", children: [Xe, Ye, It] },
  ],
  Wc = [
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
  dr = (e, t) => ({
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
    position: { x: -13980, y: -400 },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "createDraft",
        description: "gmail tool output",
        type: "tool",
      },
    ],
  }),
  [qc, jc] = D({}),
  { currentFormConfig: Uc, formData: Gc, setFormData: Xc } = me(),
  ge = (e, t, r) => {
    jc((a) => ({ ...a, [e]: t }));
    const s = dr(qc(), Uc().id);
    console.log(s), Xc({ ...Gc(), createDraft: s });
  };
var Yc = _(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  Kc = _('<div class="label hr-solid-line">Options'),
  bo = _('<div class="mt-5 space-y-5">'),
  xo = _(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  Jc = _(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  yo = _(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  Zc = _(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  Cn = _('<div class="space-y-5 mt-5">'),
  Qc = _('<div class="label hr-solid-line">Form Elements'),
  eu = _("<div class=space-y-5>"),
  tu = _('<div><div class="label hr-solid-line">Options'),
  nu = _(
    '<form id=create-draftForm><div class=space-y-5><div class=space-y-5></div><div class="space-y-5 mt-5"></div><div class="space-y-5 mt-5">'
  ),
  Sn = _("<div>"),
  ou = _(
    '<div class=space-y-5><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Filter</div><div class=space-y-5>'
  ),
  lu = _(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Rt = _('<div class="group flex items-start gap-1.5 w-full">'),
  Et = _(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  wo = _(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  ru = _('<div class="space-y-4 mt-5">'),
  iu = _(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  au = _(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  su = _(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const zt = ({ onClick: e }) =>
    (() => {
      var t = Yc();
      return Be(t, "click", e), n(t, o(fe, {})), t;
    })(),
  du = (e) => {
    const { currentFormConfig: t, formData: r, setFormData: s } = me(),
      [a, d] = D(yn[0]),
      [i, l] = D(wn[0]),
      [p, u] = D([]),
      [m, g] = D(_n[0]),
      [w, O] = D([]),
      [k, y] = D([]),
      [E, v] = D([]),
      [x, b] = D([]),
      [f, h] = D($n[0]),
      [F, N] = D(!1),
      [I, c] = D(Ct[0]),
      [$, T] = D(!1),
      [C, A] = D(St[0]),
      [P, H] = D(Tn[0]),
      [K, ae] = D([]),
      [oe, te] = D({}),
      [pe, ne] = D({});
    De(() => {
      b([]),
        i().value === "message"
          ? u(_n)
          : i().value === "label"
          ? u(Lc)
          : i().value === "draft"
          ? u(Vc)
          : i().value === "thread" && u(Fc);
    }),
      De(() => {
        b([]),
          m()?.value === "reply"
            ? v(sr)
            : m()?.value === "send"
            ? v(Hc)
            : m()?.value === "create"
            ? v(zc)
            : m()?.value === "get"
            ? v(Bc)
            : m()?.value === "getMany"
            ? v(Rc)
            : m().value === "sendAndWaitForResponse" &&
              (f().value === "Approval"
                ? (v([
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
                : (f().value === "freeText" || f().value === "customForm") &&
                  (v(Wc), b([])));
      }),
      Oe(() => {
        u(_n), y(Pc);
      });
    const ue = (ce) => {
      ce.preventDefault();
      const B = new FormData(ce.target);
      let ve = Object.fromEntries(B.entries());
      const re = dr(ve, t().id);
      s({ ...r(), createDraft: re });
    };
    return (() => {
      var ce = nu(),
        B = ce.firstChild,
        ve = B.firstChild,
        re = ve.nextSibling,
        he = re.nextSibling;
      return (
        ce.addEventListener("submit", ue),
        n(
          B,
          o(at, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          ve
        ),
        n(
          B,
          o(Ie, {
            name: "toolDescription",
            title: "Tool Description",
            options: yn,
            get defaultValue() {
              return yn[0].value;
            },
            onChange: (j) => {
              d(j), ge("toolDescription", j);
            },
          }),
          ve
        ),
        n(
          B,
          o(J, {
            get when() {
              return a().value === "setManually";
            },
            get children() {
              return o(it, {
                name: "description",
                title: "Description",
                toolTipText:
                  "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                value: "Consume the Gmail API",
                placeholder: "e.g. Consume the Gmail API",
                onInput: (j) => {
                  ge("description", j);
                },
              });
            },
          }),
          ve
        ),
        n(
          B,
          o(Se, {
            name: "resource",
            title: "Resource",
            options: wn,
            get defaultValue() {
              return wn[0].value;
            },
            onChange: (j) => {
              l(j), ge("resource", j);
            },
          }),
          ve
        ),
        n(
          B,
          o(Ie, {
            name: "operation",
            title: "Operation",
            get options() {
              return p();
            },
            get defaultValue() {
              return p()[0].value;
            },
            onChange: (j) => {
              g(j), ge("operation", j);
            },
          }),
          ve
        ),
        n(
          ve,
          o(ie, {
            get each() {
              return m()?.children;
            },
            children: (j, W) => {
              if (j.type === "dynamicInput")
                return (() => {
                  var M = Sn();
                  return (
                    n(
                      M,
                      o(se, {
                        get name() {
                          return j.name ?? "";
                        },
                        get title() {
                          return j.title;
                        },
                        get toolTipText() {
                          return j.toolTipText;
                        },
                        get placeholder() {
                          return j.placeholder;
                        },
                        get value() {
                          return j.value;
                        },
                        onInput: (R) => {
                          ge(j.name ?? "", R);
                        },
                      })
                    ),
                    M
                  );
                })();
              if (j.type === "switch")
                return (() => {
                  var M = Sn();
                  return (
                    n(
                      M,
                      o(Ee, {
                        get name() {
                          return j.name ?? "";
                        },
                        get title() {
                          return j.title ?? "";
                        },
                        get toolTipText() {
                          return j.toolTipText;
                        },
                        onChange: (R) => {
                          ge(j.name ?? "", R);
                        },
                      })
                    ),
                    M
                  );
                })();
              if (j.type === "DropDownFilter")
                return (() => {
                  var M = ou(),
                    R = M.firstChild,
                    X = R.nextSibling;
                  return (
                    n(
                      M,
                      (() => {
                        var S = Q(() => w().length <= 0);
                        return () => S() && lu();
                      })(),
                      X
                    ),
                    n(
                      X,
                      o(ie, {
                        get each() {
                          return w();
                        },
                        children: (S, z) => {
                          if (S.content.type === "switch")
                            return (() => {
                              var L = Rt();
                              return (
                                n(
                                  L,
                                  o(zt, {
                                    onClick: () => {
                                      const G = w().filter(
                                        (U) => U.value !== S.value
                                      );
                                      O(G), y([...k(), S]);
                                    },
                                  }),
                                  null
                                ),
                                n(
                                  L,
                                  o(Ee, {
                                    get name() {
                                      return S.content.name;
                                    },
                                    get title() {
                                      return S.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return S.content.toolTipText;
                                    },
                                    onChange: (G) => {
                                      ge(S.content.name, G);
                                    },
                                  }),
                                  null
                                ),
                                L
                              );
                            })();
                          if (S.content.type === "dynamicInput")
                            return (() => {
                              var L = Rt();
                              return (
                                n(
                                  L,
                                  o(zt, {
                                    onClick: () => {
                                      const G = w().filter(
                                        (U) => U.value !== S.value
                                      );
                                      O(G), y([...k(), S]);
                                    },
                                  }),
                                  null
                                ),
                                n(
                                  L,
                                  o(se, {
                                    get name() {
                                      return S.content.name;
                                    },
                                    get title() {
                                      return S.content.title;
                                    },
                                    get toolTipText() {
                                      return S.content.toolTipText;
                                    },
                                    isArrow: !0,
                                    get footNote() {
                                      return S.content.footNote;
                                    },
                                    get placeholder() {
                                      return S.content.placeholder ?? "";
                                    },
                                    onInput: (G) => {
                                      ge(S.content.name, G);
                                    },
                                  }),
                                  null
                                ),
                                L
                              );
                            })();
                          if (S.content.type === "dropdownMultiple")
                            return (() => {
                              var L = Rt();
                              return (
                                n(
                                  L,
                                  o(zt, {
                                    onClick: () => {
                                      const G = w().filter(
                                        (U) => U.value !== S.value
                                      );
                                      O(G), y([...k(), S]);
                                    },
                                  }),
                                  null
                                ),
                                n(
                                  L,
                                  o(ql, {
                                    get name() {
                                      return S.content.name;
                                    },
                                    get title() {
                                      return S.content.title;
                                    },
                                    get options() {
                                      return S.content.options ?? [];
                                    },
                                    get toolTipText() {
                                      return S.content.toolTipText;
                                    },
                                    get footNote() {
                                      return S.content.footNote;
                                    },
                                    onChange: (G) => {
                                      ge(S.content.name, G);
                                    },
                                  }),
                                  null
                                ),
                                L
                              );
                            })();
                          if (S.content.type === "dropdownN")
                            return (() => {
                              var L = Rt();
                              return (
                                n(
                                  L,
                                  o(zt, {
                                    onClick: () => {
                                      const G = w().filter(
                                        (U) => U.value !== S.value
                                      );
                                      O(G), y([...k(), S]);
                                    },
                                  }),
                                  null
                                ),
                                n(
                                  L,
                                  o(Se, {
                                    get placeholder() {
                                      return (
                                        S.content?.options?.[0].label ?? ""
                                      );
                                    },
                                    get name() {
                                      return S.content.name;
                                    },
                                    get title() {
                                      return S.content.title;
                                    },
                                    get options() {
                                      return S.content.options ?? [];
                                    },
                                    get toolTipText() {
                                      return S.content.toolTipText;
                                    },
                                    get footNote() {
                                      return S.content.footNote;
                                    },
                                    onChange: (G) => {
                                      ge(S.content.name, G);
                                    },
                                  }),
                                  null
                                ),
                                L
                              );
                            })();
                        },
                      })
                    ),
                    n(
                      M,
                      o(Le, {
                        get name() {
                          return j.name ?? "";
                        },
                        placeholder: "Add Filter",
                        selectedOptions: w,
                        setSelectedOptions: O,
                        dropdownOptions: k,
                        setDropdownOptions: y,
                        onChange: (S) => {},
                      }),
                      null
                    ),
                    M
                  );
                })();
              if (j.type === "DropDownN")
                return (() => {
                  var M = Sn();
                  return (
                    n(
                      M,
                      o(Se, {
                        get name() {
                          return j.name ?? "";
                        },
                        get title() {
                          return j.title;
                        },
                        get options() {
                          return j.options ?? [];
                        },
                        get defaultValue() {
                          return j.options?.[0].value;
                        },
                        get toolTipText() {
                          return j.toolTipText;
                        },
                        onChange: (R) => {
                          ge(j.name ?? "", R);
                        },
                      })
                    ),
                    M
                  );
                })();
            },
          })
        ),
        n(
          re,
          o(J, {
            get when() {
              return (
                m().value === "reply" ||
                m().value === "create" ||
                m().value === "get" ||
                m().value === "getMany" ||
                m().value === "send"
              );
            },
            get children() {
              return [
                Kc(),
                Q(() => Q(() => x().length <= 0)() && Et()),
                (() => {
                  var j = bo();
                  return (
                    n(
                      j,
                      o(ie, {
                        get each() {
                          return x();
                        },
                        children: (W) => {
                          if (W.content.type === "dynamicInput")
                            return (() => {
                              var M = wo(),
                                R = M.firstChild,
                                X = R.nextSibling;
                              return (
                                (R.$$click = () => {
                                  const S = x().filter(
                                    (z) => z.value !== W.value
                                  );
                                  b(S), v([...E(), W]);
                                }),
                                n(R, o(fe, {})),
                                n(
                                  X,
                                  o(se, {
                                    get name() {
                                      return W.content.name;
                                    },
                                    get title() {
                                      return W.content.title;
                                    },
                                    get placeholder() {
                                      return W.content.placeholder;
                                    },
                                    get toolTipText() {
                                      return W.content.toolTipText;
                                    },
                                    isArrow: !0,
                                    onInput: (S) => {
                                      ge(W.content.name, S);
                                    },
                                  })
                                ),
                                M
                              );
                            })();
                          if (W.content.type === "switch")
                            return (() => {
                              var M = wo(),
                                R = M.firstChild,
                                X = R.nextSibling;
                              return (
                                (R.$$click = () => {
                                  const S = x().filter(
                                    (z) => z.value !== W.value
                                  );
                                  b(S), v([...E(), W]);
                                }),
                                n(R, o(fe, {})),
                                n(
                                  X,
                                  o(Ee, {
                                    get title() {
                                      return W.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return W.content.toolTipText;
                                    },
                                    get name() {
                                      return W.content.name;
                                    },
                                    onChange: (S) => {
                                      ge(W.content.name, S);
                                    },
                                  })
                                ),
                                M
                              );
                            })();
                        },
                      })
                    ),
                    j
                  );
                })(),
                o(Le, {
                  get name() {
                    return `optionsFor${m()?.label}Operation`;
                  },
                  placeholder: "Add option",
                  dropdownOptions: E,
                  setDropdownOptions: v,
                  selectedOptions: x,
                  setSelectedOptions: b,
                  onChange: (j) => {
                    b(j);
                  },
                }),
              ];
            },
          })
        ),
        n(
          he,
          o(J, {
            get when() {
              return m().value === "sendAndWaitForResponse";
            },
            get children() {
              return [
                o(Ie, {
                  name: "responseType",
                  title: "Response Type",
                  options: $n,
                  get defaultValue() {
                    return $n[0].value;
                  },
                  onChange: (j) => {
                    h(j), ge("responseType", j);
                  },
                }),
                (() => {
                  var j = Cn();
                  return (
                    n(
                      j,
                      o(J, {
                        get when() {
                          return f().value === "Approval";
                        },
                        get children() {
                          return [
                            (() => {
                              var W = Jc(),
                                M = W.firstChild,
                                R = M.nextSibling,
                                X = R.nextSibling;
                              return (
                                n(
                                  W,
                                  (() => {
                                    var S = Q(() => !F());
                                    return () => S() && Et();
                                  })(),
                                  R
                                ),
                                n(
                                  R,
                                  o(Qt, {
                                    onClick: () => N(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                n(
                                  X,
                                  o(J, {
                                    get when() {
                                      return F();
                                    },
                                    get children() {
                                      var S = xo(),
                                        z = S.firstChild,
                                        L = z.nextSibling;
                                      return (
                                        (z.$$click = () => {
                                          N(!1), c(Ct[0]);
                                        }),
                                        n(z, o(fe, {})),
                                        n(
                                          L,
                                          o(Ie, {
                                            name: "typeOfApproval",
                                            title: "Type of Approval",
                                            options: Ct,
                                            get defaultValue() {
                                              return Ct[0].value;
                                            },
                                            onChange: (G) => {
                                              c(G), ge("typeOfApproval", G);
                                            },
                                          }),
                                          null
                                        ),
                                        n(
                                          L,
                                          o(se, {
                                            name: "approveButtonLabel",
                                            title: "Approve Button Label",
                                            value: "Approve",
                                          }),
                                          null
                                        ),
                                        n(
                                          L,
                                          o(Se, {
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
                                            onChange: (G) => {
                                              ge("approveButtonStyle", G);
                                            },
                                          }),
                                          null
                                        ),
                                        n(
                                          L,
                                          o(J, {
                                            get when() {
                                              return (
                                                I().value ===
                                                "approvedAndDisapproved"
                                              );
                                            },
                                            get children() {
                                              return [
                                                o(se, {
                                                  name: "disapproveButtonLabel",
                                                  title:
                                                    "Disapprove Button Label",
                                                  value: "Disapprove",
                                                  onInput: (G) => {
                                                    ge(
                                                      "disapproveButtonLabel",
                                                      G
                                                    );
                                                  },
                                                }),
                                                o(Se, {
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
                                                  onChange: (G) => {
                                                    ge(
                                                      "disapproveButtonStyle",
                                                      G
                                                    );
                                                  },
                                                }),
                                              ];
                                            },
                                          }),
                                          null
                                        ),
                                        S
                                      );
                                    },
                                  })
                                ),
                                q(() => V(R, `${F() ? "hidden" : "mt-5"}`)),
                                W
                              );
                            })(),
                            (() => {
                              var W = Zc(),
                                M = W.firstChild,
                                R = M.nextSibling,
                                X = R.nextSibling;
                              return (
                                n(
                                  W,
                                  (() => {
                                    var S = Q(() => !$());
                                    return () => S() && Et();
                                  })(),
                                  R
                                ),
                                n(
                                  R,
                                  o(Qt, {
                                    onClick: () => T(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                n(
                                  X,
                                  o(J, {
                                    get when() {
                                      return $();
                                    },
                                    get children() {
                                      var S = yo(),
                                        z = S.firstChild,
                                        L = z.nextSibling,
                                        G = L.firstChild;
                                      return (
                                        (z.$$click = () => {
                                          T(!1), A(Ct[0]);
                                        }),
                                        n(z, o(fe, {})),
                                        n(
                                          L,
                                          o(Ie, {
                                            name: "limitType",
                                            title: "Limit Type",
                                            options: St,
                                            get defaultValue() {
                                              return St[0].value;
                                            },
                                            toolTipText:
                                              "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                            onChange: (U) => {
                                              A(U), ge("limitType", U);
                                            },
                                          }),
                                          G
                                        ),
                                        n(
                                          G,
                                          o(J, {
                                            get when() {
                                              return (
                                                C().value ===
                                                "afterTimeInterval"
                                              );
                                            },
                                            get children() {
                                              return [
                                                o(se, {
                                                  name: "amount",
                                                  title: "Amount",
                                                  value: 45,
                                                  toolTipText:
                                                    "The time to wait.",
                                                  onInput: (U) => {
                                                    ge("amount", U);
                                                  },
                                                }),
                                                o(Se, {
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
                                                  onChange: (U) => {
                                                    ge("unit", U);
                                                  },
                                                }),
                                              ];
                                            },
                                          }),
                                          null
                                        ),
                                        n(
                                          G,
                                          o(J, {
                                            get when() {
                                              return (
                                                C().value === "atSpecifiedTime"
                                              );
                                            },
                                            get children() {
                                              return o(se, {
                                                title: "Max Date and Time",
                                                name: "maxDateAndTime",
                                                toolTipText:
                                                  "Continue execution after the specified date and time",
                                                onInput: (U) => {
                                                  ge("maxDateAndTime", U);
                                                },
                                              });
                                            },
                                          }),
                                          null
                                        ),
                                        S
                                      );
                                    },
                                  })
                                ),
                                q(() => V(R, `${$() ? "hidden" : "mt-5"}`)),
                                W
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    j
                  );
                })(),
                (() => {
                  var j = Cn();
                  return (
                    n(
                      j,
                      o(J, {
                        get when() {
                          return f().value === "customForm";
                        },
                        get children() {
                          return [
                            o(Ie, {
                              name: "defineForm",
                              title: "Define Form",
                              options: Tn,
                              get defaultValue() {
                                return Tn[0].value;
                              },
                              onChange: (W) => {
                                H(W), ge("defineForm", W);
                              },
                            }),
                            o(J, {
                              get when() {
                                return P().value === "usingJSON";
                              },
                              get children() {
                                return o(Vt, {
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
                                  onInput: (W) => {
                                    ge("formFieldsJson", W);
                                  },
                                });
                              },
                            }),
                            (() => {
                              var W = eu();
                              return (
                                n(
                                  W,
                                  o(J, {
                                    get when() {
                                      return P().value === "usingFieldBelow";
                                    },
                                    get children() {
                                      return [
                                        Qc(),
                                        Q(
                                          () =>
                                            Q(() => K().length <= 0)() && Et()
                                        ),
                                        (() => {
                                          var M = bo();
                                          return (
                                            n(
                                              M,
                                              o(ie, {
                                                get each() {
                                                  return K();
                                                },
                                                children: (R, X) =>
                                                  (() => {
                                                    var S = iu(),
                                                      z = S.firstChild,
                                                      L = z.firstChild,
                                                      G = L.nextSibling,
                                                      U = z.nextSibling;
                                                    return (
                                                      n(L, o(bt, {})),
                                                      (G.$$click = () => {
                                                        ae(
                                                          K().filter(
                                                            (Y, Z) => Y !== R
                                                          )
                                                        );
                                                      }),
                                                      n(G, o(fe, {})),
                                                      n(
                                                        U,
                                                        o(Ie, {
                                                          name: "elementType",
                                                          title: "Element Type",
                                                          toolTipText:
                                                            "The type of field to add to the form",
                                                          options: go,
                                                          get defaultValue() {
                                                            return go[0].value;
                                                          },
                                                          onChange: (Y) => {
                                                            te((Z) => ({
                                                              ...Z,
                                                              [R]:
                                                                Y.children ||
                                                                [],
                                                            })),
                                                              ge(
                                                                "elementType",
                                                                Y
                                                              );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      n(
                                                        U,
                                                        o(J, {
                                                          get when() {
                                                            return oe()[R];
                                                          },
                                                          get children() {
                                                            var Y = ru();
                                                            return (
                                                              n(
                                                                Y,
                                                                o(ie, {
                                                                  get each() {
                                                                    return oe()[
                                                                      R
                                                                    ];
                                                                  },
                                                                  children: (
                                                                    Z
                                                                  ) => {
                                                                    if (
                                                                      Z.type ===
                                                                      "dynamicInput"
                                                                    )
                                                                      return o(
                                                                        se,
                                                                        {
                                                                          get name() {
                                                                            return `${R}_${Z.title}`;
                                                                          },
                                                                          get title() {
                                                                            return Z.title;
                                                                          },
                                                                          get toolTipText() {
                                                                            return Z.toolTipText;
                                                                          },
                                                                          get value() {
                                                                            return Z.value;
                                                                          },
                                                                          get placeholder() {
                                                                            return Z.placeholder;
                                                                          },
                                                                          onInput:
                                                                            (
                                                                              de
                                                                            ) => {
                                                                              ge(
                                                                                `${R}_${Z.title}`,
                                                                                de
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      Z.type ===
                                                                      "switch"
                                                                    )
                                                                      return o(
                                                                        Ee,
                                                                        {
                                                                          get name() {
                                                                            return `${R}_${Z.title}`;
                                                                          },
                                                                          get title() {
                                                                            return (
                                                                              Z.title ??
                                                                              ""
                                                                            );
                                                                          },
                                                                          get toolTipText() {
                                                                            return Z.toolTipText;
                                                                          },
                                                                          onChange:
                                                                            (
                                                                              de
                                                                            ) => {
                                                                              ge(
                                                                                `${R}_${Z.title}`,
                                                                                de
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      Z.type ===
                                                                      "textBlock"
                                                                    )
                                                                      return o(
                                                                        nn,
                                                                        {
                                                                          get children() {
                                                                            return Z.placeholder;
                                                                          },
                                                                        }
                                                                      );
                                                                    if (
                                                                      Z.type ===
                                                                      "jsonEditor"
                                                                    )
                                                                      return o(
                                                                        Vt,
                                                                        {
                                                                          get name() {
                                                                            return `${R}_${Z.title}`;
                                                                          },
                                                                          get title() {
                                                                            return Z.title;
                                                                          },
                                                                          get footNote() {
                                                                            return Z.footNote;
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
                                                                              de
                                                                            ) => {
                                                                              ge(
                                                                                `${R}_${Z.title}`,
                                                                                de
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      Z.type ===
                                                                      "inputBlock"
                                                                    )
                                                                      return (() => {
                                                                        var de =
                                                                            au(),
                                                                          le =
                                                                            de.firstChild,
                                                                          ye =
                                                                            le.nextSibling;
                                                                        return (
                                                                          n(
                                                                            ye,
                                                                            o(
                                                                              ie,
                                                                              {
                                                                                get each() {
                                                                                  return pe()[
                                                                                    R
                                                                                  ];
                                                                                },
                                                                                children:
                                                                                  (
                                                                                    $e,
                                                                                    _e
                                                                                  ) =>
                                                                                    (() => {
                                                                                      var Je =
                                                                                          su(),
                                                                                        Ze =
                                                                                          Je.firstChild,
                                                                                        Qe =
                                                                                          Ze.firstChild,
                                                                                        et =
                                                                                          Qe.nextSibling,
                                                                                        st =
                                                                                          Ze.nextSibling;
                                                                                      return (
                                                                                        n(
                                                                                          Qe,
                                                                                          o(
                                                                                            bt,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        (et.$$click =
                                                                                          () => {
                                                                                            ne(
                                                                                              (
                                                                                                tt
                                                                                              ) => ({
                                                                                                ...tt,
                                                                                                [R]: tt[
                                                                                                  R
                                                                                                ].filter(
                                                                                                  (
                                                                                                    on
                                                                                                  ) =>
                                                                                                    on !==
                                                                                                    $e
                                                                                                ),
                                                                                              })
                                                                                            );
                                                                                          }),
                                                                                        n(
                                                                                          et,
                                                                                          o(
                                                                                            fe,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        n(
                                                                                          st,
                                                                                          o(
                                                                                            se,
                                                                                            {
                                                                                              get name() {
                                                                                                return `${R}_${Z.name}_${$e}`;
                                                                                              },
                                                                                              title:
                                                                                                "Option",
                                                                                              onInput:
                                                                                                (
                                                                                                  tt
                                                                                                ) => {
                                                                                                  ge(
                                                                                                    `${R}_${Z.name}_${$e}`,
                                                                                                    tt
                                                                                                  );
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        ),
                                                                                        q(
                                                                                          () =>
                                                                                            V(
                                                                                              Je,
                                                                                              `flex gap-1.5 ${
                                                                                                _e() !==
                                                                                                0
                                                                                                  ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                  : ""
                                                                                              }`
                                                                                            )
                                                                                        ),
                                                                                        Je
                                                                                      );
                                                                                    })(),
                                                                              }
                                                                            )
                                                                          ),
                                                                          n(
                                                                            de,
                                                                            o(
                                                                              rt,
                                                                              {
                                                                                label:
                                                                                  "Add Field Option",
                                                                                onClick:
                                                                                  () => {
                                                                                    ne(
                                                                                      (
                                                                                        $e
                                                                                      ) => ({
                                                                                        ...$e,
                                                                                        [R]: [
                                                                                          ...($e[
                                                                                            R
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
                                                                          de
                                                                        );
                                                                      })();
                                                                  },
                                                                })
                                                              ),
                                                              Y
                                                            );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      q(() =>
                                                        V(
                                                          S,
                                                          `flex gap-1.5 ${
                                                            X() !== 0
                                                              ? "border-t pt-6 border-dashed border-[#575555]"
                                                              : ""
                                                          }`
                                                        )
                                                      ),
                                                      S
                                                    );
                                                  })(),
                                              })
                                            ),
                                            M
                                          );
                                        })(),
                                        o(rt, {
                                          label: "Add Form Element",
                                          onClick: () => {
                                            ae([
                                              ...K(),
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
                                W
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    j
                  );
                })(),
                (() => {
                  var j = Cn();
                  return (
                    n(
                      j,
                      o(J, {
                        get when() {
                          return (
                            f().value === "freeText" ||
                            f().value === "customForm"
                          );
                        },
                        get children() {
                          return [
                            (() => {
                              var W = tu();
                              return (
                                W.firstChild,
                                n(
                                  W,
                                  (() => {
                                    var M = Q(() => x().length <= 0);
                                    return () => M() && Et();
                                  })(),
                                  null
                                ),
                                W
                              );
                            })(),
                            o(ie, {
                              get each() {
                                return x();
                              },
                              children: (W) => {
                                if (W.content.type === "dynamicInput")
                                  return (() => {
                                    var M = xo(),
                                      R = M.firstChild,
                                      X = R.nextSibling;
                                    return (
                                      (R.$$click = () => {
                                        const S = x().filter(
                                          (z) => z.value !== W.value
                                        );
                                        b(S), v([...E(), W]);
                                      }),
                                      n(R, o(fe, {})),
                                      n(
                                        X,
                                        o(se, {
                                          get name() {
                                            return W.content.name;
                                          },
                                          get title() {
                                            return W.content.title;
                                          },
                                          get toolTipText() {
                                            return W.content.toolTipText;
                                          },
                                          onInput: (S) => {
                                            ge(W.content.name, S);
                                          },
                                        })
                                      ),
                                      M
                                    );
                                  })();
                                if (W.content.type === "reproductiveDropDown")
                                  return (() => {
                                    var M = yo(),
                                      R = M.firstChild,
                                      X = R.nextSibling,
                                      S = X.firstChild;
                                    return (
                                      (R.$$click = () => {
                                        const z = x().filter(
                                          (L) => L.value !== W.value
                                        );
                                        b(z), v([...E(), W]);
                                      }),
                                      n(R, o(fe, {})),
                                      n(
                                        X,
                                        o(Ie, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: St,
                                          get defaultValue() {
                                            return St[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (z) => {
                                            A(z), ge("limitType", z);
                                          },
                                        }),
                                        S
                                      ),
                                      n(
                                        S,
                                        o(J, {
                                          get when() {
                                            return (
                                              C().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              o(se, {
                                                name: "amount",
                                                title: "Amount",
                                                value: 45,
                                                toolTipText:
                                                  "The time to wait.",
                                                onInput: (z) => {
                                                  ge("amount", z);
                                                },
                                              }),
                                              o(Se, {
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
                                                onChange: (z) => {
                                                  ge("unit", z);
                                                },
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      n(
                                        S,
                                        o(J, {
                                          get when() {
                                            return (
                                              C().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return o(se, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                              onInput: (z) => {
                                                ge("maxDateAndTime", z);
                                              },
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      M
                                    );
                                  })();
                              },
                            }),
                            o(Le, {
                              name: "Option",
                              dropdownOptions: E,
                              setDropdownOptions: v,
                              selectedOptions: x,
                              setSelectedOptions: b,
                              placeholder: "Add Options",
                              onChange: (W) => {
                                b(W);
                              },
                            }),
                          ];
                        },
                      })
                    ),
                    j
                  );
                })(),
              ];
            },
          })
        ),
        ce
      );
    })();
  };
be(["click"]);
var cu = _('<div id=parameter class="mt-0 px-5 py-4 ">');
const uu = () => {
  const { currentFormConfig: e } = me();
  return (
    D(),
    (() => {
      var t = cu();
      return (
        n(
          t,
          o(J, {
            get when() {
              return e().name === "switch";
            },
            get children() {
              return o(ic, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "edit";
            },
            get children() {
              return o(Fd, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "gmail-trigger";
            },
            get children() {
              return o(Ms, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return (
                e().name === "ai-agent" || e().name === "customer-support-agent"
              );
            },
            get children() {
              return o(Qs, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "ollama-chat";
            },
            get children() {
              return o(ad, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "send-email";
            },
            get children() {
              return o(Od, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "vector-store";
            },
            get children() {
              return o(pc, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "pg-vector";
            },
            get children() {
              return o(Ic, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "embedding";
            },
            get children() {
              return o(Mc, {});
            },
          }),
          null
        ),
        n(
          t,
          o(J, {
            get when() {
              return e().name === "create-draft";
            },
            get children() {
              return o(du, {});
            },
          }),
          null
        ),
        q((r) => qe(t, { [Wl.param]: !0 }, r)),
        t
      );
    })()
  );
};
var pu = _(
    '<div class="relative w-full"><select multiple title=select class="w-full appearance-none bg-[#1e1f2b] text-white text-sm px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"><svg class="w-4 h-4"fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'
  ),
  mu = _("<option>");
const vu = ({ options: e, onOption: t, name: r }) => {
  const [s, a] = D(0),
    d = (i) => {
      const l = i.target.selectedIndex;
      a(l), t?.(e[l]);
    };
  return (
    Oe(() => {
      t?.(e[0]);
    }),
    (() => {
      var i = pu(),
        l = i.firstChild;
      return (
        l.addEventListener("change", d),
        ee(l, "name", r),
        n(l, () =>
          e.map((p) =>
            (() => {
              var u = mu();
              return n(u, () => p.label), q(() => (u.value = p.value)), u;
            })()
          )
        ),
        i
      );
    })()
  );
};
var hu = _(
  '<div class="flex flex-col text-sm text-gray-300 font-sans"><div class="text-sm flex items-center gap-1 group mb-1"><div>Notes</div><div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?</div></div><textarea title=notes id=notes class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono">'
);
const fu = ({ toolTipContent: e }) => {
  const [t, r] = D(""),
    [s, a] = D(!1);
  return (() => {
    var d = hu(),
      i = d.firstChild,
      l = i.firstChild,
      p = l.nextSibling;
    p.firstChild;
    var u = i.nextSibling;
    return (
      p.addEventListener("mouseleave", () => a(!1)),
      p.addEventListener("mouseenter", () => a(!0)),
      n(p, o(Re, { showTooltip: s, toolTipContent: e }), null),
      (u.$$input = (m) => r(m.target.value)),
      q(() => (u.value = t())),
      d
    );
  })();
};
be(["input"]);
var gu = _(
  '<div class="mt-0 px-5 py-4 overflow-visible"><div class=text-white><div class="mt-3 space-y-3"><div class=mt-6><hr class=border-[#373749]><p class="mt-1 text-[#737475] text-sm">Switch node version 2.3.2(latest)'
);
const bu = (e) => {
  D(!1);
  const { currentFormConfig: t, settingConfig: r } = me(),
    s = [
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
    var a = gu(),
      d = a.firstChild,
      i = d.firstChild,
      l = i.firstChild;
    return (
      n(
        i,
        () =>
          r()?.settings.map((p, u) => {
            if (p.type === "dropdown") return o(vu, { options: s });
            p.type;
          }),
        l
      ),
      n(
        i,
        o(fu, {
          toolTipContent: {
            label: "",
            text: "Optional note to save with the node",
          },
        }),
        l
      ),
      n(
        i,
        o(Ee, { switchText: "", toolTipContent: { label: "", text: "" } }),
        l
      ),
      a
    );
  })();
};
var xu = _(
  '<div id=mid-panel class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"><div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium"></span></div><button id=submitBtn type=submit class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="h-full flex-1 overflow-visible"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings</div></div></div><div class=overflow-visible><div></div><div>'
);
const yu = (e) => {
  const { currentFormConfig: t } = me(),
    [r, s] = D(0);
  return (() => {
    var a = xu(),
      d = a.firstChild,
      i = d.firstChild,
      l = i.firstChild,
      p = l.nextSibling,
      u = i.nextSibling,
      m = d.nextSibling,
      g = m.firstChild,
      w = g.firstChild,
      O = w.firstChild,
      k = O.firstChild,
      y = k.nextSibling,
      E = w.nextSibling,
      v = E.firstChild,
      x = v.nextSibling;
    return (
      n(p, () => t().title),
      (k.$$click = () => s(0)),
      (y.$$click = () => s(1)),
      n(v, o(uu, {})),
      n(x, o(bu, {})),
      q(
        (b) => {
          var f = { [Wl.midPanel]: !0 },
            h = `${t().name}Form`,
            F = `rounded-none border-b-2 ${
              r() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            N = `rounded-none border-b-2 ${
              r() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            I = r() === 0 ? "" : "hidden",
            c = r() === 1 ? "" : "hidden";
          return (
            (b.e = qe(a, f, b.e)),
            h !== b.t && ee(u, "form", (b.t = h)),
            F !== b.a && V(k, (b.a = F)),
            N !== b.o && V(y, (b.o = N)),
            I !== b.i && V(v, (b.i = I)),
            c !== b.n && V(x, (b.n = c)),
            b
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 }
      ),
      a
    );
  })();
};
be(["click"]);
const wu = "_rightPanel_1ew1b_1",
  $u = { rightPanel: wu };
var _u = _(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output'
);
const Tu = (e) =>
  (() => {
    var t = _u(),
      r = t.firstChild;
    return (
      r.firstChild,
      n(
        r,
        o(Zt, {
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
      q((s) => qe(t, { [$u.rightPanel]: !0 }, s)),
      t
    );
  })();
var Cu = _('<div class="flex items-start h-full w-full overflow-hidden">');
const Su = (e) =>
  (() => {
    var t = Cu();
    return (
      n(t, o(Ba, {}), null), n(t, o(yu, {}), null), n(t, o(Tu, {}), null), t
    );
  })();
var Iu = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const Eu = (e) => Iu();
var Ou = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const Du = (e) => Ou();
var Nu = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const Au = (e) => Nu();
var ku = _(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const Mu = (e) => ku();
var Pu = _(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex cursor-pointer items-center font-medium text-white gap-x-2.5"><div class="text-xl text-[#a7a4a4] "></div><div class=text-base>Back to canvas</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const Lu = (e) => {
  const { currentFormConfig: t, setIsModalOpen: r } = me();
  return (() => {
    var s = Pu(),
      a = s.firstChild,
      d = a.firstChild,
      i = a.nextSibling,
      l = i.firstChild,
      p = l.nextSibling,
      u = p.nextSibling;
    return (
      (a.$$click = () => r(!1)),
      n(d, o(Eu, {})),
      n(l, o(Au, {})),
      n(p, o(Mu, {})),
      n(u, o(Du, {})),
      s
    );
  })();
};
be(["click"]);
var Vu = _(
    `<div class="flex h-full"><div class="flex-1 pr-4"><div class=mb-4><label class="block text-sm mb-1">Connect using <span class=text-red-500>*</span></label><div class="flex gap-2"><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input name=connectMethod type=radio value=oauth2><span class=text-sm>OAuth2 (recommended)</span></label><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod value=service><span class=text-sm>Service Account</span></label></div></div><div class=mb-4><label class="block text-sm mb-1">OAuth Redirect URL</label><input type=text name=oauthRedirectUrl class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=https://workflow.juwelt.net/rest/oauth2-credentials/callback title="OAuth Redirect URL"placeholder="OAuth Redirect URL"><p class="text-xs text-gray-400 mt-1">In Gmail, use this URL above when prompted to enter an OAuth callback or redirect URL.</p></div><div class=mb-4><input type=text name=clientId class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"title="Client ID"placeholder="Enter your Client ID"></div><div class=mb-4><input autocomplete=off type=password name=clientSecret class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value title="Client Secret"placeholder="Enter your Client Secret"></div><div class="flex items-center gap-1 text-xs text-gray-400"><span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">i</span><span>Enterprise plan users can pull in credentials from external vaults. <a href=# class=text-blue-400>More info</a></span></div></div><div id=right class="w-[300px] bg-[#252535] rounded p-4 h-full"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-medium">Setup guide</h3><a href=# class="text-xs text-blue-400 flex items-center gap-1">Docs<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1=10 y1=14 x2=21 y2=3></line></svg></a></div><div class="text-xs text-gray-300 overflow-y-auto h-full"><p class=mb-2>Configure this credential:</p><ul class="list-disc pl-5 space-y-2"><li>Log in to your <a href=# class=text-blue-400>Google Cloud console</a>.</li><li>Go to Google Cloud Console / APIs and Services / Credentials. If you don't have a project yet, you'll need to create a new one and select it.</li><li>If you haven't used OAuth in this Google Cloud project before, <a href=# class=text-blue-400>configure the consent screen</a>.</li><li>In Credentials, select + CREATE CREDENTIALS + OAuth client ID.</li><li>In the Application type dropdown, select Web application.</li><li>Under Authorized redirect URLs, select + ADD URI. Paste in the OAuth redirect URL shown on the left.</li><li>Select Create.</li><li>In Enabled APIs and services, select + ENABLE APIS AND SERVICES.</li><li>Select and enable the Gmail API.</li><li>Back to Credentials, click on the credential in OAuth 2.0 Client IDs, and copy the Client ID and Client Secret.</li></ul><p class=mt-2>Click the docs link above for more detailed instructions.`
  ),
  Fu = _("<div class=text-sm>Sharing settings content goes here..."),
  Bu = _("<div class=text-sm>Details content goes here..."),
  Ru = _(
    '<form><div class="bg-[#2a2a3a] text-white rounded-md shadow-lg w-full h-full"><div class="p-4 flex justify-between items-center border-b border-gray-700 "><div class="flex items-center gap-2"><h2 class="text-base font-medium">Gmail account 4</h2><span class="text-xs text-gray-400">Gmail OAuth2 API</span></div><div class="flex items-center gap-2"><button type=submit form=modal2 class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Save</button><button class="text-gray-400 hover:text-white">×</button></div></div><div class="flex w-full h-full"><div class="min-w-[150px] w-[200px] max-w-[250px] bg-[#252535] p-4 flex flex-col gap-3 rounded-bl-md"><button>Connection</button><button>Sharing</button><button>Details</button></div><div class=" p-4 h-full w-full">'
  );
function zu() {
  const [e, t] = D("connection"),
    [r, s] = D("oauth2"),
    {
      setIsModalOpen2: a,
      setFormData: d,
      currentFormConfig: i,
      formData: l,
    } = me();
  return (() => {
    var p = Ru(),
      u = p.firstChild,
      m = u.firstChild,
      g = m.firstChild,
      w = g.nextSibling,
      O = w.firstChild,
      k = O.nextSibling,
      y = m.nextSibling,
      E = y.firstChild,
      v = E.firstChild,
      x = v.nextSibling,
      b = x.nextSibling,
      f = E.nextSibling;
    return (
      (k.$$click = () => a(!1)),
      (v.$$click = () => t("connection")),
      (x.$$click = () => t("sharing")),
      (b.$$click = () => t("details")),
      n(
        f,
        o(J, {
          get when() {
            return e() === "connection";
          },
          get children() {
            var h = Vu(),
              F = h.firstChild,
              N = F.firstChild,
              I = N.firstChild,
              c = I.nextSibling,
              $ = c.firstChild,
              T = $.firstChild,
              C = $.nextSibling,
              A = C.firstChild,
              P = N.nextSibling,
              H = P.firstChild,
              K = H.nextSibling,
              ae = P.nextSibling,
              oe = ae.firstChild,
              te = ae.nextSibling,
              pe = te.firstChild;
            return (
              K.addEventListener("change", (ne) => {
                d({
                  ...l(),
                  [i().id]: {
                    ...l()[i().id],
                    "OAuth Redirect URL": ne.target.value,
                  },
                });
              }),
              oe.addEventListener("change", (ne) => {
                d({
                  ...l(),
                  [i().id]: { ...l()[i().id], "Client ID": ne.target.value },
                });
              }),
              pe.addEventListener("change", (ne) => {
                d({
                  ...l(),
                  [i().id]: {
                    ...l()[i().id],
                    "Client Secret": ne.target.value,
                  },
                });
              }),
              q(() => (T.checked = r() === "oauth2")),
              q(() => (A.checked = r() === "service")),
              h
            );
          },
        }),
        null
      ),
      n(
        f,
        o(J, {
          get when() {
            return e() === "sharing";
          },
          get children() {
            return Fu();
          },
        }),
        null
      ),
      n(
        f,
        o(J, {
          get when() {
            return e() === "details";
          },
          get children() {
            return Bu();
          },
        }),
        null
      ),
      q(
        (h) => {
          var F = `text-left text-sm ${
              e() === "connection" ? "text-white" : "text-gray-400"
            }`,
            N = `text-left text-sm ${
              e() === "sharing" ? "text-white" : "text-gray-400"
            }`,
            I = `text-left text-sm ${
              e() === "details" ? "text-white" : "text-gray-400"
            }`;
          return (
            F !== h.e && V(v, (h.e = F)),
            N !== h.t && V(x, (h.t = N)),
            I !== h.a && V(b, (h.a = I)),
            h
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      p
    );
  })();
}
be(["click"]);
var Hu = _(
  '<div class="bg-[#20202c] text-white rounded-lg w-full min-h-[400px] max-h-[800px] flex flex-col"><div class="flex items-center justify-between p-4 border-b border-[#39393b] flex-shrink-0"><h2 class="text-xl font-medium">Edit Sender</h2><div class="text-gray-400 hover:text-white text-xs cursor-pointer bg-[#151520] rounded-md w-6 h-6 flex justify-center items-center">✕</div></div><div class="p-4 flex flex-col flex-1"><label class="text-base text-gray-300 mb-2 font-semibold">Sender</label><textarea placeholder=... class="min-h-[300px] border rounded p-3 border-neutral-700 bg-[#252631] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors resize-y">'
);
const Wu = () => {
  const { setIsModalOpen3: e } = me();
  return (() => {
    var t = Hu(),
      r = t.firstChild,
      s = r.firstChild,
      a = s.nextSibling;
    return (a.$$click = () => e(!1)), t;
  })();
};
be(["click"]);
var qu = _(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const ju = ({ node: e }) => {
    const [t, r] = D(),
      {
        nodes: s,
        setNodes: a,
        selectedNode: d,
        setSelectedNode: i,
        pendingOutput: l,
        lastClickPosition: p,
        setEdges: u,
        edges: m,
        transform: g,
        scale: w,
        isShowModal: O,
        setIsModalOpen: k,
        isModalOpen: y,
        isModalOpen2: E,
        setIsModalOpen2: v,
        isModalOpen3: x,
        setIsModalOpen3: b,
        currentFormConfig: f,
        setPreviousFormConfig: h,
      } = me();
    De(() => {
      y() || (f() && h(f()));
    });
    function F(N) {
      let I = window.innerWidth / 2,
        c = window.innerHeight / 2;
      const $ = d(),
        T = l(),
        C = p();
      function A(M, R = 200, X = 0) {
        const S = s().find((L) => L.id === M);
        if ((r(S), !S)) return null;
        const z = S.currPosition.get();
        return { x: z.x + R, y: z.y + X };
      }
      if ($) {
        let M = A($);
        M && ((I = M.x), (c = M.y));
      } else if (T) {
        let M = A(T.nodeId);
        M && ((I = M.x), (c = M.y));
      } else C && ((I = (C.x - g().x) / w()), (c = (C.y - g().y) / w()));
      const [P, H] = D({ x: I, y: c }),
        [K, ae] = D({ x: I, y: c }),
        [oe, te] = D([]),
        [pe, ne] = D([]),
        [ue, ce] = D([]),
        B = [
          ...Array(Number(e[N].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        ve = [
          ...Array(Number(e[N].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        re = [
          ...Array(Number(e[N].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        he = [
          ...Array(Number(e[N].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ];
      gt(() =>
        a([
          ...s(),
          {
            id: `node_${Math.random().toString(36).substring(2, 8)}_${N}`,
            name: N,
            title: e[N].title,
            numberInputs: e[N].numberInputs,
            numberOutputs: e[N].numberOutputs,
            isInputVertex: e[N].isInputVertex,
            isOutputVertex: e[N].isOutputVertex,
            inputVertexIds: B,
            outputVertexIds: ve,
            isDownVertex: e[N].isDownVertex || !1,
            isUpVertex: e[N].isUpVertex || !1,
            downVertexNumber: e[N].downVertexNumber || 0,
            upVertexNumber: e[N].upVertexNumber || 0,
            downVertexIds: re,
            upVertexIds: he,
            downVertexOrientation: e[N].downVertexOrientation,
            busyIndex: { get: ue, set: ce },
            content: e[N].content,
            prevPosition: { get: P, set: H },
            currPosition: { get: K, set: ae },
            inputEdgeIds: { get: oe, set: te },
            outputEdgeIds: { get: pe, set: ne },
          },
        ])
      );
      const j = s()[s().length - 1];
      function W(M = 0) {
        const R = document.getElementById(t().outputVertexIds[M]),
          { left: X, right: S, top: z, bottom: L } = R.getBoundingClientRect(),
          G = X + Math.abs(X - S) / 2,
          U = z + Math.abs(z - L) / 2,
          Y = document.getElementById(j.inputVertexIds[0]),
          {
            left: Z,
            right: de,
            top: le,
            bottom: ye,
          } = Y.getBoundingClientRect(),
          $e = Z + Math.abs(Z - de) / 2,
          _e = le + Math.abs(le - ye) / 2,
          [Je, Ze] = D({ x: (G - g().x) / w(), y: (U - g().y) / w() }),
          [Qe, et] = D({ x: ($e - g().x) / w(), y: (_e - g().y) / w() }),
          [st, tt] = D({ x: (G - g().x) / w(), y: (U - g().y) / w() }),
          [on, cr] = D({ x: ($e - g().x) / w(), y: (_e - g().y) / w() }),
          ln = `edge_${t().id}_${M}_${j.id}_0`;
        t().outputEdgeIds.set([...t().outputEdgeIds.get(), ln]),
          j.inputEdgeIds.set([...j.inputEdgeIds.get(), ln]),
          u([
            ...m(),
            {
              id: ln,
              nodeStartId: t().id,
              nodeEndId: j.id,
              inputIndex: 0,
              typeOfEdge: "solid",
              outputIndex: M,
              inputVertexId: j.inputVertexIds[0],
              outputVertexId: t().outputVertexIds[M],
              prevStartPosition: { get: Je, set: Ze },
              prevEndPosition: { get: Qe, set: et },
              currStartPosition: { get: st, set: tt },
              currEndPosition: { get: on, set: cr },
            },
          ]),
          t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[M]]);
      }
      $
        ? t()?.isOutputVertex && j.isInputVertex && W()
        : T && t()?.isOutputVertex && j.isInputVertex && W(T.outputVertexIndex),
        s().length <= 1 && s()[0].isOutputVertex
          ? i(s()[0].id)
          : t()?.isOutputVertex && j.isInputVertex && i(j.id);
    }
    return (() => {
      var N = qu();
      return (
        n(
          N,
          o(yt, {
            get children() {
              return o($a, {});
            },
          }),
          null
        ),
        n(
          N,
          o(yt, {
            get children() {
              return [
                o(an, {
                  isOpen: () => y(),
                  onClose: () => k(!1),
                  zIndex: 9999,
                  get children() {
                    return [o(Lu, {}), o(Su, {})];
                  },
                }),
                o(an, {
                  isOpen: () => E(),
                  onClose: () => v(!1),
                  zIndex: 1e5,
                  widthClass:
                    "w-[1100px] min-w-[750px] max-w-[1200px] h-fit max-h-[90vh]",
                  get children() {
                    return o(zu, {});
                  },
                }),
                o(an, {
                  isOpen: () => x(),
                  onClose: () => b(!1),
                  zIndex: 1e5,
                  widthClass: "w-[80vw] max-w-[85vw] h-fit max-h-[90vh]",
                  get children() {
                    return o(Wu, {});
                  },
                }),
              ];
            },
          }),
          null
        ),
        n(
          N,
          o(yt, {
            get children() {
              return o(pi, { onClickAdd: F, nodeMark: ya });
            },
          }),
          null
        ),
        n(
          N,
          o(yt, {
            get children() {
              return o(Ur, {});
            },
          }),
          null
        ),
        n(
          N,
          o(yt, {
            get children() {
              return o(oa, {});
            },
          }),
          null
        ),
        N
      );
    })();
  },
  Uu = "_node_rwgw3_1",
  Gu = "_selectedNode_rwgw3_25",
  Xu = "_switchIcon_rwgw3_61",
  Yu = "_switchNodeText_rwgw3_69",
  Ku = "_switchTitle_rwgw3_85",
  Ju = "_switchDescription_rwgw3_95",
  ut = {
    node: Uu,
    selectedNode: Gu,
    switchIcon: Xu,
    switchNodeText: Yu,
    switchTitle: Ku,
    switchDescription: Ju,
  };
var Zu = _(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const Qu = (e) =>
    (() => {
      var t = Zu(),
        r = t.firstChild,
        s = r.nextSibling,
        a = s.firstChild,
        d = a.nextSibling;
      return (
        q(
          (i) => {
            var l = e.selected ? ut.selectedNode : ut.node,
              p = ut.switchIcon,
              u = ut.switchNodeText,
              m = ut.switchTitle,
              g = ut.switchDescription;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(r, (i.t = p)),
              u !== i.a && V(s, (i.a = u)),
              m !== i.o && V(a, (i.o = m)),
              g !== i.i && V(d, (i.i = g)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  ep = "_testNode_3c9qb_1",
  tp = "_selectedNode_3c9qb_25",
  np = "_testNodeIcon_3c9qb_55",
  op = "_testNodeTitle_3c9qb_63",
  Ht = { testNode: ep, selectedNode: tp, testNodeIcon: np, testNodeTitle: op };
var lp = _(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const rp = (e) =>
    (() => {
      var t = lp(),
        r = t.firstChild,
        s = r.nextSibling;
      return (
        q(
          (a) => {
            var d = e.selected ? Ht.selectedNode : Ht.testNode,
              i = Ht.testNodeIcon,
              l = Ht.testNodeTitle;
            return (
              d !== a.e && V(t, (a.e = d)),
              i !== a.t && V(r, (a.t = i)),
              l !== a.a && V(s, (a.a = l)),
              a
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  ip = "_node_160z5_1",
  ap = "_selectedNode_160z5_23",
  sp = "_switchIcon_160z5_59",
  dp = "_switchNodeText_160z5_67",
  cp = "_switchTitle_160z5_83",
  up = "_switchDescription_160z5_93",
  pt = {
    node: ip,
    selectedNode: ap,
    switchIcon: sp,
    switchNodeText: dp,
    switchTitle: cp,
    switchDescription: up,
  };
var pp = _(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const mp = (e) =>
    (() => {
      var t = pp(),
        r = t.firstChild,
        s = r.nextSibling,
        a = s.firstChild,
        d = a.nextSibling;
      return (
        q(
          (i) => {
            var l = e.selected ? pt.selectedNode : pt.node,
              p = pt.switchIcon,
              u = pt.switchNodeText,
              m = pt.switchTitle,
              g = pt.switchDescription;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(r, (i.t = p)),
              u !== i.a && V(s, (i.a = u)),
              m !== i.o && V(a, (i.o = m)),
              g !== i.i && V(d, (i.i = g)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  vp = "_node_13uy5_1",
  hp = "_selectedNode_13uy5_25",
  fp = "_switchIcon_13uy5_59",
  gp = "_switchNodeText_13uy5_67",
  bp = "_switchTitle_13uy5_83",
  Ot = {
    node: vp,
    selectedNode: hp,
    switchIcon: fp,
    switchNodeText: gp,
    switchTitle: bp,
  };
var xp = _(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const yp = (e) =>
    (() => {
      var t = xp(),
        r = t.firstChild,
        s = r.nextSibling,
        a = s.firstChild;
      return (
        q(
          (d) => {
            var i = e.selected ? Ot.selectedNode : Ot.node,
              l = Ot.switchIcon,
              p = Ot.switchNodeText,
              u = Ot.switchTitle;
            return (
              i !== d.e && V(t, (d.e = i)),
              l !== d.t && V(r, (d.t = l)),
              p !== d.a && V(s, (d.a = p)),
              u !== d.o && V(a, (d.o = u)),
              d
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  wp = "_AiAgentNode_4heyh_1",
  $p = "_selectedNode_4heyh_33",
  _p = "_AiAgentNodeIcon_4heyh_71",
  Tp = "_AiAgentNodeTitle_4heyh_81",
  Cp = "_AiAgentNodeDescription_4heyh_97",
  mt = {
    AiAgentNode: wp,
    selectedNode: $p,
    AiAgentNodeIcon: _p,
    AiAgentNodeTitle: Tp,
    AiAgentNodeDescription: Cp,
  };
var Sp = _("<div><div></div><div><div></div><div>Tools Agent");
const $o = (e) =>
    (() => {
      var t = Sp(),
        r = t.firstChild,
        s = r.nextSibling,
        a = s.firstChild,
        d = a.nextSibling;
      return (
        n(r, o(On, {})),
        n(a, () => e.title),
        q(
          (i) => {
            var l = e.selected ? mt.selectedNode : mt.AiAgentNode,
              p = mt.AiAgentNodeIcon,
              u = mt.AiAgentNodeText,
              m = mt.AiAgentNodeTitle,
              g = mt.AiAgentNodeDescription;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(r, (i.t = p)),
              u !== i.a && V(s, (i.a = u)),
              m !== i.o && V(a, (i.o = m)),
              g !== i.i && V(d, (i.i = g)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Ip = "_EmailNode_imw2c_1",
  Ep = "_selectedNode_imw2c_23",
  Op = "_mailIcon_imw2c_49",
  Dp = "_mailNodeText_imw2c_61",
  Np = "_mailTitle_imw2c_77",
  Ap = "_mailDescription_imw2c_87",
  vt = {
    EmailNode: Ip,
    selectedNode: Ep,
    mailIcon: Op,
    mailNodeText: Dp,
    mailTitle: Np,
    mailDescription: Ap,
  };
var kp = _("<div><div></div><div><div>Send Email</div><div>send");
const Mp = (e) =>
    (() => {
      var t = kp(),
        r = t.firstChild,
        s = r.nextSibling,
        a = s.firstChild,
        d = a.nextSibling;
      return (
        n(r, o(Ll, {})),
        q(
          (i) => {
            var l = e.selected ? vt.selectedNode : vt.EmailNode,
              p = vt.mailIcon,
              u = vt.mailNodeText,
              m = vt.mailTitle,
              g = vt.mailDescription;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(r, (i.t = p)),
              u !== i.a && V(s, (i.a = u)),
              m !== i.o && V(a, (i.o = m)),
              g !== i.i && V(d, (i.i = g)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Pp = "_VectorStoreNode_omif4_1",
  Lp = "_selectedNode_omif4_31",
  Vp = "_VectorStoreNodeIcon_omif4_67",
  Fp = "_VectorStoreNodeTitle_omif4_77",
  Bp = "_VectorStoreNodeText_omif4_97",
  Dt = {
    VectorStoreNode: Pp,
    selectedNode: Lp,
    VectorStoreNodeIcon: Vp,
    VectorStoreNodeTitle: Fp,
    VectorStoreNodeText: Bp,
  };
var Rp = _(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const zp = (e) =>
    (() => {
      var t = Rp(),
        r = t.firstChild,
        s = r.firstChild,
        a = s.nextSibling,
        d = a.firstChild;
      return (
        n(s, o(Vl, {})),
        q(
          (i) => {
            var l = e.selected ? Dt.selectedNode : Dt.VectorStoreNode,
              p = Dt.VectorStoreNodeIcon,
              u = Dt.VectorStoreNodeText,
              m = Dt.VectorStoreNodeTitle;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(s, (i.t = p)),
              u !== i.a && V(a, (i.a = u)),
              m !== i.o && V(d, (i.o = m)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Hp = "_pgVectorNode_4ee5v_1",
  Wp = "_selectedNode_4ee5v_31",
  qp = "_pgVectorNodeIcon_4ee5v_67",
  jp = "_pgVectorNodeTitle_4ee5v_77",
  Up = "_pgVectorNodeText_4ee5v_95",
  Nt = {
    pgVectorNode: Hp,
    selectedNode: Wp,
    pgVectorNodeIcon: qp,
    pgVectorNodeTitle: jp,
    pgVectorNodeText: Up,
  };
var Gp = _(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const Xp = (e) =>
    (() => {
      var t = Gp(),
        r = t.firstChild,
        s = r.firstChild,
        a = s.nextSibling,
        d = a.firstChild;
      return (
        n(s, o(Fl, {})),
        q(
          (i) => {
            var l = e.selected ? Nt.selectedNode : Nt.pgVectorNode,
              p = Nt.pgVectorNodeIcon,
              u = Nt.pgVectorNodeText,
              m = Nt.pgVectorNodeTitle;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(s, (i.t = p)),
              u !== i.a && V(a, (i.a = u)),
              m !== i.o && V(d, (i.o = m)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Yp = "_ollamaChatNode_24diw_1",
  Kp = "_selectedNode_24diw_31",
  Jp = "_ollamaChatNodeIcon_24diw_67",
  Zp = "_ollamaChatNodeTitle_24diw_77",
  Qp = "_ollamaChatNodeText_24diw_95",
  At = {
    ollamaChatNode: Yp,
    selectedNode: Kp,
    ollamaChatNodeIcon: Jp,
    ollamaChatNodeTitle: Zp,
    ollamaChatNodeText: Qp,
  };
var em = _(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const tm = (e) =>
    (() => {
      var t = em(),
        r = t.firstChild,
        s = r.firstChild,
        a = s.nextSibling,
        d = a.firstChild;
      return (
        n(s, o(Bl, {})),
        q(
          (i) => {
            var l = e.selected ? At.selectedNode : At.ollamaChatNode,
              p = At.ollamaChatNodeIcon,
              u = At.ollamaChatNodeText,
              m = `${At.ollamaChatNodeTitle} text-nowrap`;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(s, (i.t = p)),
              u !== i.a && V(a, (i.a = u)),
              m !== i.o && V(d, (i.o = m)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  nm = "_gmailTriggerNode_1hu5j_1",
  om = "_selectedNode_1hu5j_25",
  lm = "_gmailTriggerNodeIcon_1hu5j_55",
  rm = "_gmailTriggerNodeText_1hu5j_65",
  im = "_gmailTriggerNodeTitle_1hu5j_83",
  am = "_gmailTriggerNodeDescription_1hu5j_93",
  ht = {
    gmailTriggerNode: nm,
    selectedNode: om,
    gmailTriggerNodeIcon: lm,
    gmailTriggerNodeText: rm,
    gmailTriggerNodeTitle: im,
    gmailTriggerNodeDescription: am,
  };
var sm = _("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const dm = (e) =>
    (() => {
      var t = sm(),
        r = t.firstChild,
        s = r.nextSibling,
        a = s.firstChild,
        d = a.nextSibling;
      return (
        n(r, o(Rl, {})),
        q(
          (i) => {
            var l = e.selected ? ht.selectedNode : ht.gmailTriggerNode,
              p = ht.gmailTriggerNodeIcon,
              u = ht.gmailTriggerNodeText,
              m = ht.gmailTriggerNodeTitle,
              g = ht.gmailTriggerNodeDescription;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(r, (i.t = p)),
              u !== i.a && V(s, (i.a = u)),
              m !== i.o && V(a, (i.o = m)),
              g !== i.i && V(d, (i.i = g)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  cm = "_createDraftNode_gxi0p_1",
  um = "_selectedNode_gxi0p_31",
  pm = "_createDraftNodeIcon_gxi0p_67",
  mm = "_createDraftNodeTitle_gxi0p_77",
  vm = "_createDraftNodeText_gxi0p_95",
  hm = "_createDraftNodeDescription_gxi0p_115",
  ft = {
    createDraftNode: cm,
    selectedNode: um,
    createDraftNodeIcon: pm,
    createDraftNodeTitle: mm,
    createDraftNodeText: vm,
    createDraftNodeDescription: hm,
  };
var fm = _(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const gm = (e) =>
    (() => {
      var t = fm(),
        r = t.firstChild,
        s = r.firstChild,
        a = s.nextSibling,
        d = a.firstChild,
        i = d.nextSibling;
      return (
        n(s, o(zl, {})),
        q(
          (l) => {
            var p = e.selected ? ft.selectedNode : ft.createDraftNode,
              u = ft.createDraftNodeIcon,
              m = ft.createDraftNodeText,
              g = `${ft.createDraftNodeTitle} text-nowrap`,
              w = ft.createDraftNodeDescription;
            return (
              p !== l.e && V(t, (l.e = p)),
              u !== l.t && V(s, (l.t = u)),
              m !== l.a && V(a, (l.a = m)),
              g !== l.o && V(d, (l.o = g)),
              w !== l.i && V(i, (l.i = w)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  bm = "_embeddingNode_19nxp_1",
  xm = "_selectedNode_19nxp_31",
  ym = "_embeddingNodeIcon_19nxp_67",
  wm = "_embeddingNodeTitle_19nxp_77",
  $m = "_embeddingNodeText_19nxp_95",
  kt = {
    embeddingNode: bm,
    selectedNode: xm,
    embeddingNodeIcon: ym,
    embeddingNodeTitle: wm,
    embeddingNodeText: $m,
  };
var _m = _(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const Tm = (e) =>
    (() => {
      var t = _m(),
        r = t.firstChild,
        s = r.firstChild,
        a = s.nextSibling,
        d = a.firstChild;
      return (
        n(s, o(Hl, {})),
        q(
          (i) => {
            var l = e.selected ? kt.selectedNode : kt.embeddingNode,
              p = kt.embeddingNodeIcon,
              u = kt.embeddingNodeText,
              m = `${kt.embeddingNodeTitle} text-nowrap`;
            return (
              l !== i.e && V(t, (i.e = l)),
              p !== i.t && V(s, (i.t = p)),
              u !== i.a && V(a, (i.a = u)),
              m !== i.o && V(d, (i.o = m)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Cm = {
    chat: {
      name: "chat",
      title: "Chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: rp,
    },
    switch: {
      name: "switch",
      title: "Switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Qu,
    },
    edit: {
      name: "edit",
      title: "EditNode",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: mp,
    },
    filter: {
      name: "filter",
      title: "Filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: yp,
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
      content: $o,
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
      content: $o,
    },
    "send-email": {
      name: "send-email",
      title: "Send Email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Mp,
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
      content: zp,
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
      content: Xp,
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
      content: tm,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      title: "GmailReader",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: dm,
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
      content: gm,
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
      content: Tm,
    },
  },
  Sm = (e) => o(ju, { node: Cm }),
  Im = document.getElementById("root");
Er(() => o(Sm, {}), Im);
