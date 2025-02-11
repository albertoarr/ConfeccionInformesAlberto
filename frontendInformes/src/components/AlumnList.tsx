import { useEffect, useState, useRef } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { trash, create } from "ionicons/icons";
import { Alumno } from "../interfaces/interfaces";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import { useAlumno } from "../hooks/useAlumno";
import AlumnModal from "./AlumnModal"; // Importa el componente AlumnModal
import Alumn2PDF from "./Alumn2PDF";

export default function AlumnList() {
  const { deleteAlumno } = useAlumno();
  const { data } = useGetAlumnos(); // Obtener los alumnos
  const [alumnos, setAlumnos] = useState<Alumno[] | undefined>(data); // Alumnos a mostrar en la tabla
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null); // Alumno seleccionado para editar
  const modal = useRef<HTMLIonModalElement>(null); // Referencia al modal

  useEffect(() => {
    setAlumnos(data); // Actualizar la lista de alumnos cuando se obtienen nuevos datos
  }, [data]);

  const handleDelete = async (alumno: Alumno) => {
    if (alumno) {
      const response = await deleteAlumno(alumno);
      if (response.error) {
        alert(response.error); // Si hay error al eliminar, mostrarlo
      } else {
        alert("Alumno eliminado con éxito de la base de datos");
        window.location.reload();
      }
    }
  };

  const handleEdit = async (alumno: Alumno) => {
    await setSelectedAlumno(alumno); // Establecer el alumno seleccionado para el modal
    modal.current?.present(); // Mostrar el modal
  };

  return (
    <div
      className="table-bordered table-responsive"
      style={{ maxHeight: "75vh" }}
    >
      <table className="table table-dark table-striped text-center align-middle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Sexo</th>
            <th>Email</th>
            <th>Repetidor</th>
            <th>Activo</th>
            <th>Editar</th>
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
                  {/* Botón para abrir el modal de edición */}
                  <IonButton onClick={() => handleEdit(alumno)}>
                    <IonIcon icon={create} />
                  </IonButton>
                </td>
                <td>
                  {/* Botón para eliminar alumno */}
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

      {/* Modal para editar el alumno seleccionado */}
      {selectedAlumno && <AlumnModal modal={modal} alumno={selectedAlumno} />}
    </div>
  );
}
