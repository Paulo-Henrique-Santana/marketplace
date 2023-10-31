import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conn";
import { Product } from "./Product";

export class Category extends Model {}

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
