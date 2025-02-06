import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import "./Home.css";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import AlumnList from "../components/AlumnList/AlumnList";
import AlumnForm from "../components/AlumnForm/AlumnForm";

export default function Home() {
  const { data: alumnos } = useGetAlumnos();

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <AlumnList alumnos={alumnos} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <AlumnForm />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
