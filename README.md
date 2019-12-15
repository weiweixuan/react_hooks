# pro-scaffold

## 使用

```bash
$ npm start      // 启动预览服务器
$ npm run build  // 构建 dist
```

### 如何使用数据管理

1 在 stores 里建立相应的模块 js 文件
2 定义数据 state 和修改 state 的方法
3 页面上想使用，引入 stores

```javascript
import stores from "@/stores/index";
//  找到相应的模块
const expandAside = stores.useStore("expandAside");
//  结构方法直接使用
const { toggle } = expandAside;
```

### 多语言组件使用

```javascript
// 当做文本用
import { FormattedMessage } from "react-intl";

<FormattedMessage id="hello" />;

// 当做字符串用
import { injectIntl } from "react-intl";
// 首先该组件用 injectIntl 方法包裹下，然后可以拿到 props 下的 intl 属性：结构 formatMessage 方法即可直接使用

<Input
  value={val}
  onChange={setVal}
  placeholder={formatMessage({ id: "app.demo.mydemo.placeholder" })}
  style={{ flex: 1 }}
  ref={dom => {
    ref.current = dom;
  }}
/>;
```

# react hooks 笔记

> useState
>
> > 通过闭包保存了变量的状态，返回了一个原值和更新的值，可多次调用，切记只可以在组件最外层使用！！！
1. 如果每次修改的值是依赖上次的值做计算，而且发现上次的值没有更新的话，可以给set传递一个fn (count => count+1 )，这样会使用最新值做计算
2. 如果初始化的值是个函数，它会先调用一次

```javascript
import { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() : setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

> useRef
>
> > 相当于一个缓存变量的工具，可以存任何值

```javascript
import React, { useState, useRef, useEffect } from "react";
const MyInput = function(props) {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  }, []);
  return <Input ref={ref} />;
};
```

> useEffect
>
> > useEffect 是在 dom 更新之后调用的函数( 当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数)

```javascript
import React, { useState, useEffect } from "react";
export default () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("xxx");
  useEffect(() => {
    console.log("count更新了调用", count);
  }, [count]);

  useEffect(() => {
    console.log("初始化调用");
    return function() {
      console.log("页面卸载调用");
    };
  }, []);
  return (
    <>
      <div>{count}</div>
      <div>{name}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          setName(
            name +
              Math.random()
                .toString(16)
                .slice(2, 3)
          );
        }}
      >
        other change
      </button>
    </>
  );
};
```

> useMemo
>
> > useMemo 是在 **dom 更新前**调用的函数(传入 useMemo 的函数会在渲染期间执行)

```javascript
import React, { useState, useEffect, useMemo } from "react";
export default function() {
  const [name, setName] = useState("xxx");
  const [age, setAge] = useState(23);
  useEffect(() => {
    console.log("useEffect", "name--------------change");
  }, [name]);
  useEffect(() => {
    console.log("useEffect", "age--------------change");
  }, [age]);
  const logNameChange = useMemo(() => {
    console.log("name变化啦", name);
    return name;
  }, [name]);

  const logAgeChange = useMemo(() => {
    console.log("age变化啦", age);
    return age;
  }, [age]);
  return (
    <>
      <div>{logNameChange}</div>
      <div>{logAgeChange}岁了</div>
      <button onClick={() => setName(name + "_1")}>改变name</button>
      <button onClick={() => setAge(age + 1)}>改变age</button>
    </>
  );
}
```

> useCallback
>
> > useCallback 使用和 useMemo 类似第一个参数是一个函数，第二个参数是监听的数组，当数组里的值发生改变了，我们就返回一个新的函数，否则返回原函数，我们可以父组件里监听一个值来根据这个值操作子组件是否需要渲染,一般在传递函数的时候优化下性能

```javascript
import React, { useState, useCallback, useEffect } from "react";
function Parent() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");

  const callback = useCallback(() => {
    return count;
  }, [count]); //根据count判断是否需要渲染子组件(渲染子组件是指是否执行子组件的effect函数)
  return (
    <div>
      <h4>{count}</h4>
      <Child callback={callback} />
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={event => setVal(event.target.value)} />
      </div>
    </div>
  );
}

function Child({ callback }) {
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    setCount(callback());
    console.log("object");
  }, [callback]);
  return <div>{count}</div>;
}

export default Parent;
```

> useReducer
>> 使用reducer方法，可以把组件内的处理逻辑放到reducer里，这样组件干净整洁，方便调试
```javascript
	import React, {  useReducer } from "react";

let initialState = {
  count: 0
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "asc":
      return {
        ...state,
        count: state.count + 1
      };
    case "desc":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>已经有{state.count}人点赞啦！！！</h2>
      <button
        onClick={() => {
          dispatch({ type: "asc" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ type: "desc" });
        }}
      >
        -
      </button>
    </div>
  );
};

	
```

>自定义hooks
>> 我们可以自定义一个自己的hooks来封装一些特定的功能，比如我们封装了一个请求方法,我们可以多次调用自定义hooks,每次调用之间互不影响
```javascript
import React, { useState, useReducer, useEffect } from 'react'
import axios from 'axios'
const initApi = 'http://rap2api.taobao.org/app/mock/239903/example/1576316288465'//测试api
const initState = {
  loading: false,
  error: null,
  data: {}
}
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "init":
      return {
        loading: true,
        error: null,
        data: {}
      };
    case "error":
      return {
        loading: false,
        error: payload,
        data: {}
      }
    case "success":
      return {
        loading: false,
        error: null,
        data: payload
      }
    default:
      return {
        loading: false,
        error: null,
        data: {}
      }
  }
}
export default ({ api_, payload } = {}) => {
  const [api, setApi] = useState(api_)
  const [state, dispatch] = useReducer(reducer, initState)
  async function getData() {
    try {
      if (api) {
        dispatch({ type: 'init' })
        const res = await axios.get(api)
        if (res.status === 200 && res.data) {
          dispatch({ type: 'success', payload: res.data })
        }
      }
    } catch (e) {
      dispatch({ type: 'error', payload: e })
    }
  }
  useEffect(() => {
    getData()
  }, [api])
  return [state, setApi]
}

// 在组件中使用

import React from 'react'
import { Button, Loading } from "@alifd/next";
import useApi from '../../../hooks/useApi'
const initApi = 'http://rap2api.taobao.org/app/mock/239903/example/1576316288465'
export default () => {
  const [state, setApi] = useApi()
  const { name, age, skill } = state.data;
  function getData() {
    setApi(initApi)
  }
  return <>
    <Loading visible={state.loading}
      fullScreen
      shape="fusion-reactor"
    >
      <p>姓名：{name}</p>
      <p>年龄：{age}</p>
      <p>技能：{skill}</p>
      <Button type="primary" onClick={getData}>获取数据</Button>
    </Loading>
  </>
}

```

> React.memo
>> 这个虽然是类的高阶组件，但是我们可以用来优化函数式组件
>>> 子组件的props属性项作为依赖项，如果props的值更新了，那么子组件更新，否则使用缓存
>>> 我们也可以自己定义是否需要更新

```javascript
import React,{ memo } from 'react'

export default memo(({ count }) => {
  console.log('子组件更新了')
  return <>
    <div>点赞人数为:{count}</div>
  </>
}, notRender)
function notRender(prevProps, nextProps) {
  //第二个参数如果不写的话默认是属性的浅对比
  // 此时我们只用到count属性，但是我们可以自己定义是否需要渲染方法，注意的是返回true是不要更新，false是需要更新，和ShouldComponentUpdate的返回值渲染相反！！！
  if (prevProps.count != nextProps.count) {
    return false
  }
  return true;
}

// 父组件调用
<Demo count={count} name={name}></Demo>
```
