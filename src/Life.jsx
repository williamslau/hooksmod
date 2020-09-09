import React, { Component, createContext, useEffect } from 'react';
// 对传统React的影响
class CounterClass extends Component {
    // 在类组件中
    state = {
        overflow: false,
    };
    static getDerivedStateFromProps(props, state) {
        if (props.count > 10) {
            return {
                overflow: true
            }
        }
    }
}

function Counter(props) {
    const [overflow, setOverflow] = useState(false);

    if (props.count > 10) {
        // 直接setState不会有性能问题
        // 官方文档上说在react操作dom之前完成的。
        setOverflow(true);
    }

}
// 生命周期函数如何映射到Hooks中
function App() {
    useEffect(() => {
        //componentDidMount
        return () => {
            // componentWillUnmount
        }
    }, []);
    let renderCounter = iseRef(0);
    renderCounter.current++;

    useEffect(() => {
        if (renderCounter > 1) {
            // componentDidUpdate
        }
    })
}
// 类组件成员变量如何映射到Hooks?
class Static_ {
    // 静态
    it = 0;
}
function Static_ {
    const it = useRef(0);
}
// Hooks中如何获取历史props和state?
function Counter() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();// ref不受从新渲染的影响，因此可以在一次渲染周期中取出上一次的内容

    useEffect(() => {
        prevCountRef.current = count;
    });
    const prevCount = prevCountRef.current;
    return <h1>new{count},before{prevCount}</h1>
}
// 强制渲染组件
function Counter() {
    const [count, setCount] = useState(0);
    const [updater, setUpdater] = useState(0);
    function forceUpdate() {
        setUpdater(updater => updater + 1)
    }
    const prevCountRef = useRef();


    useEffect(() => {
        prevCountRef.current = count;
    });
    const prevCount = prevCountRef.current;
    return <h1>new{count},before{prevCount}</h1>
}
export default Counter
