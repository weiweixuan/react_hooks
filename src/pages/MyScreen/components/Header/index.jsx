import React from "react";
import styles from "./index.module.scss";

export default props => {
  const { isFullScreen, setIsFullScreen } = props;
  return (
    <div className={styles.header}>
      <div className={styles.title}> 业务可用性大盘</div>
      <div
        className={styles.checkBtn}
        onClick={() => {
          setIsFullScreen(!isFullScreen);
        }}
      >
        {isFullScreen ? "取消全屏" : "全屏展示"}
      </div>
    </div>
  );
};
