import React from 'react';
import PostItem from './PostItem';

const PostFeed = ({posts,showActions,backgroundColor}) => (

        posts.map(post => {
                return (
                    <PostItem key = {post._id} backgroundColor = {backgroundColor} post = {post} showActions = {showActions} />
                )
            }
        )
)



export default PostFeed;