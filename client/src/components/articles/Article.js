import React from 'react';


const Article = ({urlId,title,authorName,body,description,publishDate,slug,imgURL,imgDescription,readTime,history}) => {

    const goToArticle = () => {
        history.push(`/articles/${urlId}`);
    
    }
    return (
        <div onClick = {goToArticle.bind(this,slug)} className = "Article" >
                <img className = "Article__image"  src={imgURL} alt= {imgDescription}/>
                <h2> {title} </h2>
                <h4> {description} </h4>
                <div className = "Article__author">
                    <span className = "Article__author-1"> { authorName } </span>
                    <span className = "Article__author-2" > { publishDate } </span>
                    <span className = "Article__author-3"> {readTime} min read</span>
                </div>
        </div>
    );
};

export default Article;