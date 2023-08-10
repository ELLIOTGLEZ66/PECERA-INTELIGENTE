const mongoose = require('mongoose')

const Users = mongoose.model('User',{
    name: {type: String, required: true, minLength: 3},
    lastname: {type: String, required: true, minLength: 3},
    email: {type: String, required: true, minLength: 5},
    tampecera: {type: String, required: true, minLength: 5}
   
})

module.exports = Users