# JSON Translation Editor

A simple web app providing a simple UI to edit JSON files containing translations (to be used for instance by [airbnb/polyglot.js](https://github.com/airbnb/polyglot.js)).

Just start by adding a locale in the top left (enter it's abbreviated name) and then add messages or collections of messages.

You can also import files (an entire project where the first level is the locales, or by locale where the name of the file is used as the name of the locale) and export them in the same manner from the JSON view.

This is still a WIP, but it's available at http://mattjcj.github.io/translation-editor

## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

