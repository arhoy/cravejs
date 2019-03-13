import React from 'react';
import Posts from '../../components/posts/Posts';
import PostForm from '../../components/posts/PostForm';
import PostHeader from '../../components/posts/PostHeader';
const PostsPage = () => {
    return (
        <div className = "post-container">
            <PostHeader/>
            <PostForm/>
            <Posts/>
            
        </div>
    );
};

export default PostsPage;