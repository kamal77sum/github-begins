const User = require("../models/user.model")
var generateToken = require("../middleware/jwtSign.middleware");
const tokenList = {};

class UserController {

    registerUser(req, res, next) {                 // FIX THIS TO SPECIFIC DATA MEMBERS
        try {
            const user = new User(req.body);
            user.save(function (err, user) {
                if (err) {
                    return next(err)
                }
                res.json(user)
            })
        } catch (e) {
            res.status(500).send({success: false, message: "something went wrong."})
        }
    }


    async login(req, res, next) {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                // @jas why this done here?
                return done(null, false, {message: 'Unknown User'});
            }

            const isMatch = await user.comparePassword(req.body.password);
            console.log(isMatch);
            if (!isMatch) return res.status(403).json("NOT AUTHORIZED")

            generateToken(req, res, user._id, user.role);

            const response = {
                userData: user,
                userId: user._id,
                role: user.role,
                token: req.token,
                refreshToken: req.refreshToken
            }
            tokenList[`${req.refreshToken}`] = {...response}
            return res.status(200).json({message: "true", response});


        } catch (err) {
            console.log(err)
            return res.status(500).send({success: false, message: "something went wrong."})
        }
    }

    refreshToken = async (req, res) => {
        const refreshToken = req.headers[`refreshToken`]

        if ((refreshToken) && (refreshToken in tokenList)) {

            const decoded = await jwt.verify(refreshToken, config.get("refreshTokenSecret")); //either do this or get information from the list
            const user = {                                          // this depends upon if we intend to choose mongo for saving it or not.
                id: decoded.id,                                     // will alter decoded after deciding.
                role: decoded.role
            };
            const token = jwt.sign(user, config.secret, {expiresIn: config.get("accessTokenTTL")})
            const response = {
                message: "true",
                userId: decoded.id,
                role: decoded.role,
                token: token,
                refreshToken: refreshToken

            }

            tokenList[refreshToken].token = token
            res.status(200).json(response);
        } else {
            res.status(404).send('Invalid request')
        }
    }
}


module.exports = new UserController();
