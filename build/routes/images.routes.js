"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _config = _interopRequireDefault(require("../config"));

var _images = _interopRequireDefault(require("../models/images"));

var _multer = _interopRequireDefault(require("../middleware/multer"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var router = (0, _express.Router)();
var spacesEndpoint = new _awsSdk["default"].Endpoint(_config["default"].Endpoint);
var s3 = new _awsSdk["default"].S3({
  endpoint: spacesEndpoint
});
router.post('/api/images/upload', (0, _multer["default"])(), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var files, description, rooms, urls, keys, _iterator, _step, file, image;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Recibiendo las imagenes
            files = req.files;
            description = req.body.description;
            rooms = req.body.rooms;
            urls = [];
            keys = []; //Listando individualmente las imagenes 

            _iterator = _createForOfIteratorHelper(files);
            _context.prev = 6;

            _iterator.s();

          case 8:
            if ((_step = _iterator.n()).done) {
              _context.next = 16;
              break;
            }

            file = _step.value;
            //Crear una URL para cada imagen  
            urls.push("https://".concat(_config["default"].BucketName, ".").concat(_config["default"].Endpoint, "/").concat(file.originalname));
            keys.push(file.originalname); //Subiendo imagenes a la nube

            _context.next = 14;
            return s3.putObject({
              ACL: 'public-read',
              Bucket: _config["default"].BucketName,
              Body: file.buffer,
              Key: file.originalname
            }).promise();

          case 14:
            _context.next = 8;
            break;

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](6);

            _iterator.e(_context.t0);

          case 21:
            _context.prev = 21;

            _iterator.f();

            return _context.finish(21);

          case 24:
            _context.prev = 24;
            //Agregando a la base de datos
            image = new _images["default"]({
              url: urls,
              key: keys,
              rooms: rooms,
              description: description,
              status: 'Agregado exitosamente'
            });
            _context.next = 28;
            return image.save();

          case 28:
            console.log(image);
            res.json();
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](24);
            console.log(_context.t1);
            res.json(_context.t1);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 18, 21, 24], [24, 32]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/api/images/', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var images;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _images["default"].find();

          case 2:
            images = _context2.sent;
            return _context2.abrupt("return", res.json(images));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/api/images/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var image;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _images["default"].findById(req.params.id);

          case 2:
            image = _context3.sent;
            return _context3.abrupt("return", res.json(image));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]('/api/images/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var image, keys, _iterator2, _step2, imgs, deleteImage;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(req.params.id);
            _context4.next = 3;
            return _images["default"].findById(req.params.id);

          case 3:
            image = _context4.sent;
            keys = image.key;
            _iterator2 = _createForOfIteratorHelper(keys);
            _context4.prev = 6;

            _iterator2.s();

          case 8:
            if ((_step2 = _iterator2.n()).done) {
              _context4.next = 14;
              break;
            }

            imgs = _step2.value;
            _context4.next = 12;
            return s3.deleteObject({
              Bucket: _config["default"].BucketName,
              Key: imgs
            });

          case 12:
            _context4.next = 8;
            break;

          case 14:
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](6);

            _iterator2.e(_context4.t0);

          case 19:
            _context4.prev = 19;

            _iterator2.f();

            return _context4.finish(19);

          case 22:
            _context4.next = 24;
            return _images["default"].findByIdAndDelete(req.params.id);

          case 24:
            deleteImage = _context4.sent;
            res.json(deleteImage);

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 16, 19, 22]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;