const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'cs477-online-Bookshoping';
exports.login = (req, res, next) => {
    const user = new User(req.body.username, req.body.password, null).login();
    console.log(user)
    if (user) {
        const jwtToken = jwt.sign({ username: user.username, role: user.role }, secret);
        console.log(jwtToken)
        res.json({ jwtToken: jwtToken });
    } else {
        res.json({ 'error': 'Invalied username and password' });
    }
}
exports.authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log(authHeader)
    if (authHeader) {
        const jwtToken = authHeader.split(' ')[1];
        jwt.verify(jwtToken, secret, (err, user) => {
            if (err) {
                return res.status(401).json({ "error": "Forbidden" });
            } else {
                req.user = user;
                console.log(user)
                //console.log(user.role)
                next();
            }
        });
    } else {
        res.status(403).json({ "error": "Unauthorized" });
    }
}
exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ "error": "Forbidden" });
    }
}