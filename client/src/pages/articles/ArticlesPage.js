import React, { Component } from 'react';
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
            <Layout links = {links}>
                    <Articles/>
            </Layout>
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ArticlesPage);