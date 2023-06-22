'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RescSchema = new Schema({
    rescName: {
      type: String,
      default: '',
    },
    rescPath: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    system: {
      type: Schema.Types.ObjectId,
      ref: 'mock_system',
      required: true,
    },
    isProxy: {
      type: Boolean,
      default: false,
    },
    mockData: {
      type: String,
      default: '',
    },
  });
  RescSchema.set('timestamps', true);

  return mongoose.model('mock_resc', RescSchema);
};
