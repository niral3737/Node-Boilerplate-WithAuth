const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/born2learn');

JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = { mongoose, JWT_SECRET };