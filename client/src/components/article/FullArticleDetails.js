import React from 'react';
import Moment from 'react-moment';
import * as Markdown from 'react-markdown'

const FullArticleDetails = ({image,imageTitle,imageDescription,articleTitle,articleDescription,authorName,authorImage,articleBody,published,readTime}) => {
    return (
        <div className = "FullArticle">
            <div className="FullArticle__image">
                <img src= { image } alt={ imageTitle } />
                <div className = "FullArticle__image-header" > { imageTitle } | { imageDescription } </div>
            </div>

            <div className = "FullArticle__title">
                <h2> {articleTitle} </h2>
                <h4> {articleDescription} </h4>
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

            <div className = "FullArticle__body">
                  <Markdown source =  { articleBody }/> 
            </div>
      </div>
    );
};

export default FullArticleDetails;