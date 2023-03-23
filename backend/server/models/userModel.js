const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    password: {
      required: true,
      type: String,
      min : 8
    },
    date: {
      type: Date,
      default: Date.now,
    },
    favline: {
      type: String,
      label: "favline",
    },
    zipcode: {
      type: String,
      label: "zipcode",
    }
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)