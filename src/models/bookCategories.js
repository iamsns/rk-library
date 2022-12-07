const mongoose = require("mongoose");

const bookCategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique : true
    // index : {
    //   unique : true,
    //   dropDups: true
    // }
  },

});

module.exports = mongoose.model('BookCategory', bookCategorySchema)