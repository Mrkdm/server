"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ImageSchema = new _mongoose.Schema({
  description: String,
  rooms: String,
  key: Array,
  status: String,
  url: {
    type: Array,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Image', ImageSchema);

exports["default"] = _default;