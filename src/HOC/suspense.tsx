import { Props } from '../utils/allProps';
import React, { ReactNode, useContext, useState, Component , Suspense } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import '../theme.css';

const fallback = (()=>{
    return(<h1>
        Loading ...
    </h1>)
})

class MySuspense extends Component<Props , {}>{

    constructor(props : Props){
        super(props);
    }

    render(){
        return(
            <Suspense fallback={fallback}>
                {this.props.children}
            </Suspense>
        )
    }
}

export default MySuspense;