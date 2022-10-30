const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        categoryId: { type:mongoose.Schema.Types.ObjectId, ref: 'Category' }
    },
    {timestamps: true},
);

module.exports = mongoose.model('Article', articleSchema);