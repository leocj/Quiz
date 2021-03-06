var models = require('../models/models.js');
exports.question = function(req, res) {
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{ pregunta:quiz[0].pregunta})
	})
};

exports.answer = function(req, res) {
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', { respuesta: 'Correcto'});
		}else {
			res.render('quizes/answer', { respuesta: 'Incorrecto'});
		}
	})
};

/*llamada a la vista de preguntas
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
};*/