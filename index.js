"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _images = _interopRequireDefault(require("./routes/images.routes"));

require("./database");

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_index["default"]);
app.use(_images["default"]);
app.set('port', process.env.PORT || 4000);
console.log('success');
app.listen(app.get('port'));