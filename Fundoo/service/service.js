const { response } = require("express");
const model = require("../model/model");

const userModel = new model.UserModel();
const newmodel = model.User;

class Service {
  async UserRegistration(obj) {
    let foundUser = await userModel.findUser(obj);
    let length = foundUser.data.length;
    if (length == 0) {
      let newuser = new newmodel({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: obj.password,
      });

      let savedData = await userModel.RegisterUser(newuser);
      return savedData;
    } else {
      return foundUser;
    }
  }
}

module.exports = new Service();
