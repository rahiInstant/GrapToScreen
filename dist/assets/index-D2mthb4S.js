(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const d of s)
      if (d.type === "childList")
        for (const r of d.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && i(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const d = {};
    return (
      s.integrity && (d.integrity = s.integrity),
      s.referrerPolicy && (d.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const d = n(s);
    fetch(s.href, d);
  }
})();
const ei = !1,
  ti = (e, t) => e === t,
  ni = Symbol("solid-track"),
  dt = { equals: ti };
let At = Rt;
const Te = 1,
  at = 2,
  Lt = { owned: null, cleanups: null, context: null, owner: null };
var Z = null;
let pt = null,
  ii = null,
  ne = null,
  fe = null,
  Ce = null,
  ft = 0;
function Xe(e, t) {
  const n = ne,
    i = Z,
    s = e.length === 0,
    d = t === void 0 ? i : t,
    r = s
      ? Lt
      : {
          owned: null,
          cleanups: null,
          context: d ? d.context : null,
          owner: d,
        },
    l = s ? e : () => e(() => Ie(() => nt(r)));
  (Z = r), (ne = null);
  try {
    return qe(l, !0);
  } finally {
    (ne = n), (Z = i);
  }
}
function N(e, t) {
  t = t ? Object.assign({}, dt, t) : dt;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    i = (s) => (typeof s == "function" && (s = s(n.value)), Bt(n, s));
  return [zt.bind(n), i];
}
function R(e, t, n) {
  const i = wt(e, t, !1, Te);
  it(i);
}
function Le(e, t, n) {
  At = ui;
  const i = wt(e, t, !1, Te);
  (!n || !n.render) && (i.user = !0), Ce ? Ce.push(i) : it(i);
}
function se(e, t, n) {
  n = n ? Object.assign({}, dt, n) : dt;
  const i = wt(e, t, !0, 0);
  return (
    (i.observers = null),
    (i.observerSlots = null),
    (i.comparator = n.equals || void 0),
    it(i),
    zt.bind(i)
  );
}
function Ie(e) {
  if (ne === null) return e();
  const t = ne;
  ne = null;
  try {
    return e();
  } finally {
    ne = t;
  }
}
function Oe(e) {
  Le(() => Ie(e));
}
function Ye(e) {
  return (
    Z === null ||
      (Z.cleanups === null ? (Z.cleanups = [e]) : Z.cleanups.push(e)),
    e
  );
}
function ri() {
  return Z;
}
function oi(e, t) {
  const n = Z,
    i = ne;
  (Z = e), (ne = null);
  try {
    return qe(t, !0);
  } catch (s) {
    bt(s);
  } finally {
    (Z = n), (ne = i);
  }
}
function si(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: gi(n), defaultValue: e };
}
function li(e) {
  let t;
  return Z && Z.context && (t = Z.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function di(e) {
  const t = se(e),
    n = se(() => mt(t()));
  return (
    (n.toArray = () => {
      const i = n();
      return Array.isArray(i) ? i : i != null ? [i] : [];
    }),
    n
  );
}
function zt() {
  if (this.sources && this.state)
    if (this.state === Te) it(this);
    else {
      const e = fe;
      (fe = null), qe(() => ut(this), !1), (fe = e);
    }
  if (ne) {
    const e = this.observers ? this.observers.length : 0;
    ne.sources
      ? (ne.sources.push(this), ne.sourceSlots.push(e))
      : ((ne.sources = [this]), (ne.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(ne),
          this.observerSlots.push(ne.sources.length - 1))
        : ((this.observers = [ne]),
          (this.observerSlots = [ne.sources.length - 1]));
  }
  return this.value;
}
function Bt(e, t, n) {
  let i = e.value;
  return (
    (!e.comparator || !e.comparator(i, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        qe(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const d = e.observers[s],
              r = pt && pt.running;
            r && pt.disposed.has(d),
              (r ? !d.tState : !d.state) &&
                (d.pure ? fe.push(d) : Ce.push(d), d.observers && Ht(d)),
              r || (d.state = Te);
          }
          if (fe.length > 1e6) throw ((fe = []), new Error());
        }, !1)),
    t
  );
}
function it(e) {
  if (!e.fn) return;
  nt(e);
  const t = ft;
  ai(e, e.value, t);
}
function ai(e, t, n) {
  let i;
  const s = Z,
    d = ne;
  ne = Z = e;
  try {
    i = e.fn(t);
  } catch (r) {
    return (
      e.pure &&
        ((e.state = Te), e.owned && e.owned.forEach(nt), (e.owned = null)),
      (e.updatedAt = n + 1),
      bt(r)
    );
  } finally {
    (ne = d), (Z = s);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? Bt(e, i) : (e.value = i),
    (e.updatedAt = n));
}
function wt(e, t, n, i = Te, s) {
  const d = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Z,
    context: Z ? Z.context : null,
    pure: n,
  };
  return (
    Z === null || (Z !== Lt && (Z.owned ? Z.owned.push(d) : (Z.owned = [d]))), d
  );
}
function ct(e) {
  if (e.state === 0) return;
  if (e.state === at) return ut(e);
  if (e.suspense && Ie(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ft); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === Te)) it(e);
    else if (e.state === at) {
      const i = fe;
      (fe = null), qe(() => ut(e, t[0]), !1), (fe = i);
    }
}
function qe(e, t) {
  if (fe) return e();
  let n = !1;
  t || (fe = []), Ce ? (n = !0) : (Ce = []), ft++;
  try {
    const i = e();
    return ci(n), i;
  } catch (i) {
    n || (Ce = null), (fe = null), bt(i);
  }
}
function ci(e) {
  if ((fe && (Rt(fe), (fe = null)), e)) return;
  const t = Ce;
  (Ce = null), t.length && qe(() => At(t), !1);
}
function Rt(e) {
  for (let t = 0; t < e.length; t++) ct(e[t]);
}
function ui(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const i = e[t];
    i.user ? (e[n++] = i) : ct(i);
  }
  for (t = 0; t < n; t++) ct(e[t]);
}
function ut(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const i = e.sources[n];
    if (i.sources) {
      const s = i.state;
      s === Te
        ? i !== t && (!i.updatedAt || i.updatedAt < ft) && ct(i)
        : s === at && ut(i, t);
    }
  }
}
function Ht(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = at), n.pure ? fe.push(n) : Ce.push(n), n.observers && Ht(n));
  }
}
function nt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        i = e.sourceSlots.pop(),
        s = n.observers;
      if (s && s.length) {
        const d = s.pop(),
          r = n.observerSlots.pop();
        i < s.length &&
          ((d.sourceSlots[r] = i), (s[i] = d), (n.observerSlots[i] = r));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) nt(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) nt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function hi(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function bt(e, t = Z) {
  throw hi(e);
}
function mt(e) {
  if (typeof e == "function" && !e.length) return mt(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const i = mt(e[n]);
      Array.isArray(i) ? t.push.apply(t, i) : t.push(i);
    }
    return t;
  }
  return e;
}
function gi(e, t) {
  return function (i) {
    let s;
    return (
      R(
        () =>
          (s = Ie(
            () => (
              (Z.context = { ...Z.context, [e]: i.value }), di(() => i.children)
            )
          )),
        void 0
      ),
      s
    );
  };
}
const fi = Symbol("fallback");
function St(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function pi(e, t, n = {}) {
  let i = [],
    s = [],
    d = [],
    r = 0,
    l = t.length > 1 ? [] : null;
  return (
    Ye(() => St(d)),
    () => {
      let u = e() || [],
        o = u.length,
        a,
        c;
      return (
        u[ni],
        Ie(() => {
          let S, h, b, m, w, k, g, v, y;
          if (o === 0)
            r !== 0 &&
              (St(d), (d = []), (i = []), (s = []), (r = 0), l && (l = [])),
              n.fallback &&
                ((i = [fi]),
                (s[0] = Xe((O) => ((d[0] = O), n.fallback()))),
                (r = 1));
          else if (r === 0) {
            for (s = new Array(o), c = 0; c < o; c++)
              (i[c] = u[c]), (s[c] = Xe(C));
            r = o;
          } else {
            for (
              b = new Array(o),
                m = new Array(o),
                l && (w = new Array(o)),
                k = 0,
                g = Math.min(r, o);
              k < g && i[k] === u[k];
              k++
            );
            for (
              g = r - 1, v = o - 1;
              g >= k && v >= k && i[g] === u[v];
              g--, v--
            )
              (b[v] = s[g]), (m[v] = d[g]), l && (w[v] = l[g]);
            for (S = new Map(), h = new Array(v + 1), c = v; c >= k; c--)
              (y = u[c]),
                (a = S.get(y)),
                (h[c] = a === void 0 ? -1 : a),
                S.set(y, c);
            for (a = k; a <= g; a++)
              (y = i[a]),
                (c = S.get(y)),
                c !== void 0 && c !== -1
                  ? ((b[c] = s[a]),
                    (m[c] = d[a]),
                    l && (w[c] = l[a]),
                    (c = h[c]),
                    S.set(y, c))
                  : d[a]();
            for (c = k; c < o; c++)
              c in b
                ? ((s[c] = b[c]), (d[c] = m[c]), l && ((l[c] = w[c]), l[c](c)))
                : (s[c] = Xe(C));
            (s = s.slice(0, (r = o))), (i = u.slice(0));
          }
          return s;
        })
      );
      function C(S) {
        if (((d[c] = S), l)) {
          const [h, b] = N(c);
          return (l[c] = b), t(u[c], h);
        }
        return t(u[c]);
      }
    }
  );
}
function p(e, t) {
  return Ie(() => e(t || {}));
}
const vi = (e) => `Stale read from <${e}>.`;
function xe(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return se(pi(() => e.each, e.children, t || void 0));
}
function he(e) {
  const t = e.keyed,
    n = se(() => e.when, void 0, void 0),
    i = t ? n : se(n, void 0, { equals: (s, d) => !s == !d });
  return se(
    () => {
      const s = i();
      if (s) {
        const d = e.children;
        return typeof d == "function" && d.length > 0
          ? Ie(() =>
              d(
                t
                  ? s
                  : () => {
                      if (!Ie(i)) throw vi("Show");
                      return n();
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
function mi(e, t, n) {
  let i = n.length,
    s = t.length,
    d = i,
    r = 0,
    l = 0,
    u = t[s - 1].nextSibling,
    o = null;
  for (; r < s || l < d; ) {
    if (t[r] === n[l]) {
      r++, l++;
      continue;
    }
    for (; t[s - 1] === n[d - 1]; ) s--, d--;
    if (s === r) {
      const a = d < i ? (l ? n[l - 1].nextSibling : n[d - l]) : u;
      for (; l < d; ) e.insertBefore(n[l++], a);
    } else if (d === l)
      for (; r < s; ) (!o || !o.has(t[r])) && t[r].remove(), r++;
    else if (t[r] === n[d - 1] && n[l] === t[s - 1]) {
      const a = t[--s].nextSibling;
      e.insertBefore(n[l++], t[r++].nextSibling),
        e.insertBefore(n[--d], a),
        (t[s] = n[d]);
    } else {
      if (!o) {
        o = new Map();
        let c = l;
        for (; c < d; ) o.set(n[c], c++);
      }
      const a = o.get(t[r]);
      if (a != null)
        if (l < a && a < d) {
          let c = r,
            C = 1,
            S;
          for (
            ;
            ++c < s && c < d && !((S = o.get(t[c])) == null || S !== a + C);

          )
            C++;
          if (C > a - l) {
            const h = t[r];
            for (; l < a; ) e.insertBefore(n[l++], h);
          } else e.replaceChild(n[l++], t[r++]);
        } else r++;
      else t[r++].remove();
    }
  }
}
const Et = "_$DX_DELEGATE";
function xi(e, t, n, i = {}) {
  let s;
  return (
    Xe((d) => {
      (s = d),
        t === document ? e() : f(t, e(), t.firstChild ? null : void 0, n);
    }, i.owner),
    () => {
      s(), (t.textContent = "");
    }
  );
}
function E(e, t, n, i) {
  let s;
  const d = () => {
      const l = document.createElement("template");
      return (l.innerHTML = e), l.content.firstChild;
    },
    r = () => (s || (s = d())).cloneNode(!0);
  return (r.cloneNode = r), r;
}
function pe(e, t = window.document) {
  const n = t[Et] || (t[Et] = new Set());
  for (let i = 0, s = e.length; i < s; i++) {
    const d = e[i];
    n.has(d) || (n.add(d), t.addEventListener(d, wi));
  }
}
function re(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function _(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function _e(e, t, n = {}) {
  const i = Object.keys(t || {}),
    s = Object.keys(n);
  let d, r;
  for (d = 0, r = s.length; d < r; d++) {
    const l = s[d];
    !l || l === "undefined" || t[l] || (Nt(e, l, !1), delete n[l]);
  }
  for (d = 0, r = i.length; d < r; d++) {
    const l = i[d],
      u = !!t[l];
    !l || l === "undefined" || n[l] === u || !u || (Nt(e, l, !0), (n[l] = u));
  }
  return n;
}
function Ne(e, t, n) {
  return Ie(() => e(t, n));
}
function f(e, t, n, i) {
  if ((n !== void 0 && !i && (i = []), typeof t != "function"))
    return ht(e, t, i, n);
  R((s) => ht(e, t(), s, n), i);
}
function Nt(e, t, n) {
  const i = t.trim().split(/\s+/);
  for (let s = 0, d = i.length; s < d; s++) e.classList.toggle(i[s], n);
}
function wi(e) {
  let t = e.target;
  const n = `$$${e.type}`,
    i = e.target,
    s = e.currentTarget,
    d = (u) =>
      Object.defineProperty(e, "target", { configurable: !0, value: u }),
    r = () => {
      const u = t[n];
      if (u && !t.disabled) {
        const o = t[`${n}Data`];
        if ((o !== void 0 ? u.call(t, o, e) : u.call(t, e), e.cancelBubble))
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
      for (; r() && (t = t._$host || t.parentNode || t.host); );
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
    const u = e.composedPath();
    d(u[0]);
    for (let o = 0; o < u.length - 2 && ((t = u[o]), !!r()); o++) {
      if (t._$host) {
        (t = t._$host), l();
        break;
      }
      if (t.parentNode === s) break;
    }
  } else l();
  d(i);
}
function ht(e, t, n, i, s) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const d = typeof t,
    r = i !== void 0;
  if (
    ((e = (r && n[0] && n[0].parentNode) || e),
    d === "string" || d === "number")
  ) {
    if (d === "number" && ((t = t.toString()), t === n)) return n;
    if (r) {
      let l = n[0];
      l && l.nodeType === 3
        ? l.data !== t && (l.data = t)
        : (l = document.createTextNode(t)),
        (n = Be(e, n, i, l));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || d === "boolean") n = Be(e, n, i);
  else {
    if (d === "function")
      return (
        R(() => {
          let l = t();
          for (; typeof l == "function"; ) l = l();
          n = ht(e, l, n, i);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const l = [],
        u = n && Array.isArray(n);
      if (xt(l, t, n, s)) return R(() => (n = ht(e, l, n, i, !0))), () => n;
      if (l.length === 0) {
        if (((n = Be(e, n, i)), r)) return n;
      } else
        u
          ? n.length === 0
            ? kt(e, l, i)
            : mi(e, n, l)
          : (n && Be(e), kt(e, l));
      n = l;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (r) return (n = Be(e, n, i, t));
        Be(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function xt(e, t, n, i) {
  let s = !1;
  for (let d = 0, r = t.length; d < r; d++) {
    let l = t[d],
      u = n && n[e.length],
      o;
    if (!(l == null || l === !0 || l === !1))
      if ((o = typeof l) == "object" && l.nodeType) e.push(l);
      else if (Array.isArray(l)) s = xt(e, l, u) || s;
      else if (o === "function")
        if (i) {
          for (; typeof l == "function"; ) l = l();
          s =
            xt(e, Array.isArray(l) ? l : [l], Array.isArray(u) ? u : [u]) || s;
        } else e.push(l), (s = !0);
      else {
        const a = String(l);
        u && u.nodeType === 3 && u.data === a
          ? e.push(u)
          : e.push(document.createTextNode(a));
      }
  }
  return s;
}
function kt(e, t, n = null) {
  for (let i = 0, s = t.length; i < s; i++) e.insertBefore(t[i], n);
}
function Be(e, t, n, i) {
  if (n === void 0) return (e.textContent = "");
  const s = i || document.createTextNode("");
  if (t.length) {
    let d = !1;
    for (let r = t.length - 1; r >= 0; r--) {
      const l = t[r];
      if (s !== l) {
        const u = l.parentNode === e;
        !d && !r
          ? u
            ? e.replaceChild(s, l)
            : e.insertBefore(s, n)
          : u && l.remove();
      } else d = !0;
    }
  } else e.insertBefore(s, n);
  return [s];
}
const bi = "http://www.w3.org/2000/svg";
function yi(e, t = !1) {
  return t ? document.createElementNS(bi, e) : document.createElement(e);
}
function _i(e) {
  const { useShadow: t } = e,
    n = document.createTextNode(""),
    i = () => e.mount || document.body,
    s = ri();
  let d;
  return (
    Le(
      () => {
        d || (d = oi(s, () => se(() => e.children)));
        const r = i();
        if (r instanceof HTMLHeadElement) {
          const [l, u] = N(!1),
            o = () => u(!0);
          Xe((a) => f(r, () => (l() ? a() : d()), null)), Ye(o);
        } else {
          const l = yi(e.isSVG ? "g" : "div", e.isSVG),
            u = t && l.attachShadow ? l.attachShadow({ mode: "open" }) : l;
          Object.defineProperty(l, "_$host", {
            get() {
              return n.parentNode;
            },
            configurable: !0,
          }),
            f(u, d),
            r.appendChild(l),
            e.ref && e.ref(l),
            Ye(() => r.removeChild(l));
        }
      },
      void 0,
      { render: !0 }
    ),
    n
  );
}
const $i = "_draggable_q87cm_71",
  Ci = "_dragging_q87cm_79",
  Ii = "_selection_q87cm_87",
  Si = "_testWorkFlow_q87cm_245",
  Ei = "_loader_q87cm_273",
  Ni = "_testButton_q87cm_315",
  ki = "_zoomControl_q87cm_337",
  Pi = "_zoomFit_q87cm_355",
  Vi = "_zoomIn_q87cm_409",
  Ti = "_zoomOut_q87cm_461",
  Oi = "_zoomReset_q87cm_513",
  Di = "_zoomResetHide_q87cm_565",
  ge = {
    "dot-flow__pane": "_dot-flow__pane_q87cm_63",
    draggable: $i,
    dragging: Ci,
    selection: Ii,
    "dot-flow__viewport": "_dot-flow__viewport_q87cm_97",
    "dot-flow__background": "_dot-flow__background_q87cm_127",
    testWorkFlow: Si,
    loader: Ei,
    testButton: Ni,
    zoomControl: ki,
    zoomFit: Pi,
    zoomIn: Vi,
    zoomOut: Ti,
    zoomReset: Oi,
    zoomResetHide: Di,
  },
  [Ut, Wt] = N(!1),
  [Ft, jt] = N(!1),
  [Xt, Yt] = N(!1),
  [qt, Gt] = N(1),
  [Zt, Kt] = N([]),
  [Jt, Qt] = N(null),
  [en, tn] = N([]),
  [nn, rn] = N(0);
let [on, sn] = N(!1),
  ln;
const [dn, an] = N({ x: 0, y: 0 }),
  [cn, un] = N({ x: 0, y: 0 }),
  [hn, gn] = N([]),
  [fn, pn] = N({ x: 0, y: 0 }),
  [vn, mn] = N(null),
  [xn, wn] = N(null),
  [bn, yn] = N(null),
  [_n, $n] = N(!1),
  [Cn, In] = N({ x: 0, y: 0 }),
  [Sn, En] = N(!1),
  [Nn, kn] = N(!1),
  [Pn, Vn] = N(!1),
  [Tn, On] = N(""),
  [Dn, Mn] = N(null),
  [An, Ln] = N({ name: "", id: "" }),
  [zn, Bn] = N([]),
  [Rn, Hn] = N(null),
  [Un, Wn] = N({}),
  Fn = si({
    scale: qt,
    setScale: Gt,
    draggable: Ut,
    setDraggable: Wt,
    isCtrlPressed: Ft,
    setIsCtrlPressed: jt,
    isSpacePressed: Xt,
    setIsSpacePressed: Yt,
    edges: Zt,
    setEdges: Kt,
    newEdge: Jt,
    setNewEdge: Qt,
    busyIndex: en,
    setBusyIndex: tn,
    edgeLength: nn,
    setEdgeLength: rn,
    isOpen: on,
    setIsOpen: sn,
    inputRef: ln,
    edgeEnd: dn,
    setEdgeEnd: an,
    transform: cn,
    setTransform: un,
    nodes: hn,
    setNodes: gn,
    preTransform: fn,
    setPreTransform: pn,
    selectedNode: vn,
    setSelectedNode: mn,
    pendingOutput: xn,
    setPendingOutput: wn,
    lastClickPosition: bn,
    setLastClickPosition: yn,
    isShowModal: _n,
    setIsShowModal: $n,
    positionButton: Cn,
    setPositionButton: In,
    isOpening: Sn,
    setIsOpening: En,
    isModalOpen: Nn,
    setIsModalOpen: kn,
    typeOfVertex: Tn,
    setTypeOfVertex: On,
    formConfig: An,
    setFormConfig: Ln,
    isModalOpen2: Pn,
    setIsModalOpen2: Vn,
    credentialOptions: zn,
    setCredentialOptions: Bn,
    selectedCredential: Rn,
    setSelectedCredential: Hn,
    formData: Un,
    setFormData: Wn,
    settingConfig: Dn,
    setSettingConfig: Mn,
  }),
  we = () => {
    const e = li(Fn);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var Mi = E(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const Ai = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: n,
    setIsCtrlPressed: i,
    setIsSpacePressed: s,
    isCtrlPressed: d,
    isSpacePressed: r,
    scale: l,
    setScale: u,
    nodes: o,
    setTransform: a,
    setPreTransform: c,
    transform: C,
  } = we();
  Oe(() => {
    const m = document.getElementById("pane"),
      w = (g) => {
        g.ctrlKey || (n(!1), i(!1)),
          g.code == "Space" && (g.preventDefault(), s(!1), n(!1));
      },
      k = (g) => {
        g.ctrlKey && (n(!0), i(!0)),
          g.code == "Space" && (g.preventDefault(), s(!0), n(!0));
      };
    if (m) {
      const g = (v) => {
        v.preventDefault(),
          d() || r()
            ? (console.log("good"),
              b(v, () => l() + v.deltaY * -1e-4, "cursor"))
            : v.shiftKey
            ? a((y) => ({ x: y.x - v.deltaY * 0.5, y: y.y }))
            : a((y) => ({ x: y.x, y: y.y - v.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", w),
        document.addEventListener("keydown", k),
        m.addEventListener("wheel", g, { passive: !1 }),
        Ye(() => {
          document.removeEventListener("keydown", k),
            document.removeEventListener("keyup", w),
            m.removeEventListener("wheel", g);
        });
    }
  });
  function S(m) {
    if (m.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const w = Math.min(...m.map((y) => y.currPosition.get().x)),
      k = Math.min(...m.map((y) => y.currPosition.get().y)),
      g = Math.max(
        ...m.map((y) => {
          const O = document.getElementById(y.id);
          return O
            ? y.currPosition.get().x + O.clientWidth
            : y.currPosition.get().x;
        })
      ),
      v = Math.max(
        ...m.map((y) => {
          const O = document.getElementById(y.id);
          return O
            ? y.currPosition.get().y + O.clientHeight
            : y.currPosition.get().y;
        })
      );
    return { minX: w, minY: k, width: g - w, height: v - k };
  }
  function h() {
    const m = document.getElementById("pane");
    if (!m) return;
    const w = S(o());
    if (!w) return;
    const k = 80,
      g = m.getBoundingClientRect(),
      v = g.width - k * 2,
      y = g.height - k * 2,
      O = v / w.width,
      D = y / w.height,
      B = Math.min(O, D, 1),
      z = w.minX + w.width / 2,
      j = w.minY + w.height / 2,
      F = g.width / 2 - z * B,
      Y = g.height / 2 - j * B;
    u(B), a({ x: F, y: Y }), c({ x: F, y: Y });
  }
  const b = (m, w, k = "cursor") => {
    const g = document.getElementById("pane");
    if (!g) return;
    m.preventDefault();
    const v = g.getBoundingClientRect(),
      y = k === "cursor" ? m.clientX - v.left : v.width / 2,
      O = k === "cursor" ? m.clientY - v.top : v.height / 2,
      D = l(),
      B = Math.min(Math.max(e, w()), t),
      z = (y - C().x) / D,
      j = (O - C().y) / D,
      F = y - z * B,
      Y = O - j * B;
    u(B), a({ x: F, y: Y }), c({ x: F, y: Y });
  };
  return (() => {
    var m = Mi(),
      w = m.firstChild,
      k = w.nextSibling,
      g = k.nextSibling,
      v = g.nextSibling;
    return (
      (w.$$click = () => h()),
      (k.$$click = (y) => b(y, () => l() + 0.01, "center")),
      (g.$$click = (y) => b(y, () => Math.max(0, l() - 0.01), "center")),
      (v.$$click = (y) =>
        b(y, () => (u(1), a({ x: 0, y: 0 }), c({ x: 0, y: 0 }), 1), "center")),
      R(
        (y) => {
          var O = ge.zoomControl,
            D = ge.zoomFit,
            B = ge.zoomIn,
            z = ge.zoomOut,
            j = l() > 1 || l() < 1 ? ge.zoomReset : ge.zoomResetHide;
          return (
            O !== y.e && _(m, (y.e = O)),
            D !== y.t && _(w, (y.t = D)),
            B !== y.a && _(k, (y.a = B)),
            z !== y.o && _(g, (y.o = z)),
            j !== y.i && _(v, (y.i = j)),
            y
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      m
    );
  })();
};
pe(["click"]);
const Li = "_sidebarMain_dxkxu_1",
  zi = "_addNode_dxkxu_11",
  Bi = "_sidebarContent_dxkxu_71",
  Ri = "_nodeList_dxkxu_99",
  Hi = "_sidebarContentShow_dxkxu_113",
  Ui = "_sidebarContentHide_dxkxu_123",
  Wi = "_sidebarTitle_dxkxu_135",
  Fi = "_searchContainer_dxkxu_153",
  ji = "_inputFieldContainer_dxkxu_161",
  Xi = "_inputField_dxkxu_161",
  Yi = "_searchIcon_dxkxu_211",
  qi = "_firstWrapper_dxkxu_229",
  Gi = "_restNodeWrapper_dxkxu_251",
  Zi = "_node_dxkxu_99",
  Ki = "_nodeIcon_dxkxu_299",
  Ji = "_title_dxkxu_311",
  Qi = "_description_dxkxu_325",
  ue = {
    sidebarMain: Li,
    addNode: zi,
    sidebarContent: Bi,
    nodeList: Ri,
    sidebarContentShow: Hi,
    sidebarContentHide: Ui,
    sidebarTitle: Wi,
    searchContainer: Fi,
    inputFieldContainer: ji,
    inputField: Xi,
    searchIcon: Yi,
    firstWrapper: qi,
    restNodeWrapper: Gi,
    node: Zi,
    nodeIcon: Ki,
    title: Ji,
    description: Qi,
  };
var er = E(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  tr = E("<div><div><div></div><div><div></div><div>");
const nr = (e) => {
  const { isOpen: t, setIsOpen: n } = we();
  let i;
  const s = (r) => {
    const l = document.getElementById("sidebar-main"),
      u = document.querySelectorAll('[id^="output-"]');
    let o = !1;
    u.forEach((a) => {
      a.contains(r.target) && (o = !0);
    }),
      l && !l.contains(r.target) && !o && n(!1);
  };
  Oe(() => {
    document.addEventListener("click", s);
  });
  const d = (r, l) => {
    r.stopPropagation(), e.onClickAdd(l);
  };
  return (() => {
    var r = er(),
      l = r.firstChild,
      u = l.nextSibling,
      o = u.firstChild,
      a = o.nextSibling,
      c = a.firstChild,
      C = c.firstChild,
      S = C.nextSibling,
      h = a.nextSibling;
    return (
      (l.$$click = () => {
        n(!0), i && i.focus();
      }),
      Ne((b) => (i = b), S),
      f(
        h,
        p(xe, {
          get each() {
            return e.nodeMark;
          },
          children: (b, m) =>
            (() => {
              var w = tr(),
                k = w.firstChild,
                g = k.firstChild,
                v = g.nextSibling,
                y = v.firstChild,
                O = y.nextSibling;
              return (
                (w.$$click = (D) => d(D, b.name)),
                f(g, p(b.icon, {})),
                f(y, () => b.title),
                f(O, () => b.description),
                R(
                  (D) => {
                    var B = m() == 0 ? ue.firstWrapper : ue.restNodeWrapper,
                      z = ue.node,
                      j = ue.nodeIcon,
                      F = ue.title,
                      Y = ue.description;
                    return (
                      B !== D.e && _(w, (D.e = B)),
                      z !== D.t && _(k, (D.t = z)),
                      j !== D.a && _(g, (D.a = j)),
                      F !== D.o && _(y, (D.o = F)),
                      Y !== D.i && _(O, (D.i = Y)),
                      D
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
                ),
                w
              );
            })(),
        })
      ),
      R(
        (b) => {
          var m = ue.sidebarMain,
            w = ue.addNode,
            k = {
              [ue.sidebarContent]: !0,
              [ue.sidebarContentShow]: t(),
              [ue.sidebarContentHide]: !t(),
            },
            g = ue.sidebarTitle,
            v = ue.searchContainer,
            y = ue.inputFieldContainer,
            O = ue.searchIcon,
            D = ue.inputField,
            B = ue.nodeList;
          return (
            m !== b.e && _(r, (b.e = m)),
            w !== b.t && _(l, (b.t = w)),
            (b.a = _e(u, k, b.a)),
            g !== b.o && _(o, (b.o = g)),
            v !== b.i && _(a, (b.i = v)),
            y !== b.n && _(c, (b.n = y)),
            O !== b.s && _(C, (b.s = O)),
            D !== b.h && _(S, (b.h = D)),
            B !== b.r && _(h, (b.r = B)),
            b
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
      r
    );
  })();
};
pe(["click"]);
const ir = "_node_kk5n8_1",
  rr = "_nodeSelected_kk5n8_47",
  or = "_inputsWrapper_kk5n8_97",
  sr = "_input_kk5n8_97",
  lr = "_inputsUPWrapper_kk5n8_145",
  dr = "_inputUp_kk5n8_177",
  ar = "_outputsDownWrapper_kk5n8_205",
  cr = "_outputDown_kk5n8_237",
  ur = "_outputDownVertex_kk5n8_251",
  hr = "_downOutputLine_kk5n8_269",
  gr = "_downPlusLine_kk5n8_285",
  fr = "_outputsWrapper_kk5n8_319",
  pr = "_output_kk5n8_205",
  vr = "_outputCircle_kk5n8_365",
  mr = "_outputLine_kk5n8_391",
  xr = "_plusLine_kk5n8_407",
  wr = "_vertexNum_kk5n8_427",
  br = "_plusLineHidden_kk5n8_493",
  yr = "_outputPlus_kk5n8_503",
  _r = "_functionWrapper_kk5n8_595",
  te = {
    node: ir,
    nodeSelected: rr,
    inputsWrapper: or,
    input: sr,
    inputsUPWrapper: lr,
    inputUp: dr,
    outputsDownWrapper: ar,
    outputDown: cr,
    outputDownVertex: ur,
    downOutputLine: hr,
    downPlusLine: gr,
    outputsWrapper: fr,
    output: pr,
    outputCircle: vr,
    outputLine: mr,
    plusLine: xr,
    vertexNum: wr,
    plusLineHidden: br,
    outputPlus: yr,
    function: "_function_kk5n8_561",
    functionWrapper: _r,
  };
var $r = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const Pt = (e) => $r();
var Ee = E("<div>"),
  Vt = E("<div><div>"),
  Tt = E("<div><div></div><div><div></div><div id=plus>");
const Cr = (e) => {
  const { newEdge: t, edgeLength: n, setIsOpen: i, setPendingOutput: s } = we();
  function d(u, o) {
    const { left: a, right: c, top: C, bottom: S } = u.getBoundingClientRect(),
      h = a + Math.abs(a - c) / 2,
      b = C + Math.abs(C - S) / 2;
    e.onMouseEnterInput(h, b, e.id, o);
  }
  function r(u) {
    e.onMouseLeaveInput(e.id, u);
  }
  function l(u, o, a, c, C) {
    o.stopPropagation();
    const { left: S, right: h, top: b, bottom: m } = u.getBoundingClientRect(),
      w = S + Math.abs(S - h) / 2,
      k = b + Math.abs(b - m) / 2;
    e.onMouseDownOutput(w, k, e.id, a, c, C);
  }
  return (() => {
    var u = Ee();
    return (
      f(
        u,
        (() => {
          var o = se(() => !!e.isInputVertex);
          return () =>
            o()
              ? (() => {
                  var a = Ee();
                  return (
                    f(
                      a,
                      p(xe, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (c, C) => {
                          let S = null;
                          return (() => {
                            var h = Vt(),
                              b = h.firstChild;
                            h.addEventListener("mouseleave", () => r(C())),
                              h.addEventListener("mouseenter", () => d(S, C())),
                              re(h, "id", `input-${c}`);
                            var m = S;
                            return (
                              typeof m == "function" ? Ne(m, b) : (S = b),
                              re(b, "id", c),
                              R(() => _(b, te.input)),
                              h
                            );
                          })();
                        },
                      })
                    ),
                    R(() => _(a, te.inputsWrapper)),
                    a
                  );
                })()
              : Ee();
        })(),
        null
      ),
      f(
        u,
        (() => {
          var o = se(() => !!e.isOutputVertex);
          return () =>
            o() &&
            (() => {
              var a = Ee();
              return (
                f(
                  a,
                  p(xe, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (c, C) => {
                      let S = null;
                      return (() => {
                        var h = Tt(),
                          b = h.firstChild,
                          m = b.nextSibling,
                          w = m.firstChild,
                          k = w.nextSibling;
                        (h.$$mousedown = (v) => l(S, v, C(), c, "solid")),
                          (h.$$click = (v) => {
                            v.stopPropagation(),
                              i(!0),
                              s({ nodeId: e.id, outputVertexIndex: C() });
                          }),
                          re(h, "id", `output-${c}`);
                        var g = S;
                        return (
                          typeof g == "function" ? Ne(g, b) : (S = b),
                          re(b, "id", c),
                          f(
                            m,
                            (() => {
                              var v = se(() => e.numberOutputs > 1);
                              return () =>
                                v() &&
                                (() => {
                                  var y = Ee();
                                  return (
                                    f(y, C), R(() => _(y, te.vertexNum)), y
                                  );
                                })();
                            })(),
                            w
                          ),
                          f(k, p(Pt, {})),
                          R(
                            (v) => {
                              var y = te.output,
                                O = te.outputCircle,
                                D = {
                                  [te.plusLine]: !0,
                                  [te.plusLineHidden]:
                                    (t()?.outputVertexId == c && n() > 10) ||
                                    e.busyIndex.get().includes(c),
                                },
                                B = te.outputLine,
                                z = te.outputPlus;
                              return (
                                y !== v.e && _(h, (v.e = y)),
                                O !== v.t && _(b, (v.t = O)),
                                (v.a = _e(m, D, v.a)),
                                B !== v.o && _(w, (v.o = B)),
                                z !== v.i && _(k, (v.i = z)),
                                v
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
                          h
                        );
                      })();
                    },
                  })
                ),
                R(() => _(a, te.outputsWrapper)),
                a
              );
            })();
        })(),
        null
      ),
      f(
        u,
        (() => {
          var o = se(() => !!e.isDownVertex);
          return () =>
            o() &&
            (() => {
              var a = Ee();
              return (
                f(
                  a,
                  p(xe, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (c, C) => {
                      let S = null;
                      return (() => {
                        var h = Tt(),
                          b = h.firstChild,
                          m = b.nextSibling,
                          w = m.firstChild,
                          k = w.nextSibling;
                        (h.$$mousedown = (v) => l(S, v, C(), c, "dash")),
                          (h.$$click = (v) => {
                            v.stopPropagation(),
                              i(!0),
                              s({ nodeId: e.id, outputVertexIndex: C() });
                          }),
                          re(h, "id", `output-${c}`);
                        var g = S;
                        return (
                          typeof g == "function" ? Ne(g, b) : (S = b),
                          re(b, "id", c),
                          f(k, p(Pt, {})),
                          R(
                            (v) => {
                              var y = te.outputDown,
                                O = te.outputDownVertex,
                                D = {
                                  [te.downPlusLine]: !0,
                                  [te.plusLineHidden]:
                                    (t()?.outputVertexId == c && n() > 10) ||
                                    e.busyIndex.get().includes(c),
                                },
                                B = te.downOutputLine,
                                z = te.outputPlus;
                              return (
                                y !== v.e && _(h, (v.e = y)),
                                O !== v.t && _(b, (v.t = O)),
                                (v.a = _e(m, D, v.a)),
                                B !== v.o && _(w, (v.o = B)),
                                z !== v.i && _(k, (v.i = z)),
                                v
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
                          h
                        );
                      })();
                    },
                  })
                ),
                R(() => _(a, `${te.outputsDownWrapper} `)),
                a
              );
            })();
        })(),
        null
      ),
      f(
        u,
        (() => {
          var o = se(() => !!e.isUpVertex);
          return () =>
            o()
              ? (() => {
                  var a = Ee();
                  return (
                    f(
                      a,
                      p(xe, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (c, C) => {
                          let S = null;
                          return (() => {
                            var h = Vt(),
                              b = h.firstChild;
                            h.addEventListener("mouseleave", () => r(C())),
                              h.addEventListener("mouseenter", () => d(S, C())),
                              re(h, "id", `input-${c}`);
                            var m = S;
                            return (
                              typeof m == "function" ? Ne(m, b) : (S = b),
                              re(b, "id", c),
                              R(() => _(b, te.inputUp)),
                              h
                            );
                          })();
                        },
                      })
                    ),
                    R(() => _(a, te.inputsUPWrapper)),
                    a
                  );
                })()
              : Ee();
        })(),
        null
      ),
      u
    );
  })();
};
pe(["click", "mousedown"]);
var Ir = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const Sr = (e) => Ir();
var Er = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const Nr = (e) => Er();
var kr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const Pr = (e) => kr();
var Vr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const Tr = (e) => Vr(),
  Or = {
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
var Dr = E(
  "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
);
const Mr = (e) => {
  const {
    setIsShowModal: t,
    isShowModal: n,
    setPositionButton: i,
    setIsOpening: s,
    setIsModalOpen: d,
    setFormConfig: r,
    setSettingConfig: l,
  } = we();
  return (() => {
    var u = Dr(),
      o = u.firstChild,
      a = o.firstChild,
      c = a.firstChild,
      C = c.nextSibling,
      S = C.nextSibling,
      h = S.nextSibling,
      b = o.nextSibling;
    return (
      Ne((m) => m, u),
      (u.$$pointerdown = (m) => {
        m.stopPropagation(), e.onMouseDownNode(m, e.id);
      }),
      (u.$$dblclick = () => {
        document.getElementById("modal"),
          d(!0),
          console.log(e.name),
          r({ name: e.name, id: e.id }),
          l(Or[e.name]);
      }),
      (c.$$click = (m) => m.stopPropagation()),
      f(c, p(Sr, {})),
      (C.$$click = (m) => m.stopPropagation()),
      f(C, p(Nr, {})),
      (S.$$pointerdown = (m) => {
        m.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      f(S, p(Pr, {})),
      (h.$$click = (m) => m.stopPropagation()),
      f(h, p(Tr, {})),
      f(
        b,
        p(e.content, {
          get selected() {
            return e.selected;
          },
        })
      ),
      f(
        u,
        p(Cr, {
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
      R(
        (m) => {
          var w = e.id,
            k = e.selected ? te.nodeSelected : te.node,
            g = `translate(${e.x}px, ${e.y}px)`,
            v = te.functionWrapper,
            y = te.function;
          return (
            w !== m.e && re(u, "id", (m.e = w)),
            k !== m.t && _(u, (m.t = k)),
            g !== m.a &&
              ((m.a = g) != null
                ? u.style.setProperty("transform", g)
                : u.style.removeProperty("transform")),
            v !== m.o && _(o, (m.o = v)),
            y !== m.i && _(a, (m.i = y)),
            m
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      u
    );
  })();
};
pe(["dblclick", "pointerdown", "click"]);
const Ar = "_wrapper_cfrao_1",
  Lr = "_edge_cfrao_33",
  zr = "_edgeDash_cfrao_63",
  Br = "_icon_cfrao_105",
  Rr = "_circle_cfrao_119",
  Hr = "_edgeNew_cfrao_189",
  Ae = {
    wrapper: Ar,
    edge: Lr,
    delete: "_delete_cfrao_47",
    edgeDash: zr,
    icon: Br,
    circle: Rr,
    edgeNew: Hr,
  };
var Ur = E(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path marker-end=url(#arrowhead)></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const Ot = (e) => {
  const [t, n] = N({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    { typeOfVertex: i } = we();
  Le(() => {
    const u = e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      o = e.position.y0 + (e.position.y1 - e.position.y0) / 2;
    n({ x: u, y: o });
  });
  const s = (u) => {
      u.stopPropagation(), e.onMouseDownEdge();
    },
    d = (u) => {
      u.stopPropagation(), e.onClickDeleteEdge();
    },
    r = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    l = (u, o, a, c) => {
      const S = u + 40,
        h = a - 40,
        b = a - u,
        m = c - o,
        w = 120,
        k = 105,
        g = r();
      function v() {
        return m > 105 && m < 135 ? 0 : 10;
      }
      function y() {
        return `
      M ${u} ${o}
      L ${S - 10} ${o}
      Q ${S} ${o} ${S} ${o + 10}
  
      L ${S} ${o + w - 10}
      Q ${S} ${o + w} ${S - 10} ${o + w}
  
      L ${h + 10} ${o + w}
      Q ${h} ${o + w} ${h} ${m > k ? o + w + v() : o + w - v()}
  
      L ${h} ${m > k ? c - v() : c + v()}
      Q ${h} ${c} ${h + 10} ${c}
  
      L ${a} ${c}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${u} ${o} C ${u} ${o + g}, ${a} ${c - g}, ${a} ${c}`
        : (e.isNew && e.edgeLength() > 40 && b < 40) || (!e.isNew && b < 40)
        ? y()
        : `M ${u} ${o} C ${u + g} ${o}, ${a - g} ${c}, ${a} ${c}`;
    };
  return (() => {
    var u = Ur(),
      o = u.firstChild,
      a = o.nextSibling,
      c = a.nextSibling,
      C = c.firstChild,
      S = C.nextSibling;
    return (
      (a.$$mousedown = s),
      (c.$$mousedown = d),
      R(
        (h) => {
          var b = Ae.wrapper,
            m = `${e.isNew ? Ae.edgeNew : Ae.edge} ${
              e.typeOfEdge == "dash" ? Ae.edgeDash : ""
            }`,
            w = l(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            k = Ae.delete,
            g = `translate(${t().x}, ${t().y})`,
            v = Ae.circle,
            y = Ae.icon;
          return (
            b !== h.e && re(u, "class", (h.e = b)),
            m !== h.t && re(a, "class", (h.t = m)),
            w !== h.a && re(a, "d", (h.a = w)),
            k !== h.o && re(c, "class", (h.o = k)),
            g !== h.i && re(c, "transform", (h.i = g)),
            v !== h.n && re(C, "class", (h.n = v)),
            y !== h.s && re(S, "class", (h.s = y)),
            h
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
      u
    );
  })();
};
pe(["mousedown"]);
var Wr = E(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0">'
  ),
  Dt = E("<div>");
const Fr = ({ nodes: e, setNodes: t }) => {
  const [n, i] = N({ x: -1, y: -1 }),
    [s, d] = N(!1),
    {
      draggable: r,
      isCtrlPressed: l,
      isSpacePressed: u,
      scale: o,
      edges: a,
      newEdge: c,
      setEdges: C,
      setNewEdge: S,
      transform: h,
      setTransform: b,
      preTransform: m,
      setPreTransform: w,
      selectedNode: k,
      setSelectedNode: g,
      setLastClickPosition: v,
      setEdgeLength: y,
      setTypeOfVertex: O,
    } = we(),
    [D, B] = N(null),
    [z, j] = N(null),
    [F, Y] = N(null),
    [le, ve] = N([]),
    [J, K] = N(null),
    [ie, de] = N(null);
  Oe(() => {
    const P = (L) => {
      if (L.code === "Delete") {
        if (le() && k() === null)
          le().forEach((A) => {
            const x = e().find((I) => I.id === A);
            x && $e(x.id);
          }),
            K(null);
        else if (k() !== null) {
          const A = e().find((x) => x.id === k());
          A && $e(A.id);
        }
      }
    };
    document.addEventListener("keydown", P),
      Ye(() => {
        document.removeEventListener("keydown", P);
      });
  });
  function be(P) {
    const L = window.innerWidth,
      A = window.innerHeight;
    let x = 0,
      I = 0;
    const $ = 60,
      M = 10;
    if (
      (P.clientX < $ ? (x = M) : P.clientX > L - $ && (x = -10),
      P.clientY < $ ? (I = M) : P.clientY > A - $ && (I = -10),
      x !== 0 || I !== 0)
    ) {
      if (
        (b((V) => ({ x: V.x + x, y: V.y + I })),
        w((V) => ({ x: V.x + x, y: V.y + I })),
        J()
          ? i((V) => ({ x: V.x - x, y: V.y - I }))
          : i((V) => ({ x: V.x + x, y: V.y + I })),
        J())
      )
        K((V) => ({
          x: V.x - x / o(),
          y: V.y - I / o(),
          width: V.width,
          height: V.height,
        })),
          le().forEach((V) => {
            const T = e().find((W) => W.id === V);
            if (T) {
              const W = T.currPosition.get();
              T.currPosition.set({ x: W.x - x / o(), y: W.y - I / o() }),
                T.inputEdgeIds.get().forEach((q) => {
                  const H = a().find((Q) => Q.id === q);
                  if (H) {
                    const Q = H.currEndPosition.get();
                    H.currEndPosition.set({
                      x: Q.x - x / o(),
                      y: Q.y - I / o(),
                    });
                  }
                }),
                T.outputEdgeIds.get().forEach((q) => {
                  const H = a().find((Q) => Q.id === q);
                  if (H) {
                    const Q = H.currStartPosition.get();
                    H.currStartPosition.set({
                      x: Q.x - x / o(),
                      y: Q.y - I / o(),
                    });
                  }
                });
            }
          });
      else if (k() !== null) {
        const V = e().find((T) => T.id === k());
        if (V) {
          const T = V.currPosition.get();
          V.currPosition.set({ x: T.x - x / o(), y: T.y - I / o() }),
            V.inputEdgeIds.get().forEach((W) => {
              const q = a().find((H) => H.id === W);
              if (q) {
                const H = q.currEndPosition.get();
                q.currEndPosition.set({ x: H.x - x / o(), y: H.y - I / o() });
              }
            }),
            V.outputEdgeIds.get().forEach((W) => {
              const q = a().find((H) => H.id === W);
              if (q) {
                const H = q.currStartPosition.get();
                q.currStartPosition.set({ x: H.x - x / o(), y: H.y - I / o() });
              }
            });
        }
      }
    }
  }
  const U = (P) => {
      const L = l() || u(),
        A = P.x - n().x,
        x = P.y - n().y;
      if (F()) {
        const I = n(),
          $ = P.clientX - I.x,
          M = P.clientY - I.y;
        Y({ x: I.x, y: I.y, width: $, height: M });
        const V = {
            x: Math.min(I.x, P.clientX),
            y: Math.min(I.y, P.clientY),
            width: Math.abs($),
            height: Math.abs(M),
          },
          T = e().filter((W) => {
            const q = document.getElementById(W.id);
            if (!q) return !1;
            const H = W.currPosition.get().x * o() + h().x,
              Q = W.currPosition.get().y * o() + h().y,
              ce = q.offsetWidth,
              oe = q.offsetHeight;
            return (
              H + ce > V.x &&
              H < V.x + V.width &&
              Q + oe > V.y &&
              Q < V.y + V.height
            );
          });
        ve(T.map((W) => W.id));
      }
      if (J() && ie()) {
        const I = P.clientX - ie().x,
          $ = P.clientY - ie().y,
          M = J();
        K({
          x: M.x + I / o(),
          y: M.y + $ / o(),
          width: M.width,
          height: M.height,
        }),
          le().forEach((V) => {
            const T = e().find((W) => W.id === V);
            if (T) {
              const W = T.currPosition.get(),
                q = W.x + I / o(),
                H = W.y + $ / o();
              T.currPosition.set({ x: q, y: H }),
                T.inputEdgeIds.get().forEach((Q) => {
                  const ce = a().find((oe) => oe.id === Q);
                  if (ce) {
                    const oe = ce.currEndPosition.get();
                    ce.currEndPosition.set((Ge) => ({
                      x: oe.x + I / o(),
                      y: oe.y + $ / o(),
                    }));
                  }
                }),
                T.outputEdgeIds.get().forEach((Q) => {
                  const ce = a().find((oe) => oe.id === Q);
                  if (ce) {
                    const oe = ce.currStartPosition.get();
                    ce.currStartPosition.set((Ge) => ({
                      x: oe.x + I / o(),
                      y: oe.y + $ / o(),
                    }));
                  }
                });
            }
          }),
          de({ x: P.clientX, y: P.clientY }),
          be(P);
      } else if (n().x >= 0 && k() !== null) {
        const I = e().find(($) => $.id === k());
        if (I) {
          I.currPosition.set(($) => ({
            x: (I.prevPosition.get().x + A) / o(),
            y: (I.prevPosition.get().y + x) / o(),
          }));
          for (let $ = 0; $ < I.inputEdgeIds.get().length; $++) {
            const M = I.inputEdgeIds.get()[$],
              V = a().find((T) => T.id === M);
            V &&
              V.currEndPosition.set((T) => ({
                x: (V.prevEndPosition.get().x + A) / o(),
                y: (V.prevEndPosition.get().y + x) / o(),
              }));
          }
          for (let $ = 0; $ < I.outputEdgeIds.get().length; $++) {
            const M = I.outputEdgeIds.get()[$],
              V = a().find((T) => T.id === M);
            V &&
              V.currStartPosition.set((T) => ({
                x: (V.prevStartPosition.get().x + A) / o(),
                y: (V.prevStartPosition.get().y + x) / o(),
              }));
          }
          be(P);
        }
      } else if (L && s() && k() === null) {
        P.preventDefault();
        const I = P.x - n().x,
          $ = P.y - n().y;
        b({ x: I + m().x, y: $ + m().y });
      }
      if (c() !== null) {
        y(ye());
        const I = document.getElementById("boardWrapper"),
          $ = 50;
        if (I) {
          const [M, V] = N(null);
          for (const T of e()) {
            const W = T.isInputVertex || T.isUpVertex;
            if (T.id !== c().nodeStartId && W) {
              const q = T.isInputVertex
                  ? T.inputVertexIds[0]
                  : T.upVertexIds[0],
                H = document.getElementById(q),
                {
                  left: Q,
                  right: ce,
                  top: oe,
                  bottom: Ge,
                } = H.getBoundingClientRect(),
                ot = Q + Math.abs(Q - ce) / 2,
                st = oe + Math.abs(oe - Ge) / 2,
                ze = P.clientX - ot,
                It = P.clientY - st;
              if (Math.sqrt(ze * ze + It * It) < $) {
                V({ positionX: ot, positionY: st, id: T.id });
                break;
              }
            }
          }
          M() !== null
            ? (c()?.currEndPosition.set({
                x: (M().positionX - h().x) / o(),
                y: (M().positionY - h().y) / o(),
              }),
              j({
                nodeId: M().id,
                inputIndex: 0,
                positionX: M().positionX,
                positionY: M().positionY,
              }))
            : (j(null),
              c()?.currEndPosition.set({
                x: (P.x - h().x) / o(),
                y: (P.y - h().y) / o(),
              }));
        }
      }
    },
    G = () => {
      if ((i({ x: -1, y: -1 }), d(!1), w(h()), F())) {
        const P = F();
        let L = {
          x: Math.min(P.x, P.x + P.width),
          y: Math.min(P.y, P.y + P.height),
          width: Math.abs(P.width),
          height: Math.abs(P.height),
        };
        const A = e().filter((x) => {
          const I = document.getElementById(x.id);
          if (!I) return !1;
          const $ = x.currPosition.get().x * o() + h().x,
            M = x.currPosition.get().y * o() + h().y,
            V = I.offsetWidth,
            T = I.offsetHeight;
          return (
            $ + V > L.x &&
            $ < L.x + L.width &&
            M + T > L.y &&
            M < L.y + L.height
          );
        });
        if ((ve(A.map((x) => x.id)), Y(null), A.length > 0)) {
          const x = A.map((T) => {
              const q = document.getElementById(T.id)?.getBoundingClientRect();
              if (!q) return { x: 0, y: 0, width: 0, height: 0 };
              const H = (q.left - h().x) / o(),
                Q = (q.top - h().y) / o(),
                ce = q.width / o(),
                oe = q.height / o();
              return { x: H, y: Q, width: ce, height: oe };
            }),
            I = Math.min(...x.map((T) => T.x)),
            $ = Math.min(...x.map((T) => T.y)),
            M = Math.max(...x.map((T) => T.x + T.width)),
            V = Math.max(...x.map((T) => T.y + T.height));
          K({ x: I, y: $, width: M - I, height: V - $ }),
            A.forEach((T) => {
              T.prevPosition.set({
                x: T.currPosition.get().x * o(),
                y: T.currPosition.get().y * o(),
              });
            });
        }
      }
      if (
        (c() !== null && z() === null && S(null), c() !== null && z() !== null)
      ) {
        const P = c().nodeStartId,
          L = z().nodeId,
          A = e().find(($) => $.id === P),
          x = e().find(($) => $.id === L),
          I = document.getElementById("boardWrapper");
        if (A && x && I) {
          const $ = `edge_${Math.random().toString(36).substring(2, 8)}_${
            A.id
          }_${c()?.outputIndex}_${x.id}_${z()?.inputIndex}`;
          if (
            A.outputEdgeIds.get().includes($) &&
            x.inputEdgeIds.get().includes($)
          ) {
            S(null);
            return;
          }
          A.outputEdgeIds.set([...A.outputEdgeIds.get(), $]),
            x.inputEdgeIds.set([...x.inputEdgeIds.get(), $]),
            c().prevStartPosition.set((V) => ({
              x: (c().currStartPosition.get().x - h().x) / o(),
              y: (c().currStartPosition.get().y - h().y) / o(),
            })),
            c().prevEndPosition.set((V) => ({
              x: (z().positionX - h().x) / o(),
              y: (z().positionY - h().y) / o(),
            })),
            c().currEndPosition.set((V) => ({
              x: (z().positionX - h().x) / o(),
              y: (z().positionY - h().y) / o(),
            })),
            C([
              ...a(),
              {
                ...c(),
                id: $,
                nodeEndId: x.id,
                inputVertexId: x.inputVertexIds[0],
                nodeEndInputIndex: z().inputIndex,
              },
            ]);
          const M = e().find((V) => V.id == c()?.nodeStartId);
          M.busyIndex.set([...M.busyIndex.get(), c().outputVertexId]), S(null);
        }
      }
      de(null);
    },
    X = (P) => {
      v({ x: P.clientX, y: P.clientY }),
        g(null),
        B(null),
        l() || u()
          ? (d(!0), i({ x: P.x, y: P.y }))
          : (i({ x: P.clientX, y: P.clientY }),
            Y({ x: P.clientX, y: P.clientY, width: 0, height: 0 }),
            K(null),
            ve([]));
    };
  function Se(P, L) {
    g(L), i({ x: P.x, y: P.y });
    const A = e().find((x) => x.id == k());
    if (A) {
      A.prevPosition.set((x) => ({
        x: A.currPosition.get().x * o(),
        y: A.currPosition.get().y * o(),
      }));
      for (let x = 0; x < A.inputEdgeIds.get().length; x++) {
        const I = A.inputEdgeIds.get()[x],
          $ = a().find((M) => M.id === I);
        $ &&
          $.prevEndPosition.set(() => ({
            x: $.currEndPosition.get().x * o(),
            y: $.currEndPosition.get().y * o(),
          }));
      }
      for (let x = 0; x < A.outputEdgeIds.get().length; x++) {
        const I = A.outputEdgeIds.get()[x],
          $ = a().find((M) => M.id === I);
        $ &&
          $.prevStartPosition.set(() => ({
            x: $.currStartPosition.get().x * o(),
            y: $.currStartPosition.get().y * o(),
          }));
      }
    }
  }
  function ae(P, L, A, x, I, $) {
    if ((g(null), document.getElementById("pane"))) {
      const [V, T] = N({ x: (P - h().x) / o(), y: (L - h().y) / o() }),
        [W, q] = N({ x: (P - h().x) / o(), y: (L - h().y) / o() }),
        [H, Q] = N({ x: (P - h().x) / o(), y: (L - h().y) / o() }),
        [ce, oe] = N({ x: (P - h().x) / o(), y: (L - h().y) / o() });
      S({
        id: "",
        nodeStartId: A,
        outputIndex: x,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: I,
        inputVertexId: "",
        typeOfEdge: $,
        prevStartPosition: { get: V, set: T },
        prevEndPosition: { get: W, set: q },
        currStartPosition: { get: H, set: Q },
        currEndPosition: { get: ce, set: oe },
      });
    }
  }
  function De(P, L, A, x) {
    j({ nodeId: A, inputIndex: x, positionX: P, positionY: L });
  }
  function ee(P, L) {
    z()?.nodeId == P && z()?.inputIndex == L && j(null);
  }
  function Me(P) {
    g(null), B(P);
    const L = a().find((A) => A.id === P);
    L && console.log(L.currStartPosition.get().x, L.currStartPosition.get().y);
  }
  function me(P) {
    const L = a().find((A) => A.id === P);
    if (L) {
      const A = e().find(($) => $.id == L.nodeStartId);
      A &&
        A.outputEdgeIds.set([...A.outputEdgeIds.get().filter(($) => $ !== P)]);
      const x = e().find(($) => $.id === L.nodeEndId);
      x && x.inputEdgeIds.set([...x.inputEdgeIds.get().filter(($) => $ !== P)]),
        a().filter(($) => $.outputVertexId === L.outputVertexId).length <= 1 &&
          A &&
          A.busyIndex.set([
            ...A.busyIndex.get().filter(($) => $ !== L.outputVertexId),
          ]),
        C([...a().filter(($) => $.id !== P)]);
    }
  }
  function $e(P) {
    const L = e().find((M) => M.id == P);
    if (!L) {
      g(null);
      return;
    }
    const A = L.inputEdgeIds.get(),
      x = L.outputEdgeIds.get(),
      $ = [...A, ...x].filter((M, V, T) => T.indexOf(M) === V);
    for (let M = 0; M < $.length; M++) {
      const V = a().find((T) => T.id === $[M]);
      if (V) {
        const T = e().find((H) => H.id === V.nodeStartId),
          W = e().find((H) => H.id === V.nodeEndId);
        T?.outputEdgeIds.set([
          ...T.outputEdgeIds.get().filter((H) => H !== $[M]),
        ]),
          W?.inputEdgeIds.set([
            ...W.inputEdgeIds.get().filter((H) => H !== $[M]),
          ]),
          a().filter((H) => H.outputVertexId === V.outputVertexId).length <=
            1 &&
            T &&
            T.busyIndex.set([
              ...T.busyIndex.get().filter((H) => H !== V.outputVertexId),
            ]),
          C([...a().filter((H) => V.id !== H.id)]);
      }
    }
    t([...e().filter((M) => M.id !== P)]), g(null);
  }
  function ye() {
    const P = c().currEndPosition.get().x - c().currStartPosition.get().x,
      L = c().currEndPosition.get().y - c().currStartPosition.get().y;
    return Math.sqrt(P * P + L * L);
  }
  return (() => {
    var P = Wr(),
      L = P.firstChild,
      A = L.nextSibling;
    return (
      (P.$$mousemove = U),
      (P.$$mouseup = G),
      (P.$$pointerdown = X),
      P.addEventListener("wheel", (x) => x.preventDefault()),
      L.style.setProperty("transform-origin", "top left"),
      f(
        P,
        (() => {
          var x = se(() => !!F());
          return () =>
            x() &&
            (() => {
              var I = Dt();
              return (
                I.style.setProperty("position", "absolute"),
                I.style.setProperty("border", "1px dashed #00aaff"),
                I.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                I.style.setProperty("z-index", "999"),
                I.style.setProperty("pointer-events", "none"),
                R(
                  ($) => {
                    var M = `${Math.min(F().x, F().x + F().width)}px`,
                      V = `${Math.min(F().y, F().y + F().height)}px`,
                      T = `${Math.abs(F().width)}px`,
                      W = `${Math.abs(F().height)}px`;
                    return (
                      M !== $.e &&
                        (($.e = M) != null
                          ? I.style.setProperty("left", M)
                          : I.style.removeProperty("left")),
                      V !== $.t &&
                        (($.t = V) != null
                          ? I.style.setProperty("top", V)
                          : I.style.removeProperty("top")),
                      T !== $.a &&
                        (($.a = T) != null
                          ? I.style.setProperty("width", T)
                          : I.style.removeProperty("width")),
                      W !== $.o &&
                        (($.o = W) != null
                          ? I.style.setProperty("height", W)
                          : I.style.removeProperty("height")),
                      $
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                I
              );
            })();
        })(),
        A
      ),
      f(
        P,
        (() => {
          var x = se(() => !!J());
          return () =>
            x() &&
            (() => {
              var I = Dt();
              return (
                (I.$$pointerdown = ($) => {
                  $.stopPropagation(),
                    i({ x: $.clientX, y: $.clientY }),
                    de({ x: $.clientX, y: $.clientY });
                }),
                I.style.setProperty("position", "absolute"),
                I.style.setProperty("border", "1px solid #00aaff"),
                I.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                I.style.setProperty("z-index", "998"),
                I.style.setProperty("cursor", "move"),
                I.style.setProperty("transform-origin", "top left"),
                R(
                  ($) => {
                    var M = `${J().x * o() + h().x}px`,
                      V = `${J().y * o() + h().y}px`,
                      T = `${J().width * o()}px`,
                      W = `${J().height * o()}px`;
                    return (
                      M !== $.e &&
                        (($.e = M) != null
                          ? I.style.setProperty("left", M)
                          : I.style.removeProperty("left")),
                      V !== $.t &&
                        (($.t = V) != null
                          ? I.style.setProperty("top", V)
                          : I.style.removeProperty("top")),
                      T !== $.a &&
                        (($.a = T) != null
                          ? I.style.setProperty("width", T)
                          : I.style.removeProperty("width")),
                      W !== $.o &&
                        (($.o = W) != null
                          ? I.style.setProperty("height", W)
                          : I.style.removeProperty("height")),
                      $
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                I
              );
            })();
        })(),
        A
      ),
      A.style.setProperty("transform-origin", "top left"),
      f(
        A,
        p(xe, {
          get each() {
            return e();
          },
          children: (x) =>
            p(Mr, {
              get id() {
                return x.id;
              },
              get name() {
                return x.name;
              },
              get x() {
                return x.currPosition.get().x;
              },
              get y() {
                return x.currPosition.get().y;
              },
              get numberInputs() {
                return x.numberInputs;
              },
              get numberOutputs() {
                return x.numberOutputs;
              },
              get downVertexNumber() {
                return x.downVertexNumber || 0;
              },
              get upVertexNumber() {
                return x.upVertexNumber || 0;
              },
              get isInputVertex() {
                return x.isInputVertex;
              },
              get isOutputVertex() {
                return x.isOutputVertex;
              },
              get isDownVertex() {
                return x.isDownVertex || !1;
              },
              get isUpVertex() {
                return x.isUpVertex || !1;
              },
              get inputVertexIds() {
                return x.inputVertexIds;
              },
              get outputVertexIds() {
                return x.outputVertexIds;
              },
              get downVertexIds() {
                return x.downVertexIds || [];
              },
              get upVertexIds() {
                return x.upVertexIds || [];
              },
              get downVertexOrientation() {
                return x.downVertexOrientation || "";
              },
              get busyIndex() {
                return x.busyIndex;
              },
              get content() {
                return x.content;
              },
              get selected() {
                return k() == x.id || le().includes(x.id);
              },
              onMouseDownNode: Se,
              onMouseDownOutput: ae,
              onMouseEnterInput: De,
              onMouseLeaveInput: ee,
              onClickDeleteNode: $e,
            }),
        }),
        null
      ),
      f(
        A,
        (() => {
          var x = se(() => c() !== null);
          return () =>
            x() &&
            p(Ot, {
              selected: !1,
              isNew: !0,
              edgeLength: () => ye(),
              get typeOfEdge() {
                return c().typeOfEdge;
              },
              get position() {
                return {
                  x0: c().currStartPosition.get().x,
                  y0: c().currStartPosition.get().y,
                  x1: c().currEndPosition.get().x,
                  y1: c().currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => {},
              onClickDeleteEdge: () => {},
            });
        })(),
        null
      ),
      f(
        A,
        p(xe, {
          get each() {
            return a();
          },
          children: (x) =>
            p(Ot, {
              get selected() {
                return D() === x.id;
              },
              isNew: !1,
              edgeLength: () => ye(),
              get typeOfEdge() {
                return x.typeOfEdge;
              },
              get position() {
                return {
                  x0: x.currStartPosition.get().x,
                  y0: x.currStartPosition.get().y,
                  x1: x.currEndPosition.get().x,
                  y1: x.currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => Me(x.id),
              onClickDeleteEdge: () => me(x.id),
            }),
        }),
        null
      ),
      R(
        (x) => {
          var I = {
              [ge["dot-flow__pane"]]: !0,
              [ge.draggable]: r(),
              [ge.dragging]: s(),
              [ge.selection]: !1,
            },
            $ = ge["dot-flow__background"],
            M = `scale(${o()})`,
            V = `calc(100vw / ${o()})`,
            T = `calc(100vh / ${o()})`,
            W = `${h().x / o()}px ${h().y / o()}px`,
            q = {
              [ge["dot-flow__viewport"]]: !0,
              [ge["dot-flow__viewport"]]: !0,
            },
            H = `translate(${h().x}px, ${h().y}px) scale(${o()})`;
          return (
            (x.e = _e(P, I, x.e)),
            $ !== x.t && _(L, (x.t = $)),
            M !== x.a &&
              ((x.a = M) != null
                ? L.style.setProperty("transform", M)
                : L.style.removeProperty("transform")),
            V !== x.o &&
              ((x.o = V) != null
                ? L.style.setProperty("width", V)
                : L.style.removeProperty("width")),
            T !== x.i &&
              ((x.i = T) != null
                ? L.style.setProperty("height", T)
                : L.style.removeProperty("height")),
            W !== x.n &&
              ((x.n = W) != null
                ? L.style.setProperty("background-position", W)
                : L.style.removeProperty("background-position")),
            (x.s = _e(A, q, x.s)),
            H !== x.h &&
              ((x.h = H) != null
                ? A.style.setProperty("transform", H)
                : A.style.removeProperty("transform")),
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
        }
      ),
      P
    );
  })();
};
pe(["pointerdown", "mouseup", "mousemove"]);
const Ze = (e) =>
  p(Fn.Provider, {
    value: {
      scale: qt,
      setScale: Gt,
      draggable: Ut,
      setDraggable: Wt,
      isCtrlPressed: Ft,
      isSpacePressed: Xt,
      setIsCtrlPressed: jt,
      setIsSpacePressed: Yt,
      edges: Zt,
      setEdges: Kt,
      newEdge: Jt,
      setNewEdge: Qt,
      busyIndex: en,
      setBusyIndex: tn,
      edgeLength: nn,
      setEdgeLength: rn,
      isOpen: on,
      setIsOpen: sn,
      inputRef: ln,
      edgeEnd: dn,
      setEdgeEnd: an,
      transform: cn,
      setTransform: un,
      nodes: hn,
      setNodes: gn,
      preTransform: fn,
      setPreTransform: pn,
      selectedNode: vn,
      setSelectedNode: mn,
      pendingOutput: xn,
      setPendingOutput: wn,
      lastClickPosition: bn,
      setLastClickPosition: yn,
      isShowModal: _n,
      setIsShowModal: $n,
      setPositionButton: In,
      positionButton: Cn,
      isModalOpen: Nn,
      setIsModalOpen: kn,
      isOpening: Sn,
      setIsOpening: En,
      typeOfVertex: Tn,
      setTypeOfVertex: On,
      formConfig: An,
      setFormConfig: Ln,
      isModalOpen2: Pn,
      setIsModalOpen2: Vn,
      credentialOptions: zn,
      setCredentialOptions: Bn,
      selectedCredential: Rn,
      setSelectedCredential: Hn,
      formData: Un,
      setFormData: Wn,
      settingConfig: Dn,
      setSettingConfig: Mn,
    },
    get children() {
      return e.children;
    },
  });
var jr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const Xr = (e) => jr();
var Yr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const qr = (e) => Yr();
var Gr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const Zr = ({ height: e = 2, width: t = 2 }) => Gr();
var Kr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const Jr = (e) => Kr();
var Qr = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const jn = (e) => Qr();
var eo = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const Xn = (e) => eo();
var to = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Yn = (e) => to();
var no = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const qn = (e) => no();
var io = E(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Gn = (e) => io();
var ro = E(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const Zn = (e) => ro();
var oo = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const Kn = (e) => oo();
var so = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const Jn = (e) => so(),
  lo = [
    {
      name: "chat",
      title: "On Chat Message",
      description:
        " Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: qr,
    },
    {
      name: "switch",
      title: "Switch",
      description: "Routes items depending on defined expression or rules",
      icon: Xr,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: Zr,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: Jr,
    },
    {
      name: "ai-agent",
      title: "AI Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: jn,
    },
    {
      name: "send-email",
      title: "Send Email",
      description: "Send email to a user.",
      icon: Xn,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Yn,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: qn,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Gn,
    },
    {
      name: "gmail-trigger",
      title: "When Chat Message Received",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Zn,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: Kn,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: Jn,
    },
  ];
var ao = E(
  '<div><div><span></span>Data processing...</div><div><input class="border rounded-md px-4 py-2 outline-none border-white"title=backendUrl name=url type=text></div><div>Test WorkFlow'
);
const co = (e) => {
  const { nodes: t, edges: n, formData: i } = we(),
    [s, d] = N(""),
    [r, l] = N(!1),
    [u, o] = N([]),
    [a, c] = N([]),
    C = () => {
      const S = [],
        h = [];
      t().forEach((w) => {
        w.name === "gmail-trigger"
          ? S.push({
              id: w.id,
              description: w.name,
              type: w.name,
              parameters: {
                credentials: {
                  id: i()[w.id]["Client ID"],
                  name: "Gmail Account",
                  provider: "gmail",
                  ctype: i()[w.id]["connection type"],
                },
                poolTime: i()[w.id].poolTime,
                simple: i()[w.id].simplify,
                filter: {
                  includeSpamTrash: i()[w.id].includeSpamTrash,
                  includeDrafts: i()[w.id].includeDrafts,
                  labelIds: i()[w.id].labelNamesOrIds,
                  q: i()[w.id].search,
                  sender: i()[w.id].sender,
                  readStatus: i()[w.id].readStatus,
                },
                options: {
                  downloadAttachments: i()[w.id].downloadAttachments,
                  attachmentPrefix: i()[w.id].attachmentsPrefix,
                },
              },
              position: {
                x: Math.round(w.currPosition.get().x),
                y: Math.round(w.currPosition.get().y),
              },
              inputs: [],
              outputs: [
                {
                  id: "output",
                  name: "Last Email",
                  description: "Read last email from your gmail inbox",
                  type: "object",
                },
              ],
            })
          : w.name === "edit" &&
            S.push({
              id: w.id,
              description: w.name,
              type: w.name,
              parameters: {
                mode: i()[w.id].mode,
                assignments: i()[w.id].assignments,
              },
              position: {
                x: Math.round(w.currPosition.get().x),
                y: Math.round(w.currPosition.get().y),
              },
              inputs: [
                {
                  id: "input",
                  name: "Input",
                  description: "Data to filter",
                  type: "array",
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
            });
      }),
        n().forEach((w) => {
          h.push({
            id: w.id,
            sourceNodeId: w.nodeStartId,
            sourcePortId: w.outputVertexId,
            targetNodeId: w.nodeEndId,
            targetPortId: w.inputVertexId,
          });
        }),
        o(S),
        c(h);
      const b = {
          name: "Email Analyzer",
          description:
            "A workflow demonstrating multiple inputs and outputs per node",
          nodes: u(),
          connections: a(),
        },
        m = new CustomEvent("data", { detail: b });
      return document.dispatchEvent(m), o([]), c([]), b;
    };
  return (() => {
    var S = ao(),
      h = S.firstChild,
      b = h.firstChild,
      m = h.nextSibling,
      w = m.firstChild,
      k = m.nextSibling;
    return (
      w.addEventListener("change", (g) => d(g.target.value)),
      (k.$$click = C),
      R(
        (g) => {
          var v = ge.testWorkFlow,
            y = `fixed ${
              r() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            O = ge.loader,
            D = ge.testButton;
          return (
            v !== g.e && _(S, (g.e = v)),
            y !== g.t && _(h, (g.t = y)),
            O !== g.a && _(b, (g.a = O)),
            D !== g.o && _(k, (g.o = D)),
            g
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      S
    );
  })();
};
pe(["click"]);
var uo = E('<div><div class="border border-white/20 rounded-[9px] flex"><div>');
const Mt = (e) => {
  let t;
  const n = e.zIndex ?? 9999,
    i = e.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";
  return (
    Oe(() => {
      const s = (d) => {
        d.target === t && e.onClose();
      };
      return (
        window.addEventListener("click", s),
        () => window.removeEventListener("click", s)
      );
    }),
    (() => {
      var s = uo(),
        d = s.firstChild,
        r = d.firstChild,
        l = t;
      return (
        typeof l == "function" ? Ne(l, s) : (t = s),
        n != null
          ? s.style.setProperty("z-index", n)
          : s.style.removeProperty("z-index"),
        _(r, `${i} border border-purple-500/20 rounded-[9px] flex flex-col`),
        f(r, () => e.children),
        R(() =>
          _(
            s,
            `fixed inset-0 bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
              e.isOpen() ? "block" : "hidden"
            }`
          )
        ),
        s
      );
    })()
  );
};
var ho = E('<span class=text-yellow-300>"<!>"'),
  go = E("<span class=text-cyan-300>"),
  fo = E("<span class=text-pink-300>"),
  po = E("<span class=text-gray-400>null"),
  vo = E('<div class="text-purple-400 cursor-pointer select-none">'),
  mo = E("<div class=text-purple-400>}"),
  xo = E(
    '<div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">'
  ),
  wo = E("<span>[<!>]"),
  bo = E("<span>["),
  yo = E("<div>]"),
  _o = E("<div>"),
  $o = E(
    '<div><span class=text-green-400>"<!>"</span><span class=text-white>: '
  );
const gt = ({ data: e, indent: t = 0 }) => {
  const [n, i] = N(!1),
    s = `${t * 5}px`,
    d = () => i(!n()),
    r = (o) => typeof o == "object" && o !== null && !Array.isArray(o),
    l = Array.isArray,
    u = (o) =>
      typeof o == "string"
        ? (() => {
            var a = ho(),
              c = a.firstChild,
              C = c.nextSibling;
            return C.nextSibling, f(a, o, C), a;
          })()
        : typeof o == "number"
        ? (() => {
            var a = go();
            return f(a, o), a;
          })()
        : typeof o == "boolean"
        ? (() => {
            var a = fo();
            return f(a, () => o.toString()), a;
          })()
        : o === null
        ? po()
        : p(gt, { data: o, indent: t + 1 });
  return (() => {
    var o = xo();
    return (
      f(
        o,
        p(he, {
          get when() {
            return r(e);
          },
          get fallback() {
            return p(he, {
              get when() {
                return l(e);
              },
              get fallback() {
                return u(e);
              },
              get children() {
                return se(() => !!e.every((a) => typeof a != "object"))()
                  ? (() => {
                      var a = wo(),
                        c = a.firstChild,
                        C = c.nextSibling;
                      return (
                        C.nextSibling,
                        f(
                          a,
                          p(xe, {
                            each: e,
                            children: (S, h) => [
                              se(() => u(S)),
                              se(() => (h() < e.length - 1 ? ", " : "")),
                            ],
                          }),
                          C
                        ),
                        a
                      );
                    })()
                  : [
                      (() => {
                        var a = bo();
                        return (
                          s != null
                            ? a.style.setProperty("padding-left", s)
                            : a.style.removeProperty("padding-left"),
                          a
                        );
                      })(),
                      p(xe, {
                        each: e,
                        children: (a, c) =>
                          (() => {
                            var C = _o();
                            return (
                              `${(t + 1) * 4}px` != null
                                ? C.style.setProperty(
                                    "padding-left",
                                    `${(t + 1) * 4}px`
                                  )
                                : C.style.removeProperty("padding-left"),
                              f(C, p(gt, { data: a, indent: t + 1 }), null),
                              f(C, () => (c() < e.length - 1 ? "," : ""), null),
                              C
                            );
                          })(),
                      }),
                      (() => {
                        var a = yo();
                        return (
                          s != null
                            ? a.style.setProperty("padding-left", s)
                            : a.style.removeProperty("padding-left"),
                          a
                        );
                      })(),
                    ];
              },
            });
          },
          get children() {
            return [
              (() => {
                var a = vo();
                return (
                  (a.$$click = d),
                  s != null
                    ? a.style.setProperty("padding-left", s)
                    : a.style.removeProperty("padding-left"),
                  f(a, () => (n() ? "{...}" : "{")),
                  a
                );
              })(),
              p(he, {
                get when() {
                  return !n();
                },
                get children() {
                  return [
                    p(xe, {
                      get each() {
                        return Object.entries(e);
                      },
                      children: ([a, c], C) =>
                        (() => {
                          var S = $o(),
                            h = S.firstChild,
                            b = h.firstChild,
                            m = b.nextSibling;
                          return (
                            m.nextSibling,
                            h.nextSibling,
                            `${(t + 1) * 4}px` != null
                              ? S.style.setProperty(
                                  "padding-left",
                                  `${(t + 1) * 4}px`
                                )
                              : S.style.removeProperty("padding-left"),
                            f(h, a, m),
                            f(S, () => u(c), null),
                            f(
                              S,
                              () =>
                                C() < Object.entries(e).length - 1 ? "," : "",
                              null
                            ),
                            S
                          );
                        })(),
                    }),
                    (() => {
                      var a = mo();
                      return (
                        s != null
                          ? a.style.setProperty("padding-left", s)
                          : a.style.removeProperty("padding-left"),
                        a
                      );
                    })(),
                  ];
                },
              }),
            ];
          },
        })
      ),
      o
    );
  })();
};
pe(["click"]);
const Co = "_leftPanel_kuca9_1",
  Io = { leftPanel: Co };
var So = E(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full "><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input'
);
const Eo = (e) =>
    (() => {
      var t = So(),
        n = t.firstChild;
      return (
        n.firstChild,
        f(
          n,
          p(gt, {
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
        R((i) => _e(t, { [Io.leftPanel]: !0 }, i)),
        t
      );
    })(),
  No = "_midPanel_azasr_1",
  rt = { midPanel: No };
var ko = E(
    '<div class="relative w-full"><select title=select class="w-full appearance-none bg-[#1e1f2b] text-white text-sm px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"><svg class="w-4 h-4"fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'
  ),
  Po = E("<option>");
const Pe = ({ options: e, onOption: t, name: n }) => {
  const [i, s] = N(0),
    d = (r) => {
      const l = r.target.selectedIndex;
      s(l), t?.(e[l]);
    };
  return (
    Oe(() => {
      t?.(e[0]);
    }),
    (() => {
      var r = ko(),
        l = r.firstChild;
      return (
        l.addEventListener("change", d),
        re(l, "name", n),
        f(l, () =>
          e.map((u) =>
            (() => {
              var o = Po();
              return f(o, () => u.label), R(() => (o.value = u.value)), o;
            })()
          )
        ),
        r
      );
    })()
  );
};
var Vo = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg baseProfile=tiny version=1.2 viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M17.707 8.293a.999.999 0 1 0-1.414 1.414L17.586 11H13V6.414l1.293 1.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L12 2.586 8.293 6.293a.999.999 0 1 0 1.414 1.414L11 6.414V11H6.414l1.293-1.293a.999.999 0 1 0-1.414-1.414L2.586 12l3.707 3.707a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L6.414 13H11v4.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414L12 21.414l3.707-3.707a.999.999 0 1 0-1.414-1.414L13 17.586V13h4.586l-1.293 1.293a.999.999 0 1 0 1.414 1.414L21.414 12l-3.707-3.707z">'
);
const yt = (e) => Vo();
var To = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const _t = (e) => To();
var Oo = E(
  '<div><div class=" w-full"><b></b> </div><div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#666769]">'
);
const $t = ({ showTooltip: e, toolTipContent: t }) =>
  (() => {
    var n = Oo(),
      i = n.firstChild,
      s = i.firstChild;
    return (
      s.nextSibling,
      f(s, () => t.label),
      f(i, () => t.text, null),
      R(() =>
        _(
          n,
          `absolute bottom-full z-[999999] mb-2 left-1/2 -translate-x-1/2 bg-[#58585e] text-white text-sm rounded-md px-3 py-2
        transition-opacity duration-200 font-normal w-[300px] max-w-[400px]
        ${
          e()
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`
        )
      ),
      n
    );
  })();
var Do = E(
  '<div class="relative w-full"><input type=text title=input placeholder=placeHolder autocomplete=off class="w-full px-4 py-2 rounded-md border border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition">'
);
const Ve = ({ onInput: e, name: t }) => {
  const [n, i] = N(!1);
  return (() => {
    var s = Do(),
      d = s.firstChild;
    return (
      d.addEventListener("change", (r) => {
        e(r.target.value);
      }),
      (d.$$focusout = () => i(!1)),
      (d.$$focusin = () => i(!0)),
      re(d, "name", t),
      f(
        s,
        p($t, {
          showTooltip: n,
          toolTipContent: {
            label: "Tip:",
            text: "Execute previous nodes to use input data.",
          },
        }),
        null
      ),
      s
    );
  })();
};
pe(["focusin", "focusout"]);
var Mo = E(
  '<svg xmlns=http://www.w3.org/2000/svg width=18 height=18 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=10></circle><line x1=15 y1=9 x2=9 y2=15></line><line x1=9 y1=9 x2=15 y2=15>'
);
const Qn = (e) => Mo();
var Ao = E("<button>");
const Ct = ({ title: e, width: t = "w-auto" }) =>
  (() => {
    var n = Ao();
    return (
      _(
        n,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      f(n, e),
      n
    );
  })();
var Lo = E(
    '<div class="text-white bg-[#1e1e2f] p-2 rounded"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><div class="text-sm flex items-center gap-1 group"><div></div></div><div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">Reset value</div></div><label class="relative inline-block w-12 h-6"><input title=switch type=checkbox class="sr-only peer"><div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6">'
  ),
  zo = E(
    '<div class="relative w-3 h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?'
  );
const ke = ({ switchText: e, toolTipContent: t, onChange: n, name: i }) => {
  const [s, d] = N(!1),
    r = (l) => {
      n?.(l.target.checked);
    };
  return (() => {
    var l = Lo(),
      u = l.firstChild,
      o = u.firstChild,
      a = o.firstChild,
      c = a.firstChild,
      C = o.nextSibling,
      S = C.firstChild;
    return (
      f(c, e),
      f(
        a,
        t &&
          (() => {
            var h = zo();
            return (
              h.firstChild,
              h.addEventListener("mouseleave", () => d(!1)),
              h.addEventListener("mouseenter", () => d(!0)),
              f(h, p($t, { showTooltip: s, toolTipContent: t }), null),
              h
            );
          })(),
        null
      ),
      S.addEventListener("change", r),
      re(S, "name", i),
      l
    );
  })();
};
var Bo = E(
    '<div><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label></div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Routing Rules</h3><div class="routing-rules-wrapper space-y-2 w-full"></div></div><div></div><div><div class="text-[#c2c4c7] text-sm">Options</div><hr class=border-[#414142]><div>'
  ),
  Ro = E(
    '<div id draggable=true><div class="flex flex-row gap-1.5 "><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class=w-full><div class="flex gap-2 mb-2 items-center"><div class=flex-1></div><button title=cross class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"></button></div><div></div></div></div><div class=mt-3></div><div>'
  ),
  Ho = E("<div class=mt-2>");
const Uo = (e) => {
  const [t, n] = N([1]),
    [i, s] = N(null),
    [d, r] = N([]);
  N([
    { label: "fallback output", value: "fallback output", description: "" },
    { label: "ignore case", value: "ignore case", description: "" },
    {
      label: "send data to all matching outputs",
      value: "send data to all matching outputs",
      description: "",
    },
  ]),
    N([]);
  const l = (a) => {
      s(a);
    },
    u = (a) => {
      const c = i(),
        C = a;
      if (c === null || c === C) return;
      const S = [...t()],
        [h] = S.splice(c, 1);
      S.splice(C, 0, h), n(S), s(C);
    },
    o = () => {
      s(null);
    };
  return (() => {
    var a = Bo(),
      c = a.firstChild,
      C = c.firstChild;
    C.firstChild;
    var S = C.nextSibling,
      h = S.firstChild,
      b = h.nextSibling,
      m = S.nextSibling,
      w = m.nextSibling;
    return (
      f(
        C,
        p(Pe, {
          options: [
            {
              label: "Rules",
              value: "Rules",
              description: "Build a matching rule for each output.",
            },
            {
              label: "Expression",
              value: "Expression",
              description: "Write an expression to return the output index.",
            },
          ],
        }),
        null
      ),
      f(
        b,
        p(xe, {
          get each() {
            return t();
          },
          children: (k, g) => (
            r([...d(), { key: `key${g}`, renameOutput: !1 }]),
            (() => {
              var v = Ro(),
                y = v.firstChild,
                O = y.firstChild,
                D = O.firstChild,
                B = D.nextSibling,
                z = O.nextSibling,
                j = z.firstChild,
                F = j.firstChild,
                Y = F.nextSibling,
                le = j.nextSibling,
                ve = y.nextSibling,
                J = ve.nextSibling;
              return (
                v.addEventListener("dragend", o),
                v.addEventListener("dragenter", () => u(g())),
                v.addEventListener("dragstart", () => l(g())),
                f(D, p(yt, {})),
                f(B, p(_t, {})),
                f(j, p(Ve, {}), F),
                f(
                  F,
                  p(Pe, {
                    options: [
                      { label: "String", value: "String" },
                      { label: "Number", value: "Number" },
                      { label: "Array", value: "Array" },
                      { label: "Boolean", value: "Boolean" },
                      { label: "Object", value: "Object" },
                    ],
                  })
                ),
                f(Y, p(Qn, {})),
                f(le, p(Ve, {})),
                f(
                  ve,
                  p(ke, {
                    switchText: "Rename output",
                    toolTipContent: null,
                    onChange: (K) => {
                      console.log(d());
                      const ie = [...d()];
                      (ie[g()] = { ...ie[g()], renameOutput: K }), r(ie);
                    },
                  })
                ),
                f(
                  J,
                  p(xe, {
                    get each() {
                      return d();
                    },
                    children: (K, ie) => {
                      if (K.renameOutput)
                        return (() => {
                          var de = Ho();
                          return f(de, p(Ve, {})), de;
                        })();
                    },
                  })
                ),
                R(
                  (K) => {
                    var ie = { [rt.ruleItem]: !0, dragging: i() === g() },
                      de = `transition-all duration-200 w-full ${
                        g() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`;
                    return (
                      (K.e = _e(v, ie, K.e)), de !== K.t && _(v, (K.t = de)), K
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                v
              );
            })()
          ),
        })
      ),
      (m.$$click = () => {
        n([...t(), t().length + 1]);
      }),
      f(m, p(Ct, { title: "Add Routing Rule", width: "w-full" })),
      f(
        c,
        p(ke, {
          switchText: "Convert types where required",
          toolTipContent: {
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          },
        }),
        w
      ),
      a
    );
  })();
};
pe(["click"]);
var Wo = E(
    '<div><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label></div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Field to set</h3><div class="routing-rules-wrapper space-y-2 w-full"></div></div><div></div><div><div class="text-[#c2c4c7] text-sm">Options</div><hr class=border-[#414142]><div>'
  ),
  Fo = E(
    '<div id draggable=true><div class="flex flex-row gap-1.5 "><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class=w-full><div class="flex gap-2 mb-2 items-center"><div class=flex-1></div><button title=cross class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"></button></div><div>'
  );
const jo = (e) => {
  const { setFormData: t, formConfig: n, formData: i } = we(),
    [s, d] = N([1]),
    [r, l] = N(null),
    [u, o] = N([]),
    a = crypto.randomUUID(),
    [c, C] = N([{ uuid: a, name: "", type: "", value: "" }]);
  N([
    { label: "fallback output", value: "fallback output", description: "" },
    { label: "ignore case", value: "ignore case", description: "" },
    {
      label: "send data to all matching outputs",
      value: "send data to all matching outputs",
      description: "",
    },
  ]),
    N([]),
    Le(() => {
      o(s().map((m, w) => ({ key: `key${w}`, renameOutput: !1 })));
    }),
    Le(() => {
      console.log(i()), console.log(c());
    });
  const S = (m) => {
      l(m);
    },
    h = (m) => {
      const w = r(),
        k = m;
      if (w === null || w === k) return;
      const g = [...s()],
        [v] = g.splice(w, 1);
      g.splice(k, 0, v), d(g), l(k);
    },
    b = () => {
      l(null);
    };
  return (() => {
    var m = Wo(),
      w = m.firstChild,
      k = w.firstChild;
    k.firstChild;
    var g = k.nextSibling,
      v = g.firstChild,
      y = v.nextSibling,
      O = g.nextSibling,
      D = O.nextSibling;
    return (
      f(
        k,
        p(Pe, {
          options: [
            {
              label: "Manual Mapping",
              value: "Manual Mapping",
              description: "Build a matching rule for each output.",
            },
            {
              label: "JSON",
              value: "JSON",
              description: "Write an expression to return the output index.",
            },
          ],
          onOption: (B) => {
            t({ ...i(), [n().id]: { ...i()[n().id], mode: B.value } });
          },
        }),
        null
      ),
      f(
        y,
        p(xe, {
          get each() {
            return s();
          },
          children: (B, z) =>
            (() => {
              var j = Fo(),
                F = j.firstChild,
                Y = F.firstChild,
                le = Y.firstChild,
                ve = le.nextSibling,
                J = Y.nextSibling,
                K = J.firstChild,
                ie = K.firstChild,
                de = ie.nextSibling,
                be = K.nextSibling;
              return (
                j.addEventListener("dragover", (U) => U.preventDefault()),
                j.addEventListener("dragend", b),
                j.addEventListener("dragenter", () => h(z())),
                j.addEventListener("dragstart", () => S(z())),
                f(le, p(yt, {})),
                f(ve, p(_t, {})),
                f(
                  K,
                  p(Ve, {
                    onInput: (U) => {
                      C((G) => {
                        const X = [...G];
                        return (X[z()] = { ...X[z()], name: U }), X;
                      }),
                        t({
                          ...i(),
                          [n().id]: { ...i()[n().id], assignments: c() },
                        });
                    },
                  }),
                  ie
                ),
                f(
                  ie,
                  p(Pe, {
                    options: [
                      { label: "String", value: "String" },
                      { label: "Number", value: "Number" },
                      { label: "Array", value: "Array" },
                      { label: "Boolean", value: "Boolean" },
                      { label: "Object", value: "Object" },
                    ],
                    onOption: (U) => {
                      C((G) => {
                        const X = [...G];
                        return (X[z()] = { ...X[z()], type: U.value }), X;
                      }),
                        t({
                          ...i(),
                          [n().id]: { ...i()[n().id], assignments: c() },
                        });
                    },
                  })
                ),
                f(de, p(Qn, {})),
                f(
                  be,
                  p(Ve, {
                    onInput: (U) => {
                      C((G) => {
                        const X = [...G];
                        return (X[z()] = { ...X[z()], value: U }), X;
                      }),
                        t({
                          ...i(),
                          [n().id]: { ...i()[n().id], assignments: c() },
                        });
                    },
                  })
                ),
                R(
                  (U) => {
                    var G = { [rt.ruleItem]: !0, dragging: r() === z() },
                      X = `transition-all duration-200 w-full ${
                        z() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`;
                    return (
                      (U.e = _e(j, G, U.e)), X !== U.t && _(j, (U.t = X)), U
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                j
              );
            })(),
        })
      ),
      (O.$$click = () => {
        console.log(i());
        const B = crypto.randomUUID(),
          z = s().length;
        d([...s(), z + 1]),
          C((j) => [...j, { uuid: B, name: "", type: "", value: "" }]);
      }),
      f(O, p(Ct, { title: "Add Routing Rule", width: "w-full" })),
      f(
        w,
        p(ke, {
          switchText: "Include other input fields.",
          toolTipContent: {
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          },
          onChange: (B) => {
            t({
              ...i(),
              [n().id]: { ...i()[n().id], includeOtherInputFields: B },
            });
          },
        }),
        D
      ),
      m
    );
  })();
};
pe(["click"]);
var Xo = E(
    '<div class=overflow-visible><button class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center"><svg viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"stroke=currentColor stroke-width=2 fill=none>'
  ),
  Yo = E(
    '<ul id=portal-dropdown class="absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700"><li><button class="w-full text-left px-4 py-2 text-white hover:bg-[#dad7d742]">+ Create new credentials'
  ),
  qo = E('<li><button><div class="text-sm font-medium">'),
  Go = E('<p class="text-xs text-[#979393]">');
const Zo = () => {
  const {
      setIsModalOpen2: e,
      credentialOptions: t,
      setCredentialOptions: n,
      selectedCredential: i,
      setSelectedCredential: s,
    } = we(),
    [d, r] = N(!1),
    [l, u] = N({ top: 0, left: 0, width: 0 }),
    [o, a] = N(!1);
  let c;
  const C = () => {
      if (!c) return;
      const b = c.getBoundingClientRect(),
        m = 200,
        w = window.innerHeight - b.bottom,
        k = b.top,
        g = w < m && k > m;
      a(g),
        u({
          top: g ? b.top + window.scrollY - m : b.bottom + window.scrollY,
          left: b.left + window.scrollX,
          width: b.width,
        }),
        r(!d());
    },
    S = (b) => {
      s(b), r(!1);
    },
    h = (b) => {
      const m = document.getElementById("portal-dropdown");
      m && !m.contains(b.target) && !c?.contains(b.target) && r(!1);
    };
  return (
    Oe(() => {
      document.addEventListener("click", h);
    }),
    Ye(() => {
      document.removeEventListener("click", h);
    }),
    (() => {
      var b = Xo(),
        m = b.firstChild,
        w = m.firstChild;
      return (
        (m.$$click = C),
        Ne((k) => (c = k), m),
        f(m, () => i()?.label || "Select Credential", w),
        f(
          b,
          (() => {
            var k = se(() => !!d());
            return () =>
              k() &&
              p(_i, {
                get children() {
                  var g = Yo(),
                    v = g.firstChild,
                    y = v.firstChild;
                  return (
                    g.style.setProperty("max-height", "200px"),
                    f(
                      g,
                      () =>
                        t().map((O) =>
                          (() => {
                            var D = qo(),
                              B = D.firstChild,
                              z = B.firstChild;
                            return (
                              (B.$$click = () => S(O)),
                              f(z, () => O.label),
                              f(
                                B,
                                (() => {
                                  var j = se(() => !!O.description);
                                  return () =>
                                    j() &&
                                    (() => {
                                      var F = Go();
                                      return f(F, () => O.description), F;
                                    })();
                                })(),
                                null
                              ),
                              R(() =>
                                _(
                                  B,
                                  `w-full text-left px-4 py-2 hover:bg-[#dad7d742] ${
                                    i()?.value === O.value
                                      ? "bg-[#282a39] text-[#ff6f5c]"
                                      : "text-gray-200"
                                  }`
                                )
                              ),
                              D
                            );
                          })()
                        ),
                      v
                    ),
                    (y.$$click = () => {
                      r(!1), e(!0);
                    }),
                    R(
                      (O) => {
                        var D = `${l().top}px`,
                          B = `${l().left}px`,
                          z = `${l().width}px`;
                        return (
                          D !== O.e &&
                            ((O.e = D) != null
                              ? g.style.setProperty("top", D)
                              : g.style.removeProperty("top")),
                          B !== O.t &&
                            ((O.t = B) != null
                              ? g.style.setProperty("left", B)
                              : g.style.removeProperty("left")),
                          z !== O.a &&
                            ((O.a = z) != null
                              ? g.style.setProperty("width", z)
                              : g.style.removeProperty("width")),
                          O
                        );
                      },
                      { e: void 0, t: void 0, a: void 0 }
                    ),
                    g
                  );
                },
              });
          })(),
          null
        ),
        R(() => re(w, "class", `w-4 h-4 ${d() ? "rotate-180" : ""}`)),
        b
      );
    })()
  );
};
pe(["click"]);
var Ko = E(
    '<div class="space-y-2 text-sm text-white"><div class="relative w-full"><select title=select class="w-full appearance-none bg-[#1e1f2b] text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"><option value disabled selected hidden>Select option...</option></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"><svg class="w-4 h-4"fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'
  ),
  Jo = E("<option>");
const vt = ({ options: e, onOptionChange: t, name: n }) => {
  const [i, s] = N([]),
    [d, r] = N([]);
  Oe(() => {
    s(e);
  });
  const l = (u) => {
    const o = u.target.value,
      a = i().find((c) => c.value === o);
    a &&
      (r((c) => [...c, a]), s((c) => c.filter((C) => C.value !== o)), t?.(d()));
  };
  return (() => {
    var u = Ko(),
      o = u.firstChild,
      a = o.firstChild;
    return (
      a.firstChild,
      a.addEventListener("change", l),
      re(a, "name", n),
      f(
        a,
        () =>
          i().map((c) =>
            (() => {
              var C = Jo();
              return f(C, () => c.label), R(() => (C.value = c.value)), C;
            })()
          ),
        null
      ),
      u
    );
  })();
};
var Qo = E(
    '<div><form id=gmailParam><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label></div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Field to set</h3><div class="routing-rules-wrapper space-y-2 w-full"></div></div><div></div><div><div class="text-[#c2c4c7] text-sm">Filter</div><hr class="border-[#414142] mb-2"><div class=mt-2></div></div><div><div class="text-[#c2c4c7] text-sm">Options</div><hr class=border-[#414142]><div>'
  ),
  es = E(
    '<div id draggable=true><div class="flex flex-row gap-1.5 "><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div></div><div class=w-full>'
  );
const ts = (e) => {
  const { setFormData: t, formConfig: n, formData: i } = we(),
    [s, d] = N([]),
    [r, l] = N([]),
    [u, o] = N([1]),
    [a, c] = N(null),
    [C, S] = N([]),
    [h, b] = N([{ mode: "Every minute" }]);
  N([]),
    N([]),
    Le(() => {
      S(u().map((v, y) => ({ key: `key${y}`, renameOutput: !1 })));
    }),
    Le(() => {
      console.log(i());
    });
  const m = (v) => {
    const y = n().id,
      O = i(),
      D = O[y]?.items;
    JSON.stringify(D) !== JSON.stringify(v) &&
      t({ ...O, [y]: { ...O[y], poolTime: v } });
  };
  Oe(() => {
    m(h());
  });
  const w = (v) => {
      c(v);
    },
    k = (v) => {
      const y = a(),
        O = v;
      if (y === null || y === O) return;
      const D = [...u()],
        [B] = D.splice(y, 1);
      D.splice(O, 0, B), o(D), c(O);
    },
    g = () => {
      c(null);
    };
  return (() => {
    var v = Qo(),
      y = v.firstChild,
      O = y.firstChild,
      D = O.firstChild;
    D.firstChild;
    var B = D.nextSibling,
      z = B.firstChild,
      j = z.nextSibling,
      F = B.nextSibling,
      Y = F.nextSibling,
      le = Y.firstChild,
      ve = le.nextSibling,
      J = ve.nextSibling,
      K = Y.nextSibling,
      ie = K.firstChild,
      de = ie.nextSibling,
      be = de.nextSibling;
    return (
      y.addEventListener("submit", (U) => {
        U.preventDefault();
        const G = new FormData(U.target),
          X = Object.fromEntries(G.entries()),
          Se = new CustomEvent("formSubmitEvent", { detail: X, bubbles: !0 }),
          ae = document.getElementById("submitBtn");
        ae && ae.dispatchEvent(Se);
      }),
      f(D, p(Zo, {}), null),
      f(
        j,
        p(xe, {
          get each() {
            return u();
          },
          children: (U, G) =>
            (() => {
              var X = es(),
                Se = X.firstChild,
                ae = Se.firstChild,
                De = ae.firstChild,
                ee = De.nextSibling,
                Me = Se.nextSibling;
              return (
                X.addEventListener("dragover", (me) => me.preventDefault()),
                X.addEventListener("dragend", g),
                X.addEventListener("dragenter", () => k(G())),
                X.addEventListener("dragstart", () => w(G())),
                f(De, p(yt, {})),
                f(ee, p(_t, {})),
                f(
                  Me,
                  p(Pe, {
                    get name() {
                      return `poolTimeCondition_${G()}`;
                    },
                    options: [
                      { label: "Every minute", value: "Every minute" },
                      { label: "Every hour", value: "Every hour" },
                    ],
                  })
                ),
                R(
                  (me) => {
                    var $e = { [rt.ruleItem]: !0, dragging: a() === G() },
                      ye = `transition-all duration-200 w-full flex gap-2 ${
                        G() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`;
                    return (
                      (me.e = _e(X, $e, me.e)),
                      ye !== me.t && _(X, (me.t = ye)),
                      me
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                X
              );
            })(),
        })
      ),
      (F.$$click = () => {
        o([...u(), u().length + 1]);
      }),
      f(F, p(Ct, { title: "Add poll time", width: "w-full" })),
      f(
        O,
        p(Pe, {
          name: "triggerType",
          options: [{ label: "Message Received", value: "Message Received" }],
          onOption: (U) => {
            t({ ...i(), [n().id]: { ...i()[n().id], triggerType: U.value } });
          },
        }),
        Y
      ),
      f(
        O,
        p(ke, {
          name: "simplify",
          switchText: "Simplify",
          toolTipContent: {
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          },
          onChange: (U) => {
            t({ ...i(), [n().id]: { ...i()[n().id], simplify: U } });
          },
        }),
        Y
      ),
      f(
        Y,
        p(he, {
          get when() {
            return s().includes("includeSpamTrash");
          },
          get children() {
            return p(ke, {
              name: "includeSpamTrash",
              switchText: "Include Spam and Trash",
              toolTipContent: { label: "", text: "" },
              onChange: (U) => {
                t({
                  ...i(),
                  [n().id]: { ...i()[n().id], includeSpamTrash: U },
                });
              },
            });
          },
        }),
        J
      ),
      f(
        Y,
        p(he, {
          get when() {
            return s().includes("includeDrafts");
          },
          get children() {
            return p(ke, {
              name: "includeDrafts",
              switchText: "include drafts",
              toolTipContent: { label: "", text: "" },
              onChange: (U) => {
                t({ ...i(), [n().id]: { ...i()[n().id], includeDrafts: U } });
              },
            });
          },
        }),
        J
      ),
      f(
        Y,
        p(he, {
          get when() {
            return s().includes("labelNamesOrIds");
          },
          get children() {
            return p(vt, {
              name: "labelNamesOrIds",
              options: [
                { label: "INBOX", value: "INBOX" },
                { label: "UNREAD", value: "UNREAD" },
                { label: "STARRED", value: "STARRED" },
                { label: "IMPORTANT", value: "IMPORTANT" },
              ],
              onOptionChange: (U) => {
                t({
                  ...i(),
                  [n().id]: {
                    ...i()[n().id],
                    labelNamesOrIds: U.map((G) => G.value),
                  },
                });
              },
            });
          },
        }),
        J
      ),
      f(
        Y,
        p(he, {
          get when() {
            return s().includes("search");
          },
          get children() {
            return p(Ve, {
              name: "search",
              onInput: (U) => {
                t({ ...i(), [n().id]: { ...i()[n().id], search: U } });
              },
            });
          },
        }),
        J
      ),
      f(
        Y,
        p(he, {
          get when() {
            return s().includes("readStatus");
          },
          get children() {
            return p(Pe, {
              name: "readStatus",
              options: [
                {
                  label: "unread and read email",
                  value: "unread and read email",
                },
                { label: "read email only", value: "read email only" },
                { label: "read emails only", value: "read emails only" },
              ],
              onOption: (U) => {
                t({
                  ...i(),
                  [n().id]: { ...i()[n().id], readStatus: U.value },
                });
              },
            });
          },
        }),
        J
      ),
      f(
        Y,
        p(he, {
          get when() {
            return s().includes("sender");
          },
          get children() {
            return p(Ve, {
              name: "sender",
              onInput: (U) => {
                t({ ...i(), [n().id]: { ...i()[n().id], sender: U } });
              },
            });
          },
        }),
        J
      ),
      f(
        J,
        p(vt, {
          name: "filter",
          options: [
            { label: "Include Spam and Trash", value: "includeSpamTrash" },
            { label: "Include Drafts", value: "includeDrafts" },
            { label: "Label Names or IDs", value: "labelNamesOrIds" },
            { label: "Search", value: "search" },
            { label: "Read Status", value: "readStatus" },
            { label: "Sender", value: "sender" },
          ],
          onOptionChange: (U) => {
            U.map((G) => d((X) => [...X, G.value]));
          },
        })
      ),
      f(
        K,
        p(he, {
          get when() {
            return r().includes("attachmentsPrefix");
          },
          get children() {
            return p(Ve, {
              name: "attachmentsPrefix",
              onInput: (U) => {
                t({
                  ...i(),
                  [n().id]: { ...i()[n().id], attachmentsPrefix: U },
                });
              },
            });
          },
        }),
        be
      ),
      f(
        K,
        p(he, {
          get when() {
            return r().includes("downloadAttachments");
          },
          get children() {
            return p(ke, {
              name: "downloadAttachments",
              switchText: "Download attachments",
              toolTipContent: { label: "", text: "" },
              onChange: (U) => {
                t({
                  ...i(),
                  [n().id]: { ...i()[n().id], downloadAttachments: U },
                });
              },
            });
          },
        }),
        be
      ),
      f(
        be,
        p(vt, {
          name: "options",
          options: [
            { label: "Attachments prefix", value: "attachmentsPrefix" },
            { label: "Download attachments", value: "downloadAttachments" },
          ],
          onOptionChange: (U) => {
            U.map((G) => l((X) => [...X, G.value]));
          },
        })
      ),
      v
    );
  })();
};
pe(["click"]);
var ns = E('<div id=parameter class="mt-0 px-5 py-4 ">');
const is = () => {
  const { formConfig: e } = we();
  return (() => {
    var t = ns();
    return (
      f(
        t,
        p(he, {
          get when() {
            return e().name === "switch";
          },
          get children() {
            return p(Uo, {});
          },
        }),
        null
      ),
      f(
        t,
        p(he, {
          get when() {
            return e().name === "edit";
          },
          get children() {
            return p(jo, {});
          },
        }),
        null
      ),
      f(
        t,
        p(he, {
          get when() {
            return e().name === "gmail-trigger";
          },
          get children() {
            return p(ts, {});
          },
        }),
        null
      ),
      R((n) => _e(t, { [rt.param]: !0 }, n)),
      t
    );
  })();
};
var rs = E(
  '<div class="flex flex-col text-sm text-gray-300 font-sans"><div class="text-sm flex items-center gap-1 group mb-1"><div>Notes</div><div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?</div></div><textarea title=notes id=notes class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono">'
);
const os = ({ toolTipContent: e }) => {
  const [t, n] = N(""),
    [i, s] = N(!1);
  return (() => {
    var d = rs(),
      r = d.firstChild,
      l = r.firstChild,
      u = l.nextSibling;
    u.firstChild;
    var o = r.nextSibling;
    return (
      u.addEventListener("mouseleave", () => s(!1)),
      u.addEventListener("mouseenter", () => s(!0)),
      f(u, p($t, { showTooltip: i, toolTipContent: e }), null),
      (o.$$input = (a) => n(a.target.value)),
      R(() => (o.value = t())),
      d
    );
  })();
};
pe(["input"]);
var ss = E(
  '<div class="mt-0 px-5 py-4 overflow-visible"><div class=text-white><div class="mt-3 space-y-3"><div class=mt-6><hr class=border-[#373749]><p class="mt-1 text-[#737475] text-sm">Switch node version 2.3.2(latest)'
);
const ls = (e) => {
  N(!1);
  const { formConfig: t, settingConfig: n } = we(),
    i = [
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
    var s = ss(),
      d = s.firstChild,
      r = d.firstChild,
      l = r.firstChild;
    return (
      f(
        r,
        () =>
          n()?.settings.map((u, o) => {
            if (u.type === "dropdown") return p(Pe, { options: i });
            u.type;
          }),
        l
      ),
      f(
        r,
        p(os, {
          toolTipContent: {
            label: "",
            text: "Optional note to save with the node",
          },
        }),
        l
      ),
      f(
        r,
        p(ke, { switchText: "", toolTipContent: { label: "", text: "" } }),
        l
      ),
      s
    );
  })();
};
var ds = E(
  '<div id=mid-panel class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"><div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium">switch</span></div><button id=submitBtn type=submit form=gmailParam class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="h-full flex-1 overflow-visible"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings</div></div></div><div class=overflow-visible><div></div><div>'
);
const as = (e) => {
  const [t, n] = N(0);
  return (() => {
    var i = ds(),
      s = i.firstChild,
      d = s.nextSibling,
      r = d.firstChild,
      l = r.firstChild,
      u = l.firstChild,
      o = u.firstChild,
      a = o.nextSibling,
      c = l.nextSibling,
      C = c.firstChild,
      S = C.nextSibling;
    return (
      (o.$$click = () => n(0)),
      (a.$$click = () => n(1)),
      f(C, p(is, {})),
      f(S, p(ls, {})),
      R(
        (h) => {
          var b = { [rt.midPanel]: !0 },
            m = `rounded-none border-b-2 ${
              t() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            w = `rounded-none border-b-2 ${
              t() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            k = t() === 0 ? "" : "hidden",
            g = t() === 1 ? "" : "hidden";
          return (
            (h.e = _e(i, b, h.e)),
            m !== h.t && _(o, (h.t = m)),
            w !== h.a && _(a, (h.a = w)),
            k !== h.o && _(C, (h.o = k)),
            g !== h.i && _(S, (h.i = g)),
            h
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      i
    );
  })();
};
pe(["click"]);
const cs = "_rightPanel_1ew1b_1",
  us = { rightPanel: cs };
var hs = E(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output'
);
const gs = (e) =>
  (() => {
    var t = hs(),
      n = t.firstChild;
    return (
      n.firstChild,
      f(
        n,
        p(gt, {
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
      R((i) => _e(t, { [us.rightPanel]: !0 }, i)),
      t
    );
  })();
var fs = E('<div class="flex items-start h-full w-full overflow-hidden">');
const ps = (e) =>
  (() => {
    var t = fs();
    return (
      f(t, p(Eo, {}), null), f(t, p(as, {}), null), f(t, p(gs, {}), null), t
    );
  })();
var vs = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const ms = (e) => vs();
var xs = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const ws = (e) => xs();
var bs = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const ys = (e) => bs();
var _s = E(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const $s = (e) => _s();
var Cs = E(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex items-center font-medium text-white gap-x-4"><div class="text-xl text-[#a7a4a4]"></div><div class=text-base>Switch</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const Is = (e) =>
  (() => {
    var t = Cs(),
      n = t.firstChild,
      i = n.firstChild,
      s = n.nextSibling,
      d = s.firstChild,
      r = d.nextSibling,
      l = r.nextSibling;
    return (
      f(i, p(ms, {})), f(d, p(ys, {})), f(r, p($s, {})), f(l, p(ws, {})), t
    );
  })();
var Ss = E(
    `<form id=modal2><div class="flex h-full"><div class="flex-1 pr-4"><div class=mb-4><label class="block text-sm mb-1">Connect using <span class=text-red-500>*</span></label><div class="flex gap-2"><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod><span class=text-sm>OAuth2 (recommended)</span></label><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod><span class=text-sm>Service Account</span></label></div></div><div class=mb-4><label class="block text-sm mb-1">OAuth Redirect URL</label><input type=text class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=https://workflow.juwelt.net/rest/oauth2-credentials/callback title="OAuth Redirect URL"placeholder="OAuth Redirect URL"><p class="text-xs text-gray-400 mt-1">In Gmail, use this URL above when prompted to enter an OAuth callback or redirect URL.</p></div><div class=mb-4><input type=text class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"title="Client ID"placeholder="Enter your Client ID"></div><div class=mb-4><input type=password class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value title="Client Secret"placeholder="Enter your Client Secret"></div><div class="flex items-center gap-1 text-xs text-gray-400"><span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">i</span><span>Enterprise plan users can pull in credentials from external vaults. <a href=# class=text-blue-400>More info</a></span></div></div><div id=right class="w-[300px] bg-[#252535] rounded p-4 h-full"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-medium">Setup guide</h3><a href=# class="text-xs text-blue-400 flex items-center gap-1">Docs<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1=10 y1=14 x2=21 y2=3></line></svg></a></div><div class="text-xs text-gray-300 overflow-y-auto h-full"><p class=mb-2>Configure this credential:</p><ul class="list-disc pl-5 space-y-2"><li>Log in to your <a href=# class=text-blue-400>Google Cloud console</a>.</li><li>Go to Google Cloud Console / APIs and Services / Credentials. If you don't have a project yet, you'll need to create a new one and select it.</li><li>If you haven't used OAuth in this Google Cloud project before, <a href=# class=text-blue-400>configure the consent screen</a>.</li><li>In Credentials, select + CREATE CREDENTIALS + OAuth client ID.</li><li>In the Application type dropdown, select Web application.</li><li>Under Authorized redirect URLs, select + ADD URI. Paste in the OAuth redirect URL shown on the left.</li><li>Select Create.</li><li>In Enabled APIs and services, select + ENABLE APIS AND SERVICES.</li><li>Select and enable the Gmail API.</li><li>Back to Credentials, click on the credential in OAuth 2.0 Client IDs, and copy the Client ID and Client Secret.</li></ul><p class=mt-2>Click the docs link above for more detailed instructions.`
  ),
  Es = E("<div class=text-sm>Sharing settings content goes here..."),
  Ns = E("<div class=text-sm>Details content goes here..."),
  ks = E(
    '<div class=" bg-[#2a2a3a] text-white rounded-md shadow-lg overflow-hidden z-[1000000] w-full h-full"><div class="p-4 flex justify-between items-center border-b border-gray-700 "><div class="flex items-center gap-2"><h2 class="text-base font-medium">Gmail account 4</h2><span class="text-xs text-gray-400">Gmail OAuth2 API</span></div><div class="flex items-center gap-2"><button type=submit form=modal2 class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Save</button><button class="text-gray-400 hover:text-white">×</button></div></div><div class="flex h-full"><div class="w-[150px] bg-[#252535] p-4 flex flex-col gap-3 h-full"><button>Connection</button><button>Sharing</button><button>Details</button></div><div class=" p-4 h-full">'
  );
function Ps() {
  const [e, t] = N("connection"),
    [n, i] = N("oauth2"),
    { setIsModalOpen2: s, setFormData: d, formConfig: r, formData: l } = we();
  return (() => {
    var u = ks(),
      o = u.firstChild,
      a = o.firstChild,
      c = a.nextSibling,
      C = c.firstChild,
      S = C.nextSibling,
      h = o.nextSibling,
      b = h.firstChild,
      m = b.firstChild,
      w = m.nextSibling,
      k = w.nextSibling,
      g = b.nextSibling;
    return (
      (S.$$click = () => s(!1)),
      (m.$$click = () => t("connection")),
      (w.$$click = () => t("sharing")),
      (k.$$click = () => t("details")),
      f(
        g,
        p(he, {
          get when() {
            return e() === "connection";
          },
          get children() {
            var v = Ss(),
              y = v.firstChild,
              O = y.firstChild,
              D = O.firstChild,
              B = D.firstChild,
              z = B.nextSibling,
              j = z.firstChild,
              F = j.firstChild,
              Y = j.nextSibling,
              le = Y.firstChild,
              ve = D.nextSibling,
              J = ve.firstChild,
              K = J.nextSibling,
              ie = ve.nextSibling,
              de = ie.firstChild,
              be = ie.nextSibling,
              U = be.firstChild;
            return (
              F.addEventListener("change", () => {
                i("oauth2"),
                  d({
                    ...l(),
                    [r().id]: { ...l()[r().id], "connection type": n() },
                  });
              }),
              le.addEventListener("change", () => {
                i("service"),
                  d({
                    ...l(),
                    [r().id]: { ...l()[r().id], "connection type": n() },
                  });
              }),
              K.addEventListener("change", (G) => {
                d({
                  ...l(),
                  [r().id]: {
                    ...l()[r().id],
                    "OAuth Redirect URL": G.target.value,
                  },
                });
              }),
              de.addEventListener("change", (G) => {
                d({
                  ...l(),
                  [r().id]: { ...l()[r().id], "Client ID": G.target.value },
                });
              }),
              U.addEventListener("change", (G) => {
                d({
                  ...l(),
                  [r().id]: { ...l()[r().id], "Client Secret": G.target.value },
                });
              }),
              R(() => (F.checked = n() === "oauth2")),
              R(() => (le.checked = n() === "service")),
              v
            );
          },
        }),
        null
      ),
      f(
        g,
        p(he, {
          get when() {
            return e() === "sharing";
          },
          get children() {
            return Es();
          },
        }),
        null
      ),
      f(
        g,
        p(he, {
          get when() {
            return e() === "details";
          },
          get children() {
            return Ns();
          },
        }),
        null
      ),
      R(
        (v) => {
          var y = `text-left text-sm ${
              e() === "connection" ? "text-white" : "text-gray-400"
            }`,
            O = `text-left text-sm ${
              e() === "sharing" ? "text-white" : "text-gray-400"
            }`,
            D = `text-left text-sm ${
              e() === "details" ? "text-white" : "text-gray-400"
            }`;
          return (
            y !== v.e && _(m, (v.e = y)),
            O !== v.t && _(w, (v.t = O)),
            D !== v.a && _(k, (v.a = D)),
            v
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      u
    );
  })();
}
pe(["click"]);
var Vs = E(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const Ts = ({ node: e }) => {
    const [t, n] = N(),
      {
        nodes: i,
        setNodes: s,
        selectedNode: d,
        setSelectedNode: r,
        pendingOutput: l,
        lastClickPosition: u,
        setEdges: o,
        edges: a,
        transform: c,
        scale: C,
        isShowModal: S,
        setIsModalOpen: h,
        isModalOpen: b,
        isModalOpen2: m,
        setIsModalOpen2: w,
      } = we();
    function k(g) {
      let v = window.innerWidth / 2,
        y = window.innerHeight / 2;
      const O = d(),
        D = l(),
        B = u();
      function z(ee, Me = 200, me = 0) {
        const $e = i().find((P) => P.id === ee);
        if ((n($e), !$e)) return null;
        const ye = $e.currPosition.get();
        return { x: ye.x + Me, y: ye.y + me };
      }
      if (O) {
        let ee = z(O);
        ee && ((v = ee.x), (y = ee.y));
      } else if (D) {
        let ee = z(D.nodeId);
        ee && ((v = ee.x), (y = ee.y));
      } else B && ((v = (B.x - c().x) / C()), (y = (B.y - c().y) / C()));
      const [j, F] = N({ x: v, y }),
        [Y, le] = N({ x: v, y }),
        [ve, J] = N([]),
        [K, ie] = N([]),
        [de, be] = N([]),
        U = [
          ...Array(Number(e[g].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        G = [
          ...Array(Number(e[g].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        X = [
          ...Array(Number(e[g].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        Se = [
          ...Array(Number(e[g].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ];
      Xe(() => {
        s([
          ...i(),
          {
            id: `node_${Math.random().toString(36).substring(2, 8)}_${g}`,
            name: g,
            numberInputs: e[g].numberInputs,
            numberOutputs: e[g].numberOutputs,
            isInputVertex: e[g].isInputVertex,
            isOutputVertex: e[g].isOutputVertex,
            inputVertexIds: U,
            outputVertexIds: G,
            isDownVertex: e[g].isDownVertex || !1,
            isUpVertex: e[g].isUpVertex || !1,
            downVertexNumber: e[g].downVertexNumber || 0,
            upVertexNumber: e[g].upVertexNumber || 0,
            downVertexIds: X,
            upVertexIds: Se,
            downVertexOrientation: e[g].downVertexOrientation,
            busyIndex: { get: de, set: be },
            content: e[g].content,
            prevPosition: { get: j, set: F },
            currPosition: { get: Y, set: le },
            inputEdgeIds: { get: ve, set: J },
            outputEdgeIds: { get: K, set: ie },
          },
        ]);
      });
      const ae = i()[i().length - 1];
      function De(ee = 0) {
        const Me = document.getElementById(t().outputVertexIds[ee]),
          {
            left: me,
            right: $e,
            top: ye,
            bottom: P,
          } = Me.getBoundingClientRect(),
          L = me + Math.abs(me - $e) / 2,
          A = ye + Math.abs(ye - P) / 2,
          x = document.getElementById(ae.inputVertexIds[0]),
          { left: I, right: $, top: M, bottom: V } = x.getBoundingClientRect(),
          T = I + Math.abs(I - $) / 2,
          W = M + Math.abs(M - V) / 2,
          [q, H] = N({ x: (L - c().x) / C(), y: (A - c().y) / C() }),
          [Q, ce] = N({ x: (T - c().x) / C(), y: (W - c().y) / C() }),
          [oe, Ge] = N({ x: (L - c().x) / C(), y: (A - c().y) / C() }),
          [ot, st] = N({ x: (T - c().x) / C(), y: (W - c().y) / C() }),
          ze = `edge_${t().id}_${ee}_${ae.id}_0`;
        t().outputEdgeIds.set([...t().outputEdgeIds.get(), ze]),
          ae.inputEdgeIds.set([...ae.inputEdgeIds.get(), ze]),
          o([
            ...a(),
            {
              id: ze,
              nodeStartId: t().id,
              nodeEndId: ae.id,
              inputIndex: 0,
              typeOfEdge: "solid",
              outputIndex: ee,
              inputVertexId: ae.inputVertexIds[0],
              outputVertexId: t().outputVertexIds[ee],
              prevStartPosition: { get: q, set: H },
              prevEndPosition: { get: Q, set: ce },
              currStartPosition: { get: oe, set: Ge },
              currEndPosition: { get: ot, set: st },
            },
          ]),
          t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[ee]]);
      }
      O
        ? t()?.isOutputVertex && ae.isInputVertex && De()
        : D &&
          t()?.isOutputVertex &&
          ae.isInputVertex &&
          De(D.outputVertexIndex),
        i().length <= 1 && i()[0].isOutputVertex
          ? r(i()[0].id)
          : t()?.isOutputVertex && ae.isInputVertex && r(ae.id);
    }
    return (() => {
      var g = Vs();
      return (
        f(
          g,
          p(Ze, {
            get children() {
              return p(co, {});
            },
          }),
          null
        ),
        f(
          g,
          p(Ze, {
            get children() {
              return [
                p(Mt, {
                  isOpen: () => b(),
                  onClose: () => h(!1),
                  zIndex: 9999,
                  get children() {
                    return [p(Is, {}), p(ps, {})];
                  },
                }),
                p(Mt, {
                  isOpen: () => m(),
                  onClose: () => w(!1),
                  zIndex: 1e5,
                  widthClass: "w-[900px] max-w-[1200px] h-fit max-h-[90vh] ",
                  get children() {
                    return p(Ps, {});
                  },
                }),
              ];
            },
          }),
          null
        ),
        f(
          g,
          p(Ze, {
            get children() {
              return p(nr, { onClickAdd: k, nodeMark: lo });
            },
          }),
          null
        ),
        f(
          g,
          p(Ze, {
            get children() {
              return p(Ai, {});
            },
          }),
          null
        ),
        f(
          g,
          p(Ze, {
            get children() {
              return p(Fr, { nodes: i, setNodes: s });
            },
          }),
          null
        ),
        g
      );
    })();
  },
  Os = "_node_4buk8_1",
  Ds = "_selectedNode_4buk8_23",
  Ms = "_switchIcon_4buk8_57",
  As = "_switchNodeText_4buk8_65",
  Ls = "_switchTitle_4buk8_81",
  zs = "_switchDescription_4buk8_91",
  Re = {
    node: Os,
    selectedNode: Ds,
    switchIcon: Ms,
    switchNodeText: As,
    switchTitle: Ls,
    switchDescription: zs,
  };
var Bs = E(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const Rs = (e) =>
    (() => {
      var t = Bs(),
        n = t.firstChild,
        i = n.nextSibling,
        s = i.firstChild,
        d = s.nextSibling;
      return (
        R(
          (r) => {
            var l = e.selected ? Re.selectedNode : Re.node,
              u = Re.switchIcon,
              o = Re.switchNodeText,
              a = Re.switchTitle,
              c = Re.switchDescription;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(n, (r.t = u)),
              o !== r.a && _(i, (r.a = o)),
              a !== r.o && _(s, (r.o = a)),
              c !== r.i && _(d, (r.i = c)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Hs = "_testNode_3c9qb_1",
  Us = "_selectedNode_3c9qb_25",
  Ws = "_testNodeIcon_3c9qb_55",
  Fs = "_testNodeTitle_3c9qb_63",
  lt = { testNode: Hs, selectedNode: Us, testNodeIcon: Ws, testNodeTitle: Fs };
var js = E(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const Xs = (e) =>
    (() => {
      var t = js(),
        n = t.firstChild,
        i = n.nextSibling;
      return (
        R(
          (s) => {
            var d = e.selected ? lt.selectedNode : lt.testNode,
              r = lt.testNodeIcon,
              l = lt.testNodeTitle;
            return (
              d !== s.e && _(t, (s.e = d)),
              r !== s.t && _(n, (s.t = r)),
              l !== s.a && _(i, (s.a = l)),
              s
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  Ys = "_node_160z5_1",
  qs = "_selectedNode_160z5_23",
  Gs = "_switchIcon_160z5_59",
  Zs = "_switchNodeText_160z5_67",
  Ks = "_switchTitle_160z5_83",
  Js = "_switchDescription_160z5_93",
  He = {
    node: Ys,
    selectedNode: qs,
    switchIcon: Gs,
    switchNodeText: Zs,
    switchTitle: Ks,
    switchDescription: Js,
  };
var Qs = E(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const el = (e) =>
    (() => {
      var t = Qs(),
        n = t.firstChild,
        i = n.nextSibling,
        s = i.firstChild,
        d = s.nextSibling;
      return (
        R(
          (r) => {
            var l = e.selected ? He.selectedNode : He.node,
              u = He.switchIcon,
              o = He.switchNodeText,
              a = He.switchTitle,
              c = He.switchDescription;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(n, (r.t = u)),
              o !== r.a && _(i, (r.a = o)),
              a !== r.o && _(s, (r.o = a)),
              c !== r.i && _(d, (r.i = c)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  tl = "_node_13uy5_1",
  nl = "_selectedNode_13uy5_25",
  il = "_switchIcon_13uy5_59",
  rl = "_switchNodeText_13uy5_67",
  ol = "_switchTitle_13uy5_83",
  Ke = {
    node: tl,
    selectedNode: nl,
    switchIcon: il,
    switchNodeText: rl,
    switchTitle: ol,
  };
var sl = E(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const ll = (e) =>
    (() => {
      var t = sl(),
        n = t.firstChild,
        i = n.nextSibling,
        s = i.firstChild;
      return (
        R(
          (d) => {
            var r = e.selected ? Ke.selectedNode : Ke.node,
              l = Ke.switchIcon,
              u = Ke.switchNodeText,
              o = Ke.switchTitle;
            return (
              r !== d.e && _(t, (d.e = r)),
              l !== d.t && _(n, (d.t = l)),
              u !== d.a && _(i, (d.a = u)),
              o !== d.o && _(s, (d.o = o)),
              d
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  dl = "_AiAgentNode_go6bf_1",
  al = "_selectedNode_go6bf_33",
  cl = "_AiAgentNodeIcon_go6bf_71",
  ul = "_AiAgentNodeTitle_go6bf_81",
  hl = "_AiAgentNodeDescription_go6bf_95",
  Ue = {
    AiAgentNode: dl,
    selectedNode: al,
    AiAgentNodeIcon: cl,
    AiAgentNodeTitle: ul,
    AiAgentNodeDescription: hl,
  };
var gl = E("<div><div></div><div><div>AI Agent</div><div>Tools Agent");
const fl = (e) =>
    (() => {
      var t = gl(),
        n = t.firstChild,
        i = n.nextSibling,
        s = i.firstChild,
        d = s.nextSibling;
      return (
        f(n, p(jn, {})),
        R(
          (r) => {
            var l = e.selected ? Ue.selectedNode : Ue.AiAgentNode,
              u = Ue.AiAgentNodeIcon,
              o = Ue.AiAgentNodeText,
              a = Ue.AiAgentNodeTitle,
              c = Ue.AiAgentNodeDescription;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(n, (r.t = u)),
              o !== r.a && _(i, (r.a = o)),
              a !== r.o && _(s, (r.o = a)),
              c !== r.i && _(d, (r.i = c)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  pl = "_EmailNode_imw2c_1",
  vl = "_selectedNode_imw2c_23",
  ml = "_mailIcon_imw2c_49",
  xl = "_mailNodeText_imw2c_61",
  wl = "_mailTitle_imw2c_77",
  bl = "_mailDescription_imw2c_87",
  We = {
    EmailNode: pl,
    selectedNode: vl,
    mailIcon: ml,
    mailNodeText: xl,
    mailTitle: wl,
    mailDescription: bl,
  };
var yl = E("<div><div></div><div><div>Send Email</div><div>send");
const _l = (e) =>
    (() => {
      var t = yl(),
        n = t.firstChild,
        i = n.nextSibling,
        s = i.firstChild,
        d = s.nextSibling;
      return (
        f(n, p(Xn, {})),
        R(
          (r) => {
            var l = e.selected ? We.selectedNode : We.EmailNode,
              u = We.mailIcon,
              o = We.mailNodeText,
              a = We.mailTitle,
              c = We.mailDescription;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(n, (r.t = u)),
              o !== r.a && _(i, (r.a = o)),
              a !== r.o && _(s, (r.o = a)),
              c !== r.i && _(d, (r.i = c)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  $l = "_VectorStoreNode_omif4_1",
  Cl = "_selectedNode_omif4_31",
  Il = "_VectorStoreNodeIcon_omif4_67",
  Sl = "_VectorStoreNodeTitle_omif4_77",
  El = "_VectorStoreNodeText_omif4_97",
  Je = {
    VectorStoreNode: $l,
    selectedNode: Cl,
    VectorStoreNodeIcon: Il,
    VectorStoreNodeTitle: Sl,
    VectorStoreNodeText: El,
  };
var Nl = E(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const kl = (e) =>
    (() => {
      var t = Nl(),
        n = t.firstChild,
        i = n.firstChild,
        s = i.nextSibling,
        d = s.firstChild;
      return (
        f(i, p(Yn, {})),
        R(
          (r) => {
            var l = e.selected ? Je.selectedNode : Je.VectorStoreNode,
              u = Je.VectorStoreNodeIcon,
              o = Je.VectorStoreNodeText,
              a = Je.VectorStoreNodeTitle;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(i, (r.t = u)),
              o !== r.a && _(s, (r.a = o)),
              a !== r.o && _(d, (r.o = a)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Pl = "_pgVectorNode_4ee5v_1",
  Vl = "_selectedNode_4ee5v_31",
  Tl = "_pgVectorNodeIcon_4ee5v_67",
  Ol = "_pgVectorNodeTitle_4ee5v_77",
  Dl = "_pgVectorNodeText_4ee5v_95",
  Qe = {
    pgVectorNode: Pl,
    selectedNode: Vl,
    pgVectorNodeIcon: Tl,
    pgVectorNodeTitle: Ol,
    pgVectorNodeText: Dl,
  };
var Ml = E(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const Al = (e) =>
    (() => {
      var t = Ml(),
        n = t.firstChild,
        i = n.firstChild,
        s = i.nextSibling,
        d = s.firstChild;
      return (
        f(i, p(qn, {})),
        R(
          (r) => {
            var l = e.selected ? Qe.selectedNode : Qe.pgVectorNode,
              u = Qe.pgVectorNodeIcon,
              o = Qe.pgVectorNodeText,
              a = Qe.pgVectorNodeTitle;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(i, (r.t = u)),
              o !== r.a && _(s, (r.a = o)),
              a !== r.o && _(d, (r.o = a)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Ll = "_ollamaChatNode_24diw_1",
  zl = "_selectedNode_24diw_31",
  Bl = "_ollamaChatNodeIcon_24diw_67",
  Rl = "_ollamaChatNodeTitle_24diw_77",
  Hl = "_ollamaChatNodeText_24diw_95",
  et = {
    ollamaChatNode: Ll,
    selectedNode: zl,
    ollamaChatNodeIcon: Bl,
    ollamaChatNodeTitle: Rl,
    ollamaChatNodeText: Hl,
  };
var Ul = E(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const Wl = (e) =>
    (() => {
      var t = Ul(),
        n = t.firstChild,
        i = n.firstChild,
        s = i.nextSibling,
        d = s.firstChild;
      return (
        f(i, p(Gn, {})),
        R(
          (r) => {
            var l = e.selected ? et.selectedNode : et.ollamaChatNode,
              u = et.ollamaChatNodeIcon,
              o = et.ollamaChatNodeText,
              a = `${et.ollamaChatNodeTitle} text-nowrap`;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(i, (r.t = u)),
              o !== r.a && _(s, (r.a = o)),
              a !== r.o && _(d, (r.o = a)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Fl = "_gmailTriggerNode_1hu5j_1",
  jl = "_selectedNode_1hu5j_25",
  Xl = "_gmailTriggerNodeIcon_1hu5j_55",
  Yl = "_gmailTriggerNodeText_1hu5j_65",
  ql = "_gmailTriggerNodeTitle_1hu5j_83",
  Gl = "_gmailTriggerNodeDescription_1hu5j_93",
  Fe = {
    gmailTriggerNode: Fl,
    selectedNode: jl,
    gmailTriggerNodeIcon: Xl,
    gmailTriggerNodeText: Yl,
    gmailTriggerNodeTitle: ql,
    gmailTriggerNodeDescription: Gl,
  };
var Zl = E("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const Kl = (e) =>
    (() => {
      var t = Zl(),
        n = t.firstChild,
        i = n.nextSibling,
        s = i.firstChild,
        d = s.nextSibling;
      return (
        f(n, p(Zn, {})),
        R(
          (r) => {
            var l = e.selected ? Fe.selectedNode : Fe.gmailTriggerNode,
              u = Fe.gmailTriggerNodeIcon,
              o = Fe.gmailTriggerNodeText,
              a = Fe.gmailTriggerNodeTitle,
              c = Fe.gmailTriggerNodeDescription;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(n, (r.t = u)),
              o !== r.a && _(i, (r.a = o)),
              a !== r.o && _(s, (r.o = a)),
              c !== r.i && _(d, (r.i = c)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Jl = "_createDraftNode_gxi0p_1",
  Ql = "_selectedNode_gxi0p_31",
  ed = "_createDraftNodeIcon_gxi0p_67",
  td = "_createDraftNodeTitle_gxi0p_77",
  nd = "_createDraftNodeText_gxi0p_95",
  id = "_createDraftNodeDescription_gxi0p_115",
  je = {
    createDraftNode: Jl,
    selectedNode: Ql,
    createDraftNodeIcon: ed,
    createDraftNodeTitle: td,
    createDraftNodeText: nd,
    createDraftNodeDescription: id,
  };
var rd = E(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const od = (e) =>
    (() => {
      var t = rd(),
        n = t.firstChild,
        i = n.firstChild,
        s = i.nextSibling,
        d = s.firstChild,
        r = d.nextSibling;
      return (
        f(i, p(Kn, {})),
        R(
          (l) => {
            var u = e.selected ? je.selectedNode : je.createDraftNode,
              o = je.createDraftNodeIcon,
              a = je.createDraftNodeText,
              c = `${je.createDraftNodeTitle} text-nowrap`,
              C = je.createDraftNodeDescription;
            return (
              u !== l.e && _(t, (l.e = u)),
              o !== l.t && _(i, (l.t = o)),
              a !== l.a && _(s, (l.a = a)),
              c !== l.o && _(d, (l.o = c)),
              C !== l.i && _(r, (l.i = C)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  sd = "_embeddingNode_19nxp_1",
  ld = "_selectedNode_19nxp_31",
  dd = "_embeddingNodeIcon_19nxp_67",
  ad = "_embeddingNodeTitle_19nxp_77",
  cd = "_embeddingNodeText_19nxp_95",
  tt = {
    embeddingNode: sd,
    selectedNode: ld,
    embeddingNodeIcon: dd,
    embeddingNodeTitle: ad,
    embeddingNodeText: cd,
  };
var ud = E(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const hd = (e) =>
    (() => {
      var t = ud(),
        n = t.firstChild,
        i = n.firstChild,
        s = i.nextSibling,
        d = s.firstChild;
      return (
        f(i, p(Jn, {})),
        R(
          (r) => {
            var l = e.selected ? tt.selectedNode : tt.embeddingNode,
              u = tt.embeddingNodeIcon,
              o = tt.embeddingNodeText,
              a = `${tt.embeddingNodeTitle} text-nowrap`;
            return (
              l !== r.e && _(t, (r.e = l)),
              u !== r.t && _(i, (r.t = u)),
              o !== r.a && _(s, (r.a = o)),
              a !== r.o && _(d, (r.o = a)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  gd = {
    chat: {
      name: "chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Xs,
    },
    switch: {
      name: "switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 3,
      content: Rs,
    },
    edit: {
      name: "edit",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: el,
    },
    filter: {
      name: "filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: ll,
    },
    "ai-agent": {
      name: "ai-agent",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      isDownVertex: !0,
      downVertexNumber: 3,
      downVertexOrientation: "1 1 2",
      content: fl,
    },
    "send-email": {
      name: "send-email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: _l,
    },
    "vector-store": {
      name: "vector-store",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isDownVertex: !0,
      isUpVertex: !0,
      upVertexNumber: 1,
      downVertexNumber: 2,
      downVertexOrientation: "1 1",
      content: kl,
    },
    "pg-vector": {
      name: "pg-vector",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isDownVertex: !0,
      isUpVertex: !0,
      upVertexNumber: 1,
      downVertexNumber: 1,
      downVertexOrientation: "1",
      content: Al,
    },
    "ollama-chat": {
      name: "ollama-chat",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: Wl,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Kl,
    },
    "create-draft": {
      name: "create-draft",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: od,
    },
    embedding: {
      name: "embedding",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: hd,
    },
  },
  fd = (e) => p(Ts, { node: gd }),
  pd = document.getElementById("root");
xi(() => p(fd, {}), pd);
