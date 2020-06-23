const AdminRequestDbConnector = require("../dbConnector/adminRequests");
const UsersDbConnector = require("../dbConnector/users");

class Admin {
  constructor() {
    this.adminRequestDbConnector = new AdminRequestDbConnector();
    this.usersDbConnector = new UsersDbConnector();
  }

  async getAllAdminRequests() {
    try {
      return await this.adminRequestDbConnector.getAllRequests();
    } catch (err) {
      throw err;
    }
  }

  async approveAdminRequests(req) {
    try {
      let adminInfo = await this.adminRequestDbConnector.deleteRequest(
        req.body.email
      );
      adminInfo = adminInfo.data[0];
      adminInfo.type = "admin";
      return this.usersDbConnector.createUser(adminInfo);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Admin;
