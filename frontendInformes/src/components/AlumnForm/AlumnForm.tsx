import React, { useState } from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCheckbox,
  IonList,
} from "@ionic/react";

interface NewStudent {
  matricula: string;
  nombre: string;
  sexo: string;
  email: string;
  repetidor: boolean;
}

export default function AlumnForm() {
  const [newStudent, setNewStudent] = useState<NewStudent>({
    matricula: "",
    nombre: "",
    sexo: "",
    email: "",
    repetidor: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", newStudent);
    // Aquí iría tu lógica para enviar los datos.
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonInput
              label="Register"
              type="text"
              name="matricula"
              value={newStudent.matricula}
              onIonChange={handleChange}
              required
            />
          </IonItem>
        </IonList>
      </form>
    </div>
  );
}
