import React, { Component } from 'react';
import Content from '../HOC/content';
import {getPath} from '../utils/routes-utils';
import { Route,Link} from 'react-router-dom';
import MyRoute, { MyRoutes } from '../utils/routes';
import jsonProduct from '../utils/json/product.json';
import {Laptops , Accessories , Desktops} from '../utils/allProps';
import { IonCard , IonCardHeader , IonCardSubtitle ,IonCardContent , IonCardTitle, IonRippleEffect, IonImg } from '@ionic/react';
import AccountContext, { MyAppConsumer } from '../context/accountContext';
import {Props} from '../utils/allProps';
import View from '../pages/view';
import LazyLoad from 'react-lazyload';

interface MyProps extends Props {
    children? : JSX.Element,
    filter? : string,
}

type State = {
    laptops : Laptops[],
    desktops : Desktops[],
    accessories : Accessories[],
    filter? : string
}

class Lists extends Component<MyProps, State>{

    static contextType = MyAppConsumer;

    constructor(props: MyProps){
        super(props);
        this.state = {
            laptops: [...jsonProduct.laptops],
            accessories : [...jsonProduct.accessories],
            desktops : [...jsonProduct.desktops]
        }
    }

    goToList(name : string)
    {
        this.props.history.push("/lists/"+name);
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
                    <IonCard key={index} class="ion-activatable" onClick={((event : Event)=> this.goToList(props.name))}>
                        <IonRippleEffect type="unbounded"></IonRippleEffect>
                            <IonImg src={props.imgProduct} style={style}></IonImg>
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
                            <IonCard key={index} class="ion-activatable" onClick={((event : Event)=> this.goToList(props.name))}>
                                <IonRippleEffect type="unbounded"></IonRippleEffect>
                                    <IonImg src={props.imgProduct} style={style}></IonImg>
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
        return this.setState((prevState : any , props : any)=>{
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
                    {this.props.match.url === this.props.location.pathname ? this.generateList(this.context.chooseList) : null}
                    {/* Nested Route here for match.id */}
                    <Route path={`${this.props.match.url}/:id`} render={(props : any) => <View {...props}></View>}></Route>
                </Content>
            </>
        )
    }
}

export default Lists;