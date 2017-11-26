var express = require('express');
var router = express.Router();
var voter = require("../controllers/VoterController.js");

//index route for voters
router.get('/',(req,res)=>{
    voter.home(req,res);
});

/* GET users listing. */
router.get('/elections',(req,res)=>{
    voter.list(req,res);
});

router.get('/results',(req,res)=>{
    voter.completedElections(req,res);
});

router.get('/results/:id',(req,res)=>{
    voter.showElectionResults(req,res);
});

router.get('/results/:id/roundTwo',(req,res) =>{
  voter.showRoundTwoResults(req,res);
});

router.get('/myAccount',(req,res) =>{
  voter.showMyAccount(req,res);
});


router.get('/vote/:id',(req,res)=>{
  voter.vote(req,res);
});

router.get('/registerVoter',(req,res)=>{
  voter.register(req,res);
});
router.post('/registerVoter',(req,res)=>{
  voter.registerPost(req,res);
});
router.post('/vote/submitVote',(req,res)=>{
  voter.submitVote(req,res);
});


module.exports = router;
