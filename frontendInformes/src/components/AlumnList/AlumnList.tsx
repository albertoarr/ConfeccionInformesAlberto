import React from "react";
import { Alumno } from "../../interfaces/interfaces";

interface AlumnListProps {
    data: Alumno[]|undefined
}

export function AlumnList({ data }: AlumnListProps) {
  return (
    <div>
      {data &&
        data.map((alumno) => (
          <li key={alumno.id}>
            {alumno.nombre} - {alumno.matricula} - {alumno.email}
          </li>
        ))}
    </div>
  );
}
