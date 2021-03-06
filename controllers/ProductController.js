const { Product, Category, Sequelize } = require('../models/index.js');
const {Op}= Sequelize;

const ProductController = {
    async create(req, res) {
        try {
            if (req.file) req.body.image_path = req.file.filename;
            if(!req.body.model || !req.body.brand || !req.body.used || !req.body.price || !req.body.year){
                return res.status(400).json({msg:'Por favor rellene todos los campos'})
            }
            const {categories, ...data} = req.body
            const product = await Product.create(data);

            if(categories && categories.length > 0) {
                product.setCategories(categories)
            }

            return res.status(200).send({msg: 'Producto creado con exito', product})
        }catch(error) {
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el producto'})
        } 
    },

    async update(req,res) {
        try {
            if (req.file) req.body.image_path = req.file.filename;
            const { categories, ...data} = req.body
            const product = await Product.findByPk(req.params.id)
            product.update(data)

            if (categories && categories.length > 0) {
                product.setCategories(categories)
            }

            return res.status(200).send({ message: 'Producto actualzado con exito', product})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "No ha sido posible actualizar el producto"})
        }
    },


    getAll(req,res){
        Product.findAll({
            include:[{model: Category, as: 'categories', through: {attributes: []}}]
        })
        .then(product=> res.status(200).send({description:"Todos los productos y sus categorias",product}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar los productos y sus categorias'})
        })
    },

    getById(req, res) {
        Product.findByPk(req.params.id, {
                include: [{model: Category, as: 'categories', through: {attributes: []}}]
            })
            .then(product => res.send(product))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar el producto'})
            })
    },

    getOneByName(req, res) {
        Product.findOne({
                where: {
                    model: {
                        [Op.like]: `%${req.params.model}%`
                    }
                },
                include: [{model: Category, as: 'categories', through: {attributes: []}}]
            })
            .then(pepito => res.send(pepito))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar el producto'})
            })
    },

    getOneByPrice(req, res) {
        Product.findOne({
                where: {
                    price: {
                        [Op.like]: `%${req.params.price}%`
                    }
                },
                include: [{model: Category, as: 'categories', through: {attributes: []}}]
            })
            .then(product => res.send(product))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar el producto'})
            })
    },

    orderProductsDesc(req,res){
        Product.findAll({
            include: [{model: Category, as: 'categories', through: {attributes: []}}],
            order: [['price', 'DESC']]
        })
        .then(product => res.send(product))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar los productos'})
        })
      },

      async delete(req, res) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(
                'El producto ha sido eliminado con ??xito'
            )
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"ha habido un problema al eliminar el producto"})
        }
    }      
}

module.exports = ProductController;