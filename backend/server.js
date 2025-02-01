const express = require('express');
const { Pool } = require('pg');  // Importamos el paquete pg
const cors = require('cors');

const app = express();
const port = 3002;
app.use(cors());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',        // Usuario de PostgreSQL (ajústalo si es necesario)
  password: '5206',            // Contraseña de tu base de datos PostgreSQL
  database: 'colegio',      // Nombre de la base de datos
  port: 5432               // Puerto por defecto de PostgreSQL
});

// Verificar la conexión a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos', err.stack);
  }
  console.log('DB Connected!');
  release();  // Liberamos el cliente después de la conexión
});

// Ruta para obtener los productos
app.get('/api/productos', async (req, res) => {
  try {
    const sql_query = 'SELECT * FROM productos';
    const result = await pool.query(sql_query);  // Usamos pool.query para ejecutar la consulta

    console.log("Resultado:", result.rows);
    res.json(result.rows);  // Enviamos solo las filas del resultado
  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.status(500).send('Error en el servidor');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
