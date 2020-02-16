import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import BaseForm from "../../components/Form/BaseForm";
import moment from "moment";
const options = {
  // 表单样式
  formOptions: {
    FormStyle: {
      padding: "20px",
      // background: "#F7F8FA",
      margin: "20px"
    },
    // 布局
    formLayout: {
      // 优先使用FormItem的配置
      labelCol: { span: 2 }, // label占据的栅格大小 例如： {span: 8, offset: 16}
      wrapperCol: { span: 10 }, // 表单组件占据的栅格大小 {span: 8, offset: 16}
      labelAlign: "left" // 标签label布局： top ,left, inset (优先生效item的配置)
    }
  },
  // 表单项配置
  formItemOptions: {
    formItemLayout: {
      labelCol: { span: 6 }, // 调整单元块内的label栅格大小 例如： {span: 8, offset: 16}
      wrapperCol: { span: 16 }, // 调整单元块内表单组件占据的栅格大小 {span: 8, offset: 16}
      span: 6, //占据一行的栅格数 (例如：24为单列展示，8为三列展示)
      labelAlign: "left", // 标签label布局： top ,left, inset (优先生效)
      labelTextAlign: "right" // 标签对齐方式 left right
    }
  },
  // 按钮配置
  submitOptions: {
    layoutStatus: "inline", // 按钮的布局状态 inline block
    submitLabel: "提交",
    resetLabel: "重置",
    handleSubmit: params => {
      console.log(params, "handleSubmit");
    },
    style: { justifyContent: "flex-end", paddingLeft: "1%" }
  },
  // 数据
  data: [
    {
      label: "作业名称",
      ChildComponent: "Input",
      placeholder: "请输入姓名",
      name: "name",
      fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
      requiredMessage: "请填写有效的姓名" // 表单验证的提示信息
    },
    {
      label: "作业类型",
      ChildComponent: "Select",
      fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
      placeholder: "请输入",
      name: "address",
      childList: [
        { label: "安徽", value: "1" },
        { label: "江苏", value: "2" },
        { label: "上海", value: "3" },
        { label: "北京", value: "4", disabled: true }
      ]
    },
    {
      label: "任务名称",
      ChildComponent: "Input",
      placeholder: "请输入姓名",
      name: "test",
      fullWidth: true // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
    },
    {
      label: "执行状态",
      ChildComponent: "Select",
      fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
      placeholder: "请输入",
      name: "status",
      childList: [
        { label: "开始", value: "1" },
        { label: "结束 ", value: "2" },
        { label: "等等", value: "3" },
        { label: "失效", value: "4", disabled: true }
      ]
    },
    {
      label: "开始日期:",
      ChildComponent: "DatePicker",
      fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
      placeholder: "请输入",
      name: "startTime"
    },
    {
      label: "结束日期:",
      ChildComponent: "DatePicker",
      fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
      placeholder: "请输入",
      name: "endTime"
    }
  ]
};
export default () => {
  const defaultValue = {
    name: "作业名称",
    address: "1",
    test: "任务",
    status: "2",
    startTime: moment(new Date()),
    endTime: moment(new Date())
  };
  return <BaseForm options={options} defaultValue={defaultValue}></BaseForm>;
};
