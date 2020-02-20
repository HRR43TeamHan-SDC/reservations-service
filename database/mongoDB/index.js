const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

module.exports = client;