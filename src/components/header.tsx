import React , { Component } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonIcon, IonButton, IonSegmentButton , IonSegment , IonLabel } from '@ionic/react';
import Route , {MyRoutes} from '../utils/routes';
import {Props} from '../utils/allProps';

export interface State{
    title? : string
}

class Header extends Component<Props,State>{

    constructor(props : Props){
        super(props);

        this.state = {
            title : ""
        }
    }


    componentDidMount(){
        const title: string = window.location.pathname;
        console.log(MyRoutes);
        for(var property in MyRoutes){
            if(MyRoutes.hasOwnProperty(property)){
                if (MyRoutes[property].path === title){
                    return this.setState((prevState, props) => {
                        return {
                            title: MyRoutes[property].title
                        }
                    })
                }
            }
        }
        
    }

    render(){
        return(
            <>
                <IonHeader>
                    <IonToolbar>
                        {/* Wrap it with IonButtons to group the button */}
                        <IonButtons slot="start">
                        {/* Special Menu Button that toggles the menu */}
                        { this.props.back ?
                                    <IonBackButton 
                                        goBack={() => { }}
                                        defaultHref={this.props.currentPath}>
                                        </IonBackButton>: <IonMenuButton>
                                    {/* <button></button> */}
                                    <IonButton>
                                        <IonIcon slot="icon-only" name="menu"></IonIcon>
                                    </IonButton>
                                </IonMenuButton>}                    
                        </IonButtons>
                        <IonTitle>{this.state.title}</IonTitle>
                    </IonToolbar>
                    {this.props.enableToolbar ? <IonSegment>
                        <IonSegmentButton value="friends">
                            <IonLabel>Friends</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="enemies">
                            <IonLabel>Enemies</IonLabel>
                        </IonSegmentButton>
                    </IonSegment> : null}
                </IonHeader>
                {this.props.children}
            </>
        )
    }
}

export default Header;