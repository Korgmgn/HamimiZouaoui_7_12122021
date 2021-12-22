const jwt = require('jsonwebtoken');
const fs = require('fs');
const { sequelize, user, post, comment } = require('../models/index');

exports.createPost = (req, res, next) => {
    //req.body = { content }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    console.log('Je suis arrivé au controller !')
    user.findOne({ where: { uuid: tokenUserUuid }})
        .then((user) => {
            const newPost = { content: req.body.content, userId: user.id };
            console.log(newPost)        
            
            post.create(newPost) //utiliser include + voir discord
                .then((newPost) => res.json(newPost))
                .catch(error => res.status(400).json({ error }));
        })
}

//Uuid du post dans req.params.id
exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    post.findOne({ where: { uuid: req.params.uuid }, include: user})
        .then((post) => {
            if(tokenUserUuid == post.user.uuid){
                post.content = req.body.content
                post.save()
                    .then(() => res.status(200).json({ message: 'Message modifié !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: 'Unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    post.findOne({ where: { uuid: req.params.uuid }, include: user})
        .then((post) => {
            if(tokenUserUuid == post.user.uuid){
                post.destroy()
                    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(403).json({ message: 'Unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
    post.findAll({ include: user })
        .then((posts) => res.json(posts))
        .catch(error => res.status(400).json({ error }));
}

/*Utilise tokenUserUuid mais à remplacer par username (depuis le front ou le stocker dans le token) 
afin que les messages soient accessibles par d'autres utilisateurs */
exports.userPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    user.findOne({ where: { uuid: tokenUserUuid }, include: 'posts' })
        .then((posts) => res.json(posts))
        .catch(error => res.status(400).json({ error }));
}

