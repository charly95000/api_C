const jwt = require('jsonwebtoken');
const User = require('../models/user')
const token = require('../security/token');

module.exports.usersAuth = (req, res , next) =>{
  try{
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const userId = decodedToken.userId;
    console.log(req.body.userId)
    console.log("userId : "+userId)
    if(req.body.userId && req.body.userId !== userId){
      console.log('diff')
      res.status(401).json({
        message: 'User invalid'
      });
    }else{
      console.log('next')
      req.userId = userId
      next();
      
    }
  }catch(e){
    console.log('auth catch')
    console.log(e)
    res.status(401).json({
      message : 'Invalid request'
    })
  }
}

module.exports.userAuth = (req, res , next) =>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if(req.body.userId && req.body.userId !== userId){
      res.status(401).json({
        message: 'User invalid'
      });
    }else{
      User.findOne({ _id: userId })
      .then(user =>{
        if(userId === req.params.id || user.friends.indexOf(req.params.id) != -1){
          next();
        }else{
          res.status(401).json({
            message: 'it\'s not your friend '
          });
        }
      })
      .catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
      
    }
  }catch{
    res.status(401).json({
      message : 'Invalid request'
    })
  }
}



exports.refreshToken = (req,res) => {
  try{
    console.log("request to refreshToken !!!!")
  const refreshToken = req.headers.authorization.split(' ')[1]
  if(refreshToken == null) return res.sendStatus(401)
  const decodedToken=jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY); 
  const userId = decodedToken.userId;
  console.log("userid by refresh token : "+userId)
    const newToken = token.generateAccessToken(userId)
    res.status(200).json({accessToken : newToken})
  }
  catch{
    console.log('refresh catch')
    res.status(401).json({
      message : 'Invalid request'
    })
  }
  
  // TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
}