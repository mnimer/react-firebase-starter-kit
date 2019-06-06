import React from 'react';
import {Route, Switch} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    background : {
        width:"100vw",
        height:"100vh",
        background: 'url("https://picsum.photos/1366/768") no-repeat center center fixed',
        backgroundSize: "cover",
        display: "grid",
        gridTemplateColumns: "1fr 6fr 350px 2fr",
        gridTemplateRows: "2fr auto 2fr",
        gridColumnGap: "16px",
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "1fr auto 1fr",
            gridColumnGap: "8px",
        }
    }
}));
//@media (min-width: 500px) {}

function Index() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <Switch>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route component={SignInPage} />
            </Switch>
        </div>
    );
}

export default Index;

/**
 <Router>
 <Route exact path="/" component={Landing} />
 <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
 <Route path={ROUTES.SIGN_IN} component={SignInPage} />
 </Router>
 **/