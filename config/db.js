const mongoose = require('mongoose')
let _collection;
let _client;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
        
    }
}
var getCollection = function(db, callback) { 
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
          console.log(err);
        } else {
          console.log(names);
        }
        console.log(names)
})
}
module.exports = {connectDB, getCollection}