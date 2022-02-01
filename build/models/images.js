"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ImageSchema = new _mongoose.Schema({
  typeProp: String,
  title: String,
  description: String,
  typeOperation: String,
  rooms: String,
  bathRooms: String,
  halfRooms: String,
  parking: String,
  key: Array,
  status: String,
  mtsConst: String,
  mtsTerr: String,
  longTerrain: String,
  frontTerrain: String,
  ubication: String,
  url: {
    type: Array,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Image', ImageSchema);

exports.default = _default;