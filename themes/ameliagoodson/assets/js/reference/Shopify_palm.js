var sn = Object.defineProperty;
var an = (n, e, t) =>
  e in n
    ? sn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (n[e] = t);
var B = (n, e, t) => an(n, typeof e != "symbol" ? e + "" : e, t);
import {
  R as Le,
  r as l,
  j as s,
  B as ln,
  x as cn,
  D as un,
} from "./components-BLYXEVDR.js";
import {
  a as ve,
  V as C,
  Q as ae,
  E as Ke,
  e as $,
  J as fn,
  t as hn,
  c as Pe,
  s as He,
  a2 as dn,
  a3 as Be,
  m as Q,
  a4 as mn,
  b as Xe,
  a5 as pn,
  o as De,
  d as te,
  a6 as le,
  a7 as Ee,
  a8 as L,
  a9 as gn,
  u as xe,
  w as vn,
  aa as xn,
  f as je,
  ab as oe,
  ac as Ue,
  ad as tt,
  O as Ut,
  ae as re,
  af as se,
  ag as Y,
  ah as Ze,
  ai as At,
  aj as wn,
  ak as yn,
  al as bn,
  am as nt,
  an as ot,
  L as Me,
  ao as _n,
  ap as Cn,
  aq as Sn,
  ar as Pn,
  as as Te,
  at as Mn,
  au as Tn,
  av as Rn,
} from "./index-DAMiY7pQ.js";
import { c as we } from "./constants-B4WsaW4p.js";
function kn(n, e, t) {
  return Math.max(e, Math.min(n, t));
}
const E = {
  toVector(n, e) {
    return n === void 0 && (n = e), Array.isArray(n) ? n : [n, n];
  },
  add(n, e) {
    return [n[0] + e[0], n[1] + e[1]];
  },
  sub(n, e) {
    return [n[0] - e[0], n[1] - e[1]];
  },
  addTo(n, e) {
    (n[0] += e[0]), (n[1] += e[1]);
  },
  subTo(n, e) {
    (n[0] -= e[0]), (n[1] -= e[1]);
  },
};
function rt(n, e, t) {
  return e === 0 || Math.abs(e) === 1 / 0
    ? Math.pow(n, t * 5)
    : (n * e * t) / (e + t * n);
}
function st(n, e, t, o = 0.15) {
  return o === 0
    ? kn(n, e, t)
    : n < e
    ? -rt(e - n, t - e, o) + e
    : n > t
    ? +rt(n - t, t - e, o) + t
    : n;
}
function Vn(n, [e, t], [o, r]) {
  const [[i, a], [c, u]] = n;
  return [st(e, i, a, o), st(t, c, u, r)];
}
function En(n, e) {
  if (typeof n != "object" || n === null) return n;
  var t = n[Symbol.toPrimitive];
  if (t !== void 0) {
    var o = t.call(n, e);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(n);
}
function jn(n) {
  var e = En(n, "string");
  return typeof e == "symbol" ? e : String(e);
}
function F(n, e, t) {
  return (
    (e = jn(e)),
    e in n
      ? Object.defineProperty(n, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (n[e] = t),
    n
  );
}
function it(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(n, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function U(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? it(Object(t), !0).forEach(function (o) {
          F(n, o, t[o]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t))
      : it(Object(t)).forEach(function (o) {
          Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
        });
  }
  return n;
}
const Ht = {
  pointer: { start: "down", change: "move", end: "up" },
  mouse: { start: "down", change: "move", end: "up" },
  touch: { start: "start", change: "move", end: "end" },
  gesture: { start: "start", change: "change", end: "end" },
};
function at(n) {
  return n ? n[0].toUpperCase() + n.slice(1) : "";
}
const Un = ["enter", "leave"];
function An(n = !1, e) {
  return n && !Un.includes(e);
}
function Hn(n, e = "", t = !1) {
  const o = Ht[n],
    r = (o && o[e]) || e;
  return "on" + at(n) + at(r) + (An(t, r) ? "Capture" : "");
}
const Dn = ["gotpointercapture", "lostpointercapture"];
function In(n) {
  let e = n.substring(2).toLowerCase();
  const t = !!~e.indexOf("passive");
  t && (e = e.replace("passive", ""));
  const o = Dn.includes(e) ? "capturecapture" : "capture",
    r = !!~e.indexOf(o);
  return (
    r && (e = e.replace("capture", "")), { device: e, capture: r, passive: t }
  );
}
function Fn(n, e = "") {
  const t = Ht[n],
    o = (t && t[e]) || e;
  return n + o;
}
function Ie(n) {
  return "touches" in n;
}
function Dt(n) {
  return Ie(n) ? "touch" : "pointerType" in n ? n.pointerType : "mouse";
}
function zn(n) {
  return Array.from(n.touches).filter((e) => {
    var t, o;
    return (
      e.target === n.currentTarget ||
      ((t = n.currentTarget) === null ||
      t === void 0 ||
      (o = t.contains) === null ||
      o === void 0
        ? void 0
        : o.call(t, e.target))
    );
  });
}
function Ln(n) {
  return n.type === "touchend" || n.type === "touchcancel"
    ? n.changedTouches
    : n.targetTouches;
}
function It(n) {
  return Ie(n) ? Ln(n)[0] : n;
}
function Ye(n, e) {
  try {
    const t = e.clientX - n.clientX,
      o = e.clientY - n.clientY,
      r = (e.clientX + n.clientX) / 2,
      i = (e.clientY + n.clientY) / 2,
      a = Math.hypot(t, o);
    return {
      angle: -(Math.atan2(t, o) * 180) / Math.PI,
      distance: a,
      origin: [r, i],
    };
  } catch {}
  return null;
}
function Bn(n) {
  return zn(n).map((e) => e.identifier);
}
function lt(n, e) {
  const [t, o] = Array.from(n.touches).filter((r) => e.includes(r.identifier));
  return Ye(t, o);
}
function Oe(n) {
  const e = It(n);
  return Ie(n) ? e.identifier : e.pointerId;
}
function pe(n) {
  const e = It(n);
  return [e.clientX, e.clientY];
}
const ct = 40,
  ut = 800;
function Ft(n) {
  let { deltaX: e, deltaY: t, deltaMode: o } = n;
  return (
    o === 1 ? ((e *= ct), (t *= ct)) : o === 2 && ((e *= ut), (t *= ut)), [e, t]
  );
}
function On(n) {
  var e, t;
  const {
    scrollX: o,
    scrollY: r,
    scrollLeft: i,
    scrollTop: a,
  } = n.currentTarget;
  return [
    (e = o ?? i) !== null && e !== void 0 ? e : 0,
    (t = r ?? a) !== null && t !== void 0 ? t : 0,
  ];
}
function Wn(n) {
  const e = {};
  if (("buttons" in n && (e.buttons = n.buttons), "shiftKey" in n)) {
    const { shiftKey: t, altKey: o, metaKey: r, ctrlKey: i } = n;
    Object.assign(e, { shiftKey: t, altKey: o, metaKey: r, ctrlKey: i });
  }
  return e;
}
function Ae(n, ...e) {
  return typeof n == "function" ? n(...e) : n;
}
function Nn() {}
function Yn(...n) {
  return n.length === 0
    ? Nn
    : n.length === 1
    ? n[0]
    : function () {
        let e;
        for (const t of n) e = t.apply(this, arguments) || e;
        return e;
      };
}
function ft(n, e) {
  return Object.assign({}, e, n || {});
}
const Gn = 32;
class zt {
  constructor(e, t, o) {
    (this.ctrl = e),
      (this.args = t),
      (this.key = o),
      this.state ||
        ((this.state = {}),
        this.computeValues([0, 0]),
        this.computeInitial(),
        this.init && this.init(),
        this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(e) {
    this.ctrl.state[this.key] = e;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const { state: e, shared: t, ingKey: o, args: r } = this;
    (t[o] = e._active = e.active = e._blocked = e._force = !1),
      (e._step = [!1, !1]),
      (e.intentional = !1),
      (e._movement = [0, 0]),
      (e._distance = [0, 0]),
      (e._direction = [0, 0]),
      (e._delta = [0, 0]),
      (e._bounds = [
        [-1 / 0, 1 / 0],
        [-1 / 0, 1 / 0],
      ]),
      (e.args = r),
      (e.axis = void 0),
      (e.memo = void 0),
      (e.elapsedTime = e.timeDelta = 0),
      (e.direction = [0, 0]),
      (e.distance = [0, 0]),
      (e.overflow = [0, 0]),
      (e._movementBound = [!1, !1]),
      (e.velocity = [0, 0]),
      (e.movement = [0, 0]),
      (e.delta = [0, 0]),
      (e.timeStamp = 0);
  }
  start(e) {
    const t = this.state,
      o = this.config;
    t._active ||
      (this.reset(),
      this.computeInitial(),
      (t._active = !0),
      (t.target = e.target),
      (t.currentTarget = e.currentTarget),
      (t.lastOffset = o.from ? Ae(o.from, t) : t.offset),
      (t.offset = t.lastOffset),
      (t.startTime = t.timeStamp = e.timeStamp));
  }
  computeValues(e) {
    const t = this.state;
    (t._values = e), (t.values = this.config.transform(e));
  }
  computeInitial() {
    const e = this.state;
    (e._initial = e._values), (e.initial = e.values);
  }
  compute(e) {
    const { state: t, config: o, shared: r } = this;
    t.args = this.args;
    let i = 0;
    if (
      (e &&
        ((t.event = e),
        o.preventDefault && e.cancelable && t.event.preventDefault(),
        (t.type = e.type),
        (r.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size),
        (r.locked = !!document.pointerLockElement),
        Object.assign(r, Wn(e)),
        (r.down = r.pressed = r.buttons % 2 === 1 || r.touches > 0),
        (i = e.timeStamp - t.timeStamp),
        (t.timeStamp = e.timeStamp),
        (t.elapsedTime = t.timeStamp - t.startTime)),
      t._active)
    ) {
      const y = t._delta.map(Math.abs);
      E.addTo(t._distance, y);
    }
    this.axisIntent && this.axisIntent(e);
    const [a, c] = t._movement,
      [u, f] = o.threshold,
      { _step: h, values: d } = t;
    if (
      (o.hasCustomTransform
        ? (h[0] === !1 && (h[0] = Math.abs(a) >= u && d[0]),
          h[1] === !1 && (h[1] = Math.abs(c) >= f && d[1]))
        : (h[0] === !1 && (h[0] = Math.abs(a) >= u && Math.sign(a) * u),
          h[1] === !1 && (h[1] = Math.abs(c) >= f && Math.sign(c) * f)),
      (t.intentional = h[0] !== !1 || h[1] !== !1),
      !t.intentional)
    )
      return;
    const m = [0, 0];
    if (o.hasCustomTransform) {
      const [y, D] = d;
      (m[0] = h[0] !== !1 ? y - h[0] : 0), (m[1] = h[1] !== !1 ? D - h[1] : 0);
    } else
      (m[0] = h[0] !== !1 ? a - h[0] : 0), (m[1] = h[1] !== !1 ? c - h[1] : 0);
    this.restrictToAxis && !t._blocked && this.restrictToAxis(m);
    const v = t.offset,
      g = (t._active && !t._blocked) || t.active;
    g &&
      ((t.first = t._active && !t.active),
      (t.last = !t._active && t.active),
      (t.active = r[this.ingKey] = t._active),
      e &&
        (t.first &&
          ("bounds" in o && (t._bounds = Ae(o.bounds, t)),
          this.setup && this.setup()),
        (t.movement = m),
        this.computeOffset()));
    const [p, V] = t.offset,
      [[A, T], [_, S]] = t._bounds;
    (t.overflow = [p < A ? -1 : p > T ? 1 : 0, V < _ ? -1 : V > S ? 1 : 0]),
      (t._movementBound[0] = t.overflow[0]
        ? t._movementBound[0] === !1
          ? t._movement[0]
          : t._movementBound[0]
        : !1),
      (t._movementBound[1] = t.overflow[1]
        ? t._movementBound[1] === !1
          ? t._movement[1]
          : t._movementBound[1]
        : !1);
    const P = t._active ? o.rubberband || [0, 0] : [0, 0];
    if (
      ((t.offset = Vn(t._bounds, t.offset, P)),
      (t.delta = E.sub(t.offset, v)),
      this.computeMovement(),
      g && (!t.last || i > Gn))
    ) {
      t.delta = E.sub(t.offset, v);
      const y = t.delta.map(Math.abs);
      E.addTo(t.distance, y),
        (t.direction = t.delta.map(Math.sign)),
        (t._direction = t._delta.map(Math.sign)),
        !t.first &&
          i > 0 &&
          ((t.velocity = [y[0] / i, y[1] / i]), (t.timeDelta = i));
    }
  }
  emit() {
    const e = this.state,
      t = this.shared,
      o = this.config;
    if (
      (e._active || this.clean(),
      (e._blocked || !e.intentional) && !e._force && !o.triggerAllEvents)
    )
      return;
    const r = this.handler(
      U(U(U({}, t), e), {}, { [this.aliasKey]: e.values })
    );
    r !== void 0 && (e.memo = r);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Kn([n, e], t) {
  const o = Math.abs(n),
    r = Math.abs(e);
  if (o > r && o > t) return "x";
  if (r > o && r > t) return "y";
}
class ye extends zt {
  constructor(...e) {
    super(...e), F(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), (this.state.axis = void 0);
  }
  init() {
    (this.state.offset = [0, 0]), (this.state.lastOffset = [0, 0]);
  }
  computeOffset() {
    this.state.offset = E.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = E.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const t = this.state,
      o = this.config;
    if (!t.axis && e) {
      const r =
        typeof o.axisThreshold == "object"
          ? o.axisThreshold[Dt(e)]
          : o.axisThreshold;
      t.axis = Kn(t._movement, r);
    }
    t._blocked =
      ((o.lockDirection || !!o.axis) && !t.axis) ||
      (!!o.axis && o.axis !== t.axis);
  }
  restrictToAxis(e) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          e[1] = 0;
          break;
        case "y":
          e[0] = 0;
          break;
      }
  }
}
const Xn = (n) => n,
  ht = 0.15,
  Lt = {
    enabled(n = !0) {
      return n;
    },
    eventOptions(n, e, t) {
      return U(U({}, t.shared.eventOptions), n);
    },
    preventDefault(n = !1) {
      return n;
    },
    triggerAllEvents(n = !1) {
      return n;
    },
    rubberband(n = 0) {
      switch (n) {
        case !0:
          return [ht, ht];
        case !1:
          return [0, 0];
        default:
          return E.toVector(n);
      }
    },
    from(n) {
      if (typeof n == "function") return n;
      if (n != null) return E.toVector(n);
    },
    transform(n, e, t) {
      const o = n || t.shared.transform;
      return (this.hasCustomTransform = !!o), o || Xn;
    },
    threshold(n) {
      return E.toVector(n, 0);
    },
  },
  Zn = 0,
  ce = U(
    U({}, Lt),
    {},
    {
      axis(n, e, { axis: t }) {
        if (((this.lockDirection = t === "lock"), !this.lockDirection))
          return t;
      },
      axisThreshold(n = Zn) {
        return n;
      },
      bounds(n = {}) {
        if (typeof n == "function") return (i) => ce.bounds(n(i));
        if ("current" in n) return () => n.current;
        if (typeof HTMLElement == "function" && n instanceof HTMLElement)
          return n;
        const {
          left: e = -1 / 0,
          right: t = 1 / 0,
          top: o = -1 / 0,
          bottom: r = 1 / 0,
        } = n;
        return [
          [e, t],
          [o, r],
        ];
      },
    }
  ),
  dt = {
    ArrowRight: (n, e = 1) => [n * e, 0],
    ArrowLeft: (n, e = 1) => [-1 * n * e, 0],
    ArrowUp: (n, e = 1) => [0, -1 * n * e],
    ArrowDown: (n, e = 1) => [0, n * e],
  };
class qn extends ye {
  constructor(...e) {
    super(...e), F(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const e = this.state;
    (e._pointerId = void 0),
      (e._pointerActive = !1),
      (e._keyboardActive = !1),
      (e._preventScroll = !1),
      (e._delayed = !1),
      (e.swipe = [0, 0]),
      (e.tap = !1),
      (e.canceled = !1),
      (e.cancel = this.cancel.bind(this));
  }
  setup() {
    const e = this.state;
    if (e._bounds instanceof HTMLElement) {
      const t = e._bounds.getBoundingClientRect(),
        o = e.currentTarget.getBoundingClientRect(),
        r = {
          left: t.left - o.left + e.offset[0],
          right: t.right - o.right + e.offset[0],
          top: t.top - o.top + e.offset[1],
          bottom: t.bottom - o.bottom + e.offset[1],
        };
      e._bounds = ce.bounds(r);
    }
  }
  cancel() {
    const e = this.state;
    e.canceled ||
      ((e.canceled = !0),
      (e._active = !1),
      setTimeout(() => {
        this.compute(), this.emit();
      }, 0));
  }
  setActive() {
    this.state._active =
      this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(),
      (this.state._pointerActive = !1),
      (this.state._keyboardActive = !1),
      super.clean();
  }
  pointerDown(e) {
    const t = this.config,
      o = this.state;
    if (
      e.buttons != null &&
      (Array.isArray(t.pointerButtons)
        ? !t.pointerButtons.includes(e.buttons)
        : t.pointerButtons !== -1 && t.pointerButtons !== e.buttons)
    )
      return;
    const r = this.ctrl.setEventIds(e);
    t.pointerCapture && e.target.setPointerCapture(e.pointerId),
      !(r && r.size > 1 && o._pointerActive) &&
        (this.start(e),
        this.setupPointer(e),
        (o._pointerId = Oe(e)),
        (o._pointerActive = !0),
        this.computeValues(pe(e)),
        this.computeInitial(),
        t.preventScrollAxis && Dt(e) !== "mouse"
          ? ((o._active = !1), this.setupScrollPrevention(e))
          : t.delay > 0
          ? (this.setupDelayTrigger(e),
            t.triggerAllEvents && (this.compute(e), this.emit()))
          : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const t = this.state;
    (t._active = !0),
      (t._preventScroll = !0),
      (t._delayed = !1),
      this.compute(e),
      this.emit();
  }
  pointerMove(e) {
    const t = this.state,
      o = this.config;
    if (!t._pointerActive) return;
    const r = Oe(e);
    if (t._pointerId !== void 0 && r !== t._pointerId) return;
    const i = pe(e);
    if (
      (document.pointerLockElement === e.target
        ? (t._delta = [e.movementX, e.movementY])
        : ((t._delta = E.sub(i, t._values)), this.computeValues(i)),
      E.addTo(t._movement, t._delta),
      this.compute(e),
      t._delayed && t.intentional)
    ) {
      this.timeoutStore.remove("dragDelay"),
        (t.active = !1),
        this.startPointerDrag(e);
      return;
    }
    if (o.preventScrollAxis && !t._preventScroll)
      if (t.axis)
        if (t.axis === o.preventScrollAxis || o.preventScrollAxis === "xy") {
          (t._active = !1), this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"),
            this.startPointerDrag(e);
          return;
        }
      else return;
    this.emit();
  }
  pointerUp(e) {
    this.ctrl.setEventIds(e);
    try {
      this.config.pointerCapture &&
        e.target.hasPointerCapture(e.pointerId) &&
        e.target.releasePointerCapture(e.pointerId);
    } catch {}
    const t = this.state,
      o = this.config;
    if (!t._active || !t._pointerActive) return;
    const r = Oe(e);
    if (t._pointerId !== void 0 && r !== t._pointerId) return;
    (this.state._pointerActive = !1), this.setActive(), this.compute(e);
    const [i, a] = t._distance;
    if (
      ((t.tap = i <= o.tapsThreshold && a <= o.tapsThreshold),
      t.tap && o.filterTaps)
    )
      t._force = !0;
    else {
      const [c, u] = t._delta,
        [f, h] = t._movement,
        [d, m] = o.swipe.velocity,
        [v, g] = o.swipe.distance,
        p = o.swipe.duration;
      if (t.elapsedTime < p) {
        const V = Math.abs(c / t.timeDelta),
          A = Math.abs(u / t.timeDelta);
        V > d && Math.abs(f) > v && (t.swipe[0] = Math.sign(c)),
          A > m && Math.abs(h) > g && (t.swipe[1] = Math.sign(u));
      }
    }
    this.emit();
  }
  pointerClick(e) {
    !this.state.tap &&
      e.detail > 0 &&
      (e.preventDefault(), e.stopPropagation());
  }
  setupPointer(e) {
    const t = this.config,
      o = t.device;
    t.pointerLock && e.currentTarget.requestPointerLock(),
      t.pointerCapture ||
        (this.eventStore.add(
          this.sharedConfig.window,
          o,
          "change",
          this.pointerMove.bind(this)
        ),
        this.eventStore.add(
          this.sharedConfig.window,
          o,
          "end",
          this.pointerUp.bind(this)
        ),
        this.eventStore.add(
          this.sharedConfig.window,
          o,
          "cancel",
          this.pointerUp.bind(this)
        ));
  }
  pointerClean() {
    this.config.pointerLock &&
      document.pointerLockElement === this.state.currentTarget &&
      document.exitPointerLock();
  }
  preventScroll(e) {
    this.state._preventScroll && e.cancelable && e.preventDefault();
  }
  setupScrollPrevention(e) {
    (this.state._preventScroll = !1), $n(e);
    const t = this.eventStore.add(
      this.sharedConfig.window,
      "touch",
      "change",
      this.preventScroll.bind(this),
      { passive: !1 }
    );
    this.eventStore.add(this.sharedConfig.window, "touch", "end", t),
      this.eventStore.add(this.sharedConfig.window, "touch", "cancel", t),
      this.timeoutStore.add(
        "startPointerDrag",
        this.startPointerDrag.bind(this),
        this.config.preventScrollDelay,
        e
      );
  }
  setupDelayTrigger(e) {
    (this.state._delayed = !0),
      this.timeoutStore.add(
        "dragDelay",
        () => {
          (this.state._step = [0, 0]), this.startPointerDrag(e);
        },
        this.config.delay
      );
  }
  keyDown(e) {
    const t = dt[e.key];
    if (t) {
      const o = this.state,
        r = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e),
        (o._delta = t(this.config.keyboardDisplacement, r)),
        (o._keyboardActive = !0),
        E.addTo(o._movement, o._delta),
        this.compute(e),
        this.emit();
    }
  }
  keyUp(e) {
    e.key in dt &&
      ((this.state._keyboardActive = !1),
      this.setActive(),
      this.compute(e),
      this.emit());
  }
  bind(e) {
    const t = this.config.device;
    e(t, "start", this.pointerDown.bind(this)),
      this.config.pointerCapture &&
        (e(t, "change", this.pointerMove.bind(this)),
        e(t, "end", this.pointerUp.bind(this)),
        e(t, "cancel", this.pointerUp.bind(this)),
        e("lostPointerCapture", "", this.pointerUp.bind(this))),
      this.config.keys &&
        (e("key", "down", this.keyDown.bind(this)),
        e("key", "up", this.keyUp.bind(this))),
      this.config.filterTaps &&
        e("click", "", this.pointerClick.bind(this), {
          capture: !0,
          passive: !1,
        });
  }
}
function $n(n) {
  "persist" in n && typeof n.persist == "function" && n.persist();
}
const be =
  typeof window < "u" && window.document && window.document.createElement;
function Bt() {
  return be && "ontouchstart" in window;
}
function Qn() {
  return Bt() || (be && window.navigator.maxTouchPoints > 1);
}
function Jn() {
  return be && "onpointerdown" in window;
}
function eo() {
  return be && "exitPointerLock" in window.document;
}
function to() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const G = {
    isBrowser: be,
    gesture: to(),
    touch: Bt(),
    touchscreen: Qn(),
    pointer: Jn(),
    pointerLock: eo(),
  },
  no = 250,
  oo = 180,
  ro = 0.5,
  so = 50,
  io = 250,
  ao = 10,
  mt = { mouse: 0, touch: 0, pen: 8 },
  lo = U(
    U({}, ce),
    {},
    {
      device(
        n,
        e,
        { pointer: { touch: t = !1, lock: o = !1, mouse: r = !1 } = {} }
      ) {
        return (
          (this.pointerLock = o && G.pointerLock),
          G.touch && t
            ? "touch"
            : this.pointerLock
            ? "mouse"
            : G.pointer && !r
            ? "pointer"
            : G.touch
            ? "touch"
            : "mouse"
        );
      },
      preventScrollAxis(n, e, { preventScroll: t }) {
        if (
          ((this.preventScrollDelay =
            typeof t == "number" ? t : t || (t === void 0 && n) ? no : void 0),
          !(!G.touchscreen || t === !1))
        )
          return n || (t !== void 0 ? "y" : void 0);
      },
      pointerCapture(
        n,
        e,
        { pointer: { capture: t = !0, buttons: o = 1, keys: r = !0 } = {} }
      ) {
        return (
          (this.pointerButtons = o),
          (this.keys = r),
          !this.pointerLock && this.device === "pointer" && t
        );
      },
      threshold(
        n,
        e,
        { filterTaps: t = !1, tapsThreshold: o = 3, axis: r = void 0 }
      ) {
        const i = E.toVector(n, t ? o : r ? 1 : 0);
        return (this.filterTaps = t), (this.tapsThreshold = o), i;
      },
      swipe({ velocity: n = ro, distance: e = so, duration: t = io } = {}) {
        return {
          velocity: this.transform(E.toVector(n)),
          distance: this.transform(E.toVector(e)),
          duration: t,
        };
      },
      delay(n = 0) {
        switch (n) {
          case !0:
            return oo;
          case !1:
            return 0;
          default:
            return n;
        }
      },
      axisThreshold(n) {
        return n ? U(U({}, mt), n) : mt;
      },
      keyboardDisplacement(n = ao) {
        return n;
      },
    }
  );
function Ot(n) {
  const [e, t] = n.overflow,
    [o, r] = n._delta,
    [i, a] = n._direction;
  ((e < 0 && o > 0 && i < 0) || (e > 0 && o < 0 && i > 0)) &&
    (n._movement[0] = n._movementBound[0]),
    ((t < 0 && r > 0 && a < 0) || (t > 0 && r < 0 && a > 0)) &&
      (n._movement[1] = n._movementBound[1]);
}
const co = 30,
  uo = 100;
class fo extends zt {
  constructor(...e) {
    super(...e), F(this, "ingKey", "pinching"), F(this, "aliasKey", "da");
  }
  init() {
    (this.state.offset = [1, 0]),
      (this.state.lastOffset = [1, 0]),
      (this.state._pointerEvents = new Map());
  }
  reset() {
    super.reset();
    const e = this.state;
    (e._touchIds = []),
      (e.canceled = !1),
      (e.cancel = this.cancel.bind(this)),
      (e.turns = 0);
  }
  computeOffset() {
    const { type: e, movement: t, lastOffset: o } = this.state;
    e === "wheel"
      ? (this.state.offset = E.add(t, o))
      : (this.state.offset = [(1 + t[0]) * o[0], t[1] + o[1]]);
  }
  computeMovement() {
    const { offset: e, lastOffset: t } = this.state;
    this.state.movement = [e[0] / t[0], e[1] - t[1]];
  }
  axisIntent() {
    const e = this.state,
      [t, o] = e._movement;
    if (!e.axis) {
      const r = Math.abs(t) * co - Math.abs(o);
      r < 0 ? (e.axis = "angle") : r > 0 && (e.axis = "scale");
    }
  }
  restrictToAxis(e) {
    this.config.lockDirection &&
      (this.state.axis === "scale"
        ? (e[1] = 0)
        : this.state.axis === "angle" && (e[0] = 0));
  }
  cancel() {
    const e = this.state;
    e.canceled ||
      setTimeout(() => {
        (e.canceled = !0), (e._active = !1), this.compute(), this.emit();
      }, 0);
  }
  touchStart(e) {
    this.ctrl.setEventIds(e);
    const t = this.state,
      o = this.ctrl.touchIds;
    if ((t._active && t._touchIds.every((i) => o.has(i))) || o.size < 2) return;
    this.start(e), (t._touchIds = Array.from(o).slice(0, 2));
    const r = lt(e, t._touchIds);
    r && this.pinchStart(e, r);
  }
  pointerStart(e) {
    if (e.buttons != null && e.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(e), e.target.setPointerCapture(e.pointerId);
    const t = this.state,
      o = t._pointerEvents,
      r = this.ctrl.pointerIds;
    if (
      (t._active && Array.from(o.keys()).every((a) => r.has(a))) ||
      (o.size < 2 && o.set(e.pointerId, e), t._pointerEvents.size < 2)
    )
      return;
    this.start(e);
    const i = Ye(...Array.from(o.values()));
    i && this.pinchStart(e, i);
  }
  pinchStart(e, t) {
    const o = this.state;
    (o.origin = t.origin),
      this.computeValues([t.distance, t.angle]),
      this.computeInitial(),
      this.compute(e),
      this.emit();
  }
  touchMove(e) {
    if (!this.state._active) return;
    const t = lt(e, this.state._touchIds);
    t && this.pinchMove(e, t);
  }
  pointerMove(e) {
    const t = this.state._pointerEvents;
    if ((t.has(e.pointerId) && t.set(e.pointerId, e), !this.state._active))
      return;
    const o = Ye(...Array.from(t.values()));
    o && this.pinchMove(e, o);
  }
  pinchMove(e, t) {
    const o = this.state,
      r = o._values[1],
      i = t.angle - r;
    let a = 0;
    Math.abs(i) > 270 && (a += Math.sign(i)),
      this.computeValues([t.distance, t.angle - 360 * a]),
      (o.origin = t.origin),
      (o.turns = a),
      (o._movement = [
        o._values[0] / o._initial[0] - 1,
        o._values[1] - o._initial[1],
      ]),
      this.compute(e),
      this.emit();
  }
  touchEnd(e) {
    this.ctrl.setEventIds(e),
      this.state._active &&
        this.state._touchIds.some((t) => !this.ctrl.touchIds.has(t)) &&
        ((this.state._active = !1), this.compute(e), this.emit());
  }
  pointerEnd(e) {
    const t = this.state;
    this.ctrl.setEventIds(e);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {}
    t._pointerEvents.has(e.pointerId) && t._pointerEvents.delete(e.pointerId),
      t._active &&
        t._pointerEvents.size < 2 &&
        ((t._active = !1), this.compute(e), this.emit());
  }
  gestureStart(e) {
    e.cancelable && e.preventDefault();
    const t = this.state;
    t._active ||
      (this.start(e),
      this.computeValues([e.scale, e.rotation]),
      (t.origin = [e.clientX, e.clientY]),
      this.compute(e),
      this.emit());
  }
  gestureMove(e) {
    if ((e.cancelable && e.preventDefault(), !this.state._active)) return;
    const t = this.state;
    this.computeValues([e.scale, e.rotation]),
      (t.origin = [e.clientX, e.clientY]);
    const o = t._movement;
    (t._movement = [e.scale - 1, e.rotation]),
      (t._delta = E.sub(t._movement, o)),
      this.compute(e),
      this.emit();
  }
  gestureEnd(e) {
    this.state._active &&
      ((this.state._active = !1), this.compute(e), this.emit());
  }
  wheel(e) {
    const t = this.config.modifierKey;
    (t && (Array.isArray(t) ? !t.find((o) => e[o]) : !e[t])) ||
      (this.state._active ? this.wheelChange(e) : this.wheelStart(e),
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(e) {
    this.start(e), this.wheelChange(e);
  }
  wheelChange(e) {
    "uv" in e || (e.cancelable && e.preventDefault());
    const o = this.state;
    (o._delta = [(-Ft(e)[1] / uo) * o.offset[0], 0]),
      E.addTo(o._movement, o._delta),
      Ot(o),
      (this.state.origin = [e.clientX, e.clientY]),
      this.compute(e),
      this.emit();
  }
  wheelEnd() {
    this.state._active &&
      ((this.state._active = !1), this.compute(), this.emit());
  }
  bind(e) {
    const t = this.config.device;
    t &&
      (e(t, "start", this[t + "Start"].bind(this)),
      e(t, "change", this[t + "Move"].bind(this)),
      e(t, "end", this[t + "End"].bind(this)),
      e(t, "cancel", this[t + "End"].bind(this)),
      e("lostPointerCapture", "", this[t + "End"].bind(this))),
      this.config.pinchOnWheel &&
        e("wheel", "", this.wheel.bind(this), { passive: !1 });
  }
}
const ho = U(
  U({}, Lt),
  {},
  {
    device(n, e, { shared: t, pointer: { touch: o = !1 } = {} }) {
      if (t.target && !G.touch && G.gesture) return "gesture";
      if (G.touch && o) return "touch";
      if (G.touchscreen) {
        if (G.pointer) return "pointer";
        if (G.touch) return "touch";
      }
    },
    bounds(n, e, { scaleBounds: t = {}, angleBounds: o = {} }) {
      const r = (a) => {
          const c = ft(Ae(t, a), { min: -1 / 0, max: 1 / 0 });
          return [c.min, c.max];
        },
        i = (a) => {
          const c = ft(Ae(o, a), { min: -1 / 0, max: 1 / 0 });
          return [c.min, c.max];
        };
      return typeof t != "function" && typeof o != "function"
        ? [r(), i()]
        : (a) => [r(a), i(a)];
    },
    threshold(n, e, t) {
      return (
        (this.lockDirection = t.axis === "lock"),
        E.toVector(n, this.lockDirection ? [0.1, 3] : 0)
      );
    },
    modifierKey(n) {
      return n === void 0 ? "ctrlKey" : n;
    },
    pinchOnWheel(n = !0) {
      return n;
    },
  }
);
class mo extends ye {
  constructor(...e) {
    super(...e), F(this, "ingKey", "moving");
  }
  move(e) {
    (this.config.mouseOnly && e.pointerType !== "mouse") ||
      (this.state._active ? this.moveChange(e) : this.moveStart(e),
      this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(e) {
    this.start(e),
      this.computeValues(pe(e)),
      this.compute(e),
      this.computeInitial(),
      this.emit();
  }
  moveChange(e) {
    if (!this.state._active) return;
    const t = pe(e),
      o = this.state;
    (o._delta = E.sub(t, o._values)),
      E.addTo(o._movement, o._delta),
      this.computeValues(t),
      this.compute(e),
      this.emit();
  }
  moveEnd(e) {
    this.state._active &&
      ((this.state._active = !1), this.compute(e), this.emit());
  }
  bind(e) {
    e("pointer", "change", this.move.bind(this)),
      e("pointer", "leave", this.moveEnd.bind(this));
  }
}
const po = U(U({}, ce), {}, { mouseOnly: (n = !0) => n });
class go extends ye {
  constructor(...e) {
    super(...e), F(this, "ingKey", "scrolling");
  }
  scroll(e) {
    this.state._active || this.start(e),
      this.scrollChange(e),
      this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(e) {
    e.cancelable && e.preventDefault();
    const t = this.state,
      o = On(e);
    (t._delta = E.sub(o, t._values)),
      E.addTo(t._movement, t._delta),
      this.computeValues(o),
      this.compute(e),
      this.emit();
  }
  scrollEnd() {
    this.state._active &&
      ((this.state._active = !1), this.compute(), this.emit());
  }
  bind(e) {
    e("scroll", "", this.scroll.bind(this));
  }
}
const vo = ce;
class xo extends ye {
  constructor(...e) {
    super(...e), F(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e),
      this.wheelChange(e),
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const t = this.state;
    (t._delta = Ft(e)),
      E.addTo(t._movement, t._delta),
      Ot(t),
      this.compute(e),
      this.emit();
  }
  wheelEnd() {
    this.state._active &&
      ((this.state._active = !1), this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const wo = ce;
class yo extends ye {
  constructor(...e) {
    super(...e), F(this, "ingKey", "hovering");
  }
  enter(e) {
    (this.config.mouseOnly && e.pointerType !== "mouse") ||
      (this.start(e), this.computeValues(pe(e)), this.compute(e), this.emit());
  }
  leave(e) {
    if (this.config.mouseOnly && e.pointerType !== "mouse") return;
    const t = this.state;
    if (!t._active) return;
    t._active = !1;
    const o = pe(e);
    (t._movement = t._delta = E.sub(o, t._values)),
      this.computeValues(o),
      this.compute(e),
      (t.delta = t.movement),
      this.emit();
  }
  bind(e) {
    e("pointer", "enter", this.enter.bind(this)),
      e("pointer", "leave", this.leave.bind(this));
  }
}
const bo = U(U({}, ce), {}, { mouseOnly: (n = !0) => n }),
  qe = new Map(),
  Ge = new Map();
function _o(n) {
  qe.set(n.key, n.engine), Ge.set(n.key, n.resolver);
}
const Co = { key: "drag", engine: qn, resolver: lo },
  So = { key: "hover", engine: yo, resolver: bo },
  Po = { key: "move", engine: mo, resolver: po },
  Mo = { key: "pinch", engine: fo, resolver: ho },
  To = { key: "scroll", engine: go, resolver: vo },
  Ro = { key: "wheel", engine: xo, resolver: wo };
function ko(n, e) {
  if (n == null) return {};
  var t = {},
    o = Object.keys(n),
    r,
    i;
  for (i = 0; i < o.length; i++)
    (r = o[i]), !(e.indexOf(r) >= 0) && (t[r] = n[r]);
  return t;
}
function Vo(n, e) {
  if (n == null) return {};
  var t = ko(n, e),
    o,
    r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    for (r = 0; r < i.length; r++)
      (o = i[r]),
        !(e.indexOf(o) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(n, o) &&
          (t[o] = n[o]);
  }
  return t;
}
const Eo = {
    target(n) {
      if (n) return () => ("current" in n ? n.current : n);
    },
    enabled(n = !0) {
      return n;
    },
    window(n = G.isBrowser ? window : void 0) {
      return n;
    },
    eventOptions({ passive: n = !0, capture: e = !1 } = {}) {
      return { passive: n, capture: e };
    },
    transform(n) {
      return n;
    },
  },
  jo = ["target", "eventOptions", "window", "enabled", "transform"];
function Ve(n = {}, e) {
  const t = {};
  for (const [o, r] of Object.entries(e))
    switch (typeof r) {
      case "function":
        t[o] = r.call(t, n[o], o, n);
        break;
      case "object":
        t[o] = Ve(n[o], r);
        break;
      case "boolean":
        r && (t[o] = n[o]);
        break;
    }
  return t;
}
function Uo(n, e, t = {}) {
  const o = n,
    { target: r, eventOptions: i, window: a, enabled: c, transform: u } = o,
    f = Vo(o, jo);
  if (
    ((t.shared = Ve(
      { target: r, eventOptions: i, window: a, enabled: c, transform: u },
      Eo
    )),
    e)
  ) {
    const h = Ge.get(e);
    t[e] = Ve(U({ shared: t.shared }, f), h);
  } else
    for (const h in f) {
      const d = Ge.get(h);
      d && (t[h] = Ve(U({ shared: t.shared }, f[h]), d));
    }
  return t;
}
class Wt {
  constructor(e, t) {
    F(this, "_listeners", new Set()), (this._ctrl = e), (this._gestureKey = t);
  }
  add(e, t, o, r, i) {
    const a = this._listeners,
      c = Fn(t, o),
      u = this._gestureKey
        ? this._ctrl.config[this._gestureKey].eventOptions
        : {},
      f = U(U({}, u), i);
    e.addEventListener(c, r, f);
    const h = () => {
      e.removeEventListener(c, r, f), a.delete(h);
    };
    return a.add(h), h;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class Ao {
  constructor() {
    F(this, "_timeouts", new Map());
  }
  add(e, t, o = 140, ...r) {
    this.remove(e), this._timeouts.set(e, window.setTimeout(t, o, ...r));
  }
  remove(e) {
    const t = this._timeouts.get(e);
    t && window.clearTimeout(t);
  }
  clean() {
    this._timeouts.forEach((e) => void window.clearTimeout(e)),
      this._timeouts.clear();
  }
}
class Ho {
  constructor(e) {
    F(this, "gestures", new Set()),
      F(this, "_targetEventStore", new Wt(this)),
      F(this, "gestureEventStores", {}),
      F(this, "gestureTimeoutStores", {}),
      F(this, "handlers", {}),
      F(this, "config", {}),
      F(this, "pointerIds", new Set()),
      F(this, "touchIds", new Set()),
      F(this, "state", {
        shared: { shiftKey: !1, metaKey: !1, ctrlKey: !1, altKey: !1 },
      }),
      Do(this, e);
  }
  setEventIds(e) {
    if (Ie(e)) return (this.touchIds = new Set(Bn(e))), this.touchIds;
    if ("pointerId" in e)
      return (
        e.type === "pointerup" || e.type === "pointercancel"
          ? this.pointerIds.delete(e.pointerId)
          : e.type === "pointerdown" && this.pointerIds.add(e.pointerId),
        this.pointerIds
      );
  }
  applyHandlers(e, t) {
    (this.handlers = e), (this.nativeHandlers = t);
  }
  applyConfig(e, t) {
    this.config = Uo(e, t, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const e of this.gestures)
      this.gestureEventStores[e].clean(), this.gestureTimeoutStores[e].clean();
  }
  effect() {
    return (
      this.config.shared.target && this.bind(),
      () => this._targetEventStore.clean()
    );
  }
  bind(...e) {
    const t = this.config.shared,
      o = {};
    let r;
    if (!(t.target && ((r = t.target()), !r))) {
      if (t.enabled) {
        for (const a of this.gestures) {
          const c = this.config[a],
            u = pt(o, c.eventOptions, !!r);
          if (c.enabled) {
            const f = qe.get(a);
            new f(this, e, a).bind(u);
          }
        }
        const i = pt(o, t.eventOptions, !!r);
        for (const a in this.nativeHandlers)
          i(
            a,
            "",
            (c) =>
              this.nativeHandlers[a](
                U(U({}, this.state.shared), {}, { event: c, args: e })
              ),
            void 0,
            !0
          );
      }
      for (const i in o) o[i] = Yn(...o[i]);
      if (!r) return o;
      for (const i in o) {
        const { device: a, capture: c, passive: u } = In(i);
        this._targetEventStore.add(r, a, "", o[i], { capture: c, passive: u });
      }
    }
  }
}
function he(n, e) {
  n.gestures.add(e),
    (n.gestureEventStores[e] = new Wt(n, e)),
    (n.gestureTimeoutStores[e] = new Ao());
}
function Do(n, e) {
  e.drag && he(n, "drag"),
    e.wheel && he(n, "wheel"),
    e.scroll && he(n, "scroll"),
    e.move && he(n, "move"),
    e.pinch && he(n, "pinch"),
    e.hover && he(n, "hover");
}
const pt =
    (n, e, t) =>
    (o, r, i, a = {}, c = !1) => {
      var u, f;
      const h = (u = a.capture) !== null && u !== void 0 ? u : e.capture,
        d = (f = a.passive) !== null && f !== void 0 ? f : e.passive;
      let m = c ? o : Hn(o, r, h);
      t && d && (m += "Passive"), (n[m] = n[m] || []), n[m].push(i);
    },
  Io = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function Fo(n) {
  const e = {},
    t = {},
    o = new Set();
  for (let r in n)
    Io.test(r) ? (o.add(RegExp.lastMatch), (t[r] = n[r])) : (e[r] = n[r]);
  return [t, e, o];
}
function de(n, e, t, o, r, i) {
  if (!n.has(t) || !qe.has(o)) return;
  const a = t + "Start",
    c = t + "End",
    u = (f) => {
      let h;
      return (
        f.first && a in e && e[a](f),
        t in e && (h = e[t](f)),
        f.last && c in e && e[c](f),
        h
      );
    };
  (r[o] = u), (i[o] = i[o] || {});
}
function zo(n, e) {
  const [t, o, r] = Fo(n),
    i = {};
  return (
    de(r, t, "onDrag", "drag", i, e),
    de(r, t, "onWheel", "wheel", i, e),
    de(r, t, "onScroll", "scroll", i, e),
    de(r, t, "onPinch", "pinch", i, e),
    de(r, t, "onMove", "move", i, e),
    de(r, t, "onHover", "hover", i, e),
    { handlers: i, config: e, nativeHandlers: o }
  );
}
function Lo(n, e = {}, t, o) {
  const r = Le.useMemo(() => new Ho(n), []);
  if (
    (r.applyHandlers(n, o),
    r.applyConfig(e, t),
    Le.useEffect(r.effect.bind(r)),
    Le.useEffect(() => r.clean.bind(r), []),
    e.target === void 0)
  )
    return r.bind.bind(r);
}
function Bo(n) {
  return (
    n.forEach(_o),
    function (t, o) {
      const { handlers: r, nativeHandlers: i, config: a } = zo(t, o || {});
      return Lo(r, a, void 0, i);
    }
  );
}
function vs(n, e) {
  return Bo([Co, Mo, To, Ro, Po, So])(n, e || {});
}
new ve();
new ve();
var Oo = function (e) {
  return 1 / (1 + e + 0.48 * e * e + 0.235 * e * e * e);
};
function ie(n, e, t) {
  var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0.25,
    r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0.01,
    i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1 / 0,
    a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : Oo,
    c = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 0.001,
    u = "velocity_" + e;
  if (
    (n.__damp === void 0 && (n.__damp = {}),
    n.__damp[u] === void 0 && (n.__damp[u] = 0),
    Math.abs(n[e] - t) <= c)
  )
    return (n[e] = t), !1;
  o = Math.max(1e-4, o);
  var f = 2 / o,
    h = a(f * r),
    d = n[e] - t,
    m = t,
    v = i * o;
  (d = Math.min(Math.max(d, -v), v)), (t = n[e] - d);
  var g = (n.__damp[u] + f * d) * r;
  n.__damp[u] = (n.__damp[u] - f * g) * h;
  var p = t + (d + g) * h;
  return (
    m - n[e] > 0 == p > m && ((p = m), (n.__damp[u] = (p - m) / r)),
    (n[e] = p),
    !0
  );
}
var me = new C(),
  gt,
  vt,
  xt;
function wt(n, e, t, o, r, i, a) {
  return (
    typeof e == "number"
      ? me.setScalar(e)
      : Array.isArray(e)
      ? me.set(e[0], e[1], e[2])
      : me.copy(e),
    (gt = ie(n, "x", me.x, t, o, r, i, a)),
    (vt = ie(n, "y", me.y, t, o, r, i, a)),
    (xt = ie(n, "z", me.z, t, o, r, i, a)),
    gt || vt || xt
  );
}
var X = new ae(),
  J = new Ke(),
  yt = new Ke(),
  ge = new Ke(),
  bt,
  _t,
  Ct,
  St;
function Pt(n, e, t, o, r, i, a) {
  var c = n;
  Array.isArray(e) ? X.set(e[0], e[1], e[2], e[3]) : X.copy(e);
  var u = n.dot(X) > 0 ? 1 : -1;
  return (
    (X.x *= u),
    (X.y *= u),
    (X.z *= u),
    (X.w *= u),
    (bt = ie(n, "x", X.x, t, o, r, i, a)),
    (_t = ie(n, "y", X.y, t, o, r, i, a)),
    (Ct = ie(n, "z", X.z, t, o, r, i, a)),
    (St = ie(n, "w", X.w, t, o, r, i, a)),
    J.set(n.x, n.y, n.z, n.w).normalize(),
    yt.set(
      c.__damp.velocity_x,
      c.__damp.velocity_y,
      c.__damp.velocity_z,
      c.__damp.velocity_w
    ),
    ge.copy(J).multiplyScalar(yt.dot(J) / J.dot(J)),
    (c.__damp.velocity_x -= ge.x),
    (c.__damp.velocity_y -= ge.y),
    (c.__damp.velocity_z -= ge.z),
    (c.__damp.velocity_w -= ge.w),
    n.set(J.x, J.y, J.z, J.w),
    bt || _t || Ct || St
  );
}
const Wo = l.forwardRef(
  (
    {
      children: n,
      enabled: e = !0,
      speed: t = 1,
      rotationIntensity: o = 1,
      floatIntensity: r = 1,
      floatingRange: i = [-0.1, 0.1],
      autoInvalidate: a = !1,
      ...c
    },
    u
  ) => {
    const f = l.useRef(null);
    l.useImperativeHandle(u, () => f.current, []);
    const h = l.useRef(Math.random() * 1e4);
    return (
      $((d) => {
        var m, v;
        if (!e || t === 0) return;
        a && d.invalidate();
        const g = h.current + d.clock.elapsedTime;
        (f.current.rotation.x = (Math.cos((g / 4) * t) / 8) * o),
          (f.current.rotation.y = (Math.sin((g / 4) * t) / 8) * o),
          (f.current.rotation.z = (Math.sin((g / 4) * t) / 20) * o);
        let p = Math.sin((g / 4) * t) / 10;
        (p = fn.mapLinear(
          p,
          -0.1,
          0.1,
          (m = i == null ? void 0 : i[0]) !== null && m !== void 0 ? m : -0.1,
          (v = i == null ? void 0 : i[1]) !== null && v !== void 0 ? v : 0.1
        )),
          (f.current.position.y = p * r),
          f.current.updateMatrix();
      }),
      l.createElement(
        "group",
        c,
        l.createElement("group", { ref: f, matrixAutoUpdate: !1 }, n)
      )
    );
  }
);
function No() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      d: "M11 9L8 12M8 12L5 9M8 12V4",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
}
function Yo() {
  return s.jsxs("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      s.jsx("path", {
        d: "M2.6665 8.66659L2.6665 7.33325",
        stroke: "currentColor",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
      }),
      s.jsx("path", {
        d: "M5.33301 10L5.33301 6",
        stroke: "currentColor",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
      }),
      s.jsx("path", {
        d: "M8 11.3333L8 4.66663",
        stroke: "currentColor",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
      }),
      s.jsx("path", {
        d: "M10.6665 10L10.6665 6",
        stroke: "currentColor",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
      }),
      s.jsx("path", {
        d: "M13.333 8.66659L13.333 7.33325",
        stroke: "currentColor",
        strokeWidth: "1.33333",
        strokeLinecap: "round",
      }),
    ],
  });
}
function Go() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      d: "M11.5258 1.63826L9.32005 1.0264C8.97275 0.930064 8.60049 1.02806 8.34564 1.28291L5.7922 3.83635C5.51847 4.11009 5.42731 4.51722 5.55819 4.88154L6.4651 7.40609L1.42957 12.4416C0.843788 13.0274 0.843788 13.9772 1.42957 14.5629C2.01536 15.1487 2.96511 15.1487 3.55089 14.5629L8.58642 9.52741L11.111 10.4343C11.4753 10.5652 11.8824 10.474 12.1562 10.2003L14.7096 7.64687C14.9644 7.39202 15.0624 7.01976 14.9661 6.67247L14.3543 4.46668L11.7078 7.11318H10.8793C9.77477 7.11318 8.87933 6.21775 8.87933 5.11318V4.28475L11.5258 1.63826Z",
      fill: "currentColor",
    }),
  });
}
function Ko() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      d: "M7.99984 2.66663C5.05904 2.66663 2.6665 5.05916 2.6665 7.99996C2.6665 10.9408 5.05904 13.3333 7.99984 13.3333C10.9406 13.3333 13.3332 10.9408 13.3332 7.99996C13.3332 5.05916 10.9406 2.66663 7.99984 2.66663ZM7.99984 3.68695C9.96108 3.68695 11.6196 5.00322 12.1412 6.79842C10.6781 6.42165 9.31753 6.23759 7.99984 6.23759C6.68215 6.23759 5.32167 6.42153 3.85833 6.7983C4.38004 5.00322 6.03859 3.68695 7.99984 3.68695ZM7.99984 9.34491C7.41068 9.34491 6.93317 8.8674 6.93317 8.27824C6.93317 7.68909 7.41068 7.21157 7.99984 7.21157C8.58899 7.21157 9.0665 7.68909 9.0665 8.27824C9.0665 8.8674 8.58899 9.34491 7.99984 9.34491ZM3.76873 8.83563C5.51996 8.85471 6.88683 10.273 6.88683 12.081C6.88683 12.108 6.88624 12.1363 6.88529 12.1661C5.30959 11.7442 4.08719 10.4506 3.76873 8.83563ZM9.11439 12.1661C9.11332 12.1364 9.11284 12.1079 9.11284 12.081C9.11284 10.273 10.4795 8.85471 12.2308 8.83563C11.9126 10.4506 10.69 11.7442 9.11439 12.1661Z",
      fill: "currentColor",
    }),
  });
}
function Xo() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      d: "M6 4.93426C6 4.53491 6.44507 4.29672 6.77735 4.51823L11.376 7.58398C11.6728 7.78189 11.6728 8.21811 11.376 8.41603L6.77735 11.4818C6.44507 11.7033 6 11.4651 6 11.0657V4.93426Z",
      fill: "currentColor",
    }),
  });
}
function Zo() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      d: "M12 6L8.35355 9.64645C8.15829 9.84171 7.84171 9.84171 7.64645 9.64645L4 6",
      stroke: "currentColor",
      strokeWidth: "1.5",
    }),
  });
}
function qo() {
  return s.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    children: s.jsx("path", {
      d: "M6.58586 5.17153L10.8285 5.17153M10.8285 5.17153L10.8285 9.41417M10.8285 5.17153L5.17165 10.8284",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
}
function $o() {
  return s.jsxs("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      s.jsx("path", {
        d: "M12 4L4.00005 12",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
      }),
      s.jsx("path", {
        d: "M12 12L4.00005 4.00005",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
      }),
    ],
  });
}
function Qo() {
  return s.jsxs("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      s.jsx("path", {
        d: "M5 4.5C5 4.22386 5.22386 4 5.5 4H6.5C6.77614 4 7 4.22386 7 4.5V11.5C7 11.7761 6.77614 12 6.5 12H5.5C5.22386 12 5 11.7761 5 11.5V4.5Z",
        fill: "currentColor",
      }),
      s.jsx("path", {
        d: "M9 4.5C9 4.22386 9.22386 4 9.5 4H10.5C10.7761 4 11 4.22386 11 4.5V11.5C11 11.7761 10.7761 12 10.5 12H9.5C9.22386 12 9 11.7761 9 11.5V4.5Z",
        fill: "currentColor",
      }),
    ],
  });
}
function Jo() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M4 4.5C4 4.22386 3.77614 4 3.5 4H2.5C2.22386 4 2 4.22386 2 4.5V11.5C2 11.7761 2.22386 12 2.5 12H3.5C3.77614 12 4 11.7761 4 11.5V8.66667L8.22265 11.4818C8.55493 11.7033 9 11.4651 9 11.0657V8.66667L13.2227 11.4818C13.5549 11.7033 14 11.4651 14 11.0657V4.93426C14 4.53491 13.5549 4.29672 13.2227 4.51823L9 7.33333V4.93426C9 4.53491 8.55493 4.29672 8.22265 4.51823L4 7.33333V4.5Z",
      fill: "currentColor",
    }),
  });
}
function er() {
  return s.jsx("svg", {
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: s.jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12 4.5C12 4.22386 12.2239 4 12.5 4H13.5C13.7761 4 14 4.22386 14 4.5V11.5C14 11.7761 13.7761 12 13.5 12H12.5C12.2239 12 12 11.7761 12 11.5V8.66667L7.77735 11.4818C7.44507 11.7033 7 11.4651 7 11.0657V8.66667L2.77735 11.4818C2.44507 11.7033 2 11.4651 2 11.0657V4.93426C2 4.53491 2.44507 4.29672 2.77735 4.51823L7 7.33333V4.93426C7 4.53491 7.44507 4.29672 7.77735 4.51823L12 7.33333V4.5Z",
      fill: "currentColor",
    }),
  });
}
function tr() {
  return s.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    viewBox: "0 0 16 16",
    fill: "none",
    children: s.jsx("path", {
      d: "M6 11L3 8M3 8L6 5M3 8L7 8L13 8L13 10",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
}
var nr = ((n) => (
  (n.ArrowDown = "arrow-down"),
  (n.ArrowUpRight = "arrow-up-right"),
  (n.Radio = "radio"),
  (n.Wrench = "wrench"),
  (n.Wheel = "wheel"),
  (n.Play = "play"),
  (n.ChevronDown = "chevron-down"),
  (n.Close = "close"),
  (n.Pause = "pause"),
  (n.Prev = "prev"),
  (n.Next = "next"),
  (n.Back = "back"),
  n
))(nr || {});
function Mt({ name: n, className: e, size: t = "small" }) {
  const o = (() => {
      switch (n) {
        case "arrow-down":
          return s.jsx(No, {});
        case "arrow-up-right":
          return s.jsx(qo, {});
        case "radio":
          return s.jsx(Yo, {});
        case "wrench":
          return s.jsx(Go, {});
        case "wheel":
          return s.jsx(Ko, {});
        case "play":
          return s.jsx(Xo, {});
        case "chevron-down":
          return s.jsx(Zo, {});
        case "close":
          return s.jsx($o, {});
        case "pause":
          return s.jsx(Qo, {});
        case "prev":
          return s.jsx(Jo, {});
        case "next":
          return s.jsx(er, {});
        case "back":
          return s.jsx(tr, {});
        default:
          return null;
      }
    })(),
    r = t === "large" ? "size-24" : "size-16";
  return s.jsx("div", {
    className: hn(`flex justify-center items-center ${r}`, e),
    "aria-hidden": "true",
    children: o,
  });
}
const xs = l.forwardRef(function (
    {
      as: e = "button",
      children: t,
      iconName: o,
      iconClasses: r,
      iconSize: i,
      iconTransition: a = "pushUpOut",
      isMenu: c = !1,
      clickHandler: u,
      focusHandler: f,
      keyDownHandler: h,
      pointerOverHandler: d,
      ariaLabel: m,
      disabled: v = !1,
      className: g,
      href: p,
      type: V,
      externalLink: A = !1,
      preventScrollReset: T = !1,
      dataComponentName: _,
      tabIndex: S,
      ...P
    },
    y
  ) {
    const D = l.useRef(null),
      W = (b) => {
        v || (D.current && D.current.classList.add("clicked"), u && u(b));
      },
      N = () => {
        v || (d && d());
      },
      K = () => {
        v || (D.current && D.current.classList.remove("clicked"));
      },
      H = (b) => {
        (D.current = b), typeof y == "function" ? y(b) : y && (y.current = b);
      },
      z = Pe(
        "btn",
        o && "has-icon",
        o && `icon-transition-${a}`,
        v && "disabled",
        g
      ),
      w = Pe("sidenav-button-intro-animation-bg absolute inset-0"),
      Z = s.jsxs(s.Fragment, {
        children: [
          typeof t == "string" &&
            s.jsx("span", { className: "sr-only", children: t }),
          s.jsx("span", {
            "aria-hidden": "true",
            className: "chars",
            children:
              typeof t == "string"
                ? t
                    .split("")
                    .map((b, R) =>
                      s.jsx(
                        "span",
                        {
                          className: "char",
                          style: { "--char-index": R },
                          children: b === " " ? " " : b,
                        },
                        R
                      )
                    )
                : t,
          }),
          o &&
            s.jsxs("div", {
              className: "icon-container",
              "aria-hidden": "true",
              children: [
                s.jsx(Mt, { name: o, size: i, className: Pe(r, "icon") }),
                s.jsx(Mt, { name: o, size: i, className: Pe(r, "icon-clone") }),
              ],
            }),
        ],
      });
    return e === "link" && p
      ? s.jsxs(ln, {
          to: p,
          className: z,
          "aria-label": m,
          target: A ? "_blank" : void 0,
          ref: H,
          onClick: W,
          onMouseEnter: N,
          onMouseLeave: K,
          onFocus: f,
          onKeyDown: h,
          preventScrollReset: T,
          ...(_ && { "data-component-name": _ }),
          tabIndex: S,
          ...P,
          children: [c && s.jsx("span", { className: w }), Z],
        })
      : s.jsxs("button", {
          className: z,
          onClick: W,
          onMouseEnter: N,
          onMouseLeave: K,
          onFocus: f,
          onKeyDown: h,
          "aria-label": m,
          disabled: v,
          type: V,
          ref: H,
          ...(_ && { "data-component-name": _ }),
          tabIndex: S,
          ...P,
          children: [c && s.jsx("span", { className: w }), Z],
        });
  }),
  $e = we(
    He((n) => ({
      isHeroInView: !1,
      setIsHeroInView: (e) => n({ isHeroInView: e }),
      hasInitialized: !1,
      setHasInitialized: (e) => n({ hasInitialized: e }),
      scrollProgress: 0,
      setScrollProgress: (e) => n({ scrollProgress: e }),
      hasScrolled: null,
      setHasScrolled: (e) => n({ hasScrolled: e }),
      hasCompletedScroll: !1,
      setHasCompletedScroll: (e) => n({ hasCompletedScroll: e }),
    }))
  ),
  Tt = {
    cameraPosition: { x: 0, y: 1.1, z: 3.325 },
    cameraPitch: Math.PI * 0.05,
    cameraFOVY: 30,
    skyPosition: { x: 0, y: 2.1, z: -1.4 },
    skyScale: 0.6,
  },
  or = {
    cameraPosition: { x: 0, y: 2.45, z: 4.73 },
    cameraPitch: Math.PI * -0.12,
    cameraFOVY: 19,
    skyPosition: { x: 0, y: 3.1, z: -1.4 },
    skyScale: 1,
  },
  O = we()(
    He((n) => ({
      ...Tt,
      in404Mode: !1,
      errorStatus: 500,
      setIn404Mode: (e) => n(() => ({ ...(e ? or : Tt), in404Mode: e })),
      setErrorStatus: (e) => n(() => ({ errorStatus: e })),
    }))
  ),
  Nt = we((n) => ({
    pointerVelocity: { x: 0, y: 0 },
    setPointerVelocity: (e) => n({ pointerVelocity: e }),
    pointerPosition: { x: 0, y: 0 },
    setPointerPosition: (e) => n({ pointerPosition: e }),
  })),
  Yt = we(
    He((n) => ({
      isIntroPlaying: !0,
      setIsIntroPlaying: (e) => n({ isIntroPlaying: e }),
    }))
  ),
  Gt = we(
    He((n) => ({
      skyMaterial: null,
      setSkyMaterial: (e) => n({ skyMaterial: e }),
    }))
  ),
  Rt = 2.2544378698224854,
  rr = 4.423084531045206,
  sr = 2880,
  ir = 1350,
  Kt = 10,
  ar = (Kt * ir) / sr,
  _e = { size: [Kt, ar], water: { height: 1 } },
  Qe = { palmTrees: 1, water: 2, logo: 3 },
  lr = 0.6,
  cr = 0.1,
  ur = new C(),
  fr = new C(),
  hr = new C(),
  dr = new ae(),
  mr = new ae();
function pr(n, e = 0) {
  const t = ur.copy(n.position),
    o = dr.copy(n.quaternion),
    r = fr;
  n.getWorldDirection(r);
  const i = Math.atan2(r.y, Math.sqrt(r.x * r.x + r.z * r.z)),
    a = mr.setFromAxisAngle(hr.set(1, 0, 0), i * -2);
  o.multiply(a);
  const c = (t.y - e) * 2;
  return (t.y -= c), { cameraPos: t, cameraOrientation: o };
}
function gr(n, e, t) {
  const o = n * e,
    r = new Float32Array(o * 3),
    i = new Float32Array(o * 2),
    a = Math.floor(n / 2),
    c = Math.floor(e / 2);
  for (let d = 0; d < n; d++)
    for (let m = 0; m < e; m++)
      (r[3 * (d * e + m)] = (d - a) * t),
        (r[3 * (d * e + m) + 2] = (m - c) * t),
        (i[2 * (d * e + m)] = d / (n - 1)),
        (i[2 * (d * e + m) + 1] = m / (e - 1));
  const u = new Uint32Array((n - 1) * (e - 1) * 2 * 3);
  let f = 0;
  for (let d = 0; d < n - 1; d++)
    for (let m = 0; m < e - 1; m++) {
      const v = d * e + m,
        g = d * e + m + 1,
        p = (d + 1) * e + m + 1,
        V = (d + 1) * e + m;
      (u[f++] = v),
        (u[f++] = g),
        (u[f++] = p),
        (u[f++] = v),
        (u[f++] = p),
        (u[f++] = V);
    }
  const h = new dn();
  return (
    h.setAttribute("position", new Be(r, 3)),
    h.setAttribute("uv", new Be(i, 2)),
    h.setIndex(new Be(u, 1)),
    h
  );
}
function vr(n, e, t) {
  let o = 0;
  const r = n / e;
  return (
    r >= Rt
      ? (o =
          2 *
          Math.atan(Math.tan((t * Math.PI) / 180 / 2) / (r / Rt)) *
          (180 / Math.PI))
      : (o = t),
    o
  );
}
function We(n, e) {
  const o = (rr / n - 1) * e.moveRate;
  if (e.minPosition !== void 0) {
    const r = e.defaultPosition - o;
    return Math.max(e.minPosition, r);
  }
  if (e.maxPosition !== void 0) {
    const r = e.defaultPosition + o;
    return Math.min(e.maxPosition, r);
  }
  return e.defaultPosition;
}
const Xt =
  "https://cdn.shopify.com/3d/models/5d796090fe0ccc1f/palm_planes_2D_22-v2.glb";
function xr(n) {
  const e = Qe.palmTrees,
    t = l.useRef(null),
    { nodes: o, materials: r, animations: i } = Q(Xt),
    { actions: a } = mn(i, t),
    { in404Mode: c, cameraPosition: u, skyPosition: f } = O(),
    h = l.useMemo(() => {
      const _ = [],
        S = new Xe(new C(0, 1, 0), 0);
      return S.translate(new C(0, _e.water.height - 0.05, 0)), _.push(S), _;
    }, []),
    d = l.useMemo(() => {
      const _ = r["palm atlas front"].clone();
      return (
        _.map && (_.map.colorSpace = pn),
        (_.color = new De(16448250)),
        (_.onBeforeCompile = (S) => {
          S.fragmentShader = S.fragmentShader.replace(
            "#include <colorspace_fragment>",
            "gl_FragColor = diffuseColor;"
          );
        }),
        (_.depthTest = !1),
        (_.transparent = !0),
        (_.clippingPlanes = h),
        _
      );
    }, [r, h]);
  l.useLayoutEffect(() => {
    var _, S, P;
    (_ = a == null ? void 0 : a["tree armature 3Action"]) == null || _.play(),
      (S = a == null ? void 0 : a["tree armature 2Action"]) == null || S.play(),
      (P = a == null ? void 0 : a["tree armature 1Action.001"]) == null ||
        P.play();
  }, [a]);
  const m = te((_) => _.camera),
    v = l.useRef(null),
    g = l.useRef(null),
    p = l.useRef(null),
    V = l.useRef(null),
    A = l.useMemo(
      () => ({
        left: {
          defaultPosition: c ? 0.082 - 0.1 : 0.082,
          moveRate: c ? 0.05 - 0.04 : 0.05,
          minPosition: -0.5,
        },
        middle: {
          defaultPosition: c ? 0.839 + 0.1 : 0.839,
          moveRate: 0.01,
          maxPosition: 1.5,
        },
        right: {
          defaultPosition: c ? 0.884 + 0.1 : 0.884,
          moveRate: 0.01,
          maxPosition: 1.75,
        },
      }),
      [c]
    ),
    T = l.useMemo(() => (c ? f.z - 0.95 : f.z), [c, f.z]);
  return (
    $(() => {
      const _ = u.z + Math.abs(f.z),
        P = 2 * Math.tan((m.fov * Math.PI) / 180 / 2) * _ * m.aspect;
      if (v.current) {
        const y = We(P, A.left);
        v.current.position.x = -P / 2 + y * P;
      }
      if (g.current) {
        const y = We(P, A.middle);
        (g.current.position.x = -P / 2 + y * P),
          p.current && (p.current.visible = P >= 1.5);
      }
      if (V.current) {
        const y = We(P, A.right);
        V.current.position.x = -P / 2 + y * P;
      }
    }),
    s.jsx(s.Fragment, {
      children: s.jsx("group", {
        ref: t,
        ...n,
        dispose: null,
        children: s.jsxs("group", {
          name: "Scene",
          children: [
            s.jsxs("group", {
              name: "main_trunk_3",
              children: [
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med",
                  geometry: o.SamplePalm_Med.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med_1",
                  geometry: o.SamplePalm_Med_1.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med_1.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med_2",
                  geometry: o.SamplePalm_Med_2.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med_2.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med_3",
                  geometry: o.SamplePalm_Med_3.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med_3.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
              ],
            }),
            s.jsxs("group", {
              ref: v,
              name: "tree_armature_1",
              position: [0, -0.1, T],
              scale: 1.2 * 1.25,
              rotation: [0, Math.PI * 0.1, 0],
              children: [
                s.jsx("primitive", { object: o.trunk_1 }),
                s.jsx("primitive", { object: o.base_1 }),
              ],
            }),
            s.jsxs("group", {
              ref: g,
              name: "tree_armature_2",
              position: [0, -0.03, T],
              scale: 1 * 1.1,
              rotation: [0, Math.PI * -0.1, 0],
              children: [
                s.jsx("primitive", { object: o.trunk_2 }),
                s.jsx("primitive", { object: o.base_2 }),
              ],
            }),
            s.jsxs("group", {
              ref: V,
              name: "tree_armature_3",
              position: [0, 0.015, T],
              scale: 1.7 * 1.25,
              rotation: [0, Math.PI * -0.1, 0],
              children: [
                s.jsx("primitive", { object: o.trunk }),
                s.jsx("primitive", { object: o.base }),
              ],
            }),
            s.jsxs("group", {
              name: "main_trunk_2",
              ref: p,
              children: [
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med001",
                  geometry: o.SamplePalm_Med001.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med001.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med001_1",
                  geometry: o.SamplePalm_Med001_1.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med001_1.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med001_2",
                  geometry: o.SamplePalm_Med001_2.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med001_2.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med001_3",
                  geometry: o.SamplePalm_Med001_3.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med001_3.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
              ],
            }),
            s.jsxs("group", {
              name: "main_trunk_1",
              children: [
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med004",
                  geometry: o.SamplePalm_Med004.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med004.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med004_1",
                  geometry: o.SamplePalm_Med004_1.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med004_1.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med004_2",
                  geometry: o.SamplePalm_Med004_2.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med004_2.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
                s.jsx("skinnedMesh", {
                  name: "SamplePalm_Med004_3",
                  geometry: o.SamplePalm_Med004_3.geometry,
                  material: d,
                  skeleton: o.SamplePalm_Med004_3.skeleton,
                  renderOrder: e,
                  frustumCulled: !1,
                }),
              ],
            }),
          ],
        }),
      }),
    })
  );
}
Q.preload(Xt);
const wr = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  yr = `varying vec2 vUv;

uniform vec2 screenResolution;
uniform float time;
// Background uniforms
uniform sampler2D backgroundTexture;
uniform sampler2D backgroundWithoutStarsTexture;
uniform bool useBackgroundWithoutStarsTexture;
// Star uniforms
const float starWeight = 1.75;
const float starThreshold = 0.25;
const vec3 innerColor = vec3(0.9882354812992226, 0.6000049954151406, 0.8352965356023098);
const vec3 outerColor = vec3(0.42353546482977045, 0.1254952949627403, 0.42353546482977045);
const float zoomLevel = 50.0;
const float minStarSize = 0.0;
const float innerFadeRadius = 0.025;
const float outerFadeRadius = 0.1;
const float starSeed = 10.0;
const float twinkleSpeed = 7.5;
const float twinkleIntensity = 0.75;
// Cloud uniforms
const float backgroundPlaneAspectRatio = 10.0 / 4.6875;
const float cloudTextureAspectRatio = 1920.0 / 1080.0;
uniform sampler2D cloudTexture;
uniform sampler2D cloudTexture2;
const float foregroundCloudsSpeed = -0.0025;
const float backgroundCloudsSpeed = -0.0015;
// Inverted sky uniforms
uniform bool invert;
const float invertedBackgroundWeight = 2.0;
const float invertedStarWeight = 0.0;
const float invertedCloudWeight = 0.5;

// Stars
// ----------------------------------------------------------------------------------------------------

#define TAU 6.28318

// Pseudo random number generator
float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec4 Star(vec2 uv, float size, float n) {
  // Distance from center of grid cell
  float d = length(uv);
  // Scale the radii based on the star size
  float innerRadius = innerFadeRadius * size;
  float outerRadius = outerFadeRadius * size;
  // Smooth transition between inner solid part and outer fade
  float shape = smoothstep(outerRadius, innerRadius, d);
  // Calculate color mix factor - goes from 0 to 1 as we move from outer to inner
  float colorMix = smoothstep(outerRadius, innerRadius, d);
  // Mix the colors
  vec3 color = mix(outerColor, innerColor, colorMix);
  // Twinkle
  color *= mix(color, color + twinkleIntensity, sin(time * twinkleSpeed + n * TAU) * .5 + .5);
  // Return vec4 with color and shape
  return vec4(color, shape);
}

vec3 StarLayer(vec2 screenUVs) {
  vec3 col = vec3(0);
  // Grid UVs
  vec2 gv = fract(screenUVs) - 0.5;
  // ID of grid cell
  vec2 id = floor(screenUVs);
  // Compute the color of the star
  float n = Hash21(id);
  float size = max(fract(n * 345.32), minStarSize);
  vec4 star = Star(gv - vec2(n, fract(n * 34.)) + .5, size, n);
  col += star.rgb * star.a * size;
  // Fade the star
  float fadeStrength = smoothstep(starThreshold, 1.0, vUv.y);
  if(invert) {
    col *= 1.0 - fadeStrength;
  } else {
    col *= fadeStrength;
  }
  return col;
}

// Main
// ----------------------------------------------------------------------------------------------------

void main() {
  // Center screen coordinates and make them aspectio ratio corrected
  // We use screen coordinates instead of UVs for the stars to hopefully avoid issues related to the size of the stars on small screens
  vec2 screenUVs = (gl_FragCoord.xy - (screenResolution * 0.5)) / screenResolution.y;

  // Normalize the star density relative to a screen height of 1080 pixels
  // This helps to keep the star density consistent across different screen sizes
  float baseHeight = 1080.0;
  float densityScale = min(1.0, screenResolution.y / baseHeight);
  screenUVs *= densityScale;

  // We use aspect ratio corrected UVs for the clouds
  vec2 aspectRatioCorrectedUVs = vUv;
  float textureAspect = cloudTextureAspectRatio;
  float planeAspect = backgroundPlaneAspectRatio;
  aspectRatioCorrectedUVs -= 0.5;
  if(textureAspect > planeAspect) {
    aspectRatioCorrectedUVs.y *= textureAspect / planeAspect;
  } else {
    aspectRatioCorrectedUVs.x *= planeAspect / textureAspect;
  }
  aspectRatioCorrectedUVs += 0.5;

  // Background
  // ----------------------------------------------------------------------------------------------------

  vec2 backgroundUVs = vUv;
  if(invert) {
    backgroundUVs.y = 1.0 - backgroundUVs.y;
  }
  vec3 backgroundColor;
  if(useBackgroundWithoutStarsTexture) {
    backgroundColor = texture2D(backgroundWithoutStarsTexture, backgroundUVs).rgb;
  } else {
    backgroundColor = texture2D(backgroundTexture, backgroundUVs).rgb;
  }

  // Stars
  // ----------------------------------------------------------------------------------------------------

  vec3 starColor = StarLayer((screenUVs * zoomLevel) + starSeed);

  // Cloud layer 1
  // ----------------------------------------------------------------------------------------------------

  vec2 cloudsUVs1 = aspectRatioCorrectedUVs;
  cloudsUVs1.y += 0.1;
  cloudsUVs1.x += time * foregroundCloudsSpeed;

  vec4 cloudTextureColor = texture2D(cloudTexture, cloudsUVs1);
  vec3 finalCloudColor = cloudTextureColor.rgb * cloudTextureColor.a;

  // Cloud layer 2
  // ----------------------------------------------------------------------------------------------------

  vec2 cloudsUVs2 = aspectRatioCorrectedUVs;
  cloudsUVs2 *= 1.75;
  cloudsUVs2.y -= 0.1;
  cloudsUVs2.x += time * backgroundCloudsSpeed;

  vec4 cloudTextureColor2 = texture2D(cloudTexture2, cloudsUVs2);
  cloudTextureColor2.rgb *= 0.9;
  vec3 finalCloudColor2 = cloudTextureColor2.rgb * cloudTextureColor2.a;

  // Blend the colors
  // ----------------------------------------------------------------------------------------------------

  vec3 finalColor;
  if(invert) {
    finalColor = (backgroundColor * invertedBackgroundWeight + starColor * invertedStarWeight);
    finalColor += (finalCloudColor + finalCloudColor2 * (1.0 - cloudTextureColor.a)) * invertedCloudWeight;
  } else {
    finalColor = (backgroundColor + starColor * starWeight) * (1.0 - cloudTextureColor.a) * (1.0 - cloudTextureColor2.a);
    finalColor += finalCloudColor + finalCloudColor2 * (1.0 - cloudTextureColor.a);
  }

  // Apply horizontal vignette
  vec2 vignetteUV = vUv * 2.0 - 1.0;
  float vignetteFalloff = 11.0; // Controls how quickly the vignette fades
  float horizontalVignette = smoothstep(0.0, 1.0, abs(vignetteUV.x));
  horizontalVignette = pow(horizontalVignette, vignetteFalloff);
  finalColor *= (1.0 - horizontalVignette * 0.4) * 0.96;

  gl_FragColor = vec4(finalColor, 1.0);
}
`,
  Re = {
    SKY: {
      backgroundTextureUrl:
        "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/Hero_main_stars_2.png?v=1742816689",
      backgroundWithoutStarsTextureUrl:
        "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/sky_without_stars_288_135.png?v=1747667497",
      cloudForegroundUrl:
        "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/clouds_foreground.png?v=1747666521",
      cloudBackgroundUrl:
        "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/clouds_background_480_270.png?v=1747667808",
    },
  };
function br() {
  const { skyPosition: n, skyScale: e } = O(),
    [t, o, r, i] = le([
      Re.SKY.backgroundTextureUrl,
      Re.SKY.backgroundWithoutStarsTextureUrl,
      Re.SKY.cloudForegroundUrl,
      Re.SKY.cloudBackgroundUrl,
    ]);
  (r.wrapS = Ee), (i.wrapS = Ee);
  const a = l.useMemo(
      () =>
        new L({
          uniforms: {
            screenResolution: { value: new ve(0, 0) },
            time: { value: 0 },
            backgroundTexture: { value: t },
            backgroundWithoutStarsTexture: { value: o },
            useBackgroundWithoutStarsTexture: { value: !1 },
            cloudTexture: { value: r },
            cloudTexture2: { value: i },
            invert: { value: !1 },
          },
          vertexShader: wr,
          fragmentShader: yr,
          toneMapped: !1,
        }),
      [t, o, r, i]
    ),
    c = Gt((f) => f.setSkyMaterial);
  l.useEffect(() => {
    c(a);
  }, [a, c]);
  const u = l.useCallback(() => {
    const f = window.devicePixelRatio || 1;
    a.uniforms.screenResolution.value.set(
      document.documentElement.clientWidth * f,
      document.documentElement.clientHeight * f
    );
  }, [a]);
  return (
    l.useEffect(
      () => (
        u(),
        window.addEventListener("resize", u),
        () => {
          window.removeEventListener("resize", u);
        }
      ),
      [u]
    ),
    $((f) => {
      a.uniforms.time.value = f.clock.getElapsedTime();
    }),
    s.jsx("mesh", {
      position: [n.x, n.y, n.z],
      scale: e,
      material: a,
      children: s.jsx("planeGeometry", { args: _e.size }),
    })
  );
}
const _r = (n) =>
    s.jsxs("group", {
      ...n,
      dispose: null,
      children: [
        s.jsx(br, {}),
        s.jsx(xr, { position: [0, _e.water.height, 0] }),
      ],
    }),
  kt = new C(),
  Cr = new C(),
  Sr = new C(),
  Pr = new ae(),
  Ne = new ae(),
  ke = new gn();
class Mr {
  constructor(e, t, o, r, i, a) {
    B(this, "r");
    B(this, "pos");
    B(this, "vel");
    B(this, "acc");
    B(this, "damping");
    B(this, "orientation");
    B(this, "angularVel");
    B(this, "angularAcc");
    B(this, "angularDamping");
    B(this, "maxVel");
    B(this, "allowFreeRotationAroundY");
    (this.r = e),
      (this.pos = t),
      (this.vel = new C()),
      (this.acc = new C()),
      (this.damping = o),
      (this.orientation = new ae()),
      (this.angularVel = new C()),
      (this.angularAcc = new C()),
      (this.angularDamping = r),
      (this.maxVel = i),
      (this.allowFreeRotationAroundY = a);
  }
  applyForce(e) {
    this.acc.add(e);
  }
  applyAngularRotation(e) {
    this.angularAcc.add(e);
  }
  update(e) {
    this.vel.add(this.acc),
      this.vel.clampLength(0, this.maxVel),
      wt(this.vel, kt, this.damping, e, void 0, void 0, 1e-9),
      this.acc.set(0, 0, 0),
      this.pos.add(Cr.copy(this.vel).multiplyScalar(e)),
      this.angularVel.add(this.angularAcc),
      this.angularVel.clampLength(0, this.maxVel),
      wt(this.angularVel, kt, 0.5, e, void 0, void 0, 1e-9),
      this.angularAcc.set(0, 0, 0);
    const t = Sr.copy(this.angularVel).normalize(),
      o = this.angularVel.length() * e,
      r = Pr.setFromAxisAngle(t, o);
    if ((this.orientation.multiply(r).normalize(), this.angularDamping > 0))
      if (this.allowFreeRotationAroundY) {
        ke.setFromQuaternion(this.orientation);
        const i = ke.y;
        ke.set(0, i, 0),
          Ne.setFromEuler(ke),
          Pt(this.orientation, Ne, 0.2, e, void 0, void 0, 1e-9);
      } else Pt(this.orientation, Ne.identity(), 0.2, e, void 0, void 0, 1e-9);
  }
}
const Zt =
  "https://cdn.shopify.com/3d/models/6ca71ceb78ea3e81/flamingo_inflatable_01.glb";
function Tr({
  physicsBodyIndex: n,
  applyPointerMoveForce: e,
  clipBelowWaterPlane: t,
  roughness: o,
  metalness: r,
  ...i
}) {
  const { nodes: a, materials: c } = Q(Zt);
  l.useEffect(() => {
    (c.flamingo.clippingPlanes = [t]),
      (c.flamingo.roughness = o),
      (c.flamingo.metalness = r);
  }, [c, t, o, r]);
  const u = xe((f) => f.isTouchDevice);
  return s.jsxs("group", {
    ...i,
    dispose: null,
    children: [
      s.jsx("mesh", {
        geometry: a.flamingo_inflatable.geometry,
        material: c.flamingo,
        position: [0, 0.055, 0.067],
      }),
      s.jsxs("group", {
        visible: !1,
        onPointerMove: (f) => {
          u && e(f, n, u);
        },
        onPointerOver: (f) => {
          u || e(f, n, u ?? !1);
        },
        children: [
          s.jsxs("mesh", {
            children: [
              s.jsx("boxGeometry", { args: [0.55, 0.145, 0.55] }),
              s.jsx("meshBasicMaterial", { color: "lime", wireframe: !0 }),
            ],
          }),
          s.jsxs("mesh", {
            position: [0, 0.21625, 0.28875],
            children: [
              s.jsx("boxGeometry", { args: [0.15, 0.2875, 0.325] }),
              s.jsx("meshBasicMaterial", { color: "lime", wireframe: !0 }),
            ],
          }),
        ],
      }),
    ],
  });
}
O.subscribe(
  (n) => n.in404Mode,
  (n) => {
    n && Q.preload(Zt);
  }
);
const qt =
  "https://cdn.shopify.com/3d/models/be4648fac9d6251b/404_inflatable_four_02.glb";
function Vt({
  physicsBodyIndex: n,
  applyPointerMoveForce: e,
  clipBelowWaterPlane: t,
  color: o,
  roughness: r,
  metalness: i,
  ...a
}) {
  const { nodes: c, materials: u } = Q(qt),
    f = l.useMemo(() => {
      const d = u["balloon blue.002"].clone();
      return (
        (d.clippingPlanes = [t]),
        (d.color = new De(o).convertLinearToSRGB()),
        (d.roughness = r),
        (d.metalness = i),
        d
      );
    }, [u, t, o, r, i]),
    h = xe((d) => d.isTouchDevice);
  return s.jsxs("group", {
    ...a,
    dispose: null,
    children: [
      s.jsx("mesh", { geometry: c.inflatable_4.geometry, material: f }),
      s.jsxs("mesh", {
        position: [-0.015, 0, 0],
        visible: !1,
        onPointerMove: (d) => {
          h && e(d, n, h);
        },
        onPointerOver: (d) => {
          h || e(d, n, h ?? !1);
        },
        children: [
          s.jsx("boxGeometry", { args: [0.31, 0.082, 0.49] }),
          s.jsx("meshBasicMaterial", { color: "lime", wireframe: !0 }),
        ],
      }),
    ],
  });
}
O.subscribe(
  (n) => n.in404Mode,
  (n) => {
    n && Q.preload(qt);
  }
);
const $t =
  "https://cdn.shopify.com/3d/models/b48510a11ccf2f63/404_inflatable_five_02.glb";
function Rr({
  physicsBodyIndex: n,
  applyPointerMoveForce: e,
  clipBelowWaterPlane: t,
  color: o,
  roughness: r,
  metalness: i,
  ...a
}) {
  const { nodes: c, materials: u } = Q($t);
  l.useEffect(() => {
    (u["balloon blue"].clippingPlanes = [t]),
      (u["balloon blue"].color = new De(o).convertLinearToSRGB()),
      (u["balloon blue"].roughness = r),
      (u["balloon blue"].metalness = i);
  }, [u, t, o, r, i]);
  const f = xe((h) => h.isTouchDevice);
  return s.jsxs("group", {
    ...a,
    dispose: null,
    children: [
      s.jsx("mesh", {
        geometry: c.inflatable_5.geometry,
        material: u["balloon blue"],
        scale: 0.81,
      }),
      s.jsxs("mesh", {
        position: [0.005, 0, 0.008],
        visible: !1,
        onPointerMove: (h) => {
          f && e(h, n, f);
        },
        onPointerOver: (h) => {
          f || e(h, n, f ?? !1);
        },
        children: [
          s.jsx("boxGeometry", { args: [0.245, 0.095, 0.47] }),
          s.jsx("meshBasicMaterial", { color: "lime", wireframe: !0 }),
        ],
      }),
    ],
  });
}
O.subscribe(
  (n) => n.in404Mode,
  (n) => {
    n && Q.preload($t);
  }
);
const Qt =
  "https://cdn.shopify.com/3d/models/3379434bad81180e/404_inflatable_zero_02.glb";
function kr({
  physicsBodyIndex: n,
  applyPointerMoveForce: e,
  clipBelowWaterPlane: t,
  color: o,
  roughness: r,
  metalness: i,
  ...a
}) {
  const { nodes: c, materials: u } = Q(Qt);
  l.useEffect(() => {
    (u["balloon blue"].clippingPlanes = [t]),
      (u["balloon blue"].color = new De(o).convertLinearToSRGB()),
      (u["balloon blue"].roughness = r),
      (u["balloon blue"].metalness = i);
  }, [u, t, o, r, i]);
  const f = xe((h) => h.isTouchDevice);
  return s.jsxs("group", {
    ...a,
    dispose: null,
    children: [
      s.jsx("mesh", {
        geometry: c.inflatable_0.geometry,
        material: u["balloon blue"],
        scale: [0.81, 0.993, 0.81],
      }),
      s.jsxs("mesh", {
        visible: !1,
        onPointerMove: (h) => {
          f && e(h, n, f);
        },
        onPointerOver: (h) => {
          f || e(h, n, f ?? !1);
        },
        children: [
          s.jsx("boxGeometry", { args: [0.262, 0.088, 0.51] }),
          s.jsx("meshBasicMaterial", { color: "lime", wireframe: !0 }),
        ],
      }),
    ],
  });
}
O.subscribe(
  (n) => n.in404Mode,
  (n) => {
    n && Q.preload(Qt);
  }
);
const Et = new C(),
  Vr = new C(),
  Er = new C(),
  jr = new C(),
  Ur = new C(),
  Ar = new vn();
function Hr({ waterRef: n }) {
  const { errorStatus: e } = O(),
    t = l.useMemo(
      () => [new C(-0.55, 1, 1.5), new C(0, 1, 1.75), new C(0.55, 1, 2)],
      []
    ),
    o = [0.2, 0.225, 0.2],
    r = [0.35, 0.35, 0.35],
    i = [0.25, 0.25, 0.25],
    a = 0.25,
    c = 2,
    u = 0.5,
    f = 0.2,
    h = 1.5,
    d = 0.5,
    m = 300,
    v = 0.01,
    g = 1,
    p = !0,
    V = -3,
    A = 5,
    T = 0.25,
    _ = -0.015,
    S = 0.005,
    P = 0.15803107619285583,
    y = 0,
    D = "#2650cc",
    W = 0.07727274298667908,
    N = 0,
    K = "#2650cc",
    H = 0.07727274298667908,
    z = 0,
    w = l.useMemo(
      () => t.map((x, M) => new Mr(o[M], x.clone(), u, f, h, p)),
      [t, p]
    ),
    Z = l.useRef(
      Array(3)
        .fill(null)
        .map(() => l.createRef())
    ),
    b = l.useMemo(() => {
      const x = new Xe(new C(0, 1, 0), 0);
      return x.translate(new C(0, _e.water.height, 0)), x;
    }, []),
    R = te((x) => x.camera),
    j = l.useRef(new xn());
  l.useLayoutEffect(() => {
    const x = () => {
      const M = Ar.copy(R.projectionMatrix),
        I = Math.tan((R.fov * (Math.PI / 180) + V * (Math.PI / 180)) / 2),
        q = R.near * I,
        fe = q * R.aspect;
      (M.elements[0] = R.near / fe),
        (M.elements[5] = R.near / q),
        j.current.setFromProjectionMatrix(M.multiply(R.matrixWorldInverse));
    };
    return (
      x(),
      window.addEventListener("resize", x),
      () => {
        window.removeEventListener("resize", x);
      }
    );
  }, [R, V]);
  const k = l.useCallback(
      (x, M, I) => {
        x.stopPropagation();
        const q = I ? a * 0.75 : a,
          fe = I ? c * 0.75 : c,
          ne = Nt.getState().pointerVelocity;
        w[M].applyForce(Et.set(q * ne.x, 0, q * ne.y)),
          w[M].applyAngularRotation(Et.set(-fe * ne.y, fe * ne.x, 0));
      },
      [w]
    ),
    Fe = l.useCallback(
      (x) => {
        w.forEach((M) => {
          M.update(x);
        });
      },
      [w]
    ),
    ue = l.useCallback(
      (x) => {
        w.forEach((M, I) => {
          w.forEach((q, fe) => {
            if (fe === I) return;
            const ne = M.pos.distanceTo(q.pos),
              Je = M.r + q.r;
            if (ne < Je) {
              const rn = Je - ne,
                et = Vr.copy(M.pos)
                  .sub(q.pos)
                  .normalize()
                  .multiplyScalar((rn / 2) * m * x);
              M.applyForce(et), q.applyForce(et.negate());
            }
          });
        });
      },
      [w]
    ),
    Ce = l.useCallback(() => {
      w.forEach((x, M) => {
        const I = Z.current[M].current;
        I == null || I.position.copy(x.pos),
          I == null || I.quaternion.copy(x.orientation);
      });
    }, [w]),
    Se = l.useCallback(() => {
      w.forEach((x) => {
        j.current.containsPoint(x.pos) ||
          (j.current.planes[0].distanceToPoint(x.pos) < 0
            ? Math.abs(x.vel.x) < v
              ? (x.vel.x = -g)
              : x.vel.x > 0 && (x.vel.x *= -0.5)
            : j.current.planes[1].distanceToPoint(x.pos) < 0 &&
              (Math.abs(x.vel.x) < v
                ? (x.vel.x = g)
                : x.vel.x < 0 && (x.vel.x *= -0.5)),
          j.current.planes[2].distanceToPoint(x.pos) < 0
            ? Math.abs(x.vel.z) < v
              ? (x.vel.z = -g)
              : x.vel.z > 0 && (x.vel.z *= -0.5)
            : j.current.planes[3].distanceToPoint(x.pos) < 0 &&
              (Math.abs(x.vel.z) < v
                ? (x.vel.z = g)
                : x.vel.z < 0 && (x.vel.z *= -0.5)));
      });
    }, [w, j]),
    ze = l.useCallback(() => {
      if (n.current) {
        const x = w[0].pos,
          M = w[1].pos,
          I = w[2].pos;
        n.current.updateFloatieInteractorPositionsAndRadii(
          [
            Er.set(x.x, x.y + i[0], x.z),
            jr.set(M.x, M.y + i[1], M.z),
            Ur.set(I.x, I.y + i[2], I.z),
          ],
          r
        );
      }
    }, [w]);
  return (
    $((x, M) => {
      const I = Math.min(M, 0.1) * d;
      Fe(I), ue(I), Ce(), Se(), ze();
    }),
    s.jsx("group", {
      children: Array.from({ length: 3 }, (x, M) =>
        s.jsxs(
          "group",
          {
            ref: Z.current[M],
            position: t[M].toArray(),
            children: [
              s.jsxs("mesh", {
                position: [0, i[M], 0],
                visible: !1,
                children: [
                  s.jsx("sphereGeometry", { args: [r[M], 32, 16] }),
                  s.jsx("meshBasicMaterial", { color: "lime", wireframe: !0 }),
                ],
              }),
              s.jsxs(Wo, {
                speed: A,
                rotationIntensity: T,
                floatingRange: [_, S],
                children: [
                  s.jsxs("mesh", {
                    visible: !1,
                    children: [
                      s.jsx("sphereGeometry", { args: [o[M], 32, 16] }),
                      s.jsx("meshBasicMaterial", {
                        color: "lime",
                        wireframe: !0,
                      }),
                    ],
                  }),
                  M === 0
                    ? s.jsx("group", {
                        rotation: [0, (-20 * Math.PI) / 180, 0],
                        children:
                          e === 404
                            ? s.jsx(Vt, {
                                physicsBodyIndex: 0,
                                applyPointerMoveForce: k,
                                clipBelowWaterPlane: b,
                                color: D,
                                roughness: W,
                                metalness: N,
                                scale: 1.1,
                              })
                            : s.jsx(Rr, {
                                physicsBodyIndex: 0,
                                applyPointerMoveForce: k,
                                clipBelowWaterPlane: b,
                                color: D,
                                roughness: W,
                                metalness: N,
                                scale: 1.1,
                              }),
                      })
                    : null,
                  M === 1
                    ? s.jsx("group", {
                        rotation: [0, (-30 * Math.PI) / 180, 0],
                        children: s.jsx(Tr, {
                          physicsBodyIndex: 1,
                          applyPointerMoveForce: k,
                          clipBelowWaterPlane: b,
                          roughness: P,
                          metalness: y,
                          scale: 0.8,
                        }),
                      })
                    : null,
                  M === 2
                    ? s.jsx("group", {
                        rotation: [0, (150 * Math.PI) / 180, 0],
                        children:
                          e === 404
                            ? s.jsx(Vt, {
                                physicsBodyIndex: 2,
                                applyPointerMoveForce: k,
                                clipBelowWaterPlane: b,
                                color: K,
                                roughness: H,
                                metalness: z,
                                scale: 1.1,
                              })
                            : s.jsx(kr, {
                                physicsBodyIndex: 2,
                                applyPointerMoveForce: k,
                                clipBelowWaterPlane: b,
                                color: K,
                                roughness: H,
                                metalness: z,
                                scale: 1.1,
                              }),
                      })
                    : null,
                ],
              }),
            ],
          },
          `physics-body-${M}`
        )
      ),
    })
  );
}
const jt =
  "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/hero_sky_01_128_1.exr?v=1744815382";
function Dr({ physicsScene: n, waterRef: e }) {
  const { in404Mode: t } = O(),
    o = l.useMemo(() => new je(), []),
    r = te((d) => d.size),
    i = oe(Math.floor(r.width / 4), Math.floor(r.height / 4), {
      depth: !1,
      wrapS: Ee,
      wrapT: Ee,
    }),
    a = l.useRef(new C()),
    c = l.useRef(new ae()),
    u = l.useRef(!0),
    f = l.useRef(null);
  l.useEffect(() => {
    const d = Gt.subscribe(
      (m) => m.skyMaterial,
      (m) => {
        (f.current = m), (u.current = !0);
      },
      { fireImmediately: !0 }
    );
    return () => {
      d();
    };
  }, []);
  const h = l.useCallback(
    (d) => {
      const { gl: m, camera: v } = d,
        { cameraPos: g, cameraOrientation: p } = pr(v, n.waterHeight);
      a.current.copy(v.position),
        c.current.copy(v.quaternion),
        v.position.copy(g),
        v.quaternion.copy(p),
        f.current &&
          ((f.current.uniforms.invert.value = !0),
          (f.current.uniforms.useBackgroundWithoutStarsTexture.value = !0),
          t && (f.current.visible = !0)),
        m.setRenderTarget(i),
        m.clear(m.COLOR_BUFFER_BIT),
        m.render(o, v),
        m.setRenderTarget(null),
        f.current &&
          ((f.current.uniforms.invert.value = !1),
          (f.current.uniforms.useBackgroundWithoutStarsTexture.value = !1),
          t && (f.current.visible = !1)),
        v.position.copy(a.current),
        v.quaternion.copy(c.current),
        e.current &&
          (e.current.getWaterMaterial().uniforms.reflectionTexture.value =
            i.texture),
        (u.current = !1);
    },
    [t, n.waterHeight, i, o, e]
  );
  return (
    l.useEffect(() => {
      u.current = !0;
    }, [r.width, r.height]),
    $((d) => {
      (t || u.current) && h(d);
    }, 0),
    s.jsxs(s.Fragment, {
      children: [
        Ue(
          s.jsxs(s.Fragment, {
            children: [
              t && s.jsx(tt, { files: jt, environmentIntensity: 2 }),
              s.jsx(_r, {}),
              t && s.jsx(Hr, { waterRef: e }),
            ],
          }),
          o
        ),
        t && s.jsx(tt, { files: jt, environmentIntensity: 2 }),
        s.jsx("primitive", { object: o }),
      ],
    })
  );
}
const ee = `varying vec2 vUv;

// This is the vertex shader that's used to render the simulation quad using the orthographic simulation camera
// It's used in the following steps of the simulation:
// - Compute body heights
// - Smooth body heights
// - Add body heights to the water heights
// - Compute velocities
// - Update water heights
// - Add noise to the water heights
// - Compute normals
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  Ir = `const float numX = 256.0;
const float numZ = 256.0;
const float spacing = 0.02;
uniform float initialWaterHeight;
uniform vec3 ballPos;
uniform float ballRadius;
uniform sampler2D waterHeights;
uniform bool firstRender;

varying vec2 vUv;

void main() {
  // These are the coordinates of the center of the grid
  float cx = floor(numX / 2.0);
  float cz = floor(numZ / 2.0);

  // These are the coordinates of the current grid cell
  float xi = floor(vUv.y * numX);
  float zi = floor(vUv.x * numZ);

  // Calculate the distance between the ball and the center of the current grid cell
  float x = (xi - cx) * spacing;
  float z = (zi - cz) * spacing;
  float r2 = (ballPos.x - x) * (ballPos.x - x) + (ballPos.z - z) * (ballPos.z - z);

  // If the cell is within the radius of the ball, compute the body height and store it in the output color
  if(r2 < ballRadius * ballRadius) {
    float bodyHalfHeight = sqrt(ballRadius * ballRadius - r2);
    float waterHeight = firstRender ? initialWaterHeight : texture2D(waterHeights, vUv).r;
    float bodyMin = max(ballPos.y - bodyHalfHeight, 0.0);
    float bodyMax = min(ballPos.y + bodyHalfHeight, waterHeight);
    float bodyHeight = max(bodyMax - bodyMin, 0.0);
    if(bodyHeight > 0.0) {
      gl_FragColor = vec4(bodyHeight, 0.0, 0.0, 1.0);
    }
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
`,
  Fr = `const float numX = 256.0;
const float numZ = 256.0;
const float spacing = 0.02;
uniform float initialWaterHeight;
uniform vec3 ballPos;
uniform vec3 ballPos0;
uniform vec3 ballPos1;
uniform vec3 ballPos2;
uniform float ballRadius;
uniform float ballRadius0;
uniform float ballRadius1;
uniform float ballRadius2;
uniform sampler2D waterHeights;
uniform bool firstRender;

varying vec2 vUv;

void main() {
  // These are the coordinates of the center of the grid
  float cx = floor(numX / 2.0);
  float cz = floor(numZ / 2.0);

  // These are the coordinates of the current grid cell
  float xi = floor(vUv.y * numX);
  float zi = floor(vUv.x * numZ);

  // Calculate the position of the current grid cell
  float x = (xi - cx) * spacing;
  float z = (zi - cz) * spacing;

  // Initialize total body height
  float totalBodyHeight = 0.0;
  float waterHeight = firstRender ? initialWaterHeight : texture2D(waterHeights, vUv).r;

  // Process all four balls
  vec3 ballPositions[4];
  ballPositions[0] = ballPos;
  ballPositions[1] = ballPos0;
  ballPositions[2] = ballPos1;
  ballPositions[3] = ballPos2;

  float ballRadii[4];
  ballRadii[0] = ballRadius;
  ballRadii[1] = ballRadius0;
  ballRadii[2] = ballRadius1;
  ballRadii[3] = ballRadius2;

  for(int i = 0; i < 4; i++) {
    // Calculate the squared distance between the ball and the current grid cell
    float r2 = (ballPositions[i].x - x) * (ballPositions[i].x - x) +
      (ballPositions[i].z - z) * (ballPositions[i].z - z);

    // If the cell is within the radius of the ball, compute the body height
    if(r2 < ballRadii[i] * ballRadii[i]) {
      float bodyHalfHeight = sqrt(ballRadii[i] * ballRadii[i] - r2);
      float bodyMin = max(ballPositions[i].y - bodyHalfHeight, 0.0);
      float bodyMax = min(ballPositions[i].y + bodyHalfHeight, waterHeight);
      float bodyHeight = max(bodyMax - bodyMin, 0.0);

      // Add this ball's contribution to the total body height
      totalBodyHeight += bodyHeight;
    }
  }

  // Output the total body height
  gl_FragColor = vec4(totalBodyHeight, 0.0, 0.0, 1.0);
}
`,
  zr = `const float numX = 256.0;
const float numZ = 256.0;
uniform sampler2D bodyHeights;

varying vec2 vUv;

void main() {
  // These are the coordinates of the current grid cell
  float xi = floor(vUv.y * numX);
  float zi = floor(vUv.x * numZ);
  // These are the steps we need to take to sample neighbouring cells
  vec2 uvDelta = vec2(1.0 / numX, 1.0 / numZ);

  // Get the current cell value
  float currentValue = texture2D(bodyHeights, vUv).r;

  float avg = currentValue;
  float totalWeight = 1.0;

  // Sample a 3x3 grid
  for(float dx = -1.0; dx <= 1.0; dx += 1.0) {
    for(float dz = -1.0; dz <= 1.0; dz += 1.0) {
      // Skip the center cell (already added)
      if(dx == 0.0 && dz == 0.0)
        continue;

      // Calculate neighbor coordinates
      float nx = xi + dx;
      float nz = zi + dz;

      // Check if neighbor is within bounds
      if(nx >= 0.0 && nx < numX && nz >= 0.0 && nz < numZ) {
        // Calculate UV coordinates for this neighbor
        vec2 neighborUV = vUv + vec2(dz * uvDelta.y, dx * uvDelta.x);

        // Apply distance-based weight (closer neighbors have more influence)
        float weight = 1.0 / (1.0 + sqrt(dx * dx + dz * dz));
        avg += texture2D(bodyHeights, neighborUV).r * weight;
        totalWeight += weight;
      }
    }
  }

  avg /= totalWeight;

  gl_FragColor = vec4(avg, 0.0, 0.0, 1.0);
}
`,
  Lr = `uniform float initialWaterHeight;
const float alpha = 0.4;
uniform sampler2D prevBodyHeights;
uniform sampler2D newBodyHeights;
uniform sampler2D waterHeights;
uniform bool firstRender;

varying vec2 vUv;

void main() {
  float prevBodyHeight = texture2D(prevBodyHeights, vUv).r;
  float newBodyHeight = texture2D(newBodyHeights, vUv).r;
  vec2 waterHeightAndVelocity = firstRender ? vec2(initialWaterHeight, 0.0) : texture2D(waterHeights, vUv).rg;

  // Add the difference between the new body height and the previous body height to the water height
  // Alpha controls the intensity with which you can manipulate the water's surface
  // To increase alpha we need to do more smoothing iterations, or find a better smoothing algorithm
  float newWaterHeight = waterHeightAndVelocity.r + (newBodyHeight - prevBodyHeight) * alpha;

  gl_FragColor = vec4(newWaterHeight, waterHeightAndVelocity.g, 0.0, 1.0);
}
`,
  Br = `uniform float waveSpeed;
const float spacing = 0.02;
uniform float deltaTime;
const float posDamping = 1.0;
const float numX = 256.0;
const float numZ = 256.0;
uniform sampler2D waterHeights;

varying vec2 vUv;

void main() {
  // Constant of proportionality
  float c = (waveSpeed * waveSpeed) / spacing / spacing;
  // Position damping
  float pd = min(posDamping * deltaTime, 1.0);

  // These are the coordinates of the current grid cell
  float xi = floor(vUv.y * numX);
  float zi = floor(vUv.x * numZ);
  // These are the steps we need to take to sample neighbouring cells
  vec2 uvDelta = vec2(1.0 / numX, 1.0 / numZ);

  vec2 waterHeightAndVelocity = texture2D(waterHeights, vUv).rg;
  float h = waterHeightAndVelocity.r;

  // Add together the heights of 4 neighbouring cells
  float sumH = 0.0;

  // Left neighbour
  if(xi > 0.0) {
    vec2 leftUV = vUv + vec2(0.0, -uvDelta.x);
    sumH += texture2D(waterHeights, leftUV).r;
  } else {
    sumH += h;
  }

  // Right neighbour
  if(xi < numX - 1.0) {
    vec2 rightUV = vUv + vec2(0.0, uvDelta.x);
    sumH += texture2D(waterHeights, rightUV).r;
  } else {
    sumH += h;
  }

  // Top neighbour
  if(zi > 0.0) {
    vec2 topUV = vUv + vec2(-uvDelta.y, 0.0);
    sumH += texture2D(waterHeights, topUV).r;
  } else {
    sumH += h;
  }

  // Bottom neighbour
  if(zi < numZ - 1.0) {
    vec2 bottomUV = vUv + vec2(uvDelta.y, 0.0);
    sumH += texture2D(waterHeights, bottomUV).r;
  } else {
    sumH += h;
  }

  // Calculate the acceleration and from it the change in velocity
  float acceleration = c * (sumH - 4.0 * h);
  float velocityUpdate = deltaTime * acceleration;

  // Calculate the change in height
  float heightUpdate = (0.25 * sumH - h) * pd;

  gl_FragColor = vec4(waterHeightAndVelocity.r + heightUpdate, waterHeightAndVelocity.g + velocityUpdate, 0.0, 1.0);
}
`,
  Or = `uniform float deltaTime;
const float velDamping = 1.5;
uniform sampler2D waterHeights;

varying vec2 vUv;

void main() {
  // Velocity damping
  float vd = exp(-velDamping * deltaTime);

  vec2 waterHeightAndVelocity = texture2D(waterHeights, vUv).rg;

  // Calculate the new velocity
  float newVelocity = waterHeightAndVelocity.g * vd;
  // Calculate the new height using the velocity
  float newHeight = clamp(waterHeightAndVelocity.r + newVelocity * deltaTime, -0.975, 1.025);

  gl_FragColor = vec4(newHeight, newVelocity, 0.0, 1.0);
}
`,
  Wr = `uniform float time;
uniform sampler2D waterHeights;
uniform float noiseScale;
const float noiseAmplitude = 0.0005;
const float noiseSpeed = 1.0;

varying vec2 vUv;

float psrdnoise(vec2 x, float alpha, out vec2 gradient) {

	// Transform to simplex space (axis-aligned hexagonal grid)
  vec2 uv = vec2(x.x + x.y * 0.5, x.y);

	// Determine which simplex we're in, with i0 being the "base"
  vec2 i0 = floor(uv);
  vec2 f0 = fract(uv);
	// o1 is the offset in simplex space to the second corner
  float cmp = step(f0.y, f0.x);
  vec2 o1 = vec2(cmp, 1.0 - cmp);

	// Enumerate the remaining simplex corners
  vec2 i1 = i0 + o1;
  vec2 i2 = i0 + vec2(1.0, 1.0);

	// Transform corners back to texture space
  vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
  vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
  vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);

	// Compute vectors from v to each of the simplex corners
  vec2 x0 = x - v0;
  vec2 x1 = x - v1;
  vec2 x2 = x - v2;

  vec3 iu = vec3(i0.x, i1.x, i2.x);
  vec3 iv = vec3(i0.y, i1.y, i2.y);

	// Compute one pseudo-random hash value for each corner
  vec3 hash = mod(iu, 289.0);
  hash = mod((hash * 51.0 + 2.0) * hash + iv, 289.0);
  hash = mod((hash * 34.0 + 10.0) * hash, 289.0);

	// Pick a pseudo-random angle and add the desired rotation
  vec3 psi = hash * 0.07482 + alpha;
  vec3 gx = cos(psi);
  vec3 gy = sin(psi);

	// Reorganize for dot products below
  vec2 g0 = vec2(gx.x, gy.x);
  vec2 g1 = vec2(gx.y, gy.y);
  vec2 g2 = vec2(gx.z, gy.z);

	// Radial decay with distance from each simplex corner
  vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
  w = max(w, 0.0);
  vec3 w2 = w * w;
  vec3 w4 = w2 * w2;

	// The value of the linear ramp from each of the corners
  vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));

	// Multiply by the radial decay and sum up the noise value
  float n = dot(w4, gdotx);

	// Compute the first order partial derivatives
  vec3 w3 = w2 * w;
  vec3 dw = -8.0 * w3 * gdotx;
  vec2 dn0 = w4.x * g0 + dw.x * x0;
  vec2 dn1 = w4.y * g1 + dw.y * x1;
  vec2 dn2 = w4.z * g2 + dw.z * x2;
  gradient = 10.9 * (dn0 + dn1 + dn2);

	// Scale the return value to fit nicely into the range [-1,1]
  return 10.9 * n;
}

void main() {
  // We use this approach to create a noise pattern that looks like water:
  // https://stegu.github.io/psrdnoise/2d-tutorial/2d-psrdnoise-tutorial-18.html

  // Make the water move towards the viewer
  vec2 adjustedUV = vUv;
  adjustedUV.x -= time * 0.015;

  vec2 v = noiseScale * (adjustedUV - 0.5);
  float alpha = time * noiseSpeed;
  vec2 g, gsum;
  float warp = 0.13;
  float n = 0.0;
  float w = 1.0;
  float s = 1.0;
  gsum = vec2(0.0);
  // Increasing the number of iterations creates more complex waves
  // First iteration
  n += w * psrdnoise(s * v + warp * gsum, s * alpha, g);
  gsum += w * g;
  w *= 0.5;
  s *= 2.0;
  // Second iteration
  n += w * psrdnoise(s * v + warp * gsum, s * alpha, g);
  gsum += w * g;
  w *= 0.5;
  s *= 2.0;

  // Inverting the noise creates much more realistic waves
  // https://stegu.github.io/psrdnoise/2d-tutorial/2d-psrdnoise-tutorial-19.html
  n *= -1.0;

  vec2 waterHeightAndVelocity = texture2D(waterHeights, vUv).rg;

  gl_FragColor = vec4(waterHeightAndVelocity.x + n * noiseAmplitude, waterHeightAndVelocity.y, 0.0, 0.0);
}
`,
  Nr = `const float numX = 256.0;
const float numZ = 256.0;
uniform sampler2D waterHeights;
const float gradientScalingFactor = 1000.0;

varying vec2 vUv;

void main() {
  // These are the coordinates of the current grid cell
  float xi = floor(vUv.y * numX);
  float zi = floor(vUv.x * numZ);
  // These are the steps we need to take to sample neighbouring cells
  vec2 uvDelta = vec2(1.0 / numX, 1.0 / numZ);

  vec2 waterHeightAndVelocity = texture2D(waterHeights, vUv).rg;

  // Current height
  float centerHeight = waterHeightAndVelocity.x;
  // Left neighbour
  float leftHeight = xi > 0.0 ? texture(waterHeights, vUv + vec2(0.0, -uvDelta.x)).x : centerHeight;
  // Right neighbour
  float rightHeight = xi < numX - 1.0 ? texture(waterHeights, vUv + vec2(0.0, uvDelta.x)).x : centerHeight;
  // Top neighbour
  float topHeight = zi > 0.0 ? texture(waterHeights, vUv + vec2(-uvDelta.y, 0.0)).x : centerHeight;
  // Bottom neighbour
  float bottomHeight = zi < numZ - 1.0 ? texture(waterHeights, vUv + vec2(uvDelta.y, 0.0)).x : centerHeight;

  // Calculate the gradients
  // Rate of change of height along the X axis
  float gradientX = (rightHeight - leftHeight) * 0.5;
  // Rate of change of height along the Z axis
  float gradientZ = (bottomHeight - topHeight) * 0.5;

  // The gradient scaling factor controls the intensity of the normal map
  gradientX *= gradientScalingFactor;
  gradientZ *= gradientScalingFactor;

  // Calculate the normal vector
  vec3 normal = normalize(vec3(-gradientX, 1.0, -gradientZ));

  gl_FragColor = vec4(waterHeightAndVelocity.x, waterHeightAndVelocity.y, normal.x, normal.z);
}`,
  Yr = `const vec3 lightPosition = vec3(0.0, 10.0, -10.0);
uniform sampler2D waterHeights;

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 fromLightVector;
varying vec4 clipSpace;

void main() {
  vec2 adjustedUv = vec2(uv.y, uv.x);
  vec4 waterHeightAndVelocityAndNormal = texture2D(waterHeights, adjustedUv);
  float waterHeight = waterHeightAndVelocityAndNormal.x;
  vec2 waterNormal = waterHeightAndVelocityAndNormal.zw;

  // Add the water height to the position
  vec3 pos = position;
  pos.y = waterHeight;
  vPos = vec3(pos);

  // Compute the full normal
  vNormal = vec3(waterNormal.x, sqrt(1.0 - dot(waterNormal.xy, waterNormal.xy)), waterNormal.y);

  vUv = uv;

  // Compute values used for lighting and for sampling the reflection texture
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  fromLightVector = worldPosition.xyz - lightPosition;
  clipSpace = projectionMatrix * viewMatrix * worldPosition;

  gl_Position = clipSpace;
}
`,
  Gr = `uniform float time;
uniform sampler2D reflectionTexture;
uniform float distortionIntensity;
uniform bool includeLightBasedShading;
const float reflectionTextureWeight = 0.4;
const float baseColorRampWeight = 1.05;
uniform float coneColorRampWeight;
const float reflectionTextureWithinConeWeight = 0.24;
uniform float baseColorRampWithinConeWeight;
const vec3 colorRampColor1 = vec3(0.0156862745088, 0.019607843136, 0.15294657980061963);
const vec3 colorRampColor2 = vec3(0.3647120721516634, 0.12941691095218383, 0.5137311128437285);
const vec3 colorRampColor3 = vec3(0.42353546482977045, 0.32549640471294256, 0.654906460650954);
uniform float colorRampColor1Pos;
uniform float colorRampColor2Pos;
const float colorRampColor3Pos = 1.0;
const vec3 coneColorRampColor1 = vec3(0.4784371930784837, 0.23137852395241176, 0.5725542355486799);
const vec3 coneColorRampColor2 = vec3(0.3764767606879643, 0.1451033618381698, 0.40000612249739637);
const vec3 coneColorRampColor3 = vec3(0.1411817510240882, 0.11765205886334601, 0.40784923872297224);
const float coneColorRampColor1Pos = 0.0;
const float coneColorRampColor2Pos = 0.75;
const float coneColorRampColor3Pos = 1.0;
uniform float coneHorizontalEdgeSoftness;
const float coneTopEdgeSoftness = 0.1;
const float coneBottomEdgeSoftness = 0.1;
const float coneBottomY = 0.0;
const float coneTopY = 1.0;
uniform float coneBottomWidth;
uniform float coneTopWidth;
const float coneWobbleFreq1 = 100.0;
const float coneWobbleFreq2 = 30.0;
const float coneWobbleAmp1 = 0.002;
const float coneWobbleAmp2 = 0.05;
const float coneWobbleSpeed = 0.5;
uniform float skyDepth;

varying vec3 vPos;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 fromLightVector;
varying vec4 clipSpace;

struct ColorStop {
    vec3 color;
    float position;
};

vec3 linearColorRamp(ColorStop[3] colors, float factor) {
    int index = 0;
    for(int i = 0; i < colors.length() - 1; i++) {
        ColorStop currentColor = colors[i];
        bool isInBetween = currentColor.position <= factor;
        index = int(mix(float(index), float(i), float(isInBetween)));
    }

    ColorStop currentColor = colors[index];
    ColorStop nextColor = colors[index + 1];

    float range = nextColor.position - currentColor.position;
    float lerpFactor = (factor - currentColor.position) / range;
    return mix(currentColor.color, nextColor.color, lerpFactor);
}

bool isWithinConeMask(vec2 uv, out float softnessFactor) {
    // Calculate the parameters that define the cone mask
    float t = (uv.y - coneBottomY) / (coneTopY - coneBottomY);
    t = clamp(t, 0.0, 1.0);
    float widthAtCurrentY = mix(coneBottomWidth, coneTopWidth, t);
    float distanceFromAxis = abs(uv.x - 0.5);

    // Calculate the wobble parameters that make it look like the cone is moving with the water
    float wobbleTime = time * coneWobbleSpeed;
    float widthWobble = coneWobbleAmp1 * sin(coneWobbleFreq1 * uv.y + wobbleTime) +
        coneWobbleAmp2 * sin(coneWobbleFreq2 * uv.y * 3.0 - wobbleTime * 0.7);
    float centerWobble = 0.03 * sin(coneWobbleFreq1 * 0.5 * uv.y + wobbleTime * 0.8);

    // Add wobble to the width and to the central position
    widthAtCurrentY += widthWobble * t;
    distanceFromAxis = abs(uv.x - (0.5 + centerWobble));

    // Now we create a smooth transition at the edges of the cone so it blends better with the water

    // Create vertical edge softness
    float verticalFactor = 1.0;
    if(uv.y > coneTopY - coneTopEdgeSoftness) {
        verticalFactor = smoothstep(coneTopY + 0.001, coneTopY - coneTopEdgeSoftness, uv.y);
    }
    if(uv.y < coneBottomY + coneBottomEdgeSoftness) {
        verticalFactor = smoothstep(coneBottomY - 0.001, coneBottomY + coneBottomEdgeSoftness, uv.y);
    }

    // Calculate how close we are to the horizontal edges (0 = at center, 1 = at or beyond edge)
    float edgeDistance = distanceFromAxis / widthAtCurrentY;

    // Create horizontal edge softness
    float horizontalFactor = 1.0 - smoothstep(1.0 - coneHorizontalEdgeSoftness, 1.0, edgeDistance);

    // Return the softness factor
    softnessFactor = horizontalFactor * verticalFactor;

    // Return true if the UV is within the cone mask
    return (uv.y >= coneBottomY - 0.01 && uv.y <= coneTopY + 0.01 && edgeDistance <= 1.0 + coneHorizontalEdgeSoftness);
}

void main() {
    // Discard fragments that are behind the sky plane
    if(vPos.z < skyDepth) {
        discard;
    }

    vec2 ndc = (clipSpace.xy / clipSpace.w) / 2.0 + 0.5;
    vec2 interactionDistortion = distortionIntensity * vec2(vNormal.x, vNormal.z);
    vec2 reflectionUVs = vec2(ndc.x, -ndc.y) + interactionDistortion;
    // Clamp to avoid sampling the sky at the bottom of the screen
    reflectionUVs.x = clamp(reflectionUVs.x, 0.001, 0.999);
    reflectionUVs.y = clamp(reflectionUVs.y, -0.999, -0.001);
    vec2 distortedUVs = vUv + interactionDistortion;

    // Sample the reflection texture using NDCs
    vec3 reflectionColor = vec3(texture2D(reflectionTexture, reflectionUVs));

    // Sample the base color ramp
    ColorStop[3] baseColorRampColors = ColorStop[](ColorStop(colorRampColor1, colorRampColor1Pos), ColorStop(colorRampColor2, colorRampColor2Pos), ColorStop(colorRampColor3, colorRampColor3Pos));
    vec3 baseColorRampColor = linearColorRamp(baseColorRampColors, 1.0 - distortedUVs.y);

    // Combine the reflection texture with the base color ramp
    vec3 finalColor = reflectionColor * reflectionTextureWeight + baseColorRampColor * baseColorRampWeight;

    // If the current UV is within the cone mask
    float softnessFactor = 0.0;
    if(isWithinConeMask(distortedUVs, softnessFactor)) {
        // Sample the cone color ramp
        ColorStop[3] coneColorRampColors = ColorStop[](ColorStop(coneColorRampColor1, coneColorRampColor1Pos), ColorStop(coneColorRampColor2, coneColorRampColor2Pos), ColorStop(coneColorRampColor3, coneColorRampColor3Pos));
        vec3 coneColorRampColor = linearColorRamp(coneColorRampColors, distortedUVs.y);
        vec3 coneColor = reflectionColor * reflectionTextureWithinConeWeight + baseColorRampColor * baseColorRampWithinConeWeight + coneColorRampColor * coneColorRampWeight;

        // Blend the cone with everything else
        finalColor = mix(finalColor, coneColor, softnessFactor);
    }

    // Compute simple lighting
    if(includeLightBasedShading) {
        vec3 L = normalize(fromLightVector * -1.0);
        float s = max(dot(vNormal, L), 0.0);
        finalColor *= (0.5 + 0.5 * s);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
`,
  Jt = l.forwardRef(({ physicsScene: n }, e) => {
    const { in404Mode: t, skyPosition: o } = O(),
      r = l.useMemo(() => new je(), []),
      i = l.useMemo(() => new Ut(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1), []),
      a = l.useMemo(
        () =>
          new Float32Array([
            -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
          ]),
        []
      ),
      c = l.useMemo(
        () => new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]),
        []
      ),
      u = l.useRef(null),
      f = l.useMemo(() => gr(n.numX, n.numZ, n.waterSpacing), []),
      h = oe(n.numX, n.numZ, {
        minFilter: Y,
        magFilter: Y,
        format: se,
        stencilBuffer: !1,
        type: re,
      }),
      d = oe(n.numX, n.numZ, {
        minFilter: Y,
        magFilter: Y,
        format: se,
        stencilBuffer: !1,
        type: re,
      }),
      m = oe(n.numX, n.numZ, {
        minFilter: Y,
        magFilter: Y,
        format: se,
        stencilBuffer: !1,
        type: re,
      }),
      v = oe(n.numX, n.numZ, {
        minFilter: Y,
        magFilter: Y,
        format: se,
        stencilBuffer: !1,
        type: re,
      }),
      g = l.useRef(h),
      p = l.useRef(d),
      V = l.useRef(m),
      A = l.useRef(v),
      T = l.useMemo(
        () =>
          t
            ? new L({
                uniforms: {
                  initialWaterHeight: { value: n.waterHeight },
                  ballPos: { value: new C(0, n.waterHeight + 1, 0.5) },
                  ballPos0: { value: new C(0, n.waterHeight + 1, 0.5) },
                  ballPos1: { value: new C(0, n.waterHeight + 1, 0.5) },
                  ballPos2: { value: new C(0, n.waterHeight + 1, 0.5) },
                  ballRadius: { value: 0 },
                  ballRadius0: { value: 0 },
                  ballRadius1: { value: 0 },
                  ballRadius2: { value: 0 },
                  waterHeights: { value: null },
                  firstRender: { value: !0 },
                },
                vertexShader: ee,
                fragmentShader: Fr,
              })
            : new L({
                uniforms: {
                  initialWaterHeight: { value: n.waterHeight },
                  ballPos: { value: new C(0, n.waterHeight + 1, 0.5) },
                  ballRadius: { value: 0 },
                  waterHeights: { value: null },
                  firstRender: { value: !0 },
                },
                vertexShader: ee,
                fragmentShader: Ir,
              }),
        [t]
      ),
      _ = l.useMemo(
        () =>
          new L({
            uniforms: { bodyHeights: { value: null } },
            vertexShader: ee,
            fragmentShader: zr,
          }),
        []
      ),
      S = l.useMemo(
        () =>
          new L({
            uniforms: {
              initialWaterHeight: { value: n.waterHeight },
              prevBodyHeights: { value: null },
              newBodyHeights: { value: null },
              waterHeights: { value: null },
              firstRender: { value: !0 },
            },
            vertexShader: ee,
            fragmentShader: Lr,
          }),
        []
      ),
      P = l.useMemo(
        () =>
          new L({
            uniforms: {
              waveSpeed: { value: 2 },
              deltaTime: { value: n.dt },
              waterHeights: { value: null },
            },
            vertexShader: ee,
            fragmentShader: Br,
          }),
        []
      ),
      y = l.useMemo(
        () =>
          new L({
            uniforms: {
              deltaTime: { value: n.dt },
              waterHeights: { value: null },
            },
            vertexShader: ee,
            fragmentShader: Or,
          }),
        []
      ),
      D = l.useMemo(
        () =>
          new L({
            uniforms: {
              time: { value: 0 },
              waterHeights: { value: null },
              noiseScale: { value: t ? 40 : 20 },
            },
            vertexShader: ee,
            fragmentShader: Wr,
          }),
        [t]
      ),
      W = l.useMemo(
        () =>
          new L({
            uniforms: { waterHeights: { value: null } },
            vertexShader: ee,
            fragmentShader: Nr,
          }),
        []
      ),
      N = l.useMemo(
        () =>
          new L({
            uniforms: {
              time: { value: 0 },
              reflectionTexture: { value: null },
              distortionIntensity: { value: t ? 0.1 : 0.01 },
              includeLightBasedShading: { value: !t },
              waterHeights: { value: null },
              coneColorRampWeight: { value: t ? 0.4 : 0.65 },
              baseColorRampWithinConeWeight: { value: t ? 1 : 0.63 },
              colorRampColor1Pos: { value: t ? 0.3 : 0 },
              colorRampColor2Pos: { value: t ? 1 : 0.5 },
              coneHorizontalEdgeSoftness: { value: t ? 1 : 0.5 },
              coneBottomWidth: { value: t ? 0.3 : 0.15 },
              coneTopWidth: { value: t ? 0.3 : 0.15 },
              skyDepth: { value: t ? -100 : o.z },
            },
            vertexShader: Yr,
            fragmentShader: Gr,
            transparent: !0,
          }),
        [t, o]
      ),
      K = l.useRef(!1);
    return (
      $((H, z) => {
        const { gl: w } = H,
          { scrollProgress: Z } = $e.getState();
        if (Z > 0.1 && K.current) return;
        (K.current = !0),
          (n.dt = Math.min(1 / 30, 2 * z)),
          (n.waveSpeed = Math.min(n.waveSpeed, (0.5 * n.waterSpacing) / n.dt)),
          (P.uniforms.waveSpeed.value = n.waveSpeed),
          (P.uniforms.deltaTime.value = n.dt),
          (y.uniforms.deltaTime.value = n.dt),
          (D.uniforms.time.value = H.clock.elapsedTime),
          (N.uniforms.time.value = H.clock.elapsedTime),
          u.current &&
            ((u.current.material = T),
            (T.uniforms.waterHeights.value = A.current.texture)),
          w.setRenderTarget(g.current),
          w.render(r, i),
          w.setRenderTarget(null),
          (T.uniforms.firstRender.value = !1);
        const b = 1;
        for (let k = 0; k < b; k++)
          u.current &&
            ((u.current.material = _),
            (_.uniforms.bodyHeights.value = g.current.texture)),
            w.setRenderTarget(p.current),
            w.render(r, i),
            w.setRenderTarget(null),
            u.current && (_.uniforms.bodyHeights.value = p.current.texture),
            w.setRenderTarget(g.current),
            w.render(r, i),
            w.setRenderTarget(null);
        u.current &&
          ((u.current.material = S),
          (S.uniforms.prevBodyHeights.value = V.current.texture),
          (S.uniforms.newBodyHeights.value = g.current.texture),
          (S.uniforms.waterHeights.value = A.current.texture)),
          w.setRenderTarget(p.current),
          w.render(r, i),
          w.setRenderTarget(null),
          (S.uniforms.firstRender.value = !1);
        const R = V.current;
        (V.current = g.current),
          (g.current = R),
          u.current &&
            ((u.current.material = P),
            (P.uniforms.waterHeights.value = p.current.texture)),
          w.setRenderTarget(g.current),
          w.render(r, i),
          w.setRenderTarget(null),
          u.current &&
            ((u.current.material = y),
            (y.uniforms.waterHeights.value = g.current.texture)),
          w.setRenderTarget(p.current),
          w.render(r, i),
          w.setRenderTarget(null),
          u.current &&
            ((u.current.material = D),
            (D.uniforms.waterHeights.value = p.current.texture)),
          w.setRenderTarget(g.current),
          w.render(r, i),
          w.setRenderTarget(null),
          u.current &&
            ((u.current.material = W),
            (W.uniforms.waterHeights.value = g.current.texture)),
          w.setRenderTarget(A.current),
          w.render(r, i),
          w.setRenderTarget(null);
        const j = A.current;
        (A.current = p.current),
          (p.current = j),
          (N.uniforms.waterHeights.value = p.current.texture);
      }),
      l.useImperativeHandle(e, () => ({
        updateCursorInteractorPositionAndRadius(H, z) {
          T.uniforms.ballPos.value.copy(H), (T.uniforms.ballRadius.value = z);
        },
        updateFloatieInteractorPositionsAndRadii(H, z) {
          T.uniforms.ballPos0.value.copy(H[0]),
            T.uniforms.ballPos1.value.copy(H[1]),
            T.uniforms.ballPos2.value.copy(H[2]),
            (T.uniforms.ballRadius0.value = z[0]),
            (T.uniforms.ballRadius1.value = z[1]),
            (T.uniforms.ballRadius2.value = z[2]);
        },
        getWaterMaterial() {
          return N;
        },
      })),
      s.jsxs(s.Fragment, {
        children: [
          Ue(
            s.jsx("mesh", {
              ref: u,
              material: T,
              children: s.jsxs("bufferGeometry", {
                children: [
                  s.jsx("bufferAttribute", {
                    attach: "attributes-position",
                    count: a.length / 3,
                    array: a,
                    itemSize: 3,
                  }),
                  s.jsx("bufferAttribute", {
                    attach: "attributes-uv",
                    count: c.length / 2,
                    array: c,
                    itemSize: 2,
                  }),
                ],
              }),
            }),
            r
          ),
          s.jsx("mesh", { geometry: f, material: N, renderOrder: Qe.water }),
        ],
      })
    );
  });
Jt.displayName = "Water";
function Kr({ physicsScene: n, waterRef: e }) {
  const { in404Mode: t } = O(),
    o = l.useMemo(() => new C(0, n.waterHeight + 1, 0.5), [n.waterHeight]),
    r = l.useRef(0.1),
    i = l.useRef(1.07),
    a = l.useRef(null),
    { controls: c } = te(),
    u = l.useRef(!1),
    f = l.useRef(new Xe(new C(0, 1, 0), -n.waterHeight)),
    h = l.useRef(new C()),
    d = l.useRef(new C()),
    m = l.useRef(new C()),
    v = l.useRef(new C()),
    g = l.useRef(!0),
    [p, V] = Ze(
      () => ({
        from: { progress: 0 },
        config: { easing: At.linear, duration: 100 },
        delay: 150,
        onStart: () => {
          a.current && a.current.position.set(0, n.waterHeight + 1, 1.75),
            (g.current = !0);
        },
        onChange: () => {
          a.current &&
            (g.current
              ? ((a.current.position.y = 1), (g.current = !1))
              : (a.current.position.y = n.waterHeight + 1));
        },
        onRest: () => {
          a.current && a.current.position.copy(o);
        },
      }),
      []
    );
  l.useEffect(() => {
    t || V.start({ to: { progress: 1 } });
  }, [t, V]);
  const A = l.useCallback(
      (S) => {
        if ((S.stopPropagation(), p.progress.isAnimating)) return;
        c && (c.enabled = !1),
          (u.current = !0),
          S.ray.intersectPlane(f.current, d.current);
        const P = [d.current.x, i.current, d.current.z];
        h.current.copy(d.current),
          m.current.set(...P),
          a.current && a.current.position.set(...P);
      },
      [c, p]
    ),
    T = l.useCallback(
      (S) => {
        S.stopPropagation(),
          !(!u.current || p.progress.isAnimating) &&
            S.ray.intersectPlane(f.current, d.current) &&
            (v.current.copy(d.current).sub(h.current),
            a.current && a.current.position.copy(m.current).add(v.current));
      },
      [p]
    ),
    _ = l.useCallback(
      (S) => {
        S.stopPropagation(),
          !(!u.current || p.progress.isAnimating) &&
            (c && (c.enabled = !0),
            a.current && a.current.position.copy(o),
            (u.current = !1));
      },
      [c, o, p]
    );
  return (
    $(() => {
      !e.current ||
        !a.current ||
        e.current.updateCursorInteractorPositionAndRadius(
          a.current.position,
          r.current
        );
    }, 0),
    s.jsxs(s.Fragment, {
      children: [
        s.jsxs("mesh", {
          ref: a,
          position: o,
          visible: !1,
          children: [
            s.jsx("sphereGeometry", { args: [r.current, 32, 16] }),
            s.jsx("meshBasicMaterial", { color: "red" }),
          ],
        }),
        s.jsxs("mesh", {
          position: [
            n.waterSpacing * -0.5,
            n.waterHeight,
            n.waterSpacing * -0.5,
          ],
          "rotation-x": -Math.PI / 2,
          visible: !1,
          onPointerEnter: A,
          onPointerMove: T,
          onPointerLeave: _,
          children: [
            s.jsx("planeGeometry", {
              args: [n.simulationDimensions.x, n.simulationDimensions.z],
            }),
            s.jsx("meshBasicMaterial", { color: "red" }),
          ],
        }),
      ],
    })
  );
}
const Xr = `varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = vec4(position, 1.0);
}
`,
  Zr = `uniform sampler2D uParticleState;
uniform sampler2D uInitialState;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform float uDeltaTime;
uniform float uDamping;
uniform float uInteractionRadius;
uniform float uAspectRatio;

varying vec2 vUv;

const float springConstant = 11.0;
const float damping = 8.0;
const float maxVelocity = 1.7;
const float pushStrength = 30.0;

void main() {
  // Position is stored in the RG channels
  // Velocity is stored in the BA channels
  vec4 particleData = texture2D(uParticleState, vUv);
  vec2 pos = particleData.rg;
  vec2 velocity = particleData.ba;
  vec2 originalPos = texture2D(uInitialState, vUv).rg;
  float distToOriginal = distance(pos.xy, originalPos.xy);
  
  // Mouse interaction
  // The * 2.0 makes the brush a bit squashed in y direction so its not a circular brush
  vec2 mousePos = vec2(uMouse.x, uMouse.y * uAspectRatio * 2.0);
  vec2 dirToMouse = vec2(pos.x, pos.y * uAspectRatio * 2.0) - mousePos;
  float distToMouse = length(dirToMouse);
  
  float mouseSpeed = length(uMouseVelocity);
  
  // Calculate combined push force
  vec2 totalForce = vec2(0.0);
  if(distToMouse < uInteractionRadius) {
    float falloff = smoothstep(0.0, 1.0, 1.0 - distToMouse/uInteractionRadius);
    
    // Push force in direction of mouse velocity
    // Only apply push force when mouse is actually moving
    vec2 pushForce = vec2(0.0);
    if(mouseSpeed > 0.001) {
      pushForce = normalize(uMouseVelocity) * mouseSpeed * pushStrength * falloff;
    }
    
    totalForce = pushForce;
  }

  vec2 springForce = (originalPos - pos) * springConstant;
  
  // Combine forces
  vec2 acceleration = totalForce + springForce;
  
  // Apply exponential damping (framerate independent)
  float dampingFactor = exp(-damping * uDeltaTime);
  vec2 newVelocity = velocity * dampingFactor + acceleration * uDeltaTime;
  
  if(length(newVelocity) > maxVelocity) {
    newVelocity = normalize(newVelocity) * maxVelocity;
  }
  
  vec2 newPos = pos + newVelocity * uDeltaTime;

  if (distToOriginal < 0.05 && length(newVelocity) < 0.05) {
    newPos = mix(pos, originalPos, 0.1);
    newVelocity = vec2(0.0);
  }
  
  // Store the new position in RG and velocity in BA
  gl_FragColor = vec4(newPos, newVelocity);
}
`,
  qr = `uniform sampler2D uPositions;
uniform sampler2D uInitialState;
uniform float uTime;

const float pointSize = 5.0;

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;
  vec3 initialPos = texture2D(uInitialState, position.xy).xyz;
  
  float dist = distance(pos.xy, initialPos.xy);
  
  // Scale point size based on distance so that the blobs are more apparent the further they are
  float sizeMultiplier = 1.0 + dist * 6.0;

  gl_Position = vec4(pos.xy, 0.0, 1.0);

  gl_PointSize = pointSize * sizeMultiplier;
}
`,
  $r = `uniform sampler2D uMap;

void main() {
  vec2 uv = gl_PointCoord;
  
  // Calculate distance from center (0.5, 0.5)
  float dist = distance(uv, vec2(0.5));
  
  if(dist > 0.5) {
    discard;
  }

  gl_FragColor = vec4(1.0);
}
`,
  Qr = `varying vec2 vUv;

void main() {
  vUv = uv;

  // No perspective transform so it's always looking head on
  gl_Position = modelMatrix * vec4(position, 1.0);
}
`,
  Jr = `varying vec2 vUv;
uniform sampler2D uBlurredTexture;
uniform sampler2D uMatcap;
uniform float uOpacity;
uniform float uIntroProgress;

const float matcapRotation = 3.1459;
const float threshold = 0.36;
const float cutoff = 0.6;
const float strength = 4.3;
const float offsetStrength = 0.008;

// Helper function to sample with threshold
float sampleWithThreshold(vec2 uv) {
  float value = texture2D(uBlurredTexture, uv).r;
  return value > threshold ? value : 0.0;
}

// Multi-step sampling for smoother normals
// This loop won't run for any fragments outside the blur
const int STEPS = 15;

void main() {
  // Get the center sample and apply threshold
  float normalSample = sampleWithThreshold(vUv);
  
  // Skip transparent pixels
  if (normalSample <= cutoff || uOpacity <= 0.0) {
    discard;
    return;
  }
  
  float stepSize = offsetStrength / float(STEPS);
  
  float sumDx = 0.0;
  float sumDy = 0.0;
  float weight = 0.0;
  float totalWeight = 0.0;
  
  for (int i = 1; i <= STEPS; i++) {
    float offset = float(i) * stepSize;
    weight = 1.0 - float(i) / float(STEPS); // Decreasing weight for farther samples
    
    // Sample in 4 directions
    float left = sampleWithThreshold(vec2(vUv.x - offset, vUv.y));
    float right = sampleWithThreshold(vec2(vUv.x + offset, vUv.y));
    float top = sampleWithThreshold(vec2(vUv.x, vUv.y - offset));
    float bottom = sampleWithThreshold(vec2(vUv.x, vUv.y + offset));
    
    // Calculate and accumulate weighted gradients
    sumDx += (right - left) * weight;
    sumDy += (bottom - top) * weight;
    totalWeight += weight;
  }
  
  // Normalize by total weight
  float dx = totalWeight > 0.0 ? sumDx / totalWeight : 0.0;
  float dy = totalWeight > 0.0 ? sumDy / totalWeight : 0.0;
  
  // Create normal
  vec3 normal = normalize(vec3(-dx * strength, -dy * strength, 1.0));
  
  // Sample matcap texture with rotation
  vec2 matcapUV = normal.xy * 0.5 + 0.5;

  float rotationOffset = 0.0;
  if (uIntroProgress > 0.2) {
    float rotationMask = clamp(vUv.x + 0.55 - uIntroProgress, 0.0, 1.0) * 2.0;
    rotationOffset = (1.0 - uIntroProgress) * 5.0 * rotationMask;
  }
 
  // Apply rotation to matcap UV
  float s = sin(matcapRotation + rotationOffset);
  float c = cos(matcapRotation + rotationOffset);
  vec2 matcapCenter = vec2(0.5, 0.5);
  vec2 rotatedUV = matcapCenter + mat2(c, -s, s, c) * (matcapUV - matcapCenter);
  
  vec3 matcapColor = texture2D(uMatcap, rotatedUV).rgb;
  
  vec3 color = matcapColor;

  float bloomBrightness = 65.0 * uIntroProgress;
  float bloomMask = clamp(vUv.x + 0.2 - uIntroProgress, 0.0, 1.0);
  float bloomFactor = bloomBrightness * bloomMask * bloomMask;

  gl_FragColor = vec4(color * 0.95 + vec3(5.0, 5.0, 12.0) * bloomFactor, normalSample * uOpacity);
}
`,
  es = (n, e) => {
    const t = new Float32Array(e * 4),
      o = document.createElement("canvas"),
      r = o.getContext("2d");
    if (!r)
      throw new Error("Could not extract particle positions from texture");
    (o.width = n.image.width),
      (o.height = n.image.height),
      r.drawImage(n.image, 0, 0);
    const i = r.getImageData(0, 0, o.width, o.height).data,
      a = 200;
    let c = 0;
    const u = e;
    for (let f = 0; f < o.height; f++)
      for (let h = 0; h < o.width; h++) {
        const d = (f * o.width + h) * 4;
        if (i[d] > a && c < u) {
          const m = c * 4,
            v = (h / o.width) * 2 - 1,
            g = -((f / o.height) * 2 - 1);
          (t[m + 0] = v), (t[m + 1] = g), (t[m + 2] = 0), (t[m + 3] = 0), c++;
        }
      }
    for (let f = c; f < e; f++) {
      const h = f * 4;
      (t[h + 0] = 0), (t[h + 1] = 0), (t[h + 2] = 0), (t[h + 3] = 0);
    }
    return t;
  },
  en =
    "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/matcap_512.png?v=1747669628",
  ts =
    "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/chrome-title-positions-3.png?v=1746487661",
  ns = () => {
    const n = xe((b) => b.isTouchDevice),
      e = wn(ts),
      t = le(en),
      o = 1340 * 2,
      r = 584 * 2,
      i = 2.58,
      a = 256,
      c = 128,
      u = oe(a, c, {
        minFilter: Y,
        magFilter: Y,
        format: se,
        stencilBuffer: !1,
        type: re,
      }),
      f = oe(a, c, {
        minFilter: Y,
        magFilter: Y,
        format: se,
        stencilBuffer: !1,
        type: re,
      }),
      h = l.useRef(null),
      d = l.useRef(u),
      m = l.useRef(f),
      v = l.useMemo(() => {
        const b = es(e, a * c),
          R = new yn(b, a, c, se, re);
        return (R.needsUpdate = !0), R;
      }, [e, a, c]),
      g = l.useMemo(
        () =>
          new L({
            uniforms: {
              uParticleState: { value: v },
              uInitialState: { value: v },
              uMouse: { value: new ve() },
              uMouseVelocity: { value: new ve() },
              uDeltaTime: { value: 0 },
              uInteractionRadius: { value: n ? 0.075 : 0.065 },
              uAspectRatio: { value: r / o },
            },
            vertexShader: Xr,
            fragmentShader: Zr,
          }),
        [e, n, a, c, v, r, o]
      ),
      p = l.useMemo(() => new Ut(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1), []),
      V = l.useMemo(() => {
        const b = a * c,
          R = new Float32Array(b * 3);
        for (let j = 0; j < b; j++) {
          const k = j * 3;
          (R[k + 0] = (j % a) / a), (R[k + 1] = Math.floor(j / a) / c);
        }
        return R;
      }, [a, c]),
      A = l.useRef(),
      T = l.useRef(new je()),
      _ = l.useRef(new je()),
      S = l.useMemo(
        () =>
          new L({
            uniforms: {
              uPositions: { value: null },
              uInitialState: { value: null },
            },
            transparent: !1,
            vertexShader: qr,
            fragmentShader: $r,
            depthTest: !1,
          }),
        []
      ),
      { gl: P, size: y } = te(),
      { composer: D } = l.useMemo(() => {
        const b = new bn(P, {
          multisampling: 0,
          depthBuffer: !1,
          stencilBuffer: !1,
        });
        b.autoRenderToScreen = !1;
        const R = 2 / Math.max(0.5, P.getPixelRatio());
        b.setSize(o * R, r * R),
          b.inputBuffer.dispose(),
          b.outputBuffer.dispose(),
          (b.inputBuffer = new nt(o, r, {
            minFilter: Me,
            magFilter: Me,
            format: ot,
            stencilBuffer: !1,
            depthBuffer: !1,
          })),
          (b.outputBuffer = new nt(o, r, {
            minFilter: Me,
            magFilter: Me,
            format: ot,
            stencilBuffer: !1,
            depthBuffer: !1,
          }));
        const j = new _n(_.current),
          k = new Cn({ kernelSize: 4, resolutionScale: 0.25 });
        return (
          b.addPass(j),
          b.addPass(k),
          P.setSize(y.width, y.height),
          { composer: b, blurPass: k }
        );
      }, [P]),
      W = l.useMemo(
        () =>
          new L({
            uniforms: {
              uBlurredTexture: { value: D.outputBuffer.texture },
              uOpacity: { value: 1 },
              uMatcap: { value: t },
              uIntroProgress: { value: 0 },
            },
            vertexShader: Qr,
            fragmentShader: Jr,
            depthTest: !1,
            transparent: !0,
          }),
        [D, t]
      ),
      [N, K] = Ze(() => ({
        from: { progress: 0 },
        config: { duration: 2900, easing: At.easeOutQuad },
        delay: 150,
        onChange: () => {
          const b = N.progress.get();
          W.uniforms.uIntroProgress.value = b;
        },
        onRest: () => {
          Yt.getState().setIsIntroPlaying(!1);
        },
      }));
    l.useEffect(() => {
      K.start({ to: { progress: 1 } });
    }, [K]);
    const [H, z] = l.useState(1),
      [w, Z] = l.useState(0);
    return (
      l.useEffect(() => {
        const R = Math.min(1200, y.width),
          j = y.width / y.height;
        let k = R / y.width;
        j > 1
          ? (y.height < 500
              ? (k *= 0.35)
              : y.height < 600
              ? (k *= 0.5)
              : y.height < 700
              ? (k *= 0.6)
              : y.height < 800
              ? (k *= 0.65)
              : y.height < 900
              ? (k *= 0.7)
              : y.height < 1100
              ? (k *= 0.85)
              : y.height < 1200 && (k *= 0.9),
            Z(1 - 2 * 0.434))
          : Z(1 - 2 * 0.345),
          z(k);
      }, [y.width, y.height]),
      $((b, R) => {
        const { gl: j } = b,
          k = 1 - Sn($e.getState().scrollProgress, 0, 0.3);
        if (((W.uniforms.uOpacity.value = k), k <= 0)) return;
        const Fe = d.current;
        (d.current = m.current),
          (m.current = Fe),
          j.setRenderTarget(m.current),
          j.render(T.current, p),
          j.setRenderTarget(null),
          (S.uniforms.uPositions.value = m.current.texture),
          (S.uniforms.uInitialState.value = v),
          (g.uniforms.uParticleState.value = m.current.texture),
          (g.uniforms.uDeltaTime.value = Math.min(R, 0.3));
        const ue = Nt.getState(),
          Ce = y.height / y.width,
          Se = {
            x: (ue.pointerPosition.x / y.width) * 2 - 1,
            y: ((ue.pointerPosition.y - b.viewport.top) / y.height) * 2 - 1,
          },
          ze = Se.x / (H * i),
          x = ((-(Se.y + w) / H) * Ce) / (i * (r / o));
        (g.uniforms.uMouse.value.x = ze),
          (g.uniforms.uMouse.value.y = x),
          (g.uniforms.uMouseVelocity.value.x = ue.pointerVelocity.x * Ce * 0.5),
          (g.uniforms.uMouseVelocity.value.y =
            ue.pointerVelocity.y * (n ? 2.5 : 1.5)),
          D == null || D.render();
      }),
      s.jsxs(s.Fragment, {
        children: [
          Ue(
            s.jsxs("mesh", {
              children: [
                s.jsx("primitive", { ref: A, object: g }),
                s.jsx("planeGeometry", { args: [2, 2] }),
              ],
            }),
            T.current
          ),
          Ue(
            s.jsxs("points", {
              position: [0, 1, -1],
              children: [
                s.jsx("primitive", { object: S }),
                s.jsx("bufferGeometry", {
                  children: s.jsx("bufferAttribute", {
                    attach: "attributes-position",
                    count: V.length / 3,
                    array: V,
                    itemSize: 3,
                  }),
                }),
              ],
            }),
            _.current
          ),
          s.jsx("group", {
            position: [0, w, 0],
            scale: [H, H * (y.width / y.height), H],
            children: s.jsxs("mesh", {
              scale: [i, i, 1],
              renderOrder: Qe.logo,
              frustumCulled: !1,
              ref: h,
              children: [
                s.jsx("primitive", { object: W }),
                s.jsx("planeGeometry", { args: [2, 2 * (r / o)] }),
              ],
            }),
          }),
        ],
      })
    );
  };
for (const n of [en]) le.preload(n);
const os = () => {
    const n = te((o) => o.camera),
      { cameraFOVY: e } = O(),
      t = l.useCallback(() => {
        (n.fov = vr(window.innerWidth, window.innerHeight, e)),
          n.updateProjectionMatrix();
      }, [n, e]);
    return (
      l.useEffect(
        () => (
          t(),
          window.addEventListener("resize", t),
          () => {
            window.removeEventListener("resize", t);
          }
        ),
        [t]
      ),
      null
    );
  },
  rs = `uniform float uProgress;
uniform float uTime;
uniform sampler2D inputBuffer;
uniform sampler2D noiseTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    // Calculate fade edge first since we'll use it for distortion
    float fadeEdge = uProgress;
    float thickness = 0.2 + uProgress * 0.5;

    // Calculate how far the distortion should reach - gradually moves up with progress
    float distortionEdge = fadeEdge + uProgress * 2.0;

    // Calculate distortion amount based on y position
    // More distortion at the bottom, less at the top
    float distortionFactor = smoothstep(distortionEdge, fadeEdge - thickness, vUv.y);

    float scale = mix(0.5, 2., distortionFactor);
    vec2 noiseUV = vUv * scale;

    // Animate the noise by offsetting the UVs based on time and ensure wrapping
    noiseUV.x = fract(noiseUV.x + uTime * 0.05);
    noiseUV.y = fract(noiseUV.y + uTime * 0.08);

    // Sample the noise texture
    vec4 noise = texture2D(noiseTexture, noiseUV);

    // Apply the noise as displacement, stronger at the bottom
    float distortionStrength = mix(0.08, 0.15, uProgress) * distortionFactor;

    // Ensure the distorted coordinates stay within range
    vec2 distortedUV = uv;
    distortedUV.x += (noise.r * 2.0 - 1.0) * distortionStrength;
    distortedUV.y += (noise.g * 2.0 - 1.0) * distortionStrength;

    // Clamp the coordinates to prevent sampling outside texture bounds
    distortedUV = clamp(distortedUV, 0.0, 1.0);

    vec3 color = texture2D(inputBuffer, distortedUV).rgb;

    // Calculate alpha for the fade effect
    float t = smoothstep(fadeEdge - thickness, fadeEdge + 0.1, vUv.y);
    float alpha = pow(t, 3.0) * (1.0 - uProgress);

    gl_FragColor = vec4(color, alpha);
}
`,
  ss = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  tn =
    "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/noise_128.png?v=1747670427";
class is extends Pn {
  constructor(t) {
    const o = new Te(0),
      r = new Te(0),
      i = new L({
        vertexShader: ss,
        fragmentShader: rs,
        uniforms: {
          uProgress: o,
          inputBuffer: new Te(null),
          uTime: r,
          noiseTexture: new Te(t),
        },
        transparent: !0,
      });
    super(i);
    B(this, "progressUniform");
    B(this, "timeUniform");
    (this.progressUniform = o), (this.timeUniform = r);
  }
  setProgress(t) {
    this.progressUniform.value = t;
  }
  setTime(t) {
    this.timeUniform.value = t;
  }
}
const as = l.forwardRef(function (e, t) {
  const o = le(tn);
  o.generateMipmaps = !1;
  const r = l.useMemo(() => new is(o), [o]);
  return (
    $(({ clock: i }) => {
      r.setTime(i.elapsedTime);
    }),
    s.jsx("primitive", { ref: t, object: r })
  );
});
le.preload(tn);
const ls = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  cs = `varying vec2 vUv;

uniform float time;
uniform sampler2D polarisStarCenterTexture;
uniform sampler2D polarisStarFlareTexture;
const float centerScale = 5.0;
const vec3 innerColor = vec3(1.0, 1.0, 1.0);
const vec3 outerColor = vec3(0.42353546482977045, 0.1254952949627403, 0.42353546482977045);
const float mixEdge0 = 0.0;
const float mixEdge1 = 0.2;
const float colorMultiplier = 1.0;
const float twinkleSpeed = 3.0;
const float twinkleRadius = 0.75;

void main() {
  vec2 aspectRatioCorrectedUVs = vUv - 0.5;
  aspectRatioCorrectedUVs = vec2(aspectRatioCorrectedUVs.x, aspectRatioCorrectedUVs.y * (124.0 / 84.0)) * centerScale;
  aspectRatioCorrectedUVs += 0.5;
  vec4 polarisStarCenter = texture2D(polarisStarCenterTexture, aspectRatioCorrectedUVs);
  vec4 polarisStarFlare = texture2D(polarisStarFlareTexture, vUv);

  vec2 centeredUV = vUv - 0.5;
  centeredUV = vec2(centeredUV.x, centeredUV.y * (124.0 / 84.0));
  float radius = length(centeredUV);
  float mixFactor = smoothstep(mixEdge0, mixEdge1, radius);
  vec3 color = mix(innerColor, outerColor, mixFactor);
  // Twinkle
  color = mix(color, color * (twinkleRadius - radius), sin(time * twinkleSpeed) * .5 + .5);

  gl_FragColor.rgb = (polarisStarCenter.rgb + polarisStarFlare.rgb) * 0.1 + color * colorMultiplier;
  gl_FragColor.a = polarisStarCenter.a + polarisStarFlare.a;
}
`,
  nn =
    "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/2x_Star_Center.png?v=1743005079",
  on =
    "https://cdn.shopify.com/s/files/1/0921/8919/6588/files/2x_Star_Shards.png?v=1743005070";
function us() {
  const { skyPosition: n } = O(),
    [e, t] = le([nn, on]),
    o = l.useMemo(
      () =>
        new L({
          uniforms: {
            time: { value: 0 },
            polarisStarCenterTexture: { value: e },
            polarisStarFlareTexture: { value: t },
          },
          vertexShader: ls,
          fragmentShader: cs,
          toneMapped: !1,
          transparent: !0,
        }),
      [e, t]
    ),
    r = l.useRef(null),
    i = l.useRef(!1),
    a = l.useRef(1),
    c = l.useMemo(() => new C(0, 0, 1), []),
    u = te((p) => p.gl),
    [f, h] = Ze(() => ({
      from: { progress: 0 },
      config: { mass: 1, tension: 30, friction: 14 },
      precision: 1e-4,
      onStart: () => {
        i.current = !0;
      },
      onChange: () => {
        if (!r.current) return;
        const p = f.progress.get();
        r.current.quaternion.setFromAxisAngle(c, p * Math.PI * -2);
      },
      onRest: () => {
        (a.current = 1), (i.current = !1);
      },
    })),
    d = (p) => {
      p.stopPropagation(),
        (u.domElement.style.cursor = "pointer"),
        i.current
          ? f.progress.get() >= a.current - 0.5 &&
            ((a.current += 1), h.start({ to: { progress: a.current } }))
          : h.start({ from: { progress: 0 }, to: { progress: 1 } });
    },
    m = (p) => {
      p.stopPropagation(), (u.domElement.style.cursor = "auto");
    };
  $((p) => {
    o.uniforms.time.value = p.clock.getElapsedTime();
  });
  const { heroContent: v } = cn(),
    g = un();
  return s.jsx(s.Fragment, {
    children: s.jsxs("mesh", {
      ref: r,
      position: [1.06, 2.875, n.z + 0.01],
      scale: 0.125,
      material: o,
      children: [
        s.jsx("planeGeometry", { args: [1, 1 * (124 / 84)] }),
        s.jsxs("mesh", {
          onPointerOver: d,
          onPointerOut: m,
          onClick: () => {
            v.polarisStarLink && g(v.polarisStarLink);
          },
          scale: 0.75,
          visible: !1,
          children: [
            s.jsx("planeGeometry", { args: [1, 1] }),
            s.jsx("meshBasicMaterial", { color: "red", wireframe: !0 }),
          ],
        }),
      ],
    }),
  });
}
for (const n of [nn, on]) le.preload(n);
const fs = () => {
    const { camera: n, size: e } = te(),
      { cameraPosition: t, cameraPitch: o } = O();
    return (
      l.useEffect(() => {
        e.width < 500
          ? (n.position.set(t.x, t.y + cr, t.z), n.rotation.set(o * lr, 0, 0))
          : (n.position.set(t.x, t.y, t.z), n.rotation.set(o, 0, 0));
      }, [e.width]),
      s.jsx(s.Fragment, {})
    );
  },
  ws = () => {
    const { in404Mode: n } = O(),
      e = l.useRef(null),
      t = l.useMemo(() => {
        const i = { x: 5.1001, z: 5.1001 },
          a = 0.02,
          c = Math.floor(i.x / a) + 1,
          u = Math.floor(i.z / a) + 1;
        return {
          dt: 1 / 30,
          simulationDimensions: i,
          waterSpacing: a,
          numX: c,
          numZ: u,
          waterHeight: _e.water.height,
          waveSpeed: 2,
          alpha: 0.4,
        };
      }, []),
      o = l.useRef(null),
      r = l.useRef(null);
    return (
      l.useEffect(() => {
        const i = $e.subscribe(
          (a) => a.scrollProgress,
          (a) => {
            var c;
            (c = r.current) == null || c.setProgress(a);
          },
          { fireImmediately: !0 }
        );
        return () => {
          i();
        };
      }, [r]),
      l.useEffect(
        () =>
          Yt.subscribe(
            (i) => i.isIntroPlaying,
            (i) => {
              !i &&
                e.current &&
                e.current.passes.length === 3 &&
                e.current.passes[1].setEnabled(!1);
            },
            { fireImmediately: !0 }
          ),
        [r]
      ),
      s.jsxs("group", {
        children: [
          !n && s.jsx(fs, {}),
          s.jsx(Dr, { physicsScene: t, waterRef: o }),
          !n && s.jsx(us, {}),
          !n && s.jsx(ns, {}),
          s.jsx(Kr, { physicsScene: t, waterRef: o }),
          s.jsx(Jt, { ref: o, physicsScene: t }),
          s.jsx(os, {}),
          !n &&
            s.jsxs(Mn, {
              ref: e,
              multisampling: 0,
              stencilBuffer: !1,
              depthBuffer: !0,
              children: [
                s.jsx(Tn, {
                  luminanceThreshold: 1,
                  luminanceSmoothing: 0,
                  intensity: 1,
                  kernelSize: 1,
                  mipmapBlur: !0,
                  radius: 0.7,
                  levels: 8,
                  blendFunction: Rn.SCREEN,
                }),
                s.jsx(as, { ref: r }),
              ],
            }),
        ],
      })
    );
  };
export {
  Re as A,
  xs as B,
  ws as E,
  nr as I,
  Nt as a,
  vs as b,
  Mt as c,
  $e as d,
  Yt as e,
  O as u,
};
//# sourceMappingURL=Experience-BZ9i1Sp1.js.map
