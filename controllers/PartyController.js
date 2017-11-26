var mongoose = require('mongoose');


//includes necesary models
var Party = require('../models/Party');
var Candidate = require('../models/Candidate');

var partyController ={};

partyController.list = (req, res) =>{
   Party.find((err,result)=>{
      if(err) return console.log(err);
      res.render('../views/parties/index', {parties:result});
   });
}

partyController.save =(req,res) =>{
    let party = new party();
    party.partyName =  req.body.partyName;
    party.partyID = req.body.partyID;

  //saves to database
  partyController.save = (req, res) =>{
      if (err) {return console.log(err);}
            else{
            console.log('Saved to database');
            res.redirect('/');//parties
          }
          };

}


        



module.exports = partyController;
