const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { CLIENT_URl } = require("../keys");
const User = mongoose.model("User");
const crypto = require('crypto');
const console = require("console");
const bcrypt = require("bcrypt");


const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "***********************************",
    },
  })
);

router.post("/signup", async (req, res) => {
  // console.log(req.body)
  const { email, password, username } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).send({ error: "user already exist....!" });
    }
  });
  const token = jwt.sign({ email, password, username }, jwtkey);
  transporter.sendMail({
    to: email,
    from: "abhilashbairi9908@gmail.com",
    subject: "Signup succesfull",
    html: `<h1>Welcome to CovidTracker</h1>
               <p>${CLIENT_URl}/activate/${token}</p>`,
  });
  res.status(200).send({ message: "Activation link has been sent" });

  //
});
router.post("/activate", async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, jwtkey, function (err, decoded) {
      if (err) {
        return res.status(400).send({ error: "Inccorect" });
      }
      const { username, email, password } = decoded;
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          return res.status(400).send({ error: "user already exist....!" });
        }
        let newUser = new User({ email, password, username });
        newUser.save((err, sucess) => {
          if (err) {
            return res.status(400).send({ error: err });
          }
          const token = jwt.sign({ email }, jwtkey);
          return res.send({ token });
          return res.status(200).send({ message: "singup succesfull" });
        });
      });
    });
  } else {
    return res.status(400).send({ error: "something went wrong" });
  }
});




router.post('/resetpassword',(req, res) => {
      crypto.randomBytes(3,(err,buffer) => {
        if (err) {
          console.log(err);
        }
        const token=buffer.toString("hex");
        User.findOne({email:req.body.email})
        .then((user) => {
          if(!user)
          {
            res.status(401).send({ error: "User doesn't exist" });
          }
          user.resetToken = token;
          user.expireToken = Date.now() +3600000
          user.save().then((result)=>{
            transporter.sendMail({
                to:user.email,
                from:"abhilashbairi9908@gmail.com",
                subject:"password reset",
                html:`
                <p>You requested for password reset</p>
                <p>${CLIENT_URl}/reset/${token}</p>`
                
            })
            res.json({message:"check your email"})
        })
        })

      })
})

router.post('/newpassword',(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = newPassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})
router.post('/signin',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
     return res.status(422).json({error:"please add email or password"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
      if(!savedUser){
         return res.status(422).json({error:"Invalid Email or password 1"})
      }
      bcrypt.compare(password,savedUser.password)
      .then(doMatch=>{
          if(doMatch){
            const token = jwt.sign({ _id:savedUser._id }, jwtkey);
            res.send({ token });
              // res.json({message:"successfully signed in"})
            //  const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            //  const {_id,name,email,followers,following,pic} = savedUser
            //  res.json({token,user:{_id,name,email,followers,following,pic}})
          }
          else{
              return res.status(422).json({error:"Invalid Email or password 2"})
          }
      })
      .catch(err=>{
          console.log(err)
      })
  })
})



// router.post("/signin", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).send({ error: "Must provide email and password 1" });
//   }
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).send({ error: "Must provide email and password 2" });
//   }
//   try {
//     await user.comparePassword(password);
//     // user.compare(password)
//     const token = jwt.sign({ userId: user._id }, jwtkey);
//     res.send({ token });
//   } catch (err) {
//     return res.status(400).send({ error: "Must provide email and password 3" });
//   }
// });



module.exports = router;
