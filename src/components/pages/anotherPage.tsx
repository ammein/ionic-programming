import React from 'react';
import history from 'history/createBrowserHistory';
import { IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/react';

export interface Props {
    children? : JSX.Element
}

class AnotherPage extends React.Component<any , any> {

    render(){
        return (
            <>
                {/*-- List of Text Items --*/}
                <IonList>
                    <IonItem key="Pokémon Yellow">
                        <IonLabel>Pokémon Yellow</IonLabel>
                    </IonItem>
                    <IonItem key="Mega Man X">
                        <IonLabel>Mega Man X</IonLabel>
                    </IonItem>
                    <IonItem key="The Legend of Zelda">
                        <IonLabel>The Legend of Zelda</IonLabel>
                    </IonItem>
                    <IonItem key="Pac-Man">
                        <IonLabel>Pac-Man</IonLabel>
                    </IonItem>
                    <IonItem key="Super Mario World">
                        <IonLabel>Super Mario World</IonLabel>
                    </IonItem>
                </IonList>
            </>
        )
    }
}

export default AnotherPage;