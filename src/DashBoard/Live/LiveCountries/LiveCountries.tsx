import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import axios from 'axios'

import CountriesListLarge from './CountriesListLarge'
import CountriesListSmall from './CountriesListSmall'

const styles = {
   
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

interface ICountry{
    country:string,
    flag:string,
    cases:number,
    deaths:number,
    recovered:number
}

interface IState{
    countries:ICountry[]
}

class LiveCountries extends React.Component<Props>{

    itemPerLarge:number=11
    itemPerSmall:number=15

    state={
        countries:[]
    }

    componentDidMount = ()=>{
        axios.get('https://corona.lmao.ninja/v2/countries')
        .then(res=>{
            let countries:ICountry[] = []
            for(let i = 0; i < res.data.length;i++){
                const country:ICountry ={
                    country:res.data[i].country,
                    flag:res.data[i].countryInfo.flag,
                    cases:res.data[i].cases,
                    deaths:res.data[i].deaths,
                    recovered:res.data[i].recovered
                }
                countries.push(country)
            }
            countries.sort((a,b)=>{
                return b.cases - a.cases;
            })
            this.setState({countries:countries})

        })
    }

    render = ()=>{
        const classes = this.props.classes

        return(
            <Box width="100%" height="100%" bgcolor='#212022'>
                <CountriesListLarge countries={this.state.countries.slice(0,this.itemPerLarge)}></CountriesListLarge>
                <CountriesListSmall scroll={false} countries={this.state.countries.slice(this.itemPerLarge,this.itemPerLarge+15)}></CountriesListSmall>
                <CountriesListSmall scroll={false} countries={this.state.countries.slice(this.itemPerLarge+this.itemPerSmall,this.itemPerLarge+this.itemPerSmall*2)}></CountriesListSmall>
                <CountriesListSmall scroll countries={this.state.countries.slice(this.itemPerLarge+this.itemPerSmall*2,this.state.countries.length)}></CountriesListSmall>
            </Box>
        )

    }

}

export default withStyles(styles)(LiveCountries)