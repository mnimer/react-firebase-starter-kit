import * as firebase from "firebase/app";
// Required for side-effects
import "firebase/auth";
import "firebase/firestore";


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};


class Firebase {
    constructor() {
        //initialize sdk
        this.app = firebase.initializeApp(config);

        //get the auth service
        this.auth = firebase.auth();

        this.db = firebase.firestore();
    }


    //register
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    //signin
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    //signout
    doSignOut = () => {
        this.auth.signOut();
        //this.props.history.push("/");
    };

    //reset password
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    //update password
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


    //create new User Object
    doCreate = (collection_, id_, set_) => this.db.collection(collection_).doc(id_).set(set_);
}

export default Firebase;