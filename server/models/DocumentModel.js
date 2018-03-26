var mongoose = require('mongoose');


const documentSchema = mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Document', documentSchema);