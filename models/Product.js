const Dados = require("sequelize");
const db = require("../config/database");

const Product = db.define("product", {
  produto: {
    type: Dados.STRING,
    allowNull: false,
  },
  marca: {
    type: Dados.STRING,
    allowNull: false,
  },
  modelo: {
    type: Dados.STRING,
    allowNull: false,
  },
  descricao: {
    type: Dados.TEXT,
  },
  palavrasChave: {
    type: Dados.TEXT,
  },
});

module.exports = Product;
