// const res = require("express/lib/response");
const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
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
                    (response.success = true),
                    (response.message = "Register Successfully"),
                    (response.data = data),
                    (response.status = 200);
                    resolve({ response });
                }).catch((err) => {
                    (response.success = false),
                    (response.message = "Register failed"),
                    (response.data = ""),
                    (response.status = 500);
                    reject({ response });
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
                        (response.success = true),
                        (response.data = data),
                        (response.message = "Notes Found"),
                        (response.status = 200);
                        resolve({ response });
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
}


module.exports = { NotesModel, notes };