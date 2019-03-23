import React , { Component } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonMenuToggle, IonLabel, IonThumbnail, IonIcon } from '@ionic/react';
import {MyRoutes} from '../utils/routes';
import { Link, NavLink } from 'react-router-dom';
import './menu.less';

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
        const allRoutes = [...this.state.allRoutes];

        return allRoutes.map((props, index) =>{
            return (
                <IonMenuToggle key={props.title} autoHide={false}>
                {/* Use react-router-dom for better switching without href */}
                    <NavLink to={props.path} activeClassName="activeLink">
                        <IonItem>
                            {props.thumbnail ? <IonThumbnail slot="start">
                                <img src={props.thumbnail} />
                            </IonThumbnail> : null}
                            {props.icon ? 
                            <IonIcon slot="start" name={props.icon}></IonIcon> : null}
                            <IonLabel>
                                {props.title}
                            </IonLabel>
                        </IonItem>
                    </NavLink>
                </IonMenuToggle>
            )
        })
    }

    render(){
        return (
            <IonMenu type="overlay" side="start" contentId="main" swipeGesture={true}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        {this.generateMenu()}
                    </IonList>
                </IonContent>
            </IonMenu>
        )
    }
}

export default Menu;