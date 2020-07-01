import React from 'react';
import {Route} from 'react-router-dom'

import { withStyles, WithStyles } from '@material-ui/core/styles';

import Live from './Live/Live'
import NavMenu from '../NavMenu/NavMenu'
import Graphs from './Graphs/Graphs'
import FromDay1 from './FromDay1/Fromday1'
import News from './News/News'
import About from './About/About'

const styles = {
    root: {
        background: '#212022',
        width:'100%',
        height:'100vh',
        overflow:'hidden',
    }
}

interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    location?:Location;
}

class DashBoard extends React.Component<Props>{

 

    render = ()=>{

        const classes = this.props.classes
        return(
            <div className={classes.root}>
                <NavMenu></NavMenu>

                <Route path="/" exact component={Live}></Route>
                <Route path="/graphs" exact component={Graphs}></Route>
                <Route path="/from-day-1" exact component={FromDay1}></Route>
                <Route path="/news" exact component={News}></Route>
                <Route path="/about"  exact component={About}></Route>

            </div>
        )
    }
}
 
export default  withStyles(styles)(DashBoard)