const router = require("express").Router();

router.use("/hasVoted", require("./hasVoted"));
router.use("/vote", require("./vote"));

module.exports = router;
