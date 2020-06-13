import React from 'react'

import { withStyles, WithStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup'



const styles = {
    box: {
        position:'relative' as 'relative',
        margin:'auto',
        minWidth:'18%',
        width: '18%',
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
        fontSize: '24px',
        lineHeight: '20px'
    },
    text:{
        margin:'auto',
        display:'block',
        width:'80%',
        padding: '0',
        textAlign:'center' as 'center',
        color: '#e0e0e0',
    },
    miniNumber:{
        position:'absolute' as 'absolute',
        textAlign:'center' as 'center',
        width:'10%',
        fontSize:'12px',
        left:'70%',
        top:'40%'
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode
    className?: string
    color?:string
    number:number
    desc:string
    miniNumber?:number
}

interface IState{
    doneCount:boolean
}

class SummaryBox extends React.Component<Props>{

    state={
        doneCount:false
    }


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
                        onEnd = {({pauseResume, reset, start, update} ) => {
                            this.setState({doneCount:true})
                        }} 
                        >
                        {({ countUpRef }) => (
                            <div>
                                <span ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>
                        {this.props.miniNumber && this.state.doneCount ?  
                            <div className={classes.miniNumber}>+{(this.props.miniNumber).toLocaleString()}</div> : ''}

                </div>
                <div className={classes.text}>{this.props.desc}</div>
            </div>
        )

    }

}
  
export default withStyles(styles)(SummaryBox)