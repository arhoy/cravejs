import React, { Fragment } from 'react'

import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from "react-beautiful-dnd"; 
import { connect } from 'react-redux';
import { getSortedTodos } from '../../actions/todoActions';
import TodoListItem from './TodoListItem';


const TodoList = ({todos, inputRef, todo: { currentTodo }, getSortedTodos}) => {

    //  const [items, setItems] = useState(todos);

    // useEffect( ()=> {
    //     setItems(todos);
    // },[])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex, 0 ,removed);

        return result
    }
    // BEAUTIFUL DND
    const onDragEnd = result => {
       const { destination, source, draggableId } = result;
       if(!destination) return;

       if( destination.droppableId === source.droppableId && destination.index === source.index ) return;

       const updatedTodos = reorder(
            todos,
            result.source.index,
            result.destination.index
       );
        console.log(updatedTodos);
        getSortedTodos(updatedTodos);
        
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
        <Droppable droppableId = 'droppable'>
        { provided => (
            <div
                {...provided.droppableProps}
                ref = {provided.innerRef}   
            >
            { todos && todos.map( (todo, index) => ( <TodoListItem key = {todo._id} todo = {todo} currentTodo = {currentTodo} inputRef = { inputRef } index = { index } /> )) }
            {provided.placeholder}
            </div>
        )}
        </Droppable>
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

export default connect(mapStateToProps, { getSortedTodos })(TodoList)
