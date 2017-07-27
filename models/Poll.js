const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const pollSchema = new mongoose.Schema({
    title: {type: String, trim: true, required: 'Please enter a title for poll'},
    author: String,
    options: [{option: String, count: Number}]
});

module.exports = mongoose.model('Poll', pollSchema);