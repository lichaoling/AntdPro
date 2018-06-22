/* esri-leaflet - v2.1.1 - Fri Aug 11 2017 12:59:40 GMT-0700 (PDT)
 * Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('leaflet'))
    : 'function' == typeof define && define.amd
      ? define(['exports', 'leaflet'], e)
      : e(((t.L = t.L || {}), (t.L.esri = t.L.esri || {})), t.L);
})(this, function(t, e) {
  'use strict';
  function i(t) {
    var e = '';
    t.f = t.f || 'json';
    for (var i in t)
      if (t.hasOwnProperty(i)) {
        var s,
          r = t[i],
          n = Object.prototype.toString.call(r);
        e.length && (e += '&'),
          (s =
            '[object Array]' === n
              ? '[object Object]' === Object.prototype.toString.call(r[0])
                ? JSON.stringify(r)
                : r.join(',')
              : '[object Object]' === n
                ? JSON.stringify(r)
                : '[object Date]' === n ? r.valueOf() : r),
          (e += encodeURIComponent(i) + '=' + encodeURIComponent(s));
      }
    return e;
  }
  function s(t, i) {
    var s = new window.XMLHttpRequest();
    return (
      (s.onerror = function(r) {
        (s.onreadystatechange = e.Util.falseFn),
          t.call(i, { error: { code: 500, message: 'XMLHttpRequest error' } }, null);
      }),
      (s.onreadystatechange = function() {
        var r, n;
        if (4 === s.readyState) {
          try {
            r = JSON.parse(s.responseText);
          } catch (t) {
            (r = null),
              (n = {
                code: 500,
                message:
                  'Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error.',
              });
          }
          !n && r.error && ((n = r.error), (r = null)),
            (s.onerror = e.Util.falseFn),
            t.call(i, n, r);
        }
      }),
      (s.ontimeout = function() {
        this.onerror();
      }),
      s
    );
  }
  function r(t, e, r, n) {
    var o = s(r, n);
    return (
      o.open('POST', t),
      void 0 !== n && null !== n && void 0 !== n.options && (o.timeout = n.options.timeout),
      o.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
      o.send(i(e)),
      o
    );
  }
  function n(t, e, r, n) {
    var o = s(r, n);
    return (
      o.open('GET', t + '?' + i(e), !0),
      void 0 !== n && null !== n && void 0 !== n.options && (o.timeout = n.options.timeout),
      o.send(null),
      o
    );
  }
  function o(t, e, r, n) {
    var o = i(e),
      u = s(r, n),
      l = (t + '?' + o).length;
    if (
      (l <= 2e3 && it.cors
        ? u.open('GET', t + '?' + o)
        : l > 2e3 &&
          it.cors &&
          (u.open('POST', t),
          u.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')),
      void 0 !== n && null !== n && void 0 !== n.options && (u.timeout = n.options.timeout),
      l <= 2e3 && it.cors)
    )
      u.send(null);
    else {
      if (!(l > 2e3 && it.cors))
        return l <= 2e3 && !it.cors
          ? a(t, e, r, n)
          : void P(
              'a request to ' +
                t +
                ' was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html'
            );
      u.send(o);
    }
    return u;
  }
  function a(t, s, r, n) {
    window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
    var o = 'c' + rt;
    (s.callback = 'window._EsriLeafletCallbacks.' + o),
      (window._EsriLeafletCallbacks[o] = function(t) {
        if (!0 !== window._EsriLeafletCallbacks[o]) {
          var e,
            i = Object.prototype.toString.call(t);
          '[object Object]' !== i &&
            '[object Array]' !== i &&
            ((e = { error: { code: 500, message: 'Expected array or object as JSONP response' } }),
            (t = null)),
            !e && t.error && ((e = t), (t = null)),
            r.call(n, e, t),
            (window._EsriLeafletCallbacks[o] = !0);
        }
      });
    var a = e.DomUtil.create('script', null, document.body);
    return (
      (a.type = 'text/javascript'),
      (a.src = t + '?' + i(s)),
      (a.id = o),
      rt++,
      {
        id: o,
        url: a.src,
        abort: function() {
          window._EsriLeafletCallbacks._callback[o]({ code: 0, message: 'Request aborted.' });
        },
      }
    );
  }
  function u(t, e) {
    for (var i = 0; i < t.length; i++) if (t[i] !== e[i]) return !1;
    return !0;
  }
  function l(t) {
    return u(t[0], t[t.length - 1]) || t.push(t[0]), t;
  }
  function h(t) {
    var e,
      i = 0,
      s = 0,
      r = t.length,
      n = t[s];
    for (s; s < r - 1; s++) (e = t[s + 1]), (i += (e[0] - n[0]) * (e[1] + n[1])), (n = e);
    return i >= 0;
  }
  function c(t, e, i, s) {
    var r = (s[0] - i[0]) * (t[1] - i[1]) - (s[1] - i[1]) * (t[0] - i[0]),
      n = (e[0] - t[0]) * (t[1] - i[1]) - (e[1] - t[1]) * (t[0] - i[0]),
      o = (s[1] - i[1]) * (e[0] - t[0]) - (s[0] - i[0]) * (e[1] - t[1]);
    if (0 !== o) {
      var a = r / o,
        u = n / o;
      if (a >= 0 && a <= 1 && u >= 0 && u <= 1) return !0;
    }
    return !1;
  }
  function p(t, e) {
    for (var i = 0; i < t.length - 1; i++)
      for (var s = 0; s < e.length - 1; s++) if (c(t[i], t[i + 1], e[s], e[s + 1])) return !0;
    return !1;
  }
  function d(t, e) {
    for (var i = !1, s = -1, r = t.length, n = r - 1; ++s < r; n = s)
      ((t[s][1] <= e[1] && e[1] < t[n][1]) || (t[n][1] <= e[1] && e[1] < t[s][1])) &&
        e[0] < (t[n][0] - t[s][0]) * (e[1] - t[s][1]) / (t[n][1] - t[s][1]) + t[s][0] &&
        (i = !i);
    return i;
  }
  function m(t, e) {
    var i = p(t, e),
      s = d(t, e[0]);
    return !(i || !s);
  }
  function f(t) {
    for (var e, i, s, r = [], n = [], o = 0; o < t.length; o++) {
      var a = l(t[o].slice(0));
      if (!(a.length < 4))
        if (h(a)) {
          var u = [a];
          r.push(u);
        } else n.push(a);
    }
    for (var c = []; n.length; ) {
      s = n.pop();
      var d = !1;
      for (e = r.length - 1; e >= 0; e--)
        if (((i = r[e][0]), m(i, s))) {
          r[e].push(s), (d = !0);
          break;
        }
      d || c.push(s);
    }
    for (; c.length; ) {
      s = c.pop();
      var f = !1;
      for (e = r.length - 1; e >= 0; e--)
        if (((i = r[e][0]), p(i, s))) {
          r[e].push(s), (f = !0);
          break;
        }
      f || r.push([s.reverse()]);
    }
    return 1 === r.length
      ? { type: 'Polygon', coordinates: r[0] }
      : { type: 'MultiPolygon', coordinates: r };
  }
  function y(t) {
    var e = [],
      i = t.slice(0),
      s = l(i.shift().slice(0));
    if (s.length >= 4) {
      h(s) || s.reverse(), e.push(s);
      for (var r = 0; r < i.length; r++) {
        var n = l(i[r].slice(0));
        n.length >= 4 && (h(n) && n.reverse(), e.push(n));
      }
    }
    return e;
  }
  function g(t) {
    for (var e = [], i = 0; i < t.length; i++)
      for (var s = y(t[i]), r = s.length - 1; r >= 0; r--) {
        var n = s[r].slice(0);
        e.push(n);
      }
    return e;
  }
  function _(t) {
    var e = {};
    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
    return e;
  }
  function v(t, e) {
    var i = {};
    return (
      'number' == typeof t.x &&
        'number' == typeof t.y &&
        ((i.type = 'Point'), (i.coordinates = [t.x, t.y])),
      t.points && ((i.type = 'MultiPoint'), (i.coordinates = t.points.slice(0))),
      t.paths &&
        (1 === t.paths.length
          ? ((i.type = 'LineString'), (i.coordinates = t.paths[0].slice(0)))
          : ((i.type = 'MultiLineString'), (i.coordinates = t.paths.slice(0)))),
      t.rings && (i = f(t.rings.slice(0))),
      (t.geometry || t.attributes) &&
        ((i.type = 'Feature'),
        (i.geometry = t.geometry ? v(t.geometry) : null),
        (i.properties = t.attributes ? _(t.attributes) : null),
        t.attributes && (i.id = t.attributes[e] || t.attributes.OBJECTID || t.attributes.FID)),
      i
    );
  }
  function b(t, e) {
    e = e || 'OBJECTID';
    var i,
      s = { wkid: 4326 },
      r = {};
    switch (t.type) {
      case 'Point':
        (r.x = t.coordinates[0]), (r.y = t.coordinates[1]), (r.spatialReference = s);
        break;
      case 'MultiPoint':
        (r.points = t.coordinates.slice(0)), (r.spatialReference = s);
        break;
      case 'LineString':
        (r.paths = [t.coordinates.slice(0)]), (r.spatialReference = s);
        break;
      case 'MultiLineString':
        (r.paths = t.coordinates.slice(0)), (r.spatialReference = s);
        break;
      case 'Polygon':
        (r.rings = y(t.coordinates.slice(0))), (r.spatialReference = s);
        break;
      case 'MultiPolygon':
        (r.rings = g(t.coordinates.slice(0))), (r.spatialReference = s);
        break;
      case 'Feature':
        t.geometry && (r.geometry = b(t.geometry, e)),
          (r.attributes = t.properties ? _(t.properties) : {}),
          t.id && (r.attributes[e] = t.id);
        break;
      case 'FeatureCollection':
        for (r = [], i = 0; i < t.features.length; i++) r.push(b(t.features[i], e));
        break;
      case 'GeometryCollection':
        for (r = [], i = 0; i < t.geometries.length; i++) r.push(b(t.geometries[i], e));
    }
    return r;
  }
  function x(t, e) {
    return b(t, e);
  }
  function S(t, e) {
    return v(t, e);
  }
  function A(t) {
    var e = {};
    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
    return e;
  }
  function T(t) {
    if ('NaN' !== t.xmin && 'NaN' !== t.ymin && 'NaN' !== t.xmax && 'NaN' !== t.ymax) {
      var i = e.latLng(t.ymin, t.xmin),
        s = e.latLng(t.ymax, t.xmax);
      return e.latLngBounds(i, s);
    }
    return null;
  }
  function I(t) {
    return (
      (t = e.latLngBounds(t)),
      {
        xmin: t.getSouthWest().lng,
        ymin: t.getSouthWest().lat,
        xmax: t.getNorthEast().lng,
        ymax: t.getNorthEast().lat,
        spatialReference: { wkid: 4326 },
      }
    );
  }
  function w(t, e) {
    var i,
      s = t.features || t.results,
      r = s.length;
    if (e) i = e;
    else if (t.objectIdFieldName) i = t.objectIdFieldName;
    else if (t.fields) {
      for (var n = 0; n <= t.fields.length - 1; n++)
        if ('esriFieldTypeOID' === t.fields[n].type) {
          i = t.fields[n].name;
          break;
        }
    } else if (r)
      for (var o in s[0].attributes)
        if (o.match(/^(OBJECTID|FID|OID|ID)$/i)) {
          i = o;
          break;
        }
    var a = { type: 'FeatureCollection', features: [] };
    if (r)
      for (var u = s.length - 1; u >= 0; u--) {
        var l = S(s[u], i);
        a.features.push(l);
      }
    return a;
  }
  function R(t) {
    return (t = e.Util.trim(t)), '/' !== t[t.length - 1] && (t += '/'), t;
  }
  function C(t) {
    return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t);
  }
  function O(t) {
    var e;
    switch (t) {
      case 'Point':
        e = 'esriGeometryPoint';
        break;
      case 'MultiPoint':
        e = 'esriGeometryMultipoint';
        break;
      case 'LineString':
      case 'MultiLineString':
        e = 'esriGeometryPolyline';
        break;
      case 'Polygon':
      case 'MultiPolygon':
        e = 'esriGeometryPolygon';
    }
    return e;
  }
  function P() {
    console && console.warn && console.warn.apply(console, arguments);
  }
  function F(t) {
    return t.getSize().x - st.attributionWidthOffset + 'px';
  }
  function k(t) {
    if (t.attributionControl && !t.attributionControl._esriAttributionAdded) {
      t.attributionControl.setPrefix(
        '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com">Esri</a>'
      );
      var i = document.createElement('style');
      (i.type = 'text/css'),
        (i.innerHTML = '.esri-truncated-attribution:hover {white-space: normal;}'),
        document.getElementsByTagName('head')[0].appendChild(i),
        e.DomUtil.addClass(t.attributionControl._container, 'esri-truncated-attribution:hover');
      var s = document.createElement('style');
      (s.type = 'text/css'),
        (s.innerHTML =
          '.esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: ' +
          F(t) +
          ';}'),
        document.getElementsByTagName('head')[0].appendChild(s),
        e.DomUtil.addClass(t.attributionControl._container, 'esri-truncated-attribution'),
        t.on('resize', function(e) {
          t.attributionControl._container.style.maxWidth = F(e.target);
        }),
        (t.attributionControl._esriAttributionAdded = !0);
    }
  }
  function M(t) {
    var i = { geometry: null, geometryType: null };
    return t instanceof e.LatLngBounds
      ? ((i.geometry = I(t)), (i.geometryType = 'esriGeometryEnvelope'), i)
      : (t.getLatLng && (t = t.getLatLng()),
        t instanceof e.LatLng && (t = { type: 'Point', coordinates: [t.lng, t.lat] }),
        t instanceof e.GeoJSON &&
          ((t = t.getLayers()[0].feature.geometry),
          (i.geometry = x(t)),
          (i.geometryType = O(t.type))),
        t.toGeoJSON && (t = t.toGeoJSON()),
        'Feature' === t.type && (t = t.geometry),
        'Point' === t.type ||
        'LineString' === t.type ||
        'Polygon' === t.type ||
        'MultiPolygon' === t.type
          ? ((i.geometry = x(t)), (i.geometryType = O(t.type)), i)
          : void P(
              'invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object'
            ));
  }
  function U(t, i) {
    a(
      t,
      {},
      e.Util.bind(function(t, s) {
        if (!t) {
          i._esriAttributions = [];
          for (var r = 0; r < s.contributors.length; r++)
            for (var n = s.contributors[r], o = 0; o < n.coverageAreas.length; o++) {
              var a = n.coverageAreas[o],
                u = e.latLng(a.bbox[0], a.bbox[1]),
                l = e.latLng(a.bbox[2], a.bbox[3]);
              i._esriAttributions.push({
                attribution: n.attribution,
                score: a.score,
                bounds: e.latLngBounds(u, l),
                minZoom: a.zoomMin,
                maxZoom: a.zoomMax,
              });
            }
          i._esriAttributions.sort(function(t, e) {
            return e.score - t.score;
          });
          G({ target: i });
        }
      }, this)
    );
  }
  function G(t) {
    var i = t.target,
      s = i._esriAttributions;
    if (i && i.attributionControl && s) {
      for (
        var r = '',
          n = i.getBounds(),
          o = e.latLngBounds(n.getSouthWest().wrap(), n.getNorthEast().wrap()),
          a = i.getZoom(),
          u = 0;
        u < s.length;
        u++
      ) {
        var l = s[u],
          h = l.attribution;
        !r.match(h) &&
          l.bounds.intersects(o) &&
          a >= l.minZoom &&
          a <= l.maxZoom &&
          (r += ', ' + h);
      }
      r = r.substr(2);
      var c = i.attributionControl._container.querySelector('.esri-dynamic-attribution');
      (c.innerHTML = r),
        (c.style.maxWidth = F(i)),
        i.fire('attributionupdated', { attribution: r });
    }
  }
  function q(t) {
    return new ut(t);
  }
  function D(t) {
    return new lt(t);
  }
  function B(t) {
    return new ht(t);
  }
  function E(t) {
    return new ct(t);
  }
  function z(t) {
    return new pt(t);
  }
  function N(t) {
    return new dt(t);
  }
  function j(t) {
    return new mt(t);
  }
  function Z(t) {
    return new ft(t);
  }
  function W(t) {
    return new yt(t);
  }
  function J(t) {
    return new gt(t);
  }
  function Q(t, e) {
    return new vt(t, e);
  }
  function H(t, e) {
    return new bt(t, e);
  }
  function V(t, e) {
    return new St(t, e);
  }
  function K(t, e) {
    return new At(t, e);
  }
  function X(t) {
    this.values = [].concat(t || []);
  }
  function $(t) {
    return new wt(t);
  }
  var Y = 'default' in e ? e.default : e,
    tt = window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest(),
    et = '' === document.documentElement.style.pointerEvents,
    it = { cors: tt, pointerEvents: et },
    st = { attributionWidthOffset: 55 },
    rt = 0,
    nt = it.cors ? n : a;
  (nt.CORS = n), (nt.JSONP = a);
  var ot = { request: o, get: nt, post: r },
    at = {
      shallowClone: A,
      warn: P,
      cleanUrl: R,
      isArcgisOnline: C,
      geojsonTypeToArcGIS: O,
      responseToFeatureCollection: w,
      geojsonToArcGIS: x,
      arcgisToGeoJSON: S,
      boundsToExtent: I,
      extentToBounds: T,
      calcAttributionWidth: F,
      setEsriAttribution: k,
      _setGeometry: M,
      _getAttributionData: U,
      _updateMapAttribution: G,
    },
    ut = e.Class.extend({
      options: { proxy: !1, useCors: tt },
      generateSetter: function(t, i) {
        return e.Util.bind(function(e) {
          return (this.params[t] = e), this;
        }, i);
      },
      initialize: function(t) {
        if (
          (t.request && t.options
            ? ((this._service = t), e.Util.setOptions(this, t.options))
            : (e.Util.setOptions(this, t), (this.options.url = R(t.url))),
          (this.params = e.Util.extend({}, this.params || {})),
          this.setters)
        )
          for (var i in this.setters) {
            var s = this.setters[i];
            this[i] = this.generateSetter(s, this);
          }
      },
      token: function(t) {
        return this._service ? this._service.authenticate(t) : (this.params.token = t), this;
      },
      format: function(t) {
        return (this.params.returnUnformattedValues = !t), this;
      },
      request: function(t, e) {
        return this._service
          ? this._service.request(this.path, this.params, t, e)
          : this._request('request', this.path, this.params, t, e);
      },
      _request: function(t, e, i, s, r) {
        var n = this.options.proxy
          ? this.options.proxy + '?' + this.options.url + e
          : this.options.url + e;
        return ('get' !== t && 'request' !== t) || this.options.useCors
          ? ot[t](n, i, s, r)
          : ot.get.JSONP(n, i, s, r);
      },
    }),
    lt = ut.extend({
      setters: {
        offset: 'resultOffset',
        limit: 'resultRecordCount',
        fields: 'outFields',
        precision: 'geometryPrecision',
        featureIds: 'objectIds',
        returnGeometry: 'returnGeometry',
        transform: 'datumTransformation',
        token: 'token',
      },
      path: 'query',
      params: { returnGeometry: !0, where: '1=1', outSr: 4326, outFields: '*' },
      within: function(t) {
        return (
          this._setGeometryParams(t), (this.params.spatialRel = 'esriSpatialRelContains'), this
        );
      },
      intersects: function(t) {
        return (
          this._setGeometryParams(t), (this.params.spatialRel = 'esriSpatialRelIntersects'), this
        );
      },
      contains: function(t) {
        return this._setGeometryParams(t), (this.params.spatialRel = 'esriSpatialRelWithin'), this;
      },
      crosses: function(t) {
        return this._setGeometryParams(t), (this.params.spatialRel = 'esriSpatialRelCrosses'), this;
      },
      touches: function(t) {
        return this._setGeometryParams(t), (this.params.spatialRel = 'esriSpatialRelTouches'), this;
      },
      overlaps: function(t) {
        return (
          this._setGeometryParams(t), (this.params.spatialRel = 'esriSpatialRelOverlaps'), this
        );
      },
      bboxIntersects: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = 'esriSpatialRelEnvelopeIntersects'),
          this
        );
      },
      indexIntersects: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = 'esriSpatialRelIndexIntersects'),
          this
        );
      },
      nearby: function(t, i) {
        return (
          (t = e.latLng(t)),
          (this.params.geometry = [t.lng, t.lat]),
          (this.params.geometryType = 'esriGeometryPoint'),
          (this.params.spatialRel = 'esriSpatialRelIntersects'),
          (this.params.units = 'esriSRUnit_Meter'),
          (this.params.distance = i),
          (this.params.inSr = 4326),
          this
        );
      },
      where: function(t) {
        return (this.params.where = t), this;
      },
      between: function(t, e) {
        return (this.params.time = [t.valueOf(), e.valueOf()]), this;
      },
      simplify: function(t, e) {
        var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
        return (this.params.maxAllowableOffset = i / t.getSize().y * e), this;
      },
      orderBy: function(t, e) {
        return (
          (e = e || 'ASC'),
          (this.params.orderByFields = this.params.orderByFields
            ? this.params.orderByFields + ','
            : ''),
          (this.params.orderByFields += [t, e].join(' ')),
          this
        );
      },
      run: function(t, e) {
        return (
          this._cleanParams(),
          this.options.isModern || C(this.options.url)
            ? ((this.params.f = 'geojson'),
              this.request(function(i, s) {
                this._trapSQLerrors(i), t.call(e, i, s, s);
              }, this))
            : this.request(function(i, s) {
                this._trapSQLerrors(i), t.call(e, i, s && w(s), s);
              }, this)
        );
      },
      count: function(t, e) {
        return (
          this._cleanParams(),
          (this.params.returnCountOnly = !0),
          this.request(function(e, i) {
            t.call(this, e, i && i.count, i);
          }, e)
        );
      },
      ids: function(t, e) {
        return (
          this._cleanParams(),
          (this.params.returnIdsOnly = !0),
          this.request(function(e, i) {
            t.call(this, e, i && i.objectIds, i);
          }, e)
        );
      },
      bounds: function(t, e) {
        return (
          this._cleanParams(),
          (this.params.returnExtentOnly = !0),
          this.request(function(i, s) {
            s && s.extent && T(s.extent)
              ? t.call(e, i, T(s.extent), s)
              : ((i = { message: 'Invalid Bounds' }), t.call(e, i, null, s));
          }, e)
        );
      },
      pixelSize: function(t) {
        var i = e.point(t);
        return (this.params.pixelSize = [i.x, i.y]), this;
      },
      layer: function(t) {
        return (this.path = t + '/query'), this;
      },
      _trapSQLerrors: function(t) {
        t &&
          '400' === t.code &&
          P(
            'one common syntax error in query requests is encasing string values in double quotes instead of single quotes'
          );
      },
      _cleanParams: function() {
        delete this.params.returnIdsOnly,
          delete this.params.returnExtentOnly,
          delete this.params.returnCountOnly;
      },
      _setGeometryParams: function(t) {
        this.params.inSr = 4326;
        var e = M(t);
        (this.params.geometry = e.geometry), (this.params.geometryType = e.geometryType);
      },
    }),
    ht = ut.extend({
      setters: {
        contains: 'contains',
        text: 'searchText',
        fields: 'searchFields',
        spatialReference: 'sr',
        sr: 'sr',
        layers: 'layers',
        returnGeometry: 'returnGeometry',
        maxAllowableOffset: 'maxAllowableOffset',
        precision: 'geometryPrecision',
        dynamicLayers: 'dynamicLayers',
        returnZ: 'returnZ',
        returnM: 'returnM',
        gdbVersion: 'gdbVersion',
        token: 'token',
      },
      path: 'find',
      params: { sr: 4326, contains: !0, returnGeometry: !0, returnZ: !0, returnM: !1 },
      layerDefs: function(t, e) {
        return (
          (this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ';' : ''),
          (this.params.layerDefs += [t, e].join(':')),
          this
        );
      },
      simplify: function(t, e) {
        var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
        return (this.params.maxAllowableOffset = i / t.getSize().y * e), this;
      },
      run: function(t, e) {
        return this.request(function(i, s) {
          t.call(e, i, s && w(s), s);
        }, e);
      },
    }),
    ct = ut.extend({
      path: 'identify',
      between: function(t, e) {
        return (this.params.time = [t.valueOf(), e.valueOf()]), this;
      },
    }),
    pt = ct.extend({
      setters: {
        layers: 'layers',
        precision: 'geometryPrecision',
        tolerance: 'tolerance',
        returnGeometry: 'returnGeometry',
      },
      params: { sr: 4326, layers: 'all', tolerance: 3, returnGeometry: !0 },
      on: function(t) {
        var e = I(t.getBounds()),
          i = t.getSize();
        return (
          (this.params.imageDisplay = [i.x, i.y, 96]),
          (this.params.mapExtent = [e.xmin, e.ymin, e.xmax, e.ymax]),
          this
        );
      },
      at: function(t) {
        return 2 === t.length && (t = e.latLng(t)), this._setGeometryParams(t), this;
      },
      layerDef: function(t, e) {
        return (
          (this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ';' : ''),
          (this.params.layerDefs += [t, e].join(':')),
          this
        );
      },
      simplify: function(t, e) {
        var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
        return (this.params.maxAllowableOffset = i / t.getSize().y * e), this;
      },
      run: function(t, e) {
        return this.request(function(i, s) {
          if (i) return void t.call(e, i, void 0, s);
          var r = w(s);
          s.results = s.results.reverse();
          for (var n = 0; n < r.features.length; n++) {
            r.features[n].layerId = s.results[n].layerId;
          }
          t.call(e, void 0, r, s);
        });
      },
      _setGeometryParams: function(t) {
        var e = M(t);
        (this.params.geometry = e.geometry), (this.params.geometryType = e.geometryType);
      },
    }),
    dt = ct.extend({
      setters: {
        setMosaicRule: 'mosaicRule',
        setRenderingRule: 'renderingRule',
        setPixelSize: 'pixelSize',
        returnCatalogItems: 'returnCatalogItems',
        returnGeometry: 'returnGeometry',
      },
      params: { returnGeometry: !1 },
      at: function(t) {
        return (
          (t = e.latLng(t)),
          (this.params.geometry = JSON.stringify({
            x: t.lng,
            y: t.lat,
            spatialReference: { wkid: 4326 },
          })),
          (this.params.geometryType = 'esriGeometryPoint'),
          this
        );
      },
      getMosaicRule: function() {
        return this.params.mosaicRule;
      },
      getRenderingRule: function() {
        return this.params.renderingRule;
      },
      getPixelSize: function() {
        return this.params.pixelSize;
      },
      run: function(t, e) {
        return this.request(function(i, s) {
          t.call(e, i, s && this._responseToGeoJSON(s), s);
        }, this);
      },
      _responseToGeoJSON: function(t) {
        var e = t.location,
          i = t.catalogItems,
          s = t.catalogItemVisibilities,
          r = {
            pixel: {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [e.x, e.y] },
              crs: { type: 'EPSG', properties: { code: e.spatialReference.wkid } },
              properties: { OBJECTID: t.objectId, name: t.name, value: t.value },
              id: t.objectId,
            },
          };
        if (
          (t.properties && t.properties.Values && (r.pixel.properties.values = t.properties.Values),
          i &&
            i.features &&
            ((r.catalogItems = w(i)), s && s.length === r.catalogItems.features.length))
        )
          for (var n = s.length - 1; n >= 0; n--)
            r.catalogItems.features[n].properties.catalogItemVisibility = s[n];
        return r;
      },
    }),
    mt = e.Evented.extend({
      options: { proxy: !1, useCors: tt, timeout: 0 },
      initialize: function(t) {
        (t = t || {}),
          (this._requestQueue = []),
          (this._authenticating = !1),
          e.Util.setOptions(this, t),
          (this.options.url = R(this.options.url));
      },
      get: function(t, e, i, s) {
        return this._request('get', t, e, i, s);
      },
      post: function(t, e, i, s) {
        return this._request('post', t, e, i, s);
      },
      request: function(t, e, i, s) {
        return this._request('request', t, e, i, s);
      },
      metadata: function(t, e) {
        return this._request('get', '', {}, t, e);
      },
      authenticate: function(t) {
        return (this._authenticating = !1), (this.options.token = t), this._runQueue(), this;
      },
      getTimeout: function() {
        return this.options.timeout;
      },
      setTimeout: function(t) {
        this.options.timeout = t;
      },
      _request: function(t, e, i, s, r) {
        this.fire('requeststart', { url: this.options.url + e, params: i, method: t }, !0);
        var n = this._createServiceCallback(t, e, i, s, r);
        if ((this.options.token && (i.token = this.options.token), this._authenticating))
          return void this._requestQueue.push([t, e, i, s, r]);
        var o = this.options.proxy
          ? this.options.proxy + '?' + this.options.url + e
          : this.options.url + e;
        return ('get' !== t && 'request' !== t) || this.options.useCors
          ? ot[t](o, i, n, r)
          : ot.get.JSONP(o, i, n, r);
      },
      _createServiceCallback: function(t, i, s, r, n) {
        return e.Util.bind(function(o, a) {
          !o ||
            (499 !== o.code && 498 !== o.code) ||
            ((this._authenticating = !0),
            this._requestQueue.push([t, i, s, r, n]),
            this.fire(
              'authenticationrequired',
              { authenticate: e.Util.bind(this.authenticate, this) },
              !0
            ),
            (o.authenticate = e.Util.bind(this.authenticate, this))),
            r.call(n, o, a),
            o
              ? this.fire(
                  'requesterror',
                  {
                    url: this.options.url + i,
                    params: s,
                    message: o.message,
                    code: o.code,
                    method: t,
                  },
                  !0
                )
              : this.fire(
                  'requestsuccess',
                  { url: this.options.url + i, params: s, response: a, method: t },
                  !0
                ),
            this.fire('requestend', { url: this.options.url + i, params: s, method: t }, !0);
        }, this);
      },
      _runQueue: function() {
        for (var t = this._requestQueue.length - 1; t >= 0; t--) {
          var e = this._requestQueue[t];
          this[e.shift()].apply(this, e);
        }
        this._requestQueue = [];
      },
    }),
    ft = mt.extend({
      identify: function() {
        return z(this);
      },
      find: function() {
        return B(this);
      },
      query: function() {
        return D(this);
      },
    }),
    yt = mt.extend({
      query: function() {
        return D(this);
      },
      identify: function() {
        return N(this);
      },
    }),
    gt = mt.extend({
      options: { idAttribute: 'OBJECTID' },
      query: function() {
        return D(this);
      },
      addFeature: function(t, e, i) {
        return (
          delete t.id,
          (t = x(t)),
          this.post(
            'addFeatures',
            { features: [t] },
            function(t, s) {
              var r = s && s.addResults ? s.addResults[0] : void 0;
              e && e.call(i, t || s.addResults[0].error, r);
            },
            i
          )
        );
      },
      updateFeature: function(t, e, i) {
        return (
          (t = x(t, this.options.idAttribute)),
          this.post(
            'updateFeatures',
            { features: [t] },
            function(t, s) {
              var r = s && s.updateResults ? s.updateResults[0] : void 0;
              e && e.call(i, t || s.updateResults[0].error, r);
            },
            i
          )
        );
      },
      deleteFeature: function(t, e, i) {
        return this.post(
          'deleteFeatures',
          { objectIds: t },
          function(t, s) {
            var r = s && s.deleteResults ? s.deleteResults[0] : void 0;
            e && e.call(i, t || s.deleteResults[0].error, r);
          },
          i
        );
      },
      deleteFeatures: function(t, e, i) {
        return this.post(
          'deleteFeatures',
          { objectIds: t },
          function(t, s) {
            var r = s && s.deleteResults ? s.deleteResults : void 0;
            e && e.call(i, t || s.deleteResults[0].error, r);
          },
          i
        );
      },
    }),
    _t = 'https:' !== window.location.protocol ? 'http:' : 'https:',
    vt = e.TileLayer.extend({
      statics: {
        TILES: {
          Streets: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
              attributionUrl: 'https://static.arcgis.com/attribution/World_Street_Map',
            },
          },
          Topographic: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
              attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map',
            },
          },
          Oceans: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
              attributionUrl: 'https://static.arcgis.com/attribution/Ocean_Basemap',
            },
          },
          OceansLabels: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
            },
          },
          NationalGeographic: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution:
                'National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.',
            },
          },
          DarkGray: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors',
            },
          },
          DarkGrayLabels: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          Gray: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors',
            },
          },
          GrayLabels: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          Imagery: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              attribution:
                'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
            },
          },
          ImageryLabels: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          ImageryTransportation: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
            },
          },
          ShadedRelief: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ['server', 'services'],
              attribution: 'USGS',
            },
          },
          ShadedReliefLabels: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 12,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          Terrain: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ['server', 'services'],
              attribution: 'USGS, NOAA',
            },
          },
          TerrainLabels: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ['server', 'services'],
              pane: et ? 'esri-labels' : 'tilePane',
              attribution: '',
            },
          },
          USATopo: {
            urlTemplate:
              _t +
              '//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}',
            options: {
              minZoom: 1,
              maxZoom: 15,
              subdomains: ['server', 'services'],
              attribution: 'USGS, National Geographic Society, i-cubed',
            },
          },
        },
      },
      initialize: function(t, i) {
        var s;
        if ('object' == typeof t && t.urlTemplate && t.options) s = t;
        else {
          if ('string' != typeof t || !vt.TILES[t])
            throw new Error(
              'L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"'
            );
          s = vt.TILES[t];
        }
        var r = e.Util.extend(s.options, i);
        e.Util.setOptions(this, r),
          this.options.token && (s.urlTemplate += '?token=' + this.options.token),
          e.TileLayer.prototype.initialize.call(this, s.urlTemplate, r);
      },
      onAdd: function(t) {
        k(t),
          'esri-labels' === this.options.pane && this._initPane(),
          this.options.attributionUrl && U(this.options.attributionUrl, t),
          t.on('moveend', G),
          e.TileLayer.prototype.onAdd.call(this, t);
      },
      onRemove: function(t) {
        t.off('moveend', G), e.TileLayer.prototype.onRemove.call(this, t);
      },
      _initPane: function() {
        if (!this._map.getPane(this.options.pane)) {
          var t = this._map.createPane(this.options.pane);
          (t.style.pointerEvents = 'none'), (t.style.zIndex = 500);
        }
      },
      getAttribution: function() {
        if (this.options.attribution)
          var t = '<span class="esri-dynamic-attribution">' + this.options.attribution + '</span>';
        return t;
      },
    }),
    bt = e.TileLayer.extend({
      options: {
        zoomOffsetAllowance: 0.1,
        errorTileUrl:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg==',
      },
      statics: {
        MercatorZoomLevels: {
          0: 156543.033928,
          1: 78271.5169639999,
          2: 39135.7584820001,
          3: 19567.8792409999,
          4: 9783.93962049996,
          5: 4891.96981024998,
          6: 2445.98490512499,
          7: 1222.99245256249,
          8: 611.49622628138,
          9: 305.748113140558,
          10: 152.874056570411,
          11: 76.4370282850732,
          12: 38.2185141425366,
          13: 19.1092570712683,
          14: 9.55462853563415,
          15: 4.77731426794937,
          16: 2.38865713397468,
          17: 1.19432856685505,
          18: 0.597164283559817,
          19: 0.298582141647617,
          20: 0.14929107082381,
          21: 0.07464553541191,
          22: 0.0373227677059525,
          23: 0.0186613838529763,
        },
      },
      initialize: function(t) {
        (t.url = R(t.url)),
          (t = e.Util.setOptions(this, t)),
          (this.tileUrl = t.url + 'tile/{z}/{y}/{x}'),
          (this.service = Z(t)),
          this.service.addEventParent(this),
          new RegExp(/tiles.arcgis(online)?\.com/g).test(t.url) &&
            ((this.tileUrl = this.tileUrl.replace('://tiles', '://tiles{s}')),
            (t.subdomains = ['1', '2', '3', '4'])),
          this.options.token && (this.tileUrl += '?token=' + this.options.token),
          e.TileLayer.prototype.initialize.call(this, this.tileUrl, t);
      },
      getTileUrl: function(t) {
        var i = this._getZoomForUrl();
        return e.Util.template(
          this.tileUrl,
          e.Util.extend(
            {
              s: this._getSubdomain(t),
              x: t.x,
              y: t.y,
              z: this._lodMap && this._lodMap[i] ? this._lodMap[i] : i,
            },
            this.options
          )
        );
      },
      createTile: function(t, e) {
        var i = document.createElement('img');
        return (
          L.DomEvent.on(i, 'load', L.bind(this._tileOnLoad, this, e, i)),
          L.DomEvent.on(i, 'error', L.bind(this._tileOnError, this, e, i)),
          this.options.crossOrigin && (i.crossOrigin = ''),
          (i.alt = ''),
          !this._lodMap || (this._lodMap && this._lodMap[this._getZoomForUrl()])
            ? (i.src = this.getTileUrl(t))
            : this.once(
                'lodmap',
                function() {
                  i.src = this.getTileUrl(t);
                },
                this
              ),
          i
        );
      },
      onAdd: function(t) {
        k(t),
          this._lodMap ||
            this.metadata(function(e, i) {
              if (!e && i.spatialReference) {
                var s = i.spatialReference.latestWkid || i.spatialReference.wkid;
                if (
                  (!this.options.attribution &&
                    t.attributionControl &&
                    i.copyrightText &&
                    ((this.options.attribution = i.copyrightText),
                    t.attributionControl.addAttribution(this.getAttribution())),
                  (t.options.crs === L.CRS.EPSG3857 && 102100 === s) || 3857 === s)
                ) {
                  this._lodMap = {};
                  for (
                    var r = i.tileInfo.lods, n = bt.MercatorZoomLevels, o = 0;
                    o < r.length;
                    o++
                  ) {
                    var a = r[o];
                    for (var u in n) {
                      var l = n[u];
                      if (
                        this._withinPercentage(a.resolution, l, this.options.zoomOffsetAllowance)
                      ) {
                        this._lodMap[u] = a.level;
                        break;
                      }
                    }
                  }
                  this.fire('lodmap');
                } else
                  proj4 ||
                    P(
                      'L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html'
                    );
              }
            }, this),
          e.TileLayer.prototype.onAdd.call(this, t);
      },
      metadata: function(t, e) {
        return this.service.metadata(t, e), this;
      },
      identify: function() {
        return this.service.identify();
      },
      find: function() {
        return this.service.find();
      },
      query: function() {
        return this.service.query();
      },
      authenticate: function(t) {
        var e = '?token=' + t;
        return (
          (this.tileUrl = this.options.token
            ? this.tileUrl.replace(/\?token=(.+)/g, e)
            : this.tileUrl + e),
          (this.options.token = t),
          this.service.authenticate(t),
          this
        );
      },
      _withinPercentage: function(t, e, i) {
        return Math.abs(t / e - 1) < i;
      },
    }),
    Lt = e.ImageOverlay.extend({
      onAdd: function(t) {
        (this._topLeft = t.getPixelBounds().min), e.ImageOverlay.prototype.onAdd.call(this, t);
      },
      _reset: function() {
        this._map.options.crs === e.CRS.EPSG3857
          ? e.ImageOverlay.prototype._reset.call(this)
          : e.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()));
      },
    }),
    xt = e.Layer.extend({
      options: {
        opacity: 1,
        position: 'front',
        f: 'image',
        useCors: tt,
        attribution: null,
        interactive: !1,
        alt: '',
      },
      onAdd: function(t) {
        k(t),
          (this._update = e.Util.throttle(this._update, this.options.updateInterval, this)),
          t.on('moveend', this._update, this),
          this._currentImage && this._currentImage._bounds.equals(this._map.getBounds())
            ? t.addLayer(this._currentImage)
            : this._currentImage &&
              (this._map.removeLayer(this._currentImage), (this._currentImage = null)),
          this._update(),
          this._popup &&
            (this._map.on('click', this._getPopupData, this),
            this._map.on('dblclick', this._resetPopupState, this)),
          this.metadata(function(e, i) {
            !e &&
              !this.options.attribution &&
              t.attributionControl &&
              i.copyrightText &&
              ((this.options.attribution = i.copyrightText),
              t.attributionControl.addAttribution(this.getAttribution()));
          }, this);
      },
      onRemove: function(t) {
        this._currentImage && this._map.removeLayer(this._currentImage),
          this._popup &&
            (this._map.off('click', this._getPopupData, this),
            this._map.off('dblclick', this._resetPopupState, this)),
          this._map.off('moveend', this._update, this);
      },
      bindPopup: function(t, i) {
        return (
          (this._shouldRenderPopup = !1),
          (this._lastClick = !1),
          (this._popup = e.popup(i)),
          (this._popupFunction = t),
          this._map &&
            (this._map.on('click', this._getPopupData, this),
            this._map.on('dblclick', this._resetPopupState, this)),
          this
        );
      },
      unbindPopup: function() {
        return (
          this._map &&
            (this._map.closePopup(this._popup),
            this._map.off('click', this._getPopupData, this),
            this._map.off('dblclick', this._resetPopupState, this)),
          (this._popup = !1),
          this
        );
      },
      bringToFront: function() {
        return (
          (this.options.position = 'front'),
          this._currentImage && this._currentImage.bringToFront(),
          this
        );
      },
      bringToBack: function() {
        return (
          (this.options.position = 'back'),
          this._currentImage && this._currentImage.bringToBack(),
          this
        );
      },
      getAttribution: function() {
        return this.options.attribution;
      },
      getOpacity: function() {
        return this.options.opacity;
      },
      setOpacity: function(t) {
        return (
          (this.options.opacity = t), this._currentImage && this._currentImage.setOpacity(t), this
        );
      },
      getTimeRange: function() {
        return [this.options.from, this.options.to];
      },
      setTimeRange: function(t, e) {
        return (this.options.from = t), (this.options.to = e), this._update(), this;
      },
      metadata: function(t, e) {
        return this.service.metadata(t, e), this;
      },
      authenticate: function(t) {
        return this.service.authenticate(t), this;
      },
      redraw: function() {
        this._update();
      },
      _renderImage: function(t, e, i) {
        if (this._map) {
          i && (t = 'data:' + i + ';base64,' + t);
          var s = new Lt(t, e, {
              opacity: 0,
              crossOrigin: this.options.useCors,
              alt: this.options.alt,
              pane: this.options.pane || this.getPane(),
              interactive: this.options.interactive,
            }).addTo(this._map),
            r = function() {
              this._map.removeLayer(s), this.fire('error'), s.off('load', n, this);
            },
            n = function(t) {
              if ((s.off('error', n, this), this._map)) {
                var i = t.target,
                  r = this._currentImage;
                i._bounds.equals(e) && i._bounds.equals(this._map.getBounds())
                  ? ((this._currentImage = i),
                    'front' === this.options.position ? this.bringToFront() : this.bringToBack(),
                    this._map && this._currentImage._map
                      ? this._currentImage.setOpacity(this.options.opacity)
                      : this._currentImage._map.removeLayer(this._currentImage),
                    r && this._map && this._map.removeLayer(r),
                    r && r._map && r._map.removeLayer(r))
                  : this._map.removeLayer(i);
              }
              this.fire('load', { bounds: e });
            };
          s.once('error', r, this), s.once('load', n, this), this.fire('loading', { bounds: e });
        }
      },
      _update: function() {
        if (this._map) {
          var t = this._map.getZoom(),
            e = this._map.getBounds();
          if (
            !(
              this._animatingZoom ||
              (this._map._panTransition && this._map._panTransition._inProgress)
            )
          ) {
            if (t > this.options.maxZoom || t < this.options.minZoom)
              return void (
                this._currentImage &&
                (this._currentImage._map.removeLayer(this._currentImage),
                (this._currentImage = null))
              );
            var i = this._buildExportParams();
            this._requestExport(i, e);
          }
        }
      },
      _renderPopup: function(t, i, s, r) {
        if (((t = e.latLng(t)), this._shouldRenderPopup && this._lastClick.equals(t))) {
          var n = this._popupFunction(i, s, r);
          n &&
            this._popup
              .setLatLng(t)
              .setContent(n)
              .openOn(this._map);
        }
      },
      _resetPopupState: function(t) {
        (this._shouldRenderPopup = !1), (this._lastClick = t.latlng);
      },
      _calculateBbox: function() {
        var t = this._map.getPixelBounds(),
          i = this._map.unproject(t.getBottomLeft()),
          s = this._map.unproject(t.getTopRight()),
          r = this._map.options.crs.project(s),
          n = this._map.options.crs.project(i),
          o = e.bounds(r, n);
        return [
          o.getBottomLeft().x,
          o.getBottomLeft().y,
          o.getTopRight().x,
          o.getTopRight().y,
        ].join(',');
      },
      _calculateImageSize: function() {
        var t = this._map.getPixelBounds(),
          e = this._map.getSize(),
          i = this._map.unproject(t.getBottomLeft()),
          s = this._map.unproject(t.getTopRight()),
          r = this._map.latLngToLayerPoint(s).y,
          n = this._map.latLngToLayerPoint(i).y;
        return (r > 0 || n < e.y) && (e.y = n - r), e.x + ',' + e.y;
      },
    }),
    St = xt.extend({
      options: { updateInterval: 150, format: 'jpgpng', transparent: !0, f: 'json' },
      query: function() {
        return this.service.query();
      },
      identify: function() {
        return this.service.identify();
      },
      initialize: function(t) {
        (t.url = R(t.url)),
          (this.service = W(t)),
          this.service.addEventParent(this),
          e.Util.setOptions(this, t);
      },
      setPixelType: function(t) {
        return (this.options.pixelType = t), this._update(), this;
      },
      getPixelType: function() {
        return this.options.pixelType;
      },
      setBandIds: function(t) {
        return (
          e.Util.isArray(t)
            ? (this.options.bandIds = t.join(','))
            : (this.options.bandIds = t.toString()),
          this._update(),
          this
        );
      },
      getBandIds: function() {
        return this.options.bandIds;
      },
      setNoData: function(t, i) {
        return (
          e.Util.isArray(t)
            ? (this.options.noData = t.join(','))
            : (this.options.noData = t.toString()),
          i && (this.options.noDataInterpretation = i),
          this._update(),
          this
        );
      },
      getNoData: function() {
        return this.options.noData;
      },
      getNoDataInterpretation: function() {
        return this.options.noDataInterpretation;
      },
      setRenderingRule: function(t) {
        (this.options.renderingRule = t), this._update();
      },
      getRenderingRule: function() {
        return this.options.renderingRule;
      },
      setMosaicRule: function(t) {
        (this.options.mosaicRule = t), this._update();
      },
      getMosaicRule: function() {
        return this.options.mosaicRule;
      },
      _getPopupData: function(t) {
        var i = e.Util.bind(function(i, s, r) {
            i ||
              setTimeout(
                e.Util.bind(function() {
                  this._renderPopup(t.latlng, i, s, r);
                }, this),
                300
              );
          }, this),
          s = this.identify().at(t.latlng);
        this.options.mosaicRule && s.setMosaicRule(this.options.mosaicRule),
          s.run(i),
          (this._shouldRenderPopup = !0),
          (this._lastClick = t.latlng);
      },
      _buildExportParams: function() {
        var t = parseInt(this._map.options.crs.code.split(':')[1], 10),
          e = {
            bbox: this._calculateBbox(),
            size: this._calculateImageSize(),
            format: this.options.format,
            transparent: this.options.transparent,
            bboxSR: t,
            imageSR: t,
          };
        return (
          this.options.from &&
            this.options.to &&
            (e.time = this.options.from.valueOf() + ',' + this.options.to.valueOf()),
          this.options.pixelType && (e.pixelType = this.options.pixelType),
          this.options.interpolation && (e.interpolation = this.options.interpolation),
          this.options.compressionQuality &&
            (e.compressionQuality = this.options.compressionQuality),
          this.options.bandIds && (e.bandIds = this.options.bandIds),
          (0 === this.options.noData || this.options.noData) && (e.noData = this.options.noData),
          this.options.noDataInterpretation &&
            (e.noDataInterpretation = this.options.noDataInterpretation),
          this.service.options.token && (e.token = this.service.options.token),
          this.options.renderingRule &&
            (e.renderingRule = JSON.stringify(this.options.renderingRule)),
          this.options.mosaicRule && (e.mosaicRule = JSON.stringify(this.options.mosaicRule)),
          e
        );
      },
      _requestExport: function(t, i) {
        'json' === this.options.f
          ? this.service.request(
              'exportImage',
              t,
              function(t, e) {
                t ||
                  (this.options.token && (e.href += '?token=' + this.options.token),
                  this._renderImage(e.href, i));
              },
              this
            )
          : ((t.f = 'image'),
            this._renderImage(this.options.url + 'exportImage' + e.Util.getParamString(t), i));
      },
    }),
    At = xt.extend({
      options: {
        updateInterval: 150,
        layers: !1,
        layerDefs: !1,
        timeOptions: !1,
        format: 'png24',
        transparent: !0,
        f: 'json',
      },
      initialize: function(t) {
        (t.url = R(t.url)),
          (this.service = Z(t)),
          this.service.addEventParent(this),
          (t.proxy || t.token) && 'json' !== t.f && (t.f = 'json'),
          e.Util.setOptions(this, t);
      },
      getDynamicLayers: function() {
        return this.options.dynamicLayers;
      },
      setDynamicLayers: function(t) {
        return (this.options.dynamicLayers = t), this._update(), this;
      },
      getLayers: function() {
        return this.options.layers;
      },
      setLayers: function(t) {
        return (this.options.layers = t), this._update(), this;
      },
      getLayerDefs: function() {
        return this.options.layerDefs;
      },
      setLayerDefs: function(t) {
        return (this.options.layerDefs = t), this._update(), this;
      },
      getTimeOptions: function() {
        return this.options.timeOptions;
      },
      setTimeOptions: function(t) {
        return (this.options.timeOptions = t), this._update(), this;
      },
      query: function() {
        return this.service.query();
      },
      identify: function() {
        return this.service.identify();
      },
      find: function() {
        return this.service.find();
      },
      _getPopupData: function(t) {
        var i = e.Util.bind(function(i, s, r) {
            i ||
              setTimeout(
                e.Util.bind(function() {
                  this._renderPopup(t.latlng, i, s, r);
                }, this),
                300
              );
          }, this),
          s = this.identify()
            .on(this._map)
            .at(t.latlng);
        if (
          (s.simplify(this._map, 0.5),
          this.options.layers
            ? s.layers('visible:' + this.options.layers.join(','))
            : s.layers('visible'),
          this.options.layerDefs && 'string' != typeof this.options.layerDefs)
        )
          for (var r in this.options.layerDefs)
            this.options.layerDefs.hasOwnProperty(r) && s.layerDef(r, this.options.layerDefs[r]);
        s.run(i), (this._shouldRenderPopup = !0), (this._lastClick = t.latlng);
      },
      _buildExportParams: function() {
        var t = parseInt(this._map.options.crs.code.split(':')[1], 10),
          e = {
            bbox: this._calculateBbox(),
            size: this._calculateImageSize(),
            dpi: 96,
            format: this.options.format,
            transparent: this.options.transparent,
            bboxSR: t,
            imageSR: t,
          };
        return (
          this.options.dynamicLayers && (e.dynamicLayers = this.options.dynamicLayers),
          this.options.layers && (e.layers = 'show:' + this.options.layers.join(',')),
          this.options.layerDefs &&
            (e.layerDefs =
              'string' == typeof this.options.layerDefs
                ? this.options.layerDefs
                : JSON.stringify(this.options.layerDefs)),
          this.options.timeOptions && (e.timeOptions = JSON.stringify(this.options.timeOptions)),
          this.options.from &&
            this.options.to &&
            (e.time = this.options.from.valueOf() + ',' + this.options.to.valueOf()),
          this.service.options.token && (e.token = this.service.options.token),
          this.options.proxy && (e.proxy = this.options.proxy),
          this.options.disableCache && (e._ts = Date.now()),
          e
        );
      },
      _requestExport: function(t, i) {
        'json' === this.options.f
          ? this.service.request(
              'export',
              t,
              function(t, e) {
                t ||
                  (this.options.token && (e.href += '?token=' + this.options.token),
                  this.options.proxy && (e.href = this.options.proxy + '?' + e.href),
                  e.href
                    ? this._renderImage(e.href, i)
                    : this._renderImage(e.imageData, i, e.contentType));
              },
              this
            )
          : ((t.f = 'image'),
            this._renderImage(this.options.url + 'export' + e.Util.getParamString(t), i));
      },
    }),
    Tt = Y.Layer.extend({
      options: { cellSize: 512, updateInterval: 150 },
      initialize: function(t) {
        (t = Y.setOptions(this, t)), (this._zooming = !1);
      },
      onAdd: function(t) {
        (this._map = t),
          (this._update = Y.Util.throttle(this._update, this.options.updateInterval, this)),
          this._reset(),
          this._update();
      },
      onRemove: function() {
        this._map.removeEventListener(this.getEvents(), this), this._removeCells();
      },
      getEvents: function() {
        return { moveend: this._update, zoomstart: this._zoomstart, zoomend: this._reset };
      },
      addTo: function(t) {
        return t.addLayer(this), this;
      },
      removeFrom: function(t) {
        return t.removeLayer(this), this;
      },
      _zoomstart: function() {
        this._zooming = !0;
      },
      _reset: function() {
        this._removeCells(),
          (this._cells = {}),
          (this._activeCells = {}),
          (this._cellsToLoad = 0),
          (this._cellsTotal = 0),
          (this._cellNumBounds = this._getCellNumBounds()),
          this._resetWrap(),
          (this._zooming = !1);
      },
      _resetWrap: function() {
        var t = this._map,
          e = t.options.crs;
        if (!e.infinite) {
          var i = this._getCellSize();
          e.wrapLng &&
            (this._wrapLng = [
              Math.floor(t.project([0, e.wrapLng[0]]).x / i),
              Math.ceil(t.project([0, e.wrapLng[1]]).x / i),
            ]),
            e.wrapLat &&
              (this._wrapLat = [
                Math.floor(t.project([e.wrapLat[0], 0]).y / i),
                Math.ceil(t.project([e.wrapLat[1], 0]).y / i),
              ]);
        }
      },
      _getCellSize: function() {
        return this.options.cellSize;
      },
      _update: function() {
        if (this._map) {
          var t = this._map.getPixelBounds(),
            e = this._getCellSize(),
            i = Y.bounds(t.min.divideBy(e).floor(), t.max.divideBy(e).floor());
          this._removeOtherCells(i), this._addCells(i), this.fire('cellsupdated');
        }
      },
      _addCells: function(t) {
        var e,
          i,
          s,
          r = [],
          n = t.getCenter(),
          o = this._map.getZoom();
        for (e = t.min.y; e <= t.max.y; e++)
          for (i = t.min.x; i <= t.max.x; i++)
            (s = Y.point(i, e)), (s.z = o), this._isValidCell(s) && r.push(s);
        var a = r.length;
        if (0 !== a)
          for (
            this._cellsToLoad += a,
              this._cellsTotal += a,
              r.sort(function(t, e) {
                return t.distanceTo(n) - e.distanceTo(n);
              }),
              i = 0;
            i < a;
            i++
          )
            this._addCell(r[i]);
      },
      _isValidCell: function(t) {
        var e = this._map.options.crs;
        if (!e.infinite) {
          var i = this._cellNumBounds;
          if (
            (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x)) ||
            (!e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
          )
            return !1;
        }
        if (!this.options.bounds) return !0;
        var s = this._cellCoordsToBounds(t);
        return Y.latLngBounds(this.options.bounds).intersects(s);
      },
      _cellCoordsToBounds: function(t) {
        var e = this._map,
          i = this.options.cellSize,
          s = t.multiplyBy(i),
          r = s.add([i, i]),
          n = e.wrapLatLng(e.unproject(s, t.z)),
          o = e.wrapLatLng(e.unproject(r, t.z));
        return Y.latLngBounds(n, o);
      },
      _cellCoordsToKey: function(t) {
        return t.x + ':' + t.y;
      },
      _keyToCellCoords: function(t) {
        var e = t.split(':'),
          i = parseInt(e[0], 10),
          s = parseInt(e[1], 10);
        return Y.point(i, s);
      },
      _removeOtherCells: function(t) {
        for (var e in this._cells) t.contains(this._keyToCellCoords(e)) || this._removeCell(e);
      },
      _removeCell: function(t) {
        var e = this._activeCells[t];
        e &&
          (delete this._activeCells[t],
          this.cellLeave && this.cellLeave(e.bounds, e.coords),
          this.fire('cellleave', { bounds: e.bounds, coords: e.coords }));
      },
      _removeCells: function() {
        for (var t in this._cells) {
          var e = this._cells[t].bounds,
            i = this._cells[t].coords;
          this.cellLeave && this.cellLeave(e, i), this.fire('cellleave', { bounds: e, coords: i });
        }
      },
      _addCell: function(t) {
        this._wrapCoords(t);
        var e = this._cellCoordsToKey(t),
          i = this._cells[e];
        i &&
          !this._activeCells[e] &&
          (this.cellEnter && this.cellEnter(i.bounds, t),
          this.fire('cellenter', { bounds: i.bounds, coords: t }),
          (this._activeCells[e] = i)),
          i ||
            ((i = { coords: t, bounds: this._cellCoordsToBounds(t) }),
            (this._cells[e] = i),
            (this._activeCells[e] = i),
            this.createCell && this.createCell(i.bounds, t),
            this.fire('cellcreate', { bounds: i.bounds, coords: t }));
      },
      _wrapCoords: function(t) {
        (t.x = this._wrapLng ? Y.Util.wrapNum(t.x, this._wrapLng) : t.x),
          (t.y = this._wrapLat ? Y.Util.wrapNum(t.y, this._wrapLat) : t.y);
      },
      _getCellNumBounds: function() {
        var t = this._map.getPixelWorldBounds(),
          e = this._getCellSize();
        return t
          ? Y.bounds(
              t.min.divideBy(e).floor(),
              t.max
                .divideBy(e)
                .ceil()
                .subtract([1, 1])
            )
          : null;
      },
    });
  (X.prototype.query = function(t) {
    var e = this.getIndex(t);
    return this.values[e];
  }),
    (X.prototype.getIndex = function(t) {
      this.dirty && this.sort();
      for (var e, i, s = 0, r = this.values.length - 1; s <= r; )
        if (((e = ((s + r) / 2) | 0), (i = this.values[Math.round(e)]), +i.value < +t)) s = e + 1;
        else {
          if (!(+i.value > +t)) return e;
          r = e - 1;
        }
      return Math.abs(~r);
    }),
    (X.prototype.between = function(t, e) {
      var i = this.getIndex(t),
        s = this.getIndex(e);
      if (0 === i && 0 === s) return [];
      for (; this.values[i - 1] && this.values[i - 1].value === t; ) i--;
      for (; this.values[s + 1] && this.values[s + 1].value === e; ) s++;
      return (
        this.values[s] && this.values[s].value === e && this.values[s + 1] && s++,
        this.values.slice(i, s)
      );
    }),
    (X.prototype.insert = function(t) {
      return this.values.splice(this.getIndex(t.value), 0, t), this;
    }),
    (X.prototype.bulkAdd = function(t, e) {
      return (
        (this.values = this.values.concat([].concat(t || []))),
        e ? this.sort() : (this.dirty = !0),
        this
      );
    }),
    (X.prototype.sort = function() {
      return (
        this.values
          .sort(function(t, e) {
            return +e.value - +t.value;
          })
          .reverse(),
        (this.dirty = !1),
        this
      );
    });
  var It = Tt.extend({
      options: {
        attribution: null,
        where: '1=1',
        fields: ['*'],
        from: !1,
        to: !1,
        timeField: !1,
        timeFilterMode: 'server',
        simplifyFactor: 0,
        precision: 6,
      },
      initialize: function(t) {
        if (
          (Tt.prototype.initialize.call(this, t),
          (t.url = R(t.url)),
          (t = e.Util.setOptions(this, t)),
          (this.service = J(t)),
          this.service.addEventParent(this),
          '*' !== this.options.fields[0])
        ) {
          for (var i = !1, s = 0; s < this.options.fields.length; s++)
            this.options.fields[s].match(/^(OBJECTID|FID|OID|ID)$/i) && (i = !0);
          !1 === i &&
            P(
              'no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.'
            );
        }
        this.options.timeField.start && this.options.timeField.end
          ? ((this._startTimeIndex = new X()), (this._endTimeIndex = new X()))
          : this.options.timeField && (this._timeIndex = new X()),
          (this._cache = {}),
          (this._currentSnapshot = []),
          (this._activeRequests = 0);
      },
      onAdd: function(t) {
        return (
          k(t),
          this.service.metadata(function(e, i) {
            if (!e) {
              var s = i.supportedQueryFormats,
                r = !1;
              !1 === this.service.options.isModern && (r = !0),
                !r && s && -1 !== s.indexOf('geoJSON') && (this.service.options.isModern = !0),
                !this.options.attribution &&
                  t.attributionControl &&
                  i.copyrightText &&
                  ((this.options.attribution = i.copyrightText),
                  t.attributionControl.addAttribution(this.getAttribution()));
            }
          }, this),
          t.on('zoomend', this._handleZoomChange, this),
          Tt.prototype.onAdd.call(this, t)
        );
      },
      onRemove: function(t) {
        return t.off('zoomend', this._handleZoomChange, this), Tt.prototype.onRemove.call(this, t);
      },
      getAttribution: function() {
        return this.options.attribution;
      },
      createCell: function(t, e) {
        this._visibleZoom() && this._requestFeatures(t, e);
      },
      _requestFeatures: function(t, i, s) {
        return (
          this._activeRequests++,
          1 === this._activeRequests && this.fire('loading', { bounds: t }, !0),
          this._buildQuery(t).run(function(r, n, o) {
            o && o.exceededTransferLimit && this.fire('drawlimitexceeded'),
              !r &&
                n &&
                n.features.length &&
                e.Util.requestAnimFrame(
                  e.Util.bind(function() {
                    this._addFeatures(n.features, i), this._postProcessFeatures(t);
                  }, this)
                ),
              r || !n || n.features.length || this._postProcessFeatures(t),
              r && this._postProcessFeatures(t),
              s && s.call(this, r, n);
          }, this)
        );
      },
      _postProcessFeatures: function(t) {
        --this._activeRequests <= 0 && this.fire('load', { bounds: t });
      },
      _cacheKey: function(t) {
        return t.z + ':' + t.x + ':' + t.y;
      },
      _addFeatures: function(t, e) {
        var i = this._cacheKey(e);
        this._cache[i] = this._cache[i] || [];
        for (var s = t.length - 1; s >= 0; s--) {
          var r = t[s].id;
          -1 === this._currentSnapshot.indexOf(r) && this._currentSnapshot.push(r),
            -1 === this._cache[i].indexOf(r) && this._cache[i].push(r);
        }
        this.options.timeField && this._buildTimeIndexes(t), this.createLayers(t);
      },
      _buildQuery: function(t) {
        var e = this.service
          .query()
          .intersects(t)
          .where(this.options.where)
          .fields(this.options.fields)
          .precision(this.options.precision);
        return (
          this.options.simplifyFactor && e.simplify(this._map, this.options.simplifyFactor),
          'server' === this.options.timeFilterMode &&
            this.options.from &&
            this.options.to &&
            e.between(this.options.from, this.options.to),
          e
        );
      },
      setWhere: function(t, i, s) {
        this.options.where = t && t.length ? t : '1=1';
        for (
          var r = [],
            n = [],
            o = 0,
            a = null,
            u = e.Util.bind(function(t, u) {
              if ((t && (a = t), u))
                for (var l = u.features.length - 1; l >= 0; l--) n.push(u.features[l].id);
              --o <= 0 &&
                this._visibleZoom() &&
                ((this._currentSnapshot = n),
                e.Util.requestAnimFrame(
                  e.Util.bind(function() {
                    this.removeLayers(r), this.addLayers(n), i && i.call(s, a);
                  }, this)
                ));
            }, this),
            l = this._currentSnapshot.length - 1;
          l >= 0;
          l--
        )
          r.push(this._currentSnapshot[l]);
        for (var h in this._activeCells) {
          o++;
          var c = this._keyToCellCoords(h),
            p = this._cellCoordsToBounds(c);
          this._requestFeatures(p, h, u);
        }
        return this;
      },
      getWhere: function() {
        return this.options.where;
      },
      getTimeRange: function() {
        return [this.options.from, this.options.to];
      },
      setTimeRange: function(t, i, s, r) {
        var n = this.options.from,
          o = this.options.to,
          a = 0,
          u = null,
          l = e.Util.bind(function(e) {
            e && (u = e),
              this._filterExistingFeatures(n, o, t, i),
              a--,
              s && a <= 0 && s.call(r, u);
          }, this);
        if (
          ((this.options.from = t),
          (this.options.to = i),
          this._filterExistingFeatures(n, o, t, i),
          'server' === this.options.timeFilterMode)
        )
          for (var h in this._activeCells) {
            a++;
            var c = this._keyToCellCoords(h),
              p = this._cellCoordsToBounds(c);
            this._requestFeatures(p, h, l);
          }
        return this;
      },
      refresh: function() {
        for (var t in this._activeCells) {
          var e = this._keyToCellCoords(t),
            i = this._cellCoordsToBounds(e);
          this._requestFeatures(i, t);
        }
        this.redraw &&
          this.once(
            'load',
            function() {
              this.eachFeature(function(t) {
                this._redraw(t.feature.id);
              }, this);
            },
            this
          );
      },
      _filterExistingFeatures: function(t, i, s, r) {
        var n = t && i ? this._getFeaturesInTimeRange(t, i) : this._currentSnapshot,
          o = this._getFeaturesInTimeRange(s, r);
        if (o.indexOf)
          for (var a = 0; a < o.length; a++) {
            var u = n.indexOf(o[a]);
            u >= 0 && n.splice(u, 1);
          }
        e.Util.requestAnimFrame(
          e.Util.bind(function() {
            this.removeLayers(n), this.addLayers(o);
          }, this)
        );
      },
      _getFeaturesInTimeRange: function(t, e) {
        var i,
          s = [];
        if (this.options.timeField.start && this.options.timeField.end) {
          var r = this._startTimeIndex.between(t, e),
            n = this._endTimeIndex.between(t, e);
          i = r.concat(n);
        } else i = this._timeIndex.between(t, e);
        for (var o = i.length - 1; o >= 0; o--) s.push(i[o].id);
        return s;
      },
      _buildTimeIndexes: function(t) {
        var e, i;
        if (this.options.timeField.start && this.options.timeField.end) {
          var s = [],
            r = [];
          for (e = t.length - 1; e >= 0; e--)
            (i = t[e]),
              s.push({ id: i.id, value: new Date(i.properties[this.options.timeField.start]) }),
              r.push({ id: i.id, value: new Date(i.properties[this.options.timeField.end]) });
          this._startTimeIndex.bulkAdd(s), this._endTimeIndex.bulkAdd(r);
        } else {
          var n = [];
          for (e = t.length - 1; e >= 0; e--)
            (i = t[e]), n.push({ id: i.id, value: new Date(i.properties[this.options.timeField]) });
          this._timeIndex.bulkAdd(n);
        }
      },
      _featureWithinTimeRange: function(t) {
        if (!this.options.from || !this.options.to) return !0;
        var e = +this.options.from.valueOf(),
          i = +this.options.to.valueOf();
        if ('string' == typeof this.options.timeField) {
          var s = +t.properties[this.options.timeField];
          return s >= e && s <= i;
        }
        if (this.options.timeField.start && this.options.timeField.end) {
          var r = +t.properties[this.options.timeField.start],
            n = +t.properties[this.options.timeField.end];
          return (r >= e && r <= i) || (n >= e && n <= i);
        }
      },
      _visibleZoom: function() {
        if (!this._map) return !1;
        var t = this._map.getZoom();
        return !(t > this.options.maxZoom || t < this.options.minZoom);
      },
      _handleZoomChange: function() {
        if (this._visibleZoom())
          for (var t in this._activeCells) {
            var e = this._activeCells[t].coords,
              i = this._cacheKey(e);
            this._cache[i] && this.addLayers(this._cache[i]);
          }
        else this.removeLayers(this._currentSnapshot), (this._currentSnapshot = []);
      },
      authenticate: function(t) {
        return this.service.authenticate(t), this;
      },
      metadata: function(t, e) {
        return this.service.metadata(t, e), this;
      },
      query: function() {
        return this.service.query();
      },
      _getMetadata: function(t) {
        if (this._metadata) {
          t(void 0, this._metadata);
        } else
          this.metadata(
            e.Util.bind(function(e, i) {
              (this._metadata = i), t(e, this._metadata);
            }, this)
          );
      },
      addFeature: function(t, i, s) {
        this._getMetadata(
          e.Util.bind(function(r, n) {
            if (r) return void (i && i.call(this, r, null));
            this.service.addFeature(
              t,
              e.Util.bind(function(e, r) {
                e ||
                  ((t.properties[n.objectIdField] = r.objectId),
                  (t.id = r.objectId),
                  this.createLayers([t])),
                  i && i.call(s, e, r);
              }, this)
            );
          }, this)
        );
      },
      updateFeature: function(t, e, i) {
        this.service.updateFeature(
          t,
          function(s, r) {
            s || (this.removeLayers([t.id], !0), this.createLayers([t])), e && e.call(i, s, r);
          },
          this
        );
      },
      deleteFeature: function(t, e, i) {
        this.service.deleteFeature(
          t,
          function(t, s) {
            !t && s.objectId && this.removeLayers([s.objectId], !0), e && e.call(i, t, s);
          },
          this
        );
      },
      deleteFeatures: function(t, e, i) {
        return this.service.deleteFeatures(
          t,
          function(t, s) {
            if (!t && s.length > 0)
              for (var r = 0; r < s.length; r++) this.removeLayers([s[r].objectId], !0);
            e && e.call(i, t, s);
          },
          this
        );
      },
    }),
    wt = It.extend({
      options: { cacheLayers: !0 },
      initialize: function(t) {
        It.prototype.initialize.call(this, t),
          (this._originalStyle = this.options.style),
          (this._layers = {});
      },
      onRemove: function(t) {
        for (var e in this._layers)
          t.removeLayer(this._layers[e]),
            this.fire('removefeature', { feature: this._layers[e].feature, permanent: !1 }, !0);
        return It.prototype.onRemove.call(this, t);
      },
      createNewLayer: function(t) {
        var i = e.GeoJSON.geometryToLayer(t, this.options);
        return (i.defaultOptions = i.options), i;
      },
      _updateLayer: function(t, i) {
        var s = [],
          r = this.options.coordsToLatLng || e.GeoJSON.coordsToLatLng;
        switch ((i.properties && (t.feature.properties = i.properties), i.geometry.type)) {
          case 'Point':
            (s = e.GeoJSON.coordsToLatLng(i.geometry.coordinates)), t.setLatLng(s);
            break;
          case 'LineString':
            (s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 0, r)), t.setLatLngs(s);
            break;
          case 'MultiLineString':
          case 'Polygon':
            (s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 1, r)), t.setLatLngs(s);
            break;
          case 'MultiPolygon':
            (s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 2, r)), t.setLatLngs(s);
        }
      },
      createLayers: function(t) {
        for (var e = t.length - 1; e >= 0; e--) {
          var i,
            s = t[e],
            r = this._layers[s.id];
          this._visibleZoom() &&
            r &&
            !this._map.hasLayer(r) &&
            (this._map.addLayer(r), this.fire('addfeature', { feature: r.feature }, !0)),
            r &&
              this.options.simplifyFactor > 0 &&
              (r.setLatLngs || r.setLatLng) &&
              this._updateLayer(r, s),
            r ||
              ((i = this.createNewLayer(s)),
              (i.feature = s),
              i.addEventParent(this),
              this.options.onEachFeature && this.options.onEachFeature(i.feature, i),
              (this._layers[i.feature.id] = i),
              this.setFeatureStyle(i.feature.id, this.options.style),
              this.fire('createfeature', { feature: i.feature }, !0),
              this._visibleZoom() &&
                (!this.options.timeField ||
                  (this.options.timeField && this._featureWithinTimeRange(s))) &&
                this._map.addLayer(i));
        }
      },
      addLayers: function(t) {
        for (var e = t.length - 1; e >= 0; e--) {
          var i = this._layers[t[e]];
          i && this._map.addLayer(i);
        }
      },
      removeLayers: function(t, e) {
        for (var i = t.length - 1; i >= 0; i--) {
          var s = t[i],
            r = this._layers[s];
          r &&
            (this.fire('removefeature', { feature: r.feature, permanent: e }, !0),
            this._map.removeLayer(r)),
            r && e && delete this._layers[s];
        }
      },
      cellEnter: function(t, i) {
        this._visibleZoom() &&
          !this._zooming &&
          this._map &&
          e.Util.requestAnimFrame(
            e.Util.bind(function() {
              var t = this._cacheKey(i),
                e = this._cellCoordsToKey(i),
                s = this._cache[t];
              this._activeCells[e] && s && this.addLayers(s);
            }, this)
          );
      },
      cellLeave: function(t, i) {
        this._zooming ||
          e.Util.requestAnimFrame(
            e.Util.bind(function() {
              if (this._map) {
                var t = this._cacheKey(i),
                  e = this._cellCoordsToKey(i),
                  s = this._cache[t],
                  r = this._map.getBounds();
                if (!this._activeCells[e] && s) {
                  for (var n = !0, o = 0; o < s.length; o++) {
                    var a = this._layers[s[o]];
                    a && a.getBounds && r.intersects(a.getBounds()) && (n = !1);
                  }
                  n && this.removeLayers(s, !this.options.cacheLayers),
                    !this.options.cacheLayers &&
                      n &&
                      (delete this._cache[t], delete this._cells[e], delete this._activeCells[e]);
                }
              }
            }, this)
          );
      },
      resetStyle: function() {
        return (
          (this.options.style = this._originalStyle),
          this.eachFeature(function(t) {
            this.resetFeatureStyle(t.feature.id);
          }, this),
          this
        );
      },
      setStyle: function(t) {
        return (
          (this.options.style = t),
          this.eachFeature(function(e) {
            this.setFeatureStyle(e.feature.id, t);
          }, this),
          this
        );
      },
      resetFeatureStyle: function(t) {
        var i = this._layers[t],
          s = this._originalStyle || L.Path.prototype.options;
        return i && (e.Util.extend(i.options, i.defaultOptions), this.setFeatureStyle(t, s)), this;
      },
      setFeatureStyle: function(t, e) {
        var i = this._layers[t];
        return 'function' == typeof e && (e = e(i.feature)), i.setStyle && i.setStyle(e), this;
      },
      eachActiveFeature: function(t, e) {
        if (this._map) {
          var i = this._map.getBounds();
          for (var s in this._layers)
            -1 !== this._currentSnapshot.indexOf(this._layers[s].feature.id) &&
              ('function' == typeof this._layers[s].getLatLng &&
              i.contains(this._layers[s].getLatLng())
                ? t.call(e, this._layers[s])
                : 'function' == typeof this._layers[s].getBounds &&
                  i.intersects(this._layers[s].getBounds()) &&
                  t.call(e, this._layers[s]));
        }
        return this;
      },
      eachFeature: function(t, e) {
        for (var i in this._layers) t.call(e, this._layers[i]);
        return this;
      },
      getFeature: function(t) {
        return this._layers[t];
      },
      bringToBack: function() {
        this.eachFeature(function(t) {
          t.bringToBack && t.bringToBack();
        });
      },
      bringToFront: function() {
        this.eachFeature(function(t) {
          t.bringToFront && t.bringToFront();
        });
      },
      redraw: function(t) {
        return t && this._redraw(t), this;
      },
      _redraw: function(t) {
        var i = this._layers[t],
          s = i.feature;
        if (i && i.setIcon && this.options.pointToLayer && this.options.pointToLayer) {
          var r = this.options.pointToLayer(
              s,
              e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])
            ),
            n = r.options.icon;
          i.setIcon(n);
        }
        if (i && i.setStyle && this.options.pointToLayer) {
          var o = this.options.pointToLayer(
              s,
              e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])
            ),
            a = o.options;
          this.setFeatureStyle(s.id, a);
        }
        i && i.setStyle && this.options.style && this.resetStyle(s.id);
      },
    });
  (t.VERSION = '2.1.1'),
    (t.Support = it),
    (t.options = st),
    (t.Util = at),
    (t.get = nt),
    (t.post = r),
    (t.request = o),
    (t.Task = ut),
    (t.task = q),
    (t.Query = lt),
    (t.query = D),
    (t.Find = ht),
    (t.find = B),
    (t.Identify = ct),
    (t.identify = E),
    (t.IdentifyFeatures = pt),
    (t.identifyFeatures = z),
    (t.IdentifyImage = dt),
    (t.identifyImage = N),
    (t.Service = mt),
    (t.service = j),
    (t.MapService = ft),
    (t.mapService = Z),
    (t.ImageService = yt),
    (t.imageService = W),
    (t.FeatureLayerService = gt),
    (t.featureLayerService = J),
    (t.BasemapLayer = vt),
    (t.basemapLayer = Q),
    (t.TiledMapLayer = bt),
    (t.tiledMapLayer = H),
    (t.RasterLayer = xt),
    (t.ImageMapLayer = St),
    (t.imageMapLayer = V),
    (t.DynamicMapLayer = At),
    (t.dynamicMapLayer = K),
    (t.FeatureManager = It),
    (t.FeatureLayer = wt),
    (t.featureLayer = $);
});
//# sourceMappingURL=esri-leaflet.js.map
