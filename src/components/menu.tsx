import React , { Component } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton , IonMenuToggle } from '@ionic/react';
import {MyRoutes} from '../utils/routes';

export type Props={
    children? : JSX.Element
}

export type State ={
    allRoutes : any[]
}

class Menu extends Component<Props, State>{

    constructor(props : Props){
        super(props);
        this.state = {
            allRoutes : [...MyRoutes]
        }
    }

    generateMenu(){
        const allRoutes : any= [...this.state.allRoutes];

        debugger;
    }

    render(){
        return (
            <>
                <IonMenu side="start" menuId="first" swipeGesture={true}>
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonTitle>Start Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonItem>Menu Item</IonItem>
                            <IonItem>Menu Item</IonItem>
                            <IonItem>Menu Item</IonItem>
                            <IonItem>Menu Item</IonItem>
                            <IonItem>Menu Item</IonItem>
                        </IonList>
                    </IonContent>
                </IonMenu>
                <IonMenuToggle/>
            </>
        )
    }
}

export default Menu;