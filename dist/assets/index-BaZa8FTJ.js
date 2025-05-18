(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const c of s)
      if (c.type === "childList")
        for (const o of c.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const c = {};
    return (
      s.integrity && (c.integrity = s.integrity),
      s.referrerPolicy && (c.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (c.credentials = "omit")
        : (c.credentials = "same-origin"),
      c
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const c = n(s);
    fetch(s.href, c);
  }
})();
const Yn = !1,
  Xn = (e, t) => e === t,
  qn = Symbol("solid-track"),
  ot = { equals: Xn };
let Dt = Rt;
const $e = 1,
  rt = 2,
  Lt = { owned: null, cleanups: null, context: null, owner: null };
var Y = null;
let ft = null,
  Gn = null,
  G = null,
  de = null,
  we = null,
  ct = 0;
function De(e, t) {
  const n = G,
    r = Y,
    s = e.length === 0,
    c = t === void 0 ? r : t,
    o = s
      ? Lt
      : {
          owned: null,
          cleanups: null,
          context: c ? c.context : null,
          owner: c,
        },
    l = s ? e : () => e(() => ye(() => Ge(o)));
  (Y = o), (G = null);
  try {
    return Re(l, !0);
  } finally {
    (G = n), (Y = r);
  }
}
function P(e, t) {
  t = t ? Object.assign({}, ot, t) : ot;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    r = (s) => (typeof s == "function" && (s = s(n.value)), Bt(n, s));
  return [zt.bind(n), r];
}
function L(e, t, n) {
  const r = xt(e, t, !1, $e);
  Ze(r);
}
function mt(e, t, n) {
  Dt = oo;
  const r = xt(e, t, !1, $e);
  (!n || !n.render) && (r.user = !0), we ? we.push(r) : Ze(r);
}
function ee(e, t, n) {
  n = n ? Object.assign({}, ot, n) : ot;
  const r = xt(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    Ze(r),
    zt.bind(r)
  );
}
function ye(e) {
  if (G === null) return e();
  const t = G;
  G = null;
  try {
    return e();
  } finally {
    G = t;
  }
}
function Be(e) {
  mt(() => ye(e));
}
function Se(e) {
  return (
    Y === null ||
      (Y.cleanups === null ? (Y.cleanups = [e]) : Y.cleanups.push(e)),
    e
  );
}
function Zn() {
  return Y;
}
function Kn(e, t) {
  const n = Y,
    r = G;
  (Y = e), (G = null);
  try {
    return Re(t, !0);
  } catch (s) {
    wt(s);
  } finally {
    (Y = n), (G = r);
  }
}
function Jn(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: io(n), defaultValue: e };
}
function Qn(e) {
  let t;
  return Y && Y.context && (t = Y.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function eo(e) {
  const t = ee(e),
    n = ee(() => vt(t()));
  return (
    (n.toArray = () => {
      const r = n();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    n
  );
}
function zt() {
  if (this.sources && this.state)
    if (this.state === $e) Ze(this);
    else {
      const e = de;
      (de = null), Re(() => st(this), !1), (de = e);
    }
  if (G) {
    const e = this.observers ? this.observers.length : 0;
    G.sources
      ? (G.sources.push(this), G.sourceSlots.push(e))
      : ((G.sources = [this]), (G.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(G),
          this.observerSlots.push(G.sources.length - 1))
        : ((this.observers = [G]),
          (this.observerSlots = [G.sources.length - 1]));
  }
  return this.value;
}
function Bt(e, t, n) {
  let r = e.value;
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        Re(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const c = e.observers[s],
              o = ft && ft.running;
            o && ft.disposed.has(c),
              (o ? !c.tState : !c.state) &&
                (c.pure ? de.push(c) : we.push(c), c.observers && Ht(c)),
              o || (c.state = $e);
          }
          if (de.length > 1e6) throw ((de = []), new Error());
        }, !1)),
    t
  );
}
function Ze(e) {
  if (!e.fn) return;
  Ge(e);
  const t = ct;
  to(e, e.value, t);
}
function to(e, t, n) {
  let r;
  const s = Y,
    c = G;
  G = Y = e;
  try {
    r = e.fn(t);
  } catch (o) {
    return (
      e.pure &&
        ((e.state = $e), e.owned && e.owned.forEach(Ge), (e.owned = null)),
      (e.updatedAt = n + 1),
      wt(o)
    );
  } finally {
    (G = c), (Y = s);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? Bt(e, r) : (e.value = r),
    (e.updatedAt = n));
}
function xt(e, t, n, r = $e, s) {
  const c = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: Y,
    context: Y ? Y.context : null,
    pure: n,
  };
  return (
    Y === null || (Y !== Lt && (Y.owned ? Y.owned.push(c) : (Y.owned = [c]))), c
  );
}
function it(e) {
  if (e.state === 0) return;
  if (e.state === rt) return st(e);
  if (e.suspense && ye(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ct); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === $e)) Ze(e);
    else if (e.state === rt) {
      const r = de;
      (de = null), Re(() => st(e, t[0]), !1), (de = r);
    }
}
function Re(e, t) {
  if (de) return e();
  let n = !1;
  t || (de = []), we ? (n = !0) : (we = []), ct++;
  try {
    const r = e();
    return no(n), r;
  } catch (r) {
    n || (we = null), (de = null), wt(r);
  }
}
function no(e) {
  if ((de && (Rt(de), (de = null)), e)) return;
  const t = we;
  (we = null), t.length && Re(() => Dt(t), !1);
}
function Rt(e) {
  for (let t = 0; t < e.length; t++) it(e[t]);
}
function oo(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : it(r);
  }
  for (t = 0; t < n; t++) it(e[t]);
}
function st(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const s = r.state;
      s === $e
        ? r !== t && (!r.updatedAt || r.updatedAt < ct) && it(r)
        : s === rt && st(r, t);
    }
  }
}
function Ht(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = rt), n.pure ? de.push(n) : we.push(n), n.observers && Ht(n));
  }
}
function Ge(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        s = n.observers;
      if (s && s.length) {
        const c = s.pop(),
          o = n.observerSlots.pop();
        r < s.length &&
          ((c.sourceSlots[o] = r), (s[r] = c), (n.observerSlots[r] = o));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Ge(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Ge(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function ro(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function wt(e, t = Y) {
  throw ro(e);
}
function vt(e) {
  if (typeof e == "function" && !e.length) return vt(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = vt(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function io(e, t) {
  return function (r) {
    let s;
    return (
      L(
        () =>
          (s = ye(
            () => (
              (Y.context = { ...Y.context, [e]: r.value }), eo(() => r.children)
            )
          )),
        void 0
      ),
      s
    );
  };
}
const so = Symbol("fallback");
function St(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function lo(e, t, n = {}) {
  let r = [],
    s = [],
    c = [],
    o = 0,
    l = t.length > 1 ? [] : null;
  return (
    Se(() => St(c)),
    () => {
      let u = e() || [],
        i = u.length,
        d,
        a;
      return (
        u[qn],
        ye(() => {
          let v, h, g, _, $, I, p, f, S;
          if (i === 0)
            o !== 0 &&
              (St(c), (c = []), (r = []), (s = []), (o = 0), l && (l = [])),
              n.fallback &&
                ((r = [so]),
                (s[0] = De((z) => ((c[0] = z), n.fallback()))),
                (o = 1));
          else if (o === 0) {
            for (s = new Array(i), a = 0; a < i; a++)
              (r[a] = u[a]), (s[a] = De(x));
            o = i;
          } else {
            for (
              g = new Array(i),
                _ = new Array(i),
                l && ($ = new Array(i)),
                I = 0,
                p = Math.min(o, i);
              I < p && r[I] === u[I];
              I++
            );
            for (
              p = o - 1, f = i - 1;
              p >= I && f >= I && r[p] === u[f];
              p--, f--
            )
              (g[f] = s[p]), (_[f] = c[p]), l && ($[f] = l[p]);
            for (v = new Map(), h = new Array(f + 1), a = f; a >= I; a--)
              (S = u[a]),
                (d = v.get(S)),
                (h[a] = d === void 0 ? -1 : d),
                v.set(S, a);
            for (d = I; d <= p; d++)
              (S = r[d]),
                (a = v.get(S)),
                a !== void 0 && a !== -1
                  ? ((g[a] = s[d]),
                    (_[a] = c[d]),
                    l && ($[a] = l[d]),
                    (a = h[a]),
                    v.set(S, a))
                  : c[d]();
            for (a = I; a < i; a++)
              a in g
                ? ((s[a] = g[a]), (c[a] = _[a]), l && ((l[a] = $[a]), l[a](a)))
                : (s[a] = De(x));
            (s = s.slice(0, (o = i))), (r = u.slice(0));
          }
          return s;
        })
      );
      function x(v) {
        if (((c[a] = v), l)) {
          const [h, g] = P(a);
          return (l[a] = g), t(u[a], h);
        }
        return t(u[a]);
      }
    }
  );
}
function y(e, t) {
  return ye(() => e(t || {}));
}
const co = (e) => `Stale read from <${e}>.`;
function ae(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return ee(lo(() => e.each, e.children, t || void 0));
}
function be(e) {
  const t = e.keyed,
    n = ee(() => e.when, void 0, void 0),
    r = t ? n : ee(n, void 0, { equals: (s, c) => !s == !c });
  return ee(
    () => {
      const s = r();
      if (s) {
        const c = e.children;
        return typeof c == "function" && c.length > 0
          ? ye(() =>
              c(
                t
                  ? s
                  : () => {
                      if (!ye(r)) throw co("Show");
                      return n();
                    }
              )
            )
          : c;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function ao(e, t, n) {
  let r = n.length,
    s = t.length,
    c = r,
    o = 0,
    l = 0,
    u = t[s - 1].nextSibling,
    i = null;
  for (; o < s || l < c; ) {
    if (t[o] === n[l]) {
      o++, l++;
      continue;
    }
    for (; t[s - 1] === n[c - 1]; ) s--, c--;
    if (s === o) {
      const d = c < r ? (l ? n[l - 1].nextSibling : n[c - l]) : u;
      for (; l < c; ) e.insertBefore(n[l++], d);
    } else if (c === l)
      for (; o < s; ) (!i || !i.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[c - 1] && n[l] === t[s - 1]) {
      const d = t[--s].nextSibling;
      e.insertBefore(n[l++], t[o++].nextSibling),
        e.insertBefore(n[--c], d),
        (t[s] = n[c]);
    } else {
      if (!i) {
        i = new Map();
        let a = l;
        for (; a < c; ) i.set(n[a], a++);
      }
      const d = i.get(t[o]);
      if (d != null)
        if (l < d && d < c) {
          let a = o,
            x = 1,
            v;
          for (
            ;
            ++a < s && a < c && !((v = i.get(t[a])) == null || v !== d + x);

          )
            x++;
          if (x > d - l) {
            const h = t[o];
            for (; l < d; ) e.insertBefore(n[l++], h);
          } else e.replaceChild(n[l++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const Et = "_$DX_DELEGATE";
function uo(e, t, n, r = {}) {
  let s;
  return (
    De((c) => {
      (s = c),
        t === document ? e() : m(t, e(), t.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      s(), (t.textContent = "");
    }
  );
}
function N(e, t, n, r) {
  let s;
  const c = () => {
      const l = document.createElement("template");
      return (l.innerHTML = e), l.content.firstChild;
    },
    o = () => (s || (s = c())).cloneNode(!0);
  return (o.cloneNode = o), o;
}
function oe(e, t = window.document) {
  const n = t[Et] || (t[Et] = new Set());
  for (let r = 0, s = e.length; r < s; r++) {
    const c = e[r];
    n.has(c) || (n.add(c), t.addEventListener(c, ho));
  }
}
function ne(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function b(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function ge(e, t, n = {}) {
  const r = Object.keys(t || {}),
    s = Object.keys(n);
  let c, o;
  for (c = 0, o = s.length; c < o; c++) {
    const l = s[c];
    !l || l === "undefined" || t[l] || (Nt(e, l, !1), delete n[l]);
  }
  for (c = 0, o = r.length; c < o; c++) {
    const l = r[c],
      u = !!t[l];
    !l || l === "undefined" || n[l] === u || !u || (Nt(e, l, !0), (n[l] = u));
  }
  return n;
}
function xe(e, t, n) {
  return ye(() => e(t, n));
}
function m(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != "function"))
    return lt(e, t, r, n);
  L((s) => lt(e, t(), s, n), r);
}
function Nt(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let s = 0, c = r.length; s < c; s++) e.classList.toggle(r[s], n);
}
function ho(e) {
  let t = e.target;
  const n = `$$${e.type}`,
    r = e.target,
    s = e.currentTarget,
    c = (u) =>
      Object.defineProperty(e, "target", { configurable: !0, value: u }),
    o = () => {
      const u = t[n];
      if (u && !t.disabled) {
        const i = t[`${n}Data`];
        if ((i !== void 0 ? u.call(t, i, e) : u.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(e.target) &&
          c(t.host),
        !0
      );
    },
    l = () => {
      for (; o() && (t = t._$host || t.parentNode || t.host); );
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
    c(u[0]);
    for (let i = 0; i < u.length - 2 && ((t = u[i]), !!o()); i++) {
      if (t._$host) {
        (t = t._$host), l();
        break;
      }
      if (t.parentNode === s) break;
    }
  } else l();
  c(r);
}
function lt(e, t, n, r, s) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const c = typeof t,
    o = r !== void 0;
  if (
    ((e = (o && n[0] && n[0].parentNode) || e),
    c === "string" || c === "number")
  ) {
    if (c === "number" && ((t = t.toString()), t === n)) return n;
    if (o) {
      let l = n[0];
      l && l.nodeType === 3
        ? l.data !== t && (l.data = t)
        : (l = document.createTextNode(t)),
        (n = ke(e, n, r, l));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || c === "boolean") n = ke(e, n, r);
  else {
    if (c === "function")
      return (
        L(() => {
          let l = t();
          for (; typeof l == "function"; ) l = l();
          n = lt(e, l, n, r);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const l = [],
        u = n && Array.isArray(n);
      if (pt(l, t, n, s)) return L(() => (n = lt(e, l, n, r, !0))), () => n;
      if (l.length === 0) {
        if (((n = ke(e, n, r)), o)) return n;
      } else
        u
          ? n.length === 0
            ? kt(e, l, r)
            : ao(e, n, l)
          : (n && ke(e), kt(e, l));
      n = l;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (o) return (n = ke(e, n, r, t));
        ke(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function pt(e, t, n, r) {
  let s = !1;
  for (let c = 0, o = t.length; c < o; c++) {
    let l = t[c],
      u = n && n[e.length],
      i;
    if (!(l == null || l === !0 || l === !1))
      if ((i = typeof l) == "object" && l.nodeType) e.push(l);
      else if (Array.isArray(l)) s = pt(e, l, u) || s;
      else if (i === "function")
        if (r) {
          for (; typeof l == "function"; ) l = l();
          s =
            pt(e, Array.isArray(l) ? l : [l], Array.isArray(u) ? u : [u]) || s;
        } else e.push(l), (s = !0);
      else {
        const d = String(l);
        u && u.nodeType === 3 && u.data === d
          ? e.push(u)
          : e.push(document.createTextNode(d));
      }
  }
  return s;
}
function kt(e, t, n = null) {
  for (let r = 0, s = t.length; r < s; r++) e.insertBefore(t[r], n);
}
function ke(e, t, n, r) {
  if (n === void 0) return (e.textContent = "");
  const s = r || document.createTextNode("");
  if (t.length) {
    let c = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (s !== l) {
        const u = l.parentNode === e;
        !c && !o
          ? u
            ? e.replaceChild(s, l)
            : e.insertBefore(s, n)
          : u && l.remove();
      } else c = !0;
    }
  } else e.insertBefore(s, n);
  return [s];
}
const go = "http://www.w3.org/2000/svg";
function fo(e, t = !1) {
  return t ? document.createElementNS(go, e) : document.createElement(e);
}
function Wt(e) {
  const { useShadow: t } = e,
    n = document.createTextNode(""),
    r = () => e.mount || document.body,
    s = Zn();
  let c;
  return (
    mt(
      () => {
        c || (c = Kn(s, () => ee(() => e.children)));
        const o = r();
        if (o instanceof HTMLHeadElement) {
          const [l, u] = P(!1),
            i = () => u(!0);
          De((d) => m(o, () => (l() ? d() : c()), null)), Se(i);
        } else {
          const l = fo(e.isSVG ? "g" : "div", e.isSVG),
            u = t && l.attachShadow ? l.attachShadow({ mode: "open" }) : l;
          Object.defineProperty(l, "_$host", {
            get() {
              return n.parentNode;
            },
            configurable: !0,
          }),
            m(u, c),
            o.appendChild(l),
            e.ref && e.ref(l),
            Se(() => o.removeChild(l));
        }
      },
      void 0,
      { render: !0 }
    ),
    n
  );
}
const vo = "_draggable_q87cm_71",
  po = "_dragging_q87cm_79",
  mo = "_selection_q87cm_87",
  xo = "_testWorkFlow_q87cm_245",
  wo = "_loader_q87cm_273",
  bo = "_testButton_q87cm_315",
  yo = "_zoomControl_q87cm_337",
  _o = "_zoomFit_q87cm_355",
  $o = "_zoomIn_q87cm_409",
  Co = "_zoomOut_q87cm_461",
  Io = "_zoomReset_q87cm_513",
  So = "_zoomResetHide_q87cm_565",
  le = {
    "dot-flow__pane": "_dot-flow__pane_q87cm_63",
    draggable: vo,
    dragging: po,
    selection: mo,
    "dot-flow__viewport": "_dot-flow__viewport_q87cm_97",
    "dot-flow__background": "_dot-flow__background_q87cm_127",
    testWorkFlow: xo,
    loader: wo,
    testButton: bo,
    zoomControl: yo,
    zoomFit: _o,
    zoomIn: $o,
    zoomOut: Co,
    zoomReset: Io,
    zoomResetHide: So,
  },
  [jt, Ut] = P(!1),
  [Ft, Yt] = P(!1),
  [Xt, qt] = P(!1),
  [Gt, Zt] = P(1),
  [Kt, Jt] = P([]),
  [Qt, en] = P(null),
  [tn, nn] = P([]),
  [on, rn] = P(0);
let [sn, ln] = P(!1),
  dn;
const [cn, an] = P({ x: 0, y: 0 }),
  [un, hn] = P({ x: 0, y: 0 }),
  [gn, fn] = P([]),
  [vn, pn] = P({ x: 0, y: 0 }),
  [mn, xn] = P(null),
  [wn, bn] = P(null),
  [yn, _n] = P(null),
  [$n, Cn] = P(!1),
  [In, Sn] = P({ x: 0, y: 0 }),
  [En, Nn] = P(!1),
  [kn, Pn] = P(!1),
  [Vn, Tn] = P(!1),
  [Mn, On] = P("");
P(null);
const [An, Dn] = P(""),
  Ln = Jn({
    scale: Gt,
    setScale: Zt,
    draggable: jt,
    setDraggable: Ut,
    isCtrlPressed: Ft,
    setIsCtrlPressed: Yt,
    isSpacePressed: Xt,
    setIsSpacePressed: qt,
    edges: Kt,
    setEdges: Jt,
    newEdge: Qt,
    setNewEdge: en,
    busyIndex: tn,
    setBusyIndex: nn,
    edgeLength: on,
    setEdgeLength: rn,
    isOpen: sn,
    setIsOpen: ln,
    inputRef: dn,
    edgeEnd: cn,
    setEdgeEnd: an,
    transform: un,
    setTransform: hn,
    nodes: gn,
    setNodes: fn,
    preTransform: vn,
    setPreTransform: pn,
    selectedNode: mn,
    setSelectedNode: xn,
    pendingOutput: wn,
    setPendingOutput: bn,
    lastClickPosition: yn,
    setLastClickPosition: _n,
    isShowModal: $n,
    setIsShowModal: Cn,
    positionButton: In,
    setPositionButton: Sn,
    isOpening: En,
    setIsOpening: Nn,
    isModalOpen: kn,
    setIsModalOpen: Pn,
    typeOfVertex: Mn,
    setTypeOfVertex: On,
    formConfig: An,
    setFormConfig: Dn,
    isModalOpen2: Vn,
    setIsModalOpen2: Tn,
  }),
  fe = () => {
    const e = Qn(Ln);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var Eo = N(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const No = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: n,
    setIsCtrlPressed: r,
    setIsSpacePressed: s,
    isCtrlPressed: c,
    isSpacePressed: o,
    scale: l,
    setScale: u,
    nodes: i,
    setTransform: d,
    setPreTransform: a,
    transform: x,
  } = fe();
  Be(() => {
    const _ = document.getElementById("pane"),
      $ = (p) => {
        p.ctrlKey || (n(!1), r(!1)),
          p.code == "Space" && (p.preventDefault(), s(!1), n(!1));
      },
      I = (p) => {
        p.ctrlKey && (n(!0), r(!0)),
          p.code == "Space" && (p.preventDefault(), s(!0), n(!0));
      };
    if (_) {
      const p = (f) => {
        f.preventDefault(),
          c() || o()
            ? (console.log("good"),
              g(f, () => l() + f.deltaY * -1e-4, "cursor"))
            : f.shiftKey
            ? d((S) => ({ x: S.x - f.deltaY * 0.5, y: S.y }))
            : d((S) => ({ x: S.x, y: S.y - f.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", $),
        document.addEventListener("keydown", I),
        _.addEventListener("wheel", p, { passive: !1 }),
        Se(() => {
          document.removeEventListener("keydown", I),
            document.removeEventListener("keyup", $),
            _.removeEventListener("wheel", p);
        });
    }
  });
  function v(_) {
    if (_.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const $ = Math.min(..._.map((S) => S.currPosition.get().x)),
      I = Math.min(..._.map((S) => S.currPosition.get().y)),
      p = Math.max(
        ..._.map((S) => {
          const z = document.getElementById(S.id);
          return z
            ? S.currPosition.get().x + z.clientWidth
            : S.currPosition.get().x;
        })
      ),
      f = Math.max(
        ..._.map((S) => {
          const z = document.getElementById(S.id);
          return z
            ? S.currPosition.get().y + z.clientHeight
            : S.currPosition.get().y;
        })
      );
    return { minX: $, minY: I, width: p - $, height: f - I };
  }
  function h() {
    const _ = document.getElementById("pane");
    if (!_) return;
    const $ = v(i());
    if (!$) return;
    const I = 80,
      p = _.getBoundingClientRect(),
      f = p.width - I * 2,
      S = p.height - I * 2,
      z = f / $.width,
      A = S / $.height,
      H = Math.min(z, A, 1),
      R = $.minX + $.width / 2,
      U = $.minY + $.height / 2,
      j = p.width / 2 - R * H,
      Z = p.height / 2 - U * H;
    u(H), d({ x: j, y: Z }), a({ x: j, y: Z });
  }
  const g = (_, $, I = "cursor") => {
    const p = document.getElementById("pane");
    if (!p) return;
    _.preventDefault();
    const f = p.getBoundingClientRect(),
      S = I === "cursor" ? _.clientX - f.left : f.width / 2,
      z = I === "cursor" ? _.clientY - f.top : f.height / 2,
      A = l(),
      H = Math.min(Math.max(e, $()), t),
      R = (S - x().x) / A,
      U = (z - x().y) / A,
      j = S - R * H,
      Z = z - U * H;
    u(H), d({ x: j, y: Z }), a({ x: j, y: Z });
  };
  return (() => {
    var _ = Eo(),
      $ = _.firstChild,
      I = $.nextSibling,
      p = I.nextSibling,
      f = p.nextSibling;
    return (
      ($.$$click = () => h()),
      (I.$$click = (S) => g(S, () => l() + 0.01, "center")),
      (p.$$click = (S) => g(S, () => Math.max(0, l() - 0.01), "center")),
      (f.$$click = (S) =>
        g(S, () => (u(1), d({ x: 0, y: 0 }), a({ x: 0, y: 0 }), 1), "center")),
      L(
        (S) => {
          var z = le.zoomControl,
            A = le.zoomFit,
            H = le.zoomIn,
            R = le.zoomOut,
            U = l() > 1 || l() < 1 ? le.zoomReset : le.zoomResetHide;
          return (
            z !== S.e && b(_, (S.e = z)),
            A !== S.t && b($, (S.t = A)),
            H !== S.a && b(I, (S.a = H)),
            R !== S.o && b(p, (S.o = R)),
            U !== S.i && b(f, (S.i = U)),
            S
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      _
    );
  })();
};
oe(["click"]);
const ko = "_sidebarMain_dxkxu_1",
  Po = "_addNode_dxkxu_11",
  Vo = "_sidebarContent_dxkxu_71",
  To = "_nodeList_dxkxu_99",
  Mo = "_sidebarContentShow_dxkxu_113",
  Oo = "_sidebarContentHide_dxkxu_123",
  Ao = "_sidebarTitle_dxkxu_135",
  Do = "_searchContainer_dxkxu_153",
  Lo = "_inputFieldContainer_dxkxu_161",
  zo = "_inputField_dxkxu_161",
  Bo = "_searchIcon_dxkxu_211",
  Ro = "_firstWrapper_dxkxu_229",
  Ho = "_restNodeWrapper_dxkxu_251",
  Wo = "_node_dxkxu_99",
  jo = "_nodeIcon_dxkxu_299",
  Uo = "_title_dxkxu_311",
  Fo = "_description_dxkxu_325",
  ie = {
    sidebarMain: ko,
    addNode: Po,
    sidebarContent: Vo,
    nodeList: To,
    sidebarContentShow: Mo,
    sidebarContentHide: Oo,
    sidebarTitle: Ao,
    searchContainer: Do,
    inputFieldContainer: Lo,
    inputField: zo,
    searchIcon: Bo,
    firstWrapper: Ro,
    restNodeWrapper: Ho,
    node: Wo,
    nodeIcon: jo,
    title: Uo,
    description: Fo,
  };
var Yo = N(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  Xo = N("<div><div><div></div><div><div></div><div>");
const qo = (e) => {
  const { isOpen: t, setIsOpen: n } = fe();
  let r;
  const s = (o) => {
    const l = document.getElementById("sidebar-main"),
      u = document.querySelectorAll('[id^="output-"]');
    let i = !1;
    u.forEach((d) => {
      d.contains(o.target) && (i = !0);
    }),
      l && !l.contains(o.target) && !i && n(!1);
  };
  Be(() => {
    document.addEventListener("click", s);
  });
  const c = (o, l) => {
    o.stopPropagation(), e.onClickAdd(l);
  };
  return (() => {
    var o = Yo(),
      l = o.firstChild,
      u = l.nextSibling,
      i = u.firstChild,
      d = i.nextSibling,
      a = d.firstChild,
      x = a.firstChild,
      v = x.nextSibling,
      h = d.nextSibling;
    return (
      (l.$$click = () => {
        n(!0), r && r.focus();
      }),
      xe((g) => (r = g), v),
      m(
        h,
        y(ae, {
          get each() {
            return e.nodeMark;
          },
          children: (g, _) =>
            (() => {
              var $ = Xo(),
                I = $.firstChild,
                p = I.firstChild,
                f = p.nextSibling,
                S = f.firstChild,
                z = S.nextSibling;
              return (
                ($.$$click = (A) => c(A, g.name)),
                m(p, y(g.icon, {})),
                m(S, () => g.title),
                m(z, () => g.description),
                L(
                  (A) => {
                    var H = _() == 0 ? ie.firstWrapper : ie.restNodeWrapper,
                      R = ie.node,
                      U = ie.nodeIcon,
                      j = ie.title,
                      Z = ie.description;
                    return (
                      H !== A.e && b($, (A.e = H)),
                      R !== A.t && b(I, (A.t = R)),
                      U !== A.a && b(p, (A.a = U)),
                      j !== A.o && b(S, (A.o = j)),
                      Z !== A.i && b(z, (A.i = Z)),
                      A
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
                ),
                $
              );
            })(),
        })
      ),
      L(
        (g) => {
          var _ = ie.sidebarMain,
            $ = ie.addNode,
            I = {
              [ie.sidebarContent]: !0,
              [ie.sidebarContentShow]: t(),
              [ie.sidebarContentHide]: !t(),
            },
            p = ie.sidebarTitle,
            f = ie.searchContainer,
            S = ie.inputFieldContainer,
            z = ie.searchIcon,
            A = ie.inputField,
            H = ie.nodeList;
          return (
            _ !== g.e && b(o, (g.e = _)),
            $ !== g.t && b(l, (g.t = $)),
            (g.a = ge(u, I, g.a)),
            p !== g.o && b(i, (g.o = p)),
            f !== g.i && b(d, (g.i = f)),
            S !== g.n && b(a, (g.n = S)),
            z !== g.s && b(x, (g.s = z)),
            A !== g.h && b(v, (g.h = A)),
            H !== g.r && b(h, (g.r = H)),
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
          r: void 0,
        }
      ),
      o
    );
  })();
};
oe(["click"]);
const Go = "_node_kk5n8_1",
  Zo = "_nodeSelected_kk5n8_47",
  Ko = "_inputsWrapper_kk5n8_97",
  Jo = "_input_kk5n8_97",
  Qo = "_inputsUPWrapper_kk5n8_145",
  er = "_inputUp_kk5n8_177",
  tr = "_outputsDownWrapper_kk5n8_205",
  nr = "_outputDown_kk5n8_237",
  or = "_outputDownVertex_kk5n8_251",
  rr = "_downOutputLine_kk5n8_269",
  ir = "_downPlusLine_kk5n8_285",
  sr = "_outputsWrapper_kk5n8_319",
  lr = "_output_kk5n8_205",
  dr = "_outputCircle_kk5n8_365",
  cr = "_outputLine_kk5n8_391",
  ar = "_plusLine_kk5n8_407",
  ur = "_vertexNum_kk5n8_427",
  hr = "_plusLineHidden_kk5n8_493",
  gr = "_outputPlus_kk5n8_503",
  fr = "_functionWrapper_kk5n8_595",
  q = {
    node: Go,
    nodeSelected: Zo,
    inputsWrapper: Ko,
    input: Jo,
    inputsUPWrapper: Qo,
    inputUp: er,
    outputsDownWrapper: tr,
    outputDown: nr,
    outputDownVertex: or,
    downOutputLine: rr,
    downPlusLine: ir,
    outputsWrapper: sr,
    output: lr,
    outputCircle: dr,
    outputLine: cr,
    plusLine: ar,
    vertexNum: ur,
    plusLineHidden: hr,
    outputPlus: gr,
    function: "_function_kk5n8_561",
    functionWrapper: fr,
  };
var vr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const Pt = (e) => vr();
var _e = N("<div>"),
  Vt = N("<div><div>"),
  Tt = N("<div><div></div><div><div></div><div id=plus>");
const pr = (e) => {
  const { newEdge: t, edgeLength: n, setIsOpen: r, setPendingOutput: s } = fe();
  function c(u, i) {
    const { left: d, right: a, top: x, bottom: v } = u.getBoundingClientRect(),
      h = d + Math.abs(d - a) / 2,
      g = x + Math.abs(x - v) / 2;
    e.onMouseEnterInput(h, g, e.id, i);
  }
  function o(u) {
    e.onMouseLeaveInput(e.id, u);
  }
  function l(u, i, d, a, x) {
    i.stopPropagation();
    const { left: v, right: h, top: g, bottom: _ } = u.getBoundingClientRect(),
      $ = v + Math.abs(v - h) / 2,
      I = g + Math.abs(g - _) / 2;
    e.onMouseDownOutput($, I, e.id, d, a, x);
  }
  return (() => {
    var u = _e();
    return (
      m(
        u,
        (() => {
          var i = ee(() => !!e.isInputVertex);
          return () =>
            i()
              ? (() => {
                  var d = _e();
                  return (
                    m(
                      d,
                      y(ae, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (a, x) => {
                          let v = null;
                          return (() => {
                            var h = Vt(),
                              g = h.firstChild;
                            h.addEventListener("mouseleave", () => o(x())),
                              h.addEventListener("mouseenter", () => c(v, x())),
                              ne(h, "id", `input-${a}`);
                            var _ = v;
                            return (
                              typeof _ == "function" ? xe(_, g) : (v = g),
                              ne(g, "id", a),
                              L(() => b(g, q.input)),
                              h
                            );
                          })();
                        },
                      })
                    ),
                    L(() => b(d, q.inputsWrapper)),
                    d
                  );
                })()
              : _e();
        })(),
        null
      ),
      m(
        u,
        (() => {
          var i = ee(() => !!e.isOutputVertex);
          return () =>
            i() &&
            (() => {
              var d = _e();
              return (
                m(
                  d,
                  y(ae, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (a, x) => {
                      let v = null;
                      return (() => {
                        var h = Tt(),
                          g = h.firstChild,
                          _ = g.nextSibling,
                          $ = _.firstChild,
                          I = $.nextSibling;
                        (h.$$mousedown = (f) => l(v, f, x(), a, "solid")),
                          (h.$$click = (f) => {
                            f.stopPropagation(),
                              r(!0),
                              s({ nodeId: e.id, outputVertexIndex: x() });
                          }),
                          ne(h, "id", `output-${a}`);
                        var p = v;
                        return (
                          typeof p == "function" ? xe(p, g) : (v = g),
                          ne(g, "id", a),
                          m(
                            _,
                            (() => {
                              var f = ee(() => e.numberOutputs > 1);
                              return () =>
                                f() &&
                                (() => {
                                  var S = _e();
                                  return m(S, x), L(() => b(S, q.vertexNum)), S;
                                })();
                            })(),
                            $
                          ),
                          m(I, y(Pt, {})),
                          L(
                            (f) => {
                              var S = q.output,
                                z = q.outputCircle,
                                A = {
                                  [q.plusLine]: !0,
                                  [q.plusLineHidden]:
                                    (t()?.outputVertexId == a && n() > 10) ||
                                    e.busyIndex.get().includes(a),
                                },
                                H = q.outputLine,
                                R = q.outputPlus;
                              return (
                                S !== f.e && b(h, (f.e = S)),
                                z !== f.t && b(g, (f.t = z)),
                                (f.a = ge(_, A, f.a)),
                                H !== f.o && b($, (f.o = H)),
                                R !== f.i && b(I, (f.i = R)),
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
                          h
                        );
                      })();
                    },
                  })
                ),
                L(() => b(d, q.outputsWrapper)),
                d
              );
            })();
        })(),
        null
      ),
      m(
        u,
        (() => {
          var i = ee(() => !!e.isDownVertex);
          return () =>
            i() &&
            (() => {
              var d = _e();
              return (
                m(
                  d,
                  y(ae, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (a, x) => {
                      let v = null;
                      return (() => {
                        var h = Tt(),
                          g = h.firstChild,
                          _ = g.nextSibling,
                          $ = _.firstChild,
                          I = $.nextSibling;
                        (h.$$mousedown = (f) => l(v, f, x(), a, "dash")),
                          (h.$$click = (f) => {
                            f.stopPropagation(),
                              r(!0),
                              s({ nodeId: e.id, outputVertexIndex: x() });
                          }),
                          ne(h, "id", `output-${a}`);
                        var p = v;
                        return (
                          typeof p == "function" ? xe(p, g) : (v = g),
                          ne(g, "id", a),
                          m(I, y(Pt, {})),
                          L(
                            (f) => {
                              var S = q.outputDown,
                                z = q.outputDownVertex,
                                A = {
                                  [q.downPlusLine]: !0,
                                  [q.plusLineHidden]:
                                    (t()?.outputVertexId == a && n() > 10) ||
                                    e.busyIndex.get().includes(a),
                                },
                                H = q.downOutputLine,
                                R = q.outputPlus;
                              return (
                                S !== f.e && b(h, (f.e = S)),
                                z !== f.t && b(g, (f.t = z)),
                                (f.a = ge(_, A, f.a)),
                                H !== f.o && b($, (f.o = H)),
                                R !== f.i && b(I, (f.i = R)),
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
                          h
                        );
                      })();
                    },
                  })
                ),
                L(() => b(d, `${q.outputsDownWrapper} `)),
                d
              );
            })();
        })(),
        null
      ),
      m(
        u,
        (() => {
          var i = ee(() => !!e.isUpVertex);
          return () =>
            i()
              ? (() => {
                  var d = _e();
                  return (
                    m(
                      d,
                      y(ae, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (a, x) => {
                          let v = null;
                          return (() => {
                            var h = Vt(),
                              g = h.firstChild;
                            h.addEventListener("mouseleave", () => o(x())),
                              h.addEventListener("mouseenter", () => c(v, x())),
                              ne(h, "id", `input-${a}`);
                            var _ = v;
                            return (
                              typeof _ == "function" ? xe(_, g) : (v = g),
                              ne(g, "id", a),
                              L(() => b(g, q.inputUp)),
                              h
                            );
                          })();
                        },
                      })
                    ),
                    L(() => b(d, q.inputsUPWrapper)),
                    d
                  );
                })()
              : _e();
        })(),
        null
      ),
      u
    );
  })();
};
oe(["click", "mousedown"]);
var mr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const xr = (e) => mr();
var wr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const br = (e) => wr();
var yr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const _r = (e) => yr();
var $r = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const Cr = (e) => $r();
var Ir = N(
  "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
);
const Sr = (e) => {
  const {
    setIsShowModal: t,
    isShowModal: n,
    setPositionButton: r,
    setIsOpening: s,
    setIsModalOpen: c,
    setFormConfig: o,
  } = fe();
  return (() => {
    var l = Ir(),
      u = l.firstChild,
      i = u.firstChild,
      d = i.firstChild,
      a = d.nextSibling,
      x = a.nextSibling,
      v = x.nextSibling,
      h = u.nextSibling;
    return (
      xe((g) => g, l),
      (l.$$pointerdown = (g) => {
        g.stopPropagation(), e.onMouseDownNode(g, e.id);
      }),
      (l.$$dblclick = () => {
        document.getElementById("modal"), c(!0), console.log(e.name), o(e.name);
      }),
      (d.$$click = (g) => g.stopPropagation()),
      m(d, y(xr, {})),
      (a.$$click = (g) => g.stopPropagation()),
      m(a, y(br, {})),
      (x.$$pointerdown = (g) => {
        g.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      m(x, y(_r, {})),
      (v.$$click = (g) => g.stopPropagation()),
      m(v, y(Cr, {})),
      m(
        h,
        y(e.content, {
          get selected() {
            return e.selected;
          },
        })
      ),
      m(
        l,
        y(pr, {
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
      L(
        (g) => {
          var _ = e.id,
            $ = e.selected ? q.nodeSelected : q.node,
            I = `translate(${e.x}px, ${e.y}px)`,
            p = q.functionWrapper,
            f = q.function;
          return (
            _ !== g.e && ne(l, "id", (g.e = _)),
            $ !== g.t && b(l, (g.t = $)),
            I !== g.a &&
              ((g.a = I) != null
                ? l.style.setProperty("transform", I)
                : l.style.removeProperty("transform")),
            p !== g.o && b(u, (g.o = p)),
            f !== g.i && b(i, (g.i = f)),
            g
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      l
    );
  })();
};
oe(["dblclick", "pointerdown", "click"]);
const Er = "_wrapper_cfrao_1",
  Nr = "_edge_cfrao_33",
  kr = "_edgeDash_cfrao_63",
  Pr = "_icon_cfrao_105",
  Vr = "_circle_cfrao_119",
  Tr = "_edgeNew_cfrao_189",
  Ce = {
    wrapper: Er,
    edge: Nr,
    delete: "_delete_cfrao_47",
    edgeDash: kr,
    icon: Pr,
    circle: Vr,
    edgeNew: Tr,
  };
var Mr = N(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path marker-end=url(#arrowhead)></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const Mt = (e) => {
  const [t, n] = P({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    { typeOfVertex: r } = fe();
  mt(() => {
    const u = e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      i = e.position.y0 + (e.position.y1 - e.position.y0) / 2;
    n({ x: u, y: i });
  });
  const s = (u) => {
      u.stopPropagation(), e.onMouseDownEdge();
    },
    c = (u) => {
      u.stopPropagation(), e.onClickDeleteEdge();
    },
    o = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    l = (u, i, d, a) => {
      const v = u + 40,
        h = d - 40,
        g = d - u,
        _ = a - i,
        $ = 120,
        I = 105,
        p = o();
      function f() {
        return _ > 105 && _ < 135 ? 0 : 10;
      }
      function S() {
        return `
      M ${u} ${i}
      L ${v - 10} ${i}
      Q ${v} ${i} ${v} ${i + 10}
  
      L ${v} ${i + $ - 10}
      Q ${v} ${i + $} ${v - 10} ${i + $}
  
      L ${h + 10} ${i + $}
      Q ${h} ${i + $} ${h} ${_ > I ? i + $ + f() : i + $ - f()}
  
      L ${h} ${_ > I ? a - f() : a + f()}
      Q ${h} ${a} ${h + 10} ${a}
  
      L ${d} ${a}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${u} ${i} C ${u} ${i + p}, ${d} ${a - p}, ${d} ${a}`
        : (e.isNew && e.edgeLength() > 40 && g < 40) || (!e.isNew && g < 40)
        ? S()
        : `M ${u} ${i} C ${u + p} ${i}, ${d - p} ${a}, ${d} ${a}`;
    };
  return (() => {
    var u = Mr(),
      i = u.firstChild,
      d = i.nextSibling,
      a = d.nextSibling,
      x = a.firstChild,
      v = x.nextSibling;
    return (
      (d.$$mousedown = s),
      (a.$$mousedown = c),
      L(
        (h) => {
          var g = Ce.wrapper,
            _ = `${e.isNew ? Ce.edgeNew : Ce.edge} ${
              e.typeOfEdge == "dash" ? Ce.edgeDash : ""
            }`,
            $ = l(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            I = Ce.delete,
            p = `translate(${t().x}, ${t().y})`,
            f = Ce.circle,
            S = Ce.icon;
          return (
            g !== h.e && ne(u, "class", (h.e = g)),
            _ !== h.t && ne(d, "class", (h.t = _)),
            $ !== h.a && ne(d, "d", (h.a = $)),
            I !== h.o && ne(a, "class", (h.o = I)),
            p !== h.i && ne(a, "transform", (h.i = p)),
            f !== h.n && ne(x, "class", (h.n = f)),
            S !== h.s && ne(v, "class", (h.s = S)),
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
oe(["mousedown"]);
var Or = N(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0">'
  ),
  Ot = N("<div>");
const Ar = ({ nodes: e, setNodes: t }) => {
  const [n, r] = P({ x: -1, y: -1 }),
    [s, c] = P(!1),
    {
      draggable: o,
      isCtrlPressed: l,
      isSpacePressed: u,
      scale: i,
      edges: d,
      newEdge: a,
      setEdges: x,
      setNewEdge: v,
      transform: h,
      setTransform: g,
      preTransform: _,
      setPreTransform: $,
      selectedNode: I,
      setSelectedNode: p,
      setLastClickPosition: f,
      setEdgeLength: S,
      setTypeOfVertex: z,
    } = fe(),
    [A, H] = P(null),
    [R, U] = P(null),
    [j, Z] = P(null),
    [ue, se] = P([]),
    [J, K] = P(null),
    [ce, ve] = P(null);
  Be(() => {
    const k = (D) => {
      if (D.code === "Delete") {
        if (ue() && I() === null)
          ue().forEach((O) => {
            const w = e().find((E) => E.id === O);
            w && pe(w.id);
          }),
            K(null);
        else if (I() !== null) {
          const O = e().find((w) => w.id === I());
          O && pe(O.id);
        }
      }
    };
    document.addEventListener("keydown", k),
      Se(() => {
        document.removeEventListener("keydown", k);
      });
  });
  function Je(k) {
    const D = window.innerWidth,
      O = window.innerHeight;
    let w = 0,
      E = 0;
    const C = 60,
      M = 10;
    if (
      (k.clientX < C ? (w = M) : k.clientX > D - C && (w = -10),
      k.clientY < C ? (E = M) : k.clientY > O - C && (E = -10),
      w !== 0 || E !== 0)
    ) {
      if (
        (g((V) => ({ x: V.x + w, y: V.y + E })),
        $((V) => ({ x: V.x + w, y: V.y + E })),
        J()
          ? r((V) => ({ x: V.x - w, y: V.y - E }))
          : r((V) => ({ x: V.x + w, y: V.y + E })),
        J())
      )
        K((V) => ({
          x: V.x - w / i(),
          y: V.y - E / i(),
          width: V.width,
          height: V.height,
        })),
          ue().forEach((V) => {
            const T = e().find((W) => W.id === V);
            if (T) {
              const W = T.currPosition.get();
              T.currPosition.set({ x: W.x - w / i(), y: W.y - E / i() }),
                T.inputEdgeIds.get().forEach((F) => {
                  const B = d().find((X) => X.id === F);
                  if (B) {
                    const X = B.currEndPosition.get();
                    B.currEndPosition.set({
                      x: X.x - w / i(),
                      y: X.y - E / i(),
                    });
                  }
                }),
                T.outputEdgeIds.get().forEach((F) => {
                  const B = d().find((X) => X.id === F);
                  if (B) {
                    const X = B.currStartPosition.get();
                    B.currStartPosition.set({
                      x: X.x - w / i(),
                      y: X.y - E / i(),
                    });
                  }
                });
            }
          });
      else if (I() !== null) {
        const V = e().find((T) => T.id === I());
        if (V) {
          const T = V.currPosition.get();
          V.currPosition.set({ x: T.x - w / i(), y: T.y - E / i() }),
            V.inputEdgeIds.get().forEach((W) => {
              const F = d().find((B) => B.id === W);
              if (F) {
                const B = F.currEndPosition.get();
                F.currEndPosition.set({ x: B.x - w / i(), y: B.y - E / i() });
              }
            }),
            V.outputEdgeIds.get().forEach((W) => {
              const F = d().find((B) => B.id === W);
              if (F) {
                const B = F.currStartPosition.get();
                F.currStartPosition.set({ x: B.x - w / i(), y: B.y - E / i() });
              }
            });
        }
      }
    }
  }
  const at = (k) => {
      const D = l() || u(),
        O = k.x - n().x,
        w = k.y - n().y;
      if (j()) {
        const E = n(),
          C = k.clientX - E.x,
          M = k.clientY - E.y;
        Z({ x: E.x, y: E.y, width: C, height: M });
        const V = {
            x: Math.min(E.x, k.clientX),
            y: Math.min(E.y, k.clientY),
            width: Math.abs(C),
            height: Math.abs(M),
          },
          T = e().filter((W) => {
            const F = document.getElementById(W.id);
            if (!F) return !1;
            const B = W.currPosition.get().x * i() + h().x,
              X = W.currPosition.get().y * i() + h().y,
              re = F.offsetWidth,
              te = F.offsetHeight;
            return (
              B + re > V.x &&
              B < V.x + V.width &&
              X + te > V.y &&
              X < V.y + V.height
            );
          });
        se(T.map((W) => W.id));
      }
      if (J() && ce()) {
        const E = k.clientX - ce().x,
          C = k.clientY - ce().y,
          M = J();
        K({
          x: M.x + E / i(),
          y: M.y + C / i(),
          width: M.width,
          height: M.height,
        }),
          ue().forEach((V) => {
            const T = e().find((W) => W.id === V);
            if (T) {
              const W = T.currPosition.get(),
                F = W.x + E / i(),
                B = W.y + C / i();
              T.currPosition.set({ x: F, y: B }),
                T.inputEdgeIds.get().forEach((X) => {
                  const re = d().find((te) => te.id === X);
                  if (re) {
                    const te = re.currEndPosition.get();
                    re.currEndPosition.set((We) => ({
                      x: te.x + E / i(),
                      y: te.y + C / i(),
                    }));
                  }
                }),
                T.outputEdgeIds.get().forEach((X) => {
                  const re = d().find((te) => te.id === X);
                  if (re) {
                    const te = re.currStartPosition.get();
                    re.currStartPosition.set((We) => ({
                      x: te.x + E / i(),
                      y: te.y + C / i(),
                    }));
                  }
                });
            }
          }),
          ve({ x: k.clientX, y: k.clientY }),
          Je(k);
      } else if (n().x >= 0 && I() !== null) {
        const E = e().find((C) => C.id === I());
        if (E) {
          E.currPosition.set((C) => ({
            x: (E.prevPosition.get().x + O) / i(),
            y: (E.prevPosition.get().y + w) / i(),
          }));
          for (let C = 0; C < E.inputEdgeIds.get().length; C++) {
            const M = E.inputEdgeIds.get()[C],
              V = d().find((T) => T.id === M);
            V &&
              V.currEndPosition.set((T) => ({
                x: (V.prevEndPosition.get().x + O) / i(),
                y: (V.prevEndPosition.get().y + w) / i(),
              }));
          }
          for (let C = 0; C < E.outputEdgeIds.get().length; C++) {
            const M = E.outputEdgeIds.get()[C],
              V = d().find((T) => T.id === M);
            V &&
              V.currStartPosition.set((T) => ({
                x: (V.prevStartPosition.get().x + O) / i(),
                y: (V.prevStartPosition.get().y + w) / i(),
              }));
          }
          Je(k);
        }
      } else if (D && s() && I() === null) {
        k.preventDefault();
        const E = k.x - n().x,
          C = k.y - n().y;
        g({ x: E + _().x, y: C + _().y });
      }
      if (a() !== null) {
        S(me());
        const E = document.getElementById("boardWrapper"),
          C = 50;
        if (E) {
          const [M, V] = P(null);
          for (const T of e()) {
            const W = T.isInputVertex || T.isUpVertex;
            if (T.id !== a().nodeStartId && W) {
              console.log(T);
              const F = T.isInputVertex
                  ? T.inputVertexIds[0]
                  : T.upVertexIds[0],
                B = document.getElementById(F),
                {
                  left: X,
                  right: re,
                  top: te,
                  bottom: We,
                } = B.getBoundingClientRect(),
                et = X + Math.abs(X - re) / 2,
                tt = te + Math.abs(te - We) / 2,
                Ne = k.clientX - et,
                It = k.clientY - tt;
              if (Math.sqrt(Ne * Ne + It * It) < C) {
                V({ positionX: et, positionY: tt, id: T.id });
                break;
              }
            }
          }
          M() !== null
            ? (a()?.currEndPosition.set({
                x: (M().positionX - h().x) / i(),
                y: (M().positionY - h().y) / i(),
              }),
              U({
                nodeId: M().id,
                inputIndex: 0,
                positionX: M().positionX,
                positionY: M().positionY,
              }))
            : (U(null),
              a()?.currEndPosition.set({
                x: (k.x - h().x) / i(),
                y: (k.y - h().y) / i(),
              }));
        }
      }
    },
    ut = () => {
      if ((r({ x: -1, y: -1 }), c(!1), $(h()), j())) {
        const k = j();
        let D = {
          x: Math.min(k.x, k.x + k.width),
          y: Math.min(k.y, k.y + k.height),
          width: Math.abs(k.width),
          height: Math.abs(k.height),
        };
        const O = e().filter((w) => {
          const E = document.getElementById(w.id);
          if (!E) return !1;
          const C = w.currPosition.get().x * i() + h().x,
            M = w.currPosition.get().y * i() + h().y,
            V = E.offsetWidth,
            T = E.offsetHeight;
          return (
            C + V > D.x &&
            C < D.x + D.width &&
            M + T > D.y &&
            M < D.y + D.height
          );
        });
        if ((se(O.map((w) => w.id)), Z(null), O.length > 0)) {
          const w = O.map((T) => {
              const F = document.getElementById(T.id)?.getBoundingClientRect();
              if (!F) return { x: 0, y: 0, width: 0, height: 0 };
              const B = (F.left - h().x) / i(),
                X = (F.top - h().y) / i(),
                re = F.width / i(),
                te = F.height / i();
              return { x: B, y: X, width: re, height: te };
            }),
            E = Math.min(...w.map((T) => T.x)),
            C = Math.min(...w.map((T) => T.y)),
            M = Math.max(...w.map((T) => T.x + T.width)),
            V = Math.max(...w.map((T) => T.y + T.height));
          K({ x: E, y: C, width: M - E, height: V - C }),
            O.forEach((T) => {
              T.prevPosition.set({
                x: T.currPosition.get().x * i(),
                y: T.currPosition.get().y * i(),
              });
            });
        }
      }
      if (
        (a() !== null && R() === null && v(null), a() !== null && R() !== null)
      ) {
        const k = a().nodeStartId,
          D = R().nodeId;
        console.log(k, "nodeStartId"), console.log(D, "nodeEndId");
        const O = e().find((C) => C.id === k),
          w = e().find((C) => C.id === D),
          E = document.getElementById("boardWrapper");
        if (O && w && E) {
          const C = `edge_${Math.random().toString(36).substring(2, 8)}_${
            O.id
          }_${a()?.outputIndex}_${w.id}_${R()?.inputIndex}`;
          if (
            O.outputEdgeIds.get().includes(C) &&
            w.inputEdgeIds.get().includes(C)
          ) {
            v(null);
            return;
          }
          O.outputEdgeIds.set([...O.outputEdgeIds.get(), C]),
            w.inputEdgeIds.set([...w.inputEdgeIds.get(), C]),
            a().prevStartPosition.set((V) => ({
              x: (a().currStartPosition.get().x - h().x) / i(),
              y: (a().currStartPosition.get().y - h().y) / i(),
            })),
            a().prevEndPosition.set((V) => ({
              x: (R().positionX - h().x) / i(),
              y: (R().positionY - h().y) / i(),
            })),
            a().currEndPosition.set((V) => ({
              x: (R().positionX - h().x) / i(),
              y: (R().positionY - h().y) / i(),
            })),
            x([
              ...d(),
              {
                ...a(),
                id: C,
                nodeEndId: w.id,
                inputVertexId: w.inputVertexIds[0],
                nodeEndInputIndex: R().inputIndex,
              },
            ]);
          const M = e().find((V) => V.id == a()?.nodeStartId);
          M.busyIndex.set([...M.busyIndex.get(), a().outputVertexId]), v(null);
        }
      }
      ve(null);
    },
    ht = (k) => {
      f({ x: k.clientX, y: k.clientY }),
        p(null),
        H(null),
        l() || u()
          ? (c(!0), r({ x: k.x, y: k.y }))
          : (r({ x: k.clientX, y: k.clientY }),
            Z({ x: k.clientX, y: k.clientY, width: 0, height: 0 }),
            K(null),
            se([]));
    };
  function gt(k, D) {
    p(D), r({ x: k.x, y: k.y });
    const O = e().find((w) => w.id == I());
    if (O) {
      O.prevPosition.set((w) => ({
        x: O.currPosition.get().x * i(),
        y: O.currPosition.get().y * i(),
      }));
      for (let w = 0; w < O.inputEdgeIds.get().length; w++) {
        const E = O.inputEdgeIds.get()[w],
          C = d().find((M) => M.id === E);
        C &&
          C.prevEndPosition.set(() => ({
            x: C.currEndPosition.get().x * i(),
            y: C.currEndPosition.get().y * i(),
          }));
      }
      for (let w = 0; w < O.outputEdgeIds.get().length; w++) {
        const E = O.outputEdgeIds.get()[w],
          C = d().find((M) => M.id === E);
        C &&
          C.prevStartPosition.set(() => ({
            x: C.currStartPosition.get().x * i(),
            y: C.currStartPosition.get().y * i(),
          }));
      }
    }
  }
  function he(k, D, O, w, E, C) {
    if ((p(null), document.getElementById("pane"))) {
      const [V, T] = P({ x: (k - h().x) / i(), y: (D - h().y) / i() }),
        [W, F] = P({ x: (k - h().x) / i(), y: (D - h().y) / i() }),
        [B, X] = P({ x: (k - h().x) / i(), y: (D - h().y) / i() }),
        [re, te] = P({ x: (k - h().x) / i(), y: (D - h().y) / i() });
      v({
        id: "",
        nodeStartId: O,
        outputIndex: w,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: E,
        inputVertexId: "",
        typeOfEdge: C,
        prevStartPosition: { get: V, set: T },
        prevEndPosition: { get: W, set: F },
        currStartPosition: { get: B, set: X },
        currEndPosition: { get: re, set: te },
      });
    }
  }
  function Qe(k, D, O, w) {
    U({ nodeId: O, inputIndex: w, positionX: k, positionY: D });
  }
  function Q(k, D) {
    R()?.nodeId == k && R()?.inputIndex == D && U(null);
  }
  function He(k) {
    p(null), H(k);
    const D = d().find((O) => O.id === k);
    D && console.log(D.currStartPosition.get().x, D.currStartPosition.get().y);
  }
  function Ee(k) {
    const D = d().find((O) => O.id === k);
    if (D) {
      const O = e().find((C) => C.id == D.nodeStartId);
      O &&
        O.outputEdgeIds.set([...O.outputEdgeIds.get().filter((C) => C !== k)]);
      const w = e().find((C) => C.id === D.nodeEndId);
      w && w.inputEdgeIds.set([...w.inputEdgeIds.get().filter((C) => C !== k)]),
        d().filter((C) => C.outputVertexId === D.outputVertexId).length <= 1 &&
          O &&
          O.busyIndex.set([
            ...O.busyIndex.get().filter((C) => C !== D.outputVertexId),
          ]),
        x([...d().filter((C) => C.id !== k)]);
    }
  }
  function pe(k) {
    const D = e().find((M) => M.id == k);
    if (!D) {
      p(null);
      return;
    }
    const O = D.inputEdgeIds.get(),
      w = D.outputEdgeIds.get(),
      C = [...O, ...w].filter((M, V, T) => T.indexOf(M) === V);
    for (let M = 0; M < C.length; M++) {
      const V = d().find((T) => T.id === C[M]);
      if (V) {
        const T = e().find((B) => B.id === V.nodeStartId),
          W = e().find((B) => B.id === V.nodeEndId);
        T?.outputEdgeIds.set([
          ...T.outputEdgeIds.get().filter((B) => B !== C[M]),
        ]),
          W?.inputEdgeIds.set([
            ...W.inputEdgeIds.get().filter((B) => B !== C[M]),
          ]),
          d().filter((B) => B.outputVertexId === V.outputVertexId).length <=
            1 &&
            T &&
            T.busyIndex.set([
              ...T.busyIndex.get().filter((B) => B !== V.outputVertexId),
            ]),
          x([...d().filter((B) => V.id !== B.id)]);
      }
    }
    t([...e().filter((M) => M.id !== k)]), p(null);
  }
  function me() {
    const k = a().currEndPosition.get().x - a().currStartPosition.get().x,
      D = a().currEndPosition.get().y - a().currStartPosition.get().y;
    return Math.sqrt(k * k + D * D);
  }
  return (() => {
    var k = Or(),
      D = k.firstChild,
      O = D.nextSibling;
    return (
      (k.$$mousemove = at),
      (k.$$mouseup = ut),
      (k.$$pointerdown = ht),
      k.addEventListener("wheel", (w) => w.preventDefault()),
      D.style.setProperty("transform-origin", "top left"),
      m(
        k,
        (() => {
          var w = ee(() => !!j());
          return () =>
            w() &&
            (() => {
              var E = Ot();
              return (
                E.style.setProperty("position", "absolute"),
                E.style.setProperty("border", "1px dashed #00aaff"),
                E.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                E.style.setProperty("z-index", "999"),
                E.style.setProperty("pointer-events", "none"),
                L(
                  (C) => {
                    var M = `${Math.min(j().x, j().x + j().width)}px`,
                      V = `${Math.min(j().y, j().y + j().height)}px`,
                      T = `${Math.abs(j().width)}px`,
                      W = `${Math.abs(j().height)}px`;
                    return (
                      M !== C.e &&
                        ((C.e = M) != null
                          ? E.style.setProperty("left", M)
                          : E.style.removeProperty("left")),
                      V !== C.t &&
                        ((C.t = V) != null
                          ? E.style.setProperty("top", V)
                          : E.style.removeProperty("top")),
                      T !== C.a &&
                        ((C.a = T) != null
                          ? E.style.setProperty("width", T)
                          : E.style.removeProperty("width")),
                      W !== C.o &&
                        ((C.o = W) != null
                          ? E.style.setProperty("height", W)
                          : E.style.removeProperty("height")),
                      C
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                E
              );
            })();
        })(),
        O
      ),
      m(
        k,
        (() => {
          var w = ee(() => !!J());
          return () =>
            w() &&
            (() => {
              var E = Ot();
              return (
                (E.$$pointerdown = (C) => {
                  C.stopPropagation(),
                    r({ x: C.clientX, y: C.clientY }),
                    ve({ x: C.clientX, y: C.clientY });
                }),
                E.style.setProperty("position", "absolute"),
                E.style.setProperty("border", "1px solid #00aaff"),
                E.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                E.style.setProperty("z-index", "998"),
                E.style.setProperty("cursor", "move"),
                E.style.setProperty("transform-origin", "top left"),
                L(
                  (C) => {
                    var M = `${J().x * i() + h().x}px`,
                      V = `${J().y * i() + h().y}px`,
                      T = `${J().width * i()}px`,
                      W = `${J().height * i()}px`;
                    return (
                      M !== C.e &&
                        ((C.e = M) != null
                          ? E.style.setProperty("left", M)
                          : E.style.removeProperty("left")),
                      V !== C.t &&
                        ((C.t = V) != null
                          ? E.style.setProperty("top", V)
                          : E.style.removeProperty("top")),
                      T !== C.a &&
                        ((C.a = T) != null
                          ? E.style.setProperty("width", T)
                          : E.style.removeProperty("width")),
                      W !== C.o &&
                        ((C.o = W) != null
                          ? E.style.setProperty("height", W)
                          : E.style.removeProperty("height")),
                      C
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                E
              );
            })();
        })(),
        O
      ),
      O.style.setProperty("transform-origin", "top left"),
      m(
        O,
        y(ae, {
          get each() {
            return e();
          },
          children: (w) =>
            y(Sr, {
              get id() {
                return w.id;
              },
              get name() {
                return w.name;
              },
              get x() {
                return w.currPosition.get().x;
              },
              get y() {
                return w.currPosition.get().y;
              },
              get numberInputs() {
                return w.numberInputs;
              },
              get numberOutputs() {
                return w.numberOutputs;
              },
              get downVertexNumber() {
                return w.downVertexNumber || 0;
              },
              get upVertexNumber() {
                return w.upVertexNumber || 0;
              },
              get isInputVertex() {
                return w.isInputVertex;
              },
              get isOutputVertex() {
                return w.isOutputVertex;
              },
              get isDownVertex() {
                return w.isDownVertex || !1;
              },
              get isUpVertex() {
                return w.isUpVertex || !1;
              },
              get inputVertexIds() {
                return w.inputVertexIds;
              },
              get outputVertexIds() {
                return w.outputVertexIds;
              },
              get downVertexIds() {
                return w.downVertexIds || [];
              },
              get upVertexIds() {
                return w.upVertexIds || [];
              },
              get downVertexOrientation() {
                return w.downVertexOrientation || "";
              },
              get busyIndex() {
                return w.busyIndex;
              },
              get content() {
                return w.content;
              },
              get selected() {
                return I() == w.id || ue().includes(w.id);
              },
              onMouseDownNode: gt,
              onMouseDownOutput: he,
              onMouseEnterInput: Qe,
              onMouseLeaveInput: Q,
              onClickDeleteNode: pe,
            }),
        }),
        null
      ),
      m(
        O,
        (() => {
          var w = ee(() => a() !== null);
          return () =>
            w() &&
            y(Mt, {
              selected: !1,
              isNew: !0,
              edgeLength: () => me(),
              get typeOfEdge() {
                return a().typeOfEdge;
              },
              get position() {
                return {
                  x0: a().currStartPosition.get().x,
                  y0: a().currStartPosition.get().y,
                  x1: a().currEndPosition.get().x,
                  y1: a().currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => {},
              onClickDeleteEdge: () => {},
            });
        })(),
        null
      ),
      m(
        O,
        y(ae, {
          get each() {
            return d();
          },
          children: (w) =>
            y(Mt, {
              get selected() {
                return A() === w.id;
              },
              isNew: !1,
              edgeLength: () => me(),
              get typeOfEdge() {
                return w.typeOfEdge;
              },
              get position() {
                return {
                  x0: w.currStartPosition.get().x,
                  y0: w.currStartPosition.get().y,
                  x1: w.currEndPosition.get().x,
                  y1: w.currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => He(w.id),
              onClickDeleteEdge: () => Ee(w.id),
            }),
        }),
        null
      ),
      L(
        (w) => {
          var E = {
              [le["dot-flow__pane"]]: !0,
              [le.draggable]: o(),
              [le.dragging]: s(),
              [le.selection]: !1,
            },
            C = le["dot-flow__background"],
            M = `scale(${i()})`,
            V = `calc(100vw / ${i()})`,
            T = `calc(100vh / ${i()})`,
            W = `${h().x / i()}px ${h().y / i()}px`,
            F = {
              [le["dot-flow__viewport"]]: !0,
              [le["dot-flow__viewport"]]: !0,
            },
            B = `translate(${h().x}px, ${h().y}px) scale(${i()})`;
          return (
            (w.e = ge(k, E, w.e)),
            C !== w.t && b(D, (w.t = C)),
            M !== w.a &&
              ((w.a = M) != null
                ? D.style.setProperty("transform", M)
                : D.style.removeProperty("transform")),
            V !== w.o &&
              ((w.o = V) != null
                ? D.style.setProperty("width", V)
                : D.style.removeProperty("width")),
            T !== w.i &&
              ((w.i = T) != null
                ? D.style.setProperty("height", T)
                : D.style.removeProperty("height")),
            W !== w.n &&
              ((w.n = W) != null
                ? D.style.setProperty("background-position", W)
                : D.style.removeProperty("background-position")),
            (w.s = ge(O, F, w.s)),
            B !== w.h &&
              ((w.h = B) != null
                ? O.style.setProperty("transform", B)
                : O.style.removeProperty("transform")),
            w
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
      k
    );
  })();
};
oe(["pointerdown", "mouseup", "mousemove"]);
const je = (e) =>
  y(Ln.Provider, {
    value: {
      scale: Gt,
      setScale: Zt,
      draggable: jt,
      setDraggable: Ut,
      isCtrlPressed: Ft,
      isSpacePressed: Xt,
      setIsCtrlPressed: Yt,
      setIsSpacePressed: qt,
      edges: Kt,
      setEdges: Jt,
      newEdge: Qt,
      setNewEdge: en,
      busyIndex: tn,
      setBusyIndex: nn,
      edgeLength: on,
      setEdgeLength: rn,
      isOpen: sn,
      setIsOpen: ln,
      inputRef: dn,
      edgeEnd: cn,
      setEdgeEnd: an,
      transform: un,
      setTransform: hn,
      nodes: gn,
      setNodes: fn,
      preTransform: vn,
      setPreTransform: pn,
      selectedNode: mn,
      setSelectedNode: xn,
      pendingOutput: wn,
      setPendingOutput: bn,
      lastClickPosition: yn,
      setLastClickPosition: _n,
      isShowModal: $n,
      setIsShowModal: Cn,
      setPositionButton: Sn,
      positionButton: In,
      isModalOpen: kn,
      setIsModalOpen: Pn,
      isOpening: En,
      setIsOpening: Nn,
      typeOfVertex: Mn,
      setTypeOfVertex: On,
      formConfig: An,
      setFormConfig: Dn,
      isModalOpen2: Vn,
      setIsModalOpen2: Tn,
    },
    get children() {
      return e.children;
    },
  });
var Dr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const Lr = (e) => Dr();
var zr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const Br = (e) => zr();
var Rr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const Hr = ({ height: e = 2, width: t = 2 }) => Rr();
var Wr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const jr = (e) => Wr();
var Ur = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const zn = (e) => Ur();
var Fr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const Bn = (e) => Fr();
var Yr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Rn = (e) => Yr();
var Xr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const Hn = (e) => Xr();
var qr = N(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Wn = (e) => qr();
var Gr = N(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const jn = (e) => Gr();
var Zr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const Un = (e) => Zr();
var Kr = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const Fn = (e) => Kr(),
  Jr = [
    {
      name: "chat",
      title: "On Chat Message",
      description:
        " Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Br,
    },
    {
      name: "switch",
      title: "Switch",
      description: "Routes items depending on defined expression or rules",
      icon: Lr,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: Hr,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: jr,
    },
    {
      name: "ai-agent",
      title: "AI Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: zn,
    },
    {
      name: "send-email",
      title: "Send Email",
      description: "Send email to a user.",
      icon: Bn,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Rn,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: Hn,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Wn,
    },
    {
      name: "gmail-trigger",
      title: "When Chat Message Received",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: jn,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: Un,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: Fn,
    },
  ];
var Qr = N(
  '<div><div><span></span>Data processing...</div><div><input class="border rounded-md px-4 py-2 outline-none border-white"title=backendUrl name=url type=text></div><div>Test WorkFlow'
);
const ei = (e) => {
  const { nodes: t, edges: n } = fe(),
    [r, s] = P(""),
    [c, o] = P(!1),
    [l, u] = P([]),
    [i, d] = P([]),
    a = async () => {
      o(!0),
        t().forEach((v) => {
          u([
            ...l(),
            {
              id: v.id,
              description: "no description",
              type: v.name,
              parameters: { credentials: "no credentials" },
              position: {
                x: Math.round(v.currPosition.get().x),
                y: Math.round(v.currPosition.get().y),
              },
              inputs: [],
              outputs: [],
            },
          ]);
        }),
        n().forEach((v) => {
          d([
            ...i(),
            {
              id: v.id,
              sourceNodeId: v.nodeStartId,
              sourcePortId: v.outputVertexId,
              targetNodeId: v.nodeEndId,
              targetPortId: v.inputVertexId,
            },
          ]);
        });
      const x = {
        name: "Your workflow",
        description: "no description",
        nodes: l(),
        connections: i(),
      };
      try {
        const v = await fetch(r(), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(x),
        });
        if (!v.ok) throw new Error("Failed to send data");
        const h = await v.json();
        setTimeout(() => {
          console.log(h);
        }, 400);
      } catch (v) {
        console.log(v);
      } finally {
        setTimeout(() => {
          o(!1), u([]), d([]);
        }, 400);
      }
    };
  return (() => {
    var x = Qr(),
      v = x.firstChild,
      h = v.firstChild,
      g = v.nextSibling,
      _ = g.firstChild,
      $ = g.nextSibling;
    return (
      _.addEventListener("change", (I) => {
        s(I.target.value);
      }),
      ($.$$click = a),
      L(
        (I) => {
          var p = le.testWorkFlow,
            f = `fixed ${
              c() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            S = le.loader,
            z = le.testButton;
          return (
            p !== I.e && b(x, (I.e = p)),
            f !== I.t && b(v, (I.t = f)),
            S !== I.a && b(h, (I.a = S)),
            z !== I.o && b($, (I.o = z)),
            I
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      x
    );
  })();
};
oe(["click"]);
var ti = N('<div><div class="border border-white/20 rounded-[9px] flex"><div>');
const At = (e) => {
  let t;
  const n = e.zIndex ?? 9999,
    r = e.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";
  return (
    Be(() => {
      const s = (c) => {
        c.target === t && e.onClose();
      };
      return (
        window.addEventListener("click", s),
        () => window.removeEventListener("click", s)
      );
    }),
    (() => {
      var s = ti(),
        c = s.firstChild,
        o = c.firstChild,
        l = t;
      return (
        typeof l == "function" ? xe(l, s) : (t = s),
        n != null
          ? s.style.setProperty("z-index", n)
          : s.style.removeProperty("z-index"),
        b(o, `${r} border border-purple-500/20 rounded-[9px] flex flex-col`),
        m(o, () => e.children),
        L(() =>
          b(
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
var ni = N('<span class=text-yellow-300>"<!>"'),
  oi = N("<span class=text-cyan-300>"),
  ri = N("<span class=text-pink-300>"),
  ii = N("<span class=text-gray-400>null"),
  si = N('<div class="text-purple-400 cursor-pointer select-none">'),
  li = N("<div class=text-purple-400>}"),
  di = N(
    '<div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">'
  ),
  ci = N("<span>[<!>]"),
  ai = N("<span>["),
  ui = N("<div>]"),
  hi = N("<div>"),
  gi = N(
    '<div><span class=text-green-400>"<!>"</span><span class=text-white>: '
  );
const dt = ({ data: e, indent: t = 0 }) => {
  const [n, r] = P(!1),
    s = `${t * 5}px`,
    c = () => r(!n()),
    o = (i) => typeof i == "object" && i !== null && !Array.isArray(i),
    l = Array.isArray,
    u = (i) =>
      typeof i == "string"
        ? (() => {
            var d = ni(),
              a = d.firstChild,
              x = a.nextSibling;
            return x.nextSibling, m(d, i, x), d;
          })()
        : typeof i == "number"
        ? (() => {
            var d = oi();
            return m(d, i), d;
          })()
        : typeof i == "boolean"
        ? (() => {
            var d = ri();
            return m(d, () => i.toString()), d;
          })()
        : i === null
        ? ii()
        : y(dt, { data: i, indent: t + 1 });
  return (() => {
    var i = di();
    return (
      m(
        i,
        y(be, {
          get when() {
            return o(e);
          },
          get fallback() {
            return y(be, {
              get when() {
                return l(e);
              },
              get fallback() {
                return u(e);
              },
              get children() {
                return ee(() => !!e.every((d) => typeof d != "object"))()
                  ? (() => {
                      var d = ci(),
                        a = d.firstChild,
                        x = a.nextSibling;
                      return (
                        x.nextSibling,
                        m(
                          d,
                          y(ae, {
                            each: e,
                            children: (v, h) => [
                              ee(() => u(v)),
                              ee(() => (h() < e.length - 1 ? ", " : "")),
                            ],
                          }),
                          x
                        ),
                        d
                      );
                    })()
                  : [
                      (() => {
                        var d = ai();
                        return (
                          s != null
                            ? d.style.setProperty("padding-left", s)
                            : d.style.removeProperty("padding-left"),
                          d
                        );
                      })(),
                      y(ae, {
                        each: e,
                        children: (d, a) =>
                          (() => {
                            var x = hi();
                            return (
                              `${(t + 1) * 4}px` != null
                                ? x.style.setProperty(
                                    "padding-left",
                                    `${(t + 1) * 4}px`
                                  )
                                : x.style.removeProperty("padding-left"),
                              m(x, y(dt, { data: d, indent: t + 1 }), null),
                              m(x, () => (a() < e.length - 1 ? "," : ""), null),
                              x
                            );
                          })(),
                      }),
                      (() => {
                        var d = ui();
                        return (
                          s != null
                            ? d.style.setProperty("padding-left", s)
                            : d.style.removeProperty("padding-left"),
                          d
                        );
                      })(),
                    ];
              },
            });
          },
          get children() {
            return [
              (() => {
                var d = si();
                return (
                  (d.$$click = c),
                  s != null
                    ? d.style.setProperty("padding-left", s)
                    : d.style.removeProperty("padding-left"),
                  m(d, () => (n() ? "{...}" : "{")),
                  d
                );
              })(),
              y(be, {
                get when() {
                  return !n();
                },
                get children() {
                  return [
                    y(ae, {
                      get each() {
                        return Object.entries(e);
                      },
                      children: ([d, a], x) =>
                        (() => {
                          var v = gi(),
                            h = v.firstChild,
                            g = h.firstChild,
                            _ = g.nextSibling;
                          return (
                            _.nextSibling,
                            h.nextSibling,
                            `${(t + 1) * 4}px` != null
                              ? v.style.setProperty(
                                  "padding-left",
                                  `${(t + 1) * 4}px`
                                )
                              : v.style.removeProperty("padding-left"),
                            m(h, d, _),
                            m(v, () => u(a), null),
                            m(
                              v,
                              () =>
                                x() < Object.entries(e).length - 1 ? "," : "",
                              null
                            ),
                            v
                          );
                        })(),
                    }),
                    (() => {
                      var d = li();
                      return (
                        s != null
                          ? d.style.setProperty("padding-left", s)
                          : d.style.removeProperty("padding-left"),
                        d
                      );
                    })(),
                  ];
                },
              }),
            ];
          },
        })
      ),
      i
    );
  })();
};
oe(["click"]);
const fi = "_leftPanel_kuca9_1",
  vi = { leftPanel: fi };
var pi = N(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full "><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input'
);
const mi = (e) =>
    (() => {
      var t = pi(),
        n = t.firstChild;
      return (
        n.firstChild,
        m(
          n,
          y(dt, {
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
        L((r) => ge(t, { [vi.leftPanel]: !0 }, r)),
        t
      );
    })(),
  xi = "_midPanel_azasr_1",
  Ke = { midPanel: xi };
var wi = N(
    '<div class=overflow-visible><button type=button class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"><svg fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7">'
  ),
  bi = N("<ul id=portal-dropdown>"),
  yi = N(
    '<li><button><div class="text-sm font-medium"></div><p class="text-xs font-nor text-[#979393]">'
  );
const Le = ({ options: e }) => {
  const [t, n] = P(!1),
    [r, s] = P(e[0]),
    [c, o] = P({ top: 0, left: 0, width: 0 }),
    [l, u] = P(!1);
  let i;
  const d = () => {
      if (!i) return;
      const v = i.getBoundingClientRect(),
        h = 200,
        g = window.innerHeight - v.bottom,
        _ = v.top,
        $ = g < h && _ > h;
      u($),
        o({
          top: $ ? v.top + window.scrollY - h : v.bottom + window.scrollY,
          left: v.left + window.scrollX,
          width: v.width,
        }),
        n(!t());
    },
    a = (v) => {
      s(v), n(!1);
    },
    x = (v) => {
      const h = document.getElementById("portal-dropdown");
      h && !h.contains(v.target) && !i?.contains(v.target) && n(!1);
    };
  return (
    Be(() => {
      document.addEventListener("click", x);
    }),
    Se(() => {
      document.removeEventListener("click", x);
    }),
    (() => {
      var v = wi(),
        h = v.firstChild,
        g = h.firstChild;
      return (
        (h.$$click = d),
        xe((_) => (i = _), h),
        m(h, () => r().label, g),
        m(
          v,
          (() => {
            var _ = ee(() => !!t());
            return () =>
              _() &&
              y(Wt, {
                get children() {
                  var $ = bi();
                  return (
                    $.style.setProperty("max-height", "200px"),
                    m($, () =>
                      e.map((I) =>
                        (() => {
                          var p = yi(),
                            f = p.firstChild,
                            S = f.firstChild,
                            z = S.nextSibling;
                          return (
                            (f.$$click = () => a(I)),
                            m(S, () => I.label),
                            m(z, () => I?.description),
                            L(() =>
                              b(
                                f,
                                `w-full text-left px-4 py-2 hover:bg-[#dad7d742] hover:text-white transition ${
                                  r().value === I.value
                                    ? "bg-[#282a39] text-[#ff6f5c]"
                                    : "text-gray-200"
                                }`
                              )
                            ),
                            p
                          );
                        })()
                      )
                    ),
                    L(
                      (I) => {
                        var p = `absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700 overflow-hidden transition-transform duration-150 ${
                            l() ? "origin-bottom" : "origin-top"
                          }`,
                          f = `${c().top}px`,
                          S = `${c().left}px`,
                          z = `${c().width}px`;
                        return (
                          p !== I.e && b($, (I.e = p)),
                          f !== I.t &&
                            ((I.t = f) != null
                              ? $.style.setProperty("top", f)
                              : $.style.removeProperty("top")),
                          S !== I.a &&
                            ((I.a = S) != null
                              ? $.style.setProperty("left", S)
                              : $.style.removeProperty("left")),
                          z !== I.o &&
                            ((I.o = z) != null
                              ? $.style.setProperty("width", z)
                              : $.style.removeProperty("width")),
                          I
                        );
                      },
                      { e: void 0, t: void 0, a: void 0, o: void 0 }
                    ),
                    $
                  );
                },
              });
          })(),
          null
        ),
        L(() =>
          ne(
            g,
            "class",
            `w-4 h-4 transition-transform ${t() ? "rotate-180" : ""}`
          )
        ),
        v
      );
    })()
  );
};
oe(["click"]);
var _i = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg baseProfile=tiny version=1.2 viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M17.707 8.293a.999.999 0 1 0-1.414 1.414L17.586 11H13V6.414l1.293 1.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L12 2.586 8.293 6.293a.999.999 0 1 0 1.414 1.414L11 6.414V11H6.414l1.293-1.293a.999.999 0 1 0-1.414-1.414L2.586 12l3.707 3.707a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L6.414 13H11v4.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414L12 21.414l3.707-3.707a.999.999 0 1 0-1.414-1.414L13 17.586V13h4.586l-1.293 1.293a.999.999 0 1 0 1.414 1.414L21.414 12l-3.707-3.707z">'
);
const bt = (e) => _i();
var $i = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const yt = (e) => $i();
var Ci = N(
  '<div><div class=" w-full"><b></b> </div><div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#666769]">'
);
const _t = ({ showTooltip: e, toolTipContent: t }) =>
  (() => {
    var n = Ci(),
      r = n.firstChild,
      s = r.firstChild;
    return (
      s.nextSibling,
      m(s, () => t.label),
      m(r, () => t.text, null),
      L(() =>
        b(
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
var Ii = N(
  '<div class="relative w-full"><input type=text title=input placeholder=placeHolder autocomplete=off class="w-full px-4 py-2 rounded-md border border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition">'
);
const Ie = () => {
  const [e, t] = P(!1);
  return (() => {
    var n = Ii(),
      r = n.firstChild;
    return (
      (r.$$focusout = () => t(!1)),
      (r.$$focusin = () => t(!0)),
      m(
        n,
        y(_t, {
          showTooltip: e,
          toolTipContent: {
            label: "Tip:",
            text: "Execute previous nodes to use input data.",
          },
        }),
        null
      ),
      n
    );
  })();
};
oe(["focusin", "focusout"]);
var Si = N(
  '<svg xmlns=http://www.w3.org/2000/svg width=18 height=18 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=10></circle><line x1=15 y1=9 x2=9 y2=15></line><line x1=9 y1=9 x2=15 y2=15>'
);
const $t = (e) => Si();
var Ei = N("<button>");
const Ct = ({ title: e, width: t = "w-auto" }) =>
  (() => {
    var n = Ei();
    return (
      b(
        n,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      m(n, e),
      n
    );
  })();
var Ni = N(
    '<div class="text-white bg-[#1e1e2f] p-2 rounded justify-between"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><div class="text-sm flex items-center gap-1 group"><div></div></div><div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">Reset value</div></div><button title=toggle type=button><span>'
  ),
  ki = N(
    '<div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?'
  );
const ze = ({ switchText: e, toolTipContent: t, onChange: n }) => {
  const [r, s] = P(!1),
    [c, o] = P(!1),
    l = () => {
      const u = !r();
      s(u), n?.(u);
    };
  return (() => {
    var u = Ni(),
      i = u.firstChild,
      d = i.firstChild,
      a = d.firstChild,
      x = a.firstChild,
      v = d.nextSibling,
      h = v.firstChild;
    return (
      m(x, e),
      m(
        a,
        t &&
          (() => {
            var g = ki();
            return (
              g.firstChild,
              g.addEventListener("mouseleave", () => o(!1)),
              g.addEventListener("mouseenter", () => o(!0)),
              m(g, y(_t, { showTooltip: c, toolTipContent: t }), null),
              g
            );
          })(),
        null
      ),
      (v.$$click = () => l()),
      L(
        (g) => {
          var _ = `w-12 h-6 flex items-center rounded-full transition-colors duration-100 cursor-pointer ${
              r() ? "bg-green-400" : "bg-gray-400"
            }`,
            $ = `w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-100 ${
              r() ? "translate-x-6" : "translate-x-1"
            }`;
          return _ !== g.e && b(v, (g.e = _)), $ !== g.t && b(h, (g.t = $)), g;
        },
        { e: void 0, t: void 0 }
      ),
      u
    );
  })();
};
oe(["click"]);
var Pi = N(
    '<div><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label></div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Routing Rules</h3><div class="routing-rules-wrapper space-y-2 w-full"></div></div><div></div><div><div class="text-[#c2c4c7] text-sm">Options</div><hr class=border-[#414142]><div>'
  ),
  Vi = N(
    '<div id draggable=true><div class="flex flex-row gap-1.5 "><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class=w-full><div class="flex gap-2 mb-2 items-center"><div class=flex-1></div><button title=cross class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"></button></div><div></div></div></div><div class=mt-3></div><div>'
  ),
  Ti = N("<div class=mt-2>");
const Mi = (e) => {
  const [t, n] = P([1]),
    [r, s] = P(null),
    [c, o] = P([]);
  P([
    { label: "fallback output", value: "fallback output", description: "" },
    { label: "ignore case", value: "ignore case", description: "" },
    {
      label: "send data to all matching outputs",
      value: "send data to all matching outputs",
      description: "",
    },
  ]),
    P([]);
  const l = (d) => {
      s(d);
    },
    u = (d) => {
      const a = r(),
        x = d;
      if (a === null || a === x) return;
      const v = [...t()],
        [h] = v.splice(a, 1);
      v.splice(x, 0, h), n(v), s(x);
    },
    i = () => {
      s(null);
    };
  return (() => {
    var d = Pi(),
      a = d.firstChild,
      x = a.firstChild;
    x.firstChild;
    var v = x.nextSibling,
      h = v.firstChild,
      g = h.nextSibling,
      _ = v.nextSibling,
      $ = _.nextSibling;
    return (
      m(
        x,
        y(Le, {
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
      m(
        g,
        y(ae, {
          get each() {
            return t();
          },
          children: (I, p) => (
            o([...c(), { key: `key${p}`, renameOutput: !1 }]),
            (() => {
              var f = Vi(),
                S = f.firstChild,
                z = S.firstChild,
                A = z.firstChild,
                H = A.nextSibling,
                R = z.nextSibling,
                U = R.firstChild,
                j = U.firstChild,
                Z = j.nextSibling,
                ue = U.nextSibling,
                se = S.nextSibling,
                J = se.nextSibling;
              return (
                f.addEventListener("dragend", i),
                f.addEventListener("dragenter", () => u(p())),
                f.addEventListener("dragstart", () => l(p())),
                m(A, y(bt, {})),
                m(H, y(yt, {})),
                m(U, y(Ie, {}), j),
                m(
                  j,
                  y(Le, {
                    options: [
                      { label: "String", value: "String" },
                      { label: "Number", value: "Number" },
                      { label: "Array", value: "Array" },
                      { label: "Boolean", value: "Boolean" },
                      { label: "Object", value: "Object" },
                    ],
                  })
                ),
                m(Z, y($t, {})),
                m(ue, y(Ie, {})),
                m(
                  se,
                  y(ze, {
                    switchText: "Rename output",
                    toolTipContent: null,
                    onChange: (K) => {
                      console.log(c());
                      const ce = [...c()];
                      (ce[p()] = { ...ce[p()], renameOutput: K }), o(ce);
                    },
                  })
                ),
                m(
                  J,
                  y(ae, {
                    get each() {
                      return c();
                    },
                    children: (K, ce) => {
                      if (K.renameOutput)
                        return (() => {
                          var ve = Ti();
                          return m(ve, y(Ie, {})), ve;
                        })();
                    },
                  })
                ),
                L(
                  (K) => {
                    var ce = { [Ke.ruleItem]: !0, dragging: r() === p() },
                      ve = `transition-all duration-200 w-full ${
                        p() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`;
                    return (
                      (K.e = ge(f, ce, K.e)), ve !== K.t && b(f, (K.t = ve)), K
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                f
              );
            })()
          ),
        })
      ),
      (_.$$click = () => {
        n([...t(), t().length + 1]);
      }),
      m(_, y(Ct, { title: "Add Routing Rule", width: "w-full" })),
      m(
        a,
        y(ze, {
          switchText: "Convert types where required",
          toolTipContent: {
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          },
        }),
        $
      ),
      d
    );
  })();
};
oe(["click"]);
var Oi = N(
    '<div><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label></div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Field to set</h3><div class="routing-rules-wrapper space-y-2 w-full"></div></div><div></div><div><div class="text-[#c2c4c7] text-sm">Options</div><hr class=border-[#414142]><div>'
  ),
  Ai = N(
    '<div id draggable=true><div class="flex flex-row gap-1.5 "><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class=w-full><div class="flex gap-2 mb-2 items-center"><div class=flex-1></div><button title=cross class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"></button></div><div>'
  );
const Di = (e) => {
  const [t, n] = P([1]),
    [r, s] = P(null),
    [c, o] = P([]);
  P([
    { label: "fallback output", value: "fallback output", description: "" },
    { label: "ignore case", value: "ignore case", description: "" },
    {
      label: "send data to all matching outputs",
      value: "send data to all matching outputs",
      description: "",
    },
  ]),
    P([]);
  const l = (d) => {
      s(d);
    },
    u = (d) => {
      const a = r(),
        x = d;
      if (a === null || a === x) return;
      const v = [...t()],
        [h] = v.splice(a, 1);
      v.splice(x, 0, h), n(v), s(x);
    },
    i = () => {
      s(null);
    };
  return (() => {
    var d = Oi(),
      a = d.firstChild,
      x = a.firstChild;
    x.firstChild;
    var v = x.nextSibling,
      h = v.firstChild,
      g = h.nextSibling,
      _ = v.nextSibling,
      $ = _.nextSibling;
    return (
      m(
        x,
        y(Le, {
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
        }),
        null
      ),
      m(
        g,
        y(ae, {
          get each() {
            return t();
          },
          children: (I, p) => (
            o([...c(), { key: `key${p}`, renameOutput: !1 }]),
            (() => {
              var f = Ai(),
                S = f.firstChild,
                z = S.firstChild,
                A = z.firstChild,
                H = A.nextSibling,
                R = z.nextSibling,
                U = R.firstChild,
                j = U.firstChild,
                Z = j.nextSibling,
                ue = U.nextSibling;
              return (
                f.addEventListener("dragend", i),
                f.addEventListener("dragenter", () => u(p())),
                f.addEventListener("dragstart", () => l(p())),
                m(A, y(bt, {})),
                m(H, y(yt, {})),
                m(U, y(Ie, {}), j),
                m(
                  j,
                  y(Le, {
                    options: [
                      { label: "String", value: "String" },
                      { label: "Number", value: "Number" },
                      { label: "Array", value: "Array" },
                      { label: "Boolean", value: "Boolean" },
                      { label: "Object", value: "Object" },
                    ],
                  })
                ),
                m(Z, y($t, {})),
                m(ue, y(Ie, {})),
                L(
                  (se) => {
                    var J = { [Ke.ruleItem]: !0, dragging: r() === p() },
                      K = `transition-all duration-200 w-full ${
                        p() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`;
                    return (
                      (se.e = ge(f, J, se.e)),
                      K !== se.t && b(f, (se.t = K)),
                      se
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                f
              );
            })()
          ),
        })
      ),
      (_.$$click = () => {
        n([...t(), t().length + 1]);
      }),
      m(_, y(Ct, { title: "Add Routing Rule", width: "w-full" })),
      m(
        a,
        y(ze, {
          switchText: "Include other input fields.",
          toolTipContent: {
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          },
        }),
        $
      ),
      d
    );
  })();
};
oe(["click"]);
var Li = N(
    '<div class=overflow-visible><button type=button class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"><svg fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7">'
  ),
  zi = N(
    '<ul id=portal-dropdown><li><button class="w-full text-left px-4 py-2 hover:bg-[#dad7d742] text-white transition cursor-pointer font-medium ">+ create new credentials'
  ),
  Bi = N(
    '<li><button><div class="text-sm font-medium"></div><p class="text-xs font-nor text-[#979393]">'
  );
const Ri = ({ onOption: e }) => {
  const { setIsModalOpen2: t } = fe(),
    [n, r] = P(!1),
    [s, c] = P([]),
    [o, l] = P(void 0),
    [u, i] = P({ top: 0, left: 0, width: 0 }),
    [d, a] = P(!1);
  let x;
  const v = () => {
      if (!x) return;
      const _ = x.getBoundingClientRect(),
        $ = 200,
        I = window.innerHeight - _.bottom,
        p = _.top,
        f = I < $ && p > $;
      a(f),
        i({
          top: f ? _.top + window.scrollY - $ : _.bottom + window.scrollY,
          left: _.left + window.scrollX,
          width: _.width,
        }),
        r(!n());
    },
    h = (_) => {
      c([...s(), _]), r(!1);
    },
    g = (_) => {
      const $ = document.getElementById("portal-dropdown");
      $ && !$.contains(_.target) && !x?.contains(_.target) && r(!1);
    };
  return (
    Be(() => {
      document.addEventListener("click", g);
    }),
    Se(() => {
      document.removeEventListener("click", g);
    }),
    (() => {
      var _ = Li(),
        $ = _.firstChild,
        I = $.firstChild;
      return (
        ($.$$click = v),
        xe((p) => (x = p), $),
        m(
          $,
          (() => {
            var p = ee(() => !!o());
            return () => (p() ? o().label : "Select an option");
          })(),
          I
        ),
        m(
          _,
          (() => {
            var p = ee(() => !!n());
            return () =>
              p() &&
              y(Wt, {
                get children() {
                  var f = zi(),
                    S = f.firstChild,
                    z = S.firstChild;
                  return (
                    f.style.setProperty("max-height", "200px"),
                    m(
                      f,
                      () =>
                        s().map((A) =>
                          (() => {
                            var H = Bi(),
                              R = H.firstChild,
                              U = R.firstChild,
                              j = U.nextSibling;
                            return (
                              (R.$$click = () => h(A)),
                              m(U, () => A.label),
                              m(j, () => A?.description),
                              L(() =>
                                b(
                                  R,
                                  `w-full text-left px-4 py-2 hover:bg-[#dad7d742] hover:text-white transition ${
                                    o()?.value === A.value
                                      ? "bg-[#282a39] text-[#ff6f5c]"
                                      : "text-gray-200"
                                  }`
                                )
                              ),
                              H
                            );
                          })()
                        ),
                      S
                    ),
                    (z.$$click = () => t(!0)),
                    L(
                      (A) => {
                        var H = `absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700 overflow-hidden transition-transform duration-150 ${
                            d() ? "origin-bottom" : "origin-top"
                          }`,
                          R = `${u().top}px`,
                          U = `${u().left}px`,
                          j = `${u().width}px`;
                        return (
                          H !== A.e && b(f, (A.e = H)),
                          R !== A.t &&
                            ((A.t = R) != null
                              ? f.style.setProperty("top", R)
                              : f.style.removeProperty("top")),
                          U !== A.a &&
                            ((A.a = U) != null
                              ? f.style.setProperty("left", U)
                              : f.style.removeProperty("left")),
                          j !== A.o &&
                            ((A.o = j) != null
                              ? f.style.setProperty("width", j)
                              : f.style.removeProperty("width")),
                          A
                        );
                      },
                      { e: void 0, t: void 0, a: void 0, o: void 0 }
                    ),
                    f
                  );
                },
              });
          })(),
          null
        ),
        L(() =>
          ne(
            I,
            "class",
            `w-4 h-4 transition-transform ${n() ? "rotate-180" : ""}`
          )
        ),
        _
      );
    })()
  );
};
oe(["click"]);
var Hi = N(
    '<div><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label></div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Field to set</h3><div class="routing-rules-wrapper space-y-2 w-full"></div></div><div></div><div><div class="text-[#c2c4c7] text-sm">Options</div><hr class=border-[#414142]><div>'
  ),
  Wi = N(
    '<div id draggable=true><div class="flex flex-row gap-1.5 "><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class=w-full><div class="flex gap-2 mb-2 items-center"><div class=flex-1></div><button title=cross class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"></button></div><div>'
  );
const ji = (e) => {
  const { setIsModalOpen2: t } = fe(),
    [n, r] = P([1]),
    [s, c] = P(null),
    [o, l] = P([]);
  P([]), P([]);
  const u = (a) => {
      c(a);
    },
    i = (a) => {
      const x = s(),
        v = a;
      if (x === null || x === v) return;
      const h = [...n()],
        [g] = h.splice(x, 1);
      h.splice(v, 0, g), r(h), c(v);
    },
    d = () => {
      c(null);
    };
  return (() => {
    var a = Hi(),
      x = a.firstChild,
      v = x.firstChild;
    v.firstChild;
    var h = v.nextSibling,
      g = h.firstChild,
      _ = g.nextSibling,
      $ = h.nextSibling,
      I = $.nextSibling;
    return (
      m(v, y(Ri, {}), null),
      m(
        _,
        y(ae, {
          get each() {
            return n();
          },
          children: (p, f) => (
            l([...o(), { key: `key${f}`, renameOutput: !1 }]),
            (() => {
              var S = Wi(),
                z = S.firstChild,
                A = z.firstChild,
                H = A.firstChild,
                R = H.nextSibling,
                U = A.nextSibling,
                j = U.firstChild,
                Z = j.firstChild,
                ue = Z.nextSibling,
                se = j.nextSibling;
              return (
                S.addEventListener("dragend", d),
                S.addEventListener("dragenter", () => i(f())),
                S.addEventListener("dragstart", () => u(f())),
                m(H, y(bt, {})),
                m(R, y(yt, {})),
                m(j, y(Ie, {}), Z),
                m(
                  Z,
                  y(Le, {
                    options: [
                      { label: "String", value: "String" },
                      { label: "Number", value: "Number" },
                      { label: "Array", value: "Array" },
                      { label: "Boolean", value: "Boolean" },
                      { label: "Object", value: "Object" },
                    ],
                  })
                ),
                m(ue, y($t, {})),
                m(se, y(Ie, {})),
                L(
                  (J) => {
                    var K = { [Ke.ruleItem]: !0, dragging: s() === f() },
                      ce = `transition-all duration-200 w-full ${
                        f() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`;
                    return (
                      (J.e = ge(S, K, J.e)), ce !== J.t && b(S, (J.t = ce)), J
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                S
              );
            })()
          ),
        })
      ),
      ($.$$click = () => {
        r([...n(), n().length + 1]);
      }),
      m($, y(Ct, { title: "Add Routing Rule", width: "w-full" })),
      m(
        x,
        y(ze, {
          switchText: "Include other input fields.",
          toolTipContent: {
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          },
        }),
        I
      ),
      a
    );
  })();
};
oe(["click"]);
var Ui = N('<div id=parameter class="mt-0 px-5 py-4 ">');
const Fi = () => {
  const { formConfig: e } = fe();
  return (() => {
    var t = Ui();
    return (
      m(
        t,
        y(be, {
          get when() {
            return e() === "switch";
          },
          get children() {
            return y(Mi, {});
          },
        }),
        null
      ),
      m(
        t,
        y(be, {
          get when() {
            return e() === "edit";
          },
          get children() {
            return y(Di, {});
          },
        }),
        null
      ),
      m(
        t,
        y(be, {
          get when() {
            return e() === "gmail-trigger";
          },
          get children() {
            return y(ji, {});
          },
        }),
        null
      ),
      L((n) => ge(t, { [Ke.param]: !0 }, n)),
      t
    );
  })();
};
var Yi = N(
  '<div class="flex flex-col text-sm text-gray-300 font-sans"><div class="text-sm flex items-center gap-1 group mb-1"><div>Notes</div><div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?</div></div><textarea title=notes id=notes class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono">'
);
const Xi = ({ toolTipContent: e }) => {
  const [t, n] = P(""),
    [r, s] = P(!1);
  return (() => {
    var c = Yi(),
      o = c.firstChild,
      l = o.firstChild,
      u = l.nextSibling;
    u.firstChild;
    var i = o.nextSibling;
    return (
      u.addEventListener("mouseleave", () => s(!1)),
      u.addEventListener("mouseenter", () => s(!0)),
      m(u, y(_t, { showTooltip: r, toolTipContent: e }), null),
      (i.$$input = (d) => n(d.target.value)),
      L(() => (i.value = t())),
      c
    );
  })();
};
oe(["input"]);
const qi = {
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
        tooltipText: "If active, the node tries to execute again when it fails",
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
        tooltipText: "If active, the node tries to execute again when it fails",
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
        tooltipText: "If active, the node tries to execute again when it fails",
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
        tooltipText: "If active, the node tries to execute again when it fails",
      },
      {
        type: "dropdown",
        label: "on Error",
        tooltipText: "Action to take when the node execution fails",
      },
    ],
  },
};
var Gi = N(
  '<div class="mt-0 px-5 py-4 overflow-visible"><div class=text-white><div class="mt-3 space-y-3"><div class=mt-6><hr class=border-[#373749]><p class="mt-1 text-[#737475] text-sm">Switch node version 2.3.2(latest)'
);
const Zi = (e) => {
  P(!1);
  const { formConfig: t } = fe(),
    n = [
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
    var r = Gi(),
      s = r.firstChild,
      c = s.firstChild,
      o = c.firstChild;
    return (
      m(
        c,
        () =>
          qi[t()]?.settings.map((l, u) => {
            if (l.type === "dropdown") return y(Le, { options: n });
            if (l.type === "switch")
              return y(ze, {
                get switchText() {
                  return l.label;
                },
                get toolTipContent() {
                  return { label: "", text: l.description };
                },
              });
          }),
        o
      ),
      m(
        c,
        y(Xi, {
          toolTipContent: {
            label: "",
            text: "Optional note to save with the node",
          },
        }),
        o
      ),
      m(
        c,
        y(ze, {
          switchText: "Display Note in Flow?",
          toolTipContent: {
            label: "",
            text: "If active, the note above will display in the flow as a subtitle",
          },
        }),
        o
      ),
      r
    );
  })();
};
var Ki = N(
  '<div id=mid-panel class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"><div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium">switch</span></div><button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="h-full flex-1 overflow-visible"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings</div></div></div><div class=overflow-visible><div></div><div>'
);
const Ji = (e) => {
  const [t, n] = P(0);
  return (() => {
    var r = Ki(),
      s = r.firstChild,
      c = s.nextSibling,
      o = c.firstChild,
      l = o.firstChild,
      u = l.firstChild,
      i = u.firstChild,
      d = i.nextSibling,
      a = l.nextSibling,
      x = a.firstChild,
      v = x.nextSibling;
    return (
      (i.$$click = () => n(0)),
      (d.$$click = () => n(1)),
      m(x, y(Fi, {})),
      m(v, y(Zi, {})),
      L(
        (h) => {
          var g = { [Ke.midPanel]: !0 },
            _ = `rounded-none border-b-2 ${
              t() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            $ = `rounded-none border-b-2 ${
              t() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            I = t() === 0 ? "" : "hidden",
            p = t() === 1 ? "" : "hidden";
          return (
            (h.e = ge(r, g, h.e)),
            _ !== h.t && b(i, (h.t = _)),
            $ !== h.a && b(d, (h.a = $)),
            I !== h.o && b(x, (h.o = I)),
            p !== h.i && b(v, (h.i = p)),
            h
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      r
    );
  })();
};
oe(["click"]);
const Qi = "_rightPanel_1ew1b_1",
  es = { rightPanel: Qi };
var ts = N(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output'
);
const ns = (e) =>
  (() => {
    var t = ts(),
      n = t.firstChild;
    return (
      n.firstChild,
      m(
        n,
        y(dt, {
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
      L((r) => ge(t, { [es.rightPanel]: !0 }, r)),
      t
    );
  })();
var os = N('<div class="flex items-start h-full w-full overflow-hidden">');
const rs = (e) =>
  (() => {
    var t = os();
    return (
      m(t, y(mi, {}), null), m(t, y(Ji, {}), null), m(t, y(ns, {}), null), t
    );
  })();
var is = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const ss = (e) => is();
var ls = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const ds = (e) => ls();
var cs = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const as = (e) => cs();
var us = N(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const hs = (e) => us();
var gs = N(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex items-center font-medium text-white gap-x-4"><div class="text-xl text-[#a7a4a4]"></div><div class=text-base>Switch</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const fs = (e) =>
  (() => {
    var t = gs(),
      n = t.firstChild,
      r = n.firstChild,
      s = n.nextSibling,
      c = s.firstChild,
      o = c.nextSibling,
      l = o.nextSibling;
    return (
      m(r, y(ss, {})), m(c, y(as, {})), m(o, y(hs, {})), m(l, y(ds, {})), t
    );
  })();
var vs = N(
    `<div class="flex h-full"><div class="flex-1 pr-4"><div class=mb-4><label class="block text-sm mb-1">Connect using <span class=text-red-500>*</span></label><div class="flex gap-2"><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod><span class=text-sm>OAuth2 (recommended)</span></label><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod><span class=text-sm>Service Account</span></label></div></div><div class=mb-4><label class="block text-sm mb-1">OAuth Redirect URL</label><input type=text class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=https://workflow.juwelt.net/rest/oauth2-credentials/callback readonly title="OAuth Redirect URL"placeholder="OAuth Redirect URL"><p class="text-xs text-gray-400 mt-1">In Gmail, use this URL above when prompted to enter an OAuth callback or redirect URL.</p></div><div class=mb-4><input type=text class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"title="Client ID"placeholder="Enter your Client ID"></div><div class=mb-4><input type=password class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=•••••••••••••••• title="Client Secret"placeholder="Enter your Client Secret"></div><div class="flex items-center gap-1 text-xs text-gray-400"><span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">i</span><span>Enterprise plan users can pull in credentials from external vaults. <a href=# class=text-blue-400>More info</a></span></div></div><div id=right class="w-[300px] bg-[#252535] rounded p-4 h-full"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-medium">Setup guide</h3><a href=# class="text-xs text-blue-400 flex items-center gap-1">Docs<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1=10 y1=14 x2=21 y2=3></line></svg></a></div><div class="text-xs text-gray-300 overflow-y-auto h-full"><p class=mb-2>Configure this credential:</p><ul class="list-disc pl-5 space-y-2"><li>Log in to your <a href=# class=text-blue-400>Google Cloud console</a>.</li><li>Go to Google Cloud Console / APIs and Services / Credentials. If you don't have a project yet, you'll need to create a new one and select it.</li><li>If you haven't used OAuth in this Google Cloud project before, <a href=# class=text-blue-400>configure the consent screen</a>.</li><li>In Credentials, select + CREATE CREDENTIALS + OAuth client ID.</li><li>In the Application type dropdown, select Web application.</li><li>Under Authorized redirect URLs, select + ADD URI. Paste in the OAuth redirect URL shown on the left.</li><li>Select Create.</li><li>In Enabled APIs and services, select + ENABLE APIS AND SERVICES.</li><li>Select and enable the Gmail API.</li><li>Back to Credentials, click on the credential in OAuth 2.0 Client IDs, and copy the Client ID and Client Secret.</li></ul><p class=mt-2>Click the docs link above for more detailed instructions.`
  ),
  ps = N("<div class=text-sm>Sharing settings content goes here..."),
  ms = N("<div class=text-sm>Details content goes here..."),
  xs = N(
    '<div class=" bg-[#2a2a3a] text-white rounded-md shadow-lg overflow-hidden z-[1000000] w-full h-full"><div class="p-4 flex justify-between items-center border-b border-gray-700 "><div class="flex items-center gap-2"><h2 class="text-base font-medium">Gmail account 4</h2><span class="text-xs text-gray-400">Gmail OAuth2 API</span></div><div class="flex items-center gap-2"><button class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Save</button><button class="text-gray-400 hover:text-white">×</button></div></div><div class="flex h-full"><div class="w-[150px] bg-[#252535] p-4 flex flex-col gap-3 h-full"><button>Connection</button><button>Sharing</button><button>Details</button></div><div class=" p-4 h-full">'
  );
function ws() {
  const [e, t] = P("connection"),
    [n, r] = P("oauth2");
  return (() => {
    var s = xs(),
      c = s.firstChild,
      o = c.nextSibling,
      l = o.firstChild,
      u = l.firstChild,
      i = u.nextSibling,
      d = i.nextSibling,
      a = l.nextSibling;
    return (
      (u.$$click = () => t("connection")),
      (i.$$click = () => t("sharing")),
      (d.$$click = () => t("details")),
      m(
        a,
        y(be, {
          get when() {
            return e() === "connection";
          },
          get children() {
            var x = vs(),
              v = x.firstChild,
              h = v.firstChild,
              g = h.firstChild,
              _ = g.nextSibling,
              $ = _.firstChild,
              I = $.firstChild,
              p = $.nextSibling,
              f = p.firstChild;
            return (
              I.addEventListener("change", () => r("oauth2")),
              f.addEventListener("change", () => r("service")),
              L(() => (I.checked = n() === "oauth2")),
              L(() => (f.checked = n() === "service")),
              x
            );
          },
        }),
        null
      ),
      m(
        a,
        y(be, {
          get when() {
            return e() === "sharing";
          },
          get children() {
            return ps();
          },
        }),
        null
      ),
      m(
        a,
        y(be, {
          get when() {
            return e() === "details";
          },
          get children() {
            return ms();
          },
        }),
        null
      ),
      L(
        (x) => {
          var v = `text-left text-sm ${
              e() === "connection" ? "text-white" : "text-gray-400"
            }`,
            h = `text-left text-sm ${
              e() === "sharing" ? "text-white" : "text-gray-400"
            }`,
            g = `text-left text-sm ${
              e() === "details" ? "text-white" : "text-gray-400"
            }`;
          return (
            v !== x.e && b(u, (x.e = v)),
            h !== x.t && b(i, (x.t = h)),
            g !== x.a && b(d, (x.a = g)),
            x
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      s
    );
  })();
}
oe(["click"]);
var bs = N(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const ys = ({ node: e }) => {
    const [t, n] = P(),
      {
        nodes: r,
        setNodes: s,
        selectedNode: c,
        setSelectedNode: o,
        pendingOutput: l,
        lastClickPosition: u,
        setEdges: i,
        edges: d,
        transform: a,
        scale: x,
        isShowModal: v,
        setIsModalOpen: h,
        isModalOpen: g,
        isModalOpen2: _,
        setIsModalOpen2: $,
      } = fe();
    function I(p) {
      let f = window.innerWidth / 2,
        S = window.innerHeight / 2;
      const z = c(),
        A = l(),
        H = u();
      function R(Q, He = 200, Ee = 0) {
        const pe = r().find((k) => k.id === Q);
        if ((n(pe), !pe)) return null;
        const me = pe.currPosition.get();
        return { x: me.x + He, y: me.y + Ee };
      }
      if (z) {
        let Q = R(z);
        Q && ((f = Q.x), (S = Q.y));
      } else if (A) {
        let Q = R(A.nodeId);
        Q && ((f = Q.x), (S = Q.y));
      } else H && ((f = (H.x - a().x) / x()), (S = (H.y - a().y) / x()));
      const [U, j] = P({ x: f, y: S }),
        [Z, ue] = P({ x: f, y: S }),
        [se, J] = P([]),
        [K, ce] = P([]),
        [ve, Je] = P([]),
        at = [
          ...Array(Number(e[p].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        ut = [
          ...Array(Number(e[p].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        ht = [
          ...Array(Number(e[p].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        gt = [
          ...Array(Number(e[p].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ];
      De(() => {
        s([
          ...r(),
          {
            id: `node_${Math.random().toString(36).substring(2, 8)}_${p}`,
            name: p,
            numberInputs: e[p].numberInputs,
            numberOutputs: e[p].numberOutputs,
            isInputVertex: e[p].isInputVertex,
            isOutputVertex: e[p].isOutputVertex,
            inputVertexIds: at,
            outputVertexIds: ut,
            isDownVertex: e[p].isDownVertex || !1,
            isUpVertex: e[p].isUpVertex || !1,
            downVertexNumber: e[p].downVertexNumber || 0,
            upVertexNumber: e[p].upVertexNumber || 0,
            downVertexIds: ht,
            upVertexIds: gt,
            downVertexOrientation: e[p].downVertexOrientation,
            busyIndex: { get: ve, set: Je },
            content: e[p].content,
            prevPosition: { get: U, set: j },
            currPosition: { get: Z, set: ue },
            inputEdgeIds: { get: se, set: J },
            outputEdgeIds: { get: K, set: ce },
          },
        ]);
      });
      const he = r()[r().length - 1];
      function Qe(Q = 0) {
        const He = document.getElementById(t().outputVertexIds[Q]),
          {
            left: Ee,
            right: pe,
            top: me,
            bottom: k,
          } = He.getBoundingClientRect(),
          D = Ee + Math.abs(Ee - pe) / 2,
          O = me + Math.abs(me - k) / 2,
          w = document.getElementById(he.inputVertexIds[0]),
          { left: E, right: C, top: M, bottom: V } = w.getBoundingClientRect(),
          T = E + Math.abs(E - C) / 2,
          W = M + Math.abs(M - V) / 2,
          [F, B] = P({ x: (D - a().x) / x(), y: (O - a().y) / x() }),
          [X, re] = P({ x: (T - a().x) / x(), y: (W - a().y) / x() }),
          [te, We] = P({ x: (D - a().x) / x(), y: (O - a().y) / x() }),
          [et, tt] = P({ x: (T - a().x) / x(), y: (W - a().y) / x() }),
          Ne = `edge_${t().id}_${Q}_${he.id}_0`;
        t().outputEdgeIds.set([...t().outputEdgeIds.get(), Ne]),
          he.inputEdgeIds.set([...he.inputEdgeIds.get(), Ne]),
          i([
            ...d(),
            {
              id: Ne,
              nodeStartId: t().id,
              nodeEndId: he.id,
              inputIndex: 0,
              typeOfEdge: "solid",
              outputIndex: Q,
              inputVertexId: he.inputVertexIds[0],
              outputVertexId: t().outputVertexIds[Q],
              prevStartPosition: { get: F, set: B },
              prevEndPosition: { get: X, set: re },
              currStartPosition: { get: te, set: We },
              currEndPosition: { get: et, set: tt },
            },
          ]),
          t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[Q]]);
      }
      z
        ? t()?.isOutputVertex && he.isInputVertex && Qe()
        : A &&
          t()?.isOutputVertex &&
          he.isInputVertex &&
          Qe(A.outputVertexIndex),
        r().length <= 1 && r()[0].isOutputVertex
          ? o(r()[0].id)
          : t()?.isOutputVertex && he.isInputVertex && o(he.id);
    }
    return (() => {
      var p = bs();
      return (
        m(
          p,
          y(je, {
            get children() {
              return y(ei, {});
            },
          }),
          null
        ),
        m(
          p,
          y(je, {
            get children() {
              return [
                y(At, {
                  isOpen: () => g(),
                  onClose: () => h(!1),
                  zIndex: 9999,
                  get children() {
                    return [y(fs, {}), y(rs, {})];
                  },
                }),
                y(At, {
                  isOpen: () => _(),
                  onClose: () => $(!1),
                  zIndex: 1e5,
                  widthClass: "w-[900px] max-w-[1200px] h-fit max-h-[90vh] ",
                  get children() {
                    return y(ws, {});
                  },
                }),
              ];
            },
          }),
          null
        ),
        m(
          p,
          y(je, {
            get children() {
              return y(qo, { onClickAdd: I, nodeMark: Jr });
            },
          }),
          null
        ),
        m(
          p,
          y(je, {
            get children() {
              return y(No, {});
            },
          }),
          null
        ),
        m(
          p,
          y(je, {
            get children() {
              return y(Ar, { nodes: r, setNodes: s });
            },
          }),
          null
        ),
        p
      );
    })();
  },
  _s = "_node_4buk8_1",
  $s = "_selectedNode_4buk8_23",
  Cs = "_switchIcon_4buk8_57",
  Is = "_switchNodeText_4buk8_65",
  Ss = "_switchTitle_4buk8_81",
  Es = "_switchDescription_4buk8_91",
  Pe = {
    node: _s,
    selectedNode: $s,
    switchIcon: Cs,
    switchNodeText: Is,
    switchTitle: Ss,
    switchDescription: Es,
  };
var Ns = N(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const ks = (e) =>
    (() => {
      var t = Ns(),
        n = t.firstChild,
        r = n.nextSibling,
        s = r.firstChild,
        c = s.nextSibling;
      return (
        L(
          (o) => {
            var l = e.selected ? Pe.selectedNode : Pe.node,
              u = Pe.switchIcon,
              i = Pe.switchNodeText,
              d = Pe.switchTitle,
              a = Pe.switchDescription;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(n, (o.t = u)),
              i !== o.a && b(r, (o.a = i)),
              d !== o.o && b(s, (o.o = d)),
              a !== o.i && b(c, (o.i = a)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Ps = "_testNode_3c9qb_1",
  Vs = "_selectedNode_3c9qb_25",
  Ts = "_testNodeIcon_3c9qb_55",
  Ms = "_testNodeTitle_3c9qb_63",
  nt = { testNode: Ps, selectedNode: Vs, testNodeIcon: Ts, testNodeTitle: Ms };
var Os = N(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const As = (e) =>
    (() => {
      var t = Os(),
        n = t.firstChild,
        r = n.nextSibling;
      return (
        L(
          (s) => {
            var c = e.selected ? nt.selectedNode : nt.testNode,
              o = nt.testNodeIcon,
              l = nt.testNodeTitle;
            return (
              c !== s.e && b(t, (s.e = c)),
              o !== s.t && b(n, (s.t = o)),
              l !== s.a && b(r, (s.a = l)),
              s
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  Ds = "_node_160z5_1",
  Ls = "_selectedNode_160z5_23",
  zs = "_switchIcon_160z5_59",
  Bs = "_switchNodeText_160z5_67",
  Rs = "_switchTitle_160z5_83",
  Hs = "_switchDescription_160z5_93",
  Ve = {
    node: Ds,
    selectedNode: Ls,
    switchIcon: zs,
    switchNodeText: Bs,
    switchTitle: Rs,
    switchDescription: Hs,
  };
var Ws = N(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const js = (e) =>
    (() => {
      var t = Ws(),
        n = t.firstChild,
        r = n.nextSibling,
        s = r.firstChild,
        c = s.nextSibling;
      return (
        L(
          (o) => {
            var l = e.selected ? Ve.selectedNode : Ve.node,
              u = Ve.switchIcon,
              i = Ve.switchNodeText,
              d = Ve.switchTitle,
              a = Ve.switchDescription;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(n, (o.t = u)),
              i !== o.a && b(r, (o.a = i)),
              d !== o.o && b(s, (o.o = d)),
              a !== o.i && b(c, (o.i = a)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Us = "_node_13uy5_1",
  Fs = "_selectedNode_13uy5_25",
  Ys = "_switchIcon_13uy5_59",
  Xs = "_switchNodeText_13uy5_67",
  qs = "_switchTitle_13uy5_83",
  Ue = {
    node: Us,
    selectedNode: Fs,
    switchIcon: Ys,
    switchNodeText: Xs,
    switchTitle: qs,
  };
var Gs = N(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const Zs = (e) =>
    (() => {
      var t = Gs(),
        n = t.firstChild,
        r = n.nextSibling,
        s = r.firstChild;
      return (
        L(
          (c) => {
            var o = e.selected ? Ue.selectedNode : Ue.node,
              l = Ue.switchIcon,
              u = Ue.switchNodeText,
              i = Ue.switchTitle;
            return (
              o !== c.e && b(t, (c.e = o)),
              l !== c.t && b(n, (c.t = l)),
              u !== c.a && b(r, (c.a = u)),
              i !== c.o && b(s, (c.o = i)),
              c
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Ks = "_AiAgentNode_go6bf_1",
  Js = "_selectedNode_go6bf_33",
  Qs = "_AiAgentNodeIcon_go6bf_71",
  el = "_AiAgentNodeTitle_go6bf_81",
  tl = "_AiAgentNodeDescription_go6bf_95",
  Te = {
    AiAgentNode: Ks,
    selectedNode: Js,
    AiAgentNodeIcon: Qs,
    AiAgentNodeTitle: el,
    AiAgentNodeDescription: tl,
  };
var nl = N("<div><div></div><div><div>AI Agent</div><div>Tools Agent");
const ol = (e) =>
    (() => {
      var t = nl(),
        n = t.firstChild,
        r = n.nextSibling,
        s = r.firstChild,
        c = s.nextSibling;
      return (
        m(n, y(zn, {})),
        L(
          (o) => {
            var l = e.selected ? Te.selectedNode : Te.AiAgentNode,
              u = Te.AiAgentNodeIcon,
              i = Te.AiAgentNodeText,
              d = Te.AiAgentNodeTitle,
              a = Te.AiAgentNodeDescription;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(n, (o.t = u)),
              i !== o.a && b(r, (o.a = i)),
              d !== o.o && b(s, (o.o = d)),
              a !== o.i && b(c, (o.i = a)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  rl = "_EmailNode_imw2c_1",
  il = "_selectedNode_imw2c_23",
  sl = "_mailIcon_imw2c_49",
  ll = "_mailNodeText_imw2c_61",
  dl = "_mailTitle_imw2c_77",
  cl = "_mailDescription_imw2c_87",
  Me = {
    EmailNode: rl,
    selectedNode: il,
    mailIcon: sl,
    mailNodeText: ll,
    mailTitle: dl,
    mailDescription: cl,
  };
var al = N("<div><div></div><div><div>Send Email</div><div>send");
const ul = (e) =>
    (() => {
      var t = al(),
        n = t.firstChild,
        r = n.nextSibling,
        s = r.firstChild,
        c = s.nextSibling;
      return (
        m(n, y(Bn, {})),
        L(
          (o) => {
            var l = e.selected ? Me.selectedNode : Me.EmailNode,
              u = Me.mailIcon,
              i = Me.mailNodeText,
              d = Me.mailTitle,
              a = Me.mailDescription;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(n, (o.t = u)),
              i !== o.a && b(r, (o.a = i)),
              d !== o.o && b(s, (o.o = d)),
              a !== o.i && b(c, (o.i = a)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  hl = "_VectorStoreNode_omif4_1",
  gl = "_selectedNode_omif4_31",
  fl = "_VectorStoreNodeIcon_omif4_67",
  vl = "_VectorStoreNodeTitle_omif4_77",
  pl = "_VectorStoreNodeText_omif4_97",
  Fe = {
    VectorStoreNode: hl,
    selectedNode: gl,
    VectorStoreNodeIcon: fl,
    VectorStoreNodeTitle: vl,
    VectorStoreNodeText: pl,
  };
var ml = N(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const xl = (e) =>
    (() => {
      var t = ml(),
        n = t.firstChild,
        r = n.firstChild,
        s = r.nextSibling,
        c = s.firstChild;
      return (
        m(r, y(Rn, {})),
        L(
          (o) => {
            var l = e.selected ? Fe.selectedNode : Fe.VectorStoreNode,
              u = Fe.VectorStoreNodeIcon,
              i = Fe.VectorStoreNodeText,
              d = Fe.VectorStoreNodeTitle;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(r, (o.t = u)),
              i !== o.a && b(s, (o.a = i)),
              d !== o.o && b(c, (o.o = d)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  wl = "_pgVectorNode_4ee5v_1",
  bl = "_selectedNode_4ee5v_31",
  yl = "_pgVectorNodeIcon_4ee5v_67",
  _l = "_pgVectorNodeTitle_4ee5v_77",
  $l = "_pgVectorNodeText_4ee5v_95",
  Ye = {
    pgVectorNode: wl,
    selectedNode: bl,
    pgVectorNodeIcon: yl,
    pgVectorNodeTitle: _l,
    pgVectorNodeText: $l,
  };
var Cl = N(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const Il = (e) =>
    (() => {
      var t = Cl(),
        n = t.firstChild,
        r = n.firstChild,
        s = r.nextSibling,
        c = s.firstChild;
      return (
        m(r, y(Hn, {})),
        L(
          (o) => {
            var l = e.selected ? Ye.selectedNode : Ye.pgVectorNode,
              u = Ye.pgVectorNodeIcon,
              i = Ye.pgVectorNodeText,
              d = Ye.pgVectorNodeTitle;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(r, (o.t = u)),
              i !== o.a && b(s, (o.a = i)),
              d !== o.o && b(c, (o.o = d)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Sl = "_ollamaChatNode_24diw_1",
  El = "_selectedNode_24diw_31",
  Nl = "_ollamaChatNodeIcon_24diw_67",
  kl = "_ollamaChatNodeTitle_24diw_77",
  Pl = "_ollamaChatNodeText_24diw_95",
  Xe = {
    ollamaChatNode: Sl,
    selectedNode: El,
    ollamaChatNodeIcon: Nl,
    ollamaChatNodeTitle: kl,
    ollamaChatNodeText: Pl,
  };
var Vl = N(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const Tl = (e) =>
    (() => {
      var t = Vl(),
        n = t.firstChild,
        r = n.firstChild,
        s = r.nextSibling,
        c = s.firstChild;
      return (
        m(r, y(Wn, {})),
        L(
          (o) => {
            var l = e.selected ? Xe.selectedNode : Xe.ollamaChatNode,
              u = Xe.ollamaChatNodeIcon,
              i = Xe.ollamaChatNodeText,
              d = `${Xe.ollamaChatNodeTitle} text-nowrap`;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(r, (o.t = u)),
              i !== o.a && b(s, (o.a = i)),
              d !== o.o && b(c, (o.o = d)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Ml = "_gmailTriggerNode_1hu5j_1",
  Ol = "_selectedNode_1hu5j_25",
  Al = "_gmailTriggerNodeIcon_1hu5j_55",
  Dl = "_gmailTriggerNodeText_1hu5j_65",
  Ll = "_gmailTriggerNodeTitle_1hu5j_83",
  zl = "_gmailTriggerNodeDescription_1hu5j_93",
  Oe = {
    gmailTriggerNode: Ml,
    selectedNode: Ol,
    gmailTriggerNodeIcon: Al,
    gmailTriggerNodeText: Dl,
    gmailTriggerNodeTitle: Ll,
    gmailTriggerNodeDescription: zl,
  };
var Bl = N("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const Rl = (e) =>
    (() => {
      var t = Bl(),
        n = t.firstChild,
        r = n.nextSibling,
        s = r.firstChild,
        c = s.nextSibling;
      return (
        m(n, y(jn, {})),
        L(
          (o) => {
            var l = e.selected ? Oe.selectedNode : Oe.gmailTriggerNode,
              u = Oe.gmailTriggerNodeIcon,
              i = Oe.gmailTriggerNodeText,
              d = Oe.gmailTriggerNodeTitle,
              a = Oe.gmailTriggerNodeDescription;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(n, (o.t = u)),
              i !== o.a && b(r, (o.a = i)),
              d !== o.o && b(s, (o.o = d)),
              a !== o.i && b(c, (o.i = a)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Hl = "_createDraftNode_gxi0p_1",
  Wl = "_selectedNode_gxi0p_31",
  jl = "_createDraftNodeIcon_gxi0p_67",
  Ul = "_createDraftNodeTitle_gxi0p_77",
  Fl = "_createDraftNodeText_gxi0p_95",
  Yl = "_createDraftNodeDescription_gxi0p_115",
  Ae = {
    createDraftNode: Hl,
    selectedNode: Wl,
    createDraftNodeIcon: jl,
    createDraftNodeTitle: Ul,
    createDraftNodeText: Fl,
    createDraftNodeDescription: Yl,
  };
var Xl = N(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const ql = (e) =>
    (() => {
      var t = Xl(),
        n = t.firstChild,
        r = n.firstChild,
        s = r.nextSibling,
        c = s.firstChild,
        o = c.nextSibling;
      return (
        m(r, y(Un, {})),
        L(
          (l) => {
            var u = e.selected ? Ae.selectedNode : Ae.createDraftNode,
              i = Ae.createDraftNodeIcon,
              d = Ae.createDraftNodeText,
              a = `${Ae.createDraftNodeTitle} text-nowrap`,
              x = Ae.createDraftNodeDescription;
            return (
              u !== l.e && b(t, (l.e = u)),
              i !== l.t && b(r, (l.t = i)),
              d !== l.a && b(s, (l.a = d)),
              a !== l.o && b(c, (l.o = a)),
              x !== l.i && b(o, (l.i = x)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Gl = "_embeddingNode_19nxp_1",
  Zl = "_selectedNode_19nxp_31",
  Kl = "_embeddingNodeIcon_19nxp_67",
  Jl = "_embeddingNodeTitle_19nxp_77",
  Ql = "_embeddingNodeText_19nxp_95",
  qe = {
    embeddingNode: Gl,
    selectedNode: Zl,
    embeddingNodeIcon: Kl,
    embeddingNodeTitle: Jl,
    embeddingNodeText: Ql,
  };
var ed = N(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const td = (e) =>
    (() => {
      var t = ed(),
        n = t.firstChild,
        r = n.firstChild,
        s = r.nextSibling,
        c = s.firstChild;
      return (
        m(r, y(Fn, {})),
        L(
          (o) => {
            var l = e.selected ? qe.selectedNode : qe.embeddingNode,
              u = qe.embeddingNodeIcon,
              i = qe.embeddingNodeText,
              d = `${qe.embeddingNodeTitle} text-nowrap`;
            return (
              l !== o.e && b(t, (o.e = l)),
              u !== o.t && b(r, (o.t = u)),
              i !== o.a && b(s, (o.a = i)),
              d !== o.o && b(c, (o.o = d)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  nd = {
    chat: {
      name: "chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: As,
    },
    switch: {
      name: "switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 3,
      content: ks,
    },
    edit: {
      name: "edit",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: js,
    },
    filter: {
      name: "filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Zs,
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
      content: ol,
    },
    "send-email": {
      name: "send-email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: ul,
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
      content: xl,
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
      content: Il,
    },
    "ollama-chat": {
      name: "ollama-chat",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: Tl,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Rl,
    },
    "create-draft": {
      name: "create-draft",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: ql,
    },
    embedding: {
      name: "embedding",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: td,
    },
  },
  od = (e) => y(ys, { node: nd }),
  rd = document.getElementById("root");
uo(() => y(od, {}), rd);
