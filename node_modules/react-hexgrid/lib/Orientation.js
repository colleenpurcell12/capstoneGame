"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Orientation = function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
  _classCallCheck(this, Orientation);

  this.f0 = f0;
  this.f1 = f1;
  this.f2 = f2;
  this.f3 = f3;
  this.b0 = b0;
  this.b1 = b1;
  this.b2 = b2;
  this.b3 = b3;
  this.startAngle = startAngle;
};

exports.default = Orientation;