import React, {Component} from "react";
import {withFirebase} from "../firebase";

class NamePlate extends Component {

    INITIAL_STATE = {displayName: "", email:""};

    constructor(props) {
        super(props);
        this.state = { ...this.INITIAL_STATE };
    }

    componentDidMount() {
        this.user = this.props.firebase.auth.currentUser;
        this.setState({displayName: this.user.displayName, email:this.user.email})
    }

    render(){

        return (
            <div {...this.props}>
                {this.state.displayName}<br/>
                {this.state.email}
            </div>
        )
    }
}

export default withFirebase(NamePlate);