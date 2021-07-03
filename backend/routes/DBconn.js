const mariadb = require('mysql');
const crypto = require('crypto');
const jwt = require('./jwt');
require('dotenv').config();

const dbTable = process.env.DB_TABLE;
const connection = mariadb.createConnection({
    host: 'localhost',
	user: process.env.USER_NAME,
	password: process.env.DB_KEY,
	port : process.env.DB_PORT,
	database: process.env.DB_NAME
});

connection.connect();

module.exports.readInfo = (email) => {
	connection.query(`select email, create_at, '${email}' from ${dbTable}`, (err, data)=>{
		console.log(data[0].email);
		console.log(data[0].create_at);
})};

module.exports.password =(email, pw, res)=>{
	connection.query(`select password, salt, '${email}' from ${dbTable}`, (err, data)=>{
		if(err)
			return console.log(err)
		const key = crypto.pbkdf2Sync(pw, data[0].salt, 1000, 60, 'sha512').toString('base64');

		if(data[0].password === key){
			const token = jwt.createJwt(email)
			res.cookie('token', token, {
				httpOnly: true,
				signed: true,
			})
			res.redirect('/');
		}
		else{
			console.log('login failed')
			res.redirect('/');
		}
	})
}

module.exports.write = (email, pw) => {
	const salt = crypto.randomBytes(8).toString('hex');
	const key = crypto.pbkdf2Sync(pw, salt, 1000, 60, 'sha512').toString('base64');
	connection.query(`INSERT INTO ${dbTable} (email, password, salt) VALUES ('${email}', '${key}', '${salt}')`);
};
	
module.exports.delete = (email) =>{
	connection.query(`DELETE FROM ${dbTable} WHERE (email = '${email}')`);
};

module.exports.updatePw = (email, pw)=>{
	const salt = crypto.randomBytes(8).toString('hex');
	const key = crypto.pbkdf2Sync(pw, salt, 1000, 60, 'sha512').toString('base64');
	connection.query(`UPDATE ${dbTable} SET password = '${key}', salt = '${salt}' WHERE (email = '${email}')`);
}

module.exports.excuteDB = (callback, email, pw, res)=>{
	connection.query(`select 1 from ${dbTable} where (email = '${email}')`,(err, data)=>{
		if(!data[0]){
			return console.log('no id');
		}
		callback(email, pw, res);
	})
}

