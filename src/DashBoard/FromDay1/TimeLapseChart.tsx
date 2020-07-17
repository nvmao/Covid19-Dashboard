import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../../API/API'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
    currentDay:number
    loaded:boolean
}

class TimeLapseChart extends React.Component<Props>{
 
    state:IState={
        data:[
            ["Country", 'Cases']
        ],
        currentDay:0,
        loaded:false
    }
    countriesNameList
    datesList
    resData = {}
    running = true


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

                this.countriesNameList = Object.keys(this.resData)
                this.countriesNameList = this.countriesNameList.sort((a,b)=>{
                    return this.resData[b].timeline[this.datesList[this.state.currentDay]] - this.resData[a].timeline[this.datesList[this.state.currentDay]]
                })

                for(let i = 0;i < 15;i++){
                    newData.push([this.countriesNameList[i],this.resData[this.countriesNameList[i]].timeline[this.datesList[this.state.currentDay]]])
                }
 
                this.setState({data:newData,loaded:true})
    }

    nextDay = ()=>{
        const currentDay = this.state.currentDay + 1
        if(currentDay > this.datesList.length-1){
            return
        }        

        const newData = [["Country", 'Cases']]
        this.countriesNameList = this.countriesNameList.sort((a,b)=>{
            return this.resData[b].timeline[this.datesList[currentDay]] - this.resData[a].timeline[this.datesList[currentDay]]
        })
        for(let i = 0;i < 15;i++){
            newData.push([this.countriesNameList[i],this.resData[this.countriesNameList[i]].timeline[this.datesList[currentDay]]])
        }
        this.setState({data:newData,currentDay:currentDay})
    }

    getFormatDay(){
        const days = this.datesList[this.state.currentDay].split('/')
        return days[1]+'/'+days[0]+'/'+days[2]+'20'
    }

    componentDidMount = ()=>{
        axios.get(api.GET_HISTORICAL_COUNTRIES)
            .then(res=>{
                setTimeout(()=>{
                    this.initData(res)

                    setInterval(()=>{
                        if(this.running){
                            this.nextDay()
                        }
                    },500)
                },3000)
                

            })
            .catch(err => {console.log(err)})
    }

    handleDayChange = (val)=>{
        const newData = [["Country", 'Cases']]
        this.countriesNameList = this.countriesNameList.sort((a,b)=>{
            return this.resData[b].timeline[this.datesList[val]] - this.resData[a].timeline[this.datesList[val]]
        })
        for(let i = 0;i < 15;i++){
            newData.push([this.countriesNameList[i],this.resData[this.countriesNameList[i]].timeline[this.datesList[val]]])
        }
        this.setState({data:newData,currentDay:val})
    }

    render = ()=>{
        const classes = this.props.classes
        const loaded = this.state.loaded
        const chartRender = ()=>{
            if(loaded){
                return(
                    <div className={classes.root} >
                        <div onClick={()=>{this.running=true}} className={classes.root}>
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
                        </div>
                       
                        <div onMouseEnter={()=>{this.running = false}}>
                                <Typography id="discrete-slider" gutterBottom>
                                </Typography>
                                <Slider
                                    value={this.state.currentDay}
                                    onChange={(e,val)=>{this.handleDayChange(val)}}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="on"
                                    step={1}
                                    marks
                                    min={0}
                                    max={this.datesList.length-1}
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

export default withStyles(styles)(TimeLapseChart)