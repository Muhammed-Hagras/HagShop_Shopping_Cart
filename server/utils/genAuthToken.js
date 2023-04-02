
const jwt = require("jsonwebtoken")

const generateAuthToken = (user) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },
    secretKey);

}

module.exports = generateAuthToken;