const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");


module.exports = async function (req, res, next) {
  const header = req.header("authorization");
  if (!header) {
    return res.status(401).json({ msg: "No Token, Authorization Denied!" });
  }
  try {
    const bearer = header.split(' ');
    const token = bearer[1];

    const decoded = await jwt.verify(token, jwtSecret);s
    req.user = {
      id: decoded.id,
      role:decoded.role
    };

    return next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not Valid!", error });
  }
};


/*
module.exports = (req,res,next) => {
  const header = req.headers[`authorization`]

  if (token) {

 
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({"error": true, "message": 'sendRefreshToken' });
        }
      req.user = {
        id: decoded.id,
        role: decoded.role
      };
      return next();
    });
  } else {

    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}
*/