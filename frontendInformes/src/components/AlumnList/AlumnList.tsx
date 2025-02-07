import React, { useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import { Alumno } from "../../interfaces/interfaces";
import { useDeleteAlumno } from "../../hooks/useDeleteAlumno";
import "./AlumnList.css";
import { EraserIcon } from "../icons/EraserIcon";

interface AlumnListProps {
  alumnos?: Alumno[];
}

export default function AlumnList({ alumnos }: AlumnListProps) {
  const { deleteAlumno } = useDeleteAlumno();

  const handleDelete = async (alumno: Alumno) => {
    if (alumno) {
      const response = await deleteAlumno(alumno);
      if (response.error) {
        alert(response.error); // Si ocurre un error, lo mostramos
      } else {
        alert("Alumno eliminado con éxito");
      }
    }
  };

  return (
    <div className="alumnList table-responsive">
      <table className="table table-dark table-striped table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Sexo</th>
            <th>Email</th>
            <th>Repetidor</th>
            <th>Activo</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {alumnos &&
            alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.matricula}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.sexo}</td>
                <td>{alumno.email}</td>
                <td>{alumno.repetidor ? "sí" : "no"}</td>
                <td>{alumno.activo ? "sí" : "no"}</td>
                <td>
                  <IonButton
                    color="danger"
                    onClick={() => handleDelete(alumno)}
                  >
                    <IonIcon icon={trash} />
                  </IonButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
