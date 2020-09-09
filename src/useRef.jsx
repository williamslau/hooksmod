import React, { useRef, useState, useEffect, PureComponent } from 'react';

class Foo extends PureComponent {
    aaaa = () => {
        console.log(11111);
    }
    render() {
        return (<div>
            Foo
        </div>)
    }
}
export default () => {
    const foo = useRef();
    const [count, setCount] = useState(0);
    const it = useRef();
    // let it; // it这个值每次组件从新渲染都会重置，所以不能清楚定时器这里需要用useState
    // useEffect(() => {
    //     console.log(dom.current);
    //     foo.current.aaaa(); // ref可以获取类组件中的方法
    // }, []);
    useEffect(() => {
        it = setInterval(() => {
            setCount(count => count + 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current);
        }
    });
    return (<div>
        {count}
        <Foo ref={foo}></Foo>
    </div>)
}