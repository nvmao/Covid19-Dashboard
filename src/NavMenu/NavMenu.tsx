import React from 'react';
import {Link} from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles,WithStyles } from '@material-ui/core/styles';


import InboxIcon from '@material-ui/icons/MoveToInbox';

const styles = {
    root: {
        flexGrow: 1,
        position: 'absolute' as 'absolute'
    },
    menuButton: {
        marginRight: '2rem',
        marginLeft: '2rem',
        color:'white',
    },
    menuIcon:{
        height:'100%',
        'font-size':'40px'
    },
    menu:{
    },
    title: {
        flexGrow: 1,
    },
    list:{
            width:'250px',
            color:'#eeeeee',
            background:'#170E0E',
            height:'100%'
    },
    link:{
        color:'inherit',
        textDecoration:'none',
        width:'100%',
        display:'flex'
    }
}
 
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    location?:Location
}

interface IState{
    open:boolean
}

class NavMenu extends React.Component<Props>{

    state = {
        open : false,
        click:''
    }

    toggleDrawer = () => {
        const state = {...this.state}
        state.open = !state.open
        this.setState({open:state.open})        
    }


    // componentDidUpdate(prevProps) {
    //    if(this.state.click.localeCompare('/') != 0){
    //         clearInterval()
    //    }
    // }


    render = ()=>{

        const classes = this.props.classes

        const itemsList = () =>(
            <List className={classes.list} >
                <ListItem >
                    <ListItemIcon> </ListItemIcon>
                </ListItem>
                <ListItem >
                    <ListItemIcon> </ListItemIcon>
                </ListItem>
                <ListItem >
                    <ListItemIcon> </ListItemIcon>
                </ListItem>

                <ListItem button >
                    <Link onClick={()=>{this.setState({click:'/'})}} to='/' className={classes.link}>
                        <ListItemIcon> <InboxIcon color={'primary'}/> </ListItemIcon>
                        <ListItemText>LIVE</ListItemText>
                    </Link>
                     
                </ListItem>
                {/* <ListItem button >
                    <Link onClick={()=>{this.setState({click:'/graphs'})}} to='/graphs' className={classes.link}>
                        <ListItemIcon> <InboxIcon color={'primary'}/> </ListItemIcon>
                        <ListItemText>GRAPH</ListItemText>
                    </Link>
                </ListItem> */}

                <ListItem button >
                    <Link onClick={()=>{this.setState({click:'from-day-1'})}} to='/from-day-1' className={classes.link}>
                        <ListItemIcon> <InboxIcon color={'primary'}/> </ListItemIcon>
                        <ListItemText>FROM DAY 1</ListItemText>
                    </Link>
                </ListItem>
                <ListItem button >
                    <Link onClick={()=>{this.setState({click:'news'})}} to='/news' className={classes.link}>
                        <ListItemIcon> <InboxIcon color={'primary'}/> </ListItemIcon>
                        <ListItemText>NEWS</ListItemText>
                    </Link>
                </ListItem>
                <ListItem button >
                    <Link onClick={()=>{this.setState({click:'about'})}} to='/about' className={classes.link}>
                        <ListItemIcon> <InboxIcon color={'primary'}/> </ListItemIcon>
                        <ListItemText>ABOUT</ListItemText>
                    </Link>
                </ListItem>
            </List>
        )
       

        return(
            <div className={classes.root}>
                
                <IconButton onClick={this.toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon color={'inherit'} className={classes.menuIcon} />
                </IconButton>

                <React.Fragment key={'left'}>
                    <Drawer anchor={'left'} open={this.state.open} onClose={this.toggleDrawer}  >
                        {itemsList()}
                    </Drawer>
                </React.Fragment>
            </div>
        )
    }
}
 
export default withStyles(styles)(NavMenu)