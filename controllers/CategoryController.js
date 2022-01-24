const { Product, Category, Sequelize } = require('../models/index.js');
const {Op}= Sequelize;

const CategoryController = {
    async create(req, res) {
        try {
            if(!req.body.name){
                return res.status(400).json({msg:'Por favor rellene todos los campos'})
            }
            const {products, ...data} = req.body
            const post = await Category.create(data);

            if(products && products.length > 0) {
                post.setProducts(products)
            }

            return res.status(200).send({msg: 'Categoria creado con exito', post})
        }catch(error) {
            console.error(error)
            res.status(500).send({message: 'Ha habido un problema al crear el producto'})
        } 
    },

    async update(req,res) {
        try {
            const { products, ...data} = req.body
            const put = await Category.findByPk(req.params.id)
            put.update(data)

            if (products && products.length > 0) {
                put.setProducts(products)
            }

            return res.status(200).send({ message: 'Categoria actualzada con exito', put})
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: "No ha sido posible actualizar la categoria"})
        }
    },

    getAll(req,res){
        Category.findAll({
            include:[{model: Product, as: 'products', through: {attributes: []}}]
        })
        .then(category=> res.status(200).send({description:"Todos las categorias y sus productos",category}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar las categorias y sus productos'})
        })
    },

    getById(req, res) {
        Category.findByPk(req.params.id)
            .then(category => res.send(category))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar la categoria'})
            })
    },

    getOneByName(req, res) {
        Category.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                }
            })
            .then(pepito => res.send(pepito))
            .catch(err => {
                console.error(err)
                res.status(500).send({ message :'No se ha podido cargar la categoria'})
            })
    },

    async delete(req, res) {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(
                'La categoria ha sido eliminada con éxito'
            )
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"ha habido un problema al eliminar la categoria"})
        }
    }     
}

module.exports = CategoryController;