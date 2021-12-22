const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/create/:uuid', auth, commentCtrl.createComment);
router.put('/modify/:uuid', auth, commentCtrl.modifyComment);
router.delete('/delete/:uuid', auth, commentCtrl.deleteComment);

module.exports = router;