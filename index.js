const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const config = require("./config/key")

const { User } = require("./models/User")

//x-www-form-urlencoded 형태 parser
app.use(bodyParser.urlencoded({extended: true}))
//json parser
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log("MongnDB OK"))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('바프 가즈아~~'))

app.post('/register', (req, res) => {
    
    const user = new User(req.body)
    user.save()
    .then(userStatus => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }))

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))