'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const IpSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    userIp: {
      type: String,
      required: true,
    },
    enableConnect: {
      type: Boolean,
      default: false,
    },
  });
  IpSchema.set('timestamps', true);

  return mongoose.model('mock_ip', IpSchema);
};
