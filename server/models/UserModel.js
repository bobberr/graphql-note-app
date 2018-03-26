var mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: String,
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    }]
});

module.exports = mongoose.model('User', userSchema);