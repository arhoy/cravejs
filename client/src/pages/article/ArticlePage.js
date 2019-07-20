import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'

import Layout from '../../components/Layout/Layout';
import FullArticle from '../../components/article/FullArticle';
import mainLinks from '../../utils/links/mainLinks';


class ArticlePage extends Component {    
    
    render() {
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
    
        return (
            <Fragment>
                <Helmet>
                    <title> Articles Page | Cravejs </title>
                    <meta 
                        name="description" 
                        content= "Each article on CraveJs where the cms in contentful" 
                    />
                </Helmet>
                <Layout links = {links}>
                    <FullArticle />
                </Layout>
            </Fragment>

        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ArticlePage);