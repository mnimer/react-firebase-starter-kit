
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './pages/App';
import Firebase, { FirebaseContext } from './components/firebase';

import './index.css';
//import { ThemeProvider } from '@material-ui/styles';
//import {makeStyles} from '@material-ui/core/styles';
/**
const themeStyle = {
    root: {
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        borderRadius: "3px",
        fontSize: "16px",
        border: 0,
        color: "white",
        height: "48px",
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, 0.3)"
    }
};**/

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
