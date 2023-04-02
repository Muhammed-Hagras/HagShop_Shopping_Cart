const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
  const token = req.header("x-auth-auth");
  if (!token) return res.status(401).send("Access denied. Not authenticated");

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const User = jwt.verify(token, secretKey);
    req.User = User;

    next();
  } catch (error) {
    res.status(400).send("Access denied. Invalid token");
  }
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if(req.User.isAdmin) {
            next();
        } else {
            res.status(401).send("Access denied. Not admin");
        }
    })
}


module.exports = {
    auth,
    isAdmin
}