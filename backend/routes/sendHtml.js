const express = require('express');
const path = require('path')
const router = express.Router()
const jwt = require('./jwt')

router.get('/', (req, res)=>{
	console.log(process.env.SECRET_KEY)
	const token = jwt.checkJwt(req.signedCookies.token);
	if(!token){
		res.redirect('/signin');
	}
	else {
		res.send('성공')
	}
})

router.get('/signin', (req, res)=>{
	res.sendFile(path.join(__dirname,'../public/login','index.html'))
})

router.get('/signup', (req, res)=>{
	res.sendFile(path.join(__dirname,'../public/signup','signup.html'))
})

router.get('/findpass', (req, res)=>{
	res.sendFile(path.join(__dirname,'../public/findPass','findPass.html'))
})

module.exports = router;