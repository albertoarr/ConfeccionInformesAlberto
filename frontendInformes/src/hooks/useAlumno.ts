import { useState } from "react";
import { Alumno, AlumnoNuevo } from "../interfaces/interfaces";

export function useAlumno() {
  const [data, setData] = useState<Alumno[] | undefined>(undefined);

  const insertAlumno = async (nuevoAlumno: AlumnoNuevo) => {
    try {
      const response = await fetch("http://localhost:3002/api/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAlumno),
      });

      // Devuelve el alumno en la consola (no hace falta para el put)
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error al insertar el alumno", error);
    }
  };

  const deleteAlumno = async (alumno: Alumno) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/alumnos/${alumno.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return data; // Retornamos la respuesta de la API (el alumno eliminado o error)
    } catch (error) {
      console.error("Error al eliminar el alumno:", error);
      return { error: "No se pudo eliminar el alumno" };
    }
  };

  const updateAlumno = async (alumno: Alumno) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/alumnos/${alumno.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alumno),
        }
      );
      const data = await response.json();
      console.log("Alumno actualizado:", data);
    } catch (error) {
      console.error("Error al actualizar el alumno", error);
    }
  };

  return { insertAlumno, deleteAlumno, updateAlumno };
}
