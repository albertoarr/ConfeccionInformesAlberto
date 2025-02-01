import { IonContent, IonText, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonText>Hola putita</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
