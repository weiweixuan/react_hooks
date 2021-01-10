import React from "react";
import Aside from "../Aside";
import styles from "./index.module.scss";

export default props => {
  const { asideData, showModelList } = props;
  return (
    <div className={styles.main}>
      <Aside data={asideData} showModelList={showModelList}></Aside>
    </div>
  );
};
