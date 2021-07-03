const express = require('express');
const path = require('path')
const router = express.Router();
router.use('/error', (req, res, next) => {
    throw new Error()
})

module.exports = router;