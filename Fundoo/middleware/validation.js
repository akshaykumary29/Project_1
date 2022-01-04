const { User } = require("../model/model");

const validation = (req, res, next) => {

    req
        .check("firstName")
        .isAlpha()
        .withMessage("firstName is required")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required in firstName");

    req 
        .check("lastName")
        .isAlpha()
        .withMessage("lastName is required")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required in lastName");

    req
        .check("email")
        .isEmail()
        .withMessage("Email is not valid");

    req 
        .check("password")
        .isLength({ min: 3 })
        .withMessage("Min 3 alphabet required")
        .isLength({ max: 10 })
        .withMessage("Max 10 alphabet allowed in password");

    let error = req.validationErrors()
    if(error) {
        return res.status(500).send(error);
    } else {
        next();
    }
};

module.exports = { validation };