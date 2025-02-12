import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import AlumnList from "../components/AlumnList";
import AlumnForm from "../components/AlumnForm";
import Alumn2PDF from "../components/Alumn2PDF";
import AlumnCharts from "../components/AlumnCharts";

export default function Home() {
  return (
    <IonContent>
      <IonToolbar>
        <IonTitle style={{ flex: 1, textAlign: "center" }}>
          Gestión de Matrículas
        </IonTitle>
        <div slot="start" style={{ padding: "10px" }}>
          <Alumn2PDF />
        </div>
      </IonToolbar>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IonCol size="7">
            <AlumnList />
          </IonCol>
          <IonCol size="5">
            <AlumnForm />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <AlumnCharts />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
