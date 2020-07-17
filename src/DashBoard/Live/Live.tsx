import React from 'react'
import {Button,Grid,Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import LiveSummaryHead from './LiveSummaryHead/LiveSummaryHead'
import LiveRandChart from './LiveRandChart/LiveRandChart'
import LiveCountries from './LiveCountries/LiveCountries'
import LiveNews from './LiveNews/LiveNews'


const styles = {
    fullHeight:{
        height:'100%'
    }
}
   
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

interface IState{
    selectedCountry:{
        code:string,
        name:string,
        flag:string
    } 
}

class Live extends React.Component<Props>{
    state:IState = {
        selectedCountry:{
            code:'',
            name:'',
            flag:''
        } 
    }

    handleSelectCountry = (countryCode,countryName,countryFlag)=>{
        const country ={
            code:countryCode,
            name:countryName,
            flag:countryFlag
        }
        this.setState({selectedCountry:country})
    }
    handleRemoveCountry = ()=>{
        const country = {...this.state.selectedCountry}
        country.code = ''
        this.setState({selectedCountry:country}) 
    }

    render = ()=>{
        const classes = this.props.classes

        return(
            <Box className={classes.fullHeight}>
                    
                    <Grid container className={classes.fullHeight}>
                        <Grid item xs={7} >
                            <LiveSummaryHead></LiveSummaryHead>
                            
                            <LiveRandChart 
                                clickCountryBtn={this.handleRemoveCountry} 
                                selectedCountry={this.state.selectedCountry}>
                            </LiveRandChart>

                            <LiveNews></LiveNews>

                        </Grid>
 
                        <Grid item xs={5} >
                           <LiveCountries handleSelectCountry={this.handleSelectCountry}></LiveCountries>
                        </Grid>
                    </Grid>

            </Box>
        )

    }

}

export default withStyles(styles)(Live)