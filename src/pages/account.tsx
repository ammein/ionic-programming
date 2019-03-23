import React, { Component, createRef, RefObject } from 'react';
import Content from '../HOC/content';
import { IonItem, IonLabel , IonInput , IonList, IonListHeader, IonButton } from '@ionic/react';
import AccountContext, { MyAppConsumer , AppContextInterface } from '../context/accountContext';
import { Props } from '../utils/allProps';

interface State extends AppContextInterface{
}

class Account extends Component<Props, State>{

    static contextType = MyAppConsumer;

    private inputElement : any = createRef<HTMLIonInputElement>();

    constructor(props: Props){
        super(props);
        this.state = {
            name : ""
        }
        this.handleSubmit= this.handleSubmit.bind(this);
        this.getName = this.getName.bind(this);
    }

    getName(event : any) : any{
        return this.setState((prevState , props)=>{
            return {
                name : event.target.value
            }
        })
    }

    handleSubmit(e : React.FormEvent){
        e.preventDefault();
        debugger;
        // this.context.updateValue("name" , this.state.name);
    }

    componentDidMount(){
        if (this.context.name) {
            this.inputElement.current.value = this.context.name;
        }
    }

    render(){

        const styleHeaderList : any = {
            fontSize : "20px"
        }

        return(
            <Content>
                    <IonList>
                        <IonListHeader>
                            <IonLabel style={styleHeaderList}>Create Your Account</IonLabel>
                        </IonListHeader>
                        <div style={{marginTop : "20px"}}></div>
                        <form onSubmit={this.handleSubmit}>
                            <IonItem>
                                <IonLabel position="floating">Full Name</IonLabel>
                                <IonInput placeholder="Your Full Name" name="fullName" onIonChange={this.getName} ref={this.inputElement}></IonInput>
                            </IonItem>
                            <IonButton expand="full" slot="end" style={{
                                bottom: "0"
                            }} type="submit">Submit</IonButton>
                        </form>
                    <MyAppConsumer.Consumer>
                        {context => <div>context</div>}
                    </MyAppConsumer.Consumer>
                    </IonList>
            </Content>
        )
    }
}

export default Account;