import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef'

import CountryBoxSmall from './CountryBoxSmall'

const styles = {
    root:{
        marginLeft:'0%',
        paddingTop:'8px',
        marginRight:'1%',
        float:'left' as 'left',
        overflow:'auto',
        overflowX:'hidden' as 'hidden',
        width:"20%" ,
        height:"100vh",
        //scrollBehavior:'smooth' as 'smooth'
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
    children?: React.ReactNode
    className?: string
    scroll:boolean
    countries?:{
        country:string,
        flag:string,
        cases:number,
        deaths:number,
        recovered:number}[]
}

class CountriesListLarge extends React.Component<Props>{

    el:React.RefObject<HTMLElement> = React.createRef()
    scrollVal:number = 0
    scrollDirection:number = 1
    scrolling:boolean = true

    componentDidMount = ()=>{
        this.handleScroll()
    }

    handleMouseEnterScroll = ()=>{
        this.scrolling = false
    }
    handleMouseExitScroll = ()=>{
        this.scrolling = true
    }

    handleScroll = ()=> {
        if(this.props.scroll){
            setInterval(()=>{

                if(this.scrolling){
                    this.el.current?.scroll(1,this.scrollVal)
                    this.scrollVal += 2 * this.scrollDirection

                    if(this.el.current.scrollTop >= (this.el.current.scrollHeight - this.el.current.offsetHeight - 150)){
                        this.scrollDirection = -1  
                    }
                    else if(this.el.current.scrollTop <= 0){
                        this.scrollDirection = 1
                    }
                }

            },50)
        }
    }

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
            <RootRef rootRef={this.el}>
                    <div  className={classes.root} onMouseEnter={this.handleMouseEnterScroll} onMouseLeave={this.handleMouseExitScroll} >
                            {renderCountries}
                    </div>
            </RootRef>
           
        )
    }

}

export default withStyles(styles)(CountriesListLarge)