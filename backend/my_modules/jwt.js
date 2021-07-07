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

module.exports.jwtCheckModule = (req, res, next)=>{
	if(req.url == '/login' || req.url == '/createUser')
		if(!req.signedCookies.token)
			next();
		else
			res.status(403).send('잘못된 접근(로그인 중, 로그아웃 후 재접속 필요)')
	else
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