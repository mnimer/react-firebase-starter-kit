import React, {Component} from "react";
import {withRouter} from 'react-router';
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {withFirebase} from "../firebase";


const styleSheet = {
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
        marginTop: "8px",
    },
    submit: {
        marginLeft:"25%",
        marginRight:"25%",
        marginTop: "8px",
        marginBottom: "8px",
        width:"50%"
    }
};

class SignUpForm extends Component {

    INITIAL_STATE = {
        email: "", password: "", rememberMe:true, error: null,
    };

    constructor(props) {
        super(props);
        this.state = { ...this.INITIAL_STATE };
    }

    onSubmit = event => {
        console.log("submit");

        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                console.dir(authUser);
                this.setState( this.INITIAL_STATE );
                this.props.history.push("/");
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
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isInvalid}
                        >Sign In</Button>

                        {this.state.error && <p>{this.state.error.message}</p>}

                        <Grid container justify="flex-end">
                            <Grid item>
                                Don't have an account?
                                <Link to="/signup" variant="body2">
                                    {" Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </form>
                </div>
            </Container>
        );
    }
}


export default withFirebase(withRouter(withStyles(styleSheet)(SignUpForm)));