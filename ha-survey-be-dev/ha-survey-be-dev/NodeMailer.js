const nodemailer = require("nodemailer");

const mailer = (transport, mailOptions) => {
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent", info);
  });
};

module.exports = mailer;
