const CryptoJS = require(`crypto-js`)
const auth = require(`../auth`)
const User = require(`../models/User`)

//GET ALL USERS
module.exports.getAllUsers = async() => {
    return await User.find().then(result => result)
}

//SiGN UP A USER
module.exports.signUp = async (reqBody) => {
    const {firstName, lastName, email, password} = reqBody
    const newUser = new User({
        firstName, lastName, email, 
        password: CryptoJS.AES.encrypt(password, process.env.ACCESS_TOKEN_SECRET).toString()
    })
    return await newUser.save().then(result => {
        if(result){
            return true
        }else{
            if(result == null){
                return false
            }
        }
    })
}

//CHECK IF EMAIL EXIST
module.exports.checkEmail = async (email) => {
    return await User.findOne({email}).then((result, error) => {
        if(result){
            return true
        } else {
            if(result == null){
                return false
            }else{
                return error
            }
        }
    })
}