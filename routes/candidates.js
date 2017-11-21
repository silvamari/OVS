var express = require('express');
var router = express.Router();
var cand = require("../controllers/candidateController.js");

router.get('/',(req,res)=>{
    cand.list(req,res);
});
router.post('/',(req,res)=>{
    cand.delete(req,res);
});

router.get('/create',(req,res)=>{
  cand.create(req,res);
});


router.post('/save', (req,res)=>{
  cand.save(req,res);
});

router.get('/edit/:id', (req, res) =>{
  cand.edit(req,res);
});

router.post('/edit/:id',(req,res)=>{
  cand.update(req,res);
});

module.exports = router;
