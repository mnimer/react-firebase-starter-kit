import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import SignUpForm from '../../components/signupform';


const useStyles = makeStyles(theme => ({
    signinForm : {
        border:"1px solid",
        background: "white",
        width: "400px",
        height: "auto",
        paddingBottom: "24px",
        gridColumn: "3/4",
        gridRow: "2/3",
        [theme.breakpoints.down('sm')]: {
            gridColumn: "2/3",
            gridRow: "2/3",
        }
    }
}));



function SignUp() {
    const classes = useStyles();

    return (
        <div className={classes.signinForm}>
            <SignUpForm/>
        </div>
    );
}

export default SignUp;
