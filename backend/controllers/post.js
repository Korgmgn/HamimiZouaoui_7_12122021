const jwt = require('jsonwebtoken');
const fs = require('fs');
const { sequelize, user, post, comment } = require('../models/index');
const { all } = require('sequelize/dist/lib/operators');

exports.createPost = (req, res, next) => {
    user.findOne({ where: { uuid: req.body.userUuid }})
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
    post.findOne({ where: { uuid: req.params.uuid }, include: user})
        .then((post) => {
            if(req.body.userUuid == post.user.uuid){
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
    post.findOne({ where: { uuid: req.params.uuid }, include: user})
        .then((post) => {
            if(req.body.userUuid == post.user.uuid){
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
    post.findAll({ include: [{ all: true }] })
        .then((posts) => res.json(posts))
        .catch(error => res.status(400).json({ error }));
}

exports.userPosts = (req, res, next) => {
    user.findOne({ where: { uuid: req.params.useruuid }, include: [{ all: true }] })
        .then((user) => res.json(user))
        .catch(error => res.status(400).json({ error }));
}

