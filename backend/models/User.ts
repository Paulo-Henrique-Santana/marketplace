import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/conn";

export class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.INTEGER({ length: 12 }), allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: false,
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.password;
      },
    },
  }
);
