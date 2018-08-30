var express = require('express'),
	bodyParser = require('body-parser'),
	consign = require('consign'),
	expressValidator = require('express-validator'),
    app = express();

//setar as variaveis ejs e views engine
app.set('view engine','ejs');
app.set('views', './app/views');

//configurando middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

//Consign efetua o autoload para as rotas, models e controllers para o objeto app
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

//exportar o objeto app
module.exports = app;

/*
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type, enctype, accept, authorization, x-access-token");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});


app.listen(port);

console.log('Servidor HTTP esta escutando na porta ' + port);
*/