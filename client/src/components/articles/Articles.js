import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getArticles } from '../../actions/articleActions';
import ArticleFeed from './ArticleFeed';
import isEmpty from '../../validation/is-empty';

class Articles extends Component {
  state = {
    filteredArticles: [],
    keyword: '',
    articles: []
  };

  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const { articles, loading } = this.props;
    console.log('loading?',loading);
    console.log(articles.artciles);
    let articleContent;
    if ( loading ) {
      console.log('loading');
      articleContent = <div> Loading </div>;
    } else {
      if (isEmpty(articles.articles)) {
        return <div>There is no articles</div>
      } else {
        articleContent = (
          <ArticleFeed
            articles={articles.articles}
            history={this.props.history}
          />
        );
      }
    }

    return <div className="Articles">{articleContent}</div>;
  }
}

Articles.propTypes = {
  getArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getArticles }
)(withRouter(Articles));
