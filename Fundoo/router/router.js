
const express = require("express");
const controller = require("../controller/controller");
const notesController = require('../controller/notesController');

// const validate = require("../middleware/validation");
const auth = require("../middleware/auth");
// to create new route object
const router = express.Router();

//route api for register 
router.post("/register", controller.registerUser);
//route api for login
router.post("/login", controller.loginUser);
//route api for addNotes
router.post("/addNotes", auth, notesController.addNotes);
//route api for getNotes
router.get("/getNotes", auth, notesController.getNotes);


// export the router
module.exports = router;
