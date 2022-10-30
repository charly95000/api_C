const Category = require('../models/category');

exports.createCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    //userId: req.body.userId
  });
  console.log(category)
  category.save().then(
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

exports.getOneCategory = (req, res, next) => {
  Category.findOne({
    _id: req.params.id
  })//.populate('userId')
  .then(category => {
    res.status(200).json(category)
  })
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyCategory = (req, res, next) => {
  
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
    //userId: req.body.userId
  });
  Category.updateOne({_id: req.params.id}, category).then(
    () => {
      res.status(201).json({
        message: 'Category updated successfully!'
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

exports.deleteCategory = (req, res, next) => {

    
      Category.deleteOne({_id: req.params.id}).then(
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
  
  
};

exports.getAllCategories = (req, res, next) => {
  Category.find()//.populate('userId')
  .then(
    (categories) => {
      res.status(200).json(categories);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};