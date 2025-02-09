import { useState } from "react";
import { useUpdateAlumno } from "../hooks/useUdateAlumno";
import { Alumno } from "../interfaces/interfaces";

export default function UpdateAlumno() {
  const { updateAlumno } = useUpdateAlumno();
  const [alumno, setAlumno] = useState<Alumno>({
    id: 16,
    matricula: "12345",
    nombre: "Juan Pérez",
    sexo: "Masculino",
    email: "juan@example.com",
    repetidor: false,
    activo: true,
  });

  const handleUpdate = async () => {
    const result = await updateAlumno(alumno);
    alert("Alumno actualizado correctamente");
  };

  return (
    <div>
      <button
        onClick={() => {
          handleUpdate();
        }}
      >
        Actualizar
      </button>
    </div>
  );
}
