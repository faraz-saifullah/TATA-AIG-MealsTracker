let express = require("express");
let router = express.Router();
let User = require("../core/userController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");
let AuthController = require("../core/authController");
let authController = new AuthController();

router.post("/signup", async function (req, res, next) {
  let result = await new User().createUser(req);
  return new APIResponseHandler().handleAuthentication(res, result);
});

router.post("/login", async function (req, res, next) {
  let result = await new User().getUserByEmail(req);
  authController.startSession(req, result);
  authController.setCookies(req, res, result);
  return new APIResponseHandler().handleAuthentication(res, result);
});

router.post("/logout", async function (req, res, next) {
  authController.destroySession(req);
  authController.clearCookies(res);
  const result = {
    success: true,
    status: 200,
    message: "Successfully logged out.",
  };
  return new APIResponseHandler().handleAuthentication(res, result);
});

module.exports = router;
