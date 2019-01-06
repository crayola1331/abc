var jwt = require('jsonwebtoken');
const getToken = function(payload) {
    return new Promise(function (resolve, reject) {
        jwt.sign(payload, 'secretkey', { expiresIn: '7d' }, function(err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    })
}
module.exports = getToken;