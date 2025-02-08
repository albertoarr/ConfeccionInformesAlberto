import React, { useState } from "react";
import { IonItem, IonInput, IonList } from "@ionic/react";
import { useInsertAlumno } from "../../hooks/useInsertAlumno";
import { AlumnoNuevo } from "../../interfaces/interfaces";


export default function AlumnForm() {
  const { insertAlumno } = useInsertAlumno();
  const [alumnoNuevo, setAlumnoNuevo] = useState<AlumnoNuevo>({
    matricula: "",
    nombre: "",
    sexo: "",
    email: "",
    repetidor: false,
    activo: true
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setAlumnoNuevo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", alumnoNuevo);
    // Aquí iría tu lógica para enviar los datos.
    insertAlumno(alumnoNuevo)
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <IonList>
            <IonItem>
              <IonInput
                label="Register"
                type="text"
                name="matricula"
                value={alumnoNuevo.matricula}
                onIonChange={handleChange}
                required
              />
            </IonItem>
          </IonList>
        </div>
        <div></div>
      </form>
    </div>
  );
}
