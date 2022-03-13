const jwt = require(`jsonwebtoken`)

//CREATE TOKEN WHEN SIGNING IN - return a token
module.exports.createToken = (data) => {
    let userData = {
        id: data._id,
        email: data.email,
        isAdmin: data.isAdmin
    }
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: `15m`})
}

// VERIFY USER WITH TOKEN - verify user token
module.exports.verify = (req, res, next) => {
    const requestToken = req.headers.authorization
    if(requestToken){
        return jwt.verify(requestToken, process.env.ACCESS_TOKEN_SECRET, (error) => {
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
module.exports.decode = (token) => {
    return jwt.decode(token)
}

//VERIFY IF ADMIN METHOD - verify if admin
module.exports.verifyIfAdmin = (req, res, next) => {
    const requestToken = req.headers.authorization
    const admin = jwt.decode(requestToken).isAdmin
    if(requestToken && admin === true){
        return jwt.verify(requestToken, process.env.ACCESS_TOKEN_SECRET, (error) => {
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