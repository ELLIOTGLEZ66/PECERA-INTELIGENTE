const persons = require('../models/person')

const person = {
    list: async (req, res) => {
       // const data = await Sensors.find().sort({$natural:-1}).limit(1);
        const data = await persons.find()
       res.status(200).send(data)
    }
}

module.exports = person