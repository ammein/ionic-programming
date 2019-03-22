import React, { PropsWithChildren, ReactNode } from 'react';
import { IonApp, IonSplitPane, IonPage, IonContent } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import '../theme.css';

export interface Props {
    children? : ReactNode
}

const content : React.SFC = (props : Props)  => (
    <IonContent>
        {props.children}
    </IonContent>
)

export default content;