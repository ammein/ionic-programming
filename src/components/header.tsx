import React , { Component } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle , IonMenuButton } from '@ionic/react';
import Menu from './menu';
import Route , {MyRoutes} from '../utils/routes';

export interface Props{
    children?:JSX.Element
}

export interface State{
    title? : string
}

class Header extends Component<Props,State>{

    constructor(props : Props){
        super(props);

        this.state = {
            title : ""
        }
    }


    componentDidMount(){
        const title: string = window.location.pathname;
        var PageTitle : string;
        console.log(MyRoutes);
        for(var property in MyRoutes){
            if(MyRoutes.hasOwnProperty(property)){
                if (MyRoutes[property].path === title){
                    return this.setState((prevState, props) => {
                        return {
                            title: MyRoutes[property].title
                        }
                    })
                }
            }
        }
        
    }

    render(){
        return(
            <>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{this.state.title}</IonTitle>
                        <IonMenuButton menu="start" mode="md">Open</IonMenuButton> 
                    </IonToolbar>
                </IonHeader>
                {this.props.children}
            </>
        )
    }
}

export default Header;