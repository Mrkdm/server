"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _messageQuestion = _interopRequireDefault(require("../models/messageQuestion"));

const router = (0, _express.Router)();
router.post('/api/messageQuestion/', async (req, res) => {
  var data = req.body;
  console.log(data);

  try {
    const userQuestion = new _messageQuestion.default({
      email: data.email,
      name: data.name,
      tel: data.tel,
      idProp: data.idProp.data,
      message: data.text
    });
    await userQuestion.save();
    res.json({
      status: 1
    });
  } catch (err) {
    res.json({
      status: 0,
      err
    });
    console.log(err);
  }
});
router.get('/api/messageQuestion/', async (req, res) => {
  var count = await _messageQuestion.default.count();
  var userQuestion = await _messageQuestion.default.find();
  res.json({
    userQuestion,
    "count": count
  });
});
router.delete('/api/messageQuestion/:id', async (req, res) => {
  var deleteUserMessage = await _messageQuestion.default.findByIdAndDelete(req.params.id);
  res.json(deleteUserMessage);
});
var _default = router;
exports.default = _default;