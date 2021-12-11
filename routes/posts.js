var express = require('express');
var router = express.Router();
var { getPost, createPost, updatePost, deletePost, updatePostLike } = require('../controllers/PostController.js');

/* GET users listing. */
router.get('/', getPost);
router.post('/create', createPost);
router.post('/update', updatePost);
router.post('/update', updatePost);
router.post('/update_like', updatePostLike);
router.post('/delete', deletePost);

module.exports = router;
