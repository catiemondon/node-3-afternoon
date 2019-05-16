require('dotenv').config();
const express= require('express')
const dotenv=require('dotenv')
const app= express()
const massive= require('massive')
const ctrl= require('./product_controller')


const {SERVER_PORT, CONNECTION_STRING}= process.env
app.use(express.json())

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err))


app.get('/api/products', ctrl.getAll)

app.get('/api/products/:id', ctrl.getOne)

app.put('/api/products/:id', ctrl.update)

app.post('/api/products', ctrl.create)

app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, ()=>{
    console.log(`Server listening on port ${SERVER_PORT}`)
})