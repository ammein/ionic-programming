import React, { Component } from 'react';
import Content from '../HOC/content';
import Home from '../pages/home';
import {getPath} from '../utils/routes-utils';
import Route, { MyRoutes } from '../utils/routes';
import Arrivals from '../pages/arrivals';

type Props = {
    children? : JSX.Element
}

type State = {
    title? : string
}

class Lists extends Component<Props, State>{
    constructor(props : Props){
        super(props);
    }

    renderTitle(){
        const title: string = window.location.pathname;
        console.log(MyRoutes);
        for (var property in MyRoutes) {
            if (MyRoutes.hasOwnProperty(property)) {
                if (MyRoutes[property].path === title) {
                    return this.setState((prevState, props) => {
                        return {
                            title: MyRoutes[property].title
                        }
                    })
                }
            }
        }
    }

    componentDidMount(){
        this.renderTitle();
    }

    renderPage(){
        if (this.state.title === MyRoutes[0].title) {
            return (<Home></Home>);
        } else if (this.state.title === MyRoutes[1].title) {
            return (<Arrivals />)
        }
    }

    render(){
        return(
            <>
                <Content back={true} currentPath={getPath(this.constructor)}>
                    {()=>{
                        return new Promise((resolve , reject)=>{
                            resolve();
                        }).then(()=>{
                            if (this.state.title === MyRoutes[0].title) {
                                return (<Home></Home>);
                            } else if (this.state.title === MyRoutes[1].title) {
                                return (<Arrivals />)
                            }
                        })
                    }}
                </Content>
            </>
        )
    }
}

export default Lists;