
// import or require mongoose
const mongoose = require("mongoose");

// database Schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Tests", UserSchema);

// model class
class UserModel {
  // method to find user
  findUser(req) {
    var response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };
    return new Promise((resolve, reject) => {
     
      User.findOne({ email: req.email }) // built in
        .then((data) => {
          
          if (data) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "User is already exist");
            resolve(response);
          } else {
            resolve({
              message: "User not found please register first",
              data: data,
              status: 400,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          reject({ success: false, error: err });
        });
    });
  }

  // method to register user
  RegisterUser(obj) {
    let response = {
      success: true,
      message: "",
      data: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      obj
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
            (response.status = 400);
          reject(response);
        });
    });
  }
}

// export the model
module.exports = { UserModel, User };
