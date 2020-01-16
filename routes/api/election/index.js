const router = require("express").Router();

router.use("/hasVoted", require("./hasVoted"));

module.exports = router;
