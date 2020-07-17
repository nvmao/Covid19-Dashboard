import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import AirplanemodeInactiveIcon from '@material-ui/icons/AirplanemodeInactive';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';

const styles = {
    root: {
        position:'relative' as 'relative',
        width:'90%',
        height:'80%',
        margin:'5% auto',
      },
    nav:{
        width:'500px',
        background:'#f3c365',
        position:'relative' as 'relative',
        margin:'auto',
    },
    textPlace:{
        position:'relative' as 'relative',
        color:'#999',
        textAlign:'left' as 'left',
    },
    text:{
        width:'70%',
        height:'500px',
        margin:'30px auto',
        fontSize:'18px',
        overflowY:'scroll' as 'scroll',
       
    },
    '@global':{
        '*::-webkit-scrollbar':{
            background:'black',
            width:'2px'
        },
        '::-webkit-scrollbar-thumb':{
            background:'white'
        }
    },
    fullHeight:{
        width:'100%',
        height:'100vh',
        overflow:'hidden',
    }
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

class About extends React.Component<Props>{
    state = {
        value : 0
    } 
    data = [
       
        // `${<div>hello234234</div>}`
        {
            text:(
                <div>
                    <p>Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.</p>
                    <p>Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.</p>
                    <p>The best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face. </p>
                    <p>The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).</p>
                    <p>At this time, there are no specific vaccines or treatments for COVID-19. However, there are many ongoing clinical trials evaluating potential treatments. WHO will continue to provide updated information as soon as clinical findings become available.</p>
                
                    <p>Source: WHO</p>
                </div>
            )
        },
        {
            text:(
                <div>
                    <p>To prevent infection and to slow transmission of COVID-19, do the following:</p>
                    <ul>
                        <li>Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.</li>
                        <li>Maintain at least 1 metre distance between you and people coughing or sneezing.</li>
                        <li>Avoid touching your face.</li>
                        <li>Cover your mouth and nose when coughing or sneezing.</li>
                        <li>Stay home if you feel unwell.</li>
                        <li>Refrain from smoking and other activities that weaken the lungs.</li>
                        <li>Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people.</li>
                    </ul>

                    <p>Source: WHO</p>
                </div>
            )
        },
        {
            text:(
                <div style={{height:'100%',position:'relative'}}>
                    <p>COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness and recover without hospitalization.</p>
                    <p>Most common symptoms:</p>
                    <ul>
                        <li>fever.</li>
                        <li>dry cough.</li>
                        <li>tiredness.</li>
                    </ul>
                    <p>Less common symptoms:</p>
                    <ul>
                        <li>aches and pains.</li>
                        <li>sore throat.</li>
                        <li>diarrhoea.</li>
                        <li>conjunctivitis.</li>
                        <li>headache.</li>
                        <li>loss of taste or smell.</li>
                        <li>a rash on skin, or discolouration of fingers or toes.</li>
                    </ul>
                    
                    <p>Serious symptoms:</p>
                    <ul>
                        <li>difficulty breathing or shortness of breath.</li>
                        <li>chest pain or pressure.</li>
                        <li>loss of speech or movement.</li>
                    </ul>

                    <p>Seek immediate medical attention if you have serious symptoms.  Always call before visiting your doctor or health facility. </p>
                    <p>People with mild symptoms who are otherwise healthy should manage their symptoms at home. </p>
                    <p>On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days. </p>


                    <p>Source: WHO</p>
                </div>
            )
        }
        
    ]

    render = ()=>{
        const classes = this.props.classes

        const dataRender = this.data.map(item=>{
            console.log(item)
        return (<div>{item.text}</div>)
        })

        return(
            <Box className={classes.fullHeight}>
                    
                <div className={classes.root}>
                    <BottomNavigation
                        value={this.state.value}
                        onChange={(event, newValue) => {
                            this.setState({value:newValue})
                        }}
                        showLabels
                        className={classes.nav}
                        >
                        <BottomNavigationAction  label="Overview" icon={<LiveHelpIcon />} />
                        <BottomNavigationAction  label="Prevention" icon={<AirplanemodeInactiveIcon />} />
                        <BottomNavigationAction   label="Symptoms" icon={<AirlineSeatFlatIcon />} />
                        </BottomNavigation>


                        <div className={classes.textPlace}>
                            <div className={classes.text}>
                            
                               {dataRender[this.state.value]}
                            </div>
                        </div>
                </div>

            </Box>
        )
 
    }

}

export default withStyles(styles)(About)