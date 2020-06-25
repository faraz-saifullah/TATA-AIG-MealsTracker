let express = require("express");
let router = express.Router();
let User = require("../core/userController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");
const AuthMiddleware = require("../core/authMiddleware");

router.get("/", new AuthMiddleware().ensureAuthentication, async function (
  req,
  res,
  next
) {
  let result = await new User().getAllUsers(req);
  return new APIResponseHandler().handle(res, result);
});

router.get(
  "/:userId",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().getUserDetaiils(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.put(
  "/:userId",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().updateUserDetails(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.delete(
  "/:userId",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().deactivateUserAccount(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.get(
  "/:userId/meals",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().getUserMeals(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.post(
  "/:userId/meals",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().addNewMeal(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.put(
  "/:userId/meals/:mealId",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().updateMeal(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.delete(
  "/:userId/meals/:mealId",
  new AuthMiddleware().ensureAuthentication,
  async function (req, res, next) {
    let result = await new User().deleteMeal(req);
    return new APIResponseHandler().handle(res, result);
  }
);

module.exports = router;
