const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String,
        require: true},

    email: {type: String,
        require: true},

    cpfcnpj: {type: String,
        require: true},
}, {timestamp: true});

module.exports = mongoose.model("Users", UserSchema);