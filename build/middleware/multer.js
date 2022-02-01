"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

function uploadFile() {
  const storage = _multer.default.memoryStorage({
    destination: './public/files',
    filename: function (req, file, cb) {
      var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, Date.now() + extension);
    }
  });

  const upload = (0, _multer.default)({
    storage: storage
  }).array('files', 20);
  return upload;
}

var _default = uploadFile;
exports.default = _default;