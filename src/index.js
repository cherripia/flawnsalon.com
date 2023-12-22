const express = require('express'); 

const app = express(); 

app.get('/', function (req, res) { 
    res.send("Hello World!, I am server created by expresss"); 
})

app.listen(3000, function () { 
    console.log("server started"); 
})