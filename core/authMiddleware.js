const HttpResponseHandler = require("../utils/web/HTTPResponseHandler");
const HttpResponseCodes = require("../utils/web/HttpResponseCodes");

class AuthMiddleware {
  ensureAuthentication(req, res, next) {
    let userId = Number(req.params.userId || req.body.userId);
    if (req.session.userId && req.session.type === "admin") {
      next();
    } else if (req.session.userId && req.session.userId === userId) {
      next();
    } else {
      const responseCode = new HttpResponseCodes().UNAUTHORIZED();
      const response = new HttpResponseHandler().handleFailed(
        "Un-Authorised access",
        "Unauthorised",
        responseCode
      );
      res.status(responseCode).json(response);
    }
  }
}

module.exports = AuthMiddleware;
