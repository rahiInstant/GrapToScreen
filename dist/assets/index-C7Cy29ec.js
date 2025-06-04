(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) a(s);
  new MutationObserver((s) => {
    for (const u of s)
      if (u.type === "childList")
        for (const r of u.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && a(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(s) {
    const u = {};
    return (
      s.integrity && (u.integrity = s.integrity),
      s.referrerPolicy && (u.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (u.credentials = "omit")
        : (u.credentials = "same-origin"),
      u
    );
  }
  function a(s) {
    if (s.ep) return;
    s.ep = !0;
    const u = i(s);
    fetch(s.href, u);
  }
})();
const Ho = !1,
  qo = (e, t) => e === t,
  Uo = Symbol("solid-track"),
  Wt = { equals: qo };
let pl = gl;
const Ye = 1,
  Ht = 2,
  vl = { owned: null, cleanups: null, context: null, owner: null };
var be = null;
let Kt = null,
  jo = null,
  $e = null,
  Ae = null,
  ze = null,
  Yt = 0;
function vt(e, t) {
  const i = $e,
    a = be,
    s = e.length === 0,
    u = t === void 0 ? a : t,
    r = s
      ? vl
      : {
          owned: null,
          cleanups: null,
          context: u ? u.context : null,
          owner: u,
        },
    o = s ? e : () => e(() => We(() => Dt(r)));
  (be = r), ($e = null);
  try {
    return ht(o, !0);
  } finally {
    ($e = i), (be = a);
  }
}
function O(e, t) {
  t = t ? Object.assign({}, Wt, t) : Wt;
  const i = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    a = (s) => (typeof s == "function" && (s = s(i.value)), fl(i, s));
  return [hl.bind(i), a];
}
function R(e, t, i) {
  const a = Sn(e, t, !1, Ye);
  Pt(a);
}
function ke(e, t, i) {
  pl = Qo;
  const a = Sn(e, t, !1, Ye);
  (!i || !i.render) && (a.user = !0), ze ? ze.push(a) : Pt(a);
}
function ne(e, t, i) {
  i = i ? Object.assign({}, Wt, i) : Wt;
  const a = Sn(e, t, !0, 0);
  return (
    (a.observers = null),
    (a.observerSlots = null),
    (a.comparator = i.equals || void 0),
    Pt(a),
    hl.bind(a)
  );
}
function We(e) {
  if ($e === null) return e();
  const t = $e;
  $e = null;
  try {
    return e();
  } finally {
    $e = t;
  }
}
function Ee(e) {
  ke(() => We(e));
}
function De(e) {
  return (
    be === null ||
      (be.cleanups === null ? (be.cleanups = [e]) : be.cleanups.push(e)),
    e
  );
}
function Go() {
  return be;
}
function Xo(e, t) {
  const i = be,
    a = $e;
  (be = e), ($e = null);
  try {
    return ht(t, !0);
  } catch (s) {
    In(s);
  } finally {
    (be = i), ($e = a);
  }
}
function Yo(e, t) {
  const i = Symbol("context");
  return { id: i, Provider: ti(i), defaultValue: e };
}
function Jo(e) {
  let t;
  return be && be.context && (t = be.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function ml(e) {
  const t = ne(e),
    i = ne(() => yn(t()));
  return (
    (i.toArray = () => {
      const a = i();
      return Array.isArray(a) ? a : a != null ? [a] : [];
    }),
    i
  );
}
function hl() {
  if (this.sources && this.state)
    if (this.state === Ye) Pt(this);
    else {
      const e = Ae;
      (Ae = null), ht(() => Ut(this), !1), (Ae = e);
    }
  if ($e) {
    const e = this.observers ? this.observers.length : 0;
    $e.sources
      ? ($e.sources.push(this), $e.sourceSlots.push(e))
      : (($e.sources = [this]), ($e.sourceSlots = [e])),
      this.observers
        ? (this.observers.push($e),
          this.observerSlots.push($e.sources.length - 1))
        : ((this.observers = [$e]),
          (this.observerSlots = [$e.sources.length - 1]));
  }
  return this.value;
}
function fl(e, t, i) {
  let a = e.value;
  return (
    (!e.comparator || !e.comparator(a, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        ht(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const u = e.observers[s],
              r = Kt && Kt.running;
            r && Kt.disposed.has(u),
              (r ? !u.tState : !u.state) &&
                (u.pure ? Ae.push(u) : ze.push(u), u.observers && xl(u)),
              r || (u.state = Ye);
          }
          if (Ae.length > 1e6) throw ((Ae = []), new Error());
        }, !1)),
    t
  );
}
function Pt(e) {
  if (!e.fn) return;
  Dt(e);
  const t = Yt;
  Zo(e, e.value, t);
}
function Zo(e, t, i) {
  let a;
  const s = be,
    u = $e;
  $e = be = e;
  try {
    a = e.fn(t);
  } catch (r) {
    return (
      e.pure &&
        ((e.state = Ye), e.owned && e.owned.forEach(Dt), (e.owned = null)),
      (e.updatedAt = i + 1),
      In(r)
    );
  } finally {
    ($e = u), (be = s);
  }
  (!e.updatedAt || e.updatedAt <= i) &&
    (e.updatedAt != null && "observers" in e ? fl(e, a) : (e.value = a),
    (e.updatedAt = i));
}
function Sn(e, t, i, a = Ye, s) {
  const u = {
    fn: e,
    state: a,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: be,
    context: be ? be.context : null,
    pure: i,
  };
  return (
    be === null ||
      (be !== vl && (be.owned ? be.owned.push(u) : (be.owned = [u]))),
    u
  );
}
function qt(e) {
  if (e.state === 0) return;
  if (e.state === Ht) return Ut(e);
  if (e.suspense && We(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Yt); )
    e.state && t.push(e);
  for (let i = t.length - 1; i >= 0; i--)
    if (((e = t[i]), e.state === Ye)) Pt(e);
    else if (e.state === Ht) {
      const a = Ae;
      (Ae = null), ht(() => Ut(e, t[0]), !1), (Ae = a);
    }
}
function ht(e, t) {
  if (Ae) return e();
  let i = !1;
  t || (Ae = []), ze ? (i = !0) : (ze = []), Yt++;
  try {
    const a = e();
    return Ko(i), a;
  } catch (a) {
    i || (ze = null), (Ae = null), In(a);
  }
}
function Ko(e) {
  if ((Ae && (gl(Ae), (Ae = null)), e)) return;
  const t = ze;
  (ze = null), t.length && ht(() => pl(t), !1);
}
function gl(e) {
  for (let t = 0; t < e.length; t++) qt(e[t]);
}
function Qo(e) {
  let t,
    i = 0;
  for (t = 0; t < e.length; t++) {
    const a = e[t];
    a.user ? (e[i++] = a) : qt(a);
  }
  for (t = 0; t < i; t++) qt(e[t]);
}
function Ut(e, t) {
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const a = e.sources[i];
    if (a.sources) {
      const s = a.state;
      s === Ye
        ? a !== t && (!a.updatedAt || a.updatedAt < Yt) && qt(a)
        : s === Ht && Ut(a, t);
    }
  }
}
function xl(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const i = e.observers[t];
    i.state ||
      ((i.state = Ht), i.pure ? Ae.push(i) : ze.push(i), i.observers && xl(i));
  }
}
function Dt(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const i = e.sources.pop(),
        a = e.sourceSlots.pop(),
        s = i.observers;
      if (s && s.length) {
        const u = s.pop(),
          r = i.observerSlots.pop();
        a < s.length &&
          ((u.sourceSlots[r] = a), (s[a] = u), (i.observerSlots[a] = r));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Dt(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Dt(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function ei(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function In(e, t = be) {
  throw ei(e);
}
function yn(e) {
  if (typeof e == "function" && !e.length) return yn(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let i = 0; i < e.length; i++) {
      const a = yn(e[i]);
      Array.isArray(a) ? t.push.apply(t, a) : t.push(a);
    }
    return t;
  }
  return e;
}
function ti(e, t) {
  return function (a) {
    let s;
    return (
      R(
        () =>
          (s = We(
            () => (
              (be.context = { ...be.context, [e]: a.value }),
              ml(() => a.children)
            )
          )),
        void 0
      ),
      s
    );
  };
}
const ni = Symbol("fallback");
function On(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function li(e, t, i = {}) {
  let a = [],
    s = [],
    u = [],
    r = 0,
    o = t.length > 1 ? [] : null;
  return (
    De(() => On(u)),
    () => {
      let v = e() || [],
        c = v.length,
        p,
        b;
      return (
        v[Uo],
        We(() => {
          let A, N, m, g, w, y, x, f, h;
          if (c === 0)
            r !== 0 &&
              (On(u), (u = []), (a = []), (s = []), (r = 0), o && (o = [])),
              i.fallback &&
                ((a = [ni]),
                (s[0] = vt((E) => ((u[0] = E), i.fallback()))),
                (r = 1));
          else if (r === 0) {
            for (s = new Array(c), b = 0; b < c; b++)
              (a[b] = v[b]), (s[b] = vt(T));
            r = c;
          } else {
            for (
              m = new Array(c),
                g = new Array(c),
                o && (w = new Array(c)),
                y = 0,
                x = Math.min(r, c);
              y < x && a[y] === v[y];
              y++
            );
            for (
              x = r - 1, f = c - 1;
              x >= y && f >= y && a[x] === v[f];
              x--, f--
            )
              (m[f] = s[x]), (g[f] = u[x]), o && (w[f] = o[x]);
            for (A = new Map(), N = new Array(f + 1), b = f; b >= y; b--)
              (h = v[b]),
                (p = A.get(h)),
                (N[b] = p === void 0 ? -1 : p),
                A.set(h, b);
            for (p = y; p <= x; p++)
              (h = a[p]),
                (b = A.get(h)),
                b !== void 0 && b !== -1
                  ? ((m[b] = s[p]),
                    (g[b] = u[p]),
                    o && (w[b] = o[p]),
                    (b = N[b]),
                    A.set(h, b))
                  : u[p]();
            for (b = y; b < c; b++)
              b in m
                ? ((s[b] = m[b]), (u[b] = g[b]), o && ((o[b] = w[b]), o[b](b)))
                : (s[b] = vt(T));
            (s = s.slice(0, (r = c))), (a = v.slice(0));
          }
          return s;
        })
      );
      function T(A) {
        if (((u[b] = A), o)) {
          const [N, m] = O(b);
          return (o[b] = m), t(v[b], N);
        }
        return t(v[b]);
      }
    }
  );
}
function l(e, t) {
  return We(() => e(t || {}));
}
const oi = (e) => `Stale read from <${e}>.`;
function de(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return ne(li(() => e.each, e.children, t || void 0));
}
function Q(e) {
  const t = e.keyed,
    i = ne(() => e.when, void 0, void 0),
    a = t ? i : ne(i, void 0, { equals: (s, u) => !s == !u });
  return ne(
    () => {
      const s = a();
      if (s) {
        const u = e.children;
        return typeof u == "function" && u.length > 0
          ? We(() =>
              u(
                t
                  ? s
                  : () => {
                      if (!We(a)) throw oi("Show");
                      return i();
                    }
              )
            )
          : u;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function ii(e, t, i) {
  let a = i.length,
    s = t.length,
    u = a,
    r = 0,
    o = 0,
    v = t[s - 1].nextSibling,
    c = null;
  for (; r < s || o < u; ) {
    if (t[r] === i[o]) {
      r++, o++;
      continue;
    }
    for (; t[s - 1] === i[u - 1]; ) s--, u--;
    if (s === r) {
      const p = u < a ? (o ? i[o - 1].nextSibling : i[u - o]) : v;
      for (; o < u; ) e.insertBefore(i[o++], p);
    } else if (u === o)
      for (; r < s; ) (!c || !c.has(t[r])) && t[r].remove(), r++;
    else if (t[r] === i[u - 1] && i[o] === t[s - 1]) {
      const p = t[--s].nextSibling;
      e.insertBefore(i[o++], t[r++].nextSibling),
        e.insertBefore(i[--u], p),
        (t[s] = i[u]);
    } else {
      if (!c) {
        c = new Map();
        let b = o;
        for (; b < u; ) c.set(i[b], b++);
      }
      const p = c.get(t[r]);
      if (p != null)
        if (o < p && p < u) {
          let b = r,
            T = 1,
            A;
          for (
            ;
            ++b < s && b < u && !((A = c.get(t[b])) == null || A !== p + T);

          )
            T++;
          if (T > p - o) {
            const N = t[r];
            for (; o < p; ) e.insertBefore(i[o++], N);
          } else e.replaceChild(i[o++], t[r++]);
        } else r++;
      else t[r++].remove();
    }
  }
}
const An = "_$DX_DELEGATE";
function ri(e, t, i, a = {}) {
  let s;
  return (
    vt((u) => {
      (s = u),
        t === document ? e() : n(t, e(), t.firstChild ? null : void 0, i);
    }, a.owner),
    () => {
      s(), (t.textContent = "");
    }
  );
}
function $(e, t, i, a) {
  let s;
  const u = () => {
      const o = document.createElement("template");
      return (o.innerHTML = e), o.content.firstChild;
    },
    r = () => (s || (s = u())).cloneNode(!0);
  return (r.cloneNode = r), r;
}
function he(e, t = window.document) {
  const i = t[An] || (t[An] = new Set());
  for (let a = 0, s = e.length; a < s; a++) {
    const u = e[a];
    i.has(u) || (i.add(u), t.addEventListener(u, ai));
  }
}
function ie(e, t, i) {
  i == null ? e.removeAttribute(t) : e.setAttribute(t, i);
}
function D(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Fe(e, t, i, a) {
  Array.isArray(i)
    ? ((e[`$$${t}`] = i[0]), (e[`$$${t}Data`] = i[1]))
    : (e[`$$${t}`] = i);
}
function He(e, t, i = {}) {
  const a = Object.keys(t || {}),
    s = Object.keys(i);
  let u, r;
  for (u = 0, r = s.length; u < r; u++) {
    const o = s[u];
    !o || o === "undefined" || t[o] || (Dn(e, o, !1), delete i[o]);
  }
  for (u = 0, r = a.length; u < r; u++) {
    const o = a[u],
      v = !!t[o];
    !o || o === "undefined" || i[o] === v || !v || (Dn(e, o, !0), (i[o] = v));
  }
  return i;
}
function ye(e, t, i) {
  return We(() => e(t, i));
}
function n(e, t, i, a) {
  if ((i !== void 0 && !a && (a = []), typeof t != "function"))
    return jt(e, t, a, i);
  R((s) => jt(e, t(), s, i), a);
}
function Dn(e, t, i) {
  const a = t.trim().split(/\s+/);
  for (let s = 0, u = a.length; s < u; s++) e.classList.toggle(a[s], i);
}
function ai(e) {
  let t = e.target;
  const i = `$$${e.type}`,
    a = e.target,
    s = e.currentTarget,
    u = (v) =>
      Object.defineProperty(e, "target", { configurable: !0, value: v }),
    r = () => {
      const v = t[i];
      if (v && !t.disabled) {
        const c = t[`${i}Data`];
        if ((c !== void 0 ? v.call(t, c, e) : v.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(e.target) &&
          u(t.host),
        !0
      );
    },
    o = () => {
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
    const v = e.composedPath();
    u(v[0]);
    for (let c = 0; c < v.length - 2 && ((t = v[c]), !!r()); c++) {
      if (t._$host) {
        (t = t._$host), o();
        break;
      }
      if (t.parentNode === s) break;
    }
  } else o();
  u(a);
}
function jt(e, t, i, a, s) {
  for (; typeof i == "function"; ) i = i();
  if (t === i) return i;
  const u = typeof t,
    r = a !== void 0;
  if (
    ((e = (r && i[0] && i[0].parentNode) || e),
    u === "string" || u === "number")
  ) {
    if (u === "number" && ((t = t.toString()), t === i)) return i;
    if (r) {
      let o = i[0];
      o && o.nodeType === 3
        ? o.data !== t && (o.data = t)
        : (o = document.createTextNode(t)),
        (i = it(e, i, a, o));
    } else
      i !== "" && typeof i == "string"
        ? (i = e.firstChild.data = t)
        : (i = e.textContent = t);
  } else if (t == null || u === "boolean") i = it(e, i, a);
  else {
    if (u === "function")
      return (
        R(() => {
          let o = t();
          for (; typeof o == "function"; ) o = o();
          i = jt(e, o, i, a);
        }),
        () => i
      );
    if (Array.isArray(t)) {
      const o = [],
        v = i && Array.isArray(i);
      if (wn(o, t, i, s)) return R(() => (i = jt(e, o, i, a, !0))), () => i;
      if (o.length === 0) {
        if (((i = it(e, i, a)), r)) return i;
      } else
        v
          ? i.length === 0
            ? kn(e, o, a)
            : ii(e, i, o)
          : (i && it(e), kn(e, o));
      i = o;
    } else if (t.nodeType) {
      if (Array.isArray(i)) {
        if (r) return (i = it(e, i, a, t));
        it(e, i, null, t);
      } else
        i == null || i === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      i = t;
    }
  }
  return i;
}
function wn(e, t, i, a) {
  let s = !1;
  for (let u = 0, r = t.length; u < r; u++) {
    let o = t[u],
      v = i && i[e.length],
      c;
    if (!(o == null || o === !0 || o === !1))
      if ((c = typeof o) == "object" && o.nodeType) e.push(o);
      else if (Array.isArray(o)) s = wn(e, o, v) || s;
      else if (c === "function")
        if (a) {
          for (; typeof o == "function"; ) o = o();
          s =
            wn(e, Array.isArray(o) ? o : [o], Array.isArray(v) ? v : [v]) || s;
        } else e.push(o), (s = !0);
      else {
        const p = String(o);
        v && v.nodeType === 3 && v.data === p
          ? e.push(v)
          : e.push(document.createTextNode(p));
      }
  }
  return s;
}
function kn(e, t, i = null) {
  for (let a = 0, s = t.length; a < s; a++) e.insertBefore(t[a], i);
}
function it(e, t, i, a) {
  if (i === void 0) return (e.textContent = "");
  const s = a || document.createTextNode("");
  if (t.length) {
    let u = !1;
    for (let r = t.length - 1; r >= 0; r--) {
      const o = t[r];
      if (s !== o) {
        const v = o.parentNode === e;
        !u && !r
          ? v
            ? e.replaceChild(s, o)
            : e.insertBefore(s, i)
          : v && o.remove();
      } else u = !0;
    }
  } else e.insertBefore(s, i);
  return [s];
}
const si = "http://www.w3.org/2000/svg";
function di(e, t = !1) {
  return t ? document.createElementNS(si, e) : document.createElement(e);
}
function ci(e) {
  const { useShadow: t } = e,
    i = document.createTextNode(""),
    a = () => e.mount || document.body,
    s = Go();
  let u;
  return (
    ke(
      () => {
        u || (u = Xo(s, () => ne(() => e.children)));
        const r = a();
        if (r instanceof HTMLHeadElement) {
          const [o, v] = O(!1),
            c = () => v(!0);
          vt((p) => n(r, () => (o() ? p() : u()), null)), De(c);
        } else {
          const o = di(e.isSVG ? "g" : "div", e.isSVG),
            v = t && o.attachShadow ? o.attachShadow({ mode: "open" }) : o;
          Object.defineProperty(o, "_$host", {
            get() {
              return i.parentNode;
            },
            configurable: !0,
          }),
            n(v, u),
            r.appendChild(o),
            e.ref && e.ref(o),
            De(() => r.removeChild(o));
        }
      },
      void 0,
      { render: !0 }
    ),
    i
  );
}
const ui = "_draggable_q87cm_71",
  pi = "_dragging_q87cm_79",
  vi = "_selection_q87cm_87",
  mi = "_testWorkFlow_q87cm_245",
  hi = "_loader_q87cm_273",
  fi = "_testButton_q87cm_315",
  gi = "_zoomControl_q87cm_337",
  xi = "_zoomFit_q87cm_355",
  bi = "_zoomIn_q87cm_409",
  yi = "_zoomOut_q87cm_461",
  wi = "_zoomReset_q87cm_513",
  $i = "_zoomResetHide_q87cm_565",
  Oe = {
    "dot-flow__pane": "_dot-flow__pane_q87cm_63",
    draggable: ui,
    dragging: pi,
    selection: vi,
    "dot-flow__viewport": "_dot-flow__viewport_q87cm_97",
    "dot-flow__background": "_dot-flow__background_q87cm_127",
    testWorkFlow: mi,
    loader: hi,
    testButton: fi,
    zoomControl: gi,
    zoomFit: xi,
    zoomIn: bi,
    zoomOut: yi,
    zoomReset: wi,
    zoomResetHide: $i,
  },
  [bl, yl] = O(!1),
  [wl, $l] = O(!1),
  [_l, Tl] = O(!1),
  [Cl, Sl] = O(1),
  [Il, El] = O([]),
  [Nl, Ol] = O(null),
  [Al, Dl] = O([]),
  [kl, Pl] = O(0);
let [Ll, Ml] = O(!1),
  Vl;
const [Fl, Bl] = O({ x: 0, y: 0 }),
  [Rl, zl] = O({ x: 0, y: 0 }),
  [Wl, Hl] = O([]),
  [ql, Ul] = O({ x: 0, y: 0 }),
  [jl, Gl] = O(null),
  [Xl, Yl] = O(null),
  [Jl, Zl] = O(null),
  [Kl, Ql] = O(!1),
  [eo, to] = O({ x: 0, y: 0 }),
  [no, lo] = O(!1),
  [oo, io] = O(!1),
  [ro, ao] = O(!1),
  [so, co] = O(!1),
  [uo, po] = O(""),
  [vo, mo] = O(null),
  [ho, fo] = O({ name: "", id: "", title: "" }),
  [go, xo] = O([]),
  [bo, yo] = O(null),
  [wo, $o] = O({}),
  _o = Yo({
    scale: Cl,
    setScale: Sl,
    draggable: bl,
    setDraggable: yl,
    isCtrlPressed: wl,
    setIsCtrlPressed: $l,
    isSpacePressed: _l,
    setIsSpacePressed: Tl,
    edges: Il,
    setEdges: El,
    newEdge: Nl,
    setNewEdge: Ol,
    busyIndex: Al,
    setBusyIndex: Dl,
    edgeLength: kl,
    setEdgeLength: Pl,
    isOpen: Ll,
    setIsOpen: Ml,
    inputRef: Vl,
    edgeEnd: Fl,
    setEdgeEnd: Bl,
    transform: Rl,
    setTransform: zl,
    nodes: Wl,
    setNodes: Hl,
    preTransform: ql,
    setPreTransform: Ul,
    selectedNode: jl,
    setSelectedNode: Gl,
    pendingOutput: Xl,
    setPendingOutput: Yl,
    lastClickPosition: Jl,
    setLastClickPosition: Zl,
    isShowModal: Kl,
    setIsShowModal: Ql,
    positionButton: eo,
    setPositionButton: to,
    isOpening: no,
    setIsOpening: lo,
    isModalOpen: oo,
    setIsModalOpen: io,
    typeOfVertex: uo,
    setTypeOfVertex: po,
    formConfig: ho,
    setFormConfig: fo,
    isModalOpen2: ro,
    setIsModalOpen2: ao,
    isModalOpen3: so,
    setIsModalOpen3: co,
    credentialOptions: go,
    setCredentialOptions: xo,
    selectedCredential: bo,
    setSelectedCredential: yo,
    formData: wo,
    setFormData: $o,
    settingConfig: vo,
    setSettingConfig: mo,
  }),
  xe = () => {
    const e = Jo(_o);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var _i = $(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const Ti = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: i,
    setIsCtrlPressed: a,
    setIsSpacePressed: s,
    isCtrlPressed: u,
    isSpacePressed: r,
    scale: o,
    setScale: v,
    nodes: c,
    setTransform: p,
    setPreTransform: b,
    transform: T,
  } = xe();
  Ee(() => {
    const g = document.getElementById("pane"),
      w = (x) => {
        x.ctrlKey || (i(!1), a(!1)),
          x.code == "Space" && (x.preventDefault(), s(!1), i(!1));
      },
      y = (x) => {
        x.ctrlKey && (i(!0), a(!0)),
          x.code == "Space" && (x.preventDefault(), s(!0), i(!0));
      };
    if (g) {
      const x = (f) => {
        f.preventDefault(),
          u() || r()
            ? (console.log("good"),
              m(f, () => o() + f.deltaY * -1e-4, "cursor"))
            : f.shiftKey
            ? p((h) => ({ x: h.x - f.deltaY * 0.5, y: h.y }))
            : p((h) => ({ x: h.x, y: h.y - f.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", w),
        document.addEventListener("keydown", y),
        g.addEventListener("wheel", x, { passive: !1 }),
        De(() => {
          document.removeEventListener("keydown", y),
            document.removeEventListener("keyup", w),
            g.removeEventListener("wheel", x);
        });
    }
  });
  function A(g) {
    if (g.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const w = Math.min(...g.map((h) => h.currPosition.get().x)),
      y = Math.min(...g.map((h) => h.currPosition.get().y)),
      x = Math.max(
        ...g.map((h) => {
          const E = document.getElementById(h.id);
          return E
            ? h.currPosition.get().x + E.clientWidth
            : h.currPosition.get().x;
        })
      ),
      f = Math.max(
        ...g.map((h) => {
          const E = document.getElementById(h.id);
          return E
            ? h.currPosition.get().y + E.clientHeight
            : h.currPosition.get().y;
        })
      );
    return { minX: w, minY: y, width: x - w, height: f - y };
  }
  function N() {
    const g = document.getElementById("pane");
    if (!g) return;
    const w = A(c());
    if (!w) return;
    const y = 80,
      x = g.getBoundingClientRect(),
      f = x.width - y * 2,
      h = x.height - y * 2,
      E = f / w.width,
      S = h / w.height,
      I = Math.min(E, S, 1),
      d = w.minX + w.width / 2,
      C = w.minY + w.height / 2,
      _ = x.width / 2 - d * I,
      P = x.height / 2 - C * I;
    v(I), p({ x: _, y: P }), b({ x: _, y: P });
  }
  const m = (g, w, y = "cursor") => {
    const x = document.getElementById("pane");
    if (!x) return;
    g.preventDefault();
    const f = x.getBoundingClientRect(),
      h = y === "cursor" ? g.clientX - f.left : f.width / 2,
      E = y === "cursor" ? g.clientY - f.top : f.height / 2,
      S = o(),
      I = Math.min(Math.max(e, w()), t),
      d = (h - T().x) / S,
      C = (E - T().y) / S,
      _ = h - d * I,
      P = E - C * I;
    v(I), p({ x: _, y: P }), b({ x: _, y: P });
  };
  return (() => {
    var g = _i(),
      w = g.firstChild,
      y = w.nextSibling,
      x = y.nextSibling,
      f = x.nextSibling;
    return (
      (w.$$click = () => N()),
      (y.$$click = (h) => m(h, () => o() + 0.01, "center")),
      (x.$$click = (h) => m(h, () => Math.max(0, o() - 0.01), "center")),
      (f.$$click = (h) =>
        m(h, () => (v(1), p({ x: 0, y: 0 }), b({ x: 0, y: 0 }), 1), "center")),
      R(
        (h) => {
          var E = Oe.zoomControl,
            S = Oe.zoomFit,
            I = Oe.zoomIn,
            d = Oe.zoomOut,
            C = o() > 1 || o() < 1 ? Oe.zoomReset : Oe.zoomResetHide;
          return (
            E !== h.e && D(g, (h.e = E)),
            S !== h.t && D(w, (h.t = S)),
            I !== h.a && D(y, (h.a = I)),
            d !== h.o && D(x, (h.o = d)),
            C !== h.i && D(f, (h.i = C)),
            h
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      g
    );
  })();
};
he(["click"]);
const Ci = "_sidebarMain_dxkxu_1",
  Si = "_addNode_dxkxu_11",
  Ii = "_sidebarContent_dxkxu_71",
  Ei = "_nodeList_dxkxu_99",
  Ni = "_sidebarContentShow_dxkxu_113",
  Oi = "_sidebarContentHide_dxkxu_123",
  Ai = "_sidebarTitle_dxkxu_135",
  Di = "_searchContainer_dxkxu_153",
  ki = "_inputFieldContainer_dxkxu_161",
  Pi = "_inputField_dxkxu_161",
  Li = "_searchIcon_dxkxu_211",
  Mi = "_firstWrapper_dxkxu_229",
  Vi = "_restNodeWrapper_dxkxu_251",
  Fi = "_node_dxkxu_99",
  Bi = "_nodeIcon_dxkxu_299",
  Ri = "_title_dxkxu_311",
  zi = "_description_dxkxu_325",
  Ne = {
    sidebarMain: Ci,
    addNode: Si,
    sidebarContent: Ii,
    nodeList: Ei,
    sidebarContentShow: Ni,
    sidebarContentHide: Oi,
    sidebarTitle: Ai,
    searchContainer: Di,
    inputFieldContainer: ki,
    inputField: Pi,
    searchIcon: Li,
    firstWrapper: Mi,
    restNodeWrapper: Vi,
    node: Fi,
    nodeIcon: Bi,
    title: Ri,
    description: zi,
  };
var Wi = $(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  Hi = $("<div><div><div></div><div><div></div><div>");
const qi = (e) => {
  const { isOpen: t, setIsOpen: i } = xe();
  let a;
  const s = (r) => {
    const o = document.getElementById("sidebar-main"),
      v = document.querySelectorAll('[id^="output-"]');
    let c = !1;
    v.forEach((p) => {
      p.contains(r.target) && (c = !0);
    }),
      o && !o.contains(r.target) && !c && i(!1);
  };
  Ee(() => {
    document.addEventListener("click", s);
  });
  const u = (r, o) => {
    r.stopPropagation(), e.onClickAdd(o);
  };
  return (() => {
    var r = Wi(),
      o = r.firstChild,
      v = o.nextSibling,
      c = v.firstChild,
      p = c.nextSibling,
      b = p.firstChild,
      T = b.firstChild,
      A = T.nextSibling,
      N = p.nextSibling;
    return (
      (o.$$click = (m) => {
        m.stopPropagation(), i(!0), a && a.focus();
      }),
      ye((m) => (a = m), A),
      n(
        N,
        l(de, {
          get each() {
            return e.nodeMark;
          },
          children: (m, g) =>
            (() => {
              var w = Hi(),
                y = w.firstChild,
                x = y.firstChild,
                f = x.nextSibling,
                h = f.firstChild,
                E = h.nextSibling;
              return (
                (w.$$click = (S) => {
                  S.stopPropagation(), u(S, m.name);
                }),
                n(x, l(m.icon, {})),
                n(h, () => m.title),
                n(E, () => m.description),
                R(
                  (S) => {
                    var I = g() == 0 ? Ne.firstWrapper : Ne.restNodeWrapper,
                      d = Ne.node,
                      C = Ne.nodeIcon,
                      _ = Ne.title,
                      P = Ne.description;
                    return (
                      I !== S.e && D(w, (S.e = I)),
                      d !== S.t && D(y, (S.t = d)),
                      C !== S.a && D(x, (S.a = C)),
                      _ !== S.o && D(h, (S.o = _)),
                      P !== S.i && D(E, (S.i = P)),
                      S
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
        (m) => {
          var g = Ne.sidebarMain,
            w = Ne.addNode,
            y = {
              [Ne.sidebarContent]: !0,
              [Ne.sidebarContentShow]: t(),
              [Ne.sidebarContentHide]: !t(),
            },
            x = Ne.sidebarTitle,
            f = Ne.searchContainer,
            h = Ne.inputFieldContainer,
            E = Ne.searchIcon,
            S = Ne.inputField,
            I = Ne.nodeList;
          return (
            g !== m.e && D(r, (m.e = g)),
            w !== m.t && D(o, (m.t = w)),
            (m.a = He(v, y, m.a)),
            x !== m.o && D(c, (m.o = x)),
            f !== m.i && D(p, (m.i = f)),
            h !== m.n && D(b, (m.n = h)),
            E !== m.s && D(T, (m.s = E)),
            S !== m.h && D(A, (m.h = S)),
            I !== m.r && D(N, (m.r = I)),
            m
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
he(["click"]);
const Ui = "_node_1l710_1",
  ji = "_nodeSelected_1l710_33",
  Gi = "_inputsWrapper_1l710_65",
  Xi = "_input_1l710_65",
  Yi = "_inputsUPWrapper_1l710_111",
  Ji = "_inputUp_1l710_141",
  Zi = "_outputsDownWrapper_1l710_167",
  Ki = "_outputDown_1l710_193",
  Qi = "_outputDownVertex_1l710_207",
  er = "_downOutputLine_1l710_225",
  tr = "_downPlusLine_1l710_241",
  nr = "_outputsWrapper_1l710_275",
  lr = "_output_1l710_167",
  or = "_outputCircle_1l710_321",
  ir = "_outputLine_1l710_347",
  rr = "_plusLine_1l710_363",
  ar = "_vertexNum_1l710_383",
  sr = "_plusLineHidden_1l710_449",
  dr = "_outputPlus_1l710_459",
  cr = "_functionWrapper_1l710_551",
  we = {
    node: Ui,
    nodeSelected: ji,
    inputsWrapper: Gi,
    input: Xi,
    inputsUPWrapper: Yi,
    inputUp: Ji,
    outputsDownWrapper: Zi,
    outputDown: Ki,
    outputDownVertex: Qi,
    downOutputLine: er,
    downPlusLine: tr,
    outputsWrapper: nr,
    output: lr,
    outputCircle: or,
    outputLine: ir,
    plusLine: rr,
    vertexNum: ar,
    plusLineHidden: sr,
    outputPlus: dr,
    function: "_function_1l710_517",
    functionWrapper: cr,
  };
var ur = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const Pn = (e) => ur();
var qe = $("<div>"),
  Ln = $("<div><div>"),
  Mn = $("<div><div></div><div><div></div><div id=plus>");
const pr = (e) => {
  const { newEdge: t, edgeLength: i, setIsOpen: a, setPendingOutput: s } = xe();
  function u(v, c) {
    const { left: p, right: b, top: T, bottom: A } = v.getBoundingClientRect(),
      N = p + Math.abs(p - b) / 2,
      m = T + Math.abs(T - A) / 2;
    e.onMouseEnterInput(N, m, e.id, c);
  }
  function r(v) {
    e.onMouseLeaveInput(e.id, v);
  }
  function o(v, c, p, b, T) {
    c.stopPropagation();
    const { left: A, right: N, top: m, bottom: g } = v.getBoundingClientRect(),
      w = A + Math.abs(A - N) / 2,
      y = m + Math.abs(m - g) / 2;
    e.onMouseDownOutput(w, y, e.id, p, b, T);
  }
  return (() => {
    var v = qe();
    return (
      n(
        v,
        (() => {
          var c = ne(() => !!e.isInputVertex);
          return () =>
            c()
              ? (() => {
                  var p = qe();
                  return (
                    n(
                      p,
                      l(de, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (b, T) => {
                          let A = null;
                          return (() => {
                            var N = Ln(),
                              m = N.firstChild;
                            N.addEventListener("mouseleave", () => r(T())),
                              N.addEventListener("mouseenter", () => u(A, T())),
                              ie(N, "id", `input-${b}`);
                            var g = A;
                            return (
                              typeof g == "function" ? ye(g, m) : (A = m),
                              ie(m, "id", b),
                              R(() => D(m, we.input)),
                              N
                            );
                          })();
                        },
                      })
                    ),
                    R(() => D(p, we.inputsWrapper)),
                    p
                  );
                })()
              : qe();
        })(),
        null
      ),
      n(
        v,
        (() => {
          var c = ne(() => !!e.isOutputVertex);
          return () =>
            c() &&
            (() => {
              var p = qe();
              return (
                n(
                  p,
                  l(de, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (b, T) => {
                      let A = null;
                      return (() => {
                        var N = Mn(),
                          m = N.firstChild,
                          g = m.nextSibling,
                          w = g.firstChild,
                          y = w.nextSibling;
                        (N.$$mousedown = (f) => o(A, f, T(), b, "solid")),
                          (N.$$click = (f) => {
                            f.stopPropagation(),
                              a(!0),
                              s({ nodeId: e.id, outputVertexIndex: T() });
                          }),
                          ie(N, "id", `output-${b}`);
                        var x = A;
                        return (
                          typeof x == "function" ? ye(x, m) : (A = m),
                          ie(m, "id", b),
                          n(
                            g,
                            (() => {
                              var f = ne(() => e.numberOutputs > 1);
                              return () =>
                                f() &&
                                (() => {
                                  var h = qe();
                                  return (
                                    n(h, T), R(() => D(h, we.vertexNum)), h
                                  );
                                })();
                            })(),
                            w
                          ),
                          n(y, l(Pn, {})),
                          R(
                            (f) => {
                              var h = we.output,
                                E = we.outputCircle,
                                S = {
                                  [we.plusLine]: !0,
                                  [we.plusLineHidden]:
                                    (t()?.outputVertexId == b && i() > 10) ||
                                    e.busyIndex.get().includes(b),
                                },
                                I = we.outputLine,
                                d = we.outputPlus;
                              return (
                                h !== f.e && D(N, (f.e = h)),
                                E !== f.t && D(m, (f.t = E)),
                                (f.a = He(g, S, f.a)),
                                I !== f.o && D(w, (f.o = I)),
                                d !== f.i && D(y, (f.i = d)),
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
                          N
                        );
                      })();
                    },
                  })
                ),
                R(() => D(p, we.outputsWrapper)),
                p
              );
            })();
        })(),
        null
      ),
      n(
        v,
        (() => {
          var c = ne(() => !!e.isDownVertex);
          return () =>
            c() &&
            (() => {
              var p = qe();
              return (
                n(
                  p,
                  l(de, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (b, T) => {
                      let A = null;
                      return (() => {
                        var N = Mn(),
                          m = N.firstChild,
                          g = m.nextSibling,
                          w = g.firstChild,
                          y = w.nextSibling;
                        (N.$$mousedown = (f) => o(A, f, T(), b, "dash")),
                          (N.$$click = (f) => {
                            f.stopPropagation(),
                              a(!0),
                              s({ nodeId: e.id, outputVertexIndex: T() });
                          }),
                          ie(N, "id", `output-${b}`);
                        var x = A;
                        return (
                          typeof x == "function" ? ye(x, m) : (A = m),
                          ie(m, "id", b),
                          n(y, l(Pn, {})),
                          R(
                            (f) => {
                              var h = we.outputDown,
                                E = we.outputDownVertex,
                                S = {
                                  [we.downPlusLine]: !0,
                                  [we.plusLineHidden]:
                                    (t()?.outputVertexId == b && i() > 10) ||
                                    e.busyIndex.get().includes(b),
                                },
                                I = we.downOutputLine,
                                d = we.outputPlus;
                              return (
                                h !== f.e && D(N, (f.e = h)),
                                E !== f.t && D(m, (f.t = E)),
                                (f.a = He(g, S, f.a)),
                                I !== f.o && D(w, (f.o = I)),
                                d !== f.i && D(y, (f.i = d)),
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
                          N
                        );
                      })();
                    },
                  })
                ),
                R(() => D(p, `${we.outputsDownWrapper} `)),
                p
              );
            })();
        })(),
        null
      ),
      n(
        v,
        (() => {
          var c = ne(() => !!e.isUpVertex);
          return () =>
            c()
              ? (() => {
                  var p = qe();
                  return (
                    n(
                      p,
                      l(de, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (b, T) => {
                          let A = null;
                          return (() => {
                            var N = Ln(),
                              m = N.firstChild;
                            N.addEventListener("mouseleave", () => r(T())),
                              N.addEventListener("mouseenter", () => u(A, T())),
                              ie(N, "id", `input-${b}`);
                            var g = A;
                            return (
                              typeof g == "function" ? ye(g, m) : (A = m),
                              ie(m, "id", b),
                              R(() => D(m, we.inputUp)),
                              N
                            );
                          })();
                        },
                      })
                    ),
                    R(() => D(p, we.inputsUPWrapper)),
                    p
                  );
                })()
              : qe();
        })(),
        null
      ),
      v
    );
  })();
};
he(["click", "mousedown"]);
var vr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const mr = (e) => vr();
var hr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const fr = (e) => hr();
var gr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const xr = (e) => gr();
var br = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const yr = (e) => br(),
  wr = {
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
var $r = $(
  "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
);
const _r = (e) => {
  const {
    setIsShowModal: t,
    isShowModal: i,
    setPositionButton: a,
    setIsOpening: s,
    setIsModalOpen: u,
    setFormConfig: r,
    setSettingConfig: o,
    formConfig: v,
  } = xe();
  return (() => {
    var c = $r(),
      p = c.firstChild,
      b = p.firstChild,
      T = b.firstChild,
      A = T.nextSibling,
      N = A.nextSibling,
      m = N.nextSibling,
      g = p.nextSibling;
    return (
      ye((w) => w, c),
      (c.$$pointerdown = (w) => {
        w.stopPropagation(), e.onMouseDownNode(w, e.id);
      }),
      (c.$$dblclick = () => {
        u(!0),
          console.log(e.name),
          r({ name: e.name, id: e.id, title: e.title }),
          console.log(v()),
          o(wr[e.name]);
      }),
      (T.$$click = (w) => w.stopPropagation()),
      n(T, l(mr, {})),
      (A.$$click = (w) => w.stopPropagation()),
      n(A, l(fr, {})),
      (N.$$pointerdown = (w) => {
        w.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      n(N, l(xr, {})),
      (m.$$click = (w) => w.stopPropagation()),
      n(m, l(yr, {})),
      n(
        g,
        l(e.content, {
          get selected() {
            return e.selected;
          },
          get title() {
            return e.title;
          },
        })
      ),
      n(
        c,
        l(pr, {
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
        (w) => {
          var y = e.id,
            x = e.selected ? we.nodeSelected : we.node,
            f = `translate(${e.x}px, ${e.y}px)`,
            h = we.functionWrapper,
            E = we.function;
          return (
            y !== w.e && ie(c, "id", (w.e = y)),
            x !== w.t && D(c, (w.t = x)),
            f !== w.a &&
              ((w.a = f) != null
                ? c.style.setProperty("transform", f)
                : c.style.removeProperty("transform")),
            h !== w.o && D(p, (w.o = h)),
            E !== w.i && D(b, (w.i = E)),
            w
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      c
    );
  })();
};
he(["dblclick", "pointerdown", "click"]);
const Tr = "_wrapper_gp6p5_1",
  Cr = "_edge_gp6p5_29",
  Sr = "_hitArea_gp6p5_61",
  Ir = "_edgeDash_gp6p5_91",
  Er = "_deleteHidden_gp6p5_111",
  Nr = "_icon_gp6p5_125",
  Or = "_circle_gp6p5_139",
  Ar = "_edgeSelected_gp6p5_177",
  Dr = "_edgeNew_gp6p5_81",
  Ve = {
    wrapper: Tr,
    edge: Cr,
    delete: "_delete_gp6p5_43",
    hitArea: Sr,
    edgeDash: Ir,
    deleteHidden: Er,
    icon: Nr,
    circle: Or,
    edgeSelected: Ar,
    edgeNew: Dr,
  };
var kr = $(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path fill=none stroke=transparent stroke-width=40 style=pointer-events:stroke;></path><path fill=none marker-end=url(#arrowhead) style=pointer-events:none;></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const Vn = (e) => {
  const [t, i] = O({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    [a, s] = O(0);
  ke(() => {
    const c = e.position.x0,
      p = e.position.y0,
      b = e.position.x1,
      T = e.position.y1,
      A = b - c,
      N =
        e.typeOfEdge !== "dash" &&
        ((e.isNew && e.edgeLength() > 40 && A < 40) || (!e.isNew && A < 40));
    let m, g;
    if (N) {
      const w = c + 40,
        y = b - 40,
        x = 120;
      (m = (w + y) / 2), (g = p + x);
    } else (m = c + (b - c) / 2), (g = p + (T - p) / 2);
    i({ x: m, y: g });
  });
  const u = (c) => {
      c.stopPropagation(), e.onMouseDownEdge();
    },
    r = (c) => {
      c.stopPropagation(), e.onClickDeleteEdge();
    },
    o = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    v = (c, p, b, T) => {
      const N = c + 40,
        m = b - 40,
        g = b - c;
      s(g);
      const w = T - p,
        y = 120,
        x = 105,
        f = o();
      function h() {
        return w > 105 && w < 135 ? 0 : 10;
      }
      function E() {
        return `
      M ${c} ${p}
      L ${N - 10} ${p}
      Q ${N} ${p} ${N} ${p + 10}
  
      L ${N} ${p + y - 10}
      Q ${N} ${p + y} ${N - 10} ${p + y}
  
      L ${m + 10} ${p + y}
      Q ${m} ${p + y} ${m} ${w > x ? p + y + h() : p + y - h()}
  
      L ${m} ${w > x ? T - h() : T + h()}
      Q ${m} ${T} ${m + 10} ${T}
  
      L ${b} ${T}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${c} ${p} C ${c} ${p + f}, ${b} ${T - f}, ${b} ${T}`
        : (e.isNew && e.edgeLength() > 40 && g < 40) || (!e.isNew && g < 40)
        ? E()
        : `M ${c} ${p} C ${c + f} ${p}, ${b - f} ${T}, ${b} ${T}`;
    };
  return (() => {
    var c = kr(),
      p = c.firstChild,
      b = p.nextSibling,
      T = b.nextSibling,
      A = T.nextSibling,
      N = A.firstChild,
      m = N.nextSibling;
    return (
      (T.$$mousedown = u),
      (A.$$mousedown = r),
      R(
        (g) => {
          var w = Ve.wrapper,
            y = Ve.hitArea,
            x = v(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            f = `${e.isNew ? Ve.edgeNew : Ve.edge} ${
              e.typeOfEdge == "dash" ? Ve.edgeDash : ""
            } ${e.selected ? Ve.edgeSelected : ""}`,
            h = v(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            E = e.isNew ? Ve.deleteHidden : Ve.delete,
            S = `translate(${t().x}, ${t().y})`,
            I = Ve.circle,
            d = Ve.icon;
          return (
            w !== g.e && ie(c, "class", (g.e = w)),
            y !== g.t && ie(b, "class", (g.t = y)),
            x !== g.a && ie(b, "d", (g.a = x)),
            f !== g.o && ie(T, "class", (g.o = f)),
            h !== g.i && ie(T, "d", (g.i = h)),
            E !== g.n && ie(A, "class", (g.n = E)),
            S !== g.s && ie(A, "transform", (g.s = S)),
            I !== g.h && ie(N, "class", (g.h = I)),
            d !== g.r && ie(m, "class", (g.r = d)),
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
      c
    );
  })();
};
he(["mousedown"]);
var Pr = $(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0">'
  ),
  Fn = $("<div>");
const Lr = () => {
  const [e, t] = O({ x: -1, y: -1 }),
    [i, a] = O(!1),
    {
      draggable: s,
      isCtrlPressed: u,
      isSpacePressed: r,
      scale: o,
      edges: v,
      newEdge: c,
      setEdges: p,
      setNewEdge: b,
      transform: T,
      setTransform: A,
      preTransform: N,
      setPreTransform: m,
      selectedNode: g,
      setSelectedNode: w,
      setLastClickPosition: y,
      setEdgeLength: x,
      nodes: f,
      setNodes: h,
    } = xe();
  ke(() => {
    console.log("from board", f()), console.log(v());
  });
  const [E, S] = O(null),
    [I, d] = O(null),
    [C, _] = O(null),
    [P, z] = O([]),
    [B, W] = O(null),
    [q, V] = O(null);
  Ee(() => {
    const L = (J) => {
      if (J.code === "Delete") {
        if (P() && g() === null)
          P().forEach((Y) => {
            const k = f().find((M) => M.id === Y);
            k && H(k.id);
          }),
            W(null);
        else if (g() !== null) {
          const Y = f().find((k) => k.id === g());
          Y && H(Y.id);
        }
      }
    };
    document.addEventListener("keydown", L),
      De(() => {
        document.removeEventListener("keydown", L);
      });
  });
  function le(L) {
    const J = window.innerWidth,
      Y = window.innerHeight;
    let k = 0,
      M = 0;
    const F = 60,
      oe = 10;
    if (
      (L.clientX < F ? (k = oe) : L.clientX > J - F && (k = -10),
      L.clientY < F ? (M = oe) : L.clientY > Y - F && (M = -10),
      k !== 0 || M !== 0)
    ) {
      if (
        (A((G) => ({ x: G.x + k, y: G.y + M })),
        m((G) => ({ x: G.x + k, y: G.y + M })),
        B()
          ? t((G) => ({ x: G.x - k, y: G.y - M }))
          : t((G) => ({ x: G.x + k, y: G.y + M })),
        B())
      )
        W((G) => ({
          x: G.x - k / o(),
          y: G.y - M / o(),
          width: G.width,
          height: G.height,
        })),
          P().forEach((G) => {
            const X = f().find((ue) => ue.id === G);
            if (X) {
              const ue = X.currPosition.get();
              X.currPosition.set({ x: ue.x - k / o(), y: ue.y - M / o() }),
                X.inputEdgeIds.get().forEach((ve) => {
                  const re = v().find((ge) => ge.id === ve);
                  if (re) {
                    const ge = re.currEndPosition.get();
                    re.currEndPosition.set({
                      x: ge.x - k / o(),
                      y: ge.y - M / o(),
                    });
                  }
                }),
                X.outputEdgeIds.get().forEach((ve) => {
                  const re = v().find((ge) => ge.id === ve);
                  if (re) {
                    const ge = re.currStartPosition.get();
                    re.currStartPosition.set({
                      x: ge.x - k / o(),
                      y: ge.y - M / o(),
                    });
                  }
                });
            }
          });
      else if (g() !== null) {
        const G = f().find((X) => X.id === g());
        if (G) {
          const X = G.currPosition.get();
          G.currPosition.set({ x: X.x - k / o(), y: X.y - M / o() }),
            G.inputEdgeIds.get().forEach((ue) => {
              const ve = v().find((re) => re.id === ue);
              if (ve) {
                const re = ve.currEndPosition.get();
                ve.currEndPosition.set({
                  x: re.x - k / o(),
                  y: re.y - M / o(),
                });
              }
            }),
            G.outputEdgeIds.get().forEach((ue) => {
              const ve = v().find((re) => re.id === ue);
              if (ve) {
                const re = ve.currStartPosition.get();
                ve.currStartPosition.set({
                  x: re.x - k / o(),
                  y: re.y - M / o(),
                });
              }
            });
        }
      }
    }
  }
  const U = (L) => {
      const J = u() || r(),
        Y = L.x - e().x,
        k = L.y - e().y;
      if (C()) {
        const M = e(),
          F = L.clientX - M.x,
          oe = L.clientY - M.y;
        _({ x: M.x, y: M.y, width: F, height: oe });
        const G = {
            x: Math.min(M.x, L.clientX),
            y: Math.min(M.y, L.clientY),
            width: Math.abs(F),
            height: Math.abs(oe),
          },
          X = f().filter((ue) => {
            const ve = document.getElementById(ue.id);
            if (!ve) return !1;
            const re = ue.currPosition.get().x * o() + T().x,
              ge = ue.currPosition.get().y * o() + T().y,
              Ce = ve.offsetWidth,
              Te = ve.offsetHeight;
            return (
              re + Ce > G.x &&
              re < G.x + G.width &&
              ge + Te > G.y &&
              ge < G.y + G.height
            );
          });
        z(X.map((ue) => ue.id));
      }
      if (B() && q()) {
        const M = L.clientX - q().x,
          F = L.clientY - q().y,
          oe = B();
        W({
          x: oe.x + M / o(),
          y: oe.y + F / o(),
          width: oe.width,
          height: oe.height,
        }),
          P().forEach((G) => {
            const X = f().find((ue) => ue.id === G);
            if (X) {
              const ue = X.currPosition.get(),
                ve = ue.x + M / o(),
                re = ue.y + F / o();
              X.currPosition.set({ x: ve, y: re }),
                X.inputEdgeIds.get().forEach((ge) => {
                  const Ce = v().find((Te) => Te.id === ge);
                  if (Ce) {
                    const Te = Ce.currEndPosition.get();
                    Ce.currEndPosition.set(() => ({
                      x: Te.x + M / o(),
                      y: Te.y + F / o(),
                    }));
                  }
                }),
                X.outputEdgeIds.get().forEach((ge) => {
                  const Ce = v().find((Te) => Te.id === ge);
                  if (Ce) {
                    const Te = Ce.currStartPosition.get();
                    Ce.currStartPosition.set(() => ({
                      x: Te.x + M / o(),
                      y: Te.y + F / o(),
                    }));
                  }
                });
            }
          }),
          V({ x: L.clientX, y: L.clientY }),
          le(L);
      } else if (e().x >= 0 && g() !== null) {
        const M = f().find((F) => F.id === g());
        if (M) {
          M.currPosition.set((F) => ({
            x: (M.prevPosition.get().x + Y) / o(),
            y: (M.prevPosition.get().y + k) / o(),
          }));
          for (let F = 0; F < M.inputEdgeIds.get().length; F++) {
            const oe = M.inputEdgeIds.get()[F],
              G = v().find((X) => X.id === oe);
            G &&
              G.currEndPosition.set(() => ({
                x: (G.prevEndPosition.get().x + Y) / o(),
                y: (G.prevEndPosition.get().y + k) / o(),
              }));
          }
          for (let F = 0; F < M.outputEdgeIds.get().length; F++) {
            const oe = M.outputEdgeIds.get()[F],
              G = v().find((X) => X.id === oe);
            G &&
              G.currStartPosition.set(() => ({
                x: (G.prevStartPosition.get().x + Y) / o(),
                y: (G.prevStartPosition.get().y + k) / o(),
              }));
          }
          le(L);
        }
      } else if (J && i() && g() === null) {
        L.preventDefault();
        const M = L.x - e().x,
          F = L.y - e().y;
        A({ x: M + N().x, y: F + N().y });
      }
      if (c() !== null) {
        x(se());
        const M = document.getElementById("boardWrapper"),
          F = 50;
        if (M) {
          const [oe, G] = O(null);
          for (const X of f()) {
            const ue = X.isInputVertex || X.isUpVertex;
            if (X.id !== c().nodeStartId && ue) {
              const ve = X.isInputVertex
                  ? X.inputVertexIds[0]
                  : X.upVertexIds[0],
                re = document.getElementById(ve),
                {
                  left: ge,
                  right: Ce,
                  top: Te,
                  bottom: lt,
                } = re.getBoundingClientRect(),
                ot = ge + Math.abs(ge - Ce) / 2,
                Lt = Te + Math.abs(Te - lt) / 2,
                Mt = L.clientX - ot,
                Vt = L.clientY - Lt;
              if (Math.sqrt(Mt * Mt + Vt * Vt) < F) {
                G({ positionX: ot, positionY: Lt, id: X.id });
                break;
              }
            }
          }
          oe() !== null
            ? (c()?.currEndPosition.set({
                x: (oe().positionX - T().x) / o(),
                y: (oe().positionY - T().y) / o(),
              }),
              d({
                nodeId: oe().id,
                inputIndex: 0,
                positionX: oe().positionX,
                positionY: oe().positionY,
              }))
            : (d(null),
              c()?.currEndPosition.set({
                x: (L.x - T().x) / o(),
                y: (L.y - T().y) / o(),
              }));
        }
      }
    },
    K = () => {
      if ((t({ x: -1, y: -1 }), a(!1), m(T()), C())) {
        const L = C();
        let J = {
          x: Math.min(L.x, L.x + L.width),
          y: Math.min(L.y, L.y + L.height),
          width: Math.abs(L.width),
          height: Math.abs(L.height),
        };
        const Y = f().filter((k) => {
          const M = document.getElementById(k.id);
          if (!M) return !1;
          const F = k.currPosition.get().x * o() + T().x,
            oe = k.currPosition.get().y * o() + T().y,
            G = M.offsetWidth,
            X = M.offsetHeight;
          return (
            F + G > J.x &&
            F < J.x + J.width &&
            oe + X > J.y &&
            oe < J.y + J.height
          );
        });
        if ((z(Y.map((k) => k.id)), _(null), Y.length > 0)) {
          const k = Y.map((X) => {
              const ve = document.getElementById(X.id)?.getBoundingClientRect();
              if (!ve) return { x: 0, y: 0, width: 0, height: 0 };
              const re = (ve.left - T().x) / o(),
                ge = (ve.top - T().y) / o(),
                Ce = ve.width / o(),
                Te = ve.height / o();
              return { x: re, y: ge, width: Ce, height: Te };
            }),
            M = Math.min(...k.map((X) => X.x)),
            F = Math.min(...k.map((X) => X.y)),
            oe = Math.max(...k.map((X) => X.x + X.width)),
            G = Math.max(...k.map((X) => X.y + X.height));
          W({ x: M, y: F, width: oe - M, height: G - F }),
            Y.forEach((X) => {
              X.prevPosition.set({
                x: X.currPosition.get().x * o(),
                y: X.currPosition.get().y * o(),
              });
            });
        }
      }
      if (
        (c() !== null && I() === null && b(null), c() !== null && I() !== null)
      ) {
        const L = c().nodeStartId,
          J = I().nodeId,
          Y = f().find((F) => F.id === L),
          k = f().find((F) => F.id === J),
          M = document.getElementById("boardWrapper");
        if (Y && k && M) {
          const F = `edge_${Math.random().toString(36).substring(2, 8)}_${
            Y.id
          }_${c()?.outputIndex}_${k.id}_${I()?.inputIndex}`;
          if (
            Y.outputEdgeIds.get().includes(F) &&
            k.inputEdgeIds.get().includes(F)
          ) {
            b(null);
            return;
          }
          Y.outputEdgeIds.set([...Y.outputEdgeIds.get(), F]),
            k.inputEdgeIds.set([...k.inputEdgeIds.get(), F]),
            c().prevStartPosition.set(() => ({
              x: (c().currStartPosition.get().x - T().x) / o(),
              y: (c().currStartPosition.get().y - T().y) / o(),
            })),
            c().prevEndPosition.set(() => ({
              x: (I().positionX - T().x) / o(),
              y: (I().positionY - T().y) / o(),
            })),
            c().currEndPosition.set(() => ({
              x: (I().positionX - T().x) / o(),
              y: (I().positionY - T().y) / o(),
            })),
            p([
              ...v(),
              {
                ...c(),
                id: F,
                nodeEndId: k.id,
                inputVertexId: k.inputVertexIds[0],
                nodeEndInputIndex: I().inputIndex,
              },
            ]);
          const oe = f().find((G) => G.id == c()?.nodeStartId);
          oe.busyIndex.set([...oe.busyIndex.get(), c().outputVertexId]),
            b(null);
        }
      }
      V(null);
    },
    ee = (L) => {
      y({ x: L.clientX, y: L.clientY }),
        w(null),
        S(null),
        u() || r()
          ? (a(!0), t({ x: L.x, y: L.y }))
          : (t({ x: L.clientX, y: L.clientY }),
            _({ x: L.clientX, y: L.clientY, width: 0, height: 0 }),
            W(null),
            z([]));
    };
  function pe(L, J) {
    w(J), t({ x: L.x, y: L.y });
    const Y = f().find((k) => k.id == g());
    if (Y) {
      Y.prevPosition.set((k) => ({
        x: Y.currPosition.get().x * o(),
        y: Y.currPosition.get().y * o(),
      }));
      for (let k = 0; k < Y.inputEdgeIds.get().length; k++) {
        const M = Y.inputEdgeIds.get()[k],
          F = v().find((oe) => oe.id === M);
        F &&
          F.prevEndPosition.set(() => ({
            x: F.currEndPosition.get().x * o(),
            y: F.currEndPosition.get().y * o(),
          }));
      }
      for (let k = 0; k < Y.outputEdgeIds.get().length; k++) {
        const M = Y.outputEdgeIds.get()[k],
          F = v().find((oe) => oe.id === M);
        F &&
          F.prevStartPosition.set(() => ({
            x: F.currStartPosition.get().x * o(),
            y: F.currStartPosition.get().y * o(),
          }));
      }
    }
  }
  function te(L, J, Y, k, M, F) {
    if ((w(null), document.getElementById("pane"))) {
      const [G, X] = O({ x: (L - T().x) / o(), y: (J - T().y) / o() }),
        [ue, ve] = O({ x: (L - T().x) / o(), y: (J - T().y) / o() }),
        [re, ge] = O({ x: (L - T().x) / o(), y: (J - T().y) / o() }),
        [Ce, Te] = O({ x: (L - T().x) / o(), y: (J - T().y) / o() });
      b({
        id: "",
        nodeStartId: Y,
        outputIndex: k,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: M,
        inputVertexId: "",
        typeOfEdge: F,
        prevStartPosition: { get: G, set: X },
        prevEndPosition: { get: ue, set: ve },
        currStartPosition: { get: re, set: ge },
        currEndPosition: { get: Ce, set: Te },
      });
    }
  }
  function Z(L, J, Y, k) {
    d({ nodeId: Y, inputIndex: k, positionX: L, positionY: J });
  }
  function ae(L, J) {
    I()?.nodeId == L && I()?.inputIndex == J && d(null);
  }
  function j(L) {
    w(null), S(L);
    const J = v().find((Y) => Y.id === L);
    J && console.log(J.currStartPosition.get().x, J.currStartPosition.get().y);
  }
  function fe(L) {
    const J = v().find((Y) => Y.id === L);
    if (J) {
      const Y = f().find((F) => F.id == J.nodeStartId);
      Y &&
        Y.outputEdgeIds.set([...Y.outputEdgeIds.get().filter((F) => F !== L)]);
      const k = f().find((F) => F.id === J.nodeEndId);
      k && k.inputEdgeIds.set([...k.inputEdgeIds.get().filter((F) => F !== L)]),
        v().filter((F) => F.outputVertexId === J.outputVertexId).length <= 1 &&
          Y &&
          Y.busyIndex.set([
            ...Y.busyIndex.get().filter((F) => F !== J.outputVertexId),
          ]),
        p([...v().filter((F) => F.id !== L)]);
    }
  }
  function H(L) {
    const J = f().find((oe) => oe.id == L);
    if (!J) {
      w(null);
      return;
    }
    const Y = J.inputEdgeIds.get(),
      k = J.outputEdgeIds.get(),
      F = [...Y, ...k].filter((oe, G, X) => X.indexOf(oe) === G);
    for (let oe = 0; oe < F.length; oe++) {
      const G = v().find((X) => X.id === F[oe]);
      if (G) {
        const X = f().find((re) => re.id === G.nodeStartId),
          ue = f().find((re) => re.id === G.nodeEndId);
        X?.outputEdgeIds.set([
          ...X.outputEdgeIds.get().filter((re) => re !== F[oe]),
        ]),
          ue?.inputEdgeIds.set([
            ...ue.inputEdgeIds.get().filter((re) => re !== F[oe]),
          ]),
          v().filter((re) => re.outputVertexId === G.outputVertexId).length <=
            1 &&
            X &&
            X.busyIndex.set([
              ...X.busyIndex.get().filter((re) => re !== G.outputVertexId),
            ]),
          p([...v().filter((re) => G.id !== re.id)]);
      }
    }
    h([...f().filter((oe) => oe.id !== L)]), w(null);
  }
  function se() {
    const L = c().currEndPosition.get().x - c().currStartPosition.get().x,
      J = c().currEndPosition.get().y - c().currStartPosition.get().y;
    return Math.sqrt(L * L + J * J);
  }
  return (() => {
    var L = Pr(),
      J = L.firstChild,
      Y = J.nextSibling;
    return (
      (L.$$mousemove = U),
      (L.$$mouseup = K),
      (L.$$pointerdown = ee),
      L.addEventListener("wheel", (k) => k.preventDefault()),
      J.style.setProperty("transform-origin", "top left"),
      n(
        L,
        (() => {
          var k = ne(() => !!C());
          return () =>
            k() &&
            (() => {
              var M = Fn();
              return (
                M.style.setProperty("position", "absolute"),
                M.style.setProperty("border", "1px dashed #00aaff"),
                M.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                M.style.setProperty("z-index", "999"),
                M.style.setProperty("pointer-events", "none"),
                R(
                  (F) => {
                    var oe = `${Math.min(C().x, C().x + C().width)}px`,
                      G = `${Math.min(C().y, C().y + C().height)}px`,
                      X = `${Math.abs(C().width)}px`,
                      ue = `${Math.abs(C().height)}px`;
                    return (
                      oe !== F.e &&
                        ((F.e = oe) != null
                          ? M.style.setProperty("left", oe)
                          : M.style.removeProperty("left")),
                      G !== F.t &&
                        ((F.t = G) != null
                          ? M.style.setProperty("top", G)
                          : M.style.removeProperty("top")),
                      X !== F.a &&
                        ((F.a = X) != null
                          ? M.style.setProperty("width", X)
                          : M.style.removeProperty("width")),
                      ue !== F.o &&
                        ((F.o = ue) != null
                          ? M.style.setProperty("height", ue)
                          : M.style.removeProperty("height")),
                      F
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                M
              );
            })();
        })(),
        Y
      ),
      n(
        L,
        (() => {
          var k = ne(() => !!B());
          return () =>
            k() &&
            (() => {
              var M = Fn();
              return (
                (M.$$pointerdown = (F) => {
                  F.stopPropagation(),
                    t({ x: F.clientX, y: F.clientY }),
                    V({ x: F.clientX, y: F.clientY });
                }),
                M.style.setProperty("position", "absolute"),
                M.style.setProperty("border", "1px solid #00aaff"),
                M.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                M.style.setProperty("z-index", "998"),
                M.style.setProperty("cursor", "move"),
                M.style.setProperty("transform-origin", "top left"),
                R(
                  (F) => {
                    var oe = `${B().x * o() + T().x}px`,
                      G = `${B().y * o() + T().y}px`,
                      X = `${B().width * o()}px`,
                      ue = `${B().height * o()}px`;
                    return (
                      oe !== F.e &&
                        ((F.e = oe) != null
                          ? M.style.setProperty("left", oe)
                          : M.style.removeProperty("left")),
                      G !== F.t &&
                        ((F.t = G) != null
                          ? M.style.setProperty("top", G)
                          : M.style.removeProperty("top")),
                      X !== F.a &&
                        ((F.a = X) != null
                          ? M.style.setProperty("width", X)
                          : M.style.removeProperty("width")),
                      ue !== F.o &&
                        ((F.o = ue) != null
                          ? M.style.setProperty("height", ue)
                          : M.style.removeProperty("height")),
                      F
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                M
              );
            })();
        })(),
        Y
      ),
      Y.style.setProperty("transform-origin", "top left"),
      n(
        Y,
        l(de, {
          get each() {
            return f();
          },
          children: (k) =>
            l(_r, {
              get id() {
                return k.id;
              },
              get name() {
                return k.name;
              },
              get title() {
                return k.title;
              },
              get x() {
                return k.currPosition.get().x;
              },
              get y() {
                return k.currPosition.get().y;
              },
              get numberInputs() {
                return k.numberInputs;
              },
              get numberOutputs() {
                return k.numberOutputs;
              },
              get downVertexNumber() {
                return k.downVertexNumber || 0;
              },
              get upVertexNumber() {
                return k.upVertexNumber || 0;
              },
              get isInputVertex() {
                return k.isInputVertex;
              },
              get isOutputVertex() {
                return k.isOutputVertex;
              },
              get isDownVertex() {
                return k.isDownVertex || !1;
              },
              get isUpVertex() {
                return k.isUpVertex || !1;
              },
              get inputVertexIds() {
                return k.inputVertexIds;
              },
              get outputVertexIds() {
                return k.outputVertexIds;
              },
              get downVertexIds() {
                return k.downVertexIds || [];
              },
              get upVertexIds() {
                return k.upVertexIds || [];
              },
              get downVertexOrientation() {
                return k.downVertexOrientation || "";
              },
              get busyIndex() {
                return k.busyIndex;
              },
              get content() {
                return k.content;
              },
              get selected() {
                return g() == k.id || P().includes(k.id);
              },
              onMouseDownNode: pe,
              onMouseDownOutput: te,
              onMouseEnterInput: Z,
              onMouseLeaveInput: ae,
              onClickDeleteNode: H,
            }),
        }),
        null
      ),
      n(
        Y,
        (() => {
          var k = ne(() => c() !== null);
          return () =>
            k() &&
            l(Vn, {
              selected: !1,
              isNew: !0,
              edgeLength: () => se(),
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
      n(
        Y,
        l(de, {
          get each() {
            return v();
          },
          children: (k) =>
            l(Vn, {
              get selected() {
                return E() === k.id;
              },
              isNew: !1,
              edgeLength: () => se(),
              get typeOfEdge() {
                return k.typeOfEdge;
              },
              get position() {
                return {
                  x0: k.currStartPosition.get().x,
                  y0: k.currStartPosition.get().y,
                  x1: k.currEndPosition.get().x,
                  y1: k.currEndPosition.get().y,
                };
              },
              onMouseDownEdge: () => j(k.id),
              onClickDeleteEdge: () => fe(k.id),
            }),
        }),
        null
      ),
      R(
        (k) => {
          var M = {
              [Oe["dot-flow__pane"]]: !0,
              [Oe.draggable]: s(),
              [Oe.dragging]: i(),
              [Oe.selection]: !1,
            },
            F = Oe["dot-flow__background"],
            oe = `scale(${o()})`,
            G = `calc(100vw / ${o()})`,
            X = `calc(100vh / ${o()})`,
            ue = `${T().x / o()}px ${T().y / o()}px`,
            ve = {
              [Oe["dot-flow__viewport"]]: !0,
              [Oe["dot-flow__viewport"]]: !0,
            },
            re = `translate(${T().x}px, ${T().y}px) scale(${o()})`;
          return (
            (k.e = He(L, M, k.e)),
            F !== k.t && D(J, (k.t = F)),
            oe !== k.a &&
              ((k.a = oe) != null
                ? J.style.setProperty("transform", oe)
                : J.style.removeProperty("transform")),
            G !== k.o &&
              ((k.o = G) != null
                ? J.style.setProperty("width", G)
                : J.style.removeProperty("width")),
            X !== k.i &&
              ((k.i = X) != null
                ? J.style.setProperty("height", X)
                : J.style.removeProperty("height")),
            ue !== k.n &&
              ((k.n = ue) != null
                ? J.style.setProperty("background-position", ue)
                : J.style.removeProperty("background-position")),
            (k.s = He(Y, ve, k.s)),
            re !== k.h &&
              ((k.h = re) != null
                ? Y.style.setProperty("transform", re)
                : Y.style.removeProperty("transform")),
            k
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
      L
    );
  })();
};
he(["pointerdown", "mouseup", "mousemove"]);
const ft = (e) =>
  l(_o.Provider, {
    value: {
      scale: Cl,
      setScale: Sl,
      draggable: bl,
      setDraggable: yl,
      isCtrlPressed: wl,
      isSpacePressed: _l,
      setIsCtrlPressed: $l,
      setIsSpacePressed: Tl,
      edges: Il,
      setEdges: El,
      newEdge: Nl,
      setNewEdge: Ol,
      busyIndex: Al,
      setBusyIndex: Dl,
      edgeLength: kl,
      setEdgeLength: Pl,
      isOpen: Ll,
      setIsOpen: Ml,
      inputRef: Vl,
      edgeEnd: Fl,
      setEdgeEnd: Bl,
      transform: Rl,
      setTransform: zl,
      nodes: Wl,
      setNodes: Hl,
      preTransform: ql,
      setPreTransform: Ul,
      selectedNode: jl,
      setSelectedNode: Gl,
      pendingOutput: Xl,
      setPendingOutput: Yl,
      lastClickPosition: Jl,
      setLastClickPosition: Zl,
      isShowModal: Kl,
      setIsShowModal: Ql,
      setPositionButton: to,
      positionButton: eo,
      isModalOpen: oo,
      setIsModalOpen: io,
      isOpening: no,
      setIsOpening: lo,
      typeOfVertex: uo,
      setTypeOfVertex: po,
      formConfig: ho,
      setFormConfig: fo,
      isModalOpen2: ro,
      setIsModalOpen2: ao,
      credentialOptions: go,
      setCredentialOptions: xo,
      selectedCredential: bo,
      setSelectedCredential: yo,
      formData: wo,
      setFormData: $o,
      settingConfig: vo,
      setSettingConfig: mo,
      isModalOpen3: so,
      setIsModalOpen3: co,
    },
    get children() {
      return e.children;
    },
  });
var Mr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const Vr = (e) => Mr();
var Fr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const Br = (e) => Fr();
var Rr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const zr = ({ height: e = 2, width: t = 2 }) => Rr();
var Wr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const Hr = (e) => Wr();
var qr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const $n = (e) => qr();
var Ur = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const To = (e) => Ur();
var jr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Co = (e) => jr();
var Gr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const So = (e) => Gr();
var Xr = $(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Io = (e) => Xr();
var Yr = $(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const Eo = (e) => Yr();
var Jr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const No = (e) => Jr();
var Zr = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const Oo = (e) => Zr(),
  Kr = [
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
      icon: Vr,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: zr,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: Hr,
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
      icon: To,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Co,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: So,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Io,
    },
    {
      name: "gmail-trigger",
      title: "Gmail Trigger",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Eo,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: No,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: Oo,
    },
  ];
var Qr = $(
  '<div><div><span></span>Data processing...</div><div><input class="border rounded-md px-4 py-2 outline-none border-white"title=backendUrl name=url type=text></div><button id=allSubmit>Test WorkFlow'
);
const ea = (e) => {
  const { formData: t, nodes: i, edges: a } = xe(),
    [s, u] = O(""),
    [r, o] = O(!1);
  function v() {
    console.log(t());
    const c = new CustomEvent("RAN", { detail: t(), bubbles: !0 }),
      p = document.getElementById("allSubmit");
    p && p.dispatchEvent(c);
  }
  return (() => {
    var c = Qr(),
      p = c.firstChild,
      b = p.firstChild,
      T = p.nextSibling,
      A = T.firstChild,
      N = T.nextSibling;
    return (
      A.addEventListener("change", (m) => u(m.target.value)),
      (N.$$click = v),
      R(
        (m) => {
          var g = Oe.testWorkFlow,
            w = `fixed ${
              r() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            y = Oe.loader,
            x = Oe.testButton;
          return (
            g !== m.e && D(c, (m.e = g)),
            w !== m.t && D(p, (m.t = w)),
            y !== m.a && D(b, (m.a = y)),
            x !== m.o && D(N, (m.o = x)),
            m
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      c
    );
  })();
};
he(["click"]);
var ta = $('<div><div class="border border-white/20 rounded-[9px] flex"><div>');
const Qt = (e) => {
  let t;
  const i = e.zIndex ?? 9999,
    a = e.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";
  return (
    Ee(() => {
      const s = (u) => {
        u.target === t && e.onClose();
      };
      return (
        window.addEventListener("click", s),
        () => window.removeEventListener("click", s)
      );
    }),
    (() => {
      var s = ta(),
        u = s.firstChild,
        r = u.firstChild,
        o = t;
      return (
        typeof o == "function" ? ye(o, s) : (t = s),
        i != null
          ? s.style.setProperty("z-index", i)
          : s.style.removeProperty("z-index"),
        D(r, `${a} border border-purple-500/20 rounded-[9px] flex flex-col`),
        n(r, () => e.children),
        R(() =>
          D(
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
var na = $('<span class=text-yellow-300>"<!>"'),
  la = $("<span class=text-cyan-300>"),
  oa = $("<span class=text-pink-300>"),
  ia = $("<span class=text-gray-400>null"),
  ra = $('<div class="text-purple-400 cursor-pointer select-none">'),
  aa = $("<div class=text-purple-400>}"),
  sa = $(
    '<div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">'
  ),
  da = $("<span>[<!>]"),
  ca = $("<span>["),
  ua = $("<div>]"),
  pa = $("<div>"),
  va = $(
    '<div><span class=text-green-400>"<!>"</span><span class=text-white>: '
  );
const Gt = ({ data: e, indent: t = 0 }) => {
  const [i, a] = O(!1),
    s = `${t * 5}px`,
    u = () => a(!i()),
    r = (c) => typeof c == "object" && c !== null && !Array.isArray(c),
    o = Array.isArray,
    v = (c) =>
      typeof c == "string"
        ? (() => {
            var p = na(),
              b = p.firstChild,
              T = b.nextSibling;
            return T.nextSibling, n(p, c, T), p;
          })()
        : typeof c == "number"
        ? (() => {
            var p = la();
            return n(p, c), p;
          })()
        : typeof c == "boolean"
        ? (() => {
            var p = oa();
            return n(p, () => c.toString()), p;
          })()
        : c === null
        ? ia()
        : l(Gt, { data: c, indent: t + 1 });
  return (() => {
    var c = sa();
    return (
      n(
        c,
        l(Q, {
          get when() {
            return r(e);
          },
          get fallback() {
            return l(Q, {
              get when() {
                return o(e);
              },
              get fallback() {
                return v(e);
              },
              get children() {
                return ne(() => !!e.every((p) => typeof p != "object"))()
                  ? (() => {
                      var p = da(),
                        b = p.firstChild,
                        T = b.nextSibling;
                      return (
                        T.nextSibling,
                        n(
                          p,
                          l(de, {
                            each: e,
                            children: (A, N) => [
                              ne(() => v(A)),
                              ne(() => (N() < e.length - 1 ? ", " : "")),
                            ],
                          }),
                          T
                        ),
                        p
                      );
                    })()
                  : [
                      (() => {
                        var p = ca();
                        return (
                          s != null
                            ? p.style.setProperty("padding-left", s)
                            : p.style.removeProperty("padding-left"),
                          p
                        );
                      })(),
                      l(de, {
                        each: e,
                        children: (p, b) =>
                          (() => {
                            var T = pa();
                            return (
                              `${(t + 1) * 4}px` != null
                                ? T.style.setProperty(
                                    "padding-left",
                                    `${(t + 1) * 4}px`
                                  )
                                : T.style.removeProperty("padding-left"),
                              n(T, l(Gt, { data: p, indent: t + 1 }), null),
                              n(T, () => (b() < e.length - 1 ? "," : ""), null),
                              T
                            );
                          })(),
                      }),
                      (() => {
                        var p = ua();
                        return (
                          s != null
                            ? p.style.setProperty("padding-left", s)
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
                var p = ra();
                return (
                  (p.$$click = u),
                  s != null
                    ? p.style.setProperty("padding-left", s)
                    : p.style.removeProperty("padding-left"),
                  n(p, () => (i() ? "{...}" : "{")),
                  p
                );
              })(),
              l(Q, {
                get when() {
                  return !i();
                },
                get children() {
                  return [
                    l(de, {
                      get each() {
                        return Object.entries(e);
                      },
                      children: ([p, b], T) =>
                        (() => {
                          var A = va(),
                            N = A.firstChild,
                            m = N.firstChild,
                            g = m.nextSibling;
                          return (
                            g.nextSibling,
                            N.nextSibling,
                            `${(t + 1) * 4}px` != null
                              ? A.style.setProperty(
                                  "padding-left",
                                  `${(t + 1) * 4}px`
                                )
                              : A.style.removeProperty("padding-left"),
                            n(N, p, g),
                            n(A, () => v(b), null),
                            n(
                              A,
                              () =>
                                T() < Object.entries(e).length - 1 ? "," : "",
                              null
                            ),
                            A
                          );
                        })(),
                    }),
                    (() => {
                      var p = aa();
                      return (
                        s != null
                          ? p.style.setProperty("padding-left", s)
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
      c
    );
  })();
};
he(["click"]);
const ma = "_leftPanel_kuca9_1",
  ha = { leftPanel: ma };
var fa = $(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full "><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input'
);
const ga = (e) =>
    (() => {
      var t = fa(),
        i = t.firstChild;
      return (
        i.firstChild,
        n(
          i,
          l(Gt, {
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
        R((a) => He(t, { [ha.leftPanel]: !0 }, a)),
        t
      );
    })(),
  xa = "_midPanel_u0ucm_1",
  Ao = { midPanel: xa };
var ba = $("<div class>"),
  ya = $(
    '<div class="w-3 h-3 rounded-full bg-[#dbdbdd] text-xs text-black flex items-center justify-center font-semibold select-none">?'
  ),
  Bn = $("<div>");
const Be = (e) => {
  const [t, i] = O(!1),
    a = () => (e.visible !== void 0 ? e.visible : t()),
    [s, u] = O({ x: 0, y: 0 }),
    [r, o] = O(e.placement || "top");
  let v, c, p, b;
  const T = (d) => {
      const C = d.length;
      return C <= 50
        ? "max-w-xs"
        : C <= 120
        ? "max-w-sm"
        : C <= 200
        ? "max-w-md"
        : "max-w-lg";
    },
    A = () => {
      if (!v || !c) return;
      const d = v.getBoundingClientRect(),
        C = c.getBoundingClientRect(),
        _ = {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        },
        P = 8;
      let z = e.placement || "top";
      const B = {
        top: {
          x: d.left + d.width / 2 - C.width / 2 + _.scrollX,
          y: d.top - C.height - P + _.scrollY,
        },
        bottom: {
          x: d.left + d.width / 2 - C.width / 2 + _.scrollX,
          y: d.bottom + P + _.scrollY,
        },
        left: {
          x: d.left - C.width - P + _.scrollX,
          y: d.top + d.height / 2 - C.height / 2 + _.scrollY,
        },
        right: {
          x: d.right + P + _.scrollX,
          y: d.top + d.height / 2 - C.height / 2 + _.scrollY,
        },
      };
      let W = B[z];
      z === "top" && W.y < _.scrollY
        ? ((z = "bottom"), (W = B.bottom))
        : z === "bottom" && W.y + C.height > _.height + _.scrollY
        ? ((z = "top"), (W = B.top))
        : z === "left" && W.x < _.scrollX
        ? ((z = "right"), (W = B.right))
        : z === "right" &&
          W.x + C.width > _.width + _.scrollX &&
          ((z = "left"), (W = B.left)),
        W.x < _.scrollX
          ? (W.x = _.scrollX + P)
          : W.x + C.width > _.width + _.scrollX &&
            (W.x = _.width + _.scrollX - C.width - P),
        W.y < _.scrollY
          ? (W.y = _.scrollY + P)
          : W.y + C.height > _.height + _.scrollY &&
            (W.y = _.height + _.scrollY - C.height - P),
        u({ x: W.x, y: W.y }),
        o(z);
    },
    N = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!0);
        return;
      }
      b && clearTimeout(b),
        (p = setTimeout(() => {
          i(!0), setTimeout(A, 0);
        }, e.delay || 200));
    },
    m = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!1);
        return;
      }
      p && clearTimeout(p),
        (b = setTimeout(() => {
          i(!1);
        }, e.hideDelay || 100));
    },
    g = () => {
      e.disableHover || N();
    },
    w = () => {
      e.disableHover || m();
    },
    y = () => {
      e.disableHover || N();
    },
    x = () => {
      e.disableHover || m();
    },
    f = () => {
      a() && setTimeout(A, 0);
    };
  let h = a();
  const E = () => {
      const d = a();
      d !== h && d && f(), (h = d);
    },
    S = () => {
      a() && A();
    };
  Ee(() => {
    window.addEventListener("scroll", S, { passive: !0 }),
      window.addEventListener("resize", S, { passive: !0 });
    const d = setInterval(E, 16);
    De(() => {
      clearInterval(d);
    });
  }),
    De(() => {
      p && clearTimeout(p),
        b && clearTimeout(b),
        window.removeEventListener("scroll", S),
        window.removeEventListener("resize", S);
    });
  const I = () => {
    const d = "absolute w-2 h-2 bg-[#464668] transform rotate-45";
    switch (r()) {
      case "top":
        return `${d} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${d} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${d} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${d} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return d;
    }
  };
  return [
    (() => {
      var d = ba();
      d.addEventListener("blur", x),
        d.addEventListener("focus", y),
        d.addEventListener("mouseleave", w),
        d.addEventListener("mouseenter", g);
      var C = v;
      return (
        typeof C == "function" ? ye(C, d) : (v = d),
        n(
          d,
          (() => {
            var _ = ne(() => !!e.children);
            return () => (_() ? e.children : ya());
          })()
        ),
        R(() => ie(d, "tabindex", e.focusable ? 0 : void 0)),
        d
      );
    })(),
    ne(
      () =>
        ne(() => !!a())() &&
        l(ci, {
          get children() {
            var d = Bn(),
              C = c;
            return (
              typeof C == "function" ? ye(C, d) : (c = d),
              n(d, () => e.content, null),
              n(
                d,
                (() => {
                  var _ = ne(() => e.showArrow !== !1);
                  return () =>
                    _() &&
                    (() => {
                      var P = Bn();
                      return R(() => D(P, I())), P;
                    })();
                })(),
                null
              ),
              R(
                (_) => {
                  var P = `
              fixed z-50 px-3 py-2 text-sm text-[#c9c9db] bg-[#464668] rounded-lg shadow-lg
              pointer-events-none select-none whitespace-pre-wrap break-words
              ${T(e.content || "")}
              transition-opacity duration-200
            `,
                    z = `${s().x}px`,
                    B = `${s().y}px`,
                    W = a() ? 1 : 0;
                  return (
                    P !== _.e && D(d, (_.e = P)),
                    z !== _.t &&
                      ((_.t = z) != null
                        ? d.style.setProperty("left", z)
                        : d.style.removeProperty("left")),
                    B !== _.a &&
                      ((_.a = B) != null
                        ? d.style.setProperty("top", B)
                        : d.style.removeProperty("top")),
                    W !== _.o &&
                      ((_.o = W) != null
                        ? d.style.setProperty("opacity", W)
                        : d.style.removeProperty("opacity")),
                    _
                  );
                },
                { e: void 0, t: void 0, a: void 0, o: void 0 }
              ),
              d
            );
          },
        })
    ),
  ];
};
var wa = $(
    '<div class="text-white bg-[#1e1e2f] p-2 rounded w-full"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><div class="text-sm flex items-center gap-1 group"></div><div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">Reset value</div></div><label class="relative inline-block w-12 h-6"><input title=switch type=checkbox class="sr-only peer"><div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6">'
  ),
  $a = $("<label class=label>"),
  _a = $("<div class=toolTipBtn>");
const Ie = (e) => {
  const t = (i) => {
    e.onChange?.(i.target.checked);
  };
  return (
    Ee(() => {
      e.onChange?.(!1);
    }),
    (() => {
      var i = wa(),
        a = i.firstChild,
        s = a.firstChild,
        u = s.firstChild,
        r = s.nextSibling,
        o = r.firstChild;
      return (
        n(
          u,
          (() => {
            var v = ne(() => !!e.title);
            return () =>
              v() &&
              (() => {
                var c = $a();
                return (
                  n(c, () => e.title, null),
                  n(
                    c,
                    (() => {
                      var p = ne(() => !!e.toolTipText);
                      return () =>
                        p() &&
                        (() => {
                          var b = _a();
                          return (
                            n(
                              b,
                              l(Be, {
                                get content() {
                                  return e.toolTipText;
                                },
                              })
                            ),
                            b
                          );
                        })();
                    })(),
                    null
                  ),
                  c
                );
              })();
          })()
        ),
        o.addEventListener("change", t),
        R(() => ie(o, "name", e.name)),
        i
      );
    })()
  );
};
var Ta = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const me = (e) => Ta();
var Ca = $(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  Sa = $("<label class=label>"),
  Ia = $("<div class=toolTipBtn>"),
  Ea = $("<option>"),
  Na = $("<div role=option><p>"),
  Oa = $('<p class="text-xs font-light text-[#b9b5b5]">'),
  Aa = $("<p class=foot-note>");
const _e = (e) => {
  const [t, i] = O(!1),
    [a, s] = O({ value: "", label: "", description: "" }),
    [u, r] = O("down");
  let o, v;
  const c = (N) => {
      o && !o.contains(N.target) && i(!1);
    },
    p = () => i(!1);
  Ee(() => {
    if (e.defaultValue) {
      const N = e.options.find((m) => m.value === e.defaultValue);
      N && (s(N), e.onChange?.(N));
    }
    document.addEventListener("mousedown", c),
      document.addEventListener("touchstart", c, { passive: !0 }),
      window.addEventListener("resize", p),
      window.addEventListener("blur", p);
  }),
    De(() => {
      document.removeEventListener("mousedown", c),
        document.removeEventListener("touchstart", c),
        window.removeEventListener("resize", p),
        window.removeEventListener("blur", p);
    });
  const b = (N) => {
      N.stopPropagation(), t() || A(), i(!t());
    },
    T = (N) => {
      s(N), i(!1), a() && e.onChange && e.onChange(a()), o && o.focus();
    },
    A = () => {
      if (!o) return;
      const N = o.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - N.bottom < 200
        ? r("up")
        : r("down");
    };
  return (() => {
    var N = Ca(),
      m = N.firstChild,
      g = m.firstChild,
      w = g.nextSibling,
      y = w.nextSibling;
    n(
      N,
      (() => {
        var h = ne(() => !!e.title);
        return () =>
          h() &&
          (() => {
            var E = Sa();
            return (
              n(E, () => e.title, null),
              n(
                E,
                (() => {
                  var S = ne(() => !!e.toolTipText);
                  return () =>
                    S() &&
                    (() => {
                      var I = Ia();
                      return (
                        n(
                          I,
                          l(Be, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        I
                      );
                    })();
                })(),
                null
              ),
              R(() => ie(E, "for", e.name)),
              E
            );
          })();
      })(),
      m
    );
    var x = o;
    typeof x == "function" ? ye(x, m) : (o = m),
      n(
        g,
        l(de, {
          get each() {
            return e.options;
          },
          children: (h) =>
            (() => {
              var E = Ea();
              return (
                n(E, () => h.label),
                R(() => (E.selected = h.value === a().value)),
                R(() => (E.value = h.value)),
                E
              );
            })(),
        })
      ),
      Fe(w, "click", e.disabled ? void 0 : b),
      n(w, () => a().label || e.placeholder);
    var f = v;
    return (
      typeof f == "function" ? ye(f, y) : (v = y),
      n(
        y,
        l(de, {
          get each() {
            return e.options;
          },
          children: (h, E) =>
            (() => {
              var S = Na(),
                I = S.firstChild;
              return (
                (S.$$click = T),
                (S.$$clickData = h),
                n(I, () => h.label),
                n(
                  S,
                  (() => {
                    var d = ne(() => !!h.description);
                    return () =>
                      d() &&
                      (() => {
                        var C = Oa();
                        return n(C, () => h.description), C;
                      })();
                  })(),
                  null
                ),
                R(
                  (d) => {
                    var C = h.value === a().value ? "selected" : "",
                      _ = t() ? 0 : -1,
                      P = h.value === a().value;
                    return (
                      C !== d.e && D(S, (d.e = C)),
                      _ !== d.t && ie(S, "tabindex", (d.t = _)),
                      P !== d.a && ie(S, "aria-selected", (d.a = P)),
                      d
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                S
              );
            })(),
        })
      ),
      n(
        m,
        (() => {
          var h = ne(() => !!e.footNote);
          return () =>
            h() &&
            (() => {
              var E = Aa();
              return n(E, () => e.footNote), E;
            })();
        })(),
        null
      ),
      R(
        (h) => {
          var E = e.name,
            S = e.required,
            I = e.disabled,
            d = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            C = e.disabled ? -1 : 0,
            _ = t(),
            P = `select-items ${t() ? "select-show" : "select-hide"}
        ${u() === "up" ? "select-direction-up" : ""}`;
          return (
            E !== h.e && ie(g, "name", (h.e = E)),
            S !== h.t && (g.required = h.t = S),
            I !== h.a && (g.disabled = h.a = I),
            d !== h.o && D(w, (h.o = d)),
            C !== h.i && ie(w, "tabindex", (h.i = C)),
            _ !== h.n && ie(w, "aria-expanded", (h.n = _)),
            P !== h.s && D(y, (h.s = P)),
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
      N
    );
  })();
};
he(["click"]);
var Da = $(
    '<div class="flex gap-1 rounded-md bg-[#323236] px-1 py-1 items-center">+ '
  ),
  ka = $(
    '<div class=w-full><div class=custom-select><div aria-haspopup=listbox role=combobox><div class="flex gap-1.5"></div></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  Pa = $("<label class=label>"),
  La = $("<div class=toolTipBtn>"),
  Ma = $("<input type=hidden>"),
  Va = $(
    '<div class="flex relative gap-1 rounded-md bg-[#323236] px-2 py-1 items-center group duration-200"><div class="text-xs font-medium"></div><div class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-75 group-hover:max-w-[20px] group-hover:opacity-100 "><div class="text-[#c45454] font-bold cursor-pointer">×'
  ),
  Fa = $("<div role=option>");
const Do = (e) => {
  const [t, i] = O(!1),
    [a, s] = O([]),
    [u, r] = O([]),
    [o, v] = O("down");
  let c, p;
  const b = (w) => {
      c && !c.contains(w.target) && i(!1);
    },
    T = () => i(!1);
  Ee(() => {
    document.addEventListener("mousedown", b),
      document.addEventListener("touchstart", b, { passive: !0 }),
      window.addEventListener("resize", T),
      window.addEventListener("blur", T);
  }),
    De(() => {
      document.removeEventListener("mousedown", b),
        document.removeEventListener("touchstart", b),
        window.removeEventListener("resize", T),
        window.removeEventListener("blur", T);
    });
  const A = (w) => {
      w.stopPropagation(), t() || g(), i(!t());
    },
    N = (w) => {
      const y = a();
      if (y.some((E) => E.value === w.value)) return;
      const f = [...y, w];
      s(f);
      const h = f.map((E) => E.label);
      r(h), i(!1), e.onChange && e.onChange(f), c && c.focus();
    };
  function m(w, y) {
    w.stopPropagation();
    const x = a().filter((f) => f.label !== y);
    s(x), r(u().filter((f) => f !== y)), e.onChange && e.onChange(x);
  }
  const g = () => {
    if (!c) return;
    const w = c.getBoundingClientRect();
    document.getElementById("mid-panel")?.clientHeight - w.bottom < 200
      ? v("up")
      : v("down");
  };
  return (() => {
    var w = ka(),
      y = w.firstChild,
      x = y.firstChild,
      f = x.firstChild,
      h = x.nextSibling,
      E = h.nextSibling;
    n(
      w,
      (() => {
        var d = ne(() => !!e.title);
        return () =>
          d() &&
          (() => {
            var C = Pa();
            return (
              n(C, () => e.title, null),
              n(
                C,
                (() => {
                  var _ = ne(() => !!e.toolTipText);
                  return () =>
                    _() &&
                    (() => {
                      var P = La();
                      return (
                        n(
                          P,
                          l(Be, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        P
                      );
                    })();
                })(),
                null
              ),
              R(() => ie(C, "for", e.name)),
              C
            );
          })();
      })(),
      y
    );
    var S = c;
    typeof S == "function" ? ye(S, y) : (c = y),
      n(
        y,
        l(de, {
          get each() {
            return a();
          },
          children: (d, C) =>
            (() => {
              var _ = Ma();
              return (
                R(() => ie(_, "name", `${e.name}`)),
                R(() => (_.value = d.value)),
                _
              );
            })(),
        }),
        x
      ),
      Fe(x, "click", e.disabled ? void 0 : A),
      n(
        x,
        () => (u().length <= 0 ? e.placeholder || "Select an option" : ""),
        f
      ),
      n(
        f,
        l(de, {
          get each() {
            return u();
          },
          children: (d, C) => {
            if (C() < 3)
              return (() => {
                var _ = Va(),
                  P = _.firstChild,
                  z = P.nextSibling,
                  B = z.firstChild;
                return n(P, d), (B.$$click = (W) => m(W, d)), _;
              })();
          },
        }),
        null
      ),
      n(
        f,
        l(Q, {
          get when() {
            return u().length > 3;
          },
          get children() {
            var d = Da();
            return d.firstChild, n(d, () => u().length - 3, null), d;
          },
        }),
        null
      );
    var I = p;
    return (
      typeof I == "function" ? ye(I, h) : (p = h),
      n(
        h,
        l(de, {
          get each() {
            return e.options;
          },
          children: (d, C) =>
            (() => {
              var _ = Fa();
              return (
                (_.$$click = N),
                (_.$$clickData = d),
                n(_, () => d.label),
                R(
                  (P) => {
                    var z = a().some((q) => q.value === d.value)
                        ? "selected"
                        : "",
                      B = t() ? 0 : -1,
                      W = a().some((q) => q.value === d.value);
                    return (
                      z !== P.e && D(_, (P.e = z)),
                      B !== P.t && ie(_, "tabindex", (P.t = B)),
                      W !== P.a && ie(_, "aria-selected", (P.a = W)),
                      P
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                _
              );
            })(),
        })
      ),
      n(E, () => e.footNote),
      R(
        (d) => {
          var C = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            _ = e.disabled ? -1 : 0,
            P = t(),
            z = `select-items ${t() ? "select-show" : "select-hide"} ${
              o() === "up" ? "select-direction-up" : ""
            }`;
          return (
            C !== d.e && D(x, (d.e = C)),
            _ !== d.t && ie(x, "tabindex", (d.t = _)),
            P !== d.a && ie(x, "aria-expanded", (d.a = P)),
            z !== d.o && D(h, (d.o = z)),
            d
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      w
    );
  })();
};
he(["click"]);
var Ba = $(
    '<div class=custom-select><div aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  Ra = $("<div role=option>");
const Pe = (e) => {
  const [t, i] = O(!1),
    [a, s] = O("down");
  let u, r;
  const o = (T) => {
    u && !u.contains(T.target) && v();
  };
  Ee(() => {
    document.addEventListener("mousedown", o),
      document.addEventListener("touchstart", o, { passive: !0 }),
      window.addEventListener("resize", v),
      window.addEventListener("blur", v);
  }),
    De(() => {
      document.removeEventListener("mousedown", o),
        document.removeEventListener("touchstart", o),
        window.removeEventListener("resize", v),
        window.removeEventListener("blur", v);
    }),
    ke(() => {
      e.selectedOptions().length >= 1 &&
        e.onChange &&
        e.onChange(e.selectedOptions());
    });
  const v = () => {
      t() &&
        (i(!1),
        setTimeout(() => {
          const T = r;
          T && T.classList.add("select-hide-complete");
        }, 200));
    },
    c = (T) => {
      T.stopPropagation(), t() || b(), i(!t());
    },
    p = (T) => {
      const A = e.selectedOptions();
      A.some((m) => m.value === T.value) ||
        (e.setSelectedOptions([...A, T]),
        e.setDropdownOptions(
          e.dropdownOptions().filter((m) => m.value !== T.value)
        ),
        v(),
        u && u.focus());
    },
    b = () => {
      if (!u) return;
      const T = u.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - T.bottom < 200
        ? s("up")
        : s("down");
    };
  return l(Q, {
    get when() {
      return e.dropdownOptions().length >= 1;
    },
    get children() {
      var T = Ba(),
        A = T.firstChild,
        N = A.nextSibling,
        m = u;
      typeof m == "function" ? ye(m, T) : (u = T),
        Fe(A, "click", e.disabled ? void 0 : c),
        n(A, () => e.placeholder);
      var g = r;
      return (
        typeof g == "function" ? ye(g, N) : (r = N),
        n(
          N,
          l(de, {
            get each() {
              return e.dropdownOptions();
            },
            children: (w, y) =>
              (() => {
                var x = Ra();
                return (
                  (x.$$click = p),
                  (x.$$clickData = w),
                  n(x, () => w.label),
                  R(() => ie(x, "tabindex", t() ? 0 : -1)),
                  x
                );
              })(),
          })
        ),
        R(
          (w) => {
            var y = `select-selected ${t() ? "active" : ""} ${
                e.disabled ? "disabled" : ""
              }`,
              x = e.disabled ? -1 : 0,
              f = t(),
              h = `select-items ${t() ? "select-show" : "select-hide"} ${
                a() === "up" ? "select-direction-up" : ""
              }`;
            return (
              y !== w.e && D(A, (w.e = y)),
              x !== w.t && ie(A, "tabindex", (w.t = x)),
              f !== w.a && ie(A, "aria-expanded", (w.a = f)),
              h !== w.o && D(N, (w.o = h)),
              w
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        T
      );
    },
  });
};
he(["click"]);
var za = $(
    '<div class=custom-select><label class=label></label><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox><div role=option aria-selected=true>+ Create new credentials</div></div><p class=foot-note>'
  ),
  Wa = $("<div class=toolTipBtn>"),
  Ha = $("<option>"),
  qa = $("<div role=option aria-selected=true>");
const nt = (e) => {
  const [t, i] = O(!1),
    { setIsModalOpen2: a } = xe(),
    [s, u] = O({ value: "", label: "", description: "" }),
    [r, o] = O("down");
  let v, c;
  const p = (m) => {
      v && !v.contains(m.target) && i(!1);
    },
    b = () => i(!1);
  Ee(() => {
    if (e.defaultValue) {
      const m = e.options && e.options.find((g) => g.value === e.defaultValue);
      m && u(m);
    }
    document.addEventListener("mousedown", p),
      document.addEventListener("touchstart", p, { passive: !0 }),
      window.addEventListener("resize", b),
      window.addEventListener("blur", b);
  }),
    De(() => {
      document.removeEventListener("mousedown", p),
        document.removeEventListener("touchstart", p),
        window.removeEventListener("resize", b),
        window.removeEventListener("blur", b);
    }),
    ke(() => {
      s() && e.onChange && e.onChange(s());
    });
  const T = (m) => {
      m.stopPropagation(), t() || N(), i(!t());
    },
    A = (m) => {
      u(m), i(!1), v && v.focus();
    },
    N = () => {
      if (!v) return;
      const m = v.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - m.bottom < 200
        ? o("up")
        : o("down");
    };
  return (() => {
    var m = za(),
      g = m.firstChild,
      w = g.nextSibling,
      y = w.nextSibling,
      x = y.nextSibling,
      f = x.firstChild,
      h = x.nextSibling,
      E = v;
    typeof E == "function" ? ye(E, m) : (v = m),
      n(g, () => e.title, null),
      n(
        g,
        (() => {
          var I = ne(() => !!e.toolTipText);
          return () =>
            I() &&
            (() => {
              var d = Wa();
              return (
                n(
                  d,
                  l(Be, {
                    get content() {
                      return e.toolTipText;
                    },
                  })
                ),
                d
              );
            })();
        })(),
        null
      ),
      n(
        w,
        l(de, {
          get each() {
            return e.options;
          },
          children: (I) =>
            (() => {
              var d = Ha();
              return (
                n(d, () => I.label),
                R(() => (d.selected = I.value === s().value)),
                R(() => (d.value = I.value)),
                d
              );
            })(),
        })
      ),
      Fe(y, "click", e.disabled ? void 0 : T),
      n(y, () => s().label || e.placeholder);
    var S = c;
    return (
      typeof S == "function" ? ye(S, x) : (c = x),
      n(
        x,
        l(de, {
          get each() {
            return e.options;
          },
          children: (I, d) =>
            (() => {
              var C = qa();
              return (
                (C.$$click = A),
                (C.$$clickData = I),
                n(C, () => I.label),
                R(
                  (_) => {
                    var P = `child-option ${
                        (I.value === s().value ? "selected" : "") || ""
                      }`,
                      z = I.value === s().value,
                      B = I.value === s().value,
                      W = t() ? 0 : -1;
                    return (
                      P !== _.e && D(C, (_.e = P)),
                      z !== _.t && C.classList.toggle("selected", (_.t = z)),
                      B !== _.a &&
                        C.classList.toggle("aria-selected-true", (_.a = B)),
                      W !== _.o && ie(C, "tabindex", (_.o = W)),
                      _
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                C
              );
            })(),
        }),
        f
      ),
      (f.$$click = (I) => {
        T(I), a(!0);
      }),
      n(h, () => e.footNote),
      R(
        (I) => {
          var d = e.name,
            C = e.name,
            _ = e.required,
            P = e.disabled,
            z = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            B = e.disabled ? -1 : 0,
            W = t(),
            q = `select-items ${t() ? "select-show" : "select-hide"}
        ${r() === "up" ? "select-direction-up" : ""}`,
            V = t() ? 0 : -1;
          return (
            d !== I.e && ie(g, "for", (I.e = d)),
            C !== I.t && ie(w, "name", (I.t = C)),
            _ !== I.a && (w.required = I.a = _),
            P !== I.o && (w.disabled = I.o = P),
            z !== I.i && D(y, (I.i = z)),
            B !== I.n && ie(y, "tabindex", (I.n = B)),
            W !== I.s && ie(y, "aria-expanded", (I.s = W)),
            q !== I.h && D(x, (I.h = q)),
            V !== I.r && ie(f, "tabindex", (I.r = V)),
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
      m
    );
  })();
};
he(["click"]);
var Ua = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor; data--h-bstatus=0OBSERVED><path fill-rule=evenodd d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"></path><path fill-rule=evenodd d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z">'
);
const ko = (e) => Ua();
var ja = $("<div><div class=relative><input>"),
  Ga = $("<label class=label>"),
  Xa = $("<div class=toolTipBtn>"),
  Ya = $('<button type=button aria-label="Toggle expanded view">'),
  Ja = $(
    '<div><div class><div class=mb-3><div class="flex justify-between items-center mb-2"><span class="text-white text-sm font-medium">Result</span><div class="flex items-center gap-2"><span class="text-gray-400 text-xs">Item</span><span class="bg-gray-600 text-white text-xs px-2 py-1 rounded">0</span><div class="flex gap-1"><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Previous item">‹</button><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Next item">›</button></div></div></div><div class="text-white text-sm"></div></div><div><div class="text-yellow-400 text-xs font-medium mb-1">Tip:</div><div class="text-gray-300 text-xs">Anything inside <span class=text-blue-400>{}</span> is JavaScript.<button type=button class="text-blue-400 hover:underline ml-1 cursor-pointer">Learn more</button></div></div><div class="mt-3 pt-3 border-t border-gray-600"><div class="text-gray-400 text-xs">Press <kbd class="bg-gray-600 px-1 rounded text-white">Escape</kbd> to close'
  ),
  Za = $("<p class=foot-note>");
const ce = (e) => {
  const { setIsModalOpen3: t } = xe(),
    [i, a] = O(!1),
    [s, u] = O(e.value || "");
  let r, o;
  const v = (A) => {
      o && !o.contains(A.target) && a(!1);
    },
    c = () => a(!1);
  Ee(() => {
    e.onInput?.(e.value || ""),
      document.addEventListener("mousedown", v),
      document.addEventListener("touchstart", v, { passive: !0 }),
      window.addEventListener("resize", c),
      window.addEventListener("blur", c);
  }),
    De(() => {
      document.removeEventListener("click", v);
    });
  const p = () => {
      e.disabled || a(!0);
    },
    b = (A) => {
      const m = A.target.value;
      u(m), e.onInput?.(m, A);
    },
    T = (A) => {
      A.preventDefault(), A.stopPropagation();
    };
  return (() => {
    var A = ja(),
      N = A.firstChild,
      m = N.firstChild,
      g = o;
    typeof g == "function" ? ye(g, A) : (o = A),
      n(
        A,
        (() => {
          var y = ne(() => !!e.title);
          return () =>
            y() &&
            (() => {
              var x = Ga();
              return (
                n(x, () => e.title, null),
                n(
                  x,
                  (() => {
                    var f = ne(() => !!e.toolTipText);
                    return () =>
                      f() &&
                      (() => {
                        var h = Xa();
                        return (
                          n(
                            h,
                            l(Be, {
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
                R(() => ie(x, "for", e.name)),
                x
              );
            })();
        })(),
        N
      ),
      m.addEventListener("focus", p),
      (m.$$input = b);
    var w = r;
    return (
      typeof w == "function" ? ye(w, m) : (r = m),
      n(
        N,
        (() => {
          var y = ne(() => !!e.isArrow);
          return () =>
            y() &&
            (() => {
              var x = Ya();
              return (
                (x.$$click = () => t(!0)),
                n(x, l(ko, {})),
                R(
                  (f) => {
                    var h = e.disabled,
                      E = `absolute right-0 bottom-0 text-gray-400 text-[10px] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                        e.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`;
                    return (
                      h !== f.e && (x.disabled = f.e = h),
                      E !== f.t && D(x, (f.t = E)),
                      f
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                x
              );
            })();
        })(),
        null
      ),
      n(
        A,
        (() => {
          var y = ne(() => !!e.isExpand);
          return () =>
            y() &&
            (() => {
              var x = Ja(),
                f = x.firstChild,
                h = f.firstChild,
                E = h.firstChild,
                S = E.nextSibling,
                I = h.nextSibling,
                d = I.firstChild,
                C = d.nextSibling,
                _ = C.firstChild,
                P = _.nextSibling,
                z = P.nextSibling,
                B = z.nextSibling;
              return (
                n(S, () => s() || "threadid"),
                (B.$$click = T),
                R(() =>
                  D(
                    x,
                    `absolute top-full rounded-sm left-0 right-0 p-4 bg-[#1f1f2b] border border-gray-600 border-t-0 rounded-b transition-all duration-200 z-10 ${
                      i() ? "opacity-100 visible" : "opacity-0 invisible"
                    }`
                  )
                ),
                x
              );
            })();
        })(),
        null
      ),
      n(
        A,
        (() => {
          var y = ne(() => !!e.footNote);
          return () =>
            y() &&
            (() => {
              var x = Za();
              return n(x, () => e.footNote), x;
            })();
        })(),
        null
      ),
      R(
        (y) => {
          var x = `relative w-full group ${e.class || ""}`,
            f = e.autocomplete ? "on" : "off",
            h = e.type || "text",
            E = e.name,
            S = e.disabled,
            I = e.placeholder || "",
            d = `w-full px-3 py-2.5 pr-8 border font-normal rounded-sm border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors ${
              e.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`;
          return (
            x !== y.e && D(A, (y.e = x)),
            f !== y.t && ie(m, "autocomplete", (y.t = f)),
            h !== y.a && ie(m, "type", (y.a = h)),
            E !== y.o && ie(m, "name", (y.o = E)),
            S !== y.i && (m.disabled = y.i = S),
            I !== y.n && ie(m, "placeholder", (y.n = I)),
            d !== y.s && D(m, (y.s = d)),
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
        }
      ),
      R(() => (m.value = e.value || "")),
      A
    );
  })();
};
he(["input", "click"]);
var Ka = $(
  '<div class="text-[#dfe0e3] mt-5 select-none bg-[#383649] text-[15px] font-light text-center py-1.5 rounded-md cursor-pointer hover:bg-[#3d3b4e]">'
);
const et = (e) =>
  (() => {
    var t = Ka();
    return Fe(t, "click", e.onClick), n(t, () => e.label), t;
  })();
he(["click"]);
var Qa = $(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  es = $("<label class=label>"),
  ts = $("<div class=toolTipBtn>"),
  ns = $("<option>"),
  ls = $("<div role=option><p>"),
  os = $('<p class="text-xs font-light text-[#b9b5b5]">');
const Se = (e) => {
  const [t, i] = O(!1),
    [a, s] = O({ value: "", label: "", children: [] }),
    [u, r] = O("down");
  let o, v;
  const c = () => {
      if (e.defaultValue) {
        const m = e.options.find((g) => g.value === e.defaultValue);
        m && (s(m), e.onChange(m));
      }
    },
    p = (m) => {
      o && !o.contains(m.target) && i(!1);
    },
    b = () => i(!1);
  Ee(() => {
    c(),
      document.addEventListener("mousedown", p),
      document.addEventListener("touchstart", p, { passive: !0 }),
      window.addEventListener("resize", b),
      window.addEventListener("blur", b);
  }),
    De(() => {
      document.removeEventListener("mousedown", p),
        document.removeEventListener("touchstart", p),
        window.removeEventListener("resize", b),
        window.removeEventListener("blur", b);
    });
  const T = (m) => {
      m.stopPropagation(), t() || N(), i(!t());
    },
    A = (m) => {
      s(m), i(!1), a() && e.onChange && e.onChange(a()), o && o.focus();
    },
    N = () => {
      if (!o) return;
      const m = o.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - m.bottom < 200
        ? r("up")
        : r("down");
    };
  return (() => {
    var m = Qa(),
      g = m.firstChild,
      w = g.firstChild,
      y = w.nextSibling,
      x = y.nextSibling,
      f = x.nextSibling;
    n(
      m,
      (() => {
        var S = ne(() => !!e.title);
        return () =>
          S() &&
          (() => {
            var I = es();
            return (
              n(I, () => e.title, null),
              n(
                I,
                (() => {
                  var d = ne(() => !!e.toolTipText);
                  return () =>
                    d() &&
                    (() => {
                      var C = ts();
                      return (
                        n(
                          C,
                          l(Be, {
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
              R(() => ie(I, "for", e.name)),
              I
            );
          })();
      })(),
      g
    );
    var h = o;
    typeof h == "function" ? ye(h, g) : (o = g),
      n(
        w,
        l(de, {
          get each() {
            return e.options;
          },
          children: (S) =>
            (() => {
              var I = ns();
              return (
                n(I, () => S.label),
                R(() => (I.selected = S.value === a().value)),
                R(() => (I.value = S.value)),
                I
              );
            })(),
        })
      ),
      Fe(y, "click", e.disabled ? void 0 : T),
      n(y, () => a().label || e.placeholder);
    var E = v;
    return (
      typeof E == "function" ? ye(E, x) : (v = x),
      n(
        x,
        l(de, {
          get each() {
            return e.options;
          },
          children: (S, I) =>
            (() => {
              var d = ls(),
                C = d.firstChild;
              return (
                (d.$$click = A),
                (d.$$clickData = S),
                n(C, () => S.label),
                n(
                  d,
                  (() => {
                    var _ = ne(() => !!S.description);
                    return () =>
                      _() &&
                      (() => {
                        var P = os();
                        return n(P, () => S.description), P;
                      })();
                  })(),
                  null
                ),
                R(
                  (_) => {
                    var P = S.value === a().value ? "selected" : "",
                      z = t() ? 0 : -1,
                      B = S.value === a().value;
                    return (
                      P !== _.e && D(d, (_.e = P)),
                      z !== _.t && ie(d, "tabindex", (_.t = z)),
                      B !== _.a && ie(d, "aria-selected", (_.a = B)),
                      _
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                d
              );
            })(),
        })
      ),
      n(f, () => e.footNote),
      R(
        (S) => {
          var I = e.name,
            d = e.required,
            C = e.disabled,
            _ = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            P = e.disabled ? -1 : 0,
            z = t(),
            B = `select-items ${t() ? "select-show" : "select-hide"}
        ${u() === "up" ? "select-direction-up" : ""}`;
          return (
            I !== S.e && ie(w, "name", (S.e = I)),
            d !== S.t && (w.required = S.t = d),
            C !== S.a && (w.disabled = S.a = C),
            _ !== S.o && D(y, (S.o = _)),
            P !== S.i && ie(y, "tabindex", (S.i = P)),
            z !== S.n && ie(y, "aria-expanded", (S.n = z)),
            B !== S.s && D(x, (S.s = B)),
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
        }
      ),
      m
    );
  })();
};
he(["click"]);
const is = [
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
  rs = [
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
  Rn = [
    { value: "Every Minute", label: "Every Minute", children: [] },
    {
      value: "Every Hour",
      label: "Every Hour",
      children: [
        {
          type: "input",
          title: "Minute",
          value: 0,
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
          value: 0,
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
  Po = (e, t) => ({
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
      pollTimes: ((a) =>
        Object.values(
          Object.entries(a)
            .filter(([s, u]) => s.startsWith("poolTime_"))
            .reduce((s, [u, r]) => {
              const o = u.split("_"),
                v = `${o[0]}_${o[1]}`,
                c = o[2];
              return (
                (s[v] ??= {}),
                c
                  ? c === "Hour"
                    ? (s[v].hour = +r)
                    : c === "Minute"
                    ? (s[v].minute = +r)
                    : c === "Day of Month"
                    ? (s[v].dayOfMonth = +r)
                    : c === "Weekday"
                    ? (s[v].weekday = r.toLowerCase())
                    : c === "Value"
                    ? (s[v].value = +r)
                    : c === "Unit"
                    ? (s[v].unit = r.toLowerCase())
                    : c === "Cron Expression" && (s[v].cronExpression = r)
                  : (s[v].mode = r.toLowerCase()),
                s
              );
            }, {})
        ))(e),
      simple: !!e?.simplify,
      filters: {
        includeSpamTrash: !!e?.includeSpamTrash,
        includeDrafts: !!e?.includeDrafts,
        labelIds: e?.labelNamesOrIds || "",
        q: e?.Search || "",
        readStatus: e?.readStatus || "",
        sender: e?.sender || "",
      },
      options: {
        downloadAttachments: !!e?.downloadAttachments,
        attachmentPrefix: e?.attachmentPrefix || "",
      },
    },
    position: { x: 200, y: 200 },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "Last Email",
        description: "Read last email from your gmail inbox",
        type: "object",
      },
    ],
  }),
  [as, ss] = O({}),
  { formConfig: ds, setFormData: cs, formData: us } = xe(),
  Le = (e, t, i) => {
    ss((s) => ({ ...s, [e]: t }));
    const a = Po(as(), ds().id);
    cs({ ...us(), GmailReader: a });
  };
var ps = $(
    '<div><form class=form id=gmail-triggerForm><div class=space-y-5><div><div class="label hr-solid-line">Pool Times</div><div class=mt-5></div></div><div></div><div></div><div><div class="label hr-solid-line">Filters</div><div class="space-y-6 mt-5"></div><div class=mt-6></div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div><div class=mt-6>'
  ),
  vs = $(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  ms = $('<div class="space-y-4 mt-5">'),
  hs = $(
    '<div><div class=pt-9><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div></div><div class=w-full>'
  ),
  rt = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const fs = (e) => {
  const [t, i] = O([]),
    [a, s] = O([]),
    [u, r] = O([]),
    [o, v] = O([]),
    [c, p] = O([]),
    [b, T] = O({}),
    { setFormData: A, formData: N, formConfig: m } = xe();
  Ee(() => {
    s(is), v(rs);
  });
  const g = (w) => {
    w.preventDefault();
    const y = new FormData(w.target);
    let x = {
      ...Object.fromEntries(y.entries()),
      labelNamesOrIds: y.getAll("labelNamesOrIds"),
    };
    console.log("unformatted data", x);
    const f = Po(x, m()?.id);
    A({ ...N(), GmailReader: f }), console.log("formattedData", f);
    const h = new CustomEvent("RIN", { detail: x, bubbles: !0 }),
      E = document.getElementById("submitBtn");
    E && E.dispatchEvent(h);
  };
  return (() => {
    var w = ps(),
      y = w.firstChild,
      x = y.firstChild,
      f = x.firstChild,
      h = f.firstChild,
      E = h.nextSibling,
      S = f.nextSibling,
      I = S.nextSibling,
      d = I.nextSibling,
      C = d.firstChild,
      _ = C.nextSibling,
      P = _.nextSibling,
      z = d.nextSibling,
      B = z.firstChild,
      W = B.nextSibling,
      q = W.nextSibling;
    return (
      y.addEventListener("submit", g),
      n(
        x,
        l(nt, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        f
      ),
      n(
        E,
        (() => {
          var V = ne(() => c().length <= 0);
          return () => V() && vs();
        })(),
        null
      ),
      n(
        E,
        l(de, {
          get each() {
            return c();
          },
          children: (V, le) =>
            (() => {
              var U = hs(),
                K = U.firstChild,
                ee = K.firstChild,
                pe = K.nextSibling;
              return (
                (ee.$$click = () => {
                  delete b()[V], p(c().filter((te, Z) => te !== V));
                }),
                n(ee, l(me, {})),
                n(
                  pe,
                  l(Se, {
                    name: V,
                    get defaultValue() {
                      return Rn[0].value;
                    },
                    options: Rn,
                    title: "Mode",
                    toolTipText: "How often to trigger.",
                    onChange: (te) => {
                      T((Z) => {
                        const ae = { ...Z };
                        return (ae[V] = te.children ?? []), ae;
                      }),
                        Le(V, te.value),
                        console.log(b());
                    },
                  }),
                  null
                ),
                n(
                  pe,
                  l(Q, {
                    get when() {
                      return b()[V];
                    },
                    get children() {
                      var te = ms();
                      return (
                        n(
                          te,
                          l(de, {
                            get each() {
                              return b()[V];
                            },
                            children: (Z, ae) => {
                              if (Z.type === "input")
                                return l(ce, {
                                  get name() {
                                    return `${V}_${Z.title}`;
                                  },
                                  get title() {
                                    return Z.title;
                                  },
                                  get toolTipText() {
                                    return Z.toolTipText;
                                  },
                                  isArrow: !0,
                                  get value() {
                                    return Z.value ?? "";
                                  },
                                  onInput: (j, fe) => {
                                    Le(`${V}_${Z.title}`, j);
                                  },
                                });
                              if (Z.type === "dropdownN")
                                return l(_e, {
                                  get name() {
                                    return `${V}_${Z.title}`;
                                  },
                                  get title() {
                                    return Z.title;
                                  },
                                  get options() {
                                    return Z.options ?? [];
                                  },
                                  get defaultValue() {
                                    return Z.options?.[0]?.value;
                                  },
                                  get toolTipText() {
                                    return Z.toolTipText;
                                  },
                                  onChange: (j) => {
                                    Le(`${V}_${Z.title}`, j.value);
                                  },
                                });
                            },
                          })
                        ),
                        te
                      );
                    },
                  }),
                  null
                ),
                R(() =>
                  D(
                    U,
                    `mb-10 flex flex-row gap-1.5 items-top group ${
                      le() !== 0
                        ? "border-t border-dashed border-[#727171] pt-3"
                        : ""
                    }`
                  )
                ),
                U
              );
            })(),
        }),
        null
      ),
      n(
        f,
        l(et, {
          onClick: () => {
            p([
              ...c(),
              `poolTime_${Math.random().toString(36).substring(2, 8)}`,
            ]);
          },
          label: "Add Pool Time",
        }),
        null
      ),
      n(
        S,
        l(_e, {
          name: "Event",
          title: "Event",
          defaultValue: "Message received",
          options: [{ label: "Message received", value: "Message received" }],
          onChange: (V) => {
            Le("Event", V.value);
          },
        })
      ),
      n(
        I,
        l(Ie, {
          title: "Simplify",
          name: "simplify",
          toolTipText:
            "Whether to return a simplified version of the response instead of the raw data.",
          onChange: (V) => {
            Le("simplify", V);
          },
        })
      ),
      n(
        _,
        l(de, {
          get each() {
            return t();
          },
          children: (V, le) => {
            if (V.content.type === "switch")
              return (() => {
                var U = rt(),
                  K = U.firstChild;
                return (
                  (K.$$click = () => {
                    const ee = t().filter((pe) => pe.value !== V.value);
                    i(ee), s([...a(), V]);
                  }),
                  n(K, l(me, {})),
                  n(
                    U,
                    l(Ie, {
                      get name() {
                        return V.content.name;
                      },
                      get title() {
                        return V.content.title;
                      },
                      get toolTipText() {
                        return V.content.toolTipText;
                      },
                      onChange: (ee) => {
                        Le(V.content.name, ee);
                      },
                    }),
                    null
                  ),
                  U
                );
              })();
            if (V.content.type === "dynamicInput")
              return (() => {
                var U = rt(),
                  K = U.firstChild;
                return (
                  (K.$$click = () => {
                    const ee = t().filter((pe) => pe.value !== V.value);
                    i(ee), s([...a(), V]);
                  }),
                  n(K, l(me, {})),
                  n(
                    U,
                    l(ce, {
                      get name() {
                        return V.content.name;
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
                      onInput: (ee) => {
                        Le(V.content.name, ee);
                      },
                    }),
                    null
                  ),
                  U
                );
              })();
            if (V.content.type === "dropdownMultiple")
              return (() => {
                var U = rt(),
                  K = U.firstChild;
                return (
                  (K.$$click = () => {
                    const ee = t().filter((pe) => pe.value !== V.value);
                    i(ee), s([...a(), V]);
                  }),
                  n(K, l(me, {})),
                  n(
                    U,
                    l(Do, {
                      get name() {
                        return V.content.name;
                      },
                      get title() {
                        return V.content.title;
                      },
                      get options() {
                        return V.content.options;
                      },
                      get toolTipText() {
                        return V.content.toolTipText;
                      },
                      get footNote() {
                        return V.content.footNote;
                      },
                      onChange: (ee) => {
                        Le(
                          V.content.name,
                          ee.map((pe) => pe.value)
                        );
                      },
                    }),
                    null
                  ),
                  U
                );
              })();
            if (V.content.type === "dropdownN")
              return (() => {
                var U = rt(),
                  K = U.firstChild;
                return (
                  (K.$$click = () => {
                    const ee = t().filter((pe) => pe.value !== V.value);
                    i(ee), s([...a(), V]);
                  }),
                  n(K, l(me, {})),
                  n(
                    U,
                    l(_e, {
                      get placeholder() {
                        return V.content.options[0].label;
                      },
                      get name() {
                        return V.content.name;
                      },
                      get title() {
                        return V.content.title;
                      },
                      get options() {
                        return V.content.options;
                      },
                      get toolTipText() {
                        return V.content.toolTipText;
                      },
                      get footNote() {
                        return V.content.footNote;
                      },
                      onChange: (ee) => {
                        Le(V.content.name, ee.value);
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
      n(
        P,
        l(Pe, {
          name: "filter",
          dropdownOptions: a,
          setDropdownOptions: s,
          selectedOptions: t,
          setSelectedOptions: i,
          placeholder: "Add filter",
          onChange: (V) => {},
        })
      ),
      n(
        W,
        l(de, {
          get each() {
            return u();
          },
          children: (V, le) => {
            if (V.content.type === "switch")
              return (() => {
                var U = rt(),
                  K = U.firstChild;
                return (
                  (K.$$click = () => {
                    const ee = u().filter((pe) => pe.value !== V.value);
                    r(ee), v([...o(), V]);
                  }),
                  n(K, l(me, {})),
                  n(
                    U,
                    l(Ie, {
                      get name() {
                        return V.content.name;
                      },
                      get title() {
                        return V.content.title;
                      },
                      get toolTipText() {
                        return V.content.toolTipText;
                      },
                      onChange: (ee) => {
                        Le(V.content.name, ee);
                      },
                    }),
                    null
                  ),
                  U
                );
              })();
            if (V.content.type === "dynamicInput")
              return (() => {
                var U = rt(),
                  K = U.firstChild;
                return (
                  (K.$$click = () => {
                    const ee = u().filter((pe) => pe.value !== V.value);
                    r(ee), v([...o(), V]);
                  }),
                  n(K, l(me, {})),
                  n(
                    U,
                    l(ce, {
                      get name() {
                        return V.content.name;
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
                      get value() {
                        return V.content.value ?? "";
                      },
                      onInput: (ee) => {
                        Le(V.content.name, ee);
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
      n(
        q,
        l(Pe, {
          name: "options_gmail_node",
          dropdownOptions: o,
          setDropdownOptions: v,
          selectedOptions: u,
          setSelectedOptions: r,
          placeholder: "Add Options",
          onChange: (V) => {},
        })
      ),
      w
    );
  })();
};
he(["click"]);
const en = [
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
  tn = [
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
  gs = [
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
  nn = [
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
var xs = $("<div class=relative><textarea autocomplete=off rows=3>"),
  bs = $("<label class=label>"),
  ys = $("<div class=toolTipBtn>"),
  ws = $(
    '<div class="absolute right-3 top-1/2 transform -translate-y-1/2"><svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class=text-red-500><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17 .01 0">'
  );
const tt = (e) => {
  const [t, i] = O(""),
    [a, s] = O(!0),
    u = (r) => {
      const v = r.target.value;
      i(v), s(v.trim() === "");
    };
  return (() => {
    var r = xs(),
      o = r.firstChild;
    return (
      n(
        r,
        (() => {
          var v = ne(() => !!e.title);
          return () =>
            v() &&
            (() => {
              var c = bs();
              return (
                n(c, () => e.title, null),
                n(
                  c,
                  (() => {
                    var p = ne(() => !!e.toolTipText);
                    return () =>
                      p() &&
                      (() => {
                        var b = ys();
                        return (
                          n(
                            b,
                            l(Be, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          b
                        );
                      })();
                  })(),
                  null
                ),
                R(() => ie(c, "for", e.name)),
                c
              );
            })();
        })(),
        o
      ),
      (o.$$input = u),
      n(
        r,
        (() => {
          var v = ne(() => !!a());
          return () => v() && ws();
        })(),
        null
      ),
      R(
        (v) => {
          var c = e.name,
            p = e.placeholder || "Type here...",
            b = `
              w-full px-4 py-3 pr-12 
              bg-[#252434] text-white 
              rounded-lg resize-none 
              placeholder-gray-400
              focus:outline-none
              transition-all duration-200
              ${
                a()
                  ? "border-1 border-[#b46262] focus:border-[#888484]"
                  : "border-1 border-[#dad7d742] focus:border-[#888484]"
              }
            `;
          return (
            c !== v.e && ie(o, "name", (v.e = c)),
            p !== v.t && ie(o, "placeholder", (v.t = p)),
            b !== v.a && D(o, (v.a = b)),
            v
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      R(() => (o.value = e.value || "")),
      r
    );
  })();
};
he(["input"]);
var $s = $(
  '<div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-light text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">'
);
const Jt = (e) => {
    const t = ml(() => e.children);
    return (() => {
      var i = $s();
      return n(i, t), i;
    })();
  },
  Lo = (e, t) => ({
    id: t,
    name: "AI Agent",
    description: "AI Agent",
    type: "LangChainAgent",
    parameter: {
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
    },
  }),
  [_s, Ts] = O({}),
  { formConfig: Cs, formData: Ss, setFormData: Is } = xe(),
  Re = (e, t, i) => {
    Ts((s) => ({ ...s, [e]: t }));
    const a = Lo(_s(), Cs().id);
    Is({ ...Ss(), AiAgent: a });
  };
var Es = $('<a href=# class="font-semibold text-[#fe705a]">tutorial'),
  Ns = $('<a href=# class="font-semibold text-[#fe705a]">example'),
  Os = $(
    `<div class="mt-5 space-y-5"><div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-extralight text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">Pass the SQLite database into this node as binary data, e.g. by inserting a 'Read/Write Files from Disk' node beforehand</div><div>`
  ),
  As = $('<div class="mt-5 space-y-5"><div></div><div>'),
  Ds = $("<div class=mt-5>"),
  ks = $(
    '<form class=form id=ai-agentForm><div><div></div><div class=mt-5><div class=mt-4></div></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  zn = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  Ps = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1></div>;'
  );
const Ls = (e) => {
  const { formConfig: t } = xe(),
    [i, a] = O(en[0]),
    [s, u] = O(tn[0]),
    [r, o] = O(gs),
    [v, c] = O([]),
    [p, b] = O(nn[0]),
    { formData: T, setFormData: A } = xe(),
    N = () =>
      i().value === "Tools Agent" || i().value === "Conversational Agent",
    m = (g) => {
      g.preventDefault();
      const w = new FormData(g.target);
      let y = Object.fromEntries(w.entries());
      const x = Lo(y, t().id);
      A({ ...T(), AiAgent: x }), console.log(x);
      const f = new CustomEvent("formSubmitEvent", { detail: y, bubbles: !0 }),
        h = document.getElementById("submitBtn");
      h && h.dispatchEvent(f);
    };
  return (() => {
    var g = ks(),
      w = g.firstChild,
      y = w.firstChild,
      x = y.nextSibling,
      f = x.firstChild,
      h = x.nextSibling,
      E = h.firstChild,
      S = E.nextSibling,
      I = S.nextSibling;
    return (
      g.addEventListener("submit", m),
      n(
        w,
        l(Q, {
          get when() {
            return N();
          },
          get children() {
            return l(Jt, {
              get children() {
                return [
                  "Tip: Get a feel for agents with our quick",
                  " ",
                  Es(),
                  " ",
                  "or see an",
                  " ",
                  Ns(),
                  " ",
                  "of how this node works",
                ];
              },
            });
          },
        }),
        y
      ),
      n(
        y,
        l(Se, {
          name: "agent",
          title: "Agent",
          get defaultValue() {
            return en[0].value;
          },
          options: en,
          onChange: (d) => {
            a(d), Re("agent", d);
          },
        })
      ),
      n(
        w,
        l(Q, {
          get when() {
            return i().value === "SQL Agent";
          },
          get children() {
            var d = As(),
              C = d.firstChild,
              _ = C.nextSibling;
            return (
              n(
                C,
                l(_e, {
                  name: "dataSource",
                  options: nn,
                  title: "Data Source",
                  get defaultValue() {
                    return nn[0].value;
                  },
                  onChange: (P) => {
                    b(P), Re("dataSource", P);
                  },
                })
              ),
              n(
                d,
                l(Q, {
                  get when() {
                    return p().value === "sqlite";
                  },
                  get children() {
                    var P = Os(),
                      z = P.firstChild,
                      B = z.nextSibling;
                    return (
                      n(
                        B,
                        l(ce, {
                          name: "inputBinaryField",
                          title: "Input Binary Field",
                          placeholder: "e.g. Data",
                          value: "",
                          footNote:
                            "The name of the input binary field containing the file to be extracted",
                          isArrow: !0,
                          onInput: (W) => {
                            Re("inputBinaryField", W);
                          },
                        })
                      ),
                      P
                    );
                  },
                }),
                _
              ),
              n(
                _,
                l(Q, {
                  get when() {
                    return p().value !== "sqlite";
                  },
                  get children() {
                    return l(nt, {
                      get name() {
                        return `credential_for_${p().value}`;
                      },
                      get title() {
                        return `Credential for ${p().value}`;
                      },
                      placeholder: "Select Credential",
                    });
                  },
                })
              ),
              d
            );
          },
        }),
        x
      ),
      n(
        x,
        l(Se, {
          name: "sourceForPrompt",
          title: "Source for Prompt (User message)",
          options: tn,
          get defaultValue() {
            return tn[0].value;
          },
          onChange: (d) => {
            u(d), Re("sourceForPrompt", d);
          },
        }),
        f
      ),
      n(
        f,
        l(Q, {
          get when() {
            return s().value === "Define below";
          },
          get children() {
            return l(tt, {
              name: "promptDefineBelow",
              title: "Prompt (User message)",
              placeholder: "e.g. Hello, how can you help me?",
              onInput: (d) => {
                Re(`prompt_${s().value}`, d);
              },
            });
          },
        }),
        null
      ),
      n(
        f,
        l(Q, {
          get when() {
            return s().value === "Connected Chat Trigger Node";
          },
          get children() {
            return l(ce, {
              name: "promptConnectedChatTriggerNode",
              title: "Prompt (User message)",
              placeholder: "{{ $json.chatInput }}",
              isArrow: !0,
              isExpand: !0,
              value: "",
              onInput: (d) => {
                Re(`prompt_${s().value}`, d);
              },
            });
          },
        }),
        null
      ),
      n(
        w,
        l(Q, {
          get when() {
            return i().value !== "SQL Agent";
          },
          get children() {
            var d = Ds();
            return (
              n(
                d,
                l(Ie, {
                  title: "Require Specific Output Format",
                  name: "requireSpecificOutputFormat",
                })
              ),
              d
            );
          },
        }),
        h
      ),
      n(
        S,
        l(de, {
          get each() {
            return v();
          },
          children: (d) => {
            if (d.content.type === "textArea")
              return (() => {
                var C = zn(),
                  _ = C.firstChild,
                  P = _.nextSibling;
                return (
                  (_.$$click = () => {
                    const z = v().filter((B) => B.value !== d.value);
                    c(z), o([...r(), d]);
                  }),
                  n(_, l(me, {})),
                  n(
                    P,
                    l(tt, {
                      get name() {
                        return d.content.name;
                      },
                      get value() {
                        return d.content.value;
                      },
                      get title() {
                        return d.content.title ?? "";
                      },
                      get toolTipText() {
                        return d.content.toolTipText;
                      },
                      onInput: (z) => {
                        Re(d.content.name, z);
                      },
                    })
                  ),
                  C
                );
              })();
            if (d.content.type === "input")
              return (() => {
                var C = Ps(),
                  _ = C.firstChild,
                  P = _.nextSibling;
                return (
                  (_.$$click = () => {
                    const z = v().filter((B) => B.value !== d.value);
                    c(z), o([...r(), d]);
                  }),
                  n(_, l(me, {})),
                  n(
                    P,
                    l(ce, {
                      get name() {
                        return d.content.name;
                      },
                      get value() {
                        return d.content.value;
                      },
                      get title() {
                        return d.content.title ?? "";
                      },
                      get toolTipText() {
                        return d.content.toolTipText;
                      },
                      onInput: (z) => {
                        Re(d.content.name, z);
                      },
                    })
                  ),
                  C
                );
              })();
            if (d.content.type === "switch")
              return (() => {
                var C = zn(),
                  _ = C.firstChild,
                  P = _.nextSibling;
                return (
                  (_.$$click = () => {
                    const z = v().filter((B) => B.value !== d.value);
                    c(z), o([...r(), d]);
                  }),
                  n(_, l(me, {})),
                  n(
                    P,
                    l(Ie, {
                      get name() {
                        return d.content.name;
                      },
                      get title() {
                        return d.content.title ?? "";
                      },
                      get toolTipText() {
                        return d.content.toolTipText;
                      },
                      onChange: (z) => {
                        Re(d.content.name, z);
                      },
                    })
                  ),
                  C
                );
              })();
          },
        })
      ),
      n(
        I,
        l(Pe, {
          name: "Ai Agent Options",
          placeholder: "Add Option",
          dropdownOptions: r,
          selectedOptions: v,
          setSelectedOptions: c,
          setDropdownOptions: o,
          onChange: (d) => {
            c(d);
          },
        })
      ),
      R(() => D(y, `${N() ? "mt-5" : "mt-1"}`)),
      g
    );
  })();
};
he(["click"]);
const Wn = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  Ms = [
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
  Mo = (e, t) => ({
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
  [Vs, Fs] = O({}),
  { formConfig: Bs, setFormData: Rs, formData: zs } = xe(),
  Ft = (e, t, i) => {
    Fs((s) => ({ ...s, [e]: t }));
    const a = Mo(Vs(), Bs().id);
    Rs({ ...zs(), ollamaChat: a });
  };
var Ws = $(
    '<form class=form id=ollama-chatForm><div><div class=space-y-5><div></div><div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div></div><div class=mt-5>'
  ),
  ln = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const Hs = (e) => {
  const { formConfig: t } = xe(),
    [i, a] = O(Ms),
    [s, u] = O([]),
    { formData: r, setFormData: o } = xe(),
    v = (c) => {
      c.preventDefault();
      const p = new FormData(c.target);
      let b = Object.fromEntries(p.entries());
      const T = Mo(b, t().id);
      o({ ...r(), ollamaChat: T });
      const A = new CustomEvent("formSubmitEvent", { detail: b, bubbles: !0 }),
        N = document.getElementById("submitBtn");
      N && N.dispatchEvent(A);
    };
  return (() => {
    var c = Ws(),
      p = c.firstChild,
      b = p.firstChild,
      T = b.firstChild,
      A = T.nextSibling,
      N = A.nextSibling,
      m = N.firstChild,
      g = m.nextSibling,
      w = N.nextSibling;
    return (
      c.addEventListener("submit", v),
      n(
        T,
        l(nt, { name: "credential_ollama", placeholder: "Select a Credential" })
      ),
      n(
        A,
        l(_e, {
          name: "model",
          title: "Model",
          get defaultValue() {
            return Wn[0].value;
          },
          options: Wn,
          onChange: (y) => {
            Ft("modal", y);
          },
        })
      ),
      n(
        g,
        l(de, {
          get each() {
            return s();
          },
          children: (y, x) => {
            if (y.content.type === "switch")
              return (() => {
                var f = ln(),
                  h = f.firstChild;
                return (
                  (h.$$click = () => {
                    const E = s().filter((S) => S.value !== y.value);
                    u(E), a([...i(), y]);
                  }),
                  n(h, l(me, {})),
                  n(
                    f,
                    l(Ie, {
                      get name() {
                        return y.content.name;
                      },
                      get title() {
                        return y.content.title ?? "";
                      },
                      get toolTipText() {
                        return y.content.toolTipText;
                      },
                      onChange: (E) => {
                        Ft(y.content.name, E);
                      },
                    }),
                    null
                  ),
                  f
                );
              })();
            if (y.content.type === "dynamicInput")
              return (() => {
                var f = ln(),
                  h = f.firstChild;
                return (
                  (h.$$click = () => {
                    const E = s().filter((S) => S.value !== y.value);
                    u(E), a([...i(), y]);
                  }),
                  n(h, l(me, {})),
                  n(
                    f,
                    l(ce, {
                      get name() {
                        return y.content.name;
                      },
                      get value() {
                        return y.content.value;
                      },
                      get title() {
                        return y.content.title;
                      },
                      get toolTipText() {
                        return y.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return y.content.footNote;
                      },
                      get placeholder() {
                        return y.content.placeholder ?? "";
                      },
                      onInput: (E) => {
                        Ft(y.content.name, E);
                      },
                    }),
                    null
                  ),
                  f
                );
              })();
            if (y.content.type === "dropdownN")
              return (() => {
                var f = ln(),
                  h = f.firstChild;
                return (
                  (h.$$click = () => {
                    const E = s().filter((S) => S.value !== y.value);
                    u(E), a([...i(), y]);
                  }),
                  n(h, l(me, {})),
                  n(
                    f,
                    l(_e, {
                      get name() {
                        return y.content.name;
                      },
                      get title() {
                        return y.content.title;
                      },
                      get defaultValue() {
                        return y.content.options?.[0]?.value ?? "";
                      },
                      get options() {
                        return y.content.options ?? [];
                      },
                      get toolTipText() {
                        return y.content.toolTipText;
                      },
                      get footNote() {
                        return y.content.footNote;
                      },
                      onChange: (E) => {
                        Ft(y.content.name, E);
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
        w,
        l(Pe, {
          name: "Add Option",
          placeholder: "Add Option",
          selectedOptions: s,
          setSelectedOptions: u,
          dropdownOptions: i,
          setDropdownOptions: a,
          onChange: (y) => {
            u(y);
          },
        })
      ),
      c
    );
  })();
};
he(["click"]);
const qs = [
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
  on = [
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
  Hn = [
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
  xt = [
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
  rn = [
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
  an = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  sn = [
    { value: "Send", label: "Send" },
    { value: "sendAndWaitForResponse", label: "Send and Wait for Response" },
  ],
  Ue = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  je = {
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
  qn = [
    { value: "text", label: "Text", children: [Ue, je, bt] },
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
        je,
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
        je,
        Ue,
      ],
    },
    { value: "email", label: "Email", children: [Ue, je, bt] },
    {
      value: "file",
      label: "File",
      children: [
        Ue,
        je,
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
    { value: "number", label: "Number", children: [Ue, je, bt] },
    { value: "password", label: "Password", children: [Ue, je, bt] },
    { value: "textArea", label: "Textarea", children: [Ue, je, bt] },
  ];
var Us = $("<button type=button>");
const Xt = ({ title: e, width: t = "w-auto", onClick: i }) =>
  (() => {
    var a = Us();
    return (
      Fe(a, "click", i),
      D(
        a,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      n(a, e),
      a
    );
  })();
he(["click"]);
var _n = ((e) => (
    (e.Text = "text"),
    (e.Number = "number"),
    (e.Password = "password"),
    (e.Email = "email"),
    (e.Url = "url"),
    e
  ))(_n || {}),
  js = $(
    '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg baseProfile=tiny version=1.2 viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M17.707 8.293a.999.999 0 1 0-1.414 1.414L17.586 11H13V6.414l1.293 1.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L12 2.586 8.293 6.293a.999.999 0 1 0 1.414 1.414L11 6.414V11H6.414l1.293-1.293a.999.999 0 1 0-1.414-1.414L2.586 12l3.707 3.707a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L6.414 13H11v4.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414L12 21.414l3.707-3.707a.999.999 0 1 0-1.414-1.414L13 17.586V13h4.586l-1.293 1.293a.999.999 0 1 0 1.414 1.414L21.414 12l-3.707-3.707z">'
  );
const mt = (e) => js();
var Gs = $(
    '<div><div class="flex font-mono rounded bg-[#252631] min-h-[200px] max-h-[220px] "><div class="w-12 bg-[#1a1b26] border-r border-neutral-600 text-gray-400 text-sm leading-6 px-2 py-4 text-right select-none overflow-hidden">1</div><div class="flex-1 relative"><textarea autocomplete=off>'
  ),
  Xs = $("<label class=label>"),
  Ys = $("<div class=toolTipBtn>"),
  Js = $(
    '<div class="mb-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm"><span class=font-semibold>Line <!>:</span> '
  ),
  Zs = $('<button type=button aria-label="Toggle expanded view">'),
  Ks = $("<p class=foot-note>");
const kt = (e) => {
  const { setIsModalOpen3: t } = xe();
  let i, a, s;
  const [u, r] = O(null),
    o = (m) => {
      if (!m.trim()) return r(null), null;
      try {
        return JSON.parse(m), r(null), null;
      } catch (g) {
        const w = g instanceof Error ? g.message : "Invalid JSON",
          y = w.match(/line (\d+)/i) || w.match(/position (\d+)/i);
        let x = 1;
        if (y) {
          const h = parseInt(y[1]);
          x = (m.substring(0, h).match(/\n/g) || []).length + 1;
        }
        const f = { line: x, message: w };
        return r(f), f;
      }
    },
    v = (m) => {
      try {
        const g = JSON.parse(m);
        return JSON.stringify(g, null, 2);
      } catch {
        return m;
      }
    },
    c = (m) => {
      const g = m.split(`
`);
      if (s) {
        const w = g.map((y, x) => `${x + 1}`).join(`
`);
        s.textContent = w;
      }
    },
    p = (m) => {
      const w = m.target.value;
      c(w), o(w), e.onInput?.(w);
    },
    b = (m) => {
      m.preventDefault();
      const g = m.clipboardData?.getData("text") || "";
      if (g.trim())
        try {
          const w = v(g);
          i && ((i.value = w), c(w), o(w), e.onInput?.(w));
        } catch {
          i && ((i.value = g), c(g), o(g), e.onInput?.(g));
        }
    },
    T = () => {
      i && s && (s.scrollTop = i.scrollTop);
    },
    A = () => {
      e.disabled;
    },
    N = (m) => {
      setTimeout(() => T(), 0);
    };
  return (
    ke(() => {
      e.value && (c(e.value), o(e.value));
    }),
    (() => {
      var m = Gs(),
        g = m.firstChild,
        w = g.firstChild,
        y = w.nextSibling,
        x = y.firstChild,
        f = a;
      typeof f == "function" ? ye(f, m) : (a = m),
        n(
          m,
          (() => {
            var S = ne(() => !!e.title);
            return () =>
              S() &&
              (() => {
                var I = Xs();
                return (
                  n(I, () => e.title, null),
                  n(
                    I,
                    (() => {
                      var d = ne(() => !!e.toolTipText);
                      return () =>
                        d() &&
                        (() => {
                          var C = Ys();
                          return (
                            n(
                              C,
                              l(Be, {
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
                  R(() => ie(I, "for", e.name)),
                  I
                );
              })();
          })(),
          g
        ),
        n(
          m,
          (() => {
            var S = ne(() => !!u());
            return () =>
              S() &&
              (() => {
                var I = Js(),
                  d = I.firstChild,
                  C = d.firstChild,
                  _ = C.nextSibling;
                return (
                  _.nextSibling,
                  d.nextSibling,
                  n(d, () => u()?.line, _),
                  n(I, () => u()?.message, null),
                  I
                );
              })();
          })(),
          g
        );
      var h = s;
      typeof h == "function" ? ye(h, w) : (s = w),
        w.style.setProperty(
          "font-family",
          "Monaco, Menlo, 'Ubuntu Mono', monospace"
        ),
        w.style.setProperty("white-space", "pre-line"),
        w.style.setProperty("pointer-events", "none"),
        (x.$$keydown = N),
        x.addEventListener("focus", A),
        x.addEventListener("scroll", T),
        x.addEventListener("paste", b),
        (x.$$input = p);
      var E = i;
      return (
        typeof E == "function" ? ye(E, x) : (i = x),
        n(
          y,
          (() => {
            var S = ne(() => !!e.isArrow);
            return () =>
              S() &&
              (() => {
                var I = Zs();
                return (
                  (I.$$click = () => t(!0)),
                  n(I, l(ko, {})),
                  R(
                    (d) => {
                      var C = e.disabled,
                        _ = `absolute right-0 bottom-0 text-gray-400 text-[10px] bg-[#2c2e2f] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                          e.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`;
                      return (
                        C !== d.e && (I.disabled = d.e = C),
                        _ !== d.t && D(I, (d.t = _)),
                        d
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
          m,
          (() => {
            var S = ne(() => !!e.footNote);
            return () =>
              S() &&
              (() => {
                var I = Ks();
                return n(I, () => e.footNote), I;
              })();
          })(),
          null
        ),
        R(
          (S) => {
            var I = `relative h-full w-full group ${e.class || ""}`,
              d = e.name,
              C = e.disabled,
              _ = e.placeholder || "",
              P = `${
                e.disabled ? "opacity-50 cursor-not-allowed" : ""
              } w-full h-full min-h-[200px] max-h-[220px] bg-transparent jsonMain text-white placeholder-gray-500 outline-none transition-colors resize-none px-4 py-4 leading-6`;
            return (
              I !== S.e && D(m, (S.e = I)),
              d !== S.t && ie(x, "name", (S.t = d)),
              C !== S.a && (x.disabled = S.a = C),
              _ !== S.o && ie(x, "placeholder", (S.o = _)),
              P !== S.i && D(x, (S.i = P)),
              S
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        R(() => (x.value = e.value || "")),
        m
      );
    })()
  );
};
he(["input", "keydown", "click"]);
var Un = $('<div class="mt-5 space-y-5">'),
  Qs = $(
    '<div><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  jn = $(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  ed = $(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  Gn = $(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  td = $(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  dn = $('<div class="space-y-5 mt-5">'),
  nd = $('<div class="label hr-solid-line">Form Elements'),
  ld = $("<div class=space-y-5>"),
  od = $('<div><div class="label hr-solid-line">Options'),
  id = $(
    "<div><form name=SendEmailParam><div class=space-y-5><div class=space-y-5>"
  ),
  yt = $(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Xn = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  rd = $('<div class="space-y-4 mt-5">'),
  ad = $(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  sd = $(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  dd = $(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const cd = (e) => {
  const [t, i] = O(sn[0]),
    [a, s] = O(on[0]),
    [u, r] = O(rn[0]),
    [o, v] = O(!1),
    [c, p] = O(gt[0]),
    [b, T] = O(!1),
    [A, N] = O(xt[0]),
    [m, g] = O([]),
    [w, y] = O([]),
    [x, f] = O(an[0]),
    [h, E] = O([]),
    [S, I] = O({}),
    [d, C] = O({});
  return (
    Ee(() => {
      g(Hn);
    }),
    ke(() => {
      t().value === "Send"
        ? (g(Hn), y([]))
        : t().value === "sendAndWaitForResponse" &&
          (u().value === "Approval"
            ? (g([
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
              y([]))
            : (u().value === "freeText" || u().value === "customForm") &&
              (g(qs), y([])));
    }),
    (() => {
      var _ = id(),
        P = _.firstChild,
        z = P.firstChild,
        B = z.firstChild;
      return (
        n(
          z,
          l(nt, {
            name: "credential",
            title: "Credential to connect with",
            placeholder: "Create credential...",
          }),
          B
        ),
        n(
          z,
          l(Se, {
            name: "Operation",
            title: "Operation",
            options: sn,
            get defaultValue() {
              return sn[0].value;
            },
            onChange: (W) => {
              i(W);
            },
          }),
          B
        ),
        n(
          z,
          l(ce, {
            name: "from email",
            title: "From Email",
            placeholder: "admin@example.com",
            toolTipText:
              "Email address of the sender. You can also specify a name: Nathan Doe <nate@n8n.io>.",
            get type() {
              return _n.Email;
            },
            isArrow: !0,
          }),
          B
        ),
        n(
          z,
          l(ce, {
            name: "to email",
            title: "To Email",
            placeholder: "info@example.com",
            toolTipText:
              "Email address of the recipient. You can also specify a name: Nathan Doe <nate@n8n.io>.",
            get type() {
              return _n.Email;
            },
            isArrow: !0,
          }),
          B
        ),
        n(
          z,
          l(ce, {
            name: "subject",
            title: "Subject",
            placeholder: "e.g. Approval required",
            isArrow: !0,
          }),
          B
        ),
        n(
          B,
          l(Q, {
            get when() {
              return t().value === "Send";
            },
            get children() {
              return [
                l(Se, {
                  name: "emailFormat",
                  title: "Email Format",
                  options: on,
                  get defaultValue() {
                    return on[0].value;
                  },
                  toolTipText: "Select the format for the email",
                  onChange: (W) => {
                    s(W);
                  },
                }),
                (() => {
                  var W = Un();
                  return (
                    n(
                      W,
                      l(de, {
                        get each() {
                          return a()?.children;
                        },
                        children: (q) =>
                          l(tt, {
                            get name() {
                              return `email_format_${q.title}`;
                            },
                            get title() {
                              return q.title ?? "";
                            },
                            get toolTipText() {
                              return q.toolTipText;
                            },
                          }),
                      })
                    ),
                    W
                  );
                })(),
                (() => {
                  var W = Qs(),
                    q = W.firstChild,
                    V = q.nextSibling,
                    le = V.nextSibling;
                  return (
                    n(
                      W,
                      (() => {
                        var U = ne(() => w().length <= 0);
                        return () => U() && yt();
                      })(),
                      V
                    ),
                    n(
                      V,
                      l(de, {
                        get each() {
                          return w();
                        },
                        children: (U) => {
                          if (U.content.type === "dynamicInput")
                            return (() => {
                              var K = Xn(),
                                ee = K.firstChild,
                                pe = ee.nextSibling;
                              return (
                                (ee.$$click = () => {
                                  const te = w().filter(
                                    (Z) => Z.value !== U.value
                                  );
                                  y(te), g([...m(), U]);
                                }),
                                n(ee, l(me, {})),
                                n(
                                  pe,
                                  l(ce, {
                                    get name() {
                                      return U.content.name;
                                    },
                                    get title() {
                                      return U.content.title;
                                    },
                                    get placeholder() {
                                      return U.content.placeholder;
                                    },
                                    get toolTipText() {
                                      return U.content.toolTipText;
                                    },
                                    isArrow: !0,
                                  })
                                ),
                                K
                              );
                            })();
                          if (U.content.type === "switch")
                            return (() => {
                              var K = Xn(),
                                ee = K.firstChild,
                                pe = ee.nextSibling;
                              return (
                                (ee.$$click = () => {
                                  const te = w().filter(
                                    (Z) => Z.value !== U.value
                                  );
                                  y(te), g([...m(), U]);
                                }),
                                n(ee, l(me, {})),
                                n(
                                  pe,
                                  l(Ie, {
                                    get title() {
                                      return U.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return U.content.toolTipText;
                                    },
                                    get name() {
                                      return U.content.name;
                                    },
                                  })
                                ),
                                K
                              );
                            })();
                        },
                      })
                    ),
                    n(
                      le,
                      l(Pe, {
                        name: "optionsForSendOperation",
                        placeholder: "Add option",
                        dropdownOptions: m,
                        setDropdownOptions: g,
                        selectedOptions: w,
                        setSelectedOptions: y,
                        onChange: (U) => {
                          y(U);
                        },
                      })
                    ),
                    W
                  );
                })(),
              ];
            },
          }),
          null
        ),
        n(
          B,
          l(Q, {
            get when() {
              return t().value === "sendAndWaitForResponse";
            },
            get children() {
              return [
                l(tt, { name: "message", title: "Message" }),
                l(Se, {
                  name: "responseType",
                  title: "Response Type",
                  options: rn,
                  get defaultValue() {
                    return rn[0].value;
                  },
                  onChange: (W) => {
                    r(W);
                  },
                }),
                (() => {
                  var W = dn();
                  return (
                    n(
                      W,
                      l(Q, {
                        get when() {
                          return u().value === "Approval";
                        },
                        get children() {
                          return [
                            (() => {
                              var q = ed(),
                                V = q.firstChild,
                                le = V.nextSibling,
                                U = le.nextSibling;
                              return (
                                n(
                                  q,
                                  (() => {
                                    var K = ne(() => !o());
                                    return () => K() && yt();
                                  })(),
                                  le
                                ),
                                n(
                                  le,
                                  l(Xt, {
                                    onClick: () => v(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                n(
                                  U,
                                  l(Q, {
                                    get when() {
                                      return o();
                                    },
                                    get children() {
                                      var K = jn(),
                                        ee = K.firstChild,
                                        pe = ee.nextSibling;
                                      return (
                                        (ee.$$click = () => {
                                          v(!1), p(gt[0]);
                                        }),
                                        n(ee, l(me, {})),
                                        n(
                                          pe,
                                          l(Se, {
                                            name: "typeOfApproval",
                                            title: "Type of Approval",
                                            options: gt,
                                            get defaultValue() {
                                              return gt[0].value;
                                            },
                                            onChange: (te) => {
                                              p(te);
                                            },
                                          }),
                                          null
                                        ),
                                        n(
                                          pe,
                                          l(ce, {
                                            name: "approveButtonLabel",
                                            title: "Approve Button Label",
                                            value: "Approve",
                                          }),
                                          null
                                        ),
                                        n(
                                          pe,
                                          l(_e, {
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
                                          pe,
                                          l(Q, {
                                            get when() {
                                              return (
                                                c().value ===
                                                "approvedAndDisapproved"
                                              );
                                            },
                                            get children() {
                                              return [
                                                l(ce, {
                                                  name: "disapproveButtonLabel",
                                                  title:
                                                    "Disapprove Button Label",
                                                  value: "Disapprove",
                                                }),
                                                l(_e, {
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
                                R(() => D(le, `${o() ? "hidden" : "mt-5"}`)),
                                q
                              );
                            })(),
                            (() => {
                              var q = td(),
                                V = q.firstChild,
                                le = V.nextSibling,
                                U = le.nextSibling;
                              return (
                                n(
                                  q,
                                  (() => {
                                    var K = ne(() => !b());
                                    return () => K() && yt();
                                  })(),
                                  le
                                ),
                                n(
                                  le,
                                  l(Xt, {
                                    onClick: () => T(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                n(
                                  U,
                                  l(Q, {
                                    get when() {
                                      return b();
                                    },
                                    get children() {
                                      var K = Gn(),
                                        ee = K.firstChild,
                                        pe = ee.nextSibling,
                                        te = pe.firstChild;
                                      return (
                                        (ee.$$click = () => {
                                          T(!1), N(gt[0]);
                                        }),
                                        n(ee, l(me, {})),
                                        n(
                                          pe,
                                          l(Se, {
                                            name: "limitType",
                                            title: "Limit Type",
                                            options: xt,
                                            get defaultValue() {
                                              return xt[0].value;
                                            },
                                            toolTipText:
                                              "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                            onChange: (Z) => {
                                              N(Z);
                                            },
                                          }),
                                          te
                                        ),
                                        n(
                                          te,
                                          l(Q, {
                                            get when() {
                                              return (
                                                A().value ===
                                                "afterTimeInterval"
                                              );
                                            },
                                            get children() {
                                              return [
                                                l(ce, {
                                                  name: "amount",
                                                  title: "Amount",
                                                  value: 45,
                                                  toolTipText:
                                                    "The time to wait.",
                                                }),
                                                l(_e, {
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
                                          te,
                                          l(Q, {
                                            get when() {
                                              return (
                                                A().value === "atSpecifiedTime"
                                              );
                                            },
                                            get children() {
                                              return l(ce, {
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
                                R(() => D(le, `${b() ? "hidden" : "mt-5"}`)),
                                q
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    W
                  );
                })(),
                (() => {
                  var W = dn();
                  return (
                    n(
                      W,
                      l(Q, {
                        get when() {
                          return u().value === "customForm";
                        },
                        get children() {
                          return [
                            l(Se, {
                              name: "defineForm",
                              title: "Define Form",
                              options: an,
                              get defaultValue() {
                                return an[0].value;
                              },
                              onChange: (q) => {
                                f(q);
                              },
                            }),
                            l(Q, {
                              get when() {
                                return x().value === "usingJSON";
                              },
                              get children() {
                                return l(kt, {
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
                              var q = ld();
                              return (
                                n(
                                  q,
                                  l(Q, {
                                    get when() {
                                      return x().value === "usingFieldBelow";
                                    },
                                    get children() {
                                      return [
                                        nd(),
                                        ne(
                                          () =>
                                            ne(() => h().length <= 0)() && yt()
                                        ),
                                        (() => {
                                          var V = Un();
                                          return (
                                            n(
                                              V,
                                              l(de, {
                                                get each() {
                                                  return h();
                                                },
                                                children: (le, U) =>
                                                  (() => {
                                                    var K = ad(),
                                                      ee = K.firstChild,
                                                      pe = ee.firstChild,
                                                      te = pe.nextSibling,
                                                      Z = ee.nextSibling;
                                                    return (
                                                      n(pe, l(mt, {})),
                                                      (te.$$click = () => {
                                                        E(
                                                          h().filter(
                                                            (ae, j) => ae !== le
                                                          )
                                                        );
                                                      }),
                                                      n(te, l(me, {})),
                                                      n(
                                                        Z,
                                                        l(Se, {
                                                          name: "elementType",
                                                          title: "Element Type",
                                                          toolTipText:
                                                            "The type of field to add to the form",
                                                          options: qn,
                                                          get defaultValue() {
                                                            return qn[0].value;
                                                          },
                                                          onChange: (ae) => {
                                                            I((j) => ({
                                                              ...j,
                                                              [le]:
                                                                ae.children ||
                                                                [],
                                                            }));
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      n(
                                                        Z,
                                                        l(Q, {
                                                          get when() {
                                                            return S()[le];
                                                          },
                                                          get children() {
                                                            var ae = rd();
                                                            return (
                                                              n(
                                                                ae,
                                                                l(de, {
                                                                  get each() {
                                                                    return S()[
                                                                      le
                                                                    ];
                                                                  },
                                                                  children: (
                                                                    j
                                                                  ) => {
                                                                    if (
                                                                      j.type ===
                                                                      "dynamicInput"
                                                                    )
                                                                      return l(
                                                                        ce,
                                                                        {
                                                                          get name() {
                                                                            return `${le}_${j.title}`;
                                                                          },
                                                                          get title() {
                                                                            return j.title;
                                                                          },
                                                                          get toolTipText() {
                                                                            return j.toolTipText;
                                                                          },
                                                                          get value() {
                                                                            return j.value;
                                                                          },
                                                                          get placeholder() {
                                                                            return j.placeholder;
                                                                          },
                                                                        }
                                                                      );
                                                                    if (
                                                                      j.type ===
                                                                      "switch"
                                                                    )
                                                                      return l(
                                                                        Ie,
                                                                        {
                                                                          get name() {
                                                                            return `${le}_${j.title}`;
                                                                          },
                                                                          get title() {
                                                                            return (
                                                                              j.title ??
                                                                              ""
                                                                            );
                                                                          },
                                                                          get toolTipText() {
                                                                            return j.toolTipText;
                                                                          },
                                                                        }
                                                                      );
                                                                    if (
                                                                      j.type ===
                                                                      "textBlock"
                                                                    )
                                                                      return l(
                                                                        Jt,
                                                                        {
                                                                          get children() {
                                                                            return j.placeholder;
                                                                          },
                                                                        }
                                                                      );
                                                                    if (
                                                                      j.type ===
                                                                      "jsonEditor"
                                                                    )
                                                                      return l(
                                                                        kt,
                                                                        {
                                                                          get name() {
                                                                            return `${le}_${j.title}`;
                                                                          },
                                                                          get title() {
                                                                            return j.title;
                                                                          },
                                                                          get footNote() {
                                                                            return j.footNote;
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
                                                                      j.type ===
                                                                      "inputBlock"
                                                                    )
                                                                      return (() => {
                                                                        var fe =
                                                                            sd(),
                                                                          H =
                                                                            fe.firstChild,
                                                                          se =
                                                                            H.nextSibling;
                                                                        return (
                                                                          n(
                                                                            se,
                                                                            l(
                                                                              de,
                                                                              {
                                                                                get each() {
                                                                                  return d()[
                                                                                    le
                                                                                  ];
                                                                                },
                                                                                children:
                                                                                  (
                                                                                    L,
                                                                                    J
                                                                                  ) =>
                                                                                    (() => {
                                                                                      var Y =
                                                                                          dd(),
                                                                                        k =
                                                                                          Y.firstChild,
                                                                                        M =
                                                                                          k.firstChild,
                                                                                        F =
                                                                                          M.nextSibling,
                                                                                        oe =
                                                                                          k.nextSibling;
                                                                                      return (
                                                                                        n(
                                                                                          M,
                                                                                          l(
                                                                                            mt,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        (F.$$click =
                                                                                          () => {
                                                                                            C(
                                                                                              (
                                                                                                G
                                                                                              ) => ({
                                                                                                ...G,
                                                                                                [le]: G[
                                                                                                  le
                                                                                                ].filter(
                                                                                                  (
                                                                                                    X
                                                                                                  ) =>
                                                                                                    X !==
                                                                                                    L
                                                                                                ),
                                                                                              })
                                                                                            );
                                                                                          }),
                                                                                        n(
                                                                                          F,
                                                                                          l(
                                                                                            me,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        n(
                                                                                          oe,
                                                                                          l(
                                                                                            ce,
                                                                                            {
                                                                                              get name() {
                                                                                                return `${le}_${j.name}_${L}`;
                                                                                              },
                                                                                              title:
                                                                                                "Option",
                                                                                            }
                                                                                          )
                                                                                        ),
                                                                                        R(
                                                                                          () =>
                                                                                            D(
                                                                                              Y,
                                                                                              `flex gap-1.5 ${
                                                                                                J() !==
                                                                                                0
                                                                                                  ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                  : ""
                                                                                              }`
                                                                                            )
                                                                                        ),
                                                                                        Y
                                                                                      );
                                                                                    })(),
                                                                              }
                                                                            )
                                                                          ),
                                                                          n(
                                                                            fe,
                                                                            l(
                                                                              et,
                                                                              {
                                                                                label:
                                                                                  "Add Field Option",
                                                                                onClick:
                                                                                  () => {
                                                                                    C(
                                                                                      (
                                                                                        L
                                                                                      ) => ({
                                                                                        ...L,
                                                                                        [le]: [
                                                                                          ...(L[
                                                                                            le
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
                                                                          fe
                                                                        );
                                                                      })();
                                                                  },
                                                                })
                                                              ),
                                                              ae
                                                            );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      R(() =>
                                                        D(
                                                          K,
                                                          `flex gap-1.5 ${
                                                            U() !== 0
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
                                            V
                                          );
                                        })(),
                                        l(et, {
                                          label: "Add Form Element",
                                          onClick: () => {
                                            E([
                                              ...h(),
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
                                q
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    W
                  );
                })(),
                (() => {
                  var W = dn();
                  return (
                    n(
                      W,
                      l(Q, {
                        get when() {
                          return (
                            u().value === "freeText" ||
                            u().value === "customForm"
                          );
                        },
                        get children() {
                          return [
                            (() => {
                              var q = od();
                              return (
                                q.firstChild,
                                n(
                                  q,
                                  (() => {
                                    var V = ne(() => w().length <= 0);
                                    return () => V() && yt();
                                  })(),
                                  null
                                ),
                                q
                              );
                            })(),
                            l(de, {
                              get each() {
                                return w();
                              },
                              children: (q) => {
                                if (q.content.type === "dynamicInput")
                                  return (() => {
                                    var V = jn(),
                                      le = V.firstChild,
                                      U = le.nextSibling;
                                    return (
                                      (le.$$click = () => {
                                        const K = w().filter(
                                          (ee) => ee.value !== q.value
                                        );
                                        y(K), g([...m(), q]);
                                      }),
                                      n(le, l(me, {})),
                                      n(
                                        U,
                                        l(ce, {
                                          get name() {
                                            return q.content.name;
                                          },
                                          get title() {
                                            return q.content.title;
                                          },
                                          get toolTipText() {
                                            return q.content.toolTipText;
                                          },
                                        })
                                      ),
                                      V
                                    );
                                  })();
                                if (q.content.type === "reproductiveDropDown")
                                  return (() => {
                                    var V = Gn(),
                                      le = V.firstChild,
                                      U = le.nextSibling,
                                      K = U.firstChild;
                                    return (
                                      (le.$$click = () => {
                                        const ee = w().filter(
                                          (pe) => pe.value !== q.value
                                        );
                                        y(ee), g([...m(), q]);
                                      }),
                                      n(le, l(me, {})),
                                      n(
                                        U,
                                        l(Se, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: xt,
                                          get defaultValue() {
                                            return xt[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (ee) => {
                                            N(ee);
                                          },
                                        }),
                                        K
                                      ),
                                      n(
                                        K,
                                        l(Q, {
                                          get when() {
                                            return (
                                              A().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              l(ce, {
                                                name: "amount",
                                                title: "Amount",
                                                value: 45,
                                                toolTipText:
                                                  "The time to wait.",
                                              }),
                                              l(_e, {
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
                                        K,
                                        l(Q, {
                                          get when() {
                                            return (
                                              A().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return l(ce, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      V
                                    );
                                  })();
                              },
                            }),
                            l(Pe, {
                              name: "Option",
                              dropdownOptions: m,
                              setDropdownOptions: g,
                              selectedOptions: w,
                              setSelectedOptions: y,
                              placeholder: "Add Options",
                              onChange: (q) => {
                                y(q);
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
          }),
          null
        ),
        _
      );
    })()
  );
};
he(["click"]);
const Vo = [
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
  Yn = [
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
    ...Vo,
  ],
  cn = [
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
  Jn = [
    { label: "𝔸  String", value: "String" },
    { label: "#  Number", value: "Number" },
    { label: "🗹  Boolean", value: "Boolean" },
    { label: "⊞  Array", value: "Array" },
    { label: "{.}  Object", value: "Object" },
  ],
  Fo = (e, t) => {
    const i = (a) => {
      const [s, u] = O(1);
      return Object.values(
        Object.entries(a)
          .filter(([r, o]) => r.startsWith("field_"))
          .reduce((r, [o, v]) => {
            const c = o.split("_"),
              p = `${c[0]}_${c[1]}`,
              b = c[2];
            return (
              (r[p] ??= {}),
              r[p].id || ((r[p].id = s()), u((T) => T + 1)),
              b === "name"
                ? (r[p].name = v)
                : b === "value"
                ? (r[p].value = v)
                : b === "type" && (r[p].type = v),
              r
            );
          }, {})
      );
    };
    return {
      id: t,
      name: "Edit Fields",
      description: "Modify,add,or remove item fields.",
      type: "EditNode",
      parameter: {
        mode: e?.mode,
        assignment: i(e),
        position: { x: 400, y: 100 },
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
  [ud, pd] = O({}),
  { formConfig: vd, formData: md, setFormData: hd } = xe(),
  Je = (e, t, i) => {
    pd((s) => ({ ...s, [e]: t }));
    const a = Fo(ud(), vd().id);
    hd({ ...md(), EditNodeData: a });
  };
var fd = $('<div class="label hr-solid-line">Fields to Set'),
  gd = $('<div class="flex flex-col gap-6 mt-5">'),
  xd = $(
    "<div><p class=text-[#ddd5d5]>Drag input fields here </p><p class=text-[#9b9494]>or</p><p class=text-[#df4c38]>Add Field"
  ),
  bd = $(
    '<form class=form id=editForm><div><div class=mt-5><div class=mt-5></div><div class=mt-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  yd = $(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[130px]></div></div><div>'
  ),
  wd = $(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const $d = (e) => {
  const { formConfig: t } = xe(),
    [i, a] = O(cn[0]),
    [s, u] = O([]);
  O();
  const [r, o] = O([]),
    [v, c] = O([]),
    { formData: p, setFormData: b } = xe();
  Ee(() => {
    c(Yn);
  }),
    ke(() => {
      i().value === "Manual Mapping" ? (o([]), c(Yn)) : (o([]), c(Vo));
    });
  const T = (A) => {
    A.preventDefault();
    const N = new FormData(A.target);
    let m = Object.fromEntries(N.entries());
    console.log("unformatted data", m);
    const g = Fo(m, t().id);
    console.log("formatted data", g), b({ ...p(), EditNodeData: m });
    const w = new CustomEvent("formSubmitEvent", { detail: m, bubbles: !0 }),
      y = document.getElementById("submitBtn");
    y && y.dispatchEvent(w);
  };
  return (() => {
    var A = bd(),
      N = A.firstChild,
      m = N.firstChild,
      g = m.firstChild,
      w = g.nextSibling,
      y = w.nextSibling,
      x = y.firstChild,
      f = x.nextSibling,
      h = f.nextSibling;
    return (
      A.addEventListener("submit", T),
      n(
        N,
        l(_e, {
          name: "mode",
          title: "Mode",
          options: cn,
          get defaultValue() {
            return cn[0].value;
          },
          onChange: (E) => {
            a(E), Je("mode", E.value);
          },
        }),
        m
      ),
      n(
        m,
        l(Q, {
          get when() {
            return i().value === "Manual Mapping";
          },
          get children() {
            return [
              fd(),
              (() => {
                var E = gd();
                return (
                  n(
                    E,
                    l(de, {
                      get each() {
                        return s();
                      },
                      children: (S, I) =>
                        (() => {
                          var d = yd(),
                            C = d.firstChild,
                            _ = C.firstChild,
                            P = _.nextSibling,
                            z = C.nextSibling,
                            B = z.firstChild,
                            W = B.firstChild,
                            q = W.nextSibling,
                            V = B.nextSibling;
                          return (
                            n(_, l(mt, {})),
                            (P.$$click = () => {
                              u(s().filter((le, U) => le !== S));
                            }),
                            n(P, l(me, {})),
                            n(
                              W,
                              l(ce, {
                                placeholder: "name",
                                name: `${S}_name`,
                                value: "",
                                isArrow: !0,
                                onInput: (le) => {
                                  Je(`${S}_name`, le);
                                },
                              })
                            ),
                            n(
                              q,
                              l(_e, {
                                name: `${S}_type`,
                                options: Jn,
                                get defaultValue() {
                                  return Jn[0].value;
                                },
                                onChange: (le) => {
                                  Je(`${S}_type`, le.value);
                                },
                              })
                            ),
                            n(
                              V,
                              l(ce, {
                                placeholder: "value",
                                name: `${S}_value`,
                                value: "",
                                isArrow: !0,
                                onInput: (le) => {
                                  Je(`${S}_value`, le);
                                },
                              })
                            ),
                            R(() =>
                              D(
                                d,
                                `flex gap-1.5 ${
                                  I() !== 0
                                    ? "border-t pt-6 border-dashed border-[#575555]"
                                    : ""
                                }`
                              )
                            ),
                            d
                          );
                        })(),
                    })
                  ),
                  E
                );
              })(),
              (() => {
                var E = xd();
                return (
                  (E.$$click = () => {
                    u([
                      ...s(),
                      `field_${Math.random().toString(36).substring(2, 8)}`,
                    ]);
                  }),
                  R(() =>
                    D(
                      E,
                      `${
                        s().length <= 0 ? "h-44" : "h-14 mt-5 "
                      } p-4 flex text-center border border-dashed border-[#9c9c9e] rounded-md bg-[#252434] hover:border-[#ffa89d] hover:bg-[#fc7c6b13] cursor-pointer ${
                        s().length <= 0 ? "flex-col" : "flex col"
                      } items-center justify-center gap-1`
                    )
                  ),
                  E
                );
              })(),
            ];
          },
        }),
        g
      ),
      n(
        g,
        l(Q, {
          get when() {
            return i().value === "JSON";
          },
          get children() {
            return l(kt, {
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
                Je("json_editor", E);
              },
            });
          },
        })
      ),
      n(
        w,
        l(Ie, {
          name: "includeOtherInputFields",
          title: "Include Other Input Fields",
          toolTipText:
            "Whether to pass to the output all the input fields (along with the fields set in 'Fields to Set')",
          onChange: (E) => {
            Je("includeOtherInputFields", E);
          },
        })
      ),
      n(
        f,
        l(de, {
          get each() {
            return r();
          },
          children: (E, S) =>
            (() => {
              var I = wd(),
                d = I.firstChild,
                C = d.nextSibling;
              return (
                (d.$$click = () => {
                  o(r().filter((_) => _ !== E)), c([...v(), E]);
                }),
                n(d, l(me, {})),
                n(
                  C,
                  l(Ie, {
                    get title() {
                      return E.content.title ?? "";
                    },
                    get toolTipText() {
                      return E.content.toolTipText ?? "";
                    },
                    get name() {
                      return E.content.name;
                    },
                    onChange: (_) => {
                      Je("includeOtherInputFields", _);
                    },
                  })
                ),
                I
              );
            })(),
        })
      ),
      n(
        h,
        l(Pe, {
          name: "options_edit_node",
          selectedOptions: r,
          setSelectedOptions: o,
          dropdownOptions: v,
          setDropdownOptions: c,
          placeholder: "Add options",
          onChange: (E) => {},
        })
      ),
      R(() => D(h, `${r().length <= 0 ? "" : "mt-5"}`)),
      A
    );
  })();
};
he(["click"]);
const _d = [
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
  un = [
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
  Zn = [
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
var Td = $("<div class=nested-header><span class=chevron-left>❮</span>"),
  Cd = $(
    '<div class=custom-select><select title="native select for multi-steps dropdown"class=hidden-select></select><div title="custom select button"class=select-selected aria-haspopup=listbox aria-expanded=false role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  Kn = $("<option>"),
  Sd = $("<div class=parent-option role=option aria-selected=false>"),
  Id = $("<span class=chevron-right>❯"),
  Ed = $("<div class=child-option role=option aria-selected=false>");
const Nd = (e) => {
  const [t, i] = O(!1),
    [a, s] = O(e.defaultValue || ""),
    [u, r] = O(
      e.options.find((x) => x.value === e.defaultValue)?.label ||
        e.placeholder ||
        "Select an option"
    ),
    [o, v] = O("main"),
    [c, p] = O(null);
  let b, T;
  const A = (x) => {
      b && !b.contains(x.target) && (i(!1), v("main"));
    },
    N = () => {
      i(!1), v("main");
    };
  Ee(() => {
    document.addEventListener("mousedown", A),
      document.addEventListener("touchstart", A, { passive: !0 }),
      window.addEventListener("resize", N),
      window.addEventListener("blur", N);
  }),
    De(() => {
      document.removeEventListener("mousedown", A),
        document.removeEventListener("touchstart", A),
        window.removeEventListener("resize", N),
        window.removeEventListener("blur", N);
    }),
    ke(() => {
      if (a() !== "" && e.onChange) {
        let x;
        for (const f of e.options) {
          if (f.value === a()) {
            x = { value: f.value, label: f.label };
            break;
          }
          if (f.children) {
            const h = f.children.find((E) => E.value === a());
            if (h) {
              x = h;
              break;
            }
          }
        }
        x && e.onChange(x);
      }
    });
  const m = (x) => {
      x.stopPropagation(), i(!t()), t() || v("main");
    },
    g = (x) => {
      p(x), v(x.value);
    },
    w = (x) => {
      s(x.value), r(x.label), i(!1), v("main"), b && b.focus();
    },
    y = () => {
      v("main");
    };
  return (() => {
    var x = Cd(),
      f = x.firstChild,
      h = f.nextSibling,
      E = h.nextSibling,
      S = b;
    typeof S == "function" ? ye(S, x) : (b = x),
      n(
        f,
        l(de, {
          get each() {
            return e.options;
          },
          children: (d) => [
            (() => {
              var C = Kn();
              return (
                n(C, () => d.label),
                R(() => (C.selected = d.value === a())),
                R(() => (C.value = d.value)),
                C
              );
            })(),
            ne(
              () =>
                ne(() => !!d.children)() &&
                l(de, {
                  get each() {
                    return d.children;
                  },
                  children: (C) =>
                    (() => {
                      var _ = Kn();
                      return (
                        n(_, () => C.label),
                        R(() => (_.selected = C.value === a())),
                        R(() => (_.value = C.value)),
                        _
                      );
                    })(),
                })
            ),
          ],
        })
      ),
      Fe(h, "click", e.disabled ? void 0 : m),
      n(h, u);
    var I = T;
    return (
      typeof I == "function" ? ye(I, E) : (T = E),
      n(
        E,
        l(Q, {
          get when() {
            return o() === "main";
          },
          get children() {
            return l(de, {
              get each() {
                return e.options;
              },
              children: (d) =>
                (() => {
                  var C = Sd();
                  return (
                    (C.$$click = () => (d.children ? g(d) : w(d))),
                    n(C, () => d.label, null),
                    n(
                      C,
                      (() => {
                        var _ = ne(() => !!d.children);
                        return () => _() && Id();
                      })(),
                      null
                    ),
                    R(
                      (_) => {
                        var P = d.value === a(),
                          z = d.value === a(),
                          B = t() ? 0 : -1;
                        return (
                          P !== _.e &&
                            C.classList.toggle("selected", (_.e = P)),
                          z !== _.t &&
                            C.classList.toggle("aria-selected-true", (_.t = z)),
                          B !== _.a && ie(C, "tabindex", (_.a = B)),
                          _
                        );
                      },
                      { e: void 0, t: void 0, a: void 0 }
                    ),
                    C
                  );
                })(),
            });
          },
        }),
        null
      ),
      n(
        E,
        l(Q, {
          get when() {
            return o() !== "main";
          },
          get children() {
            return [
              (() => {
                var d = Td();
                return (
                  d.firstChild,
                  (d.$$click = y),
                  n(d, () => e.categoryLabel || "", null),
                  d
                );
              })(),
              l(de, {
                get each() {
                  return c()?.children || [];
                },
                children: (d) =>
                  (() => {
                    var C = Ed();
                    return (
                      (C.$$click = () => w(d)),
                      n(C, () => d.label),
                      R(
                        (_) => {
                          var P = d.value === a(),
                            z = d.value === a(),
                            B = t() ? 0 : -1;
                          return (
                            P !== _.e &&
                              C.classList.toggle("selected", (_.e = P)),
                            z !== _.t &&
                              C.classList.toggle(
                                "aria-selected-true",
                                (_.t = z)
                              ),
                            B !== _.a && ie(C, "tabindex", (_.a = B)),
                            _
                          );
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      C
                    );
                  })(),
              }),
            ];
          },
        }),
        null
      ),
      R(
        (d) => {
          var C = e.name,
            _ = e.required,
            P = e.disabled,
            z = !!t(),
            B = !!e.disabled,
            W = !!t(),
            q = e.disabled ? -1 : 0,
            V = `select-items ${t() ? "select-show" : "select-hide"}`;
          return (
            C !== d.e && ie(f, "name", (d.e = C)),
            _ !== d.t && (f.required = d.t = _),
            P !== d.a && (f.disabled = d.a = P),
            z !== d.o && h.classList.toggle("active", (d.o = z)),
            B !== d.i && h.classList.toggle("disabled", (d.i = B)),
            W !== d.n && h.classList.toggle("aria-expanded-true", (d.n = W)),
            q !== d.s && ie(h, "tabindex", (d.s = q)),
            V !== d.h && D(E, (d.h = V)),
            d
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
      x
    );
  })();
};
he(["click"]);
const [Wp, Od] = O({}),
  { formConfig: Hp, setFormData: qp, formData: Up } = xe(),
  Me = (e, t, i) => {
    Od((a) => ({ ...a, [e]: t }));
  };
var Ad = $("<div class=mt-5>"),
  Dd = $('<div class="label hr-solid-line">Routing Rules'),
  kd = $('<div class=mt-5><div class="flex flex-col gap-8">'),
  Pd = $(
    '<div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  Ld = $("<div class=space-y-5><div></div><div>"),
  Md = $("<form id=switchNodeForm><div><div class=mt-5>"),
  Vd = $(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Fd = $(
    '<div class="text-[#7c81ca] text-xs bg-[#504f7e] p-1 w-4 h-4 font-[900] rounded-full flex items-center justify-center">'
  ),
  Bd = $("<div class=mt-4>"),
  Rd = $(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5 items-start"><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[170px]></div></div><div></div></div><div class="mt-3 select-none"></div></div><div class=mt-5>'
  ),
  Qn = $(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const el = () =>
    (() => {
      var e = Ad();
      return (
        n(
          e,
          l(Ie, {
            name: "convertTypeWhereRequired",
            title: "Convert Type Where Required",
            toolTipText: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`,
            onChange: (t) => {
              Me("convertTypeWhereRequired", t);
            },
          })
        ),
        e
      );
    })(),
  zd = (e) => {
    const {
        nodes: t,
        setNodes: i,
        formConfig: a,
        formData: s,
        setFormData: u,
      } = xe(),
      [r, o] = O(un[0]),
      [v, c] = O([]),
      [p, b] = O([]),
      [T, A] = O([]),
      [N, m] = O({}),
      [g, w] = O({}),
      y = (d) => {
        i(
          t().map((C) =>
            C.id === a().id
              ? {
                  ...C,
                  outputVertexIds: [...C.outputVertexIds, d],
                  numberOutputs: v().length,
                }
              : C
          )
        );
      },
      x = (d) => {
        i(
          t().map((C) =>
            C.id === a().id
              ? {
                  ...C,
                  outputVertexIds: [
                    ...C.outputVertexIds.filter((_) => _ !== d),
                  ],
                  numberOutputs: v().length,
                }
              : C
          )
        );
      },
      [f, h] = O({}),
      E = (d, C, _) => {
        w((P) => ({ ...P, [d]: { ...P[d], [C]: _ } })),
          g()[d] &&
            (g()[d].name === g()[d].value
              ? h({ ...f(), [d]: !0 })
              : h({ ...f(), [d]: !1 }));
      },
      S = () => {
        const d = `field_${Math.random().toString(36).substring(2, 8)}`;
        c((C) => [
          ...C,
          {
            fieldId: d,
            vertexId:
              t().find((_) => _.id === a().id)?.outputVertexIds[0] || "",
          },
        ]),
          m({ ...N(), [d]: !1 }),
          h({ ...f(), [d]: !0 });
      };
    Ee(() => {
      A(_d), S();
    });
    const I = (d) => {
      d.preventDefault();
      const C = new FormData(d.target);
      let _ = Object.fromEntries(C.entries());
      u({ ...s(), switchNode: _ });
      const P = new CustomEvent("formSubmitEvent", { detail: _, bubbles: !0 }),
        z = document.getElementById("submitBtn");
      z && z.dispatchEvent(P);
    };
    return (() => {
      var d = Md(),
        C = d.firstChild,
        _ = C.firstChild;
      return (
        d.addEventListener("submit", I),
        n(
          C,
          l(_e, {
            name: "mode",
            title: "Mode",
            options: un,
            get defaultValue() {
              return un[0].value;
            },
            onChange: (P) => {
              o(P), Me("mode", P);
            },
          }),
          _
        ),
        n(
          _,
          l(Q, {
            get when() {
              return r().value === "Rules";
            },
            get children() {
              return [
                Dd(),
                (() => {
                  var P = kd(),
                    z = P.firstChild;
                  return (
                    n(
                      P,
                      (() => {
                        var B = ne(() => v().length <= 0);
                        return () => B() && Vd();
                      })(),
                      z
                    ),
                    n(
                      z,
                      l(de, {
                        get each() {
                          return v();
                        },
                        children: (B, W) =>
                          (() => {
                            var q = Rd(),
                              V = q.firstChild,
                              le = V.firstChild,
                              U = le.nextSibling,
                              K = V.nextSibling,
                              ee = K.firstChild,
                              pe = ee.firstChild,
                              te = pe.firstChild,
                              Z = te.firstChild,
                              ae = Z.nextSibling,
                              j = te.nextSibling,
                              fe = pe.nextSibling,
                              H = ee.nextSibling;
                            return (
                              n(le, l(mt, {})),
                              (U.$$click = () => {
                                c(
                                  v().filter(
                                    (se, L) => se.fieldId !== B.fieldId
                                  )
                                ),
                                  x(B.vertexId);
                              }),
                              n(U, l(me, {})),
                              n(
                                Z,
                                l(ce, {
                                  placeholder: "name",
                                  name: `${B}_name`,
                                  value: "",
                                  isArrow: !0,
                                  onInput: (se) => {
                                    E(B.fieldId, "name", se),
                                      Me(`${B}_name`, se);
                                  },
                                })
                              ),
                              n(
                                ae,
                                l(Nd, {
                                  name: `${B}_type`,
                                  options: Zn,
                                  get defaultValue() {
                                    return Zn[0].value;
                                  },
                                  categoryLabel: "Back to main",
                                  onChange: (se) => {
                                    Me(`${B}_type`, se.value);
                                  },
                                })
                              ),
                              n(
                                j,
                                l(ce, {
                                  placeholder: "value",
                                  name: `${B}_value`,
                                  value: "",
                                  isArrow: !0,
                                  onInput: (se) => {
                                    E(B.fieldId, "value", se),
                                      Me(`${B}_name`, se);
                                  },
                                })
                              ),
                              n(
                                fe,
                                l(Be, {
                                  get content() {
                                    return `This condition is ${
                                      f()[B.fieldId]
                                    } for the first input item`;
                                  },
                                  get children() {
                                    var se = Fd();
                                    return (
                                      n(
                                        se,
                                        l(Q, {
                                          get when() {
                                            return f()[B.fieldId] === !0;
                                          },
                                          children: "✔",
                                        }),
                                        null
                                      ),
                                      n(
                                        se,
                                        l(Q, {
                                          get when() {
                                            return f()[B.fieldId] === !1;
                                          },
                                          children: "✘",
                                        }),
                                        null
                                      ),
                                      se
                                    );
                                  },
                                })
                              ),
                              n(
                                H,
                                l(Ie, {
                                  title: "Rename Output",
                                  name: `${B}_isRename`,
                                  onChange: (se) => {
                                    m({ ...N(), [B.fieldId]: se }),
                                      Me(`${B}_isRename`, se);
                                  },
                                })
                              ),
                              n(
                                K,
                                l(Q, {
                                  get when() {
                                    return N()[B.fieldId];
                                  },
                                  get children() {
                                    var se = Bd();
                                    return (
                                      n(
                                        se,
                                        l(ce, {
                                          name: `${B}_rename_output`,
                                          value: "",
                                          title: "Output Name",
                                          toolTipText:
                                            "The label of output to which to send data to if rule matches.",
                                          isArrow: !0,
                                          onInput: (L) => {
                                            Me(`${B}_rename_output`, L);
                                          },
                                        })
                                      ),
                                      se
                                    );
                                  },
                                }),
                                null
                              ),
                              R(() =>
                                D(
                                  q,
                                  `flex gap-1.5 ${
                                    W() !== 0
                                      ? "border-t pt-8 border-dashed border-[#575555]"
                                      : ""
                                  }`
                                )
                              ),
                              q
                            );
                          })(),
                      })
                    ),
                    n(
                      P,
                      l(et, {
                        onClick: () => {
                          const B = `field_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`,
                            W = `vertex_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`;
                          c((q) => [...q, { fieldId: B, vertexId: W }]),
                            m({ ...N(), [B]: !1 }),
                            h({ ...f(), [B]: !0 }),
                            y(W);
                        },
                        label: "Add Pool Time",
                      }),
                      null
                    ),
                    P
                  );
                })(),
                l(el, {}),
                (() => {
                  var P = Pd(),
                    z = P.firstChild,
                    B = z.nextSibling,
                    W = B.nextSibling;
                  return (
                    n(
                      B,
                      l(de, {
                        get each() {
                          return p();
                        },
                        children: (q, V) => {
                          if (q.content.type === "switch")
                            return (() => {
                              var le = Qn(),
                                U = le.firstChild,
                                K = U.nextSibling;
                              return (
                                (U.$$click = () => {
                                  b(p().filter((ee) => ee !== q)),
                                    A([...T(), q]);
                                }),
                                n(U, l(me, {})),
                                n(
                                  K,
                                  l(Ie, {
                                    get title() {
                                      return q.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return q.content.toolTipText ?? "";
                                    },
                                    get name() {
                                      return q.content.name;
                                    },
                                    onChange: (ee) => {
                                      Me(q.content.name, ee);
                                    },
                                  })
                                ),
                                le
                              );
                            })();
                          if (q.content.type === "DropDownN")
                            return (() => {
                              var le = Qn(),
                                U = le.firstChild,
                                K = U.nextSibling;
                              return (
                                (U.$$click = () => {
                                  b(p().filter((ee) => ee !== q)),
                                    A([...T(), q]);
                                }),
                                n(U, l(me, {})),
                                n(
                                  K,
                                  l(_e, {
                                    get name() {
                                      return q.content.name;
                                    },
                                    get title() {
                                      return q.content.title;
                                    },
                                    get toolTipText() {
                                      return q.content.toolTipText;
                                    },
                                    get options() {
                                      return q.content.options ?? [];
                                    },
                                    get defaultValue() {
                                      return q.content.options?.[0]?.value;
                                    },
                                    onChange: (ee) => {
                                      Me(q.content.name, ee.value);
                                    },
                                  })
                                ),
                                le
                              );
                            })();
                        },
                      })
                    ),
                    n(
                      W,
                      l(Pe, {
                        name: "options_switch_node",
                        selectedOptions: p,
                        setSelectedOptions: b,
                        dropdownOptions: T,
                        setDropdownOptions: A,
                        placeholder: "Add options",
                        onChange: (q) => {},
                      })
                    ),
                    R(() => D(W, `${p().length <= 0 ? "" : "mt-5"}`)),
                    P
                  );
                })(),
              ];
            },
          }),
          null
        ),
        n(
          _,
          l(Q, {
            get when() {
              return r().value === "Expression";
            },
            get children() {
              var P = Ld(),
                z = P.firstChild,
                B = z.nextSibling;
              return (
                n(
                  z,
                  l(ce, {
                    name: "numberOfOutputs",
                    title: "Number of Outputs",
                    toolTipText: "How many outputs to create",
                    value: 4,
                    onInput: (W) => {
                      Me("numberOfOutputs", W);
                    },
                  })
                ),
                n(
                  B,
                  l(ce, {
                    name: "outputIndex",
                    title: "Output Index",
                    placeholder: "{{}}",
                    footNote: "[ERROR: invalid syntax]",
                    toolTipText:
                      "The output index to send the input item to. Use an expression to calculate which input item should be routed to which output. The expression must return a number.",
                    isExpand: !0,
                    isArrow: !0,
                    onInput: (W) => {
                      Me("outputIndex", W);
                    },
                  })
                ),
                n(P, l(el, {}), null),
                P
              );
            },
          }),
          null
        ),
        d
      );
    })();
  };
he(["click"]);
var Wd = $("<div class=space-y-6>");
const Hd = (e) =>
    (() => {
      var t = Wd();
      return (
        n(
          t,
          l(ce, {
            name: "dataName",
            title: "Data Name",
            placeholder: "e.g. user_info",
            toolTipText:
              "Name of the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            isArrow: !0,
          }),
          null
        ),
        n(
          t,
          l(tt, {
            name: "dataDescription",
            title: "Description of Data",
            placeholder:
              "[describe your data here, e.g. a user's name, email e.t.c]",
            toolTipText:
              "Describe the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
          }),
          null
        ),
        n(
          t,
          l(ce, {
            name: "limit",
            title: "Limit",
            toolTipText: "The maximum number of results to return",
            isArrow: !0,
            isExpand: !0,
          }),
          null
        ),
        t
      );
    })(),
  pn = [
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
  qd = [
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
  tl = [
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
  ];
var Ud = $(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  jd = $('<a href=# class="font-semibold text-[#fe705a]">Insert one'),
  Gd = $(
    '<div class=space-y-5><div class=space-y-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class=mt-5><div class=space-y-10></div><div class=mt-5>'
  ),
  Xd = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class=flex-1>'
  ),
  Yd = $(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Collection</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class=flex-1>'
  ),
  Jd = $(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Column Names</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-5">'
  ),
  Zd = $(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Metadata Filter</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-10"><div class></div><div class>'
  ),
  Kd = $(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Qd = $('<div><div class="flex flex-col gap-5 w-full">');
const Ze = ({ onClick: e }) =>
    (() => {
      var t = Ud();
      return Fe(t, "click", e), n(t, l(me, {})), t;
    })(),
  ec = (e) => {
    const [t, i] = O(pn[0]),
      [a, s] = O([]),
      [u, r] = O([]),
      [o, v] = O([]);
    return (
      ke(() => {
        t().value === "insertDocuments" ? s(tl.slice(1, 3)) : s(tl);
      }),
      (() => {
        var c = Gd(),
          p = c.firstChild,
          b = p.nextSibling,
          T = b.firstChild,
          A = T.nextSibling,
          N = A.firstChild,
          m = N.nextSibling;
        return (
          n(
            c,
            l(nt, {
              name: "credential",
              placeholder: "Select Credential",
              title: "Credential to connect with",
            }),
            p
          ),
          n(
            p,
            l(Se, {
              name: "operationMode",
              title: "Operation Mode",
              options: pn,
              get defaultValue() {
                return pn[0].value;
              },
              onChange: (g) => {
                i(g);
              },
            }),
            null
          ),
          n(
            p,
            l(Q, {
              get when() {
                return t().value === "retrieveDocumentsAsVectorStore";
              },
              get children() {
                return l(Jt, {
                  get children() {
                    return [
                      "This node must be connected to a vector store retriever.",
                      " ",
                      jd(),
                    ];
                  },
                });
              },
            }),
            null
          ),
          n(
            p,
            l(Q, {
              get when() {
                return t().value === "retrieveDocumentsAsTool";
              },
              get children() {
                return [
                  l(ce, {
                    name: "name",
                    title: "Name",
                    toolTipText: "Name of the vector store.",
                    placeholder: "e.g. company_knowledge_base",
                    isArrow: !0,
                  }),
                  l(tt, {
                    name: "description",
                    title: "Description",
                    toolTipText:
                      "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                    placeholder:
                      "e.g. work with your data in postgresql with the PgVector extension.",
                  }),
                ];
              },
            }),
            null
          ),
          n(
            p,
            l(ce, {
              name: "tableName",
              title: "Table Name",
              toolTipText:
                "The table name to store the vectors in. If table does not exist, it will be created.",
              value: "repoRunner_vectors",
              isArrow: !0,
            }),
            null
          ),
          n(
            p,
            l(Q, {
              get when() {
                return t().value === "getMany";
              },
              get children() {
                return l(ce, {
                  name: "limit",
                  title: "Limit",
                  toolTipText:
                    "Number of top results to fetch from vector store.",
                  value: 4,
                });
              },
            }),
            null
          ),
          n(
            p,
            l(Q, {
              get when() {
                return t().value === "getMany";
              },
              get children() {
                return l(ce, {
                  name: "prompt",
                  title: "Prompt",
                  toolTipText:
                    "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
                });
              },
            }),
            null
          ),
          n(
            p,
            l(Q, {
              get when() {
                return (
                  t().value === "getMany" ||
                  t().value === "retrieveDocumentsAsTool"
                );
              },
              get children() {
                return l(Ie, {
                  name: "includeMetadata",
                  title: "Include Metadata",
                  toolTipText: "Whether or not to include document metadata.",
                });
              },
            }),
            null
          ),
          n(
            N,
            l(de, {
              get each() {
                return u();
              },
              children: (g, w) => {
                if (g.value === "distanceStrategy")
                  return (() => {
                    var y = Xd(),
                      x = y.firstChild;
                    return (
                      n(
                        y,
                        l(Ze, {
                          onClick: () => {
                            const f = u().filter((h) => h.value !== g.value);
                            r(f), s([...a(), g]);
                          },
                        }),
                        x
                      ),
                      n(
                        x,
                        l(_e, {
                          get name() {
                            return g.content.name;
                          },
                          get options() {
                            return g.content.options ?? [];
                          },
                          get defaultValue() {
                            return g.content.options?.[0]?.value;
                          },
                          get toolTipText() {
                            return g.content.toolTipText;
                          },
                          get title() {
                            return g.content.title;
                          },
                        })
                      ),
                      y
                    );
                  })();
                if (g.value === "collection")
                  return (() => {
                    var y = Yd(),
                      x = y.firstChild,
                      f = x.firstChild,
                      h = f.firstChild,
                      E = h.nextSibling,
                      S = E.firstChild;
                    return (
                      n(
                        x,
                        l(Ze, {
                          onClick: () => {
                            const I = u().filter((d) => d.value !== g.value);
                            r(I), s([...a(), g]);
                          },
                        }),
                        f
                      ),
                      n(
                        E,
                        l(Ze, {
                          onClick: () => {
                            const I = u().filter((d) => d.value !== g.value);
                            r(I), s([...a(), g]);
                          },
                        }),
                        S
                      ),
                      n(
                        S,
                        l(Ie, {
                          get name() {
                            return g.content.name;
                          },
                          get title() {
                            return g.content.title ?? "";
                          },
                        })
                      ),
                      y
                    );
                  })();
                if (g.value === "columnNames")
                  return (() => {
                    var y = Jd(),
                      x = y.firstChild,
                      f = x.firstChild,
                      h = f.firstChild,
                      E = h.nextSibling,
                      S = E.firstChild;
                    return (
                      n(
                        x,
                        l(Ze, {
                          onClick: () => {
                            const I = u().filter((d) => d.value !== g.value);
                            r(I), s([...a(), g]);
                          },
                        }),
                        f
                      ),
                      n(
                        E,
                        l(Ze, {
                          onClick: () => {
                            const I = u().filter((d) => d.value !== g.value);
                            r(I), s([...a(), g]);
                          },
                        }),
                        S
                      ),
                      n(
                        S,
                        l(de, {
                          each: qd,
                          children: (I, d) =>
                            l(ce, {
                              get name() {
                                return I.name;
                              },
                              get value() {
                                return I.value;
                              },
                              get title() {
                                return I.title;
                              },
                              isArrow: !0,
                            }),
                        })
                      ),
                      y
                    );
                  })();
                if (g.value === "metadataFilter")
                  return (() => {
                    var y = Zd(),
                      x = y.firstChild,
                      f = x.firstChild,
                      h = f.firstChild,
                      E = h.nextSibling,
                      S = E.firstChild,
                      I = S.firstChild,
                      d = I.nextSibling;
                    return (
                      n(
                        x,
                        l(Ze, {
                          onClick: () => {
                            const C = u().filter((_) => _.value !== g.value);
                            r(C), s([...a(), g]);
                          },
                        }),
                        f
                      ),
                      n(
                        S,
                        (() => {
                          var C = ne(() => o().length <= 0);
                          return () => C() && Kd();
                        })(),
                        I
                      ),
                      n(
                        I,
                        l(de, {
                          get each() {
                            return o();
                          },
                          children: (C, _) =>
                            (() => {
                              var P = Qd(),
                                z = P.firstChild;
                              return (
                                n(
                                  P,
                                  l(Ze, {
                                    onClick: () => {
                                      v((B) => B.filter((W) => W !== C));
                                    },
                                  }),
                                  z
                                ),
                                n(
                                  z,
                                  l(ce, {
                                    name: `${C}_name`,
                                    title: "Name",
                                    isArrow: !0,
                                  }),
                                  null
                                ),
                                n(
                                  z,
                                  l(ce, {
                                    name: `${C}value`,
                                    title: "Value",
                                    isArrow: !0,
                                  }),
                                  null
                                ),
                                R(() =>
                                  D(
                                    P,
                                    `group flex items-start gap-1.5 w-full ${
                                      _() !== 0
                                        ? "border-t border-dashed border-[#727171] pt-8 mt-8"
                                        : ""
                                    }`
                                  )
                                ),
                                P
                              );
                            })(),
                        })
                      ),
                      n(
                        d,
                        l(et, {
                          onClick: () => {
                            v([
                              ...o(),
                              `metadata_${Math.random()
                                .toString(36)
                                .substring(2, 8)}`,
                            ]);
                          },
                          label: "Add Filter Field",
                        })
                      ),
                      y
                    );
                  })();
              },
            })
          ),
          n(
            m,
            l(Pe, {
              name: "options_edit_node",
              selectedOptions: u,
              setSelectedOptions: r,
              dropdownOptions: a,
              setDropdownOptions: s,
              placeholder: "Add options",
              onChange: (g) => {
                r(g);
              },
            })
          ),
          c
        );
      })()
    );
  };
he(["click"]);
const nl = [
  { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
  { label: "llma 3.2:1b", value: "llma 3.2:1b" },
  { label: "llma 3.2:1b", value: "llma 3.2:1b" },
  { label: "phi4:latest", value: "phi4:latest" },
];
var tc = $("<div class=space-y-5>");
const nc = (e) =>
    (() => {
      var t = tc();
      return (
        n(
          t,
          l(nt, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          null
        ),
        n(
          t,
          l(_e, {
            name: "model",
            title: "Model",
            options: nl,
            get defaultValue() {
              return nl[0].value;
            },
          }),
          null
        ),
        t
      );
    })(),
  vn = [
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
  mn = [
    { label: "Message", value: "message" },
    { label: "Label", value: "label" },
    { label: "Draft", value: "draft" },
    { label: "Thread", value: "thread" },
  ],
  Tn = {
    type: "switch",
    title: "Simplify",
    name: "simplify",
    toolTipText:
      "Whether to return a simplified version of the response instead of the raw data.",
  },
  Ot = {
    type: "DropDownN",
    title: "Email Type",
    name: "emailType",
    options: [
      { label: "HTML", value: "html" },
      { label: "Text", value: "text" },
    ],
  },
  ll = {
    type: "dynamicInput",
    title: "To",
    name: "to",
    placeholder: "info@example.com",
    toolTipText:
      "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
  },
  Cn = {
    type: "dynamicInput",
    title: "Subject",
    name: "subject",
    placeholder: "Hello World!",
  },
  At = { type: "dynamicInput", title: "Message", name: "message" },
  Bo = {
    type: "switch",
    name: "returnAll",
    title: "Return All",
    toolTipText: "Whether to return all results or only up to a given limit",
  },
  Ro = {
    type: "dynamicInput",
    name: "limit",
    title: "Limit",
    toolTipText: "Maximum number of results to return",
    value: 10,
  },
  zo = {
    type: "dynamicInput",
    title: "Label Names or Ids",
    name: "labelNamesOrIds",
  },
  Ke = { type: "dynamicInput", name: "messageId", title: "Message ID" },
  lc = [
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
  hn = [
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
  fn = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        Ke,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
          toolTipText:
            "Choose from the list, or specify IDs using an expression.",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [Ke] },
    { label: "Get", value: "get", children: [Ke, Tn] },
    {
      label: "Get Many",
      value: "getMany",
      children: [
        Bo,
        Ro,
        Tn,
        { type: "DropDownFilter", name: "Add Filter", title: "Add Filter" },
      ],
    },
    { label: "Mark as Read", value: "markAsRead", children: [Ke] },
    { label: "Mark as Unread", value: "markAsUnread", children: [Ke] },
    { label: "Remove Label", value: "removeLabel", children: [Ke, zo] },
    { label: "Reply", value: "reply", children: [Ke, Ot, At] },
    { label: "Send", value: "send", children: [ll, Cn, Ot, At] },
    {
      label: "Send and Wait for Response",
      value: "sendAndWaitForResponse",
      children: [ll, Cn, Ot, At],
    },
  ],
  ol = {
    type: "dynamicInput",
    title: "Label Id",
    name: "labelId",
    toolTipText: "The ID of the label",
  },
  il = {
    type: "dynamicInput",
    title: "Draft ID",
    name: "draftId",
    toolTipText: "The ID of the draft",
    placeholder: "r-52df502d5df55",
  },
  En = { label: "Get Many", value: "getMany", children: [Bo, Ro] },
  oc = [
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
    { label: "Delete", value: "delete", children: [ol] },
    { label: "Get", value: "get", children: [ol] },
    En,
  ],
  ic = [
    { label: "Create", value: "create", children: [Cn, Ot, At] },
    { label: "Delete", value: "delete", children: [il] },
    { label: "Get", value: "get", children: [il] },
    En,
  ],
  Qe = {
    type: "dynamicInput",
    name: "threadId",
    title: "Thread ID",
    placeholder: "sdf5d7521df78csd",
  },
  rc = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        Qe,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [Qe] },
    { label: "Get", value: "get", children: [Qe, Tn] },
    En,
    { label: "Remove Label", value: "removeLabel", children: [Qe, zo] },
    {
      label: "Reply",
      value: "reply",
      children: [
        Qe,
        Ot,
        At,
        {
          type: "dynamicInput",
          name: "messageSnippetOrId",
          title: "Message Snippet Or ID",
          toolTipText:
            "Choose from the list, or specify an ID using an expression.",
        },
      ],
    },
    { label: "Trash", value: "trash", children: [Qe] },
    { label: "Untrash", value: "untrash", children: [Qe] },
  ],
  Wo = [
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
  ac = [
    ...Wo,
    {
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
  gn = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  Ge = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  Xe = {
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
  rl = [
    { value: "text", label: "Text", children: [Ge, Xe, _t] },
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
        Ge,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        Xe,
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
        Xe,
        Ge,
      ],
    },
    { value: "email", label: "Email", children: [Ge, Xe, _t] },
    {
      value: "file",
      label: "File",
      children: [
        Ge,
        Xe,
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
    { value: "number", label: "Number", children: [Ge, Xe, _t] },
    { value: "password", label: "Password", children: [Ge, Xe, _t] },
    { value: "textArea", label: "Textarea", children: [Ge, Xe, _t] },
  ],
  sc = [
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
  ];
var dc = $(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  cc = $('<div class="label hr-solid-line">Options'),
  al = $('<div class="mt-5 space-y-5">'),
  sl = $(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  uc = $(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  dl = $(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  pc = $(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  xn = $('<div class="space-y-5 mt-5">'),
  vc = $('<div class="label hr-solid-line">Form Elements'),
  mc = $("<div class=space-y-5>"),
  hc = $('<div><div class="label hr-solid-line">Options'),
  fc = $(
    '<div class=space-y-5><div class=space-y-5></div><div class="space-y-5 mt-5"></div><div class="space-y-5 mt-5">'
  ),
  bn = $("<div>"),
  gc = $(
    '<div class=space-y-5><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Filter</div><div class=space-y-5>'
  ),
  xc = $(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Bt = $('<div class="group flex items-start gap-1.5 w-full">'),
  Tt = $(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  cl = $(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  bc = $('<div class="space-y-4 mt-5">'),
  yc = $(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  wc = $(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  $c = $(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const Rt = ({ onClick: e }) =>
    (() => {
      var t = dc();
      return Fe(t, "click", e), n(t, l(me, {})), t;
    })(),
  _c = (e) => {
    const [t, i] = O(vn[0]),
      [a, s] = O(mn[0]),
      [u, r] = O([]),
      [o, v] = O(fn[0]),
      [c, p] = O([]),
      [b, T] = O([]),
      [A, N] = O([]),
      [m, g] = O([]),
      [w, y] = O(hn[0]),
      [x, f] = O(!1),
      [h, E] = O(wt[0]),
      [S, I] = O(!1),
      [d, C] = O($t[0]),
      [_, P] = O(gn[0]),
      [z, B] = O([]),
      [W, q] = O({}),
      [V, le] = O({});
    return (
      ke(() => {
        a().value === "message"
          ? r(fn)
          : a().value === "label"
          ? r(oc)
          : a().value === "draft"
          ? r(ic)
          : a().value === "thread" && r(rc);
      }),
      ke(() => {
        o()?.value === "reply"
          ? N(Wo)
          : o()?.value === "send"
          ? N(ac)
          : o().value === "sendAndWaitForResponse" &&
            (w().value === "Approval"
              ? (N([
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
                g([]))
              : (w().value === "freeText" || w().value === "customForm") &&
                (N(sc), g([])));
      }),
      Ee(() => {
        r(fn), T(lc);
      }),
      (() => {
        var U = fc(),
          K = U.firstChild,
          ee = K.nextSibling,
          pe = ee.nextSibling;
        return (
          n(
            U,
            l(nt, {
              name: "credential",
              placeholder: "Select Credential",
              title: "Credential to connect with",
            }),
            K
          ),
          n(
            U,
            l(Se, {
              name: "toolDescription",
              title: "Tool Description",
              options: vn,
              get defaultValue() {
                return vn[0].value;
              },
              onChange: (te) => {
                i(te);
              },
            }),
            K
          ),
          n(
            U,
            l(Q, {
              get when() {
                return t().value === "setManually";
              },
              get children() {
                return l(tt, {
                  name: "description",
                  title: "Description",
                  toolTipText:
                    "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                  value: "Consume the Gmail API",
                  placeholder: "e.g. Consume the Gmail API",
                });
              },
            }),
            K
          ),
          n(
            U,
            l(_e, {
              name: "resource",
              title: "Resource",
              options: mn,
              get defaultValue() {
                return mn[0].value;
              },
              onChange: (te) => {
                s(te);
              },
            }),
            K
          ),
          n(
            U,
            l(Se, {
              name: "operation",
              title: "Operation",
              get options() {
                return u();
              },
              get defaultValue() {
                return u()[0].value;
              },
              onChange: (te) => {
                v(te);
              },
            }),
            K
          ),
          n(
            K,
            l(de, {
              get each() {
                return o()?.children;
              },
              children: (te, Z) => {
                if (te.type === "dynamicInput")
                  return (() => {
                    var ae = bn();
                    return (
                      n(
                        ae,
                        l(ce, {
                          get name() {
                            return te.name ?? "";
                          },
                          get title() {
                            return te.title;
                          },
                          get toolTipText() {
                            return te.toolTipText;
                          },
                          get placeholder() {
                            return te.placeholder;
                          },
                          get value() {
                            return te.value;
                          },
                        })
                      ),
                      ae
                    );
                  })();
                if (te.type === "switch")
                  return (() => {
                    var ae = bn();
                    return (
                      n(
                        ae,
                        l(Ie, {
                          get name() {
                            return te.name ?? "";
                          },
                          get title() {
                            return te.title ?? "";
                          },
                          get toolTipText() {
                            return te.toolTipText;
                          },
                        })
                      ),
                      ae
                    );
                  })();
                if (te.type === "DropDownFilter")
                  return (() => {
                    var ae = gc(),
                      j = ae.firstChild,
                      fe = j.nextSibling;
                    return (
                      n(
                        ae,
                        (() => {
                          var H = ne(() => c().length <= 0);
                          return () => H() && xc();
                        })(),
                        fe
                      ),
                      n(
                        fe,
                        l(de, {
                          get each() {
                            return c();
                          },
                          children: (H, se) => {
                            if (H.content.type === "switch")
                              return (() => {
                                var L = Bt();
                                return (
                                  n(
                                    L,
                                    l(Rt, {
                                      onClick: () => {
                                        const J = c().filter(
                                          (Y) => Y.value !== H.value
                                        );
                                        p(J), T([...b(), H]);
                                      },
                                    }),
                                    null
                                  ),
                                  n(
                                    L,
                                    l(Ie, {
                                      get name() {
                                        return H.content.name;
                                      },
                                      get title() {
                                        return H.content.title ?? "";
                                      },
                                      get toolTipText() {
                                        return H.content.toolTipText;
                                      },
                                    }),
                                    null
                                  ),
                                  L
                                );
                              })();
                            if (H.content.type === "dynamicInput")
                              return (() => {
                                var L = Bt();
                                return (
                                  n(
                                    L,
                                    l(Rt, {
                                      onClick: () => {
                                        const J = c().filter(
                                          (Y) => Y.value !== H.value
                                        );
                                        p(J), T([...b(), H]);
                                      },
                                    }),
                                    null
                                  ),
                                  n(
                                    L,
                                    l(ce, {
                                      get name() {
                                        return H.content.name;
                                      },
                                      get title() {
                                        return H.content.title;
                                      },
                                      get toolTipText() {
                                        return H.content.toolTipText;
                                      },
                                      isArrow: !0,
                                      get footNote() {
                                        return H.content.footNote;
                                      },
                                      get placeholder() {
                                        return H.content.placeholder ?? "";
                                      },
                                    }),
                                    null
                                  ),
                                  L
                                );
                              })();
                            if (H.content.type === "dropdownMultiple")
                              return (() => {
                                var L = Bt();
                                return (
                                  n(
                                    L,
                                    l(Rt, {
                                      onClick: () => {
                                        const J = c().filter(
                                          (Y) => Y.value !== H.value
                                        );
                                        p(J), T([...b(), H]);
                                      },
                                    }),
                                    null
                                  ),
                                  n(
                                    L,
                                    l(Do, {
                                      get name() {
                                        return H.content.name;
                                      },
                                      get title() {
                                        return H.content.title;
                                      },
                                      get options() {
                                        return H.content.options ?? [];
                                      },
                                      get toolTipText() {
                                        return H.content.toolTipText;
                                      },
                                      get footNote() {
                                        return H.content.footNote;
                                      },
                                    }),
                                    null
                                  ),
                                  L
                                );
                              })();
                            if (H.content.type === "dropdownN")
                              return (() => {
                                var L = Bt();
                                return (
                                  n(
                                    L,
                                    l(Rt, {
                                      onClick: () => {
                                        const J = c().filter(
                                          (Y) => Y.value !== H.value
                                        );
                                        p(J), T([...b(), H]);
                                      },
                                    }),
                                    null
                                  ),
                                  n(
                                    L,
                                    l(_e, {
                                      get placeholder() {
                                        return (
                                          H.content?.options?.[0].label ?? ""
                                        );
                                      },
                                      get name() {
                                        return H.content.name;
                                      },
                                      get title() {
                                        return H.content.title;
                                      },
                                      get options() {
                                        return H.content.options ?? [];
                                      },
                                      get toolTipText() {
                                        return H.content.toolTipText;
                                      },
                                      get footNote() {
                                        return H.content.footNote;
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
                        ae,
                        l(Pe, {
                          get name() {
                            return te.name ?? "";
                          },
                          placeholder: "Add Filter",
                          selectedOptions: c,
                          setSelectedOptions: p,
                          dropdownOptions: b,
                          setDropdownOptions: T,
                          onChange: (H) => {},
                        }),
                        null
                      ),
                      ae
                    );
                  })();
                if (te.type === "DropDownN")
                  return (() => {
                    var ae = bn();
                    return (
                      n(
                        ae,
                        l(_e, {
                          get name() {
                            return te.name ?? "";
                          },
                          get title() {
                            return te.title;
                          },
                          get options() {
                            return te.options ?? [];
                          },
                          get defaultValue() {
                            return te.options?.[0].value;
                          },
                          get toolTipText() {
                            return te.toolTipText;
                          },
                        })
                      ),
                      ae
                    );
                  })();
              },
            })
          ),
          n(
            ee,
            l(Q, {
              get when() {
                return o().value === "reply" || o().value === "send";
              },
              get children() {
                return [
                  cc(),
                  ne(() => ne(() => m().length <= 0)() && Tt()),
                  (() => {
                    var te = al();
                    return (
                      n(
                        te,
                        l(de, {
                          get each() {
                            return m();
                          },
                          children: (Z) => {
                            if (Z.content.type === "dynamicInput")
                              return (() => {
                                var ae = cl(),
                                  j = ae.firstChild,
                                  fe = j.nextSibling;
                                return (
                                  (j.$$click = () => {
                                    const H = m().filter(
                                      (se) => se.value !== Z.value
                                    );
                                    g(H), N([...A(), Z]);
                                  }),
                                  n(j, l(me, {})),
                                  n(
                                    fe,
                                    l(ce, {
                                      get name() {
                                        return Z.content.name;
                                      },
                                      get title() {
                                        return Z.content.title;
                                      },
                                      get placeholder() {
                                        return Z.content.placeholder;
                                      },
                                      get toolTipText() {
                                        return Z.content.toolTipText;
                                      },
                                      isArrow: !0,
                                    })
                                  ),
                                  ae
                                );
                              })();
                            if (Z.content.type === "switch")
                              return (() => {
                                var ae = cl(),
                                  j = ae.firstChild,
                                  fe = j.nextSibling;
                                return (
                                  (j.$$click = () => {
                                    const H = m().filter(
                                      (se) => se.value !== Z.value
                                    );
                                    g(H), N([...A(), Z]);
                                  }),
                                  n(j, l(me, {})),
                                  n(
                                    fe,
                                    l(Ie, {
                                      get title() {
                                        return Z.content.title ?? "";
                                      },
                                      get toolTipText() {
                                        return Z.content.toolTipText;
                                      },
                                      get name() {
                                        return Z.content.name;
                                      },
                                    })
                                  ),
                                  ae
                                );
                              })();
                          },
                        })
                      ),
                      te
                    );
                  })(),
                  l(Pe, {
                    get name() {
                      return `optionsFor${o()?.label}Operation`;
                    },
                    placeholder: "Add option",
                    dropdownOptions: A,
                    setDropdownOptions: N,
                    selectedOptions: m,
                    setSelectedOptions: g,
                    onChange: (te) => {
                      g(te);
                    },
                  }),
                ];
              },
            })
          ),
          n(
            pe,
            l(Q, {
              get when() {
                return o().value === "sendAndWaitForResponse";
              },
              get children() {
                return [
                  l(Se, {
                    name: "responseType",
                    title: "Response Type",
                    options: hn,
                    get defaultValue() {
                      return hn[0].value;
                    },
                    onChange: (te) => {
                      y(te);
                    },
                  }),
                  (() => {
                    var te = xn();
                    return (
                      n(
                        te,
                        l(Q, {
                          get when() {
                            return w().value === "Approval";
                          },
                          get children() {
                            return [
                              (() => {
                                var Z = uc(),
                                  ae = Z.firstChild,
                                  j = ae.nextSibling,
                                  fe = j.nextSibling;
                                return (
                                  n(
                                    Z,
                                    (() => {
                                      var H = ne(() => !x());
                                      return () => H() && Tt();
                                    })(),
                                    j
                                  ),
                                  n(
                                    j,
                                    l(Xt, {
                                      onClick: () => f(!0),
                                      title: "Add Option",
                                      width: "w-full",
                                    })
                                  ),
                                  n(
                                    fe,
                                    l(Q, {
                                      get when() {
                                        return x();
                                      },
                                      get children() {
                                        var H = sl(),
                                          se = H.firstChild,
                                          L = se.nextSibling;
                                        return (
                                          (se.$$click = () => {
                                            f(!1), E(wt[0]);
                                          }),
                                          n(se, l(me, {})),
                                          n(
                                            L,
                                            l(Se, {
                                              name: "typeOfApproval",
                                              title: "Type of Approval",
                                              options: wt,
                                              get defaultValue() {
                                                return wt[0].value;
                                              },
                                              onChange: (J) => {
                                                E(J);
                                              },
                                            }),
                                            null
                                          ),
                                          n(
                                            L,
                                            l(ce, {
                                              name: "approveButtonLabel",
                                              title: "Approve Button Label",
                                              value: "Approve",
                                            }),
                                            null
                                          ),
                                          n(
                                            L,
                                            l(_e, {
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
                                            L,
                                            l(Q, {
                                              get when() {
                                                return (
                                                  h().value ===
                                                  "approvedAndDisapproved"
                                                );
                                              },
                                              get children() {
                                                return [
                                                  l(ce, {
                                                    name: "disapproveButtonLabel",
                                                    title:
                                                      "Disapprove Button Label",
                                                    value: "Disapprove",
                                                  }),
                                                  l(_e, {
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
                                          H
                                        );
                                      },
                                    })
                                  ),
                                  R(() => D(j, `${x() ? "hidden" : "mt-5"}`)),
                                  Z
                                );
                              })(),
                              (() => {
                                var Z = pc(),
                                  ae = Z.firstChild,
                                  j = ae.nextSibling,
                                  fe = j.nextSibling;
                                return (
                                  n(
                                    Z,
                                    (() => {
                                      var H = ne(() => !S());
                                      return () => H() && Tt();
                                    })(),
                                    j
                                  ),
                                  n(
                                    j,
                                    l(Xt, {
                                      onClick: () => I(!0),
                                      title: "Add Option",
                                      width: "w-full",
                                    })
                                  ),
                                  n(
                                    fe,
                                    l(Q, {
                                      get when() {
                                        return S();
                                      },
                                      get children() {
                                        var H = dl(),
                                          se = H.firstChild,
                                          L = se.nextSibling,
                                          J = L.firstChild;
                                        return (
                                          (se.$$click = () => {
                                            I(!1), C(wt[0]);
                                          }),
                                          n(se, l(me, {})),
                                          n(
                                            L,
                                            l(Se, {
                                              name: "limitType",
                                              title: "Limit Type",
                                              options: $t,
                                              get defaultValue() {
                                                return $t[0].value;
                                              },
                                              toolTipText:
                                                "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                              onChange: (Y) => {
                                                C(Y);
                                              },
                                            }),
                                            J
                                          ),
                                          n(
                                            J,
                                            l(Q, {
                                              get when() {
                                                return (
                                                  d().value ===
                                                  "afterTimeInterval"
                                                );
                                              },
                                              get children() {
                                                return [
                                                  l(ce, {
                                                    name: "amount",
                                                    title: "Amount",
                                                    value: 45,
                                                    toolTipText:
                                                      "The time to wait.",
                                                  }),
                                                  l(_e, {
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
                                            J,
                                            l(Q, {
                                              get when() {
                                                return (
                                                  d().value ===
                                                  "atSpecifiedTime"
                                                );
                                              },
                                              get children() {
                                                return l(ce, {
                                                  title: "Max Date and Time",
                                                  name: "maxDateAndTime",
                                                  toolTipText:
                                                    "Continue execution after the specified date and time",
                                                });
                                              },
                                            }),
                                            null
                                          ),
                                          H
                                        );
                                      },
                                    })
                                  ),
                                  R(() => D(j, `${S() ? "hidden" : "mt-5"}`)),
                                  Z
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
                    var te = xn();
                    return (
                      n(
                        te,
                        l(Q, {
                          get when() {
                            return w().value === "customForm";
                          },
                          get children() {
                            return [
                              l(Se, {
                                name: "defineForm",
                                title: "Define Form",
                                options: gn,
                                get defaultValue() {
                                  return gn[0].value;
                                },
                                onChange: (Z) => {
                                  P(Z);
                                },
                              }),
                              l(Q, {
                                get when() {
                                  return _().value === "usingJSON";
                                },
                                get children() {
                                  return l(kt, {
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
                                var Z = mc();
                                return (
                                  n(
                                    Z,
                                    l(Q, {
                                      get when() {
                                        return _().value === "usingFieldBelow";
                                      },
                                      get children() {
                                        return [
                                          vc(),
                                          ne(
                                            () =>
                                              ne(() => z().length <= 0)() &&
                                              Tt()
                                          ),
                                          (() => {
                                            var ae = al();
                                            return (
                                              n(
                                                ae,
                                                l(de, {
                                                  get each() {
                                                    return z();
                                                  },
                                                  children: (j, fe) =>
                                                    (() => {
                                                      var H = yc(),
                                                        se = H.firstChild,
                                                        L = se.firstChild,
                                                        J = L.nextSibling,
                                                        Y = se.nextSibling;
                                                      return (
                                                        n(L, l(mt, {})),
                                                        (J.$$click = () => {
                                                          B(
                                                            z().filter(
                                                              (k, M) => k !== j
                                                            )
                                                          );
                                                        }),
                                                        n(J, l(me, {})),
                                                        n(
                                                          Y,
                                                          l(Se, {
                                                            name: "elementType",
                                                            title:
                                                              "Element Type",
                                                            toolTipText:
                                                              "The type of field to add to the form",
                                                            options: rl,
                                                            get defaultValue() {
                                                              return rl[0]
                                                                .value;
                                                            },
                                                            onChange: (k) => {
                                                              q((M) => ({
                                                                ...M,
                                                                [j]:
                                                                  k.children ||
                                                                  [],
                                                              }));
                                                            },
                                                          }),
                                                          null
                                                        ),
                                                        n(
                                                          Y,
                                                          l(Q, {
                                                            get when() {
                                                              return W()[j];
                                                            },
                                                            get children() {
                                                              var k = bc();
                                                              return (
                                                                n(
                                                                  k,
                                                                  l(de, {
                                                                    get each() {
                                                                      return W()[
                                                                        j
                                                                      ];
                                                                    },
                                                                    children: (
                                                                      M
                                                                    ) => {
                                                                      if (
                                                                        M.type ===
                                                                        "dynamicInput"
                                                                      )
                                                                        return l(
                                                                          ce,
                                                                          {
                                                                            get name() {
                                                                              return `${j}_${M.title}`;
                                                                            },
                                                                            get title() {
                                                                              return M.title;
                                                                            },
                                                                            get toolTipText() {
                                                                              return M.toolTipText;
                                                                            },
                                                                            get value() {
                                                                              return M.value;
                                                                            },
                                                                            get placeholder() {
                                                                              return M.placeholder;
                                                                            },
                                                                          }
                                                                        );
                                                                      if (
                                                                        M.type ===
                                                                        "switch"
                                                                      )
                                                                        return l(
                                                                          Ie,
                                                                          {
                                                                            get name() {
                                                                              return `${j}_${M.title}`;
                                                                            },
                                                                            get title() {
                                                                              return (
                                                                                M.title ??
                                                                                ""
                                                                              );
                                                                            },
                                                                            get toolTipText() {
                                                                              return M.toolTipText;
                                                                            },
                                                                          }
                                                                        );
                                                                      if (
                                                                        M.type ===
                                                                        "textBlock"
                                                                      )
                                                                        return l(
                                                                          Jt,
                                                                          {
                                                                            get children() {
                                                                              return M.placeholder;
                                                                            },
                                                                          }
                                                                        );
                                                                      if (
                                                                        M.type ===
                                                                        "jsonEditor"
                                                                      )
                                                                        return l(
                                                                          kt,
                                                                          {
                                                                            get name() {
                                                                              return `${j}_${M.title}`;
                                                                            },
                                                                            get title() {
                                                                              return M.title;
                                                                            },
                                                                            get footNote() {
                                                                              return M.footNote;
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
                                                                        M.type ===
                                                                        "inputBlock"
                                                                      )
                                                                        return (() => {
                                                                          var F =
                                                                              wc(),
                                                                            oe =
                                                                              F.firstChild,
                                                                            G =
                                                                              oe.nextSibling;
                                                                          return (
                                                                            n(
                                                                              G,
                                                                              l(
                                                                                de,
                                                                                {
                                                                                  get each() {
                                                                                    return V()[
                                                                                      j
                                                                                    ];
                                                                                  },
                                                                                  children:
                                                                                    (
                                                                                      X,
                                                                                      ue
                                                                                    ) =>
                                                                                      (() => {
                                                                                        var ve =
                                                                                            $c(),
                                                                                          re =
                                                                                            ve.firstChild,
                                                                                          ge =
                                                                                            re.firstChild,
                                                                                          Ce =
                                                                                            ge.nextSibling,
                                                                                          Te =
                                                                                            re.nextSibling;
                                                                                        return (
                                                                                          n(
                                                                                            ge,
                                                                                            l(
                                                                                              mt,
                                                                                              {}
                                                                                            )
                                                                                          ),
                                                                                          (Ce.$$click =
                                                                                            () => {
                                                                                              le(
                                                                                                (
                                                                                                  lt
                                                                                                ) => ({
                                                                                                  ...lt,
                                                                                                  [j]: lt[
                                                                                                    j
                                                                                                  ].filter(
                                                                                                    (
                                                                                                      ot
                                                                                                    ) =>
                                                                                                      ot !==
                                                                                                      X
                                                                                                  ),
                                                                                                })
                                                                                              );
                                                                                            }),
                                                                                          n(
                                                                                            Ce,
                                                                                            l(
                                                                                              me,
                                                                                              {}
                                                                                            )
                                                                                          ),
                                                                                          n(
                                                                                            Te,
                                                                                            l(
                                                                                              ce,
                                                                                              {
                                                                                                get name() {
                                                                                                  return `${j}_${M.name}_${X}`;
                                                                                                },
                                                                                                title:
                                                                                                  "Option",
                                                                                              }
                                                                                            )
                                                                                          ),
                                                                                          R(
                                                                                            () =>
                                                                                              D(
                                                                                                ve,
                                                                                                `flex gap-1.5 ${
                                                                                                  ue() !==
                                                                                                  0
                                                                                                    ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                    : ""
                                                                                                }`
                                                                                              )
                                                                                          ),
                                                                                          ve
                                                                                        );
                                                                                      })(),
                                                                                }
                                                                              )
                                                                            ),
                                                                            n(
                                                                              F,
                                                                              l(
                                                                                et,
                                                                                {
                                                                                  label:
                                                                                    "Add Field Option",
                                                                                  onClick:
                                                                                    () => {
                                                                                      le(
                                                                                        (
                                                                                          X
                                                                                        ) => ({
                                                                                          ...X,
                                                                                          [j]: [
                                                                                            ...(X[
                                                                                              j
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
                                                                k
                                                              );
                                                            },
                                                          }),
                                                          null
                                                        ),
                                                        R(() =>
                                                          D(
                                                            H,
                                                            `flex gap-1.5 ${
                                                              fe() !== 0
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
                                              ae
                                            );
                                          })(),
                                          l(et, {
                                            label: "Add Form Element",
                                            onClick: () => {
                                              B([
                                                ...z(),
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
                                  Z
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
                    var te = xn();
                    return (
                      n(
                        te,
                        l(Q, {
                          get when() {
                            return (
                              w().value === "freeText" ||
                              w().value === "customForm"
                            );
                          },
                          get children() {
                            return [
                              (() => {
                                var Z = hc();
                                return (
                                  Z.firstChild,
                                  n(
                                    Z,
                                    (() => {
                                      var ae = ne(() => m().length <= 0);
                                      return () => ae() && Tt();
                                    })(),
                                    null
                                  ),
                                  Z
                                );
                              })(),
                              l(de, {
                                get each() {
                                  return m();
                                },
                                children: (Z) => {
                                  if (Z.content.type === "dynamicInput")
                                    return (() => {
                                      var ae = sl(),
                                        j = ae.firstChild,
                                        fe = j.nextSibling;
                                      return (
                                        (j.$$click = () => {
                                          const H = m().filter(
                                            (se) => se.value !== Z.value
                                          );
                                          g(H), N([...A(), Z]);
                                        }),
                                        n(j, l(me, {})),
                                        n(
                                          fe,
                                          l(ce, {
                                            get name() {
                                              return Z.content.name;
                                            },
                                            get title() {
                                              return Z.content.title;
                                            },
                                            get toolTipText() {
                                              return Z.content.toolTipText;
                                            },
                                          })
                                        ),
                                        ae
                                      );
                                    })();
                                  if (Z.content.type === "reproductiveDropDown")
                                    return (() => {
                                      var ae = dl(),
                                        j = ae.firstChild,
                                        fe = j.nextSibling,
                                        H = fe.firstChild;
                                      return (
                                        (j.$$click = () => {
                                          const se = m().filter(
                                            (L) => L.value !== Z.value
                                          );
                                          g(se), N([...A(), Z]);
                                        }),
                                        n(j, l(me, {})),
                                        n(
                                          fe,
                                          l(Se, {
                                            name: "limitType",
                                            title: "Limit Type",
                                            options: $t,
                                            get defaultValue() {
                                              return $t[0].value;
                                            },
                                            toolTipText:
                                              "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                            onChange: (se) => {
                                              C(se);
                                            },
                                          }),
                                          H
                                        ),
                                        n(
                                          H,
                                          l(Q, {
                                            get when() {
                                              return (
                                                d().value ===
                                                "afterTimeInterval"
                                              );
                                            },
                                            get children() {
                                              return [
                                                l(ce, {
                                                  name: "amount",
                                                  title: "Amount",
                                                  value: 45,
                                                  toolTipText:
                                                    "The time to wait.",
                                                }),
                                                l(_e, {
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
                                          H,
                                          l(Q, {
                                            get when() {
                                              return (
                                                d().value === "atSpecifiedTime"
                                              );
                                            },
                                            get children() {
                                              return l(ce, {
                                                title: "Max Date and Time",
                                                name: "maxDateAndTime",
                                                toolTipText:
                                                  "Continue execution after the specified date and time",
                                              });
                                            },
                                          }),
                                          null
                                        ),
                                        ae
                                      );
                                    })();
                                },
                              }),
                              l(Pe, {
                                name: "Option",
                                dropdownOptions: A,
                                setDropdownOptions: N,
                                selectedOptions: m,
                                setSelectedOptions: g,
                                placeholder: "Add Options",
                                onChange: (Z) => {
                                  g(Z);
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
          U
        );
      })()
    );
  };
he(["click"]);
var Tc = $('<div id=parameter class="mt-0 px-5 py-4 ">');
const Cc = () => {
  const { formConfig: e } = xe();
  return (
    console.log("formConfig", e().id, e().name),
    O(),
    (() => {
      var t = Tc();
      return (
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "switch";
            },
            get children() {
              return l(zd, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "edit";
            },
            get children() {
              return l($d, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "gmail-trigger";
            },
            get children() {
              return l(fs, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return (
                e().name === "ai-agent" || e().name === "customer-support-agent"
              );
            },
            get children() {
              return l(Ls, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "ollama-chat";
            },
            get children() {
              return l(Hs, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "send-email";
            },
            get children() {
              return l(cd, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "vector-store";
            },
            get children() {
              return l(Hd, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "pg-vector";
            },
            get children() {
              return l(ec, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "embedding";
            },
            get children() {
              return l(nc, {});
            },
          }),
          null
        ),
        n(
          t,
          l(Q, {
            get when() {
              return e().name === "create-draft";
            },
            get children() {
              return l(_c, {});
            },
          }),
          null
        ),
        R((i) => He(t, { [Ao.param]: !0 }, i)),
        t
      );
    })()
  );
};
var Sc = $(
    '<div class="relative w-full"><select multiple title=select class="w-full appearance-none bg-[#1e1f2b] text-white text-sm px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"><svg class="w-4 h-4"fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'
  ),
  Ic = $("<option>");
const Ec = ({ options: e, onOption: t, name: i }) => {
  const [a, s] = O(0),
    u = (r) => {
      const o = r.target.selectedIndex;
      s(o), t?.(e[o]);
    };
  return (
    Ee(() => {
      t?.(e[0]);
    }),
    (() => {
      var r = Sc(),
        o = r.firstChild;
      return (
        o.addEventListener("change", u),
        ie(o, "name", i),
        n(o, () =>
          e.map((v) =>
            (() => {
              var c = Ic();
              return n(c, () => v.label), R(() => (c.value = v.value)), c;
            })()
          )
        ),
        r
      );
    })()
  );
};
var Nc = $(
  '<div class="flex flex-col text-sm text-gray-300 font-sans"><div class="text-sm flex items-center gap-1 group mb-1"><div>Notes</div><div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?</div></div><textarea title=notes id=notes class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono">'
);
const Oc = ({ toolTipContent: e }) => {
  const [t, i] = O(""),
    [a, s] = O(!1);
  return (() => {
    var u = Nc(),
      r = u.firstChild,
      o = r.firstChild,
      v = o.nextSibling;
    v.firstChild;
    var c = r.nextSibling;
    return (
      v.addEventListener("mouseleave", () => s(!1)),
      v.addEventListener("mouseenter", () => s(!0)),
      n(v, l(Be, { showTooltip: a, toolTipContent: e }), null),
      (c.$$input = (p) => i(p.target.value)),
      R(() => (c.value = t())),
      u
    );
  })();
};
he(["input"]);
var Ac = $(
  '<div class="mt-0 px-5 py-4 overflow-visible"><div class=text-white><div class="mt-3 space-y-3"><div class=mt-6><hr class=border-[#373749]><p class="mt-1 text-[#737475] text-sm">Switch node version 2.3.2(latest)'
);
const Dc = (e) => {
  O(!1);
  const { formConfig: t, settingConfig: i } = xe(),
    a = [
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
    var s = Ac(),
      u = s.firstChild,
      r = u.firstChild,
      o = r.firstChild;
    return (
      n(
        r,
        () =>
          i()?.settings.map((v, c) => {
            if (v.type === "dropdown") return l(Ec, { options: a });
            v.type;
          }),
        o
      ),
      n(
        r,
        l(Oc, {
          toolTipContent: {
            label: "",
            text: "Optional note to save with the node",
          },
        }),
        o
      ),
      n(
        r,
        l(Ie, { switchText: "", toolTipContent: { label: "", text: "" } }),
        o
      ),
      s
    );
  })();
};
var kc = $(
  '<div id=mid-panel class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"><div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium"></span></div><button id=submitBtn type=submit class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="h-full flex-1 overflow-visible"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings</div></div></div><div class=overflow-visible><div></div><div>'
);
const Pc = (e) => {
  const { formConfig: t } = xe(),
    [i, a] = O(0);
  return (() => {
    var s = kc(),
      u = s.firstChild,
      r = u.firstChild,
      o = r.firstChild,
      v = o.nextSibling,
      c = r.nextSibling,
      p = u.nextSibling,
      b = p.firstChild,
      T = b.firstChild,
      A = T.firstChild,
      N = A.firstChild,
      m = N.nextSibling,
      g = T.nextSibling,
      w = g.firstChild,
      y = w.nextSibling;
    return (
      n(v, () => t().title),
      (N.$$click = () => a(0)),
      (m.$$click = () => a(1)),
      n(w, l(Cc, {})),
      n(y, l(Dc, {})),
      R(
        (x) => {
          var f = { [Ao.midPanel]: !0 },
            h = `${t().name}Form`,
            E = `rounded-none border-b-2 ${
              i() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            S = `rounded-none border-b-2 ${
              i() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            I = i() === 0 ? "" : "hidden",
            d = i() === 1 ? "" : "hidden";
          return (
            (x.e = He(s, f, x.e)),
            h !== x.t && ie(c, "form", (x.t = h)),
            E !== x.a && D(N, (x.a = E)),
            S !== x.o && D(m, (x.o = S)),
            I !== x.i && D(w, (x.i = I)),
            d !== x.n && D(y, (x.n = d)),
            x
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 }
      ),
      s
    );
  })();
};
he(["click"]);
const Lc = "_rightPanel_1ew1b_1",
  Mc = { rightPanel: Lc };
var Vc = $(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output'
);
const Fc = (e) =>
  (() => {
    var t = Vc(),
      i = t.firstChild;
    return (
      i.firstChild,
      n(
        i,
        l(Gt, {
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
      R((a) => He(t, { [Mc.rightPanel]: !0 }, a)),
      t
    );
  })();
var Bc = $('<div class="flex items-start h-full w-full overflow-hidden">');
const Rc = (e) =>
  (() => {
    var t = Bc();
    return (
      n(t, l(ga, {}), null), n(t, l(Pc, {}), null), n(t, l(Fc, {}), null), t
    );
  })();
var zc = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const Wc = (e) => zc();
var Hc = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const qc = (e) => Hc();
var Uc = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const jc = (e) => Uc();
var Gc = $(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const Xc = (e) => Gc();
var Yc = $(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex cursor-pointer items-center font-medium text-white gap-x-2.5"><div class="text-xl text-[#a7a4a4] "></div><div class=text-base>Back to canvas</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const Jc = (e) => {
  const { formConfig: t, setIsModalOpen: i } = xe();
  return (() => {
    var a = Yc(),
      s = a.firstChild,
      u = s.firstChild,
      r = s.nextSibling,
      o = r.firstChild,
      v = o.nextSibling,
      c = v.nextSibling;
    return (
      (s.$$click = () => i(!1)),
      n(u, l(Wc, {})),
      n(o, l(jc, {})),
      n(v, l(Xc, {})),
      n(c, l(qc, {})),
      a
    );
  })();
};
he(["click"]);
var Zc = $(
    `<div class="flex h-full"><div class="flex-1 pr-4"><div class=mb-4><label class="block text-sm mb-1">Connect using <span class=text-red-500>*</span></label><div class="flex gap-2"><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input form=gmailParam name=connectMethod type=radio value=oauth2><span class=text-sm>OAuth2 (recommended)</span></label><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input form=gmailParam type=radio name=connectMethod value=service><span class=text-sm>Service Account</span></label></div></div><div class=mb-4><label class="block text-sm mb-1">OAuth Redirect URL</label><input form=gmailParam type=text name=oauthRedirectUrl class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=https://workflow.juwelt.net/rest/oauth2-credentials/callback title="OAuth Redirect URL"placeholder="OAuth Redirect URL"><p class="text-xs text-gray-400 mt-1">In Gmail, use this URL above when prompted to enter an OAuth callback or redirect URL.</p></div><div class=mb-4><input form=gmailParam type=text name=clientId class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"title="Client ID"placeholder="Enter your Client ID"></div><div class=mb-4><input form=gmailParam type=password name=clientSecret class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value title="Client Secret"placeholder="Enter your Client Secret"></div><div class="flex items-center gap-1 text-xs text-gray-400"><span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">i</span><span>Enterprise plan users can pull in credentials from external vaults. <a href=# class=text-blue-400>More info</a></span></div></div><div id=right class="w-[300px] bg-[#252535] rounded p-4 h-full"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-medium">Setup guide</h3><a href=# class="text-xs text-blue-400 flex items-center gap-1">Docs<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1=10 y1=14 x2=21 y2=3></line></svg></a></div><div class="text-xs text-gray-300 overflow-y-auto h-full"><p class=mb-2>Configure this credential:</p><ul class="list-disc pl-5 space-y-2"><li>Log in to your <a href=# class=text-blue-400>Google Cloud console</a>.</li><li>Go to Google Cloud Console / APIs and Services / Credentials. If you don't have a project yet, you'll need to create a new one and select it.</li><li>If you haven't used OAuth in this Google Cloud project before, <a href=# class=text-blue-400>configure the consent screen</a>.</li><li>In Credentials, select + CREATE CREDENTIALS + OAuth client ID.</li><li>In the Application type dropdown, select Web application.</li><li>Under Authorized redirect URLs, select + ADD URI. Paste in the OAuth redirect URL shown on the left.</li><li>Select Create.</li><li>In Enabled APIs and services, select + ENABLE APIS AND SERVICES.</li><li>Select and enable the Gmail API.</li><li>Back to Credentials, click on the credential in OAuth 2.0 Client IDs, and copy the Client ID and Client Secret.</li></ul><p class=mt-2>Click the docs link above for more detailed instructions.`
  ),
  Kc = $("<div class=text-sm>Sharing settings content goes here..."),
  Qc = $("<div class=text-sm>Details content goes here..."),
  eu = $(
    '<div class="bg-[#2a2a3a] text-white rounded-md shadow-lg w-full h-full"><div class="p-4 flex justify-between items-center border-b border-gray-700 "><div class="flex items-center gap-2"><h2 class="text-base font-medium">Gmail account 4</h2><span class="text-xs text-gray-400">Gmail OAuth2 API</span></div><div class="flex items-center gap-2"><button type=submit form=modal2 class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Save</button><button class="text-gray-400 hover:text-white">×</button></div></div><div class="flex w-full h-full"><div class="min-w-[150px] w-[200px] max-w-[250px] bg-[#252535] p-4 flex flex-col gap-3 rounded-bl-md"><button>Connection</button><button>Sharing</button><button>Details</button></div><div class=" p-4 h-full w-full">'
  );
function tu() {
  const [e, t] = O("connection"),
    [i, a] = O("oauth2"),
    { setIsModalOpen2: s, setFormData: u, formConfig: r, formData: o } = xe();
  return (() => {
    var v = eu(),
      c = v.firstChild,
      p = c.firstChild,
      b = p.nextSibling,
      T = b.firstChild,
      A = T.nextSibling,
      N = c.nextSibling,
      m = N.firstChild,
      g = m.firstChild,
      w = g.nextSibling,
      y = w.nextSibling,
      x = m.nextSibling;
    return (
      (A.$$click = () => s(!1)),
      (g.$$click = () => t("connection")),
      (w.$$click = () => t("sharing")),
      (y.$$click = () => t("details")),
      n(
        x,
        l(Q, {
          get when() {
            return e() === "connection";
          },
          get children() {
            var f = Zc(),
              h = f.firstChild,
              E = h.firstChild,
              S = E.firstChild,
              I = S.nextSibling,
              d = I.firstChild,
              C = d.firstChild,
              _ = d.nextSibling,
              P = _.firstChild,
              z = E.nextSibling,
              B = z.firstChild,
              W = B.nextSibling,
              q = z.nextSibling,
              V = q.firstChild,
              le = q.nextSibling,
              U = le.firstChild;
            return (
              W.addEventListener("change", (K) => {
                u({
                  ...o(),
                  [r().id]: {
                    ...o()[r().id],
                    "OAuth Redirect URL": K.target.value,
                  },
                });
              }),
              V.addEventListener("change", (K) => {
                u({
                  ...o(),
                  [r().id]: { ...o()[r().id], "Client ID": K.target.value },
                });
              }),
              U.addEventListener("change", (K) => {
                u({
                  ...o(),
                  [r().id]: { ...o()[r().id], "Client Secret": K.target.value },
                });
              }),
              R(() => (C.checked = i() === "oauth2")),
              R(() => (P.checked = i() === "service")),
              f
            );
          },
        }),
        null
      ),
      n(
        x,
        l(Q, {
          get when() {
            return e() === "sharing";
          },
          get children() {
            return Kc();
          },
        }),
        null
      ),
      n(
        x,
        l(Q, {
          get when() {
            return e() === "details";
          },
          get children() {
            return Qc();
          },
        }),
        null
      ),
      R(
        (f) => {
          var h = `text-left text-sm ${
              e() === "connection" ? "text-white" : "text-gray-400"
            }`,
            E = `text-left text-sm ${
              e() === "sharing" ? "text-white" : "text-gray-400"
            }`,
            S = `text-left text-sm ${
              e() === "details" ? "text-white" : "text-gray-400"
            }`;
          return (
            h !== f.e && D(g, (f.e = h)),
            E !== f.t && D(w, (f.t = E)),
            S !== f.a && D(y, (f.a = S)),
            f
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      v
    );
  })();
}
he(["click"]);
var nu = $(
  '<div class="bg-[#20202c] text-white rounded-lg w-full min-h-[400px] max-h-[800px] flex flex-col"><div class="flex items-center justify-between p-4 border-b border-[#39393b] flex-shrink-0"><h2 class="text-xl font-medium">Edit Sender</h2><div class="text-gray-400 hover:text-white text-xs cursor-pointer bg-[#151520] rounded-md w-6 h-6 flex justify-center items-center">✕</div></div><div class="p-4 flex flex-col flex-1"><label class="text-base text-gray-300 mb-2 font-semibold">Sender</label><textarea placeholder=... class="min-h-[300px] border rounded p-3 border-neutral-700 bg-[#252631] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors resize-y">'
);
const lu = () => {
  const { setIsModalOpen3: e } = xe();
  return (() => {
    var t = nu(),
      i = t.firstChild,
      a = i.firstChild,
      s = a.nextSibling;
    return (s.$$click = () => e(!1)), t;
  })();
};
he(["click"]);
var ou = $(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const iu = ({ node: e }) => {
    const [t, i] = O(),
      {
        nodes: a,
        setNodes: s,
        selectedNode: u,
        setSelectedNode: r,
        pendingOutput: o,
        lastClickPosition: v,
        setEdges: c,
        edges: p,
        transform: b,
        scale: T,
        isShowModal: A,
        setIsModalOpen: N,
        isModalOpen: m,
        isModalOpen2: g,
        setIsModalOpen2: w,
        isModalOpen3: y,
        setIsModalOpen3: x,
      } = xe();
    function f(h) {
      let E = window.innerWidth / 2,
        S = window.innerHeight / 2;
      const I = u(),
        d = o(),
        C = v();
      function _(H, se = 200, L = 0) {
        const J = a().find((k) => k.id === H);
        if ((i(J), !J)) return null;
        const Y = J.currPosition.get();
        return { x: Y.x + se, y: Y.y + L };
      }
      if (I) {
        let H = _(I);
        H && ((E = H.x), (S = H.y));
      } else if (d) {
        let H = _(d.nodeId);
        H && ((E = H.x), (S = H.y));
      } else C && ((E = (C.x - b().x) / T()), (S = (C.y - b().y) / T()));
      const [P, z] = O({ x: E, y: S }),
        [B, W] = O({ x: E, y: S }),
        [q, V] = O([]),
        [le, U] = O([]),
        [K, ee] = O([]),
        pe = [
          ...Array(Number(e[h].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        te = [
          ...Array(Number(e[h].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        Z = [
          ...Array(Number(e[h].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        ae = [
          ...Array(Number(e[h].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ];
      vt(() => {
        s([
          ...a(),
          {
            id: `node_${Math.random().toString(36).substring(2, 8)}_${h}`,
            name: h,
            title: e[h].title,
            numberInputs: e[h].numberInputs,
            numberOutputs: e[h].numberOutputs,
            isInputVertex: e[h].isInputVertex,
            isOutputVertex: e[h].isOutputVertex,
            inputVertexIds: pe,
            outputVertexIds: te,
            isDownVertex: e[h].isDownVertex || !1,
            isUpVertex: e[h].isUpVertex || !1,
            downVertexNumber: e[h].downVertexNumber || 0,
            upVertexNumber: e[h].upVertexNumber || 0,
            downVertexIds: Z,
            upVertexIds: ae,
            downVertexOrientation: e[h].downVertexOrientation,
            busyIndex: { get: K, set: ee },
            content: e[h].content,
            prevPosition: { get: P, set: z },
            currPosition: { get: B, set: W },
            inputEdgeIds: { get: q, set: V },
            outputEdgeIds: { get: le, set: U },
          },
        ]);
      });
      const j = a()[a().length - 1];
      function fe(H = 0) {
        const se = document.getElementById(t().outputVertexIds[H]),
          { left: L, right: J, top: Y, bottom: k } = se.getBoundingClientRect(),
          M = L + Math.abs(L - J) / 2,
          F = Y + Math.abs(Y - k) / 2,
          oe = document.getElementById(j.inputVertexIds[0]),
          {
            left: G,
            right: X,
            top: ue,
            bottom: ve,
          } = oe.getBoundingClientRect(),
          re = G + Math.abs(G - X) / 2,
          ge = ue + Math.abs(ue - ve) / 2,
          [Ce, Te] = O({ x: (M - b().x) / T(), y: (F - b().y) / T() }),
          [lt, ot] = O({ x: (re - b().x) / T(), y: (ge - b().y) / T() }),
          [Lt, Mt] = O({ x: (M - b().x) / T(), y: (F - b().y) / T() }),
          [Vt, Nn] = O({ x: (re - b().x) / T(), y: (ge - b().y) / T() }),
          Zt = `edge_${t().id}_${H}_${j.id}_0`;
        t().outputEdgeIds.set([...t().outputEdgeIds.get(), Zt]),
          j.inputEdgeIds.set([...j.inputEdgeIds.get(), Zt]),
          c([
            ...p(),
            {
              id: Zt,
              nodeStartId: t().id,
              nodeEndId: j.id,
              inputIndex: 0,
              typeOfEdge: "solid",
              outputIndex: H,
              inputVertexId: j.inputVertexIds[0],
              outputVertexId: t().outputVertexIds[H],
              prevStartPosition: { get: Ce, set: Te },
              prevEndPosition: { get: lt, set: ot },
              currStartPosition: { get: Lt, set: Mt },
              currEndPosition: { get: Vt, set: Nn },
            },
          ]),
          t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[H]]);
      }
      I
        ? t()?.isOutputVertex && j.isInputVertex && fe()
        : d &&
          t()?.isOutputVertex &&
          j.isInputVertex &&
          fe(d.outputVertexIndex),
        a().length <= 1 && a()[0].isOutputVertex
          ? r(a()[0].id)
          : t()?.isOutputVertex && j.isInputVertex && r(j.id);
    }
    return (() => {
      var h = ou();
      return (
        n(
          h,
          l(ft, {
            get children() {
              return l(ea, {});
            },
          }),
          null
        ),
        n(
          h,
          l(ft, {
            get children() {
              return [
                l(Qt, {
                  isOpen: () => m(),
                  onClose: () => N(!1),
                  zIndex: 9999,
                  get children() {
                    return [l(Jc, {}), l(Rc, {})];
                  },
                }),
                l(Qt, {
                  isOpen: () => g(),
                  onClose: () => w(!1),
                  zIndex: 1e5,
                  widthClass:
                    "w-[1100px] min-w-[750px] max-w-[1200px] h-fit max-h-[90vh]",
                  get children() {
                    return l(tu, {});
                  },
                }),
                l(Qt, {
                  isOpen: () => y(),
                  onClose: () => x(!1),
                  zIndex: 1e5,
                  widthClass: "w-[80vw] max-w-[85vw] h-fit max-h-[90vh]",
                  get children() {
                    return l(lu, {});
                  },
                }),
              ];
            },
          }),
          null
        ),
        n(
          h,
          l(ft, {
            get children() {
              return l(qi, { onClickAdd: f, nodeMark: Kr });
            },
          }),
          null
        ),
        n(
          h,
          l(ft, {
            get children() {
              return l(Ti, {});
            },
          }),
          null
        ),
        n(
          h,
          l(ft, {
            get children() {
              return l(Lr, {});
            },
          }),
          null
        ),
        h
      );
    })();
  },
  ru = "_node_rwgw3_1",
  au = "_selectedNode_rwgw3_25",
  su = "_switchIcon_rwgw3_61",
  du = "_switchNodeText_rwgw3_69",
  cu = "_switchTitle_rwgw3_85",
  uu = "_switchDescription_rwgw3_95",
  at = {
    node: ru,
    selectedNode: au,
    switchIcon: su,
    switchNodeText: du,
    switchTitle: cu,
    switchDescription: uu,
  };
var pu = $(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const vu = (e) =>
    (() => {
      var t = pu(),
        i = t.firstChild,
        a = i.nextSibling,
        s = a.firstChild,
        u = s.nextSibling;
      return (
        R(
          (r) => {
            var o = e.selected ? at.selectedNode : at.node,
              v = at.switchIcon,
              c = at.switchNodeText,
              p = at.switchTitle,
              b = at.switchDescription;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(i, (r.t = v)),
              c !== r.a && D(a, (r.a = c)),
              p !== r.o && D(s, (r.o = p)),
              b !== r.i && D(u, (r.i = b)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  mu = "_testNode_3c9qb_1",
  hu = "_selectedNode_3c9qb_25",
  fu = "_testNodeIcon_3c9qb_55",
  gu = "_testNodeTitle_3c9qb_63",
  zt = { testNode: mu, selectedNode: hu, testNodeIcon: fu, testNodeTitle: gu };
var xu = $(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const bu = (e) =>
    (() => {
      var t = xu(),
        i = t.firstChild,
        a = i.nextSibling;
      return (
        R(
          (s) => {
            var u = e.selected ? zt.selectedNode : zt.testNode,
              r = zt.testNodeIcon,
              o = zt.testNodeTitle;
            return (
              u !== s.e && D(t, (s.e = u)),
              r !== s.t && D(i, (s.t = r)),
              o !== s.a && D(a, (s.a = o)),
              s
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  yu = "_node_160z5_1",
  wu = "_selectedNode_160z5_23",
  $u = "_switchIcon_160z5_59",
  _u = "_switchNodeText_160z5_67",
  Tu = "_switchTitle_160z5_83",
  Cu = "_switchDescription_160z5_93",
  st = {
    node: yu,
    selectedNode: wu,
    switchIcon: $u,
    switchNodeText: _u,
    switchTitle: Tu,
    switchDescription: Cu,
  };
var Su = $(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const Iu = (e) =>
    (() => {
      var t = Su(),
        i = t.firstChild,
        a = i.nextSibling,
        s = a.firstChild,
        u = s.nextSibling;
      return (
        R(
          (r) => {
            var o = e.selected ? st.selectedNode : st.node,
              v = st.switchIcon,
              c = st.switchNodeText,
              p = st.switchTitle,
              b = st.switchDescription;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(i, (r.t = v)),
              c !== r.a && D(a, (r.a = c)),
              p !== r.o && D(s, (r.o = p)),
              b !== r.i && D(u, (r.i = b)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Eu = "_node_13uy5_1",
  Nu = "_selectedNode_13uy5_25",
  Ou = "_switchIcon_13uy5_59",
  Au = "_switchNodeText_13uy5_67",
  Du = "_switchTitle_13uy5_83",
  Ct = {
    node: Eu,
    selectedNode: Nu,
    switchIcon: Ou,
    switchNodeText: Au,
    switchTitle: Du,
  };
var ku = $(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const Pu = (e) =>
    (() => {
      var t = ku(),
        i = t.firstChild,
        a = i.nextSibling,
        s = a.firstChild;
      return (
        R(
          (u) => {
            var r = e.selected ? Ct.selectedNode : Ct.node,
              o = Ct.switchIcon,
              v = Ct.switchNodeText,
              c = Ct.switchTitle;
            return (
              r !== u.e && D(t, (u.e = r)),
              o !== u.t && D(i, (u.t = o)),
              v !== u.a && D(a, (u.a = v)),
              c !== u.o && D(s, (u.o = c)),
              u
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Lu = "_AiAgentNode_4heyh_1",
  Mu = "_selectedNode_4heyh_33",
  Vu = "_AiAgentNodeIcon_4heyh_71",
  Fu = "_AiAgentNodeTitle_4heyh_81",
  Bu = "_AiAgentNodeDescription_4heyh_97",
  dt = {
    AiAgentNode: Lu,
    selectedNode: Mu,
    AiAgentNodeIcon: Vu,
    AiAgentNodeTitle: Fu,
    AiAgentNodeDescription: Bu,
  };
var Ru = $("<div><div></div><div><div></div><div>Tools Agent");
const ul = (e) =>
    (() => {
      var t = Ru(),
        i = t.firstChild,
        a = i.nextSibling,
        s = a.firstChild,
        u = s.nextSibling;
      return (
        n(i, l($n, {})),
        n(s, () => e.title),
        R(
          (r) => {
            var o = e.selected ? dt.selectedNode : dt.AiAgentNode,
              v = dt.AiAgentNodeIcon,
              c = dt.AiAgentNodeText,
              p = dt.AiAgentNodeTitle,
              b = dt.AiAgentNodeDescription;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(i, (r.t = v)),
              c !== r.a && D(a, (r.a = c)),
              p !== r.o && D(s, (r.o = p)),
              b !== r.i && D(u, (r.i = b)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  zu = "_EmailNode_imw2c_1",
  Wu = "_selectedNode_imw2c_23",
  Hu = "_mailIcon_imw2c_49",
  qu = "_mailNodeText_imw2c_61",
  Uu = "_mailTitle_imw2c_77",
  ju = "_mailDescription_imw2c_87",
  ct = {
    EmailNode: zu,
    selectedNode: Wu,
    mailIcon: Hu,
    mailNodeText: qu,
    mailTitle: Uu,
    mailDescription: ju,
  };
var Gu = $("<div><div></div><div><div>Send Email</div><div>send");
const Xu = (e) =>
    (() => {
      var t = Gu(),
        i = t.firstChild,
        a = i.nextSibling,
        s = a.firstChild,
        u = s.nextSibling;
      return (
        n(i, l(To, {})),
        R(
          (r) => {
            var o = e.selected ? ct.selectedNode : ct.EmailNode,
              v = ct.mailIcon,
              c = ct.mailNodeText,
              p = ct.mailTitle,
              b = ct.mailDescription;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(i, (r.t = v)),
              c !== r.a && D(a, (r.a = c)),
              p !== r.o && D(s, (r.o = p)),
              b !== r.i && D(u, (r.i = b)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Yu = "_VectorStoreNode_omif4_1",
  Ju = "_selectedNode_omif4_31",
  Zu = "_VectorStoreNodeIcon_omif4_67",
  Ku = "_VectorStoreNodeTitle_omif4_77",
  Qu = "_VectorStoreNodeText_omif4_97",
  St = {
    VectorStoreNode: Yu,
    selectedNode: Ju,
    VectorStoreNodeIcon: Zu,
    VectorStoreNodeTitle: Ku,
    VectorStoreNodeText: Qu,
  };
var ep = $(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const tp = (e) =>
    (() => {
      var t = ep(),
        i = t.firstChild,
        a = i.firstChild,
        s = a.nextSibling,
        u = s.firstChild;
      return (
        n(a, l(Co, {})),
        R(
          (r) => {
            var o = e.selected ? St.selectedNode : St.VectorStoreNode,
              v = St.VectorStoreNodeIcon,
              c = St.VectorStoreNodeText,
              p = St.VectorStoreNodeTitle;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(a, (r.t = v)),
              c !== r.a && D(s, (r.a = c)),
              p !== r.o && D(u, (r.o = p)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  np = "_pgVectorNode_4ee5v_1",
  lp = "_selectedNode_4ee5v_31",
  op = "_pgVectorNodeIcon_4ee5v_67",
  ip = "_pgVectorNodeTitle_4ee5v_77",
  rp = "_pgVectorNodeText_4ee5v_95",
  It = {
    pgVectorNode: np,
    selectedNode: lp,
    pgVectorNodeIcon: op,
    pgVectorNodeTitle: ip,
    pgVectorNodeText: rp,
  };
var ap = $(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const sp = (e) =>
    (() => {
      var t = ap(),
        i = t.firstChild,
        a = i.firstChild,
        s = a.nextSibling,
        u = s.firstChild;
      return (
        n(a, l(So, {})),
        R(
          (r) => {
            var o = e.selected ? It.selectedNode : It.pgVectorNode,
              v = It.pgVectorNodeIcon,
              c = It.pgVectorNodeText,
              p = It.pgVectorNodeTitle;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(a, (r.t = v)),
              c !== r.a && D(s, (r.a = c)),
              p !== r.o && D(u, (r.o = p)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  dp = "_ollamaChatNode_24diw_1",
  cp = "_selectedNode_24diw_31",
  up = "_ollamaChatNodeIcon_24diw_67",
  pp = "_ollamaChatNodeTitle_24diw_77",
  vp = "_ollamaChatNodeText_24diw_95",
  Et = {
    ollamaChatNode: dp,
    selectedNode: cp,
    ollamaChatNodeIcon: up,
    ollamaChatNodeTitle: pp,
    ollamaChatNodeText: vp,
  };
var mp = $(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const hp = (e) =>
    (() => {
      var t = mp(),
        i = t.firstChild,
        a = i.firstChild,
        s = a.nextSibling,
        u = s.firstChild;
      return (
        n(a, l(Io, {})),
        R(
          (r) => {
            var o = e.selected ? Et.selectedNode : Et.ollamaChatNode,
              v = Et.ollamaChatNodeIcon,
              c = Et.ollamaChatNodeText,
              p = `${Et.ollamaChatNodeTitle} text-nowrap`;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(a, (r.t = v)),
              c !== r.a && D(s, (r.a = c)),
              p !== r.o && D(u, (r.o = p)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  fp = "_gmailTriggerNode_1hu5j_1",
  gp = "_selectedNode_1hu5j_25",
  xp = "_gmailTriggerNodeIcon_1hu5j_55",
  bp = "_gmailTriggerNodeText_1hu5j_65",
  yp = "_gmailTriggerNodeTitle_1hu5j_83",
  wp = "_gmailTriggerNodeDescription_1hu5j_93",
  ut = {
    gmailTriggerNode: fp,
    selectedNode: gp,
    gmailTriggerNodeIcon: xp,
    gmailTriggerNodeText: bp,
    gmailTriggerNodeTitle: yp,
    gmailTriggerNodeDescription: wp,
  };
var $p = $("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const _p = (e) =>
    (() => {
      var t = $p(),
        i = t.firstChild,
        a = i.nextSibling,
        s = a.firstChild,
        u = s.nextSibling;
      return (
        n(i, l(Eo, {})),
        R(
          (r) => {
            var o = e.selected ? ut.selectedNode : ut.gmailTriggerNode,
              v = ut.gmailTriggerNodeIcon,
              c = ut.gmailTriggerNodeText,
              p = ut.gmailTriggerNodeTitle,
              b = ut.gmailTriggerNodeDescription;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(i, (r.t = v)),
              c !== r.a && D(a, (r.a = c)),
              p !== r.o && D(s, (r.o = p)),
              b !== r.i && D(u, (r.i = b)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Tp = "_createDraftNode_gxi0p_1",
  Cp = "_selectedNode_gxi0p_31",
  Sp = "_createDraftNodeIcon_gxi0p_67",
  Ip = "_createDraftNodeTitle_gxi0p_77",
  Ep = "_createDraftNodeText_gxi0p_95",
  Np = "_createDraftNodeDescription_gxi0p_115",
  pt = {
    createDraftNode: Tp,
    selectedNode: Cp,
    createDraftNodeIcon: Sp,
    createDraftNodeTitle: Ip,
    createDraftNodeText: Ep,
    createDraftNodeDescription: Np,
  };
var Op = $(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const Ap = (e) =>
    (() => {
      var t = Op(),
        i = t.firstChild,
        a = i.firstChild,
        s = a.nextSibling,
        u = s.firstChild,
        r = u.nextSibling;
      return (
        n(a, l(No, {})),
        R(
          (o) => {
            var v = e.selected ? pt.selectedNode : pt.createDraftNode,
              c = pt.createDraftNodeIcon,
              p = pt.createDraftNodeText,
              b = `${pt.createDraftNodeTitle} text-nowrap`,
              T = pt.createDraftNodeDescription;
            return (
              v !== o.e && D(t, (o.e = v)),
              c !== o.t && D(a, (o.t = c)),
              p !== o.a && D(s, (o.a = p)),
              b !== o.o && D(u, (o.o = b)),
              T !== o.i && D(r, (o.i = T)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Dp = "_embeddingNode_19nxp_1",
  kp = "_selectedNode_19nxp_31",
  Pp = "_embeddingNodeIcon_19nxp_67",
  Lp = "_embeddingNodeTitle_19nxp_77",
  Mp = "_embeddingNodeText_19nxp_95",
  Nt = {
    embeddingNode: Dp,
    selectedNode: kp,
    embeddingNodeIcon: Pp,
    embeddingNodeTitle: Lp,
    embeddingNodeText: Mp,
  };
var Vp = $(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const Fp = (e) =>
    (() => {
      var t = Vp(),
        i = t.firstChild,
        a = i.firstChild,
        s = a.nextSibling,
        u = s.firstChild;
      return (
        n(a, l(Oo, {})),
        R(
          (r) => {
            var o = e.selected ? Nt.selectedNode : Nt.embeddingNode,
              v = Nt.embeddingNodeIcon,
              c = Nt.embeddingNodeText,
              p = `${Nt.embeddingNodeTitle} text-nowrap`;
            return (
              o !== r.e && D(t, (r.e = o)),
              v !== r.t && D(a, (r.t = v)),
              c !== r.a && D(s, (r.a = c)),
              p !== r.o && D(u, (r.o = p)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Bp = {
    chat: {
      name: "chat",
      title: "Chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: bu,
    },
    switch: {
      name: "switch",
      title: "Switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: vu,
    },
    edit: {
      name: "edit",
      title: "EditNode",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Iu,
    },
    filter: {
      name: "filter",
      title: "Filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Pu,
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
      content: ul,
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
      content: ul,
    },
    "send-email": {
      name: "send-email",
      title: "Send Email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Xu,
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
      content: tp,
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
      content: sp,
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
      content: hp,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      title: "GmailReader",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: _p,
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
      content: Ap,
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
      content: Fp,
    },
  },
  Rp = (e) => l(iu, { node: Bp }),
  zp = document.getElementById("root");
ri(() => l(Rp, {}), zp);
