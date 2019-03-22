import React from 'react';
import { IonApp } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import Home from './pages/home';
import Content from './HOC/content'

const App = () => (
      <div id="app">
        <IonApp>
          <Content>
            <Home></Home>
          </Content>
        </IonApp>
      </div>
);

export default App;