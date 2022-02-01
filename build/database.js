"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

(async () => {
  const db = await _mongoose.default.connect('mongodb://147.182.218.131/inmobiliaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('connect to:', db.connection.name);
})();