const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/create/:postuuid', auth, commentCtrl.createComment);
router.put('/modify/:commentuuid', auth, commentCtrl.modifyComment);
router.delete('/delete/:commentuuid', auth, commentCtrl.deleteComment);

router.get('/allcomments/:postuuid', auth, commentCtrl.allComments);

module.exports = router;