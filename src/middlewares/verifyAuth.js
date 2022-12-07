const jwt = require("jsonwebtoken");

exports.verifyAuth = (req, res, next) => {
  console.log("req headers", req.headers);
  console.log(Date.now());
  if (req.headers.token) {
    jwt.verify(req.headers.token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("verifyerror", err);
        return res.status(401).json({ status: 401, message: "You ara not authorized!!" });
      } else {
        if (decoded && decoded?.exp > Date.now()) {
            next()
        } else {
            return res.status(401).json({ status: 401, message: "Your token is expired, Please login again!!" });
        }
      }
    })
  } else {
    return res.status(401).json({ status: 401, message: "You ara not authorized!!" });
  }
};
