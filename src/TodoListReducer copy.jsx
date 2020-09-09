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
    const { Todos, removeTodo, toggleTodo } = props;
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
        removeTodo,
        toggleTodo
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
    const [IncrementCount, setIncrementCount] = useState(0);
    function reducer(state, action) {
        const { type, payload } = action;
        const { Todos, IncrementCount } = state;
        switch (type) {
            case 'set':
                return {
                    ...state,
                    Todos: payload,
                }
            case 'add':
                return {
                    ...state,
                    Todos: [...Todos, payload],
                }
            case 'remove':
                return {
                    ...state,
                    Todos: Todos.filter(todo => {
                        return todo.id !== payload;
                    }),
                }
            case 'toggle':
                return {
                    ...state,
                    Todos: Todos.map(todo => {
                        return todo.id === payload
                            ? {
                                ...todo,
                                comlete: !todo.comlete
                            } : todo;
                    })
                }
            default:
                return state;
        }
    }
    const dispatch = useCallback((action) => {
        const state = {
            Todos,
            IncrementCount,
        }
        const setters = {
            Todos: setTodos,
            IncrementCount: setIncrementCount,
        }
        const newState = reducer(state, action);
        for (let key in newState) {
            setters[key](newState[key]);
        }
    }, [Todos, IncrementCount]);

    // const dispatch = useCallback((action) => {
    //     const { type, payload } = action;
    //     switch (type) {
    //         case 'set':
    //             setTodos(payload);
    //             setIncrementCount(count => count + 1);
    //             break;
    //         case 'add':
    //             setTodos(todos => [...todos, payload]);
    //             setIncrementCount(count => count + 1);
    //             break;
    //         case 'remove':
    //             setTodos(todos => todos.filter(todo => {
    //                 return todo.id !== payload;
    //             }));
    //             break;
    //         case 'toggle':
    //             setTodos(todos => todos.map(todo => {
    //                 return todo.id === payload
    //                     ? {
    //                         ...todo,
    //                         comlete: !todo.comlete
    //                     } : todo;
    //             }));
    //             break;
    //         default:
    //     }
    // }, []);
    useEffect(() => {
        const Todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
        dispatch(createSet(Todos));
    }, [])
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(Todos));
    }, [Todos])
    return (<div>
        <Control
            {
            ...bindActionCreators({ addTodo: createAdd }, dispatch)
            }
        ></Control>
        <Todo
            {
            ...bindActionCreators({
                removeTodo: createRemove,
                toggleTodo: createToggle
            }, dispatch)
            }

            Todos={Todos}
        ></Todo>
    </div>)
};

export default TodoList;
