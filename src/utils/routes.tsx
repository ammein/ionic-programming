import React , {Component } from 'react';
import { Route, RouteComponentProps, RouteProps, BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import App from '../App';
import AnotherPage from '../components/pages/anotherPage';
import Cards from '../components/pages/card';
var history = require('history').createBrowserHistory;

export interface RoutesDef {
    title : string,
    path : string,
    component : React.ComponentProps<any>
}

const MyRoutes : RoutesDef[] = [
    {
        title : "Home",
        path : "/",
        component : App
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

const createBrowserHistory = history();

class Routes extends Component{

    renderPath(){
        return MyRoutes.map((props, index) => (
            <Route key={index} path={props.path} component={props.component}></Route>
        ));
    }

    render(){
        return (
            <Router history={createBrowserHistory}>
                {this.renderPath()}
            </Router>
        )
    }
}

export default Routes;