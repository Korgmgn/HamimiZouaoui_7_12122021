const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/newpost', auth, postCtrl.createPost);
router.put('/modifypost/:uuid', auth, postCtrl.modifyPost);
router.delete('/deletepost/:uuid', auth, postCtrl.deletePost);
router.get('/allposts', auth, postCtrl.getAllPosts);
router.get('/userposts', auth, postCtrl.userPosts);

module.exports = router;