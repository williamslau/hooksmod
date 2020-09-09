import React, { useEffect, useState, useMemo, useRef, useCallback, memo } from 'react';
import {
    createSet,
    createAdd,
    createRemove,
    createToggle,
} from './store/actions';
import reducer from './store/reducers';

let idSeq = Date.now();
const bindActionCreators = (actionCreators, dispatch) => {
    const ret = {};

    for (let key in actionCreators) {
        ret[key] = function (...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        };
    }

    return ret;
}

const Control = memo((props) => {
    const { addTodo } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const newText = inputRef.current.value.trim();

        if (newText.length === 0) {
            return;
        }

        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false,
        });

        inputRef.current.value = '';
    };

    return (
        <div className="control">
            <h1>
                todos
            </h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    ref={inputRef}
                    className="new-todo"
                    placeholder="What needs to be done?"
                />
            </form>
        </div>
    );
});

const TodoItem = memo((props) => {
    const {
        todo: {
            id,
            text,
            complete,
        },
        removeTodo,
        toggleTodo
    } = props;

    const onChange = () => {
        toggleTodo(id);
    };

    const onRemove = () => {
        removeTodo(id);
    };

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={onChange}
                checked={complete}
            />
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    );
});

const Todos = memo((props) => {
    const { todos, removeTodo, toggleTodo } = props;
    return (
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                    />);
                })
            }
        </ul>
    );
});

const LS_KEY = '_$-todos_';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [incrementCount, setIncrementCount] = useState(0);
    // const reducers = {
    //     todos(state, action) {
    //         const { type, payload } = action;
    //         switch (type) {
    //             case 'set':
    //                 return payload;
    //             case 'add':
    //                 return [...state, payload];
    //             case 'remove':
    //                 return state.filter(todo => {
    //                     return todo.id !== payload;
    //                 });
    //             case 'toggle':
    //                 return state.map(todo => {
    //                     return todo.id === payload
    //                         ? {
    //                             ...todo,
    //                             complete: !todo.complete,
    //                         }
    //                         : todo;
    //                 });
    //             default:
    //                 return state;
    //         }
    //     },
    //     incrementCount(state, action) {
    //         const { type } = action;
    //         switch (type) {
    //             case 'set':
    //             case 'add':
    //                 return state + 1;

    //             default:
    //                 return state;
    //         }
    //     },
    // }
    // const reducer = combineReducers(reducers);
    // function reducer(state, action) {
    //     const { type, payload } = action;
    //     const { todos, incrementCount } = state;

    //     switch (type) {
    //         case 'set':
    //             return {
    //                 ...state,
    //                 todos: payload,
    //                 incrementCount: incrementCount + 1,
    //             };
    //         case 'add':
    //             return {
    //                 ...state,
    //                 todos: [...todos, payload],
    //                 incrementCount: incrementCount + 1,
    //             };
    //         case 'remove':
    //             return {
    //                 ...state,
    //                 todos: todos.filter(todo => {
    //                     return todo.id !== payload;
    //                 }),
    //             };
    //         case 'toggle':
    //             return {
    //                 ...state,
    //                 todos: todos.map(todo => {
    //                     return todo.id === payload
    //                         ? {
    //                             ...todo,
    //                             complete: !todo.complete,
    //                         }
    //                         : todo;
    //                 }),
    //             };
    //         default:
    //             return state
    //     }

    //     //return state;
    // }

    const dispatch = useCallback((action) => {
        const state = {
            todos,
            incrementCount,
        };

        const setters = {
            todos: setTodos,
            incrementCount: setIncrementCount,
        };

        const newState = reducer(state, action);

        for (let key in newState) {
            setters[key](newState[key]);
        }

    }, [todos, incrementCount]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
        dispatch(createSet(todos));
    }, []);


    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="todo-list">
            <Control
                {
                ...bindActionCreators({
                    addTodo: createAdd
                }, dispatch)
                }
            />
            <Todos
                {
                ...bindActionCreators({
                    removeTodo: createRemove,
                    toggleTodo: createToggle,
                }, dispatch)
                }
                todos={todos} />
        </div>
    );
}

export default TodoList;