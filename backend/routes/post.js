const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/create', auth, postCtrl.createPost);
router.put('/modify/:postuuid', auth, postCtrl.modifyPost);
router.delete('/delete/:postuuid', auth, postCtrl.deletePost);

router.get('/allposts', auth, postCtrl.getAllPosts);
router.get('/userposts/:useruuid', auth, postCtrl.userPosts);

module.exports = router;