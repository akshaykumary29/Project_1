
const express = require("express");
const { route } = require("express/lib/application");
const controller = require("../controller/controller");
const notesController = require('../controller/notesController');

// const validate = require("../middleware/validation");
const auth = require("../middleware/auth");
const validate = require("../middleware/validation");
// to create new route object
const router = express.Router();



// route api for register 
router.post("/register",validate.registerValidation, controller.registerUser);
// route api for login
router.post("/login",validate.loginValidation, controller.loginUser);
// route api for forgetPassword
router.post("/forgetPassword",validate.forgetPasswordValidation, controller.forgetUser);
// route api for resetPassword
router.post("/resetPassword", auth, controller.resetUser);

// route api for addNotes
router.post("/addNotes", auth,validate.addNotes, notesController.addNotes);
// route api for getNotes
router.get("/getNotes", auth, notesController.getNotes);
// route api for update
router.post("/update", auth, notesController.updateNotes);
// route api for delete
router.delete("/delete", auth, notesController.deleteNotes)
// route api for isArchived
router.get("/isArchived", auth, notesController.isArchieved);
// route api for isBin
router.get("/isBin", auth, notesController.isBin);


// export the router
module.exports = router;
