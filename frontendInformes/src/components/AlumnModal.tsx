import React, { useRef, useState, useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonCheckbox,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { Alumno } from "../interfaces/interfaces"; // Importa la interfaz Alumno
import { useAlumno } from "../hooks/useAlumno";

export default function AlumnModal({
  modal, // Recibe el modal ref desde el componente principal
  alumno, // Recibe el alumno seleccionado desde el componente principal
}: {
  modal: React.RefObject<HTMLIonModalElement>; // Tipo de referencia para el modal
  alumno: Alumno; // Tipo de alumno que se pasará al modal
}) {
  const { updateAlumno } = useAlumno(); // Hook para actualizar los datos del alumno

  // Estado del alumno que será editado
  const [alumnoEditado, setAlumnoEditado] = useState<Alumno>(alumno);

  // Función para manejar el cambio de valores en los inputs
  const handleChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;
    const value =
      "checked" in target
        ? target.checked
        : (target as { value: string }).value;
    setAlumnoEditado((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };

  // Función que se ejecuta cuando el usuario hace clic en "Confirmar"
  const handleConfirm = () => {
    updateAlumno(alumnoEditado);
    modal.current?.dismiss();
    window.location.reload();
  };

  useEffect(() => {
    setAlumnoEditado(alumno);
  }, [alumno]);

  return (
    <IonModal
      ref={modal} // Referencia al modal
      onWillDismiss={(event) => console.log("Modal dismissed", event)} // Evento cuando el modal se cierra
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              Cancelar
            </IonButton>
          </IonButtons>
          <IonTitle>Editar Alumno</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={handleConfirm}>
              Confirmar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="fixed">Matrícula</IonLabel>
          <IonInput
            type="text"
            name="matricula"
            value={alumnoEditado.matricula}
            onIonInput={handleChange}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Nombre</IonLabel>
          <IonInput
            type="text"
            name="nombre"
            value={alumnoEditado.nombre}
            onIonInput={handleChange}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel>Sexo</IonLabel>
          <IonSelect
            name="sexo"
            value={alumnoEditado.sexo}
            onIonChange={handleChange}
          >
            <IonSelectOption value="M">Masculino</IonSelectOption>
            <IonSelectOption value="F">Femenino</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Correo Electrónico</IonLabel>
          <IonInput
            type="email"
            name="email"
            value={alumnoEditado.email}
            onIonInput={handleChange}
            required
          />
        </IonItem>

        <IonItem>
          <IonLabel>Repetidor</IonLabel>
          <IonToggle
            name="repetidor"
            checked={alumnoEditado.repetidor}
            onIonChange={handleChange}
          />
        </IonItem>

        <IonItem>
          <IonLabel>Activo</IonLabel>
          <IonCheckbox
            name="activo"
            checked={alumnoEditado.activo}
            onIonChange={handleChange}
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
}
