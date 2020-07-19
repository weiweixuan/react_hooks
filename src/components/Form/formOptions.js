import React from "react";

export const defaultOptions = {
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
      wrapperCol: { span: 18 }, // 调整单元块内表单组件占据的栅格大小 {span: 8, offset: 16}
      responsive: { xxs: 24, xs: 24, s: 12, m: 12, l: 8, xl: 6 }, // 占据一行的栅格数,响应式 (例如：24为单列展示，8为三列展示)
      labelAlign: "left", // 标签label布局： top ,left, inset (优先生效)
      labelTextAlign: "right", // 标签对齐方式 left right
    },
  },
  // 按钮配置
  submitOptions: {
    layoutStatus: "", // 按钮的布局状态 inline block
    submitLabel: "提交",
    resetLabel: "重置",
    style: { justifyContent: "flex-end", paddingLeft: "30px" },
  },
};

// 数据
export const renderDefaultData = (field) => [
  // {
  //   label: "姓名:",
  //   required: true,
  //   ChildComponent: "Input", // Input,Checkbox,Radio,Checkbox,Select,DatePacker,TimePicker,NumberPicker,Switch,TextArea
  //   placeholder: "请输入姓名",
  //   name: "name",
  //   fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
  //   requiredMessage: "请输入啊卧槽", // 表单验证的提示信息
  //   format: "number", // 对参数的基本校验， 可选值为 ：'number', 'email', 'url', 'tel'
  //   // 默认值在 formItemOptions.formItemLayout里，如果需要特殊修改可在这里配置
  //   childItemOptions: {
  //     labelCol: { span: 6 }, // 自定义label占据的栅格大小
  //     wrapperCol: { span: 18 } // 自定义表单组件占据的栅格大小
  //   },
  // childList: [
  //   { label: "苹果", value: "1" },
  //   { label: "香蕉", value: "2" },
  //   { label: "橘子", value: "3" },
  //   { label: "榴莲", value: "4", disabled: true }
  // ]
  // },

  {
    label: "姓名:",
    required: true,
    ChildComponent: "Input",
    placeholder: "请输入姓名",
    name: "name",
    fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
    requiredMessage: "请输入啊卧槽", // 表单验证的提示信息
    // 默认值在 formItemOptions.formItemLayout里，如果需要特殊修改可在这里配置
    // childItemOptions: {
    //   labelCol: { span: 6 }, // 自定义label占据的栅格大小
    //   wrapperCol: { span: 18 } // 自定义表单组件占据的栅格大小
    // }
  },
  {
    label: "年龄:",
    ChildComponent: "Input",
    placeholder: "请输入年龄",
    name: "age",
    format: "number", // 对参数的基本校验， 可选值为 ：'number', 'email', 'url', 'tel'
  },

  {
    label: "性别:",
    ChildComponent: "Radio",
    placeholder: "请输入性别",
    name: "sex",
    childList: [
      { label: "男士", value: "1" },
      { label: "女士", value: "2" },
      { label: "未知", value: "3" },
    ],
  },
  {
    label: "喜欢吃:",
    ChildComponent: "Checkbox",
    placeholder: "请输入电话号码",
    name: "tel",
    childList: [
      { label: "苹果", value: "1" },
      { label: "香蕉", value: "2" },
      { label: "橘子", value: "3" },
      { label: "榴莲", value: "4", disabled: true },
    ],
    // childItemOptions: {
    //   labelCol: { span: 8 }, // 自定义label占据的栅格大小
    //   wrapperCol: { span: 16 } // 自定义表单组件占据的栅格大小
    // }
  },
  {
    label: "公司地址:",
    ChildComponent: "Select",
    fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
    placeholder: "请输入",
    name: "address",
    childList: [
      { label: "安徽", value: "1" },
      { label: "江苏", value: "2" },
      { label: "上海", value: "3" },
      { label: "北京", value: "4", disabled: true },
    ],
  },
  {
    label: "选择日期:",
    ChildComponent: "DatePicker",
    fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
    placeholder: "请输入",
    name: "date",
  },
  {
    label: "选择时间:",
    ChildComponent: "TimePicker",
    fullWidth: true, // 有的组件不可改变宽高，例如日期选择框，可用该配置占满宽度
    placeholder: "请输入",
    name: "timer",
  },
  {
    label: "数量:",
    ChildComponent: "NumberPicker",
    placeholder: "请输入",
    name: "count",
    style: { width: "100%" },
  },
  // {
  //   label: "是否启用:",
  //   ChildComponent: "Switch",
  //   name: "use"
  // },
  // {
  //   label: "备注:",
  //   ChildComponent: "TextArea",
  //   placeholder: "请输入",
  //   name: "bz"
  // }
];
