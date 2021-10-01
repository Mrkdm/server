"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function uploadFile() {
  var storage = _multer["default"].memoryStorage({
    destination: './public/files',
    filename: function filename(_req, file, cb) {
      var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, Date.now() + extension);
    }
  });

  var upload = (0, _multer["default"])({
    storage: storage
  }).array('file', 5);
  return upload;
}

var _default = uploadFile;
exports["default"] = _default;