import { Alumno } from "../interfaces/interfaces";

export function useDeleteAlumno() {
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

  return { deleteAlumno };
}
