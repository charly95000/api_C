const jwt = require('jsonwebtoken');

exports.generateAccessToken = (userId) => {
    return jwt.sign({ userId },process.env.ACCESS_TOKEN_SECRET_KEY,{ expiresIn: '24h' })
}

exports.generateRefreshToken = (userId) => {
    return jwt.sign({ userId },process.env.REFRESH_TOKEN_SECRET_KEY,{ expiresIn: '24h' })
}