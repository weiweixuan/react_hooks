import React from "react";
import { defaultOptions } from "./formOptions";
import {
  Form,
  Input,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  NumberPicker,
  Switch,
  Grid
} from "@alifd/next";
const FormItem = Form.Item;
const Option = Select.Option;
const { Row, Col } = Grid;

// 传入的options 请看formOptions.js 配置文件
export default ({
  options = {
    data: [],
    ...defaultOptions
  },
  defaultValue = {}
}) => {
  const {
    formOptions: { FormStyle, formLayout },
    formItemOptions: { formItemLayout },
    submitOptions: {
      layoutStatus,
      submitLabel,
      resetLabel,
      handleSubmit,
      handleReset,
      style
    },
    data
  } = options;
  // 表单组件映射表
  const renderItem = ({ key, childList = [], ...props }) => {
    const formItemComponentMap = {
      Input: <Input hasClear {...props} />,
      TextArea: (
        <Input.TextArea maxLength={100} rows={4} hasLimitHint {...props} />
      ),
      Checkbox: (
        <Checkbox.Group {...props}>
          {childList.map(({ label, ...otherOptions }, key) => (
            <Checkbox key={key} {...otherOptions}>
              {label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
      Radio: (
        <Radio.Group {...props}>
          {childList.map(({ label, ...otherOptions }, key) => (
            <Radio key={key} {...otherOptions}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      ),
      Select: (
        <Select hasClear {...props}>
          {childList.map(({ label, ...otherOptions }, key) => (
            <Option key={key} {...otherOptions}>
              {label}
            </Option>
          ))}
        </Select>
      ),
      DatePicker: <DatePicker hasClear {...props} />,
      TimePicker: <TimePicker hasClear {...props} />,
      NumberPicker: <NumberPicker hasClear {...props} />,
      Switch: <Switch {...props} />
    };
    return formItemComponentMap[key];
  };

  function renderList(data) {
    return (
      <Row wrap>
        {data.map((item, key) => {
          const {
            ChildComponent,
            placeholder,
            name,
            childList = [],
            style,
            ...itemOptions
          } = item;
          return (
            <Col span={formItemLayout.span} key={key}>
              <FormItem {...itemOptions} {...formItemLayout}>
                {renderItem({
                  key: ChildComponent,
                  childList,
                  placeholder,
                  name,
                  style
                })}
              </FormItem>
            </Col>
          );
        })}
        {layoutStatus === "inline" && renderSubmit()}
      </Row>
    );
  }
  function renderSubmit() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", ...style }}>
        {submitLabel && (
          <Form.Submit
            validate
            type="primary"
            onClick={handleSubmit}
            style={{ marginRight: 10 }}
          >
            {submitLabel}
          </Form.Submit>
        )}
        {resetLabel && (
          <Form.Reset onClick={handleReset}>{resetLabel}</Form.Reset>
        )}
      </div>
    );
  }
  return (
    <Form {...formLayout} style={FormStyle} value={defaultValue}>
      {renderList(data)}
      {/* 提交和重置按钮 */}
      {layoutStatus === "block" && renderSubmit()}
    </Form>
  );
};
