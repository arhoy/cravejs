import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet'
import Articles from '../../components/articles/Articles';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';


const ArticlesPage = () => {                      
        return (
            <Fragment>
                 <Helmet>
                    <title> Articles for React fullstack developers | CraveJs </title>
                    <meta 
                        name="description" 
                        content=
                            "React fullstack development articles and articles related to Mongoose, express, node and much more." 
                    />
                </Helmet>
                <Layout>
                    <Articles/>
                </Layout>
            </Fragment>
        );
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ArticlesPage);