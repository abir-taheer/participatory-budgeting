const router = require("express").Router();

router.get("/", (req, res) => {
	res.json({
		signed_in: req.session.signed_in,
		name: req.session.name || "",
		email: req.session.email || ""
	});
});

module.exports = router;
