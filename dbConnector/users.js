let DataService = require('../utils/datasource/DataService');

class UsersDbConnector {
    constructor() {
        this.dataService = new DataService();
    }

    async getAllUsers() {
        const sqlQuery = {
            text: `SELECT * FROM users`,
        }
        try {
            return await this.dataService.executeQueryAsPromise(sqlQuery);
        } catch (err) {
            return err;
        }
    }

    async getUserDetails(params) {
        const sqlQuery = {
            text: `SELECT * FROM users WHERE user_id = ${params.userId}`,
        }
        try {
            return await this.dataService.executeQueryAsPromise(sqlQuery);
        } catch (err) {
            return err;
        }
    }

    async createUser(body) {
        const sqlQuery = {
            text: `INSERT INTO users (name, email, password, daily_calory_limit)
                values ($1, $2, $3, $4)`,
            values: [body.name, body.email, body.password,
             body.dailyCaloryLimit || 500]
        };
        try {
            return await this.dataService.executeQueryAsPromise(sqlQuery, true);
        } catch (err) {
            return err;
        }
    }

    async updateUserDetails(params, body) {
        const selectQuery = {
            text: `SELECT * FROM users where user_id = ${params.userId}`,
        }
        try {
            let existingInfo = await this.dataService.executeQueryAsPromise(selectQuery);
            if(!existingInfo.success) {
                return existingInfo;
            }
            existingInfo = existingInfo.data[0];
            const updateQuery = {
                text: `UPDATE users SET (name, email, password, daily_calory_limit) = ($1, $2, $3, $4)
                where user_id = ${params.id} RETURNING user_id, name, email, daily_calory_limit`,
                values: [
                    body.name || existingInfo.name,
                    body.email || existingInfo.email,
                    body.password || existingInfo.password, 
                    body.daily_calory_limit || existingInfo.daily_calory_limit
                ]
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
            }
            return await this.dataService.executeQueryAsPromise(sqlQuery);
        } catch (err) {
            return err
        }
    }
}

module.exports = UsersDbConnector;
