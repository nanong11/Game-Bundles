const express = require(`express`)
const router = express.Router()
const userControllers = require(`../controllers/userControllers`)
const auth = require(`../auth`)

//GET ALL USERS
router.get(`/`, async (req, res) => {
    try {
        await userControllers.getAllUsers().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SIGN UP A USER
router.post(`/signup`, async (req, res) => {
    try {
        await userControllers.signUp(req.body).then(result => {
            if(result){
                res.send(`Sign up complete.`)
            }else{
                res.send(`Sign up failed.`)
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//CHECK IF EMAIL EXIST
router.post(`/check/email`, async (req, res) => {
    try {
        await userControllers.checkEmail(req.body.email).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})












module.exports = router