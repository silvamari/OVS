const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://silv:djsilVA2134@ds143707.mlab.com:43707/ovsdb', (err, database) => {
  if (err) return console.log(err);
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000');
  });
});



///intialise app
const app = express();

//model
let Voter = require('./models/user');
let Election = require('./models/election');

//views
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// Body Parser Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

///public folder
app.use(express.static(path.join(__dirname,'public')));

//home route
app.get('/',function(req, res){
      res.render('index.ejs');
});

//createElection route
app.get('/createElection',function(req, res){
    res.render('createElection.ejs');
});
//login route

app.get('/userlogin', (req, res) => {
  db.collection('elections').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('userlogin.ejs', {elections: result});
  });
});


//show elections
app.get('/adminlogin/manageElection', (req, res) => {
  db.collection('elections').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('manageElection.ejs', {elections: result});
  });
});

//managecandidate default admin route for now
app.get('/adminlogin/manageCandidate',function(req, res){
    res.render('manageCandidate.ejs');
});

//manageVoter
app.get('/adminlogin/manageVoter', (req, res) => {
  db.collection('voters').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('manageVoter.ejs', {voters: result});
  });
});

app.get('/adminlogin/results',function(req, res){
    res.render('results.ejs');
});

//vote route

app.get('/users/vote/:id',function(req, res){
  var ObjectID = require('mongodb').ObjectID;
  var o_id = new ObjectID(req.params.id);
  db.collection('elections').findOne({'_id': o_id},{}, function(err,result) {
      console.log('Result : ' + result);
      if (err) return console.log(err);
      res.render('vote.ejs',{
        election:result
      });
    });
});

app.get('/registerVoter',function(req, res){
    res.render('register.ejs');
});

//add new voter
app.post('/registerVoter', function(req, res) {
      let voter = new Voter();
      voter.firstName =  req.body.fName;
      voter.lastName = req.body.lName;
      voter.email = req.body.email;
      voter.dob = req.body.dob;
      voter.district = req.body.district;
      voter.address = req.body.address;
      voter.password = req.body.password;

      //saves to database
      db.collection('voters').save(voter, (err, result) => {
          if (err) {return console.log(err);}
          else{
          console.log('Saved to database');
          res.redirect('/');
          }
        });



});

app.post('/createElection', function(req, res) {
    //hardcode candidates for now
      var candidates = ["Saaber", "Volvorine", "Bandy"];
      let election = new Election();
      election.electionName =  req.body.electionName;
      election.electionSDate = req.body.electionSDate;
      election.electionEDate = req.body.electionEDate;
      election.electionType = req.body.electionType;
      election.Rounds = req.body.electionRounds;
      election.electionRules = req.body.electionRules;
      election.candidates = candidates;

      //saves to database
      db.collection('elections').save(election, (err, result) => {
          if (err) {return console.log(err);}
          else{
          console.log('Saved to database');
          res.redirect('/adminlogin/manageElection');
          }
        });



});
