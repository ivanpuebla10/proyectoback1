'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert( 'Products', [
      {
      model: "Volador",
      brand: "bmw",
      used: true,
      price: 120,
      year: 2019,
      image: "no hay",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      model: "submarino",
      brand: "mercedes",
      used: true,
      price: 300,
      year: 2019,
      image: "no hay",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      model: "tierra",
      brand: "ford",
      used: true,
      price: 500,
      year: 2019,
      image: "no hay",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      model: "fuego",
      brand: "fiat",
      used: false,
      price: 900,
      year: 2020,
      image: "no hay",
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      model: "agua",
      brand: "seat",
      used: true,
      price: 1500,
      year: 2021,
      image: "no hay",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
