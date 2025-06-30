const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json())
const All_Users = [
  {
    username: "navesh21@gmail.com",
    password: "123",
    name: "Navesh Jaiswal",
  },
  {
    username: "ashutosh@gmail.com",
    password: "123321",
    name: "Ashutost Jaiswal",
  },
  {
    username: "navesh23@gmail.com",
    password: "123123",
    name: "Navesh Jaiswal",
  },
];

function userExists(username, password) {
    for (const user of All_Users) {
        if(user.username === username && user.password === password)
            return true;
    }
    return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our memory DB",
    });
  }

  let token=jwt.sign({username:username},jwtPassword);
  return res.json({
    token,
  })
});
app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000,function(){
    console.log("Server Running")
});
