"use strict";
let DataService = require("../utils/datasource/DataService");

class MealsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async addNewMeal(params, body) {
    const sqlQuery = {
      text: `INSERT INTO meals (name, date, calories, user_id, note) 
        VALUES ($1, $2, $3, $4, $5)`,
      values: [
        body.name,
        body.date,
        body.calories,
        params.userId,
        body.note || null,
      ],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery, true);
    } catch (err) {
      return err;
    }
  }

  async getUserMeals(params, query) {
    const sqlQuery = {
      text:
        "SELECT * FROM meals where user_id = ($1) and date >= ($2) and date <= ($3)",
      values: [params.userId, query.from, query.to],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async deleteUserMeal(params, query) {
    const sqlQuery = {
      text: "DELETE FROM meals where user_id = ($1) and meal_id = ($2)",
      values: [params.userId, params.mealId],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async updateUserMeal(params, body) {
    const selectQuery = {
      text: `SELECT * FROM meals where meal_id = ($1)`,
      values: [params.mealId],
    };
    try {
      let existingInfo = await this.dataService.executeQueryAsPromise(
        selectQuery
      );
      if (!existingInfo.success) {
        return existingInfo;
      }
      existingInfo = existingInfo.data[0];
      const updateQuery = {
        text: `UPDATE meals SET (name, date, calories, note) = ($1, $2, $3, $4)
                where meal_id = ($5) RETURNING meal_id, name, date, calories, note`,
        values: [
          body.name || existingInfo.name,
          body.date || existingInfo.date,
          body.calories || existingInfo.calories,
          body.note || existingInfo.note,
          params.mealId,
        ],
      };
      return await this.dataService.executeQueryAsPromise(updateQuery);
    } catch (err) {
      return err;
    }
  }
}

module.exports = MealsDbConnector;
