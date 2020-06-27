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

class GeoChart extends React.Component<Props>{

    state:IState={
        data:[
            ['Country Code',"Country", 'Cases']
        ],
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.SUMMARY_ALL_COUNTRY)
            .then(res=>{
            //    setTimeout(()=>{
                let newData = [...this.state.data]
                newData = [['Country Code','Country','Cases']]

                for(let i = 0 ; i < res.data.length;i++){
                    const country = res.data[i]
                    const newCountry = []
                    newCountry.push(country.countryInfo.iso2)
                    newCountry.push(country.country)
                    newCountry.push(country.cases)
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
                    
                    chartType="GeoChart"
                    options={{
                        colorAxis: { colors: ['#db7972', '#b3453d','#991208'] },
                        backgroundColor: '#212022',
                        datalessRegionColor: '#f8bbd0',
                        defaultColor: '#f5f5f5',
                      }}
                    data={this.state.data}
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    // mapsApiKey="YOUR_KEY_HERE"
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

export default withStyles(styles)(GeoChart)