const User = require("../models/user.model");
const generateAccessToken = require("../middleware/jwtSign.middleware");
// const redis = require("redis").createClient({host: "localhost", port: 6379});
const helper = require("../helper/helper.functions");
const redis = require("../helper/redis.service");


class AuthController {
    async adminLogin(req, res, next) {
        try {
            if (req.method === "POST") {
                const {email, password} = req.body;
                if (!email || !password) {
                    return res.status(400).json({
                        message: "Please provide email and password"
                    });
                }
                const user = await User.findOne({email});
                if (!user) {
                    return res.status(400).json({
                        message: "User not found"
                    });
                }
                if (user.role !== "admin") {
                    return res.status(400).json({
                        message: "User is not an admin"
                    });
                }
                if (!user.comparePassword(password)) {
                    return res.status(400).json({
                        message: "Incorrect password"
                    });
                }
                const otp = helper.get6DigitOtp()
                const key = redis.setValue({userId: user._id, otp});
                // await emailService.sendEmail({to: user.email, subject: 'OTP for 2FA', text: `Your OTP is: ${otp}`});
                return res.status(200).json({
                    success: true,
                    message: "OTP Sent Successfully",
                    data: {key, otp}
                });
            }
            if (req.method === 'PUT') {
                if (!req.body.key) {
                    return res.status(400).json({
                        message: "Please provide key"
                    });
                }
                const {key, enteredOtp} = req.body;
                const payload = redis.getValue(key);
                if ((!payload) || !payload.userId || !payload.otp) {
                    return res.status(400).json({
                        message: "Invalid key"
                    });
                }
                const user = await User.findById(payload.userId);
                if (!user) {
                    return res.status(400).json({
                        message: "User not found"
                    });
                }
                if (user.role !== "admin") {
                    return res.status(400).json({
                        message: "User is not an admin"
                    });
                }
                if (parseInt(enteredOtp) !== payload.otp) {
                    return res.status(400).json({
                        message: "Incorrect OTP"
                    });
                }
                const {accessToken, refreshToken} = generateAccessToken(user);
                return res.status(200).json({
                    success: true,
                    message: "Login Successful",
                    data: {
                        user,
                        accessToken,
                        refreshToken
                    }
                });

            }
        } catch (err) {
            console.log(err, "error in adminLogin");
            return next({success: false, err});
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Please provide email and password"
                });
            }
            const user = await User.findOne({email: email});
            if (!user) {
                return next(null, false, {message: 'Unknown User'});
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(403).json("NOT AUTHORIZED")
            const {accessToken, refreshToken} = generateAccessToken(user);
            const data = {
                userData: user,
                accessToken,
                refreshToken,
            }
            return res.status(200).json({message: "true", data});
        } catch (err) {
            console.log(err)
            return res.status(500).send({success: false, message: "something went wrong."})
        }
    }

}

module.exports = new AuthController();
