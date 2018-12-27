var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  models.sequelize.query("select * from `gb_board` limit 1", {
    type: models.sequelize.QueryTypes.SELECT
  }).then((results, metadata) => {
    console.log(results);
    res.json(results);
  });
});


module.exports = router;