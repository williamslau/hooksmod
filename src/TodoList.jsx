import React, { useEffect, useState, useMemo, memo, useRef, useCallback } from 'react';
let idSeq = Date.now();
const Control = memo((props) => {
    const { addTodo } = props;
    const inputRef = useRef();
    const onSubmit = (e) => {
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) {
            return;
        }
        addTodo({
            id: ++idSeq,
            text: newText,
            comlete: false,
        });
        inputRef.current.value = '';
        e.preventDefault();
    }
    return <div>
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
            <input ref={inputRef} type="text" />
        </form>
    </div>
});
const Todo = memo((props) => {
    const { Todos, toggleTodo, removeTodo } = props;
    return <ul>{
        Todos.map(todo => {
            return <TodoItem
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            ></TodoItem>
        })
    }</ul>
});
const TodoItem = memo((props) => {
    const {
        todo: {
            id,
            text,
            comlete
        },
        toggleTodo,
        removeTodo
    } = props;
    const onChange = useCallback(() => {
        toggleTodo(id);
    }, []);
    const onRemove = useCallback(() => {
        removeTodo(id);
    }, []);
    return <li>
        <input
            type="checkbox"
            onChange={onChange}
            checked={comlete}
        />
        <label>{text} || {JSON.stringify(comlete)}</label>
        <button onClick={onRemove}>&#xd7;</button>
    </li>
});

const LS_KEY = '_$-todos_';
function TodoList() {
    const [Todos, setTodos] = useState([]);
    const addTodo = useCallback((todo) => {
        setTodos(todos => [...todos, todo]);
    }, []);

    const removeTodo = useCallback((id) => {
        setTodos(todos => todos.filter(todo => {
            return todo.id !== id;
        }));
    }, []);
    const toggleTodo = useCallback((id) => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id
                ? {
                    ...todo,
                    comlete: !todo.comlete
                } : todo;
        }));
    }, []);
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
        setTodos(todos);
    }, [])
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(Todos));
    }, [Todos])
    return (<div>
        <Control addTodo={addTodo}></Control>
        <Todo
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            Todos={Todos}
        ></Todo>
    </div>)
}

export default TodoList;
