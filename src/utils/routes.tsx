import React , {Component } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import App from '../App';
import AnotherPage from '../pages/anotherPage';
import Cards from '../pages/card';
var history = require('history').createBrowserHistory;
import Menu from '../components/menu';
import {IonRouterOutlet} from '@ionic/react'

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
        component : AnotherPage
    },
    {
        title : "Cards",
        path : "/cards",
        component : Cards
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

    render(){
        return (
            <Router>
                {this.renderPath()}
            </Router>
        )
    }
}

export default Routes;