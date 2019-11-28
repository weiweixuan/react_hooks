import React, { useState, useEffect } from "react";

export default info => {
  const [userInfo, setUserInfo] = useState(info);
  console.log("使用了hooks");
  function changeInfo() {
    // do  somethings ...
    return JSON.stringify(userInfo);
  }
  return [changeInfo(), setUserInfo];
};
