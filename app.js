const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const exhbs = require('express-handlebars')
const dbo = require('./db')

app.engine('hbs', exhbs.engine({layoutsDir:'views/', defaultLayout:"main",extname:"hbs"}))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({extended:true})) //middleware 

app.get('/',async (req, res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({})
    let employees = await cursor.toArray()

    let message = ''

    // req.query.status
    switch (req.query.status) {
        case '1':
            message = 'Inserted Succesfully!'
            break; 
    
        default:
            break;
    }

    res.render('main', {message, employees})
})

app.post('/store_book',async (req, res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = {title: req.body.title, author: req.body.author}
    await collection.insertOne(book)
    return res.redirect('/?status=1')
})

app.listen(8000, ()=>{
    console.log('Listening to 8000 post')
})

//npm i --s express express-handlebars body-parser
//npm i -g nodemon
//nodemon app.js
//npm i mongodb