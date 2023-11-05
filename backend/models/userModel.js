const mongoose = require("mongoose");

let User_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

let User = mongoose.model("User", User_schema);

module.exports = User;