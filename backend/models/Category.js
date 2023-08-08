const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./User");
const Product = require("./Product");

class Category extends Model {}

Category.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Category", timestamps: false }
);

Category.hasMany(Product, {
  foreignKey: { name: "idCategory", allowNull: false },
});
Product.belongsTo(Category, {
  foreignKey: { name: "idCategory", allowNull: false },
});

module.exports = Category;
