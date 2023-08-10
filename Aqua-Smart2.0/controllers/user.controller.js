const Users = require('../models/User')
const User = {
    get: async (req, res) => {
        const {id } = req.params
        const user = await Users.findOne({ _id: id })
        res.status(200).send(user)
    },
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async (req, res) => {
        const user = new Users(req.body)
        const savedUser = await user.save()
        res.status(201).send(savedUser._id)
    }, 
    update: async (req, res) => {
   
                    console.log(req.params, req.body)
                    const { id } = req.params
                    const user = await Users.findOne({ _id: id })
                    Object.assign(user, req.body)
            //try{
                 await user.save()
            //}catch(error){console.log(error)
                 res.sendStatus(204)
            /*}
         }
        } catch(e) {
                res.send(e.message)
        }    */ 
    },
    destroy: async (req, res) => {
        const { id } = req.params
        const user = await Users.findOne({ _id: id })
        if (user){user.remove()}
        res.sendStatus(204)
    },
    

}

module.exports = User



