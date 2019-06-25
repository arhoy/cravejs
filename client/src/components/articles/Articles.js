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

  componentDidUpdate(prevProps) {
    if(prevProps.articles !== this.props.articles){
      const selectArticles = this.props.articles.articles.filter(article => article.fields.description != null)
        this.setState({ articles: selectArticles })
    
    }
}

   inputChangeHandler = (e) => {
    const keyword = e.target.value;


    const filteredArticles = this.state.articles.filter(article => (
        article.fields.title.toLowerCase().includes(keyword.toLowerCase().trim()) ||  
        article.fields.description.toLowerCase().includes(keyword.toLowerCase().trim()) ||
        article.fields.tags.join().toLowerCase().includes(keyword.toLowerCase().trim())
      
  
    ))
    this.setState({filteredArticles,keyword});
  
}

  render() {
    const { articles, loading } = this.props;
    let articleContent;
    if ( loading || isEmpty(articles.articles)) articleContent = <div> Loading </div>;
      else {
        const articlesToLoop = this.state.keyword === '' ? this.state.articles : this.state.filteredArticles;

        if (this.state.keyword !== '' && this.state.filteredArticles.length === 0) articleContent = <div>No Articles Found</div>
        
        else {
          articleContent = (
            <ArticleFeed
              articles={ articlesToLoop }
              history={this.props.history}
            />
          );
        }
      }
    
    return (
      <div style = {{gridColumn:'1/-1'}}>
        <div className="Articles__inputHolder">
           <input onChange = { this.inputChangeHandler } className = "Articles__input" type="text" placeholder = "Search Articles"/>
        </div>
        <div className="Articles">
          {articleContent}
        </div>
     </div>
    );
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
