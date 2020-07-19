import React, { useState, useEffect } from "react";
import moment from "moment";
import BaseForm from "../../components/Form/BaseForm";
import ContactsInfo from "./ContactsInfo";
import { Form, Input, Checkbox } from "@alifd/next";

const FormItem = Form.Item;

const options = {
  // 表单样式
  formOptions: {
    FormStyle: {
      padding: "20px",
      // background: "#F7F8FA",
      margin: "20px",
    },
    // 布局
    formLayout: {
      // 优先使用FormItem的配置
      labelCol: { span: 2 }, // label占据的栅格大小 例如： {span: 8, offset: 16}
      wrapperCol: { span: 10 }, // 表单组件占据的栅格大小 {span: 8, offset: 16}
      labelAlign: "left", // 标签label布局： top ,left, inset (优先生效item的配置)
    },
  },
  // 表单项配置
  formItemOptions: {
    formItemLayout: {
      labelCol: { span: 6 }, // 调整单元块内的label栅格大小 例如： {span: 8, offset: 16}
      wrapperCol: { span: 16 }, // 调整单元块内表单组件占据的栅格大小 {span: 8, offset: 16}
      responsive: { xxs: 24, xs: 24, s: 12, m: 12, l: 8, xl: 8 }, // 占据一行的栅格数 (例如：24为单列展示，8为三列展示)
      labelAlign: "left", // 标签label布局： top ,left, inset (优先生效)
      labelTextAlign: "right", // 标签对齐方式 left right
    },
  },
  // 按钮配置
  submitOptions: {
    layoutStatus: "inline", // 按钮的布局状态 inline block
    submitLabel: "提交",
    resetLabel: "重置",
    // style: { justifyContent: "flex-end", paddingLeft: "1%" },
  },
};

export default () => {
  const [companyContacts, setCompanyContacts] = useState([
    {
      name: "",
      phone: "",
      position: "",
      dingding: "",
    },
  ]);

  const [defaultValue, setDefaultValue] = useState({
    name: "作业类型1",
    tips: "tips1",
  });

  const renderData = (field) => {
    const values = field.getValues();

    return [
      {
        label: "作业名称",
        ChildComponent: "Input",
        required: true,
        placeholder: "请输入姓名",
        name: "name",
        requiredMessage: "请填写有效的姓名", // 表单验证的提示信息
      },
      {
        label: "作业名称2",
        // ChildComponent: "Input",
        renderComponent: (
          <FormItem
            required
            placeholder="请输入姓名"
            name="name2"
            requiredMessage="请填写有效的姓名"
          >
            <Input
              htmlType="password"
              name="basePass"
              placeholder="Please Enter Password"
            />
          </FormItem>
        ),
        required: true,
        placeholder: "请输入姓名",
        name: "name",
        requiredMessage: "请填写有效的姓名", // 表单验证的提示信息
      },
      {
        label: "自定义选择",
        separateLayout: true,
        renderComponent: (
          <ContactsInfo
            list={companyContacts}
            onChange={(e) => {
              // this.setState({ companyContacts: e });
              setCompanyContacts(e);
              field.setValues({ userDefined: e });
            }}
          />
        ),
        required: true,
        placeholder: "请输入选择文案",
        name: "userDefined",
        requiredMessage: "请填写有效的内容", // 表单验证的提示信息
      },
      {
        label: "小计",
        ChildComponent: "TextArea",
        required: true,
        placeholder: "请输入",
        name: "tips",
        requiredMessage: "请填写有效的信息", // 表单验证的提示信息
      },
      {
        label: "爱好",
        ChildComponent: "Checkbox",
        required: true,
        placeholder: "请输入",
        name: "hobby",
        requiredMessage: "请输入爱好", // 表单验证的提示信息
        childList: [
          { label: "洗澡", value: "1" },
          { label: "烫头", value: "2" },
          { label: "打麻将", value: "3" },
        ],
      },
      {
        label: "性别",
        ChildComponent: "Radio",
        required: true,
        placeholder: "请输入",
        name: "sex",
        requiredMessage: "请输入性别", // 表单验证的提示信息
        childList: [
          { label: "男", value: "1" },
          { label: "女", value: "0" },
        ],
      },
      {
        required: true,
        label: "作业类型",
        ChildComponent: "Select",
        placeholder: "请输入",
        requiredMessage: "请输入作业类型", // 表单验证的提示信息
        name: "address",
        childList: [
          { label: "安徽", value: "1" },
          { label: "江苏", value: "2" },
          { label: "上海", value: "3" },
          { label: "北京", value: "4", disabled: true },
        ],
      },
      {
        required: true,
        label: "开始日期:",
        ChildComponent: "DatePicker",
        placeholder: "请输入",
        requiredMessage: "请输入开始日期", // 表单验证的提示信息
        name: "startTime",
      },
      {
        required: true,
        label: "时间:",
        ChildComponent: "TimePicker",
        placeholder: "请输入",
        requiredMessage: "请输入开始时间", // 表单验证的提示信息
        name: "time",
      },
      {
        required: true,
        label: "分数:",
        ChildComponent: "NumberPicker",
        placeholder: "请输入",
        requiredMessage: "请输入开始分数", // 表单验证的提示信息
        name: "score",
        style: { width: "100%" },
      },
      {
        required: true,
        label: "开关:",
        ChildComponent: "Switch",
        placeholder: "请输入",
        requiredMessage: "请输入开始开关", // 表单验证的提示信息
        name: "switch",
      },
      values.switch && {
        label: "开关展示文案",
        ChildComponent: "Input",
        required: true,
        placeholder: "请输入开关展示文案",
        name: "switchName",
        requiredMessage: "请填写开关展示内容", // 表单验证的提示信息
      },
    ].filter(Boolean);
  };

  useEffect(() => {
    setTimeout(() => {
      setDefaultValue({
        name: "作业类型",
        tips: "tips",
        hobby: ["1", "2"],
        sex: "1",
        address: "1",
        startTime: moment(new Date()),
        time: moment(new Date()),
        score: 750,
        switch: false,
      });
      setCompanyContacts([
        {
          name: "魏魏",
          phone: "18888888888",
          position: "222",
          dingding: "dd1",
        },
        {
          name: "penny",
          phone: "1999999999",
          position: "333",
          dingding: "dd2",
        },
      ]);
    }, 1000);
  }, []);

  function handleSubmit(params) {
    console.log(params, "handleSubmit");
  }
  function handleReset(params) {
    console.log(params, "handleReset");
  }

  function handleChange(params) {
    console.log(params, "变化");
    // setDefaultValue(params);
  }

  return (
    <BaseForm
      options={options}
      renderData={renderData}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      defaultValue={defaultValue}
      handleChange={handleChange}
    />
  );
};
