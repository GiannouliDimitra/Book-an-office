const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", User_schema);

module.exports = User;