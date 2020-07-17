import React from 'react'
import {Box} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import RootRef from '@material-ui/core/RootRef'
import {Animated} from "react-animated-css";

import axios from 'axios' 
import api from '../../API/API'
import News from '../Live/LiveNews/News'


const styles = { 
   
    fullHeight:{
        width:'100%',
        height:'100vh',
        overflow:'hidden',
    },
    refeshIcon:{
        position:'absolute' as 'absolute',
        right:'5%',
        bottom:'5%',
        color:'#fff',
        fontSize:'48px',
        "&:hover":{
            cursor: 'pointer',
        },
        transition:'transform 1s'
    },
    root:{
        position:'relative' as 'relative',
        width:'70%',
        height:'85%',
        margin:'5% auto',
        overflowY:'scroll' as 'scroll',
        scrollBehavior:'smooth' as 'smooth'
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
}
 
interface Props extends WithStyles<typeof styles> {
    children?: React.ReactNode;
    className?: string;
}

interface INews{
    title:string
    url:string
    imageUrl:string
    from:string
    published:string
    description:string
}

interface IState{
    news:Array<INews>
}

class NewsRoute extends React.Component<Props>{

    state:IState={
        news:[]
    }
    newsElement:React.RefObject<HTMLElement> = React.createRef()
    refeshElement:React.RefObject<HTMLElement> = React.createRef()
    rotate = 120

    getRotateValue = ()=>{
        if(this.rotate == 360){
            this.rotate = 0;
        }
        else{
            this.rotate = 360;
        }
        return this.rotate;
    }

    fetchData = ()=>{
        console.log(this.refeshElement.current)
        this.refeshElement.current.style.transform = `rotate(${this.getRotateValue()}deg)`
        axios.get(api.GET_NEWS)
        .then(res=>{
            let news:Array<INews> = []
            for(let i = 0; i < res.data.articles.length;i++){
                const article = res.data.articles[i]
                
                const addArticle:INews ={
                    title:article.title,
                    url:article.url,
                    imageUrl:article.urlToImage,
                    from:article.source.name,
                    published:article.publishedAt,
                    description:article.description,
                }

                news.push(addArticle)
            }

            for(let i = 0; i < news.length;i++){
                const rand = Math.floor(Math.random() * news.length);

                const temp = news[rand]
                news[rand] = news[i]
                news[i] = temp
            }

            this.setState({news:news})

            this.newsElement.current.scroll(123,0);
        })
    }

 

    componentDidMount(){

        this.fetchData()
        
    }

    render = ()=>{
        const classes = this.props.classes

        let newsRender = [...this.state.news].map((item,index)=>{
            return (<News key={'new '+index} 
                        title={item.title} url={item.url} 
                        published={item.published} 
                        imageUrl={item.imageUrl}
                        description = {item.description}
                        from={item.from}></News>
                    )
        })

        return(
            <Box className={classes.fullHeight}>
                            <div onClick={this.fetchData}>
                                <RootRef rootRef={this.refeshElement}>
                                    <CachedIcon className={classes.refeshIcon}></CachedIcon>
                                </RootRef>
                            </div>

                    <RootRef rootRef={this.newsElement}>
                        <div className={classes.root}>
                            {newsRender} 
                        </div>
                    </RootRef> 
            </Box>
        )

    }

}

export default withStyles(styles)(NewsRoute)