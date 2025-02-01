import {
  IonContent,
  IonText,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { getAlumnos } from "../hooks/getAlumnos";
import { AlumnList } from "../components/AlumnList/AlumnList";

export function Home() {
  const { data: alumnos } = getAlumnos();

  return (
    <IonPage>
      <IonContent fullscreen>
        <AlumnList alumnos={alumnos} />
      </IonContent>
    </IonPage>
  );
}
