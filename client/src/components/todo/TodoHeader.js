import React from 'react';
import { connect } from 'react-redux'

const TodoHeader = ({ auth: {isAuthenticated, user}, modal }) => {
    return (
        <div className = "TodoHeader">
            {
                isAuthenticated ? 
                <h1>Add Your ToDo</h1> : 
                <div>
                    {
                        !modal ? 
                        <div>
                            <h2>Sign in to view and create Todos</h2>
                            <button className = "btn btn-2 btn--blue" >Sign In</button>
                        </div> : null
                    }
                </div>
              
               
            }
            
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(TodoHeader);