const mysql = require('mysql');
exports.getConnection = function(){
	let connection = mysql.createConnection({
		host: '127.0.0.1',
		database: 'exam_student',
		user: 'root',
		password: '123456'
	});
	connection.connect();
	return connection;
};