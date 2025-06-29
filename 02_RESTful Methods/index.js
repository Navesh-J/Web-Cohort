const express = require('express')
const app = express();
const port = 3000;

const users = [{
    name:"John", 
    lungs: [{
        healthy:false
    }]
}];

app.use(express.json());

app.get('/',function(req,res){
    const johnlungs = users[0].lungs;
    let numberOfLungs = johnlungs.length;
    let numberOfHealthyLungs = 0;
    for(let i=0;i<numberOfLungs;i++){
        if(johnlungs[i].healthy)
            numberOfHealthyLungs+=1;
    }
    let numberOfUnhealthyLungs = numberOfLungs - numberOfHealthyLungs;
    res.json({
        numberOfLungs,
        numberOfHealthyLungs,
        numberOfUnhealthyLungs
    })
})


app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].lungs.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done !"
    })
})

app.put('/',function(req,res){
    for(let i=0;i<users[0].lungs.length;i++){
        users[0].lungs[i].healthy = true
    }
    res.json({})
})

app.delete('/',function(req,res){
    const newLungs=[];
    for(let lung of users[0].lungs){
        if(lung.healthy){
            newLungs.push({healthy:true})
        }
    }
    users[0].lungs = newLungs;
    res.json({msg:"Done"})
})
app.listen(port,function(){
    console.log("App Listening on port 3000");
});