import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import AlumnList from "../components/AlumnList/AlumnList";
import AlumnForm from "../components/AlumnForm/AlumnForm";

export default function Home() {
  return (
    <IonGrid>
      <IonRow
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <IonCol size="7">
          <AlumnList />
        </IonCol>
        <IonCol size="4">hola</IonCol>
      </IonRow>
    </IonGrid>
  );
}
