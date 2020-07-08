import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../API/API'

const styles = {
    root:{
       width:'100%',
       height:'100%'
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
    data:Array<Array<string|number>>
    loaded:boolean
}

class BarChart extends React.Component<Props>{

    state:IState={
        data:[
            ["Country", 'Cases']
        ],
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.SUMMARY_ALL_COUNTRY+'?sort=todayCases')
            .then(res=>{
            //    setTimeout(()=>{
                let newData = [...this.state.data]
                newData = [['Country','Cases']]

                for(let i = 0 ; i < 14;i++){
                    const country = res.data[i]
                    const newCountry = []

                    if(country.todayCases == 0){
                        break
                    }

                    newCountry.push(country.country)
                    newCountry.push(country.todayCases)
                    newData.push(newCountry)
                }
                this.setState({data:newData,loaded:true})
            //    },3000)
            })
            .catch(err => {console.log(err)})
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
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.data}
                        options={{
                            title: 'Today Cases',
                            chartArea: { width: '70%',height:'80%' },
                            hAxis: {
                            title: 'Total Population',
                            minValue: 0,
                            },
                            legend: {
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            titleTextStyle: {
                                color: '#999'
                            },
                            vAxis: {
                                textStyle:{color:'#999999'},
                                titleTextStyle:{color:'#999'},
                                title: 'Country',
                            },
                            colors:['#999999'],
                            backgroundColor: '#212022',
                            animation: {
                                "startup": true,
                                duration: 3000,
                                easing: 'out',
                            },
                        }}
                        // For tests
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

export default withStyles(styles)(BarChart)