"use strict";

const categories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Cosmetics",
  "Food",
  "Toys",
  "Furniture",
  "Books",
  "Sports",
  "Games",
  "Musical Instruments",
  "Automobiles",
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const products = [];
    const images = [];

    let idCategory = 1;

    for (let i = 0; i < 20; i++) {
      users.push({
        name: `user${i + 1}`,
        email: `user${i + 1}@user${i + 1}.com`,
        password:
          "$2b$10$tTz3YJdBiwluhvaO2n9/AuT8UnvYTwz7N94jSdkHDcstyYN7UhMD2",
        cpf: i + 1,
      });

      products.push({
        idUser: 1,
        name: `sla${i + 1}`,
        quantity: i + 1,
        idCategory,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt eget erat nec tincidunt. Nunc tristique eros venenatis feugiat sagittis. Maecenas vel convallis ex, nec vehicula velit. Sed nec semper mi. Pellentesque vitae sollicitudin tellus. Sed cursus tortor eget tortor ultricies, et suscipit justo interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 100 * (i + 1),
      });

      if (idCategory + 1 < categories.length) {
        idCategory++;
      } else {
        idCategory = 1;
      }

      images.push({
        fileName: "1691795392713.jpeg",
        idProduct: i + 1,
      });
    }

    await queryInterface.bulkInsert(
      "Categories",
      categories.map((category) => {
        return {
          name: category,
        };
      })
    );

    await queryInterface.bulkInsert("Users", users);

    await queryInterface.bulkInsert("Products", products);

    await queryInterface.bulkInsert("ProductsImages", images);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
