let express = require('express');
let router = express.Router();
let User = require('../core/userController');
let APIResponseHandler = require('../utils/APIResponseHandler/APIResponseHandler')

router.get('/', async function(req, res, next) {
  let result = await new User().getAllUsers(req);
  return new APIResponseHandler().handle(res, result);
});

router.get('/:userId', async function(req, res, next) {
  let result = await new User().getUserDetaiils(req);
  return new APIResponseHandler().handle(res, result);
});

router.post('/', async function(req, res, next) {
  let result = await new User().createUser(req);
  return new APIResponseHandler().handle(res, result);
});

router.put('/:userId', async function(req, res, next) {
  let result = await new User().updateUserDetails(req);
  return new APIResponseHandler().handle(res, result);
});

router.delete('/:userId', async function(req, res, next) {
  let result = await new User().deactivateUserAccount(req);
  return new APIResponseHandler().handle(res, result);
});

router.get('/:userId/meals', async function(req, res, next) {
  let result = await new User().getUserMeals(req);
  return new APIResponseHandler().handle(res, result);
});

router.post('/:userId/meals', async function(req, res, next) {
  let result = await new User().addNewMeal(req);
  return new APIResponseHandler().handle(res, result);
});

module.exports = router;