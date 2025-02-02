const express = require("express");
const postgres = require("postgres"); // Importamos el paquete pg
const cors = require("cors");

const app = express(); // Uso de express
const port = 3002;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a PostgreSQL
const connection = postgres({
  host: "localhost",
  user: "postgres",
  password: "5206",
  database: "colegio",
});

// CREATE
app.post("/api/alumnos", async (req, res) => {
  const { matricula, nombre, sexo, email, repetidor, activo } = req.body;

  try {
    const result = await connection`
      INSERT INTO alumnos (matricula, nombre, sexo, email, repetidor, activo)
      VALUES (${matricula}, ${nombre}, ${sexo}, ${email}, ${repetidor}, ${activo})
      RETURNING *`; // Después de insertar se devuelve la fila que fue insertada

    res
      .status(201) // cod 201 -> indica que recurso fue insertado exitosamente
      .json(result[0]); // json(result[0]) -> devuelve el resultado de inserción
  } catch (e) {
    console.error("Error al crear el alumno:", e);
    res
      .status(500) // cod 500 -> error interno del servidor
      .json({ error: "Error al crear el alumno" });
  }
});

// READ
app.get("/api/alumnos", async (req, res) => {
  try {
    const result = await connection`SELECT * FROM alumnos`;
    res.json(result);
  } catch (e) {
    console.error("Error en la consulta:", e);
    res.status(500).json({ error: "Error en la base de datos " });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
