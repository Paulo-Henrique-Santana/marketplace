const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = db.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.BIGINT(11), allowNull: false },
  },
  { timestamps: false }
);

module.exports = User;
