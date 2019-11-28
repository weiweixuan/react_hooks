import React from "react";
import stores from "@/stores/index";
import IcePanel from "@icedesign/panel";
import useUserInfo from "../../../hooks/useUserInfo";
const MyList = () => {
  const myTodolist = stores.useStore("myTodolist");
  const [info, setInfo] = useUserInfo({ name: "penny", age: 24 });
  const { data, delItemByKey, changeStateByKey } = myTodolist;
  const del = (index, e) => {
    e.preventDefault();
    delItemByKey(index);
  };
  const changeState = (index, e) => {
    e.preventDefault();
    changeStateByKey(index);
    set_info();
  };
  function set_info() {
    const params = {
      name: "penny",
      age: Math.random()
        .toString()
        .slice(2, 4)
    };
    setInfo(params);
  }
  console.log("List change ========>", info);
  return (
    <IcePanel status="info" style={{ marginTop: "10px" }}>
      <IcePanel.Header>TodoList</IcePanel.Header>
      <IcePanel.Body>
        {data.map((item, key) => (
          <div
            key={item.title}
            style={{
              fontSize: "15px",
              margin: 0,
              lineHeight: 1.5,
              display: "flex",
              justifyContent: "space-between",
              color: item.checked ? "green" : "red"
            }}
          >
            <div>{item.title}</div>
            <div>
              <a
                href="#"
                onClick={del.bind(this, key)}
                style={{ paddingRight: "10px" }}
              >
                删除
              </a>
              <a href="#" onClick={changeState.bind(this, key)}>
                变更状态
              </a>
            </div>
          </div>
        ))}
      </IcePanel.Body>
    </IcePanel>
  );
};

export default MyList;
