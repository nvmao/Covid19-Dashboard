import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import News from './News'
import api from '../../../API/API'
import axios from 'axios'
 

const styles = {
    root:{
        borderTop:'1px solid #999999',
    },
  
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

interface INews{
    title:string
    url:string
    from:string
    published:string
    description:string
}

interface IState{
    news:Array<INews>,
    currentNews:number
}

class LiveNews extends React.Component<Props>{

    state:IState={
        news:[],
        currentNews:0
    }
    
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        axios.get(api.GET_NEWS)
        .then(data=>{
            let news:Array<INews> = []
            for(let i = 0; i < data.data.articles.length;i++){
                const article = data.data.articles[i]
                
                const addArticle:INews ={
                    title:article.title,
                    url:article.url,
                    from:article.source.name,
                    published:article.publishedAt,
                    description:article.description,
                }

                news.push(addArticle)
            }

            // news = news.filter(el=>{
            //     return  (el.title  && (el.title.match("coronavirus") || el.title.match("covid"))) || 
            //             (el.description && (el.description.match("coronavirus") || el.description.match("covid")) )
            // })

            this.setState({news:news})
        })


        this.switchNews()

    }

    switchNews = ()=>{
        setInterval(() => {
            let currentNews = this.state.currentNews + 1
            if(this.state.currentNews === this.state.news.length-1){
                currentNews = 0
            }

            this.setState({currentNews:currentNews})
        }, 5000);
    }

    render = ()=>{
        const classes = this.props.classes

        let newsRender = [...this.state.news].map((item,index)=>{
            return (<News key={'new '+index} 
                        title={item.title} url={item.url} 
                        published={item.published} 
                        description = {item.description}
                        from={item.from}></News>
                    )
        })

        return(
            <Box width="100%" height="20%" className={classes.root}>
               {newsRender[this.state.currentNews]}
            </Box>
        )

    }

}

export default withStyles(styles)(LiveNews)