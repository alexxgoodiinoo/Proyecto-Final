const cliente = require("./BBDD");

async function getLeagues() {
  try {
    const respuesta = await cliente.query('SELECT * FROM public."Ligas"');
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function getOneLeague(leagueId) {
  try {
    const respuesta = await cliente.query(
      'SELECT * FROM public."Ligas" WHERE id = $1',
      [leagueId]
    );
    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function createNewLeague(newLeague) {
  try {
    const respuesta = await cliente.query(
      'INSERT INTO public."Ligas"(id, nombre) VALUES ($1, $2)',
      [
        newLeague.id,
        newLeague.nombre
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function updateOneLeague(updateLeague, leagueId) {
  try {
    const respuesta = await cliente.query(
      'UPDATE public."Ligas" SET nombre = $1 WHERE id = $2',
      [
        updateLeague.nombre,
        leagueId
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error al actualizar liga:", err);
    return [];
  }
}

async function deleteOneLeague(leagueId) {
  try {
    const respuesta = await cliente.query(
      'DELETE FROM public."Ligas" WHERE id = $1',
      [leagueId]
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

module.exports = {
  getLeagues,
  getOneLeague,
  createNewLeague,
  updateOneLeague,
  deleteOneLeague,
};