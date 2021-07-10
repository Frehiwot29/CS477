/**
 * Download the start-up project lesson05-server and lesson05-client projects or you create everything from scrtach.
 * Run "npm install" under lesson05-server to get express package installed.
 * Implement the features below inside lesson05-server REST applicaiton
 * CRUD(create, read, update, delete) books: make sure you use the proper URLs and HTTP Methods
 * A book has properties: id, title, ISBN, publishedDate, author
 * make proper changes in js files to implement the step 1 features
 * Use Postman to test your REST APIs
 */
const { ObjectID } = require('mongodb');
const getDb = require('../utils/database').getDb;
module.exports = class Book {
    constructor(id, title, isbn, publishedDate, author) {
        this._id = id;
        this.title = title;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.author = author;
    }
    save() {
        return getDb().collection('books').insertOne(this);
    }
    update() {
        return getDb().collection('books').updateOne({ _id: new ObjectID(this._id) },
            { $set: { title: this.title, isbn: this.isbn, publishedDate: this.publishedDate, author: this.author } });
    }
    static fetchAll() {
        return getDb().collection('books').find();
    }
    static findById(bookId) {
        return getDb().collection('books').findOne({ _id: new ObjectID(bookId) });
    }
    static deleteById(bookId) {
        return getDb().collection('books').deleteOne({ _id: new ObjectID(bookId) });
    }
}