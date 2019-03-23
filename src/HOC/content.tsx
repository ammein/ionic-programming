import React, { PropsWithChildren, ReactNode } from 'react';
import { IonApp, IonSplitPane, IonPage, IonContent } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import '../theme.css';
import Header from '../components/header';
import { Props } from '../utils/allProps';

const content : React.SFC<Props> = (props : Props)  => (
    <IonContent forceOverscroll={true} scrollEvents={true}>
        <Header back={props.back} currentPath={props.currentPath}/>
        {props.children}
    </IonContent>
)

export default content;