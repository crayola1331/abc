var express = require('express');
var encodeurl = require('encodeurl');
var axios = require('axios');
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
    if (id === decoded.usr_id) {
      res.json(200, { userId: decoded.usr_id });
    }
  } catch (e) {
    e.status = 403;
    next(e);
  }
});

// POST 로컬 로그인
router.post('/', async function(req, res, next) {
  try {
    const results = await models.user.findAll({
      where: {
        usr_id: req.body.id,
        usr_pwd: req.body.pwd,
      },
    });

    if (!results.length) {
      res.status(403).end();
      return;
    }
    const token = await getToken({
      usr_id: results[0].usr_id,
    });
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      httpOnly: true,
    });
    res.json(200, {
      userId: results[0].usr_id,
    });
  } catch (e) {
    e.status = 403;
    next(e);
  }
});

// POST NAVER 콜백
router.get('/callbackNaver', async function(req, res, next) {
  const { NAVER_ID, NAVER_SECRET } = process.env;
  // 동의완료 콜백 code, state
  const { code, state } = req.query;
  const redirectURI = encodeurl('http://121.132.88.200/api/user/callbackNaver');
  // 토큰 발급 tg 요청 url (code, state, redirectURI)
  const tg_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_ID}&client_secret=${NAVER_SECRET}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;
  // 네이버 프로필 조회 nfs
  const nfs_api_url = 'https://openapi.naver.com/v1/nid/me';
  try {
    // 토큰 요청
    const tg_result = await axios({
      url: tg_api_url,
      method: 'get',
      headers: {
        'X-Naver-Client-Id': NAVER_ID,
        'X-Naver-Client-Secret': NAVER_SECRET,
      },
    });
    if (tg_result.status == 200) {
      const { access_token, refresh_token } = tg_result.data;
      const bearer_token = 'Bearer ' + access_token;
      // 프로필 요청
      const nfs_result = await axios({
        url: nfs_api_url,
        method: 'get',
        headers: {
          Authorization: bearer_token,
        },
      });
      if (nfs_result.status == 200) {
        // 기존 회원 여부
        const results = await models.user.findAll({
          where: {
            provider_id: nfs_result.data.response.id,
          },
        });

        if (results.length) {
          // 기존 회원 변경정보 업데이트
          await models.user.update(
            {
              usr_nm: nfs_result.data.response.name,
              usr_email: nfs_result.data.response.email,
              provider_usr_id: nfs_result.data.response.email,
              refresh_token: refresh_token,
            },
            { where: { provider_id: nfs_result.data.response.id } },
          );
          const token = await getToken({
            usr_id: results[0].provider_usr_id,
          });

          res.cookie('access_token', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true,
          });
          res.location('http://localhost:3000/gallery');
          res.status(301).end();
        } else {
          // 신규 회원 정보 인서트
          await models.sequelize.query(
            `INSERT INTO \`user\` values (null,'0','0','${
              nfs_result.data.response.name
            }','${nfs_result.data.response.email}','${
              nfs_result.data.response.id
            }','${nfs_result.data.response.email}','naver','${refresh_token}')`,
            {
              type: models.sequelize.QueryTypes.INSERT,
            },
          );
          const token = await getToken({
            usr_id: nfs_result.data.response.provider_usr_id,
          });
          console.log('tokentokentoken@@@@@@', token);
          res.cookie('access_token', token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true,
          });
          res.location('http://localhost:3000/gallery');
          res.status(301).end();
        }
      } else {
        res.status(nfs_result.statusCode).end();
      }
    } else {
      res.status(tg_result.statusCode).end();
    }
  } catch (e) {
    // console.log('error >>>>', e);
    e.status = 500;
    next(e);
  }
});

// GET access_token payload GET
router.get('/getPayload', async function(req, res, next) {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      res.status(403).end();
      return;
    }
    const decoded = await verifyToken(token);
    res.json(200, { userId: decoded.usr_id });
  } catch (e) {
    e.status = 403;
    next(e);
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
