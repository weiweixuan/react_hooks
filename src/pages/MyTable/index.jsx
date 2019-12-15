import React, { useState, useEffect } from "react";
import "./index.scss";
import { Table } from "@alifd/next";

const SubTable = ({ title }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = Array.from({ length: 5 }, (item, index) => ({
      title: `我是子table的title${index + 1}`,
      id: index + 1,
      time: new Date().toLocaleString(),
      subTitle: Math.random().toString(16),
    }));
    setData(data);
  }, [title]);
  return (
    <Table
      dataSource={data}
      // onSort={sort}
      hasBorder={false}
      isZebra
    // expandedRowIndent={[2, 1]}
    // expandedRowRender={otherRenderList}
    >
      {/* <Table.Column
        align={"center"}
        // lock={"left"}
        title="Id"
        // sortable
        width={200}
        dataIndex="id"
      // resizable={true}
      /> */}
      <Table.Column
        width={300}
        align="center"
        title="标题"
        dataIndex="title"
      />
      <Table.Column
        width={300}
        align="center"
        title="注册时间"
        dataIndex="time"
      />
      <Table.Column
        width={400}
        align="center"
        title="小标题"
        dataIndex="subTitle"
      />
      <Table.Column
        width={150}
        align="center"
        title="操作"
        cell={render}
        lock="right"
      />
    </Table>
  );
};
export default () => {
  const dataSource = () =>
    Array.from({ length: 10 }, (item, index) => ({
      title: `我是title${index + 1}`,
      id: index + 1,
      time: new Date().toLocaleString(),
      subTitle: Math.random().toString(16),
    }));
  const [data, setData] = useState(dataSource());
  console.log(data, "data");
  const render = (value, index, record) => {
    return <a href="#">Remove({record.id})</a>;
  };
  const sort = (dataIndex, order) => {
    // eslint-disable-next-line no-underscore-dangle
    const data_ = [...data];
    console.log(dataIndex, order, "iiiiii");
    if (order === "asc") {
      // 升序
      data_.sort((a, b) => b[dataIndex] - a[dataIndex]);
    } else {
      data_.sort((a, b) => a[dataIndex] - b[dataIndex]);
    }
    console.log(data_, "asc升序，desc降序");
    setData(data_);
  };

  const otherRenderList = (data, key) => {
    console.log(data, key, "data");
    return <SubTable title={data.title} />;
    // return <div className="otherList"> {data.title}</div>;
  };
  return (
    <>
      <Table
        dataSource={data}
        onSort={sort}
        hasBorder={false}
        isZebra
        expandedRowIndent={[2, 1]}
        expandedRowRender={otherRenderList}
      >
        <Table.Column
          align="center"
          // lock={"left"}
          title="Id"
          sortable
          width={200}
          dataIndex="id"
        // resizable={true}
        />
        <Table.Column
          width={300}
          align="center"
          title="标题"
          dataIndex="title"
        />
        <Table.Column
          width={300}
          align="center"
          title="注册时间"
          dataIndex="time"
        />
        <Table.Column
          width={400}
          align="center"
          title="小标题"
          dataIndex="subTitle"
        />
        <Table.Column
          width={150}
          align="center"
          title="操作"
          cell={render}
          lock="right"
        />
      </Table>
    </>
  );
};
