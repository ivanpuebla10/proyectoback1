const { Order, Product } = require('../models/index.js');

const OrderController = {
    async create(req, res) {
        try {
            if(!req.body.number || !req.body.delivery_date || !req.body.status){
                return res.status(400).json({msg:'Por favor rellene todos los campos'})
            }
            const {products, ...data} = req.body
            const post = await Order.create(data);

            if(products && products.length > 0) {
                post.setProducts(products)
            }

            return res.status(200).send({msg: 'Pedido creado con exito', post})
        }catch(error) {
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el producto'})
        } 
    },
    
    getAll(req,res){
        Order.findAll({
            include:[{model: Product, as: 'products', through: {attributes: []}}]
        })
        .then(order=> res.status(200).send({description:"Todos los pedidos y sus productos",order}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar los pedidos y sus productos'})
        })
    }
}

module.exports = OrderController