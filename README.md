This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

## First Run Installation `npm install` before `npm start` .

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Production Guide (Build Android or iOS app builder for Android Studio or XCode)

These are the commands for generating android file
```bash
# Enable ionic intergrations
ionic init "My React App" --type=custom
ionic integrations enable capacitor

# Add android or ios
ionic capacitor add <android|ios>

# Copy build folder to android build
ionic capacitor copy

# Generate resources and config.xml on root project
ionic integrations enable cordova --add

# Run on Android Studio or XCode
ionic capacitor open <android|ios>
```
---
# Production Guide PhoneGap
```bash
# Install the Create React App CLI.

npm install -g create-react-app

# Install the Cordova CLI.

npm install -g cordova

# Create the project.

create-react-app tutorial --typsescript

# Install Ionic and dependencies
npm install --save typescript @types/node @types/react @types/react-dom @types/jest @ionic/core @ionic/react

# or

yarn add typescript @types/node @types/react @types/react-dom @types/jest @ionic/core @ionic/react

# Because we will be editing the Webpack configuration, go to your Create React App project directory and run:

yarn run eject
```

Go to your `config/paths.js` file and change :

`appBuild: resolveApp('build')` to `appBuild: resolveApp('www')`

> Because your files will be served from `file://` (https://github.com/facebookincubator/create-react-app/issues/1094)

Add this line to your `package.json` :

```json
"homepage": "."
```

> This is specific to create-react-app. In other projects you would need to ensure your paths are not prepended with a /.

Now we will need some files from a Cordova project :

```bash
# Tips : Install in your react root folder
cordova create tutorial com.example.tutorial Tutorial

# Go to Tutorial folder
cd Tutorial

# Install these basic plugins
cordova plugin add cordova-plugin-ionic-webview cordova-plugin-battery-status cordova-plugin-media-capture cordova-plugin-camera cordova-plugin-contacts cordova-plugin-device-motion cordova-plugin-console cordova-plugin-device cordova-plugin-device-orientation cordova-plugin-dialogs cordova-plugin-file cordova-plugin-file-transfer cordova-plugin-geolocation cordova-plugin-globalization cordova-plugin-inappbrowser cordova-plugin-media cordova-plugin-network-information cordova-plugin-splashscreen cordova-plugin-statusbar cordova-plugin-vibration cordova-plugin-whitelist
```
> NOTE : The `res` directory would be where you would place icons and splash screens.

Next modify your `index.js` so it looks like:
```js
const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
```

or in `index.tsx` Typescript format :
```tsx
const startApp = () =>{
    ReactDOM.render(<App></App>, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.register();
}

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}

declare global{
    interface Window {
        cordova : any
    }
}
```

And add these to `index.html` :
```html
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">

<script type="text/javascript" src="cordova.js"></script>
```

Now we can build our output to the `www` directory.

```bash
yarn run build
```

Then Copy your `www` folder into `Tutorial/www`

The rest of these instructions have files and changes that are not in the current repository due to the nature of the dependencies that have to be brought down. Also I didn't want to tie the tutorial down with specific versions of Android and iOS.

To target platforms:
```bash
# Go to your created cordova project
cd Tutorial

# To add android platform phonegap config.xml
cordova platform add ios

# To add ios platform phonegap config.xml
cordova platform add android
```

## Tips for Phonegap

### SVG

For SVG Image , you cannot load it via `file://` . Therefore , you need to use normal `<img src="/path/to/svg"/>`.

### React Router
For react router typescript , you need these `hashRouter` to make it run normally on `file://` . But first install history npm dependencies :

```bash
# Ofcourse , install the dependencies first
npm i -S history
npm i -S react-router-dom
```
On Your Code :

```tsx
import { Router } from 'react-router-dom';
var hashHistory = require("history").createHashHistory;

// Use hashHistory for phonegap app enable
const createHashHistory = hashHistory();

<Router history={createHashHistory}>
 {/* Other Route here */}
</Router>
```
---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
