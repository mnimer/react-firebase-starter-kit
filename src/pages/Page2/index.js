import React, {Component} from 'react';
import {withFirebase} from "../../components/firebase";


class Page2 extends Component
{
    onSignOut = event => {
        this.props.firebase.doSignOut();
    };

    render() {
        return (
            <div>
                <strong>Page2</strong>
            </div>
        );
    }
}

export default withFirebase(Page2);
