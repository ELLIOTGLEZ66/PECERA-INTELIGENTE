
const mongoose = require('mongoose')
const Users = require('./models/User')
const Sensors = require('./models/temperature_sensor')

mongoose.connect('mongodb+srv://fender99:Oscuro34@cluster0.vioixrk.mongodb.net/proyectopecera?retryWrites=true&w=majority')


 
/*
const crear = async () => {
    const temperature = new temperature_sensor({ hardware_id: 1, sensor_id: 25, value: 40,metric: 30, date_taken: 7292022})
    const savedUser = await temperature.save()
    console.log(savedUser)
}
*/

//crear()

const crearSensor = async () => {
    const temperature = new Sensors({ value: 50})
    const savedUser = await temperature.save()
    console.log(savedUser)
}

//crearSensor()

const buscarUnoSensor = async (email) => {
    const user = await Sensors.findOne({ value: 50})
    console.log(user)
}

buscarUnoSensor()

const buscarTodo = async () => {
    const users = await User.find()
    console.log(users)
}

//buscarTodo()

const buscar = async () => {
    const user = await User.find({ username: 'chanchito feliz' })
    console.log(user)
}

//buscar()

const buscarUno = async (email) => {
    const user = await Users.findOne({ name: email})
    console.log(user)
}

//buscarUno()

const actualizar = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' })
    console.log(user)        
    user.edad = 30
    await user.save()
}

//actualizar()

const eliminar = async () => {
    const user = await User.findOne({ username: 'chanchito triste' })
    console.log(user)
    if(user){
        await user.remove()
    }
    
}

//eliminar()

//module.exports =  {buscarUno}

