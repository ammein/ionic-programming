import React, { ReactNode , useContext, useState, Component } from 'react';
import { IonApp, IonSplitPane, IonPage, IonContent } from '@ionic/react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import '../theme.css';
import Header from '../components/header';
import { Props } from '../utils/allProps';
import AccountContext, { MyAppConsumer } from '../context/accountContext';
import LazyLoad from 'react-lazyload';

class Content extends Component<Props>{

    constructor(props : Props){
        super(props);
    }
    
    static contextType = MyAppConsumer;

    componentDidMount(){
        console.log(this.context)
        this.context.url = this.props.currentPath;
    }

    render(){
        return (
            <>
                <AccountContext>
                    <Header back={this.props.back} currentPath={this.props.currentPath} enableToolbar={this.props.enableToolbar} />
                    <LazyLoad>
                        <IonContent scrollEvents={true} fullscreen={true}>
                            {this.props.children}
                        </IonContent>
                    </LazyLoad>
                </AccountContext>
            </>
        )
    }
}
export default Content;