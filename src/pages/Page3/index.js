import React, {Component} from 'react';
import {withFirebase} from "../../components/firebase";


class Page3 extends Component
{
    onSignOut = event => {
        this.props.firebase.doSignOut();
    };

    render() {
        return (
            <div>
                <strong>Page3</strong>
            </div>
        );
    }
}

export default withFirebase(Page3);
