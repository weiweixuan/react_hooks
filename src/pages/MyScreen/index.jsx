import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import styles from "./index.module.scss";

let bussiessArr = Array.from({ length: 10 }, (_, index) => "业务名称" + index);

let showModelList = [
  { label: "应用", value: "app" },
  { label: "ecs", value: "ecs" },
  { label: "DRDS", value: "drds" },
  { label: "RDS", value: "rds" },
  { label: "KVSTORE", value: "kvstore" },
  { label: "SLB", value: "slb" },
  { label: "DOCKER", value: "docker" }
];

export default () => {
  // 是否全屏
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 动态获取屏幕高度
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.onresize = () => {
      setResizeHeight();
    };
    setResizeHeight();
  }, []);

  function setResizeHeight() {
    const F = document.querySelector(".ice-layout-main.ice-layout-scrollable");
    setHeight(F.offsetHeight);
  }

  return (
    <div
      className={`${styles.screen} ${isFullScreen ? styles.fullScreen : ""}`}
      style={{ height }}
    >
      <iframe
        src="http://v.bootstrapmb.com/2019/5/dwjl4859"
        id="iframe"
        frameBorder="0"
        width="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          height: isFullScreen ? "100vh" : height
        }}
      />
      <Header isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
      <Main asideData={bussiessArr} showModelList={showModelList} />
    </div>
  );
};
