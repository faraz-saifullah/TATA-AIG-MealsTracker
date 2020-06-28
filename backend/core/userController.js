const UsersDbConnector = require("../dbConnector/users");
const MealsDbConnector = require("../dbConnector/meals");
const DailyGoalsDbConnector = require("../dbConnector/dailyGoals");
const AdminRequestsDbConnector = require("../dbConnector/adminRequests");

class User {
  constructor() {
    this.usersDbConnector = new UsersDbConnector();
    this.mealsDbConnector = new MealsDbConnector();
    this.dailyGoalsDbConnector = new DailyGoalsDbConnector();
    this.adminRequestsDbConnector = new AdminRequestsDbConnector();
  }

  async getAllUsers(req) {
    try {
      return await this.usersDbConnector.getAllUsers();
    } catch (err) {
      throw err;
    }
  }

  async getUserDetaiils(req) {
    try {
      return await this.usersDbConnector.getUserDetails(req.params);
    } catch (err) {
      throw err;
    }
  }

  async createUser(req) {
    try {
      if (req.body.type === "admin") {
        return await this.adminRequestsDbConnector.addNewRequest(req.body);
      }
      let insertResult = await this.usersDbConnector.createUser(req.body);
      let userInfo = insertResult.data[0];
      if (userInfo.type === "regular") {
        this.dailyGoalsDbConnector.addToDailyGoals(userInfo);
      }
      return insertResult;
    } catch (err) {
      throw err;
    }
  }

  async updateUserDetails(req) {
    try {
      let existingDetails = await this.usersDbConnector.getUserDetails(
        req.params
      );
      let updateResult = await this.usersDbConnector.updateUserDetails(
        req.params,
        req.body,
        existingDetails.data[0]
      );
      let userInfo = updateResult.data[0];
      if (userInfo.type === "regular" && req.body.dailyCaloryLimit) {
        this.dailyGoalsDbConnector.addToDailyGoals(userInfo);
      }
      return updateResult;
    } catch (err) {
      throw err;
    }
  }

  async deactivateUserAccount(req) {
    try {
      return await this.usersDbConnector.deactivateUserAccount(req.params);
    } catch (err) {
      throw err;
    }
  }

  async addNewMeal(req) {
    try {
      return await this.mealsDbConnector.addNewMeal(req.params, req.body);
    } catch (err) {
      throw err;
    }
  }

  async getUserMeals(req) {
    try {
      return await this.mealsDbConnector.getUserMeals(req.params, req.query);
    } catch (err) {
      throw err;
    }
  }

  async deleteMeal(req) {
    try {
      return await this.mealsDbConnector.deleteUserMeal(req.params);
    } catch (err) {
      throw err;
    }
  }

  async updateMeal(req) {
    try {
      return await this.mealsDbConnector.updateUserMeal(req.params, req.body);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
