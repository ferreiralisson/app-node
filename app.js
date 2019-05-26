const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const cli = require('./controller/cliente.controller');
const pro = require('./controller/produto.controller');
const ped = require('./controller/pedido.controller');

//Temaplate Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//public
app.use(express.static(path.join(__dirname, "public")));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use('/', cli);
app.use('/produto', pro);
app.use('/pedido', ped);

//Iniciando Servidor
app.listen(3000, function(){
    console.log("Server Start");
});