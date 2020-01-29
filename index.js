var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res) => {
    
    res.sendFile('/home/ec2-user/studentdataapp/index.html');
});

app.post('/post-data', (req, res) => {
    var obj= {
    
        name : req.body.sname,
        fname : req.body.fname,
        uni : req.body.uni,
        dept : req.body.dept,
        degree : req.body.deg,
        cgpa : req.body.cgpa
    };
    
    res.send(obj.toString());
    
});

var server = app.listen(8999, () =>{

    console.log('Server is running from port 8999');
});
