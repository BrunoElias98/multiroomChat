module.exports.iniciaChat = function(application, req, res){

	var dadosForm = req.body;

	req.assert('apelido', 'Nome ou apelido não pode ser vazio').notEmpty();
	req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 20 caracter').len(3, 20);

	var erros = req.validationErrors();

	if(erros){
		res.render('index', {validacao : erros});
		return;
	}

	application.get('io').emit(
		'msgParaCliente',
		{apelido : dadosForm.apelido, mensagem : 'acabou de entrar no chat'}
	);

	res.render('chat', {dadosForm : dadosForm});
}