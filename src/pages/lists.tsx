import React, { Component } from 'react';
import Content from '../HOC/content';
import {getPath} from '../utils/routes-utils';
import Route, { MyRoutes } from '../utils/routes';
import jsonProduct from '../utils/json/product.json';
import {Laptops , Accessories , Desktops} from '../utils/allProps';
import { IonCard , IonCardHeader , IonCardSubtitle ,IonCardContent , IonCardTitle } from '@ionic/react';
import AccountContext, { MyAppConsumer } from '../context/accountContext';

type Props = {
    children? : JSX.Element,
    filter? : string
}

type State = {
    laptops : Laptops[],
    desktops : Desktops[],
    accessories : Accessories[],
    filter? : string
}

class Lists extends Component<Props, State>{

    static contextType = MyAppConsumer;

    constructor(props : Props){
        super(props);
        this.state = {
            laptops: [...jsonProduct.laptops],
            accessories : [...jsonProduct.accessories],
            desktops : [...jsonProduct.desktops]
        }
    }

    generateList(list : any) : any{
        const laptops = this.state.laptops;
        const desktops = this.state.desktops;
        const accessories = this.state.accessories;
        const reindex : any = {...this.state};
        const all : any = [...laptops , ...desktops , ...accessories];
        const style: any = {
            height: "50%"
        }
        if(
            (list === undefined) || 
            (list === "")
            ){
            return all.map((props : any, index : any) =>{
                return (
                    <IonCard key={index}>
                        <img src={props.imgProduct} style={style}></img>
                        <IonCardHeader>
                            <IonCardSubtitle>{props.brand}</IonCardSubtitle>
                            <IonCardSubtitle>RM {props.price}</IonCardSubtitle>
                            <IonCardTitle>{props.name}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            {props.specification}
                        </IonCardContent>
                    </IonCard>
                )
            })
        }else{
            for (var property in reindex) {
                if (reindex.hasOwnProperty(property) && property === list) {
                    return reindex[property].map((props : any , index : any) => {
                        return (
                            <IonCard key={index}>
                                <img src={props.imgProduct} style={style}></img>
                                <IonCardHeader>
                                    <IonCardSubtitle>{props.brand}</IonCardSubtitle>
                                    <IonCardSubtitle>RM {props.price}</IonCardSubtitle>
                                    <IonCardTitle>{props.name}</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    {props.specification}
                                </IonCardContent>
                            </IonCard>
                        )
                    })
                }          
            }
        }
    }

    getList(state : string){
        // updateFilter
        return this.setState((prevState , props)=>{
            return {
                filter: state
            }
        })
    }

    componentDidMount(){
        console.log(this.state);
        console.log(this.context);
    }

    render(){
        return(
            <>
                <Content back={true} currentPath={getPath(this.constructor)}>
                        {this.generateList(this.context.chooseList)}
                </Content>
            </>
        )
    }
}

export default Lists;