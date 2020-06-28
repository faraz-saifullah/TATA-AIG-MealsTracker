class AuthController {
    startSession(req, result) {
        if (result.success) {
            req.session.userId = result.data.user_id;
            req.session.type = result.data.type;
          }
    }

    setCookies(req, res, result) {
        if (result.success) {
            const secure = req.app.get("env") === "development";
            res.cookie("user_id", result.data.user_id, {
                httpOnly: true,
                secure: secure,
                signed: true,
              });
              res.cookie("type", result.data.type, {
                httpOnly: true,
                secure: secure,
                signed: true,
              });
          }
    }

    destroySession(req) {
        req.session.destroy();
    }

    clearCookies(res) {
        res.clearCookie("user_id");
        res.clearCookie("type");
    }
}

module.exports = AuthController;