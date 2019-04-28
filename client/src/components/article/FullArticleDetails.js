import React from 'react';
import Moment from 'react-moment';
import FullArticleRichText from './FullArticleRichText';


const FullArticleDetails = ({image,imageTitle,imageDescription,articleTitle,articleDescription,authorName,authorImage,published,readTime,articleRichText}) => {
    const contentArr = articleRichText.content;
   
    return (
        <div className = "FullArticle">
            <div className="FullArticle__image">
                <img src= { image } alt={ imageTitle } />
                <div className = "FullArticle__image-header" > { imageTitle } | { imageDescription } </div>
            </div>

            <div className = "FullArticle__title">
                <h1> {articleTitle} </h1>
                <h2> {articleDescription} </h2>
            </div>

            <div className = "FullArticle__author">
                <div className = "FullArticle__author-1">
                     { authorName } 
                </div>
                <div className = "FullArticle__author-2">
                    <img src= { authorImage } alt={ authorName }/>
                 </div>
                <div className = "FullArticle__author-3">
                     <Moment format = "MMM DD">{published}</Moment> | {readTime} min read
                </div>
            </div>

            <div className = "FullArticleRichText">
                <FullArticleRichText
                    nodeContent = {articleRichText}
                />
            </div>

        
      </div>
    );
};

export default FullArticleDetails;