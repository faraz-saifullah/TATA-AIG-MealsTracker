"use strict";
let DataService = require("../utils/datasource/DataService");

class AdminRequestDbConnector {
  async addNewRequest(body) {
    const sqlQuery = {
      text: `INSERT INTO admin_requests (name, email, password) VALUES ($1, $2, $3) RETURNING name, email, password`,
      values: [body.name, body.email, body.password],
    };
    return await new DataService().executeQueryAsPromise(sqlQuery, true);
  }
}

module.exports = AdminRequestDbConnector;
