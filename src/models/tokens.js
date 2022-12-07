const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    token : {
        type : String,
        required : true
    },
    expiresAt : {
        type : Date,
        required : true
    }
})

module.exports = new mongoose.model('Token', tokenSchema)