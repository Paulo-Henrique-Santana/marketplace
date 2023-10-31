import { Model } from "sequelize";
import { sequelize } from "../db/conn";
import { Product } from "./Product";
import { User } from "./User";

export class Favorite extends Model {}

Favorite.init({}, { sequelize, modelName: "Favorite", timestamps: false });

User.hasMany(Favorite, { foreignKey: { name: "idUser", allowNull: false } });
Favorite.belongsTo(User, { foreignKey: { name: "idUser", allowNull: false } });

Product.hasMany(Favorite, {
  foreignKey: { name: "idProduct", allowNull: false },
  as: "favorites",
});
Favorite.belongsTo(Product, {
  foreignKey: { name: "idProduct", allowNull: false },
  as: "product",
});
