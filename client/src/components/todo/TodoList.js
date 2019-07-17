import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; 
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';


const TodoList = ({todos, inputRef, todo: { currentTodo }}) => {

    const [data, setdata] = useState(todos);

    console.log(data);


    // BEAUTIFUL DND
    const onDragEnd = result => {

    }

    return (
    <DragDropContext onDragEnd = {onDragEnd}>
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
                 <TodoListItem
                    key = {todo._id}
                    todo = {todo}
                    currentTodo = {currentTodo}
                    inputRef = { inputRef }
                 />
                ))
            }
        </ul>
    </div>
   
    </DragDropContext>
       
    )
}

TodoList.propTypes = {
    todo: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    todo: state.todo
})

export default connect(mapStateToProps)(TodoList)
