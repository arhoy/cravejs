import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReplyItem from './ReplyItem';
import { getPost } from '../../../actions/postActions';

class Replies extends Component {        

    
    render() {
            
            const { replies, _id } = this.props.postItem;
        return (
            <React.Fragment>
             {
                 replies.map(reply => (
                        <ReplyItem 
                            key = {reply._id}
                            reply = {reply}
                            postId = {_id}
                        />
                ))
            }
            </React.Fragment>
               
        );
    }
}

Replies.propTypes = {
    getPost: PropTypes.func.isRequired,
   
  };
  
  const mapStateToProps = state => ({
    post: state.post
  });

export default connect(mapStateToProps, { getPost })(Replies);
