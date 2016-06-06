/*###########################*/
//get the user schema
var User = require('../models/user');
// get the story schema
var Story = require('../models/story');
// get the config file to connect to db
var config = require('../../config');
// get the secrete key to lock and unlock enryption
var secretKey = config.secretKey;
// json web token to be used for token bases authentication
var jsonwebtoken = require('jsonwebtoken');
/* ########################### */

// create token function
function createToken(user) {
	var token = jsonwebtoken.sign({
		id : user._id,
		name : user.name,
		username : user.username
	}, secretKey, {
	/**
	 * when using postman do The server couldn't send a response: Ensure that
	 * the backend is working properly SSL connections are being blocked: Fix
	 * this by importing SSL certificates in Chrome Cookies not being sent: Use
	 * the Postman Interceptor extension Request timeout: Change request timeout
	 * in Settings > General else just comment expiretesInMinute when testing
	 * with postman
	 */
	// expirtesInMinute:1440
	});

	return token;

}
// web services api
module.exports = function(app, express, io) {
	console.log(io);
	var api = express.Router();
	// sighn up service
	api.post('/signup', function(req, res) {

		console.log("user::" + req.body.name);
		console.log("username::" + req.body.username);
		console.log("password::" + req.body.password);

		var user = new User({
			name : req.body.name,
			username : req.body.username,
			password : req.body.password
		});
		var token = createToken(user);

		user.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.json({
				success : true,
				message : 'user has been created!',
				token : token

			});

		});
	}); // end of sighn up service

	// get users service
	api.get("/users", function(req, res) {
		User.find({}, function(err, users) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(users);
		});

	});// end of get users service

	// login service
	api.post('/login', function(req, res) {
		User.findOne({
			username : req.body.username
		}).select('name username password').exec(function(err, user) {

			if (err)
				throw err;

			if (!user) {
				res.send({
					message : 'user does not exist'
				});
			} else if (user) {

				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword) {
					res.send({
						message : 'Invalid password'
					});
				} else {
					// create token

					var token = createToken(user);
					console.log(user.name)
					res.send({
						user : user,
						success : true,
						message : "Successfully login!",
						token : token

					});
				}
			}
		});
	});// end of login sevice

	// access middleware
	api.use(function(req, res, next) {

		console.log("Somebody  just come to our app!");
		var token = req.body.token || req.param('token')
				|| req.headers['x-access-token'];
		// check if toke exist
		if (token) {
			jsonwebtoken.verify(token, secretKey, function(err, decoded) {
				if (err) {
					res.status(403).send({
						success : false,
						message : "Failed to authenticate"
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).send({
				success : false,
				message : "No Token Provided"
			});
		}

	});

	// home rout service method chaining
	api.route('/').post(function(req, res) {

		var story = new Story({

			creator : req.decoded.id,
			content : req.body.content

		});

		story.save(function(err, newStory) {

			if (err) {
				res.send(err);
				return;
			}

			io.emit('story', newStory);

			res.json({
				message : 'New Story created!'
			});

		});
	}).get(function(req, res) {
		Story.find({
			creator : req.decoded.id
		}, function(err, stories) {
			if (err) {
				res.send(err);
				return;
			}
			res.json(stories);
		});
	});

	api.get('/me', function(req, res) {
		res.json(req.decoded);
	});
	return api;

};
/* ########################### */

