var express = require('express');
var router = express.Router();

var models = require('../models');
var getToken = require('../jwt/getToken');
/* GET home page. */
router.get('/', function(req, res, next) {

  models.sequelize.query("select * from `user` limit 1", {
    type: models.sequelize.QueryTypes.SELECT
  }).then((results, metadata) => {
    console.log(results);
    res.json(results);
  });
});

router.get('/check', function(req, res, next) {
  const a = req.cookie.access_token;
  console.log('a',a);
  res.end('a');
});

router.post('/', function(req, res, next) {

  models.sequelize.query(`select * from \`user\` where usr_id = '${req.body.id}' AND usr_pwd = '${req.body.pwd}'`,  {
      type: models.sequelize.QueryTypes.SELECT
  }).then((results, metadata) => {
    
    if(Object.keys(results).length) {
      // req.session.crayola = 'imin';
      // 쿠키 구워서 클라이언트한테 줌.
      try {
        getToken({foo:'bar'}).then(function (data) {
          // res.setHeader("Content-Type", "text/html");
          // res.statusCode = 200;
          res.cookie('access_token', data, {
            maxAge: 10000
          });
          res.send('sdfsdfds');
          // res.json(200,{
          //   success: true
          // })
        }).catch(function(err) {
          console.log("err", err);
          res.send();
        });
      } catch (error) {
        console.log('error',error);
      }
    } else {
      // console.log("33333333");
      // res.status(300);
      console.log("33333333");
      res.json(300,{
        success: false
      })
    }
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