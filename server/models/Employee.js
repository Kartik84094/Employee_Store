const mongoose = require('mongoose');

module.exports = mongoose.model('Employee', new mongoose.Schema({
    name: String,
    age: Number,
    class: String,
    subjects: [String],
    attendance: { type: Number, default: 0 },
    flagged: { type: Boolean, default: true }
}));
