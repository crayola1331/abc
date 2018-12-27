var express = require('express');
var router = express.Router();

var teamRouter = require('./team');
var stdRouter = require('./std');
var boardRouter = require('./board');
var smokingRouter = require('./smoking');

router.use("/team",teamRouter);
router.use("/std",stdRouter);
router.use("/board",boardRouter);
router.use("/smoking",smokingRouter);

module.exports = router;