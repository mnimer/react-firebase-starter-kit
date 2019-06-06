import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


import Home from '../Home';
import Page2 from '../Page2';
import Page3 from '../Page3';
import {withFirebase} from "../../components/firebase";
import NamePlate from "../../components/nameplate";
//import {withFirebase} from "../../components/firebase";


const drawerWidth = 240;
const drawerWidthMin = 56;
const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0, right: 0, left: 0, bottom: 0,
        display: "grid",
        gridTemplateColumns: "240px auto",
        gridTemplateRows: "32px 32px auto",
        gridColumnGap: "0px",
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "48px auto"
        },
    },
    drawer: {
        gridColumn: "1/2",
        gridRow: "1/4",
        width: drawerWidth,
        [theme.breakpoints.down('sm')]: {
            width: drawerWidthMin,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.down('sm')]: {
            width: drawerWidthMin,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },


    content: {
        gridColumn: "2/3",
        gridRow: "1/4",
    },
    mainContent: {
        padding: theme.spacing(2)
    },
    appBar: {
        width:"100%"
    },
    title: {
        flex: 1
    },
    toolbar: theme.mixins.toolbar,

    namePlate: {
        minHeight: "112px",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        [theme.breakpoints.down('sm')]: {
            display:'none'
        },
    },
    nameLabel: {
        textAlign: "center",
        verticalAlign: "middle",
        gridColumn: "2/3",
        gridRow: "2/3",
        [theme.breakpoints.down('sm')]: {
            display: "none",
        },

    }
}));


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


var dashboard = function Dashboard(props) {
    const {container} = props;
    const classes = useStyles();
    //const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(true);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }


    return (
        <div className={classes.root}>
            <CssBaseline/>

            <nav className={classes.drawer} aria-label="Mailbox folders">

                <Drawer
                    container={container}
                    variant="persistent"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}>

                    <div>
                        <div className={classes.namePlate}>
                            <NamePlate className={classes.nameLabel}/>
                        </div>
                        <Divider/>
                        <List>
                            <ListItemLink component={Link} to="/" button>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemLink>
                            <ListItemLink component={Link} to="/page2" button>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Page2"/>
                            </ListItemLink>
                            <ListItemLink component={Link} to="/page3" button>
                                <ListItemIcon>
                                    <DashboardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Page3"/>
                            </ListItemLink>
                        </List>
                    </div>
                </Drawer>

            </nav>

            <main className={classes.content}>
                <AppBar position={'static'} className={classes.appBar}>
                    <Toolbar>
                        <Typography component="h1" variant="h6" noWrap className={classes.title}>
                            My Application
                        </Typography>
                        <Button color="inherit" onClick={() => props.firebase.doSignOut()}>Logout</Button>
                    </Toolbar>
                </AppBar>

                <div className={classes.mainContent}>
                    <Switch>
                        <Route path="/page2" component={Page2}/>
                        <Route path="/page3" component={Page3}/>
                        <Route component={Home}/>
                    </Switch>
                </div>
            </main>
        </div>
    );

}

export default withFirebase(dashboard);