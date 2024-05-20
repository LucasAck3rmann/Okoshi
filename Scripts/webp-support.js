﻿/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
!function (e, n, A) { function o(e) { var n = r.className, A = Modernizr._config.classPrefix || ""; if (l && (n = n.baseVal), Modernizr._config.enableJSClass) { var o = new RegExp("(^|\\s)" + A + "no-js(\\s|$)"); n = n.replace(o, "$1" + A + "js$2") } Modernizr._config.enableClasses && (n += " " + A + e.join(" " + A), l ? r.className.baseVal = n : r.className = n) } function t(e, n) { return typeof e === n } function a() { var e, n, A, o, a, i, r; for (var l in f) if (f.hasOwnProperty(l)) { if (e = [], n = f[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (A = 0; A < n.options.aliases.length; A++)e.push(n.options.aliases[A].toLowerCase()); for (o = t(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++)i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = o : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = o), s.push((o ? "" : "no-") + r.join("-")) } } function i(e, n) { if ("object" == typeof e) for (var A in e) c(e, A) && i(A, e[A]); else { e = e.toLowerCase(); var t = e.split("."), a = Modernizr[t[0]]; if (2 == t.length && (a = a[t[1]]), "undefined" != typeof a) return Modernizr; n = "function" == typeof n ? n() : n, 1 == t.length ? Modernizr[t[0]] = n : (!Modernizr[t[0]] || Modernizr[t[0]] instanceof Boolean || (Modernizr[t[0]] = new Boolean(Modernizr[t[0]])), Modernizr[t[0]][t[1]] = n), o([(n && 0 != n ? "" : "no-") + t.join("-")]), Modernizr._trigger(e, n) } return Modernizr } var s = [], r = n.documentElement, l = "svg" === r.nodeName.toLowerCase(), f = [], u = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { var A = this; setTimeout(function () { n(A[e]) }, 0) }, addTest: function (e, n, A) { f.push({ name: e, fn: n, options: A }) }, addAsyncTest: function (e) { f.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = u, Modernizr = new Modernizr; var c; !function () { var e = {}.hasOwnProperty; c = t(e, "undefined") || t(e.call, "undefined") ? function (e, n) { return n in e && t(e.constructor.prototype[n], "undefined") } : function (n, A) { return e.call(n, A) } }(), u._l = {}, u.on = function (e, n) { this._l[e] || (this._l[e] = []), this._l[e].push(n), Modernizr.hasOwnProperty(e) && setTimeout(function () { Modernizr._trigger(e, Modernizr[e]) }, 0) }, u._trigger = function (e, n) { if (this._l[e]) { var A = this._l[e]; setTimeout(function () { var e, o; for (e = 0; e < A.length; e++)(o = A[e])(n) }, 0), delete this._l[e] } }, Modernizr._q.push(function () { u.addTest = i }), Modernizr.addAsyncTest(function () { function e(e, n, A) { function o(n) { var o = n && "load" === n.type ? 1 == t.width : !1, a = "webp" === e; i(e, a && o ? new Boolean(o) : o), A && A(n) } var t = new Image; t.onerror = o, t.onload = o, t.src = n } var n = [{ uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=", name: "webp" }, { uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", name: "webp.alpha" }, { uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA", name: "webp.animation" }, { uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=", name: "webp.lossless" }], A = n.shift(); e(A.name, A.uri, function (A) { if (A && "load" === A.type) for (var o = 0; o < n.length; o++)e(n[o].name, n[o].uri) }) }), a(), o(s), delete u.addTest, delete u.addAsyncTest; for (var p = 0; p < Modernizr._q.length; p++)Modernizr._q[p](); e.Modernizr = Modernizr }(window, document);

function webpImages() {
    Modernizr.on('webp', function (result) {
        if (!result) {

            $("body").addClass("no-webp");

            const extToCheck = ["jpg", "jpeg", "png", "gif"];

            //TAG <img />
            $("img").each(function () {

                const $img = $(this);

                var img = $(this).attr("src");
                var ext = img.substring(img.lastIndexOf('.') + 1, img.length) || img;

                if (ext === "webp") {

                    var fileName = img.replace(ext, "");
                    var domainName = window.location.href.split("/");
                    var fileURL = domainName[0] + "//" + domainName[2] + fileName;

                    $.each(extToCheck, function (i, value) {
                        $.get(fileURL + value).done(function () {
                            var existentFile = fileURL + value;

                            $img.attr("src", existentFile);
                        });
                    });
                }

            });

            //links
            $("a").each(function () {
                const $link = $(this);

                var link = $(this).attr("href");
                var ext = link.substring(link.lastIndexOf('.') + 1, link.length) || link;
                var linkURL = link.replace(ext, "");

                if (ext === "webp") {
                    $.each(extToCheck, function (i, value) {
                        $.get(linkURL + value).done(function () {
                            var existentFile = linkURL + value;

                            $link.attr("href", existentFile);
                        });
                    });
                }
            });

            //background
            $("*").each(function () {

                const $bgItem = $(this);

                var bgImg = $(this).css("background-image");
                var imgFile = bgImg.replace('url("', "").replace('")', "");
                var ext = imgFile.substring(imgFile.lastIndexOf('.') + 1, imgFile.length) || imgFile;
                var imgPath = imgFile.replace(ext, "");

                if (bgImg !== "none") {

                    if (ext === "webp") {

                        $.each(extToCheck, function (i, value) {
                            $.get(imgPath + value).done(function () {
                                var existentFile = imgPath + value;

                                $bgItem.css("background-image", "url(" + existentFile + ")");
                            });
                        });
                    }
                }
            });
        }
    });
}

webpImages();