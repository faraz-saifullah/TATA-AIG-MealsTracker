"use strict";
let DataService = require("../utils/datasource/DataService");

class AdminRequestDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async addNewRequest(body, password) {
    const sqlQuery = {
      text: `INSERT INTO admin_requests (name, email, password) VALUES ($1, $2, $3) RETURNING name, email`,
      values: [body.name, body.email, password],
    };
    return await this.dataService.executeQueryAsPromise(sqlQuery, true);
  }

  async getAllRequests() {
    const sqlQuery = {
      text: `SELECT * from admin_requests`,
    };
    return await this.dataService.executeQueryAsPromise(sqlQuery);
  }

  async deleteRequest(email) {
    const sqlQuery = {
      text: `DELETE from admin_requests WHERE email = ($1) RETURNING name, email, password`,
      values: [email],
    };
    return await this.dataService.executeQueryAsPromise(sqlQuery);
  }
}

module.exports = AdminRequestDbConnector;
