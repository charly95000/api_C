const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: { type: String, required: true }
        //userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {timestamps: true},
);

module.exports = mongoose.model('Category', categorySchema);