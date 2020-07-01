import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
    news:{
        textAlign:'left' as 'left',
        width:'90%',
        margin:'2px auto',
    },
    title:{
        fontSize:'15px',
        color:'#22738D',
        textDecoration:'none',
        padding:'0',
        margin:'0',
        marginBottom:'1px'
    },
    description:{
        margin:'0',
        fontSize:'12px',
        padding:'0',
        color:'#999999'
    },
    published:{
        color:'#999999',
        padding:'0',
        marginTop:'8px'
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode
    className?: string
    title:string
    url:string
    from:string
    published:string
    description:string
}

class News extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <div className={classes.news}>
                <a className={classes.title} href="https://google.com"><h3 style={{marginBottom:'1px'}} >{this.props.title}</h3></a>
                <p className={classes.description}>{this.props.description}</p>
                <h5 className={classes.published}>{this.props.from} - <span> {this.props.published} </span>  </h5>
            </div>
        )

    }

}

export default withStyles(styles)(News)