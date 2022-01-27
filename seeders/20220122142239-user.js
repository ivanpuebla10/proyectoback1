'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert( 'Users', [
    {
      name: "Ivan",
      email: "ivan@gmail.com",
      password: "123456",
      role: "admin",
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ana",
      email: "ana@gmail.com",
      password: "contraseña",
      role: "user",
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Carlos",
      email: "carlos@gmail.com",
      password: "patata",
      role: "user",
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
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
