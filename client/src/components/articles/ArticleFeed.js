import React from 'react';
import Article from './Article';
import calcReadTime from '../utils/calcReadTime';

const ArticleFeed = ({articles,history}) => {
   
    return (
        articles.map( article => {
            const { fields } = article;
            const { sys } = article;
            console.log(fields);
        
            if( sys.contentType.sys.id === 'blogPost' ) {
                const imgDescription = fields.heroImage.fields.description;
                const imgURL = fields.heroImage.fields.file.url;
                const readTime = calcReadTime(fields.bodyRichText.content);
                return (
                    <Article
                        key = {article.sys.id}
                        urlId = {article.sys.id}
                        title = {fields.title}
                        authorName = {fields.author.fields.name}
                        description = {fields.description}    
                        imgDescription = { imgDescription }
                        imgURL = { imgURL }
                        slug = {fields.slug}
                        history = {history}
                        readTime = {readTime}
                />
    
                )

            }
           
        }
    ));
};

export default ArticleFeed;