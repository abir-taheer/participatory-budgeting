const router = require("express").Router();
const {Votes, Vote_Data} = require("./../../../config/database");

router.post("/", async (req, res) => {
	let selections = req.body.selections;
	if(new Date("Fri, 17 Jan 2020 22:00:11 GMT") < new Date())
		return res.json({
			success: false,
			error: "The period for voting is over"
		});

	if(! req.session.signed_in)
		return res.json({
			success: false,
			error: "You need to be signed in to vote!"
		});

	let find_vote = await Votes.findOne({where: {email: req.session.email || ""}});
	if(find_vote)
		return res.json({
			success: false,
			error: "You have already voted!"
		});

	if(! Array.isArray(selections))
		return res.json({
			success: false,
			error: "Invalid format of votes received."
		});

	let vote_record = await Votes.create({email: req.session.email});

	for(let x = 0 ; x < selections.length; x++){
		if(selections[x] < 6 && selections[x] >= 0)
			await Vote_Data.create({
				voteId: vote_record.id,
				choice_number: x,
				data: selections[x]
			});
	}

	return res.json({
		success: true
	})

});

module.exports = router;
