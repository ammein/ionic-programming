import React, { Children , useEffect , useState } from 'react';
import { IonRow , IonGrid , IonCol } from '@ionic/react';
import Aux from '../HOC/auxiliary';
import { arch } from 'os';

let myArray : any= [];
let myChildren : any[]= [];

interface myState {
    content : any[]
}

const col = (props : any) => {
    return(
        <Aux>
            <IonCol>{props.children}</IonCol>
        </Aux>
    );
}

export default col;