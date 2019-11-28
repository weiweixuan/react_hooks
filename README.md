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
> > useMemo 是在 dom 更新前调用的函数(传入 useMemo 的函数会在渲染期间执行)

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
> > useCallback 使用和 useMemo 类似第一个参数是一个函数，第二个参数是监听的数组，当数组里的值发生改变了，我们就返回一个新的函数，否则返回原函数，我们可以父组件里监听一个值来根据这个值操作子组件是否需要渲染，

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
