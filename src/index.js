import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import ContextMod from './Context.jsx'
import LazyMod from './Lazy.jsx'
import MemoMod from './Memo.jsx'
import EffectMod from './useEffect.jsx'
import UseContextMod from './useContext.jsx'
import UseMemoMod from './useMemo.jsx'
import UseCallBack from './useCallBack.jsx'
import UseRef from './useRef.jsx'
import Custom from './custom.jsx'
import TodoList from './TodoList.jsx'
import TodoListRedux from './TodoListRedux.jsx'
import TodoListReducer from './TodoListReducer.jsx'
ReactDOM.render(
  <React.StrictMode>
    {/* <ContextMod /> */}
    {/* <LazyMod /> */}
    {/* <MemoMod /> */}
    {/* <EffectMod /> */}
    {/* <UseContextMod /> */}
    {/* <UseMemoMod /> */}
    {/* <UseCallBack /> */}
    {/* <UseRef /> */}
    {/* <Custom /> */}
    {/* <TodoList /> */}
    {/* <TodoListRedux /> */}
    <TodoListReducer />
  </React.StrictMode>,
  document.getElementById('root')
);

