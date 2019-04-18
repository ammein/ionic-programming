import React, { Component } from 'react';
import Content from '../HOC/content';
import {getPath} from '../utils/routes-utils';
import { Route,Link} from 'react-router-dom';
import MyRoute, { MyRoutes } from '../utils/routes';
import jsonProduct from '../utils/json/product.json';
import {Laptops , Accessories , Desktops} from '../utils/allProps';
import { IonCard , IonCardHeader , IonCardSubtitle ,IonCardContent , IonCardTitle, IonRippleEffect, IonImg, IonRow, IonCol , IonGrid } from '@ionic/react';
import AccountContext, { MyAppConsumer } from '../context/accountContext';
import {Props} from '../utils/allProps';
import View from '../pages/view';
import Col from '../../src/components/col';
import Aux from '../HOC/auxiliary';

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

        var Card = ((props : any , index : number) => (
            <Aux key={index}>
                <IonCard key={index} class="ion-activatable" onClick={((event: Event) => this.goToList(props.name))}>
                    <IonRippleEffect type="unbounded"></IonRippleEffect>
                    <IonImg src={props.imgProduct} style={style}></IonImg>
                    <IonCardHeader>
                        <IonCardSubtitle color="primary">{props.brand}</IonCardSubtitle>
                        {props.discountPrice !== null || props.discountPrice? 
                        <>
                            <IonCardSubtitle color="medium"><s>RM {props.price}</s></IonCardSubtitle>
                            <IonCardSubtitle color="danger" style={{
                                fontSize: "32px"
                            }}><b>RM {props.discountPrice}</b>
                            </IonCardSubtitle>   
                        </> : 
                            <IonCardSubtitle color="danger" style={{
                                fontSize: "32px"
                            }}><b>RM {props.price}</b></IonCardSubtitle>}
                        <IonCardTitle>{props.name}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        {props.specification.join("\n")}
                    </IonCardContent>
                </IonCard>
            </Aux>
        ));

        // If press product list from the menu
        if(
            (list === undefined) || 
            (list === "")
            ){
            return all.map((props : any, index : any , arr : any[]) =>{
                return Card(props,index);
            })
        }else{
            // If press from the button
            for (var property in reindex) {
                if (reindex.hasOwnProperty(property) && property === list) {
                    return reindex[property].map((props : any , index : any) => {
                        return Card(props, index);
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
        console.log(this.context);
    }

    render(){
        return(
            <>
                <Content back={true} currentPath={getPath(this.constructor)}>
                    {this.props.match.url === this.props.location.pathname ? window.innerWidth > 1000 ? <IonGrid>{this.generateList(this.context.chooseList)}</IonGrid> : this.generateList(this.context.chooseList) : null}
                    {/* Nested Route here for match.id */}
                    <Route path={`${this.props.match.url}/:id`} render={(props : any) => <View myProps={this.state} {...props}></View>}></Route>
                </Content>
            </>
        )
    }
}

export default Lists;