// import the service
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
        return res.status(500).send(err);
      });
  }
}

// export the Registration
module.exports = new Registration();
