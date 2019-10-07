var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schoolSchema = mongoose.Schema({
    board: { type: String, default: 'CBSE' },
    affilationNo: { type: String, required: true, unique: true },
    url: { type: String },
    data: Schema.Types.Mixed,
    latlng: {
        lat: String,
        lng: String
    },
    loc: {
        type: { type: String },
        coordinates: []
    },
    
});
module.exports = mongoose.model('exambazaar.schools', schoolSchema); 
