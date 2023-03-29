
const jwt = require("jsonwebtoken")

const generateAuthToken = (user) => {
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    },
    secretKey);

}

module.exports = generateAuthToken;