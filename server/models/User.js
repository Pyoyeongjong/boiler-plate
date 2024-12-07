const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10 // salt가 몇 자리인지

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
// next는 변수명.. mongoDB에서 다음에 실행할 함수를 넘겨주는 거임
// 다음에 실행할 건 이미 정해져 있음
userSchema.pre('save', function( next ){ 
    var user = this; // 이걸 가리킴 (여기서 이거 == userSchema)

    if(!user.isModified('password')) return next();
    // 비밀번호 암호화
    // 대부분의 Node.js 라이브러리는 관례적으로 첫 번째 매개변수를 에러로 지정
    bcrypt.genSalt(saltRounds, function (err, salt) { // salt 생성
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // tokenize
    // user._id + 'secretToken' == token 인 것이다.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save()
    .then(user => {
        cb(null, user);
    })
    .catch(err => {
        cb(err);
    })
}

// statics : instance 없이도 실행할 수 있는 메소드
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저 찾기
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는가?
        user.findOne({"_id": decoded, "token": token})
        .then(user => {
            cb(null, user);
        })
        .catch(err => {
            return cb(err);
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User } // 이 스키마를 다른 곳에서도 쓸 수 있게 함