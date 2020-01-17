const router = require("express").Router();

router.use("/hasVoted", require("./hasVoted"));
router.use("/vote", require("./vote"));
router.use("/results", require("./results"));

module.exports = router;
