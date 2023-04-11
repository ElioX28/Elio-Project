const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcrypt");
const { newUserValidation } = require('../models/userValidator')
const commentModel = require('../models/commentModel')

router.post('/add', async (req, res) => {
    const { username, stationName, comment } = req.body;


    //creates a new comment
    const createComment = new commentModel({
        username: username,
        stationName: stationName,
        comment: comment,
    });

   
    try {
        const saveComment = await createComment.save();
        res.send(saveComment);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create comment" });
    }

})

module.exports = router;