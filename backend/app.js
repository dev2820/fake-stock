const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(`${process.env.COOKIE_KEY}`));
require('dotenv').config();

// view engine setup -- 나중에 바뀜?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Router
const userRouter = require('.backend/routes/userRouter');
const pageRouter = require('.backend/routes/sendHtml');
app.use('/', pageRouter);
app.use('/user', userRouter);
// 404 error
app.use((req, res, next) => {
	res.status(404).send('Not Found');
});
// error catch
app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
})

// server
app.set('port', 3000);
app.listen(app.get('port'), ()=>{
	console.log(app.get('port'))
})