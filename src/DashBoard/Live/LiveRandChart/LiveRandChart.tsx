import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import GeoChart from '../../../Charts/GeoChart'
import LineChart from '../../../Charts/LineChart'
import PopulationPieChart from '../../../Charts/PopulationPieChart'
import SummaryPieChart from '../../../Charts/SummaryPieChart'
import ContinentsBubleChart from '../../../Charts/ContinentsBubleChart'
import TodayGeoChart from '../../../Charts/TodayGeoChart'
import BarChart from '../../../Charts/BarChart'
import PopulationCountryPieChart from '../../../Charts/Country/PopulationCountryPieChart'
import CountrySummaryBarChart from '../../../Charts/Country/CountrySummaryBarChart'

const styles = {
    root:{
        position:'relative' as 'relative',
        display:'block',
       
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
        width:'8%',
    },
    prev:{
        background:'transparent',
        position:'absolute' as 'absolute',
        left:0,
        top:0,
        height:'100%',
        width:'8%'
    },
    countryBtn:{
        position:'absolute' as 'absolute',
        right:'5%',
        top:'2%',
        background:'rgba(196, 196, 196, 0.06)',
        color:'#eee',
        textAlign:'center' as 'center',
        verticalAlign: 'middle',
        borderRadius:'22px',
        paddingTop:'5px',
        paddingBottom:'10px',
        paddingLeft:'15px',
        paddingRight:'15px',
        width:'auto',
        "&:hover":{
            cursor: 'pointer'
       }
    },
    flag:{
        width:'30px',
    }
}

interface Props extends WithStyles<typeof styles> {
    
    children?: React.ReactNode
    className?: string
    selectedCountry?: any
    clickCountryBtn:any

}

interface IState{
    currentChart: number
}

class LiveRanChart extends React.Component<Props>{

    state:IState={
        currentChart:0,
    }
    interval
    stopSliding = false

    chartList = [
                <BarChart></BarChart>,
                <TodayGeoChart countryCode='VN'></TodayGeoChart>,
                <PopulationPieChart></PopulationPieChart>,
                <GeoChart></GeoChart>,
                <LineChart></LineChart>,
                <ContinentsBubleChart></ContinentsBubleChart>,
                <SummaryPieChart></SummaryPieChart>]
 

    callInterval = ()=>{
        this.interval = setInterval(()=>{
            if(this.stopSliding){
                return
            }
            this.nextChart()
        },10000)
    }
    
    componentDidMount(){
        this.callInterval()
    }
 
    componentWillReceiveProps(nextProps){

        if(this.props.selectedCountry.code.localeCompare(nextProps.selectedCountry.code) != 0){
            if(nextProps.selectedCountry.code.localeCompare('') != 0){
                this.chartList = [  
                    // <TodayGeoChart countryCode={nextProps.countryCode}></TodayGeoChart>,
                    <LineChart countryCode={nextProps.selectedCountry.code}></LineChart>,                
                    <CountrySummaryBarChart countryCode={nextProps.selectedCountry.code}></CountrySummaryBarChart>,
                    <PopulationCountryPieChart countryCode={nextProps.selectedCountry.code}></PopulationCountryPieChart> ]
                this.nextChart()
            } 
            else{
                this.chartList = [
                    <GeoChart></GeoChart>,
                    <LineChart></LineChart>,
                    <PopulationPieChart></PopulationPieChart>,
                    <ContinentsBubleChart></ContinentsBubleChart>,
                    <SummaryPieChart></SummaryPieChart>,]
                this.nextRandomChart()
            }
        }
    }
 
    nextRandomChart = ()=>{
        const random = Math.floor(Math.random() * this.chartList.length)
        this.setState({currentChart:random})
        clearInterval(this.interval)
        this.callInterval()
    }

    nextChart = ()=>{
        let next = this.state.currentChart + 1;
        if(next >= this.chartList.length ){
            next = 0
        }
        this.setState({currentChart:next})

        clearInterval(this.interval)
        this.callInterval()
    }
    prevChart = ()=>{
        let prev = this.state.currentChart - 1;
        if(prev  < 0){
            prev = this.chartList.length - 1;
        }
        this.setState({currentChart:prev})

        clearInterval(this.interval)
        this.callInterval()
    }
 
    render = ()=>{
        const classes = this.props.classes

        

        return(
            <div  className={classes.root} onMouseEnter={()=>{this.stopSliding=true}} onMouseLeave={()=>{this.stopSliding=false}}>
                   
                {this.chartList[this.state.currentChart]}

                <div className = {classes.prev} onClick={this.prevChart} ></div>
                <div className = {classes.next} onClick={this.nextChart} ></div>
                {this.props.selectedCountry.code == '' ? '': 
                <div onClick={this.props.clickCountryBtn} className={classes.countryBtn}>
                    <img src={this.props.selectedCountry.flag} className={classes.flag}></img>
                     {this.props.selectedCountry.name}
                </div>}
            </div>
        
        )

    }
 
}

export default withStyles(styles)(LiveRanChart)