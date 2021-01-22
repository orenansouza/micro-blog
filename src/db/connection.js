require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: `${process.env.DB_HOST}`,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

sequelize
  .authenticate()
  .then()
  .catch((err) => {
    console.log(`Não foi possível conectar ao banco de dados: ${err}`);
  });

sequelize.sync();
module.exports = sequelize;
