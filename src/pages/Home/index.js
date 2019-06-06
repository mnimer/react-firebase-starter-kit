import React, {Component} from 'react';
import {withFirebase} from "../../components/firebase";


class Home extends Component
{
    onSignOut = event => {
        this.props.firebase.doSignOut();
    };

    render() {
        return (
            <div>
                <strong>Home</strong>
            </div>
        );
    }
}

export default withFirebase(Home);
