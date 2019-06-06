import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import {withFirebase} from "../components/firebase";

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authCheckPending: true,
            authUser: null,
        };
    }

    componentWillMount() {
         this.props.firebase.auth.onAuthStateChanged(authUser => {
            console.log("auth change");
            if( authUser ){
                this.setState({ authUser: authUser, authCheckPending:false });
            }else{
                this.setState({ authUser: null, authCheckPending:false });
            }
        });
    }

    render() {
        //console.log("auth=" +this.state.authUser +" | " +this.state.authCheckPending)
        return (
            <div className="App">

                {this.state.authCheckPending && <div>TODO: Loading...</div>}

                <Router>
                {(!this.state.authCheckPending && this.state.authUser) &&
                    <Route path="/" component={Dashboard}/>
                }
                {(!this.state.authCheckPending && !this.state.authUser) &&
                    <Route path="/" component={Landing}/>
                }
                </Router>

            </div>
        );
    }
}

export default withFirebase(App);


