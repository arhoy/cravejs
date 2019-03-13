import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = ({posts,showActions}) => (

        posts.map(post => {
                return (
                    <PostItem key = {post._id} post = {post} showActions = {showActions} />
                )
            }
        )
)



export default PostFeed;