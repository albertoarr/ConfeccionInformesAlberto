import React, { useState } from "react";
import {
  IonItem,
  IonInput,
  IonList,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonCheckbox,
  IonText,
} from "@ionic/react";
import { useAlumno } from "../hooks/useAlumno";
import { AlumnoNuevo } from "../interfaces/interfaces";
import { EraseIcon } from "./icons/EraseIcon";
import { SaveIcon } from "./icons/SaveIcon";
import Alumn2PDF from "./Alumn2PDF";

export default function AlumnForm() {
  // Hook de insert en la BD
  const { insertAlumno } = useAlumno(); 
  // State de alumno a introducir
  const [alumnoNuevo, setAlumnoNuevo] = useState<AlumnoNuevo>({
    matricula: "",
    nombre: "",
    sexo: "",
    email: "",
    repetidor: false,
    activo: true,
  });

  // Función para resetear al alumno
  const resetAlumno = () =>
    setAlumnoNuevo({
      matricula: "",
      nombre: "",
      sexo: "",
      email: "",
      repetidor: false,
      activo: true,
    });

  /**
   * Este método, al rellenar y accionar el campo, actualiza el estado del formulario.
   * Se obtiene el nombre y valor del input.
   */
  const handleChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;

    // Verifica si es un checkbox/toggle correctamente (hay que castear target.value)
    const value =
      "checked" in target
        ? target.checked
        : (target as { value: string }).value;

    // Actualiza el state de alumno con los datos del "event"
    setAlumnoNuevo((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  /**
   * Este método recoge los datos del estado y los envía a la API.
   * Se previene la recarga de la página con `e.preventDefault()`.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que se recargue la página
    console.log("Submitting:", alumnoNuevo);
    insertAlumno(alumnoNuevo); // Lanza el POST a la API
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <IonList>
          {/* Campo Matrícula */}
          <IonItem>
            <IonLabel position="fixed">Matrícula</IonLabel>
            <IonInput
              type="text"
              name="matricula"
              value={alumnoNuevo.matricula} // Recoge el valor al mismo tiempo que se escribe
              onIonInput={handleChange}
              required
            />
          </IonItem>

          {/* Campo Nombre */}
          <IonItem>
            <IonLabel position="fixed">Nombre</IonLabel>
            <IonInput
              type="text"
              name="nombre"
              value={alumnoNuevo.nombre}
              onIonInput={handleChange}
              required
            />
          </IonItem>

          {/* Campo Sexo */}
          <IonItem>
            <IonLabel>Sexo</IonLabel>
            <IonSelect
              name="sexo"
              value={alumnoNuevo.sexo}
              onIonChange={handleChange}
            >
              <IonSelectOption value="M">Masculino</IonSelectOption>
              <IonSelectOption value="F">Femenino</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Campo Correo Electrónico */}
          <IonItem>
            <IonLabel position="fixed">Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              name="email"
              value={alumnoNuevo.email}
              onIonInput={handleChange}
              required
            />
          </IonItem>

          {/* Campo Repetidor */}
          <IonItem>
            <IonLabel>Repetidor</IonLabel>
            <IonToggle
              name="repetidor"
              checked={alumnoNuevo.repetidor}
              onIonChange={handleChange}
            />
          </IonItem>

          {/* Campo Activo */}
          <IonItem>
            <IonLabel>Activo</IonLabel>
            <IonToggle
              name="activo"
              checked={alumnoNuevo.activo}
              onIonChange={handleChange}
            />
          </IonItem>
        </IonList>

        {/* Botón para enviar el formulario */}
        <IonButton type="submit" expand="full">
          <SaveIcon />
        </IonButton>
        {/* Botón para borrar el formulario */}
        <IonButton
          color="secondary"
          expand="full"
          onClick={() => resetAlumno()}
        >
          <EraseIcon />
        </IonButton>
      </form>
    </div>
  );
}
