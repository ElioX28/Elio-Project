const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcrypt");
const { newUserValidation } = require('../models/userValidator')
const newUserModel = require('../models/userModel')

router.post('/signup', async (req, res) => {
    const { error } = newUserValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ message: error.errors[0].message });

    const { username, firstname, lastname, email, password, favline, zipcode } = req.body

    //check if email already exists
    const user = await newUserModel.findOne({ username: username })
    if (user)
        return res.status(409).send({ message: "Username is taken, pick another" })

    //generates the hash
    const generateHash = await bcrypt.genSalt(Number(10))

    //parse the generated hash into the password
    const hashPassword = await bcrypt.hash(password, generateHash)

    //creates a new user
    const createUser = new newUserModel({
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashPassword,
        favline : favline,
        zipcode : zipcode
    });

   
    try {
        const saveNewUser = await createUser.save();
        res.send(saveNewUser);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }

})

module.exports = router;