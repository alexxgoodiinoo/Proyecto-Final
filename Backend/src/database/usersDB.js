const cliente = require("./BBDD");

async function getUsers() {
  try {
    const respuesta = await cliente.query(`
      SELECT 
        u.id,
        u.username,
        u.password,
        u.email,
        u.tipo_usuario, 
        u.id_equipo,
        e.nombre AS nombre_equipo
      FROM public."Usuarios" u
      LEFT JOIN public."Equipos" e ON u.id_equipo = e.id
      `);
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function getOneUser(userName, userPass) {
  try {
    const respuesta = await cliente.query(
      'SELECT * FROM public."Usuarios" WHERE username = $1 AND password = $2',
      [userName, userPass]
    );
    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function createNewUser(newUser) {
  try {
    const respuesta = await cliente.query(
      'INSERT INTO public."Usuarios"(id, username, password, email, tipo_usuario, id_equipo) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        newUser.id,
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.tipo_usuario,
        newUser.id_equipo,
      ]
    );

    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function updateOneUser(updateUser, userId) {
  try {
    const respuesta = await cliente.query(
      'UPDATE public."Usuarios" SET username = $1, password = $2, email = $3, tipo_usuario = $4, id_equipo = $5 WHERE id = $6',
      [
        updateUser.username,
        updateUser.password,
        updateUser.email,
        updateUser.tipo_usuario,
        updateUser.id_equipo,
        userId,
      ]
    );

    return respuesta.rows[0];
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

async function deleteOneUser(userId) {
  try {
    const respuesta = await cliente.query(
      'DELETE FROM public."Usuarios" WHERE id = $1',
      [userId]
    );
    return respuesta.rows;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
}

module.exports = {
  getUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
