const mariadb = require('mysql2');
const crypto = require('crypto');
const jwt = require('./jwt');
require('dotenv').config();

const dbTable = process.env.DB_TABLE;
const pool = mariadb.createPool({
    host: 'localhost',
	user: process.env.USER_NAME,
	password: process.env.DB_KEY,
	database: process.env.DB_NAME,
	connectionLimit: 10
}).promise();

module.exports.readInfo = async (email) => {
	try{
		const [[row]] = await pool.query(`select email, create_at from ${dbTable} WHERE (email = '${email}')`);
		return row;
	}catch(err){
		console.log(err);
		return false;
	}
};

module.exports.isRightPw = async (email, pw)=>{
	try{
<<<<<<< HEAD
		const [[row]] = await pool.query(`select password, salt from ${dbTable} WHERE (email = '${email}')`);
=======
		const [[row]] = await pool.query(`SELECT password, salt FROM ${dbTable} WHERE email LIKE ${email}`);
>>>>>>> 1905d84684aa97c7d995db5bd34652cf3cc24c9f
		const key = crypto.pbkdf2Sync(pw, row.salt, 1000, 60, 'sha512').toString('base64');
		if(key === row.password){
			return true;
		}
		else 
			return false;
	}catch(err){
		console.log(err);
		return false;
	}
}

module.exports.insert = async (email, pw) => {
	try{
		const salt = crypto.randomBytes(8).toString('hex');
		const key = crypto.pbkdf2Sync(pw, salt, 1000, 60, 'sha512').toString('base64');
		const [result] = await pool.query(`INSERT INTO ${dbTable} (email, password, salt) VALUES ('${email}', '${key}', '${salt}')`);
		if(result.affectedRows == 1)
			return true;
		else
			return false;
	}catch(err){
		console.log(err);
		return false;
	}
};
	
module.exports.delete = async (email) =>{
	try{
		const [result] = await pool.query(`DELETE FROM ${dbTable} WHERE (email = '${email}')`);
		if(result.affectedRows == 1)
			return true;
		else 
			return false;
	}catch(err){
		console.log(err);
		return false;
	}
};

module.exports.updatePw = async (email, pw)=>{
	try{
		const salt = crypto.randomBytes(8).toString('hex');
		const key = crypto.pbkdf2Sync(pw, salt, 1000, 60, 'sha512').toString('base64');
		const result = await pool.query(`UPDATE ${dbTable} SET password = '${key}', salt = '${salt}' WHERE (email = '${email}')`);

		if(result[0].changedRows === 1)
			return true;
		else 
			return false;
	}catch(err){
		console.log(err);
		return false;
	}
}

module.exports.isExist = async (email) =>{
	try{
		if((await pool.query(`select 1 from ${dbTable} where (email = '${email}')`))[0][0])
			return true;
		else
			return false;
	}catch(err){
		console.log(err)
	}
}
