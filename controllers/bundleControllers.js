const CryptoJS = require(`crypto-js`)
const auth = require(`../middlewares/auth`)
const Bundle = require(`../models/Bundle`)

// GET ALL BUNDLES
module.exports.getAllBundles = async () => {
    return await Bundle.find()
    .then(result => result ? result : error)}

// CREATE A BUNDLE
module.exports.createBundle = async (reqBody) => {
    const {bundleName, description, gamesIncluded, discount} = reqBody
    let subTotal = 0;
    gamesIncluded.map(game => {
        return subTotal += game.price
    })
    subTotal -= (subTotal * discount)
    const newBundle = new Bundle({bundleName, description, gamesIncluded, discount, subTotal})
    return await newBundle.save()
    .then(result => result ? result : error)}

//FIND A BUNDLE
module.exports.findBundle = async (bundleId) => {
    return await Bundle.findById(bundleId)
    .then(result => result ? result : error)}

//UPDATE A BUNDLE
module.exports.updateBundle = async (bundleId, reqBody) => {
    const {bundleName, description, gamesIncluded, discount} = reqBody
    let subTotal = 0;
    gamesIncluded.map(game => {
        return subTotal += game.price
    })
    subTotal -= (subTotal * discount)
    const bundleData = {bundleName, description, gamesIncluded, discount, subTotal}
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