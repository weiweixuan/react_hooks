import React from "react";
import { FormattedMessage } from "react-intl";
import MyInput from "./components/MyInput";
import MyList from "./components/MyList";
import "./index.scss";
const Todo = () => {
  return (
    <div className="todo-list-box">
      <div className="header">
        <FormattedMessage id="app.demo.mydemo.title" />
      </div>
      <MyInput />
      <MyList />
    </div>
  );
};

export default Todo;
