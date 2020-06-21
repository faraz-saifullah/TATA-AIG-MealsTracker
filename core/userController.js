let UsersDbConnector = require('../dbConnector/users');

class User {
    constructor() {
        this.usersDbConnector = new UsersDbConnector();
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
        } catch(err) {
            throw err;
        }
    }

    async createUser(req) {
        try {
            return await this.usersDbConnector.createUser(req.body);
        } catch(err) {
            throw err;
        }
    }

    async updateUserDetails(req) {
        try {
            return await this.usersDbConnector.updateUserDetails(req.params, req.body);
        } catch(err) {
            throw err;
        }
    }

    async deactivateUserAccount(req) {
        try {
            return await this.usersDbConnector.deactivateUserAccount(req.params)
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;