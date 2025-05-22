const cliente = require("./BBDD");

async function getPlayers() {
  try {
    const respuesta = await cliente.query(`
      SELECT 
        j.id,
        j.nombre,
        j.apellidos,
        j.imagen, 
        j.goles,
        j.asistencias,
        j.dorsal,
        j.partidos_jugados,
        j.posicion,
        j.once_inicial,
        j.id_equipo,
        e.nombre AS nombre_equipo
      FROM public."Jugadores" j
      LEFT JOIN public."Equipos" e ON j.id_equipo = e.id
      `);
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function getOnePlayer(playerId) {
  try {
    const respuesta = await cliente.query(
      `
      SELECT 
        j.id,
        j.nombre,
        j.apellidos,
        j.imagen, 
        j.goles,
        j.asistencias,
        j.dorsal,
        j.partidos_jugados,
        j.posicion,
        j.once_inicial,
        j.id_equipo,
        e.nombre AS nombre_equipo 
      FROM public."Jugadores" j
      LEFT JOIN public."Equipos" e ON j.id_equipo = e.id 
      WHERE j.id = $1`,
      [playerId]
    );
    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function createNewPlayer(newPlayer) {
  console.log(newPlayer);
  try {
    const respuesta = await cliente.query(
      'INSERT INTO public."Jugadores"(id, nombre, apellidos, imagen, dorsal, id_equipo, posicion, once_inicial) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        newPlayer.id,
        newPlayer.nombre,
        newPlayer.apellidos,
        newPlayer.imagen,
        newPlayer.dorsal,
        newPlayer.id_equipo,
        newPlayer.posicion,
        newPlayer.once_inicial
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function updateOnePlayer(updatePlayer, playerId) {
  try {
    const respuesta = await cliente.query(
      'UPDATE public."Jugadores" SET nombre = $1, apellidos = $2, imagen = $3, goles = $4, asistencias = $5, dorsal = $6, partidos_jugados = $7, id_equipo = $8, posicion = $9, once_inicial = $10 WHERE id = $11',
      [
        updatePlayer.nombre,
        updatePlayer.apellidos,
        updatePlayer.imagen,
        updatePlayer.goles,
        updatePlayer.asistencias,
        updatePlayer.dorsal,
        updatePlayer.partidos_jugados,
        updatePlayer.id_equipo,
        updatePlayer.posicion,
        updatePlayer.once_inicial,
        playerId,
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error al actualizar jugador:", err);
    return [];
  }
}

async function deleteOnePlayer(playerId) {
  try {
    const respuesta = await cliente.query(
      'DELETE FROM public."Jugadores" WHERE id = $1',
      [playerId]
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

module.exports = {
  getPlayers,
  getOnePlayer,
  createNewPlayer,
  updateOnePlayer,
  deleteOnePlayer,
};
