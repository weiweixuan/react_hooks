import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Input, Form, Grid, Icon, Message } from "@alifd/next";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  // labelTextAlign: 'left'
};
const { Col, Row } = Grid;

const colItemLayout = {
  xxs: 24,
  xs: 24,
  s: 24,
  m: 12,
  l: 12,
  xl: 12,
};
const faileds = [
  { tag: "name", label: "联系人姓名" },
  { tag: "phone", label: "电话" },
  { tag: "position", label: "职位" },
  { tag: "dingding", label: "钉钉" },
];

const ContactsInfo = memo(({ onChange = () => {}, list = [] }) => {
  // const [list_, setList_] = useState(list);
  function handleChange(index, tag, value) {
    const temp = [...list];
    temp[index][tag] = value;
    onChange(temp);
  }
  function delItem(index) {
    const temp = [...list];
    temp.splice(index, 1);
    onChange(temp);
  }

  return (
    <div>
      {list.map((child, idx) => (
        <Row
          key={idx}
          wrap
          gutter={32}
          style={{
            border: "1px dashed rgb(181, 181, 181)",
            borderBottom: "none",
            padding: "20px 20px 5px",
            position: "relative",
            margin: 0,
          }}
        >
          {faileds.map((item, keys) => (
            <Col key={keys} {...colItemLayout}>
              <FormItem
                {...formItemLayout}
                label={`${item.label}:`}
                required
                onBlur={(e) => {
                  if (item.tag !== "phone") return;
                  // 手动正则判断
                  if (
                    !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                      e.target.value
                    )
                  ) {
                    Message.error("请填写正确的手机号码");
                  }
                }}
                requiredMessage={`${item.label}必填!`}
              >
                <Input
                  placeholder="请输入"
                  style={{ width: "100%" }}
                  name={`${item.tag}-${idx}`}
                  value={child[item.tag]}
                  onChange={(e) => handleChange(idx, item.tag, e)}
                />
              </FormItem>
            </Col>
          ))}
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "5px 0",
              borderTop: "1px dashed rgb(181, 181, 181)",
            }}
          >
            <Icon
              type="close"
              size="xs"
              style={{ color: "#FF6600", cursor: "pointer" }}
              onClick={() => {
                delItem(idx);
              }}
            />
          </div>
        </Row>
      ))}
      <div
        style={{
          padding: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          border: "1px dashed rgb(181, 181, 181)",
          marginBottom: 20,
        }}
        onClick={() => {
          const temp = [
            ...list,
            { name: "", position: "", phone: "", dingding: "" },
          ];
          onChange(temp);
        }}
      >
        <Icon type="add" style={{ color: "#FF6600" }} />
        <span style={{ fontSize: 16, paddingLeft: 6 }}>添加</span>
      </div>
    </div>
  );
});

ContactsInfo.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ContactsInfo;
