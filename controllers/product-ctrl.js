const Product = require('../models/product');
const fs = require('fs');

exports.createProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    imageUrl: `http://localhost:8000/images/${req.file.filename}`,
    price: req.body.price
  });
  console.log(product)
  product.save().then(
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

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  })//.populate('userId')
  .then(product => {
    res.status(200).json(product)
  })
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyProduct = (req, res, next) => {
  
  const product = new Product({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: `http://localhost:8000/images/${req.file.filename}`,
    price: req.body.price
  });
  Product.updateOne({_id: req.params.id}, product).then(
    () => {
      res.status(201).json({
        message: 'Product updated successfully!'
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

exports.deleteProduct = (req, res, next) => {
  Product.findOne({_id : req.params.id})
  .then(product =>{
    const filename = product.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
      Product.deleteOne({_id: req.params.id}).then(
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

exports.getAllProducts = (req, res, next) => {
  Product.find()
  .then(
    (products) => {
      res.status(200).json(products);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};