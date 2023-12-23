const express = require('express'); 

const app = express();

const port = 3000;

app.get('/api', function(req, res) {
    res.send('api');
})

app.get('/', function (req, res) { 
    res.send('Hello, world!');
})

app.listen(3000, function () { 
    console.log(`Server running on port ${port}`);
})