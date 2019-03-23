import React , {Component} from 'react';

export interface AppContextInterface {
    name?: string,
    cart? : any[]
    url?: string,
    updateValue?: any,
    state?: object
}

interface State {
    name?: string,
    cart?: any[]
    url?: string,
    updateValue?: any,
    state? : object
}

export const MyAppConsumer = React.createContext<AppContextInterface | null>({
    name : "Amin"
});

class MyApp extends Component<any , State> {

    constructor(props : any) {
        super(props);
    }

    readonly state = {
        name: "",
        cart: [],
        url: "",
        state : {}
    };

    updateValue = (key : any, val : any) : any =>{
        debugger;
        return this.setState({ [key]: val });
    }
    render() {
        return (
            <MyAppConsumer.Provider value={{state : this.state ,updateValue : this.updateValue}}>
                {this.props.children}
            </MyAppConsumer.Provider>
        )
    }
}


export default MyApp;