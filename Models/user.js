const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },

}, { timestamps: true })

module.exports = User = mongoose.model('user', UserSchema)