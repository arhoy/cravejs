import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'
import Articles from '../../components/articles/Articles';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import mainLinks from '../../utils/Links/mainLinks';

class ArticlesPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        const links = mainLinks(isAuthenticated, user);
               
        return (
            <Fragment>
                 <Helmet>
                    <title> Articles for fullstack developers - Cravejs </title>
                    <meta 
                        name="description" 
                        content=
                            "This is the add articles page for cravejs. Lots of articles related to web development, javascript, react, express, mongoose and much more." 
                    />
                </Helmet>
                <Layout links = {links}>
                    <Articles/>
                </Layout>
            </Fragment>
      
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ArticlesPage);