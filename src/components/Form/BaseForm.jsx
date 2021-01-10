import React, { Component } from "react";

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
  Grid,
  Field,
} from "@alifd/next";
import PropTypes from "prop-types";
import { defaultOptions, renderDefaultData } from "./formOptions";

const FormItem = Form.Item;
const Option = Select.Option;
const { Row, Col } = Grid;

function renderResponsive(options) {
  return { xxs: 24, xs: 24, s: 12, m: 12, l: 8, xl: 6, ...options };
}
// 传入的options 请看formOptions.js 配置文件
class BaseForm extends Component {
  field = new Field(this);

  constructor(props) {
    super(props);
    this.field.setValues(props.defaultValue);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.field.setValues(nextProps.defaultValue);
    }
  }

  // 表单组件映射表
  renderItem = ({ key, childList = [], ...props }) => {
    const formItemComponentMap = {
      Input: <Input hasClear {...props} />,
      TextArea: (
        <Input.TextArea maxLength={100} rows={4} hasLimitHint {...props} />
      ),
      Checkbox: (
        <Checkbox.Group {...props}>
          {childList.map(({ label, ...otherOptions }, key_) => (
            <Checkbox key={key_} {...otherOptions}>
              {label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
      Radio: (
        <Radio.Group {...props}>
          {childList.map(({ label, ...otherOptions }, key_) => (
            <Radio key={key_} {...otherOptions}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      ),
      Select: (
        <Select hasClear {...props}>
          {childList.map(({ label, ...otherOptions }, key_) => (
            <Option key={key_} {...otherOptions}>
              {label}
            </Option>
          ))}
        </Select>
      ),
      DatePicker: <DatePicker hasClear {...props} />,
      TimePicker: <TimePicker hasClear {...props} />,
      NumberPicker: <NumberPicker hasClear {...props} />,
      Switch: <Switch {...props} />,
    };
    return formItemComponentMap[key];
  };

  renderList = (data) => {
    const { handleReset, options } = this.props;
    const {
      formItemOptions: { formItemLayout },
      submitOptions: { layoutStatus, submitLabel, resetLabel, style },
    } = { ...defaultOptions, ...options }; // 没有赋值的使用默认值

    const { responsive, ...other } = formItemLayout;
    return (
      <Row wrap>
        {data.map((item, key) => {
          const {
            ChildComponent,
            placeholder,
            name,
            childList = [],
            style,
            separateLayout,
            renderComponent,
            ...itemOptions
          } = item;
          // separateLayout 表示自定义布局 ， 同步在自定义组件中生效
          if (separateLayout && renderComponent) {
            return renderComponent;
          }
          return (
            <Col key={key} {...renderResponsive(responsive)}>
              <FormItem fullWidth {...itemOptions} {...other}>
                {renderComponent ||
                  this.renderItem({
                    key: ChildComponent,
                    childList,
                    placeholder,
                    name,
                    style,
                  })}
              </FormItem>
            </Col>
          );
        })}
        {layoutStatus === "inline" &&
          this.renderSubmit(submitLabel, resetLabel, handleReset, style)}
      </Row>
    );
  };

  renderSubmit = () => {
    const { options, handleSubmit, handleReset } = this.props;
    const {
      submitOptions: { submitLabel, resetLabel, style },
    } = { ...defaultOptions, ...options }; // 没有赋值的使用默认值

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
  };

  render() {
    const {
      handleChange,
      options,
      renderData = renderDefaultData,
    } = this.props;
    const {
      formOptions: { FormStyle, formLayout },
      submitOptions: { layoutStatus },
    } = { ...defaultOptions, ...options }; // 没有赋值的使用默认值
    return (
      <Form
        field={this.field}
        {...formLayout}
        style={FormStyle}
        onChange={handleChange}
      >
        {this.renderList(renderData(this.field))}
        {/* 提交和重置按钮 */}
        {layoutStatus === "block" && this.renderSubmit()}
      </Form>
    );
  }
}

BaseForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  options: PropTypes.object.isRequired,
  renderData: PropTypes.func.isRequired,
  defaultValue: PropTypes.object.isRequired,
};

export default BaseForm;
