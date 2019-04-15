import React , {Component , lazy , Suspense } from 'react';
import { Router, Route , Switch , BrowserRouter as Browser } from 'react-router-dom';
var hashHistory = require("history").createHashHistory;
var history = require('history').createBrowserHistory;
import {IonPage, IonSplitPane, IonRouterOutlet} from '@ionic/react';
import Menu from '../components/menu';
import {RoutesDef} from './allProps';
import View from '../pages/view';
import MySuspense from '../HOC/suspense';
import loadable from '@loadable/component';

import Home from '../pages/home';
import Account from '../pages/account';
import Lists from '../pages/lists';
import Arrivals from '../pages/arrivals';



const MyRoutes : RoutesDef[] = [
    {
        title : "Home",
        path : "/",
        component : Home,
        exact : true,
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg"
    },
    {
        title : "New Arrivals",
        path : "/arrivals",
        component : Arrivals,
        icon: "star",
        menu : false
    },
    {
        title : "Product Lists",
        path : "/lists",
        component : Lists,
        icon: "list"
    },
    {
        title : "Account",
        path : "/account",
        component : Account,
        icon: "contact"
    }
]

export { MyRoutes };

export const Params = function({match} : any) : any{
    return (<></>);
}

export type Props = {
    children? : JSX.Element
}

export type State = {
    title : string
}

const createBrowserHistory = history();

// Use hashHistory for phonegap app enable
const createHashHistory = hashHistory();

class Routes extends Component<Props, State>{

    constructor(props : Props){
        super(props);
        this.state = {
            title : ""
        }
        this.renderTitle = this.renderTitle.bind(this);
    }

    renderTitle(title : string){
        this.setState((prevProps , props)=>{
            return {
                title : title
            }
        });
    }

    componentDidMount(){
        for(var i = 0; i < MyRoutes.length; i++){
            if(MyRoutes[i].path === window.location.pathname){
                return this.renderTitle(MyRoutes[i].title);
            }
        }
    }

    renderPath() : any{

        return MyRoutes.map((props, index) => {
            if (props.exact) {
                return (
                    <Route exact key={index} path={props.path} component={props.component}></Route>
                )
            } else {
                return (
                    <Route key={index} path={props.path} component={props.component}></Route>
                )
            }
        });
    }

    render(){
        return (
            <Router history={createHashHistory}>
                    {/* For Render List */}
                    <IonSplitPane contentId="main">
                        <Menu/>
                        {/* For Render Page with Route */}
                        {/* Must use id="main" for let it main content */}
                        <IonPage id="main">
                            <IonRouterOutlet>
                                    {this.renderPath()}
                            </IonRouterOutlet>
                        </IonPage>
                    </IonSplitPane>
            </Router>
        )
    }
}

export default Routes;