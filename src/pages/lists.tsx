import React, { Component } from 'react';
import Content from '../HOC/content';
import {getPath} from '../utils/routes-utils';
import Route, { MyRoutes } from '../utils/routes';
import jsonProduct from '../utils/json/product.json';
import {Laptops , Accessories , Desktops} from '../utils/allProps';
import { IonCard , IonCardHeader , IonCardSubtitle ,IonCardContent , IonCardTitle } from '@ionic/react';
import AccountContext from '../context/accountContext';

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
        const all : any = {...this.state};
        const style: any = {
            height: "50%"
        }
        for(var property in all){
            if(all.hasOwnProperty(property)){
                if(list === property){
                    return (
                        <IonCard key={property}>
                            <img src={all[property].imgProduct} style={style}></img>
                            <IonCardHeader>
                                <IonCardSubtitle>{all[property].brand}</IonCardSubtitle>
                                <IonCardSubtitle>RM {all[property].price}</IonCardSubtitle>
                                <IonCardTitle>{all[property].name}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                {all[property].specification}
                            </IonCardContent>
                        </IonCard>
                    )
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
                        {this.generateList(this.props.filter)}
                </Content>
            </>
        )
    }
}

export default Lists;