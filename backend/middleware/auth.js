const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.body)
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userUuid = decodedToken.userUuid;
        const adminStatus = decodedToken.isAdmin;
        if(req.body.userUuid && req.body.userUuid !== userUuid) {
            throw 'User ID non valable !';
        } else {
            req.body.userUuid = userUuid;
            req.body.isAdmin = adminStatus;
            next()
        }
    } catch (error) {
        console.log('Je peux pas aller plus loin')
        res.status(401).json({ error: 'Requête non authentifiée !' })
    }
}