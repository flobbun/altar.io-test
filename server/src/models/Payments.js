const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
    name:    {required: true, type: String, unique: true, trim: true},
    ammount: {required: true, type: Number},
    code:    {required: true, type: Number},
    grid:    {required: true, type: Array},
}, {
    timestamps: true
});

module.exports = model('User', paymentSchema);