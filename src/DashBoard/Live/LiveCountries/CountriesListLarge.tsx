import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import CountryBox from './CountryBox'

const styles = {
    root:{
        borderLeft:'1px solid #999999',
        paddingLeft:'2%',
        paddingTop:'2px',
        float:'left' as 'left',
        zIndex:5000
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    handleSelectCountry?:any;
    countries?:{country:string,
                flag:string,
                cases:number,
                countryCode:string,
                deaths:number,
                recovered:number}[]
}

class CountriesListLarge extends React.Component<Props>{

   
    render = ()=>{
        const classes = this.props.classes

        const renderCountries = this.props.countries?.map(item=>{
            return(
                <CountryBox 
                    click={this.props.handleSelectCountry}
                    country={item.country}
                    countryCode={item.countryCode}
                    flag={item.flag}
                    cases={item.cases}
                    deaths={item.deaths}
                    recovered={item.recovered}
                ></CountryBox>
            )
        })
        

        return(
            <Box width="30%" height="100%" bgcolor='#212022' className={classes.root}>
                {renderCountries}
            </Box>
        )

    }

}

export default withStyles(styles)(CountriesListLarge)