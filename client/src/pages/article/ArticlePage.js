import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'

import Layout from '../../components/Layout/Layout';
import FullArticle from '../../components/article/FullArticle';

const ArticlePage = () => {    

        useEffect( ()=> {
            document.title = `Articles Page for React fullstack development and much more`;
        },[])    
        return (
            <Fragment>
                <Helmet>
                    <title> Articles Page | CraveJs </title>
                    <meta 
                        name="description" 
                        content= "Articles Page for React fullstack development and much more. There are articles about React, Redux, Express, ES6 javascript, mongoose and general modern web development." 
                    />
                </Helmet>
                <Layout>
                    <FullArticle />
                </Layout>
            </Fragment>
        );
    
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ArticlePage);