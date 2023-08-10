const mongoose = require('mongoose')

const user = mongoose.model('User',{
    email: { type: String, required: true},
    password: { type: String, required: true},
    salt: { type: String, required: true},
})

