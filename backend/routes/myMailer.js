const nodemailer = require('nodemailer');

function sendMail(mailOptions,callback) {
    const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASS,
		}
	});
    transporter.sendMail(mailOptions, (err,info)=>{
		transporter.close();
		callback(err,info);
	});
}
function createRandomKey(keyLength) {
	const keySet="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let keyCode = "";
	for(let i=0;i<keyLength;i++) {
		const randomIndex = (Math.floor(Math.random()*(62)));
		keyCode += keySet[randomIndex];
	}
	return keyCode;
}
module.exports = {
	sendMail,
	createRandomKey
}