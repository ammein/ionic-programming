import * as React from 'react';
import { IonApp, IonSplitPane, IonPage , IonContent } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './theme.css';
import Card from './components/pages/card';

const App = () => (
      <div id="app">
        <IonApp>
        <IonContent
          scrollEvents={true}
          onIonScrollStart={() => { }}
          onIonScroll={() => { }}
          onIonScrollEnd={() => { }}>
        <Card />
        </IonContent>
        </IonApp>
      </div>
);

export default App;