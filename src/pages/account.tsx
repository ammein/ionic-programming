import React, { Component, createRef, RefObject } from 'react';
import Content from '../HOC/content';
import { IonItem, IonLabel , IonInput , IonList, IonListHeader, IonButton , IonToast , IonItemDivider } from '@ionic/react';
import AccountContext, { MyAppConsumer , AppContextInterface } from '../context/accountContext';
import { Props } from '../utils/allProps';
import { InputChangeEventDetail } from '@ionic/core';

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