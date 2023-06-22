'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const SystemSchema = new mongoose.Schema({
    systemName: {
      type: String,
      required: true,
    },
    swaggerApi: {
      type: String,
      default: '',
    },
    host: {
      type: String,
      required: true,
    },
    scheme: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      default: '',
    },
    ip: {
      type: String,
      required: true,
    },
  });
  SystemSchema.set('timestamps', true);

  return mongoose.model('mock_system', SystemSchema);
};
