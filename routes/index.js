const express = require('express');
const app = express();
app.use(express.static('public'));
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const {
	check, validationResult
} = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
	file: path.join(__dirname, '../users.htpasswd'),
});
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
// const registrationSchema = new Schema({
//     username: String,
//     password: String
// });
// registrationSchema.plugin(passportLocalMongoose);
// const UserDetails = mongoose.model('registrations', registrationSchema);
// passport.use(UserDetails.createStrategy());
// passport.serializeUser(UserDetails.serializeUser());
// passport.deserializeUser(UserDetails.deserializeUser());
const registrationSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
	username: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		trim: true,
	},
});
registrationSchema.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('registrations', registrationSchema);
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());
// module.exports = mongoose.model('Registration', registrationSchema);
const connectEnsureLogin = require('connect-ensure-login');
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err) {
			console.log("1");
			return next(err);
		}
		if(!user) {
			console.log("2");
			return res.redirect('/login?info=' + info);
		}
		req.logIn(user, function(err) {
			if(err) {
				console.log("3");
				return next(err);
			}
			console.log("4");
			return res.redirect('/username');
		});
	})(req, res, next);
});
router.get('/', (req, res) => {
	//res.send('It works!');
	res.render('index', {
		title: 'Home'
	});
});
router.get('/contact', (req, res) => {
	//res.send('It works!');
	res.render('contact', {
		title: 'Contact Us'
	});
});
router.get('/login', (req, res) => {
	//res.send('It works!');
	res.render('login', {
		title: 'login'
	});
});
router.get('/register', (req, res) => {
	//res.send('It works!');
	res.render('register', {
		title: 'Registration form'
	});
});
router.get('/logged', (req, res) => {
	//res.send('It works!');
	res.render('logged', {
		title: 'Registration form'
	});
});
router.get('/logout', (req, res) => {
	//res.send('It works!');
	res.render('logout', {
		title: 'Registration form'
	});
});
router.get('/registrations', basic.check((req, res) => {
	Registration.find().then((registrations) => {
		res.render('registrations', {
			title: 'Listing registrations',
			registrations
		});
	}).catch(() => {
		res.send('Sorry! Something went wrong.');
	});
	router.get('/login', (req, res) => res.sendFile('login', {
		root: __dirname
	}));
	router.get('/username', connectEnsureLogin.ensureLoggedIn(), (req, res) => res.sendFile('username', {
		root: __dirname
	}));
	router.get('/user', connectEnsureLogin.ensureLoggedIn(), (req, res) => res.send({
		user: req.user
	}));
	router.get('/logout', (req, res) => {
		// req.logout(),
		res.sendFile('logout', {
			root: __dirname
		})
	});
}));
router.post('/', [
	check('name').isLength({
		min: 1
	}).withMessage('Please enter a name'),
	check('email').isLength({
		min: 1
	}).withMessage('Please enter an email'),
	check('username').isLength({
		min: 1
	}).withMessage('Please enter a username'),
	check('password').isLength({
		min: 1
	}).withMessage('Please enter a password'),
], async(req, res) => {
	//console.log(req.body);
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		const registration = new Registration(req.body);
		//generate salt to hash password
		const salt = await bcrypt.genSalt(10);
		//set user to hashed password
		registration.password = await bcrypt.hash(registration.password, salt);
		registration.save().then(() => {
			res.render('thankyou');
		}).catch((err) => {
			console.log(err);
			res.send('Sorry! Something went wrong.');
		});
	} else {
		res.render('index', {
			title: 'Registration form',
			errors: errors.array(),
			data: req.body,
		});
	}
});
module.exports = router;