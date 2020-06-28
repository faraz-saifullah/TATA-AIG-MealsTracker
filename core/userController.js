"use strict";
const UsersDbConnector = require("../dbConnector/users");
const MealsDbConnector = require("../dbConnector/meals");
const DailyGoalsDbConnector = require("../dbConnector/dailyGoals");
const AdminRequestsDbConnector = require("../dbConnector/adminRequests");
const RequestValidator = require("../utils/Validators/request");
const bcrypt = require("bcrypt");

class User {
  constructor() {
    this.usersDbConnector = new UsersDbConnector();
    this.mealsDbConnector = new MealsDbConnector();
    this.dailyGoalsDbConnector = new DailyGoalsDbConnector();
    this.adminRequestsDbConnector = new AdminRequestsDbConnector();
    this.requestValidator = new RequestValidator();
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

  async getUserByEmail(req) {
    try {
      const validationResponse = this.requestValidator.checkLoginCreds(
        req.body
      );
      if (!validationResponse.success) {
        return validationResponse;
      }
      const result = await this.usersDbConnector.getUserByEmail(req.body);
      let authenticationResponse = result;
      if (result.success) {
        authenticationResponse = await this.requestValidator.checkPassword(
          req.body,
          result.data[0]
        );
      }
      return authenticationResponse;
    } catch (err) {
      throw err;
    }
  }

  async createUser(req) {
    try {
      const validationResponse = this.requestValidator.checkSignupCreds(
        req.body
      );
      if (!validationResponse.success) {
        return validationResponse;
      }
      const password = await bcrypt.hash(req.body.password, 5);
      if (req.body.type === "admin") {
        return await this.adminRequestsDbConnector.addNewRequest(
          req.body,
          password
        );
      }
      const insertResult = await this.usersDbConnector.createUser(
        req.body,
        password
      );
      if (insertResult.success) {
        const userInfo = insertResult.data[0];
        if (userInfo.type === "regular") {
          this.dailyGoalsDbConnector.addToDailyGoals(userInfo);
        }
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
      if (!existingDetails.success) {
        return existingDetails;
      }
      let password = null;
      if (req.body.password) {
        password = await bcrypt.hash(req.body.password, 5);
      }
      let updateResult = await this.usersDbConnector.updateUserDetails(
        req.params,
        req.body,
        existingDetails.data[0],
        password
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
