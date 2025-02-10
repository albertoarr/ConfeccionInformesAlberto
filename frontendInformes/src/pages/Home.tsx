import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/react";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import AlumnList from "../components/AlumnList";
import AlumnForm from "../components/AlumnForm";

export default function Home() {
  return (
    <IonGrid>
    <IonRow
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <IonCol size="7">
        <AlumnList />
      </IonCol>
      <IonCol size="5"><AlumnForm/></IonCol>
    </IonRow>
  </IonGrid>
  );
}
