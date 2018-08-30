//importar as configurações do servidor
var app = require('./config/server');

var server = app.listen(8080, function(){
	console.log('servidor online e escutando na porta 8080');
})

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
	console.log('usuário conectou');

	socket.on('disconnect', function(){
		console.log('usuario desconectou');
	})

	socket.on('msgParaServidor', function(data){

		//dialogo
		socket.emit(
			'msgParaCliente',
			{apelido : data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente',
			{apelido : data.apelido, mensagem: data.mensagem}
		);

		//participantes do dialogo
		if(parseInt(data.apelido_atualizado) == 0){
			socket.emit(
				'participanteParaCliente',
				{apelido : data.apelido}
			);

			socket.broadcast.emit(
				'participanteParaCliente',
				{apelido : data.apelido}
			);
		}
	});
});