const { ObjectID } = require('mongodb');
const getDb = require('../utils/database').getDb;

module.exports = class User {
    constructor(id, username, password, role) {
        this._id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    login() {
        return getDb().collection('users').findOne({ username: this.username, password: this.password });
    }
}
//module.exports=User;