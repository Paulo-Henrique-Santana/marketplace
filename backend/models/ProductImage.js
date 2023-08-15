const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/conn");
const Product = require("./Product");

class ProductImage extends Model {}

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

module.exports = ProductImage;
