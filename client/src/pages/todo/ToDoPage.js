import React from 'react'

import PropTypes from 'prop-types'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { connect } from 'react-redux';
import Todo from '../../components/todo/Todo';

const ToDoPage = ({ auth: { user, isAuthenticated } }) => {
    console.log(isAuthenticated)
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
                linkTo: `/dashboard` 
            },
            {
                title: 'Dashboard',
                linkTo: '/dashboard' 
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
        <div style = {{minHeight: '100vh',display:'flex',flexDirection:'column',justifyContent:'space-between', background:'white'}} >
        <Header links = {links} />
             <Todo />
        <Footer/>
    
        </div>
    )
}

ToDoPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ToDoPage)
