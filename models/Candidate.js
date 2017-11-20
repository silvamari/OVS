var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var candidateSchema = new Schema({
    name: {type: String},
    type: {type: String},
    address: {type : String},
    party: {type : String},
    votes: {type: Number, default:0},
    electionId:{ type :String, default: ''}
})

module.exports = mongoose.model("Candidate", candidateSchema);
