var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partySchema = new Schema({

    name: {type: String},
    shortName:{type:String},
    partyLeader:{type:String},
    address: {type : String},
    website:{type:String},
    electionId:{ type :String, default: ''}
})


module.exports = mongoose.model("Party", partySchema);
