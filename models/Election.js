//require mongoose
let mongoose = require('mongoose');

//election Schema
let electionSchema = mongoose.Schema({
  electionName:{
    type : String,
    required: true
  },
  electionDate:{
    type : String,
    required: true
  },
  electionType:{
    type : String,
    required: true
  },
  round :{
    type: Number,
    default:1
  },
  totalVotes:{
    type:Number,
    default:0
  },
  status:{
    type:String, default:'active'
  },
  districts:[{
    name: {type :String},
    }]
});

module.exports = mongoose.model('Election',electionSchema);
