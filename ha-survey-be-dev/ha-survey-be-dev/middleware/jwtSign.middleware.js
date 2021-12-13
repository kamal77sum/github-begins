const jwt = require("jsonwebtoken");
var config = require('config');


const generateAccessToken = (user) => {
    user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }
    return {
        accessToken: jwt.sign({user}, config.get("jwtSecret"), {expiresIn: config.get("jwtExpire")}),
        refreshToken: jwt.sign({user}, config.get("jwtSecret"), {expiresIn: config.get("jwtRefreshExpire")})
    }
};


module.exports = generateAccessToken;
