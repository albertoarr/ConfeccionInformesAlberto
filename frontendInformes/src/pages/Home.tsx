import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import AlumnList from "../components/AlumnList/AlumnList";
import AlumnForm from "../components/AlumnForm/AlumnForm";

export default function Home() {
  const { data: alumnos } = useGetAlumnos();

  return (
    <IonPage>
      <IonContent fullscreen>
        <AlumnList alumnos={alumnos} />
        <AlumnForm/>
      </IonContent>
    </IonPage>
  );
}
