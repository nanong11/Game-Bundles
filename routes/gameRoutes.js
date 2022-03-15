const express = require(`express`)
const router = express.Router()
const gameController = require(`../controllers/gameControllers`)
const auth = require(`../middlewares/auth`)

// GET ALL GAMES
router.get(`/`, auth.verify, async (req, res) => {
    try {
        await gameController.getAllGames().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A GAME
router.post(`/create`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await gameController.createGame(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A GAME
router.post(`/:gameId`, async (req, res) => {
    try {
        await gameController.findGame(req.params.gameId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A GAME
router.put(`/:gameId/update`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await gameController.updateGame(req.params.gameId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// ARCHIVE A GAME
router.patch(`/:gameId/archive`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await gameController.archiveGame(req.params.gameId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UNARCHIVE A GAME
router.patch(`/:gameId/unArchive`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await gameController.unArchiveGame(req.params.gameId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL ACTIVE GAMES
router.get(`/isActive`, async (req, res) => {
    try {
        await gameController.getAllActiveGames().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE COURSE
router.delete(`/:gameId/delete`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await gameController.deleteGame(req.params.gameId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router