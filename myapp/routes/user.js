var express = require('express');
var router = express.Router();

var models = require('../models');
var getToken = require('../jwt/getToken');
var verifyToken = require('../jwt/verifyToken');

// index 페이지(테스트용)
router.get('/', async function(req, res, next) {
  const result = await models.sequelize.query('select * from `user` limit 1', {
    type: models.sequelize.QueryTypes.SELECT,
  });
  res.end(result[0].usr_id);
});

// GET 로컬 로그인 상태 확인
router.get('/check/:id', async function(req, res, next) {
  const id = req.params.id;
  const token = req.cookies.access_token;
  try {
    const decoded = await verifyToken(token);
    if (id === decoded) {
      res.json({
        success: 'true',
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
    if (Object.keys(results).length) {
      const token = await getToken({ usr_id: results[0].usr_id });
      res.cookie('access_token', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        httpOnly: true,
      });
      res.json(200, {
        success: true,
        userId: results[0].usr_id,
      });
    } else {
      res.json(400, {
        success: false,
      });
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
});

// POST 로그아웃
router.post('/logout', function(req, res, next) {
  res.cookie('access_token', null, {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(204).end();
});

module.exports = router;
