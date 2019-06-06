import React from 'react';
import FirebaseContext from './context.js';
import Firebase from './Firebase.js';

export default Firebase;

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export { FirebaseContext };