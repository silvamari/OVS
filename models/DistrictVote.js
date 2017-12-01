//require mongoose
let mongoose = require('mongoose');

//election Schema
let voteSchema = mongoose.Schema({
  electionId:{
    type : String,
    required: true
  },
  districtName : {type: String},
  candidates:[{
    name: {type :String},
    party : {type : String},
    votes : {type : Number,
        default:0
      }
  }]
});

module.exports = mongoose.model('DistrictVote',voteSchema);
