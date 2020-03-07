import React from "react";
import Aside from "../Aside";
import styles from "./index.module.scss";

export default props => {
  const { asideData } = props;
  return (
    <div className={styles.main}>
      <Aside data={asideData}></Aside>
    </div>
  );
};
