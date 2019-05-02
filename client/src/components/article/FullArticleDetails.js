import React from 'react';
import Moment from 'react-moment';
import FullArticleRichText from './FullArticleRichText';
import calcReadTime from '../utils/calcReadTime';
import _ from 'lodash';



const FullArticleDetails = ({image,imageTitle,imageDescription,articleTitle,articleDescription,authorName,authorImage,published,articleRichText,tags}) => {
 
    
    console.log(tags);
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
                     <Moment format = "MMM DD">{published}</Moment> | {calcReadTime(articleRichText.content)} min read
                </div>
            </div>

            <div className = "FullArticleRichText">
                <FullArticleRichText
                    nodeContent = {articleRichText}
                />
            </div>

            <div className = "FullArticle__tags">
                    {
                        tags.map( tag => (
                            <div className = "FullArticle__tag">
                                {tag}
                            </div>
                        ))
                    }
            </div>

        
      </div>
    );
};

export default FullArticleDetails;