import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet'
import Articles from '../../components/articles/Articles';
import { connect } from 'react-redux';
import Layout from '../../components/Layout/Layout';

class ArticlesPage extends Component {    
    render() {
    
        const { isAuthenticated ,user } = this.props.auth;
        let links;
        if (!isAuthenticated) links = [
            {
                title: 'Login',
                linkTo: '/login' 
            },
            {
                title: 'Posts',
                linkTo: '/posts' 
            },
            {
                title: 'Products',
                linkTo: '/products' 
            },
        ];
        else {
            links =  [
                {
                    title: `${user.name}`,
                    linkTo: `/Articles` 
                },
                {
                    title: 'Articles',
                    linkTo: '/Articles' 
                },
                {
                    title: 'Posts',
                    linkTo: '/posts' 
                },
                {
                    title: 'Products',
                    linkTo: '/products' 
                },
                {
                    title: 'My Cart',
                    linkTo: '/cart' 
                },
                {
                    title: 'Logout',
                    linkTo: '/' 
                }
            ]
        }
               
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