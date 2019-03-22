import React , {Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App';
import Arrivals from '../pages/arrivals';
import Home from '../pages/home';
var history = require('history').createBrowserHistory;
import {IonPage, IonSplitPane, IonRouterOutlet} from '@ionic/react';
import Menu from '../components/menu';
import Lists from '../pages/lists';

export interface RoutesDef {
    title : string,
    path : string,
    component : React.ComponentProps<any>,
    exact?: boolean
}

const MyRoutes : RoutesDef[] = [
    {
        title : "Home",
        path : "/",
        component : App,
        exact : true
    },
    {
        title : "New Arrivals",
        path : "/arrivals",
        component : Arrivals
    },
    {
        title : "Cards",
        path : "/cards",
        component : Home
    },{
        title : "Arrivals",
        path : "/lists",
        component : Lists
    }
]

export { MyRoutes };

export type Props = {
    children? : JSX.Element
}

export type State = {
    title : string
}

const createBrowserHistory = history();

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

    renderPath(){
        return MyRoutes.map((props, index) => {
            if(props.exact){
                return (
                    <Route exact key={index} path={props.path} component={props.component}></Route>
                )
            }else{
                return (
                    <Route key={index} path={props.path} component={props.component}></Route>
                )
            }
        });
    }

    generateList(){

    }

    render(){
        return (
                <Router>
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