const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;  
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
        .then(client => {
            console.log("connect successfully");
            _db = client.db('Lab7');
            callback();
        })
        .catch(err => console.log(err));
}
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error('No Database Found!');
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;