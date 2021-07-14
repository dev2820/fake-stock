const jwt = require('jsonwebtoken');
require('dotenv').config();
const suuuuperSecret = process.env.SECRET_KEY;
const accessTokenExpireTime = '1m';
checkRefresh = (token)=>{
	if(token == null)
		return null;
	try{
		return jwt.verify(token, suuuuperSecret, (err, decoded)=>{
			return decoded.id;
		})
	}catch(err){
		return undefined;
	}
}
checkAccess = (token)=>{
	if(token == null)
		return null;
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

module.exports.jwtCheckMiddleWare = (req, res, next)=>{
	try{
		//console.log(req.headers.authorization)
		if(req.headers.authorization){
			const access = checkAccess(req.headers.authorization.split('Bearer ')[1]);
			//refresh token을 이용해 토큰 재발급
			req.body.userId = access;
			next();
		}
		else if(req.signedCookies.refresh){
			const refresh = checkRefresh(req.signedCookies.refresh);
			req.body.userId = refresh;
			next()
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
		next();decoded.id

	jwt.verify(token, suuuuperSecret, (err, decoded)=>{
		req.signedCookies.refresh = this.createRefreshJwt(decoded.id);
		next();
	})
}
