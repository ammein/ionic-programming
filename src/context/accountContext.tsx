import React , {Component} from 'react';

export interface AppContextInterface {
    name?: string,
    cart? : any[]
    url?: string,
    updateValue?: any,
    chooseList?: string
}

interface State {
    name?: string,
    cart?: any[]
    url?: string,
    updateValue?: any
}

const myInitialState = {
    name: "",
    cart: [],
    url: "",
    chooseList : ""
}

export const MyAppConsumer = React.createContext<AppContextInterface | null>(myInitialState);

class MyApp extends Component<any , State> {

    constructor(props : any) {
        super(props);
        this.state = myInitialState;
    }

    componentWillMount(){

    }

    render() {
        return (
            <MyAppConsumer.Provider value={myInitialState}>
                {this.props.children}
            </MyAppConsumer.Provider>
        )
    }
}


export default MyApp;