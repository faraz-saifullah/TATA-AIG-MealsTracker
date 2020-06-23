const express = require("express");
const router = express.Router();
const Admin = require("../core/adminController");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.get("/admin-requests", async function (req, res) {
  let result = await new Admin().getAllAdminRequests(req);
  return new APIResponseHandler().handle(res, result);
});

router.post("/admin-requests", async function (req, res) {
  let result = await new Admin().approveAdminRequests(req);
  return new APIResponseHandler().handle(res, result);
});

module.exports = router;
