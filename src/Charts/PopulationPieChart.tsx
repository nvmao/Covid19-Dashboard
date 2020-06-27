import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../API/API'

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
}

interface IState{
    infectedChart:{
        infected:number,
        population:number
    }
    testChart:{
        active:number,
        tests:number,
        population:number,
    }
    loaded:boolean
}

class PopulationPieChart extends React.Component<Props>{

    state:IState={
        infectedChart:{
            infected:0,
            population:0
        },
        testChart:{
            active:0,
            tests:0,
            population:0,
        },
      
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.GET_ALL)
            .then(res=>{
               const infected = {
                   infected:res.data.cases,
                   population:res.data.population,
               }
               const testChart = {
                active:res.data.active,
                tests:res.data.tests,
                population:res.data.population,
                }

                this.setState({infectedChart:infected,testChart:testChart})
            })
            .catch(err => {console.log(err)})
    }


    render = ()=>{
        const classes = this.props.classes
        
       
        return(
            <div className={classes.root}>
                <div className={classes.chart}>
                    <Chart
                        width={'98%'}
                        height={'100%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'Population'],
                            ['population', this.state.infectedChart.population],
                            ['infected', this.state.infectedChart.infected],
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
                            pieStartAngle: 2,
                            slices: {
                                1: { color:'transparent' },
                              },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                
                <div className={classes.chart}>
                    <Chart
                        style={{display:'flex'}}
                        width={'98%'}
                        height={'100%'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['x', 'Population'],
                            ['population', this.state.infectedChart.population],
                            ['active', this.state.testChart.active],
                            ['testing', this.state.testChart.tests],
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
                            pieHole: 0.1,
                            slices: {
                                1: { offset: 0.6 },
                                2: { offset: 0.2 },
                                0: { offset: 0.1 },
                              },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
          
            </div>
            
            
        )

    }

}

export default withStyles(styles)(PopulationPieChart)