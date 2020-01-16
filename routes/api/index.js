const router = require("express").Router();

router.use("/state", require("./state"));
router.use("/election", require("./election"));

module.exports = router;
