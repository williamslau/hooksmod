import React from 'react';
import { Component, lazy, Suspense } from 'react';

// 使用lazy必须配合Suspense否则不会显示suspense是loading
// webpackChunkName指定文件名



// ErrorBoundary
// componentDidCatch 如果组件没加载出来，会触发的生命周期也可以用静态方法
// static getDerivedStateFromError(){} 组件没有加载出来，一旦出发，自动往state中合并一个state

const AboutMod = lazy(() => import(/* webpackChunkName: "about" */'./About.jsx'))

export default class App extends Component {
    state = {
        hasError: false
    }
    // componentDidCatch() {
    //     this.setState({
    //         hasError: true
    //     })
    // }
    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }
    render() {
        if (this.setState.hasError) {
            return <div>
                error
            </div>
        }
        return <div>
            <Suspense fallback={<div>loading</div>}>
                <AboutMod></AboutMod>
            </Suspense>
        </div>
    }
}
