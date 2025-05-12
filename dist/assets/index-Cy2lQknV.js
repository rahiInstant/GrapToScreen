(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const c of l)
      if (c.type === "childList")
        for (const n of c.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && r(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(l) {
    const c = {};
    return (
      l.integrity && (c.integrity = l.integrity),
      l.referrerPolicy && (c.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (c.credentials = "omit")
        : (c.credentials = "same-origin"),
      c
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const c = o(l);
    fetch(l.href, c);
  }
})();
const Mo = !1,
  To = (e, t) => e === t,
  Oo = Symbol("solid-track"),
  Qe = { equals: To };
let Nt = Pt;
const ae = 1,
  Je = 2,
  Et = { owned: null, cleanups: null, context: null, owner: null };
var Y = null;
let st = null,
  Lo = null,
  q = null,
  oe = null,
  le = null,
  nt = 0;
function ke(e, t) {
  const o = q,
    r = Y,
    l = e.length === 0,
    c = t === void 0 ? r : t,
    n = l
      ? Et
      : {
          owned: null,
          cleanups: null,
          context: c ? c.context : null,
          owner: c,
        },
    i = l ? e : () => e(() => _e(() => Xe(n)));
  (Y = n), (q = null);
  try {
    return Te(i, !0);
  } finally {
    (q = o), (Y = r);
  }
}
function L(e, t) {
  t = t ? Object.assign({}, Qe, t) : Qe;
  const o = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    r = (l) => (typeof l == "function" && (l = l(o.value)), St(o, l));
  return [Vt.bind(o), r];
}
function z(e, t, o) {
  const r = ct(e, t, !1, ae);
  qe(r);
}
function rt(e, t, o) {
  Nt = Yo;
  const r = ct(e, t, !1, ae);
  (!o || !o.render) && (r.user = !0), le ? le.push(r) : qe(r);
}
function ne(e, t, o) {
  o = o ? Object.assign({}, Qe, o) : Qe;
  const r = ct(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = o.equals || void 0),
    qe(r),
    Vt.bind(r)
  );
}
function _e(e) {
  if (q === null) return e();
  const t = q;
  q = null;
  try {
    return e();
  } finally {
    q = t;
  }
}
function je(e) {
  rt(() => _e(e));
}
function Me(e) {
  return (
    Y === null ||
      (Y.cleanups === null ? (Y.cleanups = [e]) : Y.cleanups.push(e)),
    e
  );
}
function Ao() {
  return Y;
}
function Do(e, t) {
  const o = Y,
    r = q;
  (Y = e), (q = null);
  try {
    return Te(t, !0);
  } catch (l) {
    ut(l);
  } finally {
    (Y = o), (q = r);
  }
}
function zo(e, t) {
  const o = Symbol("context");
  return { id: o, Provider: Xo(o), defaultValue: e };
}
function Bo(e) {
  let t;
  return Y && Y.context && (t = Y.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function Ho(e) {
  const t = ne(e),
    o = ne(() => lt(t()));
  return (
    (o.toArray = () => {
      const r = o();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    o
  );
}
function Vt() {
  if (this.sources && this.state)
    if (this.state === ae) qe(this);
    else {
      const e = oe;
      (oe = null), Te(() => tt(this), !1), (oe = e);
    }
  if (q) {
    const e = this.observers ? this.observers.length : 0;
    q.sources
      ? (q.sources.push(this), q.sourceSlots.push(e))
      : ((q.sources = [this]), (q.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(q),
          this.observerSlots.push(q.sources.length - 1))
        : ((this.observers = [q]),
          (this.observerSlots = [q.sources.length - 1]));
  }
  return this.value;
}
function St(e, t, o) {
  let r = e.value;
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        Te(() => {
          for (let l = 0; l < e.observers.length; l += 1) {
            const c = e.observers[l],
              n = st && st.running;
            n && st.disposed.has(c),
              (n ? !c.tState : !c.state) &&
                (c.pure ? oe.push(c) : le.push(c), c.observers && kt(c)),
              n || (c.state = ae);
          }
          if (oe.length > 1e6) throw ((oe = []), new Error());
        }, !1)),
    t
  );
}
function qe(e) {
  if (!e.fn) return;
  Xe(e);
  const t = nt;
  Ro(e, e.value, t);
}
function Ro(e, t, o) {
  let r;
  const l = Y,
    c = q;
  q = Y = e;
  try {
    r = e.fn(t);
  } catch (n) {
    return (
      e.pure &&
        ((e.state = ae), e.owned && e.owned.forEach(Xe), (e.owned = null)),
      (e.updatedAt = o + 1),
      ut(n)
    );
  } finally {
    (q = c), (Y = l);
  }
  (!e.updatedAt || e.updatedAt <= o) &&
    (e.updatedAt != null && "observers" in e ? St(e, r) : (e.value = r),
    (e.updatedAt = o));
}
function ct(e, t, o, r = ae, l) {
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
    pure: o,
  };
  return (
    Y === null || (Y !== Et && (Y.owned ? Y.owned.push(c) : (Y.owned = [c]))), c
  );
}
function et(e) {
  if (e.state === 0) return;
  if (e.state === Je) return tt(e);
  if (e.suspense && _e(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < nt); )
    e.state && t.push(e);
  for (let o = t.length - 1; o >= 0; o--)
    if (((e = t[o]), e.state === ae)) qe(e);
    else if (e.state === Je) {
      const r = oe;
      (oe = null), Te(() => tt(e, t[0]), !1), (oe = r);
    }
}
function Te(e, t) {
  if (oe) return e();
  let o = !1;
  t || (oe = []), le ? (o = !0) : (le = []), nt++;
  try {
    const r = e();
    return Wo(o), r;
  } catch (r) {
    o || (le = null), (oe = null), ut(r);
  }
}
function Wo(e) {
  if ((oe && (Pt(oe), (oe = null)), e)) return;
  const t = le;
  (le = null), t.length && Te(() => Nt(t), !1);
}
function Pt(e) {
  for (let t = 0; t < e.length; t++) et(e[t]);
}
function Yo(e) {
  let t,
    o = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[o++] = r) : et(r);
  }
  for (t = 0; t < o; t++) et(e[t]);
}
function tt(e, t) {
  e.state = 0;
  for (let o = 0; o < e.sources.length; o += 1) {
    const r = e.sources[o];
    if (r.sources) {
      const l = r.state;
      l === ae
        ? r !== t && (!r.updatedAt || r.updatedAt < nt) && et(r)
        : l === Je && tt(r, t);
    }
  }
}
function kt(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const o = e.observers[t];
    o.state ||
      ((o.state = Je), o.pure ? oe.push(o) : le.push(o), o.observers && kt(o));
  }
}
function Xe(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const o = e.sources.pop(),
        r = e.sourceSlots.pop(),
        l = o.observers;
      if (l && l.length) {
        const c = l.pop(),
          n = o.observerSlots.pop();
        r < l.length &&
          ((c.sourceSlots[n] = r), (l[r] = c), (o.observerSlots[r] = n));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Xe(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Xe(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Fo(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function ut(e, t = Y) {
  throw Fo(e);
}
function lt(e) {
  if (typeof e == "function" && !e.length) return lt(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let o = 0; o < e.length; o++) {
      const r = lt(e[o]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function Xo(e, t) {
  return function (r) {
    let l;
    return (
      z(
        () =>
          (l = _e(
            () => (
              (Y.context = { ...Y.context, [e]: r.value }), Ho(() => r.children)
            )
          )),
        void 0
      ),
      l
    );
  };
}
const Uo = Symbol("fallback");
function vt(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function jo(e, t, o = {}) {
  let r = [],
    l = [],
    c = [],
    n = 0,
    i = t.length > 1 ? [] : null;
  return (
    Me(() => vt(c)),
    () => {
      let a = e() || [],
        s = a.length,
        u,
        d;
      return (
        a[Oo],
        _e(() => {
          let w, g, f, _, V, b, E, m, C;
          if (s === 0)
            n !== 0 &&
              (vt(c), (c = []), (r = []), (l = []), (n = 0), i && (i = [])),
              o.fallback &&
                ((r = [Uo]),
                (l[0] = ke((B) => ((c[0] = B), o.fallback()))),
                (n = 1));
          else if (n === 0) {
            for (l = new Array(s), d = 0; d < s; d++)
              (r[d] = a[d]), (l[d] = ke(I));
            n = s;
          } else {
            for (
              f = new Array(s),
                _ = new Array(s),
                i && (V = new Array(s)),
                b = 0,
                E = Math.min(n, s);
              b < E && r[b] === a[b];
              b++
            );
            for (
              E = n - 1, m = s - 1;
              E >= b && m >= b && r[E] === a[m];
              E--, m--
            )
              (f[m] = l[E]), (_[m] = c[E]), i && (V[m] = i[E]);
            for (w = new Map(), g = new Array(m + 1), d = m; d >= b; d--)
              (C = a[d]),
                (u = w.get(C)),
                (g[d] = u === void 0 ? -1 : u),
                w.set(C, d);
            for (u = b; u <= E; u++)
              (C = r[u]),
                (d = w.get(C)),
                d !== void 0 && d !== -1
                  ? ((f[d] = l[u]),
                    (_[d] = c[u]),
                    i && (V[d] = i[u]),
                    (d = g[d]),
                    w.set(C, d))
                  : c[u]();
            for (d = b; d < s; d++)
              d in f
                ? ((l[d] = f[d]), (c[d] = _[d]), i && ((i[d] = V[d]), i[d](d)))
                : (l[d] = ke(I));
            (l = l.slice(0, (n = s))), (r = a.slice(0));
          }
          return l;
        })
      );
      function I(w) {
        if (((c[d] = w), i)) {
          const [g, f] = L(d);
          return (i[d] = f), t(a[d], g);
        }
        return t(a[d]);
      }
    }
  );
}
function O(e, t) {
  return _e(() => e(t || {}));
}
function me(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return ne(jo(() => e.each, e.children, t || void 0));
}
function qo(e, t, o) {
  let r = o.length,
    l = t.length,
    c = r,
    n = 0,
    i = 0,
    a = t[l - 1].nextSibling,
    s = null;
  for (; n < l || i < c; ) {
    if (t[n] === o[i]) {
      n++, i++;
      continue;
    }
    for (; t[l - 1] === o[c - 1]; ) l--, c--;
    if (l === n) {
      const u = c < r ? (i ? o[i - 1].nextSibling : o[c - i]) : a;
      for (; i < c; ) e.insertBefore(o[i++], u);
    } else if (c === i)
      for (; n < l; ) (!s || !s.has(t[n])) && t[n].remove(), n++;
    else if (t[n] === o[c - 1] && o[i] === t[l - 1]) {
      const u = t[--l].nextSibling;
      e.insertBefore(o[i++], t[n++].nextSibling),
        e.insertBefore(o[--c], u),
        (t[l] = o[c]);
    } else {
      if (!s) {
        s = new Map();
        let d = i;
        for (; d < c; ) s.set(o[d], d++);
      }
      const u = s.get(t[n]);
      if (u != null)
        if (i < u && u < c) {
          let d = n,
            I = 1,
            w;
          for (
            ;
            ++d < l && d < c && !((w = s.get(t[d])) == null || w !== u + I);

          )
            I++;
          if (I > u - i) {
            const g = t[n];
            for (; i < u; ) e.insertBefore(o[i++], g);
          } else e.replaceChild(o[i++], t[n++]);
        } else n++;
      else t[n++].remove();
    }
  }
}
const pt = "_$DX_DELEGATE";
function Zo(e, t, o, r = {}) {
  let l;
  return (
    ke((c) => {
      (l = c),
        t === document ? e() : S(t, e(), t.firstChild ? null : void 0, o);
    }, r.owner),
    () => {
      l(), (t.textContent = "");
    }
  );
}
function M(e, t, o, r) {
  let l;
  const c = () => {
      const i = document.createElement("template");
      return (i.innerHTML = e), i.content.firstChild;
    },
    n = () => (l || (l = c())).cloneNode(!0);
  return (n.cloneNode = n), n;
}
function de(e, t = window.document) {
  const o = t[pt] || (t[pt] = new Set());
  for (let r = 0, l = e.length; r < l; r++) {
    const c = e[r];
    o.has(c) || (o.add(c), t.addEventListener(c, Go));
  }
}
function J(e, t, o) {
  o == null ? e.removeAttribute(t) : e.setAttribute(t, o);
}
function p(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Ue(e, t, o = {}) {
  const r = Object.keys(t || {}),
    l = Object.keys(o);
  let c, n;
  for (c = 0, n = l.length; c < n; c++) {
    const i = l[c];
    !i || i === "undefined" || t[i] || (xt(e, i, !1), delete o[i]);
  }
  for (c = 0, n = r.length; c < n; c++) {
    const i = r[c],
      a = !!t[i];
    !i || i === "undefined" || o[i] === a || !a || (xt(e, i, !0), (o[i] = a));
  }
  return o;
}
function we(e, t, o) {
  return _e(() => e(t, o));
}
function S(e, t, o, r) {
  if ((o !== void 0 && !r && (r = []), typeof t != "function"))
    return ot(e, t, r, o);
  z((l) => ot(e, t(), l, o), r);
}
function xt(e, t, o) {
  const r = t.trim().split(/\s+/);
  for (let l = 0, c = r.length; l < c; l++) e.classList.toggle(r[l], o);
}
function Go(e) {
  let t = e.target;
  const o = `$$${e.type}`,
    r = e.target,
    l = e.currentTarget,
    c = (a) =>
      Object.defineProperty(e, "target", { configurable: !0, value: a }),
    n = () => {
      const a = t[o];
      if (a && !t.disabled) {
        const s = t[`${o}Data`];
        if ((s !== void 0 ? a.call(t, s, e) : a.call(t, e), e.cancelBubble))
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
    i = () => {
      for (; n() && (t = t._$host || t.parentNode || t.host); );
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
    const a = e.composedPath();
    c(a[0]);
    for (let s = 0; s < a.length - 2 && ((t = a[s]), !!n()); s++) {
      if (t._$host) {
        (t = t._$host), i();
        break;
      }
      if (t.parentNode === l) break;
    }
  } else i();
  c(r);
}
function ot(e, t, o, r, l) {
  for (; typeof o == "function"; ) o = o();
  if (t === o) return o;
  const c = typeof t,
    n = r !== void 0;
  if (
    ((e = (n && o[0] && o[0].parentNode) || e),
    c === "string" || c === "number")
  ) {
    if (c === "number" && ((t = t.toString()), t === o)) return o;
    if (n) {
      let i = o[0];
      i && i.nodeType === 3
        ? i.data !== t && (i.data = t)
        : (i = document.createTextNode(t)),
        (o = $e(e, o, r, i));
    } else
      o !== "" && typeof o == "string"
        ? (o = e.firstChild.data = t)
        : (o = e.textContent = t);
  } else if (t == null || c === "boolean") o = $e(e, o, r);
  else {
    if (c === "function")
      return (
        z(() => {
          let i = t();
          for (; typeof i == "function"; ) i = i();
          o = ot(e, i, o, r);
        }),
        () => o
      );
    if (Array.isArray(t)) {
      const i = [],
        a = o && Array.isArray(o);
      if (dt(i, t, o, l)) return z(() => (o = ot(e, i, o, r, !0))), () => o;
      if (i.length === 0) {
        if (((o = $e(e, o, r)), n)) return o;
      } else
        a
          ? o.length === 0
            ? mt(e, i, r)
            : qo(e, o, i)
          : (o && $e(e), mt(e, i));
      o = i;
    } else if (t.nodeType) {
      if (Array.isArray(o)) {
        if (n) return (o = $e(e, o, r, t));
        $e(e, o, null, t);
      } else
        o == null || o === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      o = t;
    }
  }
  return o;
}
function dt(e, t, o, r) {
  let l = !1;
  for (let c = 0, n = t.length; c < n; c++) {
    let i = t[c],
      a = o && o[e.length],
      s;
    if (!(i == null || i === !0 || i === !1))
      if ((s = typeof i) == "object" && i.nodeType) e.push(i);
      else if (Array.isArray(i)) l = dt(e, i, a) || l;
      else if (s === "function")
        if (r) {
          for (; typeof i == "function"; ) i = i();
          l =
            dt(e, Array.isArray(i) ? i : [i], Array.isArray(a) ? a : [a]) || l;
        } else e.push(i), (l = !0);
      else {
        const u = String(i);
        a && a.nodeType === 3 && a.data === u
          ? e.push(a)
          : e.push(document.createTextNode(u));
      }
  }
  return l;
}
function mt(e, t, o = null) {
  for (let r = 0, l = t.length; r < l; r++) e.insertBefore(t[r], o);
}
function $e(e, t, o, r) {
  if (o === void 0) return (e.textContent = "");
  const l = r || document.createTextNode("");
  if (t.length) {
    let c = !1;
    for (let n = t.length - 1; n >= 0; n--) {
      const i = t[n];
      if (l !== i) {
        const a = i.parentNode === e;
        !c && !n
          ? a
            ? e.replaceChild(l, i)
            : e.insertBefore(l, o)
          : a && i.remove();
      } else c = !0;
    }
  } else e.insertBefore(l, o);
  return [l];
}
const Ko = "http://www.w3.org/2000/svg";
function Qo(e, t = !1) {
  return t ? document.createElementNS(Ko, e) : document.createElement(e);
}
function Jo(e) {
  const { useShadow: t } = e,
    o = document.createTextNode(""),
    r = () => e.mount || document.body,
    l = Ao();
  let c;
  return (
    rt(
      () => {
        c || (c = Do(l, () => ne(() => e.children)));
        const n = r();
        if (n instanceof HTMLHeadElement) {
          const [i, a] = L(!1),
            s = () => a(!0);
          ke((u) => S(n, () => (i() ? u() : c()), null)), Me(s);
        } else {
          const i = Qo(e.isSVG ? "g" : "div", e.isSVG),
            a = t && i.attachShadow ? i.attachShadow({ mode: "open" }) : i;
          Object.defineProperty(i, "_$host", {
            get() {
              return o.parentNode;
            },
            configurable: !0,
          }),
            S(a, c),
            n.appendChild(i),
            e.ref && e.ref(i),
            Me(() => n.removeChild(i));
        }
      },
      void 0,
      { render: !0 }
    ),
    o
  );
}
const en = "_draggable_1h2ec_71",
  tn = "_dragging_1h2ec_79",
  on = "_selection_1h2ec_87",
  nn = "_testWorkFlow_1h2ec_245",
  rn = "_loader_1h2ec_273",
  sn = "_testButton_1h2ec_315",
  ln = "_zoomControl_1h2ec_337",
  dn = "_zoomFit_1h2ec_355",
  cn = "_zoomIn_1h2ec_409",
  un = "_zoomOut_1h2ec_461",
  an = "_zoomReset_1h2ec_513",
  hn = "_zoomResetHide_1h2ec_565",
  te = {
    "dot-flow__pane": "_dot-flow__pane_1h2ec_63",
    draggable: en,
    dragging: tn,
    selection: on,
    "dot-flow__viewport": "_dot-flow__viewport_1h2ec_97",
    "dot-flow__background": "_dot-flow__background_1h2ec_127",
    testWorkFlow: nn,
    loader: rn,
    testButton: sn,
    zoomControl: ln,
    zoomFit: dn,
    zoomIn: cn,
    zoomOut: un,
    zoomReset: an,
    zoomResetHide: hn,
  },
  [Mt, Tt] = L(!1),
  [Ot, Lt] = L(!1),
  [At, Dt] = L(!1),
  [zt, Bt] = L(1),
  [Ht, Rt] = L([]),
  [Wt, Yt] = L(null),
  [Ft, Xt] = L([]),
  [Ut, jt] = L(0);
let [qt, Zt] = L(!1),
  Gt;
const [Kt, Qt] = L({ x: 0, y: 0 }),
  [Jt, eo] = L({ x: 0, y: 0 }),
  [to, oo] = L([]),
  [no, ro] = L({ x: 0, y: 0 }),
  [io, so] = L(null),
  [lo, co] = L(null),
  [uo, ao] = L(null),
  [ho, go] = L(!1),
  [fo, vo] = L({ x: 0, y: 0 }),
  [po, xo] = L(!1),
  [mo, wo] = L(!1),
  [_o, yo] = L("");
L(null);
const bo = zo({
    scale: zt,
    setScale: Bt,
    draggable: Mt,
    setDraggable: Tt,
    isCtrlPressed: Ot,
    setIsCtrlPressed: Lt,
    isSpacePressed: At,
    setIsSpacePressed: Dt,
    edges: Ht,
    setEdges: Rt,
    newEdge: Wt,
    setNewEdge: Yt,
    busyIndex: Ft,
    setBusyIndex: Xt,
    edgeLength: Ut,
    setEdgeLength: jt,
    isOpen: qt,
    setIsOpen: Zt,
    inputRef: Gt,
    edgeEnd: Kt,
    setEdgeEnd: Qt,
    transform: Jt,
    setTransform: eo,
    nodes: to,
    setNodes: oo,
    preTransform: no,
    setPreTransform: ro,
    selectedNode: io,
    setSelectedNode: so,
    pendingOutput: lo,
    setPendingOutput: co,
    lastClickPosition: uo,
    setLastClickPosition: ao,
    isShowModal: ho,
    setIsShowModal: go,
    positionButton: fo,
    setPositionButton: vo,
    isOpening: po,
    setIsOpening: xo,
    isModalOpen: mo,
    setIsModalOpen: wo,
    typeOfVertex: _o,
    setTypeOfVertex: yo,
  }),
  ce = () => {
    const e = Bo(bo);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var gn = M(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const fn = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: o,
    setIsCtrlPressed: r,
    setIsSpacePressed: l,
    isCtrlPressed: c,
    isSpacePressed: n,
    scale: i,
    setScale: a,
    nodes: s,
    setTransform: u,
    setPreTransform: d,
    transform: I,
  } = ce();
  je(() => {
    const _ = document.getElementById("pane"),
      V = (E) => {
        E.ctrlKey || (o(!1), r(!1)),
          E.code == "Space" && (E.preventDefault(), l(!1), o(!1));
      },
      b = (E) => {
        E.ctrlKey && (o(!0), r(!0)),
          E.code == "Space" && (E.preventDefault(), l(!0), o(!0));
      };
    if (_) {
      const E = (m) => {
        m.preventDefault(),
          c() || n()
            ? (console.log("good"),
              f(m, () => i() + m.deltaY * -1e-4, "cursor"))
            : m.shiftKey
            ? u((C) => ({ x: C.x - m.deltaY * 0.5, y: C.y }))
            : u((C) => ({ x: C.x, y: C.y - m.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", V),
        document.addEventListener("keydown", b),
        _.addEventListener("wheel", E, { passive: !1 }),
        Me(() => {
          document.removeEventListener("keydown", b),
            document.removeEventListener("keyup", V),
            _.removeEventListener("wheel", E);
        });
    }
  });
  function w(_) {
    if (_.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const V = Math.min(..._.map((C) => C.currPosition.get().x)),
      b = Math.min(..._.map((C) => C.currPosition.get().y)),
      E = Math.max(
        ..._.map((C) => {
          const B = document.getElementById(C.id);
          return B
            ? C.currPosition.get().x + B.clientWidth
            : C.currPosition.get().x;
        })
      ),
      m = Math.max(
        ..._.map((C) => {
          const B = document.getElementById(C.id);
          return B
            ? C.currPosition.get().y + B.clientHeight
            : C.currPosition.get().y;
        })
      );
    return { minX: V, minY: b, width: E - V, height: m - b };
  }
  function g() {
    const _ = document.getElementById("pane");
    if (!_) return;
    const V = w(s());
    if (!V) return;
    const b = 80,
      E = _.getBoundingClientRect(),
      m = E.width - b * 2,
      C = E.height - b * 2,
      B = m / V.width,
      H = C / V.height,
      F = Math.min(B, H, 1),
      W = V.minX + V.width / 2,
      ee = V.minY + V.height / 2,
      U = E.width / 2 - W * F,
      re = E.height / 2 - ee * F;
    a(F), u({ x: U, y: re }), d({ x: U, y: re });
  }
  const f = (_, V, b = "cursor") => {
    const E = document.getElementById("pane");
    if (!E) return;
    _.preventDefault();
    const m = E.getBoundingClientRect(),
      C = b === "cursor" ? _.clientX - m.left : m.width / 2,
      B = b === "cursor" ? _.clientY - m.top : m.height / 2,
      H = i(),
      F = Math.min(Math.max(e, V()), t),
      W = (C - I().x) / H,
      ee = (B - I().y) / H,
      U = C - W * F,
      re = B - ee * F;
    a(F), u({ x: U, y: re }), d({ x: U, y: re });
  };
  return (() => {
    var _ = gn(),
      V = _.firstChild,
      b = V.nextSibling,
      E = b.nextSibling,
      m = E.nextSibling;
    return (
      (V.$$click = () => g()),
      (b.$$click = (C) => f(C, () => i() + 0.01, "center")),
      (E.$$click = (C) => f(C, () => Math.max(0, i() - 0.01), "center")),
      (m.$$click = (C) =>
        f(C, () => (a(1), u({ x: 0, y: 0 }), d({ x: 0, y: 0 }), 1), "center")),
      z(
        (C) => {
          var B = te.zoomControl,
            H = te.zoomFit,
            F = te.zoomIn,
            W = te.zoomOut,
            ee = i() > 1 || i() < 1 ? te.zoomReset : te.zoomResetHide;
          return (
            B !== C.e && p(_, (C.e = B)),
            H !== C.t && p(V, (C.t = H)),
            F !== C.a && p(b, (C.a = F)),
            W !== C.o && p(E, (C.o = W)),
            ee !== C.i && p(m, (C.i = ee)),
            C
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      _
    );
  })();
};
de(["click"]);
const vn = "_sidebarMain_dxkxu_1",
  pn = "_addNode_dxkxu_11",
  xn = "_sidebarContent_dxkxu_71",
  mn = "_nodeList_dxkxu_99",
  wn = "_sidebarContentShow_dxkxu_113",
  _n = "_sidebarContentHide_dxkxu_123",
  yn = "_sidebarTitle_dxkxu_135",
  bn = "_searchContainer_dxkxu_153",
  Cn = "_inputFieldContainer_dxkxu_161",
  $n = "_inputField_dxkxu_161",
  In = "_searchIcon_dxkxu_211",
  Nn = "_firstWrapper_dxkxu_229",
  En = "_restNodeWrapper_dxkxu_251",
  Vn = "_node_dxkxu_99",
  Sn = "_nodeIcon_dxkxu_299",
  Pn = "_title_dxkxu_311",
  kn = "_description_dxkxu_325",
  Q = {
    sidebarMain: vn,
    addNode: pn,
    sidebarContent: xn,
    nodeList: mn,
    sidebarContentShow: wn,
    sidebarContentHide: _n,
    sidebarTitle: yn,
    searchContainer: bn,
    inputFieldContainer: Cn,
    inputField: $n,
    searchIcon: In,
    firstWrapper: Nn,
    restNodeWrapper: En,
    node: Vn,
    nodeIcon: Sn,
    title: Pn,
    description: kn,
  };
var Mn = M(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  Tn = M("<div><div><div></div><div><div></div><div>");
const On = (e) => {
  const { isOpen: t, setIsOpen: o } = ce();
  let r;
  const l = (n) => {
    const i = document.getElementById("sidebar-main"),
      a = document.querySelectorAll('[id^="output-"]');
    let s = !1;
    a.forEach((u) => {
      u.contains(n.target) && (s = !0);
    }),
      i && !i.contains(n.target) && !s && o(!1);
  };
  je(() => {
    document.addEventListener("click", l);
  });
  const c = (n, i) => {
    n.stopPropagation(), e.onClickAdd(i);
  };
  return (() => {
    var n = Mn(),
      i = n.firstChild,
      a = i.nextSibling,
      s = a.firstChild,
      u = s.nextSibling,
      d = u.firstChild,
      I = d.firstChild,
      w = I.nextSibling,
      g = u.nextSibling;
    return (
      (i.$$click = () => {
        o(!0), r && r.focus();
      }),
      we((f) => (r = f), w),
      S(
        g,
        O(me, {
          get each() {
            return e.nodeMark;
          },
          children: (f, _) =>
            (() => {
              var V = Tn(),
                b = V.firstChild,
                E = b.firstChild,
                m = E.nextSibling,
                C = m.firstChild,
                B = C.nextSibling;
              return (
                (V.$$click = (H) => c(H, f.name)),
                S(E, O(f.icon, {})),
                S(C, () => f.title),
                S(B, () => f.description),
                z(
                  (H) => {
                    var F = _() == 0 ? Q.firstWrapper : Q.restNodeWrapper,
                      W = Q.node,
                      ee = Q.nodeIcon,
                      U = Q.title,
                      re = Q.description;
                    return (
                      F !== H.e && p(V, (H.e = F)),
                      W !== H.t && p(b, (H.t = W)),
                      ee !== H.a && p(E, (H.a = ee)),
                      U !== H.o && p(C, (H.o = U)),
                      re !== H.i && p(B, (H.i = re)),
                      H
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
                ),
                V
              );
            })(),
        })
      ),
      z(
        (f) => {
          var _ = Q.sidebarMain,
            V = Q.addNode,
            b = {
              [Q.sidebarContent]: !0,
              [Q.sidebarContentShow]: t(),
              [Q.sidebarContentHide]: !t(),
            },
            E = Q.sidebarTitle,
            m = Q.searchContainer,
            C = Q.inputFieldContainer,
            B = Q.searchIcon,
            H = Q.inputField,
            F = Q.nodeList;
          return (
            _ !== f.e && p(n, (f.e = _)),
            V !== f.t && p(i, (f.t = V)),
            (f.a = Ue(a, b, f.a)),
            E !== f.o && p(s, (f.o = E)),
            m !== f.i && p(u, (f.i = m)),
            C !== f.n && p(d, (f.n = C)),
            B !== f.s && p(I, (f.s = B)),
            H !== f.h && p(w, (f.h = H)),
            F !== f.r && p(g, (f.r = F)),
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
          h: void 0,
          r: void 0,
        }
      ),
      n
    );
  })();
};
de(["click"]);
const Ln = "_node_kk5n8_1",
  An = "_nodeSelected_kk5n8_47",
  Dn = "_inputsWrapper_kk5n8_97",
  zn = "_input_kk5n8_97",
  Bn = "_inputsUPWrapper_kk5n8_145",
  Hn = "_inputUp_kk5n8_177",
  Rn = "_outputsDownWrapper_kk5n8_205",
  Wn = "_outputDown_kk5n8_237",
  Yn = "_outputDownVertex_kk5n8_251",
  Fn = "_downOutputLine_kk5n8_269",
  Xn = "_downPlusLine_kk5n8_285",
  Un = "_outputsWrapper_kk5n8_319",
  jn = "_output_kk5n8_205",
  qn = "_outputCircle_kk5n8_365",
  Zn = "_outputLine_kk5n8_391",
  Gn = "_plusLine_kk5n8_407",
  Kn = "_vertexNum_kk5n8_427",
  Qn = "_plusLineHidden_kk5n8_493",
  Jn = "_outputPlus_kk5n8_503",
  er = "_functionWrapper_kk5n8_595",
  j = {
    node: Ln,
    nodeSelected: An,
    inputsWrapper: Dn,
    input: zn,
    inputsUPWrapper: Bn,
    inputUp: Hn,
    outputsDownWrapper: Rn,
    outputDown: Wn,
    outputDownVertex: Yn,
    downOutputLine: Fn,
    downPlusLine: Xn,
    outputsWrapper: Un,
    output: jn,
    outputCircle: qn,
    outputLine: Zn,
    plusLine: Gn,
    vertexNum: Kn,
    plusLineHidden: Qn,
    outputPlus: Jn,
    function: "_function_kk5n8_561",
    functionWrapper: er,
  };
var tr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const wt = (e) => tr();
var ue = M("<div>"),
  _t = M("<div><div>"),
  yt = M("<div><div></div><div><div></div><div id=plus>");
const or = (e) => {
  const { newEdge: t, edgeLength: o, setIsOpen: r, setPendingOutput: l } = ce();
  function c(a, s) {
    const { left: u, right: d, top: I, bottom: w } = a.getBoundingClientRect(),
      g = u + Math.abs(u - d) / 2,
      f = I + Math.abs(I - w) / 2;
    e.onMouseEnterInput(g, f, e.id, s);
  }
  function n(a) {
    e.onMouseLeaveInput(e.id, a);
  }
  function i(a, s, u, d, I) {
    s.stopPropagation();
    const { left: w, right: g, top: f, bottom: _ } = a.getBoundingClientRect(),
      V = w + Math.abs(w - g) / 2,
      b = f + Math.abs(f - _) / 2;
    e.onMouseDownOutput(V, b, e.id, u, d, I);
  }
  return (() => {
    var a = ue();
    return (
      S(
        a,
        (() => {
          var s = ne(() => !!e.isInputVertex);
          return () =>
            s()
              ? (() => {
                  var u = ue();
                  return (
                    S(
                      u,
                      O(me, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (d, I) => {
                          let w = null;
                          return (() => {
                            var g = _t(),
                              f = g.firstChild;
                            g.addEventListener("mouseleave", () => n(I())),
                              g.addEventListener("mouseenter", () => c(w, I())),
                              J(g, "id", `input-${d}`);
                            var _ = w;
                            return (
                              typeof _ == "function" ? we(_, f) : (w = f),
                              J(f, "id", d),
                              z(() => p(f, j.input)),
                              g
                            );
                          })();
                        },
                      })
                    ),
                    z(() => p(u, j.inputsWrapper)),
                    u
                  );
                })()
              : ue();
        })(),
        null
      ),
      S(
        a,
        (() => {
          var s = ne(() => !!e.isOutputVertex);
          return () =>
            s() &&
            (() => {
              var u = ue();
              return (
                S(
                  u,
                  O(me, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (d, I) => {
                      let w = null;
                      return (() => {
                        var g = yt(),
                          f = g.firstChild,
                          _ = f.nextSibling,
                          V = _.firstChild,
                          b = V.nextSibling;
                        (g.$$mousedown = (m) => i(w, m, I(), d, "solid")),
                          (g.$$click = (m) => {
                            m.stopPropagation(),
                              r(!0),
                              l({ nodeId: e.id, outputVertexIndex: I() });
                          }),
                          J(g, "id", `output-${d}`);
                        var E = w;
                        return (
                          typeof E == "function" ? we(E, f) : (w = f),
                          J(f, "id", d),
                          S(
                            _,
                            (() => {
                              var m = ne(() => e.numberOutputs > 1);
                              return () =>
                                m() &&
                                (() => {
                                  var C = ue();
                                  return S(C, I), z(() => p(C, j.vertexNum)), C;
                                })();
                            })(),
                            V
                          ),
                          S(b, O(wt, {})),
                          z(
                            (m) => {
                              var C = j.output,
                                B = j.outputCircle,
                                H = {
                                  [j.plusLine]: !0,
                                  [j.plusLineHidden]:
                                    (t()?.outputVertexId == d && o() > 10) ||
                                    e.busyIndex.get().includes(d),
                                },
                                F = j.outputLine,
                                W = j.outputPlus;
                              return (
                                C !== m.e && p(g, (m.e = C)),
                                B !== m.t && p(f, (m.t = B)),
                                (m.a = Ue(_, H, m.a)),
                                F !== m.o && p(V, (m.o = F)),
                                W !== m.i && p(b, (m.i = W)),
                                m
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
                          g
                        );
                      })();
                    },
                  })
                ),
                z(() => p(u, j.outputsWrapper)),
                u
              );
            })();
        })(),
        null
      ),
      S(
        a,
        (() => {
          var s = ne(() => !!e.isDownVertex);
          return () =>
            s() &&
            (() => {
              var u = ue();
              return (
                S(
                  u,
                  O(me, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (d, I) => {
                      let w = null;
                      return (() => {
                        var g = yt(),
                          f = g.firstChild,
                          _ = f.nextSibling,
                          V = _.firstChild,
                          b = V.nextSibling;
                        (g.$$mousedown = (m) => i(w, m, I(), d, "dash")),
                          (g.$$click = (m) => {
                            m.stopPropagation(),
                              r(!0),
                              l({ nodeId: e.id, outputVertexIndex: I() });
                          }),
                          J(g, "id", `output-${d}`);
                        var E = w;
                        return (
                          typeof E == "function" ? we(E, f) : (w = f),
                          J(f, "id", d),
                          S(b, O(wt, {})),
                          z(
                            (m) => {
                              var C = j.outputDown,
                                B = j.outputDownVertex,
                                H = {
                                  [j.downPlusLine]: !0,
                                  [j.plusLineHidden]:
                                    (t()?.outputVertexId == d && o() > 10) ||
                                    e.busyIndex.get().includes(d),
                                },
                                F = j.downOutputLine,
                                W = j.outputPlus;
                              return (
                                C !== m.e && p(g, (m.e = C)),
                                B !== m.t && p(f, (m.t = B)),
                                (m.a = Ue(_, H, m.a)),
                                F !== m.o && p(V, (m.o = F)),
                                W !== m.i && p(b, (m.i = W)),
                                m
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
                          g
                        );
                      })();
                    },
                  })
                ),
                z(() => p(u, `${j.outputsDownWrapper} `)),
                u
              );
            })();
        })(),
        null
      ),
      S(
        a,
        (() => {
          var s = ne(() => !!e.isUpVertex);
          return () =>
            s()
              ? (() => {
                  var u = ue();
                  return (
                    S(
                      u,
                      O(me, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (d, I) => {
                          let w = null;
                          return (() => {
                            var g = _t(),
                              f = g.firstChild;
                            g.addEventListener("mouseleave", () => n(I())),
                              g.addEventListener("mouseenter", () => c(w, I())),
                              J(g, "id", `input-${d}`);
                            var _ = w;
                            return (
                              typeof _ == "function" ? we(_, f) : (w = f),
                              J(f, "id", d),
                              z(() => p(f, j.inputUp)),
                              g
                            );
                          })();
                        },
                      })
                    ),
                    z(() => p(u, j.inputsUPWrapper)),
                    u
                  );
                })()
              : ue();
        })(),
        null
      ),
      a
    );
  })();
};
de(["click", "mousedown"]);
var nr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const rr = (e) => nr();
var ir = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const sr = (e) => ir();
var lr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const dr = (e) => lr();
var cr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const ur = (e) => cr();
var ar = M(
  "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
);
const hr = (e) => {
  const {
    setIsShowModal: t,
    isShowModal: o,
    setPositionButton: r,
    setIsOpening: l,
    setIsModalOpen: c,
  } = ce();
  let n;
  return (() => {
    var i = ar(),
      a = i.firstChild,
      s = a.firstChild,
      u = s.firstChild,
      d = u.nextSibling,
      I = d.nextSibling,
      w = I.nextSibling,
      g = a.nextSibling;
    return (
      we((f) => (n = f), i),
      (i.$$pointerdown = (f) => {
        f.stopPropagation(), e.onMouseDownNode(f, e.id);
      }),
      (i.$$dblclick = () => {
        const {
            left: f,
            top: _,
            width: V,
            height: b,
          } = n.getBoundingClientRect(),
          E = f + V / 2,
          m = _ + b / 2;
        r({ x: E, y: m }),
          l(!0),
          document.getElementById("modal"),
          setTimeout(() => {
            l(!1), c(!0);
          }, 50);
      }),
      (u.$$click = (f) => f.stopPropagation()),
      S(u, O(rr, {})),
      (d.$$click = (f) => f.stopPropagation()),
      S(d, O(sr, {})),
      (I.$$pointerdown = (f) => {
        f.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      S(I, O(dr, {})),
      (w.$$click = (f) => f.stopPropagation()),
      S(w, O(ur, {})),
      S(
        g,
        O(e.content, {
          get selected() {
            return e.selected;
          },
        })
      ),
      S(
        i,
        O(or, {
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
      z(
        (f) => {
          var _ = e.id,
            V = e.selected ? j.nodeSelected : j.node,
            b = `translate(${e.x}px, ${e.y}px)`,
            E = j.functionWrapper,
            m = j.function;
          return (
            _ !== f.e && J(i, "id", (f.e = _)),
            V !== f.t && p(i, (f.t = V)),
            b !== f.a &&
              ((f.a = b) != null
                ? i.style.setProperty("transform", b)
                : i.style.removeProperty("transform")),
            E !== f.o && p(a, (f.o = E)),
            m !== f.i && p(s, (f.i = m)),
            f
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      i
    );
  })();
};
de(["dblclick", "pointerdown", "click"]);
const gr = "_wrapper_cfrao_1",
  fr = "_edge_cfrao_33",
  vr = "_edgeDash_cfrao_63",
  pr = "_icon_cfrao_105",
  xr = "_circle_cfrao_119",
  mr = "_edgeNew_cfrao_189",
  xe = {
    wrapper: gr,
    edge: fr,
    delete: "_delete_cfrao_47",
    edgeDash: vr,
    icon: pr,
    circle: xr,
    edgeNew: mr,
  };
var wr = M(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path marker-end=url(#arrowhead)></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const bt = (e) => {
  const [t, o] = L({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    { typeOfVertex: r } = ce();
  rt(() => {
    const a = e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      s = e.position.y0 + (e.position.y1 - e.position.y0) / 2;
    o({ x: a, y: s });
  });
  const l = (a) => {
      a.stopPropagation(), e.onMouseDownEdge();
    },
    c = (a) => {
      a.stopPropagation(), e.onClickDeleteEdge();
    },
    n = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    i = (a, s, u, d) => {
      const w = a + 40,
        g = u - 40,
        f = u - a,
        _ = d - s,
        V = 120,
        b = 105,
        E = n();
      function m() {
        return _ > 105 && _ < 135 ? 0 : 10;
      }
      function C() {
        return `
      M ${a} ${s}
      L ${w - 10} ${s}
      Q ${w} ${s} ${w} ${s + 10}
  
      L ${w} ${s + V - 10}
      Q ${w} ${s + V} ${w - 10} ${s + V}
  
      L ${g + 10} ${s + V}
      Q ${g} ${s + V} ${g} ${_ > b ? s + V + m() : s + V - m()}
  
      L ${g} ${_ > b ? d - m() : d + m()}
      Q ${g} ${d} ${g + 10} ${d}
  
      L ${u} ${d}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${a} ${s} C ${a} ${s + E}, ${u} ${d - E}, ${u} ${d}`
        : (e.isNew && e.edgeLength() > 40 && f < 40) || (!e.isNew && f < 40)
        ? C()
        : `M ${a} ${s} C ${a + E} ${s}, ${u - E} ${d}, ${u} ${d}`;
    };
  return (() => {
    var a = wr(),
      s = a.firstChild,
      u = s.nextSibling,
      d = u.nextSibling,
      I = d.firstChild,
      w = I.nextSibling;
    return (
      (u.$$mousedown = l),
      (d.$$mousedown = c),
      z(
        (g) => {
          var f = xe.wrapper,
            _ = `${e.isNew ? xe.edgeNew : xe.edge} ${
              e.typeOfEdge == "dash" ? xe.edgeDash : ""
            }`,
            V = i(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            b = xe.delete,
            E = `translate(${t().x}, ${t().y})`,
            m = xe.circle,
            C = xe.icon;
          return (
            f !== g.e && J(a, "class", (g.e = f)),
            _ !== g.t && J(u, "class", (g.t = _)),
            V !== g.a && J(u, "d", (g.a = V)),
            b !== g.o && J(d, "class", (g.o = b)),
            E !== g.i && J(d, "transform", (g.i = E)),
            m !== g.n && J(I, "class", (g.n = m)),
            C !== g.s && J(w, "class", (g.s = C)),
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
        }
      ),
      a
    );
  })();
};
de(["mousedown"]);
var _r = M(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0">'
  ),
  Ct = M("<div>");
const yr = ({ nodes: e, setNodes: t }) => {
  const [o, r] = L({ x: -1, y: -1 }),
    [l, c] = L(!1),
    {
      draggable: n,
      isCtrlPressed: i,
      isSpacePressed: a,
      scale: s,
      edges: u,
      newEdge: d,
      setEdges: I,
      setNewEdge: w,
      transform: g,
      setTransform: f,
      preTransform: _,
      setPreTransform: V,
      selectedNode: b,
      setSelectedNode: E,
      setLastClickPosition: m,
      setEdgeLength: C,
      setTypeOfVertex: B,
    } = ce(),
    [H, F] = L(null),
    [W, ee] = L(null),
    [U, re] = L(null),
    [he, Oe] = L([]),
    [se, ge] = L(null),
    [Le, Ae] = L(null);
  je(() => {
    const y = (T) => {
      if (T.code === "Delete") {
        if (he() && b() === null)
          he().forEach((k) => {
            const h = e().find((x) => x.id === k);
            h && be(h.id);
          }),
            ge(null);
        else if (b() !== null) {
          const k = e().find((h) => h.id === b());
          k && be(k.id);
        }
      }
    };
    document.addEventListener("keydown", y),
      Me(() => {
        document.removeEventListener("keydown", y);
      });
  });
  function Ze(y) {
    const T = window.innerWidth,
      k = window.innerHeight;
    let h = 0,
      x = 0;
    const v = 60,
      P = 10;
    if (
      (y.clientX < v ? (h = P) : y.clientX > T - v && (h = -10),
      y.clientY < v ? (x = P) : y.clientY > k - v && (x = -10),
      h !== 0 || x !== 0)
    ) {
      if (
        (f(($) => ({ x: $.x + h, y: $.y + x })),
        V(($) => ({ x: $.x + h, y: $.y + x })),
        se()
          ? r(($) => ({ x: $.x - h, y: $.y - x }))
          : r(($) => ({ x: $.x + h, y: $.y + x })),
        se())
      )
        ge(($) => ({
          x: $.x - h / s(),
          y: $.y - x / s(),
          width: $.width,
          height: $.height,
        })),
          he().forEach(($) => {
            const N = e().find((D) => D.id === $);
            if (N) {
              const D = N.currPosition.get();
              N.currPosition.set({ x: D.x - h / s(), y: D.y - x / s() }),
                N.inputEdgeIds.get().forEach((R) => {
                  const A = u().find((X) => X.id === R);
                  if (A) {
                    const X = A.currEndPosition.get();
                    A.currEndPosition.set({
                      x: X.x - h / s(),
                      y: X.y - x / s(),
                    });
                  }
                }),
                N.outputEdgeIds.get().forEach((R) => {
                  const A = u().find((X) => X.id === R);
                  if (A) {
                    const X = A.currStartPosition.get();
                    A.currStartPosition.set({
                      x: X.x - h / s(),
                      y: X.y - x / s(),
                    });
                  }
                });
            }
          });
      else if (b() !== null) {
        const $ = e().find((N) => N.id === b());
        if ($) {
          const N = $.currPosition.get();
          $.currPosition.set({ x: N.x - h / s(), y: N.y - x / s() }),
            $.inputEdgeIds.get().forEach((D) => {
              const R = u().find((A) => A.id === D);
              if (R) {
                const A = R.currEndPosition.get();
                R.currEndPosition.set({ x: A.x - h / s(), y: A.y - x / s() });
              }
            }),
            $.outputEdgeIds.get().forEach((D) => {
              const R = u().find((A) => A.id === D);
              if (R) {
                const A = R.currStartPosition.get();
                R.currStartPosition.set({ x: A.x - h / s(), y: A.y - x / s() });
              }
            });
        }
      }
    }
  }
  const it = (y) => {
      const T = i() || a(),
        k = y.x - o().x,
        h = y.y - o().y;
      if (U()) {
        const x = o(),
          v = y.clientX - x.x,
          P = y.clientY - x.y;
        re({ x: x.x, y: x.y, width: v, height: P });
        const $ = {
            x: Math.min(x.x, y.clientX),
            y: Math.min(x.y, y.clientY),
            width: Math.abs(v),
            height: Math.abs(P),
          },
          N = e().filter((D) => {
            const R = document.getElementById(D.id);
            if (!R) return !1;
            const A = D.currPosition.get().x * s() + g().x,
              X = D.currPosition.get().y * s() + g().y,
              K = R.offsetWidth,
              G = R.offsetHeight;
            return (
              A + K > $.x &&
              A < $.x + $.width &&
              X + G > $.y &&
              X < $.y + $.height
            );
          });
        Oe(N.map((D) => D.id));
      }
      if (se() && Le()) {
        const x = y.clientX - Le().x,
          v = y.clientY - Le().y,
          P = se();
        ge({
          x: P.x + x / s(),
          y: P.y + v / s(),
          width: P.width,
          height: P.height,
        }),
          he().forEach(($) => {
            const N = e().find((D) => D.id === $);
            if (N) {
              const D = N.currPosition.get(),
                R = D.x + x / s(),
                A = D.y + v / s();
              N.currPosition.set({ x: R, y: A }),
                N.inputEdgeIds.get().forEach((X) => {
                  const K = u().find((G) => G.id === X);
                  if (K) {
                    const G = K.currEndPosition.get();
                    K.currEndPosition.set((pe) => ({
                      x: G.x + x / s(),
                      y: G.y + v / s(),
                    }));
                  }
                }),
                N.outputEdgeIds.get().forEach((X) => {
                  const K = u().find((G) => G.id === X);
                  if (K) {
                    const G = K.currStartPosition.get();
                    K.currStartPosition.set((pe) => ({
                      x: G.x + x / s(),
                      y: G.y + v / s(),
                    }));
                  }
                });
            }
          }),
          Ae({ x: y.clientX, y: y.clientY }),
          Ze(y);
      } else if (o().x >= 0 && b() !== null) {
        const x = e().find((v) => v.id === b());
        if (x) {
          x.currPosition.set((v) => ({
            x: (x.prevPosition.get().x + k) / s(),
            y: (x.prevPosition.get().y + h) / s(),
          }));
          for (let v = 0; v < x.inputEdgeIds.get().length; v++) {
            const P = x.inputEdgeIds.get()[v],
              $ = u().find((N) => N.id === P);
            $ &&
              $.currEndPosition.set((N) => ({
                x: ($.prevEndPosition.get().x + k) / s(),
                y: ($.prevEndPosition.get().y + h) / s(),
              }));
          }
          for (let v = 0; v < x.outputEdgeIds.get().length; v++) {
            const P = x.outputEdgeIds.get()[v],
              $ = u().find((N) => N.id === P);
            $ &&
              $.currStartPosition.set((N) => ({
                x: ($.prevStartPosition.get().x + k) / s(),
                y: ($.prevStartPosition.get().y + h) / s(),
              }));
          }
          Ze(y);
        }
      } else if (T && l() && b() === null) {
        y.preventDefault();
        const x = y.x - o().x,
          v = y.y - o().y;
        f({ x: x + _().x, y: v + _().y });
      }
      if (d() !== null) {
        C(Ce());
        const x = document.getElementById("boardWrapper"),
          v = 50;
        if (x) {
          const [P, $] = L(null);
          for (const N of e()) {
            const D = N.isInputVertex || N.isUpVertex;
            if (N.id !== d().nodeStartId && D) {
              console.log(N);
              const R = N.isInputVertex
                  ? N.inputVertexIds[0]
                  : N.upVertexIds[0],
                A = document.getElementById(R),
                {
                  left: X,
                  right: K,
                  top: G,
                  bottom: pe,
                } = A.getBoundingClientRect(),
                at = X + Math.abs(X - K) / 2,
                ht = G + Math.abs(G - pe) / 2,
                gt = y.clientX - at,
                ft = y.clientY - ht;
              if (Math.sqrt(gt * gt + ft * ft) < v) {
                $({ positionX: at, positionY: ht, id: N.id });
                break;
              }
            }
          }
          P() !== null
            ? (d()?.currEndPosition.set({
                x: (P().positionX - g().x) / s(),
                y: (P().positionY - g().y) / s(),
              }),
              ee({
                nodeId: P().id,
                inputIndex: 0,
                positionX: P().positionX,
                positionY: P().positionY,
              }))
            : (ee(null),
              d()?.currEndPosition.set({
                x: (y.x - g().x) / s(),
                y: (y.y - g().y) / s(),
              }));
        }
      }
    },
    ie = () => {
      if ((r({ x: -1, y: -1 }), c(!1), V(g()), U())) {
        const y = U();
        let T = {
          x: Math.min(y.x, y.x + y.width),
          y: Math.min(y.y, y.y + y.height),
          width: Math.abs(y.width),
          height: Math.abs(y.height),
        };
        const k = e().filter((h) => {
          const x = document.getElementById(h.id);
          if (!x) return !1;
          const v = h.currPosition.get().x * s() + g().x,
            P = h.currPosition.get().y * s() + g().y,
            $ = x.offsetWidth,
            N = x.offsetHeight;
          return (
            v + $ > T.x &&
            v < T.x + T.width &&
            P + N > T.y &&
            P < T.y + T.height
          );
        });
        if ((Oe(k.map((h) => h.id)), re(null), k.length > 0)) {
          const h = k.map((N) => {
              const R = document.getElementById(N.id)?.getBoundingClientRect();
              if (!R) return { x: 0, y: 0, width: 0, height: 0 };
              const A = (R.left - g().x) / s(),
                X = (R.top - g().y) / s(),
                K = R.width / s(),
                G = R.height / s();
              return { x: A, y: X, width: K, height: G };
            }),
            x = Math.min(...h.map((N) => N.x)),
            v = Math.min(...h.map((N) => N.y)),
            P = Math.max(...h.map((N) => N.x + N.width)),
            $ = Math.max(...h.map((N) => N.y + N.height));
          ge({ x, y: v, width: P - x, height: $ - v }),
            k.forEach((N) => {
              N.prevPosition.set({
                x: N.currPosition.get().x * s(),
                y: N.currPosition.get().y * s(),
              });
            });
        }
      }
      if (
        (d() !== null && W() === null && w(null), d() !== null && W() !== null)
      ) {
        const y = d().nodeStartId,
          T = W().nodeId;
        console.log(y, "nodeStartId"), console.log(T, "nodeEndId");
        const k = e().find((v) => v.id === y),
          h = e().find((v) => v.id === T),
          x = document.getElementById("boardWrapper");
        if (k && h && x) {
          const v = `edge_${Math.random().toString(36).substring(2, 8)}_${
            k.id
          }_${d()?.outputIndex}_${h.id}_${W()?.inputIndex}`;
          if (
            k.outputEdgeIds.get().includes(v) &&
            h.inputEdgeIds.get().includes(v)
          ) {
            w(null);
            return;
          }
          k.outputEdgeIds.set([...k.outputEdgeIds.get(), v]),
            h.inputEdgeIds.set([...h.inputEdgeIds.get(), v]),
            d().prevStartPosition.set(($) => ({
              x: (d().currStartPosition.get().x - g().x) / s(),
              y: (d().currStartPosition.get().y - g().y) / s(),
            })),
            d().prevEndPosition.set(($) => ({
              x: (W().positionX - g().x) / s(),
              y: (W().positionY - g().y) / s(),
            })),
            d().currEndPosition.set(($) => ({
              x: (W().positionX - g().x) / s(),
              y: (W().positionY - g().y) / s(),
            })),
            I([
              ...u(),
              {
                ...d(),
                id: v,
                nodeEndId: h.id,
                inputVertexId: h.inputVertexIds[0],
                nodeEndInputIndex: W().inputIndex,
              },
            ]);
          const P = e().find(($) => $.id == d()?.nodeStartId);
          P.busyIndex.set([...P.busyIndex.get(), d().outputVertexId]), w(null);
        }
      }
      Ae(null);
    },
    Ge = (y) => {
      m({ x: y.clientX, y: y.clientY }),
        E(null),
        F(null),
        i() || a()
          ? (c(!0), r({ x: y.x, y: y.y }))
          : (r({ x: y.clientX, y: y.clientY }),
            re({ x: y.clientX, y: y.clientY, width: 0, height: 0 }),
            ge(null),
            Oe([]));
    };
  function Z(y, T) {
    E(T), r({ x: y.x, y: y.y });
    const k = e().find((h) => h.id == b());
    if (k) {
      k.prevPosition.set((h) => ({
        x: k.currPosition.get().x * s(),
        y: k.currPosition.get().y * s(),
      }));
      for (let h = 0; h < k.inputEdgeIds.get().length; h++) {
        const x = k.inputEdgeIds.get()[h],
          v = u().find((P) => P.id === x);
        v &&
          v.prevEndPosition.set(() => ({
            x: v.currEndPosition.get().x * s(),
            y: v.currEndPosition.get().y * s(),
          }));
      }
      for (let h = 0; h < k.outputEdgeIds.get().length; h++) {
        const x = k.outputEdgeIds.get()[h],
          v = u().find((P) => P.id === x);
        v &&
          v.prevStartPosition.set(() => ({
            x: v.currStartPosition.get().x * s(),
            y: v.currStartPosition.get().y * s(),
          }));
      }
    }
  }
  function De(y, T, k, h, x, v) {
    if ((E(null), document.getElementById("pane"))) {
      const [$, N] = L({ x: (y - g().x) / s(), y: (T - g().y) / s() }),
        [D, R] = L({ x: (y - g().x) / s(), y: (T - g().y) / s() }),
        [A, X] = L({ x: (y - g().x) / s(), y: (T - g().y) / s() }),
        [K, G] = L({ x: (y - g().x) / s(), y: (T - g().y) / s() });
      w({
        id: "",
        nodeStartId: k,
        outputIndex: h,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: x,
        inputVertexId: "",
        typeOfEdge: v,
        prevStartPosition: { get: $, set: N },
        prevEndPosition: { get: D, set: R },
        currStartPosition: { get: A, set: X },
        currEndPosition: { get: K, set: G },
      });
    }
  }
  function ye(y, T, k, h) {
    ee({ nodeId: k, inputIndex: h, positionX: y, positionY: T });
  }
  function fe(y, T) {
    W()?.nodeId == y && W()?.inputIndex == T && ee(null);
  }
  function ve(y) {
    E(null), F(y);
    const T = u().find((k) => k.id === y);
    T && console.log(T.currStartPosition.get().x, T.currStartPosition.get().y);
  }
  function ze(y) {
    const T = u().find((k) => k.id === y);
    if (T) {
      const k = e().find((v) => v.id == T.nodeStartId);
      k &&
        k.outputEdgeIds.set([...k.outputEdgeIds.get().filter((v) => v !== y)]);
      const h = e().find((v) => v.id === T.nodeEndId);
      h && h.inputEdgeIds.set([...h.inputEdgeIds.get().filter((v) => v !== y)]),
        u().filter((v) => v.outputVertexId === T.outputVertexId).length <= 1 &&
          k &&
          k.busyIndex.set([
            ...k.busyIndex.get().filter((v) => v !== T.outputVertexId),
          ]),
        I([...u().filter((v) => v.id !== y)]);
    }
  }
  function be(y) {
    const T = e().find((P) => P.id == y);
    if (!T) {
      E(null);
      return;
    }
    const k = T.inputEdgeIds.get(),
      h = T.outputEdgeIds.get(),
      v = [...k, ...h].filter((P, $, N) => N.indexOf(P) === $);
    for (let P = 0; P < v.length; P++) {
      const $ = u().find((N) => N.id === v[P]);
      if ($) {
        const N = e().find((A) => A.id === $.nodeStartId),
          D = e().find((A) => A.id === $.nodeEndId);
        N?.outputEdgeIds.set([
          ...N.outputEdgeIds.get().filter((A) => A !== v[P]),
        ]),
          D?.inputEdgeIds.set([
            ...D.inputEdgeIds.get().filter((A) => A !== v[P]),
          ]),
          u().filter((A) => A.outputVertexId === $.outputVertexId).length <=
            1 &&
            N &&
            N.busyIndex.set([
              ...N.busyIndex.get().filter((A) => A !== $.outputVertexId),
            ]),
          I([...u().filter((A) => $.id !== A.id)]);
      }
    }
    t([...e().filter((P) => P.id !== y)]), E(null);
  }
  function Ce() {
    const y = d().currEndPosition.get().x - d().currStartPosition.get().x,
      T = d().currEndPosition.get().y - d().currStartPosition.get().y;
    return Math.sqrt(y * y + T * T);
  }
  return (() => {
    var y = _r(),
      T = y.firstChild,
      k = T.nextSibling;
    return (
      (y.$$mousemove = it),
      (y.$$mouseup = ie),
      (y.$$pointerdown = Ge),
      y.addEventListener("wheel", (h) => h.preventDefault()),
      T.style.setProperty("transform-origin", "top left"),
      S(
        y,
        (() => {
          var h = ne(() => !!U());
          return () =>
            h() &&
            (() => {
              var x = Ct();
              return (
                x.style.setProperty("position", "absolute"),
                x.style.setProperty("border", "1px dashed #00aaff"),
                x.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                x.style.setProperty("z-index", "999"),
                x.style.setProperty("pointer-events", "none"),
                z(
                  (v) => {
                    var P = `${Math.min(U().x, U().x + U().width)}px`,
                      $ = `${Math.min(U().y, U().y + U().height)}px`,
                      N = `${Math.abs(U().width)}px`,
                      D = `${Math.abs(U().height)}px`;
                    return (
                      P !== v.e &&
                        ((v.e = P) != null
                          ? x.style.setProperty("left", P)
                          : x.style.removeProperty("left")),
                      $ !== v.t &&
                        ((v.t = $) != null
                          ? x.style.setProperty("top", $)
                          : x.style.removeProperty("top")),
                      N !== v.a &&
                        ((v.a = N) != null
                          ? x.style.setProperty("width", N)
                          : x.style.removeProperty("width")),
                      D !== v.o &&
                        ((v.o = D) != null
                          ? x.style.setProperty("height", D)
                          : x.style.removeProperty("height")),
                      v
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                x
              );
            })();
        })(),
        k
      ),
      S(
        y,
        (() => {
          var h = ne(() => !!se());
          return () =>
            h() &&
            (() => {
              var x = Ct();
              return (
                (x.$$pointerdown = (v) => {
                  v.stopPropagation(),
                    r({ x: v.clientX, y: v.clientY }),
                    Ae({ x: v.clientX, y: v.clientY });
                }),
                x.style.setProperty("position", "absolute"),
                x.style.setProperty("border", "1px solid #00aaff"),
                x.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                x.style.setProperty("z-index", "998"),
                x.style.setProperty("cursor", "move"),
                x.style.setProperty("transform-origin", "top left"),
                z(
                  (v) => {
                    var P = `${se().x * s() + g().x}px`,
                      $ = `${se().y * s() + g().y}px`,
                      N = `${se().width * s()}px`,
                      D = `${se().height * s()}px`;
                    return (
                      P !== v.e &&
                        ((v.e = P) != null
                          ? x.style.setProperty("left", P)
                          : x.style.removeProperty("left")),
                      $ !== v.t &&
                        ((v.t = $) != null
                          ? x.style.setProperty("top", $)
                          : x.style.removeProperty("top")),
                      N !== v.a &&
                        ((v.a = N) != null
                          ? x.style.setProperty("width", N)
                          : x.style.removeProperty("width")),
                      D !== v.o &&
                        ((v.o = D) != null
                          ? x.style.setProperty("height", D)
                          : x.style.removeProperty("height")),
                      v
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                x
              );
            })();
        })(),
        k
      ),
      k.style.setProperty("transform-origin", "top left"),
      S(
        k,
        O(me, {
          get each() {
            return e();
          },
          children: (h) =>
            O(hr, {
              get id() {
                return h.id;
              },
              get name() {
                return h.name;
              },
              get x() {
                return h.currPosition.get().x;
              },
              get y() {
                return h.currPosition.get().y;
              },
              get numberInputs() {
                return h.numberInputs;
              },
              get numberOutputs() {
                return h.numberOutputs;
              },
              get downVertexNumber() {
                return h.downVertexNumber || 0;
              },
              get upVertexNumber() {
                return h.upVertexNumber || 0;
              },
              get isInputVertex() {
                return h.isInputVertex;
              },
              get isOutputVertex() {
                return h.isOutputVertex;
              },
              get isDownVertex() {
                return h.isDownVertex || !1;
              },
              get isUpVertex() {
                return h.isUpVertex || !1;
              },
              get inputVertexIds() {
                return h.inputVertexIds;
              },
              get outputVertexIds() {
                return h.outputVertexIds;
              },
              get downVertexIds() {
                return h.downVertexIds || [];
              },
              get upVertexIds() {
                return h.upVertexIds || [];
              },
              get downVertexOrientation() {
                return h.downVertexOrientation || "";
              },
              get busyIndex() {
                return h.busyIndex;
              },
              get content() {
                return h.content;
              },
              get selected() {
                return b() == h.id || he().includes(h.id);
              },
              onMouseDownNode: Z,
              onMouseDownOutput: De,
              onMouseEnterInput: ye,
              onMouseLeaveInput: fe,
              onClickDeleteNode: be,
            }),
        }),
        null
      ),
      S(
        k,
        (() => {
          var h = ne(() => d() !== null);
          return () =>
            h() &&
            O(bt, {
              selected: !1,
              isNew: !0,
              edgeLength: () => Ce(),
              get typeOfEdge() {
                return d().typeOfEdge;
              },
              get position() {
                return {
                  x0: d().currStartPosition.get().x,
                  y0: d().currStartPosition.get().y,
                  x1: d().currEndPosition.get().x,
                  y1: d().currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => {},
              onClickDeleteEdge: () => {},
            });
        })(),
        null
      ),
      S(
        k,
        O(me, {
          get each() {
            return u();
          },
          children: (h) =>
            O(bt, {
              get selected() {
                return H() === h.id;
              },
              isNew: !1,
              edgeLength: () => Ce(),
              get typeOfEdge() {
                return h.typeOfEdge;
              },
              get position() {
                return {
                  x0: h.currStartPosition.get().x,
                  y0: h.currStartPosition.get().y,
                  x1: h.currEndPosition.get().x,
                  y1: h.currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => ve(h.id),
              onClickDeleteEdge: () => ze(h.id),
            }),
        }),
        null
      ),
      z(
        (h) => {
          var x = {
              [te["dot-flow__pane"]]: !0,
              [te.draggable]: n(),
              [te.dragging]: l(),
              [te.selection]: !1,
            },
            v = te["dot-flow__background"],
            P = `scale(${s()})`,
            $ = `calc(100vw / ${s()})`,
            N = `calc(100vh / ${s()})`,
            D = `${g().x / s()}px ${g().y / s()}px`,
            R = {
              [te["dot-flow__viewport"]]: !0,
              [te["dot-flow__viewport"]]: !0,
            },
            A = `translate(${g().x}px, ${g().y}px) scale(${s()})`;
          return (
            (h.e = Ue(y, x, h.e)),
            v !== h.t && p(T, (h.t = v)),
            P !== h.a &&
              ((h.a = P) != null
                ? T.style.setProperty("transform", P)
                : T.style.removeProperty("transform")),
            $ !== h.o &&
              ((h.o = $) != null
                ? T.style.setProperty("width", $)
                : T.style.removeProperty("width")),
            N !== h.i &&
              ((h.i = N) != null
                ? T.style.setProperty("height", N)
                : T.style.removeProperty("height")),
            D !== h.n &&
              ((h.n = D) != null
                ? T.style.setProperty("background-position", D)
                : T.style.removeProperty("background-position")),
            (h.s = Ue(k, R, h.s)),
            A !== h.h &&
              ((h.h = A) != null
                ? k.style.setProperty("transform", A)
                : k.style.removeProperty("transform")),
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
          h: void 0,
        }
      ),
      y
    );
  })();
};
de(["pointerdown", "mouseup", "mousemove"]);
const Be = (e) =>
  O(bo.Provider, {
    value: {
      scale: zt,
      setScale: Bt,
      draggable: Mt,
      setDraggable: Tt,
      isCtrlPressed: Ot,
      isSpacePressed: At,
      setIsCtrlPressed: Lt,
      setIsSpacePressed: Dt,
      edges: Ht,
      setEdges: Rt,
      newEdge: Wt,
      setNewEdge: Yt,
      busyIndex: Ft,
      setBusyIndex: Xt,
      edgeLength: Ut,
      setEdgeLength: jt,
      isOpen: qt,
      setIsOpen: Zt,
      inputRef: Gt,
      edgeEnd: Kt,
      setEdgeEnd: Qt,
      transform: Jt,
      setTransform: eo,
      nodes: to,
      setNodes: oo,
      preTransform: no,
      setPreTransform: ro,
      selectedNode: io,
      setSelectedNode: so,
      pendingOutput: lo,
      setPendingOutput: co,
      lastClickPosition: uo,
      setLastClickPosition: ao,
      isShowModal: ho,
      setIsShowModal: go,
      setPositionButton: vo,
      positionButton: fo,
      isModalOpen: mo,
      setIsModalOpen: wo,
      isOpening: po,
      setIsOpening: xo,
      typeOfVertex: _o,
      setTypeOfVertex: yo,
    },
    get children() {
      return e.children;
    },
  });
var br = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const Cr = (e) => br();
var $r = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const Ir = (e) => $r();
var Nr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const Er = ({ height: e = 2, width: t = 2 }) => Nr();
var Vr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const Sr = (e) => Vr();
var Pr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const Co = (e) => Pr();
var kr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const $o = (e) => kr();
var Mr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Io = (e) => Mr();
var Tr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const No = (e) => Tr();
var Or = M(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Eo = (e) => Or();
var Lr = M(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const Vo = (e) => Lr();
var Ar = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const So = (e) => Ar();
var Dr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const Po = (e) => Dr(),
  zr = [
    {
      name: "chat",
      title: "On Chat Message",
      description:
        " Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Ir,
    },
    {
      name: "switch",
      title: "Switch",
      description: "Routes items depending on defined expression or rules",
      icon: Cr,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: Er,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: Sr,
    },
    {
      name: "ai-agent",
      title: "AI Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Co,
    },
    {
      name: "send-email",
      title: "Send Email",
      description: "Send email to a user.",
      icon: $o,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Io,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: No,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Eo,
    },
    {
      name: "gmail-trigger",
      title: "When Chat Message Received",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Vo,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: So,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: Po,
    },
  ];
var Br = M(
  '<div><div><span></span>Data processing...</div><div><input class="border rounded-md px-4 py-2 outline-none border-white"title=backendUrl name=url type=text></div><div>Test WorkFlow'
);
const Hr = (e) => {
  const { nodes: t, edges: o } = ce(),
    [r, l] = L(""),
    [c, n] = L(!1),
    [i, a] = L([]),
    [s, u] = L([]),
    d = async () => {
      n(!0),
        t().forEach((w) => {
          a([
            ...i(),
            {
              id: w.id,
              description: "no description",
              type: w.name,
              parameters: { credentials: "no credentials" },
              position: {
                x: Math.round(w.currPosition.get().x),
                y: Math.round(w.currPosition.get().y),
              },
              inputs: [],
              outputs: [],
            },
          ]);
        }),
        o().forEach((w) => {
          u([
            ...s(),
            {
              id: w.id,
              sourceNodeId: w.nodeStartId,
              sourcePortId: w.outputVertexId,
              targetNodeId: w.nodeEndId,
              targetPortId: w.inputVertexId,
            },
          ]);
        });
      const I = {
        name: "Your workflow",
        description: "no description",
        nodes: i(),
        connections: s(),
      };
      try {
        const w = await fetch(r(), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(I),
        });
        if (!w.ok) throw new Error("Failed to send data");
        const g = await w.json();
        setTimeout(() => {
          console.log(g);
        }, 400);
      } catch (w) {
        console.log(w);
      } finally {
        setTimeout(() => {
          n(!1), a([]), u([]);
        }, 400);
      }
    };
  return (() => {
    var I = Br(),
      w = I.firstChild,
      g = w.firstChild,
      f = w.nextSibling,
      _ = f.firstChild,
      V = f.nextSibling;
    return (
      _.addEventListener("change", (b) => {
        l(b.target.value);
      }),
      (V.$$click = d),
      z(
        (b) => {
          var E = te.testWorkFlow,
            m = `fixed ${
              c() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            C = te.loader,
            B = te.testButton;
          return (
            E !== b.e && p(I, (b.e = E)),
            m !== b.t && p(w, (b.t = m)),
            C !== b.a && p(g, (b.a = C)),
            B !== b.o && p(V, (b.o = B)),
            b
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      I
    );
  })();
};
de(["click"]);
var Rr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const Wr = (e) => Rr();
var Yr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const Fr = (e) => Yr();
var Xr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const Ur = (e) => Xr();
var jr = M(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const qr = (e) => jr();
var Zr = M(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex items-center font-medium text-white gap-x-4"><div class="text-xl text-[#a7a4a4]"></div><div class=text-base>Switch</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const Gr = (e) =>
  (() => {
    var t = Zr(),
      o = t.firstChild,
      r = o.firstChild,
      l = o.nextSibling,
      c = l.firstChild,
      n = c.nextSibling,
      i = n.nextSibling;
    return (
      S(r, O(Wr, {})), S(c, O(Ur, {})), S(n, O(qr, {})), S(i, O(Fr, {})), t
    );
  })();
var Kr = M("<button>");
const ko = ({ title: e, width: t = "w-auto" }) =>
  (() => {
    var o = Kr();
    return (
      p(
        o,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      S(o, e),
      o
    );
  })();
var Qr = M(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg flex-1"><div class="p-4 text-white h-full border-r border-gray-700/30"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input</h3><div class="h-full flex items-center justify-center text-center"><div><p class="font-medium mb-3">No input data yet</p><p class="text-xs text-gray-400 mt-3">(From the earliest node that has no output data yet)'
);
const Jr = (e) =>
  (() => {
    var t = Qr(),
      o = t.firstChild,
      r = o.firstChild,
      l = r.nextSibling,
      c = l.firstChild,
      n = c.firstChild,
      i = n.nextSibling;
    return S(c, O(ko, { title: "Execute previous nodes" }), i), t;
  })();
var ei = M(
    '<button type=button class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"><svg fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7">'
  ),
  ti = M(
    '<ul id=portal-dropdown class="absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700">'
  ),
  oi = M("<li><button>");
const $t = [
    { value: "free", label: "Free Plan" },
    { value: "pro", label: "Pro Plan" },
    { value: "enterprise", label: "Enterprise" },
  ],
  It = () => {
    const [e, t] = L(!1),
      [o, r] = L($t[0]),
      [l, c] = L({ top: 0, left: 0, width: 0 });
    let n;
    const i = () => {
        if (!n) return;
        const u = n.getBoundingClientRect();
        c({
          top: u.bottom + window.scrollY,
          left: u.left + window.scrollX,
          width: u.width,
        }),
          t(!e());
      },
      a = (u) => {
        r(u), t(!1);
      },
      s = (u) => {
        const d = document.getElementById("portal-dropdown");
        d && !d.contains(u.target) && !n?.contains(u.target) && t(!1);
      };
    return (
      je(() => {
        document.addEventListener("click", s);
      }),
      Me(() => {
        document.removeEventListener("click", s);
      }),
      [
        (() => {
          var u = ei(),
            d = u.firstChild;
          u.$$click = i;
          var I = n;
          return (
            typeof I == "function" ? we(I, u) : (n = u),
            S(u, () => o().label, d),
            z(() =>
              J(
                d,
                "class",
                `w-4 h-4 transition-transform ${e() ? "rotate-180" : ""}`
              )
            ),
            u
          );
        })(),
        ne(
          () =>
            ne(() => !!e())() &&
            O(Jo, {
              get children() {
                var u = ti();
                return (
                  S(u, () =>
                    $t.map((d) =>
                      (() => {
                        var I = oi(),
                          w = I.firstChild;
                        return (
                          (w.$$click = () => a(d)),
                          S(w, () => d.label),
                          z(() =>
                            p(
                              w,
                              `w-full text-left px-4 py-2 text-sm hover:bg-[#dad7d742] hover:text-white transition ${
                                o().value === d.value
                                  ? "bg-[#282a39] text-white"
                                  : "text-gray-200"
                              }`
                            )
                          ),
                          I
                        );
                      })()
                    )
                  ),
                  z(
                    (d) => {
                      var I = `${l().top}px`,
                        w = `${l().left}px`,
                        g = `${l().width}px`;
                      return (
                        I !== d.e &&
                          ((d.e = I) != null
                            ? u.style.setProperty("top", I)
                            : u.style.removeProperty("top")),
                        w !== d.t &&
                          ((d.t = w) != null
                            ? u.style.setProperty("left", w)
                            : u.style.removeProperty("left")),
                        g !== d.a &&
                          ((d.a = g) != null
                            ? u.style.setProperty("width", g)
                            : u.style.removeProperty("width")),
                        d
                      );
                    },
                    { e: void 0, t: void 0, a: void 0 }
                  ),
                  u
                );
              },
            })
        ),
      ]
    );
  };
de(["click"]);
var ni = M(
  '<div class><input id=name type=text placeholder="Enter your name"class="w-full px-4 py-2 rounded-md border border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] transition">'
);
const ri = () => ni();
var ii = M(
  '<svg xmlns=http://www.w3.org/2000/svg width=18 height=18 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=10></circle><line x1=15 y1=9 x2=9 y2=15></line><line x1=9 y1=9 x2=15 y2=15>'
);
const si = (e) => ii();
var li = M(
  '<div class="mt-0 px-5 py-4 h-full overflow-y-auto bg-gradient-to-b from-[#2A2A3A] to-[#232333]"><div class=space-y-6><div><label class="text-white text-sm block mb-2">Mode</label> </div><div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible"><h3 class="text-white text-sm mb-4 flex items-center"><span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>Routing Rules</h3><div><div class="flex gap-2 mb-2 items-center"><div class=flex-1> </div><button title=cross class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"></button></div></div><div></div><div class=mt-6><div class="flex items-center mb-2"><span class="text-sm text-gray-300 mr-2">Convert types where required'
);
const di = (e) => (
  L([]),
  (() => {
    var t = li(),
      o = t.firstChild,
      r = o.firstChild,
      l = r.firstChild,
      c = l.nextSibling,
      n = r.nextSibling,
      i = n.firstChild,
      a = i.nextSibling,
      s = a.firstChild,
      u = s.firstChild,
      d = u.firstChild,
      I = u.nextSibling,
      w = a.nextSibling;
    return (
      S(r, O(It, {}), c),
      S(s, O(ri, {}), u),
      S(u, O(It, {}), d),
      S(I, O(si, {})),
      S(w, O(ko, { title: "Add Routing Rule", width: "w-full" })),
      t
    );
  })()
);
var ci = M(
  '<div class="mt-0 px-5 py-4"><div class=text-white><h3 class="text-lg mb-4">Options</h3><p class=text-gray-400>Settings content would go here.'
);
const ui = (e) => ci();
var ai = M(
  '<div class="max-w-[500px] min-w-[500px]"><div class="flex justify-between flex-1 items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium">switch</span></div><button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="flex-1 overflow-hidden"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings'
);
const hi = (e) => {
  const [t, o] = L(0);
  return (() => {
    var r = ai(),
      l = r.firstChild,
      c = l.nextSibling,
      n = c.firstChild,
      i = n.firstChild,
      a = i.firstChild,
      s = a.firstChild,
      u = s.nextSibling;
    return (
      (s.$$click = () => o(0)),
      (u.$$click = () => o(1)),
      S(
        n,
        (() => {
          var d = ne(() => t() == 0);
          return () => (d() ? O(di, {}) : O(ui, {}));
        })(),
        null
      ),
      z(
        (d) => {
          var I = `rounded-none border-b-2 ${
              t() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            w = `rounded-none border-b-2 ${
              t() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`;
          return I !== d.e && p(s, (d.e = I)), w !== d.t && p(u, (d.t = w)), d;
        },
        { e: void 0, t: void 0 }
      ),
      r
    );
  })();
};
de(["click"]);
var gi = M(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full flex-1 rounded-br-lg"><div class="p-4 text-white h-full border-l border-gray-700/30"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output</h3><div class="h-full flex items-center justify-center text-center"><div><p class="font-medium mb-1">Execute this node to view data</p><p class=text-xs>or <a href=# class="text-purple-400 hover:underline">set mock data'
);
const fi = (e) => gi();
var vi = M('<div class="flex items-start flex-1">');
const pi = (e) =>
  (() => {
    var t = vi();
    return (
      S(t, O(Jr, {}), null), S(t, O(hi, {}), null), S(t, O(fi, {}), null), t
    );
  })();
var xi = M(
  '<div id=modal><div class="border border-white/20 rounded-[9px]"><div class="w-[90vw] max-w-[1000px] h-[95vh] max-h-[90vh] border border-purple-500/20 rounded-[9px] flex flex-col">'
);
const mi = (e) => {
  const { isModalOpen: t, setIsModalOpen: o } = ce();
  return (
    rt(() => {}),
    je(() => {
      const r = document.getElementById("modal");
      window.addEventListener("click", (l) => {
        l.target === r && o(!1);
      });
    }),
    (() => {
      var r = xi(),
        l = r.firstChild,
        c = l.firstChild;
      return (
        S(c, O(Gr, {}), null),
        S(c, O(pi, {}), null),
        z(() =>
          p(
            r,
            `fixed inset-0 z-[9999] w-full h-full bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
              t() ? "block" : "hidden"
            }`
          )
        ),
        r
      );
    })()
  );
};
var wi = M(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const _i = ({ node: e }) => {
    const [t, o] = L(),
      {
        nodes: r,
        setNodes: l,
        selectedNode: c,
        setSelectedNode: n,
        pendingOutput: i,
        lastClickPosition: a,
        setEdges: s,
        edges: u,
        transform: d,
        scale: I,
        isShowModal: w,
        setIsModalOpen: g,
      } = ce();
    function f(_) {
      let V = window.innerWidth / 2,
        b = window.innerHeight / 2;
      const E = c(),
        m = i(),
        C = a();
      function B(Z, De = 200, ye = 0) {
        const fe = r().find((ze) => ze.id === Z);
        if ((o(fe), !fe)) return null;
        const ve = fe.currPosition.get();
        return { x: ve.x + De, y: ve.y + ye };
      }
      if (E) {
        let Z = B(E);
        Z && ((V = Z.x), (b = Z.y));
      } else if (m) {
        let Z = B(m.nodeId);
        Z && ((V = Z.x), (b = Z.y));
      } else C && ((V = (C.x - d().x) / I()), (b = (C.y - d().y) / I()));
      const [H, F] = L({ x: V, y: b }),
        [W, ee] = L({ x: V, y: b }),
        [U, re] = L([]),
        [he, Oe] = L([]),
        [se, ge] = L([]),
        Le = [
          ...Array(Number(e[_].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        Ae = [
          ...Array(Number(e[_].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        Ze = [
          ...Array(Number(e[_].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        it = [
          ...Array(Number(e[_].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ];
      ke(() => {
        l([
          ...r(),
          {
            id: `node_${Math.random().toString(36).substring(2, 8)}_${_}`,
            name: _,
            numberInputs: e[_].numberInputs,
            numberOutputs: e[_].numberOutputs,
            isInputVertex: e[_].isInputVertex,
            isOutputVertex: e[_].isOutputVertex,
            inputVertexIds: Le,
            outputVertexIds: Ae,
            isDownVertex: e[_].isDownVertex || !1,
            isUpVertex: e[_].isUpVertex || !1,
            downVertexNumber: e[_].downVertexNumber || 0,
            upVertexNumber: e[_].upVertexNumber || 0,
            downVertexIds: Ze,
            upVertexIds: it,
            downVertexOrientation: e[_].downVertexOrientation,
            busyIndex: { get: se, set: ge },
            content: e[_].content,
            prevPosition: { get: H, set: F },
            currPosition: { get: W, set: ee },
            inputEdgeIds: { get: U, set: re },
            outputEdgeIds: { get: he, set: Oe },
          },
        ]);
      });
      const ie = r()[r().length - 1];
      function Ge(Z = 0) {
        const De = document.getElementById(t().outputVertexIds[Z]),
          {
            left: ye,
            right: fe,
            top: ve,
            bottom: ze,
          } = De.getBoundingClientRect(),
          be = ye + Math.abs(ye - fe) / 2,
          Ce = ve + Math.abs(ve - ze) / 2,
          y = document.getElementById(ie.inputVertexIds[0]),
          { left: T, right: k, top: h, bottom: x } = y.getBoundingClientRect(),
          v = T + Math.abs(T - k) / 2,
          P = h + Math.abs(h - x) / 2,
          [$, N] = L({ x: (be - d().x) / I(), y: (Ce - d().y) / I() }),
          [D, R] = L({ x: (v - d().x) / I(), y: (P - d().y) / I() }),
          [A, X] = L({ x: (be - d().x) / I(), y: (Ce - d().y) / I() }),
          [K, G] = L({ x: (v - d().x) / I(), y: (P - d().y) / I() }),
          pe = `edge_${t().id}_${Z}_${ie.id}_0`;
        t().outputEdgeIds.set([...t().outputEdgeIds.get(), pe]),
          ie.inputEdgeIds.set([...ie.inputEdgeIds.get(), pe]),
          s([
            ...u(),
            {
              id: pe,
              nodeStartId: t().id,
              nodeEndId: ie.id,
              inputIndex: 0,
              typeOfEdge: "solid",
              outputIndex: Z,
              inputVertexId: ie.inputVertexIds[0],
              outputVertexId: t().outputVertexIds[Z],
              prevStartPosition: { get: $, set: N },
              prevEndPosition: { get: D, set: R },
              currStartPosition: { get: A, set: X },
              currEndPosition: { get: K, set: G },
            },
          ]),
          t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[Z]]);
      }
      E
        ? t()?.isOutputVertex && ie.isInputVertex && Ge()
        : m &&
          t()?.isOutputVertex &&
          ie.isInputVertex &&
          Ge(m.outputVertexIndex),
        r().length <= 1 && r()[0].isOutputVertex
          ? n(r()[0].id)
          : t()?.isOutputVertex && ie.isInputVertex && n(ie.id);
    }
    return (() => {
      var _ = wi();
      return (
        S(
          _,
          O(Be, {
            get children() {
              return O(Hr, {});
            },
          }),
          null
        ),
        S(
          _,
          O(Be, {
            get children() {
              return O(mi, {});
            },
          }),
          null
        ),
        S(
          _,
          O(Be, {
            get children() {
              return O(On, { onClickAdd: f, nodeMark: zr });
            },
          }),
          null
        ),
        S(
          _,
          O(Be, {
            get children() {
              return O(fn, {});
            },
          }),
          null
        ),
        S(
          _,
          O(Be, {
            get children() {
              return O(yr, { nodes: r, setNodes: l });
            },
          }),
          null
        ),
        _
      );
    })();
  },
  yi = "_node_4buk8_1",
  bi = "_selectedNode_4buk8_23",
  Ci = "_switchIcon_4buk8_57",
  $i = "_switchNodeText_4buk8_65",
  Ii = "_switchTitle_4buk8_81",
  Ni = "_switchDescription_4buk8_91",
  Ie = {
    node: yi,
    selectedNode: bi,
    switchIcon: Ci,
    switchNodeText: $i,
    switchTitle: Ii,
    switchDescription: Ni,
  };
var Ei = M(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const Vi = (e) =>
    (() => {
      var t = Ei(),
        o = t.firstChild,
        r = o.nextSibling,
        l = r.firstChild,
        c = l.nextSibling;
      return (
        z(
          (n) => {
            var i = e.selected ? Ie.selectedNode : Ie.node,
              a = Ie.switchIcon,
              s = Ie.switchNodeText,
              u = Ie.switchTitle,
              d = Ie.switchDescription;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(o, (n.t = a)),
              s !== n.a && p(r, (n.a = s)),
              u !== n.o && p(l, (n.o = u)),
              d !== n.i && p(c, (n.i = d)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Si = "_testNode_3c9qb_1",
  Pi = "_selectedNode_3c9qb_25",
  ki = "_testNodeIcon_3c9qb_55",
  Mi = "_testNodeTitle_3c9qb_63",
  Ke = { testNode: Si, selectedNode: Pi, testNodeIcon: ki, testNodeTitle: Mi };
var Ti = M(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const Oi = (e) =>
    (() => {
      var t = Ti(),
        o = t.firstChild,
        r = o.nextSibling;
      return (
        z(
          (l) => {
            var c = e.selected ? Ke.selectedNode : Ke.testNode,
              n = Ke.testNodeIcon,
              i = Ke.testNodeTitle;
            return (
              c !== l.e && p(t, (l.e = c)),
              n !== l.t && p(o, (l.t = n)),
              i !== l.a && p(r, (l.a = i)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  Li = "_node_160z5_1",
  Ai = "_selectedNode_160z5_23",
  Di = "_switchIcon_160z5_59",
  zi = "_switchNodeText_160z5_67",
  Bi = "_switchTitle_160z5_83",
  Hi = "_switchDescription_160z5_93",
  Ne = {
    node: Li,
    selectedNode: Ai,
    switchIcon: Di,
    switchNodeText: zi,
    switchTitle: Bi,
    switchDescription: Hi,
  };
var Ri = M(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const Wi = (e) =>
    (() => {
      var t = Ri(),
        o = t.firstChild,
        r = o.nextSibling,
        l = r.firstChild,
        c = l.nextSibling;
      return (
        z(
          (n) => {
            var i = e.selected ? Ne.selectedNode : Ne.node,
              a = Ne.switchIcon,
              s = Ne.switchNodeText,
              u = Ne.switchTitle,
              d = Ne.switchDescription;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(o, (n.t = a)),
              s !== n.a && p(r, (n.a = s)),
              u !== n.o && p(l, (n.o = u)),
              d !== n.i && p(c, (n.i = d)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Yi = "_node_13uy5_1",
  Fi = "_selectedNode_13uy5_25",
  Xi = "_switchIcon_13uy5_59",
  Ui = "_switchNodeText_13uy5_67",
  ji = "_switchTitle_13uy5_83",
  He = {
    node: Yi,
    selectedNode: Fi,
    switchIcon: Xi,
    switchNodeText: Ui,
    switchTitle: ji,
  };
var qi = M(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const Zi = (e) =>
    (() => {
      var t = qi(),
        o = t.firstChild,
        r = o.nextSibling,
        l = r.firstChild;
      return (
        z(
          (c) => {
            var n = e.selected ? He.selectedNode : He.node,
              i = He.switchIcon,
              a = He.switchNodeText,
              s = He.switchTitle;
            return (
              n !== c.e && p(t, (c.e = n)),
              i !== c.t && p(o, (c.t = i)),
              a !== c.a && p(r, (c.a = a)),
              s !== c.o && p(l, (c.o = s)),
              c
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Gi = "_AiAgentNode_go6bf_1",
  Ki = "_selectedNode_go6bf_33",
  Qi = "_AiAgentNodeIcon_go6bf_71",
  Ji = "_AiAgentNodeTitle_go6bf_81",
  es = "_AiAgentNodeDescription_go6bf_95",
  Ee = {
    AiAgentNode: Gi,
    selectedNode: Ki,
    AiAgentNodeIcon: Qi,
    AiAgentNodeTitle: Ji,
    AiAgentNodeDescription: es,
  };
var ts = M("<div><div></div><div><div>AI Agent</div><div>Tools Agent");
const os = (e) =>
    (() => {
      var t = ts(),
        o = t.firstChild,
        r = o.nextSibling,
        l = r.firstChild,
        c = l.nextSibling;
      return (
        S(o, O(Co, {})),
        z(
          (n) => {
            var i = e.selected ? Ee.selectedNode : Ee.AiAgentNode,
              a = Ee.AiAgentNodeIcon,
              s = Ee.AiAgentNodeText,
              u = Ee.AiAgentNodeTitle,
              d = Ee.AiAgentNodeDescription;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(o, (n.t = a)),
              s !== n.a && p(r, (n.a = s)),
              u !== n.o && p(l, (n.o = u)),
              d !== n.i && p(c, (n.i = d)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  ns = "_EmailNode_imw2c_1",
  rs = "_selectedNode_imw2c_23",
  is = "_mailIcon_imw2c_49",
  ss = "_mailNodeText_imw2c_61",
  ls = "_mailTitle_imw2c_77",
  ds = "_mailDescription_imw2c_87",
  Ve = {
    EmailNode: ns,
    selectedNode: rs,
    mailIcon: is,
    mailNodeText: ss,
    mailTitle: ls,
    mailDescription: ds,
  };
var cs = M("<div><div></div><div><div>Send Email</div><div>send");
const us = (e) =>
    (() => {
      var t = cs(),
        o = t.firstChild,
        r = o.nextSibling,
        l = r.firstChild,
        c = l.nextSibling;
      return (
        S(o, O($o, {})),
        z(
          (n) => {
            var i = e.selected ? Ve.selectedNode : Ve.EmailNode,
              a = Ve.mailIcon,
              s = Ve.mailNodeText,
              u = Ve.mailTitle,
              d = Ve.mailDescription;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(o, (n.t = a)),
              s !== n.a && p(r, (n.a = s)),
              u !== n.o && p(l, (n.o = u)),
              d !== n.i && p(c, (n.i = d)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  as = "_VectorStoreNode_omif4_1",
  hs = "_selectedNode_omif4_31",
  gs = "_VectorStoreNodeIcon_omif4_67",
  fs = "_VectorStoreNodeTitle_omif4_77",
  vs = "_VectorStoreNodeText_omif4_97",
  Re = {
    VectorStoreNode: as,
    selectedNode: hs,
    VectorStoreNodeIcon: gs,
    VectorStoreNodeTitle: fs,
    VectorStoreNodeText: vs,
  };
var ps = M(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const xs = (e) =>
    (() => {
      var t = ps(),
        o = t.firstChild,
        r = o.firstChild,
        l = r.nextSibling,
        c = l.firstChild;
      return (
        S(r, O(Io, {})),
        z(
          (n) => {
            var i = e.selected ? Re.selectedNode : Re.VectorStoreNode,
              a = Re.VectorStoreNodeIcon,
              s = Re.VectorStoreNodeText,
              u = Re.VectorStoreNodeTitle;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(r, (n.t = a)),
              s !== n.a && p(l, (n.a = s)),
              u !== n.o && p(c, (n.o = u)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  ms = "_pgVectorNode_4ee5v_1",
  ws = "_selectedNode_4ee5v_31",
  _s = "_pgVectorNodeIcon_4ee5v_67",
  ys = "_pgVectorNodeTitle_4ee5v_77",
  bs = "_pgVectorNodeText_4ee5v_95",
  We = {
    pgVectorNode: ms,
    selectedNode: ws,
    pgVectorNodeIcon: _s,
    pgVectorNodeTitle: ys,
    pgVectorNodeText: bs,
  };
var Cs = M(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const $s = (e) =>
    (() => {
      var t = Cs(),
        o = t.firstChild,
        r = o.firstChild,
        l = r.nextSibling,
        c = l.firstChild;
      return (
        S(r, O(No, {})),
        z(
          (n) => {
            var i = e.selected ? We.selectedNode : We.pgVectorNode,
              a = We.pgVectorNodeIcon,
              s = We.pgVectorNodeText,
              u = We.pgVectorNodeTitle;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(r, (n.t = a)),
              s !== n.a && p(l, (n.a = s)),
              u !== n.o && p(c, (n.o = u)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Is = "_ollamaChatNode_24diw_1",
  Ns = "_selectedNode_24diw_31",
  Es = "_ollamaChatNodeIcon_24diw_67",
  Vs = "_ollamaChatNodeTitle_24diw_77",
  Ss = "_ollamaChatNodeText_24diw_95",
  Ye = {
    ollamaChatNode: Is,
    selectedNode: Ns,
    ollamaChatNodeIcon: Es,
    ollamaChatNodeTitle: Vs,
    ollamaChatNodeText: Ss,
  };
var Ps = M(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const ks = (e) =>
    (() => {
      var t = Ps(),
        o = t.firstChild,
        r = o.firstChild,
        l = r.nextSibling,
        c = l.firstChild;
      return (
        S(r, O(Eo, {})),
        z(
          (n) => {
            var i = e.selected ? Ye.selectedNode : Ye.ollamaChatNode,
              a = Ye.ollamaChatNodeIcon,
              s = Ye.ollamaChatNodeText,
              u = `${Ye.ollamaChatNodeTitle} text-nowrap`;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(r, (n.t = a)),
              s !== n.a && p(l, (n.a = s)),
              u !== n.o && p(c, (n.o = u)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Ms = "_gmailTriggerNode_1hu5j_1",
  Ts = "_selectedNode_1hu5j_25",
  Os = "_gmailTriggerNodeIcon_1hu5j_55",
  Ls = "_gmailTriggerNodeText_1hu5j_65",
  As = "_gmailTriggerNodeTitle_1hu5j_83",
  Ds = "_gmailTriggerNodeDescription_1hu5j_93",
  Se = {
    gmailTriggerNode: Ms,
    selectedNode: Ts,
    gmailTriggerNodeIcon: Os,
    gmailTriggerNodeText: Ls,
    gmailTriggerNodeTitle: As,
    gmailTriggerNodeDescription: Ds,
  };
var zs = M("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const Bs = (e) =>
    (() => {
      var t = zs(),
        o = t.firstChild,
        r = o.nextSibling,
        l = r.firstChild,
        c = l.nextSibling;
      return (
        S(o, O(Vo, {})),
        z(
          (n) => {
            var i = e.selected ? Se.selectedNode : Se.gmailTriggerNode,
              a = Se.gmailTriggerNodeIcon,
              s = Se.gmailTriggerNodeText,
              u = Se.gmailTriggerNodeTitle,
              d = Se.gmailTriggerNodeDescription;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(o, (n.t = a)),
              s !== n.a && p(r, (n.a = s)),
              u !== n.o && p(l, (n.o = u)),
              d !== n.i && p(c, (n.i = d)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Hs = "_createDraftNode_gxi0p_1",
  Rs = "_selectedNode_gxi0p_31",
  Ws = "_createDraftNodeIcon_gxi0p_67",
  Ys = "_createDraftNodeTitle_gxi0p_77",
  Fs = "_createDraftNodeText_gxi0p_95",
  Xs = "_createDraftNodeDescription_gxi0p_115",
  Pe = {
    createDraftNode: Hs,
    selectedNode: Rs,
    createDraftNodeIcon: Ws,
    createDraftNodeTitle: Ys,
    createDraftNodeText: Fs,
    createDraftNodeDescription: Xs,
  };
var Us = M(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const js = (e) =>
    (() => {
      var t = Us(),
        o = t.firstChild,
        r = o.firstChild,
        l = r.nextSibling,
        c = l.firstChild,
        n = c.nextSibling;
      return (
        S(r, O(So, {})),
        z(
          (i) => {
            var a = e.selected ? Pe.selectedNode : Pe.createDraftNode,
              s = Pe.createDraftNodeIcon,
              u = Pe.createDraftNodeText,
              d = `${Pe.createDraftNodeTitle} text-nowrap`,
              I = Pe.createDraftNodeDescription;
            return (
              a !== i.e && p(t, (i.e = a)),
              s !== i.t && p(r, (i.t = s)),
              u !== i.a && p(l, (i.a = u)),
              d !== i.o && p(c, (i.o = d)),
              I !== i.i && p(n, (i.i = I)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  qs = "_embeddingNode_19nxp_1",
  Zs = "_selectedNode_19nxp_31",
  Gs = "_embeddingNodeIcon_19nxp_67",
  Ks = "_embeddingNodeTitle_19nxp_77",
  Qs = "_embeddingNodeText_19nxp_95",
  Fe = {
    embeddingNode: qs,
    selectedNode: Zs,
    embeddingNodeIcon: Gs,
    embeddingNodeTitle: Ks,
    embeddingNodeText: Qs,
  };
var Js = M(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const el = (e) =>
    (() => {
      var t = Js(),
        o = t.firstChild,
        r = o.firstChild,
        l = r.nextSibling,
        c = l.firstChild;
      return (
        S(r, O(Po, {})),
        z(
          (n) => {
            var i = e.selected ? Fe.selectedNode : Fe.embeddingNode,
              a = Fe.embeddingNodeIcon,
              s = Fe.embeddingNodeText,
              u = `${Fe.embeddingNodeTitle} text-nowrap`;
            return (
              i !== n.e && p(t, (n.e = i)),
              a !== n.t && p(r, (n.t = a)),
              s !== n.a && p(l, (n.a = s)),
              u !== n.o && p(c, (n.o = u)),
              n
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  tl = {
    chat: {
      name: "chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Oi,
    },
    switch: {
      name: "switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 3,
      content: Vi,
    },
    edit: {
      name: "edit",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Wi,
    },
    filter: {
      name: "filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Zi,
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
      content: os,
    },
    "send-email": {
      name: "send-email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: us,
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
      content: xs,
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
      content: $s,
    },
    "ollama-chat": {
      name: "ollama-chat",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: ks,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Bs,
    },
    "create-draft": {
      name: "create-draft",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: js,
    },
    embedding: {
      name: "embedding",
      isInputVertex: !1,
      numberInputs: 1,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: el,
    },
  },
  ol = (e) => O(_i, { node: tl }),
  nl = document.getElementById("root");
Zo(() => O(ol, {}), nl);
