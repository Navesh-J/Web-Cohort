const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
// const { User } = require("../db");

//handle auth
function userMiddleware(req, res, next) {

  const token = req.headers.authorization;
  const jwtToken = token.split(" ")[1];
  const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
  if (decodedValue.username) {
    next()
  } else {
    res.status(403).json({
      msg: "You are not authenticated"
    })
  }

  // const username = req.headers.username;
  // const password = req.headers.password;
  // User.findOne({
  //   username: username,
  //   password: password,
  // }).then(function (value) {
  //   if (value) {
  //     next();
  //   } else {
  //     res.status(403).json({
  //       msg: "User doesn't exist",
  //     });
  //   }
  // });
}

module.exports = userMiddleware;
