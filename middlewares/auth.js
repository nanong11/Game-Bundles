const jwt = require(`jsonwebtoken`)

//CREATE TOKEN WHEN SIGNING IN - return a token
module.exports.createToken = (data) => {
    let userData = {
        id: data._id,
        email: data.email,
        isAdmin: data.isAdmin
    }
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
}

// VERIFY USER WITH TOKEN - verify user token
module.exports.verify = (req, res, next) => {
    const requestToken = req.headers.authorization
    const token = requestToken.slice(7)
    if(token){
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error) => {
            if(error){
                return error
            }else{
                next()
            }
        })
    }else{
        return false
    }
}

//DECODE TOKEN - decode token
module.exports.decode = (bearerToken) => {
    const token = bearerToken.slice(7)
    return jwt.decode(token)
}

//VERIFY IF ADMIN METHOD - verify if admin
module.exports.verifyIfAdmin = (req, res, next) => {
    const requestToken = req.headers.authorization
    const token = requestToken.slice(7)
    const admin = jwt.decode(token).isAdmin
    if(token && admin === true){
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error) => {
            if(error){
                return error
            }else{
                next()
            }
        })
    }else{
        res.send(false)
    }
}