import React from 'react'

import PropTypes from 'prop-types'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { connect } from 'react-redux';
import Todo from '../../components/todo/Todo';
import TodoNoAuth from '../../components/todo/TodoNoAuth';
import mainLinks from '../../utils/Links/mainLinks';

const ToDoPage = ({ auth: { user, isAuthenticated }, history: {location} }) => {
    const links = mainLinks(isAuthenticated, user);
    console.log(location);
        return (
            <div>
                <Header links = {links} />
                    { isAuthenticated ?
                        <Todo/> :
                        <TodoNoAuth/>
                    }
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
