import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Graticule,Marker } from "react-simple-maps";


import Chart from 'react-google-charts'
import axios from 'axios'
import ReactLoading from 'react-loading'
import api from '../API/API'


const styles = {
    root:{
       width:'100%',
       height:'100%',
       padding:0,
       margin:0
    },
    chart:{
        position:'absolute' as 'absolute',
        width:'98%',
        height:'100%',
        left:'-5%',
        top:0,
        padding:0,
        margin:0
    },
    loading:{
        margin:'auto',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    countryCode:string
}

interface ICity{
    markerOffset: number,
    name: string,
    cases:number,
    coordinates: number[]
}

interface IState{
    data:Array<ICity>

    loaded:boolean
}


class TodayGeoChart extends React.Component<Props>{

    state:IState={
        data:[],
        loaded:false
    }

    componentDidMount = ()=>{
        axios.get(api.TODAY_WORLD)
            .then(res=>{
                let newData = [...this.state.data]

                for(let i = 0 ; i < res.data.length;i++){
                    const city = res.data[i]
                    const newCity = {
                        markerOffset: 25,
                        name: city.province,
                        cases: city.stats.confirmed,
                        coordinates: [city.coordinates.latitude,city.coordinates.longitude]
                    }
                    newData.push(newCity)
                }
                this.setState({data:newData,loaded:true})
            })
            .catch(err => {console.log(err)})
    }


    render = ()=>{
        const classes = this.props.classes
        const countryCode = this.props.countryCode
        
        const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

        const markers = this.state.data.map((city) => (
            <Marker  coordinates={[city.coordinates[1],city.coordinates[0]]}>
            <circle r={10/city.cases} fill="#F00" stroke="#fff" strokeWidth={2} />
                <text
                    textAnchor="middle"
                    y={city.markerOffset}
                    style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                >
                    {/* {city.name} */}
                </text>
            </Marker>
        ))


        const loaded = this.state.loaded
 
        const chartRender = ()=>{
            if(loaded){
                return(
                        <ComposableMap
                            className={classes.chart}
                            projectionConfig={{
                                scale: 220
                            }}
                            >
                        {/* <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                            geographies
                                .filter(d => d.properties.REGION_UN === "Americas")
                                .map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#EAEAEC"
                                    stroke="#D6D6DA"
                                />
                                ))
                            }
                        </Geographies> */}

                            <Geographies 
                                geography={geoUrl}
                                fill="#333"
                                stroke="#222">
                                {({ geographies }) =>
                                geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                                }
                            </Geographies>

                            {markers} 
                    </ComposableMap>
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

export default withStyles(styles)(TodayGeoChart)