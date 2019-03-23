import React from 'react';
import Posts from '../../components/posts/Posts';
import PostForm from '../../components/posts/PostForm';
import PostHeader from '../../components/posts/PostHeader';
import Footer from '../../components/Layout/Footer';
const PostsPage = () => {
    return (
        <React.Fragment>
            <div className = "post-container">
                <PostHeader/>
                <PostForm
                     placeholder = 'Add a new post'
                />
                <Posts/>
            </div>
            <Footer/>
        </React.Fragment>
        
    );
};

export default PostsPage;