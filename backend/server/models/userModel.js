const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    firstname: {
      type: String,
      //required: true,
      label: "firstname",
    },
    lastname: {
      type: String,
      //required: true,
      label: "lastname",
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
    favRoute: {
      type: String,
      label: "favline",
    },
    zipcode: {
      type: String,
      label: "zipcode",
      //required: true,

    }
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)