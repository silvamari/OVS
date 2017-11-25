var express = require('express');
var router = express.Router();
var party = require("../controllers/PartyController.js");

router.get('/',(req,res)=>{
    party.list(req,res);
});

router.post('/',(req,res)=>{
    party.save(req,res);
});

module.exports = router;



