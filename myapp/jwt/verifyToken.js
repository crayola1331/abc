var jwt = require('jsonwebtoken');
// 토큰 디코딩
const verifyToken = function(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded.usr_id);
    });
  });
};

module.exports = verifyToken;
