const UsersDbConnector = require('../dbConnector/users');
const MealsDbConnector = require('../dbConnector/meals');

class User {
    constructor() {
        this.usersDbConnector = new UsersDbConnector();
        this.mealsDbConnector = new MealsDbConnector();
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

    async addNewMeal(req) {
        try {
            return await this.mealsDbConnector.addNewMeal(req.params, req.body);
        } catch(err) {
            throw err;
        }
    }

    async getUserMeals(req) {
        try {
            return await this.mealsDbConnector.getUserMeals(req.params, req.query);
        } catch(err) {
            throw err;
        }
    }

    async deleteMeal(req) {
        try {
            return await this.mealsDbConnector.deleteUserMeal(req.params);
        } catch(err) {
            throw err;
        }
    }

    async updateMeal(req) {
        try {
            return await this.mealsDbConnector.updateUserMeal(req.params, req.body);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = User;