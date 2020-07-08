import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../../API/API'

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

interface ICountry{
    name:string,
    dates:[]
}

interface IState{
    data:Array<Array<string|number>>
    loaded:boolean
}

class TimeLapseChart extends React.Component<Props>{

    state:IState={
        data:[
            ["Country", 'Cases']
        ],
        loaded:false
    }
    countriesNameList
    datesList
    currentDay
    resData = {}


    initData = (res)=>{
        let newData:Array<Array<string|number>> = []
                newData = [["Country", 'Cases']]
                this.datesList = Object.keys(res.data[0].timeline.cases)
                for(let i = 0; i < res.data.length;i++){
                    if(this.resData[res.data[i].country] != null){
                        this.datesList.forEach(day=>{
                            this.resData[res.data[i].country].timeline[day] += res.data[i].timeline.cases[day]
                        })
                    }
                    else{
                        this.resData[res.data[i].country] = {
                            name:res.data[i].country,
                            timeline:res.data[i].timeline.cases
                        }
                    }
                }

                this.currentDay = 0
                this.countriesNameList = Object.keys(this.resData)
                this.countriesNameList = this.countriesNameList.sort((a,b)=>{
                    return this.resData[b].timeline[this.datesList[this.currentDay]] - this.resData[a].timeline[this.datesList[this.currentDay]]
                })

                for(let i = 0;i < 15;i++){
                    newData.push([this.countriesNameList[i],this.resData[this.countriesNameList[i]].timeline[this.datesList[this.currentDay]]])
                }
 
                this.setState({data:newData,loaded:true})
    }

    nextDay = ()=>{
        this.currentDay += 1
        if(this.currentDay > this.datesList.length-1){
            return
        }        

        const newData = [["Country", 'Cases']]
        this.countriesNameList = this.countriesNameList.sort((a,b)=>{
            return this.resData[b].timeline[this.datesList[this.currentDay]] - this.resData[a].timeline[this.datesList[this.currentDay]]
        })
        for(let i = 0;i < 15;i++){
            newData.push([this.countriesNameList[i],this.resData[this.countriesNameList[i]].timeline[this.datesList[this.currentDay]]])
        }
        this.setState({data:newData})
    }

    getFormatDay(){
        const days = this.datesList[this.currentDay].split('/')
        return days[1]+'/'+days[0]+'/'+days[2]+'20'
    }

    componentDidMount = ()=>{
        axios.get(api.GET_HISTORICAL_COUNTRIES)
            .then(res=>{
                setTimeout(()=>{
                    this.initData(res)

                    setInterval(()=>{
                        this.nextDay()
                    },500)
                },3000)
                

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
                        width={'100%'}
                        height={'100%'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.data}
                        options={{
                            title: 'Corona Virus, Day: '+ this.getFormatDay(),
                            chartArea: { width: '70%',height:'80%' },
                            hAxis: {
                            title: 'Total Population',
                            minValue: 0,
                            },
                            legend: {
                                position: 'none',
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
                                duration: 300,
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

export default withStyles(styles)(TimeLapseChart)