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
                            <h1>Please Sign In</h1>
                            <p> You must be signed into view and create Todos</p>
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