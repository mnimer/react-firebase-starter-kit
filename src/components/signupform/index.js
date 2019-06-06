import React, {Component} from "react";
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {withFirebase} from "../firebase";

const styleSheet = {
    '@global': {
        body: {
            backgroundColor: "white",
        },
    },
    paper: {
        marginTop: "16px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: "8px",
        backgroundColor: "red" /*theme.palette.secondary.main,*/
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: "24px",
    },
    submit: {
        marginLeft:"25%",
        marginRight:"25%",
        marginTop: "16px",
        marginBottom: "16px",
        width:"50%"
    }
};

class SignUpForm extends Component {

    INITIAL_STATE = {
        firstName:"", lastName: "", email: "", password: "", error: null,
    };

    constructor(props) {
        super(props);
        this.state = { ...this.INITIAL_STATE };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = event => {
        console.log("submit");

        const { firstName, lastName, email, password } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.dir("User Registration Successful");

                var user = this.props.firebase.auth.currentUser;

                var userSet = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    date_created: new Date()
                };
                this.props.firebase.doCreate("users", authUser.user.uid, userSet).then(newUser_ => {
                    console.dir("User Object Created Successfully");
                    //this.setState( this.INITIAL_STATE );
                    this.props.history.push("/");
                }).catch(error=>{
                    console.error("error:" +error);
                    this.setState({ error });
                    user.delete(); //problem creating user - force re-registration
                });


                user.updateProfile({
                    displayName: firstName +" " +lastName,
                }).then(function() {
                    // Update successful.
                    console.log("User Profile Updated");
                }).catch(function(error) {
                    // An error happened.
                    console.error("update profile error - " +error);
                });

                user.sendEmailVerification().then(function() {
                    // Email sent.
                    console.log("User verification email sent");
                }).catch(function(error) {
                    // An error happened.
                    console.error("User verification email error - " +error);
                });
            })
            .catch(error => {
                console.error("error:" +error);
                this.setState({ error });
            });

        event.preventDefault();

    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const classes = this.props.classes;

        const isInvalid =
            this.state.password === '' ||
            this.state.email === '';

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    autoFocus
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    required
                                    fullWidth
                                    onChange={this.onChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isInvalid}
                            className={classes.submit}
                            onClick={this.onSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                Already have an account?
                                <Link to="/signin" variant="body2"> Sign in</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}


export default withFirebase(withRouter(withStyles(styleSheet)(SignUpForm)));