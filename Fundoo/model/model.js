const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("    ", UserSchema);

class UserModel {
  findUser(req) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };
    return new Promise((resolve, reject) => {
      User.find({ email: req.email }) // builtin
        .then((data) => {
          if (data.length > 0) {
            (response.success = true),
              (response.data = data),
              (response.status = 422),
              (response.message = "User is already exist");
            resolve(response);
          } else {
            resolve({
              message: "User not found please register first",
              data: data,
              status: 200,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          reject({ success: false, error: err });
        });
    });
  }

  RegisterUser(req) {
    let response = {
      success: true,
      message: "",
      data: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      req
        .save()
        .then((data) => {
          (response.success = true),
            (response.message = " Registered Successfully"),
            (response.data = data),
            (response.status = 200);
          resolve(response);
        })
        .catch((err) => {
          (response.success = false),
            (response.message = " Registered Failed"),
            (response.data = ""),
            (response.status = 500);
          reject(response);
        });
    });
  }
}

module.exports = { UserModel, User };
