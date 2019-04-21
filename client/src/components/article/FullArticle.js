import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import { getArticle } from '../../actions/articleActions'; 
import PropTypes from 'prop-types';
import FullArticleDetails from './FullArticleDetails';
import isEmpty from '../../validation/is-empty';

class FullArticle extends Component {

    componentDidMount() {
   
        const { id } = this.props.match.params;
        if(id){
            this.props.getArticle(id);
        }
    }
    
    render() {
        let articleContent;
        console.log(this.props);
        const { loading } = this.props;

        if( loading || isEmpty(this.props.articles.article)){
            articleContent = (
                <div>Loading</div>
            )
        }
        else {
            const { fields } = this.props.articles.article.msg;
            const image = fields.heroImage.fields;
            const author = fields.author.fields;
            const authorImage = author.image.fields.file.url;
            articleContent = (
                <FullArticleDetails
                    image = {image.file.url}
                    imageTitle = {image.title}
                    imageDescription = {image.description}
                    articleTitle = {fields.title}
                    articleDescription = {fields.description}
                    articleBody = {fields.body}
                    authorName = {author.name}
                    authorImage = {authorImage}
                    published = {fields.publishDate}
                    readTime = { Math.round(fields.body.length / 1000, 0)}
                />
         
            )
        }
        
        return (
           articleContent
        );
    }
}

const mapStateToProps = state => ({
    articles: state.articles
})

FullArticle.propTypes = {
    getArticle: PropTypes.func.isRequired,
  };

export default connect( mapStateToProps, { getArticle } ) (withRouter(FullArticle));