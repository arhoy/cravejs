// highest level Todo file

import React, { Fragment ,useState } from 'react';

import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Login from '../../components/auth/Login';




const TodoNoAuth = () => {
    const [ modal, setModal ] = useState(false)
    const sampleTodos = [
        {_id: 1, text: 'Walk the dog', status: 'completed', completed: true},
        {_id: 2, text: 'Clean car', status: 'in progress', completed: false},
        {_id: 3, text: 'Pickup the cake', status: 'not completed', completed: false}
    ];


    const signUpHandler = () => {
        setModal(!modal);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }
 
    return  (
        <div className = "Todo">
              { modal ? <Login/> : null}
            <div className = {`Todo__signin ${modal ? 'Todo__signin-grey': ''}`} onClick = { signUpHandler } >
                <TodoHeader modal = {modal} />
                <TodoForm />
                <TodoList todos = {sampleTodos} />
            </div>        
        </div>
 
    );
};


export default TodoNoAuth;