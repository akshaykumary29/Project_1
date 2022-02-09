
// import the service
const logger = require("../config/logger");
const service = require("../service/service");

class Registration {
  // user signup
  registerUser(req, res) {
    service
      .UserRegistration(req.body)
      .then((result) => {
        console.log(result);
        return res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("Error in register opration", err)
        return res.status(404).send(err);
      });
  }

  // user login
  loginUser(req, res) {
    service
      .UserLogin(req.body)
      .then((result) => {
        // console.log(result);
        logger.info("Login Success.")
        return res.status(200).send(result);
      })
      .catch((err) => {
        logger.error("Error in login opration", err)
        return res.status(404).send(err);
      });
  }

  // user forget password
  forgetUser(req, res) {
    service
      .forgetService(req.body).then((result) => {
        console.log(result);
        res.status(200).json(result)
      }).catch((err) => {
        logger.error("Error in forget password opration", err)
        return res.status(404).send(err);
      })
  }

  // user reset password
  resetUser(req, res) {
    service
      .resetService(req.body).then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        logger.error("Error in reset password opration", err)
        return res.status(404).send(err);
      })
  }
}

// export the Registration
module.exports = new Registration();
