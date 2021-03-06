import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../API/API'

const styles = {
    root:{
       width:'100%',
       height:'100%',
       color:'#fff',
       margin:'auto'
    },
    chart:{
        width:'100%',
        height:'100%',
        margin:0,
        display:'flex',
        float:'left' as 'left'
    },
    loading:{
        margin:'auto',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

interface IState{
    infectedChart:{
        cases:number,
        deaths:number,
        recovered:number,
        active:number,
        critical:number
    }
    perMillionChart:{
        cases:number,
        deaths:number,
        recovered:number,
        active:number,
        critical:number
    }
    loaded:boolean
}

class SummaryPieChart extends React.Component<Props>{

    state:IState={
        infectedChart:{
            cases:0,
            deaths:0,
            recovered:0,
            active:0,
            critical:0
        },
        perMillionChart:{
            cases:0,
            deaths:0,
            recovered:0,
            active:0,
            critical:0
        },
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.GET_ALL)
            .then(res=>{
               const infected = {
                    cases:res.data.cases,
                    deaths:res.data.deaths,
                    recovered:res.data.recovered,
                    active:res.data.active,
                    critical:res.data.critical
               }
               const perMillionChart = {
                    cases:res.data.casesPerOneMillion,
                    deaths:res.data.deathsPerOneMillion,
                    recovered:res.data.recoveredPerOneMillion,
                    active:res.data.activePerOneMillion,
                    critical:res.data.criticalPerOneMillion
                }

                this.setState({infectedChart:infected,perMillionChart:perMillionChart,loaded:true})
            })
            .catch(err => {console.log(err)})
    }


    render = ()=>{
        const classes = this.props.classes
        
        const loaded = this.state.loaded
        const chartRender = ()=>{
            if(loaded){
                return(
                    <div className={classes.chart}>
                    <Chart
                        width={'98%'}
                        height={'100%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'Population'],
                            ['recovered', this.state.perMillionChart.recovered],
                            ['deaths', this.state.perMillionChart.deaths],
                            ['active', this.state.perMillionChart.active],
                            ['critical', this.state.perMillionChart.critical],
                        ]}
                        options={{
                            title: 'coronavirus infected rate',
                            backgroundColor: '#212022',
                            titleTextStyle: {
                                color: '#999'
                            },
                            animation: {
                                "startup": true,
                                duration: 3000,
                                easing: 'out',
                            },
                            legend: {
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            tooltip: {
                                trigger: 'both'
                            },
                            pieHole:0.1,
                            slices: {
                                0: { offset: 0.3,color:'green' },
                                1: { offset: 0.2,color:'#f32201' },
                                2: { offset: 0.1,color:'#2372f4' },
                                3: {color:'magenta'}
                              },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
          
                )
            }
            return(
                <div><ReactLoading  className={classes.loading} color='#999999' type={'bars'} width='100px' height='100px'  /></div>
            )
        }
        
        return(
            <div className={classes.root}>
                {chartRender()}
            </div>
        )

    }

}

export default withStyles(styles)(SummaryPieChart)