//require mongoose
let mongoose = require('mongoose');

//election Schema
let voteSchema = mongoose.Schema({
  electionId:{
    type : String,
    required: true
  },
  round :{
    type: Number,
    default: 1
  },
  candidates:[{
    name: {type :String},
    party : {type : String},
    votes : {type : Number,
        default:0
      }
  }]
});

module.exports = mongoose.model('Vote',voteSchema);
