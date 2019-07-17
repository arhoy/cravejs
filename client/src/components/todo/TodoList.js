import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; 
import { connect } from 'react-redux';
import { removeTodo, getTodo, changeTodoStatus } from '../../actions/todoActions';


const TodoList = ({todos, removeTodo, changeTodoStatus, getTodo, inputRef, todo: { currentTodo }}) => {


    const statusChangeHandler = todo => {
        changeTodoStatus(todo._id, { status: todo.status }); // must send status as object to express.
    }

    const removeTodoHandler = id => {
        removeTodo(id);
    }

    const editTodoHandler = todo => {
        inputRef.current.focus();
        getTodo(todo);
    }

    const classNameHandler = status => {
        switch( status ) {
            case 'not completed':
                return ['Todo!','TodoList__red','TodoList__uncompleted'];
            case 'completed':
                return ['Completed','TodoList__green','TodoList__completed'];
            case 'in progress':
                return ['In Progress','TodoList__blue','TodoList__inprogress'];
            default:
                return ['Todo!','TodoList__red','TodoList__uncompleted'];
        }
    }

    return (
    <Fragment>
    <div className = "TodoList">
        {
            todos && todos.length > 0 ?
                <h2> ToDos completed: 
                    <div className = "">
                        { todos.filter(todo => todo.completed === true).length } of { todos.length }  
                    </div>   
                </h2> :
                <Fragment>
                    <h2> No Todo yet!</h2>
                    <p>Add a todo and <strong>double click</strong> to change the status</p> 
                </Fragment>
              
        }
    </div>
 
    <div className = "TodoList">
    <ul className = "TodoList TodoList__ul">
            {
                todos && todos.map( todo => (
            
                    <li 
                        key = {todo._id}
                        className = {`TodoList TodoList__li ${classNameHandler(todo.status)[1]} `}
                        onDoubleClick = { statusChangeHandler.bind(this,todo) }
                    > 

                       {
                           currentTodo && currentTodo._id === todo._id ? 
                        <div> ( Editing... ) </div> : null
                       }

        
                        <div 
                            className = {`TodoList__text ${currentTodo && currentTodo._id === todo._id ? 'TodoList__text-editing' : ''} `}
                        > 
                            { todo.text } 
                        </div>
         
                        <div className = {classNameHandler(todo.status)[2]}>{ classNameHandler(todo.status)[0] }</div>  
       
                         <div className="TodoList__tasks">
                                <button 
                                    className = "TodoList__remove"
                                    onClick = { removeTodoHandler.bind(this,todo._id) }
                                >
                                    <img className = "TodoList__img" src="https://icon.now.sh/close" alt="delete icon"/>
                                </button>

                                <button
                                    className = "TodoList__edit"
                                    onClick = { editTodoHandler.bind(this,todo) }
                                >
                                    <img className = "TodoList__img" src="https://icon.now.sh/edit" alt="Edit Icon"/>
                                </button>
                         </div>
                    </li>
                ))
            }
        </ul>
    </div>
   
    </Fragment>
       
    )
}

TodoList.propTypes = {
    getTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps, { removeTodo, getTodo, changeTodoStatus })(TodoList)
