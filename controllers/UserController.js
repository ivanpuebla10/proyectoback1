const { User, Order, Product, Token, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']




const UserController = {
    create(req, res) {
        req.body.role = "user";
        const hash = bcrypt.hashSync(req.body.password,10)
        User.create({...req.body, password:hash })
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
//arreglar esto con findbyid y eso, preguntar a german
    login(req,res){
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id });
            res.send({ message: 'Bienvenid@' + user.name, user, token });
        })
    },

    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    }

}

module.exports = UserController