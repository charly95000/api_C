const Article = require('../models/article');
const fs = require('fs');

exports.createArticle = (req, res, next) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    imageUrl: `https://apiprojetreact.herokuapp.com/images/${req.file.filename}`,
    categoryId: req.body.categoryId
  });
  console.log(article)
  article.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneArticle = (req, res, next) => {
  Article.findOne({
    _id: req.params.id
  })//.populate('userId')
  .then(article => {
    res.status(200).json(article)
  })
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyArticle = (req, res, next) => {
  
  const article = new Article({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: `https://apiprojetreact.herokuapp.com/images/${req.file.filename}`,
    //userId: req.body.userId
  });
  Article.updateOne({_id: req.params.id}, article).then(
    () => {
      res.status(201).json({
        message: 'Article updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteArticle = (req, res, next) => {
  Article.findOne({_id : req.params.id})
  .then(article =>{
    const filename = article.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
      Article.deleteOne({_id: req.params.id}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    })
  }).catch((error) => {res.status(500).json({error : error})})
  
};

exports.getAllArticles = (req, res, next) => {
  Article.find().populate('categoryId')
  .then(
    (articles) => {
      res.status(200).json(articles);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};