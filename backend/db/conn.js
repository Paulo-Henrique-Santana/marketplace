const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:07092000@localhost:5432/marketplace"
);

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso!");
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`);
}

module.exports = sequelize;
