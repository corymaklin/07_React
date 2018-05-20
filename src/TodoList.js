import React, { Component } from 'react';
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import * as apiCalls from './api';


class TodoList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }
    
    componentWillMount() {
        this.loadTodos();
    }
    
    async loadTodos() {
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }
    
    async addTodo(val) {
        let newTodo = await apiCalls.addTodo(val);
        this.setState({todos: [...this.state.todos, newTodo]});
    }
    
    async deleteTodo(id) {
        await apiCalls.deleteTodo(id);
        const todos = this.state.todos.filter( (value) => value._id !== id);
        this.setState({todos: todos});
    }
    
    async toggleTodo(todo) {
        let updatedTodo = await apiCalls.toggleTodo(todo);
        const todos = this.state.todos.map( (value) => value._id === updatedTodo._id ? {...value, completed: !value.completed} : value)
        this.setState({todos: todos})
    }
    
    render() {
        const todos = this.state.todos.map((value) => <TodoItem key={value._id} onDelete={this.deleteTodo.bind(this, value._id)} {...value} onToggle={this.toggleTodo.bind(this, value)} /> );
        
        return (
            <div>
                <h1>
                    TodoList!
                </h1>
                <TodoForm addTodo={this.addTodo}/>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList;