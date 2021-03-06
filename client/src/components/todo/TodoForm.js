import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { addTodo, editTodo } from '../../actions/todoActions';

const TodoForm = ({addTodo, editTodo, todo: { currentTodo }, inputRef }) => {
    useEffect( ()=> {
        if( currentTodo ) {
            setText( currentTodo.text );
        }
    },[currentTodo])

    const [ text, setText ] = useState('');


    const onChangeHandler = e => setText(e.target.value);

    const onSubmitHandler = e => {
        e.preventDefault();

            // if todo edit todo
        if( currentTodo ){
            console.log(currentTodo._id);
            editTodo(currentTodo._id, { text });
        } else {
            addTodo({ text });
        }
     
        setText('');
    }



    return (
        <div className = "TodoForm">
            <form
                onSubmit = { onSubmitHandler }
            >

                <div className = "TodoForm__group">
                    <input 
                        style = {{width: `${Math.max(text.length, 20)}rem` }}
                        type="text"
                        placeholder = ' Add new Todo ' 
                        onChange = { onChangeHandler }
                        name = "text"
                        value = { text }
                        required
                        ref = { inputRef }
                    />
                </div>
            </form>

        </div>
    )
}

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps, { addTodo, editTodo } )(TodoForm);
