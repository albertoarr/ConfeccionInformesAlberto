import { AlumnoNuevo } from "../interfaces/interfaces";

export function useInsertAlumno(nuevoAlumno: AlumnoNuevo) {
  const postJson = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/alumnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAlumno),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error al insertar el alumno", error);
    }
  };

  postJson();
}
