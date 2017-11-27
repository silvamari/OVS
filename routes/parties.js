var express = require('express');
var router = express.Router();
var prty = require("../controllers/PartyController.js");



router.get('/pAccount',(req,res) =>{
    prty.partyAccount(req,res);
});

router.get('/nominate',(req,res) =>{
    prty.nominate(req,res);
});

router.get('/nominate/Parlimentary',(req,res) =>{
    prty.nomParlimentary(req,res);
});

router.get('/nominate/Presidential',(req,res) =>{
    prty.nomPresidential(req,res);
});

router.get('/nominate/Presidential/:id',(req,res)=>{
    prty.showCandidatesToNominate(req,res);
});

router.post('/nominate/Presidential/:id',(req,res)=>{
    prty.showPartyCandsPresOnly(req,res);
});

router.put('/nominate/Presidential/:id',(req,res)=>{
    prty.sendNomRequest(req,res);
});

router.get('/myCandidates',(req,res)=>{
    prty.myCands(req,res);
});

router.post('/myCandidates',(req,res)=>{
    prty.showPartyCands(req,res);
});



router.get('/',(req,res)=>{
    prty.list(req,res);
});
router.post('/',(req,res)=>{
    prty.delete(req,res);
});

router.get('/create',(req,res)=>{
    prty.create(req,res);
});


router.post('/save', (req,res)=>{
    prty.save(req,res);
});

router.get('/edit/:id', (req, res) =>{
    prty.edit(req,res);
});

router.post('/edit/:id',(req,res)=>{
    prty.update(req,res);
});

module.exports = router;
