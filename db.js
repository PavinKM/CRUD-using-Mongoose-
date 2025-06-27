// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId
const mongoose = require('mongoose')

let database

async function getDatabase() {
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    // database = client.db('library')

    // if(!database){
    //     console.log('Database not connected')
    // }

    // return database

    mongoose.connect('mongodb+srv://pavinkm:'+encodeURIComponent('@Test20')+'@cluster0.vqvjq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // mongodb://127.0.0.1:27017/library 
    // mongodb+srv://pavinkm:<db_password>@cluster0.vqvjq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    .then(()=> {
        console.log('Database Connected!')
    })
    .catch((err)=>{
        console.log('Database Connection Error!', err)
    })
}
module.exports = { getDatabase }
// module.exports = { getDatabase, ObjectID }



// const mongoose = require('mongoose')
// let database
// async function getDatabase() {
//  mongoose.connect('mongodb+srv://pavinkm:'+encodeURIComponent('@Test20')+'@cluster0.vqvjq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// .then(()=> {
//         console.log('Database Connected!')
//     })
//     .catch((err)=>{
//         console.log('Database Connection Error!', err)
//     })
// }
// module.exports = { getDatabase }



