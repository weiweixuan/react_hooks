import React, {
  memo,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

const Child = forwardRef((props, ref) => {
  const [double, setDouble] = useState(0);
  useImperativeHandle(ref, () => ({
    changeDouble(val) {
      setDouble(val * 2);
    },
  }));
  return (
    <>
      <h2>加倍组件</h2>
      <p>值为：{double}</p>
    </>
  );
});

const Father = memo((props) => {
  const Cref = useRef();
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(Cref.current, "xixi");
    Cref.current.changeDouble(count + 1);
  }

  return (
    <div>
      <h2>数量：{count}</h2>
      <button onClick={handleClick}>增加</button>
      <Child ref={Cref}></Child>
    </div>
  );
});

export default Father;
