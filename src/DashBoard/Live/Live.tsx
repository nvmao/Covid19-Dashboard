import React from 'react'
import {Button,Grid,Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';


const styles = {
    fullHeight:{
        height:'100%'
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class Live extends React.Component<Props>{


    render = ()=>{
        const classes = this.props.classes

        return(
            <Box className={classes.fullHeight}>
                    
                    <Grid container className={classes.fullHeight}>
                        <Grid item xs={7} >
                            <Box width="100%" height="20%">
                               
                            </Box>

                            <Box width="100%" height="60%" bgcolor='#02f312'>
                                what
                            </Box>

                            <Box width="100%" height="20%" bgcolor='#f3f312'>
                                what
                            </Box>

                        </Grid>
 
                        <Grid item xs={5} >
                            <Box width="100%" height="100%" bgcolor='#f3f3f3'>
                                <Button color='primary'>Hello</Button>
                            </Box>
                        </Grid>
                    </Grid>

            </Box>
        )

    }

}

export default withStyles(styles)(Live)