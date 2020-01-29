var express = require('express');
var bodyParser = require('body-parser');
var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;

var app = express();
// app.use('/files' ,express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


var url = "mongodb://localhost:27017/";
var db;
var update_id;
MongoClient.connect(url, (err, client) => {

    if(err) throw err;
    else
    db = client.db("mydb");

});



app.get('/', (req, res) => {
    
    res.sendFile('/home/ec2-user/studentdataapp/index.html');
});

app.post('/post-data', (req, res) => {


    db.collection('studentData').insertOne(req.body, (err, result) => {
        if(err) throw err;
        else{
            console.log('saved to database');
            res.redirect('/');
            
        }

    });
});

app.set('view engine', 'ejs');
app.get('/show', (req, res) => {

    var show = db.collection('studentData').find().toArray((err, result) => {
        if(err) throw err;
        else
        res.render('show.ejs', {studentData: result})
      })
});

app.get('/update/:id', (req, res) => {
    update_id=new mongodb.ObjectID(req.params.id);
    db.collection('studentData').find({'_id': new mongodb.ObjectID(req.params.id)}).toArray((err, result) => {
        if(err) throw err;
        else{
            console.log(result);
            res.render('update.ejs', {studentData : result});
        }
    });
    
});

app.post('/update-data', (req, res) => {
    var obj= {
    
        name : req.body.sname,
        fname : req.body.fname,
        uni : req.body.uni,
        dept : req.body.dept,
        degree : req.body.deg,
        cgpa : req.body.cgpa
    };
    db.collection('studentData').update({_id: update_id}, req.body, (err, result) =>{
        if(err) throw err;
        else{
            console.log('saved to database..');
            res.redirect('/show');
        }
    });
    

});

app.get('/delete/:id', (req, res) => {


    db.collection('studentData').deleteOne({_id: new mongodb.ObjectID(req.params.id)}, (err, result) => {
            if (!err)
                res.redirect('/show');
    });
});

var server = app.listen(8999, () =>{

    console.log('Server is running from port 8999');
});

