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
checkAccess = (token)=>{
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
	if(req.signedCookies.refresh ||
		checkAccess(req.headers.authorization.split('Bearer ')[1]))
		res.status(400).send('로그아웃 필요');
	else
		next();
}
module.exports.jwtCheckMiddleWare = (req, res, next)=>{
	try{
<<<<<<< HEAD
		if(req.headers.authorization){
			const access = checkAccess(req.headers.authorization.split('Bearer ')[1]);
			//const access = checkAccess(req.headers.authorization);
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
=======
		//console.log(req.headers.authorization)
		if(req.headers.authorization){//access토큰 존재
			const access = checkAccess(req.headers.authorization.split('Bearer ')[1]);
			if(!!access) {
				//access토큰이 유효함
				req.body.userId = access;
				next();
			}
			else {
				//access토큰이 유효하지 않음
				res.status(401).send('access토큰 재발급 필요');
			}
		}
		else if(req.signedCookies.refresh){
			const refresh = checkRefresh(req.signedCookies.refresh);
			if(!!refresh) {
				res.status(401).send('access토큰 재발급 필요');
			}
			else {
				throw new Error('refresh 토큰이 유효하지 않음')
			}
		}
		else {
			throw new Error('refresh 토큰이 유효하지 않음')
>>>>>>> 0f85bffdf2a84962c07db736c43e99840a2e2d36
		}
	}
	catch(err){
		console.log(err)
		res.status(400).send('jwt 토큰 모듈 오류')
	}
}

<<<<<<< HEAD
=======
module.exports.updatePwMiddleWare = (req, res, next)=>{
	console.log(req.signedCookies)
	if(!req.signedCookies.findpass)
		next();
	else{
		jwt.verify(req.signedCookies.findpass, suuuuperSecret, (err, decoded)=>{
			req.signedCookies.refresh = this.createRefreshJwt(decoded.id);
			next();
		})
	}
}
>>>>>>> 0f85bffdf2a84962c07db736c43e99840a2e2d36
