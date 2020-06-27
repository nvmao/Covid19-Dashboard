import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import GeoChart from '../../../Charts/GeoChart'
import LineChart from '../../../Charts/LineChart'

const styles = {
    root:{
        display:'block',
        borderTop:'1px solid #999999',
        padding:'10px'
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class LiveRanChart extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <Box width="100%" height="60%" className={classes.root}>
                {/* <GeoChart></GeoChart> */}
                <LineChart></LineChart>
            </Box>
        )

    }

}

export default withStyles(styles)(LiveRanChart)