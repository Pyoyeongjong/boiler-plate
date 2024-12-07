const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require("./config/key")

const { User } = require("./models/User") // {} 뜻: module에서 User만 골라서 할당
const { auth } = require("./middleware/auth")

//x-www-form-urlencoded 형태 parser
app.use(bodyParser.urlencoded({extended: true}))
//json parser
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log("MongnDB OK"))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('바프 가즈아~~'))

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요 ~ ")
})

app.post('/api/users/register', (req, res) => {
    
    const user = new User(req.body)
    user.save()
    .then(userStatus => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, err }))

})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일 DB에서 찾기
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            console.log("찾고자 하는 유저 없음.")
            return res.json({
                loginSuccess: false,
                message: "찾고자 하는 유저 없음."
            })
        }
        // 비밀번호 같은지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                console.log("비밀번호 다름")
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호 다름."
                })
            }

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                // 토큰을 (쿠키, 로컬 스토리지 등)에 저장한다.
                // 여기선 쿠키에 저장한다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })
    .catch(err => {
        console.error("Error occured", err);
    });
})

// role 0 = 일반 유저, 1 = admin
app.get('/api/users/auth', auth, (req, res) => {
    // 미들웨어 통과한 후임 (Auth 통과)
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""})
    .then(user => {
        return res.status(200).send({
            success: true
        })
    })
    .catch(err => {
        if (err) return res.json({success: false, err});
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))