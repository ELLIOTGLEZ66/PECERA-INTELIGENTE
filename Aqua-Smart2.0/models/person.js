const mongoose = require('mongoose')

const light_sensor = mongoose.model('persons',{
     first_names: { type: String, required: true},
     fingerprint_ID: {type: Number, required: false},
     last_names: { type: String, required: true},
    
 })
 
 module.exports = light_sensor
 