const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://pyjong1999:Vkxmsj007_@boilerplate.nej2a.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate')
.then(() => console.log("MongnDB OK"))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))