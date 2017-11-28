var express = require('express');
var router = express.Router();
var election = require("../controllers/ElectionController.js");

router.get('/',(req,res)=>{
    election.list(req,res);
});

router.post('/',(req,res)=>{
    election.endElection(req,res);
});

router.put('/',(req,res)=>{
    election.deleteElection(req,res);
});


router.get('/create', (req, res) =>{
  election.create(req,res);
});

router.post('/save', (req, res) =>{
  election.save(req,res);
});


router.get('/voters',(req, res)=>{
    election.voterList(req,res);
});

router.post('/voters',(req, res)=>{
  //this route deletes a voter
    election.deleteVoter(req,res);
});

router.get('/voters/createVoter',(req, res)=>{
    election.showRegVoter(req,res);
});

router.post('/voters/createVoter',(req, res)=>{
  //this route deletes a voter
    election.createVoter(req,res);
});

router.post('/voters/edit/:id',(req, res)=>{
    election.updateVoter(req,res);
});

router.get('/voters/edit/:id',(req, res)=>{
    election.editVoter(req,res);
});

router.get('/enroll/:id',(req, res)=>{
    election.enroll(req,res);
});

router.post('/enroll/:id',(req, res)=>{
  election.enrollCandidates(req, res);
});

router.get('/calResults/:id', (req, res)=>{
  election.calResults(req,res);
});

router.post('/calResults/:id',(req,res)=>{
  election.createRound(req,res);
});



module.exports = router;
