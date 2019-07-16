import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getArticle } from '../../actions/articleActions';
import PropTypes from 'prop-types';
import FullArticleDetails from './FullArticleDetails';
import isEmpty from '../../validation/is-empty';

const FullArticle = ({ articles: {article}, match, getArticle, loading }) => {
    useEffect( ()=> {
        const { id } = match.params;
        if(id) {
          getArticle(id);
        }
    },[])
 
    let articleContent;

    if (loading || isEmpty(article)) {
      articleContent = <div>Loading</div>;
    } else {
      const { fields } = article.msg;
      const image = fields.heroImage.fields;
      const author = fields.author.fields;
      const authorImage = author.image.fields.file.url;

      // update the title of the document
      document.title = fields.title;
      
      articleContent = (
        <Fragment>
           <Helmet>
              <title> { fields.title } | CraveJs Article </title>
              <meta 
                  name="description" 
                  content = { fields.description } 
              />
              <meta name="keywords" content = { fields.tags }></meta>
              <meta name="author" content = { author.name } ></meta>

            </Helmet>
            <FullArticleDetails
            key = {`${fields.title} - ${author.name}` }
            image={image.file.url}
            imageTitle={image.title}
            imageDescription={image.description}
            articleTitle={fields.title}
            articleDescription={fields.description}
            articleBody={fields.body}
            articleRichText={fields.bodyRichText}
            authorName={author.name}
            authorImage={authorImage}
            published={fields.publishDate}
            tags={fields.tags}
           />
        </Fragment>
     
      );
    }

    return articleContent;
  }


const mapStateToProps = state => ({
  articles: state.articles
});

FullArticle.propTypes = {
  getArticle: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getArticle }
)(withRouter(FullArticle));
