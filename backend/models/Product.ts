import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conn";
import { User } from "./User";

export class Product extends Model {}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false },
  },
  { sequelize, modelName: "Product", timestamps: false }
);

User.hasMany(Product, { foreignKey: { name: "idUser", allowNull: false } });
Product.belongsTo(User, {
  foreignKey: { name: "idUser", allowNull: false },
});
