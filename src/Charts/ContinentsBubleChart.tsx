
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

// interface IContinent{
//     name:string,
//     cases:number,
//     deaths:number,
//     recovered:number
// }

interface IState{
    continents:Array<Array<number|string>>
    loaded:boolean
}

class ContinentsBubleChart extends React.Component<Props>{

    state:IState={
        continents:[],
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.GET_CONTINENTS)
            .then(res=>{
                const continents:Array<Array<number|string>> =[]
            
                continents.push(['ID','cases','deaths'])
                for(let i = 0; i < res.data.length;i++){
                    const resContinent = res.data[i]

                    const newCotinent:Array<string|number> = []
                    newCotinent.push( resContinent.continent)
                    newCotinent.push( resContinent.cases)
                    newCotinent.push( resContinent.deaths)
                    // newCotinent.push( resContinent.population)
                    continents.push(newCotinent)

                }
                this.setState({continents:continents})
            })
            .catch(err => {console.log(err)})
    }


    render = ()=>{
        const classes = this.props.classes
       
        return(
            <div className={classes.root}>
            <Chart
                width={'98%'}
                height={'100%'}
                chartType="BubbleChart"
                loader={<div>Loading Chart</div>}
                data={this.state.continents}
                options={{
                    title:
                    'Correlation between cases and death rate  of continents',
                    hAxis: { title: 'Cases Rate',textStyle:{color:'#999999'},titleTextStyle:{color:'#999'} },
                    vAxis: { title: 'Death Rate',textStyle:{color:'#999999'},titleTextStyle:{color:'#999'} },
                    bubble: { textStyle: { color:'#999' } },
                    backgroundColor: '#212022',
                    titleTextStyle: {
                        color: '#999'
                    },
                    animation: {
                        "startup": true,
                        duration: 3000,
                        easing: 'out',
                    },
                    bar:{textStyle:{color:'#999'}},
                    legend: {
                        textStyle: {
                            color: '#999'
                        }
                    },
                    colors:['#6776f9','#2354f1']
                }}
                rootProps={{ 'data-testid': '1' }}
                />
            </div>
            
            
        )

    }

}

export default withStyles(styles)(ContinentsBubleChart)

