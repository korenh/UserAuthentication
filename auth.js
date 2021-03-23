require('dotenv').config()
const bcrypt = require('bcrypt');
const Client = require('mongodb').MongoClient;
const config = require('./config.json')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.post('/register',(req,res) => {
    Client.connect(config.URL ,  { useUnifiedTopology: true } ,(err, db) => {
        if (err) return res.status(500)
        bcrypt.hash(req.body.password, 10 , (err, password) => {
        db.db(config.DB).collection(config.COLL).insertOne({
            name:req.body.name,
            email:req.body.email,
            password:password
        }
        ,(err, res) => {
          if (err) return res.status(500)
          db.close();
        })})
        res.status(200).json(config.SUCCESS)
    });
});

router.post('/login',(req,res) => {
    Client.connect(config.URL , { useUnifiedTopology: true },(err, db) => {
        if (err) return res.status(500)
        db.db(config.DB).collection(config.COLL).find({email:req.body.email}).toArray((err, result) => {
            db.close();
            if (err) return res.status(401)
            result.length===0? res.status(401).json(config.FAIL[1]):
            bcrypt.compare(req.body.password, result[0].password , (err, bcryptStatus) => {
                if (!bcryptStatus) return res.status(401).json(config.FAIL[0])
                const access_token = jwt.sign({name:req.body.email} , process.env.ACCESS_TOKEN_SECRET , {expiresIn: config.JWT_EXPIRES})
                res.status(200).json({access_token:access_token})
            });
        });
    });
});

router.post('/verify' , (req,res) => {
    jwt.verify(req.body.access_token , process.env.ACCESS_TOKEN_SECRET , (err,user)=>{
        if (err) return res.status(401)
        res.status(200).json(user);
    })
})


module.exports = router
