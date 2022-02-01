"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const MessageSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: false
  },
  name: String,
  tel: String,
  idProp: String,
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Message', MessageSchema);

exports.default = _default;