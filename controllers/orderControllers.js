const CryptoJS = require(`crypto-js`)
const auth = require(`../middlewares/auth`)
const Order = require(`../models/Order`)
const Bundle = require(`../models/Bundle`)
const Game = require(`../models/Game`)

// GET ALL ORDERS
module.exports.getAllOrders = async () => {
    return await Order.find()
    .then(result => result ? result : error)}

// CREATE A ORDER
module.exports.createOrder = async (reqBody) => {
    const {userId, bundlesIncluded, gamesIncluded} = reqBody
    const bundleIds = bundlesIncluded.map(bundle => bundle.bundleId)
    const gameIds = gamesIncluded.map(game => game.gameId)
    let total = 0;
    await Bundle.find({ _id: {$in: bundleIds} }).then(result => {
        if(result){
            result.map(bundles => {
                total += bundles.subTotal
                return total
            })
        }else{
            return total
        }
    })
    await Game.find({ _id: {$in: gameIds} }).then(result => {
        if(result){
            result.map(games => {
                total += games.price
                return total
            })
        }else{
            return total
        }
    })
    total = +total.toFixed(2)
    const newOrder = new Order({userId, bundlesIncluded, gamesIncluded, total})
    return newOrder.save()
    .then(result => result ? result : error)
}

//FIND AN ORDER
module.exports.findOrder = async (orderId) => {
    return await Order.findById(orderId)
    .then(result => result ? result : error)}

// ADD PRODUCTS TO ORDER
module.exports.addProductsToOrder = async (orderId, reqBody) => {
    const orderData = {bundlesIncluded: reqBody.bundlesIncluded, gamesIncluded: reqBody.gamesIncluded}
    return await Order.findByIdAndUpdate(orderId, {$push: orderData}, {new:true})
    .then(result => result ? result : error)}

// REMOVE PRODUCTS FROM ORDER
module.exports.removeFromCart = async (orderId, reqBody) => {
    console.log(reqBody.bundlesIncluded)
    const orderData = {bundlesIncluded: reqBody.bundlesIncluded, gamesIncluded: reqBody.gamesIncluded}
    return await Order.findByIdAndUpdate(orderId, {$pull: orderData}, {new:true})
    .then(result => result ? result : error)}

//COMPLETE A ORDER
module.exports.completeOrder = async (orderId) => {
    return await Order.findByIdAndUpdate(orderId, {$set: {complete: true}}, {new:true})
    .then(result => result ? result : error)}

//PENDING A ORDER
module.exports.pendingOrder = async (orderId) => {
    return await Order.findByIdAndUpdate(orderId, {$set: {complete: false}}, {new:true})
    .then(result => result ? result : error)}

//FIND ALL COMPLETE ORDER
module.exports.getAllCompleteOrders = async () => {
    return await Order.find({complete: true})
    .then(result => result ? result : error)}

//DELETE ORDER
module.exports.deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId)
    .then(result => result ? result : error)}