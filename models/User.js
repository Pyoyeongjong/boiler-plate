const mongoose = require('mongoose')

//require를 넣지 않은 곳은 꼭 채워줄 필요 없음
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백(스페이스바) 제거
        unique: 1 // 중복 X
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = { User } // 이 스키마를 다른 곳에서도 쓸 수 있게 함