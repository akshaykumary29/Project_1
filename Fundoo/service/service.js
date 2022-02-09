
// import
require("dotenv").config();
const { response } = require("express");
const model = require("../model/model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("../middleware/nodemailer");

// create database
const userModel = new model.UserModel();
const newmodel = model.User;

class Service {
  // signup service
  async UserRegistration(req, res) {
    let foundUser = await userModel.findUser(req);
    let length = foundUser.data;
    if (!length) {
      const hashedPassword = await bcryptjs.hash(req.password, 8)
      let newuser = new newmodel({
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        password: hashedPassword,
      });

      let savedData = await userModel.RegisterUser(newuser);
      return savedData;
    } else {
      return foundUser;
    }
  }

  // login service
  async UserLogin(req, res) {
    let findUser = await userModel.findUser(req);

    if (findUser.data) {
      console.log(findUser.data);
      let matchPassword = await bcryptjs.compare(
        req.password,
        findUser.data.password
      );
      if (matchPassword) {
        const payload = { id: findUser.data._id, email: findUser.data.email };
        const token = jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET );
        return new Promise((resolve, reject) => {
          resolve({
            message: "Login successful",
            data: {
              userId: findUser.data._id,
              firstName: findUser.data.firstName,
              lastName: findUser.data.lastName,
              email: findUser.data.email,
              createdAt: findUser.data.createdAt,
              token: token
            },
            success: "",
            status: 200,
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject({
            statusCode: 400,
            name: "Error",
            message: "invalid password",
            code: "LOGIN_FAILED",
          });
        });
      }
    } else return findUser;
  }

  // forget password service
  async forgetService(req, res) {
    let response = {
      success: true,
      message: "",
      data: ""
    };

    let foundUser = await userModel.findUser({ email: req.email });
    if(foundUser.data) {
      const payload = { id: foundUser.data._id, email: foundUser.data.email }
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

      let update = await nodemailer.sendMail(foundUser.data.email, token);
      response.success = true,
      response.message = "mail to successfully",
      response.data = update,
      response.status = 200;
      return response;
      // return update;
    } else {
      response.success = false,
      response.message = "User Not Found",
      response.data = "",
      response.status = 400;
      return response;
    }
  }

  // reset pasword service
  async resetService(req, res) {

    let foundUser = await userModel.findUser({ _id: req.data.id });
    if (foundUser.data) {
      console.log(foundUser.data);

      const hashedPassword = await bcryptjs.hash(req.password, 8);
      let newOnePassword = { password: hashedPassword };
      let newOneData = newmodel.updateOne({ _id: req.data.id }, newOnePassword);
      return newOneData;
    }
    else return foundUser;
  }
}

// export the Service
module.exports = new Service();
