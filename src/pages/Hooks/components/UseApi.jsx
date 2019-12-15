import React from 'react'
import { Button, Loading } from "@alifd/next";
import useApi from '../../../hooks/useApi'
const initApi = 'http://rap2api.taobao.org/app/mock/239903/example/1576316288465'
const otherApi = 'http://rap2api.taobao.org/app/mock/239903/getDemo'
export default () => {
  const [state, setApi] = useApi()
  const [otherState, setOtherApi] = useApi()
  const { name, age, skill } = state.data;
  const { Oname, Oage, Oskill } = otherState.data;
  console.log(state, otherState, 'store');
  return <>
    <Loading visible={state.loading || otherState.loading}
      fullScreen
      shape="fusion-reactor"
    >
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>技能：{skill}</p>
      <Button type="primary" onClick={() => {
        setApi(initApi)
      }}>获取数据</Button>
      <hr />
      <p>--姓名：{Oname}</p>
      <p>--年龄：{Oage}</p>
      <p>--技能：{Oskill}</p>
      <Button type="primary" onClick={() => {
        setOtherApi(otherApi)
      }}>-获取数据-</Button>
    </Loading>
  </>
}
