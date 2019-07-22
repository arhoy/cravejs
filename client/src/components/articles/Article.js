import React from 'react';


const Article = ({title,authorName,description,publishDate,slug,imgURL,readTime,imgDescription,history, contentType}) => {

    const goToArticle = () => {

        history.push(`/articles/${contentType}/${slug}`);
    
    }

    return (
        <div onClick = {goToArticle.bind(this,slug)} className = "Article" >
                <img className = "Article__image"  src={imgURL} alt= {imgDescription}/>
                <div>
                <h2> {title} </h2>
                </div>
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