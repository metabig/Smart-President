var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const buildingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator: Schema.ObjectId,
  members: [Schema.ObjectId],
  contracts: [Schema.ObjectId]
});

module.exports = mongoose.model('Building', buildingSchema);