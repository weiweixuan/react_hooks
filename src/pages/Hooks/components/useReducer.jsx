import React, { useState, useReducer } from 'react'
import { Button } from "@alifd/next";
const initState = { count: 1 }
const reducer = (state, action) => {
  //在reducer里处理数据，使得组件更简洁
  const { payload, type } = action;
  switch (type) {
    case 'desc':
      return {
        ...state,
        count: state.count + 1
      };
    case 'asc':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}
export default ({ count }) => {
  function initFun() {
    return {
      count
    }
  }
  const [state, dispatch] = useReducer(reducer, initState, initFun)//第一个参数是reducer,第二个是初始化state,如果依赖props传递的值来初始化state，那就用第三个参数

  return <>
    <div>点击了{state.count}次</div>
    <Button onClick={() => {
      dispatch({ type: 'desc' })
    }} type='primary'>添加</Button>
    <Button onClick={() => {
      dispatch({ type: 'asc' })
    }} type='primary'>减少</Button>
  </>
}
