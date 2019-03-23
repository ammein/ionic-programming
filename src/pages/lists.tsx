import React, { Component } from 'react';
import Content from '../HOC/content';
import Home from '../pages/home';
import {getPath} from '../utils/routes-utils';
import Route, { MyRoutes } from '../utils/routes';
import Arrivals from '../pages/arrivals';
import jsonProduct from '../utils/json/product.json';
import {Laptops , Accessories , Desktops} from '../utils/allProps';
import { IonCard , IonCardHeader , IonCardSubtitle ,IonCardContent , IonCardTitle } from '@ionic/react';

type Props = {
    children? : JSX.Element
}

type State = {
    laptops : Laptops[],
    desktops : Desktops[],
    accessories : Accessories[]
}

class Lists extends Component<Props, State>{
    constructor(props : Props){
        super(props);
        this.state = {
            laptops: [...jsonProduct.laptops],
            accessories : [...jsonProduct.accessories],
            desktops : [...jsonProduct.desktops]
        }
    }

    generateToolbar(){
        const laptops = this.state.laptops;
        const style: any = {
            height: "50%",

        }
        return laptops.map((props , index)=>{
            return (
                <IonCard key={index}>
                    <img src={props.imgProduct} style={style}></img>
                    <IonCardHeader>
                        <IonCardSubtitle>{props.brand}</IonCardSubtitle>
                        <IonCardSubtitle>RM {props.price}</IonCardSubtitle>
                        <IonCardTitle>{props.name}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        {props.specification.join(" ")}
                    </IonCardContent>
                </IonCard>
            )
        })
    }

    componentDidMount(){
        console.log(this.state);
    }

    render(){
        return(
            <>
                <Content back={true} currentPath={getPath(this.props)}>
                    {this.generateToolbar()}
                </Content>
            </>
        )
    }
}

export default Lists;