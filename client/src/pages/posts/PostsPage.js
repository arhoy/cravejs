import React, { Fragment, useEffect } from 'react';
import Posts from '../../components/posts/Posts';
import PostForm from '../../components/posts/PostForm';
import PostHeader from '../../components/posts/PostHeader';
import Footer from '../../components/Layout/Footer';
const PostsPage = () => {
    useEffect( ()=> {
        document.title = 'Posts page for developers | CraveJs';
    },[] )
    return (
        <Fragment>
            <div className = "post-container">
                <PostHeader/>
                <PostForm
                     placeholder = 'Add a new post'
                />
                <Posts/>
            </div>
            <Footer/>
        </Fragment>
        
    );
};

export default PostsPage;