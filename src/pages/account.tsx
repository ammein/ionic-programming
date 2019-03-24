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

    constructor(props: Props){
        super(props);
        this.state = {
            name : "",
            showToast : false
        }
        this.handleSubmit= this.handleSubmit.bind(this);
        this.getName = this.getName.bind(this);
        this.buttonElement = createRef();
    }

    getName(event : any) : any{
        return this.setState((prevState , props)=>{
            return {
                name : event.target.value
            }
        })
    }

    handleSubmit(e : Event | React.FormEvent){
        e.preventDefault();
        const toast = this.state.showToast;
        this.setState((prevState , props)=>{
            return {
                showToast : !toast
            }
        })
    }

    componentDidMount(){
        const myContext = this.context;
        if(myContext.name.length > 1){
            document.querySelector<HTMLInputElement | any>("input[name='fullName']").value = this.context.name
        }
        this.buttonElement.current.onclick = function(){
            if (myContext.name !== undefined) {
                myContext.name = document.querySelector<HTMLInputElement | any>("input[name='fullName']").value;
            }
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
                            <IonInput placeholder="Your Full Name" name="fullName" onIonChange={this.getName}></IonInput>
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