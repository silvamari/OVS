var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var candidateSchema = new Schema({
    name: {type: String},
    type: {type: String},
    address: {type : String},
    party: {type : String},
    votes: {type: Number, default:0},
    approval_status :{type:String, default :'not approved'},
    district :{ type: String, default:''},
    electionId:{ type :String, default: ''}
})

module.exports = mongoose.model("Candidate", candidateSchema);
