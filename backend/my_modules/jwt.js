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
		return undefined;
	}
}

module.exports.createJwt = (email)=>{
	return jwt.sign({id: email}, suuuuperSecret)
}

<<<<<<< HEAD
module.exports.jwtCheckMiddleWare = (req, res, next)=>{
	try{
		const result = this.checkJwt(req.signedCookies.token);
		if(result){
			req.body.userId = result;
=======
module.exports.jwtCheckMiddleware = (req, res, next)=>{
	if(req.url == '/login' || req.url == '/createUser' || req.url == '/sendConfirmCode' || req.url == '/checkConfirmCode')
		if(!req.signedCookies.token)
>>>>>>> c980b796d007d8e46cd75b09e1e7d473e41fa385
			next();
		}
		else
			res.status(401).send('로그인 필요');
	}
	catch(err){
		console.log(err)
		res.status(401).send('jwt 토큰 모듈 오류')
	}
}