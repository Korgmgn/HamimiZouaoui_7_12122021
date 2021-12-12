const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, user } = require('../models/index');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser =  { username: req.body.username, email: req.body.username, password: hash }
            console.log(newUser)
            user.create(newUser)
                .then((newUser) => res.json(newUser))
                /*res.status(201).json({ message: 'Utilisateur créé !' }))*/
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}
