const CryptoJS = require(`crypto-js`)
const auth = require(`../middlewares/auth`)
const Game = require(`../models/Game`)

// GET ALL GAMES
module.exports.getAllGames = async () => {
    return await Game.find()
    .then(result => result ? result : error)}

// CREATE A GAME
module.exports.createGame = async (reqBody) => {
    const {name, description, price, stock} = reqBody
    const newGame = new Game({name, description, price, stock})
    return await newGame.save()
    .then(result => result ? result : error)}

//FIND A GAME
module.exports.findGame = async (gameId) => {
    return await Game.findById(gameId)
    .then(result => result ? result : error)}

//UPDATE A GAME
module.exports.updateGame = async (gameId, reqBody) => {
    const gameData = {name: reqBody.name, description: reqBody.description, price: reqBody.price, stock: reqBody.stock}
    return await Game.findByIdAndUpdate(gameId, {$set: gameData}, {new:true})
    .then(result => result ? result : error)}

//ARCHIVE A GAME
module.exports.archiveGame = async (gameId) => {
    return await Game.findByIdAndUpdate(gameId, {$set: {isActive: false}}, {new:true})
    .then(result => result ? result : error)}

//UNARCHIVE A GAME
module.exports.unArchiveGame = async (gameId) => {
    return await Game.findByIdAndUpdate(gameId, {$set: {isActive: true}}, {new:true})
    .then(result => result ? result : error)}

//FIND ALL ACTIVE GAMES
module.exports.getAllActiveGames = async () => {
    return await Game.find({isActive: true})
    .then(result => result ? result : error)}

//DELETE GAME
module.exports.deleteGame = async (gameId) => {
    return await Game.findByIdAndDelete(gameId)
    .then(result => result ? result : error)}