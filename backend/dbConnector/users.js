let DataService = require("../utils/datasource/DataService");

class UsersDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async getAllUsers() {
    const sqlQuery = {
      text: `SELECT * FROM users`,
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async getUserDetails(params) {
    const sqlQuery = {
      text: `SELECT * FROM users WHERE user_id = ($1)`,
      values: [params.userId],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async createUser(body) {
    let defaultCaloryLimit = 500;
    if (body.type === "admin") {
      defaultCaloryLimit = null;
    }

    const sqlQuery = {
      text: `INSERT INTO users (name, email, password, type, daily_calory_limit)
                values ($1, $2, $3, $4, $5) RETURNING user_id, type, daily_calory_limit`,
      values: [
        body.name,
        body.email,
        body.password,
        body.type || "regular",
        body.dailyCaloryLimit || defaultCaloryLimit,
      ],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery, true);
    } catch (err) {
      return err;
    }
  }

  async updateUserDetails(params, body, existingInfo) {
    try {
      const updateQuery = {
        text: `UPDATE users SET (name, email, password, daily_calory_limit) = ($1, $2, $3, $4)
                where user_id = ($5) RETURNING user_id, name, type, email, daily_calory_limit`,
        values: [
          body.name || existingInfo.name,
          body.email || existingInfo.email,
          body.password || existingInfo.password,
          body.dailyCaloryLimit || existingInfo.daily_calory_limit,
          params.userId,
        ],
      };
      return await this.dataService.executeQueryAsPromise(updateQuery);
    } catch (err) {
      return err;
    }
  }

  async deactivateUserAccount(params) {
    try {
      const sqlQuery = {
        text: `UPDATE users SET is_active = false where user_id = ${params.userId}`,
      };
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }
}

module.exports = UsersDbConnector;
