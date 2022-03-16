const express = require(`express`)
const router = express.Router()
const bundleController = require(`../controllers/bundleControllers`)
const auth = require(`../middlewares/auth`)

// GET ALL BUNDLES
router.get(`/`, /* auth.verifyIfAdmin, */ async (req, res) => {
    try {
        await bundleController.getAllBundles().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BUNDLE
router.post(`/create`, /* auth.verifyIfAdmin, */ async (req, res) => {
    try {
        await bundleController.createBundle(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A BUNDLE
router.post(`/:bundleId`, async (req, res) => {
    try {
        await bundleController.findBundle(req.params.bundleId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A BUNDLE
router.put(`/:bundleId/update`,/*  auth.verifyIfAdmin, */ async (req, res) => {
    try {
        await bundleController.updateBundle(req.params.bundleId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// ARCHIVE A BUNDLE
router.patch(`/:bundleId/archive`, /* auth.verifyIfAdmin, */ async (req, res) => {
    try {
        await bundleController.archiveBundle(req.params.bundleId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UNARCHIVE A BUNDLE
router.patch(`/:bundleId/unArchive`, /* auth.verifyIfAdmin, */ async (req, res) => {
    try {
        await bundleController.unArchiveBundle(req.params.bundleId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL ACTIVE BUNDLE
router.get(`/isActive`, async (req, res) => {
    try {
        await bundleController.getAllActiveBundles().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE BUNDLE
router.delete(`/:bundleId/delete`, /* auth.verifyIfAdmin, */ async (req, res) => {
    try {
        await bundleController.deleteBundle(req.params.bundleId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router