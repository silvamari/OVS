var mongoose = require('mongoose');

var Election = require('../models/Election');
var Candidate = require('../models/Candidate');
var Vote = require('../models/Vote');
var Voter = require('../models/Voter');

var electionController ={};

electionController.list = (req, res) =>{
   Election.find((err,result)=>{
      if(err) return console.log(err);
      res.render('../views/elections/index', {elections:result});
   });
}

electionController.create = (req, res) =>{
    res.render('../views/elections/createElection');
}


electionController.enroll = (req, res)=>{
  var election= req.params.id;
  //console.log(election);

  //only show candidates not enrolled in election
 Candidate.find({electionId:{'$ne':election}},(err,result)=>{
    if(err) return console.log(err);
    res.render('../views/elections/showCandList', {candidates:result});
  });

}

electionController.endElection = (req,res) =>{
  var election = req.body.endElectId;

  Election.findOneAndUpdate(
 {_id:election },
 {status:'ended'},(err)=>{
    if(err) console.log(err);
    console.log('Election ended');
    res.json({success : "Updated Successfully", status : 200});
 });
}


electionController.enrollCandidates =(req, res) =>{

    var election= req.params.id;
    var candidate = req.body.CandidateId;

    Candidate.findOneAndUpdate(
   {_id: candidate},
   {electionId: election},(err)=>{
      if(err) console.log(err);
      console.log('Enrolled');
      res.json({success : "Updated Successfully", status : 200});
   });


}

//logs election data and resets it
electionController.calResults = (req,res)=>{
    //election id
    var election = req.params.id;
    let votes = new Vote();

    //to get the round of the election
    Election.findOne({_id:election},(err,election)=>{
        votes.round = election.round;
    });


    Candidate.find({electionId: election})
    .sort({votes: -1})
    .exec((err, result)=>{
      if(err) console.log(err);


      var candidates =[];
      //console.log(result[]);
      votes.electionId =  req.params.id;
        for(var i=0; i< result.length; i++ ){
          candidates.push({name:result[i].name, party : result[i].party, votes : result[i].votes});
        }

      votes.candidates = candidates;

      votes.save((err) => {
       if(err) console.log(err);
       console.log('Election votes were logged!');
     });

      //resets candidate values
      Candidate.updateMany({electionId: election},{ $set: { "votes" : 0, "electionId" : '' } },(err)=>{
        if (err) console.log(err);
        console.log('Candidates value resetted!');
      });
      res.render('../views/elections/showResults.ejs',{candidates:result});

   });


}


electionController.createRound = (req,res) =>{
      var election = req.params.id;
      var candidate = req.body.candidates;

      Election.findOneAndUpdate(
     {_id: election},
     {status: 'active', round : 2},(err)=>{
        if(err) console.log(err);
        console.log('Enrolled back in election');

        for(var i=0; i< candidate.length; i++){
             Candidate.update({ _id: candidate[i] },{ $set: { "electionId" : election } },(err)=>{
               if (err) console.log(err);
               console.log('Candidates updated back to election!');
             });
          }


        res.json({success : "Updated Successfully", status : 200});
     });

}

electionController.voterList = (req, res) =>{
    Voter.find({},(err, result) => {
     if (err) return console.log(err);
     console.log(result);
     res.render('../views/elections/votersList', {voters: result});
});
}

electionController.save = (req, res) =>{

        var tempCandName = req.body.candidate;
        var tempCandParty = req.body.candidate_party;
        var candidates =[];


        //fetch form fields
        let election = new Election();
        election.electionName =  req.body.electionName;
        election.electionDate = req.body.electionDate;
        election.electionType = req.body.electionType;

        //saves to database
        election.save((err, result) => {
            if (err) {return console.log(err);}
            else{
            console.log('Saved to database');
            res.redirect('/elections');
            }
          });

}

module.exports = electionController;
