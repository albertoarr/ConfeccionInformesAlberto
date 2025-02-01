const express = require("express");
const postgres = require("postgres"); // Importamos el paquete pg
const cors = require("cors");

const app = express();
const port = 3002;
app.use(cors());

// Configuración de la conexión a PostgreSQL
const connection = postgres({
  host: "localhost",
  user: "postgres",
  password: "5206",
  database: "colegio",
});

// Ruta para obtener los productos
app.get("/api/alumnos", async (request, response) => {
  try {
    const result = await connection`SELECT * FROM alumnos`;
    response.json(result);
  } catch (e) {
    console.error("Error en la consulta:", e);
    response.status(500).json({ error: "Error en la base de datos " });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
