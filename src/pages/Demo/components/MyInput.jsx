import React, { useState, useRef, useEffect } from "react";
import stores from "@/stores/index";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button, Input } from "@alifd/next";
import useUserInfo from "../../../hooks/useUserInfo";

const MyInput = function(props) {
  const {
    intl: { formatMessage }
  } = props;
  const myTodolist = stores.useStore("myTodolist");
  const [info, setInfo] = useUserInfo({ name: "weiwei", age: 23 });
  const { addItem } = myTodolist;
  const [val, setVal] = useState("");
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);
  const handleSubmit = () => {
    if (!val) return;
    let res = String(val).trim();
    addItem({ title: res, checked: false });
    setVal("");
    set_info();
  };
  function set_info() {
    const params = {
      name: "weiwei",
      age: Math.random()
        .toString()
        .slice(2, 4)
    };
    setInfo(params);
  }
  console.log("input 组件的 =====>", info);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Input
        value={val}
        onChange={setVal}
        placeholder={formatMessage({
          id: "app.demo.mydemo.placeholder"
        })}
        style={{ flex: 1 }}
        ref={ref}
      />
      <Button
        style={{ flexBasis: "100px", marginLeft: 10 }}
        onClick={handleSubmit}
        type="primary"
      >
        <FormattedMessage id="app.demo.mydemo.button" />
      </Button>
    </div>
  );
};

export default injectIntl(MyInput);
