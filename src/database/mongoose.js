const mongoose = require("mongoose");

const {mongoUrl} = require("../utils/vars");
const mongoConnect = () => {
  return mongoose
    .connect(mongoUrl)
    .then((result) => {
      // console.log("mongoconnection result", result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      if (err) throw err;
    });
};

module.exports = mongoConnect;
