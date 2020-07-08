import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import TimeLapseChart from './TimeLapseChart'

const styles = {
    fullHeight:{
        background:'#212022',
        width:'100%',
        height:'100vh',
        overflow:'hidden',
    },
    root:{
        position:'relative' as 'relative',
        width:'90%',
        height:'80%',
        margin:'5% auto',
        
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class FromDay1 extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <Box className={classes.fullHeight}>
                    
                    <div className={classes.root}>
                        <TimeLapseChart></TimeLapseChart>
                    </div>

            </Box>
        )

    }

}

export default withStyles(styles)(FromDay1)