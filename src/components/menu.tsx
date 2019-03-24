import React , { Component } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonMenuToggle, IonLabel, IonThumbnail, IonIcon } from '@ionic/react';
import {MyRoutes} from '../utils/routes';
import { Link, NavLink } from 'react-router-dom';
import './menu.less';
import { MyAppConsumer } from '../context/accountContext';

export type Props={
    children? : JSX.Element
}

export type State ={
    allRoutes : any[]
}

class Menu extends Component<Props, State>{

    static contextType = MyAppConsumer;

    constructor(props : Props){
        super(props);
        this.state = {
            allRoutes : [...MyRoutes]
        }
    }

    resetList(e : MouseEvent , context : any){
        context.chooseList = undefined;
    }

    generateMenu(){
        const allRoutes = [...this.state.allRoutes];

        const filterRoutes: any[] = allRoutes.filter((value, index) => {
            return value.menu === undefined;
        })

        return filterRoutes.map((props, index) =>{
            return (
                <IonMenuToggle key={props.title} autoHide={false}>
                {/* Use react-router-dom for better switching without href */}
                    <Link to={props.path}>
                        <IonItem onClick={props.path === "/lists" ? ((event: MouseEvent) => this.resetList(event,this.context)) : (()=>"")}>
                            {props.thumbnail ? <IonThumbnail slot="start">
                                <img src={props.thumbnail} />
                            </IonThumbnail> : null}
                            {props.icon ? 
                            <IonIcon slot="start" name={props.icon}></IonIcon> : null}
                            <IonLabel>
                                {props.title}
                            </IonLabel>
                        </IonItem>
                    </Link>
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