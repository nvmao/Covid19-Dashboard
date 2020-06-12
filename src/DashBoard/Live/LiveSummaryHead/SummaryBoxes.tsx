import React from 'react'
import {Button,Grid,Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import SummaryBox from './SummaryBox'
import axios from 'axios'

const styles = {
    root:{
        margin:'auto',
        minWidth:'200px',
        width: '75%',
        background:'tranparent',
    },
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

interface IState{
    Global:{
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number
    }
}

class SummaryBoxes extends React.Component<Props>{

    state:IState={
        Global:{
            NewConfirmed: 0,
            TotalConfirmed: 0,
            NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0
        }
       
    }

    componentDidMount = ()=>{
        axios.get('https://api.covid19api.com/summary')
            .then(res=>{
               this.setState({Global:res.data.Global})
            })
    }

    render = ()=>{
        const classes = this.props.classes
        
        return(
            <div className={classes.root}>
               <SummaryBox number={this.state.Global.TotalConfirmed} desc='Confirmed' color='#CC871F'></SummaryBox>
               <SummaryBox number={this.state.Global.TotalDeaths}    desc='Deaths' color='#B6342C'></SummaryBox>
               <SummaryBox number={this.state.Global.TotalRecovered} desc='Covers' color='#3E9A3C'></SummaryBox>
            </div>
        )

    }

}
  
export default withStyles(styles)(SummaryBoxes)