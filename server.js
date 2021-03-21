const Client = require('mongodb').MongoClient;
const config = require('./config.json')
const express = require("express");
const bcrypt = require('bcrypt');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

app.post('/register',(req,res) => {
    Client.connect(config.URL ,  { useUnifiedTopology: true } ,(err, db) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, 10 , (err, password) => {
        db.db(config.DB).collection(config.COLL).insertOne({
            name:req.body.name,
            email:req.body.email,
            password:password
        }
        ,(err, res) => {
          if (err) throw err;
          db.close();
        })})
        res.status(200).json(config.SUCCESS)
    });
});

app.post('/login',(req,res) => {
    Client.connect(config.URL , { useUnifiedTopology: true },(err, db) => {
        if (err) throw err;
        db.db(config.DB).collection(config.COLL).find({email:req.body.email}).toArray((err, result) => {
            db.close();
            if (err) throw err;
            result.length===0? res.status(401).json(config.FAIL[1]):
            bcrypt.compare(req.body.password, result[0].password , (err, bcryptStatus) => {
                bcryptStatus?res.status(200).json(result[0]):res.status(401).json(config.FAIL[0])
            });
        });
    });
});

app.listen(5000)



