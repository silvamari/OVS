let mongoose = require('mongoose');

///schema
let voterSchema = mongoose.Schema({
  firstName:{
    type : String,
    required: true
  },
  lastName:{
    type : String,
    required: true
  },
  email:{
    type : String,
    required: true
  },
  dob:{
    type : String,
    required: true
  },
  district:{
    type : String,
    required: false
  },
  address:{
    type : String,
    required: true
  },
  password:{
    type : String,
    required: true
  }
});


let Voter = module.exports = mongoose.model('Voter',voterSchema);
