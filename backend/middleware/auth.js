const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userUuid = decodedToken.userUuid;
        if(req.body.userUuid && req.body.userUuid !== userUuid) { //revoir le mail 
            throw 'User ID non valable !';
        } else {
            req.body.userUuid = userUuid;
            next()
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' })
    }
}