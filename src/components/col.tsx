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
    // console.log("Props Row : \n", (props.index * 1) % props.next === 0);
    var width = window.innerWidth > props.maxWidth;
    var transformToArray = Children.toArray(props.children);
    myArray = myArray.concat(transformToArray);
    var pass = ((props.index * 1) % props.next === 0);
    return(
        <Aux>
            <IonCol>{props.children}</IonCol>
        </Aux>
    );
}

export default col;