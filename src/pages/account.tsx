import React, { Component, createRef, RefObject } from 'react';
import Content from '../HOC/content';
import { IonItem, IonLabel , IonInput , IonList, IonListHeader, IonButton , IonToast , IonItemDivider, IonCardContent, IonCard, IonIcon, IonImg } from '@ionic/react';
import AccountContext, { MyAppConsumer , AppContextInterface } from '../context/accountContext';
import { Props } from '../utils/allProps';
import { InputChangeEventDetail } from '@ionic/core';
import {Storage} from '@capacitor/core';

interface State extends AppContextInterface{
    prevName? : string
    showToast : boolean
}

class Account extends Component<Props, State>{

    static contextType = MyAppConsumer;

    private buttonElement : React.RefObject<HTMLIonButtonElement> | any;
    private inputElement : React.RefObject<HTMLIonInputElement> | any;

    constructor(props: Props){
        super(props);
        this.state = {
            showToast : false
        }
        this.handleSubmit= this.handleSubmit.bind(this);
        this.buttonElement = createRef();
        this.inputElement = createRef();
    }

    setStorage = async (set? : any) =>{
        await Storage.set({
            key : "user",
            value : JSON.stringify({
                name : (set) ? set : this.state.name
            })
        })

        const user: any = await Storage.get({ key: set });

        this.context.name = JSON.parse(user.value).name;
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
                showToast: !toast
            }
        })
    }

    /**
     * To update state based on previous State or context
     * @param prevProps Previous Props
     * @param prevState Previous States
     */
    getSnapshotBeforeUpdate(prevProps : any, prevState : any){
        return {
            name : (prevState.name) ? prevState.name : this.context.name
        }
    }

    /**
     * Must do conditional state if prevState.name is not the same as snapshot.name. Else, it will caused an infinite loop
     * This is for update state from changing pages , if not current state will always empty
     * Get snapshot data previously from getSnapshotBeforeUpdate
     * @param prevProps 
     * @param prevState 
     * @param snapshot 
     */
    componentDidUpdate(prevProps : any, prevState : any, snapshot : any){
        if(prevState.name !== snapshot.name){
            this.setState({
                name : snapshot.name
            })
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

    renderCart = () =>{
        return this.context.cart.map((val: any , i : number , arr : any[])=>{
            return (<IonCard key={i + val.name}>
                <IonItem>
                    <IonImg src={val.imgProduct} style={{
                        maxWidth: "100px"
                    }}></IonImg>
                    <IonLabel>{val.name}</IonLabel>
                    <IonButton fill="outline" slot="end" onClick={() => this.props.history.push("/lists/" + val.name)}>View</IonButton>
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

        this.setStorage();

        return(
            <Content>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    style={{
                        fontSize : "20px"
                    }}
                    message='Account Saved'
                    closeButtonText="Okay"
                    showCloseButton={true}
                    duration={1000}
                >
                </IonToast>
                    <IonList>
                        <IonListHeader>
                            <IonLabel style={styleHeaderList}>
                                Your Cart (Total {this.context.cart.length})
                            </IonLabel>
                        </IonListHeader>
                        {this.renderCart()}
                        {this.context.cart.length > 0 ? 
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
                        </IonItem> : null}
                        <div style={{
                            marginTop : "50px"
                        }}></div>
                        <IonItemDivider></IonItemDivider>
                            <IonListHeader>
                                <IonLabel style={styleHeaderList}>Edit Account</IonLabel>
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