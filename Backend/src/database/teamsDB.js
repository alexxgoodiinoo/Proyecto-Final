const cliente = require("./BBDD");

async function getTeams() {
  try {
    const respuesta = await cliente.query(
      'SELECT * FROM public."Equipos" ORDER BY puntos DESC'
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function getOneTeam(teamId) {
  try {
    const respuesta = await cliente.query(
      'SELECT * FROM public."Equipos" WHERE id = $1',
      [teamId]
    );
    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

const getTeamPlayers = async (teamId) => {
  try {
    const respuesta = await cliente.query(
      'SELECT * FROM public."Jugadores" WHERE id_equipo = $1',
      [teamId]
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error al obtener los jugadores", err);
    throw err;
  }
};

async function createNewTeam(newTeam) {
  try {
    const respuesta = await cliente.query(
      'INSERT INTO public."Equipos"(id, nombre, escudo) VALUES ($1, $2, $3)',
      [
        newTeam.id,
        newTeam.nombre,
        newTeam.escudo || "",
        //, newTeam.id_liga | ''
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function updateOneTeam(updateTeam, teamId) {
  try {
    const respuesta = await cliente.query(
      `UPDATE public."Equipos" 
       SET nombre = $1, 
           escudo = $2, 
           puntos = $3::integer * 3 + $4::integer, 
           partidos_jugados = $3::integer + $4::integer + $5::integer, 
           partidos_ganados = $3, 
           partidos_empatados = $4, 
           partidos_perdidos = $5, 
           goles_a_favor = $6, 
           goles_en_contra = $7, 
           diferencia_goles = $6::integer - $7::integer, 
           id_liga = $8 
       WHERE id = $9`,
      [
        updateTeam.nombre,
        updateTeam.escudo,
        updateTeam.partidos_ganados,
        updateTeam.partidos_empatados,
        updateTeam.partidos_perdidos,
        updateTeam.goles_a_favor,
        updateTeam.goles_en_contra,
        updateTeam.id_liga,
        teamId,
      ]
    );

    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function deleteOneTeam(teamId) {
  try {
    const respuesta = await cliente.query(
      'DELETE FROM public."Equipos" WHERE id = $1',
      [teamId]
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

module.exports = {
  getTeams,
  getOneTeam,
  getTeamPlayers,
  createNewTeam,
  updateOneTeam,
  deleteOneTeam,
};
