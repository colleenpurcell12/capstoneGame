'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Orientation = require('./Orientation');

var _Orientation2 = _interopRequireDefault(_Orientation);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
  function Layout(layout, origin) {
    _classCallCheck(this, Layout);

    this.orientation = layout.flat ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
    this.size = new _Point2.default(layout.width, layout.height);
    this.origin = origin || new _Point2.default(0, 0);
    this.spacing = layout.spacing || 1;
  }

  _createClass(Layout, [{
    key: 'getPointOffset',
    value: function getPointOffset(corner) {
      var angle = 2.0 * Math.PI * (corner + this.orientation.startAngle) / 6;
      return new _Point2.default(this.size.x * Math.cos(angle), this.size.y * Math.sin(angle));
    }
  }, {
    key: 'getPolygonPoints',
    value: function getPolygonPoints(hex) {
      var _this = this;

      var corners = [];
      var center = new _Point2.default(0, 0);

      Array.from(new Array(6), function (x, i) {
        var offset = _this.getPointOffset(i);
        var point = new _Point2.default(center.x + offset.x, center.y + offset.y);
        corners.push(point);
      });

      return corners;
    }
  }]);

  return Layout;
}();

Layout.LAYOUT_FLAT = new _Orientation2.default(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
Layout.LAYOUT_POINTY = new _Orientation2.default(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
exports.default = Layout;