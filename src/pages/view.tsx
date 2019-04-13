import React , {Component} from 'react';
import {Props} from '../utils/allProps';
import {AppContextInterface , MyAppConsumer} from '../context/accountContext';
import { throws } from 'assert';

interface State extends AppContextInterface{

}

class View extends Component<Props , State>{

    static contextType = MyAppConsumer;

    constructor(props: Props){
        super(props);
        this.state = {
            cart : [],
            chooseList : ""
        }
    }

    getSnapshotBeforeUpdate(prevProps : any, prevState : any){
        return {
            cart : this.context.cart,
            chooseList : this.context.chooseList,
            name : this.context.name
        }
    }

    componentDidUpdate(prevProps : any, prevState : any, snapshot : any){
        if(
            prevState.cart !== snapshot.cart ||
            prevState.chooseList !== snapshot.chooseList ||
            prevState.name !== snapshot.name
            )
            {
                this.setState({
                    name : snapshot.name,
                    cart : snapshot.cart,
                    chooseList : snapshot.chooseList
                })
            }
    }

    render(){
        return(
            <>
                <h1>{this.props.match.params.id}</h1>
            </>
        )
    }

}

export default View;