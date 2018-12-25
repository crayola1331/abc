var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

  models.sequelize.query("select * from `gb_team`").spread((results, metadata) => {
    console.log(results);
    res.json(results);
  });
});

router.post('/enroll', function(req, res, next) {

  var result = {};
  
  if(Object.keys(req.body).length == 5) {
    
    models.sequelize.query(`insert into \`gb_team\` values (0,'${req.body.tm_sbj_nm}','${req.body.tm_prof_nm}','${req.body.tm_nm}','${req.body.tm_exp_date}','${req.body.tm_mem_idx}')`)
    .spread((results, metadata) => {
      result.success = true;
      res.json(result);
    });

  }else {
    result.success = false;
    res.json(result);
  }
});

module.exports = router;