import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';


const styles = {
    root:{
       width:'100%',
       height:'70px',
    },
    descBox:{
        display:'block',
        height:'60%',
        width:'100%'
    },
    flag:{
        width:'30%',
        height:'80%',
        float:'left' as 'left'
    },
    desc:{
        fontSize:'13px',
        display:'block',
        float:'left' as 'left',
        padding:'0',
        margin:'0'
    },
    countryName:{
        padding:'0',
        margin:'0',
        fontWeight:'bold' as 'bold',
        color:'#cacdca',
    },
    summaryDesc:{
        padding:'0',
        margin:'0',
        color:'#cacdca'
    },
    details:{
        fontSize:'14px',
        color:'#cacdca',
        margin:'0',
        width:'100%',
        paddingTop:'1px',
        textAlign:'center' as 'center',
        lightHeight:'8px',
        fontFamily:'Roboto'
    },
    detail:{
        marginRight:'4%',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
    country:string,
    flag:string
    cases:number,
    deaths:number,
    recovered:number
}

class CountryBox extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
           <div className={classes.root}>
               <div className={classes.descBox}>
                <img src={this.props.flag} className={classes.flag}></img>
                <div className={classes.desc}>
                    <h3 className={classes.countryName}>{this.props.country.substr(0,10).toUpperCase()}</h3>
                    <p className={classes.summaryDesc}>
                        <span style={{color:'#eeeeee'}}>Cases  </span>
                        <span style={{color:'#eeeeee'}}>Deaths  </span>
                        <span style={{color:'#eeeeee'}}>Cover</span>
                    </p>
                </div>
               </div>
              
               <div className={classes.details}>
                <span style={{color:'#eeeeee'}} className={classes.detail}>{this.props.cases.toLocaleString()}</span>
                <span style={{color:'#B6342C'}} className={classes.detail}>{this.props.deaths.toLocaleString()}</span>
                <span style={{color:'#3E9A3C'}} className={classes.detail}>{this.props.recovered.toLocaleString()}</span>
                </div>
           </div>
        )

    }

}

export default withStyles(styles)(CountryBox)