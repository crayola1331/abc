var express = require('express');
var router = express.Router();
var models = require('../models');

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

// POST 로그아웃
router.post('/logout', function(req, res) {
  req.session.destroy();
  res.clearCookie('sid');
  res.status(204).end();
});

module.exports = router;
