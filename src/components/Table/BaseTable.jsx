import React, { memo } from "react";
import { Table, Pagination } from "@alifd/next";
import PropTypes from "prop-types";

const BaseTable = memo((props) => {
  const { dataSource, columnList = [], paginationOptions, ...other } = props;
  return (
    <div>
      <Table dataSource={dataSource} {...other}>
        {columnList.map((child) => (
          <Table.Column key={child.dataIndex} {...child} />
        ))}
      </Table>
      {paginationOptions && (
        <Pagination pageSizeSelector="dropdown" {...paginationOptions} />
      )}
    </div>
  );
});

BaseTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columnList: PropTypes.array.isRequired,
};

export default BaseTable;
