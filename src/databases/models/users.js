import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username: {type: String,
        require: true, unicode: true},

    password: {type: String,
        require: true},

    name: {type: String,
        require: true},

    email: {type: String,
        require: true},

    cpfcnpj: {type: String,
        require: true},
}, {timestamp: true});

export default mongoose.model("Users", UserSchema);