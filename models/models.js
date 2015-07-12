var path = require('path');

//URL para Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//URL para SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//cargamos el modelo ORM
var Sequelize = require('sequelize');

//usar la base de datos sqlite
var sequelize = new Sequelize(null, null, null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
	);

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

//importamos la definicion de la tabla hecha en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; //exportamos la definicion de la tabla

// se inicializa la tabla en la BD
sequelize.sync().success(function() {
	//se ejecuta el manejador cuando se crea la tabla
	Quiz.count().success(function (count){
		if(count === 0){ //si la tabla esta vacia
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'	

			})
		.success(function(){console.log('Base de datos iniciada')});
		};
	});
});
