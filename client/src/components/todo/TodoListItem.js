import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from "react-beautiful-dnd"; 
import { removeTodo, getTodo, changeTodoStatus } from '../../actions/todoActions';

const TodoListItem = ( {todo, currentTodo, inputRef, removeTodo, getTodo, changeTodoStatus, index}) => {

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

    return (
        <Draggable
            draggableId = { todo._id }
            index = { index }
        >
        {
            (provided, snapshot) => (
                <li 
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                    ref = { provided.innerRef }
                    key = {todo._id}
                    className = {
                        `TodoList TodoList__li 
                         ${classNameHandler(todo.status)[1]} 
                         ${snapshot.isDragging ? 'TodoList__dragging': ''}
                        `}
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
            )
        }
            
        </Draggable>
        
    );
};

export default connect(null,{ removeTodo, getTodo, changeTodoStatus })(TodoListItem);