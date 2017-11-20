var mongoose = require('mongoose');

var Candidate = require('../models/Candidate');

var candidateController ={};

candidateController.list = (req, res) =>{
   Candidate.find((err,result)=>{
      if(err) return console.log(err);
      res.render('../views/candidates/index', {candidates:result});
   });
}

candidateController.create = (req, res)=>{
  res.render('../views/candidates/createCandidate');
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
