import React, { useState, useContext, createContext } from 'react';
const CountContext = createContext();
const Counter = () => {
    const count = useContext(CountContext);
    return (<div>{count}</div>)
}
export default () => {
    const [count, setCount] = useState(0);
    return (
        <CountContext.Provider value={count}>
            <Counter></Counter>
        </CountContext.Provider>
    )
}