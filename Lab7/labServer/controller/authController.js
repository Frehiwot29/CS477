const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Secret = "Asfaw-shopping";
exports.login = async(req, res, next) => {
    try {
        const user = await new User(null,req.body.username, req.body.password, null).login();
        console.log(user);
        if (user) {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, Secret);
            res.json({ accessToken: accessToken});
        } else {
            res.status(200).json({ 'error': 'username or password invalid' });
        }
    } catch (error) {
        next(error);
    }
}
exports.authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, Secret, (err, user) => {
            if (err) {
                return res.status(403).json({ "error": "Forbidden" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ "error": "Unauthorized" });
    }
}
exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ "error": "Forbidden" });
    }
}