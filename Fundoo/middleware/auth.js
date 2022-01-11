const jwt = require("jsonwebtoken");

var auth = (req, res, next) => {
  let token = req.headers["token"];

  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, ((err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: "Authentication Failed" });
    } else {
      req.body["data"] = decoded;
      req.token = decoded;
      console.log("decoded value: ", decoded);
      next();
    }
  }))
}
// export the auth
module.exports = auth;
