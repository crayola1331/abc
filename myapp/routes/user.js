var express = require('express');
var router = express.Router();
var models = require('../models');
var encodeurl = require('encodeurl');

const makeRequest = async () => 'done:))';

// index 페이지(테스트용)
router.get('/', async function(req, res, next) {
  const a = await makeRequest();
  console.log('result a:', a);
  res.end('hello');
  // const result = await models.sequelize.query('select * from `user` limit 1', {
  //   type: models.sequelize.QueryTypes.SELECT,
  // });
  // res.end(result[0].usr_id);
});

// GET 로컬 로그인 상태 확인
router.get('/check/:id', async function(req, res, next) {
  const id = req.params.id;
  const usrId = req.session.usrId;
  try {
    if (id === usrId) {
      res.json(200, {
        userId: usrId,
      });
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
});

// POST 로컬 로그인
router.post('/', async function(req, res, next) {
  try {
    const results = await models.sequelize.query(
      `select * from \`user\` where usr_id = '${req.body.id}' AND usr_pwd = '${
        req.body.pwd
      }'`,
      {
        type: models.sequelize.QueryTypes.SELECT,
      },
    );
    if (!results.length) {
      res.status(403).end();
      return;
    }
    console.log('req.session 1', req.session);
    req.session.usrId = results[0].usr_id;
    console.log('req.session 2', req.session);
    res.json(200, {
      userId: results[0].usr_id,
    });
  } catch (error) {
    error.status = 403;
    next(error);
  }
});

// POST NAVER 로그인
router.post('/naver', async function(req, res, next) {
  try {
    if (!results.length) {
      res.status(403).end();
      return;
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
});

// app.get('/naverlogin', function (req, res) {
//   api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
//    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
//  });

router.get('/callbackNaver', async function(req, res, next) {
  const client_id = 'nMBOrJIAUWPC_o2Sv_wQ';
  const client_secret = 'YHisdde_5J';
  const redirectURI = encodeurl('http://localhost/api/user/callbackNaver');
  const code = req.query.code;
  const state = req.query.state;
  try {
    const api_url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret +
      '&redirect_uri=' +
      redirectURI +
      '&code=' +
      code +
      '&state=' +
      state;

    var request = require('request');
    var options = {
      url: api_url,
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    };
    request.get(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
        // res.redirect('http://localhost:3000/gallery');
        res.end(body); // 쿠키세팅

        //request => axios로
        // 쿠키를 이외의 해결책이있는지?
        // 쿠키가 아니라 DB로 해야되나?
        // 프론트에서 토큰으로 api호출해서 닉네임,이름 얻어오기.
        res.send('<script>window.close();</script>');
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  } catch (error) {
    error.status = 403;
    next(error);
  }
});

// POST 로그아웃
router.post('/logout', function(req, res) {
  req.session.destroy();
  res.clearCookie('sid');
  res.status(204).end();
});

module.exports = router;
