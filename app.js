const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')
const BookModel = require('./models/bookModel')
// const ObjectID = dbo.ObjectID
dbo.getDatabase()

app.engine('hbs', exhbs.engine(
    {   layoutsDir:'views/', 
        defaultLayout:"main",
        extname:"hbs",
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({extended:true})) //middleware 

app.get('/',async (req, res)=>{
    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    // const cursor = collection.find({})
    // let books = await cursor.toArray()
    let books = await BookModel.find({})

    let message = '';
    let edit_id, edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id
        // edit_book = await collection.findOne({_id:new ObjectID(edit_id)})
        edit_book = await BookModel.findOne({_id: edit_id})
    }

    if(req.query.delete_id){
        // await collection.deleteOne({_id: new ObjectID(req.query.delete_id)})
        await BookModel.deleteOne({_id: req.query.delete_id})
        return res.redirect('/?status=3')
    }

    // req.query.status
    switch (req.query.status) {
        case '1':
            message = 'Inserted Succesfully!'
            break; 
        case '2':
            message = 'Updated Succesfully!'
            break; 
        case '3':
            message = 'Deleted Succesfully!'
            break;
        default:
            break;
    }

    res.render('main', {message, books, edit_id, edit_book})
})

app.post('/store_book',async (req, res)=>{
    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    // let book = {title: req.body.title, author: req.body.author}
    // await collection.insertOne(book)
    const book = new BookModel({title: req.body.title, author: req.body.author})
    book.save();
    return res.redirect('/?status=1')
})

app.post('/update_book/:edit_id',async (req, res)=>{
    // let database = await dbo.getDatabase();
    // const collection = database.collection('books');
    // let book = {title: req.body.title, author: req.body.author}
    let edit_id = req.params.edit_id 

    // await collection.updateOne({_id:new ObjectID(edit_id)},{$set: book })
    await BookModel.findOneAndUpdate({_id: edit_id}, {title: req.body.title, author: req.body.author})
    return res.redirect('/?status=2')
})


app.listen(8000, ()=>{
    console.log('Listening to 8000 post')
})

//npm i --s express express-handlebars body-parser
//npm i -g nodemon
//nodemon app.js
//npm i mongodb