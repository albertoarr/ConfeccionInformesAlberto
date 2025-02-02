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
        <div
          className="d-flex justify-content-center align-items-center bg-secondary"
          style={{ height: "100vh" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="p-5 bg-light border rounded">
                  <h2>Contenedor 1</h2>
                  <p>Contenido dentro del contenedor 1.</p>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="p-5 bg-light border rounded">
                  <h2>Contenedor 2</h2>
                  <p>Contenido dentro del contenedor 2.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
