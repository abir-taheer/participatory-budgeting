const router = require("express").Router();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

async function validateToken(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	});

	return ticket.getPayload();
}

router.post("/", (req, res) => {
	const idToken = req.body.idToken;
	const isVotingStation = Boolean(req.cookies.isVotingStation);

	validateToken(idToken)
		.then(payload => {
			if(req.session.signed_in)
				return "You are already signed in.";

			if(! payload.email_verified)
				return "That email is not verified and cannot be used for sign in.";

			if( payload.hd !== "stuy.edu" )
				return "That email address does not belong to @stuy.edu and cannot be used for sign in.";

			if( payload.azp !== process.env.REACT_APP_GOOGLE_CLIENT_ID || payload.aud !== process.env.REACT_APP_GOOGLE_CLIENT_ID )
				return "That login token was not generated for this app and cannot be used.";

			let maxAge = isVotingStation ? 1000 * 60 * 5 : 1000 * 86400 * 30;

			req.session.signed_in = true;
			req.session.email = payload.email;
			req.session.name = payload.name;
			req.session.cookie.expires = new Date(new Date().getTime() + maxAge);

			res.json({success: true});
		})
		.then((known_error = null) => {
			// If known_error is set that means we intentionally didn't trust the login attempt
			if(known_error !== null)
				res.json({success: false, error: known_error});
		})
		.catch(er => {
			console.log(er);
			//Being here likely means the token was invalid
			res.json({success: false, error: "The login token provided was invalid."});
		});
});

module.exports = router;
