const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/conn");

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.BIGINT(11), allowNull: false },
  },
  { sequelize, modelName: "User", timestamps: false }
);

module.exports = User;
