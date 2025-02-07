import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import AlumnList from "../components/AlumnList/AlumnList";
import AlumnForm from "../components/AlumnForm/AlumnForm";

export default function Home() {
  const { data: alumnos } = useGetAlumnos();

  return (
    <IonGrid>
      <IonRow style={{ justifyContent: "center", alignItems: "center"}}>
        <IonCol size="10">
          <AlumnList alumnos={alumnos} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <AlumnForm />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
