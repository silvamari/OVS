var mongoose = require('mongoose');

var Voter = require('../models/Voter');
var Election = require('../models/Election');
var Candidate = require('../models/Candidate');
var Vote = require('../models/Vote');
var DistrictVote = require('../models/DistrictVote');

var voterController ={};

voterController.home = (req, res) =>{
    res.render('../views/users/index');
}


voterController.list = (req, res) =>{

      Election.find({status:{'$ne':"ended"}},(err,result)=>{
         if(err) return console.log(err);
        res.render('../views/users/elections', {elections:result});
      });

}

voterController.completedElections =(req, res) =>{
  Election.find({status:"ended"},(err,result)=>{
     if(err) return console.log(err);
    res.render('../views/users/results_user', {elections:result});
  });
}
//show user registration page
voterController.register =(req, res) =>{
      res.render('../views/users/register');
}

//registerUser
voterController.registerPost =(req, res) =>{
    let voter = new Voter();
    voter.firstName =  req.body.fName;
    voter.lastName = req.body.lName;
    voter.email = req.body.email;
    voter.dob = req.body.dob;
    voter.district = req.body.district;
    voter.address = req.body.address;
    voter.password = req.body.password;

    //saves to database
  voter.save(voter, (err, result) => {
        if (err) {return console.log(err);}
        else{
        console.log('Saved to database');
        res.redirect('/');
        }
      });

}

voterController.showElectionResults = (req,res)=>{
  //election id
  var election = req.params.id;
  Vote.findOne({ $and :[ {electionId: election}, {round : 1} ] }, (err, result)=>{
    if(err) console.log(err);
    res.render('../views/users/results_user_listing.ejs',{vote:result});

   });
}

voterController.showElectionParliResults = (req,res)=>{
  //election id
  var election = req.params.id;
  DistrictVote.find({electionId: election}, (err, result)=>{
    if(err) console.log(err);
    console.log(result);
    res.render('../views/users/results_parli.ejs',{vote:result});

   });
}



voterController.showRoundTwoResults = (req,res)=>{
  //election id
  var election = req.params.id;
  Vote.findOne({ $and :[ {electionId: election}, {round : 2} ] }, (err, result)=>{
    if(err) console.log(err);

    res.render('../views/users/roundtwo.ejs',{vote:result});
   });
}

voterController.showMyAccount= (req,res)=>{
    res.render('../views/users/myAccount.ejs');
}

voterController.forgetPassword= (req,res)=>{
    res.render('../views/users/forget.ejs');
}



voterController.vote = (req, res) =>{
  var election = req.params.id;

  //Show only candidates that are being enrolled in the election
 Candidate.find({electionId:election, approval_status : 'approved'},(err,result)=>{
    if(err) return console.log(err);
      res.render('../views/users/vote', {candidates:result});
    });
}

voterController.showParliVoters = (req, res) =>{
  var election = req.params.id;
  //Show only candidates that are being enrolled in the election
 Candidate.find({electionId:election, approval_status : 'approved', district:req.body.district},(err,result)=>{
    if(err) return console.log(err);
        res.json({success : "Candidates found for this district", status : 200, candidates:result});
    });
}

voterController.showDistricts =(req, res) =>{
  Election.findOne({_id:req.params.id},(err,result)=>{
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.render('../views/users/districts', {districts:result.districts});
  });
}

voterController.submitVote = (req,res) =>{
  votedCandidate = req.body.candidate;
  //votes for candidate
  Candidate.findOneAndUpdate({ "_id" : votedCandidate },
   { $inc: { "votes" : 1 } },(err)=>{
     if (err) console.log(err);
     console.log('Voted!');
      res.redirect('/users');
   });
}

module.exports = voterController;
