import React, { useState, useMemo, memo, useCallback } from 'react';
const Counter = memo((props) => {
    console.log('从新渲染');
    return (<div onClick={props.onClick}>{props.count}</div>)
});
export default () => {
    const [count, setCount] = useState(0);
    const double = useMemo(() => {
        return count * 2
    }, [count === 3]);
    const addFn = () => {
        setCount(count + 1);
    }
    // const half = useMemo(() => {
    //     console.log('half'); // useMemo可以监听useMemo
    // }, [double])
    const onClick = useCallback(() => {
        //setCount(count + 1)
        console.log(count);
    }, [count]) // 和usememo是等价的

    // const onClick = useCallback(() => {
    //     setCount((count) => count + 1)
    //     console.log('@@@',count);
    // }, []) // 和上是等价的????
    return (
        <div>
            <button onClick={addFn}>btn</button>
            <div>double{double}</div>
            <Counter count={double} onClick={onClick}></Counter>
        </div>
    )
}