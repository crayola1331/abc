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

  models.sequelize.query("select * from `gb_std` limit 10").spread((results, metadata) => {
    result = results[0];

    // res.json(results);
    res.json(results);
    
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

  var result = {};
  var isRight = false;

  models.std.findAll({
    where : {
      std_num : req.body.std_num,
      std_pwd : req.body.std_pwd
    }
  }).spread(results => {
    if(results) {
      result = results.dataValues;
      result.success = true;
      delete result.std_pwd;

      res.json(result);
    } else {
      result.success = false;

      res.json(result);
    }
    

  }).catch(function (err) {
    console.log(err);
  });
});
module.exports = router;