import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import Content from '../HOC/content';
import { Props } from '../utils/headerProps';

class Arrivals extends React.Component<Props , {}> {

    render(){
        return (
            <>
                <Content>
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
                </Content>
            </>
        )
    }
}

export default Arrivals;