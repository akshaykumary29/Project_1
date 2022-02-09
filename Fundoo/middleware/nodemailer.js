const nodemailer = require("nodemailer");
const logger = require("../config/logger");
require("dotenv").config();

module.exports = {
    sendMail(toMail, token) {

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.PASSWORD
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_ID, // sender address
            to: toMail,  // list of receivers
            subject: "Forget Password Request", 
            text: "",
            html: `
            hi,
            Here is the link to reset password <a href= "http://localhost:3000/resetPassword/${token}"> click here </a>
            thanks.`
        };

        transport.sendMail(mailOptions, function(err, data)  {
            if(err) {
                console.log('Error');
                logger.error(err);
            } else {
                logger.info("Email Sent successfully");
            }
        });
    }
}