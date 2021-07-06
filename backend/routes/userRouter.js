const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('./jwt');
const db = require('./DBconn')
const mailer = require('./myMailer');

const cookieParser = require('cookie-parser');
router.use(cookieParser(process.env.COOKIE_KEY));

router.post('/createUser', (req, res) =>{
	const email = req.body.email || null;
	const newPw = req.body.pw || null;
	if(!(email && newPw))
		return res.redirect('/signup');
	
	db.write(email, inputPw);
	res.redirect('/');
});

router.post('/login', (req, res)=>{
	const email = req.body.email || null;
	const inputPw = req.body.pw || null;
	if(!(email && inputPw))
		return res.redirect('/signin');
	
	db.excuteDB(db.password, email, inputPw, res);
});

router.get('/getUserInfo', (req, res)=>{
	const email = jwt.checkJwt(req.signedCookies.token);
	if(!email)
		return res.redirect('/');
	db.excuteDB(db.readInfo,email);
	res.redirect('/');
});

router.patch('/updatePassword', (req, res)=>{
	const email = jwt.checkJwt(req.signedCookies.token);
	if(!email)
		return res.redirect('/');
		
	const newPw = req.body;
	db.excuteDB(db.updatePw, email, newPw);
	res.redirect('/');
});

router.delete('/deleteUser', (req, res)=>{
	console.log('delete')
	const email = jwt.checkJwt(req.signedCookies.token);
	if(!email)
		return res.redirect('/');
	res.clearCookie('token', {
		httpOnly: true,
		signed: true,
		path: '/'
	});
	db.excuteDB(db.delete, email);
	res.redirect('/');
});


router.get('/sendConfirmCode', (req, res)=>{
	try {
		const email = req.query.email;
		const codeKey = mailer.createRandomKey(6);
		const mailOptions = {
			from: process.env.MAIL_ID,
			to: email,
			subject: '인증키를 입력해주세요 - fake stock',
			html: `다음 인증키를 입력해주세요.</br><h2>${codeKey}</h2>`
		}
		req.session.codeKey = codeKey;
		mailer.sendMail(mailOptions,(error,info)=>{
			if(error){
				console.error(error);
			}
			else {
				res.status(200).json({status:'success'});
			}
		});
	}
	catch(err) {
		console.error(err);
		res.status(400).json({status:'failed'});
	}
});

router.post('/checkConfirmCode', (req, res)=>{
	if(req.session.codeKey === req.body.codeKey) {
		res.status(200).json({status:'success'});
	}
	else {
		res.status(400).json({status:'failed'});
	}
});

module.exports = router;