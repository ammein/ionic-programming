import React , { Component } from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonList, IonListHeader, IonButtons } from '@ionic/react';
import {Link} from 'react-router-dom';
import {getPath , getTitle} from '../utils/routes-utils';
import Arrivals from './arrivals';
import Content from '../HOC/content';
import ImgFirst from '../assets/img/bVv9T7sdQkadNMHM9SrK_DellPricingPoster_01.jpg';
import ImgSecond from '../assets/img/dsQVBGUFSN2G4Y3Dl0yb_images.jpeg';
import {space} from '../utils/allProps';

export interface Props {
    children? : JSX.Element
}

class Home extends Component{

    constructor(props : Props){
        super(props);
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

        return (
            <>
               <Content>
                    <div>
                        <img src={ImgFirst} style={styleImg}/>
    </div>
                        {/* <IonCard>
                            <img src={ImgSecond} style={styleImg}/>
                        </IonCard> */}
                        <div style={space}></div>
                        <div>
                            <img src={ImgSecond} style={styleImg} />
                        </div>
                        <div style={space}></div>
                        <div style={center}>
                            <IonButtons>
                                <Link to="">
                                    <IonButton color="secondary" expand="block" fill="solid" size="large">
                                        Laptops
                                    </IonButton>
                                </Link>
                                <IonButton color="secondary" expand="block" fill="solid" size="large">
                                    Desktops
                                </IonButton>
                                <IonButton color="secondary" expand="block" fill="solid" size="large">
                                    Accessories
                                </IonButton>
                            </IonButtons>
                        </div>
               </Content>
            </>
        );
    }
}

export default Home;