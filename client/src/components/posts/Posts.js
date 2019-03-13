import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
 
  componentDidMount() {

      this.props.getPosts();

  }
 
  render() {
  
     const { posts, loading } = this.props.post;
     let postContent;
 
    if (posts === null || loading) {
        postContent = (<div> Loading </div>)
    }
    else {
        postContent = <PostFeed posts = {posts} showActions = {true}/>
    }

    return (
      <div className="posts">
              {postContent}
      </div>

    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
