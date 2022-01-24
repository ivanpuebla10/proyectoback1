'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert( 'Orders', [
      {
      number: "100",
      delivery_date: "2022-09-21",
      status: "delivered",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: "200",
      delivery_date: "2022-11-21",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: "300",
      delivery_date: "2022-010-22",
      status: "delivered",
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
