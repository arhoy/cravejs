import React from 'react';
import { connect } from 'react-redux'

const TodoHeader = ({ auth: {isAuthenticated, user} }) => {
    return (
        <div className = "TodoHeader">
            {
                isAuthenticated ? 
                <h1>Add Your ToDo</h1> : 
                <div>
                    <h1>Please Sign In</h1>
                    <p> You must be signed into view and create Todos</p>
                </div>
            }
            
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(TodoHeader);