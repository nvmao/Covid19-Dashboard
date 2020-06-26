
import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import SummaryBoxes from './SummaryBoxes'

const styles = {
    fullHeight:{
        background:'#3245f8',
        width:'100%',
        height:'100vh',
        overflow:'hidden',
    },
    header:{
        color:'#ffffff',
        margin:'auto',
        width:'50%',
        textAlign:'left' as 'left',
        padding:'18px',
        fontFamily:'Raleway',
        fontSize:'32px'
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class LiveSummaryHead extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <Box width="100%" height="20%">
                <Box width='100%' height='50%' >
                    <div className={classes.header}>CORONAVIRUS PANDEMIC</div>
                    
                </Box>
                <Box width='100%' height='50%'>
                    <SummaryBoxes></SummaryBoxes>
                </Box>
            </Box>
        )
   
    }

}

export default withStyles(styles)(LiveSummaryHead)






