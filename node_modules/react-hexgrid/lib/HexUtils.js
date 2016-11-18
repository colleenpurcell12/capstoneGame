'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hex = require('./Hex');

var _Hex2 = _interopRequireDefault(_Hex);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HexUtils = function () {
  function HexUtils() {
    _classCallCheck(this, HexUtils);
  }

  _createClass(HexUtils, null, [{
    key: 'equals',
    value: function equals(a, b) {
      return a.q == b.q && a.r == b.r && a.s == b.s;
    }
  }, {
    key: 'add',
    value: function add(a, b) {
      return new _Hex2.default(a.q + b.q, a.r + b.r, a.s + b.s);
    }
  }, {
    key: 'subtract',
    value: function subtract(a, b) {
      return new _Hex2.default(a.q - b.q, a.r - b.r, a.s - b.s);
    }
  }, {
    key: 'multiply',
    value: function multiply(a, k) {
      return new _Hex2.default(a.q * k, a.r * k, a.s * k);
    }
  }, {
    key: 'lengths',
    value: function lengths(hex) {
      return parseInt((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
    }
  }, {
    key: 'distance',
    value: function distance(a, b) {
      return HexUtils.lengths(HexUtils.subtract(a, b));
    }
  }, {
    key: 'direction',
    value: function direction(_direction) {
      return HexUtils.DIRECTIONS[(6 + _direction % 6) % 6];
    }
  }, {
    key: 'neighbour',
    value: function neighbour(hex, direction) {
      return HexUtils.add(hex, HexUtils.direction(direction));
    }
  }, {
    key: 'round',
    value: function round(hex) {
      var rq = Math.round(hex.q);
      var rr = Math.round(hex.r);
      var rs = Math.round(hex.s);

      var qDiff = Math.abs(rq - hex.q);
      var rDiff = Math.abs(rr - hex.r);
      var sDiff = Math.abs(rs - hex.s);

      if (qDiff > rDiff && qDiff > rDiff) rq = -rr - rs;else if (rDiff > sDiff) rr = -rq - rs;else rs = -rq - rr;

      return new _Hex2.default(rq, rr, rs);
    }
  }, {
    key: 'hexToPixel',
    value: function hexToPixel(hex, layout) {
      var s = layout.spacing;
      var M = layout.orientation;
      var x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
      var y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
      // Apply spacing
      x = x * s;
      y = y * s;
      return new _Point2.default(x + layout.origin.x, y + layout.origin.y);
    }
  }, {
    key: 'pixelToHex',
    value: function pixelToHex(point, layout) {
      var M = layout.orientation;
      var pt = new _Point2.default((point.x - layout.origin.x) / layout.size.x, (point.y - layout.origin.y) / layout.size.y);
      var q = M.b0 * pt.x + M.b1 * pt.y;
      var r = M.b2 * pt.x + M.b3 * pt.y;
      return new _Hex2.default(q, r, -q - r);
    }
  }, {
    key: 'lerp',
    value: function lerp(a, b, t) {
      return new _Hex2.default(a.q + (b.q - a.q) * t, a.r + (b.r - a.r) * t, a.s + (b.s - a.s) * t);
    }
  }, {
    key: 'getID',
    value: function getID(hex) {
      return hex.q + ',' + hex.r + ',' + hex.s;
    }
  }]);

  return HexUtils;
}();

HexUtils.DIRECTIONS = [new _Hex2.default(1, 0, -1), new _Hex2.default(1, -1, 0), new _Hex2.default(0, -1, 1), new _Hex2.default(-1, 0, 1), new _Hex2.default(-1, 1, 0), new _Hex2.default(0, 1, -1)];
exports.default = HexUtils;