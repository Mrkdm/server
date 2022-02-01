"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const MessageConsultSchema = new _mongoose.Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    require: true
  },
  tel: String
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('MessageConsult', MessageConsultSchema);

exports.default = _default;