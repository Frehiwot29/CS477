/**
 * Create a npm project and install Express.js (Nodemon if you want)
 * Change your Express.js app which serves HTML files (of your choice with your content) for “/”, “/users” and “/products”.
 * For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content) in different routers.
 * Add some static (.js or .css) files to your project that should be required by at least one of your HTML files.
 * Customize your 404 page
 * Provide your own error handling
 */
 const express = require('express')
 const path = require('path')
 const user = require('./route/user')
 const product = require('./route/product')
 const error = require('./route/error')
 // const errorHandler=require('./router/errorHandler')
 // const pageNotFound=require('./router/notFound')
 let jsonParam = express.json()
 //req.qury
 //req.parema
 let urlEncoder = express.urlencoded({ extended: true })
 //req.body
 const app = express()
 app.use(urlEncoder)
 app.use(user)
 app.use(product)
 app.use(error)
 app.use((err, req, res, next) => {
     res.sendFile(path.join(__dirname, './', 'views', '500.html'))
 });
 app.use((req, res, next) => {
     res.status(404).sendFile(path.join(__dirname, './', 'views', '404.html'))
 })
 app.listen(3000, () => {
     console.log("listening on port 300")
 })