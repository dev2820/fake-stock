const jwt = require('jsonwebtoken');
require('dotenv').config();
const suuuuperSecret = process.env.SECRET_KEY;

module.exports.checkJwt = (token)=>{
	if(token == null)
		return null;
	try{
		return jwt.verify(token, suuuuperSecret, (err, decoded)=>{
			return decoded.id;
		})
	}catch(err){
		console.log(err);
		return null;
	}
}

module.exports.createJwt = (email)=>{
	console.log(suuuuperSecret)
	return jwt.sign({id: email}, suuuuperSecret)
}
