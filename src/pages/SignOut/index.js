import React, {Component} from 'react';
import { withRouter } from 'react-router';
import {withFirebase} from "../../components/firebase";


class SignOut extends Component {

    componentDidMount() {
        this.props.history.push("/");
        //this.props.doSignOut();
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default withRouter(withFirebase(SignOut));
