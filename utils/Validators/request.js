const HttpResponseHandler = require("../web/HTTPResponseHandler");
const HttpResponseCodes = require("../web/HttpResponseCodes");

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
        "Name can not be empty",
        "Bad Request",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!body.password) {
      return this.httpResponseHandler.handleFailed(
        "Password can not be empty",
        "Bad Request",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!body.email) {
      return this.httpResponseHandler.handleFailed(
        "Email can not be empty",
        "Bad Request",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else if (!this.checkEmailValidity(body.email)) {
      return this.httpResponseHandler.handleFailed(
        "Invalid email address",
        "Bad Request",
        this.httpResponseCodes.BAD_REQUEST()
      );
    } else {
      return this.httpResponseHandler.handleSuccess("Success", body);
    }
  }
}

module.exports = RequestValidator;
