class helperFunctions {

    randomPassword = (length) => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = length || 12;
        var password = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }

        return password;
    }

    sendMail = (to, subject, content) => {
        //nodemailer or sgmail?
    }

    get6DigitOtp() {
        return Math.floor(100000 + Math.random() * 900000);
    }
}

module.exports = new helperFunctions();
