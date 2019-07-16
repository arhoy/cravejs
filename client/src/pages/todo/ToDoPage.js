import React from 'react'

import PropTypes from 'prop-types'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { connect } from 'react-redux';
import Todo from '../../components/todo/Todo';
import mainLinks from '../../utils/Links/mainLinks';

const ToDoPage = ({ auth: { user, isAuthenticated } }) => {
    const links = mainLinks(isAuthenticated, user);

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