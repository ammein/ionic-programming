import React , { Component } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonList, IonListHeader, IonButtons, IonRippleEffect , IonImg } from '@ionic/react';
import {Link} from 'react-router-dom';
import {getPath , getTitle} from '../utils/routes-utils';
import Arrivals from './arrivals';
import Content from '../HOC/content';
import ImgFirst from '../assets/img/bVv9T7sdQkadNMHM9SrK_DellPricingPoster_01.jpg';
import ImgSecond from '../assets/img/dsQVBGUFSN2G4Y3Dl0yb_images.jpeg';
import {space, RoutesDef} from '../utils/allProps';
import Routes , {MyRoutes} from '../utils/routes';
import Lists from './lists';
import AccountContext , {MyAppConsumer} from '../context/accountContext';
import { Storage, Plugins } from '@capacitor/core';

const { App } = Plugins;

export interface Props {
    children? : JSX.Element,
    history : any
}

type State = {
    render? : boolean,
    type : React.ReactNode
}

class Home extends Component<Props , State>{

    static contextType = MyAppConsumer;

    constructor(props : Props){
        super(props);
    }

    clickHandler(event : MouseEvent | any){
        const myContext : any = this.context;
        if(event.currentTarget.textContent === "Laptops"){
            myContext.chooseList = "laptops";
        }
        if(event.currentTarget.textContent === "Desktops"){
            myContext.chooseList = "desktops";
        }
        if(event.currentTarget.textContent === "Accessories"){
            myContext.chooseList = "accessories";
        }
    }

    render(){
        const style : any = {
            fontSize : "20px"
        }

        const styleImg : any = {
            display: "block",
            width: "100%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto"
        }

        const center : any = {
            margin : "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }

        // Hacky "Object is possibly 'undefined' on App" . Therefore ,whenever you have that . Just put ! before the method like -> App!.addListener
        App!.addListener("backButton", async (data: any) => {
            const title: string = (window.location.hash.length > 1) ? window.location.hash.replace("#", "") : window.location.pathname;
            console.log("Back Button : \n", data);
            if (title === "/") {
                console.log("Exiting App");
                window.plugins.toast.show('Exiting App. Thank you for using the app.', 'long', 'bottom');
                setTimeout(() => {
                    App!.exitApp();
                }, 1000);
                return;
            }
            return this.props.history.goBack();
        })

        return (
            <>
               <Content>
                    <div>
                        <IonImg src={ImgFirst} style={styleImg}></IonImg>
                    </div>
                        <div style={space}></div>
                        <div>
                        <IonImg src={ImgSecond} style={styleImg}></IonImg>
                        </div>
                        <div style={space}></div>
                        <div style={center}>
                            <IonButtons>
                                <Link to="/lists">
                                    <IonButton color="secondary" expand="block" fill="solid" size="large" onClick={(props : MouseEvent)=> this.clickHandler(props)}>
                                        <IonRippleEffect></IonRippleEffect>
                                        Laptops
                                    </IonButton>
                                </Link>
                                <Link to="/lists">
                                    <IonButton color="secondary" expand="block" fill="solid" size="large" onClick={(props: MouseEvent) => this.clickHandler(props)}>
                                    <IonRippleEffect></IonRippleEffect>
                                        Desktops
                                    </IonButton>
                                </Link>
                            <Link to="/lists">
                                <IonButton color="secondary" expand="block" fill="solid" size="large" onClick={(props: MouseEvent) => this.clickHandler(props)}>
                                    <IonRippleEffect></IonRippleEffect>
                                        Accessories
                                    </IonButton>
                            </Link>
                            </IonButtons>
                        </div>
               </Content>
            </>
        );
    }
}

export default Home;