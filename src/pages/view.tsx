import React , {Component} from 'react';
import {Props} from '../utils/allProps';
import {AppContextInterface , MyAppConsumer} from '../context/accountContext';
import { throws } from 'assert';
import { IonImg, IonButtons, IonButton, IonToast } from '@ionic/react';
import Aux from '../HOC/auxiliary';

interface State extends AppContextInterface{
    view : any[],
    viewVal : any,
    cart : any[],
    showToast : boolean
}

interface myProps extends Props{
    myProps : any[]
}


// Source : https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
var isEqual = function (value : any, other : any) {

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    var compare = function (item1 : any, item2 : any) {

        // Get the object type
        var itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {

            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }

        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;

};

class View extends Component<myProps , State>{

    static contextType = MyAppConsumer;

    constructor(props: myProps){
        super(props);
        this.state = {
            cart : [],
            chooseList : "",
            view : [],
            viewVal : {},
            showToast : false
        }
    }

    getSnapshotBeforeUpdate(prevProps : any, prevState : any){
        return {
            cart: (isEqual(this.state.cart , this.context.cart)) ? this.context.cart : this.state.cart,
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
                this.context.cart = this.context.cart.concat(this.state.cart);
            }
    }

    shouldComponentUpdate(nextProps : any, nextState : any, nextContext : any){
        if (!isEqual(this.state.view , nextState.view) || !isEqual(this.state.cart , nextState.cart)){
            return true;
        }
        return false;
    }

    renderView = (props : any) =>{
        return Object.keys(props.myProps).reduce((init : any, val : any, i : number, arr : any[]) => {
            return init.concat(props.myProps[val]);
        }, []).map((val : any , i : number , myArray : any[])=>{
            if(decodeURIComponent(props.match.params.id) === val.name){
                return (
                    <Aux key={i}>
                        <IonImg src={val.imgProduct}></IonImg>
                        <h1>{this.props.match.params.id}</h1>
                    </Aux>
                )
            }
        })
    }

    addToCart = ()=> {
        return this.state.view.map((val : any , i : number , arr : any[])=>{
            if(val.name === this.state.viewVal.name){
                return this.setState((prevState : any , props : any)=>{
                    return {
                        cart: this.state.cart.concat(val),
                        showToast: !this.state.showToast
                    }
                })
            }
        })
    }

    componentDidMount(){
        console.log("View : \n" , this.state)
        return Object.keys(this.props.myProps).reduce((init: any, val: any, i: number, arr: any[]) => {
            return init.concat(this.props.myProps[val]);
        }, []).map((val: any, i: number, myArray: any[]) => {
            if (decodeURIComponent(this.props.match.params.id) === val.name) {
                if (this.state.view.length === 0) {
                    return this.setState((prevState: any, props: any) => {
                        return {
                            view: prevState.view.concat(myArray),
                            viewVal: val
                        }
                    })
                }
            }
        })
    }

    render(){
        return(
            <Aux>
                {this.renderView(this.props)}
                <IonButton color="primary" fill="solid" expand="block" size="large" onClick={this.addToCart.bind(this)}>
                    Add To Cart
                </IonButton>

                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => this.setState(() => ({ showToast: false }))}
                    style={{
                        fontSize: "20px"
                    }}
                    message={"Added to cart for " + this.state.viewVal.name}
                    closeButtonText="Okay"
                    showCloseButton={true}
                    duration={1000}
                />
            </Aux>
        )
    }

}

export default View;