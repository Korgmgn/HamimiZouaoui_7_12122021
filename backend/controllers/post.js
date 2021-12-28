const jwt = require('jsonwebtoken');
const fs = require('fs');
const { sequelize, user, post, comment } = require('../models/index');
const { all } = require('sequelize/dist/lib/operators');

/* exports.createPost = (req, res, next) => {
    const text = req.body.text

    user.findOne({ where: { uuid: req.body.userUuid }})
        .then((user) => {
            let imageUrl = ""
            if (req.file) { imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
            const newPost = new post(
                {
                    userId: user.id,
                    content: req.body.content,
                    image: imageUrl
                }
            )
        
            console.log(newPost)        
            
            post.create(newPost) //utiliser include + voir discord
                .then((newPost) => res.json(newPost))
                .catch(error => res.status(400).json({ error }));
        })
} */

exports.createPost = (req, res, next) => {
    
    console.log(req.file)
    user.findOne({ where: { uuid: req.body.userUuid }})
        .then((user) => {
            console.log('La requete: ', req.body)
                const newPost = db.post.build({ 
                    content: req.body.content, 
                    userId: user.id,
                    image: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : req.body.image
                });
                //console.log(newPost)        
                
                post.save(newPost) //utiliser include + voir discord
                    .then((newPost) => res.json(newPost))
                    .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error: 'Errur dans le .findOne' }));
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

