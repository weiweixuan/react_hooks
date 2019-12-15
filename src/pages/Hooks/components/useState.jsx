import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@alifd/next";

export default () => {
  const ref = useRef()
  const [date, setDate] = useState(Date.now())
  useEffect(() => {
    ref.current = setInterval(() => {
      console.log(date, 'date')
      setDate(date + 1000) //如果你需要修改的值是依赖上一次的值，就传递个fn
    }, 1000)
    return () => {
      clearInterval(ref.current)
      ref.current = null
    };
  }, [])
  const timer = new Date(date)
  return <>
    <div>当前时间为{timer.toLocaleString()}</div>
  </>
}
