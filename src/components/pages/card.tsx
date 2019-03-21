import React , { Component } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import {Link} from 'react-router-dom';
import { MyRoutes } from '../../utils/routes';
import { Interface } from 'readline';
import {getPath , getTitle} from '../../utils/routes-utils';
import AnotherPage from '../pages/anotherPage';

export interface Props {
    children? : JSX.Element
}

class Cards extends Component{

    constructor(props : Props){
        super(props);
    }

    render(){
        return (
            <>
                <Link to={getPath(AnotherPage)}>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                            <IonCardTitle>{getTitle(AnotherPage)}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            Keep close to Nature's heart... and break clear away, once in awhile,
                            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </IonCardContent>
                    </IonCard>
                </Link>

                <IonCard>
                    <IonItem>
                        <IonIcon name="pin" slot="start" />
                        <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                        <IonButton fill="outline" slot="end">View</IonButton>
                    </IonItem>

                    <IonCardContent>
                        This is content, without any paragraph or header tags,
                        within an ion-cardContent element.
      </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonItem href="#" class="activated">
                        <IonIcon name="wifi" slot="start" />
                        <IonLabel>Card Link Item 1 .activated</IonLabel>
                    </IonItem>

                    <IonItem href="#">
                        <IonIcon name="wine" slot="start" />
                        <IonLabel>Card Link Item 2</IonLabel>
                    </IonItem>

                    <IonItem class="activated">
                        <IonIcon name="warning" slot="start" />
                        <IonLabel>Card Button Item 1 .activated</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonIcon name="walk" slot="start" />
                        <IonLabel>Card Button Item 2</IonLabel>
                    </IonItem>
                </IonCard>
            </>
        );
    }
}

export default Cards;