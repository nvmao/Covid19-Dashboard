import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';


const styles = {
    fullHeight:{
        background:'#3245f8',
        width:'100%',
        height:'100vh',
        overflow:'hidden',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class LiveCountries extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <Box width="100%" height="100%" bgcolor='red'>
                
            </Box>
        )

    }

}

export default withStyles(styles)(LiveCountries)