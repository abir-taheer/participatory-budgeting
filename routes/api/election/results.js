const router = require("express").Router();
const {Vote_Data} = require("./../../../config/database");

const getMin = (votes_counted) => {
	let min_val = votes_counted[Object.keys(votes_counted)[0]];
	let hasMin = [];

	Object.keys(votes_counted).forEach((id) => {
		if(votes_counted[id] < min_val){
			min_val = votes_counted[id];
			hasMin = [];
		}

		if(votes_counted[id] === min_val)
			hasMin.push(id);
	});

	return hasMin;
};



const getVoteCount = (votes, eliminated) => {
	let votes_counted = 0;
	let count = {};
	votes.forEach(vote => {
		for(let x = 0 ; x < vote.length; x++){
			if(! eliminated.includes(vote[x])){
				if(! count[vote[x]])
					count[vote[x]] = 0;
				count[vote[x]]++;
				votes_counted++;
				break;
			}
		}
	});

	return {
		count,
		votes_counted
	}
};

const getWinner = (votes_count, total_votes) => {
	for( let id in votes_count ){
		if( votes_count[id] / total_votes > 0.5 )
			return id;
	}
	return null;
};



router.get("/", async (req, res) => {
	if(new Date("Fri, 17 Jan 2020 19:50:05 GMT") > new Date()){
		// the election isn't over yet and only calculate the results if this person has sufficient permissions
		if(! req.session.signed_in )
			return res.json({
				success: false,
				error: "You need to be signed in to view results before the election is over."
			});

		if(! JSON.parse(process.env.ADMINS).includes(req.session.email))
			return res.json({
				success: false,
				error: "You don't have permission to view the results at this time."
			})
	}

	let votes = [];

	let results = await Vote_Data.findAll();
	results.forEach(data => {
		if(! votes[data.voteId])
			votes[data.voteId] = [];

		votes[data.voteId][data.choice_number] = data.data;
	});

	votes = votes.filter(i => Boolean(i));

	let rounds = [];
	let eliminated = [];

	let winner = null;
	let r = 0;
	while(! winner){
		let res = getVoteCount(votes, eliminated);
		rounds[r] = res;
		winner = getWinner(res.count, res.votes_counted);
		if(! winner){
			let lowest = getMin(res.count);
			eliminated = [...eliminated, ...lowest]
		}
		r++;
	}

	res.json({
		success:true,
		rounds,
		winner
	});
});

module.exports = router;
