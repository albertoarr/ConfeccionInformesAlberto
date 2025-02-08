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

// UPDATE
app.put("/api/alumnos/:id", async (req, res) => {
  const { id } = req.params;
  const { matricula, nombre, sexo, email, repetidor, activo } = req.body;

  try {
    const result = await connection`
      UPDATE alumnos
      SET matricula = ${matricula}, nombre = ${nombre}, sexo = ${sexo}, 
          email = ${email}, repetidor = ${repetidor}, activo = ${activo}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(result[0]);
  } catch (e) {
    console.error("Error al actualizar el alumno:", e);
    res.status(500).json({ error: "Error al actualizar el alumno" });
  }
});

// DELETE
app.delete("/api/alumnos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await connection`
      DELETE FROM alumnos
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json({ message: "Alumno eliminado exitosamente", alumno: result[0] });
  } catch (e) {
    console.error("Error al eliminar el alumno:", e);
    res.status(500).json({ error: "Error al eliminar el alumno" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
