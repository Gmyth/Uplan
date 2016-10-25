/*! Video.js v4.7.3 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
(function() {
    var b = void 0, f = !0, k = null, l = !1;
    function m() {
        return function() {};
    }
    function p(a) {
        return function() {
            return this[a];
        };
    }
    function r(a) {
        return function() {
            return a;
        };
    }
    var s;
    document.createElement("video");
    document.createElement("audio");
    document.createElement("track");
    function t(a, c, d) {
        if ("string" === typeof a) {
            0 === a.indexOf("#") && (a = a.slice(1));
            if (t.Ca[a]) return t.Ca[a];
            a = t.w(a);
        }
        if (!a || !a.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return a.player || new t.Player(a, c, d);
    }
    var videojs = window.videojs = t;
    t.Vb = "4.7";
    t.Uc = "https:" == document.location.protocol ? "https://" : "http://";
    t.options = {
        techOrder: [ "html5", "flash" ],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 0,
        playbackRates: [],
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {}
        },
        language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.Va && navigator.Va[0] || navigator.ve || navigator.language || "en",
        languages: {},
        notSupportedMessage: "No compatible source was found for this video."
    };
    "GENERATED_CDN_VSN" !== t.Vb && (videojs.options.flash.swf = t.Uc + "vjs.zencdn.net/" + t.Vb + "/video-js.swf");
    t.fd = function(a, c) {
        t.options.languages[a] = t.options.languages[a] !== b ? t.ha.Wa(t.options.languages[a], c) : c;
        return t.options.languages;
    };
    t.Ca = {};
    "function" === typeof define && define.amd ? define("lib/video", [], function() {
        return videojs;
    }) : "object" === typeof exports && "object" === typeof module && (module.exports = videojs);
    t.ra = t.CoreObject = m();
    t.ra.extend = function(a) {
        var c, d;
        a = a || {};
        c = a.init || a.i || this.prototype.init || this.prototype.i || m();
        d = function() {
            c.apply(this, arguments);
        };
        d.prototype = t.h.create(this.prototype);
        d.prototype.constructor = d;
        d.extend = t.ra.extend;
        d.create = t.ra.create;
        for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e]);
        return d;
    };
    t.ra.create = function() {
        var a = t.h.create(this.prototype);
        this.apply(a, arguments);
        return a;
    };
    t.d = function(a, c, d) {
        if (t.h.isArray(c)) return u(t.d, a, c, d);
        var e = t.getData(a);
        e.D || (e.D = {});
        e.D[c] || (e.D[c] = []);
        d.z || (d.z = t.z++);
        e.D[c].push(d);
        e.Y || (e.disabled = l, e.Y = function(c) {
            if (!e.disabled) {
                c = t.qc(c);
                var d = e.D[c.type];
                if (d) for (var d = d.slice(0), j = 0, n = d.length; j < n && !c.xc(); j++) d[j].call(a, c);
            }
        });
        1 == e.D[c].length && (a.addEventListener ? a.addEventListener(c, e.Y, l) : a.attachEvent && a.attachEvent("on" + c, e.Y));
    };
    t.p = function(a, c, d) {
        if (t.tc(a)) {
            var e = t.getData(a);
            if (e.D) {
                if (t.h.isArray(c)) return u(t.p, a, c, d);
                if (c) {
                    var g = e.D[c];
                    if (g) {
                        if (d) {
                            if (d.z) for (e = 0; e < g.length; e++) g[e].z === d.z && g.splice(e--, 1);
                        } else e.D[c] = [];
                        t.kc(a, c);
                    }
                } else for (g in e.D) c = g, e.D[c] = [], t.kc(a, c);
            }
        }
    };
    t.kc = function(a, c) {
        var d = t.getData(a);
        0 === d.D[c].length && (delete d.D[c], a.removeEventListener ? a.removeEventListener(c, d.Y, l) : a.detachEvent && a.detachEvent("on" + c, d.Y));
        t.Ib(d.D) && (delete d.D, delete d.Y, delete d.disabled);
        t.Ib(d) && t.Gc(a);
    };
    t.qc = function(a) {
        function c() {
            return f;
        }
        function d() {
            return l;
        }
        if (!a || !a.Jb) {
            var e = a || window.event;
            a = {};
            for (var g in e) "layerX" !== g && "layerY" !== g && "keyboardEvent.keyLocation" !== g && ("returnValue" == g && e.preventDefault || (a[g] = e[g]));
            a.target || (a.target = a.srcElement || document);
            a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            a.preventDefault = function() {
                e.preventDefault && e.preventDefault();
                a.returnValue = l;
                a.Bd = c;
                a.defaultPrevented = f;
            };
            a.Bd = d;
            a.defaultPrevented = l;
            a.stopPropagation = function() {
                e.stopPropagation && e.stopPropagation();
                a.cancelBubble = f;
                a.Jb = c;
            };
            a.Jb = d;
            a.stopImmediatePropagation = function() {
                e.stopImmediatePropagation && e.stopImmediatePropagation();
                a.xc = c;
                a.stopPropagation();
            };
            a.xc = d;
            if (a.clientX != k) {
                g = document.documentElement;
                var h = document.body;
                a.pageX = a.clientX + (g && g.scrollLeft || h && h.scrollLeft || 0) - (g && g.clientLeft || h && h.clientLeft || 0);
                a.pageY = a.clientY + (g && g.scrollTop || h && h.scrollTop || 0) - (g && g.clientTop || h && h.clientTop || 0);
            }
            a.which = a.charCode || a.keyCode;
            a.button != k && (a.button = a.button & 1 ? 0 : a.button & 4 ? 1 : a.button & 2 ? 2 : 0);
        }
        return a;
    };
    t.m = function(a, c) {
        var d = t.tc(a) ? t.getData(a) : {}, e = a.parentNode || a.ownerDocument;
        "string" === typeof c && (c = {
            type: c,
            target: a
        });
        c = t.qc(c);
        d.Y && d.Y.call(a, c);
        if (e && !c.Jb() && c.bubbles !== l) t.m(e, c); else if (!e && !c.defaultPrevented && (d = t.getData(c.target), 
        c.target[c.type])) {
            d.disabled = f;
            if ("function" === typeof c.target[c.type]) c.target[c.type]();
            d.disabled = l;
        }
        return !c.defaultPrevented;
    };
    t.X = function(a, c, d) {
        function e() {
            t.p(a, c, e);
            d.apply(this, arguments);
        }
        if (t.h.isArray(c)) return u(t.X, a, c, d);
        e.z = d.z = d.z || t.z++;
        t.d(a, c, e);
    };
    function u(a, c, d, e) {
        t.ic.forEach(d, function(d) {
            a(c, d, e);
        });
    }
    var v = Object.prototype.hasOwnProperty;
    t.e = function(a, c) {
        var d;
        c = c || {};
        d = document.createElement(a || "div");
        t.h.Z(c, function(a, c) {
            -1 !== a.indexOf("aria-") || "role" == a ? d.setAttribute(a, c) : d[a] = c;
        });
        return d;
    };
    t.ba = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
    };
    t.h = {};
    t.h.create = Object.create || function(a) {
        function c() {}
        c.prototype = a;
        return new c();
    };
    t.h.Z = function(a, c, d) {
        for (var e in a) v.call(a, e) && c.call(d || this, e, a[e]);
    };
    t.h.A = function(a, c) {
        if (!c) return a;
        for (var d in c) v.call(c, d) && (a[d] = c[d]);
        return a;
    };
    t.h.pd = function(a, c) {
        var d, e, g;
        a = t.h.copy(a);
        for (d in c) v.call(c, d) && (e = a[d], g = c[d], a[d] = t.h.Ta(e) && t.h.Ta(g) ? t.h.pd(e, g) : c[d]);
        return a;
    };
    t.h.copy = function(a) {
        return t.h.A({}, a);
    };
    t.h.Ta = function(a) {
        return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object;
    };
    t.h.isArray = Array.isArray || function(a) {
        return "[object Array]" === Object.prototype.toString.call(a);
    };
    t.bind = function(a, c, d) {
        function e() {
            return c.apply(a, arguments);
        }
        c.z || (c.z = t.z++);
        e.z = d ? d + "_" + c.z : c.z;
        return e;
    };
    t.va = {};
    t.z = 1;
    t.expando = "vdata" + new Date().getTime();
    t.getData = function(a) {
        var c = a[t.expando];
        c || (c = a[t.expando] = t.z++, t.va[c] = {});
        return t.va[c];
    };
    t.tc = function(a) {
        a = a[t.expando];
        return !(!a || t.Ib(t.va[a]));
    };
    t.Gc = function(a) {
        var c = a[t.expando];
        if (c) {
            delete t.va[c];
            try {
                delete a[t.expando];
            } catch (d) {
                a.removeAttribute ? a.removeAttribute(t.expando) : a[t.expando] = k;
            }
        }
    };
    t.Ib = function(a) {
        for (var c in a) if (a[c] !== k) return l;
        return f;
    };
    t.n = function(a, c) {
        -1 == (" " + a.className + " ").indexOf(" " + c + " ") && (a.className = "" === a.className ? c : a.className + " " + c);
    };
    t.q = function(a, c) {
        var d, e;
        if (-1 != a.className.indexOf(c)) {
            d = a.className.split(" ");
            for (e = d.length - 1; 0 <= e; e--) d[e] === c && d.splice(e, 1);
            a.className = d.join(" ");
        }
    };
    t.B = t.e("video");
    t.M = navigator.userAgent;
    t.$c = /iPhone/i.test(t.M);
    t.Zc = /iPad/i.test(t.M);
    t.ad = /iPod/i.test(t.M);
    t.Yc = t.$c || t.Zc || t.ad;
    var aa = t, x;
    var y = t.M.match(/OS (\d+)_/i);
    x = y && y[1] ? y[1] : b;
    aa.me = x;
    t.Wc = /Android/i.test(t.M);
    var ba = t, z;
    var A = t.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i), B, C;
    A ? (B = A[1] && parseFloat(A[1]), C = A[2] && parseFloat(A[2]), z = B && C ? parseFloat(A[1] + "." + A[2]) : B ? B : k) : z = k;
    ba.Ub = z;
    t.bd = t.Wc && /webkit/i.test(t.M) && 2.3 > t.Ub;
    t.Xc = /Firefox/i.test(t.M);
    t.ne = /Chrome/i.test(t.M);
    t.ec = !!("ontouchstart" in window || window.Vc && document instanceof window.Vc);
    t.Ic = function(a, c) {
        t.h.Z(c, function(c, e) {
            e === k || "undefined" === typeof e || e === l ? a.removeAttribute(c) : a.setAttribute(c, e === f ? "" : e);
        });
    };
    t.Aa = function(a) {
        var c, d, e, g;
        c = {};
        if (a && a.attributes && 0 < a.attributes.length) {
            d = a.attributes;
            for (var h = d.length - 1; 0 <= h; h--) {
                e = d[h].name;
                g = d[h].value;
                if ("boolean" === typeof a[e] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + e + ",")) g = g !== k ? f : l;
                c[e] = g;
            }
        }
        return c;
    };
    t.pe = function(a, c) {
        var d = "";
        document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(c) : a.currentStyle && (d = a["client" + c.substr(0, 1).toUpperCase() + c.substr(1)] + "px");
        return d;
    };
    t.Hb = function(a, c) {
        c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a);
    };
    t.Pa = {};
    t.w = function(a) {
        0 === a.indexOf("#") && (a = a.slice(1));
        return document.getElementById(a);
    };
    t.za = function(a, c) {
        c = c || a;
        var d = Math.floor(a % 60), e = Math.floor(a / 60 % 60), g = Math.floor(a / 3600), h = Math.floor(c / 60 % 60), j = Math.floor(c / 3600);
        if (isNaN(a) || Infinity === a) g = e = d = "-";
        g = 0 < g || 0 < j ? g + ":" : "";
        return g + (((g || 10 <= h) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d);
    };
    t.jd = function() {
        document.body.focus();
        document.onselectstart = r(l);
    };
    t.ie = function() {
        document.onselectstart = r(f);
    };
    t.trim = function(a) {
        return (a + "").replace(/^\s+|\s+$/g, "");
    };
    t.round = function(a, c) {
        c || (c = 0);
        return Math.round(a * Math.pow(10, c)) / Math.pow(10, c);
    };
    t.Ab = function(a, c) {
        return {
            length: 1,
            start: function() {
                return a;
            },
            end: function() {
                return c;
            }
        };
    };
    t.get = function(a, c, d, e) {
        var g, h, j, n;
        d = d || m();
        "undefined" === typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (a) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (c) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP");
            } catch (d) {}
            throw Error("This browser does not support XMLHttpRequest.");
        });
        h = new XMLHttpRequest();
        j = t.Vd(a);
        n = window.location;
        j.protocol + j.host !== n.protocol + n.host && window.XDomainRequest && !("withCredentials" in h) ? (h = new window.XDomainRequest(), 
        h.onload = function() {
            c(h.responseText);
        }, h.onerror = d, h.onprogress = m(), h.ontimeout = d) : (g = "file:" == j.protocol || "file:" == n.protocol, 
        h.onreadystatechange = function() {
            4 === h.readyState && (200 === h.status || g && 0 === h.status ? c(h.responseText) : d(h.responseText));
        });
        try {
            h.open("GET", a, f), e && (h.withCredentials = f);
        } catch (q) {
            d(q);
            return;
        }
        try {
            h.send();
        } catch (w) {
            d(w);
        }
    };
    t.Zd = function(a) {
        try {
            var c = window.localStorage || l;
            c && (c.volume = a);
        } catch (d) {
            22 == d.code || 1014 == d.code ? t.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? t.log("LocalStorage not allowed (VideoJS)", d) : t.log("LocalStorage Error (VideoJS)", d);
        }
    };
    t.sc = function(a) {
        a.match(/^https?:\/\//) || (a = t.e("div", {
            innerHTML: '<a href="' + a + '">x</a>'
        }).firstChild.href);
        return a;
    };
    t.Vd = function(a) {
        var c, d, e, g;
        g = "protocol hostname port pathname search hash host".split(" ");
        d = t.e("a", {
            href: a
        });
        if (e = "" === d.host && "file:" !== d.protocol) c = t.e("div"), c.innerHTML = '<a href="' + a + '"></a>', 
        d = c.firstChild, c.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(c);
        a = {};
        for (var h = 0; h < g.length; h++) a[g[h]] = d[g[h]];
        e && document.body.removeChild(c);
        return a;
    };
    function D(a, c) {
        var d, e;
        d = Array.prototype.slice.call(c);
        e = m();
        e = window.console || {
            log: e,
            warn: e,
            error: e
        };
        a ? d.unshift(a.toUpperCase() + ":") : a = "log";
        t.log.history.push(d);
        d.unshift("VIDEOJS:");
        if (e[a].apply) e[a].apply(e, d); else e[a](d.join(" "));
    }
    t.log = function() {
        D(k, arguments);
    };
    t.log.history = [];
    t.log.error = function() {
        D("error", arguments);
    };
    t.log.warn = function() {
        D("warn", arguments);
    };
    t.xd = function(a) {
        var c, d;
        a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect());
        if (!c) return {
            left: 0,
            top: 0
        };
        a = document.documentElement;
        d = document.body;
        return {
            left: t.round(c.left + (window.pageXOffset || d.scrollLeft) - (a.clientLeft || d.clientLeft || 0)),
            top: t.round(c.top + (window.pageYOffset || d.scrollTop) - (a.clientTop || d.clientTop || 0))
        };
    };
    t.ic = {};
    t.ic.forEach = function(a, c, d) {
        if (t.h.isArray(a) && c instanceof Function) for (var e = 0, g = a.length; e < g; ++e) c.call(d || t, a[e], e, a);
        return a;
    };
    t.ha = {};
    t.ha.Wa = function(a, c) {
        var d, e, g;
        a = t.h.copy(a);
        for (d in c) c.hasOwnProperty(d) && (e = a[d], g = c[d], a[d] = t.h.Ta(e) && t.h.Ta(g) ? t.ha.Wa(e, g) : c[d]);
        return a;
    };
    t.a = t.ra.extend({
        i: function(a, c, d) {
            this.c = a;
            this.l = t.h.copy(this.l);
            c = this.options(c);
            this.U = c.id || (c.el && c.el.id ? c.el.id : a.id() + "_component_" + t.z++);
            this.Id = c.name || k;
            this.b = c.el || this.e();
            this.N = [];
            this.Qa = {};
            this.Ra = {};
            this.vc();
            this.J(d);
            if (c.Hc !== l) {
                var e, g;
                e = t.bind(this.j(), this.j().reportUserActivity);
                this.d("touchstart", function() {
                    e();
                    clearInterval(g);
                    g = setInterval(e, 250);
                });
                a = function() {
                    e();
                    clearInterval(g);
                };
                this.d("touchmove", e);
                this.d("touchend", a);
                this.d("touchcancel", a);
            }
        }
    });
    s = t.a.prototype;
    s.dispose = function() {
        this.m({
            type: "dispose",
            bubbles: l
        });
        if (this.N) for (var a = this.N.length - 1; 0 <= a; a--) this.N[a].dispose && this.N[a].dispose();
        this.Ra = this.Qa = this.N = k;
        this.p();
        this.b.parentNode && this.b.parentNode.removeChild(this.b);
        t.Gc(this.b);
        this.b = k;
    };
    s.c = f;
    s.j = p("c");
    s.options = function(a) {
        return a === b ? this.l : this.l = t.ha.Wa(this.l, a);
    };
    s.e = function(a, c) {
        return t.e(a, c);
    };
    s.s = function(a) {
        var c = this.c.language(), d = this.c.Va();
        return d && d[c] && d[c][a] ? d[c][a] : a;
    };
    s.w = p("b");
    s.ka = function() {
        return this.v || this.b;
    };
    s.id = p("U");
    s.name = p("Id");
    s.children = p("N");
    s.zd = function(a) {
        return this.Qa[a];
    };
    s.la = function(a) {
        return this.Ra[a];
    };
    s.R = function(a, c) {
        var d, e;
        "string" === typeof a ? (e = a, c = c || {}, d = c.componentClass || t.ba(e), c.name = e, 
        d = new window.videojs[d](this.c || this, c)) : d = a;
        this.N.push(d);
        "function" === typeof d.id && (this.Qa[d.id()] = d);
        (e = e || d.name && d.name()) && (this.Ra[e] = d);
        "function" === typeof d.el && d.el() && this.ka().appendChild(d.el());
        return d;
    };
    s.removeChild = function(a) {
        "string" === typeof a && (a = this.la(a));
        if (a && this.N) {
            for (var c = l, d = this.N.length - 1; 0 <= d; d--) if (this.N[d] === a) {
                c = f;
                this.N.splice(d, 1);
                break;
            }
            c && (this.Qa[a.id] = k, this.Ra[a.name] = k, (c = a.w()) && c.parentNode === this.ka() && this.ka().removeChild(a.w()));
        }
    };
    s.vc = function() {
        var a, c, d, e;
        a = this;
        if (c = this.options().children) if (t.h.isArray(c)) for (var g = 0; g < c.length; g++) d = c[g], 
        "string" == typeof d ? (e = d, d = {}) : e = d.name, a[e] = a.R(e, d); else t.h.Z(c, function(c, d) {
            d !== l && (a[c] = a.R(c, d));
        });
    };
    s.T = r("");
    s.d = function(a, c) {
        t.d(this.b, a, t.bind(this, c));
        return this;
    };
    s.p = function(a, c) {
        t.p(this.b, a, c);
        return this;
    };
    s.X = function(a, c) {
        t.X(this.b, a, t.bind(this, c));
        return this;
    };
    s.m = function(a) {
        t.m(this.b, a);
        return this;
    };
    s.J = function(a) {
        a && (this.ma ? a.call(this) : (this.bb === b && (this.bb = []), this.bb.push(a)));
        return this;
    };
    s.Ga = function() {
        this.ma = f;
        var a = this.bb;
        if (a && 0 < a.length) {
            for (var c = 0, d = a.length; c < d; c++) a[c].call(this);
            this.bb = [];
            this.m("ready");
        }
    };
    s.n = function(a) {
        t.n(this.b, a);
        return this;
    };
    s.q = function(a) {
        t.q(this.b, a);
        return this;
    };
    s.show = function() {
        this.b.style.display = "block";
        return this;
    };
    s.W = function() {
        this.b.style.display = "none";
        return this;
    };
    function E(a) {
        a.q("vjs-lock-showing");
    }
    s.disable = function() {
        this.W();
        this.show = m();
    };
    s.width = function(a, c) {
        return F(this, "width", a, c);
    };
    s.height = function(a, c) {
        return F(this, "height", a, c);
    };
    s.sd = function(a, c) {
        return this.width(a, f).height(c);
    };
    function F(a, c, d, e) {
        if (d !== b) return a.b.style[c] = -1 !== ("" + d).indexOf("%") || -1 !== ("" + d).indexOf("px") ? d : "auto" === d ? "" : d + "px", 
        e || a.m("resize"), a;
        if (!a.b) return 0;
        d = a.b.style[c];
        e = d.indexOf("px");
        return -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(a.b["offset" + t.ba(c)], 10);
    }
    function G(a) {
        var c, d, e, g, h, j, n, q;
        c = 0;
        d = k;
        a.d("touchstart", function(a) {
            1 === a.touches.length && (d = a.touches[0], c = new Date().getTime(), g = f);
        });
        a.d("touchmove", function(a) {
            1 < a.touches.length ? g = l : d && (j = a.touches[0].pageX - d.pageX, n = a.touches[0].pageY - d.pageY, 
            q = Math.sqrt(j * j + n * n), 22 < q && (g = l));
        });
        h = function() {
            g = l;
        };
        a.d("touchleave", h);
        a.d("touchcancel", h);
        a.d("touchend", function(a) {
            d = k;
            g === f && (e = new Date().getTime() - c, 250 > e && (a.preventDefault(), this.m("tap")));
        });
    }
    t.t = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            G(this);
            this.d("tap", this.r);
            this.d("click", this.r);
            this.d("focus", this.Za);
            this.d("blur", this.Ya);
        }
    });
    s = t.t.prototype;
    s.e = function(a, c) {
        var d;
        c = t.h.A({
            className: this.T(),
            role: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, c);
        d = t.a.prototype.e.call(this, a, c);
        c.innerHTML || (this.v = t.e("div", {
            className: "vjs-control-content"
        }), this.yb = t.e("span", {
            className: "vjs-control-text",
            innerHTML: this.s(this.ua) || "Need Text"
        }), this.v.appendChild(this.yb), d.appendChild(this.v));
        return d;
    };
    s.T = function() {
        return "vjs-control " + t.a.prototype.T.call(this);
    };
    s.r = m();
    s.Za = function() {
        t.d(document, "keyup", t.bind(this, this.ea));
    };
    s.ea = function(a) {
        if (32 == a.which || 13 == a.which) a.preventDefault(), this.r();
    };
    s.Ya = function() {
        t.p(document, "keyup", t.bind(this, this.ea));
    };
    t.Q = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            this.hd = this.la(this.l.barName);
            this.handle = this.la(this.l.handleName);
            this.d("mousedown", this.$a);
            this.d("touchstart", this.$a);
            this.d("focus", this.Za);
            this.d("blur", this.Ya);
            this.d("click", this.r);
            this.c.d("controlsvisible", t.bind(this, this.update));
            a.d(this.Cc, t.bind(this, this.update));
            this.S = {};
            this.S.move = t.bind(this, this.ab);
            this.S.end = t.bind(this, this.Mb);
        }
    });
    s = t.Q.prototype;
    s.e = function(a, c) {
        c = c || {};
        c.className += " vjs-slider";
        c = t.h.A({
            role: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, c);
        return t.a.prototype.e.call(this, a, c);
    };
    s.$a = function(a) {
        a.preventDefault();
        t.jd();
        this.n("vjs-sliding");
        t.d(document, "mousemove", this.S.move);
        t.d(document, "mouseup", this.S.end);
        t.d(document, "touchmove", this.S.move);
        t.d(document, "touchend", this.S.end);
        this.ab(a);
    };
    s.ab = m();
    s.Mb = function() {
        t.ie();
        this.q("vjs-sliding");
        t.p(document, "mousemove", this.S.move, l);
        t.p(document, "mouseup", this.S.end, l);
        t.p(document, "touchmove", this.S.move, l);
        t.p(document, "touchend", this.S.end, l);
        this.update();
    };
    s.update = function() {
        if (this.b) {
            var a, c = this.Gb(), d = this.handle, e = this.hd;
            isNaN(c) && (c = 0);
            a = c;
            if (d) {
                a = this.b.offsetWidth;
                var g = d.w().offsetWidth;
                a = g ? g / a : 0;
                c *= 1 - a;
                a = c + a / 2;
                d.w().style.left = t.round(100 * c, 2) + "%";
            }
            e && (e.w().style.width = t.round(100 * a, 2) + "%");
        }
    };
    function H(a, c) {
        var d, e, g, h;
        d = a.b;
        e = t.xd(d);
        h = g = d.offsetWidth;
        d = a.handle;
        if (a.options().vertical) return h = e.top, e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY, 
        d && (d = d.w().offsetHeight, h += d / 2, g -= d), Math.max(0, Math.min(1, (h - e + g) / g));
        g = e.left;
        e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX;
        d && (d = d.w().offsetWidth, g += d / 2, h -= d);
        return Math.max(0, Math.min(1, (e - g) / h));
    }
    s.Za = function() {
        t.d(document, "keyup", t.bind(this, this.ea));
    };
    s.ea = function(a) {
        if (37 == a.which || 40 == a.which) a.preventDefault(), this.Lc(); else if (38 == a.which || 39 == a.which) a.preventDefault(), 
        this.Mc();
    };
    s.Ya = function() {
        t.p(document, "keyup", t.bind(this, this.ea));
    };
    s.r = function(a) {
        a.stopImmediatePropagation();
        a.preventDefault();
    };
    t.$ = t.a.extend();
    t.$.prototype.defaultValue = 0;
    t.$.prototype.e = function(a, c) {
        c = c || {};
        c.className += " vjs-slider-handle";
        c = t.h.A({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, c);
        return t.a.prototype.e.call(this, "div", c);
    };
    t.ia = t.a.extend();
    function ca(a, c) {
        a.R(c);
        c.d("click", t.bind(a, function() {
            E(this);
        }));
    }
    t.ia.prototype.e = function() {
        var a = this.options().lc || "ul";
        this.v = t.e(a, {
            className: "vjs-menu-content"
        });
        a = t.a.prototype.e.call(this, "div", {
            append: this.v,
            className: "vjs-menu"
        });
        a.appendChild(this.v);
        t.d(a, "click", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation();
        });
        return a;
    };
    t.I = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            this.selected(c.selected);
        }
    });
    t.I.prototype.e = function(a, c) {
        return t.t.prototype.e.call(this, "li", t.h.A({
            className: "vjs-menu-item",
            innerHTML: this.l.label
        }, c));
    };
    t.I.prototype.r = function() {
        this.selected(f);
    };
    t.I.prototype.selected = function(a) {
        a ? (this.n("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.q("vjs-selected"), 
        this.b.setAttribute("aria-selected", l));
    };
    t.L = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            this.Ba = this.xa();
            this.R(this.Ba);
            this.O && 0 === this.O.length && this.W();
            this.d("keyup", this.ea);
            this.b.setAttribute("aria-haspopup", f);
            this.b.setAttribute("role", "button");
        }
    });
    s = t.L.prototype;
    s.ta = l;
    s.xa = function() {
        var a = new t.ia(this.c);
        this.options().title && a.ka().appendChild(t.e("li", {
            className: "vjs-menu-title",
            innerHTML: t.ba(this.options().title),
            fe: -1
        }));
        if (this.O = this.createItems()) for (var c = 0; c < this.O.length; c++) ca(a, this.O[c]);
        return a;
    };
    s.wa = m();
    s.T = function() {
        return this.className + " vjs-menu-button " + t.t.prototype.T.call(this);
    };
    s.Za = m();
    s.Ya = m();
    s.r = function() {
        this.X("mouseout", t.bind(this, function() {
            E(this.Ba);
            this.b.blur();
        }));
        this.ta ? I(this) : J(this);
    };
    s.ea = function(a) {
        a.preventDefault();
        32 == a.which || 13 == a.which ? this.ta ? I(this) : J(this) : 27 == a.which && this.ta && I(this);
    };
    function J(a) {
        a.ta = f;
        a.Ba.n("vjs-lock-showing");
        a.b.setAttribute("aria-pressed", f);
        a.O && 0 < a.O.length && a.O[0].w().focus();
    }
    function I(a) {
        a.ta = l;
        E(a.Ba);
        a.b.setAttribute("aria-pressed", l);
    }
    t.F = function(a) {
        "number" === typeof a ? this.code = a : "string" === typeof a ? this.message = a : "object" === typeof a && t.h.A(this, a);
        this.message || (this.message = t.F.qd[this.code] || "");
    };
    t.F.prototype.code = 0;
    t.F.prototype.message = "";
    t.F.prototype.status = k;
    t.F.Sa = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
    t.F.qd = {
        1: "You aborted the video playback",
        2: "A network error caused the video download to fail part-way.",
        3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
        4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
        5: "The video is encrypted and we do not have the keys to decrypt it."
    };
    for (var K = 0; K < t.F.Sa.length; K++) t.F[t.F.Sa[K]] = K, t.F.prototype[t.F.Sa[K]] = K;
    var L, M, N, O;
    L = [ "requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ") ];
    M = L[0];
    for (O = 0; O < L.length; O++) if (L[O][1] in document) {
        N = L[O];
        break;
    }
    if (N) {
        t.Pa.Fb = {};
        for (O = 0; O < N.length; O++) t.Pa.Fb[M[O]] = N[O];
    }
    t.Player = t.a.extend({
        i: function(a, c, d) {
            this.P = a;
            a.id = a.id || "vjs_video_" + t.z++;
            this.ge = a && t.Aa(a);
            c = t.h.A(da(a), c);
            this.Ua = c.language || t.options.language;
            this.Gd = c.languages || t.options.languages;
            this.G = {};
            this.Dc = c.poster;
            this.zb = c.controls;
            a.controls = l;
            c.Hc = l;
            t.a.call(this, this, c, d);
            this.controls() ? this.n("vjs-controls-enabled") : this.n("vjs-controls-disabled");
            t.Ca[this.U] = this;
            c.plugins && t.h.Z(c.plugins, function(a, c) {
                this[a](c);
            }, this);
            var e, g, h, j, n, q;
            e = t.bind(this, this.reportUserActivity);
            this.d("mousedown", function() {
                e();
                clearInterval(g);
                g = setInterval(e, 250);
            });
            this.d("mousemove", function(a) {
                if (a.screenX != n || a.screenY != q) n = a.screenX, q = a.screenY, e();
            });
            this.d("mouseup", function() {
                e();
                clearInterval(g);
            });
            this.d("keydown", e);
            this.d("keyup", e);
            h = setInterval(t.bind(this, function() {
                this.qa && (this.qa = l, this.userActive(f), clearTimeout(j), j = setTimeout(t.bind(this, function() {
                    this.qa || this.userActive(l);
                }), 2e3));
            }), 250);
            this.d("dispose", function() {
                clearInterval(h);
                clearTimeout(j);
            });
        }
    });
    s = t.Player.prototype;
    s.language = function(a) {
        if (a === b) return this.Ua;
        this.Ua = a;
        return this;
    };
    s.Va = p("Gd");
    s.l = t.options;
    s.dispose = function() {
        this.m("dispose");
        this.p("dispose");
        t.Ca[this.U] = k;
        this.P && this.P.player && (this.P.player = k);
        this.b && this.b.player && (this.b.player = k);
        this.k && this.k.dispose();
        t.a.prototype.dispose.call(this);
    };
    function da(a) {
        var c = {
            sources: [],
            tracks: []
        };
        t.h.A(c, t.Aa(a));
        if (a.hasChildNodes()) {
            var d, e, g, h;
            a = a.childNodes;
            g = 0;
            for (h = a.length; g < h; g++) d = a[g], e = d.nodeName.toLowerCase(), "source" === e ? c.sources.push(t.Aa(d)) : "track" === e && c.tracks.push(t.Aa(d));
        }
        return c;
    }
    s.e = function() {
        var a = this.b = t.a.prototype.e.call(this, "div"), c = this.P, d;
        c.removeAttribute("width");
        c.removeAttribute("height");
        if (c.hasChildNodes()) {
            var e, g, h, j, n;
            e = c.childNodes;
            g = e.length;
            for (n = []; g--; ) h = e[g], j = h.nodeName.toLowerCase(), "track" === j && n.push(h);
            for (e = 0; e < n.length; e++) c.removeChild(n[e]);
        }
        d = t.Aa(c);
        t.h.Z(d, function(c) {
            a.setAttribute(c, d[c]);
        });
        c.id += "_html5_api";
        c.className = "vjs-tech";
        c.player = a.player = this;
        this.n("vjs-paused");
        this.width(this.l.width, f);
        this.height(this.l.height, f);
        c.parentNode && c.parentNode.insertBefore(a, c);
        t.Hb(c, a);
        this.b = a;
        this.d("loadstart", this.Nd);
        this.d("waiting", this.Td);
        this.d([ "canplay", "canplaythrough", "playing", "ended" ], this.Sd);
        this.d("seeking", this.Qd);
        this.d("seeked", this.Pd);
        this.d("ended", this.Jd);
        this.d("play", this.Ob);
        this.d("firstplay", this.Ld);
        this.d("pause", this.Nb);
        this.d("progress", this.Od);
        this.d("durationchange", this.Ac);
        this.d("fullscreenchange", this.Md);
        return a;
    };
    function P(a, c, d) {
        a.k && (a.ma = l, a.k.dispose(), a.k = l);
        "Html5" !== c && a.P && (t.g.Cb(a.P), a.P = k);
        a.fb = c;
        a.ma = l;
        var e = t.h.A({
            source: d,
            parentEl: a.b
        }, a.l[c.toLowerCase()]);
        d && (a.nc = d.type, d.src == a.G.src && 0 < a.G.currentTime && (e.startTime = a.G.currentTime), 
        a.G.src = d.src);
        a.k = new window.videojs[c](a, e);
        a.k.J(function() {
            this.c.Ga();
        });
    }
    s.Nd = function() {
        this.error(k);
        this.paused() ? (Q(this, l), this.X("play", function() {
            Q(this, f);
        })) : this.m("firstplay");
    };
    s.uc = l;
    function Q(a, c) {
        c !== b && a.uc !== c && ((a.uc = c) ? (a.n("vjs-has-started"), a.m("firstplay")) : a.q("vjs-has-started"));
    }
    s.Ob = function() {
        this.q("vjs-paused");
        this.n("vjs-playing");
    };
    s.Td = function() {
        this.n("vjs-waiting");
    };
    s.Sd = function() {
        this.q("vjs-waiting");
    };
    s.Qd = function() {
        this.n("vjs-seeking");
    };
    s.Pd = function() {
        this.q("vjs-seeking");
    };
    s.Ld = function() {
        this.l.starttime && this.currentTime(this.l.starttime);
        this.n("vjs-has-started");
    };
    s.Nb = function() {
        this.q("vjs-playing");
        this.n("vjs-paused");
    };
    s.Od = function() {
        1 == this.bufferedPercent() && this.m("loadedalldata");
    };
    s.Jd = function() {
        this.l.loop && (this.currentTime(0), this.play());
    };
    s.Ac = function() {
        var a = R(this, "duration");
        a && (0 > a && (a = Infinity), this.duration(a), Infinity === a ? this.n("vjs-live") : this.q("vjs-live"));
    };
    s.Md = function() {
        this.isFullscreen() ? this.n("vjs-fullscreen") : this.q("vjs-fullscreen");
    };
    function S(a, c, d) {
        if (a.k && !a.k.ma) a.k.J(function() {
            this[c](d);
        }); else try {
            a.k[c](d);
        } catch (e) {
            throw t.log(e), e;
        }
    }
    function R(a, c) {
        if (a.k && a.k.ma) try {
            return a.k[c]();
        } catch (d) {
            throw a.k[c] === b ? t.log("Video.js: " + c + " method not defined for " + a.fb + " playback technology.", d) : "TypeError" == d.name ? (t.log("Video.js: " + c + " unavailable on " + a.fb + " playback technology element.", d), 
            a.k.ma = l) : t.log(d), d;
        }
    }
    s.play = function() {
        S(this, "play");
        return this;
    };
    s.pause = function() {
        S(this, "pause");
        return this;
    };
    s.paused = function() {
        return R(this, "paused") === l ? l : f;
    };
    s.currentTime = function(a) {
        return a !== b ? (S(this, "setCurrentTime", a), this) : this.G.currentTime = R(this, "currentTime") || 0;
    };
    s.duration = function(a) {
        if (a !== b) return this.G.duration = parseFloat(a), this;
        this.G.duration === b && this.Ac();
        return this.G.duration || 0;
    };
    s.remainingTime = function() {
        return this.duration() - this.currentTime();
    };
    s.buffered = function() {
        var a = R(this, "buffered");
        if (!a || !a.length) a = t.Ab(0, 0);
        return a;
    };
    s.bufferedPercent = function() {
        var a = this.duration(), c = this.buffered(), d = 0, e, g;
        if (!a) return 0;
        for (var h = 0; h < c.length; h++) e = c.start(h), g = c.end(h), g > a && (g = a), 
        d += g - e;
        return d / a;
    };
    s.volume = function(a) {
        if (a !== b) return a = Math.max(0, Math.min(1, parseFloat(a))), this.G.volume = a, 
        S(this, "setVolume", a), t.Zd(a), this;
        a = parseFloat(R(this, "volume"));
        return isNaN(a) ? 1 : a;
    };
    s.muted = function(a) {
        return a !== b ? (S(this, "setMuted", a), this) : R(this, "muted") || l;
    };
    s.Ea = function() {
        return R(this, "supportsFullScreen") || l;
    };
    s.wc = l;
    s.isFullscreen = function(a) {
        return a !== b ? (this.wc = !!a, this) : this.wc;
    };
    s.isFullScreen = function(a) {
        t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
        return this.isFullscreen(a);
    };
    s.requestFullscreen = function() {
        var a = t.Pa.Fb;
        this.isFullscreen(f);
        a ? (t.d(document, a.fullscreenchange, t.bind(this, function(c) {
            this.isFullscreen(document[a.fullscreenElement]);
            this.isFullscreen() === l && t.p(document, a.fullscreenchange, arguments.callee);
            this.m("fullscreenchange");
        })), this.b[a.requestFullscreen]()) : this.k.Ea() ? S(this, "enterFullScreen") : (this.pc(), 
        this.m("fullscreenchange"));
        return this;
    };
    s.exitFullscreen = function() {
        var a = t.Pa.Fb;
        this.isFullscreen(l);
        if (a) document[a.exitFullscreen](); else this.k.Ea() ? S(this, "exitFullScreen") : (this.Db(), 
        this.m("fullscreenchange"));
        return this;
    };
    s.pc = function() {
        this.Cd = f;
        this.td = document.documentElement.style.overflow;
        t.d(document, "keydown", t.bind(this, this.rc));
        document.documentElement.style.overflow = "hidden";
        t.n(document.body, "vjs-full-window");
        this.m("enterFullWindow");
    };
    s.rc = function(a) {
        27 === a.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : this.Db());
    };
    s.Db = function() {
        this.Cd = l;
        t.p(document, "keydown", this.rc);
        document.documentElement.style.overflow = this.td;
        t.q(document.body, "vjs-full-window");
        this.m("exitFullWindow");
    };
    s.selectSource = function(a) {
        for (var c = 0, d = this.l.techOrder; c < d.length; c++) {
            var e = t.ba(d[c]), g = window.videojs[e];
            if (g) {
                if (g.isSupported()) for (var h = 0, j = a; h < j.length; h++) {
                    var n = j[h];
                    if (g.canPlaySource(n)) return {
                        source: n,
                        k: e
                    };
                }
            } else t.log.error('The "' + e + '" tech is undefined. Skipped browser support check for that tech.');
        }
        return l;
    };
    s.src = function(a) {
        if (a === b) return R(this, "src");
        t.h.isArray(a) ? T(this, a) : "string" === typeof a ? this.src({
            src: a
        }) : a instanceof Object && (a.type && !window.videojs[this.fb].canPlaySource(a) ? T(this, [ a ]) : (this.G.src = a.src, 
        this.nc = a.type || "", this.J(function() {
            S(this, "src", a.src);
            "auto" == this.l.preload && this.load();
            this.l.autoplay && this.play();
        })));
        return this;
    };
    function T(a, c) {
        var d = a.selectSource(c);
        d ? d.k === a.fb ? a.src(d.source) : P(a, d.k, d.source) : (a.error({
            code: 4,
            message: a.s(a.options().notSupportedMessage)
        }), a.Ga());
    }
    s.load = function() {
        S(this, "load");
        return this;
    };
    s.currentSrc = function() {
        return R(this, "currentSrc") || this.G.src || "";
    };
    s.od = function() {
        return this.nc || "";
    };
    s.Da = function(a) {
        return a !== b ? (S(this, "setPreload", a), this.l.preload = a, this) : R(this, "preload");
    };
    s.autoplay = function(a) {
        return a !== b ? (S(this, "setAutoplay", a), this.l.autoplay = a, this) : R(this, "autoplay");
    };
    s.loop = function(a) {
        return a !== b ? (S(this, "setLoop", a), this.l.loop = a, this) : R(this, "loop");
    };
    s.poster = function(a) {
        if (a === b) return this.Dc;
        this.Dc = a;
        S(this, "setPoster", a);
        this.m("posterchange");
    };
    s.controls = function(a) {
        return a !== b ? (a = !!a, this.zb !== a && ((this.zb = a) ? (this.q("vjs-controls-disabled"), 
        this.n("vjs-controls-enabled"), this.m("controlsenabled")) : (this.q("vjs-controls-enabled"), 
        this.n("vjs-controls-disabled"), this.m("controlsdisabled"))), this) : this.zb;
    };
    t.Player.prototype.Tb;
    s = t.Player.prototype;
    s.usingNativeControls = function(a) {
        return a !== b ? (a = !!a, this.Tb !== a && ((this.Tb = a) ? (this.n("vjs-using-native-controls"), 
        this.m("usingnativecontrols")) : (this.q("vjs-using-native-controls"), this.m("usingcustomcontrols"))), 
        this) : this.Tb;
    };
    s.da = k;
    s.error = function(a) {
        if (a === b) return this.da;
        if (a === k) return this.da = a, this.q("vjs-error"), this;
        this.da = a instanceof t.F ? a : new t.F(a);
        this.m("error");
        this.n("vjs-error");
        t.log.error("(CODE:" + this.da.code + " " + t.F.Sa[this.da.code] + ")", this.da.message, this.da);
        return this;
    };
    s.ended = function() {
        return R(this, "ended");
    };
    s.seeking = function() {
        return R(this, "seeking");
    };
    s.qa = f;
    s.reportUserActivity = function() {
        this.qa = f;
    };
    s.Sb = f;
    s.userActive = function(a) {
        return a !== b ? (a = !!a, a !== this.Sb && ((this.Sb = a) ? (this.qa = f, this.q("vjs-user-inactive"), 
        this.n("vjs-user-active"), this.m("useractive")) : (this.qa = l, this.k && this.k.X("mousemove", function(a) {
            a.stopPropagation();
            a.preventDefault();
        }), this.q("vjs-user-active"), this.n("vjs-user-inactive"), this.m("userinactive"))), 
        this) : this.Sb;
    };
    s.playbackRate = function(a) {
        return a !== b ? (S(this, "setPlaybackRate", a), this) : this.k && this.k.o && this.k.o.playbackRate ? R(this, "playbackRate") : 1;
    };
    t.Ja = t.a.extend();
    t.Ja.prototype.l = {
        qe: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            liveDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {},
            playbackRateMenuButton: {}
        }
    };
    t.Ja.prototype.e = function() {
        return t.e("div", {
            className: "vjs-control-bar"
        });
    };
    t.Yb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
        }
    });
    t.Yb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-live-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-live-display",
            innerHTML: '<span class="vjs-control-text">' + this.s("Stream Type") + "</span>" + this.s("LIVE"),
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a;
    };
    t.ac = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            a.d("play", t.bind(this, this.Ob));
            a.d("pause", t.bind(this, this.Nb));
        }
    });
    s = t.ac.prototype;
    s.ua = "Play";
    s.T = function() {
        return "vjs-play-control " + t.t.prototype.T.call(this);
    };
    s.r = function() {
        this.c.paused() ? this.c.play() : this.c.pause();
    };
    s.Ob = function() {
        t.q(this.b, "vjs-paused");
        t.n(this.b, "vjs-playing");
        this.b.children[0].children[0].innerHTML = this.s("Pause");
    };
    s.Nb = function() {
        t.q(this.b, "vjs-playing");
        t.n(this.b, "vjs-paused");
        this.b.children[0].children[0].innerHTML = this.s("Play");
    };
    t.ib = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.ga));
        }
    });
    t.ib.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-current-time vjs-time-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a;
    };
    t.ib.prototype.ga = function() {
        var a = this.c.cb ? this.c.G.currentTime : this.c.currentTime();
        this.v.innerHTML = '<span class="vjs-control-text">' + this.s("Current Time") + "</span> " + t.za(a, this.c.duration());
    };
    t.jb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.ga));
        }
    });
    t.jb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-duration vjs-time-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">' + this.s("Duration Time") + "</span> 0:00",
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a;
    };
    t.jb.prototype.ga = function() {
        var a = this.c.duration();
        a && (this.v.innerHTML = '<span class="vjs-control-text">' + this.s("Duration Time") + "</span> " + t.za(a));
    };
    t.gc = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
        }
    });
    t.gc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        });
    };
    t.qb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.ga));
        }
    });
    t.qb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-remaining-time vjs-time-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">' + this.s("Remaining Time") + "</span> -0:00",
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a;
    };
    t.qb.prototype.ga = function() {
        this.c.duration() && (this.v.innerHTML = '<span class="vjs-control-text">' + this.s("Remaining Time") + "</span> -" + t.za(this.c.remainingTime()));
    };
    t.Ka = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
        }
    });
    t.Ka.prototype.ua = "Fullscreen";
    t.Ka.prototype.T = function() {
        return "vjs-fullscreen-control " + t.t.prototype.T.call(this);
    };
    t.Ka.prototype.r = function() {
        this.c.isFullscreen() ? (this.c.exitFullscreen(), this.yb.innerHTML = this.s("Fullscreen")) : (this.c.requestFullscreen(), 
        this.yb.innerHTML = this.s("Non-Fullscreen"));
    };
    t.pb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
        }
    });
    t.pb.prototype.l = {
        children: {
            seekBar: {}
        }
    };
    t.pb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-progress-control vjs-control"
        });
    };
    t.cc = t.Q.extend({
        i: function(a, c) {
            t.Q.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.pa));
            a.J(t.bind(this, this.pa));
        }
    });
    s = t.cc.prototype;
    s.l = {
        children: {
            loadProgressBar: {},
            playProgressBar: {},
            seekHandle: {}
        },
        barName: "playProgressBar",
        handleName: "seekHandle"
    };
    s.Cc = "timeupdate";
    s.e = function() {
        return t.Q.prototype.e.call(this, "div", {
            className: "vjs-progress-holder",
            "aria-label": "video progress bar"
        });
    };
    s.pa = function() {
        var a = this.c.cb ? this.c.G.currentTime : this.c.currentTime();
        this.b.setAttribute("aria-valuenow", t.round(100 * this.Gb(), 2));
        this.b.setAttribute("aria-valuetext", t.za(a, this.c.duration()));
    };
    s.Gb = function() {
        return this.c.currentTime() / this.c.duration();
    };
    s.$a = function(a) {
        t.Q.prototype.$a.call(this, a);
        this.c.cb = f;
        this.ke = !this.c.paused();
        this.c.pause();
    };
    s.ab = function(a) {
        a = H(this, a) * this.c.duration();
        a == this.c.duration() && (a -= .1);
        this.c.currentTime(a);
    };
    s.Mb = function(a) {
        t.Q.prototype.Mb.call(this, a);
        this.c.cb = l;
        this.ke && this.c.play();
    };
    s.Mc = function() {
        this.c.currentTime(this.c.currentTime() + 5);
    };
    s.Lc = function() {
        this.c.currentTime(this.c.currentTime() - 5);
    };
    t.mb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.d("progress", t.bind(this, this.update));
        }
    });
    t.mb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.s("Loaded") + "</span>: 0%</span>"
        });
    };
    t.mb.prototype.update = function() {
        var a, c, d, e, g = this.c.buffered();
        a = this.c.duration();
        var h, j = this.c;
        h = j.buffered();
        j = j.duration();
        h = h.end(h.length - 1);
        h > j && (h = j);
        j = this.b.children;
        this.b.style.width = 100 * (h / a || 0) + "%";
        for (a = 0; a < g.length; a++) c = g.start(a), d = g.end(a), (e = j[a]) || (e = this.b.appendChild(t.e())), 
        e.style.left = 100 * (c / h || 0) + "%", e.style.width = 100 * ((d - c) / h || 0) + "%";
        for (a = j.length; a > g.length; a--) this.b.removeChild(j[a - 1]);
    };
    t.$b = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
        }
    });
    t.$b.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.s("Progress") + "</span>: 0%</span>"
        });
    };
    t.Ma = t.$.extend({
        i: function(a, c) {
            t.$.call(this, a, c);
            a.d("timeupdate", t.bind(this, this.ga));
        }
    });
    t.Ma.prototype.defaultValue = "00:00";
    t.Ma.prototype.e = function() {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-seek-handle",
            "aria-live": "off"
        });
    };
    t.Ma.prototype.ga = function() {
        var a = this.c.cb ? this.c.G.currentTime : this.c.currentTime();
        this.b.innerHTML = '<span class="vjs-control-text">' + t.za(a, this.c.duration()) + "</span>";
    };
    t.sb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            a.k && a.k.o && a.k.o.volumeControl === l && this.n("vjs-hidden");
            a.d("loadstart", t.bind(this, function() {
                a.k.o && a.k.o.volumeControl === l ? this.n("vjs-hidden") : this.q("vjs-hidden");
            }));
        }
    });
    t.sb.prototype.l = {
        children: {
            volumeBar: {}
        }
    };
    t.sb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-control vjs-control"
        });
    };
    t.rb = t.Q.extend({
        i: function(a, c) {
            t.Q.call(this, a, c);
            a.d("volumechange", t.bind(this, this.pa));
            a.J(t.bind(this, this.pa));
        }
    });
    s = t.rb.prototype;
    s.pa = function() {
        this.b.setAttribute("aria-valuenow", t.round(100 * this.c.volume(), 2));
        this.b.setAttribute("aria-valuetext", t.round(100 * this.c.volume(), 2) + "%");
    };
    s.l = {
        children: {
            volumeLevel: {},
            volumeHandle: {}
        },
        barName: "volumeLevel",
        handleName: "volumeHandle"
    };
    s.Cc = "volumechange";
    s.e = function() {
        return t.Q.prototype.e.call(this, "div", {
            className: "vjs-volume-bar",
            "aria-label": "volume level"
        });
    };
    s.ab = function(a) {
        this.c.muted() && this.c.muted(l);
        this.c.volume(H(this, a));
    };
    s.Gb = function() {
        return this.c.muted() ? 0 : this.c.volume();
    };
    s.Mc = function() {
        this.c.volume(this.c.volume() + .1);
    };
    s.Lc = function() {
        this.c.volume(this.c.volume() - .1);
    };
    t.hc = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
        }
    });
    t.hc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        });
    };
    t.tb = t.$.extend();
    t.tb.prototype.defaultValue = "00:00";
    t.tb.prototype.e = function() {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-volume-handle"
        });
    };
    t.ja = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            a.d("volumechange", t.bind(this, this.update));
            a.k && a.k.o && a.k.o.volumeControl === l && this.n("vjs-hidden");
            a.d("loadstart", t.bind(this, function() {
                a.k.o && a.k.o.volumeControl === l ? this.n("vjs-hidden") : this.q("vjs-hidden");
            }));
        }
    });
    t.ja.prototype.e = function() {
        return t.t.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.s("Mute") + "</span></div>"
        });
    };
    t.ja.prototype.r = function() {
        this.c.muted(this.c.muted() ? l : f);
    };
    t.ja.prototype.update = function() {
        var a = this.c.volume(), c = 3;
        0 === a || this.c.muted() ? c = 0 : .33 > a ? c = 1 : .67 > a && (c = 2);
        this.c.muted() ? this.b.children[0].children[0].innerHTML != this.s("Unmute") && (this.b.children[0].children[0].innerHTML = this.s("Unmute")) : this.b.children[0].children[0].innerHTML != this.s("Mute") && (this.b.children[0].children[0].innerHTML = this.s("Mute"));
        for (a = 0; 4 > a; a++) t.q(this.b, "vjs-vol-" + a);
        t.n(this.b, "vjs-vol-" + c);
    };
    t.sa = t.L.extend({
        i: function(a, c) {
            t.L.call(this, a, c);
            a.d("volumechange", t.bind(this, this.update));
            a.k && a.k.o && a.k.o.Sc === l && this.n("vjs-hidden");
            a.d("loadstart", t.bind(this, function() {
                a.k.o && a.k.o.Sc === l ? this.n("vjs-hidden") : this.q("vjs-hidden");
            }));
            this.n("vjs-menu-button");
        }
    });
    t.sa.prototype.xa = function() {
        var a = new t.ia(this.c, {
            lc: "div"
        }), c = new t.rb(this.c, t.h.A({
            vertical: f
        }, this.l.we));
        a.R(c);
        return a;
    };
    t.sa.prototype.r = function() {
        t.ja.prototype.r.call(this);
        t.L.prototype.r.call(this);
    };
    t.sa.prototype.e = function() {
        return t.t.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.s("Mute") + "</span></div>"
        });
    };
    t.sa.prototype.update = t.ja.prototype.update;
    t.bc = t.L.extend({
        i: function(a, c) {
            t.L.call(this, a, c);
            this.Rc();
            this.Qc();
            a.d("loadstart", t.bind(this, this.Rc));
            a.d("ratechange", t.bind(this, this.Qc));
        }
    });
    s = t.bc.prototype;
    s.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-playback-rate vjs-menu-button vjs-control",
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + this.s("Playback Rate") + "</span></div>"
        });
        this.yc = t.e("div", {
            className: "vjs-playback-rate-value",
            innerHTML: 1
        });
        a.appendChild(this.yc);
        return a;
    };
    s.xa = function() {
        var a = new t.ia(this.j()), c = this.j().options().playbackRates;
        if (c) for (var d = c.length - 1; 0 <= d; d--) a.R(new t.ob(this.j(), {
            rate: c[d] + "x"
        }));
        return a;
    };
    s.pa = function() {
        this.w().setAttribute("aria-valuenow", this.j().playbackRate());
    };
    s.r = function() {
        for (var a = this.j().playbackRate(), c = this.j().options().playbackRates, d = c[0], e = 0; e < c.length; e++) if (c[e] > a) {
            d = c[e];
            break;
        }
        this.j().playbackRate(d);
    };
    function U(a) {
        return a.j().k && a.j().k.o.playbackRate && a.j().options().playbackRates && 0 < a.j().options().playbackRates.length;
    }
    s.Rc = function() {
        U(this) ? this.q("vjs-hidden") : this.n("vjs-hidden");
    };
    s.Qc = function() {
        U(this) && (this.yc.innerHTML = this.j().playbackRate() + "x");
    };
    t.ob = t.I.extend({
        lc: "button",
        i: function(a, c) {
            var d = this.label = c.rate, e = this.Fc = parseFloat(d, 10);
            c.label = d;
            c.selected = 1 === e;
            t.I.call(this, a, c);
            this.j().d("ratechange", t.bind(this, this.update));
        }
    });
    t.ob.prototype.r = function() {
        t.I.prototype.r.call(this);
        this.j().playbackRate(this.Fc);
    };
    t.ob.prototype.update = function() {
        this.selected(this.j().playbackRate() == this.Fc);
    };
    t.La = t.t.extend({
        i: function(a, c) {
            t.t.call(this, a, c);
            a.poster() && this.src(a.poster());
            (!a.poster() || !a.controls()) && this.W();
            a.d("posterchange", t.bind(this, function() {
                this.src(a.poster());
            }));
            a.d("play", t.bind(this, this.W));
        }
    });
    var ea = "backgroundSize" in t.B.style;
    t.La.prototype.e = function() {
        var a = t.e("div", {
            className: "vjs-poster",
            tabIndex: -1
        });
        ea || a.appendChild(t.e("img"));
        return a;
    };
    t.La.prototype.src = function(a) {
        var c = this.w();
        a !== b && (ea ? c.style.backgroundImage = 'url("' + a + '")' : c.firstChild.src = a);
    };
    t.La.prototype.r = function() {
        this.j().controls() && this.c.play();
    };
    t.Zb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
        }
    });
    t.Zb.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-loading-spinner"
        });
    };
    t.gb = t.t.extend();
    t.gb.prototype.e = function() {
        return t.t.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: '<span aria-hidden="true"></span>',
            "aria-label": "play video"
        });
    };
    t.gb.prototype.r = function() {
        this.c.play();
    };
    t.kb = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            this.update();
            a.d("error", t.bind(this, this.update));
        }
    });
    t.kb.prototype.e = function() {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-error-display"
        });
        this.v = t.e("div");
        a.appendChild(this.v);
        return a;
    };
    t.kb.prototype.update = function() {
        this.j().error() && (this.v.innerHTML = this.s(this.j().error().message));
    };
    t.u = t.a.extend({
        i: function(a, c, d) {
            c = c || {};
            c.Hc = l;
            t.a.call(this, a, c, d);
            this.o.progressEvents || (this.zc = f, this.Ec = setInterval(t.bind(this, function() {
                var a = this.j().bufferedPercent();
                this.kd != a && this.j().m("progress");
                this.kd = a;
                1 === a && clearInterval(this.Ec);
            }), 500));
            this.o.timeupdateEvents || (this.Lb = f, this.j().d("play", t.bind(this, this.Pc)), 
            this.j().d("pause", t.bind(this, this.eb)), this.X("timeupdate", function() {
                this.o.timeupdateEvents = f;
                fa(this);
            }));
            var e, g;
            g = this;
            e = this.j();
            a = function() {
                if (e.controls() && !e.usingNativeControls()) {
                    var a;
                    g.d("mousedown", g.r);
                    g.d("touchstart", function() {
                        a = this.c.userActive();
                    });
                    g.d("touchmove", function() {
                        a && this.j().reportUserActivity();
                    });
                    g.d("touchend", function(a) {
                        a.preventDefault();
                    });
                    G(g);
                    g.d("tap", g.Rd);
                }
            };
            c = t.bind(g, g.Xd);
            this.J(a);
            e.d("controlsenabled", a);
            e.d("controlsdisabled", c);
            this.J(function() {
                this.networkState && 0 < this.networkState() && this.j().m("loadstart");
            });
        }
    });
    s = t.u.prototype;
    s.Xd = function() {
        this.p("tap");
        this.p("touchstart");
        this.p("touchmove");
        this.p("touchleave");
        this.p("touchcancel");
        this.p("touchend");
        this.p("click");
        this.p("mousedown");
    };
    s.r = function(a) {
        0 === a.button && this.j().controls() && (this.j().paused() ? this.j().play() : this.j().pause());
    };
    s.Rd = function() {
        this.j().userActive(!this.j().userActive());
    };
    function fa(a) {
        a.Lb = l;
        a.eb();
        a.p("play", a.Pc);
        a.p("pause", a.eb);
    }
    s.Pc = function() {
        this.mc && this.eb();
        this.mc = setInterval(t.bind(this, function() {
            this.j().m("timeupdate");
        }), 250);
    };
    s.eb = function() {
        clearInterval(this.mc);
        this.j().m("timeupdate");
    };
    s.dispose = function() {
        this.zc && (this.zc = l, clearInterval(this.Ec));
        this.Lb && fa(this);
        t.a.prototype.dispose.call(this);
    };
    s.Qb = function() {
        this.Lb && this.j().m("timeupdate");
    };
    s.Jc = m();
    s.o = {
        volumeControl: f,
        fullscreenResize: l,
        playbackRate: l,
        progressEvents: l,
        timeupdateEvents: l
    };
    t.media = {};
    t.g = t.u.extend({
        i: function(a, c, d) {
            this.o.volumeControl = t.g.md();
            this.o.playbackRate = t.g.ld();
            this.o.movingMediaElementInDOM = !t.Yc;
            this.o.fullscreenResize = f;
            this.o.progressEvents = f;
            t.u.call(this, a, c, d);
            for (d = t.g.lb.length - 1; 0 <= d; d--) t.d(this.b, t.g.lb[d], t.bind(this, this.vd));
            if ((c = c.source) && this.b.currentSrc !== c.src) this.b.src = c.src;
            if (t.ec && a.options().nativeControlsForTouch !== l) {
                var e, g, h, j;
                e = this;
                g = this.j();
                c = g.controls();
                e.b.controls = !!c;
                h = function() {
                    e.b.controls = f;
                };
                j = function() {
                    e.b.controls = l;
                };
                g.d("controlsenabled", h);
                g.d("controlsdisabled", j);
                c = function() {
                    g.p("controlsenabled", h);
                    g.p("controlsdisabled", j);
                };
                e.d("dispose", c);
                g.d("usingcustomcontrols", c);
                g.usingNativeControls(f);
            }
            a.J(function() {
                this.P && this.l.autoplay && this.paused() && (delete this.P.poster, this.play());
            });
            this.Ga();
        }
    });
    s = t.g.prototype;
    s.dispose = function() {
        t.g.Cb(this.b);
        t.u.prototype.dispose.call(this);
    };
    s.e = function() {
        var a = this.c, c = a.P, d;
        if (!c || this.o.movingMediaElementInDOM === l) c ? (d = c.cloneNode(l), t.g.Cb(c), 
        c = d, a.P = k) : (c = t.e("video"), t.Ic(c, t.h.A(a.ge || {}, {
            id: a.id() + "_html5_api",
            "class": "vjs-tech"
        }))), c.player = a, t.Hb(c, a.w());
        d = [ "autoplay", "preload", "loop", "muted" ];
        for (var e = d.length - 1; 0 <= e; e--) {
            var g = d[e], h = {};
            "undefined" !== typeof a.l[g] && (h[g] = a.l[g]);
            t.Ic(c, h);
        }
        return c;
    };
    s.vd = function(a) {
        "error" == a.type ? this.j().error(this.error().code) : (a.bubbles = l, this.j().m(a));
    };
    s.play = function() {
        this.b.play();
    };
    s.pause = function() {
        this.b.pause();
    };
    s.paused = function() {
        return this.b.paused;
    };
    s.currentTime = function() {
        return this.b.currentTime;
    };
    s.Qb = function(a) {
        try {
            this.b.currentTime = a;
        } catch (c) {
            t.log(c, "Video is not ready. (Video.js)");
        }
    };
    s.duration = function() {
        return this.b.duration || 0;
    };
    s.buffered = function() {
        return this.b.buffered;
    };
    s.volume = function() {
        return this.b.volume;
    };
    s.de = function(a) {
        this.b.volume = a;
    };
    s.muted = function() {
        return this.b.muted;
    };
    s.ae = function(a) {
        this.b.muted = a;
    };
    s.width = function() {
        return this.b.offsetWidth;
    };
    s.height = function() {
        return this.b.offsetHeight;
    };
    s.Ea = function() {
        return "function" == typeof this.b.webkitEnterFullScreen && (/Android/.test(t.M) || !/Chrome|Mac OS X 10.5/.test(t.M)) ? f : l;
    };
    s.oc = function() {
        var a = this.b;
        a.paused && a.networkState <= a.le ? (this.b.play(), setTimeout(function() {
            a.pause();
            a.webkitEnterFullScreen();
        }, 0)) : a.webkitEnterFullScreen();
    };
    s.wd = function() {
        this.b.webkitExitFullScreen();
    };
    s.src = function(a) {
        this.b.src = a;
    };
    s.load = function() {
        this.b.load();
    };
    s.currentSrc = function() {
        return this.b.currentSrc;
    };
    s.poster = function() {
        return this.b.poster;
    };
    s.Jc = function(a) {
        this.b.poster = a;
    };
    s.Da = function() {
        return this.b.Da;
    };
    s.ce = function(a) {
        this.b.Da = a;
    };
    s.autoplay = function() {
        return this.b.autoplay;
    };
    s.Yd = function(a) {
        this.b.autoplay = a;
    };
    s.controls = function() {
        return this.b.controls;
    };
    s.loop = function() {
        return this.b.loop;
    };
    s.$d = function(a) {
        this.b.loop = a;
    };
    s.error = function() {
        return this.b.error;
    };
    s.seeking = function() {
        return this.b.seeking;
    };
    s.ended = function() {
        return this.b.ended;
    };
    s.playbackRate = function() {
        return this.b.playbackRate;
    };
    s.be = function(a) {
        this.b.playbackRate = a;
    };
    s.networkState = function() {
        return this.b.networkState;
    };
    t.g.isSupported = function() {
        try {
            t.B.volume = .5;
        } catch (a) {
            return l;
        }
        return !!t.B.canPlayType;
    };
    t.g.wb = function(a) {
        try {
            return !!t.B.canPlayType(a.type);
        } catch (c) {
            return "";
        }
    };
    t.g.md = function() {
        var a = t.B.volume;
        t.B.volume = a / 2 + .1;
        return a !== t.B.volume;
    };
    t.g.ld = function() {
        var a = t.B.playbackRate;
        t.B.playbackRate = a / 2 + .1;
        return a !== t.B.playbackRate;
    };
    var V, ga = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, ha = /^video\/mp4/i;
    t.g.Bc = function() {
        4 <= t.Ub && (V || (V = t.B.constructor.prototype.canPlayType), t.B.constructor.prototype.canPlayType = function(a) {
            return a && ga.test(a) ? "maybe" : V.call(this, a);
        });
        t.bd && (V || (V = t.B.constructor.prototype.canPlayType), t.B.constructor.prototype.canPlayType = function(a) {
            return a && ha.test(a) ? "maybe" : V.call(this, a);
        });
    };
    t.g.je = function() {
        var a = t.B.constructor.prototype.canPlayType;
        t.B.constructor.prototype.canPlayType = V;
        V = k;
        return a;
    };
    t.g.Bc();
    t.g.lb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
    t.g.Cb = function(a) {
        if (a) {
            a.player = k;
            for (a.parentNode && a.parentNode.removeChild(a); a.hasChildNodes(); ) a.removeChild(a.firstChild);
            a.removeAttribute("src");
            if ("function" === typeof a.load) try {
                a.load();
            } catch (c) {}
        }
    };
    t.f = t.u.extend({
        i: function(a, c, d) {
            t.u.call(this, a, c, d);
            var e = c.source;
            d = c.parentEl;
            var g = this.b = t.e("div", {
                id: a.id() + "_temp_flash"
            }), h = a.id() + "_flash_api", j = a.l, j = t.h.A({
                readyFunction: "videojs.Flash.onReady",
                eventProxyFunction: "videojs.Flash.onEvent",
                errorEventProxyFunction: "videojs.Flash.onError",
                autoplay: j.autoplay,
                preload: j.Da,
                loop: j.loop,
                muted: j.muted
            }, c.flashVars), n = t.h.A({
                wmode: "opaque",
                bgcolor: "#000000"
            }, c.params), h = t.h.A({
                id: h,
                name: h,
                "class": "vjs-tech"
            }, c.attributes);
            e && (e.type && t.f.Ed(e.type) ? (e = t.f.Nc(e.src), j.rtmpConnection = encodeURIComponent(e.xb), 
            j.rtmpStream = encodeURIComponent(e.Rb)) : j.src = encodeURIComponent(t.sc(e.src)));
            t.Hb(g, d);
            c.startTime && this.J(function() {
                this.load();
                this.play();
                this.currentTime(c.startTime);
            });
            t.Xc && this.J(function() {
                t.d(this.w(), "mousemove", t.bind(this, function() {
                    this.j().m({
                        type: "mousemove",
                        bubbles: l
                    });
                }));
            });
            a.d("stageclick", a.reportUserActivity);
            this.b = t.f.ud(c.swf, g, j, n, h);
        }
    });
    t.f.prototype.dispose = function() {
        t.u.prototype.dispose.call(this);
    };
    t.f.prototype.play = function() {
        this.b.vjs_play();
    };
    t.f.prototype.pause = function() {
        this.b.vjs_pause();
    };
    t.f.prototype.src = function(a) {
        if (a === b) return this.currentSrc();
        t.f.Dd(a) ? (a = t.f.Nc(a), this.se(a.xb), this.te(a.Rb)) : (a = t.sc(a), this.b.vjs_src(a));
        if (this.c.autoplay()) {
            var c = this;
            setTimeout(function() {
                c.play();
            }, 0);
        }
    };
    t.f.prototype.setCurrentTime = function(a) {
        this.Hd = a;
        this.b.vjs_setProperty("currentTime", a);
        t.u.prototype.Qb.call(this);
    };
    t.f.prototype.currentTime = function() {
        return this.seeking() ? this.Hd || 0 : this.b.vjs_getProperty("currentTime");
    };
    t.f.prototype.currentSrc = function() {
        var a = this.b.vjs_getProperty("currentSrc");
        if (a == k) {
            var c = this.rtmpConnection(), d = this.rtmpStream();
            c && d && (a = t.f.ee(c, d));
        }
        return a;
    };
    t.f.prototype.load = function() {
        this.b.vjs_load();
    };
    t.f.prototype.poster = function() {
        this.b.vjs_getProperty("poster");
    };
    t.f.prototype.setPoster = m();
    t.f.prototype.buffered = function() {
        return t.Ab(0, this.b.vjs_getProperty("buffered"));
    };
    t.f.prototype.Ea = r(l);
    t.f.prototype.oc = r(l);
    function ia() {
        var a = W[X], c = a.charAt(0).toUpperCase() + a.slice(1);
        ja["set" + c] = function(c) {
            return this.b.vjs_setProperty(a, c);
        };
    }
    function ka(a) {
        ja[a] = function() {
            return this.b.vjs_getProperty(a);
        };
    }
    var ja = t.f.prototype, W = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "), la = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "), X;
    for (X = 0; X < W.length; X++) ka(W[X]), ia();
    for (X = 0; X < la.length; X++) ka(la[X]);
    t.f.isSupported = function() {
        return 10 <= t.f.version()[0];
    };
    t.f.wb = function(a) {
        if (!a.type) return "";
        a = a.type.replace(/;.*/, "").toLowerCase();
        if (a in t.f.yd || a in t.f.Oc) return "maybe";
    };
    t.f.yd = {
        "video/flv": "FLV",
        "video/x-flv": "FLV",
        "video/mp4": "MP4",
        "video/m4v": "MP4"
    };
    t.f.Oc = {
        "rtmp/mp4": "MP4",
        "rtmp/flv": "FLV"
    };
    t.f.onReady = function(a) {
        var c;
        if (c = (a = t.w(a)) && a.parentNode && a.parentNode.player) a.player = c, t.f.checkReady(c.k);
    };
    t.f.checkReady = function(a) {
        a.w() && (a.w().vjs_getProperty ? a.Ga() : setTimeout(function() {
            t.f.checkReady(a);
        }, 50));
    };
    t.f.onEvent = function(a, c) {
        t.w(a).player.m(c);
    };
    t.f.onError = function(a, c) {
        var d = t.w(a).player, e = "FLASH: " + c;
        "srcnotfound" == c ? d.error({
            code: 4,
            message: e
        }) : d.error(e);
    };
    t.f.version = function() {
        var a = "0,0,0";
        try {
            a = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
        } catch (c) {
            try {
                navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
            } catch (d) {}
        }
        return a.split(",");
    };
    t.f.ud = function(a, c, d, e, g) {
        a = t.f.Ad(a, d, e, g);
        a = t.e("div", {
            innerHTML: a
        }).childNodes[0];
        d = c.parentNode;
        c.parentNode.replaceChild(a, c);
        var h = d.childNodes[0];
        setTimeout(function() {
            h.style.display = "block";
        }, 1e3);
        return a;
    };
    t.f.Ad = function(a, c, d, e) {
        var g = "", h = "", j = "";
        c && t.h.Z(c, function(a, c) {
            g += a + "=" + c + "&amp;";
        });
        d = t.h.A({
            movie: a,
            flashvars: g,
            allowScriptAccess: "always",
            allowNetworking: "all"
        }, d);
        t.h.Z(d, function(a, c) {
            h += '<param name="' + a + '" value="' + c + '" />';
        });
        e = t.h.A({
            data: a,
            width: "100%",
            height: "100%"
        }, e);
        t.h.Z(e, function(a, c) {
            j += a + '="' + c + '" ';
        });
        return '<object type="application/x-shockwave-flash"' + j + ">" + h + "</object>";
    };
    t.f.ee = function(a, c) {
        return a + "&" + c;
    };
    t.f.Nc = function(a) {
        var c = {
            xb: "",
            Rb: ""
        };
        if (!a) return c;
        var d = a.indexOf("&"), e;
        -1 !== d ? e = d + 1 : (d = e = a.lastIndexOf("/") + 1, 0 === d && (d = e = a.length));
        c.xb = a.substring(0, d);
        c.Rb = a.substring(e, a.length);
        return c;
    };
    t.f.Ed = function(a) {
        return a in t.f.Oc;
    };
    t.f.dd = /^rtmp[set]?:\/\//i;
    t.f.Dd = function(a) {
        return t.f.dd.test(a);
    };
    t.cd = t.a.extend({
        i: function(a, c, d) {
            t.a.call(this, a, c, d);
            if (!a.l.sources || 0 === a.l.sources.length) {
                c = 0;
                for (d = a.l.techOrder; c < d.length; c++) {
                    var e = t.ba(d[c]), g = window.videojs[e];
                    if (g && g.isSupported()) {
                        P(a, e);
                        break;
                    }
                }
            } else a.src(a.l.sources);
        }
    });
    t.Player.prototype.textTracks = function() {
        return this.Fa = this.Fa || [];
    };
    function ma(a, c, d, e, g) {
        var h = a.Fa = a.Fa || [];
        g = g || {};
        g.kind = c;
        g.label = d;
        g.language = e;
        c = t.ba(c || "subtitles");
        var j = new window.videojs[c + "Track"](a, g);
        h.push(j);
        j.Bb() && a.J(function() {
            setTimeout(function() {
                Y(j.j(), j.id());
            }, 0);
        });
    }
    function Y(a, c, d) {
        for (var e = a.Fa, g = 0, h = e.length, j, n; g < h; g++) j = e[g], j.id() === c ? (j.show(), 
        n = j) : d && j.K() == d && 0 < j.mode() && j.disable();
        (c = n ? n.K() : d ? d : l) && a.m(c + "trackchange");
    }
    t.C = t.a.extend({
        i: function(a, c) {
            t.a.call(this, a, c);
            this.U = c.id || "vjs_" + c.kind + "_" + c.language + "_" + t.z++;
            this.Kc = c.src;
            this.rd = c["default"] || c.dflt;
            this.he = c.title;
            this.Ua = c.srclang;
            this.Fd = c.label;
            this.ca = [];
            this.ub = [];
            this.na = this.oa = 0;
            this.c.d("fullscreenchange", t.bind(this, this.gd));
        }
    });
    s = t.C.prototype;
    s.K = p("H");
    s.src = p("Kc");
    s.Bb = p("rd");
    s.title = p("he");
    s.language = p("Ua");
    s.label = p("Fd");
    s.nd = p("ca");
    s.ed = p("ub");
    s.readyState = p("oa");
    s.mode = p("na");
    s.gd = function() {
        this.b.style.fontSize = this.c.isFullScreen() ? 140 * (screen.width / this.c.width()) + "%" : "";
    };
    s.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-" + this.H + " vjs-text-track"
        });
    };
    s.show = function() {
        na(this);
        this.na = 2;
        t.a.prototype.show.call(this);
    };
    s.W = function() {
        na(this);
        this.na = 1;
        t.a.prototype.W.call(this);
    };
    s.disable = function() {
        2 == this.na && this.W();
        this.c.p("timeupdate", t.bind(this, this.update, this.U));
        this.c.p("ended", t.bind(this, this.reset, this.U));
        this.reset();
        this.c.la("textTrackDisplay").removeChild(this);
        this.na = 0;
    };
    function na(a) {
        0 === a.oa && a.load();
        0 === a.na && (a.c.d("timeupdate", t.bind(a, a.update, a.U)), a.c.d("ended", t.bind(a, a.reset, a.U)), 
        ("captions" === a.H || "subtitles" === a.H) && a.c.la("textTrackDisplay").R(a));
    }
    s.load = function() {
        0 === this.oa && (this.oa = 1, t.get(this.Kc, t.bind(this, this.Ud), t.bind(this, this.Kd)));
    };
    s.Kd = function(a) {
        this.error = a;
        this.oa = 3;
        this.m("error");
    };
    s.Ud = function(a) {
        var c, d;
        a = a.split("\n");
        for (var e = "", g = 1, h = a.length; g < h; g++) if (e = t.trim(a[g])) {
            -1 == e.indexOf("-->") ? (c = e, e = t.trim(a[++g])) : c = this.ca.length;
            c = {
                id: c,
                index: this.ca.length
            };
            d = e.split(/[\t ]+/);
            c.startTime = oa(d[0]);
            c.ya = oa(d[2]);
            for (d = []; a[++g] && (e = t.trim(a[g])); ) d.push(e);
            c.text = d.join("<br/>");
            this.ca.push(c);
        }
        this.oa = 2;
        this.m("loaded");
    };
    function oa(a) {
        var c = a.split(":");
        a = 0;
        var d, e, g;
        3 == c.length ? (d = c[0], e = c[1], c = c[2]) : (d = 0, e = c[0], c = c[1]);
        c = c.split(/\s+/);
        c = c.splice(0, 1)[0];
        c = c.split(/\.|,/);
        g = parseFloat(c[1]);
        c = c[0];
        a += 3600 * parseFloat(d);
        a += 60 * parseFloat(e);
        a += parseFloat(c);
        g && (a += g / 1e3);
        return a;
    }
    s.update = function() {
        if (0 < this.ca.length) {
            var a = this.c.options().trackTimeOffset || 0, a = this.c.currentTime() + a;
            if (this.Pb === b || a < this.Pb || this.Xa <= a) {
                var c = this.ca, d = this.c.duration(), e = 0, g = l, h = [], j, n, q, w;
                a >= this.Xa || this.Xa === b ? w = this.Eb !== b ? this.Eb : 0 : (g = f, w = this.Kb !== b ? this.Kb : c.length - 1);
                for (;;) {
                    q = c[w];
                    if (q.ya <= a) e = Math.max(e, q.ya), q.Oa && (q.Oa = l); else if (a < q.startTime) {
                        if (d = Math.min(d, q.startTime), q.Oa && (q.Oa = l), !g) break;
                    } else g ? (h.splice(0, 0, q), n === b && (n = w), j = w) : (h.push(q), j === b && (j = w), 
                    n = w), d = Math.min(d, q.ya), e = Math.max(e, q.startTime), q.Oa = f;
                    if (g) if (0 === w) break; else w--; else if (w === c.length - 1) break; else w++;
                }
                this.ub = h;
                this.Xa = d;
                this.Pb = e;
                this.Eb = j;
                this.Kb = n;
                j = this.ub;
                n = "";
                a = 0;
                for (c = j.length; a < c; a++) n += '<span class="vjs-tt-cue">' + j[a].text + "</span>";
                this.b.innerHTML = n;
                this.m("cuechange");
            }
        }
    };
    s.reset = function() {
        this.Xa = 0;
        this.Pb = this.c.duration();
        this.Kb = this.Eb = 0;
    };
    t.Wb = t.C.extend();
    t.Wb.prototype.H = "captions";
    t.dc = t.C.extend();
    t.dc.prototype.H = "subtitles";
    t.Xb = t.C.extend();
    t.Xb.prototype.H = "chapters";
    t.fc = t.a.extend({
        i: function(a, c, d) {
            t.a.call(this, a, c, d);
            if (a.l.tracks && 0 < a.l.tracks.length) {
                c = this.c;
                a = a.l.tracks;
                for (var e = 0; e < a.length; e++) d = a[e], ma(c, d.kind, d.label, d.language, d);
            }
        }
    });
    t.fc.prototype.e = function() {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-text-track-display"
        });
    };
    t.aa = t.I.extend({
        i: function(a, c) {
            var d = this.fa = c.track;
            c.label = d.label();
            c.selected = d.Bb();
            t.I.call(this, a, c);
            this.c.d(d.K() + "trackchange", t.bind(this, this.update));
        }
    });
    t.aa.prototype.r = function() {
        t.I.prototype.r.call(this);
        Y(this.c, this.fa.U, this.fa.K());
    };
    t.aa.prototype.update = function() {
        this.selected(2 == this.fa.mode());
    };
    t.nb = t.aa.extend({
        i: function(a, c) {
            c.track = {
                K: function() {
                    return c.kind;
                },
                j: a,
                label: function() {
                    return c.kind + " off";
                },
                Bb: r(l),
                mode: r(l)
            };
            t.aa.call(this, a, c);
            this.selected(f);
        }
    });
    t.nb.prototype.r = function() {
        t.aa.prototype.r.call(this);
        Y(this.c, this.fa.U, this.fa.K());
    };
    t.nb.prototype.update = function() {
        for (var a = this.c.textTracks(), c = 0, d = a.length, e, g = f; c < d; c++) e = a[c], 
        e.K() == this.fa.K() && 2 == e.mode() && (g = l);
        this.selected(g);
    };
    t.V = t.L.extend({
        i: function(a, c) {
            t.L.call(this, a, c);
            1 >= this.O.length && this.W();
        }
    });
    t.V.prototype.wa = function() {
        var a = [], c;
        a.push(new t.nb(this.c, {
            kind: this.H
        }));
        for (var d = 0; d < this.c.textTracks().length; d++) c = this.c.textTracks()[d], 
        c.K() === this.H && a.push(new t.aa(this.c, {
            track: c
        }));
        return a;
    };
    t.Ha = t.V.extend({
        i: function(a, c, d) {
            t.V.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Captions Menu");
        }
    });
    t.Ha.prototype.H = "captions";
    t.Ha.prototype.ua = "Captions";
    t.Ha.prototype.className = "vjs-captions-button";
    t.Na = t.V.extend({
        i: function(a, c, d) {
            t.V.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Subtitles Menu");
        }
    });
    t.Na.prototype.H = "subtitles";
    t.Na.prototype.ua = "Subtitles";
    t.Na.prototype.className = "vjs-subtitles-button";
    t.Ia = t.V.extend({
        i: function(a, c, d) {
            t.V.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Chapters Menu");
        }
    });
    s = t.Ia.prototype;
    s.H = "chapters";
    s.ua = "Chapters";
    s.className = "vjs-chapters-button";
    s.wa = function() {
        for (var a = [], c, d = 0; d < this.c.textTracks().length; d++) c = this.c.textTracks()[d], 
        c.K() === this.H && a.push(new t.aa(this.c, {
            track: c
        }));
        return a;
    };
    s.xa = function() {
        for (var a = this.c.textTracks(), c = 0, d = a.length, e, g, h = this.O = []; c < d; c++) if (e = a[c], 
        e.K() == this.H) if (0 === e.readyState()) e.load(), e.d("loaded", t.bind(this, this.xa)); else {
            g = e;
            break;
        }
        a = this.Ba;
        a === b && (a = new t.ia(this.c), a.ka().appendChild(t.e("li", {
            className: "vjs-menu-title",
            innerHTML: t.ba(this.H),
            fe: -1
        })));
        if (g) {
            e = g.ca;
            for (var j, c = 0, d = e.length; c < d; c++) j = e[c], j = new t.hb(this.c, {
                track: g,
                cue: j
            }), h.push(j), a.R(j);
            this.R(a);
        }
        0 < this.O.length && this.show();
        return a;
    };
    t.hb = t.I.extend({
        i: function(a, c) {
            var d = this.fa = c.track, e = this.cue = c.cue, g = a.currentTime();
            c.label = e.text;
            c.selected = e.startTime <= g && g < e.ya;
            t.I.call(this, a, c);
            d.d("cuechange", t.bind(this, this.update));
        }
    });
    t.hb.prototype.r = function() {
        t.I.prototype.r.call(this);
        this.c.currentTime(this.cue.startTime);
        this.update(this.cue.startTime);
    };
    t.hb.prototype.update = function() {
        var a = this.cue, c = this.c.currentTime();
        this.selected(a.startTime <= c && c < a.ya);
    };
    t.h.A(t.Ja.prototype.l.children, {
        subtitlesButton: {},
        captionsButton: {},
        chaptersButton: {}
    });
    if ("undefined" !== typeof window.JSON && "function" === window.JSON.parse) t.JSON = window.JSON; else {
        t.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        t.JSON.parse = function(a, c) {
            function d(a, e) {
                var j, n, q = a[e];
                if (q && "object" === typeof q) for (j in q) Object.prototype.hasOwnProperty.call(q, j) && (n = d(q, j), 
                n !== b ? q[j] = n : delete q[j]);
                return c.call(a, e, q);
            }
            var e;
            a = String(a);
            Z.lastIndex = 0;
            Z.test(a) && (a = a.replace(Z, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }));
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), 
            "function" === typeof c ? d({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
        };
    }
    t.jc = function() {
        var a, c, d = document.getElementsByTagName("video");
        if (d && 0 < d.length) for (var e = 0, g = d.length; e < g; e++) if ((c = d[e]) && c.getAttribute) c.player === b && (a = c.getAttribute("data-setup"), 
        a !== k && (a = t.JSON.parse(a || "{}"), videojs(c, a))); else {
            t.vb();
            break;
        } else t.Tc || t.vb();
    };
    t.vb = function() {
        setTimeout(t.jc, 1);
    };
    "complete" === document.readyState ? t.Tc = f : t.X(window, "load", function() {
        t.Tc = f;
    });
    t.vb();
    t.Wd = function(a, c) {
        t.Player.prototype[a] = c;
    };
    var pa = this;
    function $(a, c) {
        var d = a.split("."), e = pa;
        !(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
        for (var g; d.length && (g = d.shift()); ) !d.length && c !== b ? e[g] = c : e = e[g] ? e[g] : e[g] = {};
    }
    $("videojs", t);
    $("_V_", t);
    $("videojs.options", t.options);
    $("videojs.players", t.Ca);
    $("videojs.TOUCH_ENABLED", t.ec);
    $("videojs.cache", t.va);
    $("videojs.Component", t.a);
    t.a.prototype.player = t.a.prototype.j;
    t.a.prototype.options = t.a.prototype.options;
    t.a.prototype.init = t.a.prototype.i;
    t.a.prototype.dispose = t.a.prototype.dispose;
    t.a.prototype.createEl = t.a.prototype.e;
    t.a.prototype.contentEl = t.a.prototype.ka;
    t.a.prototype.el = t.a.prototype.w;
    t.a.prototype.addChild = t.a.prototype.R;
    t.a.prototype.getChild = t.a.prototype.la;
    t.a.prototype.getChildById = t.a.prototype.zd;
    t.a.prototype.children = t.a.prototype.children;
    t.a.prototype.initChildren = t.a.prototype.vc;
    t.a.prototype.removeChild = t.a.prototype.removeChild;
    t.a.prototype.on = t.a.prototype.d;
    t.a.prototype.off = t.a.prototype.p;
    t.a.prototype.one = t.a.prototype.X;
    t.a.prototype.trigger = t.a.prototype.m;
    t.a.prototype.triggerReady = t.a.prototype.Ga;
    t.a.prototype.show = t.a.prototype.show;
    t.a.prototype.hide = t.a.prototype.W;
    t.a.prototype.width = t.a.prototype.width;
    t.a.prototype.height = t.a.prototype.height;
    t.a.prototype.dimensions = t.a.prototype.sd;
    t.a.prototype.ready = t.a.prototype.J;
    t.a.prototype.addClass = t.a.prototype.n;
    t.a.prototype.removeClass = t.a.prototype.q;
    t.a.prototype.buildCSSClass = t.a.prototype.T;
    t.a.prototype.localize = t.a.prototype.s;
    t.Player.prototype.ended = t.Player.prototype.ended;
    t.Player.prototype.enterFullWindow = t.Player.prototype.pc;
    t.Player.prototype.exitFullWindow = t.Player.prototype.Db;
    t.Player.prototype.preload = t.Player.prototype.Da;
    t.Player.prototype.remainingTime = t.Player.prototype.remainingTime;
    t.Player.prototype.supportsFullScreen = t.Player.prototype.Ea;
    t.Player.prototype.currentType = t.Player.prototype.od;
    t.Player.prototype.language = t.Player.prototype.language;
    t.Player.prototype.languages = t.Player.prototype.Va;
    $("videojs.MediaLoader", t.cd);
    $("videojs.TextTrackDisplay", t.fc);
    $("videojs.ControlBar", t.Ja);
    $("videojs.Button", t.t);
    $("videojs.PlayToggle", t.ac);
    $("videojs.FullscreenToggle", t.Ka);
    $("videojs.BigPlayButton", t.gb);
    $("videojs.LoadingSpinner", t.Zb);
    $("videojs.CurrentTimeDisplay", t.ib);
    $("videojs.DurationDisplay", t.jb);
    $("videojs.TimeDivider", t.gc);
    $("videojs.RemainingTimeDisplay", t.qb);
    $("videojs.LiveDisplay", t.Yb);
    $("videojs.ErrorDisplay", t.kb);
    $("videojs.Slider", t.Q);
    $("videojs.ProgressControl", t.pb);
    $("videojs.SeekBar", t.cc);
    $("videojs.LoadProgressBar", t.mb);
    $("videojs.PlayProgressBar", t.$b);
    $("videojs.SeekHandle", t.Ma);
    $("videojs.VolumeControl", t.sb);
    $("videojs.VolumeBar", t.rb);
    $("videojs.VolumeLevel", t.hc);
    $("videojs.VolumeMenuButton", t.sa);
    $("videojs.VolumeHandle", t.tb);
    $("videojs.MuteToggle", t.ja);
    $("videojs.PosterImage", t.La);
    $("videojs.Menu", t.ia);
    $("videojs.MenuItem", t.I);
    $("videojs.MenuButton", t.L);
    $("videojs.PlaybackRateMenuButton", t.bc);
    t.L.prototype.createItems = t.L.prototype.wa;
    t.V.prototype.createItems = t.V.prototype.wa;
    t.Ia.prototype.createItems = t.Ia.prototype.wa;
    $("videojs.SubtitlesButton", t.Na);
    $("videojs.CaptionsButton", t.Ha);
    $("videojs.ChaptersButton", t.Ia);
    $("videojs.MediaTechController", t.u);
    t.u.prototype.features = t.u.prototype.o;
    t.u.prototype.o.volumeControl = t.u.prototype.o.Sc;
    t.u.prototype.o.fullscreenResize = t.u.prototype.o.oe;
    t.u.prototype.o.progressEvents = t.u.prototype.o.re;
    t.u.prototype.o.timeupdateEvents = t.u.prototype.o.ue;
    t.u.prototype.setPoster = t.u.prototype.Jc;
    $("videojs.Html5", t.g);
    t.g.Events = t.g.lb;
    t.g.isSupported = t.g.isSupported;
    t.g.canPlaySource = t.g.wb;
    t.g.patchCanPlayType = t.g.Bc;
    t.g.unpatchCanPlayType = t.g.je;
    t.g.prototype.setCurrentTime = t.g.prototype.Qb;
    t.g.prototype.setVolume = t.g.prototype.de;
    t.g.prototype.setMuted = t.g.prototype.ae;
    t.g.prototype.setPreload = t.g.prototype.ce;
    t.g.prototype.setAutoplay = t.g.prototype.Yd;
    t.g.prototype.setLoop = t.g.prototype.$d;
    t.g.prototype.enterFullScreen = t.g.prototype.oc;
    t.g.prototype.exitFullScreen = t.g.prototype.wd;
    t.g.prototype.playbackRate = t.g.prototype.playbackRate;
    t.g.prototype.setPlaybackRate = t.g.prototype.be;
    $("videojs.Flash", t.f);
    t.f.isSupported = t.f.isSupported;
    t.f.canPlaySource = t.f.wb;
    t.f.onReady = t.f.onReady;
    $("videojs.TextTrack", t.C);
    t.C.prototype.label = t.C.prototype.label;
    t.C.prototype.kind = t.C.prototype.K;
    t.C.prototype.mode = t.C.prototype.mode;
    t.C.prototype.cues = t.C.prototype.nd;
    t.C.prototype.activeCues = t.C.prototype.ed;
    $("videojs.CaptionsTrack", t.Wb);
    $("videojs.SubtitlesTrack", t.dc);
    $("videojs.ChaptersTrack", t.Xb);
    $("videojs.autoSetup", t.jc);
    $("videojs.plugin", t.Wd);
    $("videojs.createTimeRange", t.Ab);
    $("videojs.util", t.ha);
    t.ha.mergeOptions = t.ha.Wa;
    t.addLanguage = t.fd;
})();
