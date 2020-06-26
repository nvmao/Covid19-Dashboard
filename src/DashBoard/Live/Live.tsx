import React from 'react'
import {Button,Grid,Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import LiveSummaryHead from './LiveSummaryHead/LiveSummaryHead'
import LiveRandChart from './LiveRandChart/LiveRandChart'
import LiveCountries from './LiveCountries/LiveCountries'
import LiveNews from './LiveNews/LiveNews'


const styles = {
    fullHeight:{
        height:'100%'
    }
}
   
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class Live extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <Box className={classes.fullHeight}>
                    
                    <Grid container className={classes.fullHeight}>
                        <Grid item xs={7} >
                            <LiveSummaryHead></LiveSummaryHead>
                            
                            <LiveRandChart></LiveRandChart>

                            <LiveNews></LiveNews>

                        </Grid>
 
                        <Grid item xs={5} >
                           <LiveCountries></LiveCountries>
                        </Grid>
                    </Grid>

            </Box>
        )

    }

}

export default withStyles(styles)(Live)