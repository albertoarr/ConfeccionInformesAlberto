import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import { useGetAlumnos } from "../hooks/useGetAlumnos";
import AlumnList from "../components/AlumnList/AlumnList";
import AlumnForm from "../components/AlumnForm/AlumnForm";

export default function Home() {
  const { data: alumnos } = useGetAlumnos();

  return (
    <IonPage>
      <IonContent className="container-fluid">
        <div className="row bg-primary">
          <div className="col-12">
            <AlumnList alumnos={alumnos} />
          </div>
          <div className="col-12">
            <AlumnForm />
          </div>
          <div className="col-2">
            <p>hola</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
