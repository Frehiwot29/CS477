const express = require('express');
const path = require('path')
const router = express.Router();
router.post('/user', (req, res, next) => {
    res.send(req.body)
})
router.get('/user', (req, res, next) => {
    console.log('post method')
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html'))
})
module.exports = router;