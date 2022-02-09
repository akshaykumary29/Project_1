
class validation  {

    registerValidation = (req, res, next) => {

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
        if (error) {
            return res.status(404).send(error);
        } else {
            next();
        }
    };

    loginValidation = (req, res, next) => {
        req.check("email").isEmail().withMessage("Email is not valid");

        req
            .check("password")
            .isLength({ min: 3 })
            .withMessage("Min 3 alphabet required")
            .isLength({ max: 15 })
            .withMessage("Max 10 alphabet allowed in password");

        let error = req.validationErrors();
        if (error) {
            return res.status(404).send(error);
        } else {
            next();
        }
    };

    forgetPasswordValidation = (req, res, next) => {
        req.check("email").isEmail().withMessage("Email is not valid");

        let error = req.validationErrors();
        if (error) {
            return res.status(404).send(error);
        } else {
            next();
        }
    };

    addNotes = (req, res, next) => {
        req
            .check("title")
            .isLength({ min: 2 })
            .withMessage('title must be 2 characters long')
           

        req
            .check("description")
            .isLength({ min: 2 })
            .withMessage('description must be 2 characters long')
           

        req.check("isPined")
            .isLength({ min: 2 })
            .withMessage('isPinned must be 2 characters long')
      

        req.check("isArchieved")
            .isBoolean()
            .withMessage('isArchieved Must be a boolean true or false')
         

        req.check("isDeleted")
            .isBoolean()
            .withMessage('isDeleted Must be a boolean true or false')
          

        let error = req.validationErrors();
        if (error) {
            return res.status(403).send(error);
        } else {
            next();
        }
    }


};

module.exports = new validation();