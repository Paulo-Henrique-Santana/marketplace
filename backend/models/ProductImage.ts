import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conn";
import { Product } from "./Product";

export class ProductImage extends Model {}

ProductImage.init(
  { fileName: { type: DataTypes.STRING, allowNull: false } },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "ProductsImages",
    timestamps: false,
  }
);

Product.hasMany(ProductImage, {
  foreignKey: { name: "idProduct", allowNull: false },
  as: "images",
});
ProductImage.belongsTo(Product, {
  foreignKey: { name: "idProduct", allowNull: false },
  as: "images",
});
