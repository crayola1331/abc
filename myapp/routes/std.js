var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log('models', models);
models.sequelize.sync()
  .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  })
  .catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

  var result = {};

  models.sequelize.query("select * from `gb_std` limit 2").spread((results, metadata) => {
    if(results[0]["std_num"] == "14011149") {
      console.log("#######");
    }
    result = results[0];

    console.log(results[0]["std_num"]);
    // res.json(results);
    res.json(result);
    
  });
});

router.post('/login', function(req, res, next) {
  // console.log('models', models);
  models.sequelize.sync()
  .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
  })
  .catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

  const isRight = false;

  models.sequelize.query("select * from `gb_std`").spread((results, metadata) => {
    // console.log(results);
    // res.json(results);

    if(req.body.std_pwd == results[0]["std_pwd"]) {
      console.log("33333333333333333");
      res.json(results[0]);
    }
  });
});
module.exports = router;