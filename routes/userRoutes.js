const express = require(`express`)
const router = express.Router()
const userController = require(`../controllers/userControllers`)
const auth = require(`../middlewares/auth`)

//GET ALL USERS - received and return all users info or error
router.get(`/`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await userController.getAllUsers().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SIGN UP A USER - received and return result or error
router.post(`/signup`, async (req, res) => {
    try {
        await userController.signUp(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//CHECK IF EMAIL EXIST - receive and return true or false
router.post(`/check-email`, async (req, res) => {
    try {
        await userController.checkEmail(req.body.email).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN - receive and return a token or false or error
router.post(`/login`, async (req, res) => {
    try {
        await userController.login(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//RETRIEVE USER INFORMATION - receive and return user info or error
router.get(`/profile`, auth.verify, async (req, res) => {
    const userId = auth.decode(req.headers.authorization).id
    try {
        await userController.profile(userId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE USER INFORMATION - receive and return updated user info or error *password should have a dedicated update form*
router.put(`/update`, auth.verify, async (req, res) => {
    const userId = auth.decode(req.headers.authorization).id
    try {
        await userController.update(userId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE PASSWORD OF A USER - receive and return updated password in hash or error
router.patch(`/update/password`, auth.verify, async (req, res) => {
    const userId = auth.decode(req.headers.authorization).id
    try {
        await userController.updatePassword(userId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SET ISADMIN TO TRUE - return user info with isAdmin-true or false
router.patch(`/isAdmin`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await userController.adminTrue(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//SET ISADMIN TO FALSE - return user info with isAdmin-false or false
router.patch(`/isUser`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await userController.adminFalse(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE USER - return true or false
router.delete(`/delete`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await userController.deleteUser(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router