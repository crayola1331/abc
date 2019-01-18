var verifyToken = require('../jwt/verifyToken');
var getToken = require('../jwt/getToken');
// 토큰기간 갱신
exports.jwtMiddleware = async function(req, res, next) {
  const token = req.cookies.access_token;
  console.log('console.log(!token);', token);
  console.log(!token);
  if (!token) return next();
  try {
    const decoded = await verifyToken(token);
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const refreshToken = await getToken(decoded);
      res.cookie('access_token', refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        httpOnly: true,
      });
    }
    return next();
  } catch (error) {
    error.status = 403;
    return next(error);
  }
};
