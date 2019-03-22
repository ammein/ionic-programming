import React from 'react';
import { IonApp, IonSplitPane, IonPage , IonContent } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './theme.css';
import Header from './components/header';
import Menu from './components/menu';
import Cards from './pages/card';
import Content from './HOC/content'

const App = () => (
      <div id="app">
        <IonApp>
          <Content>
            <Menu/>
              <Header>
              <Cards></Cards>
                </Header>
          </Content>
        </IonApp>
      </div>
);

export default App;