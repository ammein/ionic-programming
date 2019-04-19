import React , {Suspense , lazy} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import axios from 'axios';
import { Storage, Plugins } from '@capacitor/core';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

var getUser = async (set: string) => {
    const user : any = await Storage.get({ key: set });
    if(user.value && window.plugins){
        window.plugins.toast.show('Welcome ' + JSON.parse(user.value).name + '!', 'long', 'bottom')
    }
    return user;
}

const startApp = () =>{
    ReactDOM.render(<App></App>, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    getUser('user');
    serviceWorker.unregister();
}

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}

declare global{
    interface Window {
        cordova : any,
        plugins : any
    }
}