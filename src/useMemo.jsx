import React, { useState, useMemo, memo } from 'react';
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
    const half = useMemo(() => {
        console.log('half'); // useMemo可以监听useMemo
    }, [double])
    const onClick = useMemo(()=>{
        return () => {
            console.log(111);
        };
    },[]) // 普通函数传入后，每次执行都会从新渲染子组件，用useMemo不会生成新的句柄，所以不会从新渲染
    return (
        <div>
            <button onClick={addFn}>btn</button>
            <div>double{double}</div>
            <Counter count={double} onClick={onClick}></Counter>
        </div>
    )
}