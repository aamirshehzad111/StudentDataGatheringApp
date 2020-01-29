var express = require('express');
var app = express();

app.get('/', (req, res) => {
    
    res.sendFile('/home/ec2-user/studentdataapp/index.html');
});

var server = app.listen(8999, () =>{

    console.log('Server is running from port 8999');
});
