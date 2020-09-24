import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

export default props => {
  const { data } = props;
  const [busenessData, setBusensessData] = useState([]);

  useEffect(() => {
    // 默认选中第一个
    setBusensessData(
      data.map((item, key) => {
        return { name: item, checked: !key ? true : false };
      })
    );
  }, []);

  console.log(busenessData, "data");
  return (
    <div className={styles.aside}>
      {/* 上面部分 */}
      {data.length && (
        <div className={styles.scrollBox}>
          {busenessData.map((item, key) => (
            <div
              onClick={() => {
                setBusensessData(
                  busenessData.map((child, index) => {
                    return { ...child, checked: key === index ? true : false };
                  })
                );
              }}
              className={`${styles.scrollItem} ${
                item.checked ? styles.active : ""
              } `}
              key={key}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      {/* 下面展示部分 */}
      <div className={styles.showBox}></div>
    </div>
  );
};
