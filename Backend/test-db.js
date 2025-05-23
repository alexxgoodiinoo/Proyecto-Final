const pool = require("./src/database/BBDD");

pool.query("SELECT NOW()")
  .then((res) => {
    console.log("Conectado correctamente:", res.rows[0]);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error al conectar:", err);
    process.exit(1);
  });
