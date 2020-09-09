import React, { useRef, useState, useEffect, PureComponent, useCallback } from 'react';

// class Foo extends PureComponent {
//     render() {
//         const { props } = this;
//         return (<div>
//             {props.count}
//         </div>)
//     }
// }
// const App = () => {
//     const [count, setCount] = useState(0);
//     const it = useRef();
//     useEffect(() => {
//         it = setInterval(() => {
//             setCount(count => count + 1);
//         }, 1000);
//     }, []);

//     useEffect(() => {
//         if (count >= 10) {
//             clearInterval(it.current);
//         }
//     });

//     return (<div>
//         <button onClick={() => { setCount(count + 1) }}>{count}</button>
//         <Foo count={count}></Foo>
//     </div>)
// }
function useFoo(count) {
    return (<div>
        {count}
    </div>)
}
function useCount(defaultCount) {
    const [count, setCount] = useState(0);
    const it = useRef();
    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current);
        }
    });
    return [count, setCount]
}
function useSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });
    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, []);
    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        return () => {
            window.removeEventListener('resize', onResize, false);
        }
    }, [])
    return size;
}
const App = () => {
    const [count, setCount] = useCount(0);
    const Counter = useFoo(count);
    const size = useSize();
    return (<div>
        <button onClick={() => {
            setCount(count + 1);
        }}>{count}  & {size.width} || {size.height}</button>
        {Counter}
        {/* <useFoo count={count}></useFoo> */}
    </div>)
}
export default App