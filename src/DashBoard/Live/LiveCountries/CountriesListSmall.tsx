import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import CountryBoxSmall from './CountryBoxSmall'

const styles = {
    root:{
        paddingLeft:'0%',
        paddingTop:'8px',
        marginRight:'2%',
        float:'left' as 'left',
        overflow:'auto',
        overflowX:'hidden' as 'hidden'
    },
    '@global':{
        '*::-webkit-scrollbar':{
            background:'black',
            width:'2px'
        },
        '::-webkit-scrollbar-thumb':{
            background:'white'
        }
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    countries?:{
        country:string,
        flag:string,
        cases:number,
        deaths:number,
        recovered:number}[]
}

class CountriesListLarge extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes
        const renderCountries = this.props.countries?.map(item=>{
            return(
                <CountryBoxSmall 
                    country={item.country}
                    flag={item.flag}
                    cases={item.cases}
                    deaths={item.deaths}
                    recovered={item.recovered}
                ></CountryBoxSmall>
            )
        })
        

        return(
            <Box width="20%" height="100vh"  className={classes.root}>
                {renderCountries}
            </Box>
        )
    }

}

export default withStyles(styles)(CountriesListLarge)