const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./User");

class Product extends Model {}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Product", timestamps: false }
);

User.hasMany(Product, { foreignKey: { name: "idUser", allowNull: false } });
Product.belongsTo(User, {
  foreignKey: { name: "idUser", allowNull: false },
});

module.exports = Product;
