const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
// const { Admin } = require("../db");

//handle auth
function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const jwtToken = token.split(" ")[1];
  const decodedValue = jwt.verify(jwtToken,JWT_SECRET)
  if(decodedValue.username){
    next()
  }else{
    res.status(403).json({
      msg:"You are not authenticated"
    })
  }

  // const username = req.headers.username;
  // const password = req.headers.password;

  // Admin.findOne({
  //   username: username,
  //   password: password,
  // }).then(function (value) {
  //   if (value) {
  //     next();
  //   }else{
  //       res.status(403).json({
  //           msg:"Admin doesn't exist"
  //       })
  //   }
  // });
}

module.exports = adminMiddleware;
