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

module.exports.jwtCheckMiddleWare = (req, res, next)=>{
	try{
		const result = this.checkJwt(req.signedCookies.token);
		if(result){
			req.body.userId = result;
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

module.exports.updatePwMiddleWare = (req, res, next)=>{
	if(!req.signedCookies.findpass)
		next();

	jwt.verify(token, suuuuperSecret, (err, decoded)=>{
		req.signedCookies.token = jwt.sign({id: decoded.id}, suuuuperSecret);
		next();
	})
}