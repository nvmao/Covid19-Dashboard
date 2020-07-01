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
    countryCode:string
}

class Live extends React.Component<Props>{
    state:IState = {
        countryCode:''
    }

    handleSelectCountry = (countryCode)=>{
        this.setState({countryCode:countryCode})
    }
    handleRemoveCountry = ()=>{
        this.setState({countryCode:''})
    }

    render = ()=>{
        const classes = this.props.classes

        console.log('code: '+this.state.countryCode) 

        return(
            <Box className={classes.fullHeight}>
                    
                    <Grid container className={classes.fullHeight}>
                        <Grid item xs={7} >
                            <LiveSummaryHead></LiveSummaryHead>
                            
                            <LiveRandChart 
                                clickCountryBtn={this.handleRemoveCountry} 
                                countryCode={this.state.countryCode}>
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