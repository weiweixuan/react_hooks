import React, { useMemo, memo } from 'react'

export default memo(({ count }) => {
  console.log('子组件更新了')
  // useMemo(() => console.log('子组件更新了'), [count])
  return <>
    <div>点赞人数为:{count}</div>
  </>
})
function notRender(prevProps, nextProps) {
  //第二个参数如果不写的话默认是属性的浅对比
  // 此时我们只用到count属性，但是我们可以自己定义是否需要渲染方法，注意的是返回true是不要更新，false是需要更新，和ShouldComponentUpdate的返回值渲染相反！！！
  if (prevProps.count != nextProps.count) {
    return false
  }
  return true;
}
