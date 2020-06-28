import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import GeoChart from '../../../Charts/GeoChart'
import LineChart from '../../../Charts/LineChart'
import PopulationPieChart from '../../../Charts/PopulationPieChart'
import SummaryPieChart from '../../../Charts/SummaryPieChart'
import ContinentsBubleChart from '../../../Charts/ContinentsBubleChart'

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

    state={
        currentChart:0
    }
    chartList = [<GeoChart></GeoChart>,
                <LineChart></LineChart>,
                <PopulationPieChart></PopulationPieChart>,
                <ContinentsBubleChart></ContinentsBubleChart>,
                <SummaryPieChart></SummaryPieChart>]

    componentDidMount(){
        setInterval(()=>{
            let next = this.state.currentChart + 1;
            if(next == this.chartList.length ){
                next = 0
            }
            this.setState({currentChart:next})
        },20000)
    }

    render = ()=>{
        const classes = this.props.classes

        return(
            <Box width="100%" height="60%" className={classes.root}>
                {this.chartList[this.state.currentChart]}
            </Box>
        )

    }

}

export default withStyles(styles)(LiveRanChart)