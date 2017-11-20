var express = require('express');
var router = express.Router();
var cand = require("../controllers/candidateController.js");

router.get('/',(req,res)=>{
    cand.list(req,res);
});

router.get('/create',(req,res)=>{
  cand.create(req,res);
});


router.post('/save', (req,res)=>{
  cand.save(req,res);
});



module.exports = router;
