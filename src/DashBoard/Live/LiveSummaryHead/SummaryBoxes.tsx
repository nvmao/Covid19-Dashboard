import React from 'react'
import {Button,Grid,Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import SummaryBox from './SummaryBox'
import axios from 'axios'

const styles = {
    root:{
        margin:'auto',
        minWidth:'80%',
        width: '90%',
        background:'tranparent',
    },
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}


interface IState{
    Global:{
        newConfirmed: number,
        totalConfirmed: number,
        newDeaths: number,
        totalDeaths: number,
        newRecovered: number,
        totalRecovered: number,
        critical:number,
        countries:number
        
    }
}

class SummaryBoxes extends React.Component<Props>{

    state:IState={
        Global:{
            newConfirmed: 0,
            totalConfirmed: 0,
            newDeaths: 0,
            totalDeaths: 0,
            newRecovered: 0,
            totalRecovered: 0,
            critical:0,
            countries:0
        }
       
    }

    componentDidMount = ()=>{
        axios.get('https://corona.lmao.ninja/v2/all')
            .then(res=>{

                const global = {
                    totalConfirmed : res.data.cases,
                    newConfirmed : res.data.todayCases,
                    newDeaths : res.data.todayDeaths,
                    totalDeaths : res.data.deaths,
                    newRecovered : res.data.todayRecovered,
                    totalRecovered : res.data.recovered,
                    critical : res.data.critical,
                    countries: res.data.affectedCountries
                }
               

                this.setState({Global:global})
            })
    }
 
    render = ()=>{
        const classes = this.props.classes
        
        return(
            <div className={classes.root}>
               <SummaryBox number={this.state.Global.totalConfirmed} miniNumber={this.state.Global.newConfirmed} desc='Confirmed' color='#eeeeee'></SummaryBox>
               <SummaryBox number={this.state.Global.totalDeaths} miniNumber={this.state.Global.newDeaths}   desc='Deaths' color='#B6342C'></SummaryBox>
               <SummaryBox number={this.state.Global.totalRecovered} miniNumber={this.state.Global.newRecovered} desc='Covers' color='#3E9A3C'></SummaryBox>
               <SummaryBox number={this.state.Global.critical} desc='Critical' color='#CC871F'></SummaryBox>
               <SummaryBox number={this.state.Global.countries} desc='Countries' color='#eeeeee'></SummaryBox>
            </div>
        )

    }

}
  
export default withStyles(styles)(SummaryBoxes)