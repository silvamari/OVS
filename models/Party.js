var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partySchema = new Schema({
    partyName: {type: String},    
    partyID: {type : String},    
})

module.exports = mongoose.model("Party", partySchema);