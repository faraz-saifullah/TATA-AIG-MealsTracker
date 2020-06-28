const HttpResponseHandler = require("../web/HTTPResponseHandler");
const HttpResponseCodes = require("../web/HttpResponseCodes");
const bcrypt = require("bcrypt");

class RequestValidator {
  constructor() {
    this.httpResponseHandler = new HttpResponseHandler();
    this.httpResponseCodes = new HttpResponseCodes();
  }

  checkEmailValidity(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
      return false;
    }
    return true;
  }

  checkSignupCreds(body) {
    if (!body.name) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Name can not be empty",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!body.password) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Password can not be empty",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!body.email) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Email can not be empty",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!this.checkEmailValidity(body.email)) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Invalid email address",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else {
      return this.httpResponseHandler.handleSuccess("Success", body);
    }
  }

  checkLoginCreds(body) {
    if (!body.password) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Password can not be empty",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!body.email) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Email can not be empty",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!this.checkEmailValidity(body.email)) {
      return this.httpResponseHandler.handleFailed(
        "Bad Request",
        "Invalid email address",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else {
      return this.httpResponseHandler.handleSuccess("Success", body);
    }
  }

  async checkPassword(body, userData) {
    if (await bcrypt.compare(body.password, userData.password)) {
      delete userData.password;
      return this.httpResponseHandler.handleSuccess("Success", userData);
    } else {
      return this.httpResponseHandler.handleFailed(
        "Unauthorized",
        "Incorrect login credentials",
        this.httpResponseCodes.UNAUTHORIZED()
      );
    }
  }
}

module.exports = RequestValidator;
