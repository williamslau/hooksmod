import React, { useEffect, useState, useMemo, memo, useRef, useCallback } from 'react';
import {
    createSet,
    createAdd,
    createRemove,
    createToggle
} from './store/actions';
let idSeq = Date.now();
function bindActionCreators(actionCreators, dispatch) {
    const ret = {};
    for (let key in actionCreators) {
        ret[key] = function (...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        }
    }
    return ret;
}
const Control = memo((props) => {
    // const { addTodo } = props;
    // const { dispatch } = props;
    const { addTodo } = props;
    const inputRef = useRef();
    const onSubmit = (e) => {
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) {
            return;
        }
        // addTodo({
        //     id: ++idSeq,
        //     text: newText,
        //     comlete: false,
        // });
        // dispatch({
        //     type: 'add',
        //     payload: {
        //         id: ++idSeq,
        //         text: newText,
        //         comlete: false,
        //     }
        // })
        // dispatch(createAdd({
        //     id: ++idSeq,
        //     text: newText,
        //     comlete: false,
        // }))
        addTodo({
            id: ++idSeq,
            text: newText,
            comlete: false,
        })
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
    //const { Todos, toggleTodo, removeTodo } = props;
    //const { Todos, dispatch } = props;
    const { Todos, removeTodo, toggleTodo } = props;
    return <ul>{
        Todos.map(todo => {
            // return <TodoItem
            //     key={todo.id}
            //     todo={todo}
            //     dispatch={dispatch}
            // ></TodoItem>
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
        // dispatch
        removeTodo,
        toggleTodo
    } = props;
    const onChange = useCallback(() => {
        //toggleTodo(id);
        //dispatch({ type: 'toggle', payload: id });
        //dispatch(createToggle(id));
        toggleTodo(id);
    }, []);
    const onRemove = useCallback(() => {
        //removeTodo(id);
        //dispatch({ type: 'remove', payload: id });
        // dispatch(createRemove(id));
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
    // const addTodo = useCallback((todo) => {
    //     setTodos(todos => [...todos, todo]);
    // }, []);

    // const removeTodo = useCallback((id) => {
    //     setTodos(todos => todos.filter(todo => {
    //         return todo.id !== id;
    //     }));
    // }, []);
    // const toggleTodo = useCallback((id) => {
    //     setTodos(todos => todos.map(todo => {
    //         return todo.id === id
    //             ? {
    //                 ...todo,
    //                 comlete: !todo.comlete
    //             } : todo;
    //     }));
    // }, []);
    const dispatch = useCallback((action) => {
        const { type, payload } = action;
        switch (type) {
            case 'set':
                setTodos(payload);
                break;
            case 'add':
                setTodos(todos => [...todos, payload]);
                break;
            case 'remove':
                setTodos(todos => todos.filter(todo => {
                    return todo.id !== payload;
                }));
                break;
            case 'toggle':
                setTodos(todos => todos.map(todo => {
                    return todo.id === payload
                        ? {
                            ...todo,
                            comlete: !todo.comlete
                        } : todo;
                }));
                break;
            default:
        }
    }, []);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
        //setTodos(todos);
        //dispatch({ type: 'set', payload: todos });
        dispatch(createSet(todos));
        
        
    }, [])
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(Todos));
    }, [Todos])
    return (<div>
        {/* <Control dispatch={dispatch}></Control>
            <Todo Todos={Todos} dispatch={dispatch}></Todo> */}
        <Control
            {
            ...bindActionCreators({ addTodo: createAdd }, dispatch)
            }
        ></Control>
        {/* <Todo Todos={Todos} dispatch={dispatch}></Todo> */}
        <Todo
            Todos={Todos}
            {
            ...bindActionCreators({
                removeTodo: createRemove,
                toggleTodo: createToggle
            }, dispatch)
            }
        ></Todo>
    </div>)
};

export default TodoList;
