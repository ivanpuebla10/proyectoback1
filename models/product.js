'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically. 
     */
    static associate(models) {
      Product.belongsToMany(models.Order, { through: 'Productorder' , as: 'orders', foreignKey: 'ProductId'})
      Product.belongsToMany(models.Category, { through: 'Productcategory', as: 'categories', foreignKey: 'ProductId'
    })}
  }
  Product.init({
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el modelo del coche",
        },
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce la marca del coche",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el año del coche",
        },
      },
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce 'true' o 'false' en caso de que el coche sea usado o no, respectivamente",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el precio del coche",
        },
      },  
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};