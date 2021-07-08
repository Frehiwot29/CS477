/**
 * Download the start-up project lesson05-server and lesson05-client projects or you create everything from scrtach.
 * Run "npm install" under lesson05-server to get express package installed.
 * Implement the features below inside lesson05-server REST applicaiton
 * CRUD(create, read, update, delete) books: make sure you use the proper URLs and HTTP Methods
 * A book has properties: id, title, ISBN, publishedDate, author
 * make proper changes in js files to implement the step 1 features
 * Use Postman to test your REST APIs
 */
let books = [];
module.exports = class Book {
    constructor(id, title, isbn, publishedDate, author) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.author = author;
    }
    save() {
        this.id = Math.random().toString();
        books.push(this);
        return this;
    }
    update() {
        const index = books.findIndex(p => p.id === this.id);
        if (index > -1) {
            books.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }
    }
    static fetchAll() {
        return books;
    }
    static findById(bookId) {
        const index = books.findIndex(p => p.id === bookId);
        if (index > -1) {
            return books[index];
        } else {
            throw new Error('NOT Found');
        }
    }
    static deleteById(bookId) {
        const index = books.findIndex(p => p.id === bookId);
        if (index > -1) {
            books = books.filter(p => p.id !== bookId);
        } else {
            throw new Error('NOT Found');
        }
    }
}