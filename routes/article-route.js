const express = require('express');
const auth = require('../security/auth');
const router = express.Router();
const multer = require('../upload/multer-config');

const articleCtrl = require('../controllers/article-ctrl');

// router.get('/',auth.usersAuth, articleCtrl.getAllArticles);
router.get('/',articleCtrl.getAllArticles);
router.post('/', multer, articleCtrl.createArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.put('/:id', multer, articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;