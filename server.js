const Client = require('mongodb').MongoClient;
const express = require("express");
const cors = require('cors')
const app = express();
const config = require('./config.json')
app.use(express.json());
app.use(cors())

app.post('/register',(req,res) => {
    console.log(req.data)
    Client.connect(config.URL ,  { useUnifiedTopology: true } ,(err, db) => {
        if (err) throw err;
        db.db(config.DB).collection(config.COLL).insertOne({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        ,(err, res) => {
          if (err) throw err;
          db.close();
        });
        res.status(200).json(config.SUCCESS)
    });
});

app.post('/login',(req,res) => {
    Client.connect(config.URL , { useUnifiedTopology: true },(err, db) => {
        if (err) throw err;
        db.db(config.DB).collection(config.COLL).find({email:req.body.email}).toArray((err, result) => {
            if (err) throw err;
            db.close();
            result.length!==0?
            result[0].password === req.body.password ? res.status(200).json(result[0]) 
            :res.status(401).json(config.FAIL[0])
            :res.status(401).json(config.FAIL[1])
        });
    });
});

app.listen(5000)



