import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getArticles } from '../../actions/articleActions';
import ArticleFeed from './ArticleFeed';

class Articles extends Component {

    state = {
        filteredArticles: [],
        keyword: '',
        articles: []
    }
  
   componentDidMount() {

      this.props.getArticles();
    console.log('article loading');

  }


 
  render() {
     const { articles, loading } = this.props;
     let articleContent;
 
    if (articles === null || loading) {
        articleContent = (<div> Loading </div>)
    }
    else {
        articleContent = (
            <ArticleFeed 
                articles = {articles.articles}
                history = {this.props.history}
            />
        )
    }

    return (
      <div className = "Articles">
              {articleContent}
      </div>

    );
  }
}

Articles.propTypes = {
  getArticles: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(mapStateToProps, { getArticles })(withRouter(Articles));
