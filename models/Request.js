var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var requestSchema = new Schema({
    comments :{type : String},
    candidateId :{ type : String, default: ''},
    electionId:{ type : String, default: ''}
});


module.exports = mongoose.model("Request", requestSchema);
