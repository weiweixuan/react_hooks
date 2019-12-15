import React, { useState, useCallback } from 'react'
import UesState from './components/useState';
import UseReducer from './components/useReducer'
import Demo from './components/demo'
import UseApi from './components/UseApi'
export default () => {
  const [count, setCount] = useState(10)
  const [name, setName] = useState('xxx')
  console.log('父组件渲染');
  const handleSetCount = useCallback(val => {
    setCount(val)
  }, [count]);
  return <div style={{ textAlign: 'center' }}>
    <h1>react Hooks</h1>
    <button onClick={() => {
      setCount(count + 1)
    }}>change count</button>
    {/* <UesState></UesState>
    <UseReducer count={count}></UseReducer> */}
    <Demo count={count} setCount={handleSetCount}></Demo>
    <h2>{name}</h2>
    <button onClick={() => {
      setName(name + "a")
    }}>change name</button>
    {/* <UseApi name={name} count={count}></UseApi> */}
  </div>
}
