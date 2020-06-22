let DataService = require("../utils/datasource/DataService");

class DailyGoalsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  addToDailyGoals(userInfo) {
    const updateQuery = {
      text: `INSERT INTO daily_goals (user_id, target) values ($1, $2)`,
      values: [userInfo.user_id, userInfo.daily_calory_limit],
    };
    return this.dataService.executeQuery(updateQuery, true);
  }
}

module.exports = DailyGoalsDbConnector;
