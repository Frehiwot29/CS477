const express = require('express');
const path = require('path')
const router = express.Router();
router.use((err, req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', '500.html'))
});
module.exports = router