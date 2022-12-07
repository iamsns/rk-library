const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokens");

exports.createToken = (data) => {
  // with jwt
 return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:1000*60*60*24})

  //without jwt
//   crypto.randomBytes(32, (err, buffer) => {
//     if (err) {
//       console.log(err);
//       return null;
//     }
//     const token = buffer.toString("hex");

//     const newToken = new Token({
//       userId: userID,
//       token: token,
//       expiresAt: Date.now(),
//     });
//     return newToken
//       .save()
//       .then((saveResult) => {
//         console.log("saveResult", saveResult);
//       })
//       .catch((err) => {
//         console.log("toeknSaveerr", err);
//       });
//   });
};

exports.verifyToken = (token) => {
  jwt.verify(token, process.env.TOKEN_SECRET, (err, resp) => {
    if (err) {
      return err;
    }
    return resp;
  });
};
