const { User, Order, Product, Token, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']




const UserController = {
    create(req, res) {
        if (/^[a-zA-Z]\w{3,14}$/i.test(req.body.password) !== true) {
            return res.send(
              "El primer carácter de la contraseña debe ser una letra, debe contener al  menos 4 caracteres y no más de 15 caracteres y no se pueden usar más  caracteres que letras, números y guiones bajos."
            );
          }
        req.body.role = req.body.role ? req.body.role : "user";
        const hash = bcrypt.hashSync(req.body.password,10)
        User.create({...req.body, password:hash })
            .then(user => res.status(201).send({ message: 'Usuario creado con éxito', user }))
            .catch(err =>{
                console.error(err);
                res.status(400).send({ msg: err.errors[0].message });
            })
    },

    //arreglar esto con findbyid y eso, preguntar a german, falta validaciones tambien

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

    getUserLogged(req,res){
        User.findByPk(req.params.id, {
            include:[
                {model: Order, include:[{model: Product, as: 'products', through: {attributes: []}}]}
            ]
        })
        .then(order=> res.status(200).send({description:"Current user and orders",order}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargar los usuarios y sus ordenes'})
        })
    },

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