import { Alumno } from "../interfaces/interfaces";

export function useUpdateAlumno() {
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

  return { updateAlumno };
}
