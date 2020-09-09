import React, { useState } from 'react';
import { useEffect } from 'react';

export default () => {
    const [count, setCount] = useState(0);
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });
    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    };
    const addFn = () => {
        setCount(count + 1);
    }
    useEffect(() => {
        console.log(222);
        document.title = count;
    }, [count])
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])
    return (<div>
        <button onClick={addFn}>click({count})</button>
        <div>size{size.width} x {size.height}</div>
    </div>)
}
