let express = require("express");
let router = express.Router();
let User = require("../core/userController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/signup", async function (req, res, next) {
  let result = await new User().createUser(req);
  return new APIResponseHandler().handleAuthentication(res, result);
});

router.post("/login", async function (req, res, next) {
  let result = await new User().getUserByEmail(req);
  const secure = req.app.get("env") === "development";
  req.session.userId = result.data.user_id;
  req.session.type = result.data.type;
  res.cookie("user_id", result.data.user_id, {
    httpOnly: true,
    secure: secure,
    signed: true,
  });
  return new APIResponseHandler().handleAuthentication(res, result);
});

router.post("/logout", async function (req, res, next) {
  req.session.destroy();
  res.clearCookie("user_id");
  const result = {
    success: true,
    status: 200,
    message: "Successfully logged out.",
  };
  return new APIResponseHandler().handleAuthentication(res, result);
});

module.exports = router;
