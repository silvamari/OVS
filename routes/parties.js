var express = require('express');
var router = express.Router();
var prty = require("../controllers/PartyController.js");



router.get('/pAccount',(req,res) =>{
    prty.partyAccount(req,res);
});

router.get('/fElections',(req,res) =>{
    prty.futureElections(req,res);
});

router.get('/parliamentElections',(req,res) =>{
    prty.parElections(req,res);
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
