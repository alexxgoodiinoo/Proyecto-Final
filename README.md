# ⚽ Carpincho League - Proyecto Final

Este proyecto es una aplicación web desarrollada con Angular que permite gestionar equipos de fútbol, consultar estadísticas de jugadores, consultar partidos y realizar operaciones administrativas según el rol del usuario.

## 🛠️ Tecnologías Utilizadas
- **Frontend**: Angular, TypeScript, HTML y Tailwind CSS
- **Backend**: Node.js con Express
- **Base de datos**: PostgreSQL

## 🧑‍💻 Roles de Usuarios

La aplicación cuenta con tres tipos de usuarios:

- **Invitado**: Solo puede visualizar la información de los equipos, partidos y jugadores.
- **Entrenador**: Además de las funciones del Invitado, puede ver y modificar la alineación de su equipo, gestionando el once incial y el banquillo.
- **Administrador**: Tiene acceso total para gestionar la base de datos: crear, leer, actualizar y eliminar (CRUD) equipos, jugadores y partidos.

## 🧩 Funcionalidades principales

- Visualización de partidos (próximos y jugados).
- Búsqueda de partidos por nombre de equipo.
- Búsqueda de equipos por nombre de equipo.
- Búsqueda de jugadores por nombre, apellido y nombre del equipo.
- Alineación personalizada por parte de los entrenadores.
- Panel de administración con formularios CRUD.
- Diseño responsive para móviles, tablets y ordenadores.
- Sistema protector de las rutas.
- Uso de imágenes por defecto en caso de no introducir una imágen.

## 🧠 Inspiraciones y fuentes

Durante el desarrollo del proyecto me inspiré en varias fuentes para obtener datos, ideas de estructura y estilo visual:
- Besoccer
- Kings League
- Biwenger

## 📦 Instalación
1. Clona el repositorio:
   git clone https://github.com/alexxgoodiinoo/Proyecto-Final.git
   
2. Navega al directorio del proyecto

3. Instala las dependencias del frontend:
   cd frontend
   npm install

4. Instala las dependencias del backend:
   cd ../backend
   npm install

Asegurate de tener instalado Angular CLI y Node.js.

## 📜 Uso

1. Inicia el backend:
   cd backend
   npm run dev

2. Inicia el frontend:
   cd frontend
   ng s -o

3. Accede a la aplicación desde tu navegador en http://localhost:3000.

## 🌐 Enlace a la aplicación

[Haz clic aquí para ver la aplicación en funcionamiento](https://)

## 📄 Licencia

Este proyecto está bajo la MIT License.
