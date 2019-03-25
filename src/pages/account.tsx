import React, { Component, createRef, RefObject } from 'react';
import Content from '../HOC/content';
import { IonItem, IonLabel , IonInput , IonList, IonListHeader, IonButton , IonToast , IonItemDivider } from '@ionic/react';
import AccountContext, { MyAppConsumer , AppContextInterface } from '../context/accountContext';
import { Props } from '../utils/allProps';

interface State extends AppContextInterface{
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
        var myContext = this.context;
        // Update Name
        if (myContext.name !== undefined) {
            myContext.name = document.querySelector<HTMLInputElement | any>("input[name='fullName']").value;
        }
        // Update State
        this.setState((prevState , props)=>{
            return {
                name : myContext.name,
                showToast: !toast
            }
        })
    }

    componentDidMount(){
        const myContext = this.context;
        // Put the value
        if(myContext.name.length > 1){
            return this.inputElement.current.value = this.context.name;
        }
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
                            placeholder="Your Full Name" 
                            name="fullName"
                            value={this.context.name.length > 1 ? this.context.name : ""}
                            id="fullName"
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