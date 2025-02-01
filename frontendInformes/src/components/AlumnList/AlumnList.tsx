import React from "react";
import { Alumno } from "../../interfaces/interfaces";

interface AlumnListProps {
    alumnos?: Alumno[]
}

export default function AlumnList({ alumnos }: AlumnListProps) {
  return (
    <div>
      {alumnos &&
        alumnos.map((alumno) => (
          <li key={alumno.id}>
            {alumno.nombre} - {alumno.matricula} - {alumno.email}
          </li>
        ))}
    </div>
  );
}
