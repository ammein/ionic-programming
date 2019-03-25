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

### Production Guide

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
```

After done with intergrations , copy `resources` -> `android`

Found this article that can point out from react app to phonegap :

[http://notes.webutvikling.org/porting-a-react-app-to-phonegap/](React App To Phonegap)

And for running local file, I found this issue :
[https://stackoverflow.com/a/54349038/9716958](Issue Running 'file://' Local file)

---
## Other Solution Using Cordova Command Line
## Installation

Install the Create React App CLI.

`npm install -g create-react-app`

Install the Cordova CLI.

`npm install -g cordova`

Create the project.

`create-react-app tutorial`

Because we will be editing the Webpack configuration, go to your Create React App project directory and run:

`yarn run eject`

Go to your config/paths.js file and change

`appBuild: resolveApp('build')` to `appBuild: resolveApp('www')`

Because your files will be served from `file://` add this line to your package.json (https://github.com/facebookincubator/create-react-app/issues/1094):

`"homepage": "./"`

This is specific to create-react-app. In other projects you would need to ensure your paths are not prepended with a /.

Now we will need some files from a Cordova project.

`cordova create tutorial com.example.tutorial Tutorial`

Next copy the config.xml from your Cordova project to your Create React App project. The other files and directories in the Cordova project are not currently used in this tutorial but take note of them because you may make use of them as your project develops. For example, the `res` directory would be where you would place icons and splash screens.

Next modify your index.js so it looks like:
```
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

And add `<script type="text/javascript" src="cordova.js"></script>` to index.html. You may also want to add
```
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">
```

Now we can build our output to the www directory.

`yarn run build`

The rest of these instructions have files and changes that are not in the current repository due to the nature of the dependencies that have to be brought down. Also I didn't want to tie the tutorial down with specific versions of Android and iOS.

To target platforms:

`cordova platform add ios`

`cordova platform add android`

You need to install SDKs for each platform that you wish to target. Read this to check what requirements need to be satisfied: https://cordova.apache.org/docs/en/latest/guide/cli/index.html#install-pre-requisites-for-building
Generally you will probably have to install Android Studio, XCode, SDKs, emulators, build systems, etc.

---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
