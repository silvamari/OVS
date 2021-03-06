var mongoose = require('mongoose');


//includes necesary models
var Election = require('../models/Election');
var Candidate = require('../models/Candidate');
var Vote = require('../models/Vote');
var DistrictVote = require('../models/DistrictVote');
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

  //only show candidates not enrolled in election
 Candidate.find({electionId:election, approval_status:"not approved"},(err,result)=>{
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

electionController.deleteElection =(req, res) =>{
  Election.findByIdAndRemove(req.body.election,(err) =>{
    if(err) console.log(err);


  //deletes votes associated with the election too
    Vote.remove({electionId:req.body.election},(err) =>{
        if(err) console.log(err);
        console.log("Votes were deleted");
      });

    console.log('Election deleted');
    res.json({success : "Deleted Successfully", status : 200});
  });
}


electionController.enrollCandidates =(req, res) =>{

    var election= req.params.id;
    var candidate = req.body.CandidateId;

    Candidate.findOneAndUpdate(
   {_id: candidate},
   {approval_status: "approved"},(err)=>{
      if(err) console.log(err);
      console.log('Enrolled');
      res.json({success : "Updated Successfully", status : 200});
   });


}


electionController.editVoter = (req,res) =>{
  //show voter credentials to be updated
  var voter =req.params.id;
  Voter.findOne({_id:voter},(err,result) =>{
      if (err) console.log(err);
        res.render('../views/elections/editVoter', {voter:result});
  });
}


electionController.updateVoter = (req,res)=>{
  //find voter and updates to values set by users
  Voter.findByIdAndUpdate(req.params.id, { $set: { firstName: req.body.fName, lastName : req.body.lName, email : req.body.email, dob : req.body.dob,
      district : req.body.district,
      address : req.body.address}},
    (err) =>{
      if(err) console.log(err);
      console.log('Voter Updated');
      res.redirect('/elections/voters');
    });
}


electionController.showRegVoter =(req,res) =>{
    res.render('../views/elections/regVoter.ejs');
}

electionController.createVoter =(req,res) =>{
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
      res.redirect('/elections/voters');
      }
    });
}

electionController.deleteVoter =(req,res)=>{
  Voter.findByIdAndRemove(req.body.voter,(err) =>{
    if(err) console.log(err);
    console.log('Voter deleted');
    res.json({success : "Deleted Successfully", status : 200});
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

//logs election data and resets it
electionController.calParliResults = (req,res)=>{
    //election id
    var election = req.params.id;

      Election.findOne({_id: election},(err, findElection)=>{


          for(var x = 0; x < findElection.districts.length; x++){

                let votes = new DistrictVote();
                votes.districtName = findElection.districts[x].name;
                //election id
                votes.electionId =  election;

                Candidate.find({electionId: election, district : findElection.districts[x].name})
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
               });


      }
      //remember to uncomment
      //resets candidate values
      Candidate.updateMany({electionId: election},{ $set: { "votes" : 0, "electionId" : '', district : '', approval_status :'not approved' } },(err)=>{
       if (err) console.log(err);
        console.log('Candidates value resetted!');
      });
      res.redirect('/elections/');
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
     res.render('../views/elections/votersList', {voters: result});
});
}

electionController.save = (req, res) =>{
  //check for appropriate election type and save accordingly
  var tempDistrict = req.body.districts;
  let election = new Election();
      var districts =[];
        if(req.body.electionType == 'Parliamentary'){
          console.log('I came in here');
          for (var i = 0; i < tempDistrict.length; i++) {
              districts.push({name:tempDistrict[i]});

          }
          election.districts = districts;
          console.log(districts);
        }
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
