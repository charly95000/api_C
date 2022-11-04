const express = require('express');
const router = express.Router();
const multer = require('../upload/multer-config');

const productCtrl = require('../controllers/product-ctrl');

// router.get('/',auth.usersAuth, productCtrl.getAllProducts);
router.get('/',productCtrl.getAllProducts);
router.post('/', multer, productCtrl.createProduct);
router.get('/:id', productCtrl.getOneProduct);
router.put('/:id',multer, productCtrl.modifyProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;