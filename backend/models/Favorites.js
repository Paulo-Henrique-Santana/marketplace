const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./User");
const Product = require("./Product");

class Favorite extends Model {}

Favorite.init({}, { sequelize, modelName: "Favorite", timestamps: false });

User.hasMany(Favorite, { foreignKey: { name: "idUser", allowNull: false } });
Favorite.belongsTo(User, { foreignKey: { name: "idUser", allowNull: false } });

Product.hasMany(Favorite, {
  foreignKey: { name: "idProduct", allowNull: false },
});
Favorite.belongsTo(Product, {
  foreignKey: { name: "idProduct", allowNull: false },
});

module.exports = Favorite;
