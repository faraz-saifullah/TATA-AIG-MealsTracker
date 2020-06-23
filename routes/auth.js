let express = require("express");
let router = express.Router();
let User = require("../core/userController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/", async function (req, res, next) {
  let result = await new User().createUser(req);
  return new APIResponseHandler().handleAuthentication(res, result);
});

module.exports = router;
