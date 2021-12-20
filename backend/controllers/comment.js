const jwt = require('jsonwebtoken');
const fs = require('fs');
const { sequelize, user, post, comment } = require('../models/index');


exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    user.findOne({ where: { uuid: tokenUserUuid }})
        .then((user) => {
            const newComment = { content: req.body.content, userId: user.id, postId: req.params.uuid };
            console.log(newComment)
            
            comment.create(newComment)
                .then((newComment) => res.json(newComment))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    comment.findOne({ where: { uuid: req.params.uuid }, include: user})
        .then((comment) => {
            if(tokenUserUuid == comment.user.uuid){
                comment.content = req.body.content
                comment.save()
                    .then(() => res.status(200).json({ message: 'Message modifié !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: 'Unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }));

}

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    comment.findOne({ where: { uuid: req.params.uuid }, include: user})
        .then((comment) => {
            if(tokenUserUuid == comment.user.uuid){
                comment.destroy()
                    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: 'Unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
}