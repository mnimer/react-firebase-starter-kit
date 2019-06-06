import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import SignInForm from '../../components/signinform';

const useStyles = makeStyles(theme => ({
    form: {
        border: "1px solid #A0A0A0",
        background: "white",
        minWidth: "300px",
        width: "400px",
        height: "auto",
        paddingBottom: "16px",
        gridColumn: "3/4",
        gridRow: "2/3",
        [theme.breakpoints.down('sm')]: {
            gridColumn: "2/3",
            gridRow: "2/3",
        }
    }
}));


function SignIn() {
    const classes = useStyles();

    return (
        <div className={classes.form}>
            <SignInForm/>
        </div>
    );
}

export default SignIn;
