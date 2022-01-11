// import the service
const logger = require("../config/logger");
const service = require("../service/service");

class Registration {
  registerUser(req, res) {
    service
      .UserRegistration(req.body)
      .then((result) => {
        console.log(result);
        return res.status(result.status).send(result);
      })
      .catch((err) => {
        logger.error("Error in register opration", err)
        return res.status(500).send(err);
      });
  }

  loginUser(req, res) {
    service
      .UserLogin(req.body)
      .then((result) => {
        console.log(result);
        return res.status(result.status).send(result);
      })
      .catch((err) => {
        logger.error("Error in login opration", err)
        return res.status(500).send(err);
      });
  }

  forgetUser(req, res) {
    service
      .forgetService(req.body).then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        logger.error("Error in forget password opration", err)
        return res.status(400).send(err);
      })
  }

  resetUser(req, res) {
    service
      .resetService(req.body).then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        logger.error("Error in reset password opration", err)
        return res.status(401).send(err);
      })
  }
}

// export the Registration
module.exports = new Registration();
