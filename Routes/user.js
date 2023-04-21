const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middlewares/check-auth");


const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name
      });

      User.findOne({email:req.body.email}).then(userInDb=>{
        if(userInDb){
          return res.status(401).send({
            message: "User Already Exist"
          })
        }

        user.save().then(result => {
          if(!result){
            return res.status(500).send({
              message: "Error Creating USer"
            })
          }
          res.status(201).send({
            message: "User created Successfully!",
            result: result
          });
      })
        })   
      .catch(err => {
        res.status(500).send({
          error: err
        });
      });;
    })
   
  });


  router.post("/login", (req, res, next) => {
    let fetchedUser;
  
    User.findOne({email:req.body.email}).then(user=>{
      if(!user){
        return res.status(401).send({
          message: "Authentification failed no such user"
        })
      }
      fetchedUser=user;
      return bcrypt.compare(req.body.password, user.password);
    }).then(result=>{
      if(!result){
        return res.status(401).send({
          message: "Auth failed inccorect password"
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "123456789",
        { expiresIn: "1h" }
      );
      res.status(200).send({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(e=>{
      console.log(e)
    })
  })



  router.get("/profile", checkAuth,
  (req, res, next) => {

      User.findOne({ email: req.userDetails.email }).then(user => {
          if (user) {
            
              res.status(200).json({
                  message: "Profile fetched successfully!",
                  profile: user
              });
          } else {
              res.status(404).json({ message: "User not found!" });
          }
      });
  });



module.exports = router