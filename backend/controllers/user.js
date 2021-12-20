const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, user } = require('../models/index');

exports.signup = (req, res, next) => {
    //req.body = { username, email, password }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const newUser =  { username: req.body.username, email: req.body.email, password: hash }
            user.create(newUser)
                .then((newUser) => res.json(newUser))
                    /*res.status(201).json({ message: 'Utilisateur créé !' }))*/
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    //req.body = { email, password }
    user.findOne({ where: { email: req.body.email } })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userUuid: user.uuid,
                    token: jwt.sign(
                        { userUuid: user.uuid },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Empêcher l'envoie de champs vides
exports.modifyUser = (req, res, next) => {
/*     const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;
 */
    user.findOne({ where: { uuid: req.body.userUuid }})
        .then((user) =>
            bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    user.username = req.body.username
                    user.email = req.body.email
                    user.password = hash
                    
                    user.save()
                        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                        .catch(error => res.status(400).json({ error }));
                })
        )
        .catch(error => res.status(400).json({ error }))
}

 exports.delete = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenUserUuid = decodedToken.userUuid;

    user.findOne({ where: { uuid: tokenUserUuid }})
        .then((user) => 
            user.destroy()
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }))
        )
        .catch(error => res.status(403).json({ error: 'Unauthorized request !' }))
}
