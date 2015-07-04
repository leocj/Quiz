//llamada a la vista de preguntas
exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

//llamada a la vista de respuestas
exports.answer = function(req, res){
	if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
};