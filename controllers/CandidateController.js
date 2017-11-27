var mongoose = require('mongoose');

var Candidate = require('../models/Candidate');
var Party = require('../models/Party');

var candidateController ={};

candidateController.list = (req, res) =>{
   Candidate.find((err,result)=>{
      if(err) return console.log(err);
      res.render('../views/candidates/index', {candidates:result});
   });
}

candidateController.create = (req, res)=>{
  Party.find({},(err, result)=>{
    if(err) console.log(err);
    console.log(result);
      res.render('../views/candidates/createCandidate',{ parties : result});
  });
}

candidateController.edit = (req, res) =>{
    var cand =req.params.id;
    Candidate.findOne({_id:cand},(err,result) =>{
        if (err) console.log(err);
          res.render('../views/candidates/editCandidate', {candidate:result});
    });
}
candidateController.update = (req,res)=>{
  //find Camdidate and updates to values set by users
    Candidate.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, party :req.body.party, type :req.body.candidateType  }},
    (err) =>{
      if(err) console.log(err);
      console.log('Canidate Updated');
      res.redirect('/candidates');
    });
}

candidateController.delete =(req, res) =>{
  Candidate.findByIdAndRemove(req.body.candidate,(err) =>{
    if(err) console.log(err);
    console.log('Canidate deleted');
    res.json({success : "Deleted Successfully", status : 200});
  });
}


candidateController.save = (req, res) =>{
    var cand = new Candidate();

    cand.name = req.body.name;
    cand.address = req.body.address;
    cand.party = req.body.party;
    cand.type = req.body.candidateType;

    cand.save((err,result)=>{
      if(err) console.log(err);
      console.log('Added!');
      res.redirect('/candidates');
    });
}





module.exports = candidateController;
