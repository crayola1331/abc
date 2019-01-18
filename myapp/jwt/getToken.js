var jwt = require('jsonwebtoken');
// 토큰 인코딩
const getToken = function(payload) {
  return new Promise(function(resolve, reject) {
    // { expiresIn: '7d' }, 옵션 삭제
    jwt.sign(payload, 'secretkey', function(err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
module.exports = getToken;
