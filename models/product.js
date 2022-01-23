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
      // Producto.belongsToMany(models.Pedido, { through: 'Productoypedido'})
      Product.belongsToMany(models.Category, { through: 'Productcategory', as: 'categories', foreignKey: 'ProductId'
    })}
  }
  Product.init({
    model: DataTypes.STRING,
    brand: DataTypes.STRING,
    year: DataTypes.INTEGER,
    used: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};