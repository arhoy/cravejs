import React from 'react';
import Article from './Article';

const ArticleFeed = ({articles,history}) => {
    console.log(articles);
    return (
        articles.map( article => {
            const { fields } = article;
            const { sys } = article;
       
     

            if( sys.contentType.sys.id === 'blogPost' ) {
                const imgDescription = fields.heroImage.fields.description;
                const imgURL = fields.heroImage.fields.file.url;
                return (
                    <Article
                        key = {article.sys.id}
                        urlId = {article.sys.id}
                        title = {fields.title}
                        authorName = {fields.author.fields.name}
                        description = {fields.description}    
                        readTime = { Math.round(fields.body.length / 1000, 0)}
                        imgDescription = { imgDescription }
                        imgURL = { imgURL }
                        slug = {fields.slug}
                        history = {history}
                />
    
                )

            }
           
        }
    ));
};

export default ArticleFeed;