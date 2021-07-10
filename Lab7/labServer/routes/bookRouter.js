const express = require('express');
const bookController = require('../controller/bookController');
const authController=require('../controller/authController');

const router = express.Router();
//logged in user
router.get('/', bookController.getBooks);
//logged in user
router.get('/:bookId', bookController.getBookById);
//logged in and has  role admin
router.post('/',authController.authorizeAdmin, bookController.save);
//logged in and has  role admin
router.put('/:bookId',authController.authorizeAdmin, bookController.update);
//logged in and has  role admin
router.delete('/:bookId', authController.authorizeAdmin,bookController.deleteById);

module.exports = router;