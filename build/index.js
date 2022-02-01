"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _images = _interopRequireDefault(require("./routes/images.routes"));

var _messageQuestion = _interopRequireDefault(require("./routes/messageQuestion.routes"));

var _messageConsult = _interopRequireDefault(require("./routes/messageConsult.routes"));

require("./database");

//Importando Rutas
//Importando base de datos 
//Instanciando express en constante app
const app = (0, _express.default)(); //Declarando middlewares

app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use(_express.default.json()); //Declarando rutas para ser usadas

app.use(_messageQuestion.default);
app.use(_messageConsult.default);
app.use(_index.default);
app.use(_images.default);
app.set('port', process.env.PORT || 3800);
console.log('success');
app.listen(app.get('port'));