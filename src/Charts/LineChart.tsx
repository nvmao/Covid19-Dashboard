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
       color:'#fff'
    },
    loading:{
        margin:'auto',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    countryCode?:string;
}

interface IState{
    data:Array<Array<string|number>>
    countryName?:string
    loaded:boolean
}

class LineChart extends React.Component<Props>{

    state:IState={
        data:[
            ['x',"Cases"]
        ],
        loaded:false
    }

    componentDidMount = ()=>{
        if(this.props.countryCode){
            axios.get(api.TIMELINE_COUNTRY + this.props.countryCode + '?lastdays=all')
            .then(res=>{
                let newData:Array<Array<string|number>> = []
                newData.push(['x','Cases','Deaths','Recovered'])

                let datesCases = Object.keys(res.data.timeline.cases)
                datesCases.forEach(day=>{
                    let newDate = []
                    newDate.push(day)
                    newDate.push(res.data.timeline.cases[day])
                    newDate.push(res.data.timeline.deaths[day])
                    newDate.push(res.data.timeline.recovered[day])
                    newData.push(newDate)
                })

                this.setState({data:newData,countryName:res.data.country,loaded:true})
            })
        }
        else{
            axios.get(api.TIMELINE_ALL)
            .then(res=>{
                let newData:Array<Array<string|number>> = []
                newData = [['x','Cases','Deaths','Recovered']]

                let datesCases = Object.keys(res.data.cases)
               
                datesCases.forEach(day=>{
                    let newDate = []
                    newDate.push(day)
                    newDate.push(res.data.cases[day])
                    newDate.push(res.data.deaths[day])
                    newDate.push(res.data.recovered[day])
                    newData.push(newDate)
                })

                this.setState({data:newData,loaded:true})
            })
        }
       
    }


    render = ()=>{
        const classes = this.props.classes
        
        const loaded = this.state.loaded
        const chartRender = ()=>{
            if(loaded){
                return(
                    <Chart
                    width={'98%'}
                    height={'100%'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title:'Coronavirus Timeline - ' + this.props.countryCode ? this.state.countryName : 'global',
                        legend: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                        titleTextStyle: {
                            color: '#999'
                        },
                        hAxis: {
                            title: 'Time',
                            textStyle:{color:'#999999'},
                            titleTextStyle:{color:'#999'}
    
                        },
                        datalessRegionColor: '#f8bbd0',
                        vAxis: {
                            title: 'Timeline Global of Coronavirus Pandemic',
                            textStyle:{color:'#999999'},
                        },
                        animation: {
                            "startup": true,
                            duration: 3000,
                            easing: 'out',
                        },
                        backgroundColor:'#212022',
                        defaultColor: '#ffffff',
                        textColor:'#fff'                
                        }}
                    rootProps={{ 'data-testid': '1' }}
                    />
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

export default withStyles(styles)(LineChart)