const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkAPI';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
