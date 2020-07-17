import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { PieChart } from 'react-minimal-pie-chart';
import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../../API/API'

const styles = {
    root:{
       width:'98%',
       height:'98%',
       color:'#fff',
       margin:'auto'
    },
    chart:{
        width:'50%',
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
    countryCode:string;
}

interface IState{
    infectedChart:{
        infected:number,
        active:number,
        tests:number,
        population:number,
    }
    loaded:boolean
}

class PopulationCountryPieChart extends React.Component<Props>{

    state:IState={
        infectedChart:{
            infected:0,
            active:0,
            tests:0,
            population:0,
        },
      
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.GET_COUNTRY+this.props.countryCode)
            .then(res=>{
               const infected = {
                    infected:res.data.cases,
                    active:res.data.active,
                    tests:res.data.tests,
                    population:res.data.population,
                }

                this.setState({infectedChart:infected,loaded:true})
            })
            .catch(err => {console.log(err)})
    }


    render = ()=>{
        const classes = this.props.classes
        
        const loaded = this.state.loaded
        const chartRender = ()=>{
            if(loaded){
                return(
                    <div className={classes.root}>
                        <div className={classes.chart}>
                    <Chart
                        width={'98%'}
                        height={'100%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'Infected',],
                            ['Infected', this.state.infectedChart.infected],
                            ['Test', this.state.infectedChart.tests],
                        ]}
                        options={{
                            title: 'coronavirus infected',
                            backgroundColor: '#212022',
                            titleTextStyle: {
                                color: '#999'
                            },
                            legend: {
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            pieHole: 0.1,
                            slices: {
                                1: { offset: 0.2,color:'#f24475' },
                                0: { offset: 0.6,color:'#99f321' },
                              },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                        <div className={classes.chart}>
                    <Chart
                        style={{display:'flex'}}
                        width={'98%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'Population'],
                            ['population', this.state.infectedChart.population],
                            ['test', this.state.infectedChart.tests],
                        ]}
                        options={{
                            title: 'coronavirus testing',
                            backgroundColor: '#212022',
                            titleTextStyle: {
                                color: '#999'
                            },
                            legend: {
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            animation: {
                                "startup": true,
                                duration: 3000,
                                easing: 'out',
                            },
                            pieHole: 0.1,
                            slices: {
                                1: { offset: 0.6,color:'#f24475' },
                                0: { offset: 0.2,color:'#999' },
                              },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />

                </div>
                   </div>

                )
            }
            return(
                <div className={classes.root}>
                    <div><ReactLoading  className={classes.loading} color='#999999' type={'bars'} width='100px' height='100px'  /></div>
                </div>
            )
        }
        
        return(
                chartRender()
        )
    }

}

export default withStyles(styles)(PopulationCountryPieChart)