const express = require(`express`)
const router = express.Router()
const orderController = require(`../controllers/orderControllers`)
const auth = require(`../middlewares/auth`)

// GET ALL ORDERS
router.get(`/`, auth.verify, async (req, res) => {
    try {
        await orderController.getAllOrders().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A ORDER
router.post(`/create`, auth.verify, async (req, res) => {
    try {
        await orderController.createOrder(req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A ORDER
router.post(`/:orderId`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await orderController.findOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A ORDER
router.put(`/:orderId/update`, auth.verify, async (req, res) => {
    try {
        await orderController.updateOrder(req.params.orderId, req.body).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// COMPLETE A ORDER
router.patch(`/:orderId/complete`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await orderController.completeOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// PENDING A ORDER
router.patch(`/:orderId/pending`, auth.verifyIfAdmin, async (req, res) => {
    try {
        await orderController.pendingOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL COMPLETE ORDER
router.get(`/isComplete`, auth.verify, async (req, res) => {
    try {
        await orderController.getAllCompleteOrders().then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE ORDER
router.delete(`/:orderId/delete`, auth.verify, async (req, res) => {
    try {
        await orderController.deleteOrder(req.params.orderId).then(result => res.send(result))
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router