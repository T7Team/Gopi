jQuery(document).ready(function (e) {
    if (e('a[href="#search"]').on("click", function (n) {
        e("#search").addClass("open"), e('#search > form > input[type="search"]').focus()
      }), e("#search, #search button.modal-close").on("click keyup", function (n) {
        n.target != this && "modal-close" != n.target.className && 27 != n.keyCode || e(this).removeClass("open")
      }), e('a[href="#mobile-menu"]').on("click", function (n) {
        e("#mobile-menu").addClass("open")
      }), e("#mobile-menu, #mobile-menu button.modal-close").on("click keyup", function (n) {
        n.target != this && "modal-close" != n.target.className && 27 != n.keyCode || e(this).removeClass("open")
      }), e("[placeholder]").focus(function () {
        var n = e(this);
        n.val() == n.attr("placeholder") && (n.val(""), n.removeClass("placeholder"))
      }).blur(function () {
        var n = e(this);
        "" != n.val() && n.val() != n.attr("placeholder") || (n.addClass("placeholder"), n.val(n.attr("placeholder")))
      }).blur(), e("#back-to-top").length) {
      var n = 100,
        t = function () {
          var t = e(window).scrollTop();
          t > n ? e("#back-to-top").addClass("show") : e("#back-to-top").removeClass("show")
        };
      t(), e(window).on("scroll", function () {
        t()
      }), e("#back-to-top").on("click", function (n) {
        n.preventDefault(), e("html,body").animate({
          scrollTop: 0
        }, 700)
      })
    }
  }),
  function (e, n) {
    "function" == typeof define && define.amd ? define(n) : "object" == typeof exports ? module.exports = n() : e.NProgress = n()
  }(this, function () {
    function e(e, n, t) {
      return e < n ? n : e > t ? t : e
    }

    function n(e) {
      return 100 * (-1 + e)
    }

    function t(e, t, r) {
      var o;
      return o = "translate3d" === u.positionUsing ? {
        transform: "translate3d(" + n(e) + "%,0,0)"
      } : "translate" === u.positionUsing ? {
        transform: "translate(" + n(e) + "%,0)"
      } : {
        "margin-left": n(e) + "%"
      }, o.transition = "all " + t + "ms " + r, o
    }

    function r(e, n) {
      var t = "string" == typeof e ? e : i(e);
      return t.indexOf(" " + n + " ") >= 0
    }

    function o(e, n) {
      var t = i(e),
        o = t + n;
      r(t, n) || (e.className = o.substring(1))
    }

    function s(e, n) {
      var t, o = i(e);
      r(e, n) && (t = o.replace(" " + n + " ", " "), e.className = t.substring(1, t.length - 1))
    }

    function i(e) {
      return (" " + (e && e.className || "") + " ").replace(/\s+/gi, " ")
    }

    function a(e) {
      e && e.parentNode && e.parentNode.removeChild(e)
    }
    var c = {};
    c.version = "0.2.0";
    var u = c.settings = {
      minimum: .08,
      easing: "linear",
      positionUsing: "",
      speed: 350,
      trickle: !0,
      trickleSpeed: 250,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"></div>'
    };
    c.configure = function (e) {
        var n, t;
        for (n in e) t = e[n], void 0 !== t && e.hasOwnProperty(n) && (u[n] = t);
        return this
      }, c.status = null, c.set = function (n) {
        var r = c.isStarted();
        n = e(n, u.minimum, 1), c.status = 1 === n ? null : n;
        var o = c.render(!r),
          s = o.querySelector(u.barSelector),
          i = u.speed,
          a = u.easing;
        return o.offsetWidth, l(function (e) {
          "" === u.positionUsing && (u.positionUsing = c.getPositioningCSS()), d(s, t(n, i, a)), 1 === n ? (d(o, {
            transition: "none",
            opacity: 1
          }), o.offsetWidth, setTimeout(function () {
            d(o, {
              transition: "all " + i + "ms linear",
              opacity: 0
            }), setTimeout(function () {
              c.remove(), e()
            }, i)
          }, i)) : setTimeout(e, i)
        }), this
      }, c.isStarted = function () {
        return "number" == typeof c.status
      }, c.start = function () {
        c.status || c.set(0);
        var e = function () {
          setTimeout(function () {
            c.status && (c.trickle(), e())
          }, u.trickleSpeed)
        };
        return u.trickle && e(), this
      }, c.done = function (e) {
        return e || c.status ? c.inc(.3 + .5 * Math.random()).set(1) : this
      }, c.inc = function (n) {
        var t = c.status;
        return t ? t > 1 ? void 0 : ("number" != typeof n && (n = t >= 0 && t < .25 ? (3 * Math.random() + 3) / 100 : t >= .25 && t < .65 ? 3 * Math.random() / 100 : t >= .65 && t < .9 ? 2 * Math.random() / 100 : t >= .9 && t < .99 ? .005 : 0), t = e(t + n, 0, .994), c.set(t)) : c.start()
      }, c.trickle = function () {
        return c.inc()
      },
      function () {
        var e = 0,
          n = 0;
        c.promise = function (t) {
          return t && "resolved" !== t.state() ? (0 === n && c.start(), e++, n++, t.always(function () {
            n--, 0 === n ? (e = 0, c.done()) : c.set((e - n) / e)
          }), this) : this
        }
      }(), c.render = function (e) {
        if (c.isRendered()) return document.getElementById("nprogress");
        o(document.documentElement, "nprogress-busy");
        var t = document.createElement("div");
        t.id = "nprogress", t.innerHTML = u.template;
        var r, s = t.querySelector(u.barSelector),
          i = e ? "-100" : n(c.status || 0),
          l = document.querySelector(u.parent);
        return d(s, {
          transition: "all 0 linear",
          transform: "translate3d(" + i + "%,0,0)"
        }), u.showSpinner || (r = t.querySelector(u.spinnerSelector), r && a(r)), l != document.body && o(l, "nprogress-custom-parent"), l.appendChild(t), t
      }, c.remove = function () {
        s(document.documentElement, "nprogress-busy"), s(document.querySelector(u.parent), "nprogress-custom-parent");
        var e = document.getElementById("nprogress");
        e && a(e)
      }, c.isRendered = function () {
        return !!document.getElementById("nprogress")
      }, c.getPositioningCSS = function () {
        var e = document.body.style,
          n = "WebkitTransform" in e ? "Webkit" : "MozTransform" in e ? "Moz" : "msTransform" in e ? "ms" : "OTransform" in e ? "O" : "";
        return n + "Perspective" in e ? "translate3d" : n + "Transform" in e ? "translate" : "margin"
      };
    var l = function () {
        function e() {
          var t = n.shift();
          t && t(e)
        }
        var n = [];
        return function (t) {
          n.push(t), 1 == n.length && e()
        }
      }(),
      d = function () {
        function e(e) {
          return e.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (e, n) {
            return n.toUpperCase()
          })
        }

        function n(e) {
          var n = document.body.style;
          if (e in n) return e;
          for (var t, r = o.length, s = e.charAt(0).toUpperCase() + e.slice(1); r--;)
            if (t = o[r] + s, t in n) return t;
          return e
        }

        function t(t) {
          return t = e(t), s[t] || (s[t] = n(t))
        }

        function r(e, n, r) {
          n = t(n), e.style[n] = r
        }
        var o = ["Webkit", "O", "Moz", "ms"],
          s = {};
        return function (e, n) {
          var t, o, s = arguments;
          if (2 == s.length)
            for (t in n) o = n[t], void 0 !== o && n.hasOwnProperty(t) && r(e, t, o);
          else r(e, s[1], s[2])
        }
      }();
    return c
  });