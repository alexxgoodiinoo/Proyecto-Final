const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const equiposRoutes = require("./routes/equiposRoutes");
const jugadoresRoutes = require("./routes/jugadoresRoutes");
const ligasRoutes = require("./routes/ligasRoutes");
const partidosRoutes = require("./routes/partidosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.use("/equipos", equiposRoutes);
app.use("/jugadores", jugadoresRoutes);
app.use("/ligas", ligasRoutes);
app.use("/partidos", partidosRoutes);
app.use("/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))