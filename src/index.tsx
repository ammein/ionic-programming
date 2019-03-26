import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';

const startApp = () =>{
    ReactDOM.render(<App></App>, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register();
}

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);

    document.addEventListener('deviceready' , function(){
        navigator.splashscreen.show();

        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 5000);
    },false);
} else {
    startApp();
}

declare global{
    interface Window {
        cordova : any
    }
    interface Navigator{
        splashscreen: any
    }
}