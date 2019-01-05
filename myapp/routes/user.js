var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  models.sequelize.query("select * from `user` limit 1", {
    type: models.sequelize.QueryTypes.SELECT
  }).then((results, metadata) => {
    console.log(results);
    res.json(results);
  });
});

router.post('/', function(req, res, next) {

  models.sequelize.query(`select * from \`user\` where usr_id = '${req.body.id}' AND usr_pwd = '${req.body.pwd}'`,  {
      type: models.sequelize.QueryTypes.SELECT
  }).then((results, metadata) => {
    
    if(Object.keys(results).length) {
      res.status(200);
    } else {
      console.log("33333333");
      res.status(300);
    }
      
      res.end();
      console.log('results',results);
  });
});

// router.post('/', function(req, res, next) {

//   models.sequelize.query(`insert into \`user\`values(0,${req.body.id}, ${req.body.pwd}, ${req.body.nm}`,  {
//       type: models.sequelize.QueryTypes.INSERT
//   }).then((results, metadata) => {
//       res.end();
//   });
// });

module.exports = router;