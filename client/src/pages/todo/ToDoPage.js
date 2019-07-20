import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Todo from '../../components/todo/Todo';
import TodoNoAuth from '../../components/todo/TodoNoAuth';

import Layout from '../../components/Layout/Layout';

const ToDoPage = ({ auth: { user, isAuthenticated } }) => {
        return (
            <div className = "TodoContainer">
                <Layout>
                    { isAuthenticated ?
                        <Todo/> :
                        <TodoNoAuth/>
                    }
                </Layout>
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
