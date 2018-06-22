import L from 'leaflet';

function __leafletExtends__() {
  if (window.L) {
    /*
            扩展circle
            添加toGeoJSON2方法
            将circle简化为polygon
        */

    //转化为弧度制
    if (Number.prototype.toRadians === undefined) {
      Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
      };
    }
    //转化为角度制
    if (Number.prototype.toDegrees === undefined) {
      Number.prototype.toDegrees = function() {
        return this * 180 / Math.PI;
      };
    }

    L.extend(L.CRS.Earth, {
      destinationPoint: function(pntStart, distance, bearing, radius) {
        radius = radius === undefined ? this.R : Number(radius);

        var δ = Number(distance) / radius;
        var θ = Number(bearing).toRadians();

        var φ1 = pntStart.lat.toRadians();
        var λ1 = pntStart.lng.toRadians();

        var sinφ1 = Math.sin(φ1),
          cosφ1 = Math.cos(φ1);
        var sinδ = Math.sin(δ),
          cosδ = Math.cos(δ);
        var sinθ = Math.sin(θ),
          cosθ = Math.cos(θ);

        var sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ;
        var φ2 = Math.asin(sinφ2);
        var y = sinθ * sinδ * cosφ1;
        var x = cosδ - sinφ1 * sinφ2;
        var λ2 = λ1 + Math.atan2(y, x);

        return L.latLng(φ2.toDegrees(), (λ2.toDegrees() + 540) % 360 - 180);
      },
    });

    L.Circle.include({
      toGeoJSON2: function(multi) {
        var pointCount = (multi || 1) * 36;

        var radius = this.options.radius;
        var center = this._latlng;

        var latlng = [];

        var bearing = 360 / pointCount;
        for (var i = 0; i <= 360; i += bearing) {
          var p = L.CRS.Earth.destinationPoint(center, radius, i);
          latlng.push([p.lng, p.lat]);
        }

        return L.GeoJSON.getFeature(this, {
          type: 'Polygon',
          coordinates: [latlng],
        });
      },
    });

    var tdtUrls = {
      c: {
        img:
          'http://t0.tianditu.com/img_c/wmts?LAYER=img&tileMatrixSet=c&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        img_anno:
          'http://t0.tianditu.com/cia_c/wmts?LAYER=cia&tileMatrixSet=c&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        vec:
          'http://t0.tianditu.com/vec_c/wmts?LAYER=vec&tileMatrixSet=c&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        vec_anno:
          'http://t0.tianditu.com/cva_c/wmts?LAYER=cva&tileMatrixSet=c&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
      },
      w: {
        img:
          'http://t0.tianditu.com/img_w/wmts?LAYER=img&tileMatrixSet=w&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        img_anno:
          'http://t0.tianditu.com/cia_w/wmts?LAYER=cia&tileMatrixSet=w&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        vec:
          'http://t0.tianditu.com/vec_w/wmts?LAYER=vec&tileMatrixSet=w&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
        vec_anno:
          'http://t0.tianditu.com/cva_w/wmts?LAYER=cva&tileMatrixSet=w&service=wmts&request=GetTile&version=1.0.0&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
      },
    };
    /*
            天地图扩展
            使用:
            c:cgcs2000
            var vec = L.tileLayer.TDT('c','vec',{opacity:0.5});
            var vec_anno = L.tileLayer.TDT('c','vec_anno',{opacity:0.5});
            map = L.map('map', {
                crs: L.CRS.EPSG4490,
                center: [30.75, 120.75],
                zoom: 19
            })

            w:web墨卡托
            var vec = L.tileLayer.TDT('w','vec',{opacity:0.5});
            var vec_anno = L.tileLayer.TDT('w','vec_anno',{opacity:0.5});
            map = L.map('map', {
                center: [30.75, 120.75],
                zoom: 19
            })
        */
    L.tileLayer.TDT = function(t0, t1, options) {
      return L.tileLayer(tdtUrls[t0][t1], options);
    };

    /*
        嘉兴天地图扩展
        使用：
            var vec = L.tileLayer.TDTJX({type: 'vec'});
            var vec_anno = L.tileLayer.TDTJX({type: 'vec_anno'});
            map = L.map('map', {
                crs: L.CRS.EPSG4490,
                center: [30.75, 120.75],
                zoom: 19
            })
            map.addLayer(vec);
            map.addLayer(vec_anno);
        */
    L.TileLayer.TDTJX = L.TileLayer.extend({
      urls: {
        vec: {
          g: {
            url: 'http://t0.tianditu.com/vec_c/wmts',
            options: {
              layer: 'vec',
              tilematrixSet: 'c',
              format: 'tile',
            },
          },
          s: {
            url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
            options: {
              layer: 'ZJEMAP_2D',
              tilematrixSet: 'esritilematirx',
              format: 'image/png',
            },
          },
          d: {
            url: 'http://220.191.220.90/JXEMAP/service/wmts',
            options: {
              layer: 'JXEMAP',
              tilematrixSet: 'TileMatrixSet0',
              format: 'image/png',
            },
          },
        },
        vec_anno: {
          g: {
            url: 'http://t0.tianditu.com/cva_c/wmts',
            options: {
              layer: 'cva',
              tilematrixSet: 'c',
              format: 'tile',
            },
          },
          s: {
            url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
            options: {
              layer: 'ZJEMAPANNO_2D',
              tilematrixSet: 'esritilematirx',
              format: 'image/png',
            },
          },
          d: {
            url: 'http://220.191.220.90/JXEMAPANNO/service/wmts',
            options: {
              layer: 'JXEMAPANNO',
              tilematrixSet: 'TileMatrixSet0',
              format: 'image/png',
            },
          },
        },
        img: {
          g: {
            url: 'http://t0.tianditu.com/img_c/wmts',
            options: {
              layer: 'img',
              tilematrixSet: 'c',
              format: 'tile',
            },
          },
          s: {
            url: 'http://srv.zjditu.cn/ZJDOM_2D/wmts',
            options: {
              layer: 'ZJDOM_2D',
              tilematrixSet: 'esritilematirx',
              format: 'image/jpeg',
            },
          },
          d: {
            url: 'http://220.191.220.90/JXIMG/service/wmts',
            options: {
              layer: 'JXIMG',
              tilematrixSet: 'TileMatrixSet0',
              format: 'image/png',
            },
          },
        },
        img_anno: {
          g: {
            url: 'http://t0.tianditu.com/cia_c/wmts',
            options: {
              layer: 'cia',
              tilematrixSet: 'c',
              format: 'tile',
            },
          },
          s: {
            url: 'http://srv.zjditu.cn/ZJDOMANNO_2D/wmts',
            options: {
              layer: 'ZJDOMANNO_2D',
              tilematrixSet: 'esritilematirx',
              format: 'image/png',
            },
          },
          d: {
            url: 'http://220.191.220.90/JXIMGANNO/service/wmts',
            options: {
              layer: 'JXIMGANNO',
              tilematrixSet: 'TileMatrixSet0',
              format: 'image/png',
            },
          },
        },
      },
      initialize: function(options) {
        this.type = options.type;
        L.extend(this.options, options);
        this.options.maxZoom = 20;
        this.options.minZoom = 0;
        var titleSize = 256;
        var baseOption = {
          width: titleSize,
          height: titleSize,
          service: 'WMTS',
          request: 'GetTile',
          version: '1.0.0',
          tileSize: 256,
          style: 'default',
          errorTileUrl: 'http://10.73.1.48/geosoc/Content/img/error.png',
        };
        for (var n in this.urls) {
          var urlCfg = this.urls[n];
          for (var m in urlCfg) {
            urlCfg[m].options = L.extend(urlCfg[m].options, baseOption);
          }
        }
      },
      onAdd: function(map) {
        L.TileLayer.prototype.onAdd.call(this, map);
      },
      getTileUrl: function(tilePoint) {
        var urlOption = this.getUrlOption(this.type, tilePoint.z);
        var url = urlOption.url;
        url = L.Util.template(url, {
          s: this._getSubdomain(tilePoint),
        });
        return (
          url +
          L.Util.getParamString(urlOption.options, url) +
          '&tilematrix=' +
          tilePoint.z +
          '&tilerow=' +
          tilePoint.y +
          '&tilecol=' +
          tilePoint.x
        );
      },
      getUrlOption: function(type, zoom) {
        return this._getUrlOptionsByZoom(this.urls[type], zoom);
      },
      _getUrlOptionsByZoom: function(opt, zoom) {
        //0-13级使用国家服务
        if (zoom < 14) return opt.g;
        else if (zoom < 18)
          //14-17级使用省厅服务
          return opt.s;
        else
          //18-20级使用地市级
          return opt.d;
      },
    });
    /*
            options:{
                type:'vec'['vec_anno','img','img_anno']
            }
        */
    L.tileLayer.TDTJX = function(options) {
      return new L.TileLayer.TDTJX(options);
    };

    L.CRS.EPSG4490 = L.extend({}, L.CRS.EPSG4326, {
      code: 'EPSG:4490',
      transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.25),
    });

    L.TileLayer.WMTS = L.TileLayer.extend({
      options: {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        style: 'default',
        format: 'image/png',
      },
      initialize: function(url, options) {
        this.url = url;
        L.extend(this.options, options);
      },
      getTileUrl: function(tilePoint) {
        return (
          this.url +
          L.Util.getParamString(this.options) +
          '&tilematrix=' +
          tilePoint.z +
          '&tilerow=' +
          tilePoint.y +
          '&tilecol=' +
          tilePoint.x
        );
      },
    });

    L.tileLayer.WMTS = function(options) {
      return new L.TileLayer.WMTS(options);
    };

    /*
            扩展Draw
            组件
        */
    if (L.Draw) {
      L.Draw.Feature.include({
        _fireCreatedEvent: function(layer) {
          var data = {
            layer: layer,
            layerType: this.type,
          };

          //  创建要素后触发
          this.fire(L.Draw.Event.CREATED, data);

          this._map.fire(L.Draw.Event.CREATED, data);
        },
        toggleEnable: function() {
          this._enabled ? this.disable() : this.enable();
        },
      });
      /*
                创建绘制工具
                使用方法：
                var draw = L.Draw.initDraw(map,'polygon').on(L.Draw.Event.CREATED, function (e) {
                                e.layer.addTo(map);
                           },this);
                draw.enable();
            */
      L.Draw.initDraw = function(map, type, options) {
        var constructor = L.Draw.Marker;
        type = type && type.toLowerCase ? type.toLowerCase() : null;
        switch (type) {
          case 'circle':
            constructor = L.Draw.Circle;
            break;
          case 'polyline':
            constructor = L.Draw.Polyline;
            break;
          case 'polygon':
            constructor = L.Draw.Polygon;
            break;
          case 'rectangle':
            constructor = L.Draw.Rectangle;
            break;
          default:
            constructor = L.Draw.Marker;
        }
        return new constructor(map, options);
      };

      L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
        geodesicArea: function(latLngs) {
          var pointsCount = latLngs.length,
            area = 0.0,
            d2r = Math.PI / 180,
            p1,
            p2;

          if (pointsCount > 2) {
            for (var i = 0; i < pointsCount; i++) {
              p1 = latLngs[i];
              p2 = latLngs[(i + 1) % pointsCount];
              area +=
                (p2.lng - p1.lng) * d2r * (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
            }
            area = area * 6378137.0 * 6378137.0 / 2.0;
          }

          return Math.abs(area);
        },

        readableArea: function(area, isMetric) {
          var areaStr;

          if (isMetric) {
            if (area >= 10000) {
              areaStr = (area * 0.0001).toFixed(2) + ' 万平方米';
            } else {
              areaStr = area.toFixed(2) + ' 平方米';
            }
          } else {
            area /= 0.836127;

            if (area >= 3097600) {
              areaStr = (area / 3097600).toFixed(2) + ' mi&sup2;';
            } else if (area >= 4840) {
              areaStr = (area / 4840).toFixed(2) + ' acres';
            } else {
              areaStr = Math.ceil(area) + ' yd&sup2;';
            }
          }

          return areaStr;
        },

        readableDistance: function(distance, isMetric, useFeet) {
          var distanceStr;

          if (isMetric) {
            if (distance > 1000) {
              distanceStr = (distance / 1000).toFixed(2) + ' 千米';
            } else {
              distanceStr = Math.ceil(distance) + ' 米';
            }
          } else {
            distance *= 1.09361;

            if (distance > 1760) {
              distanceStr = (distance / 1760).toFixed(2) + ' miles';
            } else {
              var suffix = ' yd';
              if (useFeet) {
                distance = distance * 3;
                suffix = ' ft';
              }
              distanceStr = Math.ceil(distance) + suffix;
            }
          }

          return distanceStr;
        },
      });

      //修改默认提示为中文
      L.Draw.defaultDrawLocal = {
        draw: {
          toolbar: {
            actions: {
              title: '取消',
              text: '取消',
            },
            finish: {
              title: '完成',
              text: '完成',
            },
            undo: {
              title: '删除最后一个点',
              text: '删除最后一个点',
            },
            buttons: {
              polyline: '线',
              polygon: '多边形',
              rectangle: '矩形',
              circle: '圆',
              marker: '点',
            },
          },
          handlers: {
            circle: {
              tooltip: {
                start: '点击并拖动以绘制圆',
              },
              radius: '半径',
            },
            marker: {
              tooltip: {
                start: '点击放置点',
              },
            },
            polygon: {
              tooltip: {
                start: '点击开始绘制',
                cont: '点击继续绘制',
                end: '双击结束绘制',
              },
            },
            polyline: {
              error: '<strong>错误:</strong>图形边界不能相交!',
              tooltip: {
                start: '点击开始绘制线',
                cont: '点击继续绘制',
                end: '双击结束绘制',
              },
            },
            rectangle: {
              tooltip: {
                start: '点击并拖动以绘制矩形',
              },
            },
            simpleshape: {
              tooltip: {
                end: '释放鼠标以完成绘制',
              },
            },
          },
        },
        edit: {
          toolbar: {
            actions: {
              save: {
                title: '保存更改',
                text: '保存',
              },
              cancel: {
                title: '放弃编辑，放弃所有的更改。',
                text: '取消',
              },
            },
            buttons: {
              edit: '编辑图层',
              editDisabled: '停止编辑',
              remove: '删除图层',
              removeDisabled: '没有可以删除的图层',
            },
          },
          handlers: {
            edit: {
              tooltip: {
                text: '拖动节点进行编辑',
                subtext: '点击取消以放弃更改',
              },
            },
            remove: {
              tooltip: {
                text: '点击要素进行平移',
              },
            },
          },
        },
      };

      L.Draw.measureDrawLocal = {
        draw: {
          handlers: {
            polygon: {
              tooltip: {
                start: '点击开始测量',
                cont: '点击继续测量',
                end: '双击结束测量',
              },
            },
            polyline: {
              error: '<strong>错误:</strong>图形边界不能相交!',
              tooltip: {
                start: '点击开始测量',
                cont: '点击继续测量',
                end: '双击结束测量',
              },
            },
            simpleshape: {
              tooltip: {
                end: '释放鼠标以完成测量',
              },
            },
          },
        },
      };

      L.Draw.resetDrawLocal = function() {
        L.drawLocal = L.Draw.defaultDrawLocal;
      };

      L.Draw.resetMeasureDrawLocal = function() {
        L.drawLocal = L.Draw.measureDrawLocal;
      };

      var DrawTool = L.Evented.extend({
        currentActiveTool: null,
        options: {
          markerSymbol: new L.Icon.Default(),
          polylineMarkerSymbol: new L.DivIcon({
            iconSize: new L.Point(12, 12),
            className: 'leaflet-map-icon ct-draw-icon',
          }),
          polylineSymbol: {
            color: '#ff3f3f',
            weight: 3,
            opacity: 1,
          },
          polygonMarkerSymbol: new L.DivIcon({
            iconSize: new L.Point(12, 12),
            className: 'leaflet-map-icon ct-draw-icon',
          }),
          polygonSymbol: {
            color: '#ff3f3f',
            weight: 3,
            opacity: 1,
            fill: true,
          },
        },
        initialize: function(map, options) {
          L.Util.extend(this.options, options);
          var opts = this.options;
          this._map = map;
          var drawPolylineOptions = {
            shapeOptions: opts.polylineSymbol,
            showLength: !!opts.showMeasure,
            icon: opts.polylineMarkerSymbol,
            metric: true,
          };
          var drawPolygonOptions = {
            fill: true,
            shapeOptions: opts.polygonSymbol,
            showLength: !!opts.showMeasure,
            showArea: true,
            icon: opts.polygonMarkerSymbol,
            metric: true,
          };
          this._drawTools = {
            marker: L.Draw.initDraw(this._map, DrawTool.drawTypes.marker, {
              icon: opts.markerSymbol,
            }),
            polyline: L.Draw.initDraw(this._map, DrawTool.drawTypes.polyline, drawPolylineOptions),
            polygon: L.Draw.initDraw(this._map, DrawTool.drawTypes.polygon, drawPolygonOptions),
          };
          for (var n in this._drawTools) {
            this._drawTools[n].on(L.Draw.Event.CREATED, this._drawCompleteHandle, this);
          }
        },
        _drawCompleteHandle: function(evt) {
          this.fire(DrawTool.events.complete, evt, false);
        },
        activeDrawTool: function(drawType, options) {
          this.deactiveDrawTools();
          var tool = this._drawTools[drawType];
          if (options) tool.setOptions(options);
          tool.enable();
          return tool;
        },
        deactiveDrawTools: function() {
          for (var n in this._drawTools) {
            this._drawTools[n].disable();
          }
        },
      });

      DrawTool.events = {
        complete: 'drawcomplete',
      };
      DrawTool.drawTypes = {
        marker: 'marker',
        polyline: 'polyline',
        polygon: 'polygon',
      };

      L.DrawTool = DrawTool;
      L.drawTool = function(map, options) {
        return new DrawTool(map, options);
      };
    }
  }
}
__leafletExtends__();
export default __leafletExtends__;
