const User = require('../models/user')
const bcrypt = require('bcrypt')

const token = require('../security/token');

exports.signup = (req, res, next) => {//mmmm
  console.log(req.body)
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    console.log('toto9999')
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(200).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(200).json({ error: 'Mot de passe incorrect !' });
            }
            const accessToken = token.generateAccessToken(user._id);
            console.log("build acces "+accessToken)
            const refreshToken = token.generateRefreshToken(user._id)
            console.log("user find")
            res.status(200).json({
              accessToken
            });
          })
          .catch(error => res.status(500).json({ error:"pb" }));
      })
      .catch(error => res.status(500).json({ error:"pb2" }));
  };

  exports.getUser = (req, res, next) => {
    User.findOne({_id: req.userId}).then(
      (user) => {
        res.status(200).json(user);
        console.log("get User info")
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error + "info introuvable"
        });
      }
    );
  };

  exports.getAllUsers = (req, res, next) => {
    User.find()//.populate('userId')
    .then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.addFriend = (req,res, next) =>{
    User.findOneAndUpdate({_id: req.body.userId},{ $push: { friends: req.body.friendId  } })
    .then(
      ()=>
        res.status(200).json({message : 'friend added'})
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

  exports.removeFriend = (req,res, next) =>{
    User.findOneAndUpdate({_id: req.body.userId},{ $pull: { friends: req.body.friendId  } })
    .then(
      ()=>
        res.status(200).json({message : 'friend deleted'})
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }