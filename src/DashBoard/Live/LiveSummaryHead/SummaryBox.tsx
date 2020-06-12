import React from 'react'
import {Button,Grid,Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup'



const styles = {
    box: {
        margin:'auto',
        minWidth:'200px',
        width: '22%',
        height: '69px',
        background:'rgba(196, 196, 196, 0.06)',
        borderRadius: '22px',
        fontFamily :'Roboto',
        float:'left' as 'left',
        marginRight:'15px'
      },
    number:{
        margin:'auto',
        display:'block',
        width:'80%',
        padding: '13px',
        textAlign:'center' as 'center',
        color: '#CC871F',
        fontSize: '36px',
        lineHeight: '20px'
    },
    text:{
        margin:'auto',
        display:'block',
        width:'80%',
        padding: '0',
        textAlign:'center' as 'center',
        color: '#e0e0e0',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode
    className?: string
    color?:string
    number:number
    desc:string
}

class SummaryBox extends React.Component<Props>{

 //(12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

                       

    render = ()=>{
        const classes = this.props.classes
        
        return(
            <div  className={classes.box} >


                   

                <div className={classes.number} 
                style={{color:this.props.color}}>

                    <CountUp
                        end={this.props.number}
                        duration={10}
                        delay={0}
                        formattingFn={(number)=>{return number.toLocaleString()}}
                        >
                        {({ countUpRef }) => (
                            <div>
                                <span ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>


                </div>
                <div className={classes.text}>{this.props.desc}</div>
            </div>
        )

    }

}
  
export default withStyles(styles)(SummaryBox)