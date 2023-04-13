const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId, email, username, firstname, lastname, password, favline, zipcode ) => {
    return jwt.sign({id: userId, email, username, firstname, lastname, password, favline, zipcode},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1m'
    })
 }

module.exports.generateAccessToken = generateAccessToken