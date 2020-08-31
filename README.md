## 固守老旧的解决方案的确会让你更不容易犯错，但长江后浪推前浪业务的诉求始终在变，墨守成规就会被淘汰

- 没有constructor this.setState componentDidMount render

- 新特性
- Context
- ContestType
- lazy
- Suspense
- memo

# 类组件的不足

- 状态逻辑复用难
    缺少复用机制
    渲染属性和高阶组件导致层级沉余

- 趋向复杂难以维护
    生命周期函数混杂不相干逻辑
    相干逻辑分散在不同生命周期

- this指向困扰
    内联函数过度创建新句柄
    类成员函数不能保证this

# Hooks优势
 - 优化类组件的三大问题
    函数组件无this问题
    自定义Hooks方便复用状态逻辑
    副作用的关注点分离

## useState 每次都会尊循第一次组件渲染的顺序变化
- 不能变更顺序
- 不能两次渲染组件次数不一样(固定的次数和数量)
- 所以useState必须在组件的顶层使用，不能用在条件语句中，循环中使用
- useState(()=>{
    return props.defaultCount || 0
})//默认值可以传函数只在第一次渲染时执行后面不执行

可以安装eslint-plugin-react-hooks 解决这个问题package.jsona >
eslintConfig: {
    plugins: [
        'react-hooks'
    ],
    rules: {
        'react-hooks/rules-of-hooks':'error'
    }
}

## useEffect

- 副作用时机 Mount之后
            Update之后
            Unmount之前

- 每次渲染都会执行render
    第一次渲染相当于componentDidMount
    后面的渲染都相当于componentDidUpdate

useEffect(()=>{
    return ()=>{
        // 在试图被销毁之前触发
        // 两种销毁的原因，从新渲染，组件卸载
    }
}, []) // （只有数组的每一项都不变才会阻止effect从新执行）加这个参数函数只会发生在第一次渲染后


# useContext

在hooks中还可以使用consumer但是ConstType不能用了（依赖类组件）


# useMemo
是在渲染期间完成的,

useMemo(() => {
    return count * 2
}, [count === 3]);

# useRef 
获取dom元素
同步组件之间的顺序

# 自定义hooks



# hooks官方法则
仅在顶层调用hooks函数（不能在循环语句，条件语句，或者是嵌套函数中调用hooks）会改变调用顺序，导致bug
仅在函数组件和自定义hooks中，调用hooks函数(不能再其他普通函数中调用)

# 常见的问题
* 对传统React的影响
 生命周期函数如何映射到Hooks中
 类组件成员变量如何映射到Hooks?
 Hooks中如何获取历史props和state?
 如何强制更新一个Hooks组件？

```
//见代码 life

```


# Redux工具库
* 三大原则
    单一数据源
    状态不可变
    纯函数修改数据








 # hooksmod
