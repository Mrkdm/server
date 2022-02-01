"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _messageConsult = _interopRequireDefault(require("../models/messageConsult.js"));

const router = (0, _express.Router)();
router.post('/api/messageConsult/', async (req, res) => {
  var data = req.body;

  try {
    const userConsult = new _messageConsult.default({
      email: data.email,
      name: data.name,
      lastname: data.lastname,
      tel: data.tel
    });
    await userConsult.save();
    res.json({
      status: 1
    });
  } catch (err) {
    res.json({
      status: 0,
      err
    });
    return;
  }
});
router.get('/api/messageConsult/', async (req, res) => {
  var count = await _messageConsult.default.count();
  var userConsult = await _messageConsult.default.find();
  res.json({
    userConsult,
    "count": count
  });
});
router.delete('/api/messageConsult/:id', async (req, res) => {
  var deleteUserMessage = await _messageConsult.default.findByIdAndDelete(req.params.id);
  res.json(deleteUserMessage);
});
var _default = router;
exports.default = _default;