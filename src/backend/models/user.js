const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userEmail: String,
    userFirstName: String,
    userLastName: String,
    hash: String,
    salt: String
})

module.exports = mongoose.model('User', userSchema);