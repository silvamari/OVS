var express = require('express');
var router = express.Router();
var election = require("../controllers/ElectionController.js");

router.get('/',(req,res)=>{
    election.list(req,res);
});

router.post('/',(req,res)=>{
    election.endElection(req,res);
});


router.get('/create', (req, res) =>{
  election.create(req,res);
});

router.post('/save', (req, res) =>{
  election.save(req,res);
});

router.get('/enroll/:id',(req, res)=>{
    election.enroll(req,res);
});

router.get('/voters',(req, res)=>{
    election.voterList(req,res);
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
