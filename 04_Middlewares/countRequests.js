const express = require('express')
const app = express()
const port = 3000

//Middleware to count number of requests on a server
let count = 0;

function countRequests(req,req,next){
    count+=1;
    console.log("Number of requests = ",count)
    next();
}

app.get('/my-server',countRequests,(req,res)=>{
    res.send(`Hello There <br> Current Number of requests = ${count}`)
})

app.listen(port,function(){
    console.log("Server running on port: ",port);
})