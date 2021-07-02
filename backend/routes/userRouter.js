const express = require('express');
const path = require('path');
const router = express.Router();
const jwt = require('./jwt');
const db = require('./DBconn')

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
	
});

router.post('/checkConfirmCode', (req, res)=>{

});

module.exports = router;