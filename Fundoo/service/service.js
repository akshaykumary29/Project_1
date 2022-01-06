require("dotenv").config();
const { response } = require("express");
const model = require("../model/model");

const userModel = new model.UserModel();
const newmodel = model.User;

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const nodemailer = require("../middleware/nodemailer");

class Service {
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
        const token = jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
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

  async forgetService(req, res) {
    let response = {
      success: true,
      message: "",
      data: ""
    }

    let foundUser = await userModel.findUser({ email: req.email });
    if(foundUser.data) {
      const payload = { id: foundUser.data._id, email: foundUser.data.email }
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)

      let update = await nodemailer.sendMail(foundUser.data.email, token);
      return update;
    } else {
      response.success = false,
      response.message = "User Not Found",
      response.data = "",
      response.status = 400;
      return response;
    }
  }
}

// export the Service
module.exports = new Service();
