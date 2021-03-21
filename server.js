const Client = require('mongodb').MongoClient;
const config = require('./config.json')
const express = require("express");
const auth = require('./auth')
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())
app.use('/auth', auth);

app.listen(config.PORT)



