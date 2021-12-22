const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userUuid = decodedToken.userUuid;
        if(req.body.userUuid && req.body.userUuid !== userUuid) { //revoir le mail
            console.log('Je suis arrivé dans le try auth.js !')
            throw 'User ID non valable !';
        } else {
            console.log('Je suis arrivé dans le else auth.js !')
            req.body.userUuid = userUuid;
            next()
        }
    } catch (error) {
        console.log('Je suis arrivé dans le catch auth.js !')
        res.status(401).json({ error: 'Requête non authentifiée !' })
    }
}