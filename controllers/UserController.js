const { User, Order, Product } = require('../models/index.js');

const UserController = {
    create(req, res) {
        req.body.role = "user";
        User.create({...req.body })
            .then(user => res.status(201).send({ message: 'Usuario creado con éxito', user }))
            .catch(console.error)
    },

    getAll(req,res){
        User.findAll({
            include:[
                {model: Order, include:[{model: Product, as: 'products', through: {attributes: []}}]}
            ]
        })
        .then(order=> res.status(200).send({description:"Todos los usuarios y sus ordenes",order}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar los usuarios y sus ordenes'})
        })
    },
}

module.exports = UserController