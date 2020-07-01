import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import GeoChart from '../../../Charts/GeoChart'
import LineChart from '../../../Charts/LineChart'
import PopulationPieChart from '../../../Charts/PopulationPieChart'
import SummaryPieChart from '../../../Charts/SummaryPieChart'
import ContinentsBubleChart from '../../../Charts/ContinentsBubleChart'

import CountrySummaryBarChart from '../../../Charts/Country/CountrySummaryBarChart'

const styles = {
    root:{
        position:'relative' as 'relative',
        display:'block',
        borderTop:'1px solid #999999',
        padding:'10px',
        width : "100%" ,
        height : "60%"
    },
    next:{
        background:'transparent',
        position:'absolute' as 'absolute',
        right:'2%',
        top:0,
        height:'100%',
        width:'20%',
    },
    prev:{
        background:'transparent',
        position:'absolute' as 'absolute',
        left:0,
        top:0,
        height:'100%',
        width:'20%'
    }
}
 
interface Props extends WithStyles<typeof styles> {
    
    children?: React.ReactNode
    className?: string
    countryCode?: string|null

}

interface IState{
    currentChart: number
}

class LiveRanChart extends React.Component<Props>{

    state:IState={
        currentChart:0,
    }

    chartList = [<GeoChart></GeoChart>,
                <LineChart></LineChart>,
                <PopulationPieChart></PopulationPieChart>,
                <ContinentsBubleChart></ContinentsBubleChart>,
                <SummaryPieChart></SummaryPieChart>]

    // chartList = [<LineChart countryCode='cn'></LineChart>,
    //              <CountrySummaryBarChart countryCode='cn'></CountrySummaryBarChart>]


    componentDidMount(){
        setInterval(()=>{
            this.nextChart()
        },20000)
    }

    nextChart = ()=>{
        let next = this.state.currentChart + 1;
        if(next == this.chartList.length ){
            next = 0
        }
        this.setState({currentChart:next})
    }
    prevChart = ()=>{
        let prev = this.state.currentChart - 1;
        if(prev  < 0){
            prev = this.chartList.length - 1;
        }
        this.setState({currentChart:prev})
    }

    render = ()=>{
        const classes = this.props.classes

        return(
            <div  className={classes.root} >
                {this.chartList[this.state.currentChart]}
                <div className = {classes.prev} onClick={this.prevChart} ></div>
                <div className = {classes.next} onClick={this.nextChart} ></div>
            </div>
        )

    }

}

export default withStyles(styles)(LiveRanChart)