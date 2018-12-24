var express = require('express');
var router = express.Router();
var app = express();

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

  models.sequelize.query("select * from `gb_std` limit 1").spread((results, metadata) => {
    console.log(results);
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

const isRight = false;
models.sequelize.query("select * from `gb_std` limit 1").spread((results, metadata) => {
  console.log(results);
  res.json(results);
});
});
module.exports = router;