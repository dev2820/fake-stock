const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('../my_modules/jwt');
const db = require('../my_modules/DBconn');
const crypto = require('crypto');
const mailer = require('../my_modules/myMailer');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const client = redis.createClient();
const multer = require('multer');
router.use(cookieParser(process.env.COOKIE_KEY));

const storage = multer.diskStorage({ 
	destination(req, file, callback) {
		if(file.fieldname == 'bg')
			callback(null, './image/bgpic');
		else if(file.fieldname == 'profile')
			callback(null, './image/profile');
		else
			callback(null, false);
	}, 
	filename(req, file, callback) {
		const name = jwt.checkAccess(req.headers.authorization)
		const ext = '.'+ file.mimetype.split('/')[1]
		callback(null, name + ext);
	}
});
const upload = multer({storage});
const fileMW = upload.fields([{name:'profile', maxCount:1}, {name:'bg', maxCount:1}]);

router.post('/createUser',jwt.isLoginedMiddle, async (req, res) => {
	const email = req.body.email;
	const pw = req.body.pw;
	const name = req.body.name;
	if(!(email && pw && name))
		return res.status(400).send('no input');
	if(await db.isExist(email))
		return res.status(400).send('email이 존재'); // email 존재
	const result = await db.insert(email, pw, name);
	
	if(result){
		const access = jwt.createAccessJwt(email);
		const refresh = jwt.createRefreshJwt(email);
		res.cookie('refresh', refresh, {
			httpOnly: true,
			signed: true,
		})
		return res.status(200).json({access});
	}
	else
		return res.status(400).send('실패');
});

router.post('/login',jwt.isLoginedMiddle, async (req, res)=>{
	const email = req.body.email;
	const pw = req.body.pw;
	if(!(email && pw))
		return res.status(400).send('no input');

	const row = await db.isRightPw(email, pw); 
	if(row){
		const access = jwt.createAccessJwt(email);
		const refresh = jwt.createRefreshJwt(email);
		res.cookie('refresh', refresh, {
			httpOnly: true,
			signed: true,
		})
		return res.status(200).json({access}) // 로그인 성공
	}
	else
		return res.status(400).send('비밀번호 불일치')
});

router.get('/logout',jwt.jwtCheckMiddleWare, async (req, res)=>{
	res.clearCookie('refresh', {
		httpOnly: true,
		signed: true,
		path: '/'
	});
	res.status(200).send('로그아웃 완료');
})

router.get('/getUserInfo', jwt.jwtCheckMiddleWare, async (req, res)=>{
	const data = await db.readInfo(req.body.userId, req.body.friend);
	if(data){
		res.status(200).send(data);
	}
	else
		res.status(400).send('정보없음')
});

router.patch('/updatePassword',jwt.jwtCheckMiddleWare, async (req, res)=>{
	const pw = req.body.pw;
	if(!pw)
		return res.status(400).send('no input');
	if(req.signedCookies.findpass)
		res.clearCookie('findpass', {
			httpOnly: true,
			signed: true,
			path: '/'
		});

	const result = await db.updatePw(req.body.userId, pw);
	if(result)
		return res.send('update 성공');
	else
		return res.status(400).send('패스워드 갱신 실패');
});

router.patch('/updateInfo', fileMW, jwt.jwtCheckMiddleWare, async (req, res)=>{
	const data = [req.body.name, req.body.message];
	const result = await db.updateInfo(req.body.userId, data);
	if(result)
		return res.send('update 성공');
	else
		return res.status(401).send('갱신 실패');
});

router.patch('/addFriend', jwt.jwtCheckMiddleWare, async (req, res)=>{
	if(req.body.friendEmail && await db.isExist(req.body.friendEmail)){
		const result = await db.addFriend(req.body.userId, req.body.friendEmail);
		if(result)
			return res.status(200).send('성공');
		else
			return res.status(400).send('update 실패');
	}
	else
		return res.status(400).send('NO INPUT')
})
router.delete('/deleteFriend', jwt.jwtCheckMiddleWare, async (req, res)=>{
	if(req.body.friendEmail && await db.isExist(req.body.friendEmail)){
		const result = await db.deleteFriend(req.body.userId, req.body.friendEmail);
		if(result)
			return res.status(200).send('성공');
		else
			return res.status(400).send('update 실패');
	}
	else
		return res.status(400).send('NO INPUT')
})
router.delete('/deleteUser', jwt.jwtCheckMiddleWare, async (req, res)=>{
	const result = await db.delete(req.body.userId);
		
	if(result){
		res.clearCookie('refresh', {
			httpOnly: true,
			signed: true,
			path: '/'
		});
		return res.status(200).send('삭제 완료');
	}
	else
		return res.status(400).send('삭제 실패');
});

router.post('/refreshToken',jwt.refreshTokenMiddle, (req, res)=>{
	if(!req.body.userId)
		return res.status(400).send('로그인 필요')
	else if(req.signedCookies.refresh){
		const access = jwt.createAccessJwt(req.body.userId);
		res.status(200).json({access})
	}
	else{
		const access = jwt.createAccessJwt(req.body.userId);
		const refresh = jwt.createRefreshJwt(req.body.userId);
		res.clearCookie('refresh', {
			httpOnly: true,
			signed: true,
			path: '/'
		});
		res.cookie('refresh', refresh, {
			httpOnly: true,
			signed: true,
		})
		return res.status(200).json({access}) // 로그인 성공
	}
})

router.get('/sendConfirmCode', async (req, res)=>{
	try {
		//db열고 존재하는 이메일인지 확인하는 코드 추가
		//없는 이메일이라면 signup으로 이동할 수 있게 message send
		const email = req.query.email;
		if(!await db.isExist(email)) {
			return res.status(400).send("email doesn't exist");
		}
		const codeKey = mailer.createRandomKey(6);
		const mailOptions = {
			from: process.env.MAIL_ID,
			to: email,
			subject: '인증키를 입력해주세요 - fake stock',
			html: `다음 인증키를 입력해주세요.</br><h2>${codeKey}</h2>`
		}
		client.set(email,codeKey);
		client.expire(email,60*5);
		mailer.sendMail(mailOptions,(error,info)=>{
			if(error){
				console.error(error);
			}
			else {
				res.status(200).send('success');
			}
		});
	}
	catch(err) {
		console.error(err);
		res.status(400).send('failed');
	}
});

router.post('/checkConfirmCode', (req, res)=>{
	const email = req.body.email;
	if(!client.exists(email)) {
		res.status(400).send({message:'시간이 초과되었습니다.'});
	}
	else {
		client.get(email,(err,codeKey)=>{
			if(codeKey === req.body.codeKey) {
				client.del(email);
				const token = jwt.createRefreshJwt(email);
				res.cookie('findpass', token, {
					httpOnly: true,
					signed: true,
				})
				res.status(200).send({message:'성공했습니다.'});
			}
			else {
				res.status(400).json({message:'코드가 일치하지 않습니다.'});
			}
		});
	}
});

module.exports = router;