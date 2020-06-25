const express = require("express");
const router = express.Router();
const Admin = require("../core/adminController");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");
const AuthMiddleware = require("../core/authMiddleware");

router.get(
  "/admin-requests",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res) {
    let result = await new Admin().getAllAdminRequests(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.post(
  "/admin-requests",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res) {
    let result = await new Admin().approveAdminRequests(req);
    return new APIResponseHandler().handle(res, result);
  }
);

module.exports = router;
