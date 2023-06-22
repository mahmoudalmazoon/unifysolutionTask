const jwt = require("jsonwebtoken")
const userModel = require("../models/User.model")
const { config } = require("../config/default.config");

const signin = async (payload) => {
    try {
        const user = await userModel.findOne({
            $and: [{ $or: [{ username: payload.username }, { email: payload.email }] }]
        }).select("+password")
        if (!user) {
            const err = new Error("not found")
            err.status = 409
            throw err
        }
        const isPasswordMatch = await user.comparePassword(payload.password)
        if (!isPasswordMatch) {
            const err = new Error("password or username wrong")
            err.status = 409
            throw err
        }
        user.password = ""
        return user
    } catch (error) {
        throw error
    }
}

const generateAccessToken = async (user) => {
    try {
        return jwt.sign(
            {
                _id: user._id
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: '30m'
            }
        )
    } catch (error) {
        throw error
    }
}




module.exports = {
    generateAccessToken,
    signin}