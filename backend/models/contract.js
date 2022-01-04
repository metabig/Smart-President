var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const contractSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    creator: Schema.ObjectId,
    created_at: {
        type: Date,
        required: true
    },
    votes: [Schema.ObjectId]
});

module.exports = mongoose.model('Contract', contractSchema);