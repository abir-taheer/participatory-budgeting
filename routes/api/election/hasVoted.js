const router = require("express").Router();
const {Votes} = require("./../../../config/database");

router.get("/", async (req, res) => {
	if(! req.session.signed_in)
		return res.json({
			success: false,
			error: "You need to be signed in to check for whether or not you have voted."
		});

	let find_vote = await Votes.findOne({where: {email: req.session.email || ""}});
	return res.json({
		success: true,
		voted: Boolean(find_vote)
	});
});

module.exports = router;
