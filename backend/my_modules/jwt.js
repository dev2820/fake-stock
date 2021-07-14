const jwt = require('jsonwebtoken');
require('dotenv').config();
const suuuuperSecret = process.env.SECRET_KEY;

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
		return jwt.verify(token, suuuuperSecret, {expiresIn: '1h'}, (err, decoded)=>{
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
	return jwt.sign({id: email}, suuuuperSecret, { expiresIn: '1h' })
}

module.exports.jwtCheckMiddleWare = (req, res, next)=>{
	try{
		const result = checkAccess(req.signedCookies.access);
		const refresh = checkRefresh(req.signedCookies.refresh);
		if(result){
			req.body.userId = result;
			next();
		}
		else if(refresh){
			req.body.userId = refresh;
			req.signedCookies.access = this.createAccessJwt(refresh);
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
		next();

	jwt.verify(token, suuuuperSecret, (err, decoded)=>{
		req.signedCookies.access = jwt.sign({id: decoded.id}, suuuuperSecret, { expiresIn: '1h' });
		next();
	})
}
