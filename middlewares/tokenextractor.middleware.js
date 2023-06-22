const jwt = require("jsonwebtoken");
const { config } = require("../config/default.config");

exports.extractJwtFromCookie = (req, res, next) => {
  const token = req.signedCookies.auth;
  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        const err = new Error("not found");
        err.status = 404;
        next(err);
      } else {
        res.locals.encodedToken = token;
        res.locals.decodedToken = decoded;
        next();
      }
    });
  } else {
    const err = new Error("UNAUTHORIZED_ACCESS");
    err.status = 401;
    next(err);
  }
};


