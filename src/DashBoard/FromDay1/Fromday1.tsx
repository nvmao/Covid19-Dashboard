import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';


const styles = {
    fullHeight:{
        background:'#21f534',
        width:'100%',
        height:'100vh',
        overflow:'hidden',
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
                    
                   

            </Box>
        )

    }

}

export default withStyles(styles)(FromDay1)