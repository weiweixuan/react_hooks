import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Message,
  CascaderSelect
} from "@alifd/next";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 }
};

import "./index.scss";
const MyLogin = () => {
  const [size, setSize] = useState("medium");
  const [data, setData] = useState([]);
  const [userMsg, setUserMsg] = useState({});
  useEffect(() => {
    // 获取用户信息
    let userMsg = localStorage.getItem("userMsg");
    if (userMsg) {
      userMsg = JSON.parse(userMsg);
      console.log(userMsg, "userMsg");
      userMsg.setting && setSize(userMsg.setting);
      setUserMsg(userMsg);
      // 获取三级地址
      fetch("https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json")
        .then(response => response.json())
        .then(data => {
          data[1].disabled = true;
          setData(data);
        })
        .catch(e => console.log(e));
    }
  }, []);
  const handleChange = (value, data, extra) => {
    console.log(value, data, extra);
  };
  const submit = (data, err) => {
    console.log(data, err, "iii");
    if (err) {
      Message.error("请检填写数据");
      return;
    }
    console.log(JSON.stringify(data));
    localStorage.userMsg = JSON.stringify(data);
    Message.success("添加成功");
  };
  const onChange = val => console.log(val);

  return (
    <div className="myLogin">
      {/* 头部图片 */}
      <div className="header">
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2635549888,1215988463&fm=26&gp=0.jpg"
          className="logo"
          alt=""
        />
        <h2 className="title">请填写个人信息</h2>
      </div>

      {/* 表单区域 */}
      <div className="form">
        <Form {...formItemLayout} size={size}>
          <FormItem label="设置字体大小:">
            <Select
              value={size}
              name="setting"
              onChange={setSize}
              style={{ width: "100%" }}
            >
              <Option value="small">small</Option>
              <Option value="medium">medium</Option>
              <Option value="large">large</Option>
            </Select>
          </FormItem>
          <FormItem
            required
            requiredMessage="请输入用户昵称"
            maxLength={12}
            maxlengthmessage="已经超出12个字符"
            label="用户昵称:"
          >
            <Input
              trim
              maxLength={12}
              hasLimitHint
              cutString={false}
              placeholder="Please enter your user name"
              defaultValue={userMsg.userName}
              id="userName"
              name="userName"
            />
          </FormItem>
          <FormItem
            required
            label="手机号:"
            format="number"
            requiredMessage="请输入用户手机号"
            maxLength={11}
            maxlengthmessage="请不要超过11个数字"
          >
            <Input
              trim
              maxLength={11}
              hasLimitHint
              placeholder="Please enter your phoneNumber"
              defaultValue={userMsg.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
            />
          </FormItem>

          <FormItem required label="生日:">
            <DatePicker
              id="barthday"
              defaultValue={userMsg.barthday}
              name="barthday"
              onChange={onChange}
            />
          </FormItem>
          <FormItem required label="地址:" requiredMessage="请输入用户居住地址">
            <CascaderSelect
              style={{ width: "302px" }}
              dataSource={data}
              onChange={handleChange}
              defaultValue={userMsg.adress}
              id="adress"
              name="adress"
            />
          </FormItem>
          <FormItem
            label="小建议:"
            maxLength={100}
            maxlengthmessage="请不要超过100个数字"
          >
            <Input.TextArea
              placeholder="请输入···"
              maxLength={100}
              style={{ width: 500 }}
              defaultValue={userMsg.suggest}
              rows={2}
              hasLimitHint
              aria-label="input max length 100"
              id="suggest"
              name="suggest"
            />
          </FormItem>
          <FormItem wrapperCol={{ offset: 4 }}>
            <Form.Submit
              validate
              type="primary"
              onClick={submit}
              style={{ marginRight: 10 }}
            >
              提交
            </Form.Submit>
            <Form.Reset>重置</Form.Reset>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default MyLogin;
