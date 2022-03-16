const CryptoJS = require(`crypto-js`)
const auth = require(`../middlewares/auth`)
const Bundle = require(`../models/Bundle`)

// GET ALL BUNDLES
module.exports.getAllBundles = async () => {
    return await Bundle.find()
    .then(result => result ? result : error)}

// CREATE A GAME
module.exports.createBundle = async (reqBody) => {
    const {bundleName, description, gamesIncluded} = reqBody
    let subTotal = 0;
    if(gamesIncluded.length == 2){
        gamesIncluded.map(game => {
            return subTotal += game.price
        })
        subTotal -= (subTotal * 0.05)
    }else if(gamesIncluded.length == 3){
        gamesIncluded.map(game => {
            return subTotal += game.price
        })
        subTotal -= (subTotal * 0.10)
    }else if(gamesIncluded.length == 5){
        gamesIncluded.map(game => {
            return subTotal += game.price
        })
        subTotal -= (subTotal * 0.15)
    }else{
        return false
    }
    const newBundle = new Bundle({bundleName, description, gamesIncluded, subTotal})
    return await newBundle.save()
    .then(result => result ? result : error)}

//FIND A BUNDLE
module.exports.findBundle = async (bundleId) => {
    return await Bundle.findById(bundleId)
    .then(result => result ? result : error)}

//UPDATE A BUNDLE
module.exports.updateBundle = async (bundleId, reqBody) => {
    const bundleData = {bundleName: reqBody.bundleName, description: reqBody.description, price: reqBody.price, gamesIncluded: reqBody.gamesIncluded}
    return await Bundle.findByIdAndUpdate(bundleId, {$set: bundleData}, {new:true})
    .then(result => result ? result : error)}

//ARCHIVE A BUNDLE
module.exports.archiveBundle = async (bundleId) => {
    return await Bundle.findByIdAndUpdate(bundleId, {$set: {isActive: false}}, {new:true})
    .then(result => result ? result : error)}

//UNARCHIVE A BUNDLE
module.exports.unArchiveBundle = async (bundleId) => {
    return await Bundle.findByIdAndUpdate(bundleId, {$set: {isActive: true}}, {new:true})
    .then(result => result ? result : error)}

//FIND ALL ACTIVE BUNDLES
module.exports.getAllActiveBundles = async () => {
    return await Bundle.find({isActive: true})
    .then(result => result ? result : error)}

//DELETE BUNDLE
module.exports.deleteBundle = async (bundleId) => {
    return await Bundle.findByIdAndDelete(bundleId)
    .then(result => result ? result : error)}