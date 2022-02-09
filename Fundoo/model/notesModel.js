
// import
const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    colour: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
    },
    isArchived: {
      type: Boolean,
    },
    user_id: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const notes = mongoose.model("Notes", NotesSchema);

class NotesModel {
    registerNote(obj) {
        let response = {
            message: "",
            success: true,
            data: "",
            status: 200
        };

        return new Promise((resolve, reject) => {
          console.log(obj);
            obj
                .save().then((data) => {
                    // (response.success = true),
                    (response.message = "Register Successfully"),
                    (response.data = data),
                    // (response.status = 200);
                    resolve(response);
                }).catch((err) => {
                    (response.success = false),
                    (response.message = "Register failed"),
                    (response.data = ""),
                    (response.status = 500);
                    reject(response);
                })
        })
    }

    findNotes(req) {
        var response = {
            message: "",
            data: "",
            success: "",
            status: 200
        };

        return new Promise((resolve, reject) => {
            notes.find(req)
                .then((data) => {
                  // console.log(data);
                    if (data) {
                        // (response.success = true),
                        (response.data = data),
                        (response.message = "Notes Found"),
                        // (response.status = 200);
                        resolve(response);
                    } else {
                        resolve({
                            message: "Notes are Not Found",
                            data: null,
                            status: 401,
                        });
                    }
                })
                .catch((err) => {
                    reject({ success: false, error: err });
                });
        });
    }

    searchNote(req) {
      var response = {
          message: "",
          data: "",
          success: "",
          status: 200
      };

      return new Promise((resolve, reject) => {
          notes.findOne({ _id: req._id })
              .then((data) => {
                // console.log(data);
                  if (data) {
                      (response.success = true),
                      (response.data = data),
                      (response.message = "Update Notes Found"),
                      (response.status = 200);
                      resolve(response);
                  } else {
                      resolve({
                          message: "Update Notes are Not Found",
                          data: null,
                          status: 401,
                      });
                  }
              })
              .catch((err) => {
                  reject({ success: false, error: err });
              });
      });
  }

    updateNote(req, data) {
      return new Promise((resolve, reject) => {
      var response = {
        message: "",
        data: "",
        success: "",
        status: 200
    };

      let Note = {
        title: req.title ? req.title : data.title,
        description: req.description ? req.description : data.description,
        isArchived: req.isArchived ? req.isArchived : data.isArchived,
        isDeleted: req.isDeleted ? req.isDeleted : data.isDeleted,
        colour: req.colour ? req.colour : data.colour
      }
      
        notes.updateOne({ _id: req._id }, Note)
        .then((result) => {
          response.success = true;
          response.message = "Update Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          response.success = false;
          response.message = err;
          reject(response);
          // reject({ success: false, error: err });
        });
      });
    }
}


module.exports = { NotesModel, notes };