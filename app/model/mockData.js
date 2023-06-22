'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const MockDataSchema = new mongoose.Schema({
    rescId: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      default: '',
    },
    isPriority: {
      type: Boolean,
      default: false,
    },
    jsonData: {
      type: String,
      default: '',
    },
  });
  MockDataSchema.set('timestamps', true);

  return mongoose.model('mock_data', MockDataSchema);
};
