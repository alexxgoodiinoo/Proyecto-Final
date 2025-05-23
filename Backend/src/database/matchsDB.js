const cliente = require("./BBDD");

async function getMatchs() {
  try {
    const respuesta = await cliente.query(`
      SELECT 
        p.id,
        p.resultado,
        TO_CHAR(p.fecha, 'YYYY-MM-DD') AS fecha,
        p.hora,
        p.equipo_local,
        p.equipo_visitante,
        el.nombre AS nombre_equipo_local,
        el.escudo AS escudo_equipo_local,
        ev.nombre AS nombre_equipo_visitante,
        ev.escudo AS escudo_equipo_visitante
      FROM public."Partidos" p
      LEFT JOIN public."Equipos" el ON p.equipo_local = el.id
      LEFT JOIN public."Equipos" ev ON p.equipo_visitante = ev.id
    `);

    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function getOneMatch(matchId) {
  try {
    const respuesta = await cliente.query(
      `
      SELECT 
        p.id,
        p.resultado,
        TO_CHAR(p.fecha, 'YYYY-MM-DD') AS fecha,
        p.hora,
        p.equipo_local,
        p.equipo_visitante,
        el.nombre AS nombre_equipo_local,
        el.escudo AS escudo_equipo_local,
        ev.nombre AS nombre_equipo_visitante,
        ev.escudo AS escudo_equipo_visitante
      FROM public."Partidos" p
      LEFT JOIN public."Equipos" el ON p.equipo_local = el.id
      LEFT JOIN public."Equipos" ev ON p.equipo_visitante = ev.id
      WHERE p.id = $1`,
      [matchId]
    );

    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function createNewMatch(newMatch) {
  const fechaSola = newMatch.fecha ? new Date(newMatch.fecha) : null;
  if (fechaSola) {
    fechaSola.setHours(12, 0, 0, 0);
  }

  try {
    const respuesta = await cliente.query(
      'INSERT INTO public."Partidos"(id, fecha, resultado, equipo_local, equipo_visitante, hora) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        newMatch.id,
        fechaSola,
        newMatch.resultado || "",
        newMatch.equipo_local || null,
        newMatch.equipo_visitante || null,
        newMatch.hora || "",
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function updateOneMatch(updateMatch, matchId) {
  const fechaSola = updateMatch.fecha ? new Date(updateMatch.fecha) : null;
  if (fechaSola) {
    fechaSola.setHours(12, 0, 0, 0);
  }

  try {
    const respuesta = await cliente.query(
      'UPDATE public."Partidos" SET fecha = $1, resultado = $2, equipo_local = $3, equipo_visitante = $4, hora = $5 WHERE id = $6',
      [
        fechaSola,
        updateMatch.resultado,
        updateMatch.equipo_local,
        updateMatch.equipo_visitante,
        updateMatch.hora,
        matchId,
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error al actualizar partido:", err);
    return [];
  }
}

async function deleteOneMatch(matchId) {
  try {
    const respuesta = await cliente.query(
      'DELETE FROM public."Partidos" WHERE id = $1',
      [matchId]
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

module.exports = {
  getMatchs,
  getOneMatch,
  createNewMatch,
  updateOneMatch,
  deleteOneMatch,
};
