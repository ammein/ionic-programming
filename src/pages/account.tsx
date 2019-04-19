import React, { Component, createRef, RefObject } from 'react';
import Content from '../HOC/content';
import { IonItem, IonLabel , IonInput , IonList, IonListHeader, IonButton , IonToast , IonItemDivider, IonCardContent, IonCard, IonIcon, IonImg, IonButtons, IonText } from '@ionic/react';
import AccountContext, { MyAppConsumer , AppContextInterface } from '../context/accountContext';
import { Props } from '../utils/allProps';
import { InputChangeEventDetail } from '@ionic/core';
import {Storage} from '@capacitor/core';

interface State extends AppContextInterface{
    prevName? : string
    showToast : boolean,
    message? : string
}

class Account extends Component<Props, State>{

    static contextType = MyAppConsumer;

    private buttonElement : React.RefObject<HTMLIonButtonElement> | any;
    private inputElement : React.RefObject<HTMLIonInputElement> | any;

    constructor(props: Props){
        super(props);
        this.state = {
            showToast : false,
            cart : [],
            message : ""
        }
        this.handleSubmit= this.handleSubmit.bind(this);
        this.buttonElement = createRef();
        this.inputElement = createRef();
    }

    setStorage = async (set? : any) =>{
        var obj : any = {};
        obj["cart"] = [];
        obj["cart"].push(this.state.cart);
        await Storage.set({
            key : "user",
            value : JSON.stringify({
                name : (set) ? set : this.state.name,
                getCart : JSON.stringify(obj)
            })
        })

        const user: any = await Storage.get({ key: (set) ? set : "user" });

        if(user.value){
            this.context.name = JSON.parse(user.value).name;
        }
    }

    handleSubmit(e : Event | React.FormEvent){
        e.preventDefault();
        const toast = this.state.showToast;

        this.context.name = this.state.name;

        // Update State
        return this.setState((prevState , props)=>{
            return {
                prevName : prevState.name,
                name: this.state.name,
                showToast: !toast,
                message : "Account Saved"
            }
        })
    }

    getSnapshotBeforeUpdate(prevProps : any, prevState : any){ 
        this.setStorage();
        return {
            name : this.context.name,
            cart: this.context.cart
        }
    }

    componentDidUpdate(prevProps : any, prevState : any, snapshot : any){
        if(
            prevState.name !== snapshot.name ||
            prevState.cart !== snapshot.cart
            ){
            this.setState({
                name : snapshot.name,
                cart : snapshot.cart
            })

            this.context.name = snapshot.name;
            this.context.cart = snapshot.cart;
        }
    }

    /**
     * This is for input IonChange to update state regularly
     * @param e Event Object
     * @param name String for Object Propert
     */
    renderChange(e : Event | React.FormEvent<any>){
        var id = e.currentTarget.name;

        // For dynamically update state based on target value
        this.setState({ [id]: e.currentTarget.value } as Pick<State, keyof State>);
    }

    text_truncate = function (str : string, length : number, ending? : any) {
        if (length == null) {
            length = 100;
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    };

    clearCart = (id : any) =>{
        const getCart = this.state.cart!.filter((el :any , i : number,arr : any[])=>{
            return i !== id;
        });

        this.setState((prevState : any , props : any)=>{
            this.context.cart = getCart;
            return {
                cart : getCart
            }
        })
    }

    clearAllCart = () =>{
        return this.setState((prevState : any , props : any)=>{
            this.context.cart = [];
            return {
                cart : [],
                message : "You have paid all items",
                showToast : true
            }
        })
    }

    renderCart = () =>{
        return this.state.cart!.map((val: any , i : number , arr : any[])=>{
            return (<IonCard key={i + val.name}>
                <IonItem>
                    <IonImg src={val.imgProduct} style={{
                        maxWidth: "100px"
                    }}></IonImg>
                    <IonLabel>{val.name}</IonLabel>
                    <IonButtons>
                    <IonButton color="primary" fill="solid" slot="end" onClick={() => this.props.history.push("/lists/" + val.name)}>View</IonButton>
                    <IonButton color="danger" fill="outline" slot="end" onClick={this.clearCart.bind(this , i)}>Delete</IonButton>
                    </IonButtons>
                </IonItem>
                <IonItem>
                    <IonLabel color="medium" style={{
                        fontSize: "32px"
                    }}><b>RM {val.discountPrice ? parseFloat(val.discountPrice).toFixed(2) : parseFloat(val.price).toFixed(2)}</b></IonLabel>
                </IonItem>

                <IonCardContent>{this.text_truncate(val.specification.join("\n") , 150)}</IonCardContent>
            </IonCard>)
        })
    }

    render(){

        const styleHeaderList : any = {
            fontSize : "20px"
        }

        return(
            <Content>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    style={{
                        fontSize : "20px"
                    }}
                    message={this.state.message}
                    closeButtonText="Okay"
                    showCloseButton={true}
                    duration={1000}
                >
                </IonToast>
                    <IonList>
                        <IonListHeader>
                            <IonLabel color="medium-shade" style={styleHeaderList}>
                                Your Cart (Total {this.state.cart!.length})
                            </IonLabel>
                        </IonListHeader>
                        {this.renderCart()}
                        {this.context.cart.length > 0 ? 
                        <>
                        <IonItem>
                            <IonLabel color="danger" style={{
                                fontSize : "32px",
                                fontWeight : "bold"
                            }}>
                                Total Payment : <br/>RM{this.context.cart.reduce((val : any , next : any , index : number)=>{
                                    if(next.discountPrice){
                                        return parseFloat(parseFloat(val) + next.discountPrice).toFixed(2);
                                    }
                                    return parseFloat(parseFloat(val) + next.price).toFixed(2)
                                } , 0)}
                            </IonLabel>
                        </IonItem>
                        <IonButton color="primary" fill="solid" expand="block" size="default" onClick={this.clearAllCart.bind(this)}>
                            Pay Now
                        </IonButton>
                        </> : <IonText color="medium">
                            <p style={{
                                textAlign : "center"
                            }}>Cart Empty</p>
                        </IonText>}
                        <div style={{
                            marginTop : "50px"
                        }}></div>
                        <IonItemDivider></IonItemDivider>
                            <IonListHeader>
                                <IonLabel color="medium-shade" style={styleHeaderList}>Edit Account</IonLabel>
                            </IonListHeader>
                        <div style={{marginTop : "20px"}}></div>
                        <form onSubmit={this.handleSubmit}>
                            <IonItem>
                                <IonLabel position="floating">Full Name</IonLabel>
                            <IonInput 
                            clearInput
                            placeholder="Your Full Name"
                            onIonInput={((event : any) => this.renderChange(event))} 
                            name="name"
                            value={this.state.name}
                            id="name"
                            ref={this.inputElement}></IonInput>
                            </IonItem>
                            <IonButton 
                            expand="full" 
                            size="default"
                            slot="end" 
                            style={{
                                bottom: "0"
                            }} 
                            onClick={((event: Event) => this.handleSubmit(event))} 
                            ref={this.buttonElement}>Submit</IonButton>
                        </form>
                    </IonList>
            </Content>
        )
    }
}

export default Account;