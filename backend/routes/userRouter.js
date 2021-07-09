const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('../my_modules/jwt');
const db = require('../my_modules/DBconn');
const crypto = require('crypto');
const mailer = require('./myMailer');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const client = redis.createClient();
router.use(cookieParser(process.env.COOKIE_KEY));

router.post('/createUser',async (req, res) => {
	const email = req.body.email;
	const pw = req.body.pw;
	if(!(email && pw))
		return res.status(400).send('no input');
	
	const result = await db.insert(email, pw);
	if(result)
		return res.send('성공');
	else if(result === false)
		return res.send('실패');
	else
		return res.status(400).send('존재하는 id');
});

router.post('/login', async (req, res)=>{
	const email = req.body.email;
	const pw = req.body.pw;
	if(!(email && pw))
		return res.status(400).send('no input');
	
	const row = await db.password(email, pw);
	if(row){
		const token = jwt.createJwt(email)
		res.cookie('token', token, {
			httpOnly: true,
			signed: true,
		})
		return res.status(200).send('성공') // 로그인 성공
	}
	else if(row === false)
		return res.status(401).send('비밀번호 불일치')
	else
		return res.status(400).send('잘못된 id');
});

router.get('/getUserInfo', async (req, res)=>{
	const data = await db.readInfo(req.body.userId);
	if(data)
		res.status(200).send(data);
	else
		res.status(400).send('정보없음')
});

router.patch('/updatePassword', async (req, res)=>{
	const pw = req.body.pw;
	if(!pw)
		return res.status(400).send('no input');
		
	const result = await db.updatePw(req.body.userId, pw);
	if(result)
		return res.send('update 성공');
	else if(result === false)
		return res.status(401).send('패스워드 갱신 실패');
	else
		return res.status(400).send('잘못된 id');
});

router.delete('/deleteUser', async (req, res)=>{
	res.clearCookie('token', {
		httpOnly: true,
		signed: true,
		path: '/'
	});
	const result = await db.delete(req.body.userId);
		
	if(result)
		return res.status(200).send('삭제 완료');
	else if(result === false)
		return res.status(401).send('삭제 실패');
	else
		return res.status(400).send('잘못된 id');
});


router.get('/sendConfirmCode', (req, res)=>{
	try {
		//db열고 존재하는 이메일인지 확인하는 코드 추가
		//없는 이메일이라면 signup으로 이동할 수 있게 message send
		const email = req.query.email;
		const codeKey = mailer.createRandomKey(6);
		const mailOptions = {
			from: process.env.MAIL_ID,
			to: email,
			subject: '인증키를 입력해주세요 - fake stock',
			html: `다음 인증키를 입력해주세요.</br><h2>${codeKey}</h2>`
		}
		client.set(email,codeKey);
		client.expire(email,60*5);//5분 후 만료
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
		res.status(400).send('만료됨');
	}
	else {
		client.get(email,(err,codeKey)=>{
			if(codeKey === req.body.codeKey) {
				client.del(email);
				res.status(200).send('success');
			}
			else {
				res.status(400).send('failed');
			}
		});
	}
});

module.exports = router;