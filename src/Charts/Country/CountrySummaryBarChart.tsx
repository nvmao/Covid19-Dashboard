import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
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
    countryCode?:string
}

interface IState{
    data:{
        name:string,
        cases:number,
        deaths:number,
        recovered:number,
        newCases:number,
        newDeaths:number,
        newRecovered:number
    }
    loaded:boolean
}

class CountrySummaryBarChart extends React.Component<Props>{

    state:IState={
        data:{
            name:'',
            cases:0,
            deaths:0,
            recovered:0,
            newCases:0,
            newDeaths:0,
            newRecovered:0
        },
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.GET_COUNTRY+this.props.countryCode)
            .then(res=>{

                const data = {
                    name:res.data.country,
                    cases:res.data.cases,
                    deaths:res.data.deaths,
                    recovered:res.data.recovered,

                    newCases:res.data.todayCases,
                    newDeaths:res.data.todayDeaths,
                    newRecovered:res.data.todayRecovered
                }

                this.setState({data:data})

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
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['number','x'],
                        ['cases', this.state.data.cases],
                        ['recovered', this.state.data.recovered],
                        ['deaths', this.state.data.deaths],

                    ]}
                    options={{
                        backgroundColor:'#212022',
                        title: 'Coronavirus in ' + this.state.data.name,
                        titleTextStyle:{color:'#999'},
                        vAxis: { textStyle:{color:'#999'}, },
                        hAxis: { textStyle:{color:'#999'}, },
                        seriesType: 'bars',
                        series: { 5: { type: 'line' } },
                        colors:['#999999'],
                        animation: {
                            "startup": true,
                            duration: 3000,
                            easing: 'out',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                
                <div className={classes.chart}>
                    <Chart
                        width={'98%'}
                        height={'100%'}
                        chartType="ComboChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['number','x'],
                            ['Today cases', this.state.data.newCases],
                            ['Today recovered', this.state.data.newRecovered],
                            ['Today deaths', this.state.data.newDeaths],

                        ]}
                        options={{
                            backgroundColor:'#212022',
                            title: 'Today update',
                            titleTextStyle:{color:'#999'},
                            vAxis: { textStyle:{color:'#999'}, },
                            hAxis: { textStyle:{color:'#999'}, },
                            seriesType: 'bars',
                            series: { 5: { type: 'line' } },
                            colors:['#999999'],
                            animation: {
                                "startup": true,
                                duration: 1000,
                                easing: 'out',
                            },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
          
            </div>
            
            
        )

    }

}

export default withStyles(styles)(CountrySummaryBarChart)