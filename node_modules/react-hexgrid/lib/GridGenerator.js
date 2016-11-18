'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Hex = require('./Hex');

var _Hex2 = _interopRequireDefault(_Hex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GridGenerator = function () {
  function GridGenerator() {
    _classCallCheck(this, GridGenerator);
  }

  _createClass(GridGenerator, null, [{
    key: 'getGenerator',
    value: function getGenerator(name) {
      if (GridGenerator.hasOwnProperty(name)) return GridGenerator[name];

      return null;
    }
  }, {
    key: 'parallelogram',
    value: function parallelogram(q1, q2, r1, r2) {
      var hexas = [];
      for (var q = q1; q <= q2; q++) {
        for (var r = r1; r <= r2; r++) {
          hexas.push(new _Hex2.default(q, r, -q - r));
        }
      }

      return hexas;
    }
  }, {
    key: 'triangle',
    value: function triangle(mapSize) {
      var hexas = [];
      for (var q = 0; q <= mapSize; q++) {
        for (var r = 0; r <= mapSize - q; r++) {
          hexas.push(new _Hex2.default(q, r, -q - r));
        }
      }

      return hexas;
    }
  }, {
    key: 'hexagon',
    value: function hexagon(mapRadius) {
      var hexas = [];
      for (var q = -mapRadius; q <= mapRadius; q++) {
        var r1 = Math.max(-mapRadius, -q - mapRadius);
        var r2 = Math.min(mapRadius, -q + mapRadius);
        for (var r = r1; r <= r2; r++) {
          hexas.push(new _Hex2.default(q, r, -q - r));
        }
      }

      return hexas;
    }
  }, {
    key: 'rectangle',
    value: function rectangle(mapWidth, mapHeight) {
      var hexas = [];
      for (var r = 0; r < mapHeight; r++) {
        var offset = Math.floor(r / 2); // or r>>1
        for (var q = -offset; q < mapWidth - offset; q++) {
          hexas.push(new _Hex2.default(q, r, -q - r));
        }
      }

      return hexas;
    }
  }, {
    key: 'orientedRectangle',
    value: function orientedRectangle(mapWidth, mapHeight) {
      var hexas = [];
      for (var q = 0; q < mapWidth; q++) {
        var offset = Math.floor(q / 2); // or q>>1
        for (var r = -offset; r < mapHeight - offset; r++) {
          hexas.push(new _Hex2.default(q, r, -q - r));
        }
      }

      return hexas;
    }
  }]);

  return GridGenerator;
}();

exports.default = GridGenerator;