// // require("dotenv").config();

// const { Pool } = require("pg");

// // const conexionBBDD = {
// //   user: process.env.DB_USERNAME,
// //   host: process.env.DB_HOST,
// //   database: process.env.DB_NAME,
// //   password: process.env.DB_PASSWORD,
// //   port: process.env.DB_PORT,
// // };

// // if (process.env.ENVIROMENT === "production") {
// //   conexionBBDD.ssl = {
// //     require: true,
// //     rejectUnauthorized: false,
// //   };
// // }

// const conexionBBDD = {
//   user: "postgres",
//   host: "localhost",
//   database: "ProyectoFinal",
//   password: "postgres",
//   port: 5432,
// };

// const cliente = new Pool(conexionBBDD);

// module.exports = cliente;

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
