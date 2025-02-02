import React, { useEffect } from "react";
import { Alumno } from "../../interfaces/interfaces";
import { useDeleteAlumno } from "../../hooks/useDeleteAlumno";

interface AlumnListProps {
  alumnos?: Alumno[];
}


export default function AlumnList({ alumnos }: AlumnListProps) {
  const { deleteAlumno } = useDeleteAlumno();

  const handleDelete = async (alumno: Alumno) => {
    if (alumno) {
    const response = await deleteAlumno(alumno)
    if (response.error) {
      alert(response.error); // Si ocurre un error, lo mostramos
    } else {
      alert("Alumno eliminado con éxito");
    }
    }
  }
  /*
  useEffect(() => {
    if (alumnos && alumnos.length > 0) {
      handleDelete(alumnos[0]); // Eliminamos el primer alumno
    }
  });
  */

  return (
    <div>
      {alumnos &&
        alumnos.map((alumno) => (
          <li key={alumno.id}>
            {alumno.id} - {alumno.nombre} - {alumno.matricula} - {alumno.email}
          </li>
        ))}
    </div>
  );
}
