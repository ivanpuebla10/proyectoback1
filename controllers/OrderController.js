const { Order } = require('../models/index.js');

const OrderController = {
    create(req, res) {
        Order.create({...req.body })
            .then(order => res.status(201).send({ message: 'Pedido creado con éxito', order }))
            .catch(console.error)
    },
}

module.exports = OrderController