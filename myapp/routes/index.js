var express = require('express');
var router = express.Router();

var teamRouter = require('./team');
var stdRouter = require('./std');
var boardRouter = require('./board');

router.use("/team",teamRouter);
router.use("/std",stdRouter);
router.use("/board",boardRouter);

module.exports = router;