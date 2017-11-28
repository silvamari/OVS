var mongoose = require('mongoose');

var Party = require('../models/Party');
var Election = require('../models/Election');
var Candidate = require('../models/Candidate');
var Request = require('../models/Request');

var PartyController ={};

PartyController.list = (req, res) =>{
    Party.find((err,result)=>{
        if(err) return console.log(err);
        res.render('../views/parties/index', {party:result});
    });
}

PartyController.create = (req, res)=>{
    res.render('../views/parties/createParty');
}


PartyController.edit = (req, res) =>{
    var prty =req.params.id;
    Party.findOne({_id:prty},(err,result) =>{
        if (err) console.log(err);
        res.render('../views/parties/editParty', {party:result});
    });
}
PartyController.update = (req,res)=>{
    //find party and updates to values set by users
    Party.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name,shortName: req.body.shortName, partyLeader: req.body.partyLeader, address: req.body.address, website :req.body.website  }},
        (err) =>{
            if(err) console.log(err);
            console.log('Party is Updated');
            res.redirect('/parties');
        });
}


PartyController.delete =(req, res) =>{
    Party.findByIdAndRemove(req.body.party,(err) =>{
        if(err) console.log(err);
        console.log('Party is deleted');
        res.json({success : "Deleted Successfully", status : 200});
    });
}


PartyController.save = (req, res) =>{
    var prty = new Party();

    prty.name = req.body.name;
    prty.shortName=req.body.shortName;
    prty.partyLeader=req.body.partyLeader;
    prty.address = req.body.address;
    prty.website = req.body.website;


    prty.save((err,result)=>{
        if(err) console.log(err);
        console.log('Added!');
        res.redirect('/parties');
    });
}


PartyController.partyAccount= (req,res)=>{
    res.render('../views/parties/pAccount.ejs');
}

PartyController.nominate = (req,res)=>{
    res.render('../views/parties/nominate.ejs');
}

PartyController.nomPresidential = (req, res) =>{
  Election.find({electionType:"Presidential", status: "active"},(err,result)=>{
     if(err) return console.log(err);
     console.log(result);
    res.render('../views/parties/nominatePresidential', {elections:result});
  });
}

PartyController.nomParlimentary = (req, res) =>{
  Election.find({electionType:"Parliamentary", status: "active"},(err,result)=>{
     if(err) return console.log(err);
     console.log(result);
    res.render('../views/parties/nominateParliamentary', {elections:result});
  });
}

PartyController.showCandidatesToNominate = (req, res) =>{
    Party.find((err,result)=>{
       if(err) return console.log(err);
       res.render('../views/parties/nominateCand', {parties:result});
    });
}

PartyController.showDistricts = (req, res) =>{
    Election.findOne({electionType:'Parliamentary', _id: req.params.id},(err,result)=>{
       if(err) return console.log(err);
       console.log(result.districts);
       Party.find((err,party)=>{
         if (err) console.log(err);
         console.log(result.districts);
           res.render('../views/parties/nominateCandParliment', {districts:result.districts, parties: party});
       });
    });
}


PartyController.myCands = (req, res) =>{
  //had to do this to find out which party since login is not a priority and I need to get a specific list of candidates
       Party.find({},(err,result)=>{
         if (err) {
           console.log(err);
         }
         res.render('../views/parties/myCandidates',{parties : result});
       });
}

PartyController.showPartyCands = (req, res) =>{
  //find actual candidates that are a part of that party now
       Candidate.find({ party: req.body.party },(err,result)=>{
         if (err) {
           console.log(err);
         }
         console.log(result);
        res.json({success : "Candidates fetched", status : 200, candidates : result});
       });
}

PartyController.showPartyCandsPresOnly = (req, res) =>{
  //find actual candidates that are a part of that party now
       Candidate.find({ party: req.body.party, type :"Presidential", approval_status:"not approved" },(err,result)=>{
         if (err) {
           console.log(err);
         }
         console.log(result);
        res.json({success : "Candidates fetched", status : 200, candidates : result});
       });
}

PartyController.showPartyCandsParliOnly = (req, res) =>{
  //find actual candidates that are a part of that party now who are Parliment
       Candidate.find({ party: req.body.party, type :"Parliamentary", approval_status:"not approved" },(err,result)=>{
         if (err) {
           console.log(err);
         }
         console.log(result);
        res.json({success : "Candidates fetched", status : 200, candidates : result});
       });
}

PartyController.sendNomRequest =(req,res) =>{
    //only show candidates not enrolled in election
    var district = req.body.district;
      var election= req.params.id;
    if(district == '' || district === undefined){

      Candidate.findOneAndUpdate({_id:req.body.candidate},{electionId:election},(err,result)=>{
         if(err) return console.log(err);
        res.json({success : "Sucessfully nominated", status : 200});
       });

    }
    else {
      Candidate.findOneAndUpdate({_id:req.body.candidate},{electionId:election, district : district},(err,result)=>{
         if(err) return console.log(err);
        res.json({success : "Sucessfully nominated", status : 200});
       });

      }

}



module.exports = PartyController;
