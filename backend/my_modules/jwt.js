const jwt = require('jsonwebtoken');
require('dotenv').config();
const suuuuperSecret = process.env.SECRET_KEY;
const accessTokenExpireTime = "1h";
checkRefresh = (token)=>{
	try{
		return jwt.verify(token, suuuuperSecret, (err, decoded)=>{
			return decoded.id;
		})
	}catch(err){
		return undefined;
	}
}
module.exports.checkAccess = (token)=>{
	try{
		return jwt.verify(token, suuuuperSecret, {expiresIn: accessTokenExpireTime }, (err, decoded)=>{
			return decoded.id;
		})
	}catch(err){
		return undefined;
	}
}

module.exports.createRefreshJwt = (email)=>{
	return jwt.sign({id: email}, suuuuperSecret);
}

module.exports.createAccessJwt = (email)=>{
	return jwt.sign({id: email}, suuuuperSecret, { expiresIn: accessTokenExpireTime })
}

module.exports.isLoginedMiddle = (req, res, next) => {
	if(req.signedCookies.refresh && req.headers.authorization)
		res.status(400).send('로그아웃 필요');
	else
		next();
}
module.exports.refreshTokenMiddle = (req, res, next)=>{
	if(req.signedCookies.refresh)
		req.body.userId = checkRefresh(req.signedCookies.refresh);
	console.log(req.body.userId)
	if(!req.body.userId && req.headers.authorization)
		req.body.userId = this.checkAccess(req.headers.authorization.split('Bearer ')[1]);
	console.log(req.body.userId)
	next();
}
module.exports.jwtCheckMiddleWare = (req, res, next)=>{
	console.log(req.body)
	try{
		if(req.headers.authorization){
			const access = this.checkAccess(req.headers.authorization.split('Bearer ')[1]);
			//const access = this.checkAccess(req.headers.authorization);
			if(!access || !req.signedCookies.refresh)
				res.status(401).send('토큰 만료');
			else{
				req.body.userId = access;
				next();
			}
		}
		else if(req.signedCookies.findpass){
			jwt.verify(req.signedCookies.findpass, suuuuperSecret, (err, decoded)=>{
				req.body.userId = decoded.id;
				next();
			})
			next()
		}
		else{
			res.status(400).send("로그인 필요")
		}
	}
	catch(err){
		console.log(err)
		res.status(400).send('jwt 토큰 모듈 오류')
	}
}

