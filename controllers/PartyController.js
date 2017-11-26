var mongoose = require('mongoose');

var Party = require('../models/Party');

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





module.exports = PartyController;
