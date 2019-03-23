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

    render(){
        return(
            <>
                <Content back={true} currentPath={getPath(this.props)}>
                    {this.props.children}
                </Content>
            </>
        )
    }
}

export default Lists;