// import or require mongoose
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

const User = mongoose.model("Tests", UserSchema);

class UserModel {
  findUser(req) {
    var response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };
    return new Promise((resolve, reject) => {
      // console.log(req);
      User.findOne({ email: req.email }) // built in
        .then((data) => {
          // console.log(data);
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
          resolve({ response });
        })
        .catch((err) => {
          (response.success = false),
            (response.message = " Registered Failed"),
            (response.data = ""),
            (response.status = 400);
          reject({ response });
        });
    });
  }
}

// export the model
module.exports = { UserModel, User };
