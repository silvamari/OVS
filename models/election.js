let mongoose = require('mongoose');
///schema

let electionSchema = mongoose.Schema({
  electionName:{
    type : String,
    required: true
  },
  electionSDate:{
    type : String,
    required: true
  },
  electionEDate:{
    type : String,
    required: true
  },
  electionType:{
    type : String,
    required: true
  },
  Rounds:{
    type : Number,
    required: true
  },
  electonRules:{
    type : String
  },
  candidates:[{
    type : String
  }]
});


let Election = module.exports = mongoose.model('Election',electionSchema);
